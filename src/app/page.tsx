"use client";

import List from "./List";
import myWorkData from "./list.json";
import ContactForm from "./ContactForm";
import Header from "./Header";

const Home = () => (
  <div
    style={{
      position: "relative",
      borderTop: "solid 2px #00ff0d",
    }}
  >
    <Header />
    <div
      style={{
        borderTop: "solid 2px #00ff0d",
        backgroundColor: "#131313",
        backgroundImage: 'url("/topography.svg")',
        padding: "20px",
      }}
      id="my-work"
    >
      <List data={myWorkData} maxSize={20} />
    </div>
    <div
      style={{
        height: "100vh",
        borderTop: "solid 2px #00ff0d",
        padding: "20px",
      }}
      id="contact"
    >
      <ContactForm />
    </div>
  </div>
);

export default Home;
