import Header from "../components/header/Header";
import Panels from "@/components/panels";

const Home = () => (
  <main
    id="main-content"
    style={{
      position: "relative",
    }}
  >
    <Header />
    <Panels />
  </main>
);

export default Home;
