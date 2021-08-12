/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import { useGlossarySearch, useRefetchGlossarySearchQuery } from "utils/hooks";
import { Spinner } from "components/lib";

import Term from "./Term";
import * as colors from "styles/colors";

import { TermData } from "types";
import SearchTermForm from "./SearchTermForm";

export default function TermGrid() {
  const [query, setQuery] = useState("");
  const [, setQueried] = React.useState(false);

  // Make a call and get data back based on empty or search query
  // along with relevant states.
  const { terms, error, isLoading, isError, isSuccess } =
    useGlossarySearch(query);

  const refetchGlossarySearchQuery = useRefetchGlossarySearchQuery();

  // Safe checking by removing queries (if attempted) prior to component
  // unmounting.
  React.useEffect((): any => {
    return () => refetchGlossarySearchQuery();
  }, [refetchGlossarySearchQuery]);

  function handleSearchClick(event: any) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <>
      <SearchTermForm handleSearch={handleSearchClick} />
      <StyledTermGrid>
        {isError && (
          <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        )}

        {isLoading && (
          <div css={{ width: "100%", margin: "auto" }}>
            <Spinner />
          </div>
        )}

        {/* 
          If response back is Success and there's data, load it.
        */}
        {isSuccess &&
          !isLoading &&
          terms.length &&
          terms.map((term: TermData) => (
            <Term data={term} key={`term-${term.id}`} />
          ))}

        {isSuccess && !terms.length && <p>Couldn't find any terms to show.</p>}
      </StyledTermGrid>
    </>
  );
}

const StyledTermGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 8px 8px;
`;
