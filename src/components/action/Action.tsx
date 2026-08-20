import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Action.scss";

export type ActionVariant = "primary" | "secondary" | "text" | "nav" | "icon";

type ActionLinkProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  to?: string;
  variant?: ActionVariant;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
};

const actionClass = (variant: ActionVariant, className: string) => `ferd-action ferd-action--${variant}${className ? ` ${className}` : ""}`;

export const ActionLink = ({ children, className = "", href, to, variant = "text", icon, iconPosition = "end", external = false, onClick, ariaLabel }: ActionLinkProps) => {
  const content = <>{icon && iconPosition === "start" ? <span className="ferd-action__icon">{icon}</span> : null}<span>{children}</span>{icon && iconPosition === "end" ? <span className="ferd-action__icon">{icon}</span> : null}</>;
  return to ? <Link className={actionClass(variant, className)} to={to} onClick={onClick} aria-label={ariaLabel}>{content}</Link> : <a className={actionClass(variant, className)} href={href} onClick={onClick} aria-label={ariaLabel} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{content}</a>;
};

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionVariant;
  icon?: ReactNode;
};

export const ActionButton = ({ children, className = "", variant = "primary", icon, ...props }: ActionButtonProps) => (
  <button className={actionClass(variant, className)} {...props}><span>{children}</span>{icon ? <span className="ferd-action__icon">{icon}</span> : null}</button>
);
