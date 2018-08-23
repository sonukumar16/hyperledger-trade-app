const {
    MyNetwork
} = require('../../lib');
const crypto = require('crypto');
const autoBind = require('auto-bind');
const rp = require('request-promise');
class ParticipantMethods {
    constructor() {
        this.registry;
        this.factory;
        this.serializer;
        this.namespace = MyNetwork.namespace;
        this.type = 'Trader'
        autoBind(this);
    }

    /**
     * Creates a new participant
     * @param {*String} tradeId, participant tradeId to be added , ...data }
     * @param {*String} data, data could be model data for participant
     * @returns {*Object}, returns a promise object
     */
    async addParticipant({ tradeId, ...data }) {
        console.log("Add participant data ::::::::::::::::::::::::", tradeId, data);
        this.registry = await MyNetwork.participantRegistry(this.type);  
        let {factory, serializer} = MyNetwork.factorySerializer(); 
        this.factory = factory;
        this.serializer = serializer             
       /*  To create id used this method 
        const random = Math.random().toString();
        const TraderId = crypto.createHash('sha1').update(Date.now() + random).digest('hex');
       */
        /* Resource newResource( string ns, string type, string id )*/
        let Participant = Object.assign(factory.newResource(`${this.namespace}`, this.type, tradeId), data);
        console.log("Participant in method ::::::::::::::::::::::::", JSON.stringify(Participant));
        let addParticipantResponse = await this.registry.add(Participant);  
        let identity = await this.issueIdentity(tradeId)
        console.log("identity:::::::::::::::::::::::::::::::::",identity);
        console.log("addParticipantResponse in method ::::::::::::::::::::::::", Participant, addParticipantResponse);
        return addParticipantResponse ? addParticipantResponse : Participant;
    }

   /**
    * Issue a new identity
    *
    * @param {*String} type, participant type
    * @param {*String} id, participant id to be added
    * @returns {*Object} , returns a promise object
    * @memberof ParticipantMethods
    */  // Method - 01 
   async issueIdentity (id) {
    console.log('issueIdentity:::::::::::::::::::::::', id)
    try {
      return await MyNetwork.bizNetworkConnection.issueIdentity(`${this.namespace}.${this.type}#${id}`, id);      
    } catch (err) {
      console.log('Error in issueIdentity: ', err);
      throw new Error('500', 'Error occurred in issue identity')      
    }
  }
  // Method - 02
  async issueIdentityByRestApi(id) { // working
    const identity = {
        participant: `${this.namespace}#${this.type}`,
        userID: id,
        options: {}
      };
      let options = {
        method: 'POST',
        uri: 'http://localhost:3000/api/system/identities/issue',
        body: identity,
        json: true 
        //responseType: 'blob' //The response type must be set to blob as this endpoint returns a business network card.
    };
    rp(options)
        .then(function (res) {
            console.log(" rp res------------->>>", res)
        })
        .catch(function (err) {
            console.log(" rp err------------->>>", err)
        });
    }
}
module.exports = ParticipantMethods;