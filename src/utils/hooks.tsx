import React from "react";
import { useQuery, queryCache } from "react-query";
import { client } from "utils/api-client";
import { TermData, ReturnedData } from "types";

// Useful to load a default data object while cards are loading
const loadingCards = {
  title: "loading....",
};

const cardQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

// Create a cache config and relevant key for react-query and
// create it's own cache entry
function getGlossarySearchConfig(query: string = ""): object {
  return {
    queryKey: ["cardSearch", { query }],
    queryFn: () =>
      client(`?search=${encodeURIComponent(query)}`).then((data) => data),
    config: {
      // If successsfully retrieved data, write to cache (if indifferent)
      onSuccess(cards: Array<TermData>) {
        for (const card of cards) {
          queryCache.setQueryData(
            ["card", { tileId: card.id }],
            card,
            cardQueryConfig
          );
        }
      },
    },
  };
}

export function useGlossarySearch(query: string): ReturnedData {
  const result = useQuery(getGlossarySearchConfig(query));

  return { ...result, terms: result.data ?? loadingCards };
}

// Attempt to retrieve from cache if already exists
// but remove existing queries first.
export function useRefetchGlossarySearchQuery() {
  return React.useCallback(async function refetchGlossarySearchQuery() {
    queryCache.removeQueries("cardSearch");
    await queryCache.prefetchQuery(getGlossarySearchConfig());
  }, []);
}
