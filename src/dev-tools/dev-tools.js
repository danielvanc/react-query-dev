/** @jsxImportSource @emotion/react */

import { Global } from "@emotion/react";

import "@reach/tabs/styles.css";
import "@reach/tooltip/styles.css";

import * as React from "react";
import ReactDOM from "react-dom";
import { FaTools } from "react-icons/fa";
import { Tooltip } from "@reach/tooltip";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@reach/tabs";
import * as reactQuery from "react-query";
// pulling the development thing directly because I'm not worried about
// bundle size since this won't be loaded in prod unless the query string/localStorage key is set
import { ReactQueryDevtoolsPanel } from "react-query-devtools/dist/react-query-devtools.development";
import * as colors from "styles/colors";

function install() {
  // add some things to window to make it easier to debug
  window.reactQuery = reactQuery;

  const requireDevToolsLocal = require.context(
    "./",
    false,
    /dev-tools\.local\.js/
  );
  const local = requireDevToolsLocal.keys()[0];
  if (local) {
    requireDevToolsLocal(local).default;
  }

  function DevTools() {
    const rootRef = React.useRef();
    const [hovering, setHovering] = React.useState(false);
    const [persist, setPersist] = useLocalStorageState(
      "__homework_devtools_persist__",
      false
    );
    const [tabIndex, setTabIndex] = useLocalStorageState(
      "__homework_devtools_tab_index__",
      0
    );

    const show = persist || hovering;
    const toggleShow = () => setPersist((v) => !v);
    React.useEffect(() => {
      function updateHoverState(event) {
        setHovering(rootRef.current?.contains(event.target) ?? false);
      }
      document.body.addEventListener("mousemove", updateHoverState);
      return () =>
        document.body.removeEventListener("mousemove", updateHoverState);
    }, []);
    return (
      <div
        css={{
          position: "fixed",
          bottom: -15,
          left: 0,
          right: 0,
          label: {
            margin: 0,
            color: "rgb(216, 221, 227)",
          },
          "input, select": {
            background: "rgb(20, 36, 55)",
            border: "2px solid rgb(28, 46, 68)",
            borderRadius: 5,
            color: "white",
            fontWeight: "600",
            padding: "5px",
            "::placeholder": {
              color: "rgba(255,255,255,0.3)",
            },
            ":focus": {
              outlineColor: colors.indigo,
              borderColor: colors.indigo,
              outline: "1px",
            },
          },
          "button:not([data-reach-tab])": {
            borderRadius: 5,
            background: colors.indigo,
            ":hover": {
              background: colors.indigoDarken10,
            },
            border: 0,
            color: colors.gray,
          },
          "[data-reach-tab]": {
            border: 0,
            ":focus": {
              outline: "none",
            },
          },
          "[data-reach-tab][data-selected]": {
            background: "rgb(11, 21, 33)",
            borderBottom: "3px solid white",
            marginBottom: -3,
          },
        }}
      >
        <div
          ref={rootRef}
          css={[
            {
              background: "rgb(11, 21, 33)",
              opacity: "0",
              color: "white",
              boxSizing: "content-box",
              height: "60px",
              width: "100%",
              transition: "all 0.3s",
              overflow: "scroll",
            },
            show
              ? {
                  height: "50vh",
                  width: "100%",
                  opacity: "1",
                }
              : null,
          ]}
        >
          <Tooltip label="Toggle Persist DevTools">
            <button
              css={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.2rem",
                border: "none",
                padding: "10px 20px",
                background: "none",
                marginTop: -40,
                marginLeft: 20,
                position: "absolute",
                backgroundColor: "rgb(11,21,33) !important",
                overflow: "hidden",
                svg: {
                  width: 20,
                  marginRight: 8,
                  color: persist ? "white" : "rgba(255,255,255,0.7)",
                },
                "::before": {
                  content: '""',
                  position: "absolute",
                  height: 4,
                  width: "100%",
                  left: 0,
                  top: 0,
                  background: persist ? colors.yellow : "transparent",
                },
              }}
              onClick={toggleShow}
            >
              <FaTools />
              Homework DevTools
            </button>
          </Tooltip>
          {show ? (
            <Tabs
              css={{ padding: 20 }}
              index={tabIndex}
              onChange={(i) => setTabIndex(i)}
            >
              <TabList css={{ marginBottom: 20 }}>
                <Tab>React Query</Tab>
              </TabList>
              <div
                css={{
                  border: "1px solid rgb(28,46,68)",
                  margin: "0px -20px 20px -20px",
                }}
              />
              <TabPanels css={{ height: "100%" }}>
                <TabPanel>
                  <ReactQueryDevtoolsPanel />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : null}
        </div>
        {show ? (
          <Global
            styles={{
              "#root": {
                marginBottom: "50vh",
              },
            }}
          />
        ) : null}
      </div>
    );
  }
  // add dev tools UI to the page
  const devToolsRoot = document.createElement("div");
  document.body.appendChild(devToolsRoot);
  ReactDOM.render(<DevTools />, devToolsRoot);
}

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
function useLocalStorageState(
  key,
  defaultValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  React.useDebugValue(`${key}: ${serialize(state)}`);

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
  }, [key]);

  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

export { install };

/*
eslint
  no-unused-expressions: "off",
*/
