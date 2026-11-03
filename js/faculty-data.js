/**
 * Durga Devi Public Sr. Sec. School, Pilani
 * Official Faculty & Academic Administration Roster
 * Categorized by Subject Disciplines with Timetables & Consultation Hours
 */

(function () {
  'use strict';

  var DEFAULT_FACULTY = [
    {
      id: "FAC-01",
      name: "Mrs. Punita Sharma",
      category: "science",
      categoryLabel: "Science & Laboratories",
      subject: "Physics & Educational Governance",
      designation: "Principal & Head of Institution",
      classes: "Classes XI & XII (Science)",
      qualifications: "M.Sc. (Physics), M.Ed.",
      experience: "24 Years",
      photo: "assets/photos/leadership/principal-desk.jpg",
      schedule: {
        days: "Monday to Saturday",
        periods: "Period 1 (08:30 AM – 09:15 AM)",
        labs: "Optics & Physics Lab Demonstrations",
        consultation: "Executive Office Consultation: 11:30 AM – 12:30 PM (Mon–Fri)"
      },
      bio: "Academic leader with over two decades of experience guiding students to state-level RBSE merit ranks and competitive national admissions."
    },
    {
      id: "FAC-02",
      name: "Mrs. Maya Verma",
      category: "science",
      categoryLabel: "Science & Laboratories",
      subject: "Chemistry & Scholastic Pedagogy",
      designation: "Academic Coordinator (Secondary & Sr. Sec.)",
      classes: "Classes IX to XII",
      qualifications: "M.Sc. (Chemistry), B.Ed.",
      experience: "18 Years",
      photo: "assets/photos/leadership/coordinator.jpg",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 2 & 4 (09:15 AM – 11:30 AM)",
        labs: "Chemical Titration & Qualitative Analysis (Tue & Thu)",
        consultation: "Academic Mentoring Desk: 02:00 PM – 02:45 PM"
      },
      bio: "Oversees curriculum alignment, continuous formative assessments, and pedagogical pacing across senior science streams."
    },
    {
      id: "FAC-03",
      name: "Mr. Rajesh Kumar Saini",
      category: "mathematics",
      categoryLabel: "Mathematics & Statistics",
      subject: "Advanced Mathematics & Calculus",
      designation: "PGT Mathematics & Senior Coordinator",
      classes: "Classes XI & XII (Science & Commerce)",
      qualifications: "M.Sc. (Applied Mathematics), B.Ed.",
      experience: "16 Years",
      photo: "assets/photos/client/wings/smart-classroom-faculty-desk-4.jpg",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 1, 3, 5 (08:30 AM – 12:15 PM)",
        labs: "Mathematics Logic Lab Sessions (Wed & Fri)",
        consultation: "Doubt Clearing Clinic: 01:45 PM – 02:30 PM"
      },
      bio: "Senior mathematics authority renowned for concept clarity in differential calculus, 3D geometry, and competitive foundation."
    },
    {
      id: "FAC-04",
      name: "Dr. Arvind Shekhawat",
      category: "commerce",
      categoryLabel: "Commerce & Accountancy",
      subject: "Accountancy & Business Studies",
      designation: "PGT Commerce & Department Head",
      classes: "Classes XI & XII (Commerce Stream)",
      qualifications: "M.Com, M.Phil, Ph.D., B.Ed.",
      experience: "15 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 2, 4, 6 (09:15 AM – 01:00 PM)",
        labs: "Commerce Tally & Digital Accounting Practicals",
        consultation: "Commerce Career Advisory: 02:00 PM – 02:45 PM"
      },
      bio: "Dedicated mentor guiding commerce scholars toward financial acumen, CA foundation preparation, and merit distinctions."
    },
    {
      id: "FAC-05",
      name: "Mrs. Rekha Choudhary",
      category: "science",
      categoryLabel: "Science & Laboratories",
      subject: "Biology & Genetics",
      designation: "PGT Biology & Science Club Incharge",
      classes: "Classes XI & XII (Medical Stream) & Class X",
      qualifications: "M.Sc. (Zoology), B.Ed.",
      experience: "12 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Period 3 (10:00 AM – 10:45 AM) & Period 5",
        labs: "Microscopy & Botanical Morphology (Mon, Wed, Fri)",
        consultation: "Science Fair & Biology Clinic: 01:45 PM – 02:30 PM"
      },
      bio: "Specialist in botanical taxonomy, human physiology, and state science exhibition project curation."
    },
    {
      id: "FAC-06",
      name: "Mr. Alok Pareek",
      category: "languages",
      categoryLabel: "Languages & Literature",
      subject: "English Core & Communicative Arts",
      designation: "PGT English & Literary Society Head",
      classes: "Classes IX to XII",
      qualifications: "M.A. (English Literature), B.Ed., NET",
      experience: "14 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 2 & 5 (09:15 AM – 12:15 PM)",
        labs: "Language Laboratory & Phonetics Sessions",
        consultation: "Debate & Communication Clinic: 02:00 PM – 02:45 PM"
      },
      bio: "Fosters bilingual articulacy, expressive creative writing, and championship-winning inter-school debate delegations."
    },
    {
      id: "FAC-07",
      name: "Mrs. Sunita Verma",
      category: "science",
      categoryLabel: "Science & Laboratories",
      subject: "Chemistry & Laboratory Research",
      designation: "PGT Chemistry & Senior Lab Superintendent",
      classes: "Classes XI & XII",
      qualifications: "M.Sc. (Organic Chemistry), B.Ed.",
      experience: "15 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 1 & 4 (08:30 AM – 11:30 AM)",
        labs: "Senior Chemistry Titration Lab (Mon & Wed)",
        consultation: "Subject Clarification: 01:45 PM – 02:30 PM"
      },
      bio: "Experienced chemistry mentor with a focus on empirical laboratory safety, organic reactions, and board practical mastery."
    },
    {
      id: "FAC-08",
      name: "Mr. Manoj Kumar Sharma",
      category: "computers",
      categoryLabel: "Computer Science & IT",
      subject: "Computer Science & Python Informatics",
      designation: "PGT Computer Science & IT Hub Lead",
      classes: "Classes IX to XII & Middle Wings",
      qualifications: "MCA, B.Tech (Computer Science)",
      experience: "11 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 3 & 6 (10:00 AM – 01:00 PM)",
        labs: "IT Lab & Python Coding Lab (Daily Afternoons)",
        consultation: "Coding Club & Project Support: 02:00 PM – 02:45 PM"
      },
      bio: "Leads the school's smart IT labs, algorithmic coding modules, Python data structures, and digital literacy initiatives."
    },
    {
      id: "FAC-09",
      name: "Mr. Vikramaditya Singh",
      category: "sports-arts",
      categoryLabel: "Physical Education, Sports & Arts",
      subject: "Physical Education & Track Athletics",
      designation: "Director of Physical Education & Sports",
      classes: "All Wings (Classes VI to XII)",
      qualifications: "M.P.Ed., NIS Certified Athletics Coach",
      experience: "14 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Morning Conditioning (07:15 – 08:15 AM) & Periods 4, 6",
        labs: "Sports Complex, Track & Gymnasium",
        consultation: "Tournament Trials & Fitness Desk: 03:30 PM – 04:30 PM"
      },
      bio: "National-level athletics trainer overseeing sports tournaments, martial arts discipline, yoga wellness, and inter-house cups."
    },
    {
      id: "FAC-10",
      name: "Mrs. Saroj Devi Sharma",
      category: "languages",
      categoryLabel: "Languages & Literature",
      subject: "Hindi Sahitya, Sanskrit & Cultural Assemblies",
      designation: "TGT Hindi & Sanskrit & Morning Assembly Mentor",
      classes: "Classes VI to X",
      qualifications: "M.A. (Hindi & Sanskrit), B.Ed.",
      experience: "13 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 1 & 3 (08:30 AM – 10:45 AM)",
        labs: "Saraswati Assembly Stage & Cultural Choir",
        consultation: "Language Reading & Recitation: 01:45 PM – 02:30 PM"
      },
      bio: "Cultivates Indian cultural reverence, Sanskrit shloka cadence, and Hindi literary expression in our young scholars."
    },
    {
      id: "FAC-11",
      name: "Mr. Surendra Mohan",
      category: "social-sciences",
      categoryLabel: "Social Sciences & Humanities",
      subject: "History, Civics & Geography",
      designation: "TGT Social Sciences & Heritage Club Guide",
      classes: "Classes VI to X",
      qualifications: "M.A. (History & Geography), B.Ed.",
      experience: "12 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Periods 2 & 4 (09:15 AM – 11:30 AM)",
        labs: "Social Science Cartography & Model Room",
        consultation: "Map Work & Quiz Mentoring: 01:45 PM – 02:30 PM"
      },
      bio: "Brings historical epochs and geographical topography to life through interactive multimedia timelines and archival maps."
    },
    {
      id: "FAC-12",
      name: "Mrs. Neha Kedia",
      category: "primary",
      categoryLabel: "Primary & Foundational Wing",
      subject: "Early Childhood Pedagogy & Foundational Literacy",
      designation: "Primary Wing Coordinator & Activity Head",
      classes: "Primary Wing (Classes I to V)",
      qualifications: "B.El.Ed., M.A. (Psychology), NTT Certified",
      experience: "10 Years",
      photo: "",
      schedule: {
        days: "Monday to Saturday",
        periods: "Continuous Primary Learning Blocks (08:30 AM – 01:30 PM)",
        labs: "Activity Room, Phonics Station & Play Arena",
        consultation: "Parent Interaction & Growth Updates: 01:45 PM – 02:30 PM"
      },
      bio: "Dedicated child psychologist and primary educator ensuring a joyful, nurturing, and disciplined start to every child's academic journey."
    }
  ];

  window.DPS_DEFAULT_FACULTY = DEFAULT_FACULTY;

  window.getLiveFacultyList = function () {
    try {
      var stored = localStorage.getItem('dps_faculty');
      if (stored) {
        var parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading stored faculty data:', e);
    }
    return DEFAULT_FACULTY;
  };

  // Pre-seed storage if empty
  try {
    if (!localStorage.getItem('dps_faculty')) {
      localStorage.setItem('dps_faculty', JSON.stringify(DEFAULT_FACULTY));
    }
  } catch (e) {}

})();
