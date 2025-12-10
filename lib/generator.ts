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

// 手机号运营商前缀数据 - 真实运营商号段

// 中国大陆 - 三大运营商真实号段
const CN_PREFIXES = {
  // 中国移动
  mobile: ['134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '172', '178', '182', '183', '184', '187', '188', '198'],
  // 中国联通
  unicom: ['130', '131', '132', '145', '155', '156', '166', '171', '175', '176', '185', '186'],
  // 中国电信
  telecom: ['133', '149', '153', '173', '177', '180', '181', '189', '191', '199']
};

// 香港 - 主要运营商
const HK_PREFIXES = {
  // 3HK (和记电讯)
  three: ['5400', '5401', '5402', '5403', '5404', '5405', '5406', '5407', '5408', '5409'],
  // SmarTone
  smartone: ['5123', '5163', '5193', '5233', '5263', '5293', '5323', '5353', '5383', '5413'],
  // PCCW Mobile
  pccw: ['9100', '9101', '9102', '9103', '9104', '9200', '9201', '9202', '9203', '9204']
};

// 台湾 - 五大电信
const TW_PREFIXES = {
  // 中华电信
  chunghwa: ['900', '901', '902', '903', '905', '906', '909', '910', '911', '912'],
  // 台湾大哥大
  twm: ['930', '931', '932', '933', '935', '936', '937', '938'],
  // 远传电信
  fetnet: ['920', '921', '922', '923', '924', '925', '926', '927'],
  // 台湾之星
  tstar: ['997', '998', '999'],
  // 亚太电信
  aptg: ['970', '971', '972', '973', '976', '977']
};

// 澳门 - 三大运营商
const MO_PREFIXES = {
  // CTM (澳门电讯)
  ctm: ['6200', '6201', '6202', '6203', '6600', '6601', '6602', '6603'],
  // 3 Macau
  three: ['6300', '6301', '6302', '6303', '6800', '6801', '6802', '6803'],
  // SmarTone Macau
  smartone: ['6500', '6501', '6502', '6503', '6700', '6701', '6702', '6703']
};

// 新加坡 - 三大运营商
const SG_PREFIXES = {
  // Singtel
  singtel: ['8000', '8001', '8002', '8003', '8100', '8101', '8102', '8103', '9000', '9001', '9002', '9003'],
  // StarHub
  starhub: ['8200', '8201', '8202', '8203', '8400', '8401', '8402', '8403', '9100', '9101', '9102', '9103'],
  // M1
  m1: ['8300', '8301', '8302', '8303', '8500', '8501', '8502', '8503', '9200', '9201', '9202', '9203']
};

// 美国/加拿大 - 真实区号
const US_AREA_CODES = {
  // 东部
  east: ['212', '213', '215', '267', '347', '516', '617', '646', '718', '917'],
  // 中部
  central: ['214', '312', '313', '469', '512', '713', '773', '832'],
  // 西部
  west: ['213', '310', '323', '408', '415', '510', '626', '650', '702', '818'],
  // 南部
  south: ['305', '404', '561', '786', '954']
};

// 日本 - 三大运营商
const JP_PREFIXES = {
  // NTT Docomo
  docomo: ['070', '080', '090'],
  // au (KDDI)
  au: ['070', '080', '090'],
  // SoftBank
  softbank: ['070', '080', '090']
};

// 韩国 - 三大运营商
const KR_PREFIXES = {
  // SK Telecom
  skt: ['010'],
  // KT
  kt: ['010'],
  // LG U+
  lgu: ['010']
};

// 英国 - 主要运营商
const GB_MOBILE_PREFIXES = {
  // EE
  ee: ['7400', '7401', '7402', '7500', '7501', '7502', '7700', '7701', '7702'],
  // O2
  o2: ['7410', '7411', '7412', '7510', '7511', '7512', '7710', '7711', '7712'],
  // Vodafone
  vodafone: ['7420', '7421', '7422', '7520', '7521', '7522', '7720', '7721', '7722'],
  // Three
  three: ['7430', '7431', '7432', '7530', '7531', '7532', '7730', '7731', '7732']
};

// 德国 - 主要运营商
const DE_PREFIXES = {
  // Telekom
  telekom: ['151', '152', '160', '170', '171', '175'],
  // Vodafone
  vodafone: ['152', '162', '172', '173', '174'],
  // O2
  o2: ['159', '176', '177', '178', '179']
};

// 法国 - 主要运营商
const FR_PREFIXES = {
  // Orange
  orange: ['601', '602', '603', '604', '605', '606', '607'],
  // SFR
  sfr: ['610', '611', '612', '613', '614', '615', '616'],
  // Bouygues
  bouygues: ['620', '621', '622', '623', '624', '625', '626'],
  // Free
  free: ['695', '696', '697', '698', '699']
};

// 俄罗斯 - 主要运营商
const RU_PREFIXES = {
  // MTS
  mts: ['910', '911', '912', '913', '914', '915', '916', '917', '918', '919'],
  // MegaFon
  megafon: ['920', '921', '922', '923', '924', '925', '926', '927', '928', '929'],
  // Beeline
  beeline: ['930', '931', '932', '933', '934', '935', '936', '937', '938', '939'],
  // Tele2
  tele2: ['950', '951', '952', '953', '954', '955', '956', '957', '958', '959']
};

// 印度 - 主要运营商
const IN_PREFIXES = {
  // Airtel
  airtel: ['70', '80', '81', '82', '83', '84', '85'],
  // Jio
  jio: ['70', '75', '76', '77', '78', '79'],
  // Vodafone Idea
  vi: ['70', '80', '81', '82', '90', '91', '92'],
  // BSNL
  bsnl: ['94', '95', '96', '97', '98', '99']
};

// 澳大利亚 - 主要运营商
const AU_PREFIXES = {
  // Telstra
  telstra: ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409'],
  // Optus
  optus: ['420', '421', '422', '423', '424', '425', '426', '427', '428', '429'],
  // Vodafone
  vodafone: ['450', '451', '452', '453', '454', '455', '456', '457', '458', '459']
};

// 泰国 - 主要运营商
const TH_PREFIXES = {
  // AIS
  ais: ['080', '081', '082', '083', '084', '085', '086', '087', '088', '089'],
  // DTAC
  dtac: ['090', '091', '092', '093', '094', '095', '096', '097', '098', '099'],
  // True Move
  true: ['060', '061', '062', '063', '064', '065', '066', '067', '068', '069']
};

// 越南 - 主要运营商
const VN_PREFIXES = {
  // Viettel
  viettel: ['086', '096', '097', '098', '032', '033', '034', '035', '036', '037', '038', '039'],
  // Vinaphone
  vinaphone: ['088', '091', '094', '081', '082', '083', '084', '085'],
  // Mobifone
  mobifone: ['089', '090', '093', '070', '076', '077', '078', '079']
};

// 菲律宾 - 主要运营商
const PH_PREFIXES = {
  // Globe
  globe: ['0905', '0906', '0915', '0916', '0917', '0926', '0927', '0935', '0936', '0937'],
  // Smart
  smart: ['0908', '0918', '0919', '0920', '0921', '0928', '0929', '0939', '0949', '0950'],
  // Sun
  sun: ['0922', '0923', '0924', '0925', '0932', '0933', '0934', '0940', '0941', '0942']
};

// 印度尼西亚 - 主要运营商
const ID_PREFIXES = {
  // Telkomsel
  telkomsel: ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853'],
  // Indosat
  indosat: ['0814', '0815', '0816', '0855', '0856', '0857', '0858'],
  // XL Axiata
  xl: ['0817', '0818', '0819', '0859', '0877', '0878', '0879']
};

// 马来西亚 - 主要运营商
const MY_PREFIXES = {
  // Maxis
  maxis: ['012', '014', '017', '018', '019'],
  // Celcom
  celcom: ['013', '019', '014', '018'],
  // Digi
  digi: ['010', '011', '014', '016']
};

// 巴西 - 主要运营商（包含区号）
const BR_PREFIXES = {
  // Vivo
  vivo: ['11', '21', '31', '41', '51', '61', '71', '81', '85', '91'],
  // Claro
  claro: ['11', '21', '31', '41', '51', '61', '71', '81', '85', '91'],
  // TIM
  tim: ['11', '21', '31', '41', '51', '61', '71', '81', '85', '91']
};

// 墨西哥 - 主要运营商
const MX_PREFIXES = {
  // Telcel
  telcel: ['55', '33', '81', '656', '664', '686'],
  // Movistar
  movistar: ['55', '33', '81', '656', '664', '686'],
  // AT&T
  att: ['55', '33', '81', '656', '664', '686']
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
      return `${country.phonePrefix} ${hkPrefix}${randomDigits(4)}`;

    case 'TW':
      const twPrefix = getRandomCarrierPrefix(TW_PREFIXES);
      return `${country.phonePrefix} ${twPrefix}${randomDigits(6)}`;

    case 'MO':
      const moPrefix = getRandomCarrierPrefix(MO_PREFIXES);
      return `${country.phonePrefix} ${moPrefix}${randomDigits(4)}`;

    case 'SG':
      const sgPrefix = getRandomCarrierPrefix(SG_PREFIXES);
      return `${country.phonePrefix} ${sgPrefix}${randomDigits(4)}`;

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
      return `${country.phonePrefix} ${dePrefix} ${randomDigits(8)}`;

    case 'FR':
      const frPrefix = getRandomCarrierPrefix(FR_PREFIXES);
      return `${country.phonePrefix} ${frPrefix.slice(0, 1)} ${frPrefix.slice(1)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'RU':
      const ruPrefix = getRandomCarrierPrefix(RU_PREFIXES);
      return `${country.phonePrefix} ${ruPrefix} ${randomDigits(3)}-${randomDigits(2)}-${randomDigits(2)}`;

    case 'IN':
      const inPrefix = getRandomCarrierPrefix(IN_PREFIXES);
      return `${country.phonePrefix} ${inPrefix}${randomDigits(8)}`;

    case 'AU':
      const auPrefix = getRandomCarrierPrefix(AU_PREFIXES);
      return `${country.phonePrefix} ${auPrefix} ${randomDigits(3)} ${randomDigits(3)}`;

    case 'TH':
      const thPrefix = getRandomCarrierPrefix(TH_PREFIXES);
      return `${country.phonePrefix} ${thPrefix.slice(0, 2)}-${thPrefix.slice(2)}-${randomDigits(4)}`;

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
      return `${country.phonePrefix} ${myPrefix}-${randomDigits(3)} ${randomDigits(4)}`;

    case 'BR':
      const brArea = getRandomCarrierPrefix(BR_PREFIXES);
      const brCarrier = Math.random() < 0.33 ? '9' : '8'; // 9开头是新号段
      return `${country.phonePrefix} ${brArea} ${brCarrier}${randomDigits(4)}-${randomDigits(4)}`;

    case 'MX':
      const mxPrefix = getRandomCarrierPrefix(MX_PREFIXES);
      return `${country.phonePrefix} ${mxPrefix} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'IT':
      // 意大利：3开头的移动号码
      const itCarrier = randomChoice(['33', '34', '35', '36', '37', '38', '39']);
      return `${country.phonePrefix} ${itCarrier}${randomDigits(1)} ${randomDigits(3)} ${randomDigits(4)}`;

    case 'ES':
      // 西班牙：6或7开头的移动号码
      const esFirst = randomChoice(['6', '7']);
      return `${country.phonePrefix} ${esFirst}${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'NL':
      // 荷兰：6开头的移动号码
      return `${country.phonePrefix} 6 ${randomDigits(8)}`;

    case 'SE':
      // 瑞典：7开头的移动号码
      return `${country.phonePrefix} ${randomDigit(7, 7)}${randomDigit(0, 9)} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'CH':
      // 瑞士：7开头的移动号码
      return `${country.phonePrefix} ${randomDigit(7, 7)}${randomDigit(5, 9)} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;

    case 'PL':
      // 波兰：5开头的移动号码
      const plCarrier = randomChoice(['50', '51', '53', '57', '60', '66', '69', '72', '73', '78', '79', '88']);
      return `${country.phonePrefix} ${plCarrier}${randomDigits(1)} ${randomDigits(3)} ${randomDigits(3)}`;

    case 'TR':
      // 土耳其：5开头的移动号码
      const trCarrier = randomChoice(['530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '540', '541', '542', '543', '544', '545', '546', '547', '548', '549']);
      return `${country.phonePrefix} ${trCarrier} ${randomDigits(3)} ${randomDigits(2)} ${randomDigits(2)}`;

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