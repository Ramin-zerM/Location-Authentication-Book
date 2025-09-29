##  Create a new Expo project
      npx create-expo-app@latest local-authentication --template blank-typescript

##  Install expo-local-authentication
       npx expo install expo-local-authentication

##  🔐 Authentication

Supports Biometric Authentication (Face ID, Touch ID, Fingerprint) via expo-local-authentication.

Ensures secure access before using the app.

Includes Sign Up / Sign In with Email + Password.

Stores user token in AsyncStorage to authenticate API requests.

##  📚 Book Management (CRUD)

Create → Add a new book (Title, Author, Genre, Year, Price).

Read → View a list of all books fetched from the backend API.

Update → Edit book details and save changes.

Delete → Remove a book from the system.
