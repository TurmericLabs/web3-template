# Turmeric Template

This template provides a minimal setup to get Foundry woriking with Vite and React. It includes:

- React working in Vite with HMR and some ESLint rules.
- A basic setup for TypeScript.
- Chackra UI for styling.
- WAGMI and Rainbow Kit libraries for interacting with the wallet.


## Prerequisites

- [Bun](https://bun.sh/) - A fast all-in-one Javascript/Typescript runtime.
- [Foundry](https://getfoundry.sh/) - Modular toolkit for Ethereum application development.

## Getting Started

1. Clone this repository and `cd` into it
2. Install dependencies with `bun install`
3. Start the development chain and hot-reload frontend with `bun dev`
4. Optional: `bun send-eth <your-address>` to send 1 ETH to your account in the development chain
5. Open `http://localhost:3000` in your browser and connect to the wallet

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
