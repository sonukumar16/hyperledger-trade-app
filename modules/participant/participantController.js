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
}
module.exports = ParticipantCtrl;