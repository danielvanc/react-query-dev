import React from "react";
import TermGrid from "components/TermGrid";
import styled from "@emotion/styled";

export default function App() {
  return (
    <PageContainer>
      <TermGrid />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 88.75rem;
  padding: 1.5rem 1.875rem 4rem 1.875rem; // 24px top 30px right and left, 64px bottom.
`;
