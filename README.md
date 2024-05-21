# Blogger

Hydraulisc Blogging Platform. Powered by NodeJS, express and a lot of wizardry (we hope, because otherwise we have no clue how it works).

# Designed for Self-Hosting

## Simple Self-Hosting Guide
Can probably be setup in under a minute.

1. Clone the repo
2. Link your Firebase Database in your own `firebase_env.json`. If you leave the file at root it'll likely work first try.
3. Secure your databse with Firestore Rules. _Google that one..._
4. Open the folder in a terminal.
5. `npm i` to install everything.
6. Start the process with `npm run dev` if you want to customise it, or use `npm run live` if you just want the live version.

# !! Public Hosting Warning !!

**Beware that this code _is NOT_ intended to be hosted as-is publicly!**

To host this project in a public manner we suggest you look into making a solid Auth Header Token Regeneration (and Separation) System that can separate users (because this code does not) and manage `sessionExpiry` (which this code, once again, does not).

### TL;DR:

- This code is extremely buggy and written "on the fly".
- If you host this publicly and log in (without modifying the code), anyone who connects to your instance will instantly be logged in _as **you**_.
- Code is provided as-is without any kind of warranty or liability.
- This was created for the simple reason of making Firebase Firestore Blogging easier (for us at [Hydraulisc](https://about.hydraulisc.net)).
