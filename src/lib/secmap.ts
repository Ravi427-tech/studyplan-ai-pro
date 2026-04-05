export type SectionData = {
  label: string;
  color: string;
  subjects: string[];
  grades: string[];
  targets: string[];
  week: [string, string[], string[]][];
  goals: string[];
  resources: { sub: string; items: string[] }[];
};

export const SECMAP: Record<string, SectionData> = {
  '10': {
    label: 'Class 10th', color: '#6C8EF5',
    subjects: ['General Kannada','English','Science','Mathematics (Class 10)','Hindi','Social Science'],
    grades: ['A','B+','A-','B','A','B+'], targets: ['A+','A','A','A+','A+','A'],
    week: [['Mon',['Maths','Science'],['p5','p2']],['Tue',['General Kannada','English'],['p1','p2']],['Wed',['Maths','Hindi'],['p5','p3']],['Thu',['Science','SST'],['p2','p3']],['Fri',['Maths','General Kannada'],['p5','p1']],['Sat',['Revision','Mock'],['p7','p3']],['Sun',['Rest','Review'],['p6','p4']]],
    goals: ['Board exam prep','Score 90%+','Complete NCERT','Practice papers'],
    resources: [{sub:'Mathematics',items:['NCERT Maths Std 10','RD Sharma','Khan Academy','CBSE papers']},{sub:'Science',items:['NCERT Science','Lakhmir Singh','BYJU\'S','Lab manual']},{sub:'General Kannada',items:['KA Textbook','Grammar guide','Sahitya notes','Writing practice']}]
  },
  '12-pcmb': {
    label: 'Class 12 PCMB', color: '#6C8EF5',
    subjects: ['Physics','Chemistry','Mathematics','Biology','Kannada','English'],
    grades: ['B+','B','A-','A','A','A-'], targets: ['A','A','A+','A+','A+','A'],
    week: [['Mon',['Physics','Maths'],['p2','p5']],['Tue',['Chemistry','Bio'],['p3','p1']],['Wed',['Maths','Physics'],['p5','p2']],['Thu',['Kannada','English'],['p1','p2']],['Fri',['Chemistry','Maths'],['p3','p5']],['Sat',['Mock','Revision'],['p7','p4']],['Sun',['Doubts','Rest'],['p6','p2']]],
    goals: ['NEET / JEE prep','Board 95%+','Complete PYQs','DPP practice'],
    resources: [{sub:'Physics',items:['HC Verma Vol 1&2','DC Pandey','Physics Wallah','NCERT']},{sub:'Chemistry',items:['NCERT Chemistry','VK Jaiswal','OP Tandon','Unacademy']},{sub:'Biology',items:['NCERT Biology','Trueman\'s','Diagrams','NEET PYQs']}]
  },
  '12-pcmc': {
    label: 'Class 12 PCMC', color: '#6C8EF5',
    subjects: ['Physics','Chemistry','Mathematics','Computer Science','Kannada','English'],
    grades: ['B+','B','A-','B+','A','A-'], targets: ['A','A','A+','A','A+','A'],
    week: [['Mon',['Physics','Maths'],['p2','p5']],['Tue',['Chemistry','CS'],['p3','p4']],['Wed',['Maths','Physics'],['p5','p2']],['Thu',['Kannada','English'],['p1','p2']],['Fri',['CS','Maths'],['p4','p5']],['Sat',['Mock','Revision'],['p7','p3']],['Sun',['Doubts','Rest'],['p6','p2']]],
    goals: ['JEE/CET prep','Board 95%+','Python coding','CS practicals'],
    resources: [{sub:'Physics',items:['HC Verma','DC Pandey','Physics Wallah','NCERT']},{sub:'CS',items:['NCERT CS 12','Python docs','GeeksForGeeks','CS Academy']},{sub:'Chemistry',items:['NCERT Chemistry','VK Jaiswal','Unacademy','Previous papers']}]
  },
  'eng-cse': {
    label: 'Engg CSE', color: '#8B6CF5',
    subjects: ['Data Structures','Algorithms','DBMS','Operating Systems','Computer Networks','Software Engg'],
    grades: ['B+','B','A-','B+','B','B+'], targets: ['A','A','A','A','A-','A'],
    week: [['Mon',['DSA','Algo'],['p4','p5']],['Tue',['DBMS','OS'],['p3','p4']],['Wed',['CN','SE'],['p2','p1']],['Thu',['DSA','DBMS'],['p4','p3']],['Fri',['Algo','CN'],['p5','p2']],['Sat',['Lab','Project'],['p7','p4']],['Sun',['Revision','Rest'],['p6','p3']]],
    goals: ['Campus placement','GATE exam','Build projects','LeetCode 200+'],
    resources: [{sub:'Data Structures',items:['Striver SDE Sheet','GFG DSA','CLRS Book','LeetCode']},{sub:'DBMS',items:['Korth DB Book','GFG DBMS','SQL practice','Gate notes']},{sub:'Networks',items:['Tanenbaum CN','Forouzan','NPTEL','Gate PYQs']}]
  },
  'eng-ise': {
    label: 'Engg ISE', color: '#8B6CF5',
    subjects: ['Data Structures','Web Technologies','Info Security','Cloud Computing','Machine Learning','SW Testing'],
    grades: ['B+','B+','B','A-','B','B+'], targets: ['A','A','A-','A','B+','A'],
    week: [['Mon',['DSA','Web Tech'],['p4','p2']],['Tue',['ML','InfoSec'],['p5','p3']],['Wed',['Cloud','Testing'],['p1','p4']],['Thu',['DSA','Web Tech'],['p4','p2']],['Fri',['ML','Cloud'],['p5','p1']],['Sat',['Project','Lab'],['p7','p3']],['Sun',['Revision','Rest'],['p6','p4']]],
    goals: ['Full stack dev','Cloud cert','ML projects','Placement prep'],
    resources: [{sub:'Web Technologies',items:['MDN Web Docs','React docs','Node docs','freeCodeCamp']},{sub:'Machine Learning',items:['Andrew Ng Coursera','Kaggle','Scikit-learn','Fast.ai']},{sub:'Cloud',items:['AWS Free Tier','GCP docs','Azure Learn','Cloud Guru']}]
  },
  'eng-ece': {
    label: 'Engg ECE', color: '#8B6CF5',
    subjects: ['Signals & Systems','Digital Electronics','VLSI Design','Embedded Systems','Comm Systems','Analog Circuits'],
    grades: ['B','B+','B','A-','B+','B'], targets: ['B+','A','B+','A','A','B+'],
    week: [['Mon',['Signals','Digital'],['p4','p2']],['Tue',['VLSI','Embedded'],['p3','p5']],['Wed',['CommSys','Analog'],['p1','p3']],['Thu',['Signals','VLSI'],['p4','p3']],['Fri',['Embedded','Digital'],['p5','p2']],['Sat',['Lab','Sim'],['p7','p4']],['Sun',['Revision','Rest'],['p6','p1']]],
    goals: ['GATE Electronics','ISRO/DRDO prep','PCB design','Embedded project'],
    resources: [{sub:'Signals & Systems',items:['Oppenheim & Willsky','MIT OCW','NPTEL','Gate Academy']},{sub:'VLSI',items:['Neil Weste','Cadence tools','Virtual labs','Gate notes']},{sub:'Embedded',items:['Arduino starter','STM32 docs','Embedded C book','NPTEL']}]
  },
  'eng-civil': {
    label: 'Engg Civil', color: '#8B6CF5',
    subjects: ['Structural Analysis','Fluid Mechanics','Geotechnical Engg','Transportation','Const Mgmt','Surveying'],
    grades: ['B+','B','B+','B','A-','B+'], targets: ['A','B+','A','A-','A','A'],
    week: [['Mon',['Structural','FM'],['p4','p2']],['Tue',['Geotech','Transport'],['p3','p5']],['Wed',['Const','Survey'],['p1','p4']],['Thu',['Structural','Geotech'],['p4','p3']],['Fri',['FM','Survey'],['p2','p5']],['Sat',['Drawing','Lab'],['p7','p1']],['Sun',['Revision','Rest'],['p6','p3']]],
    goals: ['GATE Civil','PSU recruit','AutoCAD','Site visit'],
    resources: [{sub:'Structural',items:['Bhavikatti Structural','NPTEL IIT','Gate Academy','PYQs']},{sub:'Fluid Mechanics',items:['RK Bansal FM','Modi & Seth','NPTEL IIT M','Gate PYQs']},{sub:'AutoCAD',items:['AutoCAD tutorials','Civil 3D docs','YouTube Civil','Practice drawings']}]
  },
  'eng-mech': {
    label: 'Engg Mechanical', color: '#8B6CF5',
    subjects: ['Engg Mechanics','Thermodynamics','Manufacturing Tech','Machine Design','Heat Transfer','Fluid Machinery'],
    grades: ['B+','B','B+','A-','B','B+'], targets: ['A','B+','A','A','B+','A'],
    week: [['Mon',['EngMech','Thermo'],['p4','p3']],['Tue',['Mfg','MD'],['p2','p5']],['Wed',['HeatT','FM'],['p3','p1']],['Thu',['Thermo','MD'],['p3','p5']],['Fri',['Mfg','HT'],['p2','p3']],['Sat',['CAD Lab','Workshop'],['p7','p4']],['Sun',['Revision','Rest'],['p6','p1']]],
    goals: ['GATE Mechanical','PSU/ISRO','SolidWorks','Internship'],
    resources: [{sub:'Thermodynamics',items:['PK Nag','Cengel & Boles','NPTEL KGP','Gate Academy']},{sub:'Machine Design',items:['VB Bhandari','Shigley\'s MD','NPTEL','Gate notes']},{sub:'CAD',items:['SolidWorks tutorials','CATIA basics','AutoCAD Mech','GrabCAD']}]
  },
  'eng-aids': {
    label: 'Engg AIDS', color: '#8B6CF5',
    subjects: ['Python Programming','Statistics & Prob','Machine Learning','Deep Learning','Big Data Analytics','Data Visualization'],
    grades: ['A','B+','B','B+','B','B+'], targets: ['A+','A','A','A','B+','A'],
    week: [['Mon',['Python','ML'],['p4','p5']],['Tue',['Stats','DL'],['p3','p4']],['Wed',['BigData','Viz'],['p2','p1']],['Thu',['ML','Python'],['p5','p4']],['Fri',['DL','Analytics'],['p4','p2']],['Sat',['Kaggle','Project'],['p7','p5']],['Sun',['Revision','Rest'],['p6','p3']]],
    goals: ['Kaggle competitions','Data science intern','Build ML pipeline','AWS ML cert'],
    resources: [{sub:'Machine Learning',items:['Andrew Ng Coursera','Fast.ai','Scikit-learn','Kaggle learn']},{sub:'Deep Learning',items:['DL Book','PyTorch','TensorFlow','Papers with Code']},{sub:'Big Data',items:['Hadoop docs','Apache Spark','Databricks','BigQuery']}]
  },
  'eng-aiml': {
    label: 'Engg AIML', color: '#8B6CF5',
    subjects: ['Python Programming','Artificial Intelligence','Machine Learning','NLP','Computer Vision','Reinforcement Learning'],
    grades: ['A','B+','B+','B','B','B+'], targets: ['A+','A','A','A-','A-','B+'],
    week: [['Mon',['Python','AI'],['p4','p5']],['Tue',['ML','NLP'],['p5','p3']],['Wed',['CV','RL'],['p2','p4']],['Thu',['AI','ML'],['p5','p4']],['Fri',['NLP','CV'],['p3','p2']],['Sat',['Project','Research'],['p7','p5']],['Sun',['Revision','Rest'],['p6','p3']]],
    goals: ['AI research paper','LLM fine-tuning','HuggingFace cert','ML placement'],
    resources: [{sub:'AI/ML',items:['Andrew Ng Coursera','Fast.ai','DeepLearning.AI','Google ML']},{sub:'NLP',items:['HuggingFace docs','Speech & Lang Proc','NLTK book','spaCy']},{sub:'Computer Vision',items:['CS231n Stanford','OpenCV docs','PyTorch vision','Roboflow']}]
  },
  'job': {
    label: 'Jobs & Interviews', color: '#FB923C',
    subjects: ['Data Structures','Algorithms','System Design','DBMS','OS','HR & Soft Skills'],
    grades: ['B+','B','C','B+','B','A'], targets: ['A','A','B+','A','A-','A+'],
    week: [['Mon',['DSA','LeetCode'],['p3','p2']],['Tue',['System Design','OS'],['p5','p4']],['Wed',['DBMS','Algo'],['p1','p3']],['Thu',['Mock Interview','HR'],['p6','p7']],['Fri',['DSA','System D'],['p3','p5']],['Sat',['Full mock'],['p4']],['Sun',['Review','Network'],['p2','p1']]],
    goals: ['Crack FAANG','GATE exam','Campus placement','Build portfolio'],
    resources: [{sub:'DSA',items:['LeetCode NeetCode 150','Striver SDE','GFG DSA','CLRS']},{sub:'System Design',items:['Grokking SD','Alex Xu Book','Gaurav Sen YT','Interviewbit']},{sub:'Aptitude',items:['IndiaBix','RS Aggarwal','Career Launcher','Testbook']}]
  },
  'trade': {
    label: 'Trading', color: '#F472B6',
    subjects: ['Technical Analysis','Fundamental Analysis','Options & F&O','Risk Management','Trading Psychology','Economics'],
    grades: ['B','C','C','B+','B+','A-'], targets: ['A','B+','B+','A','A','A+'],
    week: [['Mon',['Tech Analysis','Charts'],['p4','p5']],['Tue',['Fundamental','Economics'],['p5','p3']],['Wed',['Options','F&O'],['p6','p4']],['Thu',['Risk Mgmt','Backtest'],['p2','p5']],['Fri',['Paper trade','Review'],['p3','p5']],['Sat',['Journaling','Psychology'],['p7','p4']],['Sun',['Market news','Rest'],['p6','p1']]],
    goals: ['Consistent profits','NSE certification','Trading journal','Risk < 1%/trade'],
    resources: [{sub:'Technical Analysis',items:['Zerodha Varsity','John Murphy TA','TradingView','Investopedia']},{sub:'Options',items:['Sensibull','Option Strategy Guide','NSE Academy','Quantra']},{sub:'Fundamentals',items:['Screener.in','MoneyControl','Annual reports','Prof Sanjay Bakshi']}]
  }
};

export function getKey(section: string, stream: string, dept: string): string {
  if (section === '12') return `12-${stream || 'pcmb'}`;
  if (section === 'eng') return `eng-${dept || 'cse'}`;
  return section;
}

export const GRADE_MAP: Record<string, number> = {
  'A+': 10, A: 9, 'A-': 8, 'B+': 7, B: 6, 'B-': 5, C: 4
};

export const FORMULAS: Record<string, Record<string, { note: string; items: { name: string; eq: string; desc: string }[] }>> = {
  'Mathematics (Class 10)': {
    'Real Numbers & Polynomials': {
      note: 'Fundamental Theorem of Arithmetic: Every composite number = product of primes. Polynomial zeros α, β relate to coefficients.',
      items: [
        { name: 'Euclid\'s Lemma', eq: 'a = bq + r', desc: 'Used to find HCF and verify divisibility.' },
        { name: 'Relationship of Zeros', eq: 'α + β = -b/a, αβ = c/a', desc: 'Sum and Product of zeros in ax² + bx + c.' },
        { name: 'HCF × LCM', eq: 'HCF(a,b) × LCM(a,b) = a × b', desc: 'Only for two positive integers.' }
      ]
    },
    'Linear & Quadratic Equations': {
      note: 'Consistency of linear pairs and nature of quadratic roots.',
      items: [
        { name: 'Consistency Condition', eq: 'a1/a2 ≠ b1/b2', desc: 'Unique solution (Intersecting lines).' },
        { name: 'Quadratic Formula', eq: 'x = (-b ± √D) / 2a', desc: 'Finds roots where D = b² - 4ac.' },
        { name: 'Discriminant Nature', eq: 'D > 0 (Distinct), D = 0 (Equal)', desc: 'Real roots exist.' }
      ]
    },
    'Arithmetic Progressions': {
      note: 'A sequence with a common difference (d).',
      items: [
        { name: 'nth Term', eq: 'an = a + (n-1)d', desc: 'Find position of any term.' },
        { name: 'Sum Formula', eq: 'Sn = n/2 [2a + (n-1)d]', desc: 'Total sum up to n terms.' }
      ]
    },
    'Trigonometry': {
      note: 'Ratios of right-angled triangles and key identities.',
      items: [
        { name: 'Trig Identity 1', eq: 'sin²θ + cos²θ = 1', desc: 'Standard foundational identity.' },
        { name: 'Trig Identity 2', eq: '1 + tan²θ = sec²θ', desc: 'Relates Tan and Sec.' },
        { name: 'Trig Identity 3', eq: '1 + cot²θ = cosec²θ', desc: 'Relates Cot and Cosec.' }
      ]
    },
    'Surface Areas & Volumes': {
      note: 'Formulas for Frustum, Cone, Cylinder, and Sphere.',
      items: [
        { name: 'Cylinder CSA', eq: 'CSA = 2πrh', desc: 'Curved surface area.' },
        { name: 'Cone Volume', eq: 'V = 1/3 πr²h', desc: 'Relationship with cylinder volume.' },
        { name: 'Sphere Area', eq: 'A = 4πr²', desc: 'Total surface area.' }
      ]
    }
  },
  'Science (Physics)': {
    'Light: Reflection & Refraction': {
      note: 'Mirrors use addition in formula, Lenses use subtraction.',
      items: [
        { name: 'Mirror Formula', eq: '1/f = 1/v + 1/u', desc: 'Relates u, v, f for spherical mirrors.' },
        { name: 'Lens Formula', eq: '1/f = 1/v - 1/u', desc: 'Standard formula for thin lenses.' },
        { name: 'Magnification', eq: 'm = -v/u (Mirror), m = v/u (Lens)', desc: 'Image size relative to object.' },
        { name: 'Power', eq: 'P = 1/f (in meters)', desc: 'Unit is Dioptre (D).' }
      ]
    },
    'Electricity': {
      note: 'Flow of charge (Q = It) and heating effect (H = VIt).',
      items: [
        { name: "Ohm's Law", eq: 'V = IR', desc: 'Standard resistance relation.' },
        { name: 'Series Resistance', eq: 'Rs = R1 + R2 + ...', desc: 'Current remains constant.' },
        { name: 'Parallel Resistance', eq: '1/Rp = 1/R1 + 1/R2 + ...', desc: 'Voltage remains constant.' },
        { name: 'Heating (Joule\'s)', eq: 'H = I²Rt', desc: 'Heat produced in a resistor.' }
      ]
    }
  },
  'Science (Chemistry)': {
    'Acids, Bases & Salts': {
      note: 'pH < 7 is acidic, pH > 7 is basic. Neutralization produces salt.',
      items: [
        { name: 'pH Scale', eq: 'pH = -log[H⁺]', desc: 'Measures acidity/alkalinity.' },
        { name: 'Bleaching Powder', eq: 'CaOCl2', desc: 'Calcium Oxychloride formula.' },
        { name: 'Plaster of Paris', eq: 'CaSO4 · ½H2O', desc: 'Hardens on adding water.' }
      ]
    }
  }
};




export const ACHIEVEMENTS = [
  { icon: '🔥', name: '7 Day Streak', desc: 'Study 7 days in a row', unlocked: true },
  { icon: '⚡', name: 'Speed Learner', desc: 'Complete 5 chapters in a day', unlocked: true },
  { icon: '🏆', name: 'Top Scorer', desc: 'Score 90%+ on a mock test', unlocked: true },
  { icon: '📚', name: 'Bookworm', desc: 'Log 50+ study hours', unlocked: true },
  { icon: '💎', name: '30 Day Streak', desc: 'Study 30 days in a row', unlocked: false },
  { icon: '🚀', name: 'Rocket Learner', desc: 'Complete 100 chapters', unlocked: false },
  { icon: '🎯', name: 'Perfectionist', desc: 'Score 100% on any quiz', unlocked: false },
  { icon: '🌟', name: 'All-rounder', desc: 'Achieve A+ in all subjects', unlocked: false },
];

export const LEADERBOARD = [
  { name: 'Ravi C.', hrs: 48, score: 94, color: '#6C8EF5' },
  { name: 'Priya M.', hrs: 44, score: 91, color: '#F472B6' },
  { name: 'Arjun K.', hrs: 40, score: 88, color: '#4ADE80' },
  { name: 'Sneha R.', hrs: 37, score: 86, color: '#FB923C' },
  { name: 'Dev P.', hrs: 32, score: 84, color: '#2DD4BF' },
  { name: 'Kavya B.', hrs: 28, score: 81, color: '#FCD34D' },
];

export const YT_RESOURCES: Record<string, { id: string; title: string; channel: string }[]> = {
  'Mathematics (Class 10)': [
    { id: 's7Y976auPwE', title: 'Real Numbers: One Shot', channel: 'Physics Wallah Foundation' },
    { id: 'seRhjRbSmR8', title: 'Polynomials: One Shot', channel: 'Physics Wallah Foundation' },
    { id: 'vA6L3V9-fO8', title: 'Linear Equations: Complete Class', channel: 'Vedantu' },
    { id: '_e7GSV2ArDk', title: 'Quadratic Equations: Masterclass', channel: 'Physics Wallah Foundation' },
    { id: 'vA6L3V9-fO8', title: 'Arithmetic Progressions', channel: 'Khan Academy' },
    { id: 'vA6L3V9-fO8', title: 'Triangles Full Geometry', channel: 'Vedantu' },
    { id: 'vA6L3V9-fO8', title: 'Coordinate Geometry', channel: 'Physics Wallah' },
    { id: 'vA6L3V9-fO8', title: 'Trigonometry One Shot', channel: 'Unacademy' },
    { id: 'vA6L3V9-fO8', title: 'Circles & Tangents', channel: 'Khan Academy' },
    { id: 'CFjBkPjn4jE', title: 'Statistics & Probability', channel: 'Physics Wallah Foundation' }
  ],
  'Science': [
    { id: 'OSy70X0Cn20', title: 'Chemical Reactions and Equations', channel: 'Physics Wallah Foundation' },
    { id: '8_eM2qAun6Q', title: 'Acids, Bases & Salts', channel: 'Khan Academy' },
    { id: '8_eM2qAun6Q', title: 'Metals & Non-metals', channel: 'Unacademy' },
    { id: '7wpgxDRj9Uo', title: 'Life Processes (Full Biology)', channel: 'Physics Wallah Foundation' },
    { id: '8_eM2qAun6Q', title: 'Control & Coordination', channel: 'Vedantu' },
    { id: 'hUcRUM5ZEUU', title: 'Light: Reflection & Refraction', channel: 'Physics Wallah Foundation' },
    { id: '8_eM2qAun6Q', title: 'Human Eye & Colourful World', channel: 'Unacademy' },
    { id: 'UdYex_NdMTM', title: 'Electricity Masterclass', channel: 'Physics Wallah Foundation' },
    { id: 'l-0hWWG66uU', title: 'Magnetic Effects of Current', channel: 'Physics Wallah Foundation' },
    { id: 'adt0f5z4Z24', title: 'Carbon and its Compounds', channel: 'Physics Wallah Foundation' }
  ],
  'English': [
    { id: 'w5g9ntJqZys', title: 'First Flight Full Revision', channel: 'Dear Sir' },
    { id: 'DGSdRZrpZ-U', title: 'All Poems One Shot', channel: 'Dear Sir' },
    { id: '6ocMXZXJpxo', title: 'All Chapters Summary', channel: 'Dear Sir' },
    { id: 'HEQEHR0XPRU', title: 'Poetry Masterclass', channel: 'Dear Sir' },
    { id: 'oQSkbgBf6oo', title: 'Diary of Anne Frank', channel: 'Dear Sir' },
    { id: 'w5g9ntJqZys', title: 'English Grammar Full', channel: 'Dear Sir' },
    { id: 'DGSdRZrpZ-U', title: 'Footprints Without Feet', channel: 'Dear Sir' },
    { id: '6ocMXZXJpxo', title: 'Literature Masterclass', channel: 'Dear Sir' },
    { id: 'HEQEHR0XPRU', title: 'Writing Skills One Shot', channel: 'Dear Sir' },
    { id: 'oQSkbgBf6oo', title: 'Nelson Mandela Lesson', channel: 'Dear Sir' }
  ],
  'Social Science': [
    { id: 'ySNeX4av-uA', title: 'Rise of Nationalism in Europe', channel: 'Physics Wallah Foundation' },
    { id: 't3DuTsx8Rmw', title: 'Nationalism in India', channel: 'Physics Wallah Foundation' },
    { id: 'IcMXEEShKzs', title: 'Making of a Global World', channel: 'Physics Wallah Foundation' },
    { id: 'BPJt9YCzXtQ', title: 'Age of Industrialization', channel: 'Physics Wallah Foundation' },
    { id: 'FwXyG8lFtss', title: 'Resources & Development', channel: 'Physics Wallah Foundation' },
    { id: '8bb2Vhxsxpc', title: 'Forest & Wildlife Resources', channel: 'Physics Wallah Foundation' },
    { id: 'r8-kbI5wAWY', title: 'Water Resources', channel: 'Physics Wallah Foundation' },
    { id: 'ojMWfRRIF-E', title: 'Agriculture', channel: 'Physics Wallah Foundation' },
    { id: '9helgrVM93Q', title: 'Power Sharing', channel: 'Physics Wallah Foundation' },
    { id: 'B_Gs1wyg6zw', title: 'Federalism', channel: 'Physics Wallah Foundation' }
  ],

  'General Kannada': [
    { id: 'RJmycHtaD_Y', title: 'Sankalpa Geetha', channel: 'Kannada School' },
    { id: 'cMtg12qijoA', title: 'Agni Bhuti Vayu Bhuti', channel: 'Kannada School' },
    { id: 'P48CGqRLNeU', title: 'Nanu Prasa Bitta Kathe', channel: 'Kannada School' },
    { id: '9NcT8MgC4g0', title: 'Kannada Grammar (Vyakrana)', channel: 'Kannada School' },
    { id: 'H_j8G5_9oY7', title: 'Yuddha Chapter', channel: 'Kannada School' },
    { id: 'H1M8R4P1E2w', title: 'Halu-Jenu Poem', channel: 'Kannada School' },
    { id: 'S8k5z7P2E8w', title: 'Shabari (Module)', channel: 'Kannada School' },
    { id: 'L8k5z7P2E8w', title: 'London Nagaradalli', channel: 'Kannada School' },
    { id: 'B8k5z7P2E8w', title: 'Bhagya Shilpigalu', channel: 'Kannada School' },
    { id: 'E8k5z7P2E8w', title: 'Edege Bidda Akshara', channel: 'Kannada School' }
  ],
  'Hindi': [
    { id: 'KSxbMRPQoTk', title: 'Surdas Ke Pad', channel: 'Magnet Brains' },
    { id: '799U-T_U_2U', title: 'Ram Lakshman Samvad', channel: 'Magnet Brains' },
    { id: 'LGJ5KSl2AZg', title: 'Aatmkathya', channel: 'Magnet Brains' },
    { id: '007THsS8CHQ', title: 'Dev Ke Savaiya', channel: 'Magnet Brains' },
    { id: 'Kls_QhI1R78', title: 'Utsah (Poem)', channel: 'Magnet Brains' },
    { id: 'Hn5iZ9zE_xM', title: 'At Nahi Rahi Hai', channel: 'Magnet Brains' },
    { id: '8y6Y0j7vV_A', title: 'Yah Danturit Muskan', channel: 'Magnet Brains' },
    { id: 'N339q06Bv1s', title: 'Fasal (Explanation)', channel: 'Magnet Brains' },
    { id: 'v6c8yW_U8_U', title: 'Chaya Mat Choona', channel: 'Magnet Brains' },
    { id: 'Voauq6uIhwo', title: 'Kanyadaan', channel: 'Magnet Brains' }
  ]
};






export const TRADECOURSES = [
  { num: 'Module 1', title: 'Introduction to Stock Markets', desc: 'Markets, SEBI regulations, basic terminology.', lessons: ['What is stock market?', 'BSE & NSE overview', 'Types of securities', 'SEBI & regulations', 'Demat account setup'], done: 5, total: 5 },
  { num: 'Module 2', title: 'Technical Analysis Basics', desc: 'Candlestick patterns, support & resistance.', lessons: ['Chart types & timeframes', 'Candlestick patterns', 'Support & resistance', 'Trend lines', 'Volume analysis'], done: 3, total: 5 },
  { num: 'Module 3', title: 'Indicators & Oscillators', desc: 'RSI, MACD, Bollinger Bands, Moving Averages.', lessons: ['Moving averages', 'RSI & Stochastic', 'MACD & Signal', 'Bollinger Bands', 'Combining indicators'], done: 1, total: 5 },
  { num: 'Module 4', title: 'Fundamental Analysis', desc: 'P/E ratio, EPS, balance sheet analysis.', lessons: ['Reading balance sheet', 'P/E & EPS ratios', 'Revenue & profit margins', 'Debt analysis', 'Sector comparison'], done: 0, total: 5 },
];
export const CHAPTERS: Record<string, string[]> = {
  'Mathematics (Class 10)': [
    'Real Numbers', 'Polynomials', 'Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 
    'Triangles', 'Coordinate Geometry', 'Trigonometry', 'Circles & Tangents', 'Statistics & Probability'
  ],
  'Science': [
    'Chemical Reactions', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Life Processes', 'Control & Coordination', 
    'Light: Reflection', 'Human Eye & World', 'Electricity', 'Magnetic Effects', 'Natural Resources'
  ],
  'English': [
    'A Letter to God', 'Nelson Mandela', 'Stories of Flying', 'Diary of Anne Frank', 'Glimpses of India', 
    'Madam Rides the Bus', 'The Sermon at Benares', 'Dust of Snow (Poem)', 'Fire and Ice (Poem)', 'Grammar: Tenses & Modals'
  ],
  'Social Science': [
    'Rise of Nationalism in Europe', 'Nationalism in India', 'Making of a Global World', 'Age of Industrialization', 'Resources & Development', 
    'Forest & Wildlife Resources', 'Water Resources', 'Agriculture', 'Power Sharing', 'Federalism'
  ],
  'General Kannada': [
    'ಶಬರಿ (Shabari)', 'ಲಂಡನ್ ನಗರ (London)', 'ಭಾಗ್ಯದ ಬಳೆಗಾರ', 'ಎದೆಯೊಳಗೆ ದೀಪ', 'ಹಲಗಲಿ ಬೇಡರು', 
    'ಯುದ್ಧ (War)', 'ವ್ಯಾಕರಣ (Grammar)', 'ಪತ್ರ ಲೇಖನ (Letter)', 'ಗಾದೆ ಮಾತುಗಳು', 'ಪ್ರಬಂಧ (Essay)'
  ],
  'Hindi': [
    'मातृभूमि', 'कश्मीरी सेब', 'गिल्लू', 'अभिनव मनुष्य', 'सोशल मीडिया', 
    'ईमानदारों के सम्मेलन', 'मजदूरी और प्रेम', 'व्याकरण (Grammar)', 'पत्र लेखन', 'निबंध (Essay)'
  ]
};

