import { render, screen } from "test/test-utils";
import App from "../App";

test("check basic elements render on page", async () => {
  await render(<App />);

  expect(
    screen.getByRole("searchbox", { type: /search/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { type: /submit/i })).toBeInTheDocument();

  expect(screen.getAllByRole("article"));

  expect(screen.getAllByRole("article")).toHaveLength(2);
});

test("renders all terms from the glossary when no query provided", async () => {
  // Render is a custom wrapper around RTL's render().
  // Doing this, allows passing in extra options such as the query term
  // and also has 'waitForLoadingToFinish' built in.
  await render(<App />);

  expect(screen.getAllByRole("banner")).toHaveLength(2);

  expect(screen.getAllByRole("banner")).toMatchInlineSnapshot(`
    Array [
      <header>
        <h2>
          Google
        </h2>
      </header>,
      <header>
        <h2>
          Microsoft
        </h2>
      </header>,
    ]
  `);
});

test("renders terms based on search given", async () => {
  const query = "React";
  const regTerm = /react/gim;
  await render(<App />, { query });

  expect(screen.getByRole("banner")).toBeInTheDocument();

  expect(screen.getByRole("banner")).toHaveTextContent(regTerm);

  expect(screen.getAllByRole("banner")).toHaveLength(1);

  expect(screen.getAllByRole("banner")).toMatchInlineSnapshot(`
    Array [
      <header>
        <h2>
          React is awesome!
        </h2>
      </header>,
    ]
  `);
});

test.todo("renders message stating no results found, if query returns 0");
