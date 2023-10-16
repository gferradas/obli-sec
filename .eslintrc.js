module.exports = {
	"env": {
		"commonjs": true,
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"no-unused-vars": [
			"warn"
		],
		"no-duplicate-imports": ["error", { "includeExports": true }],
		"camelcase": ["error", { "properties": "always" }],
		"eqeqeq": ["error", "always"],
		"init-declarations": ["error", "always"],
		"no-else-return": ["error", { "allowElseIf": false }],
		"arrow-spacing": ["error", { "before": true, "after": true }],
	}
};
