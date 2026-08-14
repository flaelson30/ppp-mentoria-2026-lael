Cypress E2E tests for the API

Setup:
1. Install dev dependency:

```bash
npm install --save-dev cypress
```

2. (Optional) Install `jq` for nicer CLI JSON parsing when using examples.

Run tests:

- Open interactive Cypress UI:

```bash
npm run cypress:open
```

- Run headless (CI):

```bash
npm run cypress:run
```

Notes:
- Ensure the API server is running on http://localhost:3000 before running the tests.
- Tests use the built-in users `admin/adminpass` and `seller/sellerpass`.
- Tests modify in-memory state; run them on a local development instance only.
