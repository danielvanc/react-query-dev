import React from "react";
import styled from "@emotion/styled/macro";
import Moment from "react-moment";
import Tags from "./Tags";
import * as colors from "styles/colors";

import { TermData } from "types";

type props = {
  data: TermData;
};

export default function Term(props: props) {
  const {
    id,
    title,
    description,
    caseSensitive,
    translatable,
    forbidden,
    createdAt,
    createdBy: { fullName },
  } = props.data;

  const date = <Moment format="D MMM, YYYY">{createdAt}</Moment>;
  const tagsData = {
    caseSensitive,
    translatable,
    forbidden,
  };

  return (
    <StyledTerm data-cardid={id}>
      <header>
        <h2>{title}</h2>
      </header>
      <p>{description}</p>
      <Tags data={tagsData} />
      <footer>
        <ul>
          <li>{date}</li>
          <li>{fullName}</li>
        </ul>
      </footer>
    </StyledTerm>
  );
}

const StyledTerm = styled.article`
  background: ${colors.tileGray};
  width: 100%;
  padding: 0.95375rem 1rem; // 9.5px top/bottom 16px left;

  @media screen and (min-width: 999px) {
    max-width: 46%;
  }

  @media screen and (min-width: 1472px) {
    max-width: 433.33px;
  }

  h2 {
    color: ${colors.primaryBlue};
  }

  p {
    margin: 3px 0 0 0;
  }

  p,
  li {
    color: ${colors.contentSecondary};
  }

  footer {
    li {
      display: inline;

      &:nth-of-type(2) {
        margin-left: 0.1rem;
        padding-left: 0.4rem;
        position: relative;

        &::before {
          content: "·";
          display: block;
          position: absolute;
          left: 0px;
          height: 20px;
          width: 20px;
          top: -4px;
          color: ${colors.contentSecondary};
          font-size: 20px;
        }
      }
    }
  }
`;
