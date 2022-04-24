const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_CONNECTION_STRING
       
const main = () =>
{
    console.time( "elapsed");

    if( ! connectionString) {
        console.error('Brak ciągu połączenia z MongoDB!')
        process.exit(1)
    }

    try
    {
        mongoose
        .connect( connectionString, { useNewUrlParser: true })
        .then( () => { 
                mongoose.connection.db.listCollections().toArray( function( err, names) {
                                if (err)
                                {
                                    console.log(err)
                                    return
                                }

                                const len = names.length

                                if( len > 0)
                                {
                                    let found = false
                                    for (i = 0; i < names.length; i++)
                                    {
                                        const name = names[i].name
                                        if (name === "entries")
                                        {
                                            found = true
                                            console.log("Entries Collection Exists in DB");
                                            mongoose.connection.db.dropCollection(
                                                "entries",
                                                function( err, result)
                                                {
                                                    console.log("Collection droped")
                                                    mongoose.connection.close()
                                                    console.timeEnd("elapsed");
                                                }
                                            );
                                            console.log("Entries Collection No Longer Available")
                                        }
                                    }
                                    
                                    if( ! found)
                                    {
                                        console.log( "Collection doesn't exist")
                                        mongoose.connection.close()
                                    }
                                }
                                else
                                {
                                    mongoose.connection.close()
                                    console.timeEnd("elapsed");
                                }
                            }
                        )
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
