/**
 * DURGA PUBLIC SCHOOL — MASTER ADMINISTRATION SYSTEM CONTROLLER
 * Full Admissions CRM, Live Site CMS, Gallery Manager, House Championship & Backups
 * Zero external dependencies • 100% Client-Side Reactive Operations
 */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEYS = {
    AUTH: 'dps_admin_session',
    LEADS: 'dps_admissions_leads',
    CONFIG: 'dps_site_config',
    HOUSES: 'dps_house_points',
    GALLERY: 'dps_gallery_catalog',
    CIRCULARS: 'dps_circulars',
    TOPPERS: 'dps_toppers',
    CUTTINGS: 'dps_news_cuttings',
    TICKER: 'dps_ticker_items',
    FACULTY: 'dps_faculty',
    CONTACTS: 'dps_contact_messages',
    AUDIT: 'dps_audit_logs'
  };

  // Default Initial Data
  const DEFAULT_LEADS = [
    {
      id: 'DPS-2026-8491',
      studentName: 'Aarav Sharma',
      grade: 'Class 11 Science',
      parentName: 'Rajesh Sharma',
      phone: '+91 98290 12345',
      email: 'rajesh.sharma@gmail.com',
      address: 'Loharu Road, Pilani',
      message: 'Inquiring about Senior Science (PCM stream) and integrated board coaching.',
      date: '28 Oct 2026, 04:30 PM',
      timestamp: 1793220000000,
      status: 'New',
      source: 'Admissions Page',
      notes: ['Inquired about PCM stream and coaching tie-up. Requested fee breakdown.']
    },
    {
      id: 'DPS-2026-8342',
      studentName: 'Priya Choudhary',
      grade: 'Class 9',
      parentName: 'Vikas Choudhary',
      phone: '+91 94142 67890',
      email: 'vikas.choudhary@yahoo.com',
      address: 'Nayagaon, Pilani',
      message: 'Transfer from central school. Looking for admission in secondary board batch.',
      date: '27 Oct 2026, 11:15 AM',
      timestamp: 1793130000000,
      status: 'Interview Scheduled',
      source: 'Admissions Page',
      notes: ['Entrance aptitude test cleared with 88%. Principal interview scheduled for Saturday 11 AM.']
    },
    {
      id: 'DPS-2026-8210',
      studentName: 'Reyansh Shekhawat',
      grade: 'Nursery',
      parentName: 'Meenakshi Shekhawat',
      phone: '+91 97840 55443',
      email: 'meenakshi.s@outlook.com',
      address: 'Surajgarh Road, Pilani',
      message: 'Early childhood foundational admissions inquiry. Interested in day-care activities.',
      date: '25 Oct 2026, 02:45 PM',
      timestamp: 1792950000000,
      status: 'Admitted',
      source: 'Homepage Enquiry',
      notes: ['Verification complete. Documents approved and admission fee deposited for 2026–27 session.']
    },
    {
      id: 'DPS-2026-8105',
      studentName: 'Ananya Verma',
      grade: 'Class 6',
      parentName: 'Dr. Sunil Verma',
      phone: '+91 98281 99887',
      email: 'drsunilverma@gmail.com',
      address: 'BITS Campus Zone, Pilani',
      message: 'Looking for holistic learning, arts integration, and school transport from BITS sector.',
      date: '24 Oct 2026, 09:20 AM',
      timestamp: 1792860000000,
      status: 'Contacted',
      source: 'Admissions Page',
      notes: ['Tele-counseling conducted. Sent school transport route and fee slip via WhatsApp.']
    },
    {
      id: 'DPS-2026-8054',
      studentName: 'Kabir Rathore',
      grade: 'Class 11 Commerce',
      parentName: 'Vikram Rathore',
      phone: '+91 94133 44556',
      email: 'vikram.rathore@corp.in',
      address: 'Vidya Vihar, Pilani',
      message: 'Commerce with Applied Mathematics & Informatics Practices sought.',
      date: '22 Oct 2026, 05:10 PM',
      timestamp: 1792680000000,
      status: 'New',
      source: 'Contact Us Form',
      notes: ['New lead from contact inquiry form.']
    },
    {
      id: 'DPS-2026-7988',
      studentName: 'Diya Saini',
      grade: 'Class 1',
      parentName: 'Ramesh Saini',
      phone: '+91 96102 33445',
      email: 'ramesh.saini@gmail.com',
      address: 'Rajgarh Road, Pilani',
      message: 'Admission into Class I for upcoming academic session.',
      date: '20 Oct 2026, 01:00 PM',
      timestamp: 1792500000000,
      status: 'Contacted',
      source: 'Admissions Page',
      notes: ['Parents visited school campus on Monday. Prospectus handed over.']
    }
  ];

  const DEFAULT_CONFIG = {
    schoolName: 'Durga Public School',
    regName: 'Durga Devi Public School',
    affiliationNo: 'RBSE / State Board',
    schoolCode: '10764',
    sessionYear: '2026–2027',
    admissionStatus: 'Open for Nursery to Class XII',
    admissionLastDate: '31st March 2026',
    contact: {
      phonePrimary: '+91 94140 37571',
      phoneSecondary: '+91 94140 37572',
      email: 'dpspilani@gmail.com',
      whatsapp: '+91 94140 37571',
      timingsSummer: '8:00 AM – 2:00 PM',
      timingsWinter: '8:30 AM – 2:30 PM',
      address: 'Loharu Road, Near Ganesh Mandir, Pilani, Rajasthan 333031'
    },
    metrics: {
      legacyYears: '20+',
      scholarsCount: '1000+',
      boardPass: '100%',
      ratio: '15:1'
    },
    noticeBanner: {
      enabled: false,
      message: 'Admissions Open for Session 2026–27 (Nursery to Class XII) | Merit Scholarships Available | Helpline: +91 94140 37571',
      link: 'admissions.html',
      theme: 'theme-wine',
      marquee: false
    },
    principal: {
      name: 'Mrs. Punita Sharma',
      qualifications: 'M.A., M.Ed., Principal & Head of Institution',
      message: 'Education at Durga Public School is a sacred journey where rigorous scholarship, physical fortitude, and uncompromised civic ethics converge to mold leaders of tomorrow.'
    }
  };

  const DEFAULT_HOUSES = {
    gandhi: {
      name: 'Gandhi House',
      motto: 'Truth, Service & Humility',
      color: '#059669',
      colorName: 'Emerald Green',
      athletics: 120,
      academics: 135,
      cultural: 110,
      discipline: 100,
      total: 465,
      captain: 'Aryan Sharma (XII Sci)',
      viceCaptain: 'Sneha Rao (XI Hum)'
    },
    vivekanand: {
      name: 'Vivekanand House',
      motto: 'Courage, Intellect & Awakening',
      color: '#D97706',
      colorName: 'Saffron Gold',
      athletics: 140,
      academics: 125,
      cultural: 115,
      discipline: 100,
      total: 480,
      captain: 'Yashwardhan Singh (XII Sci)',
      viceCaptain: 'Kavya Pareek (XI Com)'
    },
    raman: {
      name: 'Raman House',
      motto: 'Scientific Inquiry & Innovation',
      color: '#7D1D3F',
      colorName: 'Royal Wine',
      athletics: 105,
      academics: 145,
      cultural: 100,
      discipline: 100,
      total: 450,
      captain: 'Devendra Verma (XII Sci)',
      viceCaptain: 'Ananya Saini (XI Sci)'
    },
    bose: {
      name: 'Bose House',
      motto: 'Valor, Patriotism & Action',
      color: '#1D4ED8',
      colorName: 'Navy Blue',
      athletics: 130,
      academics: 130,
      cultural: 115,
      discipline: 100,
      total: 475,
      captain: 'Harsh Shekhawat (XII Com)',
      viceCaptain: 'Pooja Choudhary (XI Sci)'
    }
  };

  const DEFAULT_CIRCULARS = [
    {
      id: 'CIRC-2026-01',
      title: 'Admissions Schedule & Entrance Aptitude Assessment for Academic Session 2026–27',
      category: 'Admissions',
      date: '20 Oct 2026',
      fileUrl: 'admissions.html',
      status: 'Active'
    },
    {
      id: 'CIRC-2026-02',
      title: 'RBSE Secondary & Senior Secondary Practical Examination Guidelines',
      category: 'Examinations',
      date: '15 Oct 2026',
      fileUrl: '#',
      status: 'Active'
    },
    {
      id: 'CIRC-2026-03',
      title: 'Annual Inter-House Athletics Meet & Sprint Championship Schedule',
      category: 'Sports',
      date: '10 Oct 2026',
      fileUrl: 'life.html#houses',
      status: 'Active'
    },
    {
      id: 'CIRC-2026-04',
      title: 'Winter School Uniform & Timings Revision (Effective November 1st)',
      category: 'General',
      date: '05 Oct 2026',
      fileUrl: 'facilities.html',
      status: 'Active'
    }
  ];


  const DEFAULT_TOPPERS = [
    {
      id: 'TOP-2026-01',
      name: 'Pooja Sharma',
      exam: 'RBSE Class XII (Science Stream)',
      percentage: '98.20%',
      rank: 'District 1st Rank',
      year: '2025–26',
      image: 'assets/photos/board-merit-toppers.jpg',
      accolades: 'State Merit List Holder. Perfect 100/100 score in Physics & Mathematics. State Government Gargi Award recipient.',
      status: 'Active'
    },
    {
      id: 'TOP-2026-02',
      name: 'Rahul Verma',
      exam: 'RBSE Class XII (Commerce Stream)',
      percentage: '97.60%',
      rank: 'Pilani Sub-Division Merit',
      year: '2025–26',
      image: 'assets/photos/annual-graduation-merit.jpg',
      accolades: '100/100 in Accountancy and Business Studies. District Gold Medalist for Academic Excellence.',
      status: 'Active'
    },
    {
      id: 'TOP-2026-03',
      name: 'Anjali Shekhawat',
      exam: 'RBSE Class X (Secondary Board)',
      percentage: '98.60%',
      rank: 'Jhunjhunu District Top 3',
      year: '2025–26',
      image: 'assets/photos/board-achiever-parents-tribute.jpg',
      accolades: 'State Board Merit Certificate. Scored 100 in Mathematics & Science. Awarded School Academic Scholarship.',
      status: 'Active'
    },
    {
      id: 'TOP-2026-04',
      name: 'Vikas Saini',
      exam: 'RBSE Class XII (Humanities / Arts)',
      percentage: '96.80%',
      rank: 'School Stream Topper',
      year: '2025–26',
      image: 'assets/photos/board-merit-toppers.jpg',
      accolades: 'State Distinction Honors in History, Political Science & Hindi Literature.',
      status: 'Active'
    }
  ];

  const DEFAULT_CUTTINGS = [
  {
    "id": "cutting-01",
    "title": "Annual Board Merit & Academic Honor Roll",
    "newspaper": "Dainik Bhaskar",
    "date": "12 Dec",
    "image": "assets/photos/news-cuttings/cutting-01.jpg",
    "synopsis": "Annual Board Merit & Academic Honor Roll - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-02",
    "title": "District Olympiad & Merit Scholarship Achievers",
    "newspaper": "Rajasthan Patrika",
    "date": "12 Dec",
    "image": "assets/photos/news-cuttings/cutting-02.jpg",
    "synopsis": "District Olympiad & Merit Scholarship Achievers - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-03",
    "title": "Excellence in Science & Mathematics Distinctions",
    "newspaper": "Dainik Bhaskar",
    "date": "12 Dec",
    "image": "assets/photos/news-cuttings/cutting-03.jpg",
    "synopsis": "Excellence in Science & Mathematics Distinctions - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-04",
    "title": "Haryalo Rajasthan Mega Tree Plantation Drive",
    "newspaper": "Rajasthan Patrika",
    "date": "20 Jul",
    "image": "assets/photos/news-cuttings/cutting-04.jpg",
    "synopsis": "Haryalo Rajasthan Mega Tree Plantation Drive - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-05",
    "title": "Inter-School Cultural & Debate Championship Victory",
    "newspaper": "Dainik Navjyoti",
    "date": "State Edition",
    "image": "assets/photos/news-cuttings/cutting-05.jpg",
    "synopsis": "Inter-School Cultural & Debate Championship Victory - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-06",
    "title": "Pilani Students Shine in RBSE Secondary Merit List",
    "newspaper": "Rajasthan Patrika",
    "date": "District Special",
    "image": "assets/photos/news-cuttings/cutting-06.jpg",
    "synopsis": "Pilani Students Shine in RBSE Secondary Merit List - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-07",
    "title": "Grand Annual Cultural Fest & Folk Dance Honors",
    "newspaper": "Dainik Bhaskar",
    "date": "Shekhawati Special",
    "image": "assets/photos/news-cuttings/cutting-07.jpg",
    "synopsis": "Grand Annual Cultural Fest & Folk Dance Honors - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-08",
    "title": "Durga Public School Achieves 100% Board Pass Result",
    "newspaper": "Rajasthan Patrika",
    "date": "Education Focus",
    "image": "assets/photos/news-cuttings/cutting-08.jpg",
    "synopsis": "Durga Public School Achieves 100% Board Pass Result - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-09",
    "title": "District Level Taekwondo & Athletics Gold Medals",
    "newspaper": "Dainik Bhaskar",
    "date": "Sports Desk",
    "image": "assets/photos/news-cuttings/cutting-09.jpg",
    "synopsis": "District Level Taekwondo & Athletics Gold Medals - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-10",
    "title": "National Science Day Exhibition Acclaimed by Scientists",
    "newspaper": "Rajasthan Patrika",
    "date": "Campus Beat",
    "image": "assets/photos/news-cuttings/cutting-10.jpg",
    "synopsis": "National Science Day Exhibition Acclaimed by Scientists - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-11",
    "title": "Moral Values & Sanskrit Invocations Assembly Highlighted",
    "newspaper": "Dainik Jagran",
    "date": "Youth Feature",
    "image": "assets/photos/news-cuttings/cutting-11.jpg",
    "synopsis": "Moral Values & Sanskrit Invocations Assembly Highlighted - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-12",
    "title": "State Level Merit Scholars Felicitated by Leadership",
    "newspaper": "Dainik Bhaskar",
    "date": "City News",
    "image": "assets/photos/news-cuttings/cutting-12.jpg",
    "synopsis": "State Level Merit Scholars Felicitated by Leadership - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-13",
    "title": "Durga Devi Public School Tops District Merit Chart",
    "newspaper": "Rajasthan Patrika",
    "date": "Headline Feature",
    "image": "assets/photos/news-cuttings/cutting-13.jpg",
    "synopsis": "Durga Devi Public School Tops District Merit Chart - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-14",
    "title": "Comprehensive Academic & Cultural Achievements Feature",
    "newspaper": "Dainik Bhaskar",
    "date": "Annual Special",
    "image": "assets/photos/news-cuttings/cutting-14.jpg",
    "synopsis": "Comprehensive Academic & Cultural Achievements Feature - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-15",
    "title": "RBSE Senior Secondary Science Stream Outstanding Grades",
    "newspaper": "Rajasthan Patrika",
    "date": "Results Special",
    "image": "assets/photos/news-cuttings/cutting-15.jpg",
    "synopsis": "RBSE Senior Secondary Science Stream Outstanding Grades - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-16",
    "title": "Commerce & Arts Scholars Secure State Honors",
    "newspaper": "Dainik Bhaskar",
    "date": "Merit Page",
    "image": "assets/photos/news-cuttings/cutting-16.jpg",
    "synopsis": "Commerce & Arts Scholars Secure State Honors - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-17",
    "title": "Young Scientists Win Innovation Challenge at State Level",
    "newspaper": "Rajasthan Patrika",
    "date": "Science Corner",
    "image": "assets/photos/news-cuttings/cutting-17.jpg",
    "synopsis": "Young Scientists Win Innovation Challenge at State Level - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-18",
    "title": "Inter-School Hindi Poetry Recitation Championship",
    "newspaper": "Dainik Bhaskar",
    "date": "Literature Club",
    "image": "assets/photos/news-cuttings/cutting-18.jpg",
    "synopsis": "Inter-School Hindi Poetry Recitation Championship - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-19",
    "title": "Special Supplement: Two Decades of Educational Excellence",
    "newspaper": "Rajasthan Patrika",
    "date": "Grand Feature",
    "image": "assets/photos/news-cuttings/cutting-19.jpg",
    "synopsis": "Special Supplement: Two Decades of Educational Excellence - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-20",
    "title": "Shekhawati Regional Press Highlights DPS Academic Record",
    "newspaper": "Dainik Bhaskar",
    "date": "Education Times",
    "image": "assets/photos/news-cuttings/cutting-20.jpg",
    "synopsis": "Shekhawati Regional Press Highlights DPS Academic Record - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-21",
    "title": "Leadership Interview: Building Confident Global Citizens",
    "newspaper": "Rajasthan Patrika",
    "date": "Editorial Feature",
    "image": "assets/photos/news-cuttings/cutting-21.jpg",
    "synopsis": "Leadership Interview: Building Confident Global Citizens - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-22",
    "title": "Children's Day Celebrations & Talent Show at DPS",
    "newspaper": "Dainik Bhaskar",
    "date": "16 Nov",
    "image": "assets/photos/news-cuttings/cutting-22.jpg",
    "synopsis": "Children's Day Celebrations & Talent Show at DPS - Durga Public School, Pilani archival media record."
  },
  {
    "id": "cutting-23",
    "title": "Inter-House Sports Meet & Athletic Championship",
    "newspaper": "Rajasthan Patrika",
    "date": "16 Nov",
    "image": "assets/photos/news-cuttings/cutting-23.jpg",
    "synopsis": "Inter-House Sports Meet & Athletic Championship - Durga Public School, Pilani archival media record."
  }
];

  const DEFAULT_FACULTY = [
    {
      id: 'FAC-01',
      name: 'Mrs. Punita Sharma',
      designation: 'Principal & Head of Institution',
      dept: 'Administration & Physics',
      qual: 'M.Sc. (Physics), M.Ed., Ph.D.',
      exp: '24 Years'
    },
    {
      id: 'FAC-02',
      name: 'Mrs. Sunita Verma',
      designation: 'Vice Principal & PGT Chemistry',
      dept: 'Science',
      qual: 'M.Sc. (Chemistry), B.Ed., NET',
      exp: '18 Years'
    },
    {
      id: 'FAC-03',
      name: 'Mrs. Maya Verma', designation: 'Academic Coordinator & Senior Faculty',
      dept: 'Mathematics',
      qual: 'M.Sc. (Applied Maths), B.Ed.',
      exp: '16 Years'
    },
    {
      id: 'FAC-04',
      name: 'Mr. Arvind Shekhawat',
      designation: 'PGT Commerce & Accountancy',
      dept: 'Commerce',
      qual: 'M.Com, M.Phil, B.Ed.',
      exp: '15 Years'
    },
    {
      id: 'FAC-05',
      name: 'Mrs. Rekha Choudhary',
      designation: 'TGT Science & Biology Lab Incharge',
      dept: 'Science',
      qual: 'M.Sc. (Zoology), B.Ed.',
      exp: '12 Years'
    },
    {
      id: 'FAC-06',
      name: 'Mr. Vikramaditya Singh',
      designation: 'Director of Physical Education & Sports',
      dept: 'Athletics & Physical Ed',
      qual: 'M.P.Ed., NIS Certified Athletics Coach',
      exp: '14 Years'
    }
  ];

  const DEFAULT_CONTACTS = [
    {
      id: 'MSG-2026-01',
      name: 'Pooja Agarwal',
      role: 'Prospective Parent',
      phone: '+91 98291 55667',
      email: 'pooja.agarwal@gmail.com',
      message: 'We are moving from Gurgaon to Pilani in December. Can our son join Class 7 mid-term?',
      date: '28 Oct 2026, 02:15 PM',
      status: 'Unread'
    },
    {
      id: 'MSG-2026-02',
      name: 'Capt. R. S. Rathore',
      role: 'Alumnus',
      phone: '+91 94140 22334',
      email: 'capt.rathore@indianarmy.mil',
      message: 'Greetings to Principal sir. Would love to deliver a motivational talk on Armed Forces career for Class XI & XII students.',
      date: '26 Oct 2026, 06:40 PM',
      status: 'Replied'
    }
  ];

  const RAW_GALLERY = [{"id": 1, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Portals & Facades", "title": "Grand Entrance Sandstone Portal", "desc": "Archival photograph documenting the grand sandstone entrance portal on Loharu Road.", "src": "assets/photos/scrapbook/campus/campus-001.jpg", "featured": true}, {"id": 2, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Pillared Colonnades", "title": "Sandstone Colonnade Architecture", "desc": "Signature Rajasthani sandstone pillars and arched verandas framing the central academic quadrangle.", "src": "assets/photos/scrapbook/campus/campus-002.jpg", "featured": true}, {"id": 3, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Campus Greens & Lawns", "title": "Central Courtyard & Assembly Greens", "desc": "Lush green lawns and landscaped assembly courtyard inside the main institutional quadrangle.", "src": "assets/photos/scrapbook/campus/campus-003.jpg", "featured": true}, {"id": 4, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Portals & Facades", "title": "Main Institutional Building Facade", "desc": "Front architectural facade of Durga Devi Public School showing multi-story academic wings.", "src": "assets/photos/scrapbook/campus/campus-004.jpeg", "featured": true}, {"id": 5, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Portals & Facades", "title": "Academic Complex Exterior Facade", "desc": "Comprehensive wide-angle view of the academic block and entrance walkway.", "src": "assets/photos/client/campus/campus-building-exterior-1.jpg", "featured": true}, {"id": 6, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Pillared Colonnades", "title": "Architectural Colonnades & Arches", "desc": "Detailed perspective of the stone pillars and shaded breezeways.", "src": "assets/photos/client/campus/campus-facade-pillars-1.jpg", "featured": true}, {"id": 7, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Portals & Facades", "title": "Campus Gateway & Boundary Portal", "desc": "The secure main gateway welcoming students, faculty, and visitors to the campus.", "src": "assets/photos/client/campus/campus-gate-entrance-1.jpg", "featured": false}, {"id": 8, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Portals & Facades", "title": "Administrative Wing & Reception Portal", "desc": "The executive governance and administrative reception complex.", "src": "assets/photos/campus-admin-wing.jpg", "featured": false}, {"id": 9, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Portals & Facades", "title": "Heritage Sandstone Main Facade", "desc": "Architectural elevation of the primary institution building with ornamental stone jali work.", "src": "assets/photos/campus-facade-main.jpg", "featured": false}, {"id": 10, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Portals & Facades", "title": "Grand Sandstone Gateway Arch", "desc": "The monumental arched entrance gate establishing the institutional perimeter.", "src": "assets/photos/campus-main-portal.jpg", "featured": false}, {"id": 11, "cat": "campus", "catLabel": "Campus Architecture", "subcat": "Campus Greens & Lawns", "title": "Central Assembly Quadrangle", "desc": "The expansive open-air paved quadrangle where morning prayer assemblies and celebrations take place.", "src": "assets/photos/campus-quadrangle-assembly.jpg", "featured": false}, {"id": 12, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 01", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-003.jpeg", "featured": false}, {"id": 13, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 02", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-004.jpeg", "featured": false}, {"id": 14, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 03", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-005.jpeg", "featured": false}, {"id": 15, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 04", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-006.jpeg", "featured": false}, {"id": 16, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 05", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-007.jpeg", "featured": false}, {"id": 17, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 06", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-008.jpeg", "featured": false}, {"id": 18, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 07", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-009.jpeg", "featured": false}, {"id": 19, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 08", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-010.jpeg", "featured": false}, {"id": 20, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 09", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-011.jpeg", "featured": false}, {"id": 21, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 10", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-012.jpeg", "featured": false}, {"id": 22, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 11", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-013.jpeg", "featured": false}, {"id": 23, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 12", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-014.jpeg", "featured": false}, {"id": 24, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 13", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-015.jpeg", "featured": false}, {"id": 25, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 14", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-016.jpeg", "featured": false}, {"id": 26, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 15", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-017.jpeg", "featured": false}, {"id": 27, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 16", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-018.jpeg", "featured": false}, {"id": 28, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 17", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-019.jpeg", "featured": false}, {"id": 29, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 18", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-020.jpeg", "featured": false}, {"id": 30, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 19", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-021.jpeg", "featured": false}, {"id": 31, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 20", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-022.jpeg", "featured": false}, {"id": 32, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 21", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-023.jpeg", "featured": false}, {"id": 33, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 22", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-024.jpeg", "featured": false}, {"id": 34, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 23", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-025.jpeg", "featured": false}, {"id": 35, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 24", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-026.jpeg", "featured": false}, {"id": 36, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 25", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-027.jpeg", "featured": false}, {"id": 37, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 26", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-028.jpeg", "featured": false}, {"id": 38, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 27", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-029.jpeg", "featured": false}, {"id": 39, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 28", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-030.jpeg", "featured": false}, {"id": 40, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 29", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-031.jpeg", "featured": false}, {"id": 41, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 30", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-032.jpeg", "featured": false}, {"id": 42, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 31", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-033.jpeg", "featured": false}, {"id": 43, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 32", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-034.jpeg", "featured": false}, {"id": 44, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 33", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-035.jpeg", "featured": false}, {"id": 45, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 34", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-036.jpeg", "featured": false}, {"id": 46, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 35", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-037.jpeg", "featured": false}, {"id": 47, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 36", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-038.jpeg", "featured": false}, {"id": 48, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 37", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-039.jpeg", "featured": false}, {"id": 49, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 38", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-040.jpeg", "featured": false}, {"id": 50, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 39", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-041.jpeg", "featured": false}, {"id": 51, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 40", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-042.jpeg", "featured": false}, {"id": 52, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 41", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-043.jpeg", "featured": false}, {"id": 53, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 42", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-044.jpeg", "featured": false}, {"id": 54, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 43", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-045.jpeg", "featured": false}, {"id": 55, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 44", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-046.jpeg", "featured": false}, {"id": 56, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Smart Classroom & Study Hall \u00b7 Wing 45", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-047.jpeg", "featured": false}, {"id": 57, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Junior & Kindergarten Wing", "title": "Smart Classroom & Study Hall \u00b7 Wing 46", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-048.jpg", "featured": false}, {"id": 58, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Primary Interactive Classrooms", "title": "Smart Classroom & Study Hall \u00b7 Wing 47", "desc": "Interactive learning environment equipped with digital display and ergonomic student seating.", "src": "assets/photos/scrapbook/academics/academics-049.jpg", "featured": false}, {"id": 59, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "100% Board Merit Distinctions & State Toppers", "desc": "Durga Public School scholars achieving top ranks in RBSE Secondary and Senior Secondary Examinations.", "src": "assets/photos/board-merit-toppers.jpg", "featured": false}, {"id": 60, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Class X Graduating Batch & Turban Honors", "desc": "State merit achievers and graduating Class X scholars felicitated with traditional Rajasthani safas.", "src": "assets/photos/class-x-graduating-batch-turban.jpg", "featured": false}, {"id": 61, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "RBSE Board Exam Merit Toppers Recognition", "desc": "Academic recognition ceremony celebrating students who scored above 90% in board examinations.", "src": "assets/photos/client/news/news-board-exam-merit-topper-1.jpg", "featured": false}, {"id": 62, "cat": "academics", "catLabel": "Academic Wings", "subcat": "Senior Secondary Study Halls", "title": "Board Merit Roll of Honor", "desc": "Scholars being felicitated for state-level subject distinctions in Science, Mathematics and English.", "src": "assets/photos/client/news/news-board-toppers-recognition-7.jpg", "featured": false}, {"id": 63, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Laboratory \u00b7 Practical Station 01", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-001.jpeg", "featured": false}, {"id": 64, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Biology Laboratory \u00b7 Practical Station 02", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-002.jpeg", "featured": false}, {"id": 65, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "Computer Science IT Hub \u00b7 Practical Station 03", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-003.jpeg", "featured": false}, {"id": 66, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Mathematics & Logic Lab", "title": "Mathematics & Logic Lab \u00b7 Practical Station 04", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-004.jpeg", "featured": false}, {"id": 67, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Music & Performing Arts", "title": "Music & Performing Arts \u00b7 Practical Station 05", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-005.jpeg", "featured": false}, {"id": 68, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Library Sanctuary", "title": "Library Sanctuary \u00b7 Practical Station 06", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-006.jpeg", "featured": false}, {"id": 69, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Physics Laboratory", "title": "Physics Laboratory \u00b7 Practical Station 07", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-007.jpeg", "featured": false}, {"id": 70, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Laboratory \u00b7 Practical Station 08", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-008.jpeg", "featured": false}, {"id": 71, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Biology Laboratory \u00b7 Practical Station 09", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-009.jpg", "featured": false}, {"id": 72, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "Computer Science IT Hub \u00b7 Practical Station 10", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-010.jpg", "featured": false}, {"id": 73, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Mathematics & Logic Lab", "title": "Mathematics & Logic Lab \u00b7 Practical Station 11", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-011.jpg", "featured": false}, {"id": 74, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Music & Performing Arts", "title": "Music & Performing Arts \u00b7 Practical Station 12", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-012.jpg", "featured": false}, {"id": 75, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Library Sanctuary", "title": "Library Sanctuary \u00b7 Practical Station 13", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-013.jpg", "featured": false}, {"id": 76, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Physics Laboratory", "title": "Physics Laboratory \u00b7 Practical Station 14", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-014.jpg", "featured": false}, {"id": 77, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Laboratory \u00b7 Practical Station 15", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-015.jpg", "featured": false}, {"id": 78, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Biology Laboratory \u00b7 Practical Station 16", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-016.jpg", "featured": false}, {"id": 79, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "Computer Science IT Hub \u00b7 Practical Station 17", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-017.jpg", "featured": false}, {"id": 80, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Mathematics & Logic Lab", "title": "Mathematics & Logic Lab \u00b7 Practical Station 18", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-018.jpeg", "featured": false}, {"id": 81, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Music & Performing Arts", "title": "Music & Performing Arts \u00b7 Practical Station 19", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-019.jpeg", "featured": false}, {"id": 82, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Library Sanctuary", "title": "Library Sanctuary \u00b7 Practical Station 20", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-020.jpeg", "featured": false}, {"id": 83, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Physics Laboratory", "title": "Physics Laboratory \u00b7 Practical Station 21", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-021.jpeg", "featured": false}, {"id": 84, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Laboratory \u00b7 Practical Station 22", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-022.jpeg", "featured": false}, {"id": 85, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Biology Laboratory \u00b7 Practical Station 23", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-023.jpeg", "featured": false}, {"id": 86, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "Computer Science IT Hub \u00b7 Practical Station 24", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-024.jpeg", "featured": false}, {"id": 87, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Mathematics & Logic Lab", "title": "Mathematics & Logic Lab \u00b7 Practical Station 25", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-025.jpeg", "featured": false}, {"id": 88, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Music & Performing Arts", "title": "Music & Performing Arts \u00b7 Practical Station 26", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-026.jpeg", "featured": false}, {"id": 89, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Library Sanctuary", "title": "Library Sanctuary \u00b7 Practical Station 27", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-027.jpeg", "featured": false}, {"id": 90, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Physics Laboratory", "title": "Physics Laboratory \u00b7 Practical Station 28", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-028.jpeg", "featured": false}, {"id": 91, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Laboratory \u00b7 Practical Station 29", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-029.jpeg", "featured": false}, {"id": 92, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Biology Laboratory \u00b7 Practical Station 30", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-030.jpg", "featured": false}, {"id": 93, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "Computer Science IT Hub \u00b7 Practical Station 31", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-031.jpeg", "featured": false}, {"id": 94, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Mathematics & Logic Lab", "title": "Mathematics & Logic Lab \u00b7 Practical Station 32", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-032.jpg", "featured": false}, {"id": 95, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Music & Performing Arts", "title": "Music & Performing Arts \u00b7 Practical Station 33", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-033.jpg", "featured": false}, {"id": 96, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Library Sanctuary", "title": "Library Sanctuary \u00b7 Practical Station 34", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-034.jpg", "featured": false}, {"id": 97, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Physics Laboratory", "title": "Physics Laboratory \u00b7 Practical Station 35", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-035.jpg", "featured": false}, {"id": 98, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Laboratory \u00b7 Practical Station 36", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-036.jpeg", "featured": false}, {"id": 99, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Biology Laboratory \u00b7 Practical Station 37", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-037.jpeg", "featured": false}, {"id": 100, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "Computer Science IT Hub \u00b7 Practical Station 38", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-038.jpeg", "featured": false}, {"id": 101, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Mathematics & Logic Lab", "title": "Mathematics & Logic Lab \u00b7 Practical Station 39", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-039.jpeg", "featured": false}, {"id": 102, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Music & Performing Arts", "title": "Music & Performing Arts \u00b7 Practical Station 40", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-040.jpeg", "featured": false}, {"id": 103, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Library Sanctuary", "title": "Library Sanctuary \u00b7 Practical Station 41", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-041.jpeg", "featured": false}, {"id": 104, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Physics Laboratory", "title": "Physics Laboratory \u00b7 Practical Station 42", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-042.jpeg", "featured": false}, {"id": 105, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Laboratory \u00b7 Practical Station 43", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-043.jpeg", "featured": false}, {"id": 106, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Biology Laboratory \u00b7 Practical Station 44", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-044.jpg", "featured": false}, {"id": 107, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "Computer Science IT Hub \u00b7 Practical Station 45", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-045.jpeg", "featured": false}, {"id": 108, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Mathematics & Logic Lab", "title": "Mathematics & Logic Lab \u00b7 Practical Station 46", "desc": "Hands-on empirical learning and experimental station at Durga Public School Pilani.", "src": "assets/photos/scrapbook/labs/labs-046.jpeg", "featured": false}, {"id": 109, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Physics Laboratory", "title": "Science Practical Demonstration Lab", "desc": "Senior secondary students conducting physics and optics experiments under faculty guidance.", "src": "assets/photos/science-practical-demonstration.jpg", "featured": false}, {"id": 110, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Biology Laboratory", "title": "Environmental & Science Innovation Exhibition", "desc": "Vivekanand House science exhibition featuring botanical and ecological models.", "src": "assets/photos/science-environmental-exhibition-vivekanand.jpg", "featured": false}, {"id": 111, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Chemistry Laboratory", "title": "Chemistry Lab Titration Workstations", "desc": "Specialized chemistry benches equipped with reagent racks and precision titration apparatus.", "src": "assets/photos/client/labs/chemistry-lab-titration-benches-1.jpg", "featured": false}, {"id": 112, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Computer Science IT Hub", "title": "High-Speed Computer & IT Workstations", "desc": "Modern digital workstations providing high-speed internet and coding environments.", "src": "assets/photos/client/labs/computer-lab-workstations-1.jpg", "featured": false}, {"id": 113, "cat": "labs", "catLabel": "Science Laboratories", "subcat": "Library Sanctuary", "title": "Central Reference Library & Reading Hall", "desc": "Curated academic repository holding over 10,000 reference volumes, periodicals, and quiet reading spaces.", "src": "assets/photos/client/library/library-reading-hall-1.jpg", "featured": false}, {"id": 114, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 01", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-001.jpeg", "featured": false}, {"id": 115, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 02", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-002.jpeg", "featured": false}, {"id": 116, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 03", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-003.jpg", "featured": false}, {"id": 117, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 04", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-004.jpg", "featured": false}, {"id": 118, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 05", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-005.jpeg", "featured": false}, {"id": 119, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 06", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-006.jpeg", "featured": false}, {"id": 120, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 07", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-007.jpg", "featured": false}, {"id": 121, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 08", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-008.jpg", "featured": false}, {"id": 122, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 09", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-009.jpeg", "featured": false}, {"id": 123, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 10", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-010.jpg", "featured": false}, {"id": 124, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 11", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-011.jpg", "featured": false}, {"id": 125, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 12", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-012.jpg", "featured": false}, {"id": 126, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 13", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-013.jpg", "featured": false}, {"id": 127, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 14", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-014.jpg", "featured": false}, {"id": 128, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 15", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-015.jpg", "featured": false}, {"id": 129, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 16", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-016.jpg", "featured": false}, {"id": 130, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 17", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-017.jpg", "featured": false}, {"id": 131, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 18", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-018.jpg", "featured": false}, {"id": 132, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 19", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-019.jpg", "featured": false}, {"id": 133, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 20", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-020.jpg", "featured": false}, {"id": 134, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 21", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-021.jpg", "featured": false}, {"id": 135, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 22", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-022.jpg", "featured": false}, {"id": 136, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 23", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-023.jpg", "featured": false}, {"id": 137, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 24", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-024.jpg", "featured": false}, {"id": 138, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 25", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-025.jpg", "featured": false}, {"id": 139, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 26", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-026.jpg", "featured": false}, {"id": 140, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 27", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-027.jpg", "featured": false}, {"id": 141, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 28", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-028.jpg", "featured": false}, {"id": 142, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 29", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-029.jpg", "featured": false}, {"id": 143, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 30", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-030.jpg", "featured": false}, {"id": 144, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 31", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-031.jpg", "featured": false}, {"id": 145, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 32", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-032.jpg", "featured": false}, {"id": 146, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 33", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-033.jpg", "featured": false}, {"id": 147, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 34", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-034.jpg", "featured": false}, {"id": 148, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 35", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-035.jpg", "featured": false}, {"id": 149, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 36", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-036.jpg", "featured": false}, {"id": 150, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 37", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-037.jpg", "featured": false}, {"id": 151, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 38", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-038.jpg", "featured": false}, {"id": 152, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 39", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-039.jpg", "featured": false}, {"id": 153, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 40", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-040.jpg", "featured": false}, {"id": 154, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 41", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-041.jpg", "featured": false}, {"id": 155, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 42", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-042.jpg", "featured": false}, {"id": 156, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 43", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-043.jpg", "featured": false}, {"id": 157, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 44", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-044.jpg", "featured": false}, {"id": 158, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 45", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-045.jpg", "featured": false}, {"id": 159, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 46", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-046.jpg", "featured": false}, {"id": 160, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 47", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-047.jpg", "featured": false}, {"id": 161, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 48", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-048.jpg", "featured": false}, {"id": 162, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 49", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-049.jpg", "featured": false}, {"id": 163, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 50", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-050.jpg", "featured": false}, {"id": 164, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 51", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-051.jpg", "featured": false}, {"id": 165, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 52", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-052.jpeg", "featured": false}, {"id": 166, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 53", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-053.jpeg", "featured": false}, {"id": 167, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 54", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-054.jpeg", "featured": false}, {"id": 168, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 55", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-055.jpeg", "featured": false}, {"id": 169, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 56", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-056.jpeg", "featured": false}, {"id": 170, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 57", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-057.jpg", "featured": false}, {"id": 171, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 58", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-058.jpg", "featured": false}, {"id": 172, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 59", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-059.jpg", "featured": false}, {"id": 173, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 60", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-060.jpg", "featured": false}, {"id": 174, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 61", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-061.jpg", "featured": false}, {"id": 175, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 62", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-062.jpg", "featured": false}, {"id": 176, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Hindi Diwas Recitations", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 63", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-063.jpg", "featured": false}, {"id": 177, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 64", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-064.jpg", "featured": false}, {"id": 178, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 65", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-065.jpg", "featured": false}, {"id": 179, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 66", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-066.jpg", "featured": false}, {"id": 180, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Cultural Jubilee & Stage Performance \u00b7 Scene 67", "desc": "Students performing vibrant cultural traditions, folk dances, and ceremonial recitations.", "src": "assets/photos/scrapbook/cultural/cultural-067.jpg", "featured": false}, {"id": 181, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Annual Convocation & Graduation Ceremony", "desc": "Graduating scholars receiving merit certificates on the grand celebration stage.", "src": "assets/photos/annual-graduation-merit.jpg", "featured": false}, {"id": 182, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Gandhi House Art & Craft Exhibition", "desc": "Creative handiwork and historical model exhibition authored by Gandhi House scholars.", "src": "assets/photos/art-craft-exhibition-gandhi-house.jpg", "featured": false}, {"id": 183, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Raman House Science & Innovation Models", "desc": "Working models of mechanical and environmental concepts presented during house week.", "src": "assets/photos/art-craft-exhibition-raman-house.jpg", "featured": false}, {"id": 184, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Board Achiever Parent Tribute Ceremony", "desc": "Parents being felicitated on stage alongside their top-ranking children.", "src": "assets/photos/board-achiever-parents-tribute.jpg", "featured": false}, {"id": 185, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Dignitary Memento Conferral", "desc": "Distinguished guests and educational patrons receiving the school traditional memento.", "src": "assets/photos/chief-guest-memento-honors.jpg", "featured": false}, {"id": 186, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Deep Prajwalan & Saraswati Vandana", "desc": "Ceremonial lamp lighting invocation before Goddess Saraswati inaugurating the annual festival.", "src": "assets/photos/deep-prajwalan-saraswati-vandana.jpg", "featured": false}, {"id": 187, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Family Scholar Felicitation on Stage", "desc": "Warm family moments as board distinction toppers receive medals of honor.", "src": "assets/photos/family-scholar-celebration.jpg", "featured": false}, {"id": 188, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Bal Krishna & Radha Festive Celebration", "desc": "Junior kindergarten scholars dressed as Krishna and Radha celebrating Janmashtami.", "src": "assets/photos/foundational-bal-krishna-radha-celebration.jpg", "featured": false}, {"id": 189, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Traditional Costume Pageant & Leela", "desc": "Primary students participating in the annual cultural costume pageant.", "src": "assets/photos/foundational-krishna-costume-pageant.jpg", "featured": false}, {"id": 190, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Inter-House Choir & Symphony Performance", "desc": "Harmonious choral performance by senior student vocalists.", "src": "assets/photos/house-choir-performance.jpg", "featured": false}, {"id": 191, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Independence Day Patriotic Celebration", "desc": "Patriotic stage performance celebrating national unity on August 15.", "src": "assets/photos/independence-day-cultural-performance.jpg", "featured": false}, {"id": 192, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Independence Day Dignitaries Reception", "desc": "School leadership and community leaders gathered during flag hoisting.", "src": "assets/photos/independence-day-dignitaries-reception.jpg", "featured": false}, {"id": 193, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Krishna Leela Dramatic Presentation", "desc": "Stage drama portraying classic moral tales with traditional theatrical costumes.", "src": "assets/photos/krishna-leela-dramatic-presentation.jpg", "featured": false}, {"id": 194, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Leadership & Scholastic Distinction Award", "desc": "Director Shri Shushil Kumar Verma conferring academic trophies.", "src": "assets/photos/leadership-distinction-award.jpg", "featured": false}, {"id": 195, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Director Merit Student Honor Roll", "desc": "Top academic performers honored with shields and scholarship awards.", "src": "assets/photos/merit-student-director-honors.jpg", "featured": false}, {"id": 196, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Podium Oratory & Hindi Diwas Recitation", "desc": "Student orators delivering debate presentations with eloquence.", "src": "assets/photos/podium-oratory-debate.jpg", "featured": false}, {"id": 197, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Inter-House English Week", "title": "Primary Wing Creative Crafts Showcase", "desc": "Handmade paper crafts, clay sculptures, and paintings made by primary classes.", "src": "assets/photos/primary-creative-crafts-display.jpg", "featured": false}, {"id": 198, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Rajasthani Safa Turban Felicitation", "desc": "Traditional Shekhawati honor ceremony with hand-tied safas for distinguished achievers.", "src": "assets/photos/rajasthani-safa-turban-felicitation-1.jpg", "featured": false}, {"id": 199, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Rajasthani Folk Dance", "title": "Traditional Turban Honors & Memento", "desc": "Cultural reverence honoring mentors, achievers, and guests in Shekhawati tradition.", "src": "assets/photos/rajasthani-safa-turban-felicitation-2.jpg", "featured": false}, {"id": 200, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Ganesh Chaturthi & Saraswati Puja", "title": "Handmade Rakhi & Craft Celebration", "desc": "Festival celebration fostering fraternity and creative artistry.", "src": "assets/photos/raksha-bandhan-handmade-craft.jpg", "featured": false}, {"id": 201, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Principal Scholar Felicitation on Stage", "desc": "Principal Mrs. Punita Sharma conferring certificates to annual exam toppers.", "src": "assets/photos/scholar-felicitation-principal.jpg", "featured": false}, {"id": 202, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Teachers Day Faculty Assembly", "desc": "Special morning assembly honoring the dedication and guidance of teaching faculty.", "src": "assets/photos/teachers-day-faculty-assembly.jpg", "featured": false}, {"id": 203, "cat": "cultural", "catLabel": "Cultural Festivals", "subcat": "Annual Day & Prize Ceremonies", "title": "Teachers Day Student Cultural Tribute", "desc": "Students performing stage skits and musical tributes dedicated to their teachers.", "src": "assets/photos/teachers-day-student-tribute.jpg", "featured": false}, {"id": 204, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Kho-Kho & Field Games", "title": "Sports Arena & Championship Meet \u00b7 Match 01", "desc": "Athletic tournament and field game match conducted on the school grounds.", "src": "assets/photos/scrapbook/sports/sports-001.jpg", "featured": false}, {"id": 205, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Team Tournaments", "title": "Sports Arena & Championship Meet \u00b7 Match 02", "desc": "Athletic tournament and field game match conducted on the school grounds.", "src": "assets/photos/scrapbook/sports/sports-002.jpg", "featured": false}, {"id": 206, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Morning Yoga & Drills", "title": "Sports Arena & Championship Meet \u00b7 Match 03", "desc": "Athletic tournament and field game match conducted on the school grounds.", "src": "assets/photos/scrapbook/sports/sports-003.jpg", "featured": false}, {"id": 207, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Annual Sports Meet", "title": "Sports Arena & Championship Meet \u00b7 Match 04", "desc": "Athletic tournament and field game match conducted on the school grounds.", "src": "assets/photos/scrapbook/sports/sports-004.jpg", "featured": false}, {"id": 208, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Kho-Kho & Field Games", "title": "Sports Arena & Championship Meet \u00b7 Match 05", "desc": "Athletic tournament and field game match conducted on the school grounds.", "src": "assets/photos/scrapbook/sports/sports-005.jpg", "featured": false}, {"id": 209, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Kho-Kho & Field Games", "title": "Sports Arena & Championship Meet \u00b7 Match 13", "desc": "Athletic tournament and field game match conducted on the school grounds.", "src": "assets/photos/scrapbook/sports/sports-013.jpg", "featured": false}, {"id": 210, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Annual Sports Meet", "title": "Athletic Arena & 200m Running Track", "desc": "Multi-lane running track designed for sprint races and annual athletic championships.", "src": "assets/photos/client/campus/sports-complex-athletic-arena-5.jpg", "featured": false}, {"id": 211, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Team Tournaments", "title": "Cricket Pitch & Practice Nets", "desc": "Dedicated turf pitch for cricket coaching, inter-house matches, and net practice.", "src": "assets/photos/client/campus/sports-complex-cricket-ground-3.jpg", "featured": false}, {"id": 212, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Team Tournaments", "title": "Outdoor Volleyball Courts", "desc": "Regulation volleyball courts with sandy boundary zones for daily training.", "src": "assets/photos/client/campus/sports-complex-volleyball-court-4.jpg", "featured": false}, {"id": 213, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Kho-Kho & Field Games", "title": "Inter-House Kabaddi Championship", "desc": "Thrilling kabaddi clash between house teams demonstrating agility and team coordination.", "src": "assets/photos/client/events/event-sports-day-kabaddi-championship-4.jpg", "featured": false}, {"id": 214, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Annual Sports Meet", "title": "4x100m Relay Sprint Championship", "desc": "Final lap of the annual sports day baton relay race.", "src": "assets/photos/client/events/event-sports-day-relay-team-2.jpg", "featured": false}, {"id": 215, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Annual Sports Meet", "title": "100m Track Sprint Finals", "desc": "Senior school athletes competing in the flagship 100-meter dash.", "src": "assets/photos/client/events/event-sports-day-sprint-race-1.jpg", "featured": false}, {"id": 216, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Annual Sports Meet", "title": "Overall House Sports Trophy Conferral", "desc": "The winning house captain receiving the rolling championship cup on the podium.", "src": "assets/photos/client/events/event-sports-day-trophy-ceremony-5.jpg", "featured": false}, {"id": 217, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Team Tournaments", "title": "Inter-House Volleyball Tournament", "desc": "Senior boys spiking and blocking at the net during the inter-house league.", "src": "assets/photos/client/events/event-sports-day-volleyball-clash-3.jpg", "featured": false}, {"id": 218, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Morning Yoga & Drills", "title": "Civic March Past & Scout Drill", "desc": "Durga Public School marching contingent performing disciplined drill at the sub-divisional parade ground.", "src": "assets/photos/civic-parade-pilani-court.jpg", "featured": false}, {"id": 219, "cat": "sports", "catLabel": "Sports Arena", "subcat": "Annual Sports Meet", "title": "District Athletic Meet Winners", "desc": "Scholars holding medals won across district-level track and field events.", "src": "assets/photos/client/news/news-athletic-meet-winners-5.jpg", "featured": false}, {"id": 220, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #01", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-050.jpeg", "featured": false}, {"id": 221, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #02", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-051.jpeg", "featured": false}, {"id": 222, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #03", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-052.jpeg", "featured": false}, {"id": 223, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #04", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-053.jpeg", "featured": false}, {"id": 224, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #05", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-054.jpeg", "featured": false}, {"id": 225, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #06", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-055.jpeg", "featured": false}, {"id": 226, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #07", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-056.jpeg", "featured": false}, {"id": 227, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #08", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-057.jpeg", "featured": false}, {"id": 228, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "GPS Transport Fleet \u00b7 Bus #09", "desc": "Safe, yellow school bus operating across 11 designated rural and town transit corridors.", "src": "assets/photos/scrapbook/student-life/student-life-058.jpeg", "featured": false}, {"id": 229, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #10", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-1.jpg", "featured": false}, {"id": 230, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #11", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-2.jpg", "featured": false}, {"id": 231, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #12", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-3.jpg", "featured": false}, {"id": 232, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #13", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-4.jpg", "featured": false}, {"id": 233, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #14", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-5.jpg", "featured": false}, {"id": 234, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #15", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-6.jpg", "featured": false}, {"id": 235, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #16", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-7.jpg", "featured": false}, {"id": 236, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #17", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-8.jpg", "featured": false}, {"id": 237, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #18", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-9.jpg", "featured": false}, {"id": 238, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #19", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-10.jpg", "featured": false}, {"id": 239, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #20", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-11.jpg", "featured": false}, {"id": 240, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #21", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-12.jpg", "featured": false}, {"id": 241, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #22", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-13.jpg", "featured": false}, {"id": 242, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #23", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-14.jpg", "featured": false}, {"id": 243, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #24", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-15.jpg", "featured": false}, {"id": 244, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "School Transit Bus #25", "desc": "GPS-monitored student bus with experienced driver and female conductor escort.", "src": "assets/photos/client/transport/fleet-new-16.jpg", "featured": false}, {"id": 245, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "Transport Bus Fleet Frontal Inspection", "desc": "Lineup of Durga Public School buses stationed at the campus transport yard.", "src": "assets/photos/client/transport/transport-bus-fleet-1.jpg", "featured": false}, {"id": 246, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "GPS Transport Fleet", "title": "Transport Fleet Route Coordination", "desc": "Bus drivers and route marshals conducting pre-trip safety checks before morning departure.", "src": "assets/photos/client/transport/transport-bus-fleet-2.jpg", "featured": false}, {"id": 247, "cat": "student-life", "catLabel": "Student Life, Fleet", "subcat": "Student Life Activities", "title": "Senior Students Celebration at Portico", "desc": "Scholars sharing celebratory moments under the entrance colonnade after board exam declarations.", "src": "assets/photos/senior-students-celebration-portico.jpg", "featured": false}];

  // State Manager
  const DPSAdmin = {
    state: {
      auth: false,
      activeTab: 'dashboard',
      leads: [],
      config: {},
      houses: {},
      gallery: [],
      circulars: [],
      faculty: [],
      contacts: [],
      audit: []
    },

    init: function () {
      this.loadState();
      this.bindEvents();
      this.checkAuth();
      this.render();
    },

    loadState: function () {
      try {
        // Auth
        this.state.auth = sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';

        // Leads
        const storedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
        this.state.leads = storedLeads ? JSON.parse(storedLeads) : DEFAULT_LEADS;

        // Config
        const storedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
        this.state.config = storedConfig ? JSON.parse(storedConfig) : DEFAULT_CONFIG;

        // Houses
        const storedHouses = localStorage.getItem(STORAGE_KEYS.HOUSES);
        this.state.houses = storedHouses ? JSON.parse(storedHouses) : DEFAULT_HOUSES;

        // Gallery
        const storedGallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
        this.state.gallery = storedGallery ? JSON.parse(storedGallery) : RAW_GALLERY;

        // Circulars
        const storedCirc = localStorage.getItem(STORAGE_KEYS.CIRCULARS);
        this.state.circulars = storedCirc ? JSON.parse(storedCirc) : DEFAULT_CIRCULARS;

        // Board Merit Toppers
        const storedToppers = localStorage.getItem(STORAGE_KEYS.TOPPERS);
        this.state.toppers = storedToppers ? JSON.parse(storedToppers) : DEFAULT_TOPPERS;

        // Press Newspaper Cuttings
        const storedCuttings = localStorage.getItem(STORAGE_KEYS.CUTTINGS);
        try {
          const parsed = storedCuttings ? JSON.parse(storedCuttings) : null;
          if (Array.isArray(parsed) && parsed.length >= 20 && !parsed.some(it => String(it.id).startsWith('CUT-'))) {
            this.state.cuttings = parsed;
          } else {
            localStorage.removeItem(STORAGE_KEYS.CUTTINGS);
            this.state.cuttings = DEFAULT_CUTTINGS;
          }
        } catch(e) {
          this.state.cuttings = DEFAULT_CUTTINGS;
        }

        this.state.newsSubTab = 'circulars';

        // Faculty
        const storedFac = localStorage.getItem(STORAGE_KEYS.FACULTY);
        this.state.faculty = storedFac ? JSON.parse(storedFac) : DEFAULT_FACULTY;

        // Contacts
        const storedContacts = localStorage.getItem(STORAGE_KEYS.CONTACTS);
        this.state.contacts = storedContacts ? JSON.parse(storedContacts) : DEFAULT_CONTACTS;

        // Audit Logs
        const storedAudit = localStorage.getItem(STORAGE_KEYS.AUDIT);
        this.state.audit = storedAudit ? JSON.parse(storedAudit) : [
          { action: 'Admin session initialized', timestamp: new Date().toLocaleString() }
        ];

        // Ensure defaults are saved if first time
        if (!storedConfig) this.saveConfig();
        if (!storedLeads) this.saveLeads();
        if (!storedHouses) this.saveHouses();
        if (!storedGallery) this.saveGallery();
        if (!storedCirc) this.saveCirculars();
        if (!storedToppers) this.saveToppers();
        if (!storedCuttings) this.saveCuttings();
        if (!storedFac) this.saveFaculty();
        if (!storedContacts) this.saveContacts();
      } catch (e) {
        console.error('State load error:', e);
      }
    },

    saveLeads: function () {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.state.leads));
    },
    saveConfig: function () {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(this.state.config));
    },
    saveHouses: function () {
      localStorage.setItem(STORAGE_KEYS.HOUSES, JSON.stringify(this.state.houses));
    },
    saveGallery: function () {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(this.state.gallery));
    },
    saveCirculars: function () {
      localStorage.setItem(STORAGE_KEYS.CIRCULARS, JSON.stringify(this.state.circulars));
    },
    saveToppers: function () {
      localStorage.setItem(STORAGE_KEYS.TOPPERS, JSON.stringify(this.state.toppers));
    },
    saveCuttings: function () {
      localStorage.setItem(STORAGE_KEYS.CUTTINGS, JSON.stringify(this.state.cuttings));
    },
    saveFaculty: function () {
      localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(this.state.faculty));
    },
    saveContacts: function () {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(this.state.contacts));
    },
    saveAudit: function (action) {
      this.state.audit.unshift({ action: action, timestamp: new Date().toLocaleString() });
      if (this.state.audit.length > 50) this.state.audit.pop();
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(this.state.audit));
    },

    checkAuth: function () {
      const loginOverlay = document.getElementById('adminLoginOverlay');
      if (!this.state.auth) {
        if (loginOverlay) loginOverlay.style.display = 'flex';
      } else {
        if (loginOverlay) loginOverlay.style.display = 'none';
      }
    },

    login: function (pass) {
      if (pass === 'dps@admin2026' || pass === 'admin') {
        this.state.auth = true;
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        this.checkAuth();
        this.toast('Welcome, Administrator. Admin Session Active.', 'success');
        this.saveAudit('Administrator logged in successfully');
        return true;
      }
      this.toast('Invalid password. Please try again.', 'error');
      return false;
    },

    logout: function () {
      this.state.auth = false;
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
      this.checkAuth();
      this.toast('Signed out from School Admin Portal.', 'info');
    },

    switchTab: function (tabId) {
      if (tabId === 'notices' || tabId === 'circulars' || tabId === 'houses') tabId = 'news';
      this.state.activeTab = tabId;
      document.querySelectorAll('.nav-item').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      });
      document.querySelectorAll('.admin-view-panel').forEach(function (p) {
        p.classList.toggle('active', p.id === 'view-' + tabId);
      });
      document.querySelectorAll('.mobile-dock-item[data-tab]').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      });

      // Update header
      const titleEl = document.getElementById('currentViewTitle');
      const subEl = document.getElementById('currentViewSub');
      const tabMap = {
        dashboard: { title: 'Operational Overview', sub: 'Key school metrics, lead velocity & live broadcasts' },
        leads: { title: 'Admissions CRM & Inquiries', sub: 'Comprehensive registry of student applications & tele-counseling' },
        news: { title: 'News & Media Portal', sub: 'Circulars, Board Merit Toppers, Press Clippings, Marquee Ticker & Alerts' },
        notices: { title: 'News & Media Portal', sub: 'Circulars, Board Merit Toppers, Press Clippings, Marquee Ticker & Alerts' },
        circulars: { title: 'News & Media Portal', sub: 'Circulars, Board Merit Toppers, Press Clippings, Marquee Ticker & Alerts' },
        settings: { title: 'School Information & Live CMS', sub: 'Modify school phone numbers, timings, session parameters & metrics' },
        gallery: { title: 'Archival Media & Scrapbook', sub: 'Manage 271 campus photographs, titles, captions & categories' },
        faculty: { title: 'Faculty & Administration Roster', sub: 'Teaching staff, academic coordinators & leadership profiles' },
        contacts: { title: 'Public Contact Inquiries', sub: 'Direct messages and visitor campus tour requests' },
        backup: { title: 'Data Backup & Audit History', sub: 'Export complete school records, restore backups & view system activity' }
      };

      if (tabMap[tabId]) {
        if (titleEl) titleEl.textContent = tabMap[tabId].title;
        if (subEl) subEl.textContent = tabMap[tabId].sub;
      }

      // Re-render view content
      this.renderTab(tabId);

      // Close mobile sidebar if open
      document.getElementById('adminSidebar')?.classList.remove('open');
      document.getElementById('sidebarBackdrop')?.classList.remove('active');
    },

    render: function () {
      this.updateCounters();
      this.renderTab(this.state.activeTab);
    },

    updateCounters: function () {
      const newLeadsCount = this.state.leads.filter(l => l.status === 'New').length;
      const unreadMsgCount = this.state.contacts.filter(m => m.status === 'Unread').length;

      const newsBadge = document.getElementById('badgeNewsCount');
      if (newsBadge) {
        const totalItems = (this.state.circulars ? this.state.circulars.length : 0) + (this.state.toppers ? this.state.toppers.length : 0);
        newsBadge.textContent = totalItems > 0 ? totalItems : 'Live';
      }

      const leadsBadge = document.getElementById('badgeLeadsCount');
      if (leadsBadge) {
        leadsBadge.textContent = this.state.leads.length;
        leadsBadge.className = 'nav-counter' + (newLeadsCount > 0 ? ' counter-urgent' : '');
      }

      const msgBadge = document.getElementById('badgeMsgCount');
      if (msgBadge) {
        msgBadge.textContent = unreadMsgCount;
        msgBadge.className = 'nav-counter' + (unreadMsgCount > 0 ? ' counter-urgent' : '');
      }

      const photosBadge = document.getElementById('badgePhotosCount');
      if (photosBadge) photosBadge.textContent = this.state.gallery.length;

      const dockBadge = document.getElementById('dockLeadsCount');
      if (dockBadge) {
        dockBadge.textContent = this.state.leads.length;
        dockBadge.style.display = this.state.leads.length > 0 ? 'inline-flex' : 'none';
      }
    },

    renderTab: function (tabId) {
      switch (tabId) {
        case 'dashboard':
          this.renderDashboard();
          break;
        case 'leads':
          this.renderLeadsTable();
          break;
        case 'news':
          this.renderNewsPortal();
          break;
        case 'notices':
          this.renderNewsPortal();
          break;
        case 'circulars':
          this.renderNewsPortal();
          break;
        case 'settings':
          this.renderSettings();
          break;
        case 'gallery':
          this.renderGalleryCatalog();
          break;
        case 'circulars':
          this.renderCircularsTable();
          break;
        case 'faculty':
          this.renderFacultyTable();
          break;
        case 'contacts':
          this.renderContactsTable();
          break;
        case 'backup':
          this.renderAuditLogs();
          break;
      }
    },

    // DASHBOARD
    renderDashboard: function () {
      const leads = this.state.leads;
      const newCount = leads.filter(l => l.status === 'New').length;
      const admittedCount = leads.filter(l => l.status === 'Admitted').length;
      const interviewCount = leads.filter(l => l.status === 'Interview Scheduled').length;

      document.getElementById('statTotalLeads').textContent = leads.length;
      document.getElementById('statNewLeads').textContent = newCount;
      document.getElementById('statAdmitted').textContent = admittedCount;
      document.getElementById('statGalleryCount').textContent = this.state.gallery.length;

      // Active News & Merit Statistics
      const totalCirculars = this.state.circulars ? this.state.circulars.length : 0;
      const totalToppers = this.state.toppers ? this.state.toppers.length : 0;
      const totalCuttings = this.state.cuttings ? this.state.cuttings.length : 0;
      const grandTotalNews = totalCirculars + totalToppers + totalCuttings;

      const statActiveNews = document.getElementById('statActiveNews');
      if (statActiveNews) statActiveNews.textContent = `${grandTotalNews} Published`;

      const statNewsBreakdown = document.getElementById('statNewsBreakdown');
      if (statNewsBreakdown) {
        statNewsBreakdown.textContent = `${totalCirculars} Circulars • ${totalToppers} Toppers • ${totalCuttings} Clippings`;
      }

      // Recent Leads Table
      const recentContainer = document.getElementById('dashboardRecentLeads');
      if (recentContainer) {
        recentContainer.innerHTML = leads.slice(0, 5).map(l => `
          <tr>
            <td><strong>${l.id}</strong></td>
            <td><strong>${l.studentName}</strong><br><span style="font-size:0.72rem;color:#64748B;">${l.parentName}</span></td>
            <td><span class="badge-status status-interview">${l.grade}</span></td>
            <td>${l.phone}</td>
            <td><span class="badge-status status-${l.status.toLowerCase().replace(/\s+/g, '-')}" style="font-size:0.68rem;">${l.status}</span></td>
            <td>
              <button class="btn btn-sm btn-outline" onclick="window.DPSAdmin.viewLeadDetail('${l.id}')">View</button>
            </td>
          </tr>
        `).join('');
      }

      // News & Topper Highlights on Dashboard
      const newsSummary = document.getElementById('dashboardNewsSummary');
      if (newsSummary) {
        const topToppers = (this.state.toppers || []).slice(0, 2);
        const topCircs = (this.state.circulars || []).slice(0, 2);
        newsSummary.innerHTML = `
          <div style="margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-size:0.78rem;font-weight:700;color:#92400E;text-transform:uppercase;">Top Academic Achievers</span>
              <button type="button" class="btn btn-sm btn-outline" style="padding:2px 8px;font-size:0.72rem;" onclick="window.DPSAdmin.switchTab('news');window.DPSAdmin.switchNewsSubTab('toppers');">+ View All</button>
            </div>
            ${topToppers.map(t => `
              <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid #F1F5F9;">
                <img src="${t.image}" alt="${t.name}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:1.5px solid #D97706;">
                <div style="flex-grow:1;min-width:0;">
                  <div style="font-weight:700;font-size:0.80rem;color:#1E293B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.name}</div>
                  <div style="font-size:0.70rem;color:#64748B;">${t.exam}</div>
                </div>
                <span style="font-weight:800;font-size:0.84rem;color:#B45309;">${t.percentage}</span>
              </div>
            `).join('')}
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-size:0.78rem;font-weight:700;color:#1E3A8A;text-transform:uppercase;">Recent Notifications</span>
              <button type="button" class="btn btn-sm btn-outline" style="padding:2px 8px;font-size:0.72rem;" onclick="window.DPSAdmin.switchTab('news');window.DPSAdmin.switchNewsSubTab('circulars');">+ View All</button>
            </div>
            ${topCircs.map(c => `
              <div style="padding:6px 0;border-bottom:1px solid #F1F5F9;">
                <div style="font-weight:600;font-size:0.78rem;color:#1E293B;line-height:1.3;">${c.title}</div>
                <div style="font-size:0.68rem;color:#94A3B8;margin-top:2px;">${c.id} • ${c.date}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
    },

    // ADMISSIONS CRM
    renderLeadsTable: function () {
      const searchVal = (document.getElementById('leadsSearchInput')?.value || '').toLowerCase();
      const statusFilter = document.getElementById('leadsStatusFilter')?.value || 'all';
      const gradeFilter = document.getElementById('leadsGradeFilter')?.value || 'all';

      let filtered = this.state.leads.filter(l => {
        const matchesSearch = l.studentName.toLowerCase().includes(searchVal) ||
          l.parentName.toLowerCase().includes(searchVal) ||
          l.phone.toLowerCase().includes(searchVal) ||
          l.id.toLowerCase().includes(searchVal);

        const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
        const matchesGrade = gradeFilter === 'all' || l.grade.includes(gradeFilter);

        return matchesSearch && matchesStatus && matchesGrade;
      });

      const tbody = document.getElementById('leadsTableBody');
      const countEl = document.getElementById('leadsFilterCount');
      if (countEl) countEl.textContent = `Showing ${filtered.length} of ${this.state.leads.length} Records`;

      if (!tbody) return;

      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:32px;color:#64748B;">No admission inquiries matched your filter.</td></tr>';
        return;
      }

      tbody.innerHTML = filtered.map(l => {
        const statusClass = 'status-' + l.status.toLowerCase().replace(/\s+/g, '-');
        const cleanPhone = l.phone.replace(/[^0-9]/g, '');
        const waText = encodeURIComponent(`Dear ${l.parentName}, Greetings from Durga Public School Pilani. Regarding your admission inquiry for ${l.studentName} (${l.grade}), we would be delighted to assist you. Please let us know a suitable time to connect.`);

        return `
          <tr>
            <td><strong>${l.id}</strong><br><span style="font-size:0.68rem;color:#94A3B8;">${l.date}</span></td>
            <td>
              <strong style="color:#2E0815;">${l.studentName}</strong>
              <div style="font-size:0.72rem;color:#64748B;">Parent: ${l.parentName}</div>
            </td>
            <td><span class="badge-status" style="background:#F1F5F9;color:#334155;border:1px solid #CBD5E1;">${l.grade}</span></td>
            <td>
              <div>${l.phone}</div>
              <div style="font-size:0.70rem;color:#94A3B8;">${l.email || 'No email provided'}</div>
            </td>
            <td>
              <select class="filter-select" style="padding:3px 8px;font-size:0.72rem;border-radius:100px;" onchange="window.DPSAdmin.updateLeadStatus('${l.id}', this.value)">
                <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
                <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                <option value="Interview Scheduled" ${l.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                <option value="Admitted" ${l.status === 'Admitted' ? 'selected' : ''}>Admitted</option>
                <option value="Rejected" ${l.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                <option value="Archived" ${l.status === 'Archived' ? 'selected' : ''}>Archived</option>
              </select>
            </td>
            <td>
              <div class="row-actions">
                <a href="https://wa.me/${cleanPhone}?text=${waText}" target="_blank" class="btn-icon btn-whatsapp-action" title="Open WhatsApp Chat">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </a>
                <a href="tel:${l.phone}" class="btn-icon" title="Call Parent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </a>
                <button type="button" class="btn-icon" onclick="window.DPSAdmin.viewLeadDetail('${l.id}')" title="View & Add Notes">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button type="button" class="btn-icon" style="color:#DC2626;" onclick="window.DPSAdmin.deleteLead('${l.id}')" title="Delete Inquiry">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    updateLeadStatus: function (leadId, newStatus) {
      const lead = this.state.leads.find(l => l.id === leadId);
      if (lead) {
        lead.status = newStatus;
        lead.notes.push(`Status updated to ${newStatus} on ${new Date().toLocaleString()}`);
        this.saveLeads();
        this.saveAudit(`Updated lead ${leadId} status to ${newStatus}`);
        this.updateCounters();
        this.toast(`Lead ${leadId} updated to "${newStatus}"`, 'success');
      }
    },

    viewLeadDetail: function (leadId) {
      const lead = this.state.leads.find(l => l.id === leadId);
      if (!lead) return;

      const modal = document.getElementById('leadDetailModal');
      document.getElementById('leadModalId').textContent = lead.id;
      document.getElementById('leadModalStudent').value = lead.studentName;
      document.getElementById('leadModalGrade').value = lead.grade;
      document.getElementById('leadModalParent').value = lead.parentName;
      document.getElementById('leadModalPhone').value = lead.phone;
      document.getElementById('leadModalEmail').value = lead.email;
      document.getElementById('leadModalMessage').textContent = lead.message;
      document.getElementById('leadModalDate').textContent = lead.date;
      document.getElementById('leadModalStatus').value = lead.status;

      const notesList = document.getElementById('leadModalNotesList');
      if (notesList) {
        notesList.innerHTML = lead.notes.map(n => `<li style="margin-bottom:6px;font-size:0.78rem;color:#475569;">• ${n}</li>`).join('');
      }

      modal.setAttribute('data-current-id', lead.id);
      modal.classList.add('active');
    },

    saveLeadModalDetail: function () {
      const modal = document.getElementById('leadDetailModal');
      const leadId = modal.getAttribute('data-current-id');
      const lead = this.state.leads.find(l => l.id === leadId);
      if (!lead) return;

      lead.studentName = document.getElementById('leadModalStudent').value;
      lead.grade = document.getElementById('leadModalGrade').value;
      lead.parentName = document.getElementById('leadModalParent').value;
      lead.phone = document.getElementById('leadModalPhone').value;
      lead.email = document.getElementById('leadModalEmail').value;
      lead.status = document.getElementById('leadModalStatus').value;

      const newNote = document.getElementById('leadModalNewNote').value.trim();
      if (newNote) {
        lead.notes.push(`${newNote} (added ${new Date().toLocaleDateString()})`);
        document.getElementById('leadModalNewNote').value = '';
      }

      this.saveLeads();
      this.saveAudit(`Edited lead details for ${leadId}`);
      this.toast('Lead changes saved successfully.', 'success');
      this.renderLeadsTable();
      modal.classList.remove('active');
    },

    deleteLead: function (leadId) {
      if (!confirm(`Are you sure you want to delete inquiry record ${leadId}?`)) return;
      this.state.leads = this.state.leads.filter(l => l.id !== leadId);
      this.saveLeads();
      this.saveAudit(`Deleted admission lead ${leadId}`);
      this.toast(`Inquiry ${leadId} removed from records.`, 'info');
      this.renderLeadsTable();
      this.updateCounters();
    },

    exportLeadsCSV: function () {
      const headers = ['Application ID', 'Date', 'Student Name', 'Grade Sought', 'Parent Name', 'Phone', 'Email', 'Status', 'Notes'];
      const rows = this.state.leads.map(l => [
        l.id,
        l.date,
        `"${l.studentName}"`,
        `"${l.grade}"`,
        `"${l.parentName}"`,
        `"${l.phone}"`,
        `"${l.email}"`,
        l.status,
        `"${(l.notes || []).join(' | ').replace(/"/g, '""')}"`
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `DPS_Admissions_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.toast('Admissions leads exported to CSV.', 'success');
      this.saveAudit('Exported all admission leads to CSV');
    },

    // LIVE NOTICES & ALERT BANNER
    renderNoticeManager: function () {
      const cfg = this.state.config.noticeBanner || {};
      const toggle = document.getElementById('noticeToggle');
      const msgInput = document.getElementById('noticeMessage');
      const linkInput = document.getElementById('noticeLink');
      const themeSelect = document.getElementById('noticeTheme');

      if (toggle) toggle.checked = !!cfg.enabled;
      if (msgInput) msgInput.value = cfg.message || '';
      if (linkInput) linkInput.value = cfg.link || 'admissions.html';
      if (themeSelect) themeSelect.value = cfg.theme || 'theme-wine';

      this.updateNoticePreview();
    },

    updateNoticePreview: function () {
      const enabled = document.getElementById('noticeToggle')?.checked;
      const msg = document.getElementById('noticeMessage')?.value || 'Admissions Open 2026–27...';
      const link = document.getElementById('noticeLink')?.value || 'admissions.html';
      const preview = document.getElementById('noticeLivePreview');

      if (preview) {
        if (!enabled) {
          preview.innerHTML = '<div style="padding:16px;text-align:center;color:#64748B;font-style:italic;">Alert Banner is currently OFF. Enable the switch above to broadcast.</div>';
          preview.style.background = '#F1F5F9';
        } else {
          preview.style.background = 'linear-gradient(135deg, #7D1D3F 0%, #4A1024 100%)';
          preview.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 16px;color:#FFFFFF;font-size:0.80rem;font-weight:700;">
              <span style="background:#C45B18;color:#FFFFFF;padding:2px 7px;border-radius:4px;font-size:0.64rem;">LIVE NOTICE</span>
              <span>${msg}</span>
              <a href="${link}" style="color:#FDE68A;text-decoration:underline;">Learn More &rarr;</a>
            </div>
          `;
        }
      }
    },

    saveNoticeBanner: function () {
      this.state.config.noticeBanner = {
        enabled: document.getElementById('noticeToggle').checked,
        message: document.getElementById('noticeMessage').value,
        link: document.getElementById('noticeLink').value,
        theme: document.getElementById('noticeTheme').value
      };
      this.saveConfig();
      this.saveAudit('Updated Live Emergency Alert Banner');
      this.toast('Live Alert Banner updated! Visible immediately across all 13 pages.', 'success');
      this.updateNoticePreview();
    },

    // HOUSE SYSTEM POINTS
    renderHouseLeaderboard: function () {
      const container = document.getElementById('housesGridContainer');
      if (!container) return;

      container.innerHTML = Object.keys(this.state.houses).map(k => {
        const h = this.state.houses[k];
        return `
          <div class="house-card house-${k}">
            <div class="house-header">
              <div class="house-crest-badge">${k === 'vivekanand' ? 'VH' : (k === 'gandhi' ? 'GH' : (k === 'raman' ? 'RH' : 'BH'))}</div>
              <div>
                <div class="house-name">${h.name}</div>
                <div class="house-motto">${h.motto}</div>
              </div>
            </div>

            <div class="house-score-strip">
              <span class="house-score-label">Total Points</span>
              <span class="house-score-val">${h.total}</span>
            </div>

            <div class="house-breakdown">
              <div class="breakdown-item">
                <span class="breakdown-label">Athletics:</span>
                <input type="number" class="form-input" style="width:60px;padding:2px 4px;font-size:0.75rem;" value="${h.athletics}" onchange="window.DPSAdmin.updateHouseScore('${k}', 'athletics', this.value)">
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Academics:</span>
                <input type="number" class="form-input" style="width:60px;padding:2px 4px;font-size:0.75rem;" value="${h.academics}" onchange="window.DPSAdmin.updateHouseScore('${k}', 'academics', this.value)">
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Cultural:</span>
                <input type="number" class="form-input" style="width:60px;padding:2px 4px;font-size:0.75rem;" value="${h.cultural}" onchange="window.DPSAdmin.updateHouseScore('${k}', 'cultural', this.value)">
              </div>
              <div class="breakdown-item">
                <span class="breakdown-label">Discipline:</span>
                <input type="number" class="form-input" style="width:60px;padding:2px 4px;font-size:0.75rem;" value="${h.discipline}" onchange="window.DPSAdmin.updateHouseScore('${k}', 'discipline', this.value)">
              </div>
            </div>

            <div style="font-size:0.70rem;color:#64748B;border-top:1px solid rgba(0,0,0,0.06);padding-top:8px;">
              <div><strong>Captain:</strong> ${h.captain}</div>
              <div><strong>Vice-Captain:</strong> ${h.viceCaptain}</div>
            </div>
          </div>
        `;
      }).join('');
    },

    updateHouseScore: function (houseKey, category, val) {
      const h = this.state.houses[houseKey];
      if (!h) return;
      h[category] = parseInt(val, 10) || 0;
      h.total = h.athletics + h.academics + h.cultural + h.discipline;
      this.saveHouses();
      this.saveAudit(`Updated ${h.name} ${category} points to ${val}`);
      this.toast(`${h.name} updated: Total is now ${h.total} pts`, 'success');
      this.renderHouseLeaderboard();
    },

    // GENERAL SETTINGS & CMS
    renderSettings: function () {
      const cfg = this.state.config;
      document.getElementById('setSchoolName').value = cfg.schoolName;
      document.getElementById('setAffiliation').value = cfg.affiliationNo;
      document.getElementById('setSession').value = cfg.sessionYear;
      document.getElementById('setAdmissionStatus').value = cfg.admissionStatus;
      document.getElementById('setPhonePrimary').value = cfg.contact.phonePrimary;
      document.getElementById('setPhoneSecondary').value = cfg.contact.phoneSecondary;
      document.getElementById('setEmail').value = cfg.contact.email;
      document.getElementById('setWhatsapp').value = cfg.contact.whatsapp;
      document.getElementById('setTimingsSummer').value = cfg.contact.timingsSummer;
      document.getElementById('setTimingsWinter').value = cfg.contact.timingsWinter;
      document.getElementById('setAddress').value = cfg.contact.address;
      document.getElementById('setStatLegacy').value = cfg.metrics.legacyYears;
      document.getElementById('setStatScholars').value = cfg.metrics.scholarsCount;
      document.getElementById('setStatBoardPass').value = cfg.metrics.boardPass;
      document.getElementById('setPrincipalName').value = cfg.principal.name;
      document.getElementById('setPrincipalQuote').value = cfg.principal.message;
    },

    saveAllSettings: function () {
      this.state.config.schoolName = document.getElementById('setSchoolName').value;
      this.state.config.affiliationNo = document.getElementById('setAffiliation').value;
      this.state.config.sessionYear = document.getElementById('setSession').value;
      this.state.config.admissionStatus = document.getElementById('setAdmissionStatus').value;
      this.state.config.contact.phonePrimary = document.getElementById('setPhonePrimary').value;
      this.state.config.contact.phoneSecondary = document.getElementById('setPhoneSecondary').value;
      this.state.config.contact.email = document.getElementById('setEmail').value;
      this.state.config.contact.whatsapp = document.getElementById('setWhatsapp').value;
      this.state.config.contact.timingsSummer = document.getElementById('setTimingsSummer').value;
      this.state.config.contact.timingsWinter = document.getElementById('setTimingsWinter').value;
      this.state.config.contact.address = document.getElementById('setAddress').value;
      this.state.config.metrics.legacyYears = document.getElementById('setStatLegacy').value;
      this.state.config.metrics.scholarsCount = document.getElementById('setStatScholars').value;
      this.state.config.metrics.boardPass = document.getElementById('setStatBoardPass').value;
      this.state.config.principal.name = document.getElementById('setPrincipalName').value;
      this.state.config.principal.message = document.getElementById('setPrincipalQuote').value;

      this.saveConfig();
      this.saveAudit('Updated Live School CMS Settings');
      this.toast('All School Settings & Live Content updated successfully!', 'success');
    },

    // GALLERY & SCRAPBOOK CATALOG
    renderGalleryCatalog: function () {
      const searchVal = (document.getElementById('gallerySearchInput')?.value || '').toLowerCase();
      const catFilter = document.getElementById('galleryCategoryFilter')?.value || 'all';

      const filtered = this.state.gallery.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchVal) ||
          p.desc.toLowerCase().includes(searchVal) ||
          p.src.toLowerCase().includes(searchVal);
        const matchesCat = catFilter === 'all' || p.cat === catFilter;
        return matchesSearch && matchesCat;
      });

      const countEl = document.getElementById('galleryFilterCount');
      if (countEl) countEl.textContent = `Showing ${filtered.length} of ${this.state.gallery.length} Archival Photographs`;

      const container = document.getElementById('galleryGridContainer');
      if (!container) return;

      container.innerHTML = filtered.slice(0, 48).map(p => `
        <div class="gallery-card">
          <div class="gallery-thumb-wrap">
            <img src="${p.src}" alt="${p.title}" loading="lazy" onerror="this.src='assets/logo-badge.png'">
            <span class="gallery-cat-pill">${p.catLabel || p.cat}</span>
          </div>
          <div class="gallery-card-body">
            <div class="gallery-card-title" title="${p.title}">${p.title}</div>
            <div class="gallery-card-desc">${p.desc}</div>
            <div class="gallery-card-footer">
              <span style="font-family:var(--font-mono);font-size:0.62rem;color:#64748B;">#${p.id}</span>
              <div class="row-actions">
                <button type="button" class="btn-icon" onclick="window.DPSAdmin.editPhotoDetail(${p.id})" title="Edit Title/Caption">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button type="button" class="btn-icon" style="color:#DC2626;" onclick="window.DPSAdmin.deletePhoto(${p.id})" title="Delete Photo">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    },

    editPhotoDetail: function (photoId) {
      const p = this.state.gallery.find(item => item.id === photoId);
      if (!p) return;
      const newTitle = prompt('Edit Photograph Title:', p.title);
      if (newTitle !== null) {
        p.title = newTitle;
        const newDesc = prompt('Edit Photograph Description / Archival Notes:', p.desc);
        if (newDesc !== null) p.desc = newDesc;
        this.saveGallery();
        this.saveAudit(`Updated photo #${photoId} title & description`);
        this.toast(`Photo #${photoId} updated successfully.`, 'success');
        this.renderGalleryCatalog();
      }
    },

    deletePhoto: function (photoId) {
      if (!confirm(`Are you sure you want to remove photograph #${photoId} from the gallery?`)) return;
      this.state.gallery = this.state.gallery.filter(p => p.id !== photoId);
      this.saveGallery();
      this.saveAudit(`Removed photo #${photoId} from gallery catalog`);
      this.toast(`Photo #${photoId} removed.`, 'info');
      this.renderGalleryCatalog();
      this.updateCounters();
    },


    // ==================== NEWS & MEDIA PORTAL ====================
    switchNewsSubTab: function (subTab) {
      this.state.newsSubTab = subTab;
      document.querySelectorAll('.news-sub-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-newstab') === subTab);
      });
      document.querySelectorAll('.news-sub-panel').forEach(p => {
        if (p.id === 'news-sub-' + subTab) {
          p.style.display = 'block';
          p.classList.add('active');
        } else {
          p.style.display = 'none';
          p.classList.remove('active');
        }
      });

      if (subTab === 'circulars') this.renderCircularsTable();
      else if (subTab === 'toppers') this.renderToppers();
      else if (subTab === 'cuttings') this.renderCuttings();
      else if (subTab === 'broadcast') this.renderNoticeManager();
    },

    renderNewsPortal: function () {
      this.switchNewsSubTab(this.state.newsSubTab || 'circulars');
    },

    // TOPPERS MANAGEMENT
    renderToppers: function () {
      const container = document.getElementById('toppersGridContainer');
      const badge = document.getElementById('toppersCountBadge');
      if (badge) badge.textContent = `${this.state.toppers.length} Merit Champions`;
      if (!container) return;

      if (!this.state.toppers || !this.state.toppers.length) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#64748B;">No board toppers currently configured. Click "+ Add Board Topper" to publish one.</div>';
        return;
      }

      container.innerHTML = this.state.toppers.map(t => `
        <div class="topper-admin-card">
          <div>
            <div class="topper-admin-header">
              <img src="${t.image}" alt="${t.name}" class="topper-admin-avatar" onerror="this.src='assets/photos/board-merit-toppers.jpg'">
              <div>
                <div class="topper-admin-name">${t.name}</div>
                <div class="topper-admin-exam">${t.exam}</div>
              </div>
            </div>

            <div class="topper-score-strip">
              <span class="topper-score-pct">${t.percentage}</span>
              <span class="topper-score-rank">${t.rank}</span>
            </div>

            <div class="topper-accolades">
              ${t.accolades}
            </div>
          </div>

          <div class="topper-card-footer">
            <span>Session: <strong>${t.year}</strong></span>
            <button type="button" class="btn-icon" style="color:#DC2626;" onclick="window.DPSAdmin.deleteTopper('${t.id}')" title="Delete Topper">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      `).join('');
    },

    openAddTopperModal: function () {
      const nextNum = ((this.state.toppers ? this.state.toppers.length : 0) + 1).toString().padStart(2, '0');
      document.getElementById('newTopperName').value = '';
      document.getElementById('newTopperPercentage').value = '';
      document.getElementById('newTopperRank').value = 'District Merit Rank';
      document.getElementById('newTopperYear').value = '2025–26';
      document.getElementById('newTopperAccolades').value = '';
      document.getElementById('addTopperModal')?.classList.add('active');
    },

    submitNewTopper: function () {
      const name = document.getElementById('newTopperName')?.value.trim();
      const exam = document.getElementById('newTopperExam')?.value || 'RBSE Class XII (Science Stream)';
      const percentage = document.getElementById('newTopperPercentage')?.value.trim();
      const rank = document.getElementById('newTopperRank')?.value.trim() || 'Merit Distinction';
      const year = document.getElementById('newTopperYear')?.value.trim() || '2025–26';
      const image = document.getElementById('newTopperImage')?.value.trim() || 'assets/photos/board-merit-toppers.jpg';
      const accolades = document.getElementById('newTopperAccolades')?.value.trim() || 'Distinction scholar with academic honors.';

      if (!name || !percentage) {
        this.toast('Please provide student name and percentage score.', 'error');
        return;
      }

      const newId = 'TOP-2026-' + (this.state.toppers.length + 1).toString().padStart(2, '0');
      const newTopper = {
        id: newId,
        name: name,
        exam: exam,
        percentage: percentage,
        rank: rank,
        year: year,
        image: image,
        accolades: accolades,
        status: 'Active'
      };

      this.state.toppers.unshift(newTopper);
      this.saveToppers();
      this.saveAudit(`Added Board Merit Topper: ${name} (${exam} - ${percentage})`);
      this.toast(`Board Topper ${name} added successfully!`, 'success');
      this.renderToppers();
      this.renderDashboard();
      document.getElementById('addTopperModal')?.classList.remove('active');
    },

    deleteTopper: function (id) {
      if (!confirm(`Delete topper entry ${id}?`)) return;
      this.state.toppers = this.state.toppers.filter(t => t.id !== id);
      this.saveToppers();
      this.saveAudit(`Deleted topper record ${id}`);
      this.toast('Board topper record removed.', 'info');
      this.renderToppers();
      this.renderDashboard();
    },

    // NEWSPAPER PRESS CLIPPINGS
    renderCuttings: function () {
      const container = document.getElementById('cuttingsGridContainer');
      const badge = document.getElementById('cuttingsCountBadge');
      if (badge) badge.textContent = `${this.state.cuttings.length} Press Articles`;
      if (!container) return;

      if (!this.state.cuttings || !this.state.cuttings.length) {
        container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#64748B;">No press clippings published. Click "+ Add Press Clipping" to feature one.</div>';
        return;
      }

      container.innerHTML = this.state.cuttings.map(c => `
        <div class="cutting-admin-card">
          <div class="cutting-card-img-wrap">
            <img src="${c.image}" alt="${c.title}" class="cutting-card-img" onerror="this.src='assets/photos/board-merit-toppers.jpg'">
          </div>
          <div class="cutting-card-body">
            <div class="cutting-meta-pill">${c.newspaper} • ${c.date}</div>
            <div class="cutting-title">${c.title}</div>
            <div class="cutting-synopsis">${c.synopsis}</div>
            <div class="cutting-card-footer">
              <span style="font-family:var(--font-mono);">${c.id}</span>
              <button type="button" class="btn-icon" style="color:#DC2626;" onclick="window.DPSAdmin.deleteCutting('${c.id}')" title="Delete Clipping">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    },

    openAddCuttingModal: function () {
      document.getElementById('newCuttingTitle').value = '';
      document.getElementById('newCuttingNewspaper').value = 'दैनिक भास्कर (Dainik Bhaskar)';
      document.getElementById('newCuttingDate').value = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      document.getElementById('newCuttingSynopsis').value = '';
      document.getElementById('addCuttingModal')?.classList.add('active');
    },

    submitNewCutting: function () {
      const title = document.getElementById('newCuttingTitle')?.value.trim();
      const newspaper = document.getElementById('newCuttingNewspaper')?.value.trim() || 'State Press';
      const date = document.getElementById('newCuttingDate')?.value.trim() || new Date().toLocaleDateString();
      const image = document.getElementById('newCuttingImage')?.value.trim() || 'assets/photos/board-merit-toppers.jpg';
      const synopsis = document.getElementById('newCuttingSynopsis')?.value.trim() || title;

      if (!title) {
        this.toast('Please provide clipping headline.', 'error');
        return;
      }

      const newId = 'CUT-' + (this.state.cuttings.length + 1).toString().padStart(2, '0');
      const newCutting = {
        id: newId,
        title: title,
        newspaper: newspaper,
        date: date,
        image: image,
        synopsis: synopsis
      };

      this.state.cuttings.unshift(newCutting);
      this.saveCuttings();
      this.saveAudit(`Added press clipping: ${title} (${newspaper})`);
      this.toast('Newspaper clipping published to news feed!', 'success');
      this.renderCuttings();
      this.renderDashboard();
      document.getElementById('addCuttingModal')?.classList.remove('active');
    },

    deleteCutting: function (id) {
      if (!confirm(`Delete clipping ${id}?`)) return;
      this.state.cuttings = this.state.cuttings.filter(c => c.id !== id);
      this.saveCuttings();
      this.saveAudit(`Deleted press clipping ${id}`);
      this.toast('Press clipping deleted.', 'info');
      this.renderCuttings();
      this.renderDashboard();
    },

    saveTickerText: function () {
      const input = document.getElementById('tickerLiveInput');
      if (!input) return;
      const val = input.value.trim();
      if (!val) {
        this.toast('Please enter scrolling marquee ticker text.', 'error');
        return;
      }
      localStorage.setItem('dps_ticker_items', JSON.stringify([val]));
      this.state.config.noticeBanner.message = val;
      this.saveConfig();
      this.saveAudit('Updated Live Scrolling Marquee Top Ticker');
      this.toast('Live scrolling top ticker updated immediately across website!', 'success');
    },

    // CIRCULARS & NOTICES
    renderCircularsTable: function () {
      const tbody = document.getElementById('circularsTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.state.circulars.map(c => `
        <tr>
          <td><strong>${c.id}</strong></td>
          <td><strong>${c.title}</strong></td>
          <td><span class="badge-status status-interview">${c.category}</span></td>
          <td>${c.date}</td>
          <td><span class="badge-status status-admitted">${c.status}</span></td>
          <td>
            <div class="row-actions">
              <a href="${c.fileUrl}" target="_blank" class="btn btn-sm btn-outline">View File</a>
              <button class="btn-icon" style="color:#DC2626;" onclick="window.DPSAdmin.deleteCircular('${c.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    },

    deleteCircular: function (id) {
      if (!confirm(`Delete circular ${id}?`)) return;
      this.state.circulars = this.state.circulars.filter(c => c.id !== id);
      this.saveCirculars();
      this.saveAudit(`Deleted circular ${id}`);
      this.toast(`Circular ${id} deleted.`, 'info');
      this.renderCircularsTable();
    },

    // FACULTY ROSTER
    renderFacultyTable: function () {
      const tbody = document.getElementById('facultyTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.state.faculty.map(f => `
        <tr>
          <td><strong>${f.id}</strong></td>
          <td><strong>${f.name}</strong></td>
          <td>${f.designation}</td>
          <td><span class="badge-status" style="background:#F1F5F9;color:#334155;">${f.dept}</span></td>
          <td>${f.qual}</td>
          <td>${f.exp}</td>
          <td>
            <button class="btn-icon" style="color:#DC2626;" onclick="window.DPSAdmin.deleteFaculty('${f.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </td>
        </tr>
      `).join('');
    },

    deleteFaculty: function (id) {
      if (!confirm(`Remove staff member ${id}?`)) return;
      this.state.faculty = this.state.faculty.filter(f => f.id !== id);
      this.saveFaculty();
      this.saveAudit(`Removed faculty profile ${id}`);
      this.toast('Faculty profile removed.', 'info');
      this.renderFacultyTable();
    },

    // CONTACT INQUIRIES
    renderContactsTable: function () {
      const tbody = document.getElementById('contactsTableBody');
      if (!tbody) return;
      tbody.innerHTML = this.state.contacts.map(m => `
        <tr>
          <td><strong>${m.id}</strong><br><span style="font-size:0.68rem;color:#94A3B8;">${m.date}</span></td>
          <td><strong>${m.name}</strong><br><span style="font-size:0.72rem;color:#64748B;">${m.role}</span></td>
          <td>${m.phone}<br><span style="font-size:0.70rem;color:#94A3B8;">${m.email}</span></td>
          <td style="max-width:300px;"><div style="font-size:0.78rem;line-height:1.35;">${m.message}</div></td>
          <td><span class="badge-status ${m.status === 'Unread' ? 'status-new' : 'status-admitted'}">${m.status}</span></td>
          <td>
            <div class="row-actions">
              <a href="https://wa.me/${m.phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn-icon btn-whatsapp-action" title="Reply on WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <button class="btn-icon" style="color:#DC2626;" onclick="window.DPSAdmin.deleteContact('${m.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    },

    deleteContact: function (id) {
      this.state.contacts = this.state.contacts.filter(c => c.id !== id);
      this.saveContacts();
      this.saveAudit(`Deleted public contact message ${id}`);
      this.toast('Message removed.', 'info');
      this.renderContactsTable();
      this.updateCounters();
    },

    // BACKUPS & AUDIT
    renderAuditLogs: function () {
      const list = document.getElementById('auditLogsList');
      if (!list) return;
      list.innerHTML = this.state.audit.map(a => `
        <div style="display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #E2E8F0;font-size:0.78rem;">
          <span style="color:#2E0815;font-weight:600;">${a.action}</span>
          <span style="font-family:var(--font-mono);color:#64748B;font-size:0.70rem;">${a.timestamp}</span>
        </div>
      `).join('');
    },

    exportFullBackupJSON: function () {
      const fullBackup = {
        exportedAt: new Date().toISOString(),
        school: 'Durga Public School, Pilani',
        leads: this.state.leads,
        config: this.state.config,
        houses: this.state.houses,
        gallery: this.state.gallery,
        circulars: this.state.circulars,
        faculty: this.state.faculty,
        contacts: this.state.contacts,
        audit: this.state.audit
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', `DPS_Full_System_Backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.toast('Complete System Backup downloaded successfully.', 'success');
      this.saveAudit('Downloaded complete system backup JSON');
    },

    restoreBackupJSON: function (event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      const self = this;
      reader.onload = function (e) {
        try {
          const parsed = JSON.parse(e.target.result);
          if (!parsed.leads && !parsed.config) {
            alert('Invalid backup file format.');
            return;
          }
          if (confirm('Restore backup? All current records will be replaced with the backup file data.')) {
            if (parsed.leads) self.state.leads = parsed.leads;
            if (parsed.config) self.state.config = parsed.config;
            if (parsed.houses) self.state.houses = parsed.houses;
            if (parsed.gallery) self.state.gallery = parsed.gallery;
            if (parsed.circulars) self.state.circulars = parsed.circulars;
            if (parsed.faculty) self.state.faculty = parsed.faculty;
            if (parsed.contacts) self.state.contacts = parsed.contacts;

            self.saveLeads();
            self.saveConfig();
            self.saveHouses();
            self.saveGallery();
            self.saveCirculars();
            self.saveFaculty();
            self.saveContacts();
            self.saveAudit('Restored complete system backup from file');

            self.toast('System backup restored successfully!', 'success');
            self.render();
          }
        } catch (err) {
          alert('Failed to parse backup JSON file: ' + err.message);
        }
      };
      reader.readAsText(file);
    },

    resetToFactoryData: function () {
      if (!confirm('DANGER: Reset all administration and site data to factory sample state? Any unsaved edits will be cleared.')) return;

      this.state.leads = DEFAULT_LEADS;
      this.state.config = DEFAULT_CONFIG;
      this.state.houses = DEFAULT_HOUSES;
      this.state.gallery = RAW_GALLERY;
      this.state.circulars = DEFAULT_CIRCULARS;
      this.state.faculty = DEFAULT_FACULTY;
      this.state.contacts = DEFAULT_CONTACTS;

      this.saveLeads();
      this.saveConfig();
      this.saveHouses();
      this.saveGallery();
      this.saveCirculars();
      this.saveFaculty();
      this.saveContacts();
      this.saveAudit('Reset all data to default factory templates');

      this.toast('System reset to default templates.', 'info');
      this.render();
    },


    // ==================== NEW FULL CRUD EXTENSIONS ====================
    openAddLeadModal: function () {
      const studentEl = document.getElementById('newLeadStudent');
      if (studentEl) studentEl.value = '';
      const gradeEl = document.getElementById('newLeadGrade');
      if (gradeEl) gradeEl.value = 'Class 11 Science';
      const parentEl = document.getElementById('newLeadParent');
      if (parentEl) parentEl.value = '';
      const phoneEl = document.getElementById('newLeadPhone');
      if (phoneEl) phoneEl.value = '';
      const emailEl = document.getElementById('newLeadEmail');
      if (emailEl) emailEl.value = '';
      const statusEl = document.getElementById('newLeadStatus');
      if (statusEl) statusEl.value = 'New';
      const msgEl = document.getElementById('newLeadMessage');
      if (msgEl) msgEl.value = '';
      document.getElementById('addLeadModal')?.classList.add('active');
    },

    submitNewLead: function () {
      const student = document.getElementById('newLeadStudent')?.value.trim();
      const parent = document.getElementById('newLeadParent')?.value.trim();
      const phone = document.getElementById('newLeadPhone')?.value.trim();
      if (!student || !parent || !phone) {
        this.toast('Please provide Student Name, Parent Name, and Phone.', 'error');
        return;
      }
      const grade = document.getElementById('newLeadGrade')?.value || 'Class 1';
      const email = document.getElementById('newLeadEmail')?.value.trim() || '';
      const status = document.getElementById('newLeadStatus')?.value || 'New';
      const msg = document.getElementById('newLeadMessage')?.value.trim() || 'Direct application created via Admin Portal';

      const randId = Math.floor(1000 + Math.random() * 9000);
      const newLead = {
        id: 'DPS-2026-' + randId,
        studentName: student,
        grade: grade,
        parentName: parent,
        phone: phone,
        email: email,
        address: 'Pilani, Rajasthan',
        message: msg,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        status: status,
        source: 'Admin Direct Entry',
        notes: ['Application created manually in Admin Console on ' + new Date().toLocaleDateString()]
      };

      this.state.leads.unshift(newLead);
      this.saveLeads();
      this.saveAudit('Created new admission lead ' + newLead.id + ' for ' + student + ' (' + grade + ')');
      this.toast('Application ' + newLead.id + ' created successfully!', 'success');
      this.updateCounters();
      this.renderLeadsTable();
      document.getElementById('addLeadModal')?.classList.remove('active');
    },

    deleteLeadFromModal: function () {
      const modal = document.getElementById('leadDetailModal');
      const leadId = modal.getAttribute('data-current-id');
      if (!leadId) return;
      if (!confirm('Are you sure you want to permanently delete application ' + leadId + '?')) return;
      this.state.leads = this.state.leads.filter(l => l.id !== leadId);
      this.saveLeads();
      this.saveAudit('Deleted admission lead ' + leadId + ' from modal view');
      this.toast('Record ' + leadId + ' deleted.', 'info');
      this.updateCounters();
      this.renderLeadsTable();
      modal.classList.remove('active');
    },

    openAddCircularModal: function () {
      const nextNum = (this.state.circulars.length + 1).toString().padStart(2, '0');
      document.getElementById('newCircId').value = 'CIRC-2026-' + nextNum;
      document.getElementById('newCircTitle').value = '';
      document.getElementById('newCircCategory').value = 'General';
      document.getElementById('newCircDate').value = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      document.getElementById('newCircStatus').value = 'Active';
      document.getElementById('newCircUrl').value = 'assets/docs/Fee-Structure-2026-27.pdf';
      document.getElementById('addCircularModal')?.classList.add('active');
    },

    submitNewCircular: function () {
      const id = document.getElementById('newCircId')?.value.trim();
      const title = document.getElementById('newCircTitle')?.value.trim();
      if (!id || !title) {
        this.toast('Please provide Circular Reference ID and Title.', 'error');
        return;
      }
      const category = document.getElementById('newCircCategory')?.value || 'General';
      const date = document.getElementById('newCircDate')?.value.trim() || new Date().toLocaleDateString();
      const status = document.getElementById('newCircStatus')?.value || 'Active';
      const fileUrl = document.getElementById('newCircUrl')?.value.trim() || '#';

      this.state.circulars.unshift({ id, title, category, date, fileUrl, status });
      this.saveCirculars();
      this.saveAudit('Published new circular ' + id + ': "' + title + '"');
      this.toast('Circular ' + id + ' published successfully!', 'success');
      this.renderCircularsTable();
      document.getElementById('addCircularModal')?.classList.remove('active');
    },

    openAddFacultyModal: function () {
      const nextNum = (this.state.faculty.length + 1).toString().padStart(2, '0');
      document.getElementById('newFacId').value = 'FAC-' + nextNum;
      document.getElementById('newFacName').value = '';
      document.getElementById('newFacDesignation').value = '';
      document.getElementById('newFacDept').value = 'Humanities & Languages';
      document.getElementById('newFacQual').value = '';
      document.getElementById('newFacExp').value = '';
      document.getElementById('addFacultyModal')?.classList.add('active');
    },

    submitNewFaculty: function () {
      const id = document.getElementById('newFacId')?.value.trim();
      const name = document.getElementById('newFacName')?.value.trim();
      const designation = document.getElementById('newFacDesignation')?.value.trim();
      if (!id || !name || !designation) {
        this.toast('Please provide Faculty ID, Name, and Designation.', 'error');
        return;
      }
      const dept = document.getElementById('newFacDept')?.value || 'Science';
      const qual = document.getElementById('newFacQual')?.value.trim() || 'Post Graduate';
      const exp = document.getElementById('newFacExp')?.value.trim() || '5+ Years';

      this.state.faculty.push({ id, name, designation, dept, qual, exp });
      this.saveFaculty();
      this.saveAudit('Added faculty profile ' + id + ' (' + name + ')');
      this.toast('Faculty member ' + name + ' added!', 'success');
      this.renderFacultyTable();
      document.getElementById('addFacultyModal')?.classList.remove('active');
    },

    openAddPhotoModal: function () {
      document.getElementById('newPhotoTitle').value = '';
      document.getElementById('newPhotoCat').value = 'campus';
      document.getElementById('newPhotoSrc').value = 'assets/photos/karate-students-ground.jpg';
      document.getElementById('newPhotoDesc').value = '';
      document.getElementById('addPhotoModal')?.classList.add('active');
    },

    submitNewPhoto: function () {
      const title = document.getElementById('newPhotoTitle')?.value.trim();
      const src = document.getElementById('newPhotoSrc')?.value.trim();
      if (!title || !src) {
        this.toast('Please provide Photo Title and Image URL/Path.', 'error');
        return;
      }
      const cat = document.getElementById('newPhotoCat')?.value || 'campus';
      const catLabels = {
        campus: 'Campus & Architecture',
        sports: 'Sports Day & Athletics',
        republic: 'Republic & Independence Day',
        saraswati: 'Saraswati Puja & Assemblies',
        labs: 'Science Labs & IT',
        classroom: 'Classroom Life & Activities'
      };
      const desc = document.getElementById('newPhotoDesc')?.value.trim() || 'Campus life archival capture at Durga Public School, Pilani.';
      const newId = (this.state.gallery.length > 0 ? Math.max(...this.state.gallery.map(g => g.id || 0)) + 1 : 1);

      this.state.gallery.unshift({
        id: newId,
        title: title,
        cat: cat,
        catLabel: catLabels[cat] || cat,
        src: src,
        desc: desc
      });

      this.saveGallery();
      this.saveAudit('Added photograph #' + newId + ' to gallery (' + title + ')');
      this.toast('Photograph #' + newId + ' added to gallery!', 'success');
      this.updateCounters();
      this.renderGalleryCatalog();
      document.getElementById('addPhotoModal')?.classList.remove('active');
    },

    openAddContactModal: function () {
      document.getElementById('newContactName').value = '';
      document.getElementById('newContactRole').value = 'Prospective Parent';
      document.getElementById('newContactPhone').value = '';
      document.getElementById('newContactEmail').value = '';
      document.getElementById('newContactMessage').value = '';
      document.getElementById('addContactModal')?.classList.add('active');
    },

    submitNewContact: function () {
      const name = document.getElementById('newContactName')?.value.trim();
      const phone = document.getElementById('newContactPhone')?.value.trim();
      const message = document.getElementById('newContactMessage')?.value.trim();
      if (!name || !phone || !message) {
        this.toast('Please provide Name, Phone, and Inquiry Message.', 'error');
        return;
      }
      const role = document.getElementById('newContactRole')?.value || 'Prospective Parent';
      const email = document.getElementById('newContactEmail')?.value.trim() || '';
      const randId = Math.floor(100 + Math.random() * 900);
      const newMsg = {
        id: 'MSG-2026-' + randId,
        name: name,
        role: role,
        phone: phone,
        email: email,
        message: message,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Unread'
      };

      this.state.contacts.unshift(newMsg);
      this.saveContacts();
      this.saveAudit('Logged visitor inquiry ' + newMsg.id + ' from ' + name);
      this.toast('Inquiry ' + newMsg.id + ' recorded!', 'success');
      this.updateCounters();
      this.renderContactsTable();
      document.getElementById('addContactModal')?.classList.remove('active');
    },

    clearNoticeBanner: function () {
      this.state.config.noticeBanner.enabled = false;
      this.state.config.noticeBanner.message = '';
      const toggle = document.getElementById('noticeToggle');
      if (toggle) toggle.checked = false;
      const msgInput = document.getElementById('noticeMessage');
      if (msgInput) msgInput.value = '';
      this.saveConfig();
      this.saveAudit('Disabled live top alert banner across website');
      this.toast('Live Alert Banner cleared and disabled.', 'info');
      this.updateNoticePreview();
    },

    openAwardPointsModal: function (houseKey) {
      if (houseKey && document.getElementById('awardHouseSelect')) {
        document.getElementById('awardHouseSelect').value = houseKey;
      }
      if (document.getElementById('awardHousePoints')) {
        document.getElementById('awardHousePoints').value = '10';
      }
      if (document.getElementById('awardHouseEvent')) {
        document.getElementById('awardHouseEvent').value = '';
      }
      document.getElementById('awardPointsModal')?.classList.add('active');
    },

    submitAwardPoints: function () {
      const houseKey = document.getElementById('awardHouseSelect')?.value || 'vivekanand';
      const cat = document.getElementById('awardHouseCategory')?.value || 'athletics';
      const pts = parseInt(document.getElementById('awardHousePoints')?.value, 10) || 0;
      const eventName = document.getElementById('awardHouseEvent')?.value.trim() || 'Competition Points';

      const house = this.state.houses[houseKey];
      if (!house) return;

      house[cat] = Math.max(0, (house[cat] || 0) + pts);
      house.total = (house.athletics || 0) + (house.academics || 0) + (house.cultural || 0) + (house.discipline || 0);

      this.saveHouses();
      this.saveAudit('Awarded ' + (pts > 0 ? '+' : '') + pts + ' points to ' + house.name + ' (' + cat + ') for ' + eventName);
      this.toast((pts > 0 ? '+' : '') + pts + ' pts awarded to ' + house.name + '!', 'success');
      this.renderHouseLeaderboard();
      this.renderDashboard();
      document.getElementById('awardPointsModal')?.classList.remove('active');
    },

    // TOAST NOTIFICATIONS
    toast: function (msg, type) {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const el = document.createElement('div');
      el.className = 'toast toast-' + (type || 'info');
      el.innerHTML = `
        <span>${type === 'success' ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>' : (type === 'error' ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>')}</span>
        <span>${msg}</span>
      `;
      container.appendChild(el);
      setTimeout(function () {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => el.remove(), 250);
      }, 3500);
    },

    bindEvents: function () {
      const self = this;

      // Nav Tab items
      document.querySelectorAll('.nav-item[data-tab]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          const tabId = btn.getAttribute('data-tab');
          self.switchTab(tabId);
        });
      });

      // Mobile Sidebar Toggle
      document.getElementById('sidebarToggleBtn')?.addEventListener('click', function () {
        document.getElementById('adminSidebar')?.classList.toggle('open');
        document.getElementById('sidebarBackdrop')?.classList.toggle('active');
      });

      document.getElementById('sidebarBackdrop')?.addEventListener('click', function () {
        document.getElementById('adminSidebar')?.classList.remove('open');
        document.getElementById('sidebarBackdrop')?.classList.remove('active');
      });


      // Mobile Bottom Dock Items
      document.querySelectorAll('.mobile-dock-item[data-tab]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          const tabId = btn.getAttribute('data-tab');
          self.switchTab(tabId);
        });
      });

      // Mobile Dock "More / Menu" Toggle
      document.getElementById('btnOpenMobileMenu')?.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('adminSidebar')?.classList.toggle('open');
        document.getElementById('sidebarBackdrop')?.classList.toggle('active');
      });

      // Mobile Sidebar Close Button (X)
      document.getElementById('sidebarCloseBtn')?.addEventListener('click', function () {
        document.getElementById('adminSidebar')?.classList.remove('open');
        document.getElementById('sidebarBackdrop')?.classList.remove('active');
      });

      // Leads Search & Filters
      document.getElementById('leadsSearchInput')?.addEventListener('input', () => self.renderLeadsTable());
      document.getElementById('leadsStatusFilter')?.addEventListener('change', () => self.renderLeadsTable());
      document.getElementById('leadsGradeFilter')?.addEventListener('change', () => self.renderLeadsTable());

      // Gallery Search & Filter
      document.getElementById('gallerySearchInput')?.addEventListener('input', () => self.renderGalleryCatalog());
      document.getElementById('galleryCategoryFilter')?.addEventListener('change', () => self.renderGalleryCatalog());

      // Notice Form
      document.getElementById('noticeToggle')?.addEventListener('change', () => self.updateNoticePreview());
      document.getElementById('noticeMessage')?.addEventListener('input', () => self.updateNoticePreview());
      document.getElementById('noticeLink')?.addEventListener('input', () => self.updateNoticePreview());

      // Login Form
      document.getElementById('adminLoginForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const pass = document.getElementById('adminLoginPassword').value;
        self.login(pass);
      });

      document.getElementById('btnQuickDefaultLogin')?.addEventListener('click', function () {
        self.login('dps@admin2026');
      });

      document.getElementById('adminLogoutBtn')?.addEventListener('click', function () {
        self.logout();
      });

      // Hash Navigation on Load
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById('view-' + hash)) {
        self.switchTab(hash);
      }
    }
  };

  // Expose to window
  window.DPSAdmin = DPSAdmin;

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DPSAdmin.init());
  } else {
    DPSAdmin.init();
  }
})();
