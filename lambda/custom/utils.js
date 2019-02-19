const CONFIG = require('./config');

/**
 * Checks whether the product exists, and returns the ISP object.
 * @param {array} inSkillProducts list of In Skill Products available
 * @param {string} productName name of product to look for
 * @returns {object|boolean}
 */
function getProductByName(inSkillProducts, productName) {
	const filteredProducts = inSkillProducts.filter(record => record.referenceName === productName)
	let product;
	if(filteredProducts && filteredProducts.length > 0) {
		product = filteredProducts[0];
	}
	return product || false;
}

function hasAccess(sessionAttributes) {
	const accessProduct = getProductByName(sessionAttributes.inSkillProducts, CONFIG.ISP.ACCESS.referenceName)
	return accessProduct && accessProduct.entitled === 'ENTITLED';
}

function getCoinsCount(sessionAttributes) {
	const coinsProduct = getProductByName(sessionAttributes.inSkillProducts, CONFIG.ISP.COINS.referenceName)
	const activeEntitlementCount = parseInt(coinsProduct.activeEntitlementCount) || 0;
	const coinsUsed = parseInt(sessionAttributes.coinsUsed) || 0;
	const coinsAvailable = CONFIG.ISP.COINS.STARTING_AMOUNT + CONFIG.ISP.COINS.ENTITLEMENT_AMOUNT * activeEntitlementCount - coinsUsed;
	console.log('getCoinsCount:: coinsUsed is', coinsUsed, 'total left therefore is', coinsAvailable, 'activeEntitlementCount is ', activeEntitlementCount)
	return coinsAvailable;
}

function getPixelCount(sessionAttributes) {
	return parseInt(sessionAttributes.coinsUsed || 0) * CONFIG.ISP.COINS.COST_PER_PIXEL;
}

function isPremium(sessionAttributes) {
	const premiumProduct = getProductByName(sessionAttributes.inSkillProducts, CONFIG.ISP.PREMIUM.referenceName)
	return premiumProduct && premiumProduct.entitled === 'ENTITLED';
}

function canAfford(pixelCount, sessionAttributes) {
	const pixelCost = parseInt(pixelCount) * CONFIG.ISP.COINS.COST_PER_PIXEL;
	const coinCount = getCoinsCount(sessionAttributes);

	if (pixelCost <= coinCount) {
		return true;
	} else {
		return false;
	}
}

function prepareAplDirective(datasource, templateName) {

	let aplTemplate = require('./documents/template.json');
	let renderedApl = JSON.stringify({
		type: 'Alexa.Presentation.APL.RenderDocument',
		version: '1.0',
		document: aplTemplate,
		datasources: datasource
	});

	console.log('sendAplDirective', renderedApl);

	return renderedApl;
}


function formulateDataSource(sessionAttributes) {
	/*
	"coinCount": 100,
	"pixelCount": 4,
	"premium": true
	*/

	return { 
		"docData" : {
			"coinCount": getCoinsCount(sessionAttributes),
			"pixelCount": getPixelCount(sessionAttributes),
			"premium": isPremium(sessionAttributes)
		}
	}
}

module.exports = {
	getProductByName,
	getCoinsCount,
	isPremium,
	hasAccess,
	canAfford,
	prepareAplDirective,
	formulateDataSource,
	getPixelCount
};