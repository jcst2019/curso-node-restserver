const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlparser: true,
            //useunifiedtopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false,
            //tls: true,
            //tlsCAFile: `/path/to/cert`,
            useUnifiedTopology: true 
        });
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}

module.exports = {
    dbConnection
}
