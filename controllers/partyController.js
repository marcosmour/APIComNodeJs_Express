const PartyModel = require('../models/Party')

// Funcao para verificar se o cliente tem orçamento para a festa
const checkPartyBudget = (budget, services) => {

    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    
    if(priceSum > budget) {
        return false;
    }

    return true;

}

const partyController = {

    create: async (req, res) => {

        try {
            
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento e insuficiente!"})
                return
            }
            
            const response = await PartyModel.create(party)

            res.status(201).json({response, msg: "Festa criada com sucesso!"})

        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {

        try {
            
            const response = await PartyModel.find()

            res.json(response)

        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {

        try {
            
            const id = req.params.id

            const response = await PartyModel.findById(id)

            if(!response) {
                return res.status(404).json({msg: "Festa Não encontrada!"})
            }

            res.json(response)
        } catch (error) {
            console.log(error)
        }
    },
    delete: async(req, res) => {
      
        const id = req.params.id
        try {
            
            const party = await PartyModel.findById(id)

            if(!party) {
            res.status(401).json({msg: "Festa nao encontrada!"})
            return
            }

            const response = await PartyModel.findByIdAndDelete(id)


            res.status(200).json({response, msg: "Festa deletada com sucesso!"})

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {

        try {

            const id = req.params.id

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento e insuficiente!"})
                return
            }

            const response = await PartyModel.findByIdAndUpdate(id, party)

            if(!response) {
                res.status(404).json({msg: "Festa nao encontrada!"})
                return
            }

            res.status(200).json({party, msg: "Festa atualizada com sucesso!"})
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = partyController;