"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRouterTransition } from "@/contexts/TransitionContext";

/**
 * TransitionLink component - Link with automated page transitions
 *
 * A convenience wrapper around Next.js Link that automatically
 * triggers page transitions on navigation.
 *
 * @param {Object} props - All standard Next.js Link props
 */
const TransitionLink = (props) => {
  const [, startRouteTransition] = useRouterTransition();
  const router = useRouter();

  return (
    <Link
      {...props}
      onNavigate={(event) => {
        // Prevent default navigation
        event.preventDefault();

        // Get target path
        const targetPath = props.href.toString();

        // Start the route transition
        startRouteTransition(() => {
          // Determine which navigation method to use
          const method = props.shallow
            ? props.replace
              ? window.history.replaceState.bind(null, null, "")
              : window.history.pushState.bind(null, null, "")
            : props.replace
              ? router.replace
              : router.push;

          // Execute navigation with scroll option
          method(targetPath, {
            scroll: props.scroll,
          });
        }, targetPath);
      }}
    />
  );
};

export default TransitionLink;

