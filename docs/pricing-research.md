# Mac Gauge pricing research

Reviewed 25 October 2026. Amounts below are USD, from official vendor sites or US App Store listings. Prices can change; taxes and local storefront prices vary.

| Product | Published amount | Terms and evidence |
| --- | --- | --- |
| [Stats](https://mac-stats.com/) | Free | Free and open source, with CPU/GPU, memory, network, disk and sensors. Most relevant baseline because Mac Gauge is based on Stats under the MIT License. |
| [MenuBar Stats](https://apps.apple.com/us/app/menubar-stats/id714196447?mt=12) | $4.99 | US Mac App Store purchase; modular monitoring, notifications. Temperature/fan modules require the vendor helper. |
| [TG Pro](https://www.tunabellysoftware.com/tgpro/) | $10 | Current advertised sale, one-time payment. Temperature monitoring and fan control; different scope from an all-system monitor. [FAQ](https://www.tunabellysoftware.com/support/faq/) says personal licenses cover up to three Macs, business licenses one Mac. |
| [iStat Menus 7](https://apps.apple.com/us/app/istat-menus-7/id6499559693?mt=12) | $11.99 | US App Store base app plus optional in-app purchases. Do not present this as the direct-build checkout price. [Bjango](https://bjango.com/mac/istatmenus/) offers direct download and a 14-day trial. The direct purchase overlay displayed regional INR 1,370.19 single / INR 1,713.02 family during this review; local taxes may apply. App Store and direct editions differ. |

## Recommendation, not an announced offer

A recurring fee is difficult to justify for the current local monitoring scope when Stats is free and paid alternatives have low one-time prices. Mac Gauge's basic monitoring inherits substantial capability from Stats; visual polish alone is a weak reason to charge significantly more than established tools.

Recommended starting strategy: retain a free direct build and evaluate a **$4.99 one-time convenience/support purchase** for the App Store. A **$2.99 introductory price** could be tested at launch. These are proposals, not configured prices or commitments. No checkout, entitlement, App Store price or public production copy has been changed.

A $7.99–$9.99 paid tier should wait for validated differentiators such as a better developer workflow around ports/containers, understandable diagnostics or useful historical analysis. Check channel feature parity before charging, especially sandbox restrictions affecting sensors and port visibility. Do not promise future features or lifetime updates without a support policy.

Price cannot establish demand: validate willingness to pay with actual target users before choosing a final amount. Avoid “cheapest”, “best”, exaggerated efficiency claims or claiming Mac Gauge features are unique without a specific supported comparison.

## Public website treatment

The page places Mac Gauge first with “Pricing coming soon”, followed by three paid competitors in ascending USD price: MenuBar Stats ($4.99), TG Pro ($10 current sale), and iStat Menus 7 ($11.99 base app). Free apps are excluded from the public pricing comparison and downloadable CSV. The research above retains the free Stats baseline for internal strategy and the website retains the Stats/MIT attribution. Each listed competitor links to its primary source and includes payment caveats. No redundant free/paid filters are shown.

## Product truth

Website claims are grounded in the local Mac-Gauge README, Modules/Ports implementation, and existing distribution site. Current requirement: Apple Silicon and macOS 26+. Sensors vary by hardware, permissions and distribution. No public TestFlight link is invented. Stable release/Homebrew availability retains release-page fallback. Website demo is synthetic, with no access to system measurements.
