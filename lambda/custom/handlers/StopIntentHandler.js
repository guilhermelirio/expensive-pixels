module.exports = {
	canHandle(handlerInput) {
		const request = handlerInput.requestEnvelope.request;
		return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent';
	},

	handle(handlerInput) {
		let say = 'Okay, talk to you later! ';

		return handlerInput.responseBuilder
			.speak(say)
			.withShouldEndSession(true)
			.getResponse();
	}
}