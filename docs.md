To ensure the project's codebase is clean and efficient, it's essential to regularly remove unused imports and declarations. This process can be done manually by going through each file and removing any unused code, or by using tools like ESLint and ts-prune to automate the process.

To set up ESLint for your project, follow these steps:

1. Install ESLint and the unused-imports plugin using npm or yarn:
   ```
   npm install eslint eslint-plugin-unused-imports --save-dev
   ```
   or
   ```
   yarn add eslint eslint-plugin-unused-imports --dev
   ```
2. Create or update your `.eslintrc.json` file to include the unused-imports plugin and rule:
   ```json
   {
     "extends": ["next", "next/core-web-vitals"],
     "rules": {
       "no-console": "error",
       "unused-imports/no-unused-imports": "warn",
       "react/no-unescaped-entities": "off"
     },
     "plugins": ["unused-imports"]
   }
   ```
3. To automatically fix lint errors, including removing unused imports, add a script to your `package.json` file:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint:fix": "eslint --fix ."
     }
   }
   ```
4. Run `npm run lint:fix` or `yarn lint:fix` to automatically remove unused imports and fix other lint errors.

By following these steps, you can ensure your project's codebase is clean, efficient, and easy to maintain.
