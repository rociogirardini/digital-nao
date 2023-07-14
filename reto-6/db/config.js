import mongoose from "mongoose"

const dbConnection = async() => {

try {

    const uri = process.env.MONGODB_CNN

    await mongoose.connect( uri ) 

    console.log('Conectado a base de datos online')

} catch (error) {
    console.log(error)
    throw new Error('Error en la conexión con la base de datos');
}

}


export { dbConnection }