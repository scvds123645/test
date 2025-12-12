import { countries, namesByCountry, CountryConfig } from '@/lib/countryData';
import { DOMAINS } from '@/lib/domains';

// --- 静态常量与预编译正则 ---

const LATIN_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NORMALIZE_REGEX = /[\u0300-\u036f]/g;
const ASCII_REGEX = /[^a-zA-Z0-9]/g;

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

const DAYS_IN_MONTH_BASE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 使用 Set 提高查找性能 (O(1))
const SUSPICIOUS_DAYS = new Set([1, 15, 31]);

// --- 工具函数：数据扁平化 ---
// 将嵌套的对象值展平为一维数组，在模块加载时执行一次，后续均为 O(1) 访问
const flattenValues = (obj: Record<string, string[]>) => Object.values(obj).flat();

// --- 手机号数据 (已扁平化处理) ---

const CN_PREFIXES_FLAT = flattenValues({
  mobile: ['134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '172', '178', '182', '183', '184', '187', '188', '195', '197', '198'],
  unicom: ['130', '131', '132', '145', '155', '156', '166', '167', '171', '175', '176', '185', '186', '196'],
  telecom: ['133', '149', '153', '173', '177', '180', '181', '189', '190', '191', '193', '199'],
  virtual: ['162', '165', '167', '170', '171']
});

const HK_PREFIXES_FLAT = [
  '51', '52', '53', '54', '55', '56', '57', '59',
  '60', '61', '62', '63', '64', '65', '66', '67', '68', '69',
  '90', '91', '92', '93', '94', '95', '96', '97', '98'
];

const TW_PREFIXES_FLAT = flattenValues({
  chunghwa: ['900', '901', '902', '903', '905', '906', '909', '910', '911', '912', '919', '921', '928', '932', '933', '934', '937', '963', '965', '966', '972', '974', '975', '978', '988'],
  twm: ['907', '914', '918', '920', '922', '923', '924', '929', '930', '931', '935', '936', '938', '939', '952', '953', '954', '955', '956', '958', '960', '961', '970', '971', '979', '983', '987', '989'],
  fetnet: ['903', '913', '915', '916', '917', '925', '926', '927', '930', '931', '936', '938', '955', '960', '962', '967', '968', '973', '976', '981', '984', '989']
});

const US_AREA_CODES_FLAT = flattenValues({
  east: ['201', '202', '203', '212', '215', '240', '267', '301', '302', '315', '339', '347', '351', '401', '410', '412', '413', '443', '475', '484', '508', '516', '518', '551', '570', '585', '603', '607', '609', '610', '617', '631', '646', '716', '717', '718', '724', '732', '781', '802', '814', '845', '856', '860', '908', '914', '917', '929', '973', '978'],
  central: ['216', '217', '218', '219', '224', '231', '234', '248', '260', '262', '269', '309', '312', '313', '314', '317', '319', '330', '402', '414', '417', '419', '434', '440', '507', '513', '515', '517', '563', '573', '574', '586', '605', '608', '612', '614', '616', '618', '630', '636', '641', '651', '701', '708', '712', '715', '734', '763', '773', '810', '812', '815', '816', '847', '906', '913', '920', '937', '952', '989'],
  south: ['205', '210', '214', '225', '228', '229', '239', '251', '252', '254', '256', '281', '305', '318', '321', '325', '334', '336', '337', '352', '361', '386', '404', '405', '407', '409', '423', '432', '469', '478', '479', '501', '502', '504', '512', '540', '561', '571', '580', '601', '606', '615', '662', '678', '682', '703', '704', '706', '713', '727', '731', '754', '757', '769', '770', '772', '786', '803', '804', '806', '813', '817', '828', '830', '832', '843', '850', '859', '863', '864', '865', '901', '903', '904', '910', '912', '918', '919', '931', '936', '940', '941', '954', '956', '972', '979', '980', '985'],
  west: ['206', '208', '209', '213', '253', '303', '307', '310', '323', '360', '385', '406', '408', '415', '425', '435', '442', '458', '480', '503', '505', '509', '510', '520', '530', '541', '559', '562', '602', '619', '623', '626', '650', '657', '661', '702', '707', '714', '719', '720', '725', '747', '760', '775', '801', '805', '808', '818', '831', '858', '907', '909', '916', '925', '928', '949', '951', '970', '971', '986']
});

const JP_PREFIXES_FLAT = flattenValues({
  docomo: ['90', '80', '70'],
  au: ['90', '80', '70'],
  softbank: ['90', '80', '70']
});

const KR_PREFIXES_FLAT = ['10'];

const GB_PREFIXES_FLAT = flattenValues({
  ee: ['7400', '7401', '7402', '7403', '7415', '7500', '7501', '7502', '7503', '7701', '7702', '7703', '7704', '7705', '7706', '7707', '7708', '7709', '7710', '7711', '7712'],
  o2: ['7435', '7436', '7437', '7440', '7441', '7442', '7443', '7444', '7510', '7511', '7512', '7513', '7514', '7515', '7516', '7517', '7518', '7519', '7520', '7521', '7522'],
  vodafone: ['7423', '7425', '7460', '7461', '7462', '7463', '7464', '7550', '7551', '7552', '7553', '7554', '7555', '7720', '7721', '7722', '7723', '7724', '7725', '7726', '7727', '7728'],
  three: ['7404', '7405', '7410', '7411', '7412', '7413', '7414', '7450', '7451', '7452', '7453', '7454', '7455', '7456', '7730', '7731', '7732', '7733', '7734', '7735', '7736', '7737', '7738']
});

const DE_PREFIXES_FLAT = flattenValues({
  telekom: ['151', '1511', '1512', '1514', '1515', '1516', '1517', '160', '170', '171', '175'],
  vodafone: ['152', '1520', '1522', '1523', '1525', '162', '172', '173', '174'],
  o2: ['159', '176', '177', '178', '179', '1573', '1575', '1577', '1578']
});

const FR_PREFIXES_FLAT = flattenValues({
  orange: ['607', '608', '630', '631', '632', '640', '641', '642', '670', '671', '672', '680', '681', '682'],
  sfr: ['609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621'],
  bouygues: ['650', '651', '652', '653', '658', '659', '660', '661', '662', '663', '664', '665', '666', '667'],
  free: ['651', '652', '695', '698', '699', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769']
});

const IT_PREFIXES_FLAT = flattenValues({
  tim: ['330', '331', '333', '334', '335', '336', '337', '338', '339', '360', '366', '368'],
  vodafone: ['340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '383'],
  windtre: ['320', '322', '323', '324', '327', '328', '329', '380', '388', '389', '391', '392', '393'],
  iliad: ['351', '352', '353', '354', '355', '356', '357', '358', '359']
});

const ES_PREFIXES_FLAT = flattenValues({
  movistar: ['609', '610', '616', '619', '620', '629', '630', '639', '646', '649', '650', '659', '660', '669', '670', '679', '680', '689'],
  vodafone: ['607', '610', '617', '647', '667', '677', '687', '697', '717', '737', '747'],
  orange: ['605', '615', '625', '635', '645', '655', '665', '675', '685', '695', '715', '725', '735', '745'],
  yoigo: ['622', '633', '722', '733', '744']
});

const NL_PREFIXES_FLAT = flattenValues({
  kpn: ['610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '633', '634', '636', '637', '649', '650', '651', '652', '653', '654', '655'],
  vodafone: ['611', '615', '621', '625', '627', '629', '631', '634', '638', '640', '641', '642', '643', '646', '648', '650', '651', '652', '653', '654', '655'],
  tmobile: ['614', '616', '618', '624', '626', '628', '634', '638', '641', '642', '643', '648', '658', '681', '682', '683']
});

const SE_PREFIXES_FLAT = flattenValues({
  telia: ['702', '703', '704', '705', '706', '708', '709', '722', '723', '724', '725', '727', '730', '738'],
  tele2: ['700', '701', '704', '707', '708', '709', '720', '721', '722', '723', '729', '733', '734', '735', '736', '737', '739'],
  telenor: ['700', '701', '702', '703', '704', '705', '706', '707', '708', '709', '720', '721', '722', '723', '724', '725', '728', '731', '732', '733', '734'],
  tre: ['700', '701', '702', '703', '704', '705', '706', '707', '708', '709', '720', '721', '722', '723', '728', '730', '735', '738', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769']
});

const CH_PREFIXES_FLAT = flattenValues({
  swisscom: ['79'],
  sunrise: ['76'],
  salt: ['78'],
  virtual: ['75', '77']
});

const PL_PREFIXES_FLAT = flattenValues({
  orange: ['501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519'],
  play: ['530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', '730', '731', '732', '733', '734', '735', '736', '737', '738', '739', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799'],
  plus: ['601', '603', '605', '607', '609', '661', '663', '665', '667', '669', '691', '693', '695', '697'],
  tmobile: ['600', '602', '604', '606', '608', '660', '662', '664', '668', '690', '692', '694', '696', '698']
});

const TR_PREFIXES_FLAT = flattenValues({
  turkcell: ['530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '561'],
  vodafone: ['540', '541', '542', '543', '544', '545', '546', '547', '548', '549'],
  turktelekom: ['501', '505', '506', '507', '551', '552', '553', '554', '555', '559']
});

const RU_PREFIXES_FLAT = flattenValues({
  mts: ['910', '911', '912', '913', '914', '915', '916', '917', '918', '919', '980', '981', '982', '983', '984', '985', '986', '987', '988', '989'],
  megafon: ['920', '921', '922', '923', '924', '925', '926', '927', '928', '929', '930', '931', '932', '933', '934', '935', '936', '937', '938', '939'],
  beeline: ['903', '905', '906', '909', '960', '961', '962', '963', '964', '965', '966', '967', '968', '969', '976'],
  tele2: ['900', '901', '902', '904', '908', '950', '951', '952', '953', '958', '977', '991', '992', '993', '994', '995', '996', '999']
});

const IN_PREFIXES_FLAT = flattenValues({
  jio: ['62', '70', '79', '89', '90', '91', '93', '95', '96', '97', '98'],
  airtel: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  vi: ['70', '72', '73', '74', '75', '76', '77', '78', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']
});

const AU_PREFIXES_FLAT = flattenValues({
  telstra: ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '426', '427', '428', '429'],
  optus: ['430', '431', '432', '433', '434', '435', '436', '437', '438', '439', '440', '441', '442', '443', '444', '445', '446', '447', '448', '449', '450', '451', '452', '453', '454', '455', '456', '457', '458', '459'],
  vodafone: ['460', '461', '462', '463', '464', '465', '466', '467', '468', '469', '470', '471', '472', '473', '474', '475', '476', '477', '478', '479', '480', '481', '482', '483', '484', '485', '486', '487', '488', '489']
});

const TH_PREFIXES_FLAT = flattenValues({
  ais: ['61', '62', '63', '64', '65', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '98'],
  dtac: ['66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99'],
  true: ['60', '61', '62', '63', '64', '65', '66', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']
});

const VN_PREFIXES_FLAT = flattenValues({
  viettel: ['86', '96', '97', '98', '32', '33', '34', '35', '36', '37', '38', '39'],
  vinaphone: ['88', '91', '94', '81', '82', '83', '84', '85'],
  mobifone: ['89', '90', '93', '70', '76', '77', '78', '79'],
  vietnamobile: ['92', '56', '58'],
  gmobile: ['99', '59']
});

const PH_PREFIXES_FLAT = flattenValues({
  globe: ['905', '906', '915', '916', '917', '926', '927', '935', '936', '937', '945', '955', '956', '965', '966', '967', '975', '976', '977', '995', '996', '997'],
  smart: ['908', '918', '919', '920', '921', '928', '929', '939', '946', '947', '949', '950', '951', '961', '963', '968', '969', '970', '981', '989', '998', '999'],
  sun: ['922', '923', '924', '925', '931', '932', '933', '934', '940', '941', '942', '943', '973', '974']
});

const ID_PREFIXES_FLAT = flattenValues({
  telkomsel: ['811', '812', '813', '821', '822', '823', '851', '852', '853'],
  indosat: ['814', '815', '816', '855', '856', '857', '858'],
  xl: ['817', '818', '819', '859', '877', '878'],
  three: ['895', '896', '897', '898', '899'],
  smartfren: ['881', '882', '883', '884', '885', '886', '887', '888', '889']
});

const MY_PREFIXES_FLAT = flattenValues({
  maxis: ['12', '142', '17'],
  celcom: ['13', '19', '148'],
  digi: ['16', '146', '11'],
  umobile: ['18', '11']
});

const BR_PREFIXES_FLAT = flattenValues({
  vivo: ['11', '12', '13', '14', '15', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
  claro: ['11', '21', '31', '41', '51', '61', '71', '81', '91'],
  tim: ['11', '21', '31', '41', '51', '61', '71', '81', '91']
});

const MX_PREFIXES_FLAT = ['55', '33', '81', '656', '664', '686', '722', '999', '477', '222', '614', '998', '442', '871', '444', '662', '229', '311', '449', '833'];

const MO_PREFIXES_FLAT = flattenValues({
  ctm: ['66', '62'],
  three: ['63', '68'],
  smartone: ['65'],
  china_telecom: ['68']
});

const SG_PREFIXES_FLAT = flattenValues({
  singtel: ['90', '91', '92', '93', '94', '95', '96', '97', '98'],
  starhub: ['81', '82', '83', '84', '85', '86', '87'],
  m1: ['88', '89']
});

// --- 性能优化的辅助函数 ---

// 1. 快速随机数 (Math.random) - 性能是 crypto 的 10-20 倍
// 适用于姓名、生日、手机号等不需要加密安全性的字段
function fastRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 2. 安全随机数 (crypto) - 仅用于密码生成
function secureRandom(min: number, max: number): number {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
}

// 3. 通用选择器 (默认为快速随机)
function randomChoice<T>(array: T[], secure = false): T {
  const index = secure 
    ? secureRandom(0, array.length - 1) 
    : fastRandom(0, array.length - 1);
  return array[index];
}

// 4. 快速数字生成
function randomDigit(min: number = 0, max: number = 9): string {
  return fastRandom(min, max).toString();
}

// 5. 快速多位数字生成 (使用字符串拼接代替数组 join，V8 引擎下性能更佳)
function randomDigits(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += fastRandom(0, 9);
  }
  return result;
}

// 6. 优化的字符转换 (使用预编译正则)
function convertToLatinChars(str: string): string {
  const normalized = str.normalize("NFD").replace(NORMALIZE_REGEX, "");
  const ascii = normalized.replace(ASCII_REGEX, "");
  
  if (ascii.length === 0) {
    let result = "";
    const charsLen = LATIN_CHARS.length;
    for (let i = 0; i < 5; i++) {
      result += LATIN_CHARS.charAt(fastRandom(0, charsLen - 1));
    }
    return result;
  }
  return ascii.toLowerCase();
}

// --- 导出函数 ---

export function generateName(countryCode: string) {
  const config = namesByCountry[countryCode] || namesByCountry['US'];
  const firstName = randomChoice(config.firstNames);
  const lastName = randomChoice(config.lastNames);
  return { firstName, lastName };
}

export function generateBirthday() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // 优化权重计算，直接使用随机数分段
  const rand = Math.random();
  let age = 22;
  
  if (rand < 0.20) age = fastRandom(18, 19);
  else if (rand < 0.45) age = fastRandom(20, 21); // 0.20 + 0.25
  else if (rand < 0.75) age = fastRandom(22, 23); // 0.45 + 0.30
  else age = fastRandom(24, 25);
  
  const birthYear = currentYear - age;
  
  // 简化月份选择
  let month = fastRandom(1, 12);
  
  // 闰年判断
  let maxDays = DAYS_IN_MONTH_BASE[month - 1];
  if (month === 2 && (birthYear % 4 === 0 && (birthYear % 100 !== 0 || birthYear % 400 === 0))) {
    maxDays = 29;
  }
  
  let day = fastRandom(1, maxDays);
  // 使用 Set 快速判断
  if (SUSPICIOUS_DAYS.has(day) && Math.random() < 0.6) {
    day = fastRandom(1, maxDays);
  }
  
  // 模板字符串拼接 (性能优于 padStart 在极高频调用下，但此处瓶颈不在字符串)
  const mStr = month < 10 ? '0' + month : month;
  const dStr = day < 10 ? '0' + day : day;
  
  return `${birthYear}-${mStr}-${dStr}`;
}

export function generatePhone(country: CountryConfig) {
  const code = country.code;
  
  // 使用扁平化数组，直接 O(1) 随机选择
  switch (code) {
    case 'CN': return `${country.phonePrefix} ${randomChoice(CN_PREFIXES_FLAT)}${randomDigits(8)}`;
    case 'HK': return `${country.phonePrefix} ${randomChoice(HK_PREFIXES_FLAT)}${randomDigits(6)}`;
    case 'TW': return `${country.phonePrefix} ${randomChoice(TW_PREFIXES_FLAT)}${randomDigits(6)}`;
    case 'MO': return `${country.phonePrefix} ${randomChoice(MO_PREFIXES_FLAT)}${randomDigits(6)}`;
    case 'SG': return `${country.phonePrefix} ${randomChoice(SG_PREFIXES_FLAT)}${randomDigits(6)}`;
    
    case 'US':
    case 'CA': return `${country.phonePrefix} ${randomChoice(US_AREA_CODES_FLAT)}-${randomDigit(2, 9)}${randomDigits(2)}-${randomDigits(4)}`;

    case 'JP': return `${country.phonePrefix} ${randomChoice(JP_PREFIXES_FLAT)}-${randomDigits(4)}-${randomDigits(4)}`;
    case 'KR': return `${country.phonePrefix} ${randomChoice(KR_PREFIXES_FLAT)}-${randomDigits(4)}-${randomDigits(4)}`;
    case 'GB': return `${country.phonePrefix} ${randomChoice(GB_PREFIXES_FLAT)} ${randomDigits(6)}`;

    case 'DE': 
      const dePrefix = randomChoice(DE_PREFIXES_FLAT);
      return `${country.phonePrefix} ${dePrefix} ${randomDigits(dePrefix.length > 3 ? 7 : 8)}`;

    case 'FR':
      const frPrefix = randomChoice(FR_PREFIXES_FLAT);
      return `${country.phonePrefix} ${frPrefix.charAt(0)} ${frPrefix.slice(1)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'IT': return `${country.phonePrefix} ${randomChoice(IT_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(4)}`;
    case 'ES': return `${country.phonePrefix} ${randomChoice(ES_PREFIXES_FLAT)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;
    case 'NL': 
      const nlPrefix = randomChoice(NL_PREFIXES_FLAT);
      return `${country.phonePrefix} 6 ${nlPrefix.slice(1)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;
    
    case 'SE':
      const sePrefix = randomChoice(SE_PREFIXES_FLAT);
      return `${country.phonePrefix} ${sePrefix.slice(0, 2)} ${sePrefix.slice(2)}${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'CH': return `${country.phonePrefix} ${randomChoice(CH_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;
    case 'PL': return `${country.phonePrefix} ${randomChoice(PL_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(3)}`;
    case 'TR': return `${country.phonePrefix} ${randomChoice(TR_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;
    case 'RU': return `${country.phonePrefix} ${randomChoice(RU_PREFIXES_FLAT)} ${randomDigits(3)}-${randomDigits(2)}-${randomDigits(2)}`;

    case 'IN':
      const inPrefix = randomChoice(IN_PREFIXES_FLAT);
      const inRest = randomDigits(10 - inPrefix.length);
      const inSplit = 5 - inPrefix.length + 3;
      return `${country.phonePrefix} ${inPrefix}${inRest.slice(0, inSplit)} ${inRest.slice(inSplit)}`;

    case 'AU': return `${country.phonePrefix} ${randomChoice(AU_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(3)}`;
    case 'TH': return `${country.phonePrefix} ${randomChoice(TH_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(4)}`;
    case 'VN': return `${country.phonePrefix} ${randomChoice(VN_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(4)}`;
    case 'PH': return `${country.phonePrefix} ${randomChoice(PH_PREFIXES_FLAT)} ${randomDigits(3)} ${randomDigits(4)}`;
    case 'ID': return `${country.phonePrefix} ${randomChoice(ID_PREFIXES_FLAT)}-${randomDigits(4)}-${randomDigits(4)}`;

    case 'MY':
      const myPrefix = randomChoice(MY_PREFIXES_FLAT);
      const myRest = randomDigits(myPrefix.length === 2 ? 8 : 7);
      return `${country.phonePrefix} ${myPrefix}-${myRest.slice(0, 3)} ${myRest.slice(3)}`;

    case 'BR': return `${country.phonePrefix} ${randomChoice(BR_PREFIXES_FLAT)} 9${randomDigits(4)}-${randomDigits(4)}`;

    case 'MX':
      const mxPrefix = randomChoice(MX_PREFIXES_FLAT);
      const mxRest = randomDigits(10 - mxPrefix.length);
      return `${country.phonePrefix} ${mxPrefix} ${mxRest.slice(0, 4)} ${mxRest.slice(4)}`;

    default:
      // 使用正则回调快速替换
      return `${country.phonePrefix} ${country.phoneFormat.replace(/X/g, () => fastRandom(0, 9).toString())}`;
  }
}

export function generatePassword(): string {
  // 使用安全随机数
  const targetLength = secureRandom(6, 8);
  let word = randomChoice(COMMON_WORDS, true); // secure=true
  
  const numLength = secureRandom(1, Math.max(2, targetLength - 3));
  const maxWordLen = targetLength - numLength;

  if (word.length > maxWordLen) {
    word = word.substring(0, maxWordLen);
  }
  
  const caseRand = Math.random(); // 大小写变体不需要 crypto 级别的随机
  if (caseRand < 0.60) {
    word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  } else if (caseRand < 0.90) {
    word = word.toLowerCase();
  } else {
    word = word.toUpperCase();
  }
  
  let password = word;
  
  // 使用安全随机数补齐数字
  while (password.length < targetLength) {
    password += secureRandom(0, 9).toString();
  }

  // 长度修正 (substring 是 O(1) 的视图操作在 V8 中通常很快)
  return password.length > targetLength ? password.substring(0, targetLength) : password;
}

export function getCountryConfig(code: string) {
  return countries.find(c => c.code === code) || countries[0];
}

export function getAllDomains(): string[] {
  return DOMAINS;
}

export function generateEmail(firstName: string, lastName: string, customDomain?: string) {
  const domain = customDomain || randomChoice(DOMAINS);

  let first = convertToLatinChars(firstName);
  let last = convertToLatinChars(lastName);
  
  if (first.length > 6) first = first.slice(0, Math.max(4, fastRandom(4, 6)));
  if (last.length > 6) last = last.slice(0, Math.max(4, fastRandom(4, 6)));

  const MAX_LEN = 11;
  const patternRand = Math.random();
  let username = '';
  
  // 模式优化：直接拼接
  if (patternRand < 0.40) {
    username = first;
  } else if (patternRand < 0.65) {
    username = first.charAt(0) + last;
  } else if (patternRand < 0.80) {
    username = first + last.charAt(0);
  } else if (patternRand < 0.95) {
    username = (first.length + last.length < 9) ? first + last : first;
  } else {
    username = last + first.charAt(0);
  }

  if (username.length > MAX_LEN) username = username.slice(0, MAX_LEN);

  const remainingSpace = MAX_LEN - username.length;
  
  if (remainingSpace >= 2) {
    if (Math.random() < 0.70 || username.length < 5) {
      const lenToGenerate = Math.min(remainingSpace, fastRandom(2, 4));
      if (lenToGenerate === 4) {
        username += fastRandom(1985, 2025).toString();
      } else {
        username += randomDigits(lenToGenerate);
      }
    }
  }

  // 最终长度校验与补齐
  if (username.length > MAX_LEN) username = username.slice(0, MAX_LEN);
  while (username.length < 6) username += fastRandom(0, 9);
  
  return `${username}@${domain}`;
}
