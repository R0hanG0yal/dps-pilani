/**
 * Durga Devi Public Sr. Sec. School, Pilani
 * Official Faculty & Academic Administration Roster
 * Categorized by Subject Disciplines with Academic Background & Experience
 */

(function () {
  'use strict';

  var DEFAULT_FACULTY = [
  {
    "id": "FAC-01",
    "name": "Mrs. Punita Sharma",
    "category": "science",
    "categoryLabel": "Science & Laboratories",
    "subject": "Physics & Educational Governance",
    "designation": "Principal & Head of Institution",
    "qualifications": "M.Sc. (Physics), M.Ed.",
    "experience": "24 Years",
    "photo": "assets/photos/leadership/principal-desk.jpg",
    "bio": "Academic leader with over two decades of experience guiding students to state-level RBSE merit ranks and competitive national admissions."
  },
  {
    "id": "FAC-02",
    "name": "Mrs. Maya Verma",
    "category": "science",
    "categoryLabel": "Science & Laboratories",
    "subject": "Chemistry & Scholastic Pedagogy",
    "designation": "Academic Coordinator (Secondary & Sr. Sec.)",
    "qualifications": "M.Sc. (Chemistry), B.Ed.",
    "experience": "18 Years",
    "photo": "assets/photos/leadership/coordinator.jpg",
    "bio": "Oversees curriculum alignment, continuous formative assessments, and pedagogical pacing across senior science streams."
  },
  {
    "id": "FAC-03",
    "name": "Mr. Rajesh Kumar Saini",
    "category": "mathematics",
    "categoryLabel": "Mathematics & Statistics",
    "subject": "Advanced Mathematics & Calculus",
    "designation": "PGT Mathematics & Senior Coordinator",
    "qualifications": "M.Sc. (Applied Mathematics), B.Ed.",
    "experience": "16 Years",
    "photo": "assets/photos/client/wings/smart-classroom-faculty-desk-4.jpg",
    "bio": "Senior mathematics authority renowned for concept clarity in differential calculus, 3D geometry, and competitive foundation."
  },
  {
    "id": "FAC-04",
    "name": "Dr. Arvind Shekhawat",
    "category": "commerce",
    "categoryLabel": "Commerce & Accountancy",
    "subject": "Accountancy & Business Studies",
    "designation": "PGT Commerce & Department Head",
    "qualifications": "M.Com, M.Phil, Ph.D., B.Ed.",
    "experience": "15 Years",
    "photo": "",
    "bio": "Dedicated mentor guiding commerce scholars toward financial acumen, CA foundation preparation, and merit distinctions."
  },
  {
    "id": "FAC-05",
    "name": "Mrs. Rekha Choudhary",
    "category": "science",
    "categoryLabel": "Science & Laboratories",
    "subject": "Biology & Genetics",
    "designation": "PGT Biology & Science Club Incharge",
    "qualifications": "M.Sc. (Zoology), B.Ed.",
    "experience": "12 Years",
    "photo": "",
    "bio": "Specialist in botanical taxonomy, human physiology, and state science exhibition project curation."
  },
  {
    "id": "FAC-06",
    "name": "Mr. Alok Pareek",
    "category": "languages",
    "categoryLabel": "Languages & Literature",
    "subject": "English Core & Communicative Arts",
    "designation": "PGT English & Literary Society Head",
    "qualifications": "M.A. (English Literature), B.Ed., NET",
    "experience": "14 Years",
    "photo": "",
    "bio": "Fosters bilingual articulacy, expressive creative writing, and championship-winning inter-school debate delegations."
  },
  {
    "id": "FAC-07",
    "name": "Mrs. Sunita Verma",
    "category": "science",
    "categoryLabel": "Science & Laboratories",
    "subject": "Chemistry & Laboratory Research",
    "designation": "PGT Chemistry & Senior Lab Superintendent",
    "qualifications": "M.Sc. (Organic Chemistry), B.Ed.",
    "experience": "15 Years",
    "photo": "",
    "bio": "Experienced chemistry mentor with a focus on empirical laboratory safety, organic reactions, and board practical mastery."
  },
  {
    "id": "FAC-08",
    "name": "Mr. Manoj Kumar Sharma",
    "category": "computers",
    "categoryLabel": "Computer Science & IT",
    "subject": "Computer Science & Python Informatics",
    "designation": "PGT Computer Science & IT Hub Lead",
    "qualifications": "MCA, B.Tech (Computer Science)",
    "experience": "11 Years",
    "photo": "",
    "bio": "Leads the school's smart IT labs, algorithmic coding modules, Python data structures, and digital literacy initiatives."
  },
  {
    "id": "FAC-09",
    "name": "Mr. Vikramaditya Singh",
    "category": "sports-arts",
    "categoryLabel": "Physical Education, Sports & Arts",
    "subject": "Physical Education & Track Athletics",
    "designation": "Director of Physical Education & Sports",
    "qualifications": "M.P.Ed., NIS Certified Athletics Coach",
    "experience": "14 Years",
    "photo": "",
    "bio": "National-level athletics trainer overseeing sports tournaments, martial arts discipline, yoga wellness, and inter-house cups."
  },
  {
    "id": "FAC-10",
    "name": "Mrs. Saroj Devi Sharma",
    "category": "languages",
    "categoryLabel": "Languages & Literature",
    "subject": "Hindi Sahitya, Sanskrit & Cultural Assemblies",
    "designation": "TGT Hindi & Sanskrit & Morning Assembly Mentor",
    "qualifications": "M.A. (Hindi & Sanskrit), B.Ed.",
    "experience": "13 Years",
    "photo": "",
    "bio": "Cultivates Indian cultural reverence, Sanskrit shloka cadence, and Hindi literary expression in our young scholars."
  },
  {
    "id": "FAC-11",
    "name": "Mr. Surendra Mohan",
    "category": "social-sciences",
    "categoryLabel": "Social Sciences & Humanities",
    "subject": "History, Civics & Geography",
    "designation": "TGT Social Sciences & Heritage Club Guide",
    "qualifications": "M.A. (History & Geography), B.Ed.",
    "experience": "12 Years",
    "photo": "",
    "bio": "Brings historical epochs and geographical topography to life through interactive multimedia timelines and archival maps."
  },
  {
    "id": "FAC-12",
    "name": "Mrs. Neha Kedia",
    "category": "primary",
    "categoryLabel": "Primary & Foundational Wing",
    "subject": "Early Childhood Pedagogy & Foundational Literacy",
    "designation": "Primary Wing Coordinator & Activity Head",
    "qualifications": "B.El.Ed., M.A. (Psychology), NTT Certified",
    "experience": "10 Years",
    "photo": "",
    "bio": "Dedicated child psychologist and primary educator ensuring a joyful, nurturing, and disciplined start to every child's academic journey."
  }
];

  window.DPS_DEFAULT_FACULTY = DEFAULT_FACULTY;

  window.getLiveFacultyList = function () {
    try {
      var stored = localStorage.getItem('dps_faculty');
      if (stored) {
        var parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Clean any legacy classes or schedule keys from stored data
          return parsed.map(function (f) {
            delete f.classes;
            delete f.schedule;
            return f;
          });
        }
      }
    } catch (e) {
      console.warn('Error reading stored faculty data:', e);
    }
    return DEFAULT_FACULTY;
  };

  // Pre-seed storage if empty or clean legacy keys
  try {
    var existing = localStorage.getItem('dps_faculty');
    if (!existing) {
      localStorage.setItem('dps_faculty', JSON.stringify(DEFAULT_FACULTY));
    } else {
      var parsed = JSON.parse(existing);
      if (Array.isArray(parsed)) {
        var cleaned = parsed.map(function (f) {
          delete f.classes;
          delete f.schedule;
          return f;
        });
        localStorage.setItem('dps_faculty', JSON.stringify(cleaned));
      }
    }
  } catch (e) {}

})();
