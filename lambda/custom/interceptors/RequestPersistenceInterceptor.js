const utils = require('../utils');

module.exports = {
	async process(handlerInput) {
		// manage inskill products

		// Sample return object: 
		/*
			{
				inSkillProducts: [
					{
						productId: 'amzn1.adg.product.75860bda-01de-41c1-9a27-218f865b86dc',
						referenceName: 'premium',
						type: 'SUBSCRIPTION',
						name: 'Premium Access',
						summary: 'This turns your Pixel experience into a premium one by turning your pixels into SUPER pixels.',
						entitled: 'NOT_ENTITLED',
						entitlementReason: 'NOT_PURCHASED',
						purchasable: 'PURCHASABLE',
						activeEntitlementCount: 0,
						purchaseMode: 'TEST'
					},
					{
						productId: 'amzn1.adg.product.0ed8872c-4cf2-499d-8c0a-81d15a0c9931',
						referenceName: 'skill-access',
						type: 'ENTITLEMENT',
						name: 'Gain Access',
						summary: 'This gives you exclusive access to the Pixels skill',
						entitled: 'NOT_ENTITLED',
						entitlementReason: 'NOT_PURCHASED',
						purchasable: 'PURCHASABLE',
						activeEntitlementCount: 0,
						purchaseMode: 'TEST'
					},
					{
						productId: 'amzn1.adg.product.01df3077-dbe6-4a90-97e9-84bc1090070b',
						referenceName: 'coins',
						type: 'CONSUMABLE',
						name: '100 Pixel Coins',
						summary: '100 Pixel Coins that you can spend on pixels!',
						entitled: 'NOT_ENTITLED',
						entitlementReason: 'NOT_PURCHASED',
						purchasable: 'PURCHASABLE',
						activeEntitlementCount: 0,
						purchaseMode: 'TEST'
					}
				],
				nextToken: null,
				truncated: false
			}
  		*/
		let sessionAttributes = handlerInput.attributesManager.getSessionAttributes() || {};

		if (handlerInput.requestEnvelope.session['new'] || !sessionAttributes.inSkillProducts) {

			let inSkillProductArray, persistentAttributes, ispObject;

			// first populate ISP info
			try {
				const locale = handlerInput.requestEnvelope.request.locale;
				const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
				ispObject = await ms.getInSkillProducts(locale);
				inSkillProductArray = ispObject.inSkillProducts;
			} catch (e) {
				console.log('RequestInterceptor:: could not retrieve ISPs');
			}

			// then populate persistent attributes
			try {
				persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
			} catch (e) {
				console.log('RequestInterceptor:: could not retrieve persistent attributes');
			}

			const sessionAttributes = { 
				...persistentAttributes, 
				inSkillProducts: inSkillProductArray 
			}

			// check if user is premium and save it to sessionAttributes
			sessionAttributes.premium = utils.isPremium(sessionAttributes);
			handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
		}
	}
};