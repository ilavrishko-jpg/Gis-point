# FlyBy / ONS — reference documents

Source material for the FlyBy optical-navigation product.

## A5007_MON_optical-nav_requirements_2026.docx

**Official "General Requirements for an Optical Navigation Module (МОН) for UAVs"**,
issued by military unit **А5007 (Unmanned Systems Forces of Ukraine)**, 2026.
Marked **ВІДКРИТА ІНФОРМАЦІЯ (open / unclassified information)**.

This is effectively the official buyer-requirements / pre-TTZ document for exactly
FlyBy's product category. Key points relevant to the product:

- **Accuracy requirement:** horizontal error ≤ 3% of distance travelled; with landmarks,
  CEP ≤ 30 m. (FlyBy's 17 m median already clears the 30 m CEP threshold.)
- **Mandatory confidence output** — the module must emit reliability / navigation-solution
  service parameters. Validates FlyBy's "honest confidence / no-fix" differentiator.
- **Encryption + fast data wipe** on loss/capture required — matches FlyBy's encrypted
  on-board map storage.
- Product-form variants recognised: embedded / add-on / combined (matches the module choice).
- Operating conditions to meet: day + twilight, variable lighting, urban/road/field/forest/
  water with limited texture, −20…+50 °C, EW / GNSS-jamming / spoofing, control-link loss.
- EMC standard referenced: ДСТУ EN 61000-4-5:2019.
- Integration with flight controller, INS, telemetry / datalink.

**Gaps this document highlights for FlyBy:** night/twilight mode, full temperature range,
EMC compliance testing, robustness over low-texture terrain (urban/forest/water).

Use it as the acceptance-criteria checklist for UA military procurement. To be worked on
next week (per owner).
