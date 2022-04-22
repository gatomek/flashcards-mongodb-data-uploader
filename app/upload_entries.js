const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const Entry = require( "./models/entry")
const { credentials } = require( './config')
const connectionString = credentials.mongoDbConnection
const folder = process.env.FOLDER

let c = 0;

const uploadEntries = () =>
{
    const directoryPath = folder;

    fs.readdir(directoryPath, function (err, files) {
            if (err) {
                mongoose.disconnect( () => console.timeEnd("elapsed") )
                return console.log('Unable to scan folder: ' + err);
            }

            if( files.length === 0) {
                mongoose.disconnect( () => console.timeEnd("elapsed") )
                return console.log('No entries in folder');
            }

            files.forEach( function (file) {
                    const filePath = path.join( directoryPath, file)
                    const text = fs.readFileSync( filePath, 'utf8').replace(/^\uFEFF/, '')
                    const obj = JSON.parse( text);

                    const entry = new Entry( obj)
                    ++ c
                    entry.save( err => {
                            if (err)
                                throw err;

                            console.log( file + " ok");
                            if( -- c === 0)
                                mongoose.disconnect( () => console.timeEnd("elapsed") )
                        }
                    )
                }
            );
        }
    );
}

const main = () =>
{
    if( ! folder) {
        console.error('Brak wskazania folderu ze słownikiem !')
        process.exit(1)
    } else {
        console.log( 'Folder: ' + folder)
    }

    console.time( "elapsed");

    if( ! connectionString) {
        console.error('Brak identyfikatora połączenia z MongoDB!')
        process.exit(1)
    }

    try
    {
        mongoose
        .connect( connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => { 
                uploadEntries()
            }
        )
    }
    catch (e)
    {
        console.log("could not connect");
    }
}

/* --- */

main()
