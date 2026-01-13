const baseTeams = {
  RCB: {
    name: 'Royal Challengers Bangalore',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  MI: {
    name: 'Mumbai Indians',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  CSK: {
    name: 'Chennai Super Kings',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  DC: {
    name: 'Delhi Capitals',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  KKR: {
    name: 'Kolkata Knight Riders',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  SRH: {
    name: 'Sunrisers Hyderabad',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  RR: {
    name: 'Rajasthan Royals',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  PK: {
    name: 'Punjab Kings',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  GT: {
    name: 'Gujarat Titans',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  LSG: {
    name: 'Lucknow Super Giants',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
};

const extraTeams = {
  KCA: {
    name: 'Kerala Kings Alliance',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  MFA: {
    name: 'Mumbai Fire Angels',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  HYD: {
    name: 'Hyderabad Hawks',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
  BAN: {
    name: 'Bangalore Blasters',
    basePrice: 20,
    soldTo: null,
    soldPrice: null,
  },
};

const playerPool = {
  batsmen: {
    'VIRAT KOHLI': {
      basePrice: 2000,
      soldTo: null,
      soldPrice: null,
      overseas: false,
    },
    'ROHIT SHARMA': {
      basePrice: 2000,
      soldTo: null,
      soldPrice: null,
      overseas: false,
    },
    'BABAR AZAM': {
      basePrice: 1500,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
    'DAVID WARNER': {
      basePrice: 1500,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
    'SHUBMAN GILL': {
      basePrice: 1200,
      soldTo: null,
      soldPrice: null,
      overseas: false,
    },
  },
  bowlers: {
    'JASPRIT BUMRAH': {
      basePrice: 2000,
      soldTo: null,
      soldPrice: null,
      overseas: false,
    },
    'MOHAMMED SHAMI': {
      basePrice: 1200,
      soldTo: null,
      soldPrice: null,
      overseas: false,
    },
    'TRENT BOULT': {
      basePrice: 1500,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
    'KAGISO RABADA': {
      basePrice: 1500,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
    'RASHID KHAN': {
      basePrice: 2000,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
  },
  allrounders: {
    'HARDIK PANDYA': {
      basePrice: 2000,
      soldTo: null,
      soldPrice: null,
      overseas: false,
    },
    'RAVINDRA JADEJA': {
      basePrice: 2000,
      soldTo: null,
      soldPrice: null,
      overseas: false,
    },
    'BEN STOKES': {
      basePrice: 1800,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
    'GLENN MAXWELL': {
      basePrice: 1600,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
    'SUNIL NARINE': {
      basePrice: 1500,
      soldTo: null,
      soldPrice: null,
      overseas: true,
    },
  },
};

module.exports = { baseTeams, extraTeams, playerPool };
