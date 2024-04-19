# famly

This README contains the setup instructions as well as some of the design decisions for the frontend and backend assignments.

# Structure

The assignments are in their respective folders `frontend` and `backend` and are separate `npm` projects. The following section will explain how to get each of the projects running locally on your machine. Sections after that will explain some design decision for the respective assignments.

# Getting started

Note: Both of the projects were tested with `node 18.17.1` and `npm 9.6.7`, any other `node/npm` versions might not work correctly.
First, clone the repository onto your local machine.

## Frontend

Navigate into the `frontend` folder

```bash
cd frontend
```

Create a new `.env` file using the command below and fill in the environment variables

```bash
cp .env.example .env
```

Install npm packages

```bash
npm install
```

Run the project

```bash
npm run dev
```

## Backend

Navigate into the `backend` folder

```bash
cd backend
```

Install npm packages

```bash
npm install
```

Run the project

```bash
npm start
```

Additional commands

```bash
# Start development server
npm run dev

# Run tests
npm test
```

# Design choices, notes, ...

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

### SQL Queries

1. All messages in any `conversation` sent by the user with user ID `4`

```
SELECT `id`, `userId`, `conversationId`, `txt` FROM `message` WHERE `message`.`userId` = 4
```

2. All messages in `conversation` where users 1 and 3 are participating (other users  
   could also be participating)

```
SELECT *
FROM `message`
WHERE `conversationId` IN (
	-- Select conversation ids where userId `1` and `3` are participating
	SELECT `id`
	FROM `conversation`
	WHERE `userId` = 1
		AND `id` IN (
			SELECT `id`
			FROM `conversation`
			WHERE `userId` = 3
		)
);
```

3. All messages in any `conversation` where the message contents include the word  
   "cake"

```
SELECT * FROM `message` WHERE `txt` LIKE '%cake%'
```

### Design choices

- `express` - a lightweight NodeJS server
- `jest` - testing framework
- `nanoid` - for generating random ids for children

### Structure

The assignment is set up as a web server that responds to requests. It can be interacted with through the browser - that's why every endpoint only responds to GET requests. The server is listening on `localhost:3000`

- `src/index.js` is the application endpoint, it's where the `express` server is started
- `src/lib`
  - `children.js` contains the assignment methods and `findChild` - a utility method
  - `children.test.js` contains several tests
- `src/utils` contains a few utility functions

#### Endpoints

- `/` - lists all children
- `/<child-id>` - lists a single child
- `/<child-id>/checkin` - checks in a child (timestamped), then redirects back to `/<child-id>`
- `/<child-id>/checkout` - checks out a child (timestamped), then redirects back to `/<child-id>`
- `/checked-in` lists children that are currently checked in (and not checked out yet)
- `/checked-in-for/<hours>` lists children that were checked in _today_ for `<hours>`, it only lists children that are already checked out
