module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'ViewCollectionIntent';
	},

	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(`You want to view your pixel collection.`)
			.reprompt(`view pixel collection Reprompt`)
			.getResponse();
	}
}