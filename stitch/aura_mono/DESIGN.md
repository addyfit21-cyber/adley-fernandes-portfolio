# Design System Strategy: The High-End Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"Architectural Editorial."** 

We are moving away from the standard "web template" aesthetic and toward the feel of a premium, physical monograph or a high-end gallery exhibition. The system is defined by its refusal to use decorative clutter, relying instead on extreme typographic scale, intentional asymmetry, and "The Power of the Void" (generous, purposeful whitespace). 

By utilizing a monochromatic foundation with a sophisticated tonal hierarchy, we create an environment where the content doesn't just sit on the page—it is curated within a structured, multi-dimensional space. We break the rigidity of the grid not through chaos, but through "The Offset"—displacing elements slightly to guide the eye and create a sense of bespoke craftsmanship.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
While the visual identity is anchored in black and white, we use the full spectrum of our surface tokens to create a sense of physical weight and atmosphere.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. Modern luxury is defined by seamless transitions.
- **Sectioning:** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the structural definition required.
- **Surface Hierarchy & Nesting:** Use surface-container tiers (`lowest` to `highest`) to create "nested" depth. Treat the UI like stacked sheets of premium fine-art paper. An inner container should be a slightly different tier than its parent to define importance without a single line being drawn.

### Signature Textures & Glassmorphism
- **The "Glass" Rule:** For floating elements like sticky navigation, use `surface_container_lowest` with a 70% opacity and a `24px` backdrop-blur. This allows content to bleed through, softening the layout and making it feel integrated.
- **Subtle Gradients:** To avoid a "flat" digital look, main CTAs can utilize a very subtle linear gradient (Top-Left to Bottom-Right) transitioning from `primary` (#000000) to `primary_container` (#3b3b3b). This adds a "sheen" reminiscent of luxury satin or obsidian.

---

## 3. Typography: The Curated Voice
We use **DM Sans** (referenced via the `manrope` token family for scale) to drive the entire brand identity. The hierarchy is extreme to ensure an authoritative, editorial feel.

- **Display (The Statement):** `display-lg` (3.5rem) should be used for hero statements. Set these with a tight letter-spacing (-0.04em) to create a "locked" visual block.
- **Headlines (The Anchor):** `headline-lg` (2rem) and `headline-md` (1.75rem) act as the anchors for project titles. Use bold weights to contrast against the airy whitespace.
- **Body & Labels (The Detail):** `body-lg` (1rem) is your primary reading weight. For metadata (dates, categories), use `label-md` or `label-sm` in uppercase with increased letter-spacing (+0.1em) to mimic the captions in a fashion magazine.

The contrast between the massive `display` type and the delicate `label` type creates the "high-end" tension necessary for a premium portfolio.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, shadows and borders are "crutches." We favor **Tonal Layering.**

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#f3f3f4) background. This creates a soft, natural "lift."
- **Ambient Shadows:** If an element must float (e.g., a modal or a primary project card on hover), use an extra-diffused shadow: `box-shadow: 0 20px 80px rgba(0, 0, 0, 0.04)`. The shadow color must be a low-opacity tint of `on-surface` to mimic natural light.
- **The "Ghost Border" Fallback:** If accessibility requires a container edge, use a "Ghost Border": the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.
- **Corner Radius:** Following the architectural theme, all corners are strictly **0px (Sharp)**. This conveys precision, confidence, and a "brutalist-chic" edge.

---

## 5. Components

### Buttons
- **Primary:** `primary` background, `on_primary` text. No border. Sharp corners.
- **Secondary:** `surface_container_high` background. No border. On hover, transition to `primary` with a `0.4s` cubic-bezier ease.
- **Tertiary (The "Editorial" Link):** No background. `primary` text. Underlined with a 1px offset line that grows from the center on hover.

### Project Cards
- **Structure:** Forbid divider lines. Use `surface_container_low` for the image container and `surface` for the typography area.
- **Interaction:** On hover, the image should subtly scale (1.02x) within its sharp-edged container while the background of the card shifts from `surface` to `surface_container_highest`.

### Sticky Navigation
- **Styling:** Use the "Glass" rule. Height should be generous (96px+) to maintain the premium feel.
- **Interaction:** As the user scrolls, the `surface_container_lowest` background should increase in opacity from 0% to 85%.

### Input Fields
- **State:** No boxes. Use a single bottom border using `outline_variant` (30% opacity). On focus, the border becomes `primary` (100% opacity) and the label (using `label-md`) shifts upward and shrinks.

---

## 6. Do's and Don'ts

### Do:
- **Do use "The Offset":** Align a headline to the left but push the body text to a 60% width column on the right.
- **Do use "The Power of the Void":** If you think there is enough whitespace, add 20% more.
- **Do prioritize motion:** Use "Long & Slow" transitions (600ms+) for page entries to emphasize a "luxurious" pace.

### Don't:
- **Don't use 1px Borders:** Never use them to separate sections. Use tonal shifts.
- **Don't use Rounded Corners:** 0px radius is mandatory to maintain the architectural precision.
- **Don't use Center-Alignment for long-form text:** Keep it flush-left (ragged right) to maintain the editorial grid.
- **Don't use generic shadows:** Avoid the "fuzzy" dark grey drop shadow. Use Tonal Layering first.