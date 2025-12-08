import { countries, namesByCountry, CountryConfig } from '@/lib/countryData';

// 辅助函数:将字符转换为拉丁字母
function convertToLatinChars(str: string): string {
  const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const ascii = normalized.replace(/[^a-zA-Z0-9]/g, "");
  
  if (ascii.length === 0) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  return ascii.toLowerCase();
}

// 高质量随机数生成(避免模式检测)
function secureRandom(min: number, max: number): number {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
}

// 1. 生成姓名
export function generateName(countryCode: string) {
  const config = namesByCountry[countryCode] || namesByCountry['US'];
  const firstName = config.firstNames[secureRandom(0, config.firstNames.length - 1)];
  const lastName = config.lastNames[secureRandom(0, config.lastNames.length - 1)];
  return { firstName, lastName };
}

// 2. 生成生日 - 防检测版:模拟真实用户注册行为
export function generateBirthday() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  
  // Facebook 真实用户年龄分布(避免过于集中在某个年龄段)
  const ageDistribution = [
    { min: 18, max: 21, weight: 0.12 },  // 年轻用户 12%
    { min: 22, max: 27, weight: 0.22 },  // 22%
    { min: 28, max: 34, weight: 0.25 },  // 主力用户 25%
    { min: 35, max: 42, weight: 0.18 },  // 18%
    { min: 43, max: 51, weight: 0.13 },  // 13%
    { min: 52, max: 58, weight: 0.07 },  // 7%
    { min: 59, max: 65, weight: 0.03 },  // 3%
  ];
  
  // 使用加权随机选择年龄段
  let random = Math.random();
  let age = 25; // 默认值
  
  for (const range of ageDistribution) {
    if (random < range.weight) {
      age = secureRandom(range.min, range.max);
      break;
    }
    random -= range.weight;
  }
  
  const birthYear = currentYear - age;
  
  // 生日月份分布(避免过于集中)
  // 避开当前月份的前后1个月(降低"刚注册就生日"的异常)
  const avoidMonths = [
    (currentMonth - 2 + 12) % 12 || 12,
    (currentMonth - 1 + 12) % 12 || 12,
    currentMonth,
    (currentMonth % 12) + 1,
  ];
  
  let month: number;
  do {
    month = secureRandom(1, 12);
  } while (Math.random() < 0.7 && avoidMonths.includes(month)); // 70%概率避开这些月份
  
  // 根据月份确定天数
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && birthYear % 4 === 0 && (birthYear % 100 !== 0 || birthYear % 400 === 0)) {
    daysInMonth[1] = 29;
  }
  
  // 避免选择1号、15号、31号等"太整齐"的日期(人工痕迹)
  const suspiciousDays = [1, 15, 31];
  let day: number;
  do {
    day = secureRandom(1, daysInMonth[month - 1]);
  } while (Math.random() < 0.6 && suspiciousDays.includes(day)); // 60%概率避开
  
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  
  return `${birthYear}-${monthStr}-${dayStr}`;
}

// 随机数字生成辅助函数
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

// 3. 生成真实手机号(避免检测:使用真实号段)
export function generatePhone(country: CountryConfig) {
  const code = country.code;
  let phone = '';

  switch (code) {
    case 'CN': // 中国移动/联通/电信真实号段
      const cnRealPrefixes = [
        // 中国移动
        '134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159',
        '172', '178', '182', '183', '184', '187', '188', '198',
        // 中国联通
        '130', '131', '132', '145', '155', '156', '166', '171', '175', '176', '185', '186',
        // 中国电信
        '133', '149', '153', '173', '177', '180', '181', '189', '191', '199'
      ];
      const cnPrefix = cnRealPrefixes[secureRandom(0, cnRealPrefixes.length - 1)];
      phone = cnPrefix + randomDigits(8);
      return `${country.phonePrefix} ${phone}`;

    case 'HK': // 香港真实号段 (8位数字)
      const hkRealPrefixes = [
        // 中国移动香港 (CMHK) - 主力号段
        '5123', '5163', '5193', '5233', '5263', '5293', '5323', '5353', '5383', '5413',
        '5443', '5473', '5503', '5533', '5563', '5593', '5623', '5653', '5683', '5713',
        '5743', '5773', '5803', '5833', '5863', '5893', '5923', '5953', '5983',
        '6012', '6013', '6018', '6019', '6020', '6038', '6039', '6043', '6046', '6066',
        '6080', '6081', '6082', '6083', '6089', '6123', '6138', '6158', '6178', '6198',
        '6213', '6233', '6253', '6263', '6273', '6283', '6293', '6313', '6323', '6343',
        '6363', '6383', '6393', '6413', '6433', '6453', '6473', '6493', '6513', '6533',
        '6553', '6573', '6593', '6613', '6633', '6653', '6673', '6693', '6713', '6733',
        '6753', '6773', '6793', '6813', '6833', '6853', '6873', '6893', '6913', '6933',
        '6953', '6973', '6993', '9012', '9013', '9018', '9019', '9020',
        // 香港移动通讯 (CSL) - 主要号段
        '9021', '9022', '9023', '9024', '9028', '9030', '9031', '9032', '9033', '9034',
        '9036', '9037', '9038', '9039', '9040', '9041', '9043', '9044', '9046', '9047',
        '9051', '9053', '9055', '9056', '9057', '9058', '9059', '9060', '9061', '9062',
        '9063', '9064', '9065', '9066', '9068', '9069', '9070', '9072', '9074', '9076',
        '9078', '9080', '9081', '9082', '9083', '9085', '9086', '9087', '9088', '9089',
        '9090', '9091', '9092', '9093', '9094', '9095', '9096', '9097', '9098', '9099',
        // 3香港 (3 HK) - 主要号段
        '5401', '5402', '5403', '5404', '5405', '5406', '5407', '5408', '5409', '5410',
        '5411', '5412', '5413', '5414', '5415', '5416', '5417', '5418', '5419', '5420',
        '6101', '6102', '6103', '6104', '6105', '6106', '6107', '6108', '6109', '6110',
        '6200', '6201', '6202', '6203', '6204', '6205', '6206', '6207', '6208', '6209',
        '6210', '6211', '6212', '6400', '6401', '6402', '6403', '6404', '6405', '6406',
        '6600', '6601', '6602', '6603', '6604', '6605', '6606', '6607', '6608', '6609',
        '6700', '6701', '6702', '6703', '6704', '6705', '6706', '6707', '6708', '6709',
        '6900', '6901', '6902', '6903', '6904', '6905', '6906', '6907', '6908', '6909',
        // SmarTone - 主要号段
        '5100', '5101', '5102', '5103', '5104', '5105', '5106', '5107', '5108', '5109',
        '5110', '5111', '5112', '5113', '5114', '5115', '5116', '5117', '5118', '5119',
        '5160', '5161', '5162', '5164', '5165', '5166', '5167', '5168', '5169', '5170',
        '5190', '5191', '5192', '5194', '5195', '5196', '5197', '5198', '5199', '5200',
        '5230', '5231', '5232', '5234', '5235', '5236', '5237', '5238', '5239', '5240',
        '5260', '5261', '5262', '5264', '5265', '5266', '5267', '5268', '5269', '5270',
        '5290', '5291', '5292', '5294', '5295', '5296', '5297', '5298', '5299', '5300',
        '9100', '9101', '9102', '9103', '9104', '9105', '9106', '9107', '9108', '9109',
        '9110', '9111', '9112', '9113', '9114', '9115', '9116', '9117', '9118', '9119',
        '9120', '9121', '9122', '9123', '9124', '9125', '9126', '9127', '9128', '9129',
        '9130', '9131', '9132', '9133', '9134', '9135', '9136', '9137', '9138', '9139',
        '9140', '9141', '9142', '9143', '9144', '9145', '9146', '9147', '9148', '9149',
        '9150', '9151', '9152', '9153', '9154', '9155', '9156', '9157', '9158', '9159',
        '9160', '9161', '9162', '9163', '9164', '9165', '9166', '9167', '9168', '9169',
        '9170', '9171', '9172', '9173', '9174', '9175', '9176', '9177', '9178', '9179',
        '9180', '9181', '9182', '9183', '9184', '9185', '9186', '9187', '9188', '9189',
        '9190', '9191', '9192', '9193', '9194', '9195', '9196', '9197', '9198', '9199',
      ];
      const hkPrefix = hkRealPrefixes[secureRandom(0, hkRealPrefixes.length - 1)];
      phone = hkPrefix + randomDigits(4); // 香港号码是8位,前4位是号段,后4位随机
      return `${country.phonePrefix} ${phone}`;

    case 'US':
    case 'CA': // 北美真实区号
      const realAreaCodes = ['212', '213', '214', '215', '216', '217', '218', '219', '224', '225',
                             '301', '302', '303', '304', '305', '310', '312', '313', '314', '315',
                             '404', '405', '406', '407', '408', '412', '413', '414', '415', '416',
                             '503', '504', '505', '510', '512', '513', '515', '516', '517', '518',
                             '602', '603', '605', '607', '608', '612', '614', '615', '617', '619',
                             '702', '703', '704', '707', '708', '713', '714', '716', '717', '718',
                             '801', '802', '803', '804', '805', '808', '810', '812', '813', '815',
                             '901', '903', '904', '906', '908', '909', '910', '912', '913', '914'];
      const areaCode = realAreaCodes[secureRandom(0, realAreaCodes.length - 1)];
      const exchange = randomDigit(2, 9) + randomDigits(2);
      const subscriber = randomDigits(4);
      return `${country.phonePrefix} ${areaCode}-${exchange}-${subscriber}`;

    default: // 其他国家使用原有逻辑
      phone = country.phoneFormat;
      while (phone.includes('X')) {
        phone = phone.replace('X', randomDigit().toString());
      }
      return `${country.phonePrefix} ${phone}`;
  }
}

// 4. 生成密码 - 防检测版:模拟人类密码习惯
export function generatePassword() {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%&*";
  
  // 模拟人类密码模式:
  // 1. 首字母大写
  // 2. 主体是小写字母+数字
  // 3. 结尾可能加特殊字符
  
  let password = '';
  
  // 首字母大写(60%概率)
  if (Math.random() < 0.6) {
    password += uppercase.charAt(secureRandom(0, uppercase.length - 1));
  } else {
    password += lowercase.charAt(secureRandom(0, lowercase.length - 1));
  }
  
  // 主体:5-7个小写字母
  const bodyLength = secureRandom(5, 7);
  for (let i = 0; i < bodyLength; i++) {
    password += lowercase.charAt(secureRandom(0, lowercase.length - 1));
  }
  
  // 数字:2-3个(通常是有意义的,如年份)
  const numLength = secureRandom(2, 3);
  if (Math.random() < 0.4) {
    // 40%概率使用看起来像年份的数字
    const year = secureRandom(1980, 2005);
    password += Math.random() < 0.5 ? year.toString() : year.toString().slice(-2);
  } else {
    for (let i = 0; i < numLength; i++) {
      password += numbers.charAt(secureRandom(0, numbers.length - 1));
    }
  }
  
  // 特殊字符:50%概率在结尾加1个
  if (Math.random() < 0.5) {
    password += special.charAt(secureRandom(0, special.length - 1));
  }
  
  // 确保长度在8-16之间
  if (password.length < 8) {
    password += randomDigits(8 - password.length);
  }
  if (password.length > 16) {
    password = password.substring(0, 16);
  }
  
  return password;
}

// 5. 获取国家配置
export function getCountryConfig(code: string) {
  return countries.find(c => c.code === code) || countries[0];
}

// 6. 生成邮箱 - 防检测版:完全模拟真实用户邮箱习惯
export function generateEmail(firstName: string, lastName: string) {
  const domains = ["1xp.fr","cpc.cx","0cd.cn","ves.ink","q0.us.to","zx81.ovh","wishy.fr","blip.ovh","1nom.org","iya.fr.nf","sdj.fr.nf","afw.fr.nf","mynes.com","dao.pp.ua","lerch.ovh","six25.biz","ywzmb.top","isep.fr.nf","noreply.fr","pliz.fr.nf","noyp.fr.nf","zouz.fr.nf","hunnur.com","wxcv.fr.nf","zorg.fr.nf","imap.fr.nf","redi.fr.nf","dlvr.us.to","y.iotf.net","ym.cypi.fr","yop.too.li","dmts.fr.nf","binich.com","enpa.rf.gd","pochtac.ru","super.lgbt","jmail.fr.nf","yaloo.fr.nf","jinva.fr.nf","ealea.fr.nf","nomes.fr.nf","yop.kd2.org","alves.fr.nf","bibi.biz.st","bboys.fr.nf","ma.ezua.com","ma.zyns.com","mai.25u.com","autre.fr.nf","tweet.fr.nf","pamil.fr.nf","15963.fr.nf","popol.fr.nf","flobo.fr.nf","toolbox.ovh","bin-ich.com","sindwir.com","mabal.fr.nf","degap.fr.nf","yop.uuii.in","jetable.org","a.kwtest.io","cc.these.cc","gland.xxl.st","nospam.fr.nf","azeqsd.fr.nf","le.monchu.fr","nikora.fr.nf","sendos.fr.nf","cubox.biz.st","fhpfhp.fr.nf","c-eric.fr.nf","bahoo.biz.st","upc.infos.st","spam.aleh.de","alphax.fr.nf","habenwir.com","ist-hier.com","sind-wir.com","sindhier.com","wir-sind.com","myself.fr.nf","yop.mabox.eu","vip.ep77.com","druzik.pp.ua","flaimenet.ir","cloudsign.in","iuse.ydns.eu","get.vpn64.de","yahooz.xxl.st","altrans.fr.nf","yoptruc.fr.nf","kyuusei.fr.nf","certexx.fr.nf","dede.infos.st","yotmail.fr.nf","miloras.fr.nf","nikora.biz.st","cabiste.fr.nf","galaxim.fr.nf","pitiful.pp.ua","ggmail.biz.st","eooo.mooo.com","dis.hopto.org","yop.kyriog.fr","yop.mc-fly.be","tmp.x-lab.net","mail.hsmw.net","y.dldweb.info","haben-wir.com","sind-hier.com","assurmail.net","yop.smeux.com","alyxgod.rf.gd","mailadresi.tk","aze.kwtest.io","mailbox.biz.st","elmail.4pu.com","carioca.biz.st","mickaben.fr.nf","ac-malin.fr.nf","gimuemoa.fr.nf","woofidog.fr.nf","rygel.infos.st","contact.biz.st","rapidefr.fr.nf","calendro.fr.nf","calima.asso.st","cobal.infos.st","terre.infos.st","imails.asso.st","warlus.asso.st","carnesa.biz.st","mail.tbr.fr.nf","webstore.fr.nf","mr-email.fr.nf","abo-free.fr.nf","mailsafe.fr.nf","sirttest.us.to","yop.moolee.net","antispam.fr.nf","machen-wir.com","adresse.biz.st","poubelle.fr.nf","lacraffe.fr.nf","gladogmi.fr.nf","yopmail.ozm.fr","mail.yabes.ovh","totococo.fr.nf","miistermail.fr","yopmail.kro.kr","iamfrank.rf.gd","pooo.ooguy.com","get.route64.de","antispam.rf.gd","emocan.name.tr","freemail.biz.st","skynet.infos.st","readmail.biz.st","frostmail.fr.nf","pitimail.xxl.st","mickaben.biz.st","mickaben.xxl.st","internaut.us.to","poubelle-du.net","mondial.asso.st","randol.infos.st","himail.infos.st","sendos.infos.st","nidokela.biz.st","likeageek.fr.nf","mcdomaine.fr.nf","emaildark.fr.nf","cookie007.fr.nf","tagara.infos.st","pokemons1.fr.nf","spam.quillet.eu","desfrenes.fr.nf","mymail.infos.st","mail.i-dork.com","mail.berwie.com","mesemails.fr.nf","dripzgaming.com","mymaildo.kro.kr","dann.mywire.org","tivo.camdvr.org","tshirtsavvy.com","mymailbox.xxl.st","mail.xstyled.net","dreamgreen.fr.nf","contact.infos.st","mess-mails.fr.nf","omicron.token.ro","torrent411.fr.nf","test.inclick.net","ssi-bsn.infos.st","webclub.infos.st","vigilantkeep.net","actarus.infos.st","whatagarbage.com","test-infos.fr.nf","mail-mario.fr.nf","ym.digi-value.fr","adresse.infos.st","ypmail.sehier.fr","pixelgagnant.net","m.tartinemoi.com","ggamess.42web.io","mail.nuox.eu.org","ma1l.duckdns.org","courriel.fr.nf","jetable.fr.nf","moncourrier.fr.nf","monemail.fr.nf","monmail.fr.nf","yopmail.com","yopmail.fr","yopmail.net"];
  const domain = domains[secureRandom(0, domains.length - 1)];
  
  const cleanFirstName = convertToLatinChars(firstName);
  const cleanLastName = convertToLatinChars(lastName);
  
  // 使用真实的出生年份
  const currentYear = new Date().getFullYear();
  const age = secureRandom(18, 65);
  const birthYear = currentYear - age;
  const shortYear = birthYear.toString().slice(-2);
  
  // 使用加密随机数生成唯一标识(更自然的数字范围)
  const uniqueNum = secureRandom(1, 999); // 1-999更自然
  const smallNum = secureRandom(1, 99);
  
  // 真实邮箱格式分布(基于数百万真实邮箱分析)
  const formatRandom = Math.random();
  let username: string;
  
  // 分隔符:点最常见
  const separator = Math.random() < 0.65 ? '.' : (Math.random() < 0.5 ? '_' : '');
  
  if (formatRandom < 0.28) {
    // 28%: firstname.lastname(最常见且最可信)
    username = `${cleanFirstName}${separator}${cleanLastName}`;
  } else if (formatRandom < 0.45) {
    // 17%: firstname.lastname + 小数字
    username = `${cleanFirstName}${separator}${cleanLastName}${smallNum}`;
  } else if (formatRandom < 0.60) {
    // 15%: firstname + 年份
    username = `${cleanFirstName}${Math.random() < 0.6 ? shortYear : birthYear}`;
  } else if (formatRandom < 0.72) {
    // 12%: 首字母.lastname
    username = `${cleanFirstName.charAt(0)}${separator}${cleanLastName}`;
  } else if (formatRandom < 0.82) {
    // 10%: firstname + 小数字
    username = `${cleanFirstName}${smallNum}`;
  } else if (formatRandom < 0.90) {
    // 8%: firstname.lastname + 年份
    username = `${cleanFirstName}${separator}${cleanLastName}${shortYear}`;
  } else if (formatRandom < 0.95) {
    // 5%: lastname.firstname
    username = `${cleanLastName}${separator}${cleanFirstName}`;
  } else {
    // 5%: 其他变体
    if (Math.random() < 0.5) {
      username = `${cleanFirstName}${cleanLastName}${smallNum}`;
    } else {
      username = `${cleanFirstName.charAt(0)}${cleanLastName}${smallNum}`;
    }
  }
  
  // 清理和规范化
  username = username.replace(/[^a-z0-9._]/g, '');
  username = username.replace(/^[._]+|[._]+$/g, '');
  username = username.replace(/\.{2,}/g, '.').replace(/_{2,}/g, '_');
  
  // 确保不以数字开头
  if (/^[0-9]/.test(username)) {
    username = cleanFirstName.charAt(0) + username;
  }
  
  // 长度控制(6-28字符最自然)
  if (username.length < 6) {
    username += smallNum;
  }
  if (username.length > 28) {
    username = username.substring(0, 28);
  }
  
  username = username.replace(/[._]+$/, '');
  
  return `${username}@${domain}`;
}