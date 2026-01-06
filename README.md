# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

## NoteMind

NoteMind is a small, lightweight note-taking app built with Expo and React Native. It provides a simple local notes experience (create, edit, delete) with a minimal, themeable UI and file-based routing via `expo-router`.

This repository is intended as a compact starter for learning how to build cross-platform mobile apps with Expo and React Native while keeping state and storage simple using React Context and `AsyncStorage`.

### Key Features

- Create, edit and delete notes.
- Local persistence using `@react-native-async-storage/async-storage`.
- Light / Dark theming via a `ThemeProvider` and easy color tokens.
- File-based routing with `expo-router`.
- Small set of reusable components (header, note card, floating action button).

### Technology & Dependencies

- Expo (SDK ~54)
- React Native (~0.81)
- TypeScript
- expo-router
- @expo/vector-icons
- @react-native-async-storage/async-storage
- react-native-safe-area-context
- react-navigation (bottom tabs)

See `package.json` for the full and exact dependency versions.

### Scripts

- `npm start` — start the Expo dev server.
- `npm run android` — start on Android.
- `npm run ios` — start on iOS.
- `npm run web` — start for web.
- `npm run lint` — run ESLint.
- `npm run reset-project` — helper script from the template.

### Project structure

```
.
├─ app.json
├─ package.json
├─ tsconfig.json
├─ README.md
├─ app/                      # App routes / pages (expo-router)
│   ├─ _layout.tsx
│   ├─ index.tsx             # Home / notes list
│   ├─ addNote/
│   │   └─ index.tsx         # Add note screen
│   ├─ editNotePage/
│   │   └─ index.tsx         # Edit note screen
│   └─ setting/
│       ├─ index.tsx         # Settings screen
│       └─ privacy.tsx       # Privacy / policy screen
│
├─ assets/
│   └─ images/
│
├─ components/
│   ├─ header.tsx
│   ├─ floatingAddBtn.tsx
│   ├─ noteCard.tsx
│   ├─ optionsModel.tsx
│   └─ searchBar.tsx
│
├─ navigation/
│   └─ bottomTabs.tsx
│
├─ storage/
│   ├─ notesContext.tsx     # React Context provider for notes
│   └─ notesStorage.ts      # Sample seed notes / types
│
└─ theme/
   ├─ light.ts
   ├─ dark.ts
   └─ themeContext.tsx     # ThemeProvider + useTheme hook

```

### Storage & Data

Notes are persisted locally using `@react-native-async-storage/async-storage` under the key `@noteMind:notes`. When the app has no saved notes it seeds them from `storage/notesStorage.ts`.

`storage/notesContext.tsx` provides:

- `notes` — current notes.
- `addNote(note)` — add a note.
- `updateNote(id, patch)` — update a note.
- `deleteNote(id)` — delete a note.
- `deleteNotes(ids)` — delete multiple.

Mutations update state and persist to storage automatically.

### Theming

`theme/` contains `light.ts` and `dark.ts` tokens and a `ThemeProvider` (`theme/themeContext.tsx`). Use `useTheme()` in components to read `theme`, `mode`, and `toggle()`.

### Navigation

File-based routing is handled by `expo-router`. Bottom tabs are in `navigation/bottomTabs.tsx`. Example navigation call: `router.push('/setting/privacy')`.

### How to run

1. Install dependencies

```bash
npm install
```

2. Start the Expo dev server

```bash
npm start
```

3. Launch on emulator/device via the Expo dev tools or

```bash
npm run android
npm run ios
npm run web
```

### Development notes

- Consider adding tests and stronger error handling for persistence.
- To add a screen, create a new file/folder inside `app/` and follow the routing conventions.
- Keep UI colors in `theme/*` and prefer `useTheme()`.

### Contributing

Open issues or PRs. Keep changes small and update types when changing storage or theme shapes.

### License

No license specified. Add a `LICENSE` file if planning to open-source.
