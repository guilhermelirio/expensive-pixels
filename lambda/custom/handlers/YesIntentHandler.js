module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
	},

	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(`You said YES`)
			.reprompt(`YesIntent REPROMPT`)
			.getResponse();
	}
}