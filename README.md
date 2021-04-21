<h1 align="center">Med Manager 3.0 💊</h1>
<h5 align="center">
  React Native application to run the Med Manager 3.0 app.
</h5>

## Things to Keep in Mind

This project was bootstrapped using a bare React Native template via the React Native CLI. This means that we **did not** use an all-in-one development kit like Expo. If you are looking at guides on the React Native documentation website, please follow the ones listed under `React Native CLI`, `bare React Native` or some other variation.

## Install Guide

### Pre-requisites

The pre-requisites for setting up a react-native environment are outlined in detail on the official react-native website. However, we also outline below a list of software that you should install before looking at the official enviornment setup guide.

#### (iOS) Register for an Apple Development Account

In order to build for iOS, you first need to regster for an [Apple Developer Account](https://developer.apple.com/). To enable iOS notification support and/or distribute the application to the app store User will also need an account that is enrolled in the [Apple Developer Program](https://developer.apple.com/programs/) which has a 99 USD annual fee.

#### (iOS) Install XCode

You can download and install XCode for macOS [here](https://apps.apple.com/us/app/xcode/id497799835?mt=12).

#### (Android) Install Android Studio

You can download and install Android Studio for both macOS and Windows [here](https://developer.android.com/studio).

#### Install Git

You can download and install git for both macOS and Windows [here](https://git-scm.com/downloads).

#### Install Node.js

You can download and install Node.js for both macOS and Windows [here](https://nodejs.org/en/download/).

(Optional) Download and install _yarn_ [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable).

#### Enviornment

To setup your enviroment for React Native you must follow [this](https://reactnative.dev/docs/environment-setup) official in-depth guide. The guide has options for selecting your machines operating system and the device operating system you want to run the application on. Please follow all of the previous steps before referring to the guide.

### Download Instructions

To download the frontend repository, execute the following command in a folder called `medmanager` on your machine:

```
git clone https://github.com/medmanager/frontend.git
```

### Define Environment Variables

If you haven't already, in the root of the project create a `.env` file. Inside of the file define an `API_URL` like so:

```
API_URL=http://127.0.0.1:4000
```

If running the backend on your local machine AND in an emulator, use the appropriate local host IP address for the platform you are running on. If you are running on `android` then the host should be `10.0.2.2`, otherwise it should be `127.0.0.1`.

If running the backend on your local machine AND on a physical device, use your networks IP address as the host.

### Install the Dependencies

Run the following command to install the projects dependencies:

```
yarn
```

or

```
npm install
```

After this command is done executing, a new folder named `node_modules` should appear at the root of the directory.

A list of dependencies for the project can be found in the `package.json` file in this repository.

### Build and Run Instructions for a Physical Device

First, plug in the device you want to build to via USB to your machine. Next, follow the instructions below for your devices operating system. If you cannot get the project to build to your device, please refer to the official [guide](https://reactnative.dev/docs/running-on-device) and select your devices operating system.

#### Android

To generate and run a release build for android, execute the following command:

```
yarn build:android
```

or

```
npm run build:android
```

The app should then build to your device using the connected USB cable.

#### iOS

1. Open the project in Xcode by navigating to the ios folder located in the root of the repository, then open the .xcodeproj file.
2. Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown.
3. Determine whether you want to build the app for release or development. For development, we recommend that the application is built using the debug build configuration so that changes can be made without having to build the app again. To configure this setting in Xcode, select the `Product -> Scheme -> Edit Scheme...` menu item. Select the `Run` Scheme and configure the `Build Configuration` item to be either `Release` or `Debug`.
4. If everything is set up correctly, your device will be listed as the build target in the Xcode toolbar, and it will also appear in the Devices pane. You can now press the build and run button.

### Build and Run Instructions for Simulator

#### iOS

**Note**: In order to run the iOS simulator, you must first have Xcode installed and have a valid [Apple Developer Account](https://developer.apple.com/) outlined in previous steps.

To launch the iOS simulator, run the following command:

```
yarn ios
```

or

```
npm run ios
```

#### Android

To launch the android simulator, run the following command:

```
yarn android
```

or

```
npm run anroid
```

### Publishing to the the App Store or Google Play Store

For iOS, please refer to the [official guide](https://reactnative.dev/docs/publishing-to-app-store).

For Android, please refer the [official guide](https://reactnative.dev/docs/signed-apk-android).

### Troubleshooting

TODO: write troubleshooting steps

## Release Notes

### v1.0

#### Features

- Users are able to register and login when they initially launch the application
- Ability to add a medication with a pre-defined frequency or a custom frequency and select up to four dosage times. Reminders for the dosages can be disabled or enabled on a per-dosage basis.
- Ability to update previously added medications by changing their info or updating the scheduled doages times and their frequency.
- The initial screen presented to the user displays all the medication dosage occurrences for the current day in a list. User can then select each one to take the dose or view more information about the medication.
- A screen will automatically pop up when the user needs to take their medications by being in the app or by clicking on it's notification. The screen will contain the medications they need to take that they can then mark as taken.
- User can now see a tab which contains all of their active medications compliance data that they can show their doctors whenever they have their next appointment.
- User can see a tab which contains a list of all their active and inactive medications. Users can also click on each medication in the list to view more information about that medication.
- User can now see a tab which contains their settings. From this view they will be able to see the first and last name captured during the registration process. Updates to the settings will be automatically persisted.
- User can now see an option in the settings to update their account information. These fields include: first name, last name, and email associated with the account.
- User can now configure settings that control how they receive medication dosage reminders. These include: a setting which disables all notifications, and a setting which hides medication names in the reminder for privacy concerns.
- User can now configure settings that control whether a caregiver contact will receive alerts when they do not take a medication within a certain time window. The settings include the name and phone number of the caregiver.

#### Fixes

- Medication autocomplete styles are not longer inconsitent with what is shown on iOS. Both operating systems now display the same thing!
- Date time picker styles are now consistent with both iOS and Android.

#### Known Bugs and Defects

- There is no way of resetting a users password.
- There is no way of updating the amount of medication remaining.
- There is no alert displayed when a medication has no amount remaining.
- The tracking screen should contain information on the meaning of the percentages displayed in case the user gets confused.
- The default horizontal margin of the tracking bar is larger than it should be and overlaps with the names of the medications. This is a minor problem since most users will not have 0% compliance, but is still an edge case that will need to be corrected.
- The fatal error screen is unstyled and did not have designs made for it.
- The loading screen is unstyled and did not have designs made for it.
- There are some dependencies listed in `package.json` that are not used anywhere in the application.
- There are likely options that are missing for the medication amount units found in `src/utils/constants.js`.
- The autocomplete input can sometimes be slow and sluggish.
- There is no error recovery when an authentication token becomes invalid.
