# Explore list

A private-ish to-do list of things to look at before deciding how the site grows.
(The repo is public, so don't put anything here you wouldn't want seen.)

**Status key:** ⬜ not looked at · 👀 looked, thinking · ✅ adopting · ❌ not for me

When something here gets adopted (an idea, a package, a component), move it into
[`lib/credits.ts`](../lib/credits.ts) so it shows on [/credits](https://herteoh.com/credits).

---

## 1. Well-known sites to look at

| Status | Site | What to look for | My notes |
| :-: | --- | --- | --- |
| ⬜ | [Paul Graham](https://paulgraham.com) | Plain essays, typography first. Proof that plain works. | |
| ⬜ | [Morgan Housel / Collaborative Fund](https://collabfund.com/blog/) | Short investing and behaviour essays, close to my field. | |
| ⬜ | [Andy Matuschak's working notes](https://notes.andymatuschak.org) | Linked notes that keep evolving instead of a dated blog. | |
| ⬜ | [Maggie Appleton's digital garden](https://maggieappleton.com/garden) | 🌱 seedling → 🌿 budding → 🌳 evergreen status on notes. Also good illustrated, animated touches. | |
| ⬜ | [Gwern.net](https://gwern.net) | Long-form pieces with a confidence level and "last updated" date. | |
| ⬜ | [Derek Sivers](https://sive.rs) | `/now` page and book notes with ratings. | |
| ⬜ | [Patrick Collison](https://patrickcollison.com) | `/bookshelf` and an open `/questions` list. | |
| ⬜ | [Simon Willison's TILs](https://til.simonwillison.net) | "Today I Learned": short, frequent posts. | |
| ⬜ | [Julia Evans](https://jvns.ca) | Friendly, short explainers and zines. | |

## 2. Pages that fit my story (data → operations → building a business → markets)

| Status | Page | Idea | My notes |
| :-: | --- | --- | --- |
| ⬜ | `/writing` | Latest Substack posts pulled in automatically from the RSS feed (needs a Substack first). | |
| ✅ | `/notes` | Short learnings tagged by theme (ASEAN markets, Operations, Building, Data), each with a seedling/evergreen status. | Live Nov 2026. Add a Markdown file to `content/notes/` (copy `_template.md`). |
| ✅ | `/now` | What I'm reading, researching and working on this month. | Live Nov 2026. Edit `lib/now.ts` to update. |
| ⬜ | `/bookshelf` | Books with one-line takeaways. | |
| ⬜ | `/principles` or `/mental-models` | Lessons from Neuron and the franchise, applied to investing. | |
| ⬜ | `/questions` | Open questions I'm working through, e.g. "Why do ASEAN mid-caps trade at a discount?" | |

> Compliance check before publishing anything market-related: confirm what Singular's
> policy allows, and add a "personal views, not investment advice" line to the footer.

## 3. Animation & interaction: libraries to try

For a more animated, dynamic site. All of these work on GitHub Pages (they run in the
visitor's browser, no server needed). Check the licence again before adopting. Terms change.

| Status | Library | Good for | Licence / credit notes |
| :-: | --- | --- | --- |
| ✅ | [Motion](https://motion.dev) (formerly Framer Motion) | Fade/slide-in on scroll, page transitions, hover effects in React. Easiest first step. | MIT. Adopted Nov 2026 for section fade-ins (`components/fade-in.tsx`). |
| ⬜ | [GSAP](https://gsap.com) + ScrollTrigger | Scroll-driven storytelling, e.g. animating the career timeline as you scroll. | Free to use (incl. plugins) under GSAP's own licence, not open source. Read the terms. |
| ⬜ | [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling that makes scroll animations feel polished. | MIT |
| ⬜ | [AutoAnimate](https://auto-animate.formkit.com) | One-line animations when lists change (e.g. filtering notes by tag). | MIT |
| ⬜ | [React Three Fiber](https://r3f.docs.pmnd.rs) / [Three.js](https://threejs.org) | 3D or WebGL backgrounds. Heavy, so use sparingly. | MIT |
| ⬜ | [Lottie](https://airbnb.io/lottie/) / [Rive](https://rive.app) | Designer-made vector animations (icons, illustrations). | Runtimes are MIT. **Each animation file has its own creator and licence: credit them.** |
| ⬜ | [Magic UI](https://magicui.design) / [Aceternity UI](https://ui.aceternity.com) | Copy-paste animated components (marquees, text reveals, spotlight cards). | Copied code still needs credit. Check each site's licence page. |

Ground rules for animation:
- Respect `prefers-reduced-motion`: anyone who has turned motion off should get a still site.
- Keep it subtle and in the cream/terracotta/serif style. Motion should guide reading, not compete with it.
- Watch page weight. Three.js and Lottie files can be large.
