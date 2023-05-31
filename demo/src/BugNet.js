import React, { useDebugValue } from "react";

import { allBugs } from "./all-bugs";

const BugNetContext = React.createContext({});

export function useBugNet() {
  const context = React.useContext(BugNetContext);

  useDebugValue(`${context.count} bugs caught`);

  return context;
}

export const BugNet = ({ children }) => {
  const [bugs, setBugs] = React.useState([]);
  const caught = React.useMemo(
    () => bugs.map((name) => allBugs.find((b) => b.name === name)),
    [bugs]
  );

  const hasBug = React.useCallback((bugName) => bugs.includes(bugName), [bugs]);

  const catchBug = React.useCallback(
    (bugName) => {
      if (hasBug(bugName)) {
        return;
      }

      setBugs([...bugs, bugName]);
    },
    [bugs, hasBug, setBugs]
  );

  return (
    <BugNetContext.Provider
      value={{ caught, catchBug, hasBug, count: caught.length }}
    >
      {children}
    </BugNetContext.Provider>
  );
};
