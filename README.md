# Blogger

Hydraulisc Blog Writing Suite. Powered by NodeJS, express and a lot of wizardry (we hope, because otherwise we have no clue how it works).

# Designed for Self-Hosting <sup>([guide](https://github.com/Hydraulisc/blogger?tab=readme-ov-file#simple-self-hosting-guide))</sup>

## Code Structure

**BEWARE** that the code structure is **_chaotic_** by design.

**ADDITIONALLY** we have _not_ seperated routes from the main server file. Once again, this is intentional. Undercomplicated, low-level documented code.

Still, here's a simple code structure:
- Root Folder
- - server.js
- - firebase_env.json
- - views (contains the frontend code separated into pages and partials)
- - public (contains site logo(s))

And _yes_, it's entirely inline CSS.

## Simple Self-Hosting Guide
Can probably be set up in under a minute.

1. Clone the repo
2. Link your Firebase Database in your own `firebase_env.json`. If you leave the file at root it'll likely work first try.
3. Secure your database with [Firestore Rules](https://firebase.google.com/docs/rules).
4. Open the folder in a terminal.
5. `npm i` to install everything.
6. Start the process with `npm run dev` if you want to customise it, or use `npm run live` if you just want the live version.

# ⚠️ Public Hosting Warning ⚠️

This code is **NOT** intended to be hosted publicly without changes!

To host this project safely in a public environment, we recommend implementing a solid Auth Header Token Regeneration and Separation System to properly separate users (this code does not) and manage session expiry (again, this code does not).

### TL;DR:

- This code is extremely buggy and written "on the fly".
- If you host this publicly and log in (without modifying the code), anyone who connects to your instance will instantly be logged in _as **you**_.
- Code is provided as-is without any kind of warranty or liability.
- This was created for the simple reason of making Firebase Firestore Blogging easier (for us at [Hydraulisc](https://about.hydraulisc.net)).
