const utils = require('../utils');
const CONFIG = require('../config');

module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'GetCoinCountIntent';
	},

	handle(handlerInput) {
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		let coinsAvailable = utils.getCoinsCount(sessionAttributes);

		//let apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));

		return handlerInput.responseBuilder
			.speak(`You have ${coinsAvailable} coins left. Would you like to paint some pixels?`)
			//.addDirective(apl)
			.reprompt(`Anything else?`)
			.getResponse();
	}
}