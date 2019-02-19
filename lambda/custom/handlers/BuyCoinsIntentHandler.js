const CONFIG = require('../config');
const utils = require('../utils');

module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		const hasAccess = utils.hasAccess(sessionAttributes);

		return request.type === 'IntentRequest' && request.intent.name === 'BuyCoinsIntent' && hasAccess;
	},

	handle(handlerInput) {
		return handlerInput.responseBuilder
			//.speak(`Ok. `)
			.addDirective({
				type: 'Connections.SendRequest',
				name: 'Buy',
				payload: {
					InSkillProduct: {
						productId: CONFIG.ISP.COINS.productId,
					},
				},
				token: 'coins',
			})
			.getResponse();
	}
}