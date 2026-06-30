export const meta = {
  name: 'flyby-direct-analogs',
  description: 'Re-classify competitors strictly to the OSCAR/Flyby pattern (camera vs pre-loaded map -> absolute coords, GPS-denied) with proof URLs, discover missed analogs',
  phases: [
    { title: 'Discover', detail: 'Region agents hunt strict visual map-matching analogs' },
    { title: 'Classify', detail: 'Per-company: DIRECT/ADJACENT/NOT + proof URL + funding/founding/pricing/traction with sources' },
    { title: 'Synthesize', detail: 'Build final structured rows' },
  ],
}

const PATTERN = `GOLD-STANDARD REFERENCE PRODUCT = Twist Robotics "OSCAR" (and the client's own product "Flyby"):
"A visual navigation MODULE that compares live camera imagery of the terrain with a PRE-LOADED digital/satellite map and determines absolute coordinates WITHOUT GPS. Works day and night, provides navigation under jamming and spoofing, accuracy ~5-30 m."

STRICT CLASSIFICATION of any company against this pattern:
- "DIRECT"  = sells/offers a vision-based ABSOLUTE positioning capability that MATCHES live camera imagery to a pre-loaded reference map / satellite imagery / terrain database to output GEO-COORDINATES, designed to work when GPS is jammed/spoofed (scene-matching / map-matching / terrain-referenced visual navigation / visual positioning system VPS). This is the same job as OSCAR/Flyby.
- "ADJACENT" = GPS-denied navigation but a DIFFERENT mechanism: pure visual-inertial odometry/SLAM (relative, no absolute map-match), pure INS/IMU/FOG/optical-gyro, magnetic/quantum/celestial nav, RF/time-of-flight nav, or a broad autonomy/autopilot platform where map-matching is not the core sold capability.
- "NOT" = not GPS-denied UAV navigation at all (e.g. EO/IR camera+targeting only, swarm C2, comms/EW, drone-mapping SaaS, generic GIS).

Be strict: VIO/SLAM alone (relative motion) is ADJACENT, not DIRECT -- DIRECT requires matching to a PRE-EXISTING map/reference to fix absolute position.`

const DISCOVERY_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    region: { type: 'string' },
    candidates: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      properties: {
        name: { type: 'string' }, country: { type: 'string' }, website: { type: 'string' },
        product: { type: 'string' },
        why_direct: { type: 'string', description: 'evidence it matches camera-to-preloaded-map absolute positioning' },
      },
      required: ['name', 'country', 'website', 'product', 'why_direct'],
    } },
  },
  required: ['region', 'candidates'],
}

const CLASSIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    name: { type: 'string' }, country: { type: 'string' }, region: { type: 'string' }, website: { type: 'string' },
    product_name: { type: 'string', description: 'the specific nav product/module' },
    classification: { type: 'string', enum: ['DIRECT', 'ADJACENT', 'NOT'] },
    mechanism: { type: 'string', description: 'how it positions; explicitly say whether it matches camera imagery to a pre-loaded map/satellite to get absolute coordinates' },
    accuracy: { type: 'string', description: 'stated accuracy (e.g. "5-30 m") or "n/d"' },
    day_night_jamming: { type: 'string', description: 'day/night + jamming/spoofing resilience claims, or "n/d"' },
    proof_url: { type: 'string', description: 'ONE best URL that directly evidences the navigation mechanism/category claim' },
    founded_year: { type: 'string' },
    pricing: { type: 'string', description: 'price/business model or "tsiny nepublichni (model: ...)"' },
    funding_total: { type: 'string' },
    funding_detail: { type: 'string', description: 'rounds/amounts/dates/lead investors' },
    investors: { type: 'string' },
    traction: { type: 'string' },
    strategy_stage: { type: 'string' },
    sources: { type: 'array', items: { type: 'string' }, description: 'all source URLs used (funding, founding, product)' },
    confidence: { type: 'string', description: 'high/medium/low' },
  },
  required: ['name', 'country', 'region', 'website', 'product_name', 'classification', 'mechanism', 'accuracy', 'day_night_jamming', 'proof_url', 'founded_year', 'pricing', 'funding_total', 'funding_detail', 'investors', 'traction', 'strategy_stage', 'sources', 'confidence'],
}

phase('Discover')
const REGIONS = [
  { key: 'United Kingdom', seed: 'NILEQ (terrain-fingerprint), Flare Bright (terrain-ref). Also hunt for any UK firm offering camera-to-map / scene-matching absolute visual positioning for drones/missiles.' },
  { key: 'Europe (excl. UK & Ukraine)', seed: 'Daedalean VGPS (visual positioning vs map, Switzerland), Spleenlab VISIONAIRY (Germany), Helsing (HX-2 onboard visual nav, Germany), STARK (OWE-V visual nav, Germany), GMV (visual-based navigation, Spain), Zero Industries (VINS, France). Hunt for more camera-to-map VPS providers.' },
  { key: 'North America', seed: 'Maxar/Vantor Raptor (3D scene-matching vs satellite imagery -> coords, USA), EdgyBees (visual geo-registration, USA), Scout AI. Hunt for camera-to-map absolute visual positioning for GPS-denied UAVs.' },
  { key: 'Ukraine', seed: 'Twist Robotics OSCAR (the reference!), The Fourth Law TFL-1 (visual nav/terminal guidance), Buntar Aerospace Copilot, Fire Point (optical map-matching guidance), Vyriy. Hunt for more UA camera-to-map visual navigation modules.' },
]

const discovered = await parallel(REGIONS.map(r => () =>
  agent(
    `You are a defense-tech analyst specialising in GPS-denied navigation. ${PATTERN}\n\nUsing WebSearch and WebFetch, find companies HQ'd in ${r.key} that offer a product matching the DIRECT pattern (camera imagery vs pre-loaded map -> absolute coordinates, GPS-denied). ${r.seed}\nReturn 4-8 of the STRONGEST DIRECT (or borderline-DIRECT) candidates only. For each, give the specific product and concrete evidence of the camera-to-map mechanism. Do NOT include pure INS, pure VIO/SLAM, magnetic/RF nav, swarm C2 or camera-targeting-only firms.`,
    { label: `discover:${r.key}`, phase: 'Discover', model: 'sonnet', agentType: 'general-purpose', schema: DISCOVERY_SCHEMA }
  )
))

const prior = [
  ['NILEQ','United Kingdom'],['Opteran','United Kingdom'],['Flare Bright','United Kingdom'],['Roke','United Kingdom'],['Blue Bear (Saab)','United Kingdom'],['Animal Dynamics','United Kingdom'],
  ['Daedalean','Europe'],['Spleenlab','Europe'],['Exail Technologies','Europe'],['Zero Industries','Europe'],['Lendurai','Europe'],['Auterion','Europe'],['Safran E&D','Europe'],
  ['Shield AI','North America'],['Skydio','North America'],['ANELLO Photonics','North America'],['SandboxAQ','North America'],['Vantor (Raptor)','North America'],['Near Earth Autonomy','North America'],['Inertial Labs','North America'],
  ['The Fourth Law (TFL)','Ukraine'],['Sine.Engineering','Ukraine'],['Twist Robotics','Ukraine'],['Buntar Aerospace','Ukraine'],['Fire Point','Ukraine'],['Odd Systems','Ukraine'],['Swarmer','Ukraine'],
]
const seen = new Set()
const candidates = []
for (const [name, region] of prior) { const k = name.toLowerCase().replace(/\s*\(.*\)/,'').trim(); if (!seen.has(k)) { seen.add(k); candidates.push({ name, region, website: '' }) } }
for (const d of discovered.filter(Boolean)) {
  for (const c of (d.candidates || [])) {
    const k = c.name.toLowerCase().replace(/\s*\(.*\)/,'').trim()
    if (seen.has(k)) continue
    seen.add(k); candidates.push({ name: c.name, region: d.region, website: c.website || '' })
  }
}
log(`Classifying ${candidates.length} candidates (${prior.length} prior + ${candidates.length - prior.length} newly discovered)`)

phase('Classify')
const classified = await parallel(candidates.map(c => () =>
  agent(
    `You are a strict competitive-intelligence analyst with a fact-checking duty. ${PATTERN}\n\nResearch this company with WebSearch and WebFetch and CLASSIFY it against the OSCAR/Flyby pattern. You MUST provide a proof_url that directly evidences the navigation mechanism (their product page, datasheet, or a credible article describing HOW it positions). Determine the real product, mechanism (does it match camera imagery to a PRE-LOADED map/satellite to output absolute coordinates?), stated accuracy, day/night & jamming/spoofing claims. Also collect: founding year, pricing/business model, total funding + rounds/investors (cite sources), traction, stage/strategy. Cite source URLs. Be honest: if it is really INS/VIO-only/magnetic/RF/swarm/targeting, mark it ADJACENT or NOT and say why.\n\nCompany: ${c.name}\nRegion: ${c.region}\nKnown website: ${c.website || 'find it'}`,
    { label: `classify:${c.name}`, phase: 'Classify', model: 'sonnet', agentType: 'general-purpose', schema: CLASSIFY_SCHEMA }
  )
))

const rows = classified.filter(Boolean)
const direct = rows.filter(r => r.classification === 'DIRECT')
const adjacent = rows.filter(r => r.classification === 'ADJACENT')
const not = rows.filter(r => r.classification === 'NOT')
log(`Classified: ${direct.length} DIRECT, ${adjacent.length} ADJACENT, ${not.length} NOT`)

return { directCount: direct.length, adjacentCount: adjacent.length, notCount: not.length, direct, adjacent, not }
