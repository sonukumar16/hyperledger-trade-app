const Methods = require('./participantMethods');
class ParticipantCtrl extends Methods {
    async add(req, res) {
        try {
            let participant = await super.addParticipant(req.body);
            console.log("ParticipantAdd  of Add Participant Controller ::::::::::::::::::::::::", participant)
            return res.send(participant)
        } catch (err) {            
            console.log("Error of Add participant ::::::::::::::::::::::::", err);
            throw new Error(err);
        }
    }
    
    async identityList(req,res){
        try {
            let result = await super.identityList();
            console.log("identityList of Participant Controller ::::::::::::::::::::::::", result)
            return res.send(result)
        } catch (err) {            
            console.log("Error of identityList ::::::::::::::::::::::::", err);
            throw new Error(err);
        }
    }
    async testConnection(req,res){
        try {
            let result = await super.testConnection(req.body);
            console.log("testConnection of Participant Controller ::::::::::::::::::::::::", result)
            return res.send(result)
        } catch (err) {            
            console.log("Error of testConnection ::::::::::::::::::::::::", err);
            throw new Error(err);
        }
    }
}
module.exports = ParticipantCtrl;