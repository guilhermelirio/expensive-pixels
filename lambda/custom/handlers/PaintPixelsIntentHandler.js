const utils = require('../utils');
const CONFIG = require('../config');

module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'PaintPixelsIntent';
	},

	handle(handlerInput) {
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		const pixelCount = parseInt(handlerInput.requestEnvelope.request.intent.slots.pixelCount.value);

		if(!utils.canAfford(pixelCount, sessionAttributes)) {
			let upsellMessage = `You want to paint ${pixelCount} pixels. However, you do not have enough coins for that. You can buy more.`;

			console.log('PaintPixelsIntentHandler:: cantAfford!')

			return handlerInput.responseBuilder
				.speak(upsellMessage)
				.addDirective({
					type: 'Connections.SendRequest',
					name: 'Buy',
					payload: {
						InSkillProduct: {
							productId: CONFIG.ISP.COINS.productId,
						},
						//upsellMessage: upsellMessage,
					},
					token: 'skillAccess',
				})
				.getResponse();
		} else {
			let initialCoinsUsed = sessionAttributes.coinsUsed || 0;
			let currentCoinsUsed = pixelCount * CONFIG.ISP.COINS.COST_PER_PIXEL;
			let finalCoinsUsed = currentCoinsUsed + initialCoinsUsed;
			sessionAttributes.coinsUsed = finalCoinsUsed;
			handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
			let coinsAvailable = utils.getCoinsCount(sessionAttributes);

			let apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));

			return handlerInput.responseBuilder
				.speak(`Painting ${pixelCount} pixels. You spent ${currentCoinsUsed} coins. You have ${coinsAvailable} coins left.`)
				//.addDirective(apl)
				.reprompt(`Paint pixels Reprompt`)
				.getResponse();
		}
	}
}