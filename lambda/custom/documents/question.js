const resources = [
	{
		"description": "Colors",
		"colors": {
			"myWhite": "#FFFFFF",
			"myLightPink": "#FBC6AD",
			"myPink": "#F6008D",
			"myRed": "#F6001A",
			"myDarkRed": "#B70010",
			"myLightOrange": "#FBC26C",
			"myOrange": "#F88225",
			"myDarkOrange": "#F74A1E",
			"myYellow": "#FBC531",
			"myLightGreen": "#C3D9A6",
			"myGreen": "#8EB854",
			"myDarkGreen": "#2F5C18",
			"myLightBlue": "#CCF0F6",
			"myBlue": "#38B7FC",
			"myDarkBlue": "#2682C6",
			"myPurple": "#1F22A7",
			"myDarkPurple": "#1E1971"
		}
	}
];

const imports = [
	{
		"name": "alexa-viewport-profiles",
		"version": "1.0.0"
	},
	{
		"name": "alexa-layouts",
		"version": "1.0.0"
	},
	{
		"name": "alexa-styles",
		"version": "1.0.0"
	}
]; 

const logo = {
	"parameters": [
		"size"
	],
	"items": [
		{
			"type": "Container",
			"width": "100vw",
			"height": "${size}vw",
			"direction": "column",
			"items": [
				{
					"type": "Container",
					"width": "100vw",
					"height": "${size}vw",
					"justifyContent": "center",
					"direction": "row",
					"items": [
						{
							"type": "Frame",
							"width": "${size}vw",
							"height": "${size}vw",
							"grow": 1,
							"shrink": 1,
							"backgroundColor": "@myDarkRed",
							"items": {
								"type": "Text",
								"text": "EXPENSIVE PIXELS",
								"color": "@myWhite",
								"fontSize": "${size}vw",
								"fontWeight": "600",
								"textAlign": "center"
							}
						}
					]
				}
			]
		}
	]
};

const pixel = {
	"parameters": [
		"premium",
		"size",
		"color"
	],
	"type": "Container",
	"width": "${size}vw",
	"height": "${size}vw",
	"direction": "column",
	"items": [
		{
			"type": "Frame",
			"width": "${size}vw",
			"height": "${size}vw",
			"backgroundColor": "${color}",
			"borderColor": "#FFFFFF",
			"borderWidth": "2dp"
		}
	]
}

const main = {
	"type": "APL",
	"version": "1.0",
	"import": imports,
	"resources": resources,
	"layouts": {
		"Logo": logo,
		"Pixel": pixel,
	},
	"mainTemplate": {
		"parameters": [
			"datasource"
		],
		"item": [
			{
				"type": "Container",
				"width": "100vw",
				"height": "100vh",
				"direction": "row",
				"alignItems": "center",
				"justifyContent": "center",
				"items": [
					{
						"type": "Frame",
						"width": "100vw",
						"height": "100vh",
						"position": "absolute",
						"backgroundColor": "@myWhite"
					},
					{
						"when": "${ @viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeLarge || @viewportProfile == @tvLandscapeXLarge}",
						"type": "Logo",
						"size": 4,
						"position": "absolute",
						"top": "0vh"
					},
					getPixelCount(amountOfPixels)
				]
			}
		]
	}
}


module.exports = main;

