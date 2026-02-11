import Youtube from "@/icons/Youtube";
import Instagram from "@/icons/Instagram";
import Ferd from "@/icons/Ferd";
import Select from "@/components/select";

const Header = () => (
  <div
    style={{
      position: "relative",
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
        playsInline
        style={{
          position: "fixed",
          height: "100%",
          left: "50%",
        }}
      >
        <source src={"overfloodedLight.mp4"} type="video/mp4" />
      </video>
    </div>
    <div
      style={{
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        backdropFilter: "blur(10px) brightness(0.5) saturate(50%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
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
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            position: "relative",
            padding: "20px",
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
              right: "20px",
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
              <br />
              ferdofficial@gmail.com
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
                href="https://www.youtube.com/@ferdinandgoor"
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
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "16px",
        }}
      >
        <Select />
      </div>
    </div>
  </div>
);

export default Header;
