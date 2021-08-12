import "@testing-library/jest-dom/extend-expect";
import { queryCache } from "react-query";
import { server } from "./test/server/server";

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

afterEach(async () => {
  queryCache.clear();
});
