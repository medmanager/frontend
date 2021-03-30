<h1 align="center">Med Manager 3.0 💊</h1>
<h5 align="center">
  React Native application to run the Med Manager 3.0 app.
</h5>

## Development

**Note**: I suggest using `yarn` as it is generally faster than using `npm`. If you need to install `yarn` you can do so [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable). This installation assumes you already have Node.js installed onto your machine.

### Enviornment

To setup your enviroment for React Native development you must first follow [this](https://reactnative.dev/docs/environment-setup) in-depth guide. The guide includes instructions for both the Windows and macOS enviornments. For **macOS**, make sure your OS is up-to-date and you have XCode installed before referring to the guide.

### Installation Steps

#### Step 0: Define the backend API URL

If you haven't already, in the root of the project create a `.env` file. Inside of the file define an `API_URL` like so:

```
API_URL=http://127.0.0.1:4000
```

If running the backend on your local machine AND in an emulator, use the appropriate localhost IP addresses for the platform you are running on. If you are running on `android` then the host should be `10.0.2.2`, otherwise it should be `127.0.0.1`.

If running the backend on your local machine AND on a physical device, use your networks IP address as the host.

```
cd frontend
```

#### Step 1: Install the Dependencies

Run the following command to install the projects dependencies:

```
yarn
```

or

```
npm install
```

#### Step 2: Start the Development Server

Run the following command:

```
yarn start
```

or

```
npm run start
```

#### Step 3: Start the Simulator

To launch the iOS version of the app run the following command:

```
yarn ios
```

or

```
npm run ios
```

To launch the android version of the app run the following command:

```
yarn android
```

or

```
npm run anroid
```

To get flow working with VS Code, follow [this](https://github.com/flowtype/flow-for-vscode#setup) setup process.
