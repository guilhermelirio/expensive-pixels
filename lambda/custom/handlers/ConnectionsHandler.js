const CONFIG = require('../config');
const utils = require('../utils');

module.exports = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
			(handlerInput.requestEnvelope.request.name === 'Buy' ||
			handlerInput.requestEnvelope.request.name === 'Upsell');
	},

	handle(handlerInput) {
		const connectionsPayload = handlerInput.requestEnvelope.request.payload;
		console.log('CONNECTIONS::', connectionsPayload, connectionsPayload.productId, CONFIG.ISP.ACCESS);

		switch (connectionsPayload.productId) {
			case CONFIG.ISP.ACCESS.productId:
				return handleAccessPurchase(connectionsPayload.purchaseResult, handlerInput)
				break;
			case CONFIG.ISP.COINS.productId:
				return handleCoinPurchase(connectionsPayload.purchaseResult, handlerInput)
				break;
			case CONFIG.ISP.PREMIUM.productId:
				return handlePremiumPurchase(connectionsPayload.purchaseResult, handlerInput)
				break;		
			default:
				return handlerInput.responseBuilder
					.speak('Not sure what happened there!')
					.reprompt('try again')
					.getResponse();
				break;
		}
	}
}

function handleAccessPurchase(purchaseResult, handlerInput) {
	let say = '', apl;
	const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

	switch (purchaseResult) {
		case 'ACCEPTED':
			// respond with question and reprompt
			say = 'Welcome to the exclusive world of Expensive Pixels. Your account has been credited 100 coins as a welcome bonus. Keep in mind a pixel costs 20 coins. You can always buy more, just ask me. To get started, just ask me to paint some pixels!';
			const upsellMessage = 'If you want to start painting pixels you first need to buy some coins. Want to learn more?';
			
			apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));

			return handlerInput.responseBuilder
				.speak(say)
				.reprompt('If you want to start painting pixels, just ask me to paint some pixels.')
				//.addDirective(apl)
				// .addDirective({
				// 	type: 'Connections.SendRequest',
				// 	name: 'Buy',
				// 	payload: {
				// 		InSkillProduct: {
				// 			productId: CONFIG.ISP.COINS.productId,
				// 		},
				// 		//upsellMessage: upsellMessage,
				// 	},
				// 	token: 'skillAccess',
				// })
				.getResponse();
			break;

		case 'DECLINED':
			// respond with sad question and reprompt
			say = 'It is a shame. So many like you have fallen at this first obstacle. Feel free to try again if you change your mind.'

			apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));
			
			return handlerInput.responseBuilder
				.speak(say)
				//.addDirective(apl)
				.getResponse();
			break;
		
		case 'ALREADY_PURCHASED':
			// respond with happy question and reprompt
			say = "Fear not! You already have access :) Do you want to buy some coins or paint some pixels?"
			return handlerInput.responseBuilder
				.speak(say)
				.reprompt(say)
				.getResponse();
			break;

		default:
			say = "Not exactly sure what went wrong, but something happened."
			return handlerInput.responseBuilder
				.speak(say)
				.reprompt(say)
				.getResponse();
			break;
	}
}

function handleCoinPurchase(purchaseResult, handlerInput) {
	let say = '', apl;
	const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

	switch (purchaseResult) {
		case 'ACCEPTED':
			// respond with question and reprompt
			say = 'Cha-ching! ';
			const coinCoint = utils.getCoinsCount(sessionAttributes);
			say += 'Your wallet now has ' + coinCoint + ' total coins. To spend them, just ask me to paint some pixels!';
			apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));

			return handlerInput.responseBuilder
				.speak(say)
				.reprompt('Do you want to paint some pixels?')
				//.addDirective(apl)
				.getResponse();
			break;

		case 'DECLINED':
			// respond with sad question and reprompt
			say = 'It is a shame. Just ask to buy some coins if you change your mind.'
			apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));

			return handlerInput.responseBuilder
				.speak(say)
				//.addDirective(apl)
				.getResponse();
			break;

		default:
			say = "Not exactly sure what went wrong, but something happened."
			return handlerInput.responseBuilder
				.speak(say)
				.reprompt(say)
				.getResponse();
			break;
	}
}

function handlePremiumPurchase(purchaseResult, handlerInput) {
	let say, apl;
	const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


	switch (purchaseResult) {
		case 'ACCEPTED':
			// respond with question and reprompt
			say = 'You are now among the elite few to have Premium Pixels. If you want to see your pixels, just ask.';
			apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));

			return handlerInput.responseBuilder
				.speak(say)
				.reprompt('If you are unsure, just ask for help.')
				//.addDirective(apl)
				.getResponse();
			break;

		case 'DECLINED':
			// respond with sad question and reprompt
			say = 'It is a shame. So many like you have fallen at this first obstacle. Feel free to try again if you change your mind.'
			apl = utils.prepareAplDirective(utils.formulateDataSource(sessionAttributes));

			return handlerInput.responseBuilder
				.speak(say)
				//.addDirective(apl)
				.getResponse();
			break;

		case 'ALREADY_PURCHASED':
			// respond with happy question and reprompt
			say = "Fear not! You already have access :) Do you want to buy some coins or paint some pixels?"
			return handlerInput.responseBuilder
				.speak(say)
				.reprompt(say)
				.getResponse();
			break;

		default:
			say = "Not exactly sure what went wrong, but something happened."
			return handlerInput.responseBuilder
				.speak(say)
				.reprompt(say)
				.getResponse();
			break;
	}
}