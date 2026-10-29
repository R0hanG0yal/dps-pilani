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
    affiliationNo: '1730419',
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
      name: 'Dr. S. K. Sharma',
      qualifications: 'M.Sc., M.Ed., Ph.D.',
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
      title: 'CBSE Secondary & Senior Secondary Practical Examination Guidelines',
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

  const DEFAULT_FACULTY = [
    {
      id: 'FAC-01',
      name: 'Dr. S. K. Sharma',
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
      name: 'Mr. Rajesh Kumar Saini',
      designation: 'PGT Mathematics & Senior Coordinator',
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

  const RAW_GALLERY = [{"id":1,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 01","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-001.jpg","featured":true},{"id":2,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 02","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-002.jpg","featured":true},{"id":3,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 03","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-003.jpg","featured":true},{"id":4,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 04","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-004.jpeg","featured":true},{"id":5,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 05","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-005.jpg","featured":true},{"id":6,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 06","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-006.jpg","featured":true},{"id":7,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 07","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-007.jpg","featured":false},{"id":8,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 08","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-008.jpg","featured":false},{"id":9,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 09","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-009.jpg","featured":false},{"id":10,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 10","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-010.jpg","featured":false},{"id":11,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 11","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-011.jpg","featured":false},{"id":12,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 12","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-012.jpg","featured":false},{"id":13,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 13","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-013.jpg","featured":false},{"id":14,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 14","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-014.jpg","featured":false},{"id":15,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 15","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-015.jpg","featured":false},{"id":16,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 16","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-016.jpg","featured":false},{"id":17,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 17","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-017.jpg","featured":false},{"id":18,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 18","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-018.jpg","featured":false},{"id":19,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 19","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-019.jpg","featured":false},{"id":20,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 20","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-020.jpg","featured":false},{"id":21,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 21","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-021.jpg","featured":false},{"id":22,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 22","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-022.jpg","featured":false},{"id":23,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 23","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-023.jpg","featured":false},{"id":24,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 24","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-024.jpg","featured":false},{"id":25,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 25","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-025.jpg","featured":false},{"id":26,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 26","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-026.jpg","featured":false},{"id":27,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 27","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-027.jpg","featured":false},{"id":28,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 28","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-028.jpg","featured":false},{"id":29,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 29","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-029.jpg","featured":false},{"id":30,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 30","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-030.jpg","featured":false},{"id":31,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 31","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-031.jpg","featured":false},{"id":32,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 32","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-032.jpg","featured":false},{"id":33,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 33","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-033.jpg","featured":false},{"id":34,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 34","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-034.jpg","featured":false},{"id":35,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 35","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-035.jpg","featured":false},{"id":36,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Campus Greens & Lawns","title":"Campus & Architecture · Print 36","desc":"Archival photograph from the Durga Public School heritage collection, documenting campus greens & lawns at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-036.jpg","featured":false},{"id":37,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Portals & Facades","title":"Campus & Architecture · Print 37","desc":"Archival photograph from the Durga Public School heritage collection, documenting portals & facades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-037.jpg","featured":false},{"id":38,"cat":"campus","catLabel":"Campus & Architecture","subcat":"Pillared Colonnades","title":"Campus & Architecture · Print 38","desc":"Archival photograph from the Durga Public School heritage collection, documenting pillared colonnades at the Pilani campus.","src":"assets/photos/scrapbook/campus/campus-038.jpg","featured":false},{"id":39,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 01","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-001.jpg","featured":false},{"id":40,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 02","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-002.jpg","featured":false},{"id":41,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 03","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-003.jpeg","featured":false},{"id":42,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 04","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-004.jpeg","featured":false},{"id":43,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 05","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-005.jpeg","featured":false},{"id":44,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 06","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-006.jpeg","featured":false},{"id":45,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 07","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-007.jpeg","featured":false},{"id":46,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 08","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-008.jpeg","featured":false},{"id":47,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 09","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-009.jpeg","featured":false},{"id":48,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 10","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-010.jpeg","featured":false},{"id":49,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 11","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-011.jpeg","featured":false},{"id":50,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 12","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-012.jpeg","featured":false},{"id":51,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 13","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-013.jpeg","featured":false},{"id":52,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 14","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-014.jpeg","featured":false},{"id":53,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 15","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-015.jpeg","featured":false},{"id":54,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 16","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-016.jpeg","featured":false},{"id":55,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 17","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-017.jpeg","featured":false},{"id":56,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 18","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-018.jpeg","featured":false},{"id":57,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 19","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-019.jpeg","featured":false},{"id":58,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 20","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-020.jpeg","featured":false},{"id":59,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 21","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-021.jpeg","featured":false},{"id":60,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 22","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-022.jpeg","featured":false},{"id":61,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 23","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-023.jpeg","featured":false},{"id":62,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 24","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-024.jpeg","featured":false},{"id":63,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 25","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-025.jpeg","featured":false},{"id":64,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 26","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-026.jpeg","featured":false},{"id":65,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 27","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-027.jpeg","featured":false},{"id":66,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 28","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-028.jpeg","featured":false},{"id":67,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 29","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-029.jpeg","featured":false},{"id":68,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 30","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-030.jpeg","featured":false},{"id":69,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 31","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-031.jpeg","featured":false},{"id":70,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 32","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-032.jpeg","featured":false},{"id":71,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 33","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-033.jpeg","featured":false},{"id":72,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 34","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-034.jpeg","featured":false},{"id":73,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 35","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-035.jpeg","featured":false},{"id":74,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 36","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-036.jpeg","featured":false},{"id":75,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 37","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-037.jpeg","featured":false},{"id":76,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 38","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-038.jpeg","featured":false},{"id":77,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 39","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-039.jpeg","featured":false},{"id":78,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 40","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-040.jpeg","featured":false},{"id":79,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 41","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-041.jpeg","featured":false},{"id":80,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 42","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-042.jpeg","featured":false},{"id":81,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 43","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-043.jpeg","featured":false},{"id":82,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 44","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-044.jpeg","featured":false},{"id":83,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 45","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-045.jpeg","featured":false},{"id":84,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 46","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-046.jpeg","featured":false},{"id":85,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Primary Interactive Classrooms","title":"Academic Wings & Classrooms · Print 47","desc":"Archival photograph from the Durga Public School heritage collection, documenting primary interactive classrooms at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-047.jpeg","featured":false},{"id":86,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Senior Secondary Study Halls","title":"Academic Wings & Classrooms · Print 48","desc":"Archival photograph from the Durga Public School heritage collection, documenting senior secondary study halls at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-048.jpg","featured":false},{"id":87,"cat":"academics","catLabel":"Academic Wings & Classrooms","subcat":"Junior & Kindergarten Wing","title":"Academic Wings & Classrooms · Print 49","desc":"Archival photograph from the Durga Public School heritage collection, documenting junior & kindergarten wing at the Pilani campus.","src":"assets/photos/scrapbook/academics/academics-049.jpg","featured":false},{"id":88,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Physics Laboratory","title":"Science & Innovation Labs · Print 01","desc":"Archival photograph from the Durga Public School heritage collection, documenting physics laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-001.jpeg","featured":false},{"id":89,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Chemistry Laboratory","title":"Science & Innovation Labs · Print 02","desc":"Archival photograph from the Durga Public School heritage collection, documenting chemistry laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-002.jpeg","featured":false},{"id":90,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Biology Laboratory","title":"Science & Innovation Labs · Print 03","desc":"Archival photograph from the Durga Public School heritage collection, documenting biology laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-003.jpeg","featured":false},{"id":91,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Computer Science IT Hub","title":"Science & Innovation Labs · Print 04","desc":"Archival photograph from the Durga Public School heritage collection, documenting computer science it hub at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-004.jpeg","featured":false},{"id":92,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Mathematics & Logic Lab","title":"Science & Innovation Labs · Print 05","desc":"Archival photograph from the Durga Public School heritage collection, documenting mathematics & logic lab at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-005.jpeg","featured":false},{"id":93,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Music & Performing Arts","title":"Science & Innovation Labs · Print 06","desc":"Archival photograph from the Durga Public School heritage collection, documenting music & performing arts at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-006.jpeg","featured":false},{"id":94,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Library Sanctuary","title":"Science & Innovation Labs · Print 07","desc":"Archival photograph from the Durga Public School heritage collection, documenting library sanctuary at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-007.jpeg","featured":false},{"id":95,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Physics Laboratory","title":"Science & Innovation Labs · Print 08","desc":"Archival photograph from the Durga Public School heritage collection, documenting physics laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-008.jpeg","featured":false},{"id":96,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Chemistry Laboratory","title":"Science & Innovation Labs · Print 09","desc":"Archival photograph from the Durga Public School heritage collection, documenting chemistry laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-009.jpg","featured":false},{"id":97,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Biology Laboratory","title":"Science & Innovation Labs · Print 10","desc":"Archival photograph from the Durga Public School heritage collection, documenting biology laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-010.jpg","featured":false},{"id":98,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Computer Science IT Hub","title":"Science & Innovation Labs · Print 11","desc":"Archival photograph from the Durga Public School heritage collection, documenting computer science it hub at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-011.jpg","featured":false},{"id":99,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Mathematics & Logic Lab","title":"Science & Innovation Labs · Print 12","desc":"Archival photograph from the Durga Public School heritage collection, documenting mathematics & logic lab at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-012.jpg","featured":false},{"id":100,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Music & Performing Arts","title":"Science & Innovation Labs · Print 13","desc":"Archival photograph from the Durga Public School heritage collection, documenting music & performing arts at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-013.jpg","featured":false},{"id":101,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Library Sanctuary","title":"Science & Innovation Labs · Print 14","desc":"Archival photograph from the Durga Public School heritage collection, documenting library sanctuary at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-014.jpg","featured":false},{"id":102,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Physics Laboratory","title":"Science & Innovation Labs · Print 15","desc":"Archival photograph from the Durga Public School heritage collection, documenting physics laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-015.jpg","featured":false},{"id":103,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Chemistry Laboratory","title":"Science & Innovation Labs · Print 16","desc":"Archival photograph from the Durga Public School heritage collection, documenting chemistry laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-016.jpg","featured":false},{"id":104,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Biology Laboratory","title":"Science & Innovation Labs · Print 17","desc":"Archival photograph from the Durga Public School heritage collection, documenting biology laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-017.jpg","featured":false},{"id":105,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Computer Science IT Hub","title":"Science & Innovation Labs · Print 18","desc":"Archival photograph from the Durga Public School heritage collection, documenting computer science it hub at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-018.jpeg","featured":false},{"id":106,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Mathematics & Logic Lab","title":"Science & Innovation Labs · Print 19","desc":"Archival photograph from the Durga Public School heritage collection, documenting mathematics & logic lab at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-019.jpeg","featured":false},{"id":107,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Music & Performing Arts","title":"Science & Innovation Labs · Print 20","desc":"Archival photograph from the Durga Public School heritage collection, documenting music & performing arts at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-020.jpeg","featured":false},{"id":108,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Library Sanctuary","title":"Science & Innovation Labs · Print 21","desc":"Archival photograph from the Durga Public School heritage collection, documenting library sanctuary at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-021.jpeg","featured":false},{"id":109,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Physics Laboratory","title":"Science & Innovation Labs · Print 22","desc":"Archival photograph from the Durga Public School heritage collection, documenting physics laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-022.jpeg","featured":false},{"id":110,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Chemistry Laboratory","title":"Science & Innovation Labs · Print 23","desc":"Archival photograph from the Durga Public School heritage collection, documenting chemistry laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-023.jpeg","featured":false},{"id":111,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Biology Laboratory","title":"Science & Innovation Labs · Print 24","desc":"Archival photograph from the Durga Public School heritage collection, documenting biology laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-024.jpeg","featured":false},{"id":112,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Computer Science IT Hub","title":"Science & Innovation Labs · Print 25","desc":"Archival photograph from the Durga Public School heritage collection, documenting computer science it hub at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-025.jpeg","featured":false},{"id":113,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Mathematics & Logic Lab","title":"Science & Innovation Labs · Print 26","desc":"Archival photograph from the Durga Public School heritage collection, documenting mathematics & logic lab at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-026.jpeg","featured":false},{"id":114,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Music & Performing Arts","title":"Science & Innovation Labs · Print 27","desc":"Archival photograph from the Durga Public School heritage collection, documenting music & performing arts at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-027.jpeg","featured":false},{"id":115,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Library Sanctuary","title":"Science & Innovation Labs · Print 28","desc":"Archival photograph from the Durga Public School heritage collection, documenting library sanctuary at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-028.jpeg","featured":false},{"id":116,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Physics Laboratory","title":"Science & Innovation Labs · Print 29","desc":"Archival photograph from the Durga Public School heritage collection, documenting physics laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-029.jpeg","featured":false},{"id":117,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Chemistry Laboratory","title":"Science & Innovation Labs · Print 30","desc":"Archival photograph from the Durga Public School heritage collection, documenting chemistry laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-030.jpg","featured":false},{"id":118,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Biology Laboratory","title":"Science & Innovation Labs · Print 31","desc":"Archival photograph from the Durga Public School heritage collection, documenting biology laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-031.jpeg","featured":false},{"id":119,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Computer Science IT Hub","title":"Science & Innovation Labs · Print 32","desc":"Archival photograph from the Durga Public School heritage collection, documenting computer science it hub at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-032.jpg","featured":false},{"id":120,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Mathematics & Logic Lab","title":"Science & Innovation Labs · Print 33","desc":"Archival photograph from the Durga Public School heritage collection, documenting mathematics & logic lab at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-033.jpg","featured":false},{"id":121,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Music & Performing Arts","title":"Science & Innovation Labs · Print 34","desc":"Archival photograph from the Durga Public School heritage collection, documenting music & performing arts at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-034.jpg","featured":false},{"id":122,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Library Sanctuary","title":"Science & Innovation Labs · Print 35","desc":"Archival photograph from the Durga Public School heritage collection, documenting library sanctuary at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-035.jpg","featured":false},{"id":123,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Physics Laboratory","title":"Science & Innovation Labs · Print 36","desc":"Archival photograph from the Durga Public School heritage collection, documenting physics laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-036.jpeg","featured":false},{"id":124,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Chemistry Laboratory","title":"Science & Innovation Labs · Print 37","desc":"Archival photograph from the Durga Public School heritage collection, documenting chemistry laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-037.jpeg","featured":false},{"id":125,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Biology Laboratory","title":"Science & Innovation Labs · Print 38","desc":"Archival photograph from the Durga Public School heritage collection, documenting biology laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-038.jpeg","featured":false},{"id":126,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Computer Science IT Hub","title":"Science & Innovation Labs · Print 39","desc":"Archival photograph from the Durga Public School heritage collection, documenting computer science it hub at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-039.jpeg","featured":false},{"id":127,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Mathematics & Logic Lab","title":"Science & Innovation Labs · Print 40","desc":"Archival photograph from the Durga Public School heritage collection, documenting mathematics & logic lab at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-040.jpeg","featured":false},{"id":128,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Music & Performing Arts","title":"Science & Innovation Labs · Print 41","desc":"Archival photograph from the Durga Public School heritage collection, documenting music & performing arts at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-041.jpeg","featured":false},{"id":129,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Library Sanctuary","title":"Science & Innovation Labs · Print 42","desc":"Archival photograph from the Durga Public School heritage collection, documenting library sanctuary at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-042.jpeg","featured":false},{"id":130,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Physics Laboratory","title":"Science & Innovation Labs · Print 43","desc":"Archival photograph from the Durga Public School heritage collection, documenting physics laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-043.jpeg","featured":false},{"id":131,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Chemistry Laboratory","title":"Science & Innovation Labs · Print 44","desc":"Archival photograph from the Durga Public School heritage collection, documenting chemistry laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-044.jpg","featured":false},{"id":132,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Biology Laboratory","title":"Science & Innovation Labs · Print 45","desc":"Archival photograph from the Durga Public School heritage collection, documenting biology laboratory at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-045.jpeg","featured":false},{"id":133,"cat":"labs","catLabel":"Science & Innovation Labs","subcat":"Computer Science IT Hub","title":"Science & Innovation Labs · Print 46","desc":"Archival photograph from the Durga Public School heritage collection, documenting computer science it hub at the Pilani campus.","src":"assets/photos/scrapbook/labs/labs-046.jpeg","featured":false},{"id":134,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 01","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-001.jpeg","featured":false},{"id":135,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 02","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-002.jpeg","featured":false},{"id":136,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 03","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-003.jpg","featured":false},{"id":137,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 04","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-004.jpg","featured":false},{"id":138,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 05","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-005.jpeg","featured":false},{"id":139,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 06","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-006.jpeg","featured":false},{"id":140,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 07","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-007.jpg","featured":false},{"id":141,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 08","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-008.jpg","featured":false},{"id":142,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 09","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-009.jpeg","featured":false},{"id":143,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 10","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-010.jpg","featured":false},{"id":144,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 11","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-011.jpg","featured":false},{"id":145,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 12","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-012.jpg","featured":false},{"id":146,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 13","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-013.jpg","featured":false},{"id":147,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 14","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-014.jpg","featured":false},{"id":148,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 15","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-015.jpg","featured":false},{"id":149,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 16","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-016.jpg","featured":false},{"id":150,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 17","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-017.jpg","featured":false},{"id":151,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 18","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-018.jpg","featured":false},{"id":152,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 19","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-019.jpg","featured":false},{"id":153,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 20","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-020.jpg","featured":false},{"id":154,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 21","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-021.jpg","featured":false},{"id":155,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 22","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-022.jpg","featured":false},{"id":156,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 23","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-023.jpg","featured":false},{"id":157,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 24","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-024.jpg","featured":false},{"id":158,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 25","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-025.jpg","featured":false},{"id":159,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 26","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-026.jpg","featured":false},{"id":160,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 27","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-027.jpg","featured":false},{"id":161,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 28","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-028.jpg","featured":false},{"id":162,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 29","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-029.jpg","featured":false},{"id":163,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 30","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-030.jpg","featured":false},{"id":164,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 31","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-031.jpg","featured":false},{"id":165,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 32","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-032.jpg","featured":false},{"id":166,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 33","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-033.jpg","featured":false},{"id":167,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 34","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-034.jpg","featured":false},{"id":168,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 35","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-035.jpg","featured":false},{"id":169,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 36","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-036.jpg","featured":false},{"id":170,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 37","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-037.jpg","featured":false},{"id":171,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 38","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-038.jpg","featured":false},{"id":172,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 39","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-039.jpg","featured":false},{"id":173,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 40","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-040.jpg","featured":false},{"id":174,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 41","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-041.jpg","featured":false},{"id":175,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 42","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-042.jpg","featured":false},{"id":176,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 43","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-043.jpg","featured":false},{"id":177,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 44","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-044.jpg","featured":false},{"id":178,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 45","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-045.jpg","featured":false},{"id":179,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 46","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-046.jpg","featured":false},{"id":180,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 47","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-047.jpg","featured":false},{"id":181,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 48","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-048.jpg","featured":false},{"id":182,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 49","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-049.jpg","featured":false},{"id":183,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 50","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-050.jpg","featured":false},{"id":184,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 51","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-051.jpg","featured":false},{"id":185,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 52","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-052.jpeg","featured":false},{"id":186,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 53","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-053.jpeg","featured":false},{"id":187,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 54","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-054.jpeg","featured":false},{"id":188,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 55","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-055.jpeg","featured":false},{"id":189,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 56","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-056.jpeg","featured":false},{"id":190,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 57","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-057.jpg","featured":false},{"id":191,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 58","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-058.jpg","featured":false},{"id":192,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 59","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-059.jpg","featured":false},{"id":193,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 60","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-060.jpg","featured":false},{"id":194,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 61","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-061.jpg","featured":false},{"id":195,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 62","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-062.jpg","featured":false},{"id":196,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Ganesh Chaturthi & Saraswati Puja","title":"Cultural Festivals & Performing Arts · Print 63","desc":"Archival photograph from the Durga Public School heritage collection, documenting ganesh chaturthi & saraswati puja at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-063.jpg","featured":false},{"id":197,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Hindi Diwas Recitations","title":"Cultural Festivals & Performing Arts · Print 64","desc":"Archival photograph from the Durga Public School heritage collection, documenting hindi diwas recitations at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-064.jpg","featured":false},{"id":198,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Inter-House English Week","title":"Cultural Festivals & Performing Arts · Print 65","desc":"Archival photograph from the Durga Public School heritage collection, documenting inter-house english week at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-065.jpg","featured":false},{"id":199,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Annual Day & Prize Ceremonies","title":"Cultural Festivals & Performing Arts · Print 66","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual day & prize ceremonies at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-066.jpg","featured":false},{"id":200,"cat":"cultural","catLabel":"Cultural Festivals & Performing Arts","subcat":"Rajasthani Folk Dance","title":"Cultural Festivals & Performing Arts · Print 67","desc":"Archival photograph from the Durga Public School heritage collection, documenting rajasthani folk dance at the Pilani campus.","src":"assets/photos/scrapbook/cultural/cultural-067.jpg","featured":false},{"id":201,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Annual Sports Meet","title":"Sports Arena & Athletic Meets · Print 01","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual sports meet at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-001.jpg","featured":false},{"id":202,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Kho-Kho & Field Games","title":"Sports Arena & Athletic Meets · Print 02","desc":"Archival photograph from the Durga Public School heritage collection, documenting kho-kho & field games at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-002.jpg","featured":false},{"id":203,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Team Tournaments","title":"Sports Arena & Athletic Meets · Print 03","desc":"Archival photograph from the Durga Public School heritage collection, documenting team tournaments at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-003.jpg","featured":false},{"id":204,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Morning Yoga & Drills","title":"Sports Arena & Athletic Meets · Print 04","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning yoga & drills at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-004.jpg","featured":false},{"id":205,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Annual Sports Meet","title":"Sports Arena & Athletic Meets · Print 05","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual sports meet at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-005.jpg","featured":false},{"id":206,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Kho-Kho & Field Games","title":"Sports Arena & Athletic Meets · Print 06","desc":"Archival photograph from the Durga Public School heritage collection, documenting kho-kho & field games at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-006.jpeg","featured":false},{"id":207,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Team Tournaments","title":"Sports Arena & Athletic Meets · Print 07","desc":"Archival photograph from the Durga Public School heritage collection, documenting team tournaments at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-007.jpeg","featured":false},{"id":208,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Morning Yoga & Drills","title":"Sports Arena & Athletic Meets · Print 08","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning yoga & drills at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-008.jpeg","featured":false},{"id":209,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Annual Sports Meet","title":"Sports Arena & Athletic Meets · Print 09","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual sports meet at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-009.jpeg","featured":false},{"id":210,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Kho-Kho & Field Games","title":"Sports Arena & Athletic Meets · Print 10","desc":"Archival photograph from the Durga Public School heritage collection, documenting kho-kho & field games at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-010.jpeg","featured":false},{"id":211,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Team Tournaments","title":"Sports Arena & Athletic Meets · Print 11","desc":"Archival photograph from the Durga Public School heritage collection, documenting team tournaments at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-011.jpg","featured":false},{"id":212,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Morning Yoga & Drills","title":"Sports Arena & Athletic Meets · Print 12","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning yoga & drills at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-012.jpg","featured":false},{"id":213,"cat":"sports","catLabel":"Sports Arena & Athletic Meets","subcat":"Annual Sports Meet","title":"Sports Arena & Athletic Meets · Print 13","desc":"Archival photograph from the Durga Public School heritage collection, documenting annual sports meet at the Pilani campus.","src":"assets/photos/scrapbook/sports/sports-013.jpg","featured":false},{"id":214,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 01","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-001.jpg","featured":false},{"id":215,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 02","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-002.jpg","featured":false},{"id":216,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 03","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-003.jpg","featured":false},{"id":217,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 04","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-004.jpg","featured":false},{"id":218,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 05","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-005.jpg","featured":false},{"id":219,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 06","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-006.jpg","featured":false},{"id":220,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 07","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-007.jpg","featured":false},{"id":221,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 08","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-008.jpg","featured":false},{"id":222,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 09","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-009.jpg","featured":false},{"id":223,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 10","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-010.jpg","featured":false},{"id":224,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 11","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-011.jpg","featured":false},{"id":225,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 12","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-012.jpg","featured":false},{"id":226,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 13","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-013.jpg","featured":false},{"id":227,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 14","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-014.jpg","featured":false},{"id":228,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 15","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-015.jpg","featured":false},{"id":229,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 16","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-016.jpg","featured":false},{"id":230,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 17","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-017.jpg","featured":false},{"id":231,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 18","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-018.jpg","featured":false},{"id":232,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 19","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-019.jpg","featured":false},{"id":233,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 20","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-020.jpg","featured":false},{"id":234,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 21","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-021.jpg","featured":false},{"id":235,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 22","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-022.jpg","featured":false},{"id":236,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 23","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-023.png","featured":false},{"id":237,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 24","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-024.png","featured":false},{"id":238,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 25","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-025.png","featured":false},{"id":239,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 26","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-026.png","featured":false},{"id":240,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 27","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-027.png","featured":false},{"id":241,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 28","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-028.jpg","featured":false},{"id":242,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 29","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-029.png","featured":false},{"id":243,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 30","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-030.png","featured":false},{"id":244,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 31","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-031.png","featured":false},{"id":245,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 32","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-032.png","featured":false},{"id":246,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 33","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-033.jpg","featured":false},{"id":247,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 34","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-034.jpg","featured":false},{"id":248,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 35","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-035.jpg","featured":false},{"id":249,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 36","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-036.jpg","featured":false},{"id":250,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 37","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-037.jpg","featured":false},{"id":251,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 38","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-038.jpg","featured":false},{"id":252,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 39","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-039.jpg","featured":false},{"id":253,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 40","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-040.jpg","featured":false},{"id":254,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 41","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-041.jpg","featured":false},{"id":255,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 42","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-042.jpg","featured":false},{"id":256,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 43","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-043.jpg","featured":false},{"id":257,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 44","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-044.jpg","featured":false},{"id":258,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 45","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-045.jpg","featured":false},{"id":259,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 46","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-046.jpg","featured":false},{"id":260,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 47","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-047.jpg","featured":false},{"id":261,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 48","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-048.jpg","featured":false},{"id":262,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 49","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-049.jpg","featured":false},{"id":263,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 50","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-050.jpeg","featured":false},{"id":264,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 51","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-051.jpeg","featured":false},{"id":265,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 52","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-052.jpeg","featured":false},{"id":266,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 53","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-053.jpeg","featured":false},{"id":267,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 54","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-054.jpeg","featured":false},{"id":268,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Regional Press Merits","title":"Student Life, Fleet & Heritage Archive · Print 55","desc":"Archival photograph from the Durga Public School heritage collection, documenting regional press merits at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-055.jpeg","featured":false},{"id":269,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Archival Heritage & Prospectus","title":"Student Life, Fleet & Heritage Archive · Print 56","desc":"Archival photograph from the Durga Public School heritage collection, documenting archival heritage & prospectus at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-056.jpeg","featured":false},{"id":270,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"GPS Transport Fleet","title":"Student Life, Fleet & Heritage Archive · Print 57","desc":"Archival photograph from the Durga Public School heritage collection, documenting gps transport fleet at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-057.jpeg","featured":false},{"id":271,"cat":"student-life","catLabel":"Student Life, Fleet & Heritage Archive","subcat":"Morning Assemblies","title":"Student Life, Fleet & Heritage Archive · Print 58","desc":"Archival photograph from the Durga Public School heritage collection, documenting morning assemblies at the Pilani campus.","src":"assets/photos/scrapbook/student-life/student-life-058.jpeg","featured":false}];

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
        notices: { title: 'Live Alert & Notice Broadcast', sub: 'Publish instant alerts, banners, and tickers to the live website' },
        houses: { title: 'House Championship & Points', sub: 'Live point standings for Gandhi, Vivekanand, Raman & Bose Houses' },
        settings: { title: 'School Information & Live CMS', sub: 'Modify school phone numbers, timings, session parameters & metrics' },
        gallery: { title: 'Archival Media & Scrapbook', sub: 'Manage 271 campus photographs, titles, captions & categories' },
        circulars: { title: 'Circulars & Official Downloads', sub: 'Publish public notices, examination schedules & PDF guidelines' },
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
        case 'notices':
          this.renderNoticeManager();
          break;
        case 'houses':
          this.renderHouseLeaderboard();
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

      // Leading House
      let leaderKey = 'vivekanand';
      let maxScore = -1;
      Object.keys(this.state.houses).forEach(k => {
        if (this.state.houses[k].total > maxScore) {
          maxScore = this.state.houses[k].total;
          leaderKey = k;
        }
      });
      const leaderHouse = this.state.houses[leaderKey];
      document.getElementById('statLeaderHouse').textContent = leaderHouse.name.replace(' House', '');
      document.getElementById('statLeaderPoints').textContent = leaderHouse.total + ' Points';

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

      // House point bars
      const houseBars = document.getElementById('dashboardHouseBars');
      if (houseBars) {
        houseBars.innerHTML = Object.keys(this.state.houses).map(k => {
          const h = this.state.houses[k];
          const pct = Math.min(100, Math.round((h.total / 600) * 100));
          return `
            <div style="margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;margin-bottom:4px;">
                <span>${h.name}</span>
                <span style="color:${h.color};">${h.total} Pts</span>
              </div>
              <div style="height:8px;background:#E2E8F0;border-radius:4px;overflow:hidden;">
                <div style="width:${pct}%;height:100%;background:${h.color};border-radius:4px;"></div>
              </div>
            </div>
          `;
        }).join('');
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
