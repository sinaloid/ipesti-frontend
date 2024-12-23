const ipesti = [
    { slug: "histoire", label: "Histoire", children: [] },
    { slug: "vision-missions", label: "Vision & Missions", children: [] },
    {
        slug: "structure-et-gouvernance",
        label: "Structure & Gouvernance",
        children: [
            {
                slug: "detail",
                label: "Structure & gouvernance",
                children: [],
            },
            {
                slug: "laboratiores-associes",
                label: "Tous les laboratoires associés",
                children: [],
            },
            {
                slug: "conseil-scientifique",
                label: "Conseil scientifique",
                children: [],
            },
        ],
    },
    {
        slug: "equipes",
        label: "Equipes",
        children: [
            {
                slug: "equipes-de-direction-administrative",
                label: "Equipe de direction administrative",
                children: [],
            },
            {
                slug: "tous",
                label: "Tous",
                children: [],
            },
            { slug: "chercheurs", label: "Chercheurs", children: [] },
            { slug: "doctorants", label: "Doctorants", children: [] },
            {
                slug: "post-doctorants",
                label: "Post Doctorants",
                children: [],
            },
            {
                slug: "chercheurs-associes",
                label: "Chercheurs Associés",
                children: [],
            },
        ],
    },

    {
        slug: "partenaires-de-recherche",
        label: "Partenaires de recherche",
        children: [
            {
                slug: "partenaires-nationaux",
                label: "Partenaires académiques nationaux",
                children: [],
            },
            {
                slug: "partenaires-internationaux",
                label: "Partenaires académiques internationaux",
                children: [],
            },
            {
                slug: "partenaires-sectoriels-et-industriels",
                label: "Partenaires sectoriels et industriels",
                children: [],
            },
        ],
    },
    {
        slug: "opportunites",
        label: "Opportunités",
        children: [
            {
                slug: "bourses",
                label: "Bourses et soutiens à la recherche",
                children: [],
            },
            { slug: "stages", label: "Programme de stage", children: [] },
        ],
    },
    {
        slug: "prix-et-distinctions",
        label: "Prix & distinctions",
        children: [],
    },
];

const recherche = [
    {
        slug: "programmes-de-recherche",
        label: "Programmes de recherche",
        children: [
            {
                slug: "science-technologie-et-societe",
                label: "Science Technologie et société",
                children: [],
            },
            {
                slug: "enseignement-superieur-et-societe",
                label: "Enseignement Supérieur et société ",
                children: [],
            },
            {
                slug: "innovation",
                label: "Innovation",
                children: [],
            },
            {
                slug: "entrepreneuriat-et-developpement-regional",
                label: "Entrepreneuriat et développement régional",
                children: [],
            },
            {
                slug: "digitalisation",
                label: "Digitalisation de l’Enseignement Supérieur, la Science, la technologie et l’Innovation",
                children: [],
            },
            {
                slug: "ethique-et-qualite",
                label: "Ethique et Qualité dans L'enseignement Supérieur et la recherche",
                children: [],
            },
        ],
    },
    {
        slug: "projets-de-recherche",
        label: "Projets de recherche",
        children: [],
    },
    {
        slug: "seminaires-de-recherche",
        label: "Séminaires de recherche",
        children: [],
    },
    {
        slug: "tous-les-seminaires",
        label: "Tous les séminaires de l’IPESTI",
        children: [],
    },
];

const formation = [
    {
        slug: "formation-courte-duree",
        label: "Formation courte durée",
        children: [],
    },
    {
        slug: "formation-longue-duree",
        label: "Formation longue durée",
        children: [
            {
                slug: "licence",
                label: "Licence",
                children: [],
            },
            {
                slug: "master",
                label: "Master",
                children: [],
            },
            {
                slug: "doctorat",
                label: "Doctorat",
                children: [],
            },
            


        ],
    },
    { slug: "phd-academy", label: "PhD Academy", children: [] },
    { slug: "etudes", label: "Etudier à IPESTI", children: [] },
];

const publication = [
    { slug: "theses", label: "Thèses", children: [] },
    { slug: "rapports-annuels", label: "Rapports annuels", children: [] },
    { slug: "articles", label: "Articles", children: [] },
    { slug: "livres", label: "Livres", children: [] },
    {
        slug: "rapport-de-projets",
        label: "Rapport de projets",
        children: [],
    },
    {
        slug: "plans-strategiques",
        label: "Plans stratégiques",
        children: [],
    },
    { slug: "newsletters", label: "Newsletters", children: [] },
];

const expertise = [
    {
        slug: "centres",
        label: "Centres",
        children: [
            {
                slug: "centre-expertise-decision",
                label: "Centre d’Expertise et d’Aide à la Décision",
                children: [],
            },
            {
                slug: "enseignement-superieur",
                label: "Observatoire de l’Enseignement Supérieur",
                children: [],
            },
            {
                slug: "science-technologie",
                label: "Observatoire de la Science et de la Technologie",
                children: [],
            },
            {
                slug: "innovation",
                label: "Observatoire de l’Innovation",
                children: [],
            },
            {
                slug: "ethique-et-qualite",
                label: "Observatoire d’éthique et la Qualité de l’Enseignement supérieur",
                children: [],
            },
            {
                slug: "transformation-numerique",
                label: "Observatoire de la transformation numérique",
                children: [],
            },
        ],
    },
];

const actualites = [
    { slug: "actualites", label: "Actualités", children: [] },
    { slug: "evenements", label: "événements", children: [] },
];

const fasolics = [
    {
        slug: "a_propos",
        label: "A propos",
        children: [
            { slug: "objectifs", label: "Objectifs", children: [] },
            { slug: "thematiques", label: "Thématiques", children: [] },
            { slug: "gouvernance", label: "Gouvernance", children: [] },
            { slug: "impacts", label: "Impacts", children: [] },
            { slug: "projets-de-rcr", label: "Projets de RCR", children: [] },
            {
                slug: "organisations-partenaires",
                label: "Organisations partenaires",
                children: [],
            },
        ],
    },
    {
        slug: "nos-activites",
        label: "Nos activités",
        children: [
            {
                slug: "les-academies-doctorales",
                label: "Les Académies Doctorales",
                children: [],
            },
            {
                slug: "conferences-scientifiques",
                label: "Conférences scientifiques",
                children: [],
            },
            {
                slug: "programme-de-bourses",
                label: "Programme de bourses",
                children: [],
            },
            {
                slug: "bourses-de-sejour",
                label: "Bourses de séjour postdoctorales",
                children: [],
            },
            {
                slug: "serie-de-webinaires",
                label: "Série de webinaires",
                children: [],
            },
            {
                slug: "strategie-de-mentorat",
                label: "Stratégie de mentorat",
                children: [],
            },
            {
                slug: "toutes-les-annonces",
                label: "Toutes les annonces ",
                children: [],
            },
        ],
    },
];

export { ipesti, recherche, formation, publication, actualites, expertise, fasolics };
