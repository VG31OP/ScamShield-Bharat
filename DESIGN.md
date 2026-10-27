---
name: ScamShield Bharat
description: Citizen Cyber Defense & Scam Detection Platform for India
colors:
  accent: "#074ce0"
  accent-hover: "#0640bf"
  ground: "#fcfcfd"
  ground-muted: "#f3f4f6"
  ink: "#16191f"
  ink-secondary: "#454c58"
  rule: "#dde0e6"
  panel: "#ffffff"
  field-dark: "#16191f"
  on-field: "#fcfcfd"
  on-field-secondary: "#d0d4dd"
  critical: "#d92d20"
  critical-bg: "#fef3f2"
  warning: "#b54708"
  warning-bg: "#fffaeb"
  safe: "#067647"
  safe-bg: "#ecfdf3"
typography:
  display:
    fontFamily: "Host Grotesk, sans-serif"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Host Grotesk, sans-serif"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Host Grotesk, sans-serif"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "8px"
  panel: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
---

# Design System: ScamShield Bharat

## Overview

**Creative North Star: "The Digital Sentinel"**

ScamShield Bharat pairs an open, crisp light reading surface with an electric-blue action color and two substantial dark passages. The system prioritizes clarity and immediate comprehension for citizens under stress who may have received a frightening fraud notification. It avoids frivolous decorative gimmicks in favor of purposeful information hierarchy, explainable visual indicators, and accessible contrast.

**Key Characteristics:**
- **Open Light Foundation:** Clean near-white page (`#fcfcfd`) with pale-grey secondary groupings (`#f3f4f6`).
- **Electric-Blue Focus:** High-contrast electric blue (`#074ce0`) dedicated to meaningful user actions and key nodes.
- **Dual Dark Passages:** Two continuous dark fields (`#16191f`) framing the four-stage analysis architecture and the closing incident triage.
- **Editorial Typography:** Display and title type in Host Grotesk paired with readable, relaxed-leading Instrument Sans for prose.

## Colors

The palette balances clean administrative authority with urgent semantic security signals.

### Primary
- **Electric Blue** (`#074ce0`): The authoritative action color used for primary CTAs, active segmented tabs, and central engine nodes.
- **Electric Blue Hover** (`#0640bf`): Subtle deepening on hover interaction.

### Neutral
- **Page Ground** (`#fcfcfd`): Base canvas for the open reading surface.
- **Muted Ground** (`#f3f4f6`): Pale-grey field used for grouped facts, textarea wrappers, and component backdrops.
- **Panel White** (`#ffffff`): Pure white surface for cards and elevated dialogs.
- **Hairline Rule** (`#dde0e6`): 1px structural dividing lines and card borders.
- **Primary Ink** (`#16191f`): Near-black high-contrast text for headings and primary content.
- **Secondary Ink** (`#454c58`): Muted charcoal for descriptions, metadata, and supporting labels.
- **Dark Field** (`#16191f`): Continuous dark container background.
- **On-Dark Primary** (`#fcfcfd`): Crisp white text inside dark passages.
- **On-Dark Secondary** (`#d0d4dd`): Soft platinum text for supporting copy inside dark passages.

### Semantic Status
- **Critical Red** (`#d92d20` / `#fef3f2` bg): Severe threats, direct OTP requests, and 1930 emergency actions.
- **Warning Amber** (`#b54708` / `#fffaeb` bg): Artificial urgency, suspicious shortlinks, and medium threats.
- **Safe Emerald** (`#067647` / `#ecfdf3` bg): Legitimate notifications, verified official domains, and zero-threat confirmations.

### Named Rules
**The Single-Accent Rule.** Electric blue (`#074ce0`) is reserved strictly for primary interactive actions and the central engine node. It is never used as background wash or decorative tint.

**The Semantic Status Doctrine.** Semantic red, amber, and green swatches appear only in direct response to calculated threat levels and emergency helplines.

## Typography

**Display Font:** Host Grotesk (with sans-serif fallback)  
**Body Font:** Instrument Sans (with sans-serif fallback)  

**Character:** Host Grotesk brings architectural authority and tight typographic rhythm to headings, while Instrument Sans provides relaxed, fatigue-free reading across English, Hindi, and Gujarati scripts.

### Hierarchy
- **Display** (Bold 700, 36px–48px, line-height 1.1): Hero headlines and major section titles.
- **Headline** (Bold 700, 24px–30px, line-height 1.2): Component titles and primary cards.
- **Title** (SemiBold 600, 18px–20px, line-height 1.3): Card headings and status groups.
- **Body** (Regular 400, 15px–16px, line-height 1.6): Reading text, explanations, and advice. Max measure ~68ch.
- **Label** (SemiBold 600, 12px–13px, tracking 0.02em): Badges, table headers, and metadata.
- **Mono** (Medium 500, 12px–13px): Code snippets, URLs, and numeric scores.

### Named Rules
**The Legibility-First Rule.** Body text maintains a minimum line-height of 1.6 and strict WCAG AAA contrast ratio (≥ 7:1 against ground) to ensure readability for elder citizens.

## Layout

The spatial model relies on a fixed-width container (`max-w-6xl` / 1152px) with 24px grid gaps.
- **1.45:1 Hero Split:** Wide introductory text column beside a compact 340px product diagram.
- **Ruled Facts Strip:** 1px hairline dividing strip below the hero presenting four balanced supporting facts.
- **Fluid Stacking:** Stacks gracefully into single-column cards at 768px and two-column fact rows on mobile.

## Elevation & Depth

Surfaces are flat by default with 1px hairline borders (`#dde0e6`). Depth is conveyed through tonal layering (`#ffffff` cards on `#f3f4f6` and `#fcfcfd`) and soft downward shadows (`0 2px 6px -1px rgba(22, 25, 31, 0.04)`).

### Named Rules
**The Flat-At-Rest Rule.** All panels and cards rest flat against the surface. Subtle elevation (`translateY(-1px)`) is activated only during hover interactions.

## Shapes

- **Panels & Containers:** 12px corner radius (`rounded-xl` / `var(--dp-radius-panel)`).
- **Controls & Buttons:** 8px corner radius (`rounded-lg` / `var(--dp-radius-button)`).
- **Pills & Status Chips:** 6px or full pill radius for category indicators.

## Components

### Buttons
- **Shape:** 8px radius (`rounded-lg`).
- **Primary:** Background `#074ce0`, text `#ffffff`, padding `10px 20px`. Hover lifts by 1px with `#0640bf` fill; pressing returns to `translateY(0)`.
- **Secondary:** Background `#ffffff`, border 1px solid `#dde0e6`, text `#16191f`, padding `10px 18px`. Hover fill `#f3f4f6`.
- **Focus:** Visible 2px outline in `#074ce0` with 2px offset.

### Cards / Panels
- **Shape:** 12px radius (`rounded-xl`).
- **Surface:** `#ffffff` panel on `#fcfcfd` ground.
- **Border:** 1px solid `#dde0e6`.
- **Padding:** 20px–24px.

### Inputs & Textarea
- **Surface:** `#ffffff` with 1px solid `#dde0e6`. Focus rings `#074ce0` with 2px glow.

### Native Disclosures
- **Header:** Ruled rows with rotated plus indicator (`transition-transform 160ms ease-out`).

## Do's and Don'ts

### Do:
- **Do** preserve the 1.45:1 hero split and converging diagram composition.
- **Do** maintain the two continuous `#16191f` dark passages for the analysis architecture and the footer.
- **Do** honor reduced motion preferences via `@media (prefers-reduced-motion: reduce)`.
- **Do** preserve full trilingual localization parity across English, Hindi, and Gujarati.

### Don't:
- **Don't** add animated bounce, elastic easings, or gimmicky particle loops.
- **Don't** use electric blue as a full-page background or decorative wash.
- **Don't** fabricate claims, verified threat intelligence feeds, or artificial endorsements.
- **Don't** automatically open or ping untrusted URLs entered by users.
