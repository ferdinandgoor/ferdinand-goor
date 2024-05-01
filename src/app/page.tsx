"use client";

import List from "./List";
import myWorkData from "./list.json";
import Youtube from "@/icons/Youtube";
import Instagram from "@/icons/Instagram";
import Ferd from "@/icons/Ferd";
import ContactForm from "./ContactForm";

const Home = () => (
  <div
    style={{
      position: "relative",
      borderTop: "solid 2px #00ff0d",
    }}
  >
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        style={{
          position: "absolute",
          height: "100%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <source src="overfloodedLight.mp4" type="video/mp4" />
      </video>
    </div>
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        backdropFilter: "blur(10px) brightness(0.5) saturate(20%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
        }}
      >
        <a
          style={{
            color: "white",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          href="#my-work"
        >
          My Work
        </a>
        <a
          style={{
            color: "white",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          href="#contact"
        >
          contact
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            position: "relative",
            padding: "40px",
          }}
        >
          <div
            style={{
              height: "300px",
              color: "#00ff0d",
            }}
          >
            <Ferd />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                color: "white",
                textAlign: "end",
              }}
            >
              I make music videos
              <br />
              for cool artists
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "end",
              }}
            >
              <a
                style={{
                  height: "48px",
                  color: "#00ff0d",
                }}
                href="https://www.youtube.com/@ferdinandgoor7574/shorts"
              >
                <Youtube />
              </a>
              <a
                style={{
                  height: "48px",
                  color: "#00ff0d",
                }}
                href="https://www.instagram.com/ferdinandgoor"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
          color: "#00ff0d",
        }}
      >
        Open for work
      </div>
    </div>
    <div
      style={{
        borderTop: "solid 2px #00ff0d",
        backgroundColor: "#131313",
        backgroundImage: 'url("/topography.svg")',
        padding: "40px",
      }}
      id="my-work"
    >
      <List data={myWorkData} maxSize={6} />
    </div>
    <div
      style={{
        height: "100vh",
        borderTop: "solid 2px #00ff0d",
      }}
      id="contact"
    >
      <ContactForm />
    </div>
  </div>
);

export default Home;
