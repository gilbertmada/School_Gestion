
const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decemnbre",
];

const usersRoles = [
  {
    code: "ADMIN",
    label: "Administrateur",
    access: ["all modules", "back office"],
  },
  {
    code: "PROV",
    label: "Proviseur",
    access: ["all modules", "back office"],
  },
  {
    code: "PA",
    label: "Proviseur-Adjoint",
    access: ["all modules", "back office"],
  },
  {
    code: "DIR",
    label: "Directeur",
    access: ["all modules", "back office"],
  },
  {
    code: "DIRC",
    label: "Directrice",
    access: ["all modules", "back office"],
  },
  { code: "SURV", label: "Survaillant", access: ["all modules"] },
  { code: "SURVE", label: "Survaillante", access: ["all modules"] },

];

const profRoles = [
  {
    code: "PROF",
    label: "Professeur",
  },
  {
    code: "INST",
    label: "Instituteur",
  },
  {
    code: "INST",
    label: "Institutrice",
  },
  {
    code: "MAIT",
    label: "Maître",
  },
  {
    code: "MAIT",
    label: "Maîtresse",
  },
]
const matieres = ["Malagasy", "Philosophie", "Français", "Anglais", "Science-Eco-Social", "Mathématiques", "PC", "SVT", "Histo-Géo"];

const allUsers = ["ADMIN", "DIR", "PROV", "SURV", "ELEV", "PROF"];

const admins = ["ADMIN", "DIR", "PROV", "PA", "SURV"];

const utilisateurPermission = ["ADMIN", "DIR", "PROV", "PA", "SURV"];

const formatAmountToFr = (data: any) => {
  return `${new Intl.NumberFormat("de-DE").format(+data)} Ar`;
};

export {
  admins,
  usersRoles,
};

export {
  profRoles,
};

export {
  allUsers,
};

export {
  months,
};

export {
  days,
};

export {
  utilisateurPermission,
};

export {
  matieres,
};

export {
  formatAmountToFr,
};