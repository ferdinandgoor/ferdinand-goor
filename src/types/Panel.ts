import { ReactNode } from "react";

interface Panel {
  id: number;
  label: string;
  icon: ReactNode;
  content: ReactNode;
  path: string;
  video: string;
};

export default Panel;
