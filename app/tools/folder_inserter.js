const fs = require('fs')
const path = require('path')
const folder = process.env.FOLDER

const cardFolder = "Niemiecki"

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

                    if( obj.folder)
                        return;
                    
                    const newObj = { ...obj, folder: cardFolder}
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
