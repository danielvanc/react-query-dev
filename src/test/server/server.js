import { rest } from "msw";
import { setupServer } from "msw/node";

const apiUrl = "http://localhost:5000/api/glossary";

const handlers = [
  rest.get(`${apiUrl}/`, async (req, res, ctx) => {
    const url = window.location.href;

    // Not ideal but couldn't spend the time to get MSW to correctly
    // work with this rest setup.
    // Usually req.url.searchParams.get("search") is the solution
    const isSearch = url.includes("search");

    // Resolve based on query given
    if (isSearch) {
      return res(
        ctx.json([
          {
            id: "851114",
            title: "React is awesome!",
            description: "some text",
            caseSensitive: false,
            translatable: false,
            forbidden: false,
            createdAt: "2021-06-11T15:01:56+02:00",
            createdBy: {
              id: "111884",
              fullName: "Jane Doe",
            },
          },
        ])
      );
    }

    return res(
      ctx.json([
        {
          id: "851112",
          title: "Google",
          description: "some text",
          caseSensitive: false,
          translatable: false,
          forbidden: false,
          createdAt: "2021-06-11T15:01:56+02:00",
          createdBy: {
            id: "111884",
            fullName: "Jane Doe",
          },
        },
        {
          id: "851113",
          title: "Microsoft",
          description: "some text",
          caseSensitive: false,
          translatable: false,
          forbidden: false,
          createdAt: "2021-06-11T15:01:56+02:00",
          createdBy: {
            id: "111884",
            fullName: "Jane Doe",
          },
        },
      ])
    );
  }),

  // rest.get(`${apiUrl}/?search`, async (req, res, ctx) => {

  // }),
];

const server = setupServer(...handlers);

export * from "msw";
export { server };
