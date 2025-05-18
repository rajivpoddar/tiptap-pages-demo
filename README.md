# TipTap Pages Demo - A Paginated Document Editor

This is a demo application showcasing a fork of the [tiptap-extension-pagination](https://github.com/rajivpoddar/tiptap-extension-pagination).

This application demonstrates a paginated document editor where content is broken into A4-sized pages, providing a user experience similar to Microsoft Word or Google Docs in page view. This particular fork of the extension enhances support for text-based documents and is intended to be used in applications like a transcription editor.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Cloning

1.  Clone the repository along with its submodules (the `tiptap-extension-pagination` is included as a submodule):
    ```bash
    git clone --recurse-submodules https://github.com/rajivpoddar/tiptap-pages-demo.git
    ```

2.  If you have already cloned the repository without the submodules, you can initialize and update them using:
    ```bash
    git submodule init
    git submodule update
    ```

3.  Navigate into the project directory:
    ```bash
    cd tiptap-pages-demo
    ```

### Installation

1.  Install NPM packages for the main application:
    ```bash
    npm install
    ```
2.  The `tiptap-extension-pagination` submodule also needs its dependencies. The development scripts (like `npm run dev:submodule` or `npm run watch:submodule`) will handle running `npm install` within the submodule automatically when they execute its build step. Alternatively, you can install them manually:
    ```bash
    cd packages/tiptap-extension-pagination
    npm install
    cd ../..
    ```

## Development Workflow

This project includes the forked `tiptap-extension-pagination` as a submodule located in the `packages/tiptap-extension-pagination` directory. When you make changes to this submodule, you need to rebuild and reinstall it for the changes to be reflected in the demo application. Here are the recommended workflows:

### Option 1: Manual Rebuild and Restart (One-off changes)

1.  **Modify the submodule:** Make your changes in the `packages/tiptap-extension-pagination` directory.
2.  **Rebuild, reinstall, and restart the demo app:** From the project root, run:
    ```bash
    npm run dev:submodule
    ```
    This command bundles several steps: it navigates to the submodule, installs its dependencies (if needed), runs its build script, returns to the project root, reinstalls the local submodule package, clears Vite's cache, and starts the Vite development server for the demo application.

    Alternatively, for more granular control:
    *   Build only the submodule: `npm run build:submodule`
    *   Reinstall the built submodule: `npm run reinstall:submodule`
    (After these, you would manually clear Vite's cache: `rm -rf node_modules/.vite` and start the server: `npm run dev`)

### Option 2: Automated Watch Mode (Continuous development)

For a more streamlined experience when actively developing the submodule, you can use a watch mode that automatically rebuilds and updates the demo application.

This requires two separate terminal sessions running concurrently in your project root (`/Users/rajiv/Downloads/projects/tiptap-pages-demo`):

*   **Terminal 1 (Submodule Watcher):**
    ```bash
    npm run watch:submodule
    ```
    This command uses `nodemon` to monitor the submodule's source files. On any change, it automatically rebuilds the submodule, reinstalls it in the main project, and clears Vite's cache.

*   **Terminal 2 (Vite Dev Server):**
    ```bash
    npm run dev
    ```
    This starts the Vite development server for the demo application. Vite will detect the changes made by the watcher in Terminal 1 and update the application in your browser.

Choose the workflow that best suits your current task. The automated watch mode is generally preferred for active submodule development.
