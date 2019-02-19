module.exports = (numberOfPixels) => {
	const mainTemplate = {
		"type": "APL",
		"version": "1.0",
		"import": [
			{
				"name": "alexa-layouts",
				"version": "1.0.0"
			}
		],
		"mainTemplate": {
			"parameters": [
				"payload"
			],
			"layouts": {
				"FullHorizontalListItem": {
					"parameters": [
						"listLength"
					],
					"item": [
						{
							"type": "Container",
							"height": "100vh",
							"width": "100vw",
							"alignItems": "center",
							"justifyContent": "end",
							"items": [
								{
									"type": "Component",
									"position": "absolute",
									"height": "100vh",
									"width": "100vw",
									"overlayColor": "red",
									"scale": "best-fill"
								}
							]
						}
					]
				}
			}
		}
	}

	const pixelArray = [];
	for (let index = 0; index < numberOfPixels; index++) {
		pixelArray.push(_makePixel());
	}

	return mainTemplate;
}

function _makePixel() {
	return {

	}
}