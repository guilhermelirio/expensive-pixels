const Alexa = require("ask-sdk");

// handlers
const FallbackIntentHandler = require('./handlers/FallbackIntentHandler.js')
const CancelIntentHandler = require('./handlers/CancelIntentHandler')
const HelpIntentHandler = require('./handlers/HelpIntentHandler')
const StopIntentHandler = require('./handlers/StopIntentHandler')
const NavigateHomeIntentHandler = require('./handlers/NavigateHomeIntentHandler')
const PaintPixelsIntentHandler = require('./handlers/PaintPixelsIntentHandler')
const BuyCoinsIntentHandler = require('./handlers/BuyCoinsIntentHandler')
const BuyPremiumIntentHandler = require('./handlers/BuyPremiumIntentHandler')
const YesIntentHandler = require('./handlers/YesIntentHandler')
const NoIntentHandler = require('./handlers/NoIntentHandler')
const WhatCanIBuyIntentHandler = require('./handlers/WhatCanIBuyIntentHandler')
const GetCoinCountIntentHandler = require('./handlers/GetCoinCountIntentHandler')
const ViewCollectionIntentHandler = require('./handlers/ViewCollectionIntentHandler')
const LaunchRequestHandler = require('./handlers/LaunchRequestHandler')
const SessionEndedHandler = require('./handlers/SessionEndedHandler')
const ConnectionsHandler = require('./handlers/ConnectionsHandler')
const ErrorHandler = require('./handlers/ErrorHandler')

// interceptors 
const RequestPersistenceInterceptor = require('./interceptors/RequestPersistenceInterceptor')
const ResponsePersistenceInterceptor = require('./interceptors/ResponsePersistenceInterceptor')

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder

	// reginster the handlers
	.addRequestHandlers(
		LaunchRequestHandler,
		StopIntentHandler,
		NavigateHomeIntentHandler,
		PaintPixelsIntentHandler,
		BuyCoinsIntentHandler,
		BuyPremiumIntentHandler,
		WhatCanIBuyIntentHandler,
		GetCoinCountIntentHandler,
		YesIntentHandler,
		NoIntentHandler,
		ViewCollectionIntentHandler,
		FallbackIntentHandler,
		CancelIntentHandler,
		HelpIntentHandler,
		SessionEndedHandler,
		ConnectionsHandler,
		ErrorHandler
	)
	.addErrorHandlers(ErrorHandler)

	.addRequestInterceptors(RequestPersistenceInterceptor)
	.addResponseInterceptors(ResponsePersistenceInterceptor)

	.withTableName("expensive-pixels")
	.withAutoCreateTable(true)

	.lambda();

