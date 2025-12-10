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
  'sun', 'sky', 'sea', 'ocean', 'storm', 'cloud', 'thunder', 'flash', 'spark', 'flame'
];

const COMMON_NUMBERS = ['123', '456', '789', '000', '111', '222', '321', '666', '888', '999'];

// 字符替换模式(leetspeak) - 真实用户常用
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
// 注意：为了符合国际格式(+xx)，以下前缀大多去除了国内长途冠码 "0"

// 中国大陆 (CN) - 扩充了19x, 16x, 14x等新号段
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

// 香港 (HK) - 扩充
const HK_PREFIXES = {
  mobile: [
    '51', '52', '53', '54', '55', '56', '57', '59', // 5字头
    '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', // 6字头
    '90', '91', '92', '93', '94', '95', '96', '97', '98'  // 9字头
  ]
};

// 台湾 (TW) - 扩充
const TW_PREFIXES = {
  chunghwa: ['900', '901', '902', '903', '905', '906', '909', '910', '911', '912', '919', '921', '928', '932', '933', '934', '937', '963', '965', '966', '972', '974', '975', '978', '988'],
  twm: ['907', '914', '918', '920', '922', '923', '924', '929', '930', '931', '935', '936', '938', '939', '952', '953', '954', '955', '956', '958', '960', '961', '970', '971', '979', '983', '987', '989'],
  fetnet: ['903', '913', '915', '916', '917', '925', '926', '927', '930', '931', '936', '938', '955', '960', '962', '967', '968', '973', '976', '981', '984', '989']
};

// 美国/加拿大 (US/CA) - 真实区号大幅扩充
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

// 日本 (JP) - 070/080/090 (国际格式去0)
const JP_PREFIXES = {
  docomo: ['90', '80', '70'],
  au: ['90', '80', '70'],
  softbank: ['90', '80', '70']
};

// 韩国 (KR) - 010 (国际格式去0)
const KR_PREFIXES = {
  common: ['10']
};

// 英国 (GB) - 7xxx (国际格式去0)
const GB_MOBILE_PREFIXES = {
  ee: ['7400', '7401', '7402', '7403', '7415', '7500', '7501', '7502', '7503', '7701', '7702', '7703', '7704', '7705', '7706', '7707', '7708', '7709', '7710', '7711', '7712'],
  o2: ['7435', '7436', '7437', '7440', '7441', '7442', '7443', '7444', '7510', '7511', '7512', '7513', '7514', '7515', '7516', '7517', '7518', '7519', '7520', '7521', '7522'],
  vodafone: ['7423', '7425', '7460', '7461', '7462', '7463', '7464', '7550', '7551', '7552', '7553', '7554', '7555', '7720', '7721', '7722', '7723', '7724', '7725', '7726', '7727', '7728'],
  three: ['7404', '7405', '7410', '7411', '7412', '7413', '7414', '7450', '7451', '7452', '7453', '7454', '7455', '7456', '7730', '7731', '7732', '7733', '7734', '7735', '7736', '7737', '7738']
};

// 德国 (DE) - 15x, 16x, 17x (国际格式去0)
const DE_PREFIXES = {
  telekom: ['151', '1511', '1512', '1514', '1515', '1516', '1517', '160', '170', '171', '175'],
  vodafone: ['152', '1520', '1522', '1523', '1525', '162', '172', '173', '174'],
  o2: ['159', '176', '177', '178', '179', '1573', '1575', '1577', '1578']
};

// 法国 (FR) - 6, 7 (国际格式去0)
const FR_PREFIXES = {
  orange: ['607', '608', '630', '631', '632', '640', '641', '642', '670', '671', '672', '680', '681', '682'],
  sfr: ['609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621'],
  bouygues: ['650', '651', '652', '653', '658', '659', '660', '661', '662', '663', '664', '665', '666', '667'],
  free: ['651', '652', '695', '698', '699', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769']
};

// 意大利 (IT) - 3xx
const IT_PREFIXES = {
  tim: ['330', '331', '333', '334', '335', '336', '337', '338', '339', '360', '366', '368'],
  vodafone: ['340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '383'],
  windtre: ['320', '322', '323', '324', '327', '328', '329', '380', '388', '389', '391', '392', '393'],
  iliad: ['351', '352', '353', '354', '355', '356', '357', '358', '359']
};

// 西班牙 (ES) - 6xx, 7xx
const ES_PREFIXES = {
  movistar: ['609', '610', '616', '619', '620', '629', '630', '639', '646', '649', '650', '659', '660', '669', '670', '679', '680', '689'],
  vodafone: ['607', '610', '617', '647', '667', '677', '687', '697', '717', '737', '747'],
  orange: ['605', '615', '625', '635', '645', '655', '665', '675', '685', '695', '715', '725', '735', '745'],
  yoigo: ['622', '633', '722', '733', '744']
};

// 荷兰 (NL) - 06 (国际格式去0，即6)
const NL_PREFIXES = {
  kpn: ['610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '633', '634', '636', '637', '649', '650', '651', '652', '653', '654', '655'],
  vodafone: ['611', '615', '621', '625', '627', '629', '631', '634', '638', '640', '641', '642', '643', '646', '648', '650', '651', '652', '653', '654', '655'],
  tmobile: ['614', '616', '618', '624', '626', '628', '634', '638', '641', '642', '643', '648', '658', '681', '682', '683']
};

// 瑞典 (SE) - 07x (国际格式去0，即7x)
const SE_PREFIXES = {
  telia: ['702', '703', '704', '705', '706', '708', '709', '722', '723', '724', '725', '727', '730', '738'],
  tele2: ['700', '701', '704', '707', '708', '709', '720', '721', '722', '723', '729', '733', '734', '735', '736', '737', '739'],
  telenor: ['700', '701', '702', '703', '704', '705', '706', '707', '708', '709', '720', '721', '722', '723', '724', '725', '728', '731', '732', '733', '734'],
  tre: ['700', '701', '702', '703', '704', '705', '706', '707', '708', '709', '720', '721', '722', '723', '728', '730', '735', '738', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769']
};

// 瑞士 (CH) - 07x (国际格式去0，即7x)
const CH_PREFIXES = {
  swisscom: ['79'],
  sunrise: ['76'],
  salt: ['78'],
  virtual: ['75', '77']
};

// 波兰 (PL) - 9位数字
const PL_PREFIXES = {
  orange: ['501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519'],
  play: ['530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', '730', '731', '732', '733', '734', '735', '736', '737', '738', '739', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799'],
  plus: ['601', '603', '605', '607', '609', '661', '663', '665', '667', '669', '691', '693', '695', '697'],
  tmobile: ['600', '602', '604', '606', '608', '660', '662', '664', '668', '690', '692', '694', '696', '698']
};

// 土耳其 (TR) - 5xx
const TR_PREFIXES = {
  turkcell: ['530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '561'],
  vodafone: ['540', '541', '542', '543', '544', '545', '546', '547', '548', '549'],
  turktelekom: ['501', '505', '506', '507', '551', '552', '553', '554', '555', '559']
};

// 俄罗斯 (RU) - 扩充
const RU_PREFIXES = {
  mts: ['910', '911', '912', '913', '914', '915', '916', '917', '918', '919', '980', '981', '982', '983', '984', '985', '986', '987', '988', '989'],
  megafon: ['920', '921', '922', '923', '924', '925', '926', '927', '928', '929', '930', '931', '932', '933', '934', '935', '936', '937', '938', '939'],
  beeline: ['903', '905', '906', '909', '960', '961', '962', '963', '964', '965', '966', '967', '968', '969', '976'],
  tele2: ['900', '901', '902', '904', '908', '950', '951', '952', '953', '958', '977', '991', '992', '993', '994', '995', '996', '999']
};

// 印度 (IN) - 扩充
const IN_PREFIXES = {
  jio: ['62', '70', '79', '89', '90', '91', '93', '95', '96', '97', '98'],
  airtel: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  vi: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']
};

// 澳大利亚 (AU) - 04xx (国际格式去0)
const AU_PREFIXES = {
  telstra: ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '426', '427', '428', '429'],
  optus: ['430', '431', '432', '433', '434', '435', '436', '437', '438', '439', '440', '441', '442', '443', '444', '445', '446', '447', '448', '449', '450', '451', '452', '453', '454', '455', '456', '457', '458', '459'],
  vodafone: ['460', '461', '462', '463', '464', '465', '466', '467', '468', '469', '470', '471', '472', '473', '474', '475', '476', '477', '478', '479', '480', '481', '482', '483', '484', '485', '486', '487', '488', '489']
};

// 泰国 (TH) - 06/08/09 (国际格式去0)
const TH_PREFIXES = {
  ais: ['61', '62', '63', '64', '65', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '98'],
  dtac: ['66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99'],
  true: ['60', '61', '62', '63', '64', '65', '66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']
};

// 越南 (VN) - 03/05/07/08/09 (国际格式去0)
const VN_PREFIXES = {
  viettel: ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39'],
  vinaphone: ['88', '91', '94', '81', '82', '83', '84', '85'],
  mobifone: ['89', '90', '93', '70', '76', '77', '78', '79'],
  vietnamobile: ['92', '56', '58'],
  gmobile: ['99', '59']
};

// 菲律宾 (PH) - 09xx (国际格式去0)
const PH_PREFIXES = {
  globe: ['905', '906', '915', '916', '917', '926', '927', '935', '936', '937', '945', '955', '956', '965', '966', '967', '975', '976', '977', '995', '996', '997'],
  smart: ['908', '918', '919', '920', '921', '928', '929', '939', '946', '947', '949', '950', '951', '961', '963', '968', '969', '970', '981', '989', '998', '999'],
  sun: ['922', '923', '924', '925', '931', '932', '933', '934', '940', '941', '942', '943', '973', '974']
};

// 印度尼西亚 (ID) - 08xx (国际格式去0)
const ID_PREFIXES = {
  telkomsel: ['811', '812', '813', '821', '822', '823', '851', '852', '853'],
  indosat: ['814', '815', '816', '855', '856', '857', '858'],
  xl: ['817', '818', '819', '859', '877', '878'],
  three: ['895', '896', '897', '898', '899'],
  smartfren: ['881', '882', '883', '884', '885', '886', '887', '888', '889']
};

// 马来西亚 (MY) - 01x (国际格式去0)
const MY_PREFIXES = {
  maxis: ['12', '142', '17'],
  celcom: ['13', '19', '148'],
  digi: ['16', '146', '11'],
  umobile: ['18', '11']
};

// 巴西 (BR) - 11-99 (区号)
const BR_PREFIXES = {
  vivo: ['11', '12', '13', '14', '15', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  claro: ['11', '21', '31', '41', '51', '61', '71', '81', '91'],
  tim: ['11', '21', '31', '41', '51', '61', '71', '81', '91']
};

// 墨西哥 (MX) - 2位或3位区号
const MX_PREFIXES = {
  common: ['55', '33', '81', '656', '664', '686', '722', '999', '477', '222', '614', '998', '442', '871', '444', '662', '229', '311', '449', '833']
};

// 澳门 (MO) - 6xxx
const MO_PREFIXES = {
  ctm: ['66', '62'],
  three: ['63', '68'],
  smartone: ['65'],
  china_telecom: ['68']
};

// 新加坡 (SG) - 8xxx, 9xxx
const SG_PREFIXES = {
  singtel: ['90', '91', '92', '93', '94', '95', '96', '97', '98'],
  starhub: ['81', '82', '83', '84', '85', '86', '87'],
  m1: ['88', '89']
};

const DAYS_IN_MONTH_BASE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const SUSPICIOUS_DAYS = [1, 15, 31];

// --- 辅助函数 ---

// 辅助函数：从运营商号段中随机选择
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

function applyLeetSpeak(word: string, intensity: number = 0.3): string {
  let result = '';
  for (const char of word.toLowerCase()) {
    if (Math.random() < intensity && LEET_REPLACEMENTS[char]) {
      result += randomChoice(LEET_REPLACEMENTS[char]);
    } else {
      result += char;
    }
  }
  return result;
}

function capitalizeRandom(word: string): string {
  const chars = word.split('');
  const positions = [0]; // 至少首字母大写
  
  // 30% 概率随机大写其他位置
  if (Math.random() < 0.3 && chars.length > 2) {
    const pos = secureRandom(1, chars.length - 1);
    positions.push(pos);
  }
  
  return chars.map((c, i) => positions.includes(i) ? c.toUpperCase() : c).join('');
}

function generateRandomWord(length: number): string {
  let word = '';
  for (let i = 0; i < length; i++) {
    word += LOWERCASE.charAt(secureRandom(0, LOWERCASE.length - 1));
  }
  return word;
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
  
  // 避免生成与当前日期过于接近的生日（看起来假）
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
  // 闰年检查
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
      // 日本: +81 90-xxxx-xxxx (去掉前导0)
      const jpPrefix = getRandomCarrierPrefix(JP_PREFIXES);
      return `${country.phonePrefix} ${jpPrefix}-${randomDigits(4)}-${randomDigits(4)}`;

    case 'KR':
      // 韩国: +82 10-xxxx-xxxx (去掉前导0)
      const krPrefix = getRandomCarrierPrefix(KR_PREFIXES);
      return `${country.phonePrefix} ${krPrefix}-${randomDigits(4)}-${randomDigits(4)}`;

    case 'GB':
      // 英国: +44 7xxx xxxxxx
      const gbPrefix = getRandomCarrierPrefix(GB_MOBILE_PREFIXES);
      return `${country.phonePrefix} ${gbPrefix} ${randomDigits(6)}`;

    case 'DE':
      // 德国: +49 1xx xxxxxxx
      const dePrefix = getRandomCarrierPrefix(DE_PREFIXES);
      // 德国号码长度不固定，通常是10-11位(不含0)
      const deSuffixLen = dePrefix.length > 3 ? 7 : 8; 
      return `${country.phonePrefix} ${dePrefix} ${randomDigits(deSuffixLen)}`;

    case 'FR':
      // 法国: +33 6 xx xx xx xx
      const frPrefix = getRandomCarrierPrefix(FR_PREFIXES);
      // frPrefix 已经是 6xx 格式，取第一位作为前缀，后面两位作为第一组
      const frStart = frPrefix.charAt(0);
      const frNext = frPrefix.slice(1);
      return `${country.phonePrefix} ${frStart} ${frNext} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'IT':
      // 意大利: +39 3xx xxx xxxx (移动号码以3开头，总长10位)
      const itPrefix = getRandomCarrierPrefix(IT_PREFIXES);
      return `${country.phonePrefix} ${itPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'ES':
      // 西班牙: +34 6xx xx xx xx (总长9位)
      const esPrefix = getRandomCarrierPrefix(ES_PREFIXES);
      return `${country.phonePrefix} ${esPrefix} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'NL':
      // 荷兰: +31 6 xx xx xx xx (移动号码以6开头，总长9位)
      const nlPrefix = getRandomCarrierPrefix(NL_PREFIXES);
      // nlPrefix 格式如 '612'
      return `${country.phonePrefix} 6 ${nlPrefix.slice(1)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'SE':
      // 瑞典: +46 7x xxx xx xx
      const sePrefix = getRandomCarrierPrefix(SE_PREFIXES);
      return `${country.phonePrefix} ${sePrefix.slice(0, 2)} ${sePrefix.slice(2)}${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'CH':
      // 瑞士: +41 7x xxx xx xx
      const chPrefix = getRandomCarrierPrefix(CH_PREFIXES);
      return `${country.phonePrefix} ${chPrefix} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'PL':
      // 波兰: +48 xxx xxx xxx
      const plPrefix = getRandomCarrierPrefix(PL_PREFIXES);
      return `${country.phonePrefix} ${plPrefix} ${randomDigits(3)} ${randomDigits(3)}`;

    case 'TR':
      // 土耳其: +90 5xx xxx xx xx
      const trPrefix = getRandomCarrierPrefix(TR_PREFIXES);
      return `${country.phonePrefix} ${trPrefix} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'RU':
      // 俄罗斯: +7 9xx xxx-xx-xx
      const ruPrefix = getRandomCarrierPrefix(RU_PREFIXES);
      return `${country.phonePrefix} ${ruPrefix} ${randomDigits(3)}-${randomDigits(2)}-${randomDigits(2)}`;

    case 'IN':
      // 印度: +91 xxxxx xxxxx
      const inPrefix = getRandomCarrierPrefix(IN_PREFIXES);
      const inRest = randomDigits(10 - inPrefix.length);
      return `${country.phonePrefix} ${inPrefix}${inRest.slice(0, 5 - inPrefix.length + 3)} ${inRest.slice(5 - inPrefix.length + 3)}`;

    case 'AU':
      // 澳大利亚: +61 4xx xxx xxx
      const auPrefix = getRandomCarrierPrefix(AU_PREFIXES);
      return `${country.phonePrefix} ${auPrefix} ${randomDigits(3)} ${randomDigits(3)}`;

    case 'TH':
      // 泰国: +66 8x xxx xxxx
      const thPrefix = getRandomCarrierPrefix(TH_PREFIXES);
      return `${country.phonePrefix} ${thPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'VN':
      // 越南: +84 xx xxx xxxx
      const vnPrefix = getRandomCarrierPrefix(VN_PREFIXES);
      return `${country.phonePrefix} ${vnPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'PH':
      // 菲律宾: +63 9xx xxx xxxx
      const phPrefix = getRandomCarrierPrefix(PH_PREFIXES);
      return `${country.phonePrefix} ${phPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'ID':
      // 印尼: +62 8xx xxxx xxxx
      const idPrefix = getRandomCarrierPrefix(ID_PREFIXES);
      return `${country.phonePrefix} ${idPrefix}-${randomDigits(4)}-${randomDigits(4)}`;

    case 'MY':
      // 马来西亚: +60 1x-xxx xxxx
      const myPrefix = getRandomCarrierPrefix(MY_PREFIXES);
      const myRestLen = myPrefix.length === 2 ? 8 : 7; // 12-xxxx xxxx vs 11-xxxx xxxx
      const myRest = randomDigits(myRestLen);
      return `${country.phonePrefix} ${myPrefix}-${myRest.slice(0, 3)} ${myRest.slice(3)}`;

    case 'BR':
      // 巴西: +55 xx 9xxxx-xxxx
      const brArea = getRandomCarrierPrefix(BR_PREFIXES);
      return `${country.phonePrefix} ${brArea} 9${randomDigits(4)}-${randomDigits(4)}`;

    case 'MX':
      // 墨西哥: +52 xx xxxx xxxx
      const mxPrefix = getRandomCarrierPrefix(MX_PREFIXES);
      const mxRestLen = 10 - mxPrefix.length;
      const mxRest = randomDigits(mxRestLen);
      return `${country.phonePrefix} ${mxPrefix} ${mxRest.slice(0, 4)} ${mxRest.slice(4)}`;

    default:
      // 其他国家使用通用格式
      let phone = country.phoneFormat;
      phone = phone.replace(/X/g, () => randomDigit().toString());
      return `${country.phonePrefix} ${phone}`;
  }
}

// 改进版密码生成函数 - 更贴近真实用户习惯
export function generatePassword(): string {
  const strategy = Math.random();
  
  // 策略1: 常见词 + 年份 + 可选特殊字符 (28%)
  // 例如: Love2000!, Happy1995, Star2002@
  if (strategy < 0.28) {
    const word = capitalizeRandom(randomChoice(COMMON_WORDS));
    const year = secureRandom(1990, 2006).toString();
    
    // 40% 概率添加特殊字符
    const special = Math.random() < 0.4 ? randomChoice(['!', '@', '#', '$', '&', '*']) : '';
    
    return word + year + special;
  }
  
  // 策略2: 常见词 + 常见数字组合 (22%)
  // 例如: Lucky123, Cool456!, Super789
  if (strategy < 0.50) {
    const word = capitalizeRandom(randomChoice(COMMON_WORDS));
    const nums = randomChoice(COMMON_NUMBERS);
    
    // 35% 概率添加特殊字符
    const special = Math.random() < 0.35 ? randomChoice(['!', '@', '#']) : '';
    
    return word + nums + special;
  }
  
  // 策略3: Leetspeak风格 (18%)
  // 例如: L0v3r123, Sm@rt456, C00l789!
  if (strategy < 0.68) {
    const word = randomChoice(COMMON_WORDS);
    const leetWord = applyLeetSpeak(word, 0.4);
    
    // 首字母大写
    const result = leetWord.charAt(0).toUpperCase() + leetWord.slice(1);
    
    // 添加数字
    const numLength = secureRandom(2, 3);
    let nums = '';
    for (let i = 0; i < numLength; i++) {
      nums += NUMBERS.charAt(secureRandom(0, NUMBERS.length - 1));
    }
    
    // 30% 概率添加特殊字符
    const special = Math.random() < 0.3 ? randomChoice(['!', '@', '#']) : '';
    
    return result + nums + special;
  }
  
  // 策略4: 两个单词组合 (15%)
  // 例如: LoveStar99, HappyLife2000, CoolKing123!
  if (strategy < 0.83) {
    const word1 = capitalizeRandom(randomChoice(COMMON_WORDS));
    const word2 = randomChoice(COMMON_WORDS);
    
    // 第二个词有50%概率首字母大写
    const finalWord2 = Math.random() < 0.5 ? 
      word2.charAt(0).toUpperCase() + word2.slice(1) : word2;
    
    // 添加数字(2-4位)
    const numLength = secureRandom(2, 4);
    let nums = '';
    for (let i = 0; i < numLength; i++) {
      nums += NUMBERS.charAt(secureRandom(0, NUMBERS.length - 1));
    }
    
    // 25% 概率添加特殊字符
    const special = Math.random() < 0.25 ? randomChoice(['!', '@', '#']) : '';
    
    return word1 + finalWord2 + nums + special;
  }
  
  // 策略5: 首字母大写 + 小写字母 + 数字 (12%)
  // 例如: Abcdefgh12, Qwertyu789, Zxcvbnm23
  if (strategy < 0.95) {
    let password = UPPERCASE.charAt(secureRandom(0, UPPERCASE.length - 1));
    
    // 5-8个小写字母
    const letterLength = secureRandom(5, 8);
    for (let i = 0; i < letterLength; i++) {
      password += LOWERCASE.charAt(secureRandom(0, LOWERCASE.length - 1));
    }
    
    // 2-3位数字
    const numLength = secureRandom(2, 3);
    for (let i = 0; i < numLength; i++) {
      password += NUMBERS.charAt(secureRandom(0, NUMBERS.length - 1));
    }
    
    // 20% 概率添加特殊字符
    if (Math.random() < 0.2) {
      password += randomChoice(['!', '@', '#']);
    }
    
    return password;
  }
  
  // 策略6: 混合随机模式 (5%) - 兜底方案
  // 例如: Mk7p@ss2024, Tr5st!23, Hs9pe456
  let password = '';
  const baseWord = generateRandomWord(secureRandom(4, 6));
  password = capitalizeRandom(baseWord);
  
  // 轻度leetspeak
  password = applyLeetSpeak(password, 0.2);
  
  // 添加数字
  const numLength = secureRandom(2, 4);
  for (let i = 0; i < numLength; i++) {
    password += NUMBERS.charAt(secureRandom(0, NUMBERS.length - 1));
  }
  
  // 30% 概率添加特殊字符
  if (Math.random() < 0.3) {
    const pos = secureRandom(1, password.length);
    password = password.slice(0, pos) + randomChoice(['!', '@', '#']) + password.slice(pos);
  }
  
  // 长度检查
  if (password.length < 8) {
    password += NUMBERS.charAt(secureRandom(0, NUMBERS.length - 1));
    password += NUMBERS.charAt(secureRandom(0, NUMBERS.length - 1));
  }
  if (password.length > 16) {
    password = password.substring(0, 16);
  }
  
  return password;
}

export function getCountryConfig(code: string) {
  return countries.find(c => c.code === code) || countries[0];
}

// 优化：直接返回常量引用，不创建新数组
export function getAllDomains(): string[] {
  return DOMAINS;
}

export function generateEmail(firstName: string, lastName: string, customDomain?: string) {
  const cleanFirstName = convertToLatinChars(firstName);
  const cleanLastName = convertToLatinChars(lastName);
  
  const domain = customDomain || DOMAINS[secureRandom(0, DOMAINS.length - 1)];
  
  const currentYear = new Date().getFullYear();
  const age = secureRandom(18, 25);
  const birthYear = currentYear - age;
  const shortYear = birthYear.toString().slice(-2);
  
  const smallNum = secureRandom(1, 99);
  
  const formatRandom = Math.random();
  let username: string;
  
  // 修改：强制使用分隔符，移除无分隔符的选项
  const separator = Math.random() < 0.5 ? '.' : '_';
  
  if (formatRandom < 0.28) {
    username = `${cleanFirstName}${separator}${cleanLastName}`;
  } else if (formatRandom < 0.45) {
    username = `${cleanFirstName}${separator}${cleanLastName}${smallNum}`;
  } else if (formatRandom < 0.60) {
    // 修改：添加分隔符
    username = `${cleanFirstName}${separator}${Math.random() < 0.6 ? shortYear : birthYear}`;
  } else if (formatRandom < 0.72) {
    username = `${cleanFirstName.charAt(0)}${separator}${cleanLastName}`;
  } else if (formatRandom < 0.82) {
    // 修改：添加分隔符
    username = `${cleanFirstName}${separator}${smallNum}`;
  } else if (formatRandom < 0.90) {
    username = `${cleanFirstName}${separator}${cleanLastName}${shortYear}`;
  } else if (formatRandom < 0.95) {
    username = `${cleanLastName}${separator}${cleanFirstName}`;
  } else {
    // 修改：确保使用分隔符
    if (Math.random() < 0.5) {
      username = `${cleanFirstName}${separator}${cleanLastName}${smallNum}`;
    } else {
      username = `${cleanFirstName.charAt(0)}${separator}${cleanLastName}${smallNum}`;
    }
  }
  
  username = username.replace(/[^a-z0-9._]/g, '');
  username = username.replace(/^[._]+|[._]+$/g, '');
  username = username.replace(/\.{2,}/g, '.').replace(/_{2,}/g, '_');
  
  if (/^[0-9]/.test(username)) {
    username = cleanFirstName.charAt(0) + separator + username;
  }
  
  if (username.length < 6) {
    username += separator + smallNum;
  }
  if (username.length > 12) {
    username = username.substring(0, 12);
  }
  
  username = username.replace(/[._]+$/, '');
  
  return `${username}@${domain}`;
}