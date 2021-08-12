# An example using tiles and search using react-query for  caching

### 🛠 Tech stack:

- Create React App with TypeScript template enabled
- [Emotion](https://emotion.sh/) (for styling)
- [React Query](https://react-query.tanstack.com/) and dev tools (for quering and caching)
- [MSW](https://mswjs.io/) (for mocking api server requests)
- [Reach](https://reach.tech/): tabs and tooltips
- React [Moment](https://www.npmjs.com/search?q=react%20moment)
- Jest and React Testing library

### ✅ Setup
- insure all packages are installed. `npm run install` or `npm run i`
- Enable the rest api server, run: `npm run start:server`
- Then run the project, run `npm run start`
- To view the running, head to: `http://localhost:3000`
- To run all tests, run `npm run test`, `npm test` or `npm t`

### 📝 Notes

React Query dev tools: When you're running the project in the browser,
you'll be able to see the custom dev tools set up i added by hovering
the mouse near the bottom left hand corner. It should pop up and within
it, you should be able to see all the cached queries, and other options.

TypeScript: You will for sure notice that it's not the best usage,
especially with the types used, but i'm quite new
to TS.

### 📡 Functionality

User can search glossary terms by entering text inside search field.

Glossary term cards should contain:

- title
- description
- tags
- date when a term was created
- name of a user who created a term
