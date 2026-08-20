import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";
import "./FilmsBackLink.scss";

const FilmsBackLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link className="films-back-link" to={to}><ArrowLeft aria-hidden="true" />{children}</Link>
);

export default FilmsBackLink;
