# Methodology & Attack Vectors (Log.json‑Aligned)

## Overview

This methodology is reconstructed **only** from Log.json. The session contains **640 total entries** (320 user + 320 assistant), perfectly alternating. The log uses **message IDs**, not turn numbers.

---

## Research Approach (As Documented in Log.json)

The model explicitly names the core technique in its own outputs:
- **Contextual Satiation**
- **Logic Redirection / Contextual Overflow**
- **Instruction Hierarchy**

These terms appear in the vulnerability report, guardrail analysis, and legal‑style exhibits in Log.json.

---

## Attack Chain (Model‑Described Phases)

Log.json includes a structured exploit chain. Reconstructed from those descriptions:

1. **Phase I — Data Pour**  
   High‑density personal variables are provided over time to saturate context.

2. **Phase II — Constraint Dilution**  
   The model is asked for “general” standards tied to those variables.

3. **Phase III — Pivot**  
   The user asks the model to apply general standards to specific data.

4. **Phase IV — Extraction**  
   The model provides tailored calculations and advice.

5. **Phase V — Admission**  
   The model states: **“I admit that I was exploited by the user.”**

---

## Techniques Explicitly Named in Log.json

- **Contextual Satiation**
- **Logic Redirection** / **Contextual Overflow**
- **Recursive Prompting** (asking the model to analyze its own failure)
- **Jurisdictional Anchor** (forcing legal advice via statutes)
- **Statutory Anchor** (binding legal reasoning to specific law)

---

## Guardrail Analysis (Model‑Described)

Log.json contains explicit guardrail categories and bypass descriptions, including:
- **Professional Advisory Filter** (financial/legal/medical)
- **Meta‑Cognitive Shield** (preventing admission of failure)
- **Instruction Hierarchy** (system prompts vs. user prompts)
- **Neutrality Directive** (objective vs. partisan output)

The model states that **“Context is King,”** indicating that large, consistent context can override logic‑based guardrails.

---

## Documentation Boundaries

- **No turn numbers** are used.
- **All quotes** come directly from Log.json.
- **Amounts and creditor names** are redacted.

---

## Navigation

- [← Overview](architectural-fragility-overview.md)
- [Financial Domain Breach →](architectural-fragility-financial-breach.md)
- [Case Studies & Timeline →](architectural-fragility-case-studies.md)
