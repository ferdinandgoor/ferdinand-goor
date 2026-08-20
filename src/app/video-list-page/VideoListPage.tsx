import { ArrowSquareOut } from "phosphor-react";
import Panels from "@/components/panels";
import SiteHeader from "@/components/site-header/SiteHeader";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import FilmsBackLink from "@/components/films-back-link/FilmsBackLink";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";
import type { VideoCardMode } from "@/components/card/Card";
import type Video from "@/types/Video";
import "./VideoListPage.scss";

type VideoListPageProps = {
  title: string;
  list: Video[];
  linkMode: VideoCardMode;
  universe: "films" | "process";
  sectionTitle?: string;
  backTo: string;
  backLabel: string;
  playlist?: { href: string; label: string };
  showFilmsFooter?: boolean;
};

const VideoListPage = ({
  title,
  list,
  linkMode,
  universe,
  sectionTitle = "",
  backTo,
  backLabel,
  playlist,
  showFilmsFooter = false,
}: VideoListPageProps) => (
  <main id="main-content" className="portfolio-page">
    <SiteHeader universe={universe} />
    <Container className="portfolio-page__intro">
      <FilmsBackLink to={backTo}>{backLabel}</FilmsBackLink>
      {playlist ? (
        <ActionLink
          variant="secondary"
          href={playlist.href}
          external
          icon={<ArrowSquareOut weight="bold" />}
        >
          {playlist.label}
        </ActionLink>
      ) : null}
    </Container>
    <h1 className="visually-hidden">{title}</h1>
    <Panels
      sections={[{ title: sectionTitle, list }]}
      linkMode={linkMode}
      refreshKey={title}
    />
    {showFilmsFooter ? <FilmsFooter /> : null}
  </main>
);

export default VideoListPage;
