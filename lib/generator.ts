import { countries, namesByCountry, CountryConfig } from '@/lib/countryData';
import { DOMAINS } from '@/lib/domains';

// --- 静态常量定义 (内存优化：避免在函数调用时重复创建) ---

const LATIN_CHARS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL_CHARS = "!@#$%&*";

// 常见的真实密码词汇
const COMMON_WORDS = [
  'love', 'life', 'star', 'moon', 'king', 'cool', 'super', 'happy', 'lucky', 'smart',
  'dream', 'angel', 'power', 'magic', 'light', 'dark', 'blue', 'fire', 'water', 'earth',
  'smile', 'peace', 'hope', 'faith', 'trust', 'grace', 'brave', 'strong', 'free', 'wild',
  'shine', 'gold', 'heart', 'soul', 'mind', 'time', 'wave', 'wind', 'rain', 'snow',
  'sun', 'sky', 'sea', 'ocean', 'storm', 'cloud', 'thunder', 'flash', 'spark', 'flame',
  'star', 'night', 'day', 'summer', 'winter', 'spring', 'fall', 'baby', 'sweet', 'honey',
  'sugar', 'candy', 'rose', 'lily', 'diamond', 'pearl', 'ruby', 'crystal', 'tiger', 'lion',
  'wolf', 'bear', 'eagle', 'dragon', 'phoenix', 'prince', 'princess', 'queen', 'royal', 'crown'
];

// 字符替换模式(leetspeak)
const LEET_REPLACEMENTS: Record<string, string[]> = {
  'a': ['@', '4'],
  'e': ['3'],
  'i': ['1', '!'],
  'o': ['0'],
  's': ['5', '$'],
  't': ['7'],
  'l': ['1'],
  'g': ['9']
};

// 年龄分布权重
const AGE_DISTRIBUTION = [
  { min: 18, max: 19, weight: 0.20 },
  { min: 20, max: 21, weight: 0.25 },
  { min: 22, max: 23, weight: 0.30 },
  { min: 24, max: 25, weight: 0.25 },
];

// --- 手机号运营商前缀数据 (2024-2025 真实号段) ---

const CN_PREFIXES = {
  mobile: [
    '134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', 
    '172', '178', '182', '183', '184', '187', '188', '195', '197', '198'
  ],
  unicom: [
    '130', '131', '132', '145', '155', '156', '166', '167', '171', '175', '176', '185', '186', '196'
  ],
  telecom: [
    '133', '149', '153', '173', '177', '180', '181', '189', '190', '191', '193', '199'
  ],
  virtual: ['162', '165', '167', '170', '171']
};

const HK_PREFIXES = {
  mobile: [
    '51', '52', '53', '54', '55', '56', '57', '59',
    '60', '61', '62', '63', '64', '65', '66', '67', '68', '69',
    '90', '91', '92', '93', '94', '95', '96', '97', '98'
  ]
};

const TW_PREFIXES = {
  chunghwa: ['900', '901', '902', '903', '905', '906', '909', '910', '911', '912', '919', '921', '928', '932', '933', '934', '937', '963', '965', '966', '972', '974', '975', '978', '988'],
  twm: ['907', '914', '918', '920', '922', '923', '924', '929', '930', '931', '935', '936', '938', '939', '952', '953', '954', '955', '956', '958', '960', '961', '970', '971', '979', '983', '987', '989'],
  fetnet: ['903', '913', '915', '916', '917', '925', '926', '927', '930', '931', '936', '938', '955', '960', '962', '967', '968', '973', '976', '981', '984', '989']
};

const US_AREA_CODES = {
  east: [
    '201', '202', '203', '212', '215', '240', '267', '301', '302', '315', '339', '347', '351', '401', '410', '412', '413', '443', '475', '484', '508', '516', '518', '551', '570', '585', '603', '607', '609', '610', '617', '631', '646', '716', '717', '718', '724', '732', '781', '802', '814', '845', '856', '860', '908', '914', '917', '929', '973', '978'
  ],
  central: [
    '216', '217', '218', '219', '224', '231', '234', '248', '260', '262', '269', '309', '312', '313', '314', '317', '319', '330', '402', '414', '417', '419', '434', '440', '507', '513', '515', '517', '563', '573', '574', '586', '605', '608', '612', '614', '616', '618', '630', '636', '641', '651', '701', '708', '712', '715', '734', '763', '773', '810', '812', '815', '816', '847', '906', '913', '920', '937', '952', '989'
  ],
  south: [
    '205', '210', '214', '225', '228', '229', '239', '251', '252', '254', '256', '281', '305', '318', '321', '325', '334', '336', '337', '352', '361', '386', '404', '405', '407', '409', '423', '432', '469', '478', '479', '501', '502', '504', '512', '540', '561', '571', '580', '601', '606', '615', '662', '678', '682', '703', '704', '706', '713', '727', '731', '754', '757', '769', '770', '772', '786', '803', '804', '806', '813', '817', '828', '830', '832', '843', '850', '859', '863', '864', '865', '901', '903', '904', '910', '912', '918', '919', '931', '936', '940', '941', '954', '956', '972', '979', '980', '985'
  ],
  west: [
    '206', '208', '209', '213', '253', '303', '307', '310', '323', '360', '385', '406', '408', '415', '425', '435', '442', '458', '480', '503', '505', '509', '510', '520', '530', '541', '559', '562', '602', '619', '623', '626', '650', '657', '661', '702', '707', '714', '719', '720', '725', '747', '760', '775', '801', '805', '808', '818', '831', '858', '907', '909', '916', '925', '928', '949', '951', '970', '971', '986'
  ]
};

const JP_PREFIXES = {
  docomo: ['90', '80', '70'],
  au: ['90', '80', '70'],
  softbank: ['90', '80', '70']
};

const KR_PREFIXES = {
  common: ['10']
};

const GB_MOBILE_PREFIXES = {
  ee: ['7400', '7401', '7402', '7403', '7415', '7500', '7501', '7502', '7503', '7701', '7702', '7703', '7704', '7705', '7706', '7707', '7708', '7709', '7710', '7711', '7712'],
  o2: ['7435', '7436', '7437', '7440', '7441', '7442', '7443', '7444', '7510', '7511', '7512', '7513', '7514', '7515', '7516', '7517', '7518', '7519', '7520', '7521', '7522'],
  vodafone: ['7423', '7425', '7460', '7461', '7462', '7463', '7464', '7550', '7551', '7552', '7553', '7554', '7555', '7720', '7721', '7722', '7723', '7724', '7725', '7726', '7727', '7728'],
  three: ['7404', '7405', '7410', '7411', '7412', '7413', '7414', '7450', '7451', '7452', '7453', '7454', '7455', '7456', '7730', '7731', '7732', '7733', '7734', '7735', '7736', '7737', '7738']
};

const DE_PREFIXES = {
  telekom: ['151', '1511', '1512', '1514', '1515', '1516', '1517', '160', '170', '171', '175'],
  vodafone: ['152', '1520', '1522', '1523', '1525', '162', '172', '173', '174'],
  o2: ['159', '176', '177', '178', '179', '1573', '1575', '1577', '1578']
};

const FR_PREFIXES = {
  orange: ['607', '608', '630', '631', '632', '640', '641', '642', '670', '671', '672', '680', '681', '682'],
  sfr: ['609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621'],
  bouygues: ['650', '651', '652', '653', '658', '659', '660', '661', '662', '663', '664', '665', '666', '667'],
  free: ['651', '652', '695', '698', '699', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769']
};

const IT_PREFIXES = {
  tim: ['330', '331', '333', '334', '335', '336', '337', '338', '339', '360', '366', '368'],
  vodafone: ['340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '383'],
  windtre: ['320', '322', '323', '324', '327', '328', '329', '380', '388', '389', '391', '392', '393'],
  iliad: ['351', '352', '353', '354', '355', '356', '357', '358', '359']
};

const ES_PREFIXES = {
  movistar: ['609', '610', '616', '619', '620', '629', '630', '639', '646', '649', '650', '659', '660', '669', '670', '679', '680', '689'],
  vodafone: ['607', '610', '617', '647', '667', '677', '687', '697', '717', '737', '747'],
  orange: ['605', '615', '625', '635', '645', '655', '665', '675', '685', '695', '715', '725', '735', '745'],
  yoigo: ['622', '633', '722', '733', '744']
};

const NL_PREFIXES = {
  kpn: ['610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '633', '634', '636', '637', '649', '650', '651', '652', '653', '654', '655'],
  vodafone: ['611', '615', '621', '625', '627', '629', '631', '634', '638', '640', '641', '642', '643', '646', '648', '650', '651', '652', '653', '654', '655'],
  tmobile: ['614', '616', '618', '624', '626', '628', '634', '638', '641', '642', '643', '648', '658', '681', '682', '683']
};

const SE_PREFIXES = {
  telia: ['702', '703', '704', '705', '706', '708', '709', '722', '723', '724', '725', '727', '730', '738'],
  tele2: ['700', '701', '704', '707', '708', '709', '720', '721', '722', '723', '729', '733', '734', '735', '736', '737', '739'],
  telenor: ['700', '701', '702', '703', '704', '705', '706', '707', '708', '709', '720', '721', '722', '723', '724', '725', '728', '731', '732', '733', '734'],
  tre: ['700', '701', '702', '703', '704', '705', '706', '707', '708', '709', '720', '721', '722', '723', '728', '730', '735', '738', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769']
};

const CH_PREFIXES = {
  swisscom: ['79'],
  sunrise: ['76'],
  salt: ['78'],
  virtual: ['75', '77']
};

const PL_PREFIXES = {
  orange: ['501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519'],
  play: ['530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', '730', '731', '732', '733', '734', '735', '736', '737', '738', '739', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799'],
  plus: ['601', '603', '605', '607', '609', '661', '663', '665', '667', '669', '691', '693', '695', '697'],
  tmobile: ['600', '602', '604', '606', '608', '660', '662', '664', '668', '690', '692', '694', '696', '698']
};

const TR_PREFIXES = {
  turkcell: ['530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '561'],
  vodafone: ['540', '541', '542', '543', '544', '545', '546', '547', '548', '549'],
  turktelekom: ['501', '505', '506', '507', '551', '552', '553', '554', '555', '559']
};

const RU_PREFIXES = {
  mts: ['910', '911', '912', '913', '914', '915', '916', '917', '918', '919', '980', '981', '982', '983', '984', '985', '986', '987', '988', '989'],
  megafon: ['920', '921', '922', '923', '924', '925', '926', '927', '928', '929', '930', '931', '932', '933', '934', '935', '936', '937', '938', '939'],
  beeline: ['903', '905', '906', '909', '960', '961', '962', '963', '964', '965', '966', '967', '968', '969', '976'],
  tele2: ['900', '901', '902', '904', '908', '950', '951', '952', '953', '958', '977', '991', '992', '993', '994', '995', '996', '999']
};

const IN_PREFIXES = {
  jio: ['62', '70', '79', '89', '90', '91', '93', '95', '96', '97', '98'],
  airtel: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  vi: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']
};

const AU_PREFIXES = {
  telstra: ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '426', '427', '428', '429'],
  optus: ['430', '431', '432', '433', '434', '435', '436', '437', '438', '439', '440', '441', '442', '443', '444', '445', '446', '447', '448', '449', '450', '451', '452', '453', '454', '455', '456', '457', '458', '459'],
  vodafone: ['460', '461', '462', '463', '464', '465', '466', '467', '468', '469', '470', '471', '472', '473', '474', '475', '476', '477', '478', '479', '480', '481', '482', '483', '484', '485', '486', '487', '488', '489']
};

const TH_PREFIXES = {
  ais: ['61', '62', '63', '64', '65', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '98'],
  dtac: ['66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99'],
  true: ['60', '61', '62', '63', '64', '65', '66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']
};

const VN_PREFIXES = {
  viettel: ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39'],
  vinaphone: ['88', '91', '94', '81', '82', '83', '84', '85'],
  mobifone: ['89', '90', '93', '70', '76', '77', '78', '79'],
  vietnamobile: ['92', '56', '58'],
  gmobile: ['99', '59']
};

const PH_PREFIXES = {
  globe: ['905', '906', '915', '916', '917', '926', '927', '935', '936', '937', '945', '955', '956', '965', '966', '967', '975', '976', '977', '995', '996', '997'],
  smart: ['908', '918', '919', '920', '921', '928', '929', '939', '946', '947', '949', '950', '951', '961', '963', '968', '969', '970', '981', '989', '998', '999'],
  sun: ['922', '923', '924', '925', '931', '932', '933', '934', '940', '941', '942', '943', '973', '974']
};

const ID_PREFIXES = {
  telkomsel: ['811', '812', '813', '821', '822', '823', '851', '852', '853'],
  indosat: ['814', '815', '816', '855', '856', '857', '858'],
  xl: ['817', '818', '819', '859', '877', '878'],
  three: ['895', '896', '897', '898', '899'],
  smartfren: ['881', '882', '883', '884', '885', '886', '887', '888', '889']
};

const MY_PREFIXES = {
  maxis: ['12', '142', '17'],
  celcom: ['13', '19', '148'],
  digi: ['16', '146', '11'],
  umobile: ['18', '11']
};

const BR_PREFIXES = {
  vivo: ['11', '12', '13', '14', '15', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  claro: ['11', '21', '31', '41', '51', '61', '71', '81', '91'],
  tim: ['11', '21', '31', '41', '51', '61', '71', '81', '91']
};

const MX_PREFIXES = {
  common: ['55', '33', '81', '656', '664', '686', '722', '999', '477', '222', '614', '998', '442', '871', '444', '662', '229', '311', '449', '833']
};

const MO_PREFIXES = {
  ctm: ['66', '62'],
  three: ['63', '68'],
  smartone: ['65'],
  china_telecom: ['68']
};

const SG_PREFIXES = {
  singtel: ['90', '91', '92', '93', '94', '95', '96', '97', '98'],
  starhub: ['81', '82', '83', '84', '85', '86', '87'],
  m1: ['88', '89']
};

const DAYS_IN_MONTH_BASE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const SUSPICIOUS_DAYS = [1, 15, 31];

// --- 辅助函数 ---

function getRandomCarrierPrefix(carriers: Record<string, string[]>): string {
  const carrierNames = Object.keys(carriers);
  const carrier = randomChoice(carrierNames);
  return randomChoice(carriers[carrier]);
}

function convertToLatinChars(str: string): string {
  const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const ascii = normalized.replace(/[^a-zA-Z0-9]/g, "");
  
  if (ascii.length === 0) {
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += LATIN_CHARS.charAt(Math.floor(Math.random() * LATIN_CHARS.length));
    }
    return result;
  }
  return ascii.toLowerCase();
}

function secureRandom(min: number, max: number): number {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
}

function randomChoice<T>(array: T[]): T {
  return array[secureRandom(0, array.length - 1)];
}

function randomDigit(min: number = 0, max: number = 9): string {
  return secureRandom(min, max).toString();
}

function randomDigits(length: number, min: number = 0, max: number = 9): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomDigit(min, max);
  }
  return result;
}

// 新增：检查键盘序列 (虽然此处未使用，但保留辅助函数)
function hasKeyboardSequence(str: string): boolean {
  const sequences = ['qwerty', 'asdfgh', 'zxcvbn', '123456', 'abcdef'];
  const lowerStr = str.toLowerCase();
  return sequences.some(seq => lowerStr.includes(seq));
}

// 新增：确保至少3个不同字符 (虽然此处未使用，但保留辅助函数)
function hasMinimumVariety(str: string): boolean {
  const uniqueChars = new Set(str.toLowerCase());
  return uniqueChars.size >= 3;
}

// --- 导出函数 ---

export function generateName(countryCode: string) {
  const config = namesByCountry[countryCode] || namesByCountry['US'];
  const firstName = config.firstNames[secureRandom(0, config.firstNames.length - 1)];
  const lastName = config.lastNames[secureRandom(0, config.lastNames.length - 1)];
  return { firstName, lastName };
}

export function generateBirthday() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  let random = Math.random();
  let age = 22;
  
  for (const range of AGE_DISTRIBUTION) {
    if (random < range.weight) {
      age = secureRandom(range.min, range.max);
      break;
    }
    random -= range.weight;
  }
  
  const birthYear = currentYear - age;
  
  const avoidMonths = [
    (currentMonth - 2 + 12) % 12 || 12,
    (currentMonth - 1 + 12) % 12 || 12,
    currentMonth,
    (currentMonth % 12) + 1,
  ];
  
  let month: number;
  do {
    month = secureRandom(1, 12);
  } while (Math.random() < 0.7 && avoidMonths.includes(month));
  
  let maxDays = DAYS_IN_MONTH_BASE[month - 1];
  if (month === 2 && birthYear % 4 === 0 && (birthYear % 100 !== 0 || birthYear % 400 === 0)) {
    maxDays = 29;
  }
  
  let day: number;
  do {
    day = secureRandom(1, maxDays);
  } while (Math.random() < 0.6 && SUSPICIOUS_DAYS.includes(day));
  
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  
  return `${birthYear}-${monthStr}-${dayStr}`;
}

export function generatePhone(country: CountryConfig) {
  const code = country.code;
  
  switch (code) {
    case 'CN':
      const cnPrefix = getRandomCarrierPrefix(CN_PREFIXES);
      return `${country.phonePrefix} ${cnPrefix}${randomDigits(8)}`;

    case 'HK':
      const hkPrefix = getRandomCarrierPrefix(HK_PREFIXES);
      return `${country.phonePrefix} ${hkPrefix}${randomDigits(6)}`;

    case 'TW':
      const twPrefix = getRandomCarrierPrefix(TW_PREFIXES);
      return `${country.phonePrefix} ${twPrefix}${randomDigits(6)}`;

    case 'MO':
      const moPrefix = getRandomCarrierPrefix(MO_PREFIXES);
      return `${country.phonePrefix} ${moPrefix}${randomDigits(6)}`;

    case 'SG':
      const sgPrefix = getRandomCarrierPrefix(SG_PREFIXES);
      return `${country.phonePrefix} ${sgPrefix}${randomDigits(6)}`;

    case 'US':
    case 'CA':
      const regionKeys = ['east', 'central', 'west', 'south'] as const;
      const region = randomChoice([...regionKeys]);
      const areaCode = randomChoice(US_AREA_CODES[region]);
      const exchange = randomDigit(2, 9) + randomDigits(2);
      const subscriber = randomDigits(4);
      return `${country.phonePrefix} ${areaCode}-${exchange}-${subscriber}`;

    case 'JP':
      const jpPrefix = getRandomCarrierPrefix(JP_PREFIXES);
      return `${country.phonePrefix} ${jpPrefix}-${randomDigits(4)}-${randomDigits(4)}`;

    case 'KR':
      const krPrefix = getRandomCarrierPrefix(KR_PREFIXES);
      return `${country.phonePrefix} ${krPrefix}-${randomDigits(4)}-${randomDigits(4)}`;

    case 'GB':
      const gbPrefix = getRandomCarrierPrefix(GB_MOBILE_PREFIXES);
      return `${country.phonePrefix} ${gbPrefix} ${randomDigits(6)}`;

    case 'DE':
      const dePrefix = getRandomCarrierPrefix(DE_PREFIXES);
      const deSuffixLen = dePrefix.length > 3 ? 7 : 8; 
      return `${country.phonePrefix} ${dePrefix} ${randomDigits(deSuffixLen)}`;

    case 'FR':
      const frPrefix = getRandomCarrierPrefix(FR_PREFIXES);
      const frStart = frPrefix.charAt(0);
      const frNext = frPrefix.slice(1);
      return `${country.phonePrefix} ${frStart} ${frNext} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'IT':
      const itPrefix = getRandomCarrierPrefix(IT_PREFIXES);
      return `${country.phonePrefix} ${itPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'ES':
      const esPrefix = getRandomCarrierPrefix(ES_PREFIXES);
      return `${country.phonePrefix} ${esPrefix} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'NL':
      const nlPrefix = getRandomCarrierPrefix(NL_PREFIXES);
      return `${country.phonePrefix} 6 ${nlPrefix.slice(1)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'SE':
      const sePrefix = getRandomCarrierPrefix(SE_PREFIXES);
      return `${country.phonePrefix} ${sePrefix.slice(0, 2)} ${sePrefix.slice(2)}${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'CH':
      const chPrefix = getRandomCarrierPrefix(CH_PREFIXES);
      return `${country.phonePrefix} ${chPrefix} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'PL':
      const plPrefix = getRandomCarrierPrefix(PL_PREFIXES);
      return `${country.phonePrefix} ${plPrefix} ${randomDigits(3)} ${randomDigits(3)}`;

    case 'TR':
      const trPrefix = getRandomCarrierPrefix(TR_PREFIXES);
      return `${country.phonePrefix} ${trPrefix} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'RU':
      const ruPrefix = getRandomCarrierPrefix(RU_PREFIXES);
      return `${country.phonePrefix} ${ruPrefix} ${randomDigits(3)}-${randomDigits(2)}-${randomDigits(2)}`;

    case 'IN':
      const inPrefix = getRandomCarrierPrefix(IN_PREFIXES);
      const inRest = randomDigits(10 - inPrefix.length);
      return `${country.phonePrefix} ${inPrefix}${inRest.slice(0, 5 - inPrefix.length + 3)} ${inRest.slice(5 - inPrefix.length + 3)}`;

    case 'AU':
      const auPrefix = getRandomCarrierPrefix(AU_PREFIXES);
      return `${country.phonePrefix} ${auPrefix} ${randomDigits(3)} ${randomDigits(3)}`;

    case 'TH':
      const thPrefix = getRandomCarrierPrefix(TH_PREFIXES);
      return `${country.phonePrefix} ${thPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'VN':
      const vnPrefix = getRandomCarrierPrefix(VN_PREFIXES);
      return `${country.phonePrefix} ${vnPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'PH':
      const phPrefix = getRandomCarrierPrefix(PH_PREFIXES);
      return `${country.phonePrefix} ${phPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'ID':
      const idPrefix = getRandomCarrierPrefix(ID_PREFIXES);
      return `${country.phonePrefix} ${idPrefix}-${randomDigits(4)}-${randomDigits(4)}`;

    case 'MY':
      const myPrefix = getRandomCarrierPrefix(MY_PREFIXES);
      const myRestLen = myPrefix.length === 2 ? 8 : 7;
      const myRest = randomDigits(myRestLen);
      return `${country.phonePrefix} ${myPrefix}-${myRest.slice(0, 3)} ${myRest.slice(3)}`;

    case 'BR':
      const brArea = getRandomCarrierPrefix(BR_PREFIXES);
      return `${country.phonePrefix} ${brArea} 9${randomDigits(4)}-${randomDigits(4)}`;

    case 'MX':
      const mxPrefix = getRandomCarrierPrefix(MX_PREFIXES);
      const mxRestLen = 10 - mxPrefix.length;
      const mxRest = randomDigits(mxRestLen);
      return `${country.phonePrefix} ${mxPrefix} ${mxRest.slice(0, 4)} ${mxRest.slice(4)}`;

    default:
      let phone = country.phoneFormat;
      phone = phone.replace(/X/g, () => randomDigit().toString());
      return `${country.phonePrefix} ${phone}`;
  }
}

// 优化版密码生成函数 - 严格限制为 6-8 位
export function generatePassword(): string {
  // 1. 设定目标长度为 6 到 8
  const targetLength = secureRandom(6, 8);
  let password = '';
  
  // 策略选择
  const strategy = Math.random();
  
  // 策略 1: 单词 + 数字 (70% 概率)
  if (strategy < 0.70) {
    let word = randomChoice(COMMON_WORDS);
    
    // 计算留给数字的空间 (至少留1-3位数字)
    const numLength = secureRandom(1, targetLength - 3 > 1 ? targetLength - 3 : 2);
    const maxWordLen = targetLength - numLength;

    if (word.length > maxWordLen) {
      word = word.substring(0, maxWordLen);
    }
    
    // 大小写处理
    const caseRand = Math.random();
    if (caseRand < 0.60) {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else if (caseRand < 0.90) {
      word = word.toLowerCase();
    } else {
      word = word.toUpperCase();
    }
    
    password = word;
    
    while (password.length < targetLength) {
      password += randomDigit();
    }
  }
  
  // 策略 2: 纯混合随机 (20% 概率)
  else if (strategy < 0.90) {
    const chars = LATIN_CHARS + UPPERCASE + NUMBERS;
    for (let i = 0; i < targetLength; i++) {
      password += chars.charAt(secureRandom(0, chars.length - 1));
    }
  }
  
  // 策略 3: 纯数字 (10% 概率)
  else {
    password = randomDigits(targetLength);
  }

  // 最终兜底检查
  if (password.length > targetLength) {
    password = password.substring(0, targetLength);
  } else if (password.length < targetLength) {
    while (password.length < targetLength) {
      password += randomDigit();
    }
  }
  
  return password;
}

export function getCountryConfig(code: string) {
  return countries.find(c => c.code === code) || countries[0];
}

export function getAllDomains(): string[] {
  return DOMAINS;
}

// 优化版邮箱生成函数 - 严格限制前缀 <= 11 位
export function generateEmail(firstName: string, lastName: string, customDomain?: string) {
  const domain = customDomain || DOMAINS[secureRandom(0, DOMAINS.length - 1)];

  // 1. 预处理：转换为拉丁字符
  let first = convertToLatinChars(firstName);
  let last = convertToLatinChars(lastName);
  
  // 强制限制输入名字长度，避免一开始就过长
  // 比如 Christopher -> chris, Alexander -> alex
  if (first.length > 6) first = first.slice(0, Math.max(4, secureRandom(4, 6)));
  if (last.length > 6) last = last.slice(0, Math.max(4, secureRandom(4, 6)));

  const MAX_LEN = 11; // 硬性限制

  // 2. 命名模式权重 (针对短前缀优化)
  const patternRand = Math.random();
  let username = '';
  
  // 模式1: firstname + 随机数字 (40%) - 最容易控制长度且真实
  if (patternRand < 0.40) {
    username = first;
    // 稍后统一添加数字后缀
  }
  // 模式2: 首字母 + lastname (25%)
  else if (patternRand < 0.65) {
    const sep = Math.random() < 0.5 ? '.' : ''; // 50% 概率加点
    username = `${first.charAt(0)}${sep}${last}`;
  }
  // 模式3: firstname + 首字母 (15%)
  else if (patternRand < 0.80) {
    const sep = Math.random() < 0.5 ? '.' : '_';
    username = `${first}${sep}${last.charAt(0)}`;
  }
  // 模式4: 短拼接 (15%) - 只有当两个词都很短时才用
  else if (patternRand < 0.95) {
    if (first.length + last.length < 9) {
       const sep = Math.random() < 0.5 ? '.' : (Math.random() < 0.5 ? '_' : '');
       username = `${first}${sep}${last}`;
    } else {
       // 如果名字太长，回退到模式1
       username = first;
    }
  }
  // 模式5: 纯乱序/创意 (5%)
  else {
    username = `${last}${first.charAt(0)}`;
  }

  // 3. 长度控制与截断 (关键步骤)
  // 现在的 username 还是纯字母组合，先确保它本身不超过 MAX_LEN
  if (username.length > MAX_LEN) {
    username = username.slice(0, MAX_LEN);
    // 如果截断后末尾是特殊符号，去掉它
    if (['.', '_'].includes(username.slice(-1))) {
      username = username.slice(0, -1);
    }
  }

  // 4. 数字后缀策略 (增强唯一性，同时严格遵守长度限制)
  // 计算剩余可用空间
  const remainingSpace = MAX_LEN - username.length;
  
  // 只有当剩余空间 >= 2 时才考虑加数字
  if (remainingSpace >= 2) {
    // 70% 的概率添加数字后缀，或者如果用户名太短(<5)则强制添加
    if (Math.random() < 0.70 || username.length < 5) {
      let suffix = '';
      
      // 优先填满剩余空间，但不超过 4 位数字
      const lenToGenerate = Math.min(remainingSpace, secureRandom(2, 4));
      
      if (lenToGenerate === 4) {
        suffix = secureRandom(1985, 2025).toString(); // 年份
      } else {
        suffix = randomDigits(lenToGenerate);
      }
      
      // 再次检查长度 (双重保险)
      if (username.length + suffix.length <= MAX_LEN) {
        username += suffix;
      }
    }
  }

  // 5. 最终兜底检查
  // 确保至少 6 位 (太短会被很多平台拒绝)，且不超过 11 位
  if (username.length > MAX_LEN) {
    username = username.slice(0, MAX_LEN);
  }
  
  // 如果切完之后太短 (比如 < 6)，补齐数字
  while (username.length < 6) {
    username += randomDigit();
  }
  // 补齐后如果超了 (极端情况)，再次切
  if (username.length > MAX_LEN) {
     username = username.slice(0, MAX_LEN);
  }

  return `${username}@${domain}`;
}
