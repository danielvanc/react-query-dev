import React from "react";
import styled from "@emotion/styled/macro";
import Tag from "./Tag";

interface TagProps {
  caseSensitive: boolean;
  translatable: boolean;
  forbidden: boolean;
}

type props = {
  data: TagProps;
};

const TAG_TYPES = {
  caseSenistive: "Case Sensitive",
  translatable: "Non Translatable",
  forbidden: "Forbidden",
};

export default function Tags(props: props) {
  const { caseSensitive, translatable, forbidden } = props.data;
  const tags = [];

  caseSensitive && tags.push([TAG_TYPES.caseSenistive]);
  translatable && tags.push([TAG_TYPES.translatable]);
  forbidden && tags.push([TAG_TYPES.forbidden]);

  return (
    <StyledTagList>
      {tags.map((tag, index) => (
        <li key={`tag-${index}`}>
          <Tag title={tag} />
        </li>
      ))}
    </StyledTagList>
  );
}

const StyledTagList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 14px 0 19px 0;
`;
