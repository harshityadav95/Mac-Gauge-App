# Light and Dark appearance showcase

Added on 25 October 2026 to the existing product website, after the menu-bar illustration and before the interactive demo (`#appearance`).

## Assets

- `assets/app-overview-dark.webp`: the user-supplied dark dashboard illustration, 1568 × 1003, optimized to 96,618 bytes.
- `assets/app-overview-light.webp`: a built-in Image Gen edit of the supplied illustration. The prompt requested the same composition, typography, text, values, chart shapes and cyan/mint/violet accents, with light native surfaces, dark text, pale-blue wallpaper and Light selected. Output is 1568 × 1003, optimized to 99,722 bytes.
- Both are explicitly captioned as design illustrations with sample readings.

## Verification

- Light is selected on initial load. The Dark tab updates the image, accessible description, selected state, caption, and both full-size links.
- ArrowLeft from Dark selects and focuses Light using the site's existing keyboard tab handling.
- Desktop checked at 1440 × 1100; mobile at 390 × 844. Both images loaded, the entire composition remains uncropped, and the page has no horizontal overflow at either width.
- No browser console errors were observed. JavaScript syntax validation and Git whitespace checks passed.
- Captures: `appearance-light-desktop.png`, `appearance-dark-desktop.png`, `appearance-light-mobile.png`.
- Temporary viewport overrides were reset after verification. The local preview remains open on the Light view.

No commit, push, or publication was performed.
