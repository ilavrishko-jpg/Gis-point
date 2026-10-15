# Session Summary: Gauthier Vasseur (Session 1)
## Data Foundations, FAIR Data, and the Discipline Needed to Unlock Analytics and AI

> Source: `2026-05-12-Gauthier Vasseur.pdf` — Berkeley AgriTech Accelerator

---

## Core Message
Before you can scale analytics, AI, ML, or agents, you must **master data**. Using Excel is not "doing data"; prompting ChatGPT is not "doing AI." Without discipline you get scattered spreadsheets, manual copy-paste, unreliable reporting, and AI that can't be trusted. Data mastery unlocks the two things every business needs: **insight and time**.

## Key Theses
- **Start with the business question** — not "let's build a dashboard" or "let's use AI." What decision are we improving? A dashboard that answers no real question is useless.
- **Asking better questions** needs expertise, courage (ask "naïve" questions), and a culture where juniors can challenge the question. The question is the first gatekeeper against misuse (ethics/law). Tools: **Five Whys**, black-swan thinking, diversity (a weapon against bias), **Gemba** (go to the farm), unknown unknowns.
- **FAIR data** = **F**indable, **A**ccessible, **I**nteroperable, **R**eusable. Without it, analytics is painful, AI unreliable, automation won't scale.
- **For business/numerical data, FAIR = a clean table:** rows & columns, first row = headers, each row = a record, each column = a defined field. Most companies violate this constantly (merged cells, colors, manual summaries mixed into the data).
- **Separate three layers:** (1) **Data layer** — clean, raw, structured, reusable; (2) **Analytics layer** — calculations, filters, aggregation, modeling; (3) **Reporting layer** — formatting, charts, storytelling. Keep them separate so data can be reused for many questions.
- **Four dimensions must align:** Data · Systems · People · Processes. A data lake without people to use it or clean data inside it is not an asset.
- **Formats:** CSV and databases for structured data; **JSON** for sensors/complex data; **Markdown for text** (LLMs read and generate it natively). Keep FAIR formats as long as possible before converting to Word/PowerPoint/Excel (proprietary, cosmetic-heavy, error-prone for AI).
- **Data types:** alphanumeric strings, numbers (watch separators/units), boolean (key for classification), datetimes (US vs. EU formats break machines), **geotags** (coordinates > names in agriculture).
- **Metrics, attributes, keys:** a **metric** is the measured value that answers the question; **attributes** give it context (field, farmer, crop, weather, date, sensor…); a **key** is the unique identifier that connects tables. Whether a column is a metric or attribute *depends on the question* — which is why clean flat tables are powerful.
- **Establish unique keys early.** Using only names ("Slava", "Sasha") creates duplicates; fail to set keys for two years and much historical data becomes impossible to connect.
- **Joins turn description into causality:** connecting incidents → parts → supplier → batch → machine tables reveals *which* supplier/batch/machine caused defects. This is how analytics moves from "defects went up" to action.
- **Demonstration:** 34,000 files / 8M cells / 500K rows — what feels like a century of manual work runs in ~20 seconds with the right foundation (after ~20 min of one-time prep).

*If data is FAIR from the start, the sky is the limit. If not, you're trapped in manual work and unscalable AI.*
