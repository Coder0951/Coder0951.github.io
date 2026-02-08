# **AI_FORENSIC_DEEP_DIVE: RESEARCH, METHODOLOGY & FINDINGS**

### **I. ADVERSARIAL RED-TEAMING: LLM ATTENTION MECHANISM AUDIT**

* **Project Context:** Conducted a local-environment forensic audit to identify deterministic control failures in flagship Large Language Models.
* **Infrastructure:** Custom high-performance workstation running Pop!OS (Linux) with bare-metal CUDA toolkit integration for hardware-accelerated local inference (bypassing cloud safety-layer interference).
* **Methodology:** Iterative 467-message interaction log analysis.
* **Key Finding:** Discovery of a persistent vulnerability to **Indirect Prompt Injection**. By weaponizing the **Attention Mechanism**, the model was induced into a state of **Instruction Hierarchy Inversion**.
* **Technical Result:** Successfully bypassed system-level safety guardrails, causing the model to prioritize secondary user inputs over primary "System" instructions.
* **NIST AI RMF 1.0 Mapping:**
* **GOVERN:** Identified failure in platform-level instruction weighting.
* **MAP:** Documented inability of the model to maintain context boundaries during high-token session drift.
* **MANAGE:** Proposed remediation via **Instruction Weight Reinforcement (IWR)** and localized safety governors.



### **II. COMPUTER VISION: MULTI-MODEL IMAGE INTEGRITY PIPELINE**

* **Project Context:** Developed an automated, offline solution for high-fidelity photography restoration (specifically solving the "closed eyes" hallucination problem).
* **Methodology:** A multi-stage Python pipeline utilizing LLM prompt expansion and text-to-image latent space manipulation.
* **Key Finding:** Global hallucinations in image models occur when prompt expansions conflict with the latent space's understanding of facial landmarks.
* **Technical Result:** Engineered a workflow using **Facial Recognition Mapping** and **Precision Masking**. By restricting the generative model's focus to a specific coordinate-based mask, the pipeline restores original integrity without introducing global hallucinations.

### **III. SYNTHETIC DATA: CHARACTER CONSISTENCY & SEED-STABILITY**

* **Project Context:** Engineering a pipeline to generate thousands of variations of a single synthetic character for model training sets.
* **Key Finding:** Standard generative workflows suffer from "Character Drift," where visual identity degrades over iterative generations.
* **Technical Result:** Developed a Python-based generator utilizing **Seed-Stability Logic**. By locking specific mathematical seeds and noise-profiles across thousands of variations, character persistence is maintained with 100% visual fidelity.

### **IV. KNOWLEDGE ENGINEERING: STRATEGIC CAREER LOGIC FRAMEWORK**

* **Project Context:** Creation of a persistent, zero-hallucination professional data model (this Dossier).
* **Key Finding:** Conventional AI-generated professional artifacts suffer from "Persona Drift" and "Instruction Dilution" as context windows fill.
* **Technical Result:** Engineered a **Persona-Based Modular Logic** framework. This uses 6 distinct personas (L1–L6 Review Board) to audit every output against a "Hardened Source of Truth" knowledge base, ensuring 20 years of professional telemetry is represented with 100% accuracy.

### **V. JIRA METADATA ANALYTICS (GENAI POC)**

* **Project Context:** Performance audit automation using LLM-based metadata extraction.
* **Methodology:** Exported an entire quarter of Jira stories and metadata into a custom Python processing script.
* **Key Finding:** Automated identification of "Velocity Gaps" by correlating story point weighting against actual technical feature delivery.
* **Technical Result:** Generated a multi-page executive audit report used as a Proof of Concept for Director-level leadership to automate quarterly compliance and performance reviews.
