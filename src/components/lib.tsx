import { FaSpinner } from "react-icons/fa";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled/macro";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
  fontSize: "50px",
  margin: "30px auto",
  display: "block",
});
Spinner.defaultProps = {
  "aria-label": "loading",
  role: "img",
};

export { Spinner };
