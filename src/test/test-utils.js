import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

async function render(ui, { query, ...renderOptions } = {}) {
  const url = new URL(window.location);

  if (query) url.searchParams.set("search", query);

  window.history.pushState({}, "App test page", url);

  const returnValue = {
    ...rtlRender(ui, {
      ...renderOptions,
    }),
  };

  // wait for react-query to settle before allowing the test to continue
  await waitForLoadingToFinish();

  return returnValue;
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByRole("img", { name: "loading" })],
    { timeout: 2000 }
  );

export * from "@testing-library/react";
export { render, rtlRender, waitForLoadingToFinish };
