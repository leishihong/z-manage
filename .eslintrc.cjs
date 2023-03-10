module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
		"prettier",
	],
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	parser: "@typescript-eslint/parser",
	plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
	settings: {
		react: {
			version: "18.2.0",
		},
		"import/resolver": {
			node: {
				paths: ["src"],
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	globals: {
		chrome: "readonly",
	},
	rules: {
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off", // 使用 jsx 时不需要引用 React
		"prefer-const": "warn",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["off"],
		"@typescript-eslint/no-explicit-any": ["off"],
		"react-hooks/rules-of-hooks": "off",
		"react-hooks/exhaustive-deps": ["off"],
		"react/display-name": "off",
		// 方法前是否要一个空格 always: 总是要
		"space-before-function-paren": [0, "never"],
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-this-alias": "off",
		"@typescript-eslint/no-var-requires": "off",
		"no-empty": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": ["off"],
		"react/no-children-prop": "off",
		"react/no-string-refs": "off",
		/* 强制使用一致的反勾号、双引号或单引号 */
		// quotes: [
		// 	1,
		// 	"single",
		// 	{
		// 		avoidEscape: true,
		// 		allowTemplateLiterals: true,
		// 	},
		// ],
		quotes: [2, "single", "avoid-escape"], // 要求统一使用单引号符号
		// quotes: [1, "single"], // 使用单引号
		"prettier/prettier": ["off", { singleQuote: true }],
		"react/jsx-no-undef": "off",
		"react/prop-types": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		// "no-unused-vars": 0,
		// "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }]
	},
};
