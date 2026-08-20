import type { ReactNode } from "react";
import "./Container.scss";

type ContainerProps = {
  as?: "div" | "article" | "nav";
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

const Container = ({
  as: Tag = "div",
  children,
  className = "",
  ariaLabel,
}: ContainerProps) => (
  <Tag
    className={`ferd-container${className ? ` ${className}` : ""}`}
    aria-label={ariaLabel}
  >
    {children}
  </Tag>
);

export default Container;
