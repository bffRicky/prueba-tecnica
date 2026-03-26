# Travel Agency Dashboard

Frontend technical test built with **React**, **Redux Toolkit**, and **Material UI**. The app simulates a travel agency CMS where you can manage **travelers** and their **reservations**.
Without server and make in a few hours

## Features

- Travelers list with add / edit
- Reservations list with add / edit
- Fake API using local JSON (`/src/data/`)
- Global state management with Redux Toolkit (`/src/store/`)
- Responsive UI with Material UI
- Common layout with header + navigation

## Project Structure

```
src/
 ├─ modules/           # main app pages
 │   ├─ Dashboard/
 │   ├─ Travelers/     # travelers CRUD
 │   └─ Reservations/  # reservations CRUD
 │
 ├─ shared/            # shared assets
 │   ├─ assets/        # images, scss
 │   └─ components/    # common UI (Header, Layout, FastLinks)
 │
 ├─ data/              # fake data
 │   ├─ travelers.json
 │   ├─ reservations.json
 │   └─ fakeApi.js
 │
 ├─ store/             # Redux store
 │   └─ store.js
 │
 ├─ App.js
 └─ index.js
```

## Run locally

```bash
npm install
npm start
```

## Notes

- Backend is mocked with JSON + `fakeApi.js`.
- The app is structured for scalability, following clean modular architecture.
- Example routes: `/travelers` shows travelers list, `/reservations` shows reservations.
