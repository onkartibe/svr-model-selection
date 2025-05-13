# Server Model Options Configurator

This project is a React application that helps users determine possible server models based on their hardware configuration preferences. Users can specify the CPU type, memory size(s), and whether they need a GPU accelerator card. The application then processes these inputs and displays the compatible server models according to a predefined set of rules.

## Features

* **Interactive Form:** A user-friendly form to input CPU, memory size(s), and GPU requirements.
* **Real-time Feedback:** Displays possible server model options or error messages based on the input.
* **Rule-Based Logic:** Utilizes specific rules to determine compatible server models.
* **Component-Based Architecture:** Built with a modular and maintainable component structure.
* **Input Validation:** Ensures that the memory size input is in the correct format and within the valid range.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **TypeScript:** A typed superset of JavaScript that enhances code maintainability and helps catch errors early.
* **React Testing Library:** For writing effective and user-centric unit and integration tests.
* **CSS Modules (Implicit):** Basic CSS styling is used, encapsulated within component files or a global `App.css`.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

    This will run the application in development mode and open it in your browser (usually at `http://localhost:3000`).

## Project Structure

├── public/
├── src/
│   ├── components/
│   │   ├── ServerForm.tsx        // Input form component
│   │   └── ServerOptions.tsx     // Output display component
|   |   └── ServerConfigurator.tsx // Root component
│   ├── utils/
│   │   └── serverUtils.ts      // Utility functions for server logic
│   ├── App.css                 // Global styles
|   └── App.test.tsx        // Unit and integration tests
│   ├── App.tsx                 // Main entry point rendering the Root component
│   ├── index.css
│   ├── index.tsx               // Entry point for React rendering
│   ├── react-app-env.d.ts
│   ├── setupTests.ts
├── .gitignore
├── README.md                   // Current file
├── package-lock.json
└── package.json

## Running Tests

    To run the unit and integration tests, use the following command:

    ```bash
    npm test
    # or
    yarn test