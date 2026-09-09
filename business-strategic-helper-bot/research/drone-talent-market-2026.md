# Drone Talent Market — Supply Side Scan (September 2026)

**Question asked:** how many people with drone experience are actively looking for work
(LinkedIn, Djinni, and comparable job boards)?

**Short answer:** far fewer *qualified* ones than the vacancy counts suggest. Drone
demand and drone supply are both large, but they are not the same people. The market
is candidate-scarce for engineering and survey-grade roles, and candidate-rich only for
entry-level "I own a Mavic" pilots.

---

## 1. Method and its limits

Read this before trusting any number below.

Direct scraping of the boards was **not possible** from this environment: `work.ua`,
`robota.ua`, `djinni.co` and `jooble` are all blocked by the network egress policy
(HTTP 403 on CONNECT). LinkedIn's talent-supply figures sit behind Recruiter/Talent
Insights and are not publicly indexed either.

Everything here is therefore assembled from **published analytics and secondary
reporting**, not from live board queries. Two consequences:

- Vacancy counts are reasonably solid — boards publish them and press quotes them.
- **Candidate/CV counts are the weakest data in this memo.** No public source
  publishes "N drone CVs currently active" for any Ukrainian board. Where the supply
  side is characterised below, it is via *ratios and competition indices*, not headcounts.
- Figures were captured Sept 2026 and are point-in-time. Board counts move weekly.

## 2. The distinction that actually matters

Lumping "drone experience" into one pool is the main analytical error here. There are
two pools, and they barely overlap:

| | Pool A — combat/FPV operators | Pool B — UAV engineering & survey specialists |
|---|---|---|
| Skills | Stick time, FPV, recon, target work | Photogrammetry, LiDAR, GIS, embedded, RTK/PPK, flight planning |
| Size (UA) | Very large — see §3 | Very small |
| Availability now | Mostly still serving | Already employed, passively looking |
| Competition | Will become intense post-demobilisation | Employer-side competition, not candidate-side |

A company hiring for aerial survey is fishing in Pool B. The huge numbers in the press
describe Pool A.

## 3. Ukraine — supply

**Pool A is enormous but locked up.** Ukraine's drone programme involves roughly
**80,000 personnel**, with an estimated **25,000–40,000 active combat UAV pilots**
(an elite core of ~15,000). A further **15,000 operators** are being recruited under
the "Drone Line" strategy. Training throughput is industrial: one simulator studio alone
has put **7,000+ operators** through, and accredited schools (WeTrueGun, Global Drone
Academy, others) run ~340-hour / 35-day certification courses.

This pool is not on the job market today — it is on contract. It arrives later:
the Ministry of Veterans Affairs projects **2M+ veterans** returning to civilian life
post-war, with veterans policy touching 5–6M people. The state has stood up
**Veteran.Job with 150,000+ vacancies** for 2026, and **60% of surveyed companies**
(AmCham/Citi, June 2026) already employ veterans.

**Pool B is thin, and everyone knows it.** Industry commentary is consistent that there
is a shortage of qualified civilian operators — companies have openings and cannot fill
them. Employers in aerial survey have adapted by hiring on *education* rather than
flight experience: postings ask for degrees in Geodesy & Cartography or Photogrammetry
& Remote Sensing and state that UAV experience is **not mandatory** because they will
train. That is a textbook scarcity signal.

## 4. Ukraine — demand, for calibration

- **Djinni DefTech:** 500+ deftech vacancies on the dedicated landing page.
  **UAV/Drone Engineer is the single largest category at ~52–55 postings**, ahead of
  Embedded (49), Hardware (36), PM (29).
- **Volume trend:** deftech vacancies hit **3,005 in Q1 2026** alone, vs 2,369 across
  H1 2025 and 2,283 across all of 2024. ~6,000/year run rate.
- **Work.ua:** ~800–1,013 postings for оператор БПЛА depending on phrasing;
  ~817 for інженер дронів. Note these are heavily military/contract postings, not
  civilian survey roles.

**The ratio is the finding.** Djinni's own analytics report that hardware-family
candidates are so scarce they receive **5× more inbound messages than they send
applications**, that QA Hardware has **2.5× more vacancies than candidates**, and that
**competition in deftech is ~4× lower than the market average** — approaching the
scarcity level of Engineering Manager roles. Candidates are being chased, not queuing.

## 5. Global picture

The inverse problem. The US has **493,396 FAA-certificated remote pilots** (Dec 2025),
forecast to ~628,600 by 2030. LinkedIn shows ~4,000–7,000 open US drone roles.

But the certificate is nearly meaningless as a supply signal: **most Part 107 holders
never fly commercially**, and of those who do, most are part-time or gig. Saturation is
real in real-estate and wedding work, where rates have compressed. Meanwhile demand for
*specialised* pilots — infrastructure inspection, surveying, utilities, public safety —
is growing faster than supply, and the hard-to-source profile (embedded + aerospace
hardware + drone comms protocols) commands **$130k–165k** in the US.

So: hundreds of thousands of licence-holders, a few thousand genuinely employable
specialists.

## 6. Pay benchmarks (Ukraine)

| Segment | Monthly |
|---|---|
| AFU drone operator | ₴50,000–120,000 (₴130–150k+ on pay-per-kill contracts) |
| Civilian UAV operator, average | ~₴75,600 |
| Work.ua all-vacancy average (mixed mil/civ) | ~₴47,500 |

Salaries rose ~20% year-on-year. A civilian employer is competing against military
compensation, which is the binding constraint on Pool A conversion.

## 7. Implications

1. **Do not plan around a flood of cheap drone talent.** It is not there yet. Today's
   market is employer-competitive for anyone with survey-grade skills.
2. **Hire for GIS/photogrammetry fundamentals, train the flying.** This is already
   what the market leaders do, and flying is the cheaper half to teach.
3. **The demobilisation wave is a real future edge — build the pipeline early.**
   Pool A brings thousands of flight hours and airframe intuition. Pairing a veteran
   operator with a photogrammetry course is a faster path to a survey crew than
   competing for the handful of Pool B people on Djinni. Veteran-hiring infrastructure
   (Veteran.Job, retraining programmes) already exists to source through.
4. **Passive sourcing beats posting.** With candidates receiving 5× more messages than
   they send, a posted vacancy will underperform direct outreach.

## 8. To get exact counts

The numbers this memo could not obtain, and the cheapest way to get each:

- **Djinni candidate counts by category** — a free recruiter account exposes candidate
  search with counts; filter `UAV/Drone` and read the total.
- **work.ua / robota.ua CV counts** — the resume search pages print
  "знайдено N резюме" for queries like `БПЛА`, `оператор дрона`, `аерофотозйомка`.
  Needs an unblocked network path or a manual check.
- **LinkedIn supply** — Talent Insights, or a Recruiter seat, filtered to Ukraine +
  drone/UAV/photogrammetry skills with the Open-to-Work facet.

Each is a few minutes of manual work from an unrestricted browser and would convert
the ratios above into hard headcounts.

---

## Sources

- Djinni DefTech landing and analytics — https://djinni.co/deftech/ ,
  https://djinniblog.substack.com/p/june-analytics
- dev.ua on the Djinni deftech launch —
  https://dev.ua/news/na-djinni-zapustyly-okremyi-lendinh-dlia-deftech-vakansii-1778069710
- Vector, deftech vacancies Q1 2026 —
  https://vctr.media/ua/kilkist-deftech-vakansij-pobyla-rekordy-analityka-za-pershyj-kvartal-2026-roku-325890/
- DOU analytics — https://dou.ua/lenta/articles/analytics-youtube-23/
- Work.ua vacancy searches — https://www.work.ua/jobs-оператор+бпла/
- Kyiv Post on Ukrainian drone pilot training scale — https://www.kyivpost.com/post/76979
- The Defense Post, 15,000 operator recruitment — https://thedefensepost.com/2026/05/05/ukraine-drone-warfare-operators/
- Abris Design Group aerial survey vacancy (qualification requirements) —
  https://jobs.dou.ua/companies/abris-design-group/vacancies/371349/
- Mind.ua on the civilian drone sector — https://mind.ua/publications/20187343-galuzi-majbutnogo-yak-bezpilotniki-pidkoryuyut-ukrayinu
- FAA certificated remote pilots — https://www.faa.gov/uas/commercial_operators
- Commercial UAV News on the remote-pilot milestone — https://www.commercialuavnews.com/energy/faa-remote-pilot-certificates-milestone
- The Drone Girl on the state of drone jobs 2026 — https://www.thedronegirl.com/2026/04/22/drone-jobs-in-2026/
- Christian & Timbers, 2026 drone hiring trends — https://www.christianandtimbers.com/insights/2026-drone-industry-hiring-trends-talent-strategy-in-the-us
- Veteran.Job programme — https://112.ua/en/urad-zapuskae-programu-veteranrobota-ponad-150-tisac-vakansij-dla-veteraniv-u-2026-roci-183704
- GMF, reintegrating Ukraine's veterans — https://www.gmfus.org/news/veterans-and-ukraines-human-capital-development-recovery
- Salary data — https://ngu.com.ua/operator-bpla-zarplata-realni-czyfry-2026-roku-v-ukrayini/ ,
  https://skilky-skilky.info/operatory-droniv-ocholyly-reytynh-zarplat-v-ukraini/
