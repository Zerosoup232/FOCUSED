
FOCUSED: A Productivity System for ADHD Users
=============================================

This is a complete step-by-step guide to launching and running the FOCUSED system, including the backend, frontend, and browser extension.

------------------------------------------------------------
1. PROJECT STRUCTURE
------------------------------------------------------------

focused-app/
├── backend/             -> Node.js Express backend (API & timer logic)
├── frontend/            -> React frontend (Login, Timer UI, /blocked page)
├── focused-extension/   -> Chrome Extension for distraction blocking

------------------------------------------------------------
2. SETTING UP THE BACKEND (API SERVER)
------------------------------------------------------------

Step 1: Open Terminal or CMD.
Step 2: Navigate to the backend folder.
        cd focused-app/backend
Step 3: Install dependencies.
        npm install
Step 4: Make sure MongoDB is running at: mongodb://localhost:27017
Step 5: Start the backend server.
        npm run dev

The backend runs on: http://localhost:5000

------------------------------------------------------------
3. SETTING UP THE FRONTEND (REACT UI)
------------------------------------------------------------

Step 1: Open a new terminal window.
Step 2: Navigate to the frontend folder.
        cd focused-app/frontend
Step 3: Install dependencies.
        npm install
Step 4: Start the React development server.
        npm start

The frontend runs on: http://localhost:3000

Available Pages:
  - http://localhost:3000/login
  - http://localhost:3000/signup
  - http://localhost:3000/blocked (shown during distraction attempts)

------------------------------------------------------------
4. SETTING UP THE CHROME EXTENSION
------------------------------------------------------------

Step 1: Open Google Chrome and go to:
        chrome://extensions
Step 2: Enable "Developer Mode" (top right)
Step 3: Click "Load Unpacked"
Step 4: Select the folder: focused-app/focused-extension

Files required inside focused-extension:
  - manifest.json
  - popup.html
  - popup.js
  - rules.json
  - icon.png

------------------------------------------------------------
5. USING THE EXTENSION (FOCUS & BLOCKING)
------------------------------------------------------------

Step 1: Click the FOCUSED extension icon.
Step 2: Set a duration (e.g. 25 minutes) and click START.
Step 3: Timer will run and selected sites will be blocked.
Step 4: After time ends, sites are automatically unblocked.
Step 5: You can stop the timer early by clicking STOP.

Manual Blocking Features:
  - Add any site to block using input field.
  - Use "Block All" to block every site.
  - Use "Unblock All" to clear the block list.

------------------------------------------------------------
6. TROUBLESHOOTING
------------------------------------------------------------

> MongoDB Connection Error?
  - Make sure MongoDB is installed and running.
  - Default URI: mongodb://localhost:27017

> Extension not blocking sites?
  - Ensure focus timer is ACTIVE.
  - Blocking is only enabled during a focus session.

> Custom /blocked page not showing?
  - Confirm the frontend has a route: /blocked
  - URL: http://localhost:3000/blocked

------------------------------------------------------------
7. API TESTING (Optional with Postman)
------------------------------------------------------------

Start Focus:     POST http://localhost:5000/api/start-focus
End Focus:       POST http://localhost:5000/api/end-focus
Check Status:    GET  http://localhost:5000/api/focus-status


------------------------------------------------------------
END OF README
------------------------------------------------------------
