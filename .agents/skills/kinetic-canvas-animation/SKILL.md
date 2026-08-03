---
name: kinetic-canvas-animation
description: Guidelines and code patterns for implementing interactive 2D HTML5 canvas motion graphics, particle vector networks, mouse gravity attraction, and prefers-reduced-motion fallbacks in React applications.
---

# Kinetic Canvas Motion Graphics Skill

This skill documents high-performance, low-overhead HTML5 canvas animation techniques for modern web applications.

## Technical Rules

1. **DOM & Canvas Sync**:
   - Use `useRef<HTMLCanvasElement>` to reference canvas.
   - Resize canvas dynamically using `window.addEventListener('resize', handleResize)`.

2. **Interactive Physics**:
   - Track mouse position relative to canvas bounding box (`getBoundingClientRect`).
   - Calculate Euclidean distance between cursor `(mx, my)` and particle `(px, py)`:
     `const dist = Math.sqrt(dx * dx + dy * dy)`
   - Apply gentle vector force when distance is within threshold radius (e.g., `< 140px`).

3. **Performance Optimization**:
   - Limit node counts (25-40 particles) to maintain 60 FPS without layout thrashing.
   - Draw connector lines using distance-proportional opacity (`lineAlpha = (1 - dist / maxDist) * alphaMultiplier`).

4. **Accessibility Compliance**:
   - Set `aria-hidden="true"` and `pointer-events-none` on background canvas elements.
   - Check `window.matchMedia('(prefers-reduced-motion: reduce)')` prior to initiating `requestAnimationFrame`.
