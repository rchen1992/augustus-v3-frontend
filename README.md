# Augustus V3 Frontend

Written using React, Apollo, Auth0, and TypeScript.

Deployed at: https://augustus.netlify.com

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Netlify

This app is deployed on Netlify. Any pushes to `master` branch on this repo will trigger an auto-deploy.

## Auth0

This app uses Auth0 for authentication. Log in to Auth0 dashboard to manage the application. There are 2 tenants (logically isolated units that live within the same account), one for development and one for production.

## GraphQL Codegen

This repo uses `graphql-codegen` to grab the graphQL schema from the backend API and automatically generate TypeScript types. It can also generate typed React hooks for all queries and mutations. See `codegen.yml` for full config.

In order for the codegen to work, the backend API must be running, since it makes a request to the graphql endpoint in order to get the schema. You can set the endpoint in the `.env` file under `GRAPHQL_API_ENDPOINT_DEV`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
