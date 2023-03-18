const mongoose = require('mongoose')


async function main(){

    try {
        await mongoose.connect("mongodb+srv://marcos:HV1zHbvBhqa2GpDz@cluster0.a1pcqsz.mongodb.net/?retryWrites=true&w=majority")
        console.log("Conectado ao banco!")
    } catch (error) {
        console.log(`Error:${error}`)
    }
}

module.exports = main







//mongodb+srv://marcos:<password>@cluster0.a1pcqsz.mongodb.net/?retryWrites=true&w=majority