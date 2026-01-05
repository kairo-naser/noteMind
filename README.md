# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


NoteMind/
│
├─ App.js                 # Entry point of the app
├─ app.json               # Expo config
├─ package.json           # Project dependencies
│
├─ assets/                # Static files (images, icons, fonts)
│   ├─ images/
│   ├─ icons/
│   └─ fonts/
│
├─ constants/             # App-wide constants
│   ├─ Colors.js          # Colors used in the app
│   ├─ Fonts.js           # Font sizes & families
│   └─ Layout.js          # Spacing, dimensions
│
├─ navigation/            # App navigation
│   └─ AppNavigator.js    # Stack/Tab navigator setup
│
├─ pages/                 # Your app “pages” (like website pages)
│   ├─ NotesListPage/     # Home page, list of notes
│   │   ├─ index.js       # Page entry (renders UI)
│   │   └─ styles.js      # Page-specific styles
│   │
│   ├─ EditNotePage/      # Create / Edit note page
│   │   ├─ index.js
│   │   └─ styles.js
│   │
│   ├─ SearchPage/        # Search notes
│   │   ├─ index.js
│   │   └─ styles.js
│   │
│   └─ SettingsPage/      # Settings
│       ├─ index.js
│       └─ styles.js
│
├─ components/            # Reusable UI components
│   ├─ NoteCard.js        # Small note preview card
│   ├─ Header.js          # Page header
│   ├─ FloatingButton.js  # Add button
│   └─ Input.js           # Custom input field
│
├─ storage/               # Local data management
│   └─ notesStorage.js    # CRUD logic with AsyncStorage or similar
│
└─ utils/                 # Utility/helper functions
    ├─ helpers.js
    └─ validators.js
