/* MD LITON ALI — v2 site script (vanilla, no dependencies) */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  root.classList.remove('no-js');

  const SEARCH_INDEX = [{"g": "Pages", "t": "Home", "s": "Overview, focus and journey", "u": "index.html", "i": "fas fa-house", "p": "Page"}, {"g": "Pages", "t": "About", "s": "Bio, skills, education", "u": "about.html", "i": "fas fa-user", "p": "Page"}, {"g": "Pages", "t": "Research", "s": "Research map, papers, current work", "u": "research.html", "i": "fas fa-flask", "p": "Page"}, {"g": "Pages", "t": "Experience", "s": "Roles, field projects, training", "u": "experience.html", "i": "fas fa-briefcase", "p": "Page"}, {"g": "Pages", "t": "Honors", "s": "Awards and photo gallery", "u": "honors.html", "i": "fas fa-award", "p": "Page"}, {"g": "Pages", "t": "Service", "s": "Leadership, memberships, volunteering", "u": "service.html", "i": "fas fa-hands-helping", "p": "Page"}, {"g": "Pages", "t": "CV", "s": "Full curriculum vitae", "u": "cv.html", "i": "fas fa-file-lines", "p": "Page"}, {"g": "Pages", "t": "Contact", "s": "Email and message form", "u": "contact.html", "i": "fas fa-envelope", "p": "Page"}, {"g": "Publications", "t": "GenAI—Stay Out of It or Find a Suitable Way to Incorporate It? A Policy Review of Academic Publishers and Universities", "s": "International Conference on Information and Knowledge Management (IIKM) · 2025", "u": "research.html#genai-policy", "i": "fas fa-file-lines", "p": "Research", "k": "AI in Higher Education Science of Science A policy review of how academic publishers and universities are responding to generative AI, set around the question in the title: should institutions keep GenAI out of scholarship, or find a suitable way to incorporate it?"}, {"g": "Publications", "t": "Evaluating the Effectiveness of the AI-Powered Chatbot in Advancing User Support in Academic Libraries", "s": "International Conference on Reimagining Librarianship · 2025", "u": "research.html#chatbot", "i": "fas fa-file-lines", "p": "Research", "k": "AI in Higher Education Digital Libraries Evaluates how well an AI-powered chatbot advances user support in academic libraries, asking whether conversational AI can extend the reach of reference and help services."}, {"g": "Publications", "t": "Exploring university students’ perceptions and attitudes toward associated factors of electronic learning during the COVID-19 pandemic", "s": "Advances in Online Education: A Peer-Reviewed Journal · 2024", "u": "research.html#elearning", "i": "fas fa-file-lines", "p": "Research", "k": "AI in Higher Education Information Behavior Examines how University of Dhaka students perceived the forced shift to electronic learning during COVID-19, and which technological, pedagogical, institutional and individual factors shaped their acceptance of it."}, {"g": "Publications", "t": "Knowledge and Information Sharing Practices among Multidisciplinary University Dormitory Residents: Exploring the Influence of Gender, Academic Discipline, and Degree Level", "s": "Journal of Information and Knowledge Management (JIKM) · 2023", "u": "research.html#kis", "i": "fas fa-file-lines", "p": "Research", "k": "Information Behavior Studies the culture of knowledge and information sharing among students living in 16 dormitories of a large public university in Bangladesh, and how it varies by gender, discipline and degree level."}, {"g": "Publications", "t": "Webometric analysis of alternative access to scholarly publication: special reference to LibGen and Sci-Hub", "s": "International Journal of Information and Knowledge Studies (IJIKS) · 2023", "u": "research.html#webometric", "i": "fas fa-file-lines", "p": "Research", "k": "Science of Science Uses webometrics to map worldwide usage and growth of Library Genesis and Sci-Hub, the shadow libraries that researchers turn to when scholarly publications are priced out of reach."}, {"g": "Publications", "t": "Unlocking knowledge frontiers: Library Genesis and Sci-Hub as alternative gateways to scholarly publications", "s": "International Conference on Information and Knowledge Management (IIKM) · 2023", "u": "research.html#unlocking", "i": "fas fa-file-lines", "p": "Research", "k": "Science of Science Conference presentation of the LibGen and Sci-Hub webometric study, highlighting what shadow-library usage reveals about pricing, access barriers and traditional publishing models."}, {"g": "Publications", "t": "Assessing the Impact of Religious Information on Political Beliefs and Personal Morality among Bangladeshi People", "s": "International Conference on Library & Information Science (ICLIS 2023) · 2023", "u": "research.html#religion", "i": "fas fa-file-lines", "p": "Research", "k": "Misinformation & Belief Information Behavior Explores how religious information shapes the personal morality and political beliefs of Bangladeshi citizens, in a country where religion plays a central role in society and politics."}, {"g": "Publications", "t": "Perceptions and behaviors of academic library users towards ethical use of library resources and services: reference to university students", "s": "Manuscript under review · under review", "u": "research.html#ethics", "i": "fas fa-file-lines", "p": "Research", "k": "Information Behavior Digital Libraries Investigates how university students perceive and practise the ethical use of academic library resources and services."}, {"g": "Current work", "t": "AI and university students' academic performance", "s": "In progress", "u": "research.html", "i": "fas fa-flask", "p": "Research", "k": "A research project on how AI tools affect the academic performance of university students."}, {"g": "Current work", "t": "Systematic review: GenAI in second-language speaking", "s": "In progress", "u": "research.html", "i": "fas fa-flask", "p": "Research", "k": "Mapping the pedagogical designs and roles of generative AI in L2 speaking learning, guided by the task-based language teaching framework."}, {"g": "Current work", "t": "Systematic review: AI in higher education", "s": "Planned", "u": "research.html", "i": "fas fa-flask", "p": "Research", "k": "A systematic review of research on artificial intelligence across higher education."}, {"g": "Current work", "t": "Zero-budget digital library framework", "s": "Ongoing", "u": "research.html", "i": "fas fa-flask", "p": "Research", "k": "A framework that lets school and college libraries in Bangladesh and other low-resource settings build digital services at zero cost, using free tools and minimal technical skill."}, {"g": "Themes", "t": "Science of Science", "s": "How scholarly knowledge is produced, published and accessed: scholarly communication, publishing policy, webometrics and the shadow libraries people turn to when access is blocked.", "u": "research.html#publications", "i": "fas fa-diagram-project", "p": "Research"}, {"g": "Themes", "t": "AI in Higher Education", "s": "How generative AI is reshaping universities, publishers and libraries: institutional policy, AI-powered library services, and AI's effect on how students learn and perform.", "u": "research.html#publications", "i": "fas fa-microchip", "p": "Research"}, {"g": "Themes", "t": "Information Behavior", "s": "How people seek, share and use information in everyday academic life.", "u": "research.html#publications", "i": "fas fa-people-arrows", "p": "Research"}, {"g": "Themes", "t": "Misinformation & Belief", "s": "How the information people consume shapes beliefs, morality and trust.", "u": "research.html#publications", "i": "fas fa-shield-halved", "p": "Research"}, {"g": "Themes", "t": "Digital Libraries", "s": "Low-cost, automated library systems that widen access in resource-constrained settings.", "u": "research.html#publications", "i": "fas fa-book-open-reader", "p": "Research"}, {"g": "Experience", "t": "Graduate Associate, Teaching", "s": "INFO 557: Neural Networks · College of Information Science, University of Arizona · 2026 – Present", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Assistant Public Relation Officer", "s": "International Affairs and External Communication Office, Islamic University of Technology (IUT) · 2025 – 2026", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Assistant Cataloguer", "s": "Islamic University of Technology (IUT) · 2022 – 2026", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Research Assistant", "s": "Land Administration Training Center, Ministry of Land · 2022 – 2024", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Experience", "t": "Research Assistant", "s": "University of Dhaka · 2021 – 2022", "u": "experience.html", "i": "fas fa-briefcase", "p": "Experience"}, {"g": "Field projects", "t": "Tairunnessa Memorial Medical College & Hospital Library", "s": "Project Coordinator · Jan 2024 – Aug 2024", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "International Mother Language Institute", "s": "Project Member · 2021 – 2022", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "University of Skill Enrichment and Technology Library", "s": "Project Executive · Jan 2020 – Mar 2020", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh Police Staff College Library", "s": "Project Executive · Jan 2019 – Mar 2019", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh National Parliament House Library", "s": "Project Executive · Apr 2018 – Jun 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Institute of Business Administration (IBA) Library, DU", "s": "Project Executive · Jan 2018 – Mar 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Government Madrasah-e-Alia Library", "s": "Project Executive · Sep 2017 – Sep 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh Supreme Court Bar Association Library", "s": "Project Executive · Jun 2017 – Sep 2017", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Quazi Nooruzzaman Memorial Library", "s": "Project Executive · Apr 2017 – Mar 2018", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Bangladesh Foreign Service Academy Library", "s": "Project Executive · Feb 2017 – Dec 2019", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Department of Zoology Seminar Library, DU", "s": "Project Executive · Feb 2017 – Mar 2017", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Field projects", "t": "Dept. of Communication Disorders Seminar Library, DU", "s": "Project Executive · Jan 2017 – Mar 2022", "u": "experience.html#field", "i": "fas fa-building-columns", "p": "Experience"}, {"g": "Training", "t": "Software Carpentry using Python", "s": "University of Arizona Library · 2026", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Strategic Science Communication", "s": "COMSTECH – OIC · 2026", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Library Automation and Digitization using SLiMS", "s": "BALID Institute of Information Management (BIIM) · 2025", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "E-Book Preparation and Management", "s": "Bangladesh National Scientific and Technical Documentation Center (BANSDOC) · 2025", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Modern Library Management", "s": "Bangladesh National Archives and Library · 2024", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Statistical Analysis with R Programming", "s": "DataScape · 2024", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Paper-based Research Learning", "s": "CHINTA Research Bangladesh · 2023", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "HTML5, CSS3 & Bootstrap 4 for Web Development", "s": "Shikho Technologies · 2021", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Web Designing using HTML, CSS & JavaScript", "s": "IIT, University of Dhaka · 2019", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "KOHA Installation & Customization", "s": "Daffodil International University · 2019", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Old Manuscript Reading and Translating", "s": "Dhaka University Library · 2017", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Training", "t": "Computer Fundamentals & OS Basics", "s": "ISLM, University of Dhaka · 2016", "u": "experience.html#training", "i": "fas fa-chalkboard", "p": "Experience"}, {"g": "Education", "t": "PhD in Information Science", "s": "College of Information Science, University of Arizona, USA · Fall 2026 – Present", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Master of Arts in Information Science & Library Management", "s": "University of Dhaka · 2020 – 2021", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Bachelor in Information Science & Library Management", "s": "University of Dhaka · 2015 – 2019", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Higher Secondary Certificate (HSC)", "s": "Kaliganj Haat Degree College, Rajshahi · 2015", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Education", "t": "Secondary School Certificate (SSC)", "s": "Dr. Abu Bakar High School, Rajshahi · 2013", "u": "about.html#education", "i": "fas fa-graduation-cap", "p": "About"}, {"g": "Honors", "t": "Best Paper Award, International Conference on Information and Knowledge Management (IIKM 2025), for the GenAI policy review of academic publishers and universities", "s": "Research", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Mohammad Shahidullah Memorial Gold Medal (Masters)", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Dean's Merit List of Honour (Masters)", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Dean's Merit List of Honour (Undergraduate)", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Provost Award of Academic Excellence", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Book Grant from the University of Dhaka for outstanding results in Masters", "s": "Academic Distinction", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "University Grants Commission (UGC) Undergraduate Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Mitsubishi UFJ Foundation Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Merit Scholarship, University of Dhaka", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "ISLM Alumni Association Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Dhaka University Alumni Association Scholarship", "s": "Scholarships", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "First Place, Internship at Dhaka University Library", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "First Place, Internship at BANSDOC", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Training Presentation Award, Bangladesh National Archives and Library", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "First Position, Computer Fundamentals & OS Basics Training, University of Dhaka", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Honors", "t": "Blood Donor Recognition from Badhan (donated blood more than 12 times)", "s": "Professional & Community", "u": "honors.html", "i": "fas fa-award", "p": "Honors"}, {"g": "Memberships", "t": "Association for Information Science and Technology", "s": "ASIS&T", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Association for Library and Information Science Education", "s": "ALISE", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Association for Computing Machinery", "s": "ACM", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Association for Asian Studies", "s": "AAS", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Bangladesh Association of Librarians, Information Scientists and Documentalists", "s": "BALID", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Library Association of Bangladesh", "s": "LAB", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Memberships", "t": "Bibliotheca Alexandrina Information for Africa", "s": "BAIFA", "u": "service.html#memberships", "i": "fas fa-id-card", "p": "Service"}, {"g": "Service", "t": "Chair-Elect", "s": "SIG-AVC, Association for Information Science and Technology (ASIS&T)", "u": "service.html", "i": "fas fa-user-tie", "p": "Service"}, {"g": "Service", "t": "Reviewer", "s": "Global Knowledge, Memory and Communication · Emerald Publishing", "u": "service.html", "i": "fas fa-user-tie", "p": "Service"}, {"g": "Service", "t": "Communication Officer", "s": "SIG-VIS, Association for Information Science and Technology (ASIS&T)", "u": "service.html", "i": "fas fa-user-tie", "p": "Service"}, {"g": "Service", "t": "Organizing Volunteer", "s": "International Symposium on Empowering LIS Professionals for Achieving SDGs", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Rapporteur", "s": "International Conference on the Role of LIS Professionals in the 4IR, Library Association of Bangladesh", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Event Organizing Volunteer", "s": "Librarians Times Bangladesh", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Event Organizer", "s": "Directorate of Public Libraries and Biswashahitya Kendro", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "President", "s": "Information 71 (Dhaka University-based students' association)", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Executive Member", "s": "University Students Association of Tanore", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Tourism Affairs Secretary", "s": "Rajshahi Students Association of Dhaka University", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Education Secretary", "s": "Ratoil Social Welfare Organization, Tanore, Rajshahi", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Volunteer", "s": "Badhan — a blood donor organization", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Campaign Volunteer", "s": "Sondhani — a blood donor organization", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Amanuensis", "s": "Anirban — an organization supporting blind students", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Service", "t": "Social Work Volunteer", "s": "Dhaka University Alumni Association (DUAA)", "u": "service.html#volunteer", "i": "fas fa-hands-helping", "p": "Service"}, {"g": "Skills", "t": "Library Systems", "s": "Koha, DSpace, SLiMS, Greenstone, DocuDex, RFID, Cataloging, Classification, Dublin Core, MARC / RDA, Automation, Digitization", "u": "about.html#skills", "i": "fas fa-screwdriver-wrench", "p": "About", "k": "Koha DSpace SLiMS Greenstone DocuDex RFID Cataloging Classification Dublin Core MARC / RDA Automation Digitization"}, {"g": "Skills", "t": "Technical", "s": "Python, R, HTML, CSS, JavaScript, Database Management, Web Design, Networking, Web Archiving, Web Scraping", "u": "about.html#skills", "i": "fas fa-screwdriver-wrench", "p": "About", "k": "Python R HTML CSS JavaScript Database Management Web Design Networking Web Archiving Web Scraping"}, {"g": "Skills", "t": "Research Methods", "s": "Systematic Review, Policy Review, Webometrics, Survey Design, SPSS, VOSviewer, NVivo, Quantitative Methods, Qualitative Methods, Academic Writing", "u": "about.html#skills", "i": "fas fa-screwdriver-wrench", "p": "About", "k": "Systematic Review Policy Review Webometrics Survey Design SPSS VOSviewer NVivo Quantitative Methods Qualitative Methods Academic Writing"}];
  const PUBDATA = {"genai-policy": {"apa": "Ali, M. L. (2025). GenAI—Stay Out of It or Find a Suitable Way to Incorporate It? A Policy Review of Academic Publishers and Universities. In International Conference on Information and Knowledge Management (IIKM), 4(1), 65–66.", "bib": "@inproceedings{ali2025genaistay,\n  title = {GenAI—Stay Out of It or Find a Suitable Way to Incorporate It? A Policy Review of Academic Publishers and Universities},\n  author = {Ali, M. L.},\n  year = {2025},\n  booktitle = {International Conference on Information and Knowledge Management (IIKM)},\n  volume = {4},\n  number = {1},\n  pages = {65--66}\n}"}, "chatbot": {"apa": "Ali, M. L., & Reza, R. B. (2025). Evaluating the Effectiveness of the AI-Powered Chatbot in Advancing User Support in Academic Libraries. In International Conference on Reimagining Librarianship.", "bib": "@inproceedings{ali2025evaluating,\n  title = {Evaluating the Effectiveness of the AI-Powered Chatbot in Advancing User Support in Academic Libraries},\n  author = {Ali, M. L. and Reza, R. B.},\n  year = {2025},\n  booktitle = {International Conference on Reimagining Librarianship}\n}"}, "elearning": {"apa": "Ali, M. L. (2024). Exploring university students’ perceptions and attitudes toward associated factors of electronic learning during the COVID-19 pandemic. Advances in Online Education: A Peer-Reviewed Journal, 3(1), 38–51. https://doi.org/10.69554/CCKQ7896", "bib": "@article{ali2024exploring,\n  title = {Exploring university students’ perceptions and attitudes toward associated factors of electronic learning during the COVID-19 pandemic},\n  author = {Ali, M. L.},\n  year = {2024},\n  journal = {Advances in Online Education: A Peer-Reviewed Journal},\n  volume = {3},\n  number = {1},\n  pages = {38--51},\n  doi = {10.69554/CCKQ7896}\n}"}, "kis": {"apa": "Ali, M. L. (2023). Knowledge and Information Sharing Practices among Multidisciplinary University Dormitory Residents: Exploring the Influence of Gender, Academic Discipline, and Degree Level. Journal of Information and Knowledge Management (JIKM), 13(2), 1–16.", "bib": "@article{ali2023knowledge,\n  title = {Knowledge and Information Sharing Practices among Multidisciplinary University Dormitory Residents: Exploring the Influence of Gender, Academic Discipline, and Degree Level},\n  author = {Ali, M. L.},\n  year = {2023},\n  journal = {Journal of Information and Knowledge Management (JIKM)},\n  volume = {13},\n  number = {2},\n  pages = {1--16}\n}"}, "webometric": {"apa": "Ali, M. L. (2023). Webometric analysis of alternative access to scholarly publication: special reference to LibGen and Sci-Hub. International Journal of Information and Knowledge Studies (IJIKS), 3(1), 85–102.", "bib": "@article{ali2023webometric,\n  title = {Webometric analysis of alternative access to scholarly publication: special reference to LibGen and Sci-Hub},\n  author = {Ali, M. L.},\n  year = {2023},\n  journal = {International Journal of Information and Knowledge Studies (IJIKS)},\n  volume = {3},\n  number = {1},\n  pages = {85--102}\n}"}, "unlocking": {"apa": "Ali, M. L. (2023). Unlocking knowledge frontiers: Library Genesis and Sci-Hub as alternative gateways to scholarly publications. In International Conference on Information and Knowledge Management (IIKM), 3(1), 63–64.", "bib": "@inproceedings{ali2023unlocking,\n  title = {Unlocking knowledge frontiers: Library Genesis and Sci-Hub as alternative gateways to scholarly publications},\n  author = {Ali, M. L.},\n  year = {2023},\n  booktitle = {International Conference on Information and Knowledge Management (IIKM)},\n  volume = {3},\n  number = {1},\n  pages = {63--64}\n}"}, "religion": {"apa": "Ali, M. L., Mahmud, M. R., & Reza, R. B. (2023). Assessing the Impact of Religious Information on Political Beliefs and Personal Morality among Bangladeshi People. In International Conference on Library & Information Science (ICLIS 2023), p. 45.", "bib": "@inproceedings{ali2023assessing,\n  title = {Assessing the Impact of Religious Information on Political Beliefs and Personal Morality among Bangladeshi People},\n  author = {Ali, M. L. and Mahmud, M. R. and Reza, R. B.},\n  year = {2023},\n  booktitle = {International Conference on Library & Information Science (ICLIS 2023)}\n}"}};
  const GRAPH = {"nodes": [{"id": "sos", "kind": "theme", "label": "Science of Science", "color": "#1f3a5f", "lead": true, "title": "Science of Science", "sub": "How scholarly knowledge is produced, published and accessed: scholarly communication, publ…"}, {"id": "aihe", "kind": "theme", "label": "AI in Higher Education", "color": "#7a2e2e", "lead": true, "title": "AI in Higher Education", "sub": "How generative AI is reshaping universities, publishers and libraries: institutional polic…"}, {"id": "ib", "kind": "theme", "label": "Information Behavior", "color": "#2f5d50", "lead": false, "title": "Information Behavior", "sub": "How people seek, share and use information in everyday academic life.…"}, {"id": "mis", "kind": "theme", "label": "Misinformation & Belief", "color": "#8a5a2b", "lead": false, "title": "Misinformation & Belief", "sub": "How the information people consume shapes beliefs, morality and trust.…"}, {"id": "dl", "kind": "theme", "label": "Digital Libraries", "color": "#5b6472", "lead": false, "title": "Digital Libraries", "sub": "Low-cost, automated library systems that widen access in resource-constrained settings.…"}, {"id": "genai-policy", "kind": "paper", "label": "GenAI—Stay Out of It or Find a Suitable Way to Incorporate It? A Policy Review of Academic Publishers and Universities", "title": "GenAI—Stay Out of It or Find a Suitable Way to Incorporate It? A Policy Review of Academic Publishers and Universities", "year": "2025", "color": "#7a2e2e", "sub": "Conference paper · 2025 · Best Paper", "w": 2}, {"id": "chatbot", "kind": "paper", "label": "Evaluating the Effectiveness of the AI-Powered Chatbot in Advancing User Support in Academic Libraries", "title": "Evaluating the Effectiveness of the AI-Powered Chatbot in Advancing User Support in Academic Libraries", "year": "2025", "color": "#7a2e2e", "sub": "Conference paper · 2025", "w": 0}, {"id": "elearning", "kind": "paper", "label": "Exploring university students’ perceptions and attitudes toward associated factors of electronic learning during the COVID-19 pandemic", "title": "Exploring university students’ perceptions and attitudes toward associated factors of electronic learning during the COVID-19 pandemic", "year": "2024", "color": "#7a2e2e", "sub": "Journal article · 2024", "w": 1}, {"id": "kis", "kind": "paper", "label": "Knowledge and Information Sharing Practices among Multidisciplinary University Dormitory Residents: Exploring the Influence of Gender, Academic Discipline, and Degree Level", "title": "Knowledge and Information Sharing Practices among Multidisciplinary University Dormitory Residents: Exploring the Influence of Gender, Academic Discipline, and Degree Level", "year": "2023", "color": "#2f5d50", "sub": "Journal article · 2023", "w": 1}, {"id": "webometric", "kind": "paper", "label": "Webometric analysis of alternative access to scholarly publication: special reference to LibGen and Sci-Hub", "title": "Webometric analysis of alternative access to scholarly publication: special reference to LibGen and Sci-Hub", "year": "2023", "color": "#1f3a5f", "sub": "Journal article · 2023", "w": 1}, {"id": "unlocking", "kind": "paper", "label": "Unlocking knowledge frontiers: Library Genesis and Sci-Hub as alternative gateways to scholarly publications", "title": "Unlocking knowledge frontiers: Library Genesis and Sci-Hub as alternative gateways to scholarly publications", "year": "2023", "color": "#1f3a5f", "sub": "Conference paper · 2023", "w": 0}, {"id": "religion", "kind": "paper", "label": "Assessing the Impact of Religious Information on Political Beliefs and Personal Morality among Bangladeshi People", "title": "Assessing the Impact of Religious Information on Political Beliefs and Personal Morality among Bangladeshi People", "year": "2023", "color": "#8a5a2b", "sub": "Conference paper · 2023", "w": 0}, {"id": "ethics", "kind": "paper", "label": "Perceptions and behaviors of academic library users towards ethical use of library resources and services: reference to university students", "title": "Perceptions and behaviors of academic library users towards ethical use of library resources and services: reference to university students", "year": "In review", "color": "#2f5d50", "sub": "Under review · ", "w": 0}], "links": [["sos", "aihe"], ["genai-policy", "aihe"], ["genai-policy", "sos"], ["chatbot", "aihe"], ["chatbot", "dl"], ["elearning", "aihe"], ["elearning", "ib"], ["kis", "ib"], ["webometric", "sos"], ["unlocking", "sos"], ["religion", "mis"], ["religion", "ib"], ["ethics", "ib"], ["ethics", "dl"]]};

  /* ---------- toast ---------- */
  const toast = $('#toast'); let tt;
  const say = (m) => { if (!toast) return; toast.textContent = m; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 2200); };

  /* ---------- theme ---------- */
  const themeBtn = $('#themeToggle');
  const setTheme = (t) => {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    themeBtn?.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    window.dispatchEvent(new CustomEvent('themechange'));
  };
  themeBtn?.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* ---------- nav: hide on scroll down, progress ---------- */
  const nav = $('.nav'), bar = $('.progress');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${h > 0 ? Math.min(y / h, 1) : 0})`;
    if (nav && !document.body.classList.contains('menu-open')) nav.classList.toggle('hide', y > lastY && y > 300);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- overlay menu ---------- */
  const menuBtn = $('#menuToggle'), overlay = $('#overlay');
  if (menuBtn && overlay) {
    const set = (open) => {
      overlay.classList.toggle('open', open); document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open)); overlay.setAttribute('aria-hidden', String(!open));
      menuBtn.innerHTML = open ? '<i class="fas fa-xmark" aria-hidden="true"></i>' : '<i class="fas fa-bars-staggered" aria-hidden="true"></i>';
      $$('a', overlay).forEach((a, i) => { a.style.transitionDelay = open ? `${0.15 + i * 0.05}s` : '0s'; a.tabIndex = open ? 0 : -1; });
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => set(!overlay.classList.contains('open')));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) set(false); });
    $$('a', overlay).forEach((a) => { a.tabIndex = -1; });
  }

  /* ---------- reveal ---------- */
  const rvEls = $$('.rv, .rv-clip');
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    rvEls.forEach((el) => io.observe(el));
  } else rvEls.forEach((el) => el.classList.add('in'));

  /* ---------- text scramble ---------- */
  const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const scramble = (el) => {
    const final = el.dataset.text || el.textContent; el.dataset.text = final;
    if (RM) return;
    let frame = 0; const len = final.length, total = 26;
    const tick = () => {
      let out = '';
      for (let i = 0; i < len; i++) {
        const revealAt = (i / len) * total * 0.8;
        out += frame >= revealAt + 6 || final[i] === ' ' ? final[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame++ < total + 6) requestAnimationFrame(tick); else el.textContent = final;
    };
    tick();
  };
  const scr = $$('[data-scramble]');
  if (scr.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { scramble(e.target); so.unobserve(e.target); } }), { threshold: 0.6 });
    scr.forEach((el) => so.observe(el));
  }

  /* ---------- counters ---------- */
  const count = (el) => {
    const end = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    if (RM) { el.textContent = end.toFixed(dec); return; }
    const t0 = performance.now(), d = 1600;
    const step = (t) => { const p = Math.min((t - t0) / d, 1), e = 1 - Math.pow(1 - p, 4); el.textContent = (end * e).toFixed(dec); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const cnt = $$('[data-count]');
  if (cnt.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { count(e.target); co.unobserve(e.target); } }), { threshold: 0.5 });
    cnt.forEach((c) => co.observe(c));
  }

  /* ---------- role rotator ---------- */
  const rot = $('[data-words]');
  if (rot && !RM) {
    const words = JSON.parse(rot.dataset.words); let wi = 0, ci = words[0].length, del = true;
    const tick = () => {
      rot.textContent = words[wi].slice(0, ci);
      let w = del ? 28 : 60;
      if (del) { if (--ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; w = 250; } }
      else if (++ci > words[wi].length) { del = true; ci = words[wi].length; w = 2400; }
      setTimeout(tick, w);
    };
    setTimeout(tick, 3200);
  }

  /* ---------- cursor, magnetic, spotlight ---------- */
  if (FINE && !RM) {
    const c = $('.cursor'), d = $('.cursor-dot');
    if (c && d) {
      let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
      addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`; document.body.classList.add('has-cursor'); }, { passive: true });
      document.addEventListener('pointerleave', () => document.body.classList.remove('has-cursor'));
      const loop = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); };
      loop();
      const lbl = c.querySelector('span');
      document.addEventListener('pointerover', (e) => {
        const t = e.target.closest('[data-cursor], a, button, input, textarea, label');
        c.classList.remove('is-link', 'is-label');
        if (!t) return;
        if (t.dataset.cursor) { c.classList.add('is-label'); lbl.textContent = t.dataset.cursor; }
        else if (!/input|textarea/i.test(t.tagName)) c.classList.add('is-link');
      });
    }
    $$('.magnetic').forEach((m) => {
      m.addEventListener('pointermove', (e) => { const r = m.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); m.style.transform = `translate(${dx * 0.25}px,${dy * 0.35}px)`; });
      m.addEventListener('pointerleave', () => { m.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)'; m.style.transform = ''; setTimeout(() => (m.style.transition = ''), 600); });
    });
    $$('[data-tilt]').forEach((t) => {
      t.addEventListener('pointermove', (e) => { const r = t.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; t.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`; t.style.setProperty('--sheen', `${(px + 0.5) * 200 - 60}%`); });
      t.addEventListener('pointerleave', () => { t.style.transform = ''; });
    });
  }
  document.addEventListener('pointermove', (e) => {
    const s = e.target.closest?.('.spot'); if (!s) return;
    const r = s.getBoundingClientRect(); s.style.setProperty('--mx', `${e.clientX - r.left}px`); s.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- WebGL aurora shader ---------- */
  const FRAG = `precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform float L;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;} vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 perm(vec3 x){return mod289(((x*34.)+1.)*x);}
float sn(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
i=mod289(i);vec3 p=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 mm=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
mm=mm*mm;mm=mm*mm;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;mm*=1.79284291400159-.85373472095314*(a0*a0+h*h);
vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(mm,g);}
float fbm(vec2 p){float f=0.,a=.5;for(int i=0;i<5;i++){f+=a*sn(p);p*=2.02;a*=.5;}return f;}
void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
float tt=t*.04; vec2 q=vec2(fbm(p*.55+tt),fbm(p*.55-tt+3.1));
vec2 mo=(m-.5)*vec2(r.x/min(r.x,r.y),r.y/min(r.x,r.y));
float md=exp(-3.*length(p-mo));
float n=fbm(p*.75+q*1.2+vec2(tt*1.3,-tt)+md*.5);
vec3 bgD=vec3(.027,.031,.051); vec3 bgL=vec3(.953,.945,.918);
vec3 ind=vec3(.486,.514,1.); vec3 cy=vec3(.369,.906,1.); vec3 li=vec3(.765,.961,.235);
float band=smoothstep(.0,.9,n+.25);
vec3 col=mix(ind,cy,smoothstep(-.2,.6,q.x));
col=mix(col,li,smoothstep(.35,.9,n)*.55);
float glow=band*(.55+.45*smoothstep(1.4,.0,length(p-vec2(.35,.15))));
glow+=md*.25;
vec3 dark=bgD+col*glow*.55;
vec3 pastel=mix(bgL,col,.42); vec3 light=mix(bgL,pastel,smoothstep(.05,.9,glow));
vec3 c=mix(dark,light,L);
float v=smoothstep(1.6,.2,length(uv-.5)*1.6); c*=mix(.75,1.,v)+L*.1;
gl_FragColor=vec4(c,1.);}`;
  const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  $$('canvas.shader').forEach((cv) => {
    const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) { cv.replaceWith(Object.assign(document.createElement('div'), { className: 'shader-fallback' })); return; }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.replaceWith(Object.assign(document.createElement('div'), { className: 'shader-fallback' })); return; }
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm'), uL = gl.getUniformLocation(pr, 'L');
    const inInk = !!cv.closest('.ink'); const themeL = () => (!inInk && root.getAttribute('data-theme') === 'light') ? 1 : 0;
    const mouse = { x: .7, y: .6, tx: .7, ty: .6 }; let visible = true, raf, L = themeL(), Lt = L;
    const scale = 0.5;
    const resize = () => { const w = cv.clientWidth, h = cv.clientHeight; cv.width = Math.max(1, w * scale); cv.height = Math.max(1, h * scale); gl.viewport(0, 0, cv.width, cv.height); };
    resize(); addEventListener('resize', resize);
    addEventListener('themechange', () => { Lt = themeL(); if (RM) draw(performance.now()); });
    cv.parentElement.addEventListener('pointermove', (e) => { const b = cv.getBoundingClientRect(); mouse.tx = (e.clientX - b.left) / b.width; mouse.ty = 1 - (e.clientY - b.top) / b.height; });
    const t0 = performance.now() - 20000;
    function draw(now) {
      mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04; L += (Lt - L) * 0.08;
      gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, RM ? 30 : (now - t0) / 1000); gl.uniform2f(uM, mouse.x, mouse.y); gl.uniform1f(uL, RM ? Lt : L);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    const loop = (now) => { if (visible && !document.hidden) draw(now); raf = requestAnimationFrame(loop); };
    if (RM) draw(performance.now()); else raf = requestAnimationFrame(loop);
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);
  });

  /* ---------- hero parallax ---------- */
  const hero = $('.hero');
  if (hero && FINE && !RM) {
    const layers = $$('[data-depth]', hero);
    let tx = 0, ty = 0, cx = 0, cy = 0, sy = 0;
    hero.addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; });
    addEventListener('scroll', () => { sy = scrollY; }, { passive: true });
    const loop = () => {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      if (sy < innerHeight * 1.2) layers.forEach((l) => { const d = parseFloat(l.dataset.depth); l.style.translate = `${-cx * d * 40}px ${-cy * d * 24 + sy * d * 0.25}px`; });
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- manifesto fill ---------- */
  const man = $('.manifesto');
  if (man) {
    const words = $$('.w', man);
    const upd = () => {
      const r = man.getBoundingClientRect(); const start = innerHeight * 0.85, end = innerHeight * 0.3;
      const p = Math.min(Math.max((start - r.top) / (start - end + r.height * 0.6), 0), 1);
      const n = Math.round(p * words.length); words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    if (RM) words.forEach((w) => w.classList.add('on')); else { addEventListener('scroll', upd, { passive: true }); upd(); }
  }

  /* ---------- journey horizontal ---------- */
  const jr = $('.journey');
  if (jr) {
    const track = $('.journey-track', jr), fill = $('.journey-bar span', jr);
    const mq = matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)');
    const upd = () => {
      if (mq.matches) { track.style.transform = ''; return; }
      const r = jr.getBoundingClientRect(); const total = jr.offsetHeight - innerHeight;
      const p = Math.min(Math.max(-r.top / total, 0), 1);
      const max = track.scrollWidth - innerWidth + 80;
      track.style.transform = `translate3d(${-p * max}px,0,0)`; if (fill) fill.style.transform = `scaleX(${p})`;
    };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* ---------- rail drag ---------- */
  $$('.rail').forEach((rail) => {
    let down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add('dragging'); });
    addEventListener('pointerup', () => { down = false; rail.classList.remove('dragging'); });
    rail.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; rail.scrollLeft = sl - dx; });
    rail.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    const id = rail.id;
    $$(`[data-rail="${id}"]`).forEach((b) => b.addEventListener('click', () => rail.scrollBy({ left: (b.dataset.dir === 'next' ? 1 : -1) * rail.clientWidth * 0.8, behavior: 'smooth' })));
  });

  /* ---------- in-view helpers (gantt, yearbars) ---------- */
  const inview = (el, fn, th = 0.25) => { if (!el) return; if (!('IntersectionObserver' in window)) return fn(); const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { fn(); o.disconnect(); } }, { threshold: th }); o.observe(el); };
  inview($('.gantt'), () => $('.gantt').classList.add('in'));
  inview($('.yearbars'), () => $$('.yearbars .bar').forEach((b) => (b.style.height = b.dataset.h)));

  /* ---------- accordions ---------- */
  $$('.xp-head').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'))));
  const ea = $('#expandAll');
  ea?.addEventListener('click', () => { const hs = $$('.xp-head'); const open = hs.some((h) => h.getAttribute('aria-expanded') !== 'true'); hs.forEach((h) => h.setAttribute('aria-expanded', String(open))); ea.querySelector('span').textContent = open ? 'Collapse all' : 'Expand all'; });

  /* ---------- publications ---------- */
  const plist = $('#plist');
  const openPub = (el, scroll) => {
    if (!el) return; el.classList.add('open'); $('.pub-head', el).setAttribute('aria-expanded', 'true');
    if (scroll) { el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); el.animate?.([{ boxShadow: '0 0 0 0 rgba(195,245,60,.6)' }, { boxShadow: '0 0 0 14px rgba(195,245,60,0)' }], { duration: 1200 }); }
  };
  if (plist) {
    const items = $$('.pub', plist);
    items.forEach((p) => $('.pub-head', p).addEventListener('click', () => { const o = p.classList.toggle('open'); $('.pub-head', p).setAttribute('aria-expanded', String(o)); }));
    const q = $('#pq'), cntEl = $('#pcount'), empty = $('#pempty');
    let fType = 'all', fTheme = 'all';
    const apply = () => {
      const t = (q?.value || '').trim().toLowerCase(); let n = 0;
      items.forEach((p) => {
        const ok = (fType === 'all' || p.dataset.type === fType) && (fTheme === 'all' || p.dataset.themes.split(' ').includes(fTheme)) && (!t || p.textContent.toLowerCase().includes(t));
        p.hidden = !ok; if (ok) n++;
      });
      if (cntEl) cntEl.textContent = `${n} / ${items.length} works`; empty?.classList.toggle('show', n === 0);
    };
    $$('[data-ftype]').forEach((b) => b.addEventListener('click', () => { fType = b.dataset.ftype; $$('[data-ftype]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); apply(); }));
    $$('[data-ftheme]').forEach((b) => b.addEventListener('click', () => { fTheme = fTheme === b.dataset.ftheme ? 'all' : b.dataset.ftheme; $$('[data-ftheme]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.ftheme === fTheme))); apply(); }));
    q?.addEventListener('input', apply); apply();
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (ev) => { const t = document.getElementById(a.getAttribute('href').slice(1)); if (t?.classList.contains('pub')) { ev.preventDefault(); openPub(t, true); history.replaceState(null, '', '#' + t.id); } }));
    const fromHash = () => { const h = location.hash.slice(1); const el = h ? document.getElementById(h) : null; if (el?.classList.contains('pub')) setTimeout(() => openPub(el, true), 300); };
    fromHash(); addEventListener('hashchange', fromHash);
    $$('[data-cite]').forEach((b) => b.addEventListener('click', async (e) => {
      e.stopPropagation(); const d = PUBDATA[b.dataset.id]; if (!d) return; const txt = b.dataset.cite === 'bib' ? d.bib : d.apa;
      try { await navigator.clipboard.writeText(txt); say(b.dataset.cite === 'bib' ? 'BibTeX copied' : 'APA citation copied'); } catch (err) { say('Copy failed — select the text manually'); }
    }));
  }

  /* ---------- research universe (force graph) ---------- */
  const svg = $('#universe');
  if (svg && GRAPH.nodes) {
    const NS = 'http://www.w3.org/2000/svg';
    const tip = $('#utip');
    let W = svg.clientWidth, H = svg.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const nodes = GRAPH.nodes.map((n, i) => ({ ...n, x: W / 2 + Math.cos(i * 2.4) * (n.kind === 'theme' ? 120 : 220), y: H / 2 + Math.sin(i * 2.4) * (n.kind === 'theme' ? 90 : 170), vx: 0, vy: 0 }));
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const links = GRAPH.links.map((l) => ({ s: byId[l[0]], t: byId[l[1]] }));
    const gE = document.createElementNS(NS, 'g'), gN = document.createElementNS(NS, 'g'); svg.append(gE, gN);
    links.forEach((l) => { l.el = document.createElementNS(NS, 'line'); l.el.setAttribute('class', 'edge'); gE.append(l.el); });
    nodes.forEach((n) => {
      const g = document.createElementNS(NS, 'g'); g.setAttribute('class', `node ${n.kind}`); g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', n.label);
      const c = document.createElementNS(NS, 'circle'); n.r0 = n.kind === 'theme' ? (n.lead ? 34 : 24) : 9 + (n.w || 0) * 3;
      c.setAttribute('r', n.r0); c.setAttribute('fill', n.kind === 'theme' ? n.color : 'var(--panel)'); c.setAttribute('stroke', n.color); c.setAttribute('stroke-width', n.kind === 'theme' ? 0 : 2.5);
      if (n.kind === 'theme') c.setAttribute('fill-opacity', '.9');
      const tx = document.createElementNS(NS, 'text'); tx.textContent = n.kind === 'theme' ? n.label : n.year || '';
      tx.setAttribute('text-anchor', 'middle'); tx.setAttribute('dy', n.kind === 'theme' ? n.r0 + 24 : -n.r0 - 7);
      g.append(c, tx); gN.append(g); n.el = g; n.c = c;
      const hot = (on) => {
        svg.classList.toggle('focus', on); nodes.forEach((m) => m.el.classList.remove('hot')); links.forEach((l) => l.el.classList.remove('hot'));
        if (on) { n.el.classList.add('hot'); links.forEach((l) => { if (l.s === n || l.t === n) { l.el.classList.add('hot'); l.s.el.classList.add('hot'); l.t.el.classList.add('hot'); } }); }
      };
      const showTip = (e) => {
        if (!tip) return; tip.innerHTML = `<b>${n.title || n.label}</b><span>${n.sub || ''}</span>`; tip.classList.add('show');
        const b = svg.getBoundingClientRect(); const px = (e?.clientX ?? b.left + n.x) - b.left, py = (e?.clientY ?? b.top + n.y) - b.top;
        tip.style.left = Math.min(px + 16, b.width - 310) + 'px'; tip.style.top = Math.max(py - 20, 10) + 'px';
      };
      g.addEventListener('pointerenter', (e) => { hot(true); showTip(e); n.fixed = true; });
      g.addEventListener('pointermove', showTip);
      g.addEventListener('pointerleave', () => { hot(false); tip?.classList.remove('show'); n.fixed = false; });
      g.addEventListener('focus', () => { hot(true); showTip(); }); g.addEventListener('blur', () => { hot(false); tip?.classList.remove('show'); });
      const go = () => {
        if (n.kind === 'paper') { const el = document.getElementById(n.id); if (el) openPub(el, true); }
        else { const b = document.querySelector(`[data-ftheme="${n.id}"]`); if (b) { b.click(); document.getElementById('publications')?.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); } }
      };
      g.addEventListener('click', go); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    // drag
    let drag = null;
    svg.addEventListener('pointerdown', (e) => { const g = e.target.closest('.node'); if (!g) return; drag = nodes.find((n) => n.el === g); svg.setPointerCapture(e.pointerId); });
    svg.addEventListener('pointermove', (e) => { if (!drag) return; const b = svg.getBoundingClientRect(); drag.x = (e.clientX - b.left) * (W / b.width); drag.y = (e.clientY - b.top) * (H / b.height); drag.vx = drag.vy = 0; render(); });
    svg.addEventListener('pointerup', () => { drag = null; });
    let alpha = 1;
    const stepSim = () => {
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j]; let dx = b.x - a.x, dy = b.y - a.y; let d2 = dx * dx + dy * dy || 1; const d = Math.sqrt(d2);
        const minD = a.r0 + b.r0 + (a.kind === 'theme' && b.kind === 'theme' ? 120 : 40); const f = (7000 / d2 + (d < minD ? (minD - d) * 0.1 : 0)) * alpha; dx /= d; dy /= d;
        a.vx -= dx * f; a.vy -= dy * f; b.vx += dx * f; b.vy += dy * f;
      }
      links.forEach((l) => { const dx = l.t.x - l.s.x, dy = l.t.y - l.s.y, d = Math.hypot(dx, dy) || 1; const target = l.s.kind === 'theme' && l.t.kind === 'theme' ? Math.min(W * 0.32, 340) : Math.min(W * 0.16, 150); const f = (d - target) * 0.012 * alpha; l.s.vx += dx / d * f; l.s.vy += dy / d * f; l.t.vx -= dx / d * f; l.t.vy -= dy / d * f; });
      nodes.forEach((n) => {
        n.vx += (W / 2 - n.x) * 0.0012 * alpha; n.vy += (H / 2 - n.y) * 0.0025 * alpha;
        
        if (n === drag || n.fixed) { n.vx = n.vy = 0; } n.vx *= 0.82; n.vy *= 0.82; n.x += n.vx; n.y += n.vy;
        const pad = n.r0 + 30; n.x = Math.max(pad, Math.min(W - pad, n.x)); n.y = Math.max(pad + 26, Math.min(H - pad - 34, n.y));
      });
      alpha = Math.max(alpha * 0.995, 0.05);
    };
    const render = () => {
      links.forEach((l) => { l.el.setAttribute('x1', l.s.x); l.el.setAttribute('y1', l.s.y); l.el.setAttribute('x2', l.t.x); l.el.setAttribute('y2', l.t.y); });
      nodes.forEach((n) => n.el.setAttribute('transform', `translate(${n.x.toFixed(1)},${n.y.toFixed(1)})`));
    };
    for (let i = 0; i < 500; i++) stepSim(); render();
    let urt; addEventListener('resize', () => { clearTimeout(urt); urt = setTimeout(() => { W = svg.clientWidth; H = svg.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H}`); alpha = 0.6; for (let i = 0; i < 200; i++) stepSim(); render(); }, 200); });
  }

  /* ---------- lightbox ---------- */
  const shots = $$('.shot'), lb = $('#lightbox');
  if (shots.length && lb) {
    const img = $('img', lb), h = $('h4', lb), p = $('p', lb); let idx = 0, last;
    const show = (i) => { idx = (i + shots.length) % shots.length; const s = shots[idx]; img.src = s.dataset.full; img.alt = s.dataset.title; h.textContent = s.dataset.title; p.textContent = s.dataset.desc; };
    const open = (i) => { last = document.activeElement; show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; $('.lb-close', lb).focus(); };
    const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; last?.focus(); };
    shots.forEach((s, i) => s.addEventListener('click', () => open(i)));
    $('.lb-close', lb).addEventListener('click', close); $('.lb-prev', lb).addEventListener('click', () => show(idx - 1)); $('.lb-next', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    addEventListener('keydown', (e) => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1); });
  }

  /* ---------- copy ---------- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => { try { await navigator.clipboard.writeText(b.dataset.copy); say('Copied to clipboard'); } catch (e) { say(b.dataset.copy); } }));

  /* ---------- CV ---------- */
  $('#printCv')?.addEventListener('click', () => print());
  const toc = $$('.cv-toc a[href^="#"]');
  if (toc.length && 'IntersectionObserver' in window) {
    const map = new Map(toc.map((a) => [a.getAttribute('href').slice(1), a]));
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { toc.forEach((a) => a.classList.remove('active')); map.get(e.target.id)?.classList.add('active'); } }), { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) o.observe(s); });
  }

  /* ---------- contact form (Web3Forms) ---------- */
  const form = $('#contactForm');
  if (form) {
    const st = $('#formStatus'), btn = $('button[type="submit"]', form), req = $$('[required]', form);
    const val = (el) => { const ok = el.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) : el.value.trim().length > 0; el.closest('.fg')?.classList.toggle('invalid', !ok); return ok; };
    req.forEach((el) => el.addEventListener('blur', () => val(el)));
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); st.className = 'status-msg';
      if (form.botcheck?.checked) { form.reset(); return; }
      const bad = req.filter((el) => !val(el));
      if (bad.length) { bad[0].focus(); st.textContent = 'Please complete the highlighted fields.'; st.className = 'status-msg bad'; return; }
      const data = new FormData(form); const topics = data.getAll('topic'); data.delete('topic'); if (topics.length) data.append('topics', topics.join(', '));
      const orig = btn.innerHTML; btn.disabled = true; btn.innerHTML = '<span>Sending…</span>';
      try {
        const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: data });
        const j = await r.json(); if (!j.success) throw new Error(j.message);
        form.reset(); st.textContent = 'Thank you — your message is on its way. I will reply soon.'; st.className = 'status-msg ok';
      } catch (err) { st.textContent = 'Sorry, the message could not be sent. Please email litonali@arizona.edu directly.'; st.className = 'status-msg bad'; }
      finally { btn.disabled = false; btn.innerHTML = orig; }
    });
  }

  /* ---------- local time (Tucson) ---------- */
  const lt = $$('[data-localtime]');
  if (lt.length) {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Phoenix', hour: '2-digit', minute: '2-digit', hour12: true });
    const upd = () => lt.forEach((el) => (el.textContent = f.format(new Date()) + ' in Tucson'));
    upd(); setInterval(upd, 30000);
  }
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- command palette ---------- */
  const pal = $('#palette');
  if (pal) {
    const input = $('input', pal), list = $('.palette-list', pal); let res = [], sel = 0, last;
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const hl = (s, w) => { if (!w) return esc(s); const i = s.toLowerCase().indexOf(w); return i < 0 ? esc(s) : esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + w.length)) + '</mark>' + esc(s.slice(i + w.length)); };
    const render = () => {
      const t = input.value.trim().toLowerCase(), ws = t.split(/\s+/).filter(Boolean);
      res = t ? SEARCH_INDEX.filter((r) => { const h = (r.t + ' ' + (r.s || '') + ' ' + r.g + ' ' + (r.k || '')).toLowerCase(); return ws.every((w) => h.includes(w)); }) : SEARCH_INDEX.filter((r) => r.g === 'Pages');
      res = res.slice(0, 40); sel = 0;
      if (!res.length) { list.innerHTML = `<div class="pal-empty">No matches for “${esc(input.value)}”</div>`; return; }
      let html = '', g = '';
      res.forEach((r, i) => { if (r.g !== g) { g = r.g; html += `<div class="pal-group">${esc(g)}</div>`; } html += `<a class="pal-item" role="option" id="pi-${i}" href="${r.u}" aria-selected="${i === 0}"><i class="${r.i}" aria-hidden="true"></i><span class="pt">${hl(r.t, ws[0] || '')}${r.s ? `<span class="ps">${esc(r.s)}</span>` : ''}</span><span class="pg">${esc(r.p)}</span></a>`; });
      list.innerHTML = html;
    };
    const mark = () => { $$('.pal-item', list).forEach((el, i) => el.setAttribute('aria-selected', String(i === sel))); const c = $(`#pi-${sel}`, list); c?.scrollIntoView({ block: 'nearest' }); input.setAttribute('aria-activedescendant', c ? c.id : ''); };
    const open = () => { last = document.activeElement; pal.classList.add('open'); pal.setAttribute('aria-hidden', 'false'); input.value = ''; render(); setTimeout(() => input.focus(), 30); };
    const close = () => { pal.classList.remove('open'); pal.setAttribute('aria-hidden', 'true'); last?.focus(); };
    $$('[data-palette]').forEach((b) => b.addEventListener('click', open));
    pal.addEventListener('click', (e) => { if (e.target === pal) close(); });
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, res.length - 1); mark(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); mark(); }
      else if (e.key === 'Enter' && res[sel]) { e.preventDefault(); close(); location.href = res[sel].u; }
    });
    list.addEventListener('click', close);
    addEventListener('keydown', (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName || '');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); pal.classList.contains('open') ? close() : open(); }
      else if (e.key === 'Escape' && pal.classList.contains('open')) close();
    });
  }
})();
