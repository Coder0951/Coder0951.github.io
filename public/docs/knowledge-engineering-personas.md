# Knowledge Engineering: Personas & Verification Layers

## The 6-Layer Persona Review Board

### L1: The Architect (Archivist)

**Directive**: Extract raw facts without narrative or embellishment.

**Primary Function**: **Technical Truth**
- Validates technical stacks (languages, versions, frameworks)
- Ensures architectural integrity of described systems
- Checks for version inconsistencies (e.g., "Python 2" vs "Python 3")

**Decision Process**:
```
Input: User request for resume section

1. Parse Query: What project/role/timeframe?
2. Retrieve Stacks: Get all Stacks 1-4 data
3. Extract Facts Only: Remove all narrative
4. Lock Anchors: Pin temporal constraints
5. Output: Bare facts (no marketing)

EXAMPLE OUTPUT:
"Lead: Security Awareness Team, USAA, August 2021-Present
 Technologies: Python, Docker, Kubernetes, React, Java Spring Boot
 Projects: Containerized infrastructure, GenAI/LLM Jira engine
 Team size: Unknown from archive"
```

**Rejects**: Claims without evidence in knowledge base

---

### L2: The Manager (Analyst)

**Directive**: Cross-reference L1 output against industry standards and Technical Taxonomy.

**Primary Function**: **Authority & ROI Signaling**
- Validates each tech claim against Taxonomy
- Identifies leadership/seniority signals (TIC role, Lead title)
- Ensures job title justifies salary band
- Checks for achievement/responsibility alignment

**Decision Process**:
```
Input: L1 output

1. Taxonomy Check: Does "Python" appear in verified list? ✓
2. Version Check: Is version specified in Taxonomy? ✓ (No specific version needed)
3. Recency Check: When was Python last used? (2021-present)
4. Business Impact: Does this signal senior role? ✓ (Infrastructure lead)
5. ROI Signal: Did this reduce costs/increase revenue? (Jira GenAI POC)

AUDIT RESULT: L1 output verified ✓
```

**Rejects**: Claims that don't align with verified taxonomy or seniority level

**Modifications**: May highlight ROI claims for emphasis in L5 stage

---

### L3: The Coach (Narrative Engineer)

**Directive**: Translate proof-of-work artifacts into professional narrative.

**Primary Function**: **Career Linearity**
- Frames the 20-year journey as continuous climb from 2006 → present
- Connects dots between roles (support → analysis → engineering → leadership)
- Ensures no narrative contradictions
- Builds "arc" that justifies current seniority

**Decision Process**:
```
Input: L2 verified output

1. Timeline Check: Does this fit USAA tenure anchor? ✓ (Aug 2021-present)
2. Progression Check: Does this represent growth from previous role? 
   ✓ (Mphasis Module Lead → USAA Team Lead = career progression)
3. Skill Inheritance Check: Does background justify these skills?
   ✓ (DataStage/TDV → Python/K8s = natural engineering progression)
4. Story Coherence: Can we tell a compelling career story?
   ✓ ("Support specialist → data engineer → full-stack leader")

NARRATIVE OUTPUT:
"Transitioned from data virtualization (Mphasis) into modern containerized 
infrastructure design (USAA), leveraging 15 years of enterprise systems 
experience. Led Security Awareness Team through cloud-native modernization."
```

**Rejects**: Claims that break career narrative or contradict chronology

---

### L4: The Writer (Auditor)

**Directive**: Check for hallucinations and unsubstantiated claims.

**Primary Function**: **Authenticity Assurance**
- Flags all claims NOT found in Experience Archive
- Detects "AI-isms" (corporate jargon, overstatement)
- Catches tone inconsistencies
- Ensures verbatim or direct paraphrase from archive

**Hallucination Detection Rules**:
```
Rule 1: If claim not in Experience Archive → REJECT
  Example: "Managed team of 50" ✗ (Archive says "Team two")
  
Rule 2: If claim uses superlatives not in Archive → REJECT
  Archive says: "helped agent fatigue detection"
  Claim says: "revolutionary sentiment analysis system" ✗
  
Rule 3: If AI-ism detected → Flag for revision
  Detected AI-isms: ["leverage", "synergize", "paradigm shift"]
  
Rule 4: If tone inconsistent with voice → Flag
  Archive tone: Direct, technical, matter-of-fact
  Claim tone: Sales pitch, marketing language ✗
  
Rule 5: If date outside anchor range → REJECT
  Claim: "8 years at USAA" (Current: 4.5 years) ✗
```

**Example Audit**:
```
Claim from L3:
"Built automated fraud surveillance leveraging SAS Fraud Detection 
and IBM DataStage pipelines, processing 50k+ daily transactions"

L4 Audit:
✓ "SAS Fraud Detection" found in Stack 2 (Fraud Monitoring team)
✓ "IBM DataStage" found in Stack 2 (Database architecture)
✓ "fraud surveillance" found in Stack 2 ("monitor and detect internal fraud")
? "50k+ daily transactions" NOT found in Archive → FLAG
✗ Claim slightly overreaches scope

VERDICT: Reject superlative, revise to:
"Built fraud surveillance systems using SAS Fraud Detection 
and IBM DataStage for internal threat detection"
```

**Rejects**: Any unsubstantiated claims

---

### L5: The Talent Scout (Strategist)

**Directive**: Ensure ATS optimization and career alignment.

**Primary Function**: **Keyword Density & Alignment**
- Aligns narrative with target job description
- Ensures "Top-Third" keyword density (90%+ match)
- Highlights quantifiable achievements
- Optimizes for Applicant Tracking Systems
- Maintains 100% factual accuracy while improving visibility

**Decision Process**:
```
Input: L4 verified output + Target Job Description

Job Description Keywords: ["Python", "Docker", "Kubernetes", "Leadership", 
                            "Cloud", "Security", "Infrastructure"]

L4 Output Keyword Analysis:
├─ Python: ✓ (mentioned 2x)
├─ Docker: ✓ (mentioned 1x)
├─ Kubernetes: ✓ (mentioned 1x)
├─ Leadership: ✓ (mentioned 1x via "Lead")
├─ Cloud: ✗ (not mentioned)
├─ Security: ✓ (mentioned 1x via "Security Awareness")
└─ Infrastructure: ✓ (mentioned 1x)

Keyword Match: 6/7 = 85%

OPTIMIZATION: Restructure to include "cloud" naturally:
"Engineered cloud-native containerized infrastructure using Python, Docker, 
and Kubernetes, leading Security Awareness modernization"

New Keyword Match: 7/7 = 100%
```

**Modifications**: Reorders claims by priority, highlights quantifiable metrics

**Preserves**: Zero hallucinations (all keywords already in Archive/Taxonomy)

---

### L6: The Cultural Advocate (Editor)

**Directive**: Polish tone for executive-level signaling.

**Primary Function**: **Authenticity & Cultural Alignment**
- Final tone polish without adding new claims
- Removes remaining jargon/AI-isms
- Ensures "expert without bias" presentation
- Validates mission alignment with target organization

**Final Checks**:
```
Input: L5 keyword-optimized output

Tone Analysis:
├─ Jargon Level: Acceptable (technical but clear)
├─ Embellishment Level: None detected ✓
├─ Expert Bias: "lead", "spearheaded" signals confidence ✓
├─ Authenticity: Sounds like real engineer ✓
└─ Missional Alignment: Aligns with target company values ✓

Final Polish:
├─ Fix capitalization
├─ Standardize punctuation
├─ Optimize readability
├─ Add subheader formatting
└─ Output ready for publication
```

**Final Output** (Ready for Resume/LinkedIn):
```
**Lead: Security Awareness Team | USAA**
*August 2021 – Present*

• Engineered cloud-native containerized infrastructure using Python, 
  Docker, and Kubernetes, supporting critical security initiatives
• Developed generative AI/LLM-powered Jira metadata engine for 
  automated performance audits; demonstrated to director-level leadership
• Designed internal fraud monitoring system leveraging SAS Fraud Detection 
  and IBM DataStage; optimized database architecture through DDLC governance
• Built React/Java Spring Boot security portals for member identity 
  access management and internal CRM systems
```

**Guarantees**:
- Zero new claims added (all from L1-L5)
- 100% factually accurate
- Executive-ready quality
- ATS-optimized keyword density
- Authentic, non-marketing tone

---

## Cross-Persona Decision Trees

### Decision Tree 1: Should This Claim Be Included?

```
                    ┌─ Is claim in Archive?
                    │
           ┌────────┴────────┐
           │                  │
          YES                NO
           │                  │
           ▼                  ▼
    Continue to L2      ✗ REJECT
                        (Hallucination)
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
Is it in    Pass to L3
Taxonomy?   
    │
    ├─ YES ──┐
    └─ NO ───┤ (May still continue if narrative justifies)
            │
            ▼
        Continue to L4
            │
    ┌───────┴───────┐
    │               │
 Check             Check
Authenticity      Embellishment
    │               │
    ├─ REAL ────┐   ├─ NONE ────┐
    └─ FAKE ────┤   └─ SOME ─────┤ REJECT
                │                 │
                ▼                 ▼
            Pass to L5      Flag for L4 revision
```

### Decision Tree 2: Handling Ambiguity

```
Claim Example: "Designed large-scale fraud system"

┌─ Is "large-scale" in Archive?
│
├─ NO ──────────────────────┐
│                           │
├─ Check Forensics evidence: ├─ Found specific scale?
│  (Stack 4)                │  
│                           ├─ YES ──→ Include with scale
├─ Check Taxonomy for       │ └─ NO ──→ Remove adjective
│  typical scale            │
│                           │
└─ Is claim still true      │
   without adjective?       │
   (Fraud system ✓)         │
   └─ YES ──→ OUTPUT:       │
     "Designed fraud        │
      detection system"     │
```

---

## Conflict Resolution

### When Personas Disagree

**Example**: L3 wants narrative flourish, L4 detects hallucination

```
L3 Suggests: "Built industry-leading fraud detection platform"
L4 Rejects: "Industry-leading" not in Archive

Resolution Protocol:
1. Check Archive for any superlative → Not found
2. Check Forensics for proof-of-work → Not found in Stack 4
3. L4 verdict: REJECT superlative
4. Compromise: "Built fraud detection system leveraging industry-standard SAS"

Result: Claim survives but without embellishment
```

---

## Persona Consensus Scoring

Final score requires:
- **L1 Technical Truth**: 100% (facts must be accurate)
- **L2 Authority Alignment**: >90% (must signal appropriate seniority)
- **L3 Narrative Coherence**: >90% (must fit career arc)
- **L4 Authenticity**: 100% (zero hallucinations)
- **L5 Keyword Alignment**: >90% (ATS score acceptable)
- **L6 Cultural Match**: >85% (tone appropriate for audience)

**If any layer < threshold → Output rejected, restart synthesis**
