import { useParams } from "react-router-dom";
import ClipServiceLanding from "@/app/clip-service-landing/ClipServiceLanding";
import { getFilmLandingPage } from "@/data/films";

const FilmsSeoLanding = () => {
  const { slug = "" } = useParams();
  const page = getFilmLandingPage(slug);
  if (!page) return null;
  return <ClipServiceLanding page={page} />;
};

export default FilmsSeoLanding;
