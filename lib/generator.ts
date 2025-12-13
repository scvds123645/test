import { countries, namesByCountry, CountryConfig } from '@/lib/countryData';

import { DOMAINS } from '@/lib/domains';

// --- 静态常量定义 ---

const LATIN_CHARS = "abcdefghijklmnopqrstuvwxyz";

const DAYS_IN_MONTH_BASE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const SUSPICIOUS_DAYS = [1, 15, 31];

// 年龄分布权重

const AGE_DISTRIBUTION = [

{ min: 18, max: 19, weight: 0.20 },

{ min: 20, max: 21, weight: 0.25 },

{ min: 22, max: 23, weight: 0.30 },

{ min: 24, max: 25, weight: 0.25 },

];

// --- 手机号运营商前缀数据 ---

const CN_PREFIXES = {

mobile: ['134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '172', '178', '182', '183', '184', '187', '188', '195', '197', '198'],

unicom: ['130', '131', '132', '145', '155', '156', '166', '167', '171', '175', '176', '185', '186', '196'],

telecom: ['133', '149', '153', '173', '177', '180', '181', '189', '190', '191', '193', '199'],

virtual: ['162', '165', '167', '170', '171']

};

const HK_PREFIXES = {

csl: ['9000', '9010', '9020', '9030', '9040', '9050', '9060', '9070', '9080', '9090', '9100', '9110', '9120', '9130', '9140', '9150', '9160', '9170', '9180', '9190'],

three: ['5100', '5110', '5120', '5130', '5140', '5150', '5160', '5170', '5180', '5190', '6100', '6110', '6120', '6130', '6140', '6150', '6160', '6170', '6180', '6190'],

smartone: ['5500', '5510', '5520', '5530', '5540', '5550', '5560', '5570', '5580', '5590', '6500', '6510', '6520', '6530', '6540', '6550', '6560', '6570', '6580', '6590'],

cmhk: ['6000', '6010', '6020', '6030', '6040', '6050', '6060', '6070', '6080', '6090', '9700', '9710', '9720', '9730', '9740', '9750', '9760', '9770', '9780', '9790']

};

const TW_PREFIXES = {

chunghwa: ['900', '901', '902', '903', '905', '906', '909', '910', '911', '912'],

twm: ['907', '914', '918', '920', '922', '923', '924', '929', '930', '931'],

fetnet: ['903', '913', '915', '916', '917', '925', '926', '927', '930', '931']

};

const US_AREA_CODES = {

east: ['201', '202', '203', '212', '215', '240', '267', '301', '302', '315'],

central: ['216', '217', '218', '219', '224', '231', '234', '248', '260', '262'],

south: ['205', '210', '214', '225', '228', '229', '239', '251', '252', '254'],

west: ['206', '208', '209', '213', '253', '303', '307', '310', '323', '360']

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

ee: ['7400', '7401', '7402', '7403', '7415', '7500', '7501', '7502'],

o2: ['7435', '7436', '7437', '7440', '7441', '7442', '7443', '7444'],

vodafone: ['7423', '7425', '7460', '7461', '7462', '7463', '7464', '7550'],

three: ['7404', '7405', '7410', '7411', '7412', '7413', '7414', '7450']

};

const DE_PREFIXES = {

telekom: ['151', '1511', '1512', '1514', '1515', '1516', '1517', '160'],

vodafone: ['152', '1520', '1522', '1523', '1525', '162', '172', '173'],

o2: ['159', '176', '177', '178', '179', '1573', '1575', '1577']

};

const FR_PREFIXES = {

orange: ['607', '608', '630', '631', '632', '640', '641', '642'],

sfr: ['609', '610', '611', '612', '613', '614', '615', '616'],

bouygues: ['650', '651', '652', '653', '658', '659', '660', '661'],

free: ['651', '652', '695', '698', '699', '760', '761', '762']

};

const IT_PREFIXES = {

tim: ['330', '331', '333', '334', '335', '336', '337', '338'],

vodafone: ['340', '341', '342', '343', '344', '345', '346', '347'],

windtre: ['320', '322', '323', '324', '327', '328', '329', '380'],

iliad: ['351', '352', '353', '354', '355', '356', '357', '358']

};

const ES_PREFIXES = {

movistar: ['609', '610', '616', '619', '620', '629', '630', '639'],

vodafone: ['607', '610', '617', '647', '667', '677', '687', '697'],

orange: ['605', '615', '625', '635', '645', '655', '665', '675'],

yoigo: ['622', '633', '722', '733', '744']

};

// ... (其他国家的前缀配置可以保持不变或简化)

// --- 辅助函数 ---

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

function getRandomCarrierPrefix(carriers: Record<string, string[]>): string {

const carrierNames = Object.keys(carriers);

const carrier = randomChoice(carrierNames);

return randomChoice(carriers[carrier]);

}

/**

* 生成随机6位小写英文字母

*/

function generateRandomLetters(length: number = 6): string {

let result = '';

for (let i = 0; i < length; i++) {

result += LATIN_CHARS[secureRandom(0, LATIN_CHARS.length - 1)];

}

return result;

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

return `${country.phonePrefix} ${hkPrefix}${randomDigits(4)}`;


case 'TW':

const twPrefix = getRandomCarrierPrefix(TW_PREFIXES);

return `${country.phonePrefix} ${twPrefix}${randomDigits(6)}`;


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


default:

let phone = country.phoneFormat;

phone = phone.replace(/X/g, () => randomDigit().toString());

return `${country.phonePrefix} ${phone}`;

}

}

/**

* 生成密码：随机6位小写英文字母

*/

export function generatePassword(): string {

return generateRandomLetters(6);

}

export function getCountryConfig(code: string) {

return countries.find(c => c.code === code) || countries[0];

}

export function getAllDomains(): string[] {

return DOMAINS;

}

/**

* 生成邮箱：随机6位小写英文字母 + @域名

*/

export function generateEmail(firstName: string, lastName: string, customDomain?: string) {

const domain = customDomain || randomChoice(DOMAINS);

const username = generateRandomLetters(6);

return `${username}@${domain}`;

}