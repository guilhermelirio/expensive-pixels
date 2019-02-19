module.exports = {
	process(handlerInput, responseOutput) {
		const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession);
		if (ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out 
			let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
			delete sessionAttributes.inSkillProducts;
			handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);
			return new Promise((resolve, reject) => {
				handlerInput.attributesManager.savePersistentAttributes()
					.then(() => {
						resolve();
					})
					.catch((err) => {
						reject(err);
					});
			});
		}
	}
};