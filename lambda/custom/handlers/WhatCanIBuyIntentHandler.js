const utils = require('../utils');
const CONFIG = require('../config');

module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'WhatCanIBuyIntent';
	},

	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(`You can buy coins, or buy the premium subscription. Which one would you like?`)
			//.addDirective(apl)
			.reprompt(`Anything else?`)
			.getResponse();
	}
}