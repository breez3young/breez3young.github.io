# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## V-JEPA Policy project website

The standalone project website is maintained in `public/vjepa-policy/` and published at
https://breez3young.github.io/vjepa-policy/. Its source was imported from the local
`vjepa-policy-project-v4` project; future edits should be applied to the files in this repository.

- Edit page content in `public/vjepa-policy/index.html` and styling in `public/vjepa-policy/styles.css`.
- Images, videos, paper figures, and BibTeX live in `public/vjepa-policy/assets/`.
- The homepage and full publication list share the Project link in `src/siteData.js`.
- Use the existing single preview at http://127.0.0.1:5173/vjepa-policy/.
- From the text-version `main` branch, commit and push source changes, then run `npm run deploy`
  to build the site and publish `dist/` to the `gh-pages` branch. Pushing `main` alone does not deploy it.
