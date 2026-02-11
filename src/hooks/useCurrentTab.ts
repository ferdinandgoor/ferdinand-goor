import { useMatches } from "react-router-dom";
import type { TabHandle } from "../router";

const useCurrentTab = () => {
  const matches = useMatches();
  const last = [...matches].reverse().find((match) => match.handle);
  return (last?.handle as TabHandle | undefined) ?? null;
};

export default useCurrentTab;
