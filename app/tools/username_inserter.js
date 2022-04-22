const fs = require('fs')
const path = require('path')
const folder = process.env.FOLDER

const username = "Tomek"

const insert_username_field = () =>
{
    const directoryPath = folder;

    fs.readdir(directoryPath, function (err, files) {

            if( files.length === 0) {
                return console.log('No entries in folder');
            }

            files.forEach( function (file) {
                    const filePath = path.join( directoryPath, file)
                    const text = fs.readFileSync( filePath, 'utf8').replace(/^\uFEFF/, '')
                    const obj = JSON.parse( text);

                    if( obj.username)
                        return;
                    
                    const newObj = { ...obj, username: username }
                    fs.writeFileSync( filePath, JSON.stringify( newObj, null, 4))
                    console.log( filePath)
                }
            );
        }
    );
}

const main = () =>
{
    insert_username_field()
}

/* --- */

main()
