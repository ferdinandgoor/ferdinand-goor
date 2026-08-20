import type { ReactNode } from "react";
import Container from "@/components/container/Container";
import FilmsBackLink from "@/components/films-back-link/FilmsBackLink";
import "./FilmsPageContent.scss";

type FilmsPageContentProps = {
  backTo: string;
  backLabel: string;
  children: ReactNode;
  className?: string;
};

const FilmsPageContent = ({ backTo, backLabel, children, className = "" }: FilmsPageContentProps) => (
  <Container as="article" className={`films-page-content${className ? ` ${className}` : ""}`}>
    <FilmsBackLink to={backTo}>{backLabel}</FilmsBackLink>
    {children}
  </Container>
);

export default FilmsPageContent;
