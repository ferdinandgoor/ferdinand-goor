import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Action.scss";

export type ActionVariant =
  | "primary"
  | "secondary"
  | "contrast"
  | "text"
  | "nav"
  | "icon"
  | "icon-bubble";

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
  fullWidth?: boolean;
  tone?: "youtube" | "instagram" | "tiktok" | "spotify" | "facebook";
};

const actionClass = (
  variant: ActionVariant,
  className: string,
  fullWidth = false,
  tone?: ActionLinkProps["tone"],
) =>
  `ferd-action ferd-action--${variant}${fullWidth ? " ferd-action--full-width" : ""}${tone ? ` ferd-action--${tone}` : ""}${className ? ` ${className}` : ""}`;

export const ActionLink = ({
  children,
  className = "",
  href,
  to,
  variant = "text",
  icon,
  iconPosition = "end",
  external = false,
  onClick,
  ariaLabel,
  fullWidth = false,
  tone,
}: ActionLinkProps) => {
  const content = (
    <>
      {icon && iconPosition === "start" ? (
        <span className="ferd-action__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? (
        <span className="ferd-action__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  );
  return to ? (
    <Link
      className={actionClass(variant, className, fullWidth, tone)}
      to={to}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  ) : (
    <a
      className={actionClass(variant, className, fullWidth, tone)}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
};

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
};

export const ActionButton = ({
  children,
  className = "",
  variant = "primary",
  icon,
  fullWidth = false,
  ...props
}: ActionButtonProps) => (
  <button className={actionClass(variant, className, fullWidth)} {...props}>
    <span>{children}</span>
    {icon ? (
      <span className="ferd-action__icon" aria-hidden="true">
        {icon}
      </span>
    ) : null}
  </button>
);
