"use client";

import { gsap } from "gsap";
import { RouterTransition } from "@/contexts/TransitionContext";

/**
 * TransitionLayout component using React 19 useTransition
 * Provides the RouterTransition context wrapper
 *
 * This component should wrap the entire app at the root level.
 * Individual layouts (AppLayout, MarketingLayout) should use
 * data-transition-content attribute on elements to be animated.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - App content
 */
const TransitionLayout = ({ children }) => {
  /**
   * Leave animation - fades out page content
   * This targets elements with data-transition-content attribute
   */
  const leave = async () => {
    const contentElements = document.querySelectorAll(
      "[data-transition-content]"
    );

    if (contentElements.length === 0) return;

    return new Promise((resolve) => {
      gsap.to(contentElements, {
        opacity: 0,
        y: -20,
        ease: "power3.in",
        duration: 0.6,
        // duration: 0.5,
        // ease: "power4.out",
        onComplete: resolve,
      });
    });
  };

  /**
   * Enter animation - fades in page content
   * This targets elements with data-transition-content attribute
   */
  const enter = async () => {
    const contentElements = document.querySelectorAll(
      "[data-transition-content]"
    );

    if (contentElements.length === 0) return;

    return new Promise((resolve) => {
      gsap.fromTo(
        contentElements,
        // {
        //   opacity: 0,
        // },
        // {
        //   opacity: 1,
        //   duration: 1,
        //   ease: "power4.out",
        //   onComplete: resolve,
        // }
        {
          opacity: 0,
          y: 20, // Start below
        },
        {
          opacity: 1,
          y: 0, // Slide to position
          duration: 1,
          ease: "power3.out",
          onComplete: resolve,
        }
      );
    });
  };

  return (
    <RouterTransition leave={leave} enter={enter}>
      {children}
    </RouterTransition>
  );
};

export default TransitionLayout;
