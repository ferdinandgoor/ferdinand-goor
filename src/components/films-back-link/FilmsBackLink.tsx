import { ArrowLeft } from "phosphor-react";
import { ActionLink } from "@/components/action/Action";
import "./FilmsBackLink.scss";

const FilmsBackLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <ActionLink className="films-back-link" variant="nav" to={to} icon={<ArrowLeft aria-hidden="true" />} iconPosition="start">{children}</ActionLink>
);

export default FilmsBackLink;
