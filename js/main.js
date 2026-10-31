/* ============================================
   THE LAST TRACE — Aarohan 2026
   FACE Club Investigation Portal
   Main Interactive Application Engine
   ============================================ */

// ── Game Data Store ──
const GAME_DATA = {
  caseOverview: `At 9:50 p.m. on a stormy Thursday, Dr. Adrian John, Research Director at the Asterion Institute for Clinical Systems, was discovered dead inside the hermetically sealed Archive Room.\n\nThe next morning at 10:00 a.m., he was scheduled to deliver an unredacted disclosure to the Institute's Ethics Oversight Board demonstrating that the Institute's flagship study—Project LANTERN (an automated cardiac telemetry algorithm)—had been fraudulently manipulated. Three raw patient observations were deleted and baseline parameters shifted to report 99.4% efficacy.\n\nBefore the scheduled review, the archive database index was corrupted, the primary tape backup disappeared, and an export audit log surfaced pointing directly at a junior data analyst.\n\nTen individuals within Asterion had motive, clearance, or proximity. As independent digital forensic investigators, your team must solve the Round 1 technical codes to recover the Archive Access Key, then dissect the digital records, logs, and cryptographic anomalies to indict the true culprit and prove the underlying motive.`,

  puzzles: [
    {
      id: 1, title: "The Shifted Transponder", difficulty: "easy", character: "T", estimated_minutes: 3,
      prompt: `A communication snippet intercepted from Dr. John's desktop was scrambled using a classic Caesar shift (+3 forward in the Latin alphabet).\nDecipher the scrambled text below to find the target word:\n\nScrambled: "WDUJHW"`,
      artifact: `// Intercepted Packet #01\nCIPHERTEXT: WDUJHW\nALGORITHM : CAESAR_SHIFT(K = +3)\nCHARSET   : A-Z (Uppercase)`,
      hints: [
        "Caesar cipher shifts each letter forward by 3. To decode, shift backwards by 3 (e.g., D -> A).",
        "W - 3 = T; D - 3 = A; U - 3 = R; J - 3 = G; H - 3 = E; W - 3 = T."
      ]
    },
    {
      id: 2, title: "Binary Telemetry Stream", difficulty: "easy", character: "H", estimated_minutes: 3,
      prompt: `Asterion's Level -1 environmental sensor logged this 8-bit binary ASCII byte immediately prior to the door lock failure. Convert the binary byte to its ASCII character representation:\n\nBinary: 01001000`,
      artifact: `// Environmental Monitor Log\nSENSOR_ID : ENV-B1-ARCHIVE\nTIMESTAMP : 21:49:12\nRAW_BITS  : 01001000\nFORMAT    : 8-BIT UNSIGNED ASCII`,
      hints: [
        "Break down powers of 2: 0*128 + 1*64 + 0*32 + 0*16 + 1*8 + 0*4 + 0*2 + 0*1 = 64 + 8 = 72 in decimal.",
        "Decimal 72 corresponds to uppercase letter 'H' in the ASCII table (A=65, B=66, ... H=72)."
      ]
    },
    {
      id: 3, title: "Pulse Wave Calibration", difficulty: "easy", character: "E", estimated_minutes: 3,
      prompt: `The telemetry sensor measures an optical calibration pulse with wavelength λ = 500 nm traveling through a specialized optical fibre with propagation speed v = 2.0 × 10⁸ m/s.\n\nCalculate the frequency of the pulse in TeraHertz (THz). Enter the numerical integer value.`,
      artifact: `WAVE_EQUATION : v = f * λ\nPROBING_SPEED : v = 2.0 × 10^8 m/s\nWAVELENGTH    : λ = 500 nm = 5.0 × 10^-7 m\nTARGET_UNIT   : THz (10^12 Hz)`,
      hints: [
        "Use f = v / λ. Substitute (2.0 × 10⁸) / (5.0 × 10⁻⁷).",
        "(2.0 / 5.0) × 10¹⁵ = 0.4 × 10¹⁵ Hz = 400 × 10¹² Hz = 400 THz."
      ]
    },
    {
      id: 4, title: "Archive Sequence Anomaly", difficulty: "easy", character: "L", estimated_minutes: 2,
      prompt: `The archive system auto-generates sequential backup partition identifiers:\n\n0x10, 0x18, 0x20, 0x28, 0x30, [ ? ]\n\nWhat is the next hex identifier in the sequence?`,
      artifact: `PARTITION_ID | OFFSET (HEX) | OFFSET (DEC)\nPART-01      | 0x10         | 16\nPART-02      | 0x18         | 24\nPART-03      | 0x20         | 32\nPART-04      | 0x28         | 40\nPART-05      | 0x30         | 48\nPART-06      | [ ? ]        | 56`,
      hints: [
        "Observe the decimal difference: 16, 24, 32, 40, 48... each step adds 8.",
        "48 + 8 = 56 decimal. In hexadecimal, 56 = (3 × 16) + 8 = 0x38."
      ]
    },
    {
      id: 5, title: "Telemetry Checksum Loop", difficulty: "easy", character: "A", estimated_minutes: 3,
      prompt: `A data processing routine in the LANTERN pipeline computes an accumulator value. Determine the final value printed:\n\nacc = 12\nfor k in range(1, 5):\n    if k % 2 == 0:\n        acc += k * 3\n    else:\n        acc -= k\nprint(acc)`,
      artifact: `# LANTERN Raw Validator Fragment\nacc = 12\nfor k in range(1, 5): # k = 1, 2, 3, 4\n    if k % 2 == 0:\n        acc += k * 3\n    else:\n        acc -= k\nprint(acc)`,
      hints: [
        "Trace each iteration: k=1 (odd: acc = 12 - 1 = 11); k=2 (even: acc = 11 + 6 = 17).",
        "Continue: k=3 (odd: acc = 17 - 3 = 14); k=4 (even: acc = 14 + 12 = 26)."
      ]
    },
    {
      id: 6, title: "Modular Authentication Key", difficulty: "medium", character: "S", estimated_minutes: 4,
      prompt: `The archive gateway enforces a modular verification check using public modulo n = 37.\nCalculate the value of:\nR = (7³ + 15) mod 37\n\nEnter the integer result.`,
      artifact: `GATEWAY_AUTH_PARAM : n = 37\nCHALLENGE_SEED     : a = 7, exp = 3, b = 15\nVERIFICATION_EQ    : R = (a^3 + b) mod n`,
      hints: [
        "Calculate 7³ = 343.",
        "343 + 15 = 358. Now compute 358 mod 37: 37 × 9 = 333; 358 - 333 = 25."
      ]
    },
    {
      id: 7, title: "Steganographic Header Leak", difficulty: "medium", character: "T", estimated_minutes: 4,
      prompt: `An emergency telemetry snapshot bitmap header had LSB embedded into the byte stream:\n\nBytes (hex): 0x46, 0x4C, 0x41, 0x47\nExtract the ASCII string decoded from these four hex bytes.`,
      artifact: `OFFSET    | 00 01 02 03 | ASCII\n00000000  | 46 4C 41 47 | FLAG`,
      hints: [
        "0x46 in ASCII is 'F', 0x4C is 'L'.",
        "0x41 is 'A', 0x47 is 'G'. Combine them together."
      ]
    },
    {
      id: 8, title: "Fictional OSINT Domain Audit", difficulty: "medium", character: "T", estimated_minutes: 4,
      prompt: `Investigating an outbound DNS query at 21:05, you find a reverse DNS PTR record:\n\n18.44.204.10.in-addr.arpa -> ops-relay.internal.asterion-clinical.org\n\nThe team needs the exact hostname prefix (first subdomain label before .internal).`,
      artifact: `DNS_QUERY_LOG #49102\nCLIENT_IP   : 10.204.44.18\nLOOKUP_TYPE : PTR\nRECORD_DATA : ops-relay.internal.asterion-clinical.org\nSTATUS      : NOERROR (TTL 300)`,
      hints: [
        "Look at the full domain: ops-relay.internal.asterion-clinical.org.",
        "The first label (the hostname component before .internal) is 'ops-relay'."
      ]
    },
    {
      id: 9, title: "Spectrometry Calibration Ratio", difficulty: "medium", character: "R", estimated_minutes: 4,
      prompt: `Lab toxicology screen: absorbance A = 0.84 at 280 nm.\nMolar extinction coefficient ε = 4200 L/(mol·cm), path length l = 1 cm.\n\nBeer-Lambert Law: A = ε · c · l\nCalculate concentration c in μmol/L. Enter the integer value.`,
      artifact: `BEER_LAMBERT_LAW : A = ε * c * l\nABSORBANCE (A)   : 0.84\nMOLAR_EXTINCTION : 4200 L/(mol*cm)\nPATH_LENGTH (l)  : 1.0 cm\nCONVERSION       : 1 mol/L = 1,000,000 μmol/L`,
      hints: [
        "c = A / (ε × l) = 0.84 / 4200 = 0.0002 mol/L.",
        "Convert 0.0002 mol/L to μmol/L: 0.0002 × 1,000,000 = 200."
      ]
    },
    {
      id: 10, title: "Forensic Timestamp Skew Cross-Check", difficulty: "medium-hard", character: "A", estimated_minutes: 4,
      prompt: `Forensic audit log #904 shows an export at 21:31 on workstation N-04.\nNTP diagnostics reveal N-04's clock is running exactly 7 minutes FAST (+00:07:00).\n\nWhat was the TRUE wall-clock time of the export? (24-hour HH:MM format)`,
      artifact: `AUDIT_EVENT_LOG #904\nRECORDED_TIME : 21:31:00\nTERMINAL_ID   : WORKSTATION_N-04\nNTP_METRIC    : CLOCK_SKEW_OFFSET = +00:07:00 (FAST)\nCORRECTION    : TRUE_TIME = RECORDED_TIME - CLOCK_SKEW`,
      hints: [
        "If the terminal clock is 7 minutes FAST, the real time is 7 minutes EARLIER than what is displayed.",
        "21:31 minus 7 minutes = 21:24."
      ]
    },
    {
      id: 11, title: "Memory Allocation Traversal", difficulty: "medium-hard", character: "C", estimated_minutes: 5,
      prompt: `Analyze the linked-node pointer jumps from the archive indexer memory dump:\n\nNode(10) -> Node(30)\nNode(20) -> Node(50)\nNode(30) -> Node(40)\nNode(40) -> Node(20)\nNode(50) -> Node(10)\n\nTraversal starts at Node(10), what is the value at the 4th step?\n(Step 0 = 10, Step 1 = 30, Step 2 = 40, ...)`,
      artifact: `NODE_MAP = {\n  10: 30,\n  20: 50,\n  30: 40,\n  40: 20,\n  50: 10\n}\nSTART = 10`,
      hints: [
        "Step 0: 10; Step 1: 30; Step 2: 40.",
        "Step 3: Node 40 points to 20; Step 4: Node 20 points to 50."
      ]
    },
    {
      id: 12, title: "Multi-Stage XOR Permutation", difficulty: "hard", character: "E", estimated_minutes: 5,
      prompt: `Secure transmission packet header masked using XOR with key K = 0xAA.\nMasked byte = 0xFE.\n\nCompute original unmasked byte:\nByte = Masked XOR K\nEnter as 2-character hex value.`,
      artifact: `BUFFER_DATA : 0xFE = 1111 1110 (bin)\nXOR_KEY     : 0xAA = 1010 1010 (bin)\nOPERATION   : 11111110 XOR 10101010`,
      hints: [
        "Bitwise XOR: 1 XOR 1 = 0; 1 XOR 0 = 1; 0 XOR 0 = 0.",
        "11111110 XOR 10101010 = 01010100 in binary. Convert 0101 0100 to hex."
      ]
    },
    {
      id: 13, title: "Doppler Velocity Discrepancy", difficulty: "hard", character: "K", estimated_minutes: 5,
      prompt: `HVAC acoustic Doppler monitor:\nEmitted frequency f₀ = 40,000 Hz, speed of sound c = 340 m/s.\nMeasured frequency shift Δf = +800 Hz.\n\nDoppler formula: Δf ≈ 2·v·f₀/c\nCalculate speed v in m/s.`,
      artifact: `DOPPLER_FORMULA : Δf = (2 * v * f0) / c\nEMITTED_FREQ    : f0 = 40,000 Hz\nSOUND_SPEED     : c = 340 m/s\nSHIFT_MEASURED  : Δf = 800 Hz`,
      hints: [
        "Rearrange formula: v = (Δf × c) / (2 × f₀).",
        "Substitute values: v = (800 × 340) / (2 × 40,000) = 272,000 / 80,000 = 3.4 m/s."
      ]
    },
    {
      id: 14, title: "Cross-Artefact Registry Hash Match", difficulty: "very-hard", character: "E", estimated_minutes: 6,
      prompt: `Extract A — Token Registry:\n• 'OPS-ALPHA' → MD5: 9a8b7c...\n• 'OPS-BETA'  → MD5: d41d8c...\n• 'OPS-GAMMA' → MD5: 7c2bee...\n• 'OPS-DELTA' → MD5: e2fc71...\n\nExtract B:\nSession token's MD5 hash prefix matched corrupted archive checksum prefix (7c2b).\n\nWhich token was used?`,
      artifact: `EXTRACT_A: TOKEN REGISTRY\n[ID: 101] OPS-ALPHA | HASH: 9a8b7c42\n[ID: 102] OPS-BETA  | HASH: d41d8cd9\n[ID: 103] OPS-GAMMA | HASH: 7c2bee90\n[ID: 104] OPS-DELTA | HASH: e2fc7149\n\nEXTRACT_B: CORRUPTED ARCHIVE ARTIFACT\nFILE_NAME: lantern_raw.csv\nCHECKSUM_PREFIX: 7c2b`,
      hints: [
        "Compare the checksum prefix '7c2b' with the hashes listed in Extract A.",
        "OPS-GAMMA has hash prefix '7c2bee...', exactly matching the 7c2b prefix."
      ]
    },
    {
      id: 15, title: "Cryptographic Synthesis Check", difficulty: "very-hard", character: "Y", estimated_minutes: 6,
      prompt: `Synthesize three parameters from previous tasks:\n1. P1 = Wavelength from Task 3 (500 nm → 5)\n2. P2 = Modular result from Task 6 (25)\n3. P3 = Hex value from Task 12 to decimal (0x54 = 84)\n\nCompute: Z = (P1 × P2) + P3\nEnter the integer value.`,
      artifact: `SYNTHESIS_EQUATION : Z = (P1 * P2) + P3\nPARAM_1 : 5 (from 500 nm / 100)\nPARAM_2 : 25 (from Task 6 modulo)\nPARAM_3 : 84 (from Task 12 0x54 in dec)`,
      hints: [
        "P1 = 5, P2 = 25, P3 = 84.",
        "Calculate: (5 × 25) = 125. Then 125 + 84 = 209."
      ]
    }
  ],

  suspects: [
    {
      id: "john", name: "Dr. Adrian John", role: "Research Director", isVictim: true,
      category: "victim",
      image: "Images/People/Dr. Adrian John.png",
      biography: "Research Director at the Asterion Institute for Clinical Systems. Found dead at 9:50 PM in the Archive Room.",
      relationship: "The victim. Was about to expose Project LANTERN's data manipulation.",
      statement: "N/A — Deceased",
      alibi: "Found unresponsive in the sealed Archive Room at 9:50 PM.",
      red_herring: "N/A"
    },
    {
      id: "voss", name: "Dr. Mira Voss", role: "Operations Lead",
      category: "suspects",
      image: "Images/People/Dr. Mira Voss.png",
      biography: "Oversees research computing operations and repository integrity. Has direct administrative control over physical archive access and backup retention.",
      relationship: "Dr. John's peer and former co-investigator on Project LANTERN. Voss was responsible for clinical deployment milestones that tied directly to institutional funding.",
      statement: "I was in my fourth-floor office finalizing the quarterly operations summary until 10:15 p.m. I heard the alarm sound around 9:55 p.m. but assumed it was the scheduled server reboot.",
      alibi: "Claims she stayed in her office all evening. However, badge records show her access card M-VOSS was used at 21:14 at the Level -1 restricted corridor entrance.",
      red_herring: "Controlled archive permissions; the pending ethics review would expose her direct involvement in manipulating the baseline study records to meet grant milestones."
    },
    {
      id: "reed", name: "Noah Reed", role: "Junior Data Analyst",
      category: "suspects",
      image: "Images/People/Noah Reed.png",
      biography: "Joined Asterion eight months ago. Responsible for executing automated ETL scripts and compiling preliminary telemetry graphs for Project LANTERN.",
      relationship: "Had a heated dispute with Dr. John on Wednesday afternoon regarding anomalous data points in the trial output.",
      statement: "Dr. John shouted at me on Wednesday about missing records, but I swear I only ran the pipelines I was given! I was in the testing pod until 9:30 p.m., then left to grab coffee.",
      alibi: "Badge N-REED shows a 21:28 event marked 'retry / denied' at the archive door. He never actually gained entry.",
      red_herring: "Argued intensely with Dr. John, and his username 'nreed' appears in a suspicious index export log at 21:08."
    },
    {
      id: "park", name: "Dr. Celia Park", role: "Senior Clinical Researcher",
      category: "suspects",
      image: "Images/People/Dr. Celia Park.png",
      biography: "Lead author on the impending multi-centre LANTERN trial publication. Her career trajectory depended heavily on the study results being accepted.",
      relationship: "Long-standing colleague of Dr. John. Disagreed with him on publishing speed but shared his clinical philosophy.",
      statement: "I knew Adrian was uneasy about the baseline discrepancies. We spoke at 6:00 p.m. I told him we should delay publication until we re-ran the cohort.",
      alibi: "Left the institute at 7:30 p.m. Security gate records and her home smart-lock confirm she was at home during the incident window.",
      red_herring: "Her prestigious clinical paper relied completely on the published study figures."
    },
    {
      id: "menon", name: "Ravi Menon", role: "Systems Administrator",
      category: "suspects",
      image: "Images/People/Ravi Menon.png",
      biography: "Senior network and infrastructure engineer. Manages server maintenance, network security, and automated database backups across Asterion.",
      relationship: "Provided Dr. John with custom database extraction scripts last week at Dr. John's private request.",
      statement: "I was running an approved scheduled remote-maintenance sync on the central SAN storage array between 21:00 and 22:00 from the Level 2 NOC.",
      alibi: "Remained in the Network Operations Centre with two junior technicians throughout the maintenance window. Terminal sessions logged.",
      red_herring: "Possessed broad root privileges and approved the scheduled maintenance window that coincided with the camera pause."
    },
    {
      id: "shaw", name: "Elena Shaw", role: "Ethics & Compliance Officer",
      category: "suspects",
      image: "Images/People/Elena Shaw.png",
      biography: "Appointed by the Board of Trustees to oversee research ethics, patient data protection, and regulatory submissions.",
      relationship: "Was scheduled to receive Dr. John's whistleblower report and raw evidence dossier at 10:00 a.m. on Friday morning.",
      statement: "Adrian called me at 8:00 p.m. to confirm our 10:00 a.m. meeting. He told me he had proof of intentional manipulation.",
      alibi: "Logged in on an encrypted conference call with legal counsel between 21:15 and 22:00; IP records and video recording confirm attendance.",
      red_herring: "Was due to initiate the formal investigation that would freeze all institute research grants."
    },
    {
      id: "bell", name: "Marcus Bell", role: "Security Supervisor",
      category: "suspects",
      image: "Images/People/Marcus Bell.png",
      biography: "Directs facility access, physical guard patrols, and digital surveillance camera systems at Asterion Institute.",
      relationship: "Dr. John had filed an internal grievance against Bell three months prior over slow badge credential revocations.",
      statement: "The archive corridor camera was offline between 21:40 and 21:46 due to a scheduled firmware patch cycle approved last Tuesday.",
      alibi: "Logged into the primary security control console on Level 1 during the entire shift. Patrol logs verified by automated NFC checkpoints.",
      red_herring: "Had the authority and technical capability to trigger camera pauses and suppress door breach alerts."
    },
    {
      id: "lin", name: "Tessa Lin", role: "Senior Lab Technician",
      category: "suspects",
      image: "Images/People/Tessa Lin.png",
      biography: "Oversees physical sample intake, telemetry sensor tagging, and specimen barcode registries in Lab 3.",
      relationship: "Exchanged tense emails with Dr. John regarding overtime compensation and sample logging backlogs.",
      statement: "I finished cataloguing the 20:00 sample batch, logged out of the lab terminal at 21:05, and took the 21:20 metro train from the station.",
      alibi: "Metro smart-card swipe at Central Station confirmed at 21:19.",
      red_herring: "Complained bitterly about unpaid overtime and had access to physical sample barcoding machines."
    },
    {
      id: "hale", name: "Omar Hale", role: "Finance & Grants Manager",
      category: "suspects",
      image: "Images/People/Omar Hale.png",
      biography: "Monitors research budget disbursements, federal healthcare grants, and sponsor commercial milestones.",
      relationship: "Dr. John's planned ethics disclosure threatened to trigger immediate clawback of a $4.2M federal grant.",
      statement: "I was at a dinner meeting with institutional benefactors downtown from 19:30 to 22:30. Receipts and valet parking slips have been handed over.",
      alibi: "Verified by restaurant CCTV and multiple independent dinner guests downtown from 19:30 to 22:30.",
      red_herring: "Significant financial discrepancy existed on his ledger if grant funds were forced to be repaid."
    },
    {
      id: "cole", name: "Iris Cole", role: "Journalist-in-Residence",
      category: "suspects",
      image: "Images/People/Iris Cole.png",
      biography: "Independent health-tech investigative journalist on a 6-month fellowship documenting clinical trial data management.",
      relationship: "Had requested an on-the-record interview with Dr. John regarding anonymous tips she received about study reproducibility.",
      statement: "Adrian sent me a brief email at 18:30 saying 'Tomorrow you will have the real story.' I left the press room at 20:30 to draft my article.",
      alibi: "Hotel keycard log and lobby CCTV verify arrival at the Downtown Hyatt at 20:52.",
      red_herring: "Was actively hunting for a whistleblower scoop on Asterion's flagship clinical algorithm."
    },
    {
      id: "saye", name: "Prof. Victor Saye", role: "External Scientific Adviser",
      category: "suspects",
      image: "Images/People/Professor Victor Saye.png",
      biography: "Eminent biostatistician who served on the design committee for the original Project LANTERN protocol.",
      relationship: "Dr. John's former PhD mentor. Saye was concerned that any scandal would permanently tarnish his academic legacy.",
      statement: "Adrian and I argued over statistical smoothing models two weeks ago. I sent him a critical draft review, but I want scientific truth, not violence.",
      alibi: "Participated in an academic symposium panel in Cambridge until 21:00; flight records confirm he did not arrive in the city until Friday noon.",
      red_herring: "Draft review severely criticized LANTERN's statistical claims and feared personal reputational harm."
    }
  ],

  evidence: [
    {
      id: "E-01", title: "Incident Timeline & Room-Access Summary",
      description: "Establishes the chronological sequence of physical and digital events between 20:55 and 21:50, including a known terminal clock skew discrepancy.",
      content: `ASTERION INSTITUTE FOR CLINICAL SYSTEMS
INCIDENT CHRONOLOGY LOG — ARCHIVE CORRIDOR B-1
DATE: 29-OCT-2026 (THURSDAY) | ANALYST: FORENSIC UNIT 4

TIMELINE OF RECORDED EVENTS:
---------------------------------------------------------------------------------
20:55:10 - Dr. Adrian John enters Archive Corridor B-1 (Keycard AJ-01).
21:08:44 - Workstation N-04 records index export request under username 'nreed'.
21:14:02 - Access card M-VOSS swipes at Level -1 Restricted Corridor entrance.
21:17:35 - Archive database master index modified (Table: LANTERN_COHORT_RAW).
21:22:18 - Physical printer queue on Level -1 receives job under owner 'OPS-MV'.
21:28:04 - Keycard N-REED triggers 'RETRY / ACCESS DENIED' at Archive door.
21:31:00 - Terminal N-04 logs export completion. [NOTE: NTP clock offset +00:07:00 FAST].
21:40:00 - Corridor B-1 surveillance camera pauses for scheduled firmware patch reboot.
21:46:12 - Corridor B-1 surveillance camera stream resumes.
21:50:04 - Security patrol officer discovers Dr. John unresponsive inside Archive Room.
---------------------------------------------------------------------------------
CRITICAL FORENSIC ANNOTATION:
Workstation N-04 system clock was synchronized to local hardware RTC rather than the
central NTP master. Offset diagnostic proves events logged on N-04 occurred 7 minutes
EARLIER than recorded. True wall-clock time of 21:31 export was 21:24.`
    },
    {
      id: "E-02", title: "Badge-Reader Access Export",
      description: "Electronic keycard transaction records from Level -1 restricted security portal and Archive Room airlock door.",
      content: `SECURITY SYSTEM ACCESS AUDIT — PERIMETER ZONE B-1
RECORDING WINDOW: 20:30:00 — 22:00:00

BADGE_ID   | HOLDER          | PORTAL              | TIME     | STATUS
-----------|-----------------|---------------------|----------|-----------------
AJ-01      | A. JOHN         | CORRIDOR B-1 DOOR   | 20:55:10 | GRANTED
M-VOSS     | M. VOSS         | CORRIDOR B-1 DOOR   | 21:14:02 | GRANTED
R-MENON    | R. MENON        | SERVER ROOM NOC     | 21:18:40 | GRANTED (MAINT)
N-REED     | N. REED         | ARCHIVE AIRLOCK     | 21:28:04 | DENIED (NO AUTH)
N-REED     | N. REED         | ARCHIVE AIRLOCK     | 21:28:11 | DENIED (RETRY)
M-BELL     | M. BELL         | SECURITY CONTROL    | 21:35:50 | GRANTED
AJ-01      | A. JOHN         | ARCHIVE AIRLOCK     | 21:50:00 | MANUAL OVERRIDE (SEC)

FORENSIC FINDINGS:
1. Dr. Mira Voss entered restricted Corridor B-1 at 21:14:02, exactly three minutes prior to the unauthorized database index alteration.
2. Noah Reed was physically denied entry at 21:28:04 and never gained physical access to the room.
3. Ravi Menon was present in the NOC on Level 2 during the entire incident window.`
    },
    {
      id: "E-03", title: "File-Integrity & Checksum Verification Report",
      description: "Cryptographic hash comparison between the trusted repository golden copy and the modified archive database partition.",
      content: `TRIPWIRE FORENSIC FILE INTEGRITY VERIFICATION
TARGET: /data/lantern/clinical_trials/lantern_raw.csv

BASELINE HASH (08:00 AM BACKUP):
SHA-256: e8b94f102c84d72e90f2b3c108a74e517a99341829e24b7a109ce4358a917c2a
MD5    : 4b29c9a01f8087c2b001a189f72b7c2a
STATUS : TRUSTED GOLDEN ARTIFACT

RECOVERED HASH (22:15 PM CRIME SCENE DUMP):
SHA-256: e8b94f102c84d72e90f2b3c108a74e517a99341829e24b7a109ce4358a917c2b
MD5    : 4b29c9a01f8087c2b001a189f72b7c2b
STATUS : CORRUPTED / CHECKSUM MISMATCH

DIFFERENTIAL ANALYSIS:
Row 412: REMOVED (Patient #1092 - Acute Ventricular Arrhythmia event)
Row 589: REMOVED (Patient #1244 - False Negative Detection failure)
Row 831: REMOVED (Patient #1580 - Cardiac Arrest telemetry loss)
Row 001: Header modified. Baseline sensitivity parameter changed from 88.2% to 99.4%.

METADATA AUDIT:
The database 'is_verified' flag was set to TRUE, but modification timestamp shows manual
override at 21:17:35 via admin credentials OPS-GAMMA.`
    },
    {
      id: "E-04", title: "Printer Queue & Physical Transfer Checklist",
      description: "Recovered spooler log from the physical thermal printer located outside the Archive Room corridor.",
      content: `SPOOLER LOG: B1-THERMAL-PRINTER-01
IP: 10.204.44.82 | SPOOL_DIR: /var/spool/cups

JOB_ID | USER   | DOCUMENT_TITLE         | TIME     | PAGES | STATUS
-------|--------|------------------------|----------|-------|----------
#881   | OPS-MV | archive_transfer_chk   | 21:22:18 | 1     | PRINTED

RECOVERED PAPER FRAGMENT (FROM CORRIDOR TRASH RECEPTACLE):
---------------------------------------------------------------------------------
[ASTERION OPS] ARCHIVE TAPE RETIREMENT & EMERGENCY SYNC CHECKLIST
JOB: LANTERN-OCT-26
OWNER: M. VOSS (OPS-LEAD)

INSTRUCTIONS:
1. Export index to local scratch partition.
2. Replace source file only after checksum warning clears.
3. Overwrite verification ledger flag.
4. If audit inquiries arise, point to pipeline ETL analyst logs.
---------------------------------------------------------------------------------
FORENSIC NOTE:
The institutional standard operating procedure strictly forbids replacing source data
files or clearing checksum warnings without Board authorization.`
    },
    {
      id: "E-05", title: "Dr. John's Private Laboratory Diary Fragment",
      description: "Handwritten laboratory journal page recovered from Dr. Adrian John's jacket pocket.",
      content: `DR. ADRIAN JOHN — PRIVATE RESEARCH JOURNAL
DATE: 28-OCT-2026 / 29-OCT-2026

"The summary is too clean. Far too clean.
I spent four hours manually parsing the telemetry telemetry dump from Site B.
Three critical clinical endpoints have vanished from the cohort. Without those
observations, LANTERN's false-positive rate appears negligible, and efficacy is
artificially elevated to 99.4%.

M.V. came to my office at 4:30. She tried to convince me that the raw records were
merely 'noise' filtered by the new smoothing algorithm. When I refused to sign the
Ethics Board submission, she became agitated. She insisted the audit must wait
until after Friday's grant allocation meeting.

I told her I will not sign. If the source logs are not restored by morning, I will
deliver the unredacted discrepancy dossier directly to Elena Shaw and the Board
at 10:00 a.m.

I am heading down to Archive Room B-1 to burn the golden master to immutable tape.
She knows what this means for the institute's funding.
She knows what this means for her career."`
    },
    {
      id: "E-06", title: "Account Anomaly Forensic Report",
      description: "Deep packet inspection and endpoint session analysis of the suspicious export logged under username 'nreed'.",
      content: `INCIDENT RESPONSE TEAM FORENSIC ANALYSIS
SUBJECT: SUSPICIOUS EXPORT ATTRIBUTION (USER: nreed)

ENDPOINT CORRELATION:
Workstation ID     : WS-TERM-N04 (Physical kiosk in corridor alcove)
Noah Reed Laptop   : WS-LAP-NR02 (IP: 10.204.44.110 - Inactive since 20:45)
Session Token Used : OPS-TEST-SESSION-ALPHA
NTP Skew Offset    : +00:07:00 FAST (Logged 21:31:00 -> True Wall Clock: 21:24:00)

CRITICAL ATTRIBUTION FINDINGS:
1. The session token OPS-TEST-SESSION-ALPHA was generated by an administrative service account with root privilege, not Noah Reed's limited ETL account.
2. The workstation kiosk WS-TERM-N04 does not require biometric login; username was typed manually into an active CLI shell left open.
3. True execution time (21:24) coincides directly with Dr. Mira Voss printing the transfer checklist at printer B1-THERMAL-01 (21:22).
4. CONCLUSION: Noah Reed's credentials were deliberately used as a stalking horse to divert suspicion from the administrative operator.`
    },
    {
      id: "E-07", title: "Operations Change Ticket OPS-447",
      description: "Internal Jira/ServiceNow IT change management request regarding checksum alert suppression.",
      content: `ASTERION OPERATIONS PORTAL — CHANGE TICKET OPS-447
TICKET_ID : OPS-447
CREATED   : 29-OCT-2026 14:12:00
REQUESTER : Dr. Mira Voss (Operations Lead)
URGENCY   : High / Emergency Maintenance

ORIGINAL DESCRIPTION (RECOVERED FROM DATABASE REVISION LOG #1):
"Temporary suppression of archive checksum mismatch warnings and hash integrity
validation alerts on /data/lantern/clinical_trials partition while storage migration
completes."

STATUS: Implemented without second-party authorization.

REVISION LOG #2 (MODIFIED AT 21:42:10 — 8 MINUTES BEFORE DISCOVERY):
Description edited to: "Standard routine database index defragmentation and archival."
Approval field left blank.

AUDIT NOTE:
The modification of ticket OPS-447 occurred while Corridor B-1 camera was offline.`
    },
    {
      id: "E-08", title: "Encoded Motive Note & Codebook",
      description: "Encrypted note recovered from the archive terminal session buffer along with a recovered operations codebook glossary.",
      content: `FOREIGN LANGUAGE MOTIVE CIPHERTEXT & RECOVERED CODEBOOK
ARTIFACT ID: MOTIVE-E08-CODEBOOK

RECOVERED GLOSSARY:
TOKEN    | ENGLISH MEANING
---------|----------------
VAK      | STOP
TOR      | THE
KORAN    | AUDIT
ZEL      | BEFORE
MITH     | BOARD
LUR      | MEETS
PEL      | DELETE
FEN      | ALTER
SEN      | HIDE
DRA      | DISCREPANCY
VAL      | ARCHIVE
NIX      | PATIENT
MOR      | REPORT
---------------------------------------------------------------------------------

RECOVERED CIPHERTEXT LINE:
"VAK TOR KORAN ZEL TOR MITH LUR"

DECODED TRANSLATION:
VAK (STOP) + TOR (THE) + KORAN (AUDIT) + ZEL (BEFORE) + TOR (THE) + MITH (BOARD) + LUR (MEETS)

FINAL MOTIVE STATEMENT:
"STOP THE AUDIT BEFORE THE BOARD MEETS"`
    }
  ],

  roomHotspots: [
    { id: "suspects-board", label: "Suspects Board", image: "Images/Room/Suspects.png", x: "5%", y: "5%", w: "55%", h: "55%" },
    { id: "case-files", label: "Case Files Dossiers", image: "Images/Room/Case Files.png", x: "0%", y: "62%", w: "28%", h: "35%" },
    { id: "documents", label: "Documents & Evidence", image: "Images/Room/Documents.png", x: "30%", y: "58%", w: "40%", h: "40%" },
  ]
};


// ── State Management ──
const STATE = {
  soundEnabled: true,
  solvedPuzzles: new Set(),
  revealedHints: {}, // puzzleId: count
  round2Unlocked: false,
  caseSolved: false,
  participant: null,
  registrationChecked: false,
  activeFilter: 'all',
  searchQuery: ''
};


// ── Audio Feedback Engine (Web Audio API) ──
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
}

function playSound(type) {
  if (!STATE.soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(660, now + 0.08);
      osc.frequency.setValueAtTime(1040, now + 0.16);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(160, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'unlock') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch (err) {
    // Audio context may be restricted
  }
}


// ── Participant API & Local Hint Preferences ──
async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('The server returned an invalid response. Please try again later.');
  }
  if (!response.ok) throw new Error(data.error || `The request failed (${response.status}).`);
  return data;
}

function showRegistrationMessage(message, isError = true) {
  const messageEl = document.getElementById('registration-message');
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.classList.toggle('error', isError);
  messageEl.classList.toggle('success', !isError);
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(`aarohan_hints_2026_${STATE.participant?.id || 'guest'}`);
    if (saved) {
      const data = JSON.parse(saved);
      if (data && typeof data.hints === 'object' && data.hints !== null) {
        STATE.revealedHints = data.hints;
      }
    }
  } catch (e) {
    console.warn('Could not load saved hint preferences', e);
  }
}

function saveProgress() {
  try {
    const key = `aarohan_hints_2026_${STATE.participant?.id || 'guest'}`;
    localStorage.setItem(key, JSON.stringify({ hints: STATE.revealedHints }));
  } catch (e) {
    console.warn('Could not save hint preferences', e);
  }
}

// ── DOM Initialization ──
document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initSoundToggle();
  renderCaseOverview();
  renderRoom();
  renderSuspects();
  renderPuzzles();
  renderEvidence();
  renderCodeword();
  updateProgressDisplay();
  initScrollReveal();
  initLightbox();
  init3DCardDynamics();
  initImageMapResize();
  initRegistrationForm();

  try {
    const data = await apiRequest('/api/state');
    STATE.participant = data.participant;
    STATE.solvedPuzzles = new Set(data.solvedPuzzleIds);
    STATE.round2Unlocked = data.round2Unlocked;
    STATE.caseSolved = data.caseSolved;
  } catch (error) {
    if (!error.message.startsWith('Register before continuing.')) {
      console.error('Could not restore participant session:', error);
      showRegistrationMessage(`${error.message} Check your connection and reload before registering.`, true);
    }
  }

  STATE.registrationChecked = true;
  loadProgress();
  renderRegistrationProfile();
  renderPuzzles();
  renderCodeword();
  updateProgressDisplay();
  initPages();
});


// ── Sound Toggle ──
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  const icon = document.getElementById('sound-icon');
  btn?.addEventListener('click', () => {
    STATE.soundEnabled = !STATE.soundEnabled;
    if (icon) icon.textContent = STATE.soundEnabled ? '🔊' : '🔇';
    playSound('click');
  });
}


// ── Navigation & Hamburger ──
function initNavigation() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    playSound('click');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });
}


// ── Page Router (SPA) ──
function initPages() {
  const navLinks = document.querySelectorAll('[data-page]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-page');
      showPage(target);
      playSound('click');
    });
  });

  // Handle URL hash if present
  const hash = window.location.hash.replace('#', '');
  if (['home', 'room', 'suspects', 'round1', 'evidence', 'register'].includes(hash)) {
    showPage(hash);
  } else {
    showPage('home');
  }
}

function showPage(pageId) {
  if (STATE.registrationChecked && !STATE.participant && pageId !== 'register') {
    pageId = 'register';
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add('active');
    window.location.hash = pageId;

    // Update active nav link
    document.querySelectorAll('[data-page]').forEach(l => {
      if (l.getAttribute('data-page') === pageId) {
        l.classList.add('active');
      } else {
        l.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-check scroll reveal elements
    setTimeout(() => initScrollReveal(), 100);

    // If room page, re-calc image map coords
    if (pageId === 'room') {
      setTimeout(() => resizeImageMap(), 150);
    }
  }
}
window.showPage = showPage;

function renderRegistrationProfile() {
  const form = document.getElementById('registration-form');
  const profile = document.getElementById('registration-profile');
  if (!form || !profile) return;

  form.hidden = Boolean(STATE.participant);
  profile.hidden = !STATE.participant;
  profile.replaceChildren();
  if (!STATE.participant) return;

  const heading = document.createElement('h3');
  heading.textContent = 'Registration confirmed';
  const details = document.createElement('p');
  const participant = STATE.participant;
  details.textContent = `${participant.name} · ${participant.teamName} · Grade ${participant.grade} · ${participant.schoolName}`;
  const note = document.createElement('p');
  note.textContent = 'Your submissions are linked to this browser. Keep using this browser on this device to continue.';
  profile.append(heading, details, note);
}

function initRegistrationForm() {
  const form = document.getElementById('registration-form');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const button = document.getElementById('registration-submit');
    const fields = new FormData(form);
    if (button) button.disabled = true;
    showRegistrationMessage('Saving your registration…', false);

    try {
      const data = await apiRequest('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: fields.get('name'),
          teamName: fields.get('teamName'),
          grade: fields.get('grade'),
          schoolName: fields.get('schoolName'),
          privacyAccepted: fields.get('privacyAccepted') === 'on'
        })
      });

      STATE.participant = data.participant;
      STATE.solvedPuzzles.clear();
      STATE.round2Unlocked = false;
      STATE.caseSolved = false;
      STATE.revealedHints = {};
      STATE.registrationChecked = true;
      renderRegistrationProfile();
      renderPuzzles();
      renderCodeword();
      updateProgressDisplay();
      showRegistrationMessage('Registration saved.', false);
      showPage('home');
    } catch (error) {
      showRegistrationMessage(error.message, true);
    } finally {
      if (button) button.disabled = false;
    }
  });
}


// ── Render Case Overview ──
function renderCaseOverview() {
  const container = document.getElementById('case-overview-text');
  if (container) {
    container.innerHTML = GAME_DATA.caseOverview.split('\n\n').map(p =>
      `<p>${p}</p>`
    ).join('');
  }
}


// ── Render Crime Scene Room with Image Map ──
function renderRoom() {
  const container = document.getElementById('room-hotspots');
  if (!container) return;
  container.innerHTML = '';

  GAME_DATA.roomHotspots.forEach(hotspot => {
    const div = document.createElement('div');
    div.className = 'room-hotspot';
    div.setAttribute('data-label', hotspot.label);
    div.setAttribute('data-image', hotspot.image);
    div.setAttribute('title', hotspot.label);
    div.style.left = hotspot.x;
    div.style.top = hotspot.y;
    div.style.width = hotspot.w;
    div.style.height = hotspot.h;

    div.addEventListener('click', () => {
      playSound('click');
      openLightbox(hotspot.image, `${hotspot.label} — Investigation Room`);
    });
    container.appendChild(div);
  });
}

function initImageMapResize() {
  const img = document.getElementById('room-image');
  if (!img) return;

  const handleResize = () => resizeImageMap();
  window.addEventListener('resize', handleResize);
  img.addEventListener('load', handleResize);
  if (img.complete) resizeImageMap();
}

function resizeImageMap() {
  const img = document.getElementById('room-image');
  const map = document.getElementById('room-map');
  if (!img || !map || !img.naturalWidth) return;

  const scaleX = img.clientWidth / img.naturalWidth;
  const scaleY = img.clientHeight / img.naturalHeight;
  const areas = map.querySelectorAll('area');

  const originalCoords = [
    [77, 51, 921, 614],
    [0, 635, 430, 993],
    [460, 594, 1075, 1003]
  ];

  areas.forEach((area, idx) => {
    if (originalCoords[idx]) {
      const c = originalCoords[idx];
      const scaled = [
        Math.round(c[0] * scaleX),
        Math.round(c[1] * scaleY),
        Math.round(c[2] * scaleX),
        Math.round(c[3] * scaleY)
      ];
      area.coords = scaled.join(',');
    }
  });
}


// ── Render Suspects with Filters and Search ──
function renderSuspects() {
  const grid = document.getElementById('suspects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Setup filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.activeFilter = btn.getAttribute('data-filter');
      playSound('click');
      filterSuspects();
    };
  });

  // Setup search input
  const searchInput = document.getElementById('suspect-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      STATE.searchQuery = e.target.value.toLowerCase().trim();
      filterSuspects();
    };
  }

  // Initial population
  GAME_DATA.suspects.forEach(suspect => {
    const card = document.createElement('div');
    card.className = `suspect-card dynamic-tilt-card${suspect.isVictim ? ' victim' : ''} reveal`;
    card.setAttribute('data-id', suspect.id);
    card.setAttribute('data-category', suspect.category);
    card.setAttribute('data-name', suspect.name.toLowerCase());
    card.setAttribute('data-role', suspect.role.toLowerCase());

    card.innerHTML = `
      <div class="suspect-card-image">
        <img src="${suspect.image}" alt="${suspect.name}" loading="lazy">
        <span class="suspect-tag">${suspect.isVictim ? '☠ Deceased' : '⚠ Suspect'}</span>
      </div>
      <div class="suspect-card-body">
        <h3>${suspect.name}</h3>
        <div class="suspect-role">${suspect.role}</div>
        <p class="suspect-bio">${suspect.biography}</p>
      </div>
      <div class="card-footer-action">Inspect Dossier →</div>
    `;

    card.addEventListener('click', () => {
      playSound('click');
      openSuspectModal(suspect);
    });
    grid.appendChild(card);
  });

  init3DCardDynamics();
}

function filterSuspects() {
  const cards = document.querySelectorAll('#suspects-grid .suspect-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    const name = card.getAttribute('data-name');
    const role = card.getAttribute('data-role');

    const matchesFilter = (STATE.activeFilter === 'all') ||
                          (STATE.activeFilter === 'suspects' && cat === 'suspects') ||
                          (STATE.activeFilter === 'victim' && cat === 'victim');

    const matchesSearch = !STATE.searchQuery ||
                          name.includes(STATE.searchQuery) ||
                          role.includes(STATE.searchQuery);

    if (matchesFilter && matchesSearch) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function openSuspectModal(suspect) {
  const modal = document.getElementById('suspect-modal');
  const content = document.getElementById('suspect-modal-inner');

  content.innerHTML = `
    <button class="suspect-modal-close" onclick="closeSuspectModal()">✕</button>
    <div class="suspect-modal-header">
      <img src="${suspect.image}" alt="${suspect.name}">
      <div class="modal-info">
        <span class="section-tag">${suspect.isVictim ? '// VICTIM' : '// PERSON OF INTEREST'}</span>
        <h2>${suspect.name}</h2>
        <div class="modal-role">${suspect.role}</div>
      </div>
    </div>
    <div class="suspect-modal-body">
      <div class="detail-section">
        <h4>Biography</h4>
        <p>${suspect.biography}</p>
      </div>
      <div class="detail-section">
        <h4>Relationship to Victim</h4>
        <p>${suspect.relationship}</p>
      </div>
      <div class="detail-section">
        <h4>Statement to Investigators</h4>
        <p style="font-style: italic;">"${suspect.statement}"</p>
      </div>
      <div class="detail-section">
        <h4>Alibi & Movements</h4>
        <p>${suspect.alibi}</p>
      </div>
      ${!suspect.isVictim ? `
      <div class="detail-section">
        <h4>Investigator's Lead & Cross-Check Note</h4>
        <p style="color: var(--amber-400);">${suspect.red_herring}</p>
      </div>` : ''}
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSuspectModal() {
  document.getElementById('suspect-modal')?.classList.remove('active');
  document.body.style.overflow = '';
}


// ── Render Round 1 Puzzles with Interactive Form & Hints ──
function renderPuzzles() {
  const grid = document.getElementById('puzzles-grid');
  if (!grid) return;
  grid.innerHTML = '';

  GAME_DATA.puzzles.forEach(puzzle => {
    const isSolved = STATE.solvedPuzzles.has(puzzle.id);
    const hintsCount = STATE.revealedHints[puzzle.id] || 0;

    const card = document.createElement('div');
    card.className = `puzzle-card dynamic-tilt-card reveal${isSolved ? ' solved' : ''}`;
    card.id = `puzzle-card-${puzzle.id}`;

    const promptText = puzzle.prompt.replace(/\[\[ARTIFACT\]\]/g, '').trim();

    card.innerHTML = `
      <div class="puzzle-card-header">
        <div class="puzzle-number">${String(puzzle.id).padStart(2, '0')}</div>
        <div style="display:flex; gap:8px; align-items:center;">
          <span class="puzzle-solved-badge" id="solved-badge-${puzzle.id}">✓ SOLVED</span>
          <span class="puzzle-difficulty ${puzzle.difficulty}">${puzzle.difficulty.replace('-', ' ')}</span>
        </div>
      </div>
      <h3>${puzzle.title}</h3>
      <div class="puzzle-prompt">${promptText.replace(/\n/g, '<br>')}</div>
      <div class="puzzle-artifact">${puzzle.artifact}</div>

      <!-- Interactive Answer Form -->
      <div class="puzzle-interactive-form">
        <div class="puzzle-input-group">
          <input type="text" class="puzzle-input" id="input-${puzzle.id}" placeholder="Enter answer..."
                 value="${isSolved ? 'Verified' : ''}" ${isSolved ? 'disabled' : ''}
                 onkeydown="if(event.key==='Enter') checkAnswer(${puzzle.id})">
          <button class="btn-check-answer" id="btn-check-${puzzle.id}" ${isSolved ? 'disabled' : ''}
                  onclick="checkAnswer(${puzzle.id})">
            ${isSolved ? 'VERIFIED' : 'VERIFY'}
          </button>
        </div>
        <div class="puzzle-feedback" id="feedback-${puzzle.id}">
          ${isSolved ? '<span class="text-green">✓ Solved — Character unlocked</span>' : ''}
        </div>
      </div>

      <!-- Hints Section -->
      <div class="puzzle-hints-section">
        <button class="btn-hint" id="hint-btn-${puzzle.id}" onclick="revealNextHint(${puzzle.id})">
          💡 Request Hint (${hintsCount}/2)
        </button>
        <div class="hint-box" id="hint-box-${puzzle.id}">
          ${getRenderedHints(puzzle.id)}
        </div>
      </div>

      <div class="puzzle-meta">
        <span class="puzzle-time">⏱ ~${puzzle.estimated_minutes} min</span>
        <div class="puzzle-char-slot${isSolved ? ' revealed' : ''}" id="char-slot-${puzzle.id}"
             title="${isSolved ? `Unlocked character: ${puzzle.character}` : 'Solves unlock one access character'}">
          ${isSolved ? puzzle.character : '?'}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  initUnlockButton();
}

function getRenderedHints(puzzleId) {
  const count = STATE.revealedHints[puzzleId] || 0;
  const puzzle = GAME_DATA.puzzles.find(p => p.id === puzzleId);
  if (!puzzle || count === 0) return '';

  let html = '';
  for (let i = 0; i < count; i++) {
    if (puzzle.hints[i]) {
      html += `<div class="hint-item"><strong>HINT ${i + 1}:</strong> ${puzzle.hints[i]}</div>`;
    }
  }
  return html;
}

function revealNextHint(puzzleId) {
  const current = STATE.revealedHints[puzzleId] || 0;
  if (current >= 2) return;

  STATE.revealedHints[puzzleId] = current + 1;
  saveProgress();
  playSound('click');

  const btn = document.getElementById(`hint-btn-${puzzleId}`);
  if (btn) btn.textContent = `💡 Request Hint (${STATE.revealedHints[puzzleId]}/2)`;

  const box = document.getElementById(`hint-box-${puzzleId}`);
  if (box) box.innerHTML = getRenderedHints(puzzleId);
}
window.revealNextHint = revealNextHint;

async function checkAnswer(puzzleId) {
  const input = document.getElementById(`input-${puzzleId}`);
  const feedback = document.getElementById(`feedback-${puzzleId}`);
  const card = document.getElementById(`puzzle-card-${puzzleId}`);
  const charSlot = document.getElementById(`char-slot-${puzzleId}`);
  const btn = document.getElementById(`btn-check-${puzzleId}`);
  if (!input || !feedback) return;

  const puzzle = GAME_DATA.puzzles.find(p => p.id === puzzleId);
  if (!puzzle) return;

  const raw = input.value.trim();
  if (!raw) return;

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'CHECKING…';
  }
  feedback.textContent = 'Checking answer…';

  try {
    const result = await apiRequest('/api/puzzle-submit', {
      method: 'POST',
      body: JSON.stringify({ puzzleId, answer: raw })
    });

    if (result.correct) {
    STATE.solvedPuzzles.add(puzzleId);
    playSound('success');

    feedback.innerHTML = '<span class="text-green">✓ CORRECT! Character unlocked.</span>';
    card?.classList.add('solved');
    input.disabled = true;
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'VERIFIED';
    }

    if (charSlot) {
      charSlot.classList.add('revealed');
      charSlot.textContent = puzzle.character;
    }

    // Reveal character in the codeword banner
    revealCodewordChar(puzzleId - 1, puzzle.character);
    updateProgressDisplay();

    } else {
      playSound('error');
      feedback.innerHTML = '<span class="text-red">✗ INCORRECT. Recheck formula or request a hint.</span>';
      input.classList.add('error-shake');
      setTimeout(() => input.classList.remove('error-shake'), 400);
    }
  } catch (error) {
    feedback.textContent = error.message;
  } finally {
    if (btn && !STATE.solvedPuzzles.has(puzzleId)) {
      btn.disabled = false;
      btn.textContent = 'VERIFY';
    }
  }
}
window.checkAnswer = checkAnswer;


// ── Codeword & Unlock Console ──
function renderCodeword() {
  const container = document.getElementById('codeword-display');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < GAME_DATA.puzzles.length; i++) {
    const puzzle = GAME_DATA.puzzles[i];
    const isSolved = STATE.solvedPuzzles.has(puzzle.id);
    const char = document.createElement('div');
    char.className = `codeword-char${isSolved ? ' revealed' : ''}`;
    char.id = `codeword-char-${i}`;
    char.textContent = isSolved ? puzzle.character : '?';
    char.setAttribute('data-index', i);
    container.appendChild(char);
  }
}

function revealCodewordChar(index, letter) {
  const charEl = document.getElementById(`codeword-char-${index}`);
  if (charEl) {
    charEl.classList.add('revealed');
    charEl.textContent = letter;
  }
}

function updateProgressDisplay() {
  const counter = document.getElementById('solve-counter');
  const bar = document.getElementById('progress-bar-fill');
  const count = STATE.solvedPuzzles.size;

  if (counter) counter.textContent = `${count} / 15 SOLVED`;
  if (bar) bar.style.width = `${(count / 15) * 100}%`;
}

function initUnlockButton() {
  const btn = document.getElementById('final-unlock-btn');
  const input = document.getElementById('final-code-input');
  const feedback = document.getElementById('unlock-feedback');

  if (!btn) return;
  btn.onclick = async () => {
    if (!input || !feedback) return;
    btn.disabled = true;
    feedback.textContent = 'Checking access key…';
    try {
      const result = await apiRequest('/api/unlock', {
        method: 'POST',
        body: JSON.stringify({ code: input.value })
      });
      if (result.correct) {
        playSound('unlock');
        STATE.round2Unlocked = true;
        feedback.className = 'unlock-feedback success';
        feedback.textContent = '🔓 ACCESS GRANTED! Archive Room Unlocked. Transitioning to Round 2 Evidence Vault...';
        setTimeout(() => showPage('evidence'), 1400);
      } else {
        playSound('error');
        feedback.className = 'unlock-feedback error';
        feedback.textContent = result.error || 'ACCESS DENIED: Invalid key or puzzles remain unsolved.';
      }
    } catch (error) {
      feedback.className = 'unlock-feedback error';
      feedback.textContent = error.message;
    } finally {
      btn.disabled = false;
    }
  };
}


// ── Render Evidence Vault ──
function renderEvidence() {
  const grid = document.getElementById('evidence-grid');
  if (!grid) return;
  grid.innerHTML = '';

  GAME_DATA.evidence.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'evidence-card dynamic-tilt-card reveal';

    card.innerHTML = `
      <div class="evidence-card-header">
        <div class="evidence-id">${ev.id}</div>
        <h3>${ev.title}</h3>
      </div>
      <div class="evidence-card-body">
        <p class="evidence-desc">${ev.description}</p>
      </div>
      <div class="card-footer-action">Examine File →</div>
    `;

    card.addEventListener('click', () => {
      playSound('click');
      openEvidenceModal(ev);
    });
    grid.appendChild(card);
  });
}

function openEvidenceModal(ev) {
  const modal = document.getElementById('evidence-modal');
  const content = document.getElementById('evidence-modal-inner');

  content.innerHTML = `
    <button class="evidence-modal-close" onclick="closeEvidenceModal()">✕</button>
    <span class="section-tag">${ev.id} // CLASSIFIED FORENSIC EVIDENCE</span>
    <h2>${ev.title}</h2>
    <p class="evidence-full-text">${ev.description}</p>
    <div class="evidence-content-block">${ev.content}</div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEvidenceModal() {
  document.getElementById('evidence-modal')?.classList.remove('active');
  document.body.style.overflow = '';
}


// ── Final Case Indictment Submission ──
async function handleIndictmentSubmit(e) {
  e.preventDefault();
  const select = document.getElementById('accused-suspect');
  const motiveInput = document.getElementById('motive-input');
  const feedback = document.getElementById('indictment-feedback');
  const submitButton = document.getElementById('btn-submit-indictment');
  if (!select || !motiveInput || !feedback) return;

  if (submitButton) submitButton.disabled = true;
  feedback.textContent = 'Recording indictment…';
  try {
    const result = await apiRequest('/api/indictment', {
      method: 'POST',
      body: JSON.stringify({ culprit: select.value, motive: motiveInput.value })
    });

    if (result.correct) {
      STATE.caseSolved = true;
      playSound('unlock');
      openCaseSolvedModal();
      feedback.className = 'indictment-feedback';
      feedback.textContent = '';
    } else {
      playSound('error');
      feedback.className = 'indictment-feedback error';
      feedback.textContent = '❌ INDICTMENT REJECTED: The submission does not match the complete forensic record. Review Evidence E-01 through E-08.';
    }
  } catch (error) {
    feedback.className = 'indictment-feedback error';
    feedback.textContent = error.message;
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}
window.handleIndictmentSubmit = handleIndictmentSubmit;

function openCaseSolvedModal() {
  document.getElementById('case-solved-modal')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseSolvedModal() {
  document.getElementById('case-solved-modal')?.classList.remove('active');
  document.body.style.overflow = '';
}
window.closeCaseSolvedModal = closeCaseSolvedModal;


// ── 3D Card Dynamics (Tilt & Reflection) ──
function init3DCardDynamics() {
  const cards = document.querySelectorAll('.dynamic-tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}


// ── Lightbox Engine ──
function initLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const closeBtn = document.getElementById('lightbox-close');

  closeBtn?.addEventListener('click', closeLightbox);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeSuspectModal();
      closeEvidenceModal();
      closeCaseSolvedModal();
    }
  });
}

function openLightbox(imageSrc, title) {
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');

  if (img) img.src = imageSrc;
  if (titleEl) titleEl.textContent = title;
  overlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
}
window.openLightbox = openLightbox;

function closeLightbox() {
  document.getElementById('lightbox-overlay')?.classList.remove('active');
  document.body.style.overflow = '';
}
window.closeLightbox = closeLightbox;


// ── Scroll Reveal Observer ──
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}


// ── Global Exports ──
window.closeSuspectModal = closeSuspectModal;
window.closeEvidenceModal = closeEvidenceModal;
