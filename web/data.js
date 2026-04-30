const TECHNIQUES = [
  {
    "ID": "T0817",
    "Technique": "Drive-by Compromise",
    "Tactic": "Initial Access",
    "Impact": "High",
    "Controls": [
      "IT/OT Firewall",
      "Network Segmentation (DMZ)"
    ],
    "Detections": [
      "Windows Event Log (SCADA)",
      "Zeek network monitoring"
    ]
  },
  {
    "ID": "T0862",
    "Technique": "Supply Chain Compromise",
    "Tactic": "Initial Access",
    "Impact": "Critical",
    "Controls": [
      "IT/OT Firewall"
    ],
    "Detections": []
  },
  {
    "ID": "T0865",
    "Technique": "Spearphishing Attachment",
    "Tactic": "Initial Access",
    "Impact": "High",
    "Controls": [
      "IT/OT Firewall"
    ],
    "Detections": [
      "Windows Event Log (SCADA)"
    ]
  },
  {
    "ID": "T0810",
    "Technique": "Data Historian Compromise",
    "Tactic": "Collection",
    "Impact": "High",
    "Controls": [
      "Read-only access to historian"
    ],
    "Detections": [
      "Historian Access Log"
    ]
  },
  {
    "ID": "T0801",
    "Technique": "Monitor Process State",
    "Tactic": "Collection",
    "Impact": "Medium",
    "Controls": [],
    "Detections": [
      "Historian Access Log"
    ]
  },
  {
    "ID": "T0843",
    "Technique": "Program Download",
    "Tactic": "Execution",
    "Impact": "Critical",
    "Controls": [
      "Application Whitelisting of SCADA"
    ],
    "Detections": [
      "Windows Event Log (SCADA)",
      "PLC Audit Log"
    ]
  },
  {
    "ID": "T0809",
    "Technique": "Modify Controller Tasking",
    "Tactic": "Impair Process Control",
    "Impact": "Critical",
    "Controls": [
      "Application Whitelisting of SCADA"
    ],
    "Detections": [
      "PLC Audit Log"
    ]
  },
  {
    "ID": "T0856",
    "Technique": "Spoof Reporting Message",
    "Tactic": "Impair Process Control",
    "Impact": "High",
    "Controls": [
      "Network Segmentation (DMZ)"
    ],
    "Detections": [
      "Zeek network monitoring"
    ]
  },
  {
    "ID": "T0814",
    "Technique": "Denial of Service",
    "Tactic": "Inhibit Response Function",
    "Impact": "High",
    "Controls": [
      "IT/OT Firewall",
      "Network Segmentation (DMZ)"
    ],
    "Detections": [
      "Zeek network monitoring"
    ]
  }
];
