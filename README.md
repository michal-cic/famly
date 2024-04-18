# famly

This README contains the setup instructions as well as some of the design decisions for the frontend and backend assignments.

# Structure

The assignments are in their respective folders `frontend` and `backend` and are separate `npm` projects. The following section will explain how to get each of the projects running locally on your machine. Sections after that will explain some design decision for the respective assignments.

# Getting started

Note: Both of the projects were tested with `node 18.17.1` and `npm 9.6.7`, any other `node/npm` versions might not work correctly.
First, clone the repository onto your local machine.

## Frontend

- Navigate into the `frontend` folder

```
cd frontend
```

- Create a new `.env` file using the command below and fill in the environment variables

```
cp .env.example .env
```

- Install npm packages

```
npm install
```

- Run the project

```
npm run dev
```

## Backend

TBD

# Design choices, notes

## Frontend

### Design choices

1. `vite` (React + TS) project using `npm create vite@latest` because it's an easy way to get a minimal React and TypeScript application running and deployed quickly.
2. `axios` - for network requests, used mainly because of interceptors that allow me to add the `accessToken` to every request. Could be replaced with native `fetch`.
3. `react-query` - data fetching via hooks. Provides query invalidation, automatic retires, request cancellation, pagination (not used in this case), and many other features out of the box.
4. Using `react-hook-form` because it makes working with forms easier - validation, sane defaults, error handling...
5. `eslint` for static analysis and following code standards

### Structure

- React entrypoint in `src/main.tsx` and the root component in `src/App.tsx`
- React components in `src/components/`
- API requests grouped in `src/api/`
- Custom hooks in `src/hooks/`. Contains both hooks for API requests (`api/`) and a custom hook for pagination.
- Utility functions in `src/lib/`
- Shared types in `src/types/`

### Possible improvements

- Better error handling and reporting
- Storing pagination data in the URL
- Schema validation of API responses

## Backend

TBD
