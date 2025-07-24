# Soccer Match Finder Prototype

This repository contains a simple prototype for an application that helps players organize and join casual soccer matches. The project is implemented using static HTML, CSS, and a small amount of JavaScript.

## Pages
- **index.html** – Main page with search and filter controls. Displays an empty state encouraging creation of the first match.
- **create-match.html** – Form for creating a new match with title, location, players, and notes fields.
- **login.html** – Basic login form with email/password fields and a placeholder link for Google sign‑in.
- **signup.html** – Sign‑up form requesting name, email, and password confirmation.
- **settings.html** – Shows user information and allows switching between light and dark themes. Includes placeholder export/import buttons.

Styles are defined in **style.css**, and **script.js** contains a simple theme toggle along with placeholder match creation logic.

### Testing page flow
Each page includes a navigation bar linking to the other pages. A **Test Flow** button cycles through the pages automatically so you can verify navigation works. Click the button on any page (or append `?flow=1` to the URL) to start the cycle.

## Usage
Open any of the HTML files in your web browser. All functionality is client‑side only and does not include real authentication or persistent storage. This prototype is intended for demonstration and experimentation purposes.
