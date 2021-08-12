/** @jsxImportSource @emotion/react */

import React from "react";
import Tooltip from "@reach/tooltip";
import styled from "@emotion/styled/macro";
import * as colors from "styles/colors";

export default function SearchTermForm({ handleSearch }: any): any {
  return (
    <Form onSubmit={handleSearch}>
      <input
        placeholder="Search..."
        id="search"
        type="search"
        css={{ width: "100%" }}
      />
      <Tooltip label="Search Glossary">
        <label htmlFor="search">
          <button
            type="submit"
            css={{
              border: "0",
              position: "relative",
              marginLeft: "-35px",
              background: "transparent",
            }}
          ></button>
        </label>
      </Tooltip>
    </Form>
  );
}

const Form = styled.form`
  margin-bottom: 1.5rem;
  max-width: 24.0625rem; // 385px

  input[type="search"] {
    border: 1px solid #aac4ed;
    border-radius: 4px;
    font-size: 0.875rem; // 16px
    padding: 5px 6px;

    &::-webkit-input-placeholder {
      color: ${colors.contentSecondary};
    }

    &::-webkit-search-cancel-button {
      color: #cccccc;
    }
  }
`;
