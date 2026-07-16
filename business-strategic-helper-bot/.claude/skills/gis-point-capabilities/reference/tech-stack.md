# Technology map (FE / BE / DevOps / DB)

The technologies GIS-Point actually ships, with representative projects. Use this to answer
"what do we build with?" and to judge whether a request fits our comfort zone.

## Frontend
| Technology | Where |
|---|---|
| **Angular** (14→19) — primary web FE, usually with ABP Angular UI + LeptonX theme | `ancestral-trees`, `eagle-eye`, `makani`, `mangrove`, `suitability`, `soil-hub`, `site-monitoring`, `skypulse`, `weather`, `point-cloud`, `athlo`, `h3-hexagons`, `digital-wallet`, `eload`, `3d-model-viewer` |
| **React** (18/19) + Vite/TypeScript | `orange-gis`, `geo-oss`, `viewers-3d`, `aerial-georef`, `ai-hemaya`, `allgis`, `geo-ai`, `geoserver-mini`, `custom-map` |
| **Streamlit** (Python web UI for ML demos) | `road-damage-detection` |
| **Next.js** (13→16) | `allgis`, `web-presence`, `ons-landing`, `rt-object-detection-web`, `agrizone` |
| **Vue 3** (Vuetify) | `subsidence` |
| **Map/geo libs** — Leaflet, OpenLayers, Cesium/Resium, MapLibre GL, Mapbox GL, ArcGIS/esri-leaflet, MapTiler, Turf.js, proj4, h3-js | across all GIS products |
| **3D/viewer libs** — three.js, @react-three/fiber, Giro3D, PlayCanvas, 3d-tiles-renderer, Potree, Photo Sphere Viewer, Spark (Gaussian splatting) | `allgis`, `viewers-3d`, `point-cloud`, `splat-3dtiles`, `ancestral-trees`, `3d-model-viewer` |
| **Mobile — Flutter** (Riverpod, flutter_map, arcgis_maps) | `ancestral-trees`, `eagle-eye`, `makani`, `eload` |
| **Mobile — React Native** (MapLibre Native, offline SQLite sync) | `agrizone` |

## Backend
| Technology | Where |
|---|---|
| **ASP.NET Core (.NET 6→9) + ABP Framework** (Volo commercial/Pro) — the dominant GIS backend | `ancestral-trees`, `eagle-eye`, `makani`, `mangrove`, `suitability`, `soil-hub`, `site-monitoring`, `skypulse`, `weather`, `digital-wallet`, `eload` |
| **Java / Spring Boot** (Spring Cloud microservices, Spring Batch, Security) | `athlo`, `curriculum`, `instacare`, `acumen` |
| **Python** — FastAPI, Django/DRF, Flask, Celery, GDAL/rasterio, PyTorch | `orange-gis`, `point-cloud`, `aerial-georef`, `ai-hemaya`, `lidar-ai-cluster`, `object-detection`, `geo-oss`, `agrizone`, `geo-ai`, `geoserver-mini`, `custom-route`, `soil-raster-processing`, `geo-data-utils`, `telegram-accountant` |
| **Node.js / TypeScript** — NestJS, Next.js server actions, Express | `allgis`, `web-presence`, `ons-landing`, `h3-hexagons`, `splat-3dtiles` |
| **Geospatial processing** — NetTopologySuite, GeoAlchemy2, PDAL, laspy, Entwine, OSRM, gocesiumtiler, GeoDjango | GIS/LiDAR products |
| **AI/ML** — PyTorch, Open3D-ML, myria3d, YOLOv7/v8/v10, ONNX Runtime, TensorFlow, LangChain/LangGraph, Ollama (self-hosted LLM), kornia LoFTR, Anthropic & OpenAI SDKs | `lidar-ai-cluster`, `object-detection`, `rt-object-detection-web`, `aerial-georef`, `athlo`, `allgis`, `road-damage-detection`, `slope-detection`, `geo-ai` |
| **Auth** — OpenIddict / OAuth2-OIDC, JWT, Clerk, authentik (self-hosted SSO) | across products |
| **Realtime/async** — SignalR, Spring/Django WebSockets, RabbitMQ, BullMQ, Trigger.dev, Kafka, Celery, arq | `eagle-eye`, `site-monitoring`, `athlo`, `allgis`, `eload`, `agrizone` |

## DevOps
| Technology | Where |
|---|---|
| **Docker / docker-compose** | virtually all |
| **Kubernetes / Helm** | `ancestral-trees`, `makani`, `mangrove`, `soil-hub` |
| **CI/CD** — Azure Pipelines (GIS/.NET), Bitbucket Pipelines (Java/seven), GitHub Actions (Python/Node) | see per-project |
| **Cloud** — AWS (Elastic Beanstalk, Lambda, ECS, S3, SQS, SES, CloudFront), Azure (Web App, Blob, AD/EntraID), Hetzner, Vercel, Cloudflare Workers, Coolify | across products |
| **Object storage** — AWS S3, MinIO, Wasabi, Azure Blob, Hetzner Object Storage | LiDAR/imagery products |
| **Web/proxy** — nginx, Traefik, Caddy | across products |
| **Quality/observability** — SonarCloud, Sentry, OpenTelemetry, Playwright, Vitest/Jest, HealthChecks UI | `allgis`, `web-presence`, `athlo`, `orange-gis` |

## Databases & stores
| Technology | Where |
|---|---|
| **SQL Server** (with EF Core) — default for ABP/.NET products | most gis-point products, `digital-wallet`, `eload` |
| **PostgreSQL / PostGIS** | `orange-gis`, `point-cloud`, `aerial-georef`, `ai-hemaya`, `allgis`, `web-presence`, `agrizone`, `athlo`, `curriculum`, `instacare`, `acumen`, `esignature`, `geo-ai`, `geoserver-mini` |
| **Elasticsearch / OpenSearch** — search & geo indexing | `eagle-eye`, `makani`, `soil-hub`, `suitability`, `h3-hexagons`, `athlo`, `eload`, `geo-ai`, `soil-raster-processing`, `geo-data-utils` |
| **Redis** — caching / queues | many products |
| **MongoDB** | `curriculum`, `h3-hexagons` |
| **Object storage as data store** — MinIO, S3, ABP BlobStoring | LiDAR/imagery/media products |

## Quick read
- **GIS web apps** → Angular + ABP/.NET + SQL Server (+ PostGIS/Elasticsearch/GeoServer as needed).
- **Data/AI/geo-processing** → Python (FastAPI/Django, PyTorch, GDAL) + PostGIS.
- **Modern greenfield / 3D** → Next.js/NestJS/React + PostGIS + object storage (`allgis` is the flagship).
- **Business back-ends (seven)** → Java/Spring Boot microservices + PostgreSQL.
- **Mobile** → Flutter.
