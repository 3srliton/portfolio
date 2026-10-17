# -*- coding: utf-8 -*-
# All content: Md Liton Ali's own website, Google Scholar profile and published papers.
SITE = "https://www.litonali.com"
NAME = "Md Liton Ali"
EMAIL = "litonali@arizona.edu"
PHONE = "+8801797709873"
SCHOLAR = "https://scholar.google.com/citations?user=ygCGG80AAAAJ&hl=en"

SOCIALS = [
    ("LinkedIn", "fab fa-linkedin-in", "https://www.linkedin.com/in/3srliton/"),
    ("Google Scholar", "fas fa-graduation-cap", SCHOLAR),
    ("GitHub", "fab fa-github", "https://github.com/3srliton"),
    ("X (Twitter)", "fab fa-x-twitter", "https://x.com/3srliton"),
    ("Facebook", "fab fa-facebook-f", "https://www.facebook.com/3srliton"),
    ("Instagram", "fab fa-instagram", "https://www.instagram.com/3srliton"),
]

# ---------------------------------------------------------------- research themes
THEMES = {
    "sos": dict(name="Science of Science", short="SciSci", color="#1f3a5f", icon="fas fa-diagram-project",
                lead=True, blurb="How scholarly knowledge is produced, published and accessed: scholarly communication, publishing policy, webometrics and the shadow libraries people turn to when access is blocked."),
    "aihe": dict(name="AI in Higher Education", short="AI + HE", color="#7a2e2e", icon="fas fa-microchip",
                 lead=True, blurb="How generative AI is reshaping universities, publishers and libraries: institutional policy, AI-powered library services, and AI's effect on how students learn and perform."),
    "ib": dict(name="Information Behavior", short="Info Behavior", color="#2f5d50", icon="fas fa-people-arrows",
               lead=False, blurb="How people seek, share and use information in everyday academic life."),
    "mis": dict(name="Misinformation & Belief", short="Fake News", color="#8a5a2b", icon="fas fa-shield-halved",
                lead=False, blurb="How the information people consume shapes beliefs, morality and trust."),
    "dl": dict(name="Digital Libraries", short="Libraries", color="#5b6472", icon="fas fa-book-open-reader",
               lead=False, blurb="Low-cost, automated library systems that widen access in resource-constrained settings."),
}

# ---------------------------------------------------------------- publications
# type: journal | conference | review
PUBS = [
    dict(id="genai-policy", year=2025, type="conference", award="Best Paper Award",
         title="GenAI—Stay Out of It or Find a Suitable Way to Incorporate It? A Policy Review of Academic Publishers and Universities",
         authors="Ali, M. L.", venue="International Conference on Information and Knowledge Management (IIKM)", details="4(1), 65–66",
         themes=["aihe", "sos"], url=None,
         summary="A policy review of how academic publishers and universities are responding to generative AI, set around the question in the title: should institutions keep GenAI out of scholarship, or find a suitable way to incorporate it?",
         method="Policy review of academic publishers' and universities' published positions on generative AI.",
         findings=None),
    dict(id="chatbot", year=2025, type="conference", award=None,
         title="Evaluating the Effectiveness of the AI-Powered Chatbot in Advancing User Support in Academic Libraries",
         authors="Ali, M. L., & Reza, R. B.", venue="International Conference on Reimagining Librarianship", details="",
         themes=["aihe", "dl"], url=None,
         summary="Evaluates how well an AI-powered chatbot advances user support in academic libraries, asking whether conversational AI can extend the reach of reference and help services.",
         method="Effectiveness evaluation of an AI-powered library chatbot.",
         findings=None),
    dict(id="elearning", year=2024, type="journal", award=None, cited=1,
         title="Exploring university students’ perceptions and attitudes toward associated factors of electronic learning during the COVID-19 pandemic",
         authors="Ali, M. L.", venue="Advances in Online Education: A Peer-Reviewed Journal", details="3(1), 38–51", doi="10.69554/CCKQ7896",
         themes=["aihe", "ib"], url="https://drive.google.com/file/d/1rGJd07rdm7skd5Zv-xjpg7NOpO9mFpE8/view?usp=drive_link",
         summary="Examines how University of Dhaka students perceived the forced shift to electronic learning during COVID-19, and which technological, pedagogical, institutional and individual factors shaped their acceptance of it.",
         method="Cross-sectional online survey of 412 University of Dhaka students; closed questions analysed in SPSS, open questions coded thematically.",
         findings=["Performance expectancy, social influence, facilitating conditions, perceived usefulness and ease of use shape acceptance of e-learning.",
                   "Individual innovativeness and e-learning preparedness positively influence adoption.",
                   "Closing the digital divide, building digital literacy and involving students in e-learning policy could improve outcomes."],
         n=412),
    dict(id="kis", year=2023, type="journal", award=None,
         title="Knowledge and Information Sharing Practices among Multidisciplinary University Dormitory Residents: Exploring the Influence of Gender, Academic Discipline, and Degree Level",
         authors="Ali, M. L.", venue="Journal of Information and Knowledge Management (JIKM)", details="13(2), 1–16",
         themes=["ib"], url="https://journal.uitm.edu.my/index.php/JIKM/article/download/4732/2552/17605",
         summary="Studies the culture of knowledge and information sharing among students living in 16 dormitories of a large public university in Bangladesh, and how it varies by gender, discipline and degree level.",
         method="Structured questionnaire; 337 usable responses from 16 dormitories; descriptive statistics, t-tests and ANOVA in SPSS.",
         findings=["Students share knowledge and information with peers frequently; about 30% do so “very often”.",
                   "85.46% see knowledge and information sharing as important for career development.",
                   "Male students report sharing more often, and attitudes differ significantly by gender; discipline shows no significant difference.",
                   "Top barriers: low awareness of knowledge sharing and social media addiction."],
         n=337),
    dict(id="webometric", year=2023, type="journal", award=None,
         title="Webometric analysis of alternative access to scholarly publication: special reference to LibGen and Sci-Hub",
         authors="Ali, M. L.", venue="International Journal of Information and Knowledge Studies (IJIKS)", details="3(1), 85–102",
         themes=["sos"], url="https://scispace.com/pdf/webometric-analysis-of-alternative-access-to-scholarly-3q06tl5ewb.pdf",
         summary="Uses webometrics to map worldwide usage and growth of Library Genesis and Sci-Hub, the shadow libraries that researchers turn to when scholarly publications are priced out of reach.",
         method="Webometric analysis using LibGen and Sci-Hub databases, SimilarWeb web analytics and Sci-Hub download logs, with quantitative and qualitative analysis (data to 2022).",
         findings=["LibGen and Sci-Hub show a remarkable surge in popularity despite copyright disputes and restrictions.",
                   "Users come from many nations, including developed countries such as the USA.",
                   "Science and technology dominate downloads, with medicine the most sought-after field.",
                   "High prices and limited availability of scholarly publications are the two main drivers."]),
    dict(id="unlocking", year=2023, type="conference", award=None,
         title="Unlocking knowledge frontiers: Library Genesis and Sci-Hub as alternative gateways to scholarly publications",
         authors="Ali, M. L.", venue="International Conference on Information and Knowledge Management (IIKM)", details="3(1), 63–64",
         themes=["sos"], url=None,
         summary="Conference presentation of the LibGen and Sci-Hub webometric study, highlighting what shadow-library usage reveals about pricing, access barriers and traditional publishing models.",
         method="Webometric analysis (LibGen and Sci-Hub databases, SimilarWeb, Sci-Hub download data).",
         findings=["Downloads frequently come from highly regarded publishers and journals.",
                   "Implications for policymakers, publishers and researchers addressing demand for affordable scholarly access."]),
    dict(id="religion", year=2023, type="conference", award=None,
         title="Assessing the Impact of Religious Information on Political Beliefs and Personal Morality among Bangladeshi People",
         authors="Ali, M. L., Mahmud, M. R., & Reza, R. B.", venue="International Conference on Library & Information Science (ICLIS 2023)", details="p. 45",
         themes=["mis", "ib"], url=None,
         summary="Explores how religious information shapes the personal morality and political beliefs of Bangladeshi citizens, in a country where religion plays a central role in society and politics.",
         method="Online survey of 210 respondents (convenience sampling), five-point Likert scale, Mann–Whitney U and Kruskal–Wallis tests.",
         findings=["Religious information has an impact on Bangladeshi citizens' morality and political beliefs.",
                   "Opinions differ significantly by educational level, current residency and information literacy."],
         n=210),
    dict(id="ethics", year=None, type="review", award=None,
         title="Perceptions and behaviors of academic library users towards ethical use of library resources and services: reference to university students",
         authors="Ali, M. L.", venue="Manuscript under review", details="",
         themes=["ib", "dl"], url=None,
         summary="Investigates how university students perceive and practise the ethical use of academic library resources and services.",
         method=None, findings=None),
]

NOW = [
    dict(status="In progress", title="AI and university students' academic performance", theme="aihe",
         text="A research project on how AI tools affect the academic performance of university students."),
    dict(status="In progress", title="Systematic review: GenAI in second-language speaking", theme="aihe",
         text="Mapping the pedagogical designs and roles of generative AI in L2 speaking learning, guided by the task-based language teaching framework."),
    dict(status="Planned", title="Systematic review: AI in higher education", theme="aihe",
         text="A systematic review of research on artificial intelligence across higher education."),
    dict(status="Ongoing", title="Zero-budget digital library framework", theme="dl",
         text="A framework that lets school and college libraries in Bangladesh and other low-resource settings build digital services at zero cost, using free tools and minimal technical skill."),
]

EXPERIENCE = [
    dict(title="Graduate Associate, Teaching", org="INFO 557: Neural Networks · College of Information Science, University of Arizona", period="2026 – Present", icon="fas fa-chalkboard-user", current=True,
         points=["Grade student assignments, including supervised and unsupervised neural networking methods.",
                 "Monitor student discussion on Discord and D2L (learning management system).",
                 "Engage students in the online learning environment by holding virtual office hours and discussions."]),
    dict(title="Assistant Public Relation Officer", org="International Affairs and External Communication Office, Islamic University of Technology (IUT)", period="2025 – 2026", icon="fas fa-earth-asia", current=False,
         points=["Ensured smooth coordination and support for international students, from admission to graduation.",
                 "Served as the primary contact for international student inquiries, services, and documentation.",
                 "Facilitated communication between international students and university departments.",
                 "Assisted with visa processing, accommodation, orientation programs, and cultural integration.",
                 "Coordinated with embassies, partner institutions, and government bodies on student-related matters.",
                 "Maintained up-to-date records and provided reports on international student affairs.",
                 "Promoted a welcoming and inclusive environment for international students."]),
    dict(title="Assistant Cataloguer", org="Islamic University of Technology (IUT)", period="2022 – 2026", icon="fas fa-book", current=False,
         points=["Led the modernization of the library's digital presence: designed a new library website, developed the Koha database, and integrated barcode-based circulation with automated email notifications.",
                 "Managed 100,000+ reading materials across multiple institutions, integrating department-wise textbook lists and e-resources; trained 10+ staff members in web-based library organization and automated all library sections to reduce manual work."]),
    dict(title="Research Assistant", org="Land Administration Training Center, Ministry of Land", period="2022 – 2024", icon="fas fa-map-location-dot", current=False,
         points=["Completed projects on public perception of land management digitization and on assessing training impact.",
                 "Designed and implemented comprehensive surveys and interviews across 8 divisions of Bangladesh.",
                 "Used statistical software for data analysis, presented findings in detailed reports, and improved training programs based on data-driven insights."]),
    dict(title="Research Assistant", org="University of Dhaka", period="2021 – 2022", icon="fas fa-magnifying-glass-chart", current=False,
         points=["Completed two research projects on building a knowledge-based society and on post-independence village life transformation in Rajshahi district.",
                 "Coordinated a 30-member research team, conducted fieldwork in 24 villages, and facilitated data collection through surveys and interviews.",
                 "Analyzed qualitative and quantitative data, developed reports, and presented findings to academic peers and community representatives."]),
]

FIELD = [
    ("Tairunnessa Memorial Medical College & Hospital Library", "Project Coordinator", (2024, 1), (2024, 8), "Jan 2024 – Aug 2024"),
    ("International Mother Language Institute", "Project Member", (2021, 1), (2022, 12), "2021 – 2022"),
    ("University of Skill Enrichment and Technology Library", "Project Executive", (2020, 1), (2020, 3), "Jan 2020 – Mar 2020"),
    ("Bangladesh Police Staff College Library", "Project Executive", (2019, 1), (2019, 3), "Jan 2019 – Mar 2019"),
    ("Bangladesh National Parliament House Library", "Project Executive", (2018, 4), (2018, 6), "Apr 2018 – Jun 2018"),
    ("Institute of Business Administration (IBA) Library, DU", "Project Executive", (2018, 1), (2018, 3), "Jan 2018 – Mar 2018"),
    ("Government Madrasah-e-Alia Library", "Project Executive", (2017, 9), (2018, 9), "Sep 2017 – Sep 2018"),
    ("Bangladesh Supreme Court Bar Association Library", "Project Executive", (2017, 6), (2017, 9), "Jun 2017 – Sep 2017"),
    ("Quazi Nooruzzaman Memorial Library", "Project Executive", (2017, 4), (2018, 3), "Apr 2017 – Mar 2018"),
    ("Bangladesh Foreign Service Academy Library", "Project Executive", (2017, 2), (2019, 12), "Feb 2017 – Dec 2019"),
    ("Department of Zoology Seminar Library, DU", "Project Executive", (2017, 2), (2017, 3), "Feb 2017 – Mar 2017"),
    ("Dept. of Communication Disorders Seminar Library, DU", "Project Executive", (2017, 1), (2022, 3), "Jan 2017 – Mar 2022"),
]

TRAINING = [
    ("2026", "Software Carpentry using Python", "University of Arizona Library"),
    ("2026", "Strategic Science Communication", "COMSTECH – OIC"),
    ("2025", "Library Automation and Digitization using SLiMS", "BALID Institute of Information Management (BIIM)"),
    ("2025", "E-Book Preparation and Management", "Bangladesh National Scientific and Technical Documentation Center (BANSDOC)"),
    ("2024", "Modern Library Management", "Bangladesh National Archives and Library"),
    ("2024", "Statistical Analysis with R Programming", "DataScape"),
    ("2023", "Paper-based Research Learning", "CHINTA Research Bangladesh"),
    ("2021", "HTML5, CSS3 & Bootstrap 4 for Web Development", "Shikho Technologies"),
    ("2019", "Web Designing using HTML, CSS & JavaScript", "IIT, University of Dhaka"),
    ("2019", "KOHA Installation & Customization", "Daffodil International University"),
    ("2017", "Old Manuscript Reading and Translating", "Dhaka University Library"),
    ("2016", "Computer Fundamentals & OS Basics", "ISLM, University of Dhaka"),
]

EDUCATION = [
    dict(years="Fall 2026 – Present", degree="PhD in Information Science", org="College of Information Science, University of Arizona, USA", badge="In progress", seal="images/web/university-of-arizona-logo.webp", abbr="UA", current=True),
    dict(years="2020 – 2021", degree="Master of Arts in Information Science & Library Management", org="University of Dhaka", badge="CGPA 3.97 / 4.00 · Gold Medal", seal="images/web/university-of-dhaka-logo.webp", abbr="DU", current=False),
    dict(years="2015 – 2019", degree="Bachelor in Information Science & Library Management", org="University of Dhaka", badge="CGPA 3.90 / 4.00", seal="images/web/university-of-dhaka-logo.webp", abbr="DU", current=False),
    dict(years="2015", degree="Higher Secondary Certificate (HSC)", org="Kaliganj Haat Degree College, Rajshahi", badge="GPA 5.00 / 5.00", seal=None, abbr="HSC", current=False),
    dict(years="2013", degree="Secondary School Certificate (SSC)", org="Dr. Abu Bakar High School, Rajshahi", badge="GPA 4.81 / 5.00", seal=None, abbr="SSC", current=False),
]

SKILLS = [
    ("fas fa-database", "Library Systems", ["Koha", "DSpace", "SLiMS", "Greenstone", "DocuDex", "RFID", "Cataloging", "Classification", "Dublin Core", "MARC / RDA", "Automation", "Digitization"]),
    ("fas fa-code", "Technical", ["Python", "R", "HTML", "CSS", "JavaScript", "Database Management", "Web Design", "Networking", "Web Archiving", "Web Scraping"]),
    ("fas fa-flask", "Research Methods", ["Systematic Review", "Policy Review", "Webometrics", "Survey Design", "SPSS", "VOSviewer", "NVivo", "Quantitative Methods", "Qualitative Methods", "Academic Writing"]),
]

AWARDS = [
    ("Research", "fas fa-microscope", [
        ("fas fa-medal", "Best Paper Award, International Conference on Information and Knowledge Management (IIKM 2025), for the GenAI policy review of academic publishers and universities"),
    ]),
    ("Academic Distinction", "fas fa-graduation-cap", [
        ("fas fa-medal", "Mohammad Shahidullah Memorial Gold Medal (Masters)"),
        ("fas fa-trophy", "Dean's Merit List of Honour (Masters)"),
        ("fas fa-trophy", "Dean's Merit List of Honour (Undergraduate)"),
        ("fas fa-star", "Provost Award of Academic Excellence"),
        ("fas fa-book", "Book Grant from the University of Dhaka for outstanding results in Masters"),
    ]),
    ("Scholarships", "fas fa-hand-holding-dollar", [
        ("fas fa-award", "University Grants Commission (UGC) Undergraduate Scholarship"),
        ("fas fa-award", "Mitsubishi UFJ Foundation Scholarship"),
        ("fas fa-award", "Merit Scholarship, University of Dhaka"),
        ("fas fa-award", "ISLM Alumni Association Scholarship"),
        ("fas fa-award", "Dhaka University Alumni Association Scholarship"),
    ]),
    ("Professional & Community", "fas fa-people-group", [
        ("fas fa-trophy", "First Place, Internship at Dhaka University Library"),
        ("fas fa-trophy", "First Place, Internship at BANSDOC"),
        ("fas fa-trophy", "Training Presentation Award, Bangladesh National Archives and Library"),
        ("fas fa-trophy", "First Position, Computer Fundamentals & OS Basics Training, University of Dhaka"),
        ("fas fa-droplet", "Blood Donor Recognition from Badhan (donated blood more than 12 times)"),
    ]),
]

GALLERY = [
    ("iikm4b", "Best Paper Award", "Receiving the Best Paper Award at the International Conference on Information and Knowledge Management (IIKM)."),
    ("gold", "Gold Medal Reception", "Receiving the Mohammad Shahidullah Memorial Gold Medal at the University of Dhaka."),
    ("deans", "Dean's Award", "Receiving the Dean's Award at the University of Dhaka."),
    ("provost", "Provost Award of Academic Excellence", "Receiving the Provost Award of Academic Excellence at the University of Dhaka."),
    ("dumerit", "Meritorious Students' Reception", "With the top students of two batches at the University of Dhaka's reception for meritorious students, held at the Vice-Chancellor's residence in December 2022."),
    ("iikm3", "International Conference Presentation", "Presenters' photo session at the International Conference on Information and Knowledge Management (IIKM)."),
    ("national2", "Training Presentation Award", "Receiving the Training Presentation Award and prize at the Bangladesh National Archives and Library."),
    ("national", "Modern Library Management Training", "With fellow participants at the National Library of Bangladesh during the Modern Library Management training."),
    ("ittraining", "First Position in IT Training", "Receiving the First Position award in Computer Fundamentals and OS Basics training at the University of Dhaka."),
    ("sympo", "International Symposium on SDGs", "At the International Symposium on Empowering LIS Professionals for Achieving SDGs, where he served as an organizing volunteer."),
    ("kohat", "Koha-ILS Training", "Receiving the Koha-ILS training certificate at Daffodil International University (DIU)."),
    ("blood", "Blood Donor Recognition", "Receiving blood donor recognition from Badhan at the University of Dhaka."),
]

MEMBERSHIPS = [
    ("ASIS&T", "Association for Information Science and Technology"),
    ("ALISE", "Association for Library and Information Science Education"),
    ("ACM", "Association for Computing Machinery"),
    ("AAS", "Association for Asian Studies"),
    ("BALID", "Bangladesh Association of Librarians, Information Scientists and Documentalists"),
    ("LAB", "Library Association of Bangladesh"),
    ("BAIFA", "Bibliotheca Alexandrina Information for Africa"),
]

LEAD_ROLES = [
    ("2025 – 2026", "Chair-Elect", "SIG-AVC, Association for Information Science and Technology (ASIS&T)", True),
    ("Peer review", "Reviewer", "Global Knowledge, Memory and Communication · Emerald Publishing", False),
    ("ASIS&T", "Communication Officer", "SIG-VIS, Association for Information Science and Technology (ASIS&T)", False),
]

VOLUNTEER = [
    ("Professional Events", "fas fa-calendar-check", [
        ("Organizing Volunteer", "International Symposium on Empowering LIS Professionals for Achieving SDGs"),
        ("Rapporteur", "International Conference on the Role of LIS Professionals in the 4IR, Library Association of Bangladesh"),
        ("Event Organizing Volunteer", "Librarians Times Bangladesh"),
        ("Event Organizer", "Directorate of Public Libraries and Biswashahitya Kendro"),
    ]),
    ("Student Leadership", "fas fa-users", [
        ("President", "Information 71 (Dhaka University-based students' association)"),
        ("Executive Member", "University Students Association of Tanore"),
        ("Tourism Affairs Secretary", "Rajshahi Students Association of Dhaka University"),
    ]),
    ("Community Service", "fas fa-hand-holding-heart", [
        ("Education Secretary", "Ratoil Social Welfare Organization, Tanore, Rajshahi"),
        ("Volunteer", "Badhan — a blood donor organization"),
        ("Campaign Volunteer", "Sondhani — a blood donor organization"),
        ("Amanuensis", "Anirban — an organization supporting blind students"),
        ("Social Work Volunteer", "Dhaka University Alumni Association (DUAA)"),
    ]),
]

JOURNEY = [
    ("2013", "SSC", "Dr. Abu Bakar High School, Rajshahi", "GPA 4.81"),
    ("2015", "HSC", "Kaliganj Haat Degree College, Rajshahi", "GPA 5.00"),
    ("2015–19", "Bachelor's", "Information Science & Library Management, University of Dhaka", "CGPA 3.90"),
    ("2017", "First automation project", "Begins a run of 12 library automation and digitization projects", "12 libraries"),
    ("2020–21", "Master's + Gold Medal", "University of Dhaka, top of the cohort", "CGPA 3.97"),
    ("2022", "Islamic University of Technology", "Assistant Cataloguer; Koha, website and automation for 100K+ items", "100K+ items"),
    ("2025", "Best Paper, IIKM", "GenAI policy review of academic publishers and universities", "Award"),
    ("2026", "PhD, University of Arizona", "Information Science; Graduate Teaching Associate for INFO 557", "Now"),
]
