---
name: Clinical Emergency Onboarding
colors:
  surface: '#f8f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f8f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e7e8eb'
  surface-container-highest: '#e1e2e5'
  on-surface: '#191c1e'
  on-surface-variant: '#5c403c'
  inverse-surface: '#2e3133'
  inverse-on-surface: '#eff1f3'
  outline: '#916f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#bf0715'
  primary: '#b70011'
  on-primary: '#ffffff'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#ffb4ab'
  secondary: '#006e2d'
  on-secondary: '#ffffff'
  secondary-container: '#7cf994'
  on-secondary-container: '#007230'
  tertiary: '#99393c'
  on-tertiary: '#ffffff'
  tertiary-container: '#b95152'
  on-tertiary-container: '#fff7f6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#7ffc97'
  secondary-fixed-dim: '#62df7d'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b1'
  on-tertiary-fixed: '#410007'
  on-tertiary-fixed-variant: '#80272b'
  background: '#f8f9fc'
  on-background: '#191c1e'
  surface-variant: '#e1e2e5'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Public Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Public Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system serves critical triage and emergency medical onboarding workflows. In urgent clinical contexts, cognitive overload must be minimized; clarity, rapid legibility, and high-stakes precision are paramount. The personality balances uncompromising authority with human reassurance, eschewing decorative distractions in favor of immediate information hierarchy.

The design movement is a refined, high-efficiency functional minimalism. Surfaces remain luminous, crisp, and uncluttered, with deliberate negative space guiding the user through rapid decision-making. Pure utilitarian layout structure ensures that critical alerts, diagnostic data, and consent authorizations are immediately discernible without friction or visual noise.

## Colors
The palette is strictly restricted to five deliberate values, completely devoid of blue, slate, or cool tinting.

- **Primary (`#DC2626`)**: Reserved for urgent actions, critical priority states, primary action triggers, and vital alerts.
- **Secondary (`#16A34A`)**: Represents verification, stable vitals, completed steps, and positive confirmation.
- **Tertiary (`#E57373`)**: Soft medical red utilized for secondary alerts, non-blocking warnings, subtle focus states, and supportive boundaries.
- **Neutral Ink (`#191C1E`)**: Deep charcoal/ink black for high-contrast primary typography, crisp dividing lines, and dominant iconography.
- **Surface Pure White (`#FFFFFF`)**: Base canvas and card background ensuring maximum luminance and clinical clarity.

Tonal variations for disabled states or subtle dividers are generated solely from low-opacity alphas of `#191C1E` (e.g., 6%, 12%, 24%) on `#FFFFFF` to maintain absolute chromatic purity without introducing secondary blue-gray undertones.

## Typography
Public Sans is used exclusively across all typographic hierarchies. Built for uncompromising legibility and institutional neutrality, its structured geometric forms provide rapid scanning across acute medical screens.

- **Display & Headlines**: Bold, direct, and slightly condensed in letter spacing to deliver immediate priority cues without occupying superfluous vertical height.
- **Body Text**: Tuned for maximum optical legibility against stark white backgrounds. Generous line heights prevent misreading dosages, vital signs, or instructions.
- **Labels & Badges**: Utilize medium and bold weights with subtle positive letter spacing to establish immediate recognition on compact patient tags, input labels, and step counters.

## Layout & Spacing
The layout model employs a strict, responsive fluid grid anchored by an 8pt architectural rhythm:
- **Mobile (< 768px)**: 4-column layout, compact margins (`1rem`) to maximize touch targets and diagnostic data density.
- **Tablet (768px - 1024px)**: 8-column layout with `1.5rem` gutters, balancing multi-step intake panels side-by-side with summary vitals.
- **Desktop (> 1024px)**: 12-column layout capped at a maximum width of 1200px, centering onboarding flows to prevent extreme eye travel during high-stress entry.

Vertical spacing strictly respects increments of `0.5rem` (8px). Critical actions maintain minimum separation distances via `space-md` to eliminate mis-tap risks on mobile triage devices.

## Elevation & Depth
In alignment with modern clinical clarity, visual hierarchy avoids heavy, dark drop shadows or simulated skeuomorphism. Instead, the design system implements flat architectural layering and low-contrast neutral outlines.

- **Base Layer**: Pure canvas `#FFFFFF`.
- **Card & Surface Layer**: Pure `#FFFFFF` surfaces defined by a subtle 1px border of `#191C1E` at 12% opacity.
- **Active / Alert Layer**: Highlighted directly by color intent—1px `#DC2626` borders for critical focus, or `#16A34A` for successful validation.
- **Floating Modals & Sheets**: Supported by a strictly neutral ambient shadow: `0 8px 30px rgba(25, 28, 30, 0.08)` paired with an explicit 1px `#191C1E` (10% opacity) containment border. Underlay backdrops use pure `#191C1E` with a 45% opacity scrim.

## Shapes
In accordance with the 8px baseline specification (`ROUND_EIGHT`), elements employ an 8px (`0.5rem`) primary corner radius across interactive modules. This provides a balance between clinical precision and approachable warmth, softening clinical severity without feeling informal.

- **Base Components (Inputs, Buttons, Cards, Checkboxes)**: Uniform `0.5rem` (8px) radius.
- **Containers & Bottom Sheets (`rounded-lg`)**: `1rem` (16px) radius for structural containment and modals.
- **Pills / Status Chips**: May utilize fully rounded geometric ends (`rounded-full`) exclusively for triage status badges and numerical step markers.

## Components

### Buttons
- **Primary / Urgent Action**: Background `#DC2626`, label `#FFFFFF`, border-radius `0.5rem`. Height 48px to meet clinical touch compliance. Active state darkens tone slightly through internal black overlay (`rgba(0, 0, 0, 0.1)`).
- **Secondary / Confirmatory**: Background `#16A34A`, label `#FFFFFF`, border-radius `0.5rem`. Used for validation and onboarding completion.
- **Tertiary / Neutral Outline**: Background `#FFFFFF`, 1px solid border `#191C1E` (20% opacity), label `#191C1E`.
- **Destructive / Dismiss**: Text-only or ghost button in `#DC2626` with no container fill.

### Input Fields
- **Container**: White background, 48px height, `0.5rem` radius, 1px border of `#191C1E` at 20% opacity.
- **Typography**: Label set in `label-md` (`#191C1E`), placeholder in `#191C1E` at 40% opacity, entered text in full `#191C1E`.
- **States**: 
  - *Focus*: 2px solid border in `#DC2626` (no outer glow).
  - *Valid*: 1px solid border in `#16A34A` with a trailing green confirmation icon.
  - *Error / Triage Alert*: 2px solid border in `#DC2626` with helper message in `#DC2626`.

### Cards & Triage Panels
- Surface: `#FFFFFF`.
- Border: 1px continuous outline in `#191C1E` at 12% opacity.
- Padding: `space-lg` (`1.5rem`) on desktop/tablet, `space-md` (`1rem`) on mobile.
- Urgent Triage Card Variant: Left accent border of 4px solid `#DC2626` to flag high-acuity patient records.

### Chips & Badges
- **Acuity Level 1 (Emergency)**: Background `#DC2626`, text `#FFFFFF`, font `label-sm`.
- **Acuity Level 2 (Urgent / Warning)**: Background `#E57373` at 20% opacity, border 1px solid `#E57373`, text `#DC2626`.
- **Acuity Level 3 (Stable / Verified)**: Background `#16A34A` at 15% opacity, border 1px solid `#16A34A`, text `#16A34A`.

### Selection Controls (Checkboxes & Radios)
- **Checkboxes**: 20x20px, `0.25rem` radius. Unchecked state: 1.5px border `#191C1E` (40% opacity), white fill. Checked state: solid `#16A34A` fill with pure `#FFFFFF` checkmark icon.
- **Radio Buttons**: 20x20px circular frame. Selected state features a solid `#DC2626` outer rim with a centered 10px `#DC2626` circular core.

### Medical Progress Indicator
- Horizontal multi-segment track: Unfilled sections rendered in `#191C1E` at 10% opacity, filled completed stages in `#16A34A`, current active onboarding step highlighted in solid `#DC2626`.