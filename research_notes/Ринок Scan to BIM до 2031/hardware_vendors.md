# LiDAR / laser scanner / reality-capture hardware vendors: launches, R&D, M&A and strategy, 2024 – November 2026

> Method note (read first). Research date: 19 Nov 2026. In this session direct page fetching was blocked for every site tried (leica-geosystems.com, investors.hexagon.com, navvis.com, geoweeknews.com, 3dsurvey.si), so all facts below come from web-search result summaries of the linked pages, not from full-text reading. Each fact carries the URL the search engine attributed it to. Exact figures (prices, accuracy specs, deal sizes) should be spot-checked against the linked primary page before publication. Items marked **[UNVERIFIED]** rest on a single secondary/aggregator source or conflict with another source. Vendor accuracy numbers are manufacturer claims unless stated otherwise.

---

## 1. What new products were launched in 2024–2026 and what do they signal?

### Takeaway
Every major vendor now ships a SLAM/mobile product, and the 2025–2026 launch wave splits into two directions: (a) "survey-grade mobile" claiming 3–5 mm (NavVis VLX 4, XGRIDS Lixel L3, Z+F FlexScan 22, Emesent GX1) and (b) cheap "everyday documentation" devices and bundles (NavVis CLX, Leica BLK360 SE Essentials, FARO Blink, FARO Rovi i.1, XGRIDS PortalCam). Static TLS is being consolidated into fewer, tiered, cloud-connected platforms (Leica RTC300/500/700 replacing both RTC360 and ScanStation P-series; FARO Focus i.1 / i.1 X), while Gaussian splatting became a standard deliverable shown by nearly every exhibitor at Intergeo 2025.

### Cited Findings

#### Leica Geosystems / Hexagon
- 9 June 2026: Leica announced the **RTC300, RTC500 and RTC700** terrestrial scanners. The series replaces the existing RTC360/LT **and** the ScanStation P30/P40/P50 lines, in three performance tiers with an upgrade path between tiers. Leica claims they capture "faster and 35% more accurately than its nearest competitor" (vendor claim, no independent verification found). A new Livelink capability in Cyclone FIELD 360 streams scan data to Hexagon GeoCloud during capture — [Leica Geosystems](https://leica-geosystems.com/about-us/news-room/news-overview/2026/06/new-leica-rtc-laser-scanner-series); [Hexagon](https://hexagon.com/about/news-media/press-releases/2026/leica-geosystems-new-leica-rtc-series-sets-the-new-benchmark-in-scanning-accuracy-and-productivity)
- 24 July 2025 (AEC Magazine date): **BLK360 SE Essentials** launched at £12,500 (€14,000), bundling a BLK360 SE scanner with a one-year Cyclone FIELD 360 subscription and PinPoint modelling software; positioned as a lower-cost, easier-to-adopt entry package. The SE takes just under one minute for a full-dome HDR scan vs 20 s for the BLK360 and lacks VIS — [AEC Magazine](https://aecmag.com/reality-capture-modelling/leica-blk360-se-essentials-launches/); [Construction Briefing](https://www.constructionbriefing.com/news/leica-geosystems-launches-compact-3d-scanning-package-for-construction/8082114.article)
- Leica's UK web shop lists the standalone BLK360 SE "starting at £14,400 excl. VAT"; a Spanish retailer lists Essentials at €16,000 excl. tax (not like-for-like with the launch price) — [Leica shop](https://shop.leica-geosystems.com/gb/reality-capture/blk360-se/overview); [Global Geosystems](https://global-geosystems.com/en/product/leica-blk360-se-essentials/)
- BLK2GO PULSE (dual solid-state ToF sensors from Sony + GrandSLAM) was announced 10 Oct 2023 for 2024 market release; no successor announcement for 2025–2026 was found — [Hexagon](https://hexagon.com/company/newsroom/press-releases/2023/Leica-Geosystems-brings-Leica-BLK2GO-PULSE-to-market-for-intuitive-mobile-laser-scanning); [LiDAR News](https://lidarnews.com/leica-geosystems-brings-leica-blk2go-pulse-to/)
- BLK ARC: Geo Week's 1 April 2026 report on Leica's autonomous scanning demos describes BLK ARC as a lidar module for robotic carriers whose maps the robot also uses for its own navigation; first integration is Boston Dynamics Spot, others planned — [Geo Week News](https://www.geoweeknews.com/news/inside-leica-s-autonomous-scanning-demos-at-geo-week); [Hexagon blog](https://blog.hexagon.com/?p=12955)
- June 2025 (Hexagon LIVE Global): Hexagon unveiled the **AEON** humanoid robot, with reality capture (scanning and mapping workspaces for digital twins) as a named function; built with NVIDIA's robotics stack and Microsoft Azure; pilots with Schaeffler and Pilatus. A Geo Week analysis (30 June 2025) judged AEON "not ready for the construction and surveying spaces" — [The Robot Report](https://www.therobotreport.com/hexagon-launches-aeon-humanoid-robot-for-industrial-applications/); [Geo Week News](https://www.geoweeknews.com/blogs/reality-capture-robotics-hexagon-aeon-humanoid)

#### Trimble
- No new Trimble-built terrestrial scanner was found for 2024–Nov 2026. The portfolio remains X7, X9 (announced May 2023) and X12 (2022, hardware from Zoller+Fröhlich) — [Geo Week News](https://www.geoweeknews.com/articles/trimble-x9-3d-laser-scanning-lidar-reality-capture-point-cloud/); [GIM International](https://www.gim-international.com/content/news/trimble-introduces-new-3d-laser-scanning-system)
- September 2024 (Intergeo 2024): Trimble launched the **Reality Capture platform service**, a subscription extension of Trimble Connect for sharing large datasets from MX mobile mapping, X9 and third-party hardware — [PR Newswire](https://www.prnewswire.com/news-releases/new-reality-capture-platform-service-leverages-trimble-connect-to-maximize-the-value-of-geospatial-data-for-millions-of-users-302243095.html); [AEC Magazine](https://aecmag.com/news/trimble-reality-capture-platform-service-launches/)
- September 2026 (Intergeo 2026): rather than launching its own handheld SLAM device, Trimble integrated **Emesent's GX1 and Hovermap STX** data into Trimble Connect and Trimble Business Center (Trimble's Tim Lemmon quoted in the release) — [Geo Week News](https://www.geoweeknews.com/articles/emesents-mobile-slam-scanners-integrated-into-trimble-connect-and-trimble-business-center/); [DroneDJ](https://dronedj.com/2026/09/16/emesent-trimble-lidar-drone-data/)
- Looq's handheld photogrammetric qCam was linked to the Trimble ecosystem through new partnerships **[UNVERIFIED timing]** — [Geo Week News](https://www.geoweeknews.com/articles/emesents-mobile-slam-scanners-integrated-into-trimble-connect-and-trimble-business-center/)
- Q3 2026 earnings call: the ST30 Smart Target was highlighted as a recent Field Systems launch (a surveying system, not a scanner) — [Statementdog transcript](https://statementdog.com/analysis/TRMB/earnings_calls/322028)

#### FARO (AMETEK from July 2025)
- 15 Oct 2024: **Focus Premium Max** announced as the top Focus model with range up to 400 m — [FARO](https://faro.com/en/News-Library/2024/FARO-introduces-new-range-capabilities-in-Focus-Laser-Scanner); [Geo Week News](https://www.geoweeknews.com/articles/faro-introduces-new-range-capabilities-in-focus-laser-scanner/)
- Late 2024: **Orbis Premium** SLAM mobile scanner (IP54) introduced; Orbis combines the GeoSLAM SLAM algorithm with ~15-second stationary "Flash" scans — [FARO](https://faro.com/en/Resource-Library/Article/Introducing-FARO-Orbis-Premium); [GIM International](https://www.gim-international.com/content/news/faro-introduces-slam-scanner-for-smarter-mapping)
- Spring 2025: **Blink** imaging laser scanner launched — compact, "visual-first", simple workflows and automated insights; won an iF Design Award 2026; a free July 2026 firmware update improved its 360° imagery and point-cloud quality — [PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-technology-news/faro-2026-looking-back-and-ahead/157464/); [FARO](https://www.faro.com/en/News-Library/2026/FARO-INSIGHT-Brings-Improved-Point-Cloud-Quality)
- 15 Sept 2026 (Intergeo Munich and Autodesk University): FARO INSIGHT introduced **Focus i.1 and Focus i.1 X** terrestrial scanners (vendor-stated object accuracy up to 0.9 mm; faster colourised scanning; i.1 X has 400 m range and a mountable GNSS/RTK receiver for direct georeferencing) plus **Rovi i.1**, a mobile capture package built with Manifold Tech that bundles device and software subscription and outputs 3D Gaussian splats processed in the cloud via FARO Sphere XG. SCENE moves to a new subscription model with AI data cleaning (SCENE 2027 announced) — [FARO](https://www.faro.com/en/News-Library/2026/FARO-INSIGHT-Introduces-New-Reality-Capture-Solutions); [AEC Magazine](https://aecmag.com/reality-capture-modelling/faro-launches-focus-i-1-laser-scanners/); [GIM International](https://www.gim-international.com/news/faro-insight-puts-workflow-first-with-new-focus-and-rovi-releases); [Engineering.com](https://www.engineering.com/manifold-tech-and-faro-insight-introduce-rovi-i-1/)
- As of October 2026, FARO's Focus, Orbis, Blink, Sphere XG and SCENE product pages did not mention Gaussian splats; splats are a Rovi i.1 deliverable only. FARO publishes no Rovi i.1 price — [Radiance Fields](https://radiancefields.com/platforms/faro)

#### Topcon / Sokkia
- 18 Feb 2025: Topcon and FARO announced a strategic agreement to develop and distribute laser scanning solutions — [Geo Week News](https://www.geoweeknews.com/articles/topcon-and-faro-technologies-announce-strategic-agreement-in-laser-scanning-technology/)
- Oct 2025 (Intergeo 2025, Frankfurt): Topcon launched the "Capture Reality" range — **CR-S2** handheld fusion-SLAM scanner, **CR-P1** multi-functional terrestrial scanner developed with FARO (real-time georeferenced point clouds on site) and CR-H1 — together with a dedicated global geospatial business division — [Business Wire](https://www.businesswire.com/news/home/20251007300626/en/Topcon-to-Launch-Latest-Geomatics-Innovations-at-INTERGEO-2025-for-Simplified-Connected-Mass-Data-Workflows); [GIM International](https://www.gim-international.com/content/news/topcon-expands-geomatics-portfolio-with-new-scanning-solutions); [Geo Week News](https://www.geoweeknews.com/articles/topcon-stakes-its-claim-in-geomatics/)
- Sept 2026 (Intergeo 2026): Topcon announced MAGNET Field/Office 2026, extended MAGNET Bridge modules for the CR-S handhelds, the **CR-M2** mobile mapping system and a GPR collaboration with Proceq (Screening Eagle) — [Geo Week News](https://www.geoweeknews.com/articles/topcon-launches-innovations-supporting-integrated-geomatics-workflows-at-intergeo-2026/)
- Sept 2026: Sokkia showed the **SRS1** mobile laser scanner (handheld, front pack, backpack, vehicle or UAS) and **SRS2** handheld for feature-poor / weak-positioning environments — [Geo Week News](https://www.geoweeknews.com/articles/sokkia-solutions-showcased-at-intergeo-2026/)

#### RIEGL
- Intergeo 2025: showed the new **VZ-1200i** terrestrial scanner and VZ-6000i-26 (range envelope to 6,000 m), VMX-3HA mobile mapping, the RiLOC-F-inside IMU/GNSS subsystem, a new airborne bathymetry solution and a UAV scanner — [RIEGL](https://www.riegl.com/en-uk/news-insights/article/innovation-in-every-pulse-riegls-new-lidar-technologies); [Unmanned Systems Technology](https://www.unmannedsystemstechnology.com/2025/10/riegl-showcases-latest-uav-lidar-solutions-at-intergeo-2025/)
- Sept 2026 (Intergeo 2026): introduced **miniVUX-4UAV** with selectable 100–400 kHz pulse rates — [Unmanned Systems Technology](https://www.unmannedsystemstechnology.com/2026/09/riegl-introduces-minivux-4uav-lidar-sensor-for-uav-applications/)
- The VZ-600i remains in active adoption (McKim & Creed added a third unit, Jan 2026; mountable on vehicles, boats, tripods, backpacks) — [RIEGL](https://www.riegl.com/en-uk/news-insights/article/mckim-creed-expands-advanced-mapping-capabilities-with-third-riegl-vz-600i)

#### Z+F (Zoller+Fröhlich)
- IMAGER 5024 (Essential / Advanced / Supreme) and TopCam announced by Z+F USA with availability Q1 2025 — [LiDAR News](https://lidarnews.com/zf-usa-unveiling-groundbreaking-advancement-in-laser-scanning-technology-introducing-the-imager-5024-and-topcam/)
- **FlexScan 22**: SLAM platform that mounts a static IMAGER 5016/5024 for mobile capture; vendor-claimed accuracy "up to 2.5 mm in the SLAM result", refinable with control points; the whole 5024 series is compatible — [Intergeo/DVW](https://dvw.de/intergeo/en/featured-articles/mobile-scanning-as-the-key-to-digital-reality); [GIM International](https://www.gim-international.com/content/news/zoller-frohlich-s-expanded-3d-laser-scanner-portfolio-now-in-full-rollout); [Z+F](https://www.zf-laser.com/en/laser-scanners/3d-laser-scanner/z-f-flexscan-22)

#### NavVis
- 2024: handheld **NavVis MLX** introduced; **VLX 3** wearable specified at 5 mm local accuracy in a 500 m² test environment — [NavVis](https://navvis.com/about)
- 14 Sept 2026: **VLX 4** announced — described by NavVis as the first portable capture device with native 3 mm point-cloud resolution, positioned for LOD350+, Scan-to-BIM and MEP; three LiDAR sensors including a dedicated high-accuracy unit. Japanese distributor Kozo Keikaku Engineering began sales 30 Sept 2026, shipping from Dec 2026. Note 3 mm is resolution, not accuracy; no independent benchmark found — [konii.de](https://www.konii.de/?p=214985); [MONOist](https://monoist.itmedia.co.jp/mn/articles/2610/05/news008.html)
- Sept 2026 (press release dated 1 Sept; public debut at Intergeo 15–17 Sept): **NavVis CLX**, the smallest and most affordable LX-series device, "built for everyday documentation": max 8 mm local accuracy (1σ, processed, residential indoor test), 40 m LiDAR range at 10% reflectivity, positioned for frequent documentation, quantity surveying and **LOD200** Scan-to-CAD/BIM. The CLX processing licence excludes robotic/autonomous/unattended operation. Price not published in search results (one-time hardware plus annual processing/subscription) — [NavVis](https://www.navvis.com/blog/navvis-launches-navvis-clx-built-for-everyday-documentation); [NavVis CLX specs](https://knowledge.navvis.com/docs/navvis-clx-specifications); [NavVis CLX](https://www.navvis.com/clx)

#### Emesent
- Product line as of 2026: Hovermap (STX), the **GX1** handheld SLAM+RTK scanner, Aura cloud software and Cortex AI autonomy software. Emesent claims GX1 delivers 5–10 mm global accuracy with unconstrained SLAM or 15 mm with RTK/PPK (vendor claim) — [Geo Week News](https://www.geoweeknews.com/articles/emesents-mobile-slam-scanners-integrated-into-trimble-connect-and-trimble-business-center/); [GIM International](https://www.gim-international.com/content/news/emesent-lands-us-17m-in-new-funding-for-ai-powered-mapping-and-robotics)
- Hovermap is deployed at 200+ mine sites (Rio Tinto, BHP, Glencore); US Army selected it as one of six xTech|Live winners in April 2026 — [Geo Week News](https://www.geoweeknews.com/articles/emesent-secures-17-million-to-accelerate-autonomous-intelligence-platform/)

#### GeoSLAM (FARO)
- GeoSLAM no longer appears as a separate product brand in 2024–2026 coverage; its SLAM algorithm lives on inside FARO Orbis — [GIM International](https://www.gim-international.com/content/news/faro-introduces-slam-scanner-for-smarter-mapping)

#### Matterport (CoStar from Feb 2025)
- Matterport stopped selling the Pro2 camera and Axis mount in October 2025 to focus on the Pro3 **[UNVERIFIED — business-model summary site]** — [dcf-analysis](https://dcf-analysis.com/products/mttr-business-model-canvas)
- A 2026 user-forum thread discusses a Pro3 price drop and speculates about a "Pro4" — speculation only, no official announcement found **[RUMOUR]** — [We Get Around Network](https://www.wegetaroundnetwork.com/topic/21667/surprised-by-the-pro3-price-drop-is-there-something-i-should-know/)

#### XGRIDS and other Chinese SLAM vendors
- 15 Sept 2026 (Intergeo 2026): XGRIDS unveiled the **Lixel L3** flagship: 5 mm @1σ post-processed relative accuracy (white paper: P68 of 4.2 mm across 7 units and 1,524 measurements — vendor-run validation), 2 cm post-processed absolute accuracy, 120 m range, 16- and 32-channel versions. UK reseller pricing £25,199 (16-ch) and £35,999 (32-ch) incl. VAT, first stock October 2026 — [PR Newswire/Kyodo](https://kyodonewsprwire.jp/release/202609155963); [heliguy white-paper summary](https://www.heliguy.com/blogs/posts/xgrids-lixel-l3-accuracy-validation/); [heliguy L3 vs L2 Pro](https://www.heliguy.com/blogs/posts/xgrids-l3-vs-xgrids-l2-pro/); [AEC Magazine](https://aecmag.com/reality-capture-modelling/xgrids-unveils-lixel-l3-spatial-scanner/)
- XGRIDS **PortalCam**, a "spatial camera" built specifically for 3D Gaussian splatting capture, is listed at US$4,999 (basic) and US$6,499 (premium) by Rock Robotic; a reseller blog reported 300+ units sold in 24 hours **[UNVERIFIED sales claim]**. Lixel K1 has been succeeded by K2 — [Rock Robotic](https://store.rockrobotic.com/XGRIDS-PortalCam-Standard-Package-p807648544); [Radiance Fields](https://radiancefields.com/xgrids-announces-spatial-camera-portalcam); [OpenELAB](https://openelab.io/blogs/learn/portalcam-sells-300-units-in-24-hours-is-this-the-3d-gaussian-splatting-breakthrough); [heliguy](https://www.heliguy.com/blogs/posts/xgrids-l3-vs-k2-vs-portalcam/)
- CHCNAV **RS10** (integrated handheld SLAM + GNSS RTK) was released April 2024; the **RS30** is the 300 m, 32-channel, three-camera version with vendor-stated relative accuracy below 1 cm — [Unmanned Systems Technology](https://www.unmannedsystemstechnology.com/2024/04/chcnav-releases-the-rs10-slam-laser-scanner/); [Tri-Site](https://surveyequipment.uk/products/rs30-300m-slam-scanner)
- Stonex launched the **X70GO** on 6 March 2024 and later a hybrid mobile real-time mapping solution; Feima Robotics released the SLAM200E as successor to the SLAM100 — [Geo Week News](https://www.geoweeknews.com/articles/mobile-mapping-scanner-stonex-x70go-surveying/); [GIM International](https://www.gim-international.com/content/news/stonex-unveils-hybrid-mobile-real-time-mapping-solution); [GIM International](https://www.gim-international.com/content/news/feima-robotics-releases-slam200e-handheld-lidar-scanner)
- Intergeo 2025: Realsee showed the Poincare handheld laser scanner and Galois M2 LiDAR camera — [Finanzen.net](https://www.finanzen.net/nachricht/aktien/realsee-showcases-3d-reconstruction-and-surveying-solution-at-intergeo-2025-14992743)

#### Cross-vendor trade-show signal
- Intergeo 2025 (Frankfurt, 7–9 Oct): a Geo Week reporter noted "the sheer number of new SLAM scanners — every company had one", and Gaussian splatting tools from Esri, Topcon, GreenValley, Pix4D, GeoCue, PrevU3D, FJDynamics, XGRIDS and others — [Geo Week News](https://www.geoweeknews.com/blogs/3-things-i-didn-t-expect-to-see-at-intergeo-but-did)
- April 2026: Geo Week reported DJI had added Gaussian splatting support to both Terra and FlightHub — [Geo Week News](https://geoweeknews.com/blogs/geospatial-or-construction-watch-this-splats)
- Geo Week 2026 (Denver) panels framed laser scanning and drones as moving "from optional add-ons to core components of workflows"; interoperability across proprietary platforms and workforce shortages were flagged as persistent problems — [GIM International](https://www.gim-international.com/content/news/geo-week-2026-highlights-reality-capture-s-strategic-role)

#### DJI
- 10 June 2025: **Matrice 400** launched (59-minute flight time; US retail around US$10,400–10,450 airframe) — [DroneLife](https://dronelife.com/2025/06/10/dji-launches-matrice-400-enterprise-drone-with-59-minute-flight-time/); [Dronefly](https://www.dronefly.com/products/dji-matrice-400)
- **Zenmuse L3** (launch date not confirmed in results; late 2025): 1535 nm laser, 0.25 mrad divergence, 950 m range at 10% reflectivity/100 kHz, dual 100 MP RGB cameras, rated 3 cm vertical / 4 cm horizontal RMSE at 120 m altitude; Matrice 400 only. US retail about US$17,400–17,499; Notebookcheck reported ~€8,000 excl. VAT at launch **[conflicting / unverified]** — [DJI specs](https://enterprise.dji.com/zenmuse-l3/specs); [DJI announcement](https://www.dji.com/media-center/announcements/dji-release-zenmuse-l3); [Drone Nerds](https://www.dronenerds.com/products/dji-zenmuse-l3); [Notebookcheck](https://www.notebookcheck.net/DJI-launches-Zenmuse-L3-with-LiDAR-and-RGB-sensors.1155076.0.html)

#### Teledyne Geospatial / Optech
- No new terrestrial scanner 2025–2026; activity is airborne/UAV (Galaxy Edge and Network Surveyor shown at Intergeo 2024; new compact pod-mount lidar previewed at Intergeo 2025) — [Teledyne Optech](https://www.teledyneoptech.com/news-events/news/teledyne-optech-brings-latest-hardware-solutions-to-intergeo-2025); [Sensors and Systems](https://sensorsandsystems.com/teledyne-geospatial-unveils-super-resolution-airborne-lidar-with-edge-computing)

#### Sensor suppliers (Hesai / Livox / Ouster)
- Livox lists the Mid-360 at US$979; on 21 Sept 2026 a cheaper **Mid-360L** (100,000 pts/s, half the point rate, lower power) was reported, price unpublished — [DroneXL](https://dronexl.co/2026/09/21/livox-mid-360l-lidar-half-point-rate-robots/)
- Hesai says its unit cost is about US$200, down from >US$50,000 a decade earlier, and that it produced over a million units in 2025 (automotive-class sensors) — [Automotive World](https://www.automotiveworld.com/news/hesai-brings-lidar-to-e-scooters-as-per-unit-costs-plummet/); [Meticulous Research](https://www.meticulousresearch.com/meticulous-next/lidar-outlook-2026-2035)

#### Smartphone / consumer LiDAR
- An ISPRS 2026 study of five iPhone scanning apps found smartphone LiDAR can reach centimetre-level accuracy for heritage documentation, with large variation between apps — [ISPRS Archives](https://isprs-archives.copernicus.org/articles/XLIX-M-1-2026/1/2026/)
- Polycam states ±½ inch accuracy on standard interior captures and markets phone capture for LOD 200 and "most LOD 300" work (vendor claim) — [Polycam](https://poly.cam/blog/scan-to-bim-from-mobile-capture-to-revit-ready-model)

### Inferences
- Leica collapsing RTC360 and the P-series into one tiered RTC family, and FARO renaming Focus to "i.1" with subscription software, both point to static TLS becoming a mature, consolidated category where differentiation moves to cloud streaming, on-device registration and software subscriptions.
- Trimble is the only one of the big three with no new scanner hardware in the period; partnering with Emesent and Looq and investing in the Connect data platform suggests a deliberate "platform over proprietary capture hardware" position.
- Incumbents are answering Chinese price pressure with stripped-down bundles (BLK360 SE Essentials, Blink, CLX, Rovi i.1) rather than cutting flagship prices.
- FARO sourcing Rovi i.1 from Manifold Tech and Topcon sourcing CR-P1 from FARO show white-labelling/OEM partnerships replacing in-house development for mobile and entry products.

### Gaps
- Leica BLK2GO/BLK2FLY/BLK ARC and Pegasus mobile mapping: no dated 2025–2026 hardware refresh found; leica-geosystems.com could not be fetched.
- Trimble MX-series updates 2024–2026 and Trimble Dimensions announcements: nothing surfaced.
- Exact launch dates for DJI Zenmuse L3, XGRIDS PortalCam, Lixel L2 Pro and K2; official prices for NavVis CLX/VLX 4, FARO Blink, Rovi i.1, Focus i.1.
- SHARE (SLAM S20), FJDynamics Trion P2, GreenValley LiGrip: no dated launch facts found. Artec (Ray) and Ouster: nothing relevant found.
- The Geo Week article "What's New in SLAM-Based Handheld Scanning in 2025?" (27 Mar 2025) exists but could not be read: https://www.geoweeknews.com/articles/lidar-mobile-mapping-scanning-slam-navvis-exyn-emesent-geocue-faro-stonex/

---

## 2. Price erosion: how cheap have capable SLAM scanners become, and who captures data as a result?

### Takeaway
By 2026 there are three clear price bands: marketplace-listed Chinese handheld SLAM units at roughly US$2,300–6,300, branded mid-range devices at about €15,000–35,000, and survey-grade mobile systems at €60,000–90,000+; a Gaussian-splat capture camera costs about US$5,000 and the core LiDAR sensor under US$1,000. Evidence that this shifts capture in-house to owners and contractors is so far vendor positioning and anecdote, not measured adoption data.

### Cited Findings
- A 2026 buyer's guide puts entry-level handheld SLAM at €15,000–25,000, mid-range at €30,000–55,000 and survey-grade at €60,000–90,000+, with software, training and correction services extra — [Surveyingpedia](https://surveyingpedia.com/guides/handheld-slam-laser-scanner)
- Marketplace (Alibaba-type) listings: QIANXUN Starlight H7 about US$2,300–2,350; GreenValley LiGrip SE US$2,950; Geosun GS-200G about US$2,300–2,900; CHCNAV GS5 US$4,488–5,888. These are B2B/FOB indications, not confirmed MSRPs **[UNVERIFIED]** — [Accio](https://www.accio.com/biz-cheap/slam-hand-held-lidar-cheapest); [Alibaba](https://electronics.alibaba.com/product/lidar-3d-scanner-handheld)
- US reseller CRATUS sells SXMCA handheld LiDAR scanners from US$6,300 with US support — [Cratus](https://www.cratustech.com/handheld-lidar-scanners/)
- Named-brand retail prices: CHCNAV RS10 £20,950 (UK) / ~€24,000; CHCNAV RS30 ~£29,450 / €32,000; Stonex X70GO US$24,995; Stonex X200GO ~€35,000; Stonex X120GO US$29,995 and X40GO US$16,995 with software; FJD Trion P1 US$10,449 at a US retailer; XGRIDS Lixel L2 Pro listed from £6,500 incl. VAT by one UK reseller **[single source — likely a base configuration; verify]** — [Tri-Site](https://surveyequipment.uk/equipment/chcnav-rs10-300m-slam-scanner/); [Laserscanning Europe](https://shop.laserscanning-europe.com/CHCNAV-RS30-32-channels); [Benchmark Supply](https://benchmarksupply.com/products/x70go-slam-laser-scanner); [3Dsurvey](https://3dsurvey.si/7-slam-scanners-put-to-the-test/); [E38 Survey Solutions](https://e38surveysolutions.com/pages/handheld-3d-scanner-price-guide); [FJDynamics store](https://store.fjdynamics.com/products/fjd-trion-p1-3d-lidar-scanner); [heliguy](https://www.heliguy.com/blogs/posts/which-xgrids-scanner-is-best-for-me-l2-pro-vs-k1-vs-portalcam/)
- XGRIDS Lixel L3 (5 mm class): £25,199–35,999 incl. VAT — [heliguy](https://www.heliguy.com/blogs/posts/xgrids-l3-vs-xgrids-l2-pro/)
- XGRIDS PortalCam: US$4,999–6,499 — [Rock Robotic](https://store.rockrobotic.com/XGRIDS-PortalCam-Premium-Package-p807596977)
- Leica BLK360 SE Essentials: £12,500 / €14,000 including software (July 2025) — [AEC Magazine](https://aecmag.com/reality-capture-modelling/leica-blk360-se-essentials-launches/)
- DJI Zenmuse L3 about US$17,400; Matrice 400 + L3 bundle US$27,850 at one retailer — [Drone Nerds](https://www.dronenerds.com/products/dji-zenmuse-l3); [Newegg](https://www.newegg.com/p/380-0002-005G8)
- Component floor: Livox Mid-360 US$979; a DIY SLAM scanner can be built for about US$900–1,500 (sensor + Raspberry Pi/Jetson + open-source SLAM), "useful for room-level work" but not matching commercial units — [DroneXL](https://dronexl.co/2026/09/21/livox-mid-360l-lidar-half-point-rate-robots/); [SmartBotParts](https://smartbotparts.com/articles/handheld-lidar-scanner-cost.html)
- Hesai's Q2 2026 average unit price fell below 1,300 yuan, down 35% year on year; analysts expect 2026 blended ASP to fall about 31% (automotive lidar, not survey units) — [36Kr](https://eu.36kr.com/en/p/3946451052592521); [Longport](https://longportapp.cn/news/296284832)
- Who captures: NavVis positions CLX for "everyday documentation at scale" (frequent documentation, site assessment, quantity surveying); customer Plowman Craven (a survey service provider) says accuracy is "more than sufficient" for most indoor applications — [NavVis](https://www.navvis.com/blog/navvis-introduces-clx-the-first-agile-handheld-capture-device-for-reliable-everyday-documentation-at-scale); [NavVis](https://www.navvis.com/blog/navvis-clx-customer-perspective-plowman-craven-part-1)
- Architecture firm Clark Nexsen (Polycam customer) reports 50% less time modelling existing conditions and is considering requiring contractor-provided phone scans during construction verification (vendor case study) — [Polycam](https://poly.cam/customer-stories/clark-nexsen)
- Trimble reported its reality capture platform service grew ingested data volume 68% year on year and that it adds over a petabyte of construction data to Trimble Connect each quarter (2026 earnings calls) — [Webull Q2 2026 transcript](https://www.webull.com/news/15429755288855552)
- NavVis says more than a billion square metres were added to its platform in 2025 — [LiDAR Magazine](https://lidarmag.com/2026/08/07/navvis-raises-usd-85m-series-d-round-to-supply-the-data-foundation-for-physical-ai/)

### Inferences
- A capable RTK-SLAM handheld from a Chinese brand through a Western dealer costs roughly the same (£20–30k) as an entry static scanner did five years ago, and no-name units are an order of magnitude cheaper; the hardware barrier to in-house capture by contractors and owners is effectively gone for LOD 200-class documentation.
- With sensors at ~US$1,000 and falling, hardware margin is unsustainable as a differentiator; vendors are moving revenue to processing licences and subscriptions (NavVis CLX annual processing fee, FARO SCENE subscription, Rovi i.1 bundle, Leica Essentials bundle).
- Rapid growth in data volume on vendor clouds (Trimble +68%, NavVis 1 bn m²/yr) is consistent with capture becoming more frequent and more distributed, which increases demand for downstream processing/modelling rather than for capture labour.

### Gaps
- No independent survey data found quantifying the share of scanning done in-house by contractors/owners versus service providers, or its change 2024–2026.
- Historic price series for the same model (true like-for-like erosion) not found; the bands above mix list, reseller and marketplace prices in three currencies.
- Chinese-vendor domestic prices and unit volumes not found.

---

## 3. M&A, ownership changes, funding and stated strategic priorities

### Takeaway
Three of the best-known capture brands changed owner or structure in 2025–2026: FARO went to AMETEK (US$920m, July 2025) and was split in January 2026 into FARO INSIGHT (reality capture) and FARO CREAFORM (metrology); Matterport went to CoStar (US$1.6bn, Feb 2025); and Hexagon spun off its software businesses as Octave (completed 28 May 2026), leaving Leica Geosystems inside a more hardware/measurement-focused Hexagon. Growth capital is flowing to "spatial data for physical AI" (NavVis US$85m Series D, Emesent A$25m).

### Cited Findings

#### AMETEK – FARO
- Announced 6 May 2025; completed 21 July 2025 at US$44.00 per share in cash, about US$920m net of cash; FARO had roughly US$340m annual sales; delisted from Nasdaq; placed in AMETEK's Ultra Precision Technologies division (Electronic Instruments Group) alongside Creaform and Virtek — [AMETEK](https://www.ametek.com/newsroom/news/investor/2025/july/ametek-completes-acquisition-of-faro-technologies); [FARO](https://www.faro.com/en/News-Library/2025/AMETEK-Completes-Acquisition-of-FARO-Technologies)
- January 2026: AMETEK reorganised FARO into two units. Focus scanners, SCENE and Sphere XG sit under **FARO INSIGHT**, headquartered in Korntal-Münchingen, Germany — [GIM International](https://www.gim-international.com/news/faro-insight-puts-workflow-first-with-new-focus-and-rovi-releases)
- A report dated 15 Jan 2026 says FARO's 3D measurement business merged with Creaform on 13 Jan 2026 to form **FARO CREAFORM**, with reality capture separated as FARO INSIGHT **[UNVERIFIED — single secondary source]** — [news18a](https://english.news18a.com/news/english_224556.html)
- AMETEK Q4 2025 call (3 Feb 2026): target to "more than double EBITDA margins from the current mid-teens level to a 30% level and achieve a 10% return on invested capital by year three" for FARO — [Motley Fool transcript](https://www.fool.com/earnings/call-transcripts/2026/02/03/ametek-ame-q4-2025-earnings-call-transcript); [TIKR](https://www.tikr.com/blog/ameteks-920-million-faro-bet-is-paying-off-heres-the-285-bull-case)
- 2026 calls: FARO integration described as "on plan" and already yielding margin synergies; third-party 10-Q summaries disagree on acquisition dilution (40 bps vs 0.8%) **[UNVERIFIED figures]** — [Barchart](https://www.barchart.com/story/news/3655388/ame-q2-deep-dive-multi-segment-demand-and-strategic-acquisitions-propel-growth); [Autobound](https://www.autobound.ai/companies/ametek/10-q)
- Topcon–FARO strategic agreement (18 Feb 2025) pre-dates the AMETEK deal and produced the Topcon CR-P1 — [Geo Week News](https://www.geoweeknews.com/articles/topcon-and-faro-technologies-announce-strategic-agreement-in-laser-scanning-technology/)

#### Hexagon / Octave / Leica Geosystems
- 17 June 2025: Hexagon named its planned software spin-off **Octave**, comprising Asset Lifecycle Intelligence, Safety, Infrastructure & Geospatial (SIG), ETQ and Bricsys; Hexagon keeps measurement-technology businesses — [Hexagon](https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiledhexagon-reveals-name-for-potential-2026-company-spin-off); [Geo Week News](https://www.geoweeknews.com/articles/hexagon-spin-off-to-be-called-octave/)
- Hexagon's AGM resolved on 24 April 2026 to distribute all Octave shares; distribution completed 28 May 2026; Octave Intelligence plc SDRs trade on Nasdaq Stockholm and Class B shares on Nasdaq New York — [Hexagon investors](https://investors.hexagon.com/share-information/octave-separation); [Hexagon](https://hexagon.com/company/newsroom/press-releases/2026/hexagon-proposes-distribution-and-listing-of-octave-intelligence-plc-and-provides-update-on-planned-spin-off)
- Leica Geosystems stays with Hexagon. One trade article stating Leica and Agtek are in the Octave portfolio conflicts with Hexagon's own perimeter list and should be treated as an error; Bricsys moved to Octave out of the Geosystems division — [ENR](https://www.enr.com/articles/60934-hitting-a-new-octave-hexagon-splits-into-two-separate-companies); contradicted by [Equipment World](https://www.equipmentworld.com/technology/article/15749878/hexagon-to-create-new-company-called-octave)
- Capital Markets Day, London, 30 April 2026: 2026–2030 targets set; the former Geosystems division is now **Infrastructure & Geospatial**, one of three business areas with Manufacturing Intelligence and Autonomous Solutions; new profitability metric EBITAC charges full R&D cost to the P&L, with Robotics excluded — [Hexagon](https://hexagon.com/company/newsroom/press-releases/2026/hexagon-releases-new-targets-at-its-capital-markets-day-2026); [Inderes](https://www.inderes.fi/en/releases/hexagon-releases-new-targets-at-its-capital-markets-day-2026)
- Cost programme launched 2025 targeting about EUR 110m savings, due fully in place by end-2026; at Q2 2026 management said restructuring was almost complete and ahead of schedule — [Inderes](https://www.inderes.fi/en/research/hexagon-q425-financials-broadly-as-expected-we-end-coverage); [roic.ai transcripts](https://www.roic.ai/quote/HXGBF/transcripts)
- Geosystems was hit by a decision not to restock channels in weaker markets, notably Asia/China, and by weak construction; in Q2 2026 Infrastructure & Geospatial posted 4% organic growth "despite exposure to challenged construction markets", with the new RTC family referenced — [Financialreports.eu](https://financialreports.eu/filings/hexagon/interim-quarterly-report/2026/13752966/)
- Q3 2026 (report dated 23 Oct 2026): group operating net sales EUR 1,049.1m, organic growth 13% (a third-party summary says 12%) — [Hexagon](https://hexagon.com/about/news-media/press-releases/2491677/hexagon-interim-report-1-january-30-september-2026)

#### CoStar – Matterport
- Announced April 2024; closed 28 Feb 2025 at US$5.50 per share (US$2.75 cash + US$2.75 CoStar stock), about US$1.6bn enterprise value, a month ahead of schedule — [Business Wire](https://www.businesswire.com/news/home/20250228873241/en/CoStar-Group-Completes-Acquisition-of-Matterport-Ushering-in-a-New-Era-of-3D-Digital-Twins-and-AI-Powered-Real-Estate-Innovation); [Inman](https://www.inman.com/2025/02/28/costar-closes-1-6b-matterport-acquisition-ahead-of-schedule/)
- CoStar's stated use: Matterport 3D tours and floor plans to strengthen Homes.com search; Matterport subscription revenue reportedly up 19% in CoStar's Q1 2026 results **[secondary source]** — [We Get Around Network](https://wegetaroundnetwork.com/topic/21567/whats-new-in-prop-tech-april-30-2026/)
- CoStar shut down VHT Studios (real-estate photography unit Matterport bought in 2022) around August 2025 **[forum source]** — [We Get Around Network](https://www.wegetaroundnetwork.com/topic/21051/costar-shutting-down-vht-studios-a-division-of-matterport)

#### NavVis
- 6 Aug 2026: US$85m (about €74m) Series D led by US private-equity firm The Jordan Company (TJC), for building a "spatial data engine", accelerating AI and US expansion, framed as "the data foundation for Physical AI"; other investors reported as Yttrium, Kozo Keikaku Engineering and Cipio Partners — [LiDAR Magazine](https://lidarmag.com/2026/08/07/navvis-raises-usd-85m-series-d-round-to-supply-the-data-foundation-for-physical-ai/); [Munich Startup](https://www.munich-startup.de/en/news/navvis-drives-ai-expansion-with-74-million)
- Conflict: William Blair lists a US$75m "strategic growth investment led by TJC, Yttrium, Cipio Partners | March 2026" — may be the same transaction described differently or a first close **[UNRESOLVED]** — [William Blair](https://www.williamblair.com/News/NavVis-and-The-Jordan-Company-Transaction)

#### Emesent
- July 2026: A$25m (about US$17m) round — A$10m venture debt from Australia's National Reconstruction Fund Corporation (its first venture-debt deal) plus an A$15m SAFE note backed by Main Sequence, QIC, NGS Super, Hostplus and Orion Resource Partners; funds manufacturing expansion at Wacol, Queensland and the Cortex AI and Aura platforms. Some outlets report a different split (US$7m debt + US$10m equity) — [Emesent](https://www.emesent.com/news/emesent-secures-25-million-to-accelerate-autonomous-intelligence-platform); [SmartCompany](https://smartcompany.com.au/startupsmart/robotics-startup-emesent-raises-25-million-nrfc-venture-debt); [Geo Week News](https://www.geoweeknews.com/articles/emesent-secures-17-million-to-accelerate-autonomous-intelligence-platform/)

#### Trimble
- Q2 2026: Field Systems revenue US$442.5m, up 12%, driven by data-centre, utilities and energy infrastructure demand; Field Systems ARR guidance includes a 400–500 bp headwind from moving a white-label product to internal technology — [Webull transcript](https://www.webull.com/news/15429755288855552)
- Q1 2026 call: management acknowledged lower visibility "especially in hardware and international markets"; "Connect & Scale" strategy framed as connecting hardware and software, office and field — [Motley Fool transcript](https://www.fool.com/earnings/call-transcripts/2026/05/06/trimble-trmb-q1-2026-earnings-transcript/)
- Q3 2026 call: Field Systems (15% of company ARR) faces three discrete headwinds in H2 2026 (not named in the excerpt) — [Statementdog](https://statementdog.com/analysis/TRMB/earnings_calls/322028)

#### Regulation affecting DJI
- 22–23 Dec 2025: the US FCC added foreign-made UAS and critical components to its Covered List, blocking FCC authorisation of new models (covering most DJI production) unless DoD/DHS grants an exemption; previously authorised models can still be imported, sold and used — [Inside Unmanned Systems](https://insideunmannedsystems.com/fcc-moves-to-block-new-foreign-made-drone-approvals/); [SCMP](https://www.scmp.com/news/china/article/3337398/us-bars-approvals-new-models-chinas-dji-all-other-foreign-drones)

### Inferences
- After 2025–2026, none of the three large Western scanner makers is a pure-play: Leica sits in a slimmed measurement-focused Hexagon, FARO in an industrial conglomerate with an explicit margin-doubling mandate, Trimble's scanners are a small part of a software-led company. Expect price discipline and subscription conversion rather than a price war from them.
- AMETEK's 30% EBITDA-margin target for FARO makes aggressive low-price hardware unlikely; the Manifold Tech-sourced Rovi i.1 fits a "buy-in the low end, keep margin on Focus + software" approach.
- Octave took Bricsys and the SIG/ALI software; Hexagon's reality-capture hardware and its downstream BIM/asset software now sit in two different listed companies, which may loosen the previously integrated Leica-to-Bricsys/ALI story.
- NavVis and Emesent both pitch investors on AI/autonomy data platforms rather than scanners, signalling where capital sees value.
- The FCC action limits DJI's future US roadmap (post-L3 payloads/airframes), opening room for non-Chinese UAV-lidar suppliers in the US while leaving Europe and other regions unaffected.

### Gaps
- XGRIDS funding: Dealroom lists a Series A but no amount or investors could be read.
- No ownership/funding information found for CHCNAV, SHARE, FJDynamics, Stonex, Z+F, RIEGL in the period.
- Infrastructure & Geospatial segment growth for Q3 2026 and CMD segment targets not retrieved.
- Matterport lay-offs 2026 and hardware roadmap under CoStar: no reliable source.
- AMETEK primary filings were not read; FARO margin/dilution figures are from third-party summaries.

---

## 4. Autonomy: robots, drones and continuous capture for construction progress monitoring

### Takeaway
Autonomous capture is commercially real but still narrow: Spot with Leica BLK ARC, Trimble X7 or FARO Focus payloads, docked drones, and autonomy stacks such as Emesent Cortex AI are deployed at leading contractors (Turner runs robots nightly), while the newest low-cost scanners are explicitly licensed for human operation only. The bottleneck has moved from capture hardware to autonomous navigation on changing sites and to automated comparison against BIM.

### Cited Findings
- Boston Dynamics positions Spot for routine laser-scanning routes feeding digital twins and BIM, with a Leica payload named for laser scanning — [Boston Dynamics](https://bostondynamics.com/industry/construction/)
- Trimble X7 + FieldLink was released as a turnkey Spot package jointly developed with Boston Dynamics (original 2021; article updated Feb 2026) — [LiDAR News](https://lidarnews.com/autonomous-robotic-3d-laser-scanning-system/)
- FARO's Trek integration lets Spot record a scanning mission once with a Focus S scanner and repeat it for progress monitoring and quality checks — [Boston Dynamics](https://bostondynamics.com/blog/automated-construction-site-documentation/)
- Turner Construction uses DroneDeploy's robotics solution with Spot for autonomous daily capture and 360° walkthroughs, running inspections overnight; the case study title claims inspection time cut by over 95% (vendor-published) — [Boston Dynamics](https://bostondynamics.com/case_studies/turner-construction-uses-ground-robots-to-cut-inspection-time-by-over-95-percent)
- July 2025: DroneDeploy launched Progress AI, automated progress tracking from aerial and ground capture, claiming 95% accurate reports (vendor claim) — [DroneDeploy](https://dronedeploy.com/blog/dronedeploy-redefines-progress-tracking-in-construction-with-launch-of-progress-ai); [Geo Week News](https://www.geoweeknews.com/news/dronedeploy-ais-to-transform-automated-progress-tracking-in-construction)
- OpenSpace Air uses drone footage and AI to build site mosaics overlaid on design models (reported via Suffolk Construction) — [Suffolk](https://suffolk.com/news/openspace-air-how-drone-based-reality-capture-is-changing-construction-progress-tracking/)
- Leica demonstrated autonomous scanning (BLK ARC on robotic carriers) at Geo Week 2026 — [Geo Week News](https://www.geoweeknews.com/news/inside-leica-s-autonomous-scanning-demos-at-geo-week)
- Hexagon AEON humanoid (June 2025) lists reality capture as a use case, but trials are in manufacturing (Schaeffler, Pilatus) — [The Robot Report](https://www.therobotreport.com/hexagon-launches-aeon-humanoid-robot-for-industrial-applications/)
- Emesent's July 2026 funding targets Cortex AI, its onboard autonomy engine for GPS-denied flight, and the Aura cloud — [Geo Week News](https://www.geoweeknews.com/articles/emesent-secures-17-million-to-accelerate-autonomous-intelligence-platform/)
- NavVis CLX licence terms exclude robotic, autonomous or unattended operation — [NavVis CLX](https://www.navvis.com/clx)
- Livox's Mid-360L (Sept 2026) is aimed at robots, with lower point rate and power draw — [DroneXL](https://dronexl.co/2026/09/21/livox-mid-360l-lidar-half-point-rate-robots/)

### Inferences
- NavVis carving robotic use out of the CLX licence suggests vendors intend to price autonomous/continuous capture separately, as a higher-value tier.
- Progress-monitoring products (DroneDeploy, OpenSpace) are built mainly on 360° imagery and drones rather than survey-grade lidar; continuous capture is therefore more a visual-documentation market than a Scan-to-BIM-grade one, with lidar robots used where dimensional QA is required.
- Hexagon excluding Robotics from its EBITAC metric indicates robotics is treated as a long-horizon investment rather than a near-term profit contributor.

### Gaps
- No dated 2025–2026 announcements found for new Spot + scanner integrations, Leica BLK2FLY updates, Skydio Dock or Field AI in construction.
- No independent data on the number of construction sites using autonomous robots/drones for capture, or on cost per m² versus manual scanning.

---

## 5. Accuracy trends: can SLAM/mobile data support LOD 300+ modelling; where is static TLS still required?

### Takeaway
Vendor claims have reached 3–5 mm for top mobile systems, and independent studies confirm mobile SLAM is adequate for 1:100 (and often 1:50) documentation with centimetre-level agreement to TLS; this supports LOD 200–300 architectural/structural modelling. Static TLS (or hybrid static-on-SLAM) remains the reference for tight-tolerance work: MEP and fabrication-level detail (LOD 350–400), structural/deformation analysis, high-fidelity heritage BIM, and anything needing verified absolute accuracy.

### Cited Findings
- Vendor claims for mobile systems: NavVis VLX 4 — 3 mm native point-cloud resolution, pitched at LOD350+ and MEP (Sept 2026); NavVis VLX 3 — 5 mm local accuracy in a 500 m² test; XGRIDS Lixel L3 — 5 mm @1σ relative, 2 cm absolute (Sept 2026); Z+F FlexScan 22 — up to 2.5 mm in the SLAM result; Emesent GX1 — 5–10 mm global with SLAM; CHCNAV RS30 — relative accuracy below 1 cm; NavVis CLX — 8 mm local, positioned for LOD200 — [konii.de](https://www.konii.de/?p=214985); [NavVis](https://navvis.com/about); [heliguy](https://www.heliguy.com/blogs/posts/xgrids-lixel-l3-guide/); [Intergeo/DVW](https://dvw.de/intergeo/en/featured-articles/mobile-scanning-as-the-key-to-digital-reality); [Geo Week News](https://www.geoweeknews.com/articles/emesents-mobile-slam-scanners-integrated-into-trimble-connect-and-trimble-business-center/); [Tri-Site](https://surveyequipment.uk/products/rs30-300m-slam-scanner); [NavVis CLX specs](https://knowledge.navvis.com/docs/navvis-clx-specifications)
- Static benchmark claims: FARO Focus i.1 up to 0.9 mm object accuracy; Leica RTC series claims 35% better accuracy than nearest competitor — [AEC Magazine](https://aecmag.com/reality-capture-modelling/faro-launches-focus-i-1-laser-scanners/); [Hexagon](https://hexagon.com/about/news-media/press-releases/2026/leica-geosystems-new-leica-rtc-series-sets-the-new-benchmark-in-scanning-accuracy-and-productivity)
- ISPRS Archives 2026 (San Giacomo church, Como): handheld PMLS is consistently less dense than TLS but effective for 1:100 documentation and in several cases 1:50; M3C2 distances "generally within centimetric ranges"; suitability depends on sensor-to-surface distance, visibility and acquisition geometry; authors recommend hybrid TLS–PMLS workflows for HBIM — [ISPRS Archives](https://isprs-archives.copernicus.org/articles/XLIX-B1-2026/151/2026/)
- ISPRS Archives 2025 compared NavVis VLX 2 and XGRIDS SLAM systems against scan-to-BIM criteria under identical conditions (detailed results not retrieved) — [ISPRS Archives](https://isprs-archives.copernicus.org/articles/XLVIII-1-W6-2025/213/2025/)
- A heritage comparison of Leica BLK360, GeoSLAM ZEB-REVO and other handhelds reported mean deviations of 4.7–25 mm and standard deviations up to about 30 mm depending on instrument and geometry — [STEPGRAD](https://stepgrad.aggf.unibl.org/article/650/pdf)
- An MDPI paper concludes applications needing higher geometric precision — detailed conservation, structural analysis, high-fidelity HBIM — "remain better served by terrestrial laser scanning" — [MDPI](https://www.mdpi.com/2673-8945/6/1/24/review_report)
- A 2026 UCL/IAARC study: a mobile pipeline cut total scan-to-BIM time from 3.5 min/m² (TLS) to 0.1 min/m²; TLS described as accurate but costly — [UCL Discovery](https://discovery.ucl.ac.uk/id/eprint/10230882/)
- EGU 2026 abstract: free iPhone LiDAR apps give centimetre-level results for BIM, but for large architectural elements and reflective materials "TLS remains the benchmark for maximal precision" — [EGU26](https://meetingorganizer.copernicus.org/EGU26/EGU26-2752.html)
- A fusion study notes TLS leaves occlusion holes while handheld mobile scanners suffer lower geometric stability and colour drift — [MDPI Sensors](https://mdpi.com/1424-8220/25/8/2488)
- Gaussian splats: a 2026 reviewer judged them suited to visual inspection and assessment, "but precision measurement still demands rigor" — [Birdi](https://www.birdi.io/blog-post/reflections-from-geoweek-2026-ai-trust-and-the-gap-between-technology-and-use-case)
- AEC Magazine on phone-based scan-to-BIM: conversion "still requires the cost and eye of a human to properly check" — [AEC Magazine](https://aecmag.com/reality-capture-modelling/polycam-for-aec/)
- Hybrid designs: FARO Orbis embeds ~15 s stationary "Flash" scans in a SLAM walk; Z+F FlexScan carries a full static IMAGER on a SLAM platform — [GIM International](https://www.gim-international.com/content/news/faro-introduces-slam-scanner-for-smarter-mapping); [GIM International](https://www.gim-international.com/content/news/zoller-frohlich-expands-3d-scanning-options-with-modular-systems)

### Inferences
- Vendors themselves map products to LOD: NavVis assigns CLX (8 mm) to LOD200 and VLX 4 (3 mm resolution) to LOD350+, implying an industry consensus that ~5–10 mm-class SLAM is the LOD 200–300 tool and that LOD 350+ needs either top-tier mobile or static.
- Headline SLAM figures are relative/local accuracy under controlled or constrained conditions (1σ, loop-closed, control-tied); absolute accuracy over long corridors or feature-poor spaces still depends on control points, so survey control and QA remain a required professional input even with cheap hardware.
- The hybrid pattern (static scans inside mobile trajectories) is the practical answer for LOD 300+ projects: mobile for coverage and speed, static for plant rooms, façades needing detail, and control.
- Because capture time drops by an order of magnitude with mobile systems, modelling (not scanning) becomes the dominant cost and schedule item in Scan-to-BIM.

### Gaps
- No independent 2025–2026 test was found that measures a specific SLAM device against explicit LOD 300/350 tolerances (e.g. USIBD LOA bands); the 3Dsurvey "7 SLAM scanners put to the test" comparison (2026) exists but could not be read: https://3dsurvey.si/7-slam-scanners-put-to-the-test/
- No independent verification of NavVis VLX 4, XGRIDS L3 (white paper is vendor-run) or Leica RTC accuracy claims.
- Exact M3C2 values and the decision matrix from the ISPRS 2026 paper were not retrieved.
