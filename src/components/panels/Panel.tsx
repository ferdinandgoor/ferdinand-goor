import { useLocation } from "react-router-dom";
import Panel from "@/types/Panel";

interface PanelsProps {
  items: Panel[];
}

const Panels = ({ items }: PanelsProps) => {
  const { pathname } = useLocation();
  const selectedPanel = items.find((item) => item.path === pathname)?.id ?? 0;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {items.map((item, index) => {
        if (index !== selectedPanel) return null;
        return (
          <div
            key={item.id}
            style={{
              width: "100%",
            }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};

export default Panels;
