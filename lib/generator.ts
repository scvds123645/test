import { countries, namesByCountry, CountryConfig } from '@/lib/countryData';    
    
// 辅助函数：将字符转换为拉丁字母  
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
    
// 1. 生成姓名    
export function generateName(countryCode: string) {    
  const config = namesByCountry[countryCode] || namesByCountry['US'];    
  const firstName = config.firstNames[Math.floor(Math.random() * config.firstNames.length)];    
  const lastName = config.lastNames[Math.floor(Math.random() * config.lastNames.length)];    
  return { firstName, lastName };    
}    
    
// 2. 生成生日 - 优化版：符合 Facebook 用户群体分布
export function generateBirthday() {
  const currentYear = new Date().getFullYear();
  
  // Facebook 用户年龄分布权重
  // 基于真实的社交媒体用户数据
  // 18-24: 25%
  // 25-34: 35% (最大群体)
  // 35-44: 20%
  // 45-54: 12%
  // 55-65: 8%
  const random = Math.random();
  let age: number;
  
  if (random < 0.25) {
    // 18-24 岁 (25%)
    age = Math.floor(Math.random() * 7) + 18;
  } else if (random < 0.60) {
    // 25-34 岁 (35%)
    age = Math.floor(Math.random() * 10) + 25;
  } else if (random < 0.80) {
    // 35-44 岁 (20%)
    age = Math.floor(Math.random() * 10) + 35;
  } else if (random < 0.92) {
    // 45-54 岁 (12%)
    age = Math.floor(Math.random() * 10) + 45;
  } else {
    // 55-65 岁 (8%)
    age = Math.floor(Math.random() * 11) + 55;
  }
  
  const birthYear = currentYear - age;
  const month = Math.floor(Math.random() * 12) + 1;
  
  // 根据月份确定天数（考虑闰年）
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // 闰年检查
  if (month === 2 && birthYear % 4 === 0 && (birthYear % 100 !== 0 || birthYear % 400 === 0)) {
    daysInMonth[1] = 29;
  }
  
  const day = Math.floor(Math.random() * daysInMonth[month - 1]) + 1;
  
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  
  return `${birthYear}-${monthStr}-${dayStr}`;
}
    
// 随机数字生成辅助函数
function randomDigit(min: number = 0, max: number = 9): string {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

function randomDigits(length: number, min: number = 0, max: number = 9): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomDigit(min, max);
  }
  return result;
}

// 3. 生成真实手机号（根据各国规则）
export function generatePhone(country: CountryConfig) {
  const code = country.code;
  let phone = '';

  switch (code) {
    case 'CN': // 中国：1 + 3/4/5/6/7/8/9 + 9位数字
      const cnPrefixes = ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
                          '47', '50', '51', '52', '53', '55', '56', '57', '58', '59',
                          '62', '65', '66', '67', '70', '71', '72', '75', '76', '77', '78',
                          '80', '81', '82', '83', '84', '85', '86', '87', '88', '89',
                          '90', '91', '92', '93', '95', '97', '98', '99'];
      phone = '1' + cnPrefixes[Math.floor(Math.random() * cnPrefixes.length)] + randomDigits(8);
      return `${country.phonePrefix} ${phone}`;

    case 'HK': // 香港：5/6/9 + 7位数字
      const hkFirst = ['5', '6', '9'][Math.floor(Math.random() * 3)];
      phone = hkFirst + randomDigits(7);
      return `${country.phonePrefix} ${phone.slice(0, 4)} ${phone.slice(4)}`;

    case 'TW': // 台湾：09 + 8位数字
      phone = '09' + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;

    case 'MO': // 澳门：6 + 7位数字
      phone = '6' + randomDigits(7);
      return `${country.phonePrefix} ${phone.slice(0, 4)} ${phone.slice(4)}`;

    case 'SG': // 新加坡：8/9 + 7位数字
      const sgFirst = ['8', '9'][Math.floor(Math.random() * 2)];
      phone = sgFirst + randomDigits(7);
      return `${country.phonePrefix} ${phone.slice(0, 4)} ${phone.slice(4)}`;

    case 'US': // 美国：2-9 + 00-99 + 0-9 + 0000-9999
    case 'CA': // 加拿大格式同美国
      const areaCode = randomDigit(2, 9) + randomDigits(2);
      const exchange = randomDigit(2, 9) + randomDigits(2);
      const subscriber = randomDigits(4);
      return `${country.phonePrefix} ${areaCode}-${exchange}-${subscriber}`;

    case 'JP': // 日本：70/80/90 + 8位数字
      const jpPrefixes = ['70', '80', '90'];
      const jpPrefix = jpPrefixes[Math.floor(Math.random() * jpPrefixes.length)];
      phone = jpPrefix + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 2)}-${phone.slice(2, 6)}-${phone.slice(6)}`;

    case 'GB': // 英国：7 + 9位数字
      phone = '7' + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;

    case 'DE': // 德国：15/16/17 + 8/9位数字
      const dePrefixes = ['15', '16', '17'];
      const dePrefix = dePrefixes[Math.floor(Math.random() * dePrefixes.length)];
      phone = dePrefix + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3)}`;

    case 'FR': // 法国：6/7 + 8位数字
      const frFirst = ['6', '7'][Math.floor(Math.random() * 2)];
      phone = frFirst + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 1)} ${phone.slice(1, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 7)} ${phone.slice(7)}`;

    case 'KR': // 韩国：10 + 8位数字
      phone = '10' + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 2)}-${phone.slice(2, 6)}-${phone.slice(6)}`;

    case 'AU': // 澳大利亚：4 + 8位数字
      phone = '4' + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;

    case 'IT': // 意大利：3 + 9位数字
      phone = '3' + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;

    case 'ES': // 西班牙：6/7 + 8位数字
      const esFirst = ['6', '7'][Math.floor(Math.random() * 2)];
      phone = esFirst + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 7)} ${phone.slice(7)}`;

    case 'BR': // 巴西：9 + 8位数字
      const brArea = randomDigit(1, 9) + randomDigits(1);
      phone = '9' + randomDigits(8);
      return `${country.phonePrefix} ${brArea} ${phone.slice(0, 5)}-${phone.slice(5)}`;

    case 'RU': // 俄罗斯：9 + 9位数字
      phone = '9' + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`;

    case 'IN': // 印度：6/7/8/9 + 9位数字
      const inFirst = randomDigit(6, 9);
      phone = inFirst + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 5)} ${phone.slice(5)}`;

    case 'MX': // 墨西哥：1 + 9位数字
      phone = '1' + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;

    case 'NL': // 荷兰：6 + 8位数字
      phone = '6' + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 1)} ${phone.slice(1)}`;

    case 'SE': // 瑞典：7 + 8位数字
      phone = '7' + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 2)}-${phone.slice(2, 5)} ${phone.slice(5, 7)} ${phone.slice(7)}`;

    case 'CH': // 瑞士：7 + 8位数字
      phone = '7' + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 7)} ${phone.slice(7)}`;

    case 'PL': // 波兰：4/5/6/7 + 8位数字
      const plFirst = randomDigit(4, 7);
      phone = plFirst + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;

    case 'TR': // 土耳其：5 + 9位数字
      phone = '5' + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 8)} ${phone.slice(8)}`;

    case 'TH': // 泰国：6/8/9 + 8位数字
      const thFirst = ['6', '8', '9'][Math.floor(Math.random() * 3)];
      phone = thFirst + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5)}`;

    case 'MY': // 马来西亚：1 + 8/9位数字
      phone = '1' + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 2)}-${phone.slice(2, 5)} ${phone.slice(5)}`;

    case 'ID': // 印度尼西亚：8 + 9/10位数字
      phone = '8' + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;

    case 'PH': // 菲律宾：9 + 9位数字
      phone = '9' + randomDigits(9);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;

    case 'VN': // 越南：3/5/7/8/9 + 8位数字
      const vnFirst = ['3', '5', '7', '8', '9'][Math.floor(Math.random() * 5)];
      phone = vnFirst + randomDigits(8);
      return `${country.phonePrefix} ${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;

    default:
      // 默认格式：使用原有的 X 替换方法
      phone = country.phoneFormat;
      while (phone.includes('X')) {
        phone = phone.replace('X', randomDigit().toString());
      }
      return `${country.phonePrefix} ${phone}`;
  }
}
    
// 4. 生成密码    
export function generatePassword() {    
  const length = 12;    
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";    
  let ret = "";    
  for (let i = 0; i < length; ++i) {    
    ret += charset.charAt(Math.floor(Math.random() * charset.length));    
  }    
  return ret;    
}    
    
// 5. 获取国家配置    
export function getCountryConfig(code: string) {    
  return countries.find(c => c.code === code) || countries[0];    
}    
    
// 6. 生成邮箱    
export function generateEmail(firstName: string, lastName: string) {      
  const domains = ["1xp.fr","cpc.cx","0cd.cn","ves.ink","q0.us.to","zx81.ovh","wishy.fr","blip.ovh","1nom.org","iya.fr.nf","sdj.fr.nf","afw.fr.nf","mynes.com","dao.pp.ua","lerch.ovh","six25.biz","ywzmb.top","isep.fr.nf","noreply.fr","pliz.fr.nf","noyp.fr.nf","zouz.fr.nf","hunnur.com","wxcv.fr.nf","zorg.fr.nf","imap.fr.nf","redi.fr.nf","dlvr.us.to","y.iotf.net","ym.cypi.fr","yop.too.li","dmts.fr.nf","binich.com","enpa.rf.gd","pochtac.ru","super.lgbt","jmail.fr.nf","yaloo.fr.nf","jinva.fr.nf","ealea.fr.nf","nomes.fr.nf","yop.kd2.org","alves.fr.nf","bibi.biz.st","bboys.fr.nf","ma.ezua.com","ma.zyns.com","mai.25u.com","autre.fr.nf","tweet.fr.nf","pamil.fr.nf","15963.fr.nf","popol.fr.nf","flobo.fr.nf","toolbox.ovh","bin-ich.com","sindwir.com","mabal.fr.nf","degap.fr.nf","yop.uuii.in","jetable.org","a.kwtest.io","cc.these.cc","gland.xxl.st","nospam.fr.nf","azeqsd.fr.nf","le.monchu.fr","nikora.fr.nf","sendos.fr.nf","cubox.biz.st","fhpfhp.fr.nf","c-eric.fr.nf","bahoo.biz.st","upc.infos.st","spam.aleh.de","alphax.fr.nf","habenwir.com","ist-hier.com","sind-wir.com","sindhier.com","wir-sind.com","myself.fr.nf","yop.mabox.eu","vip.ep77.com","druzik.pp.ua","flaimenet.ir","cloudsign.in","iuse.ydns.eu","get.vpn64.de","yahooz.xxl.st","altrans.fr.nf","yoptruc.fr.nf","kyuusei.fr.nf","certexx.fr.nf","dede.infos.st","yotmail.fr.nf","miloras.fr.nf","nikora.biz.st","cabiste.fr.nf","galaxim.fr.nf","pitiful.pp.ua","ggmail.biz.st","eooo.mooo.com","dis.hopto.org","yop.kyriog.fr","yop.mc-fly.be","tmp.x-lab.net","mail.hsmw.net","y.dldweb.info","haben-wir.com","sind-hier.com","assurmail.net","yop.smeux.com","alyxgod.rf.gd","mailadresi.tk","aze.kwtest.io","mailbox.biz.st","elmail.4pu.com","carioca.biz.st","mickaben.fr.nf","ac-malin.fr.nf","gimuemoa.fr.nf","woofidog.fr.nf","rygel.infos.st","contact.biz.st","rapidefr.fr.nf","calendro.fr.nf","calima.asso.st","cobal.infos.st","terre.infos.st","imails.asso.st","warlus.asso.st","carnesa.biz.st","mail.tbr.fr.nf","webstore.fr.nf","mr-email.fr.nf","abo-free.fr.nf","mailsafe.fr.nf","sirttest.us.to","yop.moolee.net","antispam.fr.nf","machen-wir.com","adresse.biz.st","poubelle.fr.nf","lacraffe.fr.nf","gladogmi.fr.nf","yopmail.ozm.fr","mail.yabes.ovh","totococo.fr.nf","miistermail.fr","yopmail.kro.kr","iamfrank.rf.gd","pooo.ooguy.com","get.route64.de","antispam.rf.gd","emocan.name.tr","freemail.biz.st","skynet.infos.st","readmail.biz.st","frostmail.fr.nf","pitimail.xxl.st","mickaben.biz.st","mickaben.xxl.st","internaut.us.to","poubelle-du.net","mondial.asso.st","randol.infos.st","himail.infos.st","sendos.infos.st","nidokela.biz.st","likeageek.fr.nf","mcdomaine.fr.nf","emaildark.fr.nf","cookie007.fr.nf","tagara.infos.st","pokemons1.fr.nf","spam.quillet.eu","desfrenes.fr.nf","mymail.infos.st","mail.i-dork.com","mail.berwie.com","mesemails.fr.nf","dripzgaming.com","mymaildo.kro.kr","dann.mywire.org","tivo.camdvr.org","tshirtsavvy.com","mymailbox.xxl.st","mail.xstyled.net","dreamgreen.fr.nf","contact.infos.st","mess-mails.fr.nf","omicron.token.ro","torrent411.fr.nf","test.inclick.net","ssi-bsn.infos.st","webclub.infos.st","vigilantkeep.net","actarus.infos.st","whatagarbage.com","test-infos.fr.nf","mail-mario.fr.nf","ym.digi-value.fr","adresse.infos.st","ypmail.sehier.fr","pixelgagnant.net","m.tartinemoi.com","ggamess.42web.io","mail.nuox.eu.org","ma1l.duckdns.org","courriel.fr.nf","jetable.fr.nf","moncourrier.fr.nf","monemail.fr.nf","monmail.fr.nf","yopmail.com","yopmail.fr","yopmail.net"];
  const domain = domains[Math.floor(Math.random() * domains.length)];      
        
  const cleanFirstName = convertToLatinChars(firstName);      
  const cleanLastName = convertToLatinChars(lastName);      
  const birthYear = Math.floor(Math.random() * (2005 - 1985 + 1)) + 1985;      
  const shortYear = birthYear.toString().slice(-2);     
  const currentYear = new Date().getFullYear();      
        
  const separators = ['.', '_', ''];       
  const sep = separators[Math.floor(Math.random() * separators.length)];      
      
  const formats = [      
    `${cleanLastName}${sep}${cleanFirstName}`,      
    `${cleanFirstName}${sep}${cleanLastName}`,      
    `${cleanLastName}${sep}${cleanFirstName}${birthYear}`,      
    `${cleanFirstName}${sep}${cleanLastName}${shortYear}`,      
    `${cleanLastName.charAt(0)}${sep}${cleanFirstName}`,      
    `${cleanFirstName.charAt(0)}${sep}${cleanLastName}`,      
    `${cleanFirstName}${cleanLastName}${Math.floor(Math.random() * 900) + 100}`,      
    `${cleanFirstName}${cleanLastName}${currentYear}`,      
  ];      
        
  let username = formats[Math.floor(Math.random() * formats.length)];      
        
  username = username.replace(/[^a-z0-9._]/g, '');      
  username = username.replace(/^[._]+|[._]+$/g, '');      
  username = username.replace(/\.{2,}/g, '.').replace(/_{2,}/g, '_');      
        
  if (username.length < 5) {      
      username += birthYear;      
  }      
        
  return `${username}@${domain}`;   
}