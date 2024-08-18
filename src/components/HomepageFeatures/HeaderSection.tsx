import React, { useEffect, useRef } from "react";
import Marquee from "./Marquee";
import OverlayImage from "@site/static/assets/bg-image1.webp";

export default function HeaderSection(): JSX.Element {
  const videoRef = useRef(null); // Using useRef to reference the video element

  useEffect(() => {
    const video = videoRef.current;

    // Function to play the video when it's visible or on user interaction
    const handlePlayVideo = () => {
      if (video && video.paused) {
        video.play().catch((error) => {
          console.error('Autoplay blocked, will wait for user interaction:', error);
        });
      }
    };

    // Intersection Observer to detect when the video is in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlePlayVideo();
          }
        });
      },
      { threshold: 0.5 } // Play video when 50% of it is visible
    );

    if (video) {
      observer.observe(video);
    }

    // Fallback: Force video play on user interaction if autoplay is blocked
    const handleUserInteraction = () => {
      if (video && video.paused) {
        handlePlayVideo();
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      if (video) {
        observer.unobserve(video);
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return (
    <section className="relative">
      <img
        className="absolute mix-blend-screen bottom-0 pointer-events-none"
        alt="background image"
        src={OverlayImage}
      />
      <div className="max-w-[1440px] ml-auto mr-auto lg:px-20 md:px-10 px-5 pt-16 pb-8 md:pt-20 md:pb-10 flex flex-col items-start text-white">
        <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto lg:mt-4">
          <div className="flex md:flex-row flex-col">
            <div className="flex flex-col w-full">
              <h1 className="text-4xl uppercase font-medium">
                Open-Source Code is good.
              </h1>
              <div className="lg:text-[64px] text-6xl uppercase mt-10 font-bold">
                But Open-Source Value is not!
              </div>
              <div className="flex mt-20 gap-2 md:gap-8 items-center">
                <div className="text-lg sm:text-xl max-w-[300px]">
                  World's first solution for encrypting{" "}
                  <span className="font-bold">Bitcoin</span>
                </div>
                <a
                  className="bg-transparent contents border-none w-16 h-16"
                  href="#eventsandnews"
                >
                  <img
                    className="w-16 h-16 hover:cursor-pointer hover:opacity-75"
                    src={
                      require(`@site/static/assets/down-arrow-circle-btn.webp`)
                        .default
                    }
                    alt="Link button"
                  />
                </a>
              </div>
            </div>
            <video
              ref={videoRef}
              className="w-[280px] md:w-[380px] lg:w-[460px] self-center"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
            >
              <source
                src={require(`@site/static/assets/video.webm`).default}
                type="video/webm"
              />
              <source
                src={require(`@site/static/assets/video_2x.webm`).default}
                type="video/webm"
              />
              <source
                src={require(`@site/static/assets/video.mp4`).default}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className="rounded-t-[40px] rounded-b-none border border-t-[1px] border-r-[1px] border-b-0 border-l-[1px] border-gray-600 border-solid py-[6px] overflow-hidden">
        <Marquee />
      </div>
    </section>
  );
}
