import Youtube from "@/icons/Youtube";
import Instagram from "@/icons/Instagram";
import Ferd from "@/icons/Ferd";
import Select from "@/components/select";
import useCurrentTab from "@/hooks/useCurrentTab";
import { tabs } from "@/router";
import { TiktokLogo } from "phosphor-react";
import { Link } from "react-router-dom";

const Header = () => {
  const currentTab = useCurrentTab();
  const fallback = tabs[0];
  const image =
    currentTab?.headerImage ?? fallback?.headerImage ?? "/video.webp";
  const subtitle =
    currentTab?.headerSubtitle ??
    fallback?.headerSubtitle ??
    "I make music videos\nfor cool artists";

  return (
    <header
      style={{
        position: "relative",
      }}
    >
      <a className="skip-link" href="#main-work">
        Aller au contenu principal
      </a>
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
            transition: "background-image var(--duration-medium) var(--ease-standard)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(10px)",
            background: "var(--hero-overlay)",
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
          padding: "var(--space-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-5)",
            }}
          >
            <Link
              style={{
                color: "white",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
              to="/links"
            >
              Links
            </Link>
            <Link
              style={{
                color: "var(--color-accent)",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
              to="/realisateur-clip-nantes"
            >
              Réalisation de clips
            </Link>
          </div>
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
            <h1
              style={{
                height: "200px",
                color: "var(--color-accent)",
                margin: 0,
              }}
            >
              <span className="visually-hidden">
                {currentTab?.label ?? fallback.label} par Ferd
              </span>
              <Ferd />
            </h1>
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
                    color: "var(--color-accent)",
                  }}
                  href="https://www.youtube.com/@ferd.process"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ferd YouTube"
                >
                  <Youtube />
                </a>
                <a
                  style={{
                    height: "48px",
                    color: "var(--color-accent)",
                  }}
                  href="https://www.instagram.com/ferd.process"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ferd Instagram"
                >
                  <Instagram />
                </a>
                <a
                  style={{
                    height: "48px",
                    width: "48px",
                    color: "var(--color-accent)",
                  }}
                  href="https://www.tiktok.com/@ferd.process"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ferd TikTok"
                >
                  <TiktokLogo size="100%" weight="regular" />
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
          marginTop: "var(--space-4)"
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
    </header>
  );
};

export default Header;
