Important files:

#### src/store/useMedicationState.js

This file contains a React hook that is used in multiple places throughout the application where a medication object is being dealt with. It contains core logic for updating the immutable medication state.

#### src/store/useAuth.js

This file contains a React hook that contains the core authentication business logic of the application. It is used to control whether or not the user is signed in/out and how to validate a users JWT auth token.

#### src/screens/AddMedication

The folder contains four views (or screens if you prefer) and one navigation component that is displayed to the user when they add a medication. The views are made up of many different components that live in the `src/components` directory. The views are meant to be visited in a certain order during the add medication process.

#### src/routes/Main.js

The file contains the route definitions for the main portion of the application. This includes the edit screens, add medication screens and the notification screen.

#### src/components/DosageMultiSelect.js

The file contains the component defintion for when the user can select between multiple dosages in the add medication and edit medication screens. The purpose of the component is to be able to select between multiple dosage times. The component contains logic to be able to render different time pickers on both iOS and Android devices.
