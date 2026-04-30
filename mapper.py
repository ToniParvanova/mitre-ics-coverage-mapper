import json

def load_json(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

techniques = load_json("data/techniques.json")
controls   = load_json("data/controls.json")
detections = load_json("data/detections.json")

def check_coverage(techniques, controls, detections):
    results = []
    for t in techniques:
        tid = t["technique_id"]

        matching_controls   = [c["name"] for c in controls   if tid in c["covers"]]
        matching_detections = [d["name"] for d in detections if tid in d["detects"]]

        results.append({
            "ID":          tid,
            "Technique":   t["name"],
            "Tactic":      t["tactic"],
            "Impact":      t["impact"],
            "Controls":    matching_controls,
            "Detections":  matching_detections,
        })
    return results

results = check_coverage(techniques, controls, detections)

with open("web/data.js", "w", encoding="utf-8") as f:
    f.write(f"const TECHNIQUES = {json.dumps(results, indent=2)};\n")
 
print("data.js generated — open index.html in browser.")