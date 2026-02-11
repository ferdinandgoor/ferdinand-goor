import Youtube from "@/icons/Youtube";
import Instagram from "@/icons/Instagram";
import Ferd from "@/icons/Ferd";
import Select from "@/components/select";
import useCurrentTab from "@/hooks/useCurrentTab";
import { tabs } from "@/router";

const Header = () => {
  const currentTab = useCurrentTab();
  const fallback = tabs[0];
  const image =
    currentTab?.headerImage ?? fallback?.headerImage ?? "/video.png";
  const subtitle =
    currentTab?.headerSubtitle ??
    fallback?.headerSubtitle ??
    "I make music videos\nfor cool artists";

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        className="header-bg"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          className="header-bg-image"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.75)",
            transform: "scale(1.02)",
            transition: "background-image 300ms ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(10px)",
            background: "rgba(0,0,0,0.35)",
          }}
        />
      </div>

      <div
        style={{
          // height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
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
            href="mailto:ferdofficial@gmail.com"
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
            }}
          >
            <div
              style={{
                height: "200px",
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
                gap: "20px",
              }}
            >
              <p
                style={{
                  color: "white",
                  textAlign: "end",
                  whiteSpace: "pre-line",
                  margin: 0,
                }}
              >
                {subtitle}
                <br />
                ferdofficial@gmail.com
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "end",
                  alignItems: "flex-end",
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
            marginTop: "16px"
          }}
        >
          <Select />
        </div>

        <style>{`
        .header-bg-image {
          animation: bgSlide 6s ease-in-out infinite alternate;
        }
        @keyframes bgSlide {
          from { transform: scale(1.02) translateX(-1.5%); }
          to { transform: scale(1.06) translateX(1.5%); }
        }
      `}</style>
      </div>
    </div>
  );
};

export default Header;
