# Nextjs replicate segfault

When upgrading from version 11 -> 12, our jest unit tests ran into a segfault raised with no other changes.

This repository shows 5 scenarios:

1. [✓] jest unit test with version 11 without a `next.config.js`
2. [✓] jest unit test with version 11 with a `next.config.js`
3. [✓] jest unit test with version 12 without a `next.config.js`
4. [x] jest unit test with version 12 with a `next.config.js`
5. [✓] jest unit test with version 12 with a `next.config.js` with custom server options `conf: require('next.config')`
6. [x] jest unit test with version canary with a `next.config.js`

It seems there is an issue resolving next.config.js in the latest version that is causing the jest tests to exit before completing

```
error Command failed with signal "SIGSEGV".
```

## Setup

To replicate each scenario:

1. navigate the terminal into the scenario folder
   - `cd 01-next-11-no-config-success`
2. install dependencies
   - `npm i`
3. build next application
   - `npm run build`
4. run unit tests
   - `npm test`
