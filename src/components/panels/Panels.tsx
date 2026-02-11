import { useLoaderData, useLocation } from "react-router-dom";
import Video from "@/types/Video";
import List from "../list/List";

const Panels = () => {
  const { pathname } = useLocation();
  const { list } = useLoaderData() as { list: Video[] };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderTop: "solid 2px #00ff0d",
      }}
    >
      <List key={pathname} data={list} maxSize={100} />
    </div>
  );
};

export default Panels;
