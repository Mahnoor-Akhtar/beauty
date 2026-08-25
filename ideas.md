# Atelier Beauty — Design Direction

## Three stylistic approaches

### Theme Name: Quiet Luxury Editorial
Very warm, image-led salon identity with magazine-like composition, expressive serif typography, and intimate studio details. The feeling is calm, selective, and confidently premium.

**Probability:** 0.07

### Theme Name: Modern Botanical Ritual
A soft spa direction built from botanical shadows, mineral neutrals, tactile paper textures, and slower wellness pacing. The feeling is restorative, grounded, and quietly luminous.

**Probability:** 0.03

### Theme Name: Champagne After Dark
A contrast-led evening salon identity pairing cream editorial type with espresso surfaces and restrained metallic accents. The feeling is glamorous, polished, and fashion-forward without becoming theatrical.

**Probability:** 0.08

## Selected approach: Quiet Luxury Editorial

### Design Movement
Contemporary editorial minimalism with references to luxury print magazines, modern Parisian interiors, and boutique beauty campaigns.

### Core Principles
1. **Photography leads the story.** Every major promise is paired with a distinct visual, with imagery cropped like an editorial spread rather than a generic card thumbnail.
2. **Warm restraint.** The palette is cream, sand, blush, cacao, and antique brass; contrast is deliberate, never loud.
3. **Asymmetric rhythm.** Sections use offset columns, oversized numerals, image-led bands, and varied alignment to avoid a template-like centered stack.
4. **Information feels curated.** Service duration, starting price, benefits, and booking actions remain clear while the surrounding presentation stays refined.

### Color Philosophy
The base is a warm paper cream (#F8F4EF) that feels tactile rather than sterile. Clay blush (#D9B8AB) adds softness and humanity, while cacao ink (#2D221F) supplies editorial contrast. Antique brass (#B98B62) is used sparingly for rules, micro-labels, and moments of emphasis; it should feel like a foil stamp, not a metallic gradient.

### Layout Paradigm
Use full-bleed photography, offset editorial columns, and wide horizontal bands that alternate dense information with generous negative space. Service groups sit in split compositions: a large anchor image, then a staggered list of treatments. The visual sequence should feel like turning pages of a beauty journal, not browsing a dashboard.

### Signature Elements
- Tiny uppercase brass eyebrow labels with generous tracking.
- A fine vertical rule and oversized serif numerals used as section markers.
- Soft “paper” surfaces with subtle grain, hairline borders, and occasional clipped image reveals.

### Interaction Philosophy
Interactions should feel like a calm concierge: clear, quiet, and responsive. Hover states move by a few pixels, arrows glide rather than bounce, and modals feel like a sheet of heavy paper sliding into place. Every interactive control has a visible focus treatment and a generous touch target.

### Animation
Hero content rises in a 700ms stagger while the hero image eases from a slightly enlarged crop into place. On scroll, use Intersection Observer to reveal copy with opacity and 18–26px vertical motion, images with clip-path or scale, and service rows with 45ms stagger. Hover uses 180–260ms ease-out transitions. The mobile menu is a full-height cream panel with staggered links. Respect prefers-reduced-motion by disabling non-essential transforms and reveal delays.

### Typography System
Use **Cormorant Garamond** for display headlines, large numerals, pull quotes, and service names; use **DM Sans** for body copy, navigation, labels, forms, prices, and utility text. Headlines are large and lightly leading (clamp(3.4rem, 8vw, 8rem)); labels are 10–11px uppercase with 0.18em tracking; body text stays between 15–18px with a relaxed 1.65 line-height. Italic Cormorant is reserved for short emotional phrases and the word “beautifully.”

### Brand Essence
**Atelier Beauty is a considered beauty studio for women who want expert care, personal attention, and results that still feel like themselves.**

Personality adjectives: **considered, warm, assured**.

### Brand Voice
Headlines are short, sensory, and confident. CTAs are direct but gracious. Microcopy sounds like a knowledgeable artist speaking one-to-one, never like a promotion engine.

Example headline: “The art of feeling like yourself.”

Example CTA: “Reserve your ritual”

### Wordmark & Logo
Use a custom-feeling monogram mark built from an abstract A and a single curved atelier arch, paired with the wordmark “ATELIER BEAUTY” in spaced small caps. The mark should work independently as a compact favicon and as a brass stamp in the footer.

### Signature Brand Color
**Cacao Ink — #2D221F.** It is warmer and more ownable than black, creating a grounded, intimate contrast against the salon’s paper-cream world.

## Content & experience decisions

The homepage is a single long-form editorial journey with anchor navigation for Home, About, Services, Gallery, Bridal, Team, and Contact. It includes a new-client announcement bar, translucent-to-solid sticky nav, hero with overlapping secondary image, editorial introduction, categorized service sections, service detail modal, bridal feature band, nails and spa sections, filterable service menu, why-us promises, before/after slider, masonry gallery with lightbox, team, testimonials, premium offers, appointment form, contact details, Instagram-style image strip, and dark footer.

To keep the site fast while still image-rich, the visual system uses a focused set of generated hero and section assets plus distinct Unsplash editorial images for supporting gallery moments. Below-the-fold images use lazy loading and fixed aspect-ratio wrappers to avoid layout shift.

## Style Decisions

- **Brand mark rule accepted:** The abstract atelier arch monogram appears as a visible circular stamp in the hero, a compact mark in the header, and again in the footer. Oversized section numerals and fine rules repeat the same identity language.
- **Photography rule accepted:** Major section assets prioritize warm, intimate salon details, bridal preparation, treatment textures, mirrors, hair, skin, and hands. Supporting images are cropped and color-balanced toward the same quiet studio world.
- **Commercial voice rule accepted:** Offers are framed as private invitations and rituals. The new-client incentive remains clear but is nested inside calm, non-retail language.
