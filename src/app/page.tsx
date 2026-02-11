import Header from "../components/header/Header";
import Panels from "@/components/panels";

const Home = () => (
  <div
    style={{
      position: "relative",
      borderTop: "solid 2px #00ff0d",
    }}
  >
    <Header />
    <Panels />
  </div>
);

export default Home;
