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
  const domains = ["yopmail.com","00two.shop","00two.site","00xtwo.site","0cd.cn","123456.yopmail.com","15963.fr.nf","1nom.org","1xp.fr","20thmarvelcomics.com","3pati.cfd","41674.yopmail.com","713705.xyz","883.wishy.fr","aaa.veysem.pro","aad.veysem.pro","aae.veysem.pro","aaf.veysem.pro","aai.veysem.pro","aak.veysem.pro","aal.veysem.pro","aam.veysem.pro","aan.veysem.pro","aao.veysem.pro","aap.veysem.pro","aaq.veysem.pro","aar.veysem.pro","aas.veysem.pro","aat.veysem.pro","aau.veysem.pro","aav.veysem.pro","aaw.veysem.pro","aax.veysem.pro","aay.veysem.pro","aaz.veysem.pro","abc.yopmail.com","ab.kwtest.io","abo-free.fr.nf","abree.shop","accloud.click","accsell.vip","aceseria.site","ac-malin.fr.nf","acovi.click","ac.sensi.cloudns.be","actarus.infos.st","adgloselche.esmtp.biz","adobe.digiwav.store","adresse.biz.st","adresse.infos.st","aekie.top","aerohost.fun","aevun.click","afw.fr.nf","aifeo.fun","aikeno.fun","ainfan.fun","airairb.com","airem.space","airpurifierlab.com","aisee.online","aitoolsbox.website","ajumi.online","akivi.click","akupulsa.com","a.kwtest.io","aledrioroots.youdontcare.com","ali.yopmail.com","alphax.fr.nf","altrans.fr.nf","alves.fr.nf","alyspace.cfd","alyxgod.rf.gd","alzem.xyz","anchrisbaton.acmetoy.com","anfel.online","angisadevelopment.yopmail.com","anoiz.site","anreb.fun","antispam.fr.nf","antispam.rf.gd","anvee.fun","anviu.fun","anzem.fun","aonoi.top","aorne.online","aoroi.click","aqualesb.cfd","arios.click","ariun.site","arkhearts.space","aryue.click","asren.site","assurmail.net","ass.veysem.pro","asyon.site","ateblanc.icu","autre.fr.nf","autumnlab.fun","avilive.live","azab.duckdns.org","azdea.xyz","azeco.fun","aze.kwtest.io","azemo.xyz","azeqsd.fr.nf","bahoo.biz.st","bajihouppalle.shop","balva.online","bapratique.shop","batuparadise.com","bboys.fr.nf","bdsmporno.org","beixa.top","belaplus.com.br","belfo.top","bexlom.click","bibi.biz.st","bibie.me","bicie.my.id","bifle.fr.nf","bin-ich.com","binich.com","bin.thomas-henon.fr","bitbox.my.id","bixmo.click","bizre.top","blavi.top","bleu.hopto.org","blip.ovh","bolzi.fun","bomau.top","bomoo.fun","bonmu.fun","boucheny.ovh","bounshnetwork.com","brafrannajufre.shop","brenz.asia","briendille.biz.id","brilo.fun","brinz.top","broubeiyitreboi2586.rest","bunfan.top","businesstool.store","byn.laurada.fr","cabiste.fr.nf","cacze.online","caene.asia","calendro.fr.nf","calima.asso.st","camoo.online","caowe.top","capcud.my.id","capcud.web.id","caramail.d3vs.net","careb.top","carioca.biz.st","cariri.gorgonoid.online","carnesa.biz.st","carze.online","catja.online","cattoigressagri3248.shop","cavee.top","cayoe.fun","cayre.fun","c-cenfirman.com","cc.these.cc","c-dominicfrance.com","cedea.top","cedix.xyz","cegetel.fr.nf","celfe.fun","celov.fun","cench.top","cende.fun","cenvo.click","c-eric.fr.nf","certexx.fr.nf","cervu.top","cewz.online","ceyone.click","cezem.top","chamedoon.cfd","chatlabs.it","chemail.us","chhhi.xyz","chiwo.online","choso.baby","christopherma.net","ciemo.top","cinoe.click","ciovo.top","circlegame.iceiy.com","ckmz.site","clavq.cfd","cleanandold.com","clickmada.xyz","cli.cloudns.cl","cloud.gaobo.org","cloudsign.in","clutunpodli.ddns.info","cmail.fr.nf","cmkc.homes","cmkg.beauty","cndlr.fun","coaz.site","cobal.infos.st","coizy.tech","colaiah.click","colopi.xyz","comau.fun","conmu.top","conoi.online","contact.biz.st","contact.braverli.com","contact.infos.st","cookie007.fr.nf","copitojad.com","coroi.fun","cotom.click","courriel.fr.nf","courrier.589.ca","covom.cfd","cozyborough.com","cpc.cx","creze.asia","ctly.site","cubox.biz.st","curef.cfd","cuxem.cfd","cydae.site","czennie.shop","dakoci.fun","dann.mywire.org","dao.pp.ua","daph.store","darty.biz.st","davru.top","dealgongmail.com","dealv.store","dede.infos.st","degap.fr.nf","deniq.shop","denoq.xyz","derok.top","desfrenes.fr.nf","dgse.infos.st","digitalmaster.fun","digiwav.store","digywav.store","dioscolwedddas.3-a.net","dis.hopto.org","dizmo.click","dlvr.us.to","dmts.fr.nf","doimi.click","doipoceiffefeu.shop","doktor-x.gq","dollcore.my.id","domvi.shop","donemail.my.id","donfo.fun","drafi.cfd","drako.cfd","dratvo.cfd","draxu.cfd","draxum.cfd","draxu.shop","dreamgreen.fr.nf","drilq.cfd","drilux.cfd","dripzgaming.com","dromiq.cfd","drovex.cfd","drqen.cfd","drunz.shop","druva.fun","druxel.cfd","druzik.pp.ua","dtpt.sg","dulfi.shop","dunro.xyz","dystluv.online","eads.cc","ealea.fr.nf","eczo.site","eivon.click","eizer.site","ekzei.top","elcoz.fun","elkout.com","elmail.4pu.com","elmen.click","elzem.click","email.1xp.fr","email.a51.fr","emaildark.fr.nf","emailspot.org","enfen.fun","enkio.fun","enpa.rf.gd","ensoe.click","eomze.click","eonei.uno","eooo.mooo.com","ernou.click","ervis.online","erzeo.site","esdev.fun","esiries.cloud","esmia.online","espun.click","etherxl.me","eucan.fun","evyn.fun","exmail.fun","extanewsmi.zzux.com","ezepi.fun","ezmen.info","ezore.online","ezoye.cfd","facturecolombia.info","fakemail.shop","fandee.fun","fanoi.top","fanzu.online","fapet.edu.pl","femdomfan.net","femdom-here.com","femqi.click","fenart.site","fensv.shop","fenval.online","fenve.fun","feqtra.online","fevon.top","fhpfhp.fr.nf","findz.my.id","fiorellahakie.yopmail.com","fj.fr","fjisfggroup.icu","flaimenet.ir","flalular.shop","fleurreines.com","flobo.fr.nf","florajuju.dedyn.io","floru.click","flyawaypigeon.net","foica.online","foktr.cfd","fomix.shop","fonbi.online","fonoi.fun","fpalehe.com","fr3e4ever.ddns.net","frakoyavopra.shop","frankpixel.store","frebix.click","free.exitnodes.uk","freemail.biz.st","freepromos.in","freepromos.info","frelk.shop","frezn.top","frint.top","fronq.click","frostmail.fr.nf","froza.click","fruzi.top","frylo.click","ftime.store","fulltv.win","funqer.online","fussionlabs.me","futke.shop","fylex.click","galaserv.fr","galaxim.fr.nf","galpe.shop","gandaiameiomart.online","gathelabuc.almostmy.com","gcaritos.top","gctech.top","gemanteres.shop","geniusstudio.tech","get.route64.de","get.vpn64.de","ggamess.42web.io","ggmail.biz.st","giantessa.net","gimuemoa.fr.nf","gladogmi.fr.nf","gland.xxl.st","globalinternet.fr.nf","gmaccess.space","gmaijoter.shop","gmail.yopmail.com","gmail.yopmail.fr","gmai.yopmail.com","gomra.top","gondemand.fr","gonse.online","good321.com","gous.live","govnoed.su","gralx.top","gratis-gratis.com","gratosmail.fr.nf","gravo.cfd","grazi.asia","grevi.top","guglemaul.shop","haben-wir.com","habenwir.com","hafabala.shop","halopere.shop","hanfe.top","havro.top","heavenofgaming.com","helsi.click","hen33.com","hgudovocroxoi8182.rest","hide.biz.st","himail.infos.st","hmmml.com","hotmail999.com","hotmaise.site","howbii.store","hrdfck.me","httpsblms.site","hunnur.com","hyperallergic.uk","iamfrank.rf.gd","icebi.click","idrizal.site","iicloud.com.vn","imails.asso.st","imap.fr.nf","imap.yopmail.com","imel.nextgenop.eu.org","inactiona.shop","inc.ovh","inenseti.shop","ingrok.win","internaut.us.to","iovee.fun","iryue.xyz","isep.fr.nf","ismarsofi.shop","isren.fun","ist-hier.com","istrisahnyafelix.my.id","ivome.fun","iya.fr.nf","izmun.click","jadeuvoikeloi9422.shop","janecart.click","janecart.shop","janeencalaway.com","javee.click","jazya.site","jeardamars.shop","jeime.fun","jeme.mastur.be","jeodumifi.ns3.name","jeone.online","jetable.fr.nf","jetable.org","jimael.com","jinva.fr.nf","jmail.fr.nf","jmas.site","jorginaldo.shop","jorzo.click","josubby.it","josubby.me","jota7shop.com.br","js11.top","jsmail.biz.st","jsmail.it","jude.yopmail.com","junex.fun","k4g.me","k7g.me","kalpi.shop","kathwld.store","katru.shop","kaxze.cfd","kazira.sbs","kazor.shop","kebab.my.id","keinth.xyz","kejy.top","kelmu.top","keluv.fun","kelva.cfd","kelvyo.site","kemulastalk.https443.org","kenbi.click","kenecrehand.port25.biz","keran.shop","kexvi.click","keysoftmail.store","kezlun.click","kiose.site","kiove.online","kiz.rip","klear.click","klenv.shop","knzora.com","kodekuh.xyz","koffe.tech","koica.top","kolfe.fun","komau.online","komoo.click","korun.shop","kosre.online","koswe.online","koutranosere9419.live","koyco.fun","krevo.top","kumachi.site","kuree.online","kyuusei.fr.nf","kzmta.xyz","lacraffe.fr.nf","lakoi.fun","larkwater.shop","laurenscmdt.asia","lazybird.site","le.monchu.fr","lerch.ovh","levanh.com","levanh.online","levanh.store","leysatuhell.sendsmtp.com","likeageek.fr.nf","likedog.sbs","lindaontheweb.com","linuxbp.free.nf","liprauppeittibra5377.shop","livie.cfd","livikyn.com","lonoi.click","lophe.top","lorvi.shop","louve.cfd","loverlake.site","lovexor.me","lunqer.online","lunxen.com","luvae.uno","luvlyth.cfd","luvmaeve.info","luvmeyri.space","lyaws.tech","ma1l.duckdns.org","mabal.fr.nf","ma-boite-aux-lettres.infos.st","machen-wir.com","machica.online","madea.cfd","ma.ezua.com","mai.25u.com","mail10s.top","mail.1secmail.my.id","mailadresi.tk","mail.berwie.com","mailbox.biz.st","mail.chaxiraxi.ch","mail.gigadu.de","mailhubpros.com","mail.i-dork.com","mail-imap.yopmail.com","mail.inforoca.ovh","mail.mailsnails.com","mail-mario.fr.nf","mailprohub.com","mailsafe.fr.nf","mailshopee.io.vn","mailsnails.com","mailsnd.shop","mail.tbr.fr.nf","mailtranhien.com","mailtranhien.online","mail.xstyled.net","mail.yabes.ovh","mail.yopmail.com","mailz.com.br","malqin.online","managmaius.shop","manuted.co","marde.click","marksandspencer.com.vn","masdjan.space","matrippaddoiquoi.shop","maunilleufetrei7462.shop","mavren.online","mavri.fun","mavtoq.online","ma.zyns.com","mccarts.cfd","mcdomaine.fr.nf","mean.gq","mecix.fun","megamail.fr.nf","mekie.xyz","mekro.fun","melbo.top","melfe.online","menagoogle.shop","menqos.online","mercadine.shop","merfe.fun","mes-emails.fr.nf","mesemails.fr.nf","mess-mails.fr.nf","mexar.xyz","mexze.fun","meyri.site","mezor.top","mickaben.biz.st","mickaben.fr.nf","mickaben.xxl.st","miefo.online","miene.click","miistermail.fr","miloras.fr.nf","mimco.click","mimoo.fun","minqer.online","miore.fun","miowe.online","miozo.site","mivar.fun","mivlos.online","mivqu.shop","mivro.click","mixmo.click","mizka.online","mkmouse.top","mktchv.biz","mmmv.ru","mocix.shop","moenze.cfd","moice.click","mokze.xyz","molfe.online","moltu.shop","molviri.online","moncourriel.fr.nf","moncourrier.fr.nf","mondial.asso.st","monemail.fr.nf","monmail.fr.nf","monsieurbiz.wtf","monvik.online","mopri.fun","mormi.online","mornu.click","moroi.online","mortmesttesre.wikaba.com","motom.cfd","mottel.fr","mozzu.online","mr-email.fr.nf","mspotify.com","m.tartinemoi.com","mufex.click","multeq.online","munqa.xyz","murom.fun","musoe.fun","muzchuvstv.store","mviq.ru","mwuffyn.cfd","mxeru.xyz","mymailbox.xxl.st","mymaildo.kro.kr","mymail.infos.st","mynes.com","myrxxx.site","myself.fr.nf","mzemo.cfd","napo.web.id","naree.fun","naxze.click","nayaz.click","nedea.fun","nekie.fun","nelocrerunnu1403.shop","nerze.site","netom.fun","nevro.fun","nguwawor.web.id","nidokela.biz.st","niezy.click","nikora.biz.st","nikora.fr.nf","nirqa.click","nizon.top","nocan.top","noclue.space","nofan.fun","nofileid.com","noiva.click","nokie.click","nomau.click","nomes.fr.nf","nonmu.fun","nonzo.online","noreply.fr","nospam.fr.nf","noxem.click","noyp.fr.nf","nucan.top","nufex.shop","nusoe.xyz","ochie.online","ocmun.fun","ohayo.uno","oldamz.com","olididas.shop","olzem.cfd","omicron.token.ro","omruu.online","oos.cloudns.be","opuraio.work.gd","orthocrypt.org","oryue.top","osvun.top","ounex.click","ovrie.online","oyimail.store","pafix.xyz","pamil.fr.nf","panahan.papamana.com","papki.shop","parleasalwebp.zyns.com","pecnou.click","pelfe.click","pelisservispremium.com","penzi.click","pepisonline.top","pereb.click","personaliter.shop","phuctdv.top","pigeon.vavo.be","pilax.xyz","pinepo.top","pitiful.pp.ua","pitimail.xxl.st","pixeelstore.store","pixelgagnant.net","pixelzon.store","piznu.xyz","playersmails.com","pleasehide.me","plixup.com","pliz.fr.nf","plorn.top","plowkids.com.br","pluvi.top","pochtac.ru","pokemons1.fr.nf","polfe.click","polloiddetike2653.shop","pooo.ooguy.com","pop3.yopmail.com","popol.fr.nf","porncomics.top","porsilapongo.cl","posvabotma.x24hr.com","poubelle-du.net","poubelle.fr.nf","poumo.fun","poy.e-paws.net","pozes.click","premthings.shop","present-hit.store","prettyshan.cfd","prewx.com","prostopochta.com","prucilluyitre6156.shop","prulo.top","psn-wallet.com","pulfex.click","punisher-1.one","punuq.xyz","purnix.online","qadru.shop","qandru.cfd","qandz.cfd","qarvex.cfd","qavix.cfd","qavol.shop","qebrix.click","qeltri.online","qelvo.click","qelvu.top","qemrox.online","qemtu.click","qerla.fun","qerlu.top","qesnu.site","qilra.click","qirvo.click","qolmi.click","qoltu.top","qornti.site","qorvim.cfd","qqb.veysem.pro","qqc.veysem.pro","qqe.veysem.pro","qqi.veysem.pro","qqm.veysem.pro","qqn.veysem.pro","qqo.veysem.pro","qqp.veysem.pro","qqq.veysem.pro","qqr.veysem.pro","qqt.veysem.pro","qqu.veysem.pro","qqv.veysem.pro","qqw.veysem.pro","qqx.veysem.pro","qqy.veysem.pro","qqz.veysem.pro","quden.xyz","quichebedext.freetcp.com","quinsy.cfd","qybru.click","qynex.click","qztri.click","rabopraussoppu2694.shop","raine.fun","raiseduki.me","randol.infos.st","rapidefr.fr.nf","rayibreuxenne.shop","rdsfs.icu","readmail.biz.st","redi.fr.nf","reiza.click","relvok.site","reox.fun","repula.gecigran.at","retep.com.au","retom.xyz","revom.xyz","revun.fun","rexvi.top","rexze.xyz","reyco.fun","reyon.site","riex.beauty","rilvex.site","rippoiteffocroi2229.shop","rivno.xyz","rizonchik.ru","roina.click","rongrongtu.cn","ronpy.site","routrebumuppi.shop","rovee.top","rozwe.online","rukal.shop","rvcosmic.site","rvone.click","rygel.infos.st","rzmun.xyz","s0.at","sabrestlouis.com","sacoi.shop","safrequoppevei.shop","safrol.site","sage.yopmail.com","sakaephong.us","samiu.shop","sanporeta.ddns.name","saove.top","saovta41.com","sareb.online","sarme.site","sasori.uno","sausetihenne.shop","scat-fantasy.com","scat-fantasy.net","scat-fetish.cc","scatporntube.cc","scattoilet.cc","scattube.cc","scina.fun","sdj.fr.nf","sdollv.lat","seanpogii-036392.yopmail.com","seena.online","sefan.click","selfe.fun","seloci.online","selqor.site","selrox.site","selro.xyz","sendos.fr.nf","sendos.infos.st","sen.se.dns-dynamic.net","senvel.online","seoye.fun","serbe.online","seriv.top","serveroutsource.net","sevun.online","sg.one.gb.net","sibro.cfd","sidn.ai","silvar.site","sind-hier.com","sindhier.com","sind-wir.com","sindwir.com","sing-me.store","siors.online","sirttest.us.to","sitex.fun","sivex.top","sivna.xyz","six25.biz","sixxsystem.store","skole.click","skunktest.work","skynet.infos.st","slowm.it","smartiuati.shop","smtp.yopmail.fr","snavo.cfd","socra.asia","soeca.fun","softpixel.store","softpix.store","soive.online","sokvim.site","solza.asia","somau.fun","somy.asia","sonoi.fun","soobin.cloud","sorcu.icu","soref.top","sorfia.com.br","soroi.top","soruz.click","sorvi.fun","souma.duckdns.org","sovom.click","sozes.online","spacibbacmo.lflink.com","spam.aleh.de","spam.kernel42.com","spam.lapoutre.net","spam.laymain.com","spam.quillet.eu","sponsstore.com","spotifans.club","spotifyreseller.biz","spotifyseller.co","srava.site","sreyi.online","srmun.shop","sruni.shop","sryue.cfd","ssi-bsn.infos.st","stavq.cfd","stelu.click","stoye.click","studioives.space","sucan.shop","sulov.fun","sumen.shop","super.lgbt","suppdiwaren.ddns.me.uk","surner.site","surni.click","suxem.top","szimo.click","szio.fun","tagara.infos.st","takayuki.cfd","takemewithu.me","takru.xyz","talver.online","tarvox.online","tavqir.click","tavqi.top","technologyis.online","techxs.dx.am","temp2.qwertz.me","tempmail.bearzi.it","tempmail.famee.it","temp.qwertz.me","teqol.xyz","terre.infos.st","test.actess.fr","tester2341.great-site.net","test.inclick.net","test-infos.fr.nf","tevro.click","tgmph.uno","tivo.camdvr.org","tivqa.xyz","tivro.xyz","tklsxxy.site","tmail.014.fr","tmp.qqu.be","tmp.raene.fr","tmp.world-of-ysera.com","tmp.x-lab.net","tonval.online","toolbox.ovh","toopitoo.com","torqem.click","torrent411.fr.nf","torvi.fun","totococo.fr.nf","tous-mes-mails.fr","tozes.top","tpaglucerne.dnset.com","tqerv.cfd","tqomi.xyz","tradingviewgiare.com","tragl.cfd","trakn.cfd","traodoinick.com","trelm.click","trevours.site","trevu.click","trevz.shop","trewo.cfd","trichic.com.br","trixieberry.shop","trmex.shop","trosmar.shop","trovin.click","trovi.top","troyaugoixudei.shop","trustenroll.com","tshirtsavvy.com","tulvi.shop","tuvqi.xyz","tweakacapun.wwwhost.biz","tweet.fr.nf","tyuublog.sbs","ucziak.cfd","ukey.ru","undergmail.net","upc.infos.st","urecloud.icu","uryue.fun","vakri.top","vamen.top","varaprasadh.dev","varzi.site","vaxlio.click","veiki.site","veilee.tk","velqon.site","velun.cfd","velvette.pro","vemiu.top","veolo.top","veoye.top","verifymail.iodomain883.wishy.fr","verom.top","ves.ink","vesoe.top","vetom.top","veusillodduse.shop","vexem.xyz","vexru.click","vexze.top","veysem.pro","vigilantkeep.net","vimun.top","vip.ep77.com","virek.click","vnkey.shop","voica.click","voine.top","vokva.xyz","vonen.fun","vonex.click","vonmu.online","voref.xyz","vorna.click","voroi.fun","voses.fun","votra.click","vouduvemmappau.shop","vovio.top","vrati.xyz","vraxu.cfd","vrens.click","vropin.click","vucan.xyz","vurni.top","vurnoq.site","vurns.shop","vuxra.xyz","vynoq.click","walopodes.shop","waltin.site","warix.shop","warlus.asso.st","waupaffugrobe9224.rest","wczo.online","webclub.infos.st","webstore.fr.nf","welrix.site","wermicorp.site","wexli.shop","wexni.fun","wexro.fun","whatagarbage.com","whattt.site","wirlex.site","wir-sind.com","wirten.site","wishy.fr","wixpor.site","wokniz.site","wolzed.site","womiu.click","womlez.site","wonfa.online","wonoi.asia","wonoi.fun","woofidog.fr.nf","woremi.site","woyen.fun","wozi.online","writershub.shop","wunqi.shop","wupqi.fun","wutri.fun","wwe.veysem.pro","wwp.veysem.pro","wwq.veysem.pro","wwr.veysem.pro","wwt.veysem.pro","www.veysem.pro","www.yopmail.com","wxcv.fr.nf","xalme.cfd","xapne.shop","xavru.xyz","xebro.fun","xedfocorp.site","xelpri.click","xelya.fun","xemlu.top","xeniahlly.xyz","xenpu.fun","xernq.shop","xevni.click","xevton.click","xevtu.top","xieno.click","xikemail.com","xilvor.click","ximra.top","xinco.site","xirvo.xyz","xmail.omnight.com","xonoi.click","xonpe.xyz","xoxoluv.site","xoxonics.shop","xrtex.top","xulpen.click","xurlo.xyz","xurme.xyz","xuvlen.click","xyeli.site","yahooz.xxl.st","yaloo.fr.nf","yasme.site","yawua.us","y.dldweb.info","yellow.org.in","yemrox.online","yemtra.online","yexma.online","yibore.icu","y.iotf.net","yitruq.online","y.lochou.fr","ymail.villien.net","ym.cypi.fr","ym.digi-value.fr","yocan.fun","yohmail.com","yolluyexabeu.shop","yolme.fun","yolmid.site","yoltu.top","yomiu.info","yop.codaspot.com","yop.emersion.fr","yop.fexp.io","yop.kyriog.fr","yop.mabox.eu","yopmail.fr","yopmail.kro.kr","yopmail.net","yopmail.ozm.fr","yop.mc-fly.be","yop.milter.int.eu.org","yop.moolee.net","yop.profmusique.com","yop.punkapoule.fr","yop.smeux.com","yop.too.li","yoptruc.fr.nf","yop.uuii.in","yop.work.gd","yop.xn--vqq79r59m.eu.org","yotmail.fr.nf","yotmir.online","yourmailtoday.com","ypmail.sehier.fr","yskganda.org","yubee.space","yurko.fun","yurpex.site","yuzecroicrofei2636.live","yvrak.xyz","ywzmb.top","zadrun.cfd","zamoo.top","zanqir.cfd","zarduz.cfd","zarte.shop","zavmi.click","zawen.click","zebee.fun","zedea.click","zeden.click","zee5.news","zeivoe.click","zekro.click","zelfe.fun","zelfe.top","zelmi.click","zemen.fun","zemix.click","zenbri.online","zenko.top","zer02.cfd","zeref.fun","zerev.fun","zesco.click","zevun.top","zexem.fun","zeyra.site","zheraxynxie.cfd","ziche.online","zidre.xyz","zihugahebre1749.shop","zikio.top","zilop.xyz","zimeq.click","zimok.shop","zinfighkildo.ftpserver.biz","zione.click","zipio.top","ziufan.online","zivran.site","zmac.site","zmah.store","zmku.biz.id","zocen.fun","zocer.site","zodru.shop","zoica.fun","zokie.cfd","zoldan.cfd","zolfe.top","zoliv.xyz","zolmi.click","zonde.asia","zonlu.click","zonmu.click","zoom163.cyou","zoore.xyz","zorg.fr.nf","zosoe.cfd","zouz.fr.nf","zovori.click","zovtem.online","zqeli.click","zqorn.click","zresa.online","zucan.click","zunet.xyz","zunra.top","zunvi.top","zurniu.site","zx81.ovh","zxcc.lol"];
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