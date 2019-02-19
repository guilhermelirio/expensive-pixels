const utils = require('../utils');
const CONFIG = require('../config');

module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		const hasAccess = utils.hasAccess(sessionAttributes);

		return request.type === 'IntentRequest' && request.intent.name === 'BuyPremiumIntent' && hasAccess;
	},

	handle(handlerInput) {
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

		if(utils.isPremium(sessionAttributes)) {
			return handlerInput.responseBuilder
				.speak(`Good news, you are already a premium subscriber! Want to go paint some pixels?`)
				.reprompt('reprompt')
				.getResponse();
		} else {
			let upsellMessage = 'A premium subscription turns all your pixels into gold super pixels. Want to learn more?'
			return handlerInput.responseBuilder
				//.speak(`You want to buy the premium subscription.`)
				.addDirective({
					type: 'Connections.SendRequest',
					name: 'Upsell',
					payload: {
						InSkillProduct: {
							productId: CONFIG.ISP.PREMIUM.productId,
						},
						upsellMessage: upsellMessage,
					},
					token: 'skillAccess',
				})
				.getResponse();
		}
	}
}