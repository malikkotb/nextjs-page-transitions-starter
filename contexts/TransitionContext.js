"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

const RouterTransitionContext = createContext(null);

if (process.env.NODE_ENV === "development") {
  RouterTransitionContext.displayName = "RouterTransitionContext";
}

/**
 * Hook to access router transition state and start transitions
 * @returns {Array} [transition, startRouteTransition]
 *
 * transition = {
 *   isPending: boolean,      // True if transition is active
 *   stage: string, predicted  // "leaving" | "entering" | undefined
 *   pendingPath: string,     // Destination path during transition
 * }
 *
 * startRouteTransition = (callback, targetPath) => void
 */
export function useRouterTransition() {
  const context = useContext(RouterTransitionContext);

  if (!context) {
    throw Error("useRouterTransition must be used within RouterTransition");
  }

  return context;
}

/**
 * RouterTransition component that manages page transition animations
 * Uses React 19's useTransition to keep components mounted during exit
 *
 * @param {Object} props
 * @param {() => Promise<void | VoidFunction>} props.leave - Async function for exit animation
 * @param {() => Promise<void | VoidFunction>} props.enter - Async function for enter animation
 * @param {React.ReactNode} props.children - Child components
 */
export function RouterTransition({ children, leave, enter }) {
  const [shouldEnter, setShouldEnter] = useState(false);
  const [stage, setStage] = useState(undefined);
  const [pendingPath, setPendingPath] = useState(null);
  const [, startTransition] = useTransition();

  // Handle enter animation when shouldEnter is true
  useEffect(() => {
    if (!shouldEnter) return;

    setStage("entering");
    startTransition(async () => {
      await enter().then((cleanup) => cleanup?.());
      setStage(undefined);
      setShouldEnter(false);
      setPendingPath(null); // Clear pending path after transition completes
    });
  }, [enter, shouldEnter]);

  /**
   * Start a route transition
   * 1. Set stage to "leaving"
   * 2. Set pending path immediately (for instant UI updates)
   * 3. Run leave animation
   * 4. Execute navigation callback
   * 5. Trigger enter animation
   */
  const startRouteTransition = (callback, targetPath) => {
    // Prevent starting a new transition if one is already active
    if (stage) return;

    setStage("leaving");
    setPendingPath(targetPath); // Set immediately for instant UI feedback
    startTransition(async () => {
      setShouldEnter(true);
      await leave().then((cleanup) => cleanup?.());
      await callback();
    });
  };

  const value = [
    {
      isPending: Boolean(stage),
      stage,
      pendingPath, // Expose pending path for instant UI updates
    },
    startRouteTransition,
  ];

  return (
    <RouterTransitionContext.Provider value={value}>
      {children}
    </RouterTransitionContext.Provider>
  );
}

export default RouterTransitionContext;

