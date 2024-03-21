import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./HeroSection.css";
import bookVideo from "../../assets/buch.mp4";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const onDOMContentLoaded = () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.75, ease: "power3.out" },
      });

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelector(".hero-video"),
          { scale: 1.3, borderRadius: 0 },
          {
            scale: 1,
            // borderRadius: `0.6rem`,
            delay: 0.3,
            duration: 2.5,
            ease: "elastic.out(1.5, 1)",
          }
        );

        tl.fromTo(
          heroRef.current.querySelectorAll(".hero-content > *"),
          { x: "100%", opacity: 0 },
          { x: 0, opacity: 1 },
          "<20%"
        );

        const logo = heroRef.current.querySelector(".hero-content h1");
        if (logo) {
          const textContent = logo.textContent || "";
          const letters = textContent.split("");

          logo.textContent = "";

          letters.forEach((letter) => {
            if (letter === " ") {
              logo.innerHTML += "&nbsp;";
            } else {
              logo.innerHTML += `<span class="letter">${letter}</span>`;
            }
          });

          gsap.set(".letter", { display: "inline-block" });

          gsap.fromTo(
            ".letter",
            { y: "100%", opacity: 0 },
            {
              y: 0,
              opacity: 1,
              delay: 1.25,
              stagger: 0.025,
              ease: "back.out(3)",
            }
          );
        }
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
    } else {
      onDOMContentLoaded();
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
    };
  }, []);

  return (
    <div className="hero-section" ref={heroRef}>
      <video autoPlay muted loop className="hero-video">
        <source src={bookVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>Welcome to Our Book Club</h1>
        <p>Discover your next favorite book with us.</p>

        <a href="/bookCategory">
          <button>Explore Now </button>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
