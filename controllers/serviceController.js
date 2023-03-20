const {Service: ServiceModel} = require('../models/Service')

const serviceController = {

    create: async(req, res) => {
        try {
            const service = {

                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            };

            const response = await ServiceModel.create(service);

            res.status(201).json({response, msg:"Serviço criado com sucesso!"})
        } catch (error) {
            console.log(error)
        }
    },

    getAll: async(req, res) => {

        try {
            
            const response = await ServiceModel.find()
            res.json(response)

        } catch (error) {
            console.log(error)
        }
        
    },

    get: async(req, res) => {

        try {

            const id = req.params.id
            const response = await ServiceModel.findById(id)

            if(!response) {
                res.status(404).json({msg: "Serviço não encontrado!"})
                return;
            }
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        const id = req.params.id
        try {
            
            const response = await ServiceModel.findByIdAndDelete(id)

            if(!response) {
                return res.status(404).json({msg: "Serviço não encontrado!"})
            }

            res.status(400).json({msg: "Serviço deletado com sucesso!"})

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = serviceController;