const dashboard = {
	"Dashboard": {
		"description": "Displays the amount of coins a user has",
		"resources": [
			{
				"description": "Colors dark to light",
				"colors": {
					"myBlack": "#343838",
					"myPurple": "#9C0A54",
					"myRed": "#FC2D47",
					"myOrange": "#FD704B",
					"myYellow": "#FDB04F",
					"myWhite": "#FFFFFF"
				}
			}
		],
		"parameters": [
			"coinIcon",
			"coinCount"
		],
		"items": [
			{
				"type": "Frame",
				"width": "100vw",
				"height": "100vh",
				"backgroundColor": "@myBlack",
				"position": "absolute"
			},
			{
				"when": "${viewport.shape == 'round'}",
				"type": "Container",
				"width": "100vw",
				"height": "100vh",
				"direction": "column",
				"items": [
					{
						"type": "Text",
						"text": "Expensive Pixels",
						"color": "@myWhite",
						"fontWeight": "900",
						"width": "50vw",
						"height": "100vh",
						"fontSize": "20vh",
						"paddingLeft": "5vw",
						"textAlignVertical": "center"
					},
					{
						"type": "Image",
						"source": "${coinIcon}",
						"width": "30vw"
					},
					{
						"type": "Text",
						"text": "${coinCount}"
					}
				]
			},
			{
				"when": "${viewport.shape != 'round'}",
				"type": "Container",
				"direction": "row",
				"width": "100vw",
				"height": "100vh",
				"items": [
					{
						"type": "Text",
						"text": "Expensive Pixels",
						"color": "@myWhite",
						"fontWeight": "900",
						"width": "50vw",
						"height": "100vh",
						"fontSize": "20vh",
						"paddingLeft": "5vw",
						"textAlignVertical": "center"
					},
					{
						"type": "Image",
						"source": "${coinIcon}",
						"width": "30vw"
					},
					{
						"type": "Text",
						"text": "${coinCount}"
					}
				]
			},
			{
				"type": "Container",
				"direction": "row",
				"paddingLeft": 20,
				"items": [
					{
						"type": "Text",
						"text": "${coinCount}"
					},
					{
						"type": "Image",
						"source": "${coinCount}",
						"width": "20vw"
					}
				]
			}
		]
	}
};

module.exports = {
	"type": "APL",
	"version": "1.0",
	"theme": "dark",
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
		"items": [
			{
				"type": "Dashboard",
				"title": "${payload.coinCount}",
				"logo": "${payload.coinIcon}"
			}
		]
	},
	"layouts": {
		dashboard,
	}
}


/*

{
    "coinCount": 100,
    "coinIcon": "https://s3-eu-west-1.amazonaws.com/vivid-renders/test/coins.png"
}

*/