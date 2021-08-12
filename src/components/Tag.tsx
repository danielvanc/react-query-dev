import React from "react";
import styled from "@emotion/styled/macro";
import * as colors from "styles/colors";

function hyphenate(name: string): string {
  return name.split(" ").join("-").toLowerCase();
}

type props = {
  title: any;
};

export default function Tag(props: props) {
  const name = props.title[0];
  return <StyledTag className={`${hyphenate(name)}`}>{name}</StyledTag>;
}

const StyledTag = styled.button`
  border-radius: 20px;
  border: 0;
  color: white;
  font-size: 0.6875rem; // 11px
  font-weight: 500;
  margin-right: 0.25rem;
  padding: 4px 8px 2px 8px;

  &.case-sensitive {
    background: ${colors.tagPrimary};
  }

  &.non-translatable {
    background: ${colors.tagGray};
  }

  &.forbidden {
    background: ${colors.tagRed};
  }
`;
