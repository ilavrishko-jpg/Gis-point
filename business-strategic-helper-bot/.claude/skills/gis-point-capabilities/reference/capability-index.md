# Capability index

Reverse lookup: "have we done X?" → which projects prove it. IDs map to `catalog.yaml`.
Use this to find evidence fast, then read the full entry for the fit verdict.

## Mapping & GIS
- **Interactive 2D/3D web mapping** — `ancestral-trees`, `eagle-eye`, `makani`, `mangrove`, `orange-gis`, `suitability`, `soil-hub`, `site-monitoring`, `weather`, `subsidence`, `geo-oss`, `h3-hexagons`, `ai-hemaya`, `allgis`, `geo-ai`, `custom-map`, `geoserver-mini`, `geo-data-utils`
- **Interactive mobile maps** — `ancestral-trees`, `eagle-eye`, `athlo`
- **360° panoramic / street-view viewer** — `ancestral-trees`, `eagle-eye`, `mangrove`, `riyadh-pano-ai`
- **Map layer management, styling, legends** — `mangrove`, `orange-gis`, `suitability`, `soil-hub`, `eagle-eye`
- **GIS file formats (Shapefile, KML, GeoJSON, GeoPackage, WMS/WFS/WMTS)** — `orange-gis`, `eagle-eye`, `suitability`, `site-monitoring`, `geo-oss`
- **Self-hosted map tiles / vector maps (no Google Maps fees)** — `geo-oss`, `custom-map`, `geoserver-mini`
- **Routing & turn-by-turn directions** — `custom-route`, `custom-map`, `geo-oss`, `eload`
- **Data conversion / ETL (raster, vector, tabular, point-cloud, CRS)** — `geo-data-utils`, `soil-raster-processing`, `allgis`
- **Address geocoding** — `suitability`, `soil-hub`, `site-monitoring`, `skypulse`, `aerial-georef`
- **Digital addressing / location codes** — `makani`
- **H3 hexagonal spatial indexing & aggregation** — `makani`, `suitability`, `soil-hub`, `site-monitoring`, `h3-hexagons`, `geo-oss`, `soil-raster-processing`, `geo-data-utils`

## LiDAR & 3D
- **LiDAR LAS/LAZ ingestion & processing** — `point-cloud`, `allgis`, `viewers-3d`, `lidar-ai-cluster`, `geo-oss`
- **3D point-cloud rendering in browser** — `point-cloud`, `allgis`, `viewers-3d`, `geo-oss`, `ai-hemaya`, `ancestral-trees`, `eagle-eye`
- **LiDAR AI / semantic classification** — `lidar-ai-cluster`
- **Point-cloud to 3D Tiles / COPC conversion** — `allgis`, `geo-oss`, `splat-3dtiles`, `3d-model-viewer`, `geo-data-utils`
- **Gaussian splatting (reality capture)** — `allgis`, `splat-3dtiles`
- **glTF / 3D model viewing** — `viewers-3d`, `splat-3dtiles`, `3d-model-viewer`
- **DEM / terrain / mesh** — `allgis`, `agrizone`
- **CAD (DXF) ↔ GeoJSON / CRS transformation** — `allgis`, `geo-data-utils`

## Satellite & Remote Sensing
- **Satellite imagery search / preview / ordering** — `skypulse`
- **Vegetation index (NDVI) / crop & land monitoring** — `site-monitoring`, `soil-hub`, `agrizone`, `h3-hexagons`, `soil-raster-processing`
- **Management zones / precision agriculture** — `agrizone`, `site-monitoring`
- **Aerial imagery georeferencing (AI-assisted)** — `aerial-georef`
- **Street-level 360 panorama pipeline at scale** — `riyadh-pano-ai`
- **Drone/aerial imagery deviation analysis** — `site-infra-eval`, `uav-drone`

## AI / Computer Vision
- **Object detection (images & video)** — `object-detection`, `rt-object-detection-web`, `road-damage-detection`, `slope-detection`
- **Road / pavement condition inspection (CV)** — `road-damage-detection`, `slope-detection`
- **In-browser / edge AI inference (ONNX)** — `rt-object-detection-web`
- **AI image matching (deep learning)** — `aerial-georef`
- **MLOps: training, retraining, deployment pipelines** — `object-detection`, `road-damage-detection`
- **Natural-language geospatial querying (LLM)** — `geo-ai`
- **LLM / autonomous browser agents** — `athlo` (syncs ~198 third-party platforms), `allgis` (Anthropic SDK), `geo-ai` (self-hosted LLM)

## Real-time & IoT
- **Real-time updates (WebSockets / SignalR)** — `eagle-eye`, `site-monitoring`, `skypulse`, `subsidence`, `athlo`, `instacare`, `ai-hemaya`, `eload`
- **Live indoor positioning / asset tracking** — `ai-hemaya`
- **Live camera / video streaming (HLS/MJPEG)** — `ai-hemaya`
- **Live GPS vehicle tracking / geofencing** — `eload`

## Platform / SaaS features (common to most ABP products)
- **Multi-tenant SaaS + white-label branding** — `ancestral-trees`, `eagle-eye`, `makani`, `mangrove`, `orange-gis`, `suitability`, `soil-hub`, `site-monitoring`, `weather`, `skypulse`, `digital-wallet`, `eload`
- **RBAC / identity / OAuth2-OIDC / 2FA** — most products; strong: `curriculum`, `instacare`, `makani`, `digital-wallet`, `orange-gis`
- **Payments & billing** — `athlo` (Stripe Connect payouts), `instacare`, `curriculum`, `skypulse`, `digital-wallet`, `eload`, `acumen`
- **Payments infrastructure / ledgers / KYC-AML** — `digital-wallet`
- **PDF / report generation** — `instacare`, `acumen`, `lidar-ai-cluster`, `site-infra-eval`
- **Excel import/export** — `eagle-eye`, `curriculum`, `acumen`
- **Multi-language / RTL localization** — most products; RTL specifically: `digital-wallet`, `eload`
- **E-signature** — `esignature`
- **Office doc viewing/editing (WOPI)** — `curriculum`
- **SEO-optimized marketing sites + lead capture** — `web-presence`, `ons-landing`
- **Chatbot / Telegram-bot automation & reporting dashboards** — `telegram-accountant`

## Delivery models
- **On-premise / self-hosted deployment** — `point-cloud`, `geo-oss`, `esignature`, `agrizone`
- **Cross-platform (web + admin + mobile)** — `ancestral-trees`, `eagle-eye`, `athlo`, `eload`
- **Solution architecture, estimation & RFP response** — `digital-wallet`, `agrizone`, `site-infra-eval`, `eload`, `uav-drone`
