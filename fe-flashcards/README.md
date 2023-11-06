# Flashcards!

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Boost your learning with AI. Works with `be-flashcards`.

## Install

```bash
npm install
```

or

```bash
yarn
```

## Run

Make sure you create a `.env` file that contains the url of the backend instance that you wish to run. Your `.env` file in this package's root has to look like:

```bash
# .env
VITE_BACKEND_URL=
```

Also remember to add the appropriate `FRONTEND_URL` env variable to this app's backend `.env` file to prevent CORS incompatibilites.

Once you've done this, simply run

```bash
npm run dev
```

or

```bash
yarn dev
```

and enjoy learning.
