module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent';
	},

	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(`You said NO`)
			.reprompt(`NoIntent REPROMPT`)
			.getResponse();
	}
}