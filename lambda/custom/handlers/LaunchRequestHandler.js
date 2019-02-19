const utils = require('../utils');
const CONFIG = require('../config');

const handler = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		const hasAccess = utils.hasAccess(sessionAttributes);

		return request.type === 'LaunchRequest' || !hasAccess;
	},

	async handle(handlerInput) {

		const responseBuilder = handlerInput.responseBuilder;
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

		// check if user has purchased OTP access
		const access = utils.hasAccess(sessionAttributes);

		let say = '';

		if(access) {
			say = 'Welcome back. ';
			// get rest of ISP to understand what user can do
			const coins = utils.getCoinsCount(sessionAttributes);

			if(coins < 1) {
				say = 'You are among the lucky few to have access.';
				const upsellMessage = 'However, it seems you are out of coins. In order to paint pixels you need to purchase coins. Do you want to proceed?'
				return responseBuilder
					.speak(say)
					.addDirective({
						type: 'Connections.SendRequest',
						name: 'Upsell',
						payload: {
							InSkillProduct: {
								productId: CONFIG.ISP.COINS.productId,
							},
							upsellMessage: upsellMessage,
						},
						token: 'skillAccess',
					})
					.getResponse();
			} else {
				say = `Nice, it looks like you have some coins to spend. To paint some pixels, just ask me to paint however many pixels you want. Keep in mind a pixel costs 20 coins and you have ${coins} in your wallet.`
				const datasources = utils.formulateDataSource(sessionAttributes);
				let apl = utils.prepareAplDirective(datasources);
				return responseBuilder
					.speak(say)
					.reprompt('I didnt catch that. What do you want to do?')
					//.addDirective(apl)
					.getResponse();
			}



		} else {
			// Check if user is a first time user
			let upsellMessage = 'In order to continue you need to purchase access. Do you want to learn more?'
			if (!sessionAttributes.return_user) {
				say += 'Hello, welcome to expensive pixels!';
				sessionAttributes.return_user = true;
			} else {
				say += 'Welcome back!';
			}

			responseBuilder.addDirective({
				type: 'Connections.SendRequest',
				name: 'Upsell',
				payload: {
					InSkillProduct: {
						productId: CONFIG.ISP.ACCESS.productId,
					},
					upsellMessage: upsellMessage,
				},
				token: 'skillAccess',
			})

			return responseBuilder
				.speak(say)
				.getResponse();
		}
	},
}

module.exports = handler;