# Mac Gauge design QA

Date: 25 October 2026

final result: passed

## Visual truth and evidence

- Reference: https://harshityadav.in/Lifafa-Mail-App/ and the local Lifafa-Mail-App source.
- Source capture: `build/lifafa-reference.png`.
- Implementation: http://127.0.0.1:4186/.
- Final desktop capture: `build/mac-gauge-desktop.png`.
- Full-view comparison: `build/design-comparison.jpg`, with source and implementation side by side in the same image; opened and visually reviewed.
- Focused typography comparison: `build/type-comparison.jpg`; opened and visually reviewed.
- Complete-page review: `build/mac-gauge-full.png` and `build/full-page-review.jpg`; opened and visually reviewed.
- Responsive evidence: `build/mac-gauge-mobile.png` and `build/mac-gauge-mobile-demo.png`.
- Demo and pricing evidence: `build/mac-gauge-demo.png` and `build/mac-gauge-pricing.png`.
- Default desktop CSS viewport reported 1280 × 720. Both source and implementation screenshots returned exactly 1265 × 712 pixels, with the same browser capture treatment; no density rescaling was required. Comparison canvas adds only a caption strip.
- Responsive viewport overrides: 390 × 844, 320 × 740 and 768 × 1024. Overrides reset after inspection.
- State: light theme; initial hero; default CPU / Everyday work demo; all pricing options visible.

## Findings and required fidelity surfaces

No remaining actionable P0/P1/P2 findings.

- **Fonts and typography:** Identical self-hosted Geist regular/semibold and Silkscreen assets from the reference, including licenses. Centered display heading, regular weight, tight tracking, pixel final word, two-line supporting copy, small navigation and labels retain the reference hierarchy. Text changes intentionally express Mac Gauge’s product.
- **Spacing and layout rhythm:** Sticky 84px desktop header, airy centered hero, floating cards at corners, 1180px content width, thin dividers, generous section gaps and restrained rounded controls match the reference language. Desktop cards are decorative and deliberately clipped at page edges. On mobile the extra cards are hidden, main art and one card move below the call to action, dense widgets scroll inside their containers, and sections stack.
- **Colors and tokens:** Reused #f8f9fa paper, #242726 ink, #69716d secondary text, #e3e7e4 dividers, #237962 accent and pale sage surfaces. Dark action buttons and insight panel use the source’s charcoal treatment. Focus indicators remain visible.
- **Image quality and asset fidelity:** Existing app icon retained. Original transparent raster instrument still-life replaces the source’s envelope art with the appropriate product subject. It has clean alpha edges and preserved aspect ratio. Phosphor icons match the reference library and are vendored with license. Charts are actual canvas data visualizations, not placeholder illustrations.
- **Copy and content:** Seven gauge modules map to the application README and Ports implementation. All example measurements, processes and containers are labeled fictional. Apple Silicon/macOS 26 requirement, sandbox sensor caveat, existing stable download and invitation-only TestFlight are retained. Competitor prices cite official sources and caveats. Mac Gauge has no invented public price.

## Comparison history

1. Initial desktop and mobile inspection found a P2 anchor-position problem: combined HTML scroll padding and demo scroll margin left approximately 200px above the demo. Reduced the demo scroll margin from 108px to 8px; recaptured and verified mobile demo starts beneath the sticky header with its caption visible (`build/mac-gauge-mobile-demo.png`).
2. Initial mobile hero collapsed the line break without a visible word separator (“surface.Meet”). Added a literal space after the line break and recaptured the hero (`build/mac-gauge-mobile.png`).
3. Added a visible mobile hint for the comparison table’s horizontal scrolling. Readings and filters remain within the page width. Page widths: 375px inside a 390px viewport and 305px inside a 320px viewport, consistent with the browser scrollbar; no page-level overflow.
4. Final paired full-view and focused comparisons confirm the intended typography, palette, composition and hierarchy. Product-specific illustration, metric cards and monitoring demo are intentional adaptations, not drift from a request to match the design language.

## Primary interactions verified in the browser

- All seven module selectors update heading, units, readings, explanatory text and table.
- CPU, memory, GPU, disk, network, sensors and ports states opened successfully.
- Creative work changes memory to 12.8 GB; downloading profile changes network to 48.6 MB/s; restoring everyday work restores initial values.
- Pause/resume changes button state and visible chart status.
- Port search for “Docker” returns sample PostgreSQL and Redis containers; a nonmatching search shows an empty state; clearing restores the list.
- Feature tabs and arrow-key navigation update their panels and accessible selection state.
- Pricing filter shows one free option or three paid options; reset restores all four. Mac Gauge remains visible with an unannounced price.
- Primary navigation and demo anchors work. FAQ expands. Homebrew copy returns success.
- Stable release lookup resolves Mac Gauge 1.0 (850) and its correct GitHub DMG asset. No binary download or install was triggered.
- CSV returns HTTP 200. Local asset/anchor validation passes and there are no duplicate IDs or missing linked files.
- JavaScript syntax and whitespace checks pass. Browser console contains no errors or warnings during checked flows.

## Implementation checklist

- [x] Match the supplied Lifafa design language.
- [x] Implement the responsive local demo.
- [x] Source competitor pricing and separate recommendations from public pricing.
- [x] Preserve distribution behavior and static GitHub Pages compatibility.
- [x] Validate core interactions and capture visual evidence.
- [x] Keep the local preview running and open. No production publishing.

## Follow-up polish and limits

Physical Safari/iPhone testing and VoiceOver have not been performed. Responsive checks used the in-app browser’s viewport overrides. Historical readings in the website are synthetic, and no hardware measurement is attempted. Suggested commercial prices in `docs/pricing-research.md` require a product decision; no App Store pricing or production website was changed.

## Pricing revision — 25 October 2026

User-requested revision: Mac Gauge now appears first with “Pricing coming soon”. The competitor table includes paid apps only, ordered $4.99 → $10 → $11.99. Removed the redundant free/paid filters and synchronized the downloadable CSV and documentation. This supersedes the earlier four-competitor/filter validation above. Browser inspection confirmed the order and labels; `build/mac-gauge-pricing-updated.png` was captured and visually reviewed. JavaScript syntax and whitespace checks pass. No new P0/P1/P2 issues.

final result: passed
