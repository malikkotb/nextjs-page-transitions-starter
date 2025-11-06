# Next.js Page Transition Starter

A ready-to-use starter template for building custom websites with smooth page transitions using Next.js App Router.

## Stack

- **Next.js 16** (JavaScript, TypeScript compatible)
- **Tailwind CSS** for styling
- **GSAP** for animations
- **[next-transition-router](https://github.com/ismamz/next-transition-router)** for page transitions

## Quick Start
```bash
npm install
npm run dev
```

## Customizing Page Transitions

Edit the transition animations in `components/TransitionLayout.jsx`:
```javascript
/**
 * Leave animation - this targets elements with data-transition-content attribute
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
      onComplete: resolve,
    });
  });
};

/**
 * Enter animation - this targets elements with data-transition-content attribute
 */
const enter = async () => {
  const contentElements = document.querySelectorAll(
    "[data-transition-content]"
  );

  if (contentElements.length === 0) return;

  return new Promise((resolve) => {
    gsap.fromTo(
      contentElements,
      {
        opacity: 0,
        y: 20, 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: resolve,
      }
    );
  });
};
```

That's it! Modify the GSAP animations to create your own custom page transitions. Elements with the `data-transition-content` attribute will be animated.

## Using TransitionLink

Replace Next.js `Link` components with `TransitionLink` for navigation with transitions:
```javascript
import TransitionLink from "@/components/TransitionLink";

<TransitionLink href="/">
  Home
</TransitionLink>
```

`TransitionLink` accepts all standard Next.js Link props and works seamlessly with Tailwind CSS classes.

## Credits

Built with [next-transition-router](https://github.com/ismamz/next-transition-router) by [@ismamz](https://github.com/ismamz)

## License

MIT
