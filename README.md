# Where Are The Children?

**Official U.S. government data on the newborns CPS removes — and the ones the system loses track of.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

---

## Table of Contents

- [Where Are The Children?](#where-are-the-children)
  - [The Crisis in Plain Sight](#the-crisis-in-plain-sight)
  - [Live Site](#live-site)
  - [What You'll Find](#what-youll-find)
  - [Tech Stack](#tech-stack)
  - [Local Development](#local-development)
  - [Project Structure](#project-structure)
    - [Data Sources](#data-sources)
    - [Contributing](#contributing)
    - [License](#license)
    - [Built With Purpose](#built-with-purpose)


---

### The Crisis in Plain Sight

Every year, the United States removes **~22,000 newborns and infants** from their parents and places them into foster care.

The 2023 HHS Office of Inspector General audit found **74,353 missing episodes** from foster care — and **69% were never properly reported** to the national system.

This site exists to make that truth impossible to ignore.

**We are not anti-CPS.**  
We are demanding basic public accountability for the most vulnerable children in America.

---

### Live Site

**[wherearethechildren.net](https://wherearethechildren.net)**

---

### What You'll Find

- **The Newborn Pipeline** — Visual journey from birth to the black box
- **The OIG Funnel** — The most devastating government audit ever released on missing foster kids
- **The Black Box** — What data the public is *legally forbidden* from seeing
- **Risks in Care** — Maltreatment and turnover rates in foster homes
- **Take Action** — Real petition + one-click emails to Congress

---

### Tech Stack

- **Framework**: Next.js 16 (App Router + React Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)
- **Forms**: Formspree (petition)

---

### Local Development

# 1. Clone the repo
```bash
git clone https://github.com/YOURUSERNAME/wherearethechildren.git
cd wherearethechildren
```
# 2. Install dependencies
```bash
npm install
```
# 3. Run locally
```bash
npm run dev
```
Open http://localhost:3000

### Project Structure
```text
app/
├── page.tsx                 # Home
├── crisis/page.tsx
├── pipeline/page.tsx
├── blackbox/page.tsx
├── risks/page.tsx
├── action/page.tsx
├── sources/page.tsx
components/
├── Navbar.tsx
├── OIGFunnel.tsx
public/
└── og-image.jpg
```


#### Data Sources
Every statistic is pulled directly from official federal sources:

- AFCARS (HHS)
- HHS Office of Inspector General (2023 Audit)
- NCMEC Impact Reports
- NCANDS / Child Maltreatment Reports
- CDC Vital Statistics

Full sources and links: (Sources Page)[https://wherearethechildren.net/sources]

#### Contributing
This is a **public accountability project.** Contributions are welcome:

- Bug fixes or performance improvements
- Additional data visualizations
- State-specific deep dives
- Translation / multilingual support

Please open an issue first so we stay aligned with the mission.

#### License
This project is open source under the MIT License.
The data belongs to the public. The website is built to serve the public.


#### Built With Purpose
This site was created to force real policy change:
**The Newborn and Foster Child Accountability Act** — requiring anonymized public tracking of every CPS-involved child.
The black box only stays closed if we let it.
Share it. Sign it. Demand better.



