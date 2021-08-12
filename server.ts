const http = require("http");

const glossary = [
  {
    id: "851112",
    title: "Tesla",
    description:
      "This is a project name and it should not be translated. You can see this, as it's been added to the Glossary.",
    caseSensitive: false,
    translatable: false,
    forbidden: false,
    createdAt: "2021-06-11T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851113",
    title: "Mercedes-Benz",
    description: "It is a German automotive brand.",
    caseSensitive: true,
    translatable: false,
    forbidden: false,
    createdAt: "2021-05-11T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851114",
    title: "VAT number",
    description:
      "An identifier used in many countries, including the countries of the European Union, for value added tax purposes",
    caseSensitive: true,
    translatable: true,
    forbidden: false,
    createdAt: "2021-05-11T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851115",
    title: "Superman",
    description:
      "This is a superhero character who first appeared in American comic books published by DC Comics.",
    caseSensitive: true,
    translatable: true,
    forbidden: true,
    createdAt: "2021-04-12T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851116",
    title: "Redux",
    description: "A Predictable State Container for JS Apps",
    caseSensitive: true,
    translatable: false,
    forbidden: false,
    createdAt: "2021-03-12T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851117",
    title: "React",
    description: "A JavaScript library for building user interfaces.",
    caseSensitive: true,
    translatable: false,
    forbidden: false,
    createdAt: "2021-02-12T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851118",
    title: "WebKit",
    description:
      "A is the web browser engine used by Safari, Mail, App Store, and many other apps on macOS, iOS, and Linux.",
    caseSensitive: true,
    translatable: false,
    forbidden: false,
    createdAt: "2021-01-12T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851119",
    title: "Prettier",
    description: "An opinionated code formatter.",
    caseSensitive: true,
    translatable: false,
    forbidden: false,
    createdAt: "2021-01-12T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
  {
    id: "851120",
    title: "Flexbox",
    description:
      "The Flexible Box Module, usually referred to as flexbox, was designed as a one-dimensional layout model, and as a method that could offer space distribution between items in an interface and powerful alignment capabilities.",
    caseSensitive: false,
    translatable: false,
    forbidden: false,
    createdAt: "2021-10-11T15:01:56+02:00",
    createdBy: { id: "111884", fullName: "Jane Doe" },
  },
];

const searchGlossaryItem =
  (searchPhrase) =>
  ({ title, description }) => {
    const lowercaseTitle = title.toLocaleLowerCase();
    const lowercaseDescription = description.toLocaleLowerCase();
    const searchWords = searchPhrase.toLocaleLowerCase().split(" ");

    const isInTitle = !!searchWords.filter((word) =>
      lowercaseTitle.includes(word)
    ).length;
    const isInDescription = !!searchWords.filter((word) =>
      lowercaseDescription.includes(word)
    ).length;

    return isInTitle || isInDescription;
  };

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET",
};

const port = 5000;

const server = http.createServer(async (req, res) => {
  const location = new URL(req.url, `http://localhost:${port}`);

  if (
    req.method === "GET" &&
    "/api/glossary" === location.pathname.replace(/\/+$/, "")
  ) {
    const searchPhrase = location.searchParams.get("search") || "";
    const searchGlossaryItemWithPhrase = searchGlossaryItem(searchPhrase);

    const response = glossary.filter(searchGlossaryItemWithPhrase);

    res.writeHead(200, { ...headers, "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404, { ...headers, "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found!" }));
  }
});

server.listen(port, () => console.log(`Server listening on port ${port}.`));
