# Test

There are multiple ways you can write tests with Novel. Small unit and integration tests
that do not require traversing a browser can be written as vitest tests and created with a
`*.test.ts` file name convention.

Learn more about [Component Tests](https://docs.novel.dev/guides/component-tests).

Browser tests can be created by naming the file `*.spec.ts` and using playwright to interact.

Playwright tests require the Dev server to be turned on before running. In the future, this
will not be required.

Learn more about [Playwright Tests](https://docs.novel.dev/guides/playwright-tests).
