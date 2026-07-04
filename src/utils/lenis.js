import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tickerCallback = null;
let handleResize = null;

export const initLenis = () => {
  if (lenis) return lenis;

  const isMobile = window.innerWidth < 768;

  lenis = new Lenis({
    lerp: isMobile ? 0.12 : 0.1,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1,
    wheelMultiplier: 1,
    autoResize: true,
  });

  window.lenis = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  tickerCallback = (time) => {
    if (lenis) {
      lenis.raf(time * 1000);
    }
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.fps(60);

  handleResize = () => {
    if (lenis) {
      lenis.resize();
    }
  };

  window.addEventListener("resize", handleResize);

  return lenis;
};

export const destroyLenis = () => {
  if (!lenis) return;

  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  if (handleResize) {
    window.removeEventListener("resize", handleResize);
    handleResize = null;
  }

  lenis.destroy();

  lenis = null;
  window.lenis = null;
};