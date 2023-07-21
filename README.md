# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## release/first-steps

### feature/initial-configuration commands

Install mui

- npm install @mui/icons-material
- npm install @fontsource/roboto

Redux toolkit

- npm install @reduxjs/toolkit
- npm install --save @types/react-redux

React router dom

- npm install react-router-dom@6

Axios

- npm install axios

Lodash

- npm i --save lodash
- npm i --save-dev @types/lodash

Prettier

- npm i prettier

Code Linter

- npm install eslint --save-dev
- npx eslint --init and write y
- npm i -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript
- npm i -D prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks

Husky

- npm install husky --save-dev
- npm run husky-install after setup this line en package.json as "husky-install": "husky install"
- npx husky add .husky/pre-commit "npm run test" to create hook

Notistack

- npm i notistack

For unit tests Mockery

- npm i ts-mockery

# Style code write conventions React:

https://google.github.io/styleguide/jsguide.html#features-objects-enums

### Files names

-Components Directory
components/Navbar/Navbar.tsx
components/Navbar/Navbar.test.tsx

- Components State
  components/Navbar/hooks/use-navbar.tsx
  components/Navbar/hooks/use-navbar.test.tsx
- Other files
  src/shared/enums/routes-enum.ts
  src/shared/constants/app-routes.ts
  src/shared/interfaces/global-interface.ts

for folders from entire project use only kebab-case
for folders in components use UpperCase

### Constants

constans from component should go in route
src/shared/constants/components/test.ts

all other constants should go in route
src/shared/constants/api-routes.ts

- Global constants /document constants
  const API_PATH= "some/path"
  export const PATHS ={
  One="one"
  Two="two"
  Three= (hi:string)=>hi
  }
- in function constants
  const merchantID="hola" // o es constant merchant_id="hola"
  const merchantID=getMerchantID()

### Enums

Component Enums to use like labels or other enum values from component should go in route like
src/shared/enums/header-enum.ts

other enums should be like
src/shared/enums/countries-enum.ts or just countries

enum convention

export enum Countries {
Brazil = "Brazil",
Chile ="Chile",
UnitedStates = "Estados unidos"
}

export enum LogLevel {
ERROR,
WARN,
INFO,
DEBUG,
}

### Fuctions

function getMerchantID(){}
const getMerchanID=()=>{}

### interfaces

Interfaces for components from Props and hooks should go in route
src/shared/interfaces/components/tab-panel.interface.ts

Other interfaces should go in
src/shared/interfaces/test-test.interface.ts
