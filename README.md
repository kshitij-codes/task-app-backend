# task-app-backend
This repository contains the backend code for the Task App application. It is built using Node.js and Express.js with TypeScript to provide API endpoints for managing tasks and User Authentication and Authorization.
## Installation
To run the Task App backend locally, follow these steps:
1. Clone the repository:
```
   git clone https://github.com/kshitij-codes/task-app-backend.git
```
2. Navigate to the project directory:
```
   cd task-app-backend
```
3. Install the dependencies:
```
     npm install
```
4. Start the development server:
```
  ts-node src/index.ts
```
or
```
  tsc && node dist/index.js
```
The Task App backend should now be running on http://localhost:5000.

## Usage
Once the Task App backend is running, the frontend can use the following API endpoints to perform CRUD (Create, Read, Update, Delete) operations on tasks:

- `GET /api/tasks`: Retrieves a list of tasks
- `POST /api/tasks`: Creates a new task
- `GET /api/tasks/:id`: Retrieves a specific task by its ID
- `PUT /api/tasks/:id`: Updates the details of a task
- `DELETE /api/tasks/:id`: Deletes a task
- `POST /api/user/login`: Logs in a user
- `POST /api/user/register`: Registers the first-time user

Make sure to set the appropriate environment variables in the `.env` file for configuration.

## Folder Structure
The folder structure of the Task App backend is as follows:

- src: Contains the main source code
   - controllers: Contains the logic for handling API requests.
   - models: Contains the data models for tasks and users.
   - routes: Contains the API route definitions.
   - utils: Contains middleware function for user authorization before request processing.
   - config: Contains database configuration file.
