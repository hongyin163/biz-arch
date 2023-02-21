
const presets = [	
	["@babel/preset-env",{
		targets:{
			browsers:'last 2 versions,ie >= 9'
		},
		modules:false,
	}],
	"@babel/preset-react",
	"@babel/preset-typescript",
];
const plugins = [
	[
		"@babel/plugin-transform-runtime",
		{
			"absoluteRuntime": false,
			"corejs": false,
			"helpers": true,
			"regenerator": true,
			"useESModules": false
		}
	],
	"@babel/plugin-transform-async-to-generator",
	"@babel/plugin-proposal-class-properties",
	"babel-plugin-transform-es3-member-expression-literals",
	"babel-plugin-transform-es3-property-literals"
];

module.exports = {
	presets,
	plugins
};
