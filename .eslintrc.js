module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'standard-with-typescript',
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                project: 'tsconfig.json'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json'
    },
    rules: {
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                'FunctionDeclaration': {
                    'parameters': 'first'
                },
                'FunctionExpression': {
                    'parameters': 'first'
                }
            }
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'semi',
                    'requireLast': true
                },
                'singleline': {
                    'delimiter': 'semi',
                    'requireLast': false
                }
            }
        ],
        '@typescript-eslint/semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/quotes': [
            'error',
            'single'
        ],
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
        '@typescript-eslint/prefer-readonly': 'off',
        'padded-blocks': ['error', { 'blocks': 'never' }],
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
    }
}
