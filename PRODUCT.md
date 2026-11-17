# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Competitive programming practitioners — students and professionals preparing for coding contests and DSA interviews. Daily visitors who want a quick, structured warm-up before practice sessions. Hosted on tle-eliminators.com as part of the TLE Eliminators ecosystem.

## Product Purpose

A 5-minute daily mental gym for CP and DSA revision. Four timed mini-games test complexity judgment, debugging skill, topic recognition, and terminology recall. Completion drives a streak system and shareable scorecard. The product exists to increase daily engagement on the TLE Eliminators platform.

## Positioning

The only daily-game format specifically designed for competitive programming skills. Combines the habit loop of Wordle-style dailies with domain-specific CP/DSA content curated by TLE Eliminators.

## Operating Context

Embedded within the TLE Eliminators website (tle-eliminators.com). Shares the site's navigation, design system, and brand identity exactly — not a standalone product. Users arrive from the main site's navbar, play during study breaks, and share results on Discord/WhatsApp.

## Capabilities and Constraints

Four games per day: TLE or AC (complexity blitz), Debug This Code (bug spotting), Guess the Topic (pattern recognition), CP Wordle (term recall). Unified streak tracking. Shareable emoji scorecard for social platforms. Must support both light and dark themes matching TLE's existing theme system. Client-side only — no backend required for MVP.

## Brand Commitments

TLE Eliminators brand identity: exact colors, typography (Inter/Poppins/JetBrains Mono), border radii, shadows, and component patterns from the production TLE website. Gold gradient CTA buttons. Blue (#236AF2) as primary brand accent. The TLE logo is a required element.

## Evidence on Hand

TLE website dark and light mode HTML/CSS/JS extracted in /scratchpad/refs/. 258 theme variable pairs extracted. TLE logo SVGs in /public/. Matiks.com game flow referenced for UX inspiration only, not design.

## Product Principles

1. **Platform native:** indistinguishable from the rest of tle-eliminators.com.
2. **Fast and focused:** under 5 minutes total, zero friction to start.
3. **Shareable by default:** the scorecard is a growth mechanic, not an afterthought.
4. **Production quality:** no shortcuts, no placeholders, no amateur signals.

## Accessibility & Inclusion

Keyboard navigation for all games. Sufficient contrast in both themes. Screen reader labels on interactive controls.
