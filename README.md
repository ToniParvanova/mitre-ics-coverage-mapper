# MITRE ATT&CK for ICS - Coverage Mapper

> An interactive gap analysis tool that maps ICS/OT security controls and detections against the MITRE ATT&CK for ICS matrix, identifying coverage gaps and calculating risk scores in real time.

![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

Organizations running Industrial Control Systems (ICS) and Operational Technology (OT) environments often struggle to answer a fundamental question: **which of the known ATT&CK techniques are actually covered by their existing defenses?**

This tool provides an automated, visual answer. It maps a set of security controls and detection sources against MITRE ATT&CK for ICS techniques, assigns each technique a coverage status and a risk score, and surfaces the gaps - all through an interactive web interface that updates in real time.

The demo architecture models a **water treatment station** with 4 controls, 4 detection sources, and 9 ATT&CK techniques across 5 tactics.

---
## Features

- **Automated gap analysis** - each technique is classified as FULL, PARTIAL, or GAP based on active controls and detections
- **Risk scoring** - combines technique impact (Critical / High / Medium) with coverage penalty to produce a prioritized risk score
- **Interactive interface** - toggle controls and detections on/off and see the entire analysis update instantly
- **Visual dashboards** - doughnut chart for coverage breakdown, bar chart for risk by technique
- **Filtering and sorting** - filter by status, tactic, impact, or free-text search; sort any column
- **Gap cards** - automatically generated summaries of uncovered techniques
- **Zero dependencies for the frontend** - runs directly in the browser, no server needed
---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Data processing | Python 3 |
| Data format | JSON |
| Frontend | HTML, CSS, JavaScript |
| Charts | Chart.js |
| ATT&CK framework | MITRE ATT&CK for ICS |

---

## Project Structure
```
mitre-ics-coverage-mapper/
│
├── data/
│   ├── techniques.json       # ATT&CK techniques with impact and description
│   ├── controls.json         # Security controls and the techniques they cover
│   └── detections.json       # Detection sources and the techniques they detect
│
├── web/
│   ├── index.html            # Page structure
│   ├── app.js                # All reactive logic - gap analysis, risk scoring, rendering
│   ├── style.css             # Styling and color coding
│   └── data.js               # Generated output - loaded by the browser
│
├── mapper.py                 # Gap analysis engine + data.js generator
├── README.md
└── LICENSE
```
---

## Getting Started

### Prerequisites
- Python 3.8+
- A modern web browser

### Run the analysis
```bash
# Clone the repository
git clone https://github.com/your-username/mitre-ics-coverage-mapper.git
cd mitre-ics-coverage-mapper

# Run the mapper to generate web/data.js
python mapper.py
```

### Open the interface
Open `web/index.html` in your browser - no server required.

---

## How the Risk Model Works

Each technique receives a **Risk Score** calculated as:
```
Risk = ImpactScore × CoveragePenalty
```

| Impact | ImpactScore | Status | CoveragePenalty |
|--------|-------------|--------|-----------------|
| Critical | 3 | GAP | 3 |
| High | 2 | PARTIAL | 1 |
| Medium | 1 | FULL | 0 |

Maximum possible score: **9** (Critical technique with no coverage whatsoever).

The overall **Coverage Score** is:
```
Score = (FULL + PARTIAL × 0.5) / Total × 100%
```
---
## Demo Results
Running against the sample water treatment station architecture:
| Metric | Value |
|--------|-------|
| Techniques analyzed | 9 |
| Full coverage | 7 |
| Partial coverage | 2 |
| No coverage (GAP) | 0 |
| Coverage Score | **88.9%** |

Techniques with partial coverage:
- **T0862** Supply Chain Compromise - control present, no detection
- **T0801** Monitor Process State - detection present, no control
---

## Extending the Tool
The tool is fully data-driven. To adapt it to a different OT architecture:

1. Edit `data/techniques.json` - add or remove ATT&CK techniques
2. Edit `data/controls.json` - define your controls and which techniques they cover
3. Edit `data/detections.json` - define your detection sources and which techniques they detect
4. Run `python mapper.py` to regenerate `web/data.js`
5. Refresh the browser

No code changes required.

---
## References
- [MITRE ATT&CK for ICS Matrix](https://attack.mitre.org/matrices/ics/)
- [CISA - Industrial Control Systems](https://www.cisa.gov/topics/industrial-control-systems)
- [NIST SP 800-82 Rev. 3 - Guide to OT Security](https://csrc.nist.gov/pubs/sp/800/82/r3/final)

---
## License
This project is licensed under the MIT License.
