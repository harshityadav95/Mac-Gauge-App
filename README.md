# Mac Gauge product site

Local-first static redesign matching the Lifafa Mail website’s visual language: self-hosted Geist/Silkscreen, pale canvas, editorial typography, floating cards and sage accents.

## Local demo

```sh
python3 -m http.server 4186 --bind 127.0.0.1
```

Open http://127.0.0.1:4186/. No build step or dependencies are needed. The interactive demo includes seven gauges, three sample workloads, pause/resume and searchable sample ports. All monitoring values are fictional; it does not read the visitor’s machine.

Pricing comparison includes source links, payment caveats and `assets/mac-gauge-pricing-comparison.csv`. Mac Gauge appears first with “Pricing coming soon”, followed by paid competitors in ascending price order. Suggested pricing is documented separately in `docs/pricing-research.md`.

## Distribution

Product website: https://harshityadav.in/Mac-Gauge-App/. Apple Silicon and macOS 26 or later. Available builds are listed under Releases. The page resolves the latest stable DMG when available, otherwise links to Releases. The local tap contains the stable 1.0 (850) cask. Internal TestFlight testing is by invitation with no public invitation currently available.

## Assets and provenance

- `assets/app-overview-dark.webp` is the user-supplied dashboard illustration. `assets/app-overview-light.webp` is an Image Gen edit of that illustration into Light appearance, preserving the composition and sample data. The appearance showcase defaults to Light and includes keyboard-accessible Light/Dark tabs and full-size image links. Both are design illustrations, not live hardware captures.

- `assets/menu-bar-features.webp` is the user-supplied menu-bar feature illustration, optimized from the provided PNG without cropping. It appears above the interactive demo, includes a sample-readings caption, and opens full size for closer inspection.

- Existing `assets/app-icon.png` and `assets/favicon.png` retain Mac Gauge branding.
- Fonts are reused from the local Lifafa reference with their OFL licenses under `assets/fonts/`.
- Phosphor regular icons are vendored under `assets/icons/`, with MIT license.
- `assets/gauge-still-life.png` is original generated artwork. Built-in Image Gen prompt: “Photoreal editorial tactile physical instrument still life: an off-white vintage analog gauge with a dark green needle, a sage green microchip tile, and a small brushed metal detail, arranged as a loose tilted cluster. Actual transparent background; refined studio product photography, paper-and-aluminum craftsmanship, soft studio light. Compact overlapping objects, three-quarter overhead perspective, entire cluster visible with transparent margins. Muted sage, cream, charcoal and brushed aluminum. No text, numerals, logos, watermark, web UI, browser or device screenshot. Restrained tick marks and dark green needle only.”
- Mac Gauge is based on [Stats](https://github.com/exelban/stats), under the MIT License.

The GitHub Pages workflow publishes the static site when changes reach `main`.
