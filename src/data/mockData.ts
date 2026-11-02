import { User, ResearchPaper, AiQuery, ResearchNote } from '../types';
import { generateAcademicSummaries } from '../utils/summaryGenerator';

export const initialUser: User = {
  id: 'usr_diksha_1',
  name: 'Diksha Desai',
  email: 'dikshadesai2806@gmail.com',
  avatarLetter: 'D',
  role: 'AI & Data Science Researcher',
};

const paper1Data = generateAcademicSummaries(
  'Artificial Intelligence in Education.pdf',
  'This comprehensive study evaluates adaptive learning algorithms and LLM pedagogical agents deployed across 45 higher-education institutions. We analyze student engagement metrics, customized feedback efficacy, and ethical considerations surrounding automated grading.',
  undefined,
  'Computer Science & Pedagogy',
  'Dr. Elena Rostova, Prof. Marcus Chen'
);

const paper2Data = generateAcademicSummaries(
  'Blockchain Technology.pdf',
  'A systematic analysis of Byzantine Fault Tolerant consensus protocols, zero-knowledge rollup scalability, and decentralized identity governance frameworks for next-generation enterprise networks.',
  undefined,
  'Distributed Systems & Cryptography',
  'Satoshi Nakamoto Foundation, Satoshi Lab Group'
);

const paper3Data = generateAcademicSummaries(
  'IoT in Smart Cities.pdf',
  'Investigating mesh-networked edge sensor deployments for real-time vehicular traffic optimization, atmospheric quality monitoring, and municipal power distribution across metropolitan zones.',
  undefined,
  'Cyber-Physical Systems',
  'Dr. Tariq Al-Mansoor, Sarah Jenkins, PE'
);

const paper4Data = generateAcademicSummaries(
  'Machine Learning Review.pdf',
  'A decadal retrospective on deep neural architectures: from convolutional image backbones and recurrent sequence models to modern attention transformers and diffusion formulations.',
  undefined,
  'Artificial Intelligence',
  'Andrew Ng, Yoshua Bengio, Yann LeCun'
);

const paper5Data = generateAcademicSummaries(
  'Data Science Applications.pdf',
  'Real-world case studies of predictive analytics, causal inference, and automated data pipelines across healthcare genomics, financial risk modeling, and e-commerce forecasting.',
  undefined,
  'Applied Data Science & Analytics',
  'Prof. David K. Miller, Dr. Priya Sharma'
);

export const initialPapers: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Artificial Intelligence in Education',
    fileName: 'Artificial Intelligence in Education.pdf',
    date: '12 Oct 2026',
    status: 'Summarized',
    category: 'Computer Science & Pedagogy',
    authors: 'Dr. Elena Rostova, Prof. Marcus Chen',
    citations: 142,
    pages: 18,
    fileSize: '3.4 MB',
    abstract:
      'This comprehensive study evaluates adaptive learning algorithms and LLM pedagogical agents deployed across 45 higher-education institutions. We analyze student engagement metrics, customized feedback efficacy, and ethical considerations surrounding automated grading.',
    summary: paper1Data.shortSummary,
    detailedSummary: paper1Data.detailedSummary,
    keyPoints: [
      '24.3% measured improvement in learner comprehension with AI tutoring scaffolds.',
      'Socratic dialogue prompting reduces student cognitive overload by 31%.',
      'Evaluation of algorithmic fairness across diverse linguistic demographics is essential.',
      'Hybrid teacher-in-the-loop oversight remains critical for grading nuance.'
    ],
    keywords: ['Adaptive Learning', 'Pedagogical Agents', 'LLMs', 'Cognitive Load', 'Formative Assessment'],
    notes: 'Important findings on formative feedback timing. Consider integrating Section 3.2 citations in upcoming survey paper.'
  },
  {
    id: 'paper-2',
    title: 'Blockchain Technology',
    fileName: 'Blockchain Technology.pdf',
    date: '10 Oct 2026',
    status: 'Analyzed',
    category: 'Distributed Systems & Cryptography',
    authors: 'Satoshi Nakamoto Foundation, Satoshi Lab Group',
    citations: 310,
    pages: 24,
    fileSize: '4.8 MB',
    abstract:
      'A systematic analysis of Byzantine Fault Tolerant consensus protocols, zero-knowledge rollup scalability, and decentralized identity governance frameworks for next-generation enterprise networks.',
    summary: paper2Data.shortSummary,
    detailedSummary: paper2Data.detailedSummary,
    keyPoints: [
      'ZK-SNARK compression allows 1,800+ transactions per second on public testnets.',
      'Validator distribution models prevent central validator cartel formation.',
      'Smart contract auditing automation catches 88% of reentrancy vulnerabilities.'
    ],
    keywords: ['ZK-Rollups', 'BFT Consensus', 'Decentralized Identity', 'Smart Contracts', 'DAG Architectures'],
    notes: 'Compare transaction finality graphs with Solana and Ethereum L2 metrics.'
  },
  {
    id: 'paper-3',
    title: 'IoT in Smart Cities',
    fileName: 'IoT in Smart Cities.pdf',
    date: '08 Oct 2026',
    status: 'Summarized',
    category: 'Cyber-Physical Systems',
    authors: 'Dr. Tariq Al-Mansoor, Sarah Jenkins, PE',
    citations: 89,
    pages: 14,
    fileSize: '2.9 MB',
    abstract:
      'Investigating mesh-networked edge sensor deployments for real-time vehicular traffic optimization, atmospheric quality monitoring, and municipal power distribution across metropolitan zones.',
    summary: paper3Data.shortSummary,
    detailedSummary: paper3Data.detailedSummary,
    keyPoints: [
      'LoRaWAN and 5G private slices provide 99.98% packet delivery reliability.',
      'Solar-harvesting sensor nodes demonstrate 5-year maintenance-free lifecycle.',
      'Decentralized edge inferencing preserves citizen privacy while predicting traffic flows.'
    ],
    keywords: ['Edge Computing', 'LoRaWAN', 'Traffic Telemetry', 'Air Quality', 'Smart Grid'],
    notes: 'Section 4 details municipal sensor battery longevity.'
  },
  {
    id: 'paper-4',
    title: 'Machine Learning Review',
    fileName: 'Machine Learning Review.pdf',
    date: '05 Oct 2026',
    status: 'Notes Added',
    category: 'Artificial Intelligence',
    authors: 'Andrew Ng, Yoshua Bengio, Yann LeCun',
    citations: 1240,
    pages: 42,
    fileSize: '8.2 MB',
    abstract:
      'A decadal retrospective on deep neural architectures: from convolutional image backbones and recurrent sequence models to modern attention transformers and diffusion formulations.',
    summary: paper4Data.shortSummary,
    detailedSummary: paper4Data.detailedSummary,
    keyPoints: [
      'Attention mechanisms provide scalable inductive biases for arbitrary tokens.',
      'Mixture of Experts (MoE) cuts activation FLOPs while scaling parameter capacity.',
      'Post-training RLHF and DPO dictate alignment fidelity and safety.'
    ],
    keywords: ['Transformers', 'Mixture of Experts', 'DPO', 'Multimodal', 'Scaling Laws'],
    notes: 'Exemplary survey covering 2017–2026 architecture evolution. Review Section 6 on state-space models.'
  },
  {
    id: 'paper-5',
    title: 'Data Science Applications',
    fileName: 'Data Science Applications.pdf',
    date: '02 Oct 2026',
    status: 'Summarized',
    category: 'Applied Data Science & Analytics',
    authors: 'Prof. David K. Miller, Dr. Priya Sharma',
    citations: 175,
    pages: 20,
    fileSize: '4.1 MB',
    abstract:
      'Real-world case studies of predictive analytics, causal inference, and automated data pipelines across healthcare genomics, financial risk modeling, and e-commerce forecasting.',
    summary: paper5Data.shortSummary,
    detailedSummary: paper5Data.detailedSummary,
    keyPoints: [
      'Causal discovery frameworks enhance model interpretability in clinical settings.',
      'Automated feature stores decrease machine learning deployment cycle from 6 weeks to 3 days.',
      'Data drift detection using Wasserstein distance catches distributional shifts early.'
    ],
    keywords: ['Causal Inference', 'Predictive Modeling', 'Feature Stores', 'Data Drift', 'Healthcare Analytics'],
    notes: 'Useful methodology for evaluating covariate shift.'
  }
];

export const initialQueries: AiQuery[] = [
  {
    id: 'q-1',
    question: 'How do adaptive learning algorithms measure student comprehension in real-time?',
    answer:
      'According to "Artificial Intelligence in Education.pdf", adaptive algorithms analyze clickstream latency, error recovery patterns, and formative quiz answer trajectories. The model constructs a dynamic Bayesian Knowledge Tracing matrix to predict concept mastery.',
    paperTitle: 'Artificial Intelligence in Education.pdf',
    timestamp: '12 Oct 2026, 14:20',
    citations: ['Section 3.2 - Knowledge State Estimation', 'Equation 4 - Tracing Probability'],
    keyTakeaways: [
      'Bayesian Knowledge Tracing predicts mastery with 91.4% accuracy.',
      'Response latency is a strong indicator of learner hesitation or certainty.'
    ]
  },
  {
    id: 'q-2',
    question: 'What are the throughput advantages of ZK-Rollups over optimistic rollups?',
    answer:
      'In "Blockchain Technology.pdf", ZK-Rollups compress transaction state validity proofs via SNARKs/STARKs directly to L1, eliminating the 7-day challenge withdrawal window inherent to optimistic rollups and yielding up to 40x higher throughput.',
    paperTitle: 'Blockchain Technology.pdf',
    timestamp: '10 Oct 2026, 11:45',
    citations: ['Section 4.1 - Proof Generation vs Fraud Windows'],
    keyTakeaways: ['Instant finality once validity proof is verified.', 'Gas footprint amortized over thousands of batches.']
  },
  {
    id: 'q-3',
    question: 'What communication protocol was chosen for municipal IoT nodes and why?',
    answer:
      'The authors of "IoT in Smart Cities.pdf" utilized hybrid LoRaWAN for telemetry sensors due to its 12km transmission range and sub-15mA power draw, supplemented by private 5G mmWave for video traffic nodes.',
    paperTitle: 'IoT in Smart Cities.pdf',
    timestamp: '08 Oct 2026, 09:12',
    citations: ['Section 2.3 - Wireless Mesh Topologies'],
    keyTakeaways: ['LoRaWAN grants 5+ years battery lifespan.', '5G slice reserved for mission-critical emergency signals.']
  },
  {
    id: 'q-4',
    question: 'How does Mixture of Experts (MoE) reduce computational cost during inference?',
    answer:
      'As detailed in "Machine Learning Review.pdf", MoE activates only top-k expert subnetworks (e.g. 2 out of 8 experts) per token, keeping FLOP count equal to a much smaller dense model while preserving extensive parameter memory.',
    paperTitle: 'Machine Learning Review.pdf',
    timestamp: '05 Oct 2026, 16:30',
    citations: ['Section 5.3 - Sparsely-Gated Architectures'],
    keyTakeaways: ['Inference latency matches 8B model while holding 64B knowledge capacity.']
  },
  {
    id: 'q-5',
    question: 'What technique prevents false correlations in predictive genomics?',
    answer:
      'From "Data Science Applications.pdf", Do-Calculus and structural causal models (SCM) decouple confounding clinical variables from genuine genomic markers, cutting spurious discoveries by 43%.',
    paperTitle: 'Data Science Applications.pdf',
    timestamp: '02 Oct 2026, 13:05',
    citations: ['Section 3 - Causal Inference Framework'],
    keyTakeaways: ['Propensity score matching isolates treatment effects.', 'DAG validation prevents collider bias.']
  },
  {
    id: 'q-6',
    question: 'What are the main privacy safeguards for student chatbot interactions?',
    answer:
      'Differential privacy injected into training logs along with client-side PII sanitization regex filters prior to cloud embedding ingestion.',
    paperTitle: 'Artificial Intelligence in Education.pdf',
    timestamp: '01 Oct 2026, 17:15'
  },
  {
    id: 'q-7',
    question: 'Can DAG-based consensus prevent MEV frontrunning in decentralized exchanges?',
    answer:
      'Yes, partial order commitments with fair-sequencing threshold encryption prevent validators from reordering transactions for MEV profit.',
    paperTitle: 'Blockchain Technology.pdf',
    timestamp: '29 Sep 2026, 10:40'
  },
  {
    id: 'q-8',
    question: 'How do edge gateways handle intermittent connectivity during severe weather?',
    answer:
      'Local SQLite ring buffers store up to 72 hours of telemetry with exponential backoff resynchronization upon link recovery.',
    paperTitle: 'IoT in Smart Cities.pdf',
    timestamp: '27 Sep 2026, 15:22'
  },
  {
    id: 'q-9',
    question: 'Why has Direct Preference Optimization (DPO) replaced PPO in recent models?',
    answer:
      'DPO implicitly solves the RL reward optimization in closed form, eliminating the instability and memory overhead of running separate actor and critic models.',
    paperTitle: 'Machine Learning Review.pdf',
    timestamp: '25 Sep 2026, 18:50'
  },
  {
    id: 'q-10',
    question: 'What is Wasserstein distance used for in data pipeline monitoring?',
    answer:
      'It quantifies earth-mover distance between training and production feature distributions to trigger automated model retraining when distributions diverge.',
    paperTitle: 'Data Science Applications.pdf',
    timestamp: '23 Sep 2026, 11:15'
  },
  {
    id: 'q-11',
    question: 'How do Socratic prompts differ from standard direct answer prompts?',
    answer:
      'Socratic prompts instruct the model to answer student questions with guided counter-questions, preventing passive copying and promoting conceptual retention.',
    paperTitle: 'Artificial Intelligence in Education.pdf',
    timestamp: '20 Sep 2026, 14:02'
  },
  {
    id: 'q-12',
    question: 'What is the energy consumption difference between PoW and modern BFT proof-of-stake?',
    answer:
      'BFT proof-of-stake reduces energy expenditure by >99.95%, relying on economic stake slashing rather than thermodynamic hashing computations.',
    paperTitle: 'Blockchain Technology.pdf',
    timestamp: '18 Sep 2026, 09:30'
  }
];

export const initialNotes: ResearchNote[] = [
  {
    id: 'note-1',
    title: 'Adaptive Learning Scaffolding Strategy',
    paperId: 'paper-1',
    paperTitle: 'Artificial Intelligence in Education.pdf',
    content:
      'Key takeaway from Section 3: When students encounter difficult STEM problems, providing hints in 3 incremental tiers (conceptual hint -> formula reminder -> partial step) yields 38% higher retention than immediate solution reveal.',
    date: '12 Oct 2026',
    tags: ['Pedagogy', 'AI Tutoring', 'Retention']
  },
  {
    id: 'note-2',
    title: 'ZK-Rollup Architecture Comparison',
    paperId: 'paper-2',
    paperTitle: 'Blockchain Technology.pdf',
    content:
      'STARKs offer quantum resistance and trustless setup, but have larger proof byte sizes (~45KB). SNARKs have tiny proofs (~200 bytes) but require elliptic curve trusted setups. For mobile edge clients, SNARKs remain preferred.',
    date: '10 Oct 2026',
    tags: ['Cryptography', 'Scalability', 'ZK-Proofs']
  },
  {
    id: 'note-3',
    title: 'Edge Gateway Telemetry Specifications',
    paperId: 'paper-3',
    paperTitle: 'IoT in Smart Cities.pdf',
    content:
      'Gateways should be placed at 400m intervals on municipal light poles. Solar panels with 18W rating are sufficient for temperate latitudes. Communication budget: 1 packet / 30 seconds.',
    date: '08 Oct 2026',
    tags: ['Edge Computing', 'Hardware', 'Urban Planning']
  },
  {
    id: 'note-4',
    title: 'Transformer Attention Matrix Memory Profiling',
    paperId: 'paper-4',
    paperTitle: 'Machine Learning Review.pdf',
    content:
      'Standard multi-head attention scales quadratically O(N^2) with context length. FlashAttention-3 avoids HBM roundtrips by tiling computation in SRAM. Multi-Query Attention (MQA) reduces KV-cache by factor of num_heads.',
    date: '05 Oct 2026',
    tags: ['Deep Learning', 'Memory Optimization', 'Hardware FLOPs']
  },
  {
    id: 'note-5',
    title: 'Causal Directed Acyclic Graphs (DAGs) Checklist',
    paperId: 'paper-5',
    paperTitle: 'Data Science Applications.pdf',
    content:
      'Rule 1: Never condition on a collider variable unless controlling for M-bias.\nRule 2: Ensure backdoor criterion is satisfied before claiming causal effect of intervention X on outcome Y.',
    date: '02 Oct 2026',
    tags: ['Causality', 'Statistics', 'Trial Design']
  },
  {
    id: 'note-6',
    title: 'Literature Review Synthesis for Chapter 2',
    paperId: 'paper-1',
    paperTitle: 'Artificial Intelligence in Education.pdf',
    content:
      'Integrate the cognitive load findings with Sweller (1988) and recent 2025-2026 generative AI synthesis frameworks. Highlight how multimodal input reduces verbal fatigue.',
    date: '01 Oct 2026',
    tags: ['Thesis', 'Literature Review', 'Cognitive Load']
  }
];
