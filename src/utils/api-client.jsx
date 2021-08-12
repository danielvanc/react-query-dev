// Usually i would store endpoint info in an .env
const API_ROOT = "http://localhost:5000/api/glossary";

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  // Allow for custom configurations to be passed in.
  // If there's data passed, automatically set it to POST
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      // "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${API_ROOT}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
