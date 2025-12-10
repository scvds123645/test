export interface CountryConfig {  
  code: string;  
  name: string;  
  phonePrefix: string;  
  phoneFormat: string;  
}  
  
export const countries: CountryConfig[] = [  
  { code: 'CN', name: '中国', phonePrefix: '+86', phoneFormat: '1XXXXXXXXXX' },  
  { code: 'HK', name: '香港', phonePrefix: '+852', phoneFormat: 'XXXX XXXX' },  
  { code: 'TW', name: '台灣', phonePrefix: '+886', phoneFormat: 'XXXX XXX XXX' },  
  { code: 'MO', name: '澳門', phonePrefix: '+853', phoneFormat: 'XXXX XXXX' },  
  { code: 'SG', name: '新加坡', phonePrefix: '+65', phoneFormat: 'XXXX XXXX' },  
  { code: 'US', name: '美国', phonePrefix: '+1', phoneFormat: 'XXX-XXX-XXXX' },  
  { code: 'JP', name: '日本', phonePrefix: '+81', phoneFormat: 'XX-XXXX-XXXX' },  
  { code: 'GB', name: '英国', phonePrefix: '+44', phoneFormat: 'XXXX XXX XXX' },  
  { code: 'DE', name: '德国', phonePrefix: '+49', phoneFormat: 'XXX XXXXXXXX' },  
  { code: 'FR', name: '法国', phonePrefix: '+33', phoneFormat: 'X XX XX XX XX' },  
  { code: 'KR', name: '韩国', phonePrefix: '+82', phoneFormat: 'XX-XXXX-XXXX' },  
  { code: 'CA', name: '加拿大', phonePrefix: '+1', phoneFormat: 'XXX-XXX-XXXX' },  
  { code: 'AU', name: '澳大利亚', phonePrefix: '+61', phoneFormat: 'XXX XXX XXX' },  
  { code: 'IT', name: '意大利', phonePrefix: '+39', phoneFormat: 'XXX XXX XXXX' },  
  { code: 'ES', name: '西班牙', phonePrefix: '+34', phoneFormat: 'XXX XX XX XX' },  
  { code: 'BR', name: '巴西', phonePrefix: '+55', phoneFormat: 'XX XXXXX-XXXX' },  
  { code: 'RU', name: '俄罗斯', phonePrefix: '+7', phoneFormat: 'XXX XXX-XX-XX' },  
  { code: 'IN', name: '印度', phonePrefix: '+91', phoneFormat: 'XXXXX XXXXX' },  
  { code: 'MX', name: '墨西哥', phonePrefix: '+52', phoneFormat: 'XXX XXX XXXX' },  
  { code: 'NL', name: '荷兰', phonePrefix: '+31', phoneFormat: 'X XXXXXXXX' },  
  { code: 'SE', name: '瑞典', phonePrefix: '+46', phoneFormat: 'XX-XXX XX XX' },  
  { code: 'CH', name: '瑞士', phonePrefix: '+41', phoneFormat: 'XX XXX XX XX' },  
  { code: 'PL', name: '波兰', phonePrefix: '+48', phoneFormat: 'XXX XXX XXX' },  
  { code: 'TR', name: '土耳其', phonePrefix: '+90', phoneFormat: 'XXX XXX XX XX' },  
  { code: 'TH', name: '泰国', phonePrefix: '+66', phoneFormat: 'XX XXX XXXX' },  
  { code: 'MY', name: '马来西亚', phonePrefix: '+60', phoneFormat: 'XX-XXX XXXX' },  
  { code: 'ID', name: '印度尼西亚', phonePrefix: '+62', phoneFormat: 'XXX-XXX-XXXX' },  
  { code: 'PH', name: '菲律宾', phonePrefix: '+63', phoneFormat: 'XXX XXX XXXX' },  
  { code: 'VN', name: '越南', phonePrefix: '+84', phoneFormat: 'XXX XXX XXXX' },  
];  
  
export const namesByCountry: Record<string, { firstNames: string[], lastNames: string[] }> = {  
  // 中国大陆 - 简体中文
CN: {
  firstNames: [
    // 男性名字 (约100个)
    '伟', '强', '磊', '军', '波', '涛', '超', '勇', '杰', '鹏',
    '浩', '亮', '宇', '辉', '刚', '健', '峰', '建', '明', '勇',
    '博', '文', '华', '东', '凯', '俊', '鑫', '龙', '昊', '宏',
    '斌', '毅', '翔', '旭', '帆', '晨', '睿', '轩', '泽', '阳',
    '晖', '飞', '海', '松', '林', '江', '河', '山', '石', '岩',
    '志', '豪', '远', '维', '正', '天', '立', '成', '民', '国',
    '安', '平', '顺', '达', '康', '福', '贵', '富', '荣', '新',
    '春', '夏', '秋', '冬', '晓', '晚', '朝', '暮', '云', '雨',
    '雷', '电', '风', '雪', '霜', '露', '彦', '德', '仁', '义',
    '礼', '智', '信', '忠', '孝', '廉', '耻', '勤', '俭', '诚',
    
    // 女性名字 (约100个)
    '芳', '娜', '秀英', '敏', '静', '丽', '艳', '秀兰', '莉', '玲',
    '燕', '红', '霞', '梅', '婷', '雪', '倩', '琳', '慧', '欣',
    '怡', '悦', '萍', '兰', '蓉', '洁', '晶', '妍', '颖', '雯',
    '媛', '娟', '秀', '英', '华', '嘉', '佳', '美', '丽', '珍',
    '玉', '琴', '瑶', '璐', '茜', '晴', '岚', '菲', '露', '薇',
    '蕾', '馨', '卉', '花', '荷', '莲', '梨', '桃', '杏', '梅',
    '兰', '竹', '菊', '云', '月', '星', '虹', '霓', '彩', '凤',
    '鸾', '凰', '燕', '莺', '鹃', '鹤', '雁', '娇', '妮', '婉',
    '柔', '温', '淑', '贤', '惠', '敏', '聪', '睿', '智', '慧',
    '思', '念', '忆', '梦', '幻', '诗', '画', '韵', '音', '曲'
  ],
  
  lastNames: [
    // 约150个姓氏
    '王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',
    '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
    '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧',
    
    '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
    '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎',
    '余', '潘', '杜', '戴', '夏', '钟', '汪', '田', '任', '姜',
    '范', '方', '石', '姚', '谭', '廖', '邹', '熊', '金', '陆',
    
    '郝', '孔', '白', '崔', '康', '毛', '邱', '秦', '江', '史',
    '顾', '侯', '邵', '孟', '龙', '万', '段', '漕', '钱', '汤',
    '尹', '黎', '易', '常', '武', '乔', '贺', '赖', '龚', '文',
    
    '庞', '樊', '兰', '殷', '施', '陶', '洪', '翟', '安', '颜',
    '倪', '严', '牛', '温', '芦', '季', '俞', '章', '鲁', '葛',
    '伍', '韦', '申', '尤', '毕', '聂', '丛', '焦', '向', '柳',
    
    '邢', '路', '岳', '齐', '沿', '梅', '莫', '庄', '辛', '管',
    '祝', '左', '涂', '谷', '祁', '时', '舒', '耿', '牟', '卜',
    '路', '詹', '关', '苗', '凌', '费', '纪', '靳', '盛', '童'
  ],
},
  // 香港 - 繁体中文
HK: {
  firstNames: [
    // 男性名字 (约100个)
    '志明', '家豪', '偉豪', '健華', '俊傑', '建華', '俊宏', '志偉', '家輝', '偉強',
    '子聰', '俊熙', '梓軒', '浩然', '嘉俊', '子謙', '宇軒', '梓豪', '俊宇', '子軒',
    '家明', '志強', '德華', '榮華', '文輝', '國強', '永康', '健明', '偉文', '家傑',
    '耀明', '志華', '嘉豪', '俊賢', '子朗', '子浩', '梓朗', '浩賢', '子晉', '俊彥',
    '子恆', '家朗', '柏熙', '柏賢', '梓諾', '諾軒', '梓鍵', '子鍵', '梓晞', '子晞',
    '浩天', '天佑', '天朗', '天賜', '天樂', '樂軒', '樂謙', '梓樂', '子樂', '俊樂',
    '卓軒', '卓朗', '卓謙', '卓熙', '景行', '景程', '皓軒', '皓然', '浩軒', '浩謙',
    '澤仁', '澤軒', '澤恩', '子澤', '家澤', '啟仁', '啟軒', '啟朗', '啟晞', '啟樂',
    '智軒', '智謙', '智熙', '智朗', '晉謙', '晉軒', '晉熙', '晉朗', '睿軒', '睿謙',
    '銘軒', '銘謙', '銘熙', '承軒', '承謙', '承熙', '承朗', '永樂', '永康', '永明',
    
    // 女性名字 (約100個)
    '嘉欣', '詩雅', '詠琪', '美玲', '雅婷', '慧敏', '淑賢', '美華', '麗珍', '秀娟',
    '芷晴', '梓晴', '凱晴', '樂晴', '心怡', '心悅', '心妍', '心妮', '心柔', '心慈',
    '詠妍', '詠欣', '詠彤', '詠彤', '詩穎', '詩敏', '詩雅', '詩琪', '雅琳', '雅琪',
    '靜怡', '靜欣', '靜雯', '靜文', '曉彤', '曉琳', '曉敏', '曉欣', '穎欣', '穎琳',
    '芷欣', '芷琳', '芷晴', '芷妍', '思穎', '思晴', '思妍', '思彤', '凱欣', '凱琳',
    '綺琪', '綺雯', '綺文', '綺晴', '嘉琪', '嘉雯', '嘉晴', '嘉怡', '樂怡', '樂欣',
    '子晴', '子欣', '子琳', '子妍', '梓琳', '梓欣', '梓妍', '梓琪', '芯妍', '芯晴',
    '芯怡', '芯欣', '芯悅', '芯彤', '悅琳', '悅晴', '悅彤', '悅怡', '悅欣', '悅妍',
    '穎妍', '穎怡', '穎彤', '穎晴', '紫晴', '紫欣', '紫琳', '紫妍', '紫彤', '紫怡',
    '雨晴', '雨欣', '雨琳', '雨妍', '雨彤', '梓瑤', '芷瑤', '思瑤', '詩瑤', '語晴'

  ],
  
  lastNames: [
    // 約120個姓氏
    '陳', '黃', '李', '林', '張', '吳', '劉', '梁', '鄭', '何',
    '羅', '高', '葉', '朱', '鍾', '盧', '潘', '謝', '曾', '鄧',
    
    '許', '蘇', '程', '馬', '韓', '蔣', '袁', '周', '徐', '孫',
    '胡', '董', '楊', '趙', '馮', '蕭', '唐', '于', '姚', '譚',
    '沈', '呂', '王', '江', '汪', '田', '杜', '范', '戴', '夏',
    
    '方', '石', '姜', '崔', '熊', '金', '陸', '郭', '孔', '白',
    '康', '毛', '邱', '秦', '史', '顧', '侯', '邵', '孟', '龍',
    '萬', '段', '錢', '湯', '尹', '黎', '易', '常', '武', '喬',
    
    '賀', '賴', '龔', '文', '龐', '樊', '蘭', '殷', '施', '陶',
    '洪', '翟', '安', '顏', '倪', '嚴', '牛', '溫', '蘆', '季',
    '俞', '章', '魯', '葛', '伍', '韋', '申', '尤', '畢', '聶',
    
    '丛', '焦', '向', '柳', '邢', '路', '岳', '齊', '梅', '莫',
    '庄', '辛', '管', '祝', '左', '塗', '谷', '祁', '時', '舒'
  ],
  },
  // 台湾 - 繁体中文
TW: {
  firstNames: [
    // 男性名字 (约120个)
    '志豪', '建宏', '家豪', '俊宏', '志偉', '宗翰', '宇翔', '承翰', '冠廷', '柏翰',
    '建志', '建成', '建宏', '建銘', '建華', '建豪', '建德', '建文', '建國', '建勳',
    '俊傑', '俊宏', '俊賢', '俊男', '俊宇', '俊昇', '俊良', '俊德', '俊廷', '俊華',
    '家豪', '家宏', '家銘', '家誠', '家瑋', '家綸', '家輝', '家榮', '家維', '家齊',
    '志明', '志強', '志偉', '志豪', '志宏', '志成', '志遠', '志廷', '志華', '志勳',
    '宗翰', '宗儒', '宗憲', '宗諺', '宗穎', '宗霖', '宗祐', '宗佑', '宗哲', '宗勳',
    '宇翔', '宇軒', '宇傑', '宇豪', '宇宏', '宇恆', '宇辰', '宇哲', '宇文', '宇晨',
    '承翰', '承恩', '承諺', '承勳', '承佑', '承祐', '承憲', '承儒', '承軒', '承志',
    '冠廷', '冠宇', '冠霖', '冠佑', '冠勳', '冠緯', '冠文', '冠儒', '冠宏', '冠志',
    '柏翰', '柏宏', '柏宇', '柏廷', '柏勳', '柏諺', '柏霖', '柏瑋', '柏憲', '柏儒',
    '宏宇', '宏達', '宏偉', '宏志', '宏文', '宏碩', '宏恩', '彥廷', '彥霖', '彥志',
    '冠華', '冠軍', '冠宏', '正豪', '正宏', '正偉', '正賢', '正宇', '正雄', '正威',
    
    // 女性名字 (约120个)
    '淑芬', '雅婷', '怡君', '淑惠', '美玲', '佩珊', '雅雯', '欣怡', '詩涵', '靜怡',
    '淑芬', '淑惠', '淑貞', '淑華', '淑玲', '淑娟', '淑美', '淑真', '淑儀', '淑萍',
    '雅婷', '雅惠', '雅玲', '雅文', '雅芳', '雅雯', '雅琪', '雅筑', '雅琳', '雅慧',
    '怡君', '怡婷', '怡如', '怡珊', '怡萱', '怡蓉', '怡文', '怡欣', '怡華', '怡安',
    '淑惠', '淑芬', '淑玲', '淑娟', '淑華', '淑真', '淑貞', '淑儀', '淑美', '淑萍',
    '美玲', '美華', '美芳', '美惠', '美珍', '美鳳', '美蓮', '美琪', '美雲', '美君',
    '佩珊', '佩君', '佩璇', '佩穎', '佩瑜', '佩綺', '佩琪', '佩儀', '佩文', '佩蓉',
    '雅雯', '雅筑', '雅琪', '雅婷', '雅慧', '雅琳', '雅芳', '雅雲', '雅真', '雅惠',
    '欣怡', '欣妤', '欣穎', '欣宜', '欣儀', '欣宇', '欣潔', '欣柔', '欣瑜', '欣然',
    '詩涵', '詩雅', '詩穎', '詩婷', '詩文', '詩筠', '詩琪', '詩雯', '詩敏', '詩涵',
    '靜怡', '靜宜', '靜雯', '靜文', '靜芳', '靜儀', '靜萱', '靜茹', '靜宇', '靜穎',
    '雨涵', '雨婷', '雨萱', '雨柔', '雨欣', '雨晴', '雨璇', '雨潔', '雨珊', '雨蓁',
    '嘉玲', '嘉惠', '嘉珊', '嘉琪', '嘉雯', '嘉文', '嘉慧', '嘉穎', '嘉萱', '嘉怡',
    '宜君', '宜珊', '宜蓁', '宜萱', '宜軒', '宜庭', '宜蓉', '宜靜', '宜璇', '宜穎',
    '郁婷', '郁芬', '郁雯', '郁華', '郁文', '郁琪', '郁玲', '郁珊', '郁涵', '郁慧',
    '筱涵', '筱雯', '筱婷', '筱君', '筱珊', '筱萱', '筱柔', '筱筠', '筱雅', '筱慧'
  ],
  
  lastNames: [
    // 约150个姓氏
    '陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊',
    '鄭', '賴', '謝', '徐', '許', '何', '羅', '葉', '蘇', '周',
    
    '莊', '呂', '江', '蕭', '游', '曾', '邱', '潘', '簡', '范',
    '彭', '施', '沈', '余', '孫', '盧', '朱', '鍾', '郭', '洪',
    '高', '梁', '曹', '柯', '詹', '胡', '石', '溫', '魏', '方',
    
    '趙', '歐', '侯', '鄧', '姚', '田', '翁', '湯', '連', '馬',
    '唐', '孔', '馮', '古', '袁', '涂', '童', '程', '阮', '韓',
    '龔', '藍', '丁', '傅', '辛', '薛', '任', '卓', '康', '董',
    
    '邵', '紀', '牛', '姜', '汪', '雷', '鄒', '史', '尹', '顏',
    '錢', '白', '嚴', '秦', '崔', '武', '段', '龍', '萬', '宋',
    '毛', '韋', '熊', '常', '戴', '孟', '賀', '章', '樊', '易',
    
    '文', '葛', '關', '焦', '苗', '尤', '向', '路', '時', '左',
    '祝', '管', '包', '殷', '季', '符', '卜', '耿', '雲', '談',
    '齊', '甘', '霍', '杜', '祁', '岳', '閔', '項', '梅', '牟',
    
    '阮', '俞', '靳', '申', '支', '巫', '屈', '裴', '滕', '冷'
  ],
  },
  // 澳门 - 繁体中文
MO: {
  firstNames: [
    // 男性名字 (约100个)
    '志明', '家豪', '偉豪', '健華', '俊傑', '建華', '志強', '德華', '家輝', '俊宏',
    '志偉', '偉強', '志豪', '家明', '建明', '俊賢', '文華', '偉文', '國華', '榮華',
    '子聰', '俊熙', '嘉俊', '梓軒', '浩然', '子謙', '宇軒', '梓豪', '俊宇', '子軒',
    '永康', '永明', '文輝', '耀明', '志華', '嘉豪', '俊彥', '子朗', '子浩', '梓朗',
    '家傑', '家朗', '柏熙', '柏賢', '梓諾', '諾軒', '浩天', '天佑', '天朗', '天賜',
    '卓軒', '卓朗', '景行', '皓軒', '皓然', '浩軒', '澤仁', '澤軒', '子澤', '家澤',
    '智軒', '智謙', '晉謙', '晉軒', '睿軒', '睿謙', '銘軒', '銘謙', '承軒', '承謙',
    '冠廷', '冠宇', '宗翰', '宗儒', '宇翔', '宇傑', '承翰', '承恩', '柏翰', '柏宇',
    '建國', '建志', '建成', '建銘', '俊昇', '俊良', '俊德', '正雄', '正賢', '明哲',
    '耀華', '國強', '文彥', '宏達', '宏偉', '彥廷', '彥霖', '正豪', '正宏', '正威',
    
    // 女性名字 (约100个)
    '嘉欣', '詩雅', '詠琪', '美玲', '雅婷', '淑賢', '慧敏', '美華', '麗珍', '秀娟',
    '芷晴', '梓晴', '凱晴', '心怡', '心悅', '心妍', '詠妍', '詠欣', '詩穎', '詩敏',
    '靜怡', '靜欣', '靜雯', '曉彤', '曉琳', '穎欣', '穎琳', '芷欣', '芷琳', '芷妍',
    '思穎', '思晴', '思妍', '凱欣', '凱琳', '綺琪', '綺雯', '嘉琪', '嘉雯', '嘉怡',
    '子晴', '子欣', '子琳', '梓琳', '梓欣', '梓妍', '芯妍', '芯晴', '芯怡', '芯欣',
    '悅琳', '悅晴', '悅怡', '穎妍', '穎怡', '紫晴', '紫欣', '紫琳', '雨晴', '雨欣',
    '淑芬', '淑惠', '淑華', '淑玲', '雅惠', '雅芳', '雅雯', '怡君', '怡婷', '怡如',
    '佩珊', '佩君', '佩璇', '佩穎', '欣怡', '欣妤', '欣穎', '詩涵', '詩婷', '詩雯',
    '雅筑', '雅琪', '雅慧', '雅琳', '美珍', '美芳', '美惠', '麗華', '麗玲', '秀英',
    '婷婷', '玲玲', '燕燕', '紅紅', '芳芳', '蘭蘭', '梅梅', '敏敏', '莉莉', '華華',
    '語晴', '語彤', '宜君', '宜萱', '郁婷', '郁芬', '筱涵', '筱雯', '品妤', '品妍'
  ],
  
  lastNames: [
    // 约130个姓氏
    '陳', '黃', '李', '林', '張', '吳', '劉', '梁', '鄭', '何',
    '羅', '高', '葉', '朱', '鍾', '盧', '潘', '謝', '曾', '鄧',
    
    '許', '蘇', '程', '馬', '韓', '蔣', '袁', '周', '徐', '孫',
    '胡', '董', '楊', '趙', '馮', '蕭', '唐', '于', '姚', '譚',
    '沈', '呂', '王', '江', '汪', '田', '杜', '范', '戴', '夏',
    
    '方', '石', '姜', '崔', '熊', '金', '陸', '郭', '孔', '白',
    '康', '毛', '邱', '秦', '史', '顧', '侯', '邵', '孟', '龍',
    '萬', '段', '錢', '湯', '尹', '黎', '易', '常', '武', '喬',
    
    '賀', '賴', '龔', '文', '龐', '樊', '蘭', '殷', '施', '陶',
    '洪', '翟', '安', '顏', '倪', '嚴', '牛', '溫', '蘆', '季',
    '俞', '章', '魯', '葛', '伍', '韋', '申', '尤', '畢', '聶',
    
    '焦', '向', '柳', '邢', '路', '岳', '齊', '梅', '莫', '庄',
    '辛', '管', '祝', '左', '涂', '谷', '祁', '時', '舒', '關',
    '苗', '包', '符', '雲', '霍', '閔', '屈', '冷', '游', '簡'
 ]
},
  // 新加坡 - 简体中文(新加坡官方使用简体)
SG: {
  firstNames: [
    // 华人男性名字 (约150个)
    'Wei Ming', 'Jun Hao', 'Kai Wen', 'Jia Wei', 'Zhi Hao', 'Wei Jie', 'Jun Wei', 'Kai Yang',
    'Jun Jie', 'Zhi Wei', 'Wei Hao', 'Jun Ming', 'Kai Xiang', 'Jia Jun', 'Wei Han', 'Zhi Heng',
    'Jun Kai', 'Wei Lun', 'Kai Jun', 'Zhi Ming', 'Jun Xiong', 'Wei Xiang', 'Kai Rui', 'Jun Rui',
    'Zhi Xuan', 'Wei Kang', 'Jun Yang', 'Kai Heng', 'Wei Yang', 'Zhi Yang', 'Jun Heng', 'Kai Le',
    'Wei Ting', 'Zhi Jun', 'Jun Wen', 'Kai Ming', 'Wei Qi', 'Zhi Kai', 'Jun Liang', 'Kai Wei',
    'Yi Xuan', 'Yi Hao', 'Yi Jun', 'Yi Ming', 'Yi Wei', 'Yi Kang', 'Yi Yang', 'Yi Xiang',
    'Jing Hao', 'Jing Wei', 'Jing Jun', 'Jing Ming', 'Jing Xuan', 'Jing Yi', 'Jing Kai', 'Jing Yang',
    'Shi Hao', 'Shi Wei', 'Shi Jun', 'Shi Ming', 'Shi Xuan', 'Shi Kai', 'Shi Yang', 'Shi Jie',
    'Yu Xuan', 'Yu Hao', 'Yu Jun', 'Yu Ming', 'Yu Wei', 'Yu Kai', 'Yu Yang', 'Yu Jie',
    'Han Wei', 'Han Ming', 'Han Kai', 'Han Jun', 'Han Xuan', 'Han Yang', 'Han Jie', 'Han Rui',
    'Rui Xuan', 'Rui Hao', 'Rui Jun', 'Rui Ming', 'Rui Wei', 'Rui Yang', 'Rui Kai', 'Rui Jie',
    'Hao Ran', 'Hao Ming', 'Hao Wei', 'Hao Jun', 'Hao Yang', 'Hao Xuan', 'Hao Kai', 'Hao Rui',
    'Cheng Wei', 'Cheng Jun', 'Cheng Ming', 'Cheng Kai', 'Cheng Yang', 'Cheng Hao', 'Cheng Xuan',
    'Jie Wei', 'Jie Ming', 'Jie Jun', 'Jie Kai', 'Jie Yang', 'Jie Hao', 'Jie Xuan', 'Jie Rui',
    'Xuan Wei', 'Xuan Hao', 'Xuan Jun', 'Xuan Ming', 'Xuan Kai', 'Xuan Yang', 'Xuan Jie',
    'Ming Wei', 'Ming Hao', 'Ming Jun', 'Ming Kai', 'Ming Yang', 'Ming Xuan', 'Ming Jie',
    'Yang Wei', 'Yang Hao', 'Yang Jun', 'Yang Ming', 'Yang Kai', 'Yang Xuan', 'Yang Jie',
    'Kang Wei', 'Kang Hao', 'Kang Jun', 'Kang Ming', 'Kang Kai', 'Kang Yang', 'Kang Xuan',
    'Xiang Wei', 'Xiang Hao', 'Xiang Jun', 'Xiang Ming', 'Xiang Kai', 'Xiang Yang',
    
    // 华人女性名字 (约150个)
    'Hui Ling', 'Xin Yi', 'Ying Xuan', 'Li Ting', 'Mei Lin', 'Hui Min', 'Xin Hui', 'Ying Ying',
    'Xin Yun', 'Hui Xin', 'Li Yan', 'Mei Qi', 'Xin Ling', 'Hui Qi', 'Ying Qi', 'Li Xuan',
    'Jia Qi', 'Jia Ying', 'Jia Xin', 'Jia Hui', 'Jia Lin', 'Jia Yi', 'Jia Wen', 'Jia Min',
    'Yu Ting', 'Yu Xin', 'Yu Qi', 'Yu Lin', 'Yu Yan', 'Yu Wen', 'Yu Min', 'Yu Hui',
    'Shi Ting', 'Shi Xin', 'Shi Qi', 'Shi Lin', 'Shi Yan', 'Shi Wen', 'Shi Min', 'Shi Hui',
    'Yi Lin', 'Yi Xin', 'Yi Qi', 'Yi Ting', 'Yi Wen', 'Yi Min', 'Yi Hui', 'Yi Yan',
    'Xin Yao', 'Xin Rui', 'Xin Yu', 'Xin Lei', 'Xin Jie', 'Xin Mei', 'Xin Yue', 'Xin Ting',
    'Jing Yi', 'Jing Wen', 'Jing Xuan', 'Jing Lin', 'Jing Qi', 'Jing Ting', 'Jing Hui', 'Jing Min',
    'Si Hui', 'Si Ting', 'Si Qi', 'Si Lin', 'Si Xuan', 'Si Ying', 'Si Min', 'Si Yan',
    'Wen Hui', 'Wen Ting', 'Wen Qi', 'Wen Lin', 'Wen Xuan', 'Wen Ying', 'Wen Min', 'Wen Yan',
    'Rui Qi', 'Rui Lin', 'Rui Xuan', 'Rui Ting', 'Rui Ying', 'Rui Min', 'Rui Hui', 'Rui Yan',
    'Mei Ting', 'Mei Xuan', 'Mei Qi', 'Mei Hui', 'Mei Ying', 'Mei Yan', 'Mei Min', 'Mei Wen',
    'Xiao Hui', 'Xiao Ting', 'Xiao Qi', 'Xiao Lin', 'Xiao Xuan', 'Xiao Ying', 'Xiao Min', 'Xiao Yan',
    'Qian Hui', 'Qian Ting', 'Qian Qi', 'Qian Lin', 'Qian Xuan', 'Qian Ying', 'Qian Min', 'Qian Yan',
    'Zi Xuan', 'Zi Qi', 'Zi Lin', 'Zi Ting', 'Zi Ying', 'Zi Hui', 'Zi Min', 'Zi Yan',
    'Min Hui', 'Min Ting', 'Min Qi', 'Min Lin', 'Min Xuan', 'Min Ying', 'Min Yan', 'Min Wen',
    'Yan Ting', 'Yan Hui', 'Yan Qi', 'Yan Lin', 'Yan Xuan', 'Yan Ying', 'Yan Min', 'Yan Wen',
    'Lin Hui', 'Lin Ting', 'Lin Qi', 'Lin Xuan', 'Lin Ying', 'Lin Min', 'Lin Yan', 'Lin Wen',
    'Qi Hui', 'Qi Ting', 'Qi Lin', 'Qi Xuan', 'Qi Ying', 'Qi Min', 'Qi Yan', 'Qi Wen',
    'Ting Hui', 'Ting Xin', 'Ting Qi', 'Ting Lin', 'Ting Xuan', 'Ting Ying', 'Ting Min'
  ],
  
  lastNames: [
    // 约180个姓氏
    'Tan', 'Lim', 'Lee', 'Ng', 'Ong', 'Wong', 'Goh', 'Chua', 'Chan', 'Koh',
    'Teo', 'Ang', 'Yeo', 'Low', 'Tay', 'Sim', 'Chia', 'Ho', 'Chong', 'Seah',
    'Lau', 'Foo', 'Toh', 'Leong', 'Wee', 'Pang', 'Chew', 'Gan', 'Soh', 'Heng',
    'Loh', 'Cheong', 'Neo', 'Hong', 'Poh', 'Thong', 'Sia', 'Khoo', 'Loke', 'Quek',
    'Chin', 'Sng', 'Hoe', 'Kang', 'Beh', 'Tong', 'Phang', 'Kwa', 'Tham', 'Png',
    'Chen', 'Lin', 'Huang', 'Zhang', 'Liu', 'Yang', 'Wang', 'Wu', 'Zhao', 'Zhou',
    'Xu', 'Sun', 'Ma', 'Zhu', 'Hu', 'Guo', 'He', 'Luo', 'Song', 'Zheng',
    'Xie', 'Han', 'Tang', 'Feng', 'Yu', 'Dong', 'Xiao', 'Cheng', 'Cao', 'Yuan',
    'Deng', 'Fu', 'Shen', 'Tseng', 'Peng', 'Lu', 'Jiang', 'Cai', 'Ding', 'Wei',
    'Pan', 'Xue', 'Ye', 'Yan', 'Kong', 'Bai', 'Cui', 'Kang', 'Mao', 'Qiu',
    'Qin', 'Shi', 'Gu', 'Hou', 'Shao', 'Meng', 'Long', 'Wan', 'Duan', 'Lei',
    'Tng', 'Teng', 'Teoh', 'Teh', 'Seow', 'See', 'Seet', 'Siau', 'Siew', 'Siow',
    'Soo', 'Suah', 'Tiong', 'Tay', 'Tan', 'Ooi', 'Aw', 'Yap', 'Koh', 'Kuah',
    'Lai', 'Lam', 'Liang', 'Loo', 'Lum', 'Mok', 'Ngiam', 'Ow', 'Peh', 'Phua',
    'Seah', 'Seet', 'Siow', 'Tan', 'Teo', 'Thia', 'Tiong', 'Toh', 'Woo', 'Yong',
    'Abdullah', 'Ahmad', 'Ali', 'Hassan', 'Ibrahim', 'Mohamed', 'Rahman', 'Osman',
    'Singh', 'Kumar', 'Patel', 'Sharma', 'Reddy', 'Nair', 'Iyer', 'Rao',
    'David', 'Thomas', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis'
  ]
}
,
US: {
  firstNames: [
    // 男性名字 (约150个)
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
    'Kenneth', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
    'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
    'Benjamin', 'Samuel', 'Raymond', 'Gregory', 'Frank', 'Alexander', 'Patrick', 'Jack', 'Dennis', 'Jerry',
    'Tyler', 'Aaron', 'Jose', 'Adam', 'Henry', 'Nathan', 'Douglas', 'Zachary', 'Peter', 'Kyle',
    'Walter', 'Ethan', 'Jeremy', 'Harold', 'Keith', 'Christian', 'Roger', 'Noah', 'Gerald', 'Carl',
    'Terry', 'Sean', 'Austin', 'Arthur', 'Lawrence', 'Jesse', 'Dylan', 'Bryan', 'Joe', 'Jordan',
    'Billy', 'Bruce', 'Albert', 'Willie', 'Gabriel', 'Logan', 'Alan', 'Juan', 'Wayne', 'Roy',
    'Ralph', 'Randy', 'Eugene', 'Vincent', 'Russell', 'Elijah', 'Louis', 'Bobby', 'Philip', 'Johnny',
    'Bradley', 'Shawn', 'Mason', 'Harry', 'Luis', 'Carlos', 'Miguel', 'Antonio', 'Jake', 'Jamie',
    'Caleb', 'Evan', 'Alex', 'Oscar', 'Isaac', 'Luke', 'Cole', 'Hunter', 'Ian', 'Marcus',
    'Liam', 'Connor', 'Oliver', 'Lucas', 'Aiden', 'Jackson', 'Carson', 'Cooper', 'Parker', 'Chase',
    'Blake', 'Xavier', 'Wyatt', 'Jaxon', 'Colton', 'Bentley', 'Easton', 'Carter', 'Grayson', 'Hudson',
    'Landon', 'Brayden', 'Dominic', 'Lincoln', 'Wesley', 'Tristan', 'Spencer', 'Nathaniel', 'Derek', 'Travis',
    
    // 女性名字 (约150个)
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
    'Dorothy', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
    'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen',
    'Samantha', 'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Heather',
    'Diane', 'Ruth', 'Julie', 'Olivia', 'Joyce', 'Virginia', 'Victoria', 'Kelly', 'Lauren', 'Christina',
    'Joan', 'Evelyn', 'Judith', 'Megan', 'Andrea', 'Cheryl', 'Hannah', 'Jacqueline', 'Martha', 'Gloria',
    'Teresa', 'Ann', 'Sara', 'Madison', 'Frances', 'Kathryn', 'Janice', 'Jean', 'Abigail', 'Alice',
    'Judy', 'Sophia', 'Grace', 'Denise', 'Amber', 'Doris', 'Marilyn', 'Danielle', 'Beverly', 'Isabella',
    'Theresa', 'Diana', 'Natalie', 'Brittany', 'Charlotte', 'Marie', 'Kayla', 'Alexis', 'Lori', 'Ava',
    'Mia', 'Emily', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria', 'Scarlett', 'Victoria', 'Madison',
    'Luna', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora', 'Lily', 'Eleanor', 'Harper',
    'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria',
    'Hazel', 'Aurora', 'Savannah', 'Brooklyn', 'Bella', 'Claire', 'Skylar', 'Lucy', 'Paisley', 'Everly',
    'Anna', 'Caroline', 'Nova', 'Genesis', 'Emilia', 'Kennedy', 'Samantha', 'Maya', 'Willow', 'Kinsley'
  ],
  
  lastNames: [
    // 约200个姓氏
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
    'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
    'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
    'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
    'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
    'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
    
    'Powell', 'Jenkins', 'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson', 'Barnes',
    'Gonzales', 'Fisher', 'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham',
    'Reynolds', 'Griffin', 'Wallace', 'Moreno', 'West', 'Cole', 'Hayes', 'Bryant', 'Herrera', 'Gibson',
    'Ellis', 'Tran', 'Medina', 'Aguilar', 'Stevens', 'Murray', 'Ford', 'Castro', 'Marshall', 'Owens',
    'Harrison', 'Fernandez', 'McDonald', 'Woods', 'Washington', 'Kennedy', 'Wells', 'Vargas', 'Henry', 'Chen',
    'Freeman', 'Webb', 'Tucker', 'Guzman', 'Burns', 'Crawford', 'Olson', 'Simpson', 'Porter', 'Hunter',
    'Gordon', 'Mendez', 'Silva', 'Shaw', 'Snyder', 'Mason', 'Dixon', 'Munoz', 'Hunt', 'Hicks',
    'Holmes', 'Palmer', 'Wagner', 'Black', 'Robertson', 'Boyd', 'Rose', 'Stone', 'Salazar', 'Fox',
    'Warren', 'Mills', 'Meyer', 'Rice', 'Schmidt', 'Garza', 'Daniels', 'Ferguson', 'Nichols', 'Stephens',
    'Soto', 'Weaver', 'Ryan', 'Gardner', 'Payne', 'Grant', 'Dunn', 'Kelley', 'Spencer', 'Hawkins'
  ]
},
GB: {
  firstNames: [
    // 男性名字 (约150个)
    'Oliver', 'George', 'Harry', 'Noah', 'Jack', 'Leo', 'Arthur', 'Muhammad', 'Oscar', 'Charlie',
    'Jacob', 'Thomas', 'Henry', 'Alfie', 'Freddie', 'Archie', 'Isaac', 'Joshua', 'Theo', 'William',
    'James', 'Alexander', 'Edward', 'Logan', 'Lucas', 'Max', 'Mason', 'Sebastian', 'Dylan', 'Ethan',
    'Benjamin', 'Samuel', 'Daniel', 'Joseph', 'Adam', 'Finley', 'Harrison', 'Reuben', 'Jude', 'Lewis',
    'Toby', 'Luke', 'Ryan', 'Matthew', 'Nathan', 'Jake', 'Callum', 'Connor', 'Liam', 'Michael',
    'David', 'Robert', 'Richard', 'Paul', 'Mark', 'Andrew', 'Stephen', 'Christopher', 'Peter', 'John',
    'Charles', 'Anthony', 'Simon', 'Kevin', 'Jason', 'Ian', 'Martin', 'Jonathan', 'Colin', 'Gary',
    'Elijah', 'Hudson', 'Ezra', 'Jayden', 'Louis', 'Felix', 'Finlay', 'Arlo', 'Hugo', 'Elliot',
    'Jenson', 'Hunter', 'Kai', 'Blake', 'Zachary', 'Rory', 'Evan', 'Jasper', 'Luca', 'Sonny',
    'Riley', 'Tyler', 'Kayden', 'Rowan', 'Jonah', 'Bobby', 'Tommy', 'Stanley', 'Albert', 'Frankie',
    'Ronnie', 'Reggie', 'Albie', 'Louie', 'Teddy', 'Rafe', 'Otto', 'Ralph', 'Rupert', 'Milo',
    'Frederick', 'Wilfred', 'Percy', 'Chester', 'Cedric', 'Casper', 'Felix', 'Miles', 'Hugo', 'Jasper',
    'Angus', 'Duncan', 'Fraser', 'Hamish', 'Ewan', 'Callum', 'Declan', 'Kieran', 'Lachlan', 'Niall',
    'Aiden', 'Brandon', 'Cameron', 'Darren', 'Gavin', 'Graham', 'Craig', 'Neil', 'Shane', 'Stuart',
    'Wayne', 'Dean', 'Dale', 'Lee', 'Ross', 'Scott', 'Aaron', 'Barry', 'Bradley', 'Carl',
    
    // 女性名字 (约150个)
    'Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Ivy', 'Lily', 'Isabella', 'Rosie', 'Sophia',
    'Grace', 'Freya', 'Willow', 'Ella', 'Emily', 'Evie', 'Florence', 'Poppy', 'Charlotte', 'Daisy',
    'Sophie', 'Alice', 'Isabella', 'Phoebe', 'Evelyn', 'Ruby', 'Elsie', 'Matilda', 'Maya', 'Sienna',
    'Jessica', 'Emma', 'Lucy', 'Chloe', 'Hannah', 'Megan', 'Katie', 'Lauren', 'Rebecca', 'Amy',
    'Sarah', 'Laura', 'Charlotte', 'Abigail', 'Jennifer', 'Victoria', 'Elizabeth', 'Rachel', 'Natalie', 'Leah',
    'Eleanor', 'Harriet', 'Imogen', 'Maisie', 'Violet', 'Thea', 'Luna', 'Aurora', 'Penelope', 'Emilia',
    'Arabella', 'Rose', 'Iris', 'Esme', 'Millie', 'Eliza', 'Hallie', 'Ada', 'Darcie', 'Lola',
    'Nancy', 'Bonnie', 'Lottie', 'Margot', 'Clara', 'Zara', 'Lyra', 'Summer', 'Harper', 'Bella',
    'Holly', 'Molly', 'Ellie', 'Jasmine', 'Amelie', 'Scarlett', 'Zoe', 'Eva', 'Anna', 'Georgia',
    'Beth', 'Bethany', 'Brooke', 'Caitlin', 'Courtney', 'Danielle', 'Eloise', 'Gemma', 'Hayley', 'Jodie',
    'Kayleigh', 'Keira', 'Libby', 'Paige', 'Tilly', 'Lara', 'Melissa', 'Nicole', 'Shannon', 'Tara',
    'Heather', 'Jade', 'Kirsty', 'Louise', 'Michelle', 'Nicola', 'Samantha', 'Stacey', 'Claire', 'Joanne',
    'Karen', 'Linda', 'Margaret', 'Patricia', 'Susan', 'Angela', 'Barbara', 'Carol', 'Christine', 'Deborah',
    'Diane', 'Dorothy', 'Helen', 'Janet', 'Jean', 'Julie', 'Mary', 'Pamela', 'Sandra', 'Sharon',
    'Erin', 'Fiona', 'Gillian', 'Jacqueline', 'Jane', 'June', 'Katherine', 'Maureen', 'Paula', 'Tracey'
  ],
  
  lastNames: [
    // 约200个姓氏
    'Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
    'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'Wright', 'Watson', 'Edwards', 'Hughes',
    'Green', 'Hall', 'Turner', 'White', 'Clarke', 'Harris', 'Cooper', 'King', 'Lee', 'Martin',
    'Jackson', 'Hill', 'Moore', 'Clark', 'Baker', 'Harrison', 'Morgan', 'Patel', 'Young', 'Allen',
    'Mitchell', 'James', 'Anderson', 'Phillips', 'Bell', 'Davis', 'Miller', 'Murphy', 'Price', 'Richardson',
    'Collins', 'Cook', 'Bailey', 'Bennett', 'Cox', 'Parker', 'Reid', 'Powell', 'Chapman', 'Ellis',
    'Russell', 'Ward', 'Foster', 'Stone', 'Webb', 'Mason', 'Shaw', 'Rogers', 'Hunt', 'Brooks',
    'Marshall', 'Ross', 'Reynolds', 'Hamilton', 'Graham', 'Cole', 'Murray', 'Palmer', 'Stevens', 'Barker',
    
    'Robertson', 'Simpson', 'West', 'Scott', 'Gibson', 'Ellis', 'Ford', 'Barnes', 'Wells', 'Black',
    'Kelly', 'Woods', 'Berry', 'Gray', 'Owens', 'Walsh', 'Fisher', 'Carter', 'Butler', 'Gardner',
    'Duncan', 'Spencer', 'Pearson', 'Knight', 'Harvey', 'Hudson', 'Rose', 'Bishop', 'Booth', 'Burns',
    'Campbell', 'Carr', 'Dixon', 'Fox', 'Grant', 'Griffin', 'Harding', 'Henderson', 'Jenkins', 'Kennedy',
    'Lawrence', 'Matthews', 'McDonald', 'Newman', 'Oliver', 'Payne', 'Porter', 'Quinn', 'Shaw', 'Simpson',
    'Stevens', 'Sutton', 'Terry', 'Wallace', 'Warren', 'Webb', 'Wells', 'Wheeler', 'Willis', 'Wood',
    
    'Ahmed', 'Ali', 'Khan', 'Begum', 'Shah', 'Hussain', 'Kaur', 'Singh', 'Bibi', 'Mohammed',
    'O\'Brien', 'O\'Connor', 'O\'Sullivan', 'Murphy', 'Kelly', 'McCarthy', 'Ryan', 'Byrne', 'Walsh', 'Connor',
    'MacDonald', 'MacLeod', 'Fraser', 'Grant', 'Cameron', 'Stewart', 'Ferguson', 'Reid', 'Murray', 'Johnston',
    'Griffiths', 'Rees', 'Pritchard', 'Lloyd', 'Jenkins', 'Parry', 'Owen', 'Morgan', 'Vaughan', 'Hopkins',
    
    'Armstrong', 'Bradley', 'Burton', 'Cameron', 'Chambers', 'Crawford', 'Dawson', 'Douglas', 'Fleming', 'Fletcher',
    'Francis', 'Freeman', 'Fuller', 'Garrett', 'Gilbert', 'Gordon', 'Griffiths', 'Hancock', 'Hawkins', 'Hayes',
    'Higgins', 'Holland', 'Howard', 'Hughes', 'Hunt', 'Hunter', 'Jackson', 'Johnston', 'Jordan', 'Kennedy'
  ]
},
DE: {
  firstNames: [
    // 男性名字 (约150个)
    'Maximilian', 'Alexander', 'Paul', 'Elias', 'Ben', 'Noah', 'Leon', 'Louis', 'Jonas', 'Felix',
    'Lukas', 'Luca', 'Tim', 'Finn', 'Leo', 'Moritz', 'Julian', 'David', 'Jan', 'Niklas',
    'Tom', 'Max', 'Erik', 'Philipp', 'Simon', 'Daniel', 'Florian', 'Fabian', 'Sebastian', 'Tobias',
    'Jakob', 'Liam', 'Emil', 'Anton', 'Oskar', 'Henry', 'Theo', 'Matteo', 'Samuel', 'Jonathan',
    'Leonard', 'Raphael', 'Adrian', 'Lennard', 'Vincent Vincent', 'Marlon', 'Luis', 'Mats', 'Noah', 'Jasper',
    'Oliver', 'Michael', 'Thomas', 'Christian', 'Andreas', 'Stefan', 'Markus', 'Patrick', 'Martin', 'Dennis',
    'Marcel', 'Matthias', 'Kevin', 'Benjamin', 'Dominik', 'Pascal', 'Marco', 'Christoph', 'Sven', 'Jens',
    'Peter', 'Klaus', 'Jürgen', 'Dieter', 'Wolfgang', 'Helmut', 'Hans', 'Werner', 'Ralf', 'Uwe',
    'Friedrich', 'Heinrich', 'Karl', 'Wilhelm', 'Otto', 'Franz', 'Ludwig', 'Ernst', 'Kurt', 'Walter',
    'Gustav', 'Georg', 'Hermann', 'Bruno', 'Alfred', 'Fritz', 'Hugo', 'Rudolf', 'Arthur', 'Albert',
    'Konstantin', 'Valentin', 'Henrik', 'Mika', 'Aaron', 'Nils', 'Till', 'Jannik', 'Lars', 'Robin',
    'Clemens', 'Benedikt', 'Johannes', 'Lorenz', 'Noah', 'Gabriel', 'Julius', 'Milan', 'Milo', 'Bruno',
    'Theodor', 'Carl', 'Friedrich', 'Arthur', 'Maximilian', 'Emil', 'Johann', 'August', 'Ferdinand', 'Kaspar',
    'Linus', 'Adam', 'Joel', 'Hannes', 'Kilian', 'Justus', 'Lennart', 'Mattis', 'Ole', 'Nico',
    'Malte', 'Jannis', 'Timo', 'Joshua', 'Yannik', 'Colin', 'Lasse', 'Jona', 'Levi', 'Leandro',
    
    // 女性名字 (约150个)
    'Marie', 'Sophie', 'Maria', 'Sophia', 'Emilia', 'Emma', 'Hannah', 'Anna', 'Mia', 'Luisa',
    'Lena', 'Lea', 'Laura', 'Leonie', 'Emily', 'Johanna', 'Lara', 'Clara', 'Lisa', 'Julia',
    'Sarah', 'Charlotte', 'Amelie', 'Mila', 'Lina', 'Katharina', 'Jana', 'Alina', 'Melissa', 'Vanessa',
    'Franziska', 'Nele', 'Ida', 'Frieda', 'Mathilda', 'Paula', 'Ella', 'Maja', 'Helena', 'Marlene',
    'Nina', 'Christina', 'Stefanie', 'Jennifer', 'Nadine', 'Sandra', 'Andrea', 'Sabine', 'Claudia', 'Petra',
    'Kathrin', 'Melanie', 'Nicole', 'Daniela', 'Alexandra', 'Katrin', 'Martina', 'Anja', 'Tanja', 'Susanne',
    'Monika', 'Gabriele', 'Birgit', 'Karin', 'Heike', 'Barbara', 'Ursula', 'Ingrid', 'Helga', 'Christa',
    'Gisela', 'Hildegard', 'Gertrud', 'Elfriede', 'Irmgard', 'Erika', 'Renate', 'Margot', 'Anneliese', 'Waltraud',
    'Lieselotte', 'Hedwig', 'Brunhilde', 'Elsa', 'Gretel', 'Käthe', 'Friederike', 'Wilhelmine', 'Auguste', 'Hermine',
    'Emilie', 'Luise', 'Elisabeth', 'Margarete', 'Rosa', 'Martha', 'Berta', 'Alma', 'Emma', 'Klara',
    'Leni', 'Greta', 'Thea', 'Rosa', 'Carla', 'Stella', 'Luna', 'Nora', 'Pia', 'Zoe',
    'Isabella', 'Victoria', 'Valentina', 'Aurora', 'Elisa', 'Annika', 'Paulina', 'Josephine', 'Flora', 'Rosalie',
    'Lilly', 'Lotte', 'Mira', 'Anni', 'Romy', 'Lucia', 'Antonia', 'Elina', 'Lotta', 'Juna',
    'Merle', 'Mara', 'Elena', 'Hanna', 'Milena', 'Chiara', 'Leni', 'Lara', 'Mina', 'Lia',
    'Tessa', 'Ronja', 'Finja', 'Zara', 'Alma', 'Ina', 'Jette', 'Enna', 'Lene', 'Maya'
  ],
  
  lastNames: [
    // 约200个姓氏
    'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann',
    'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann',
    'Braun', 'Krüger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz', 'Krause', 'Meier',
    'Lehmann', 'Schmid', 'Schulze', 'Maier', 'Köhler', 'Herrmann', 'König', 'Walter', 'Mayer', 'Huber',
    'Kaiser', 'Fuchs', 'Peters', 'Lang', 'Scholz', 'Möller', 'Weiß', 'Jung', 'Hahn', 'Schubert',
    
    'Vogel', 'Friedrich', 'Keller', 'Günther', 'Frank', 'Berger', 'Winkler', 'Roth', 'Beck', 'Lorenz',
    'Baumann', 'Franke', 'Albrecht', 'Schuster', 'Simon', 'Ludwig', 'Böhm', 'Winter', 'Kraus', 'Martin',
    'Schumacher', 'Krämer', 'Vogt', 'Stein', 'Jäger', 'Otto', 'Sommer', 'Groß', 'Seidel', 'Heinrich',
    'Brandt', 'Haas', 'Schreiber', 'Graf', 'Schulte', 'Dietrich', 'Ziegler', 'Kuhn', 'Kühn', 'Pohl',
    'Engel', 'Horn', 'Busch', 'Bergmann', 'Thomas', 'Voigt', 'Sauer', 'Arnold', 'Wolff', 'Pfeiffer',
    
    'Ritter', 'Bock', 'Heller', 'Hermann', 'Götz', 'Peter', 'Seidl', 'Mohr', 'Kern', 'Hoppe',
    'Brenner', 'Engel', 'Auer', 'Lindner', 'Wolff', 'Riedel', 'Nowak', 'Seifert', 'Marx', 'Pfeifer',
    'Eder', 'Baum', 'Frey', 'Schiller', 'Grimm', 'Baumgartner', 'Lenz', 'Geiger', 'Kohn', 'Gebhardt',
    'Förster', 'Wimmer', 'Fiedler', 'Scherer', 'Kopp', 'Göbel', 'Bachmann', 'Egger', 'Bartels', 'Brandl',
    
    'Steiner', 'Kirchner', 'Runge', 'Böhme', 'Burger', 'Nickel', 'Sperling', 'Heinz', 'Urban', 'Rose',
    'Hauser', 'Hinz', 'Eder', 'Eder', 'Janssen', 'Wulf', 'Reichert', 'Fink', 'Herzog', 'Fritz',
    'Hansen', 'Decker', 'Völker', 'Paul', 'Wiese', 'Wenzel', 'Schäffer', 'Prinz', 'Adler', 'Lehner',
    'Barthel', 'Schwab', 'Krüger', 'Funk', 'Bittner', 'Stephan', 'Kurz', 'Westphal', 'Gabriel', 'Stadler',
    
    'Ulrich', 'Ullmann', 'Schilling', 'Michels', 'Förster', 'Dorn', 'Münch', 'Ritter', 'Wilhelm', 'Henkel',
    'Blank', 'Gottschalk', 'Bode', 'Wegner', 'Klaus', 'Kahl', 'Greiner', 'Betz', 'Hildebrandt', 'Hesse'
  ]
},
FR: {
  firstNames: [
    // 男性名字 (约150个)
    'Gabriel', 'Léo', 'Raphaël', 'Arthur', 'Louis', 'Lucas', 'Adam', 'Jules', 'Hugo', 'Maël',
    'Nathan', 'Noah', 'Ethan', 'Tom', 'Théo', 'Liam', 'Maxime', 'Enzo', 'Antoine', 'Paul',
    'Alexandre', 'Victor', 'Baptiste', 'Mathis', 'Mathéo', 'Nolan', 'Clément', 'Thomas', 'Nicolas', 'Pierre',
    'Julien', 'Valentin', 'Romain', 'Benjamin', 'Maxence', 'Simon', 'Robin', 'Yanis', 'Axel', 'Timéo',
    'Sacha', 'Samuel', 'Noé', 'Oscar', 'Léon', 'Gabin', 'Eden', 'Marius', 'Auguste', 'Charles',
    'Jean', 'François', 'Philippe', 'Michel', 'Alain', 'Christian', 'Daniel', 'Patrick', 'Bernard', 'Laurent',
    'Jacques', 'André', 'Henri', 'Claude', 'Gérard', 'Marcel', 'René', 'Maurice', 'Georges', 'Roger',
    'Émile', 'Lucien', 'Fernand', 'Albert', 'Robert', 'Raymond', 'Gaston', 'Léon', 'Édouard', 'Yves',
    'Sébastien', 'Vincent', 'Olivier', 'Matthieu', 'Florian', 'Jérôme', 'Christophe', 'Stéphane', 'Cédric', 'David',
    'Guillaume', 'Aurélien', 'Anthony', 'Kevin', 'Dylan', 'Quentin', 'Adrien', 'Fabien', 'Jonathan', 'Ludovic',
    'Théodore', 'Augustin', 'Basile', 'Côme', 'Eliott', 'Gaspard', 'Milo', 'Thibault', 'Timothée', 'Tristan',
    'Anatole', 'Armand', 'Aurèle', 'Balthazar', 'Camille', 'Céleste', 'Cyprien', 'Félix', 'Gustave', 'Hadrien',
    'Honoré', 'Isidore', 'Joseph', 'Lazare', 'Léopold', 'Marceau', 'Octave', 'Prosper', 'Rémi', 'Soren',
    'Achille', 'Alban', 'Ange', 'Aurélien', 'Blaise', 'Damien', 'Dorian', 'Elias', 'Éloi', 'Emmanuel',
    'Fabrice', 'Florent', 'Gael', 'Gauthier', 'Grégoire', 'Joachim', 'Jonas', 'Laurent', 'Loïc', 'Martin',
    
    // 女性名字 (约150个)
    'Jade', 'Louise', 'Emma', 'Ambre', 'Alice', 'Alba', 'Rose', 'Anna', 'Mia', 'Romy',
    'Chloé', 'Léa', 'Manon', 'Clara', 'Zoé', 'Sarah', 'Inès', 'Lola', 'Léna', 'Camille',
    'Juliette', 'Charlotte', 'Éléonore', 'Mathilde', 'Lucie', 'Margaux', 'Anaïs', 'Marion', 'Julie', 'Marie',
    'Sophie', 'Laura', 'Pauline', 'Caroline', 'Émilie', 'Céline', 'Audrey', 'Mélanie', 'Stéphanie', 'Aurélie',
    'Nathalie', 'Isabelle', 'Sandrine', 'Valérie', 'Sylvie', 'Martine', 'Catherine', 'Françoise', 'Christine', 'Véronique',
    'Monique', 'Nicole', 'Jacqueline', 'Denise', 'Simone', 'Jeanne', 'Thérèse', 'Yvonne', 'Suzanne', 'Marguerite',
    'Henriette', 'Germaine', 'Madeleine', 'Colette', 'Paulette', 'Andrée', 'Renée', 'Georgette', 'Marcelle', 'Bernadette',
    'Amélie', 'Capucine', 'Iris', 'Victoire', 'Agathe', 'Adèle', 'Apolline', 'Augustine', 'Blanche', 'Céleste',
    'Clémence', 'Constance', 'Diane', 'Élise', 'Éloise', 'Gabrielle', 'Héloïse', 'Hortense', 'Joséphine', 'Justine',
    'Livia', 'Maëlle', 'Maëlys', 'Nina', 'Noémie', 'Olivia', 'Romane', 'Salomé', 'Valentine', 'Violette',
    'Adeline', 'Alix', 'Amandine', 'Angèle', 'Annabelle', 'Ariane', 'Astrid', 'Aurore', 'Axelle', 'Béatrice',
    'Bénédicte', 'Brigitte', 'Carla', 'Cassandra', 'Charlène', 'Colombe', 'Coralie', 'Delphine', 'Dorothée', 'Edith',
    'Elena', 'Élodie', 'Estelle', 'Eugénie', 'Eva', 'Fanny', 'Florence', 'Gaëlle', 'Gwenaëlle', 'Hélène',
    'Inès', 'Irène', 'Jeanne', 'Jessica', 'Justine', 'Karine', 'Laetitia', 'Laurence', 'Laurie', 'Lila',
    'Lilou', 'Lina', 'Louna', 'Ludivine', 'Luna', 'Lydie', 'Maeva', 'Manon', 'Mélissa', 'Mireille',
    'Morgane', 'Muriel', 'Nadine', 'Océane', 'Odette', 'Patricia', 'Raphaëlle', 'Rebecca', 'Rosalie', 'Sabine'
  ],
  
  lastNames: [
    // 约200个姓氏
    'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent',
    'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard',
    'Bonnet', 'Dupont', 'Lambert', 'Fontaine', 'Rousseau', 'Vincent', 'Muller', 'Lefevre', 'Faure', 'Andre',
    'Mercier', 'Blanc', 'Guerin', 'Boyer', 'Garnier', 'Chevalier', 'Francois', 'Legrand', 'Gauthier', 'Garcia',
    'Perrin', 'Robin', 'Clement', 'Morin', 'Nicolas', 'Henry', 'Roussel', 'Mathieu', 'Gautier', 'Masson',
    
    'Marchand', 'Duval', 'Denis', 'Dumont', 'Marie', 'Lemaire', 'Noel', 'Meyer', 'Dumas', 'Brunet',
    'Schmitt', 'Blanchard', 'Joly', 'Riviere', 'Lucas', 'Giraud', 'Aubert', 'Roy', 'Gaillard', 'Barbier',
    'Arnaud', 'Martinez', 'Gerard', 'Roche', 'Renard', 'Leclerc', 'Pelletier', 'Lecomte', 'Benoit', 'Brun',
    'Caron', 'Fleury', 'Pierre', 'Rey', 'Bailly', 'Picard', 'Roger', 'Vidal', 'Bourgeois', 'Renaud',
    'Lemoine', 'Fernandez', 'Rolland', 'Collet', 'Olivier', 'Berger', 'Meunier', 'Carpentier', 'Guillot', 'Lambert',
    
    'Colin', 'Lopez', 'Gonzalez', 'Rodriguez', 'Perez', 'Sanchez', 'Hernandez', 'Ramirez', 'Torres', 'Flores',
    'Prevost', 'Hubert', 'Dupuis', 'Deschamps', 'Leclerc', 'Laporte', 'Lacroix', 'Fabre', 'Reynaud', 'Bertin',
    'Leroux', 'Marechal', 'Boulanger', 'Voisin', 'Benard', 'Charpentier', 'Menard', 'Bouvier', 'Lelievre', 'Payet',
    'Cousin', 'Delaunay', 'Philippe', 'Humbert', 'Collin', 'Weber', 'Boucher', 'Guillou', 'Jacquet', 'Dufour',
    
    'Vasseur', 'Lejeune', 'Guyot', 'Maillard', 'Leclercq', 'Gilbert', 'Le Gall', 'Charles', 'Baron', 'Paris',
    'Schneider', 'Adam', 'Poirier', 'Marty', 'Lebreton', 'Besson', 'Langlois', 'Remy', 'Le Roux', 'Guillet',
    'Huet', 'Germain', 'Barthelemy', 'Moulin', 'Berger', 'Lebrun', 'Fontaine', 'Joubert', 'Perrot', 'Bruneau',
    'Perrault', 'Le Goff', 'Gomes', 'Da Silva', 'Dos Santos', 'Ferreira', 'Alves', 'Costa', 'Ribeiro', 'Carvalho',
    
    'Chevallier', 'Gillet', 'Julien', 'Hamon', 'Alexandre', 'Boutin', 'Rossi', 'Leconte', 'Millet', 'Valentin',
    'Launay', 'Chauvin', 'Aubry', 'Cordier', 'Leblanc', 'Tessier', 'Gay', 'Bouchet', 'Lemonnier', 'Poulain'
  ]
},
RU: {
  firstNames: [
    // 男性名字 (约150个)
    'Alexander', 'Mikhail', 'Maxim', 'Ivan', 'Artem', 'Dmitry', 'Daniil', 'Mark', 'Lev', 'Matvey',
    'Andrey', 'Sergey', 'Aleksey', 'Pavel', 'Nikolay', 'Vladimir', 'Roman', 'Igor', 'Oleg', 'Yuri',
    'Kirill', 'Anton', 'Ilya', 'Nikita', 'Timur', 'Ruslan', 'Denis', 'Yegor', 'Gleb', 'Stanislav',
    'Vladislav', 'Fyodor', 'Georgy', 'Konstantin', 'Grigory', 'Yaroslav', 'Stepan', 'Timofey', 'Makar', 'Semyon',
    'Vsevolod', 'Anatoly', 'Leonid', 'Valery', 'Boris', 'Viktor', 'Yevgeny', 'Gennady', 'Vasily', 'Petr',
    'Arkady', 'Vitaly', 'Zakhar', 'Rodion', 'Savely', 'Platon', 'Miroslav', 'Demyan', 'Bogdan', 'Arseny',
    'Eduard', 'Vadim', 'Svyatoslav', 'Marat', 'Taras', 'Fedor', 'German', 'Ratmir', 'Luka', 'Makar',
    'Arsen', 'David', 'Robert', 'Albert', 'Artur', 'Ernest', 'Emil', 'Yan', 'Danila', 'Miroslav',
    'Innokenty', 'Klim', 'Modest', 'Nazar', 'Platon', 'Prokhor', 'Saveliy', 'Trofim', 'Yan', 'Yakov',
    'Abram', 'Akim', 'Avgustin', 'Donat', 'Efim', 'Illarion', 'Kondrat', 'Kuzma', 'Lubomir', 'Makar',
    'Martyn', 'Mitrofan', 'Nikifor', 'Osip', 'Pantelei', 'Potap', 'Radmir', 'Rostislav', 'Savva', 'Serafim',
    'Tikhon', 'Trofim', 'Ustin', 'Faddey', 'Filipp', 'Khariton', 'Yulian', 'Zinovy', 'Avdey', 'Ermolai',
    'Danil', 'Misha', 'Sasha', 'Dima', 'Vanya', 'Roma', 'Kostya', 'Zhenya', 'Pasha', 'Kolya',
    'Slava', 'Lyosha', 'Tolya', 'Volodya', 'Grisha', 'Serezha', 'Borya', 'Vitya', 'Alyosha', 'Petya',
    'Artyom', 'Gosha', 'Lenya', 'Stepa', 'Fedya', 'Yura', 'Zhora', 'Gena', 'Lyova', 'Misha',
    
    // 女性名字 (约150个)
    'Sofia', 'Maria', 'Anna', 'Alice', 'Victoria', 'Polina', 'Eva', 'Elizaveta', 'Arina', 'Varvara',
    'Anastasia', 'Daria', 'Ekaterina', 'Natalia', 'Olga', 'Irina', 'Tatiana', 'Yulia', 'Elena', 'Svetlana',
    'Ksenia', 'Alina', 'Veronica', 'Milana', 'Kira', 'Ulyana', 'Valeria', 'Margarita', 'Alexandra', 'Veronika',
    'Kristina', 'Diana', 'Angelina', 'Alisa', 'Miroslava', 'Maya', 'Zlata', 'Serafima', 'Stefania', 'Evelina',
    'Lyudmila', 'Galina', 'Nina', 'Marina', 'Valentina', 'Larisa', 'Tamara', 'Zinaida', 'Raisa', 'Vera',
    'Lyubov', 'Nadezhda', 'Klavdiya', 'Zoya', 'Alla', 'Rimma', 'Inna', 'Lidiya', 'Antonina', 'Agnessa',
    'Angelina', 'Anfisa', 'Bella', 'Bronislava', 'Dina', 'Elina', 'Emiliya', 'Faina', 'Feodora', 'Flora',
    'Galina', 'Izabella', 'Ivanna', 'Karina', 'Klara', 'Lada', 'Lana', 'Liana', 'Liliya', 'Linda',
    'Lubov', 'Lydia', 'Madina', 'Maiya', 'Mila', 'Milena', 'Mirra', 'Nelli', 'Nonna', 'Oksana',
    'Praskovya', 'Regina', 'Roza', 'Rufina', 'Sabina', 'Saniya', 'Sara', 'Serafima', 'Snezhana', 'Sofya',
    'Stanislava', 'Stella', 'Susanna', 'Tamila', 'Uliana', 'Ustinya', 'Vasilisa', 'Venera', 'Vlada', 'Yaroslava',
    'Yekaterina', 'Yelena', 'Yelizaveta', 'Yesenia', 'Yeva', 'Zhanna', 'Zinaida', 'Zlata', 'Inessa', 'Iskra',
    'Kamilla', 'Lesya', 'Ludmila', 'Marianna', 'Militsa', 'Rada', 'Raisa', 'Snezhana', 'Taisia', 'Vasilisa',
    'Sonya', 'Masha', 'Katya', 'Nastya', 'Dasha', 'Lena', 'Tanya', 'Sasha', 'Natasha', 'Sveta',
    'Olya', 'Ira', 'Vika', 'Yulia', 'Anya', 'Liza', 'Veronika', 'Kristina', 'Ksyusha', 'Alina',
    'Polya', 'Varya', 'Galya', 'Luda', 'Zoya', 'Valya', 'Larisa', 'Rita', 'Nina', 'Marina'
  ],
  
  lastNames: [
    // 约200个姓氏
    'Ivanov', 'Smirnov', 'Kuznetsov', 'Popov', 'Vasilyev', 'Petrov', 'Sokolov', 'Mikhailov', 'Novikov', 'Fedorov',
    'Morozov', 'Volkov', 'Alekseev', 'Lebedev', 'Semenov', 'Egorov', 'Pavlov', 'Kozlov', 'Stepanov', 'Nikolaev',
    'Orlov', 'Andreev', 'Makarov', 'Nikitin', 'Zakharov', 'Zaitsev', 'Solovyov', 'Borisov', 'Yakovlev', 'Grigoriev',
    'Romanov', 'Vorobyov', 'Sergeyev', 'Kuzmin', 'Maksimov', 'Antonov', 'Vinogradov', 'Korolev', 'Kiselev', 'Ilyin',
    'Gerasimov', 'Frolov', 'Dmitriev', 'Davydov', 'Melnikov', 'Shcherbakov', 'Ponomarev', 'Golubev', 'Kovalev', 'Lazarev',
    
    'Medvedev', 'Ershov', 'Nikiforov', 'Vladimirov', 'Filippov', 'Leonov', 'Semyonov', 'Volkov', 'Fomin', 'Denisov',
    'Belov', 'Arsenyev', 'Titov', 'Kolosov', 'Prokhorov', 'Konstantinov', 'Artemyev', 'Belyakov', 'Kondratyev', 'Nesterov',
    'Kalinin', 'Krasnov', 'Timofeyev', 'Baranov', 'Krylov', 'Saveliev', 'Efimov', 'Yegorov', 'Zhukov', 'Zakharov',
    'Bogdanov', 'Matveev', 'Yeremeyev', 'Polyakov', 'Afanasiev', 'Mikheyev', 'Osipov', 'Yefimov', 'Tarasov', 'Belyaev',
    'Sidorov', 'Komarov', 'Gusev', 'Koltsov', 'Zaytsev', 'Lavrov', 'Gromov', 'Karpov', 'Akimov', 'Malyshev',
    
    'Zaharov', 'Kulikov', 'Naumov', 'Blinov', 'Loginov', 'Markov', 'Fokin', 'Kalashnikov', 'Simonov', 'Fadeev',
    'Pankratov', 'Noskov', 'Trofimov', 'Nikolayev', 'Abramov', 'Rodionov', 'Korolkov', 'Karpov', 'Maksimenko', 'Panfilov',
    'Rodionov', 'Anisimov', 'Kryukov', 'Molchanov', 'Lukin', 'Nosov', 'Berezin', 'Preobrazhenskiy', 'Malyutin', 'Konovalov',
    'Dorofeev', 'Yudin', 'Zotov', 'Kirillov', 'Karelin', 'Kazakov', 'Vavilov', 'Prokofyev', 'Sorokin', 'Ustinov',
    
    'Gulyaev', 'Ignatov', 'Kovalyov', 'Kudryavtsev', 'Mishin', 'Nasonov', 'Pryanikov', 'Rogov', 'Safonov', 'Saharov',
    'Shishkin', 'Sobolev', 'Suvorov', 'Tsvetkov', 'Turchin', 'Ushakov', 'Vorontsov', 'Yemelyanov', 'Zhuravlyov', 'Zuev',
    'Bogdanov', 'Burov', 'Danilov', 'Yevseyev', 'Glebov', 'Gordeev', 'Grachev', 'Isakiv', 'Kabanov', 'Klimov',
    'Kolpakov', 'Kuzmin', 'Larionov', 'Mamontov', 'Nasonov', 'Pakhomov', 'Potapov', 'Ryabov', 'Safronov', 'Samsonov',
    
    'Shapovalov', 'Shestakov', 'Silin', 'Skvortsov', 'Smirnoff', 'Starodubtsev', 'Sukhanov', 'Terentyev', 'Tishkov', 'Tomilin',
    'Trofimov', 'Vasilyev', 'Vdovin', 'Viktorov', 'Vishnyakov', 'Voloshin', 'Yefremov', 'Yevstigneev', 'Zimin', 'Zotov'
  ]
},
JP: {
  firstNames: [
    // 男性名字 (约150个)
    '太郎', '一郎', '健太', '翔', '大輔', '健', '誠', '拓也', '大樹', '裕太',
    '悠斗', '陽翔', '蓮', '湊', '大翔', '颯太', '陽向', '樹', '朝陽', '碧',
    '陸', '奏太', '蒼', '凛', '律', '新', '翼', '旭', '瑛太', '光',
    '隼人', '雄大', '直樹', '大地', '航', '翔太', '優太', '駿', '海斗', '涼太',
    '勇気', '秀樹', '貴之', '和也', '浩二', '明', '剛', '修', '学', '進',
    '昭', '博', '茂', '武', '清', '隆', '弘', '豊', '勝', '稔',
    '正', '忠', '孝', '仁', '義', '礼', '智', '信', '勇', '強',
    '次郎', '三郎', '四郎', '五郎', '六郎', '七郎', '八郎', '九郎', '十郎', '小太郎',
    '慎太郎', '龍太郎', '健太郎', '洋一郎', '英一郎', '圭一郎', '純一郎', '真一郎', '康太郎', '幸太郎',
    '達也', '哲也', '雅也', '智也', '裕也', '貴也', '直也', '卓也', '将也', '弘也',
    '康平', '俊平', '雄平', '陽平', '翔平', '圭介', '祐介', '健介', '雄介', '慎介',
    '雄一', '浩一', '健一', '隆一', '康一', '洋一', '修一', '淳一', '俊一', '誠一',
    '悠真', '陽翔', '大和', '颯真', '蒼空', '結人', '湊人', '陽斗', '葵', '蓮斗',
    '颯', '奏', '晴', '陸斗', '蒼太', '悠', '琉', '響', '海', '空',
    '颯斗', '蒼斗', '結斗', '陸人', '湊斗', '陽太', '大和', '悠人', '優斗', '奏太',
    
    // 女性名字 (约150个)
    '花子', '美咲', '桜', '結衣', '七海', '陽菜', '愛', '結菜', '美月', '莉子',
    '陽葵', '芽依', '結月', '凛', '杏', '咲良', '葵', 'さくら', '紬', '澪',
    '心春', '結愛', '心陽', '莉央', '心結', '彩葉', '琴音', '陽菜乃', '美桜', '柚希',
    '優奈', '愛美', '彩', '麻衣', '真由', '舞', '瞳', '美穂', '香織', '千尋',
    '明日香', '亜美', '加奈', '沙織', '里奈', '美紀', '恵', '由美', '直美', '久美子',
    '陽子', '京子', '和子', '幸子', '文子', '弘子', '栄子', '節子', '美智子', '千代子',
    '初音', '静香', '美奈', '理恵', '智子', '裕子', '洋子', '敬子', '悦子', '貴子',
    '真理', '純子', '郁子', '典子', '綾子', '良子', '百合子', '雅子', '富子', '春子',
    '美由紀', '真由美', '美智代', '千恵子', '由利子', '加代子', '久美子', '早苗', '弥生', '薫',
    '梓', '楓', '雫', '遥', '詩', '栞', '椿', '菫', '蘭', '茜',
    '彩花', '美羽', '愛莉', '優衣', '美結', '彩乃', '萌', '愛菜', '愛梨', '愛佳',
    '美優', '美織', '美咲', '美緒', '美里', '美波', '美帆', '美空', '美海', '美琴',
    '結', '絆', '希', '望', '光', '華', '雪', '星', '月', '空',
    '心', '愛', '想', '夢', '幸', '和', '優', '美', '咲', '花',
    'あかり', 'ひなた', 'ゆい', 'ゆあ', 'りお', 'あおい', 'めい', 'さな', 'つむぎ', 'はな'
  ],
  
  lastNames: [
    // 约200个姓氏
    '佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '山本', '中村', '小林', '加藤',
    '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水',
    '山崎', '森', '池田', '橋本', '阿部', '石川', '前田', '藤田', '後藤', '長谷川',
    '村上', '近藤', '石井', '遠藤', '青木', '坂本', '福田', '西村', '太田', '三浦',
    '岡田', '中島', '藤井', '原田', '藤原', '岡本', '松田', '竹内', '中川', '金子',
    
    '中野', '上田', '森田', '原', '柴田', '谷口', '酒井', '工藤', '横山', '宮崎',
    '内田', '高木', '安藤', '田村', '西田', '大野', '杉山', '今井', '河野', '岩崎',
    '上野', '小川', '野口', '武田', '松井', '木下', '野村', '菅原', '佐野', '千葉',
    '大塚', '増田', '小野', '久保', '渡部', '平野', '山下', '石田', '吉川', '川口',
    '岩田', '中山', '小島', '平田', '古川', '市川', '沢田', '服部', '柳', '永井',
    
    '関', '新井', '萩原', '栗原', '秋山', '五十嵐', '高田', '北村', '内藤', '本田',
    '島田', '川崎', '須藤', '浜田', '松尾', '水野', '大西', '松浦', '望月', '小山',
    '杉本', '宮本', '岡崎', '川村', '岩本', '菊地', '荒木', '矢野', '本間', '丸山',
    '飯田', '片山', '川上', '尾崎', '菊池', '富田', '早川', '和田', '村田', '宮下',
    
    '小松', '今村', '諸橋', '細川', '池上', '熊谷', '成田', '黒田', '木下', '大島',
    '金田', '神田', '新田', '土屋', '長野', '三木', '桜井', '石原', '塚本', '三宅',
    '大久保', '高野', '徳永', '福島', '松永', '水谷', '堀', '堀内', '福井', '辻',
    '森本', '川田', '岸', '笹川', '田口', '藤村', '馬場', '星野', '村山', '矢島',
    
    '相原', '浅野', '天野', '新垣', '有田', '飯島', '石橋', '上原', '梅田', '江口',
    '大石', '岡村', '小野寺', '笠原', '勝又', '川端', '菊田', '岸本', '北川', '久保田'
  ]
},
KR: {
  firstNames: [
    // 男性名字 (约150个)
    '민준', '서준', '예준', '도윤', '시우', '주원', '하준', '지호', '준서', '건우',
    '현우', '선우', '연우', '유준', '정우', '승우', '승현', '시윤', '준혁', '은우',
    '지훈', '우진', '승민', '시후', '지환', '준영', '동현', '재윤', '태양', '민재',
    '수호', '태민', '재현', '민성', '태우', '현서', '유찬', '시현', '승준', '윤호',
    '준호', '성민', '재훈', '동욱', '상현', '진우', '형준', '경민', '태현', '원준',
    '영수', '철수', '상철', '영호', '광수', '명수', '석진', '진호', '성수', '병철',
    '영재', '종현', '민수', '재석', '동철', '상민', '경수', '현수', '형우', '정민',
    '대현', '성훈', '재호', '동희', '영준', '민호', '승기', '정훈', '태준', '원석',
    '세준', '지완', '은찬', '도현', '시원', '예성', '규현', '려욱', '동해', '희철',
    '강민', '준희', '성준', '현준', '민규', '승호', '재민', '윤성', '태희', '준우',
    
    '현민', '도훈', '시환', '우빈', '태윤', '지안', '민기', '성현', '준성', '윤우',
    '시헌', '준수', '재우', '동민', '건희', '민우', '상우', '정현', '태형', '원우',
    '지성', '승찬', '현빈', '시후', '도경', '재영', '민석', '성빈', '준환', '윤재',
    '태경', '현종', '동건', '시온', '우성', '준기', '재현', '민혁', '성호', '태윤',
    '지원', '승원', '현승', '시준', '도엽', '재민', '민찬', '성우', '준형', '윤호',
    
    // 女性名字 (约150个)
    '서연', '서윤', '지우', '서현', '민서', '하은', '하윤', '윤서', '지유', '지민',
    '수빈', '예은', '서영', '수아', '채원', '지아', '다은', '지윤', '예린', '서진',
    '채영', '예진', '민지', '수현', '은서', '소율', '예나', '혜원', '소연', '유진',
    '예서', '유나', '하린', '서우', '지수', '가은', '소은', '서은', '예원', '다인',
    '민주', '수연', '은지', '혜진', '지영', '유리', '나영', '수정', '민경', '은혜',
    '정은', '미나', '수지', '지현', '혜정', '은영', '미영', '정미', '영희', '순자',
    '지은', '하나', '수민', '윤지', '다영', '채은', '예지', '서희', '민아', '유경',
    '소희', '미경', '정희', '경미', '영미', '혜숙', '정숙', '명숙', '순희', '경숙',
    '현정', '은주', '경은', '미숙', '영자', '정자', '순이', '영순', '정순', '명자',
    '지혜', '미선', '연주', '선영', '보라', '나라', '새롬', '이슬', '하늘', '별',
    
    '아름', '예쁨', '사랑', '기쁨', '바다', '가람', '샛별', '나래', '온유', '슬기',
    '지애', '수희', '민영', '은비', '채린', '서아', '하영', '윤아', '다현', '지예',
    '수인', '예빈', '서율', '민주', '하빈', '윤하', '지온', '다빈', '서하', '민재',
    '유하', '채윤', '서연', '민지', '하율', '윤채', '지안', '다온', '서윤', '민하',
    '유진', '채아', '서영', '민서', '하연', '윤서', '지원', '다솜', '서인', '민채',
    '유빈', '채은', '서율', '민경', '하윤', '윤지', '지현', '다은', '서하', '민서',
    '유경', '채림', '서진', '민정', '하은', '윤하', '지우', '다혜', '서아', '민지',
    '유진', '채연', '서현', '민아', '하나', '윤아', '지혜', '다인', '서윤', '민주',
    '유나', '채희', '서영', '민서', '하린', '윤서', '지민', '다연', '서연', '민아',
    '유리', '채윤', '서진', '민지', '하은', '윤하', '지수', '다은', '서율', '민영'
  ],
  
  lastNames: [
    // 约150个姓氏
    '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
    '한', '오', '서', '신', '권', '황', '안', '송', '류', '전',
    '홍', '고', '문', '손', '양', '배', '백', '허', '남', '심',
    '노', '하', '곽', '성', '차', '주', '우', '구', '나', '전',
    '민', '진', '유', '석', '반', '방', '지', '엄', '변', '여',
    
    '추', '도', '소', '탁', '연', '서', '설', '길', '천', '은',
    '방', '표', '명', '기', '금', '피', '옥', '모', '편', '두',
    '채', '형', '예', '봉', '원', '국', '음', '빈', '감', '마',
    '공', '좌', '부', '복', '견', '맹', '당', '사', '동', '제',
    
    '강', '경', '궁', '기', '남궁', '독고', '동방', '망절', '무', '목',
    '사공', '선우', '설', '소', '소봉', '손', '송', '순', '승', '시',
    '신', '어', '엄', '여', '연', '염', '오', '옥', '용', '우',
    '원', '위', '유', '윤', '은', '이', '인', '임', '장', '전',
    
    '정', '제', '제갈', '조', '종', '좌', '주', '증', '지', '진',
    '차', '창', '채', '천', '초', '최', '추', '탁', '태', '판',
    '팽', '평', '피', '하', '학', '한', '함', '해', '허', '현'
  ]
},
VN: {
  firstNames: [
    // 男性名字 (约150个)
    'Minh', 'Khang', 'Phuc', 'Tuan', 'Hung', 'Quan', 'Huy', 'Dung', 'Khanh', 'Bao',
    'Anh', 'Long', 'Hai', 'Nam', 'Duc', 'Dat', 'Khoi', 'Thanh', 'Thinh', 'Trung',
    'Hoang', 'Cuong', 'Hieu', 'Tai', 'Thang', 'Phong', 'Son', 'Vinh', 'Tien', 'Quang',
    'Tung', 'Kien', 'Tan', 'Loc', 'Truong', 'Khoa', 'Hao', 'Nhat', 'Quoc', 'Thai',
    'Ngoc', 'Gia', 'Duy', 'Trieu', 'Viet', 'Phat', 'Manh', 'Binh', 'Lam', 'Duong',
    'Dat', 'Khiem', 'Nhan', 'Nghia', 'Phong', 'Quyen', 'Tam', 'Thien', 'Tin', 'Toan',
    'Tri', 'Trong', 'Tu', 'Tuan', 'Vu', 'Xuan', 'Yen', 'Hoai', 'Hieu', 'Hung',
    'Kiet', 'Luan', 'Minh', 'Nghi', 'Nhan', 'Phuoc', 'Quang', 'Sang', 'Tai', 'Tam',
    'Tan', 'Thanh', 'Thao', 'Tho', 'Thuan', 'Tien', 'Toan', 'Trach', 'Trai', 'Trang',
    'Trinh', 'Truong', 'Tu', 'Tuan', 'Tung', 'Tuyen', 'Uy', 'Van', 'Vinh', 'Vu',
    'Bich', 'Cao', 'Chau', 'Chinh', 'Cong', 'Dan', 'Danh', 'Dao', 'Diep', 'Dinh',
    'Do', 'Dong', 'Duyen', 'Giang', 'Hai', 'Han', 'Hanh', 'Hieu', 'Hoan', 'Hong',
    'Hue', 'Hung', 'Huong', 'Huu', 'Ky', 'Lien', 'Linh', 'Luong', 'Ly', 'Mai',
    'Man', 'Minh', 'My', 'Nam', 'Nghi', 'Ngo', 'Nhan', 'Nhung', 'Phan', 'Phong',
    'Phu', 'Quang', 'Que', 'Quy', 'Son', 'Tai', 'Tam', 'Tan', 'Tang', 'Thanh',
    
    // 女性名字 (约150个)
    'Linh', 'Huong', 'Trang', 'Hoa', 'Anh', 'Ngoc', 'Phuong', 'Mai', 'Lan', 'Thu',
    'Ha', 'Yen', 'My', 'Thao', 'Thuy', 'Quynh', 'Nhi', 'Giang', 'Tien', 'Trinh',
    'Khanh', 'Diem', 'Ngan', 'Tuyet', 'Chau', 'Hang', 'Uyen', 'Tam', 'Bich', 'Hanh',
    'Hien', 'Kim', 'Ly', 'Nhung', 'Phuong', 'Thuy', 'Tram', 'Van', 'Xuan', 'Vy',
    'An', 'Bao', 'Chi', 'Dan', 'Dao', 'Dieu', 'Duyen', 'Ha', 'Han', 'Hue',
    'Hong', 'Kieu', 'Lien', 'Lam', 'Minh', 'Nga', 'Nhi', 'Nu', 'Phat', 'Quyen',
    'San', 'Suong', 'Tam', 'Tan', 'Thanh', 'Thien', 'Thoa', 'Tien', 'Trang', 'Trinh',
    'Tu', 'Tuong', 'Tuyen', 'Uyen', 'Van', 'Vi', 'Xuan', 'Yen', 'Yen', 'Yen',
    'Cam', 'Cuc', 'Dao', 'Dung', 'Giang', 'Hien', 'Hoa', 'Hue', 'Huong', 'Khanh',
    'Khue', 'Kim', 'Lan', 'Le', 'Lien', 'Lien', 'Linh', 'Loan', 'Ly', 'Mai',
    'Mong', 'My', 'Nga', 'Ngan', 'Nghi', 'Ngo', 'Nhung', 'Nu', 'Oanh', 'Phuong',
    'Quyen', 'Quy', 'Quynh', 'San', 'Sen', 'Suong', 'Tam', 'Thao', 'Thi', 'Thien',
    'Tho', 'Thuan', 'Thuy', 'Thuy', 'Tien', 'Tram', 'Trang', 'Trinh', 'Tu', 'Tuyet',
    'Tuyen', 'Uyen', 'Van', 'Vang', 'Vi', 'Vy', 'Xiem', 'Xuan', 'Xuan', 'Yen',
    'Ai', 'Bao', 'Bay', 'Bich', 'Cai', 'Cam', 'Chan', 'Chau', 'Chi', 'Cuc',
    'Dao', 'Diem', 'Diep', 'Dinh', 'Diu', 'Doan', 'Don', 'Duong', 'Duyen', 'Gai'
  ],
  
  lastNames: [
    // 姓氏 + 中间名组合 (约180个)
    // 主要姓氏
    'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Phan', 'Vu', 'Vo', 'Dang', 'Bui',
    'Do', 'Ho', 'Ngo', 'Duong', 'Ly', 'Truong', 'Dinh', 'Cao', 'Lam', 'Trinh',
    'Luong', 'Ha', 'Huynh', 'Dong', 'Dao', 'Chu', 'Mai', 'Tang', 'To', 'La',
    'Tong', 'Quach', 'Nghiem', 'Bien', 'Ong', 'Mac', 'Khong', 'Vien', 'Giang', 'Thach',
    
    // 常见的全名组合 (姓 + 中间名)
    'Nguyen Van', 'Nguyen Thi', 'Nguyen Thanh', 'Nguyen Minh', 'Nguyen Duc', 'Nguyen Hoang', 'Nguyen Hong', 'Nguyen Kim',
    'Tran Van', 'Tran Thi', 'Tran Thanh', 'Tran Minh', 'Tran Duc', 'Tran Hoang', 'Tran Hong', 'Tran Kim',
    'Le Van', 'Le Thi', 'Le Thanh', 'Le Minh', 'Le Duc', 'Le Hoang', 'Le Hong', 'Le Kim',
    'Pham Van', 'Pham Thi', 'Pham Thanh', 'Pham Minh', 'Pham Duc', 'Pham Hoang', 'Pham Hong', 'Pham Kim',
    'Hoang Van', 'Hoang Thi', 'Hoang Thanh', 'Hoang Minh', 'Hoang Duc', 'Hoang Hoang', 'Hoang Hong', 'Hoang Kim',
    
    'Phan Van', 'Phan Thi', 'Phan Thanh', 'Phan Minh', 'Vo Van', 'Vo Thi', 'Vo Thanh', 'Vo Minh',
    'Dang Van', 'Dang Thi', 'Dang Thanh', 'Dang Minh', 'Bui Van', 'Bui Thi', 'Bui Thanh', 'Bui Minh',
    'Do Van', 'Do Thi', 'Do Thanh', 'Do Minh', 'Ho Van', 'Ho Thi', 'Ho Thanh', 'Ho Minh',
    'Ngo Van', 'Ngo Thi', 'Ngo Thanh', 'Ngo Minh', 'Duong Van', 'Duong Thi', 'Duong Thanh', 'Duong Minh',
    'Ly Van', 'Ly Thi', 'Ly Thanh', 'Ly Minh', 'Truong Van', 'Truong Thi', 'Truong Thanh', 'Truong Minh',
    
    'Dinh Van', 'Dinh Thi', 'Cao Van', 'Cao Thi', 'Lam Van', 'Lam Thi', 'Trinh Van', 'Trinh Thi',
    'Luong Van', 'Luong Thi', 'Ha Van', 'Ha Thi', 'Huynh Van', 'Huynh Thi', 'Dong Van', 'Dong Thi',
    'Dao Van', 'Dao Thi', 'Chu Van', 'Chu Thi', 'Mai Van', 'Mai Thi', 'Tang Van', 'Tang Thi',
    'Vu Ngoc', 'Vu Anh', 'Vo Ngoc', 'Vo Anh', 'Phan Ngoc', 'Phan Anh', 'Hoang Ngoc', 'Hoang Anh'
  ]
},
TH: {
  firstNames: [
    // 男性名字
    'Somchai', 'Somsak', 'Surasak', 'Prasit', 'Wichai', 'Sompong', 'Narong', 'Pradit', 'Suchart', 'Thawee',
    'Anurak', 'Wuttipong', 'Preecha', 'Chatchai', 'Kittipong', 'Nattapong', 'Pornthep', 'Rattapong', 'Sarawut', 'Thanakorn',
    'Akara', 'Bancha', 'Chalermpol', 'Danai', 'Ekapol', 'Jirawat', 'Kamol', 'Manop', 'Niphon', 'Pichai',
    'Rawee', 'Sanan', 'Thaksin', 'Udom', 'Vichit', 'Weerachai', 'Yutthana', 'Adisorn', 'Boonsong', 'Chalerm',
    'Decha', 'Ekachai', 'Fasai', 'Gamon', 'Jakrapong', 'Kritsada', 'Lertchai', 'Manit', 'Narongsak', 'Paiboon',
    
    // 女性名字
    'Somying', 'Siriporn', 'Saowanee', 'Sumalee', 'Siriwan', 'Pensri', 'Wilaiwan', 'Pimchanok', 'Rattana', 'Suchada',
    'Amporn', 'Busaba', 'Chanida', 'Duangjai', 'Apinya', 'Kanokwan', 'Natthida', 'Parichat', 'Rungnapa', 'Somjit',
    'Apiradee', 'Benjamas', 'Chutima', 'Daranee', 'Achara', 'Kulthida', 'Napaporn', 'Pattamaporn', 'Rungrat', 'Somrudee',
    'Anchalee', 'Boonsri', 'Chanya', 'Duangduen', 'Jintana', 'Kanya', 'Malai', 'Nittaya', 'Panida', 'Ratana',
    'Anong', 'Bussara', 'Chawee', 'Dao', 'Jirapa', 'Kulap', 'Maliwan', 'Nonglak', 'Pranee', 'Saowalak',
    'Aphinya', 'Chanokporn', 'Dararat', 'Jiraporn', 'Lamai', 'Narisa', 'Porntip', 'Sukanya', 'Wanida', 'Yupa'
  ],
  
  lastNames: [
    'Siriwat', 'Chaiyaporn', 'Rattanakorn', 'Phuangphiphat', 'Thongchai', 'Jaturong', 'Komsawat', 'Nithipong',
    'Pattanasin', 'Raksanti', 'Suwannarat', 'Thanawat', 'Wongsuwan', 'Apiraksakul', 'Boonyarat', 'Chaiyanon',
    'Anantachai', 'Boonmee', 'Cherdchai', 'Dechwatana', 'Ekasingh', 'Fuangfoo', 'Hongthong', 'Isarangkul',
    'Jaroensuk', 'Kanchanaburi', 'Lertprasert', 'Monthienvichienchai', 'Ngamcharoen', 'Ongsakul', 'Panyawiwat', 'Rujirawat',
    'Saengchai', 'Tantiwong', 'Udomsak', 'Vajarodaya', 'Wattanaporn', 'Yodprasit', 'Arthayukti', 'Benjatikul',
    'Chulasai', 'Danvirutai', 'Eksomtramage', 'Fuengfusakul', 'Hongladarom', 'Isaraphakdee', 'Jariyapong', 'Kitiyakara',
    'Lertsithichai', 'Maleenont', 'Nimmanhemin', 'Osathanugrah', 'Prasertsuk', 'Rajatapiti', 'Sanitwong', 'Techapaibul',
    'Uamchanpong', 'Varodompun', 'Wattanakul', 'Yoovidhya', 'Ativanichpong', 'Bunnag', 'Cholvicharn', 'Devakula',
    'Ekamai', 'Fungladda', 'Hematulin', 'Intarasuwan', 'Jitpleecheep', 'Kittirattanapaiboon', 'Limpanichkul', 'Meechoke',
    'Niyomsilpa', 'Owatwaraporn', 'Phongpaichit', 'Rangsimaporn', 'Sindhvananda', 'Treerotchananont', 'Uamsutorn', 'Vejjajiva'
  ]
},
IN: {
  firstNames: [
    // 北印度男性名字
    'Rahul', 'Amit', 'Raj', 'Rohan', 'Arjun', 'Vikram', 'Karan', 'Aditya', 'Ravi', 'Suresh',
    'Abhishek', 'Akash', 'Aman', 'Ankit', 'Ashish', 'Deepak', 'Gaurav', 'Harsh', 'Kunal', 'Manish',
    'Mohit', 'Nikhil', 'Pranav', 'Sanjay', 'Varun', 'Vishal', 'Yash', 'Ajay', 'Naveen', 'Ramesh',
    'Sandeep', 'Sachin', 'Vinod', 'Manoj', 'Rajesh', 'Dinesh', 'Hemant', 'Pankaj', 'Praveen', 'Santosh',
    
    // 南印度男性名字
    'Krishna', 'Venkat', 'Srinivas', 'Murali', 'Balaji', 'Ramana', 'Karthik', 'Prasad', 'Sunil', 'Vijay',
    'Anand', 'Arun', 'Ganesh', 'Mahesh', 'Naresh', 'Rajendra', 'Bhaskar', 'Chandra', 'Mohan', 'Prakash',
    
    // 北印度女性名字
    'Priya', 'Anjali', 'Sneha', 'Pooja', 'Kavita', 'Neha', 'Ritu', 'Sunita', 'Anita', 'Preeti',
    'Aarti', 'Divya', 'Jyoti', 'Komal', 'Megha', 'Nisha', 'Payal', 'Riya', 'Simran', 'Swati',
    'Archana', 'Bharti', 'Deepika', 'Geeta', 'Kiran', 'Manju', 'Rekha', 'Sapna', 'Usha', 'Vandana',
    'Alka', 'Babita', 'Charu', 'Kamini', 'Madhuri', 'Nidhi', 'Poonam', 'Rashmi', 'Seema', 'Tanvi',
    
    // 南印度女性名字
    'Lakshmi', 'Deepa', 'Meera', 'Saranya', 'Kavitha', 'Radha', 'Suma', 'Vani', 'Padma', 'Geetha',
    'Savita', 'Lalitha', 'Kamala', 'Jayashree', 'Asha', 'Shanta', 'Usha', 'Mala', 'Sujata', 'Renuka',
    
    // 现代化/年轻一代名字
    'Aarav', 'Advait', 'Dhruv', 'Ishaan', 'Kabir', 'Reyansh', 'Vihaan', 'Ayaan', 'Arnav', 'Atharv',
    'Aadhya', 'Ananya', 'Diya', 'Isha', 'Myra', 'Saanvi', 'Anika', 'Navya', 'Riya', 'Tara'
  ],
  
  lastNames: [
    // 常见北印度姓氏
    'Kumar', 'Singh', 'Sharma', 'Patel', 'Gupta', 'Verma', 'Reddy', 'Rao', 'Joshi', 'Mehta',
    'Desai', 'Shah', 'Kapoor', 'Chopra', 'Malhotra', 'Agarwal', 'Bansal', 'Goyal', 'Jain', 'Khanna',
    
    // 更多北印度姓氏
    'Arora', 'Bhatia', 'Chawla', 'Dutta', 'Ganguly', 'Iyer', 'Kashyap', 'Mathur', 'Nair', 'Pandey',
    'Rana', 'Saxena', 'Tandon', 'Varma', 'Yadav', 'Bose', 'Das', 'Ghosh', 'Mishra', 'Tripathi',
    'Ahuja', 'Bajaj', 'Chadha', 'Dhawan', 'Goel', 'Kapur', 'Mittal', 'Sachdeva', 'Sethi', 'Sood',
    
    // 南印度姓氏
    'Krishnan', 'Narayanan', 'Subramaniam', 'Venkatesh', 'Balasubramanian', 'Ramakrishnan', 'Sundaram', 'Swaminathan',
    'Pillai', 'Menon', 'Nambiar', 'Warrier', 'Panicker', 'Mudaliar', 'Naidu', 'Chetty', 'Gowda', 'Hegde',
    'Kulkarni', 'Deshpande', 'Patil', 'Pawar', 'Shinde', 'Jadhav', 'Thakur', 'Rathore', 'Chauhan', 'Ranawat',
    
    // 商业社区姓氏
    'Agarwal', 'Aggarwal', 'Singhal', 'Garg', 'Mittal', 'Gupta', 'Jain', 'Bansal', 'Khandelwal', 'Maheshwari',
    'Modi', 'Ambani', 'Birla', 'Tata', 'Jindal', 'Adani', 'Bajaj', 'Godrej', 'Mahindra', 'Oberoi',
    
    // 其他地区姓氏
    'Chatterjee', 'Mukherjee', 'Banerjee', 'Bhattacharya', 'Sengupta', 'Chakraborty', 'Roy', 'Sarkar', 'Biswas', 'Dey',
    'Sinha', 'Khan', 'Ali', 'Ahmed', 'Hussain', 'Malik', 'Ansari', 'Sheikh', 'Qureshi', 'Rizvi',
    
    // 专业/现代姓氏
    'Bhatt', 'Dixit', 'Dubey', 'Jha', 'Kaul', 'Raina', 'Sapru', 'Tickoo', 'Wanchoo', 'Bhan',
    'Nanda', 'Suri', 'Trehan', 'Vohra', 'Wadhwa', 'Anand', 'Bedi', 'Chhaya', 'Dhingra', 'Kohli'
  ]
},
// 其他国家使用美国名字作为后备
CA: {
  firstNames: [
    // 英语传统名字 - 男性
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Christopher', 'Daniel', 'Matthew', 'Andrew', 'Joshua', 'Kevin', 'Brian', 'George', 'Edward', 'Steven',
    'Kenneth', 'Anthony', 'Mark', 'Donald', 'Paul', 'Ryan', 'Jason', 'Justin', 'Brandon', 'Adam',
    'Nicholas', 'Tyler', 'Alexander', 'Benjamin', 'Nathan', 'Zachary', 'Connor', 'Dylan', 'Ethan', 'Jacob',
    
    // 英语传统名字 - 女性
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Nancy', 'Lisa', 'Margaret', 'Betty', 'Sandra', 'Ashley', 'Dorothy', 'Kimberly', 'Emily', 'Donna',
    'Michelle', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Laura', 'Sharon', 'Cynthia',
    'Angela', 'Amy', 'Anna', 'Samantha', 'Katherine', 'Nicole', 'Rachel', 'Emma', 'Olivia', 'Hannah',
    
    // 法语名字（魁北克）- 男性
    'Jean', 'Pierre', 'Michel', 'André', 'Marc', 'Jacques', 'Philippe', 'François', 'Luc', 'Alain',
    'Martin', 'Claude', 'Daniel', 'Gilles', 'Louis', 'Patrick', 'Yves', 'Laurent', 'Olivier', 'Maxime',
    
    // 法语名字（魁北克）- 女性
    'Marie', 'Chantal', 'Isabelle', 'Nathalie', 'Sophie', 'Julie', 'Sylvie', 'Catherine', 'Monique', 'Nicole',
    'Louise', 'Françoise', 'Céline', 'Dominique', 'Valérie', 'Hélène', 'Brigitte', 'Véronique', 'Amélie', 'Élise',
    
    // 现代/多元文化名字
    'Liam', 'Noah', 'Lucas', 'Mason', 'Logan', 'Aria', 'Mia', 'Ava', 'Sophia', 'Charlotte',
    'Aiden', 'Carter', 'Owen', 'Ella', 'Grace', 'Chloe', 'Zoe', 'Lily', 'Maya', 'Ruby'
  ],
  
  lastNames: [
    // 英语常见姓氏
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor',
    'Thomas', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Hall', 'Allen', 'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams',
    'Nelson', 'Carter', 'Mitchell', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards',
    'Collins', 'Stewart', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey',
    
    // 苏格兰/爱尔兰姓氏（加拿大常见）
    'MacDonald', 'McDonald', 'MacLeod', 'Fraser', 'Cameron', 'MacKenzie', 'Ross', 'MacKay', 'Murray', 'Grant',
    'Reid', 'Ferguson', 'Kennedy', 'Robertson', 'Graham', 'Sullivan', 'Kelly', 'Ryan', 'Patterson', 'Wallace',
    
    // 法语姓氏（魁北克）
    'Tremblay', 'Gagnon', 'Roy', 'Côté', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie', 'Fortin', 'Gagné',
    'Ouellet', 'Pelletier', 'Bélanger', 'Lévesque', 'Bergeron', 'Leblanc', 'Paquette', 'Girard', 'Simard', 'Boucher',
    'Lemieux', 'Fournier', 'Dupont', 'Lapointe', 'Dufour', 'Beaulieu', 'Caron', 'Lefebvre', 'Poirier', 'Martin',
    
    // 乌克兰姓氏（草原省份常见）
    'Kowalski', 'Novak', 'Kovalenko', 'Shevchenko', 'Boyko', 'Tkachuk', 'Melnyk', 'Pavlenko', 'Chorney', 'Sawchuk',
    
    // 意大利姓氏
    'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Bruno', 'Marino', 'Greco',
    
    // 华裔姓氏（拼音）
    'Li', 'Wang', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou',
    'Xu', 'Sun', 'Ma', 'Zhu', 'Hu', 'Guo', 'He', 'Lin', 'Luo', 'Zheng',
    
    // 南亚姓氏
    'Singh', 'Patel', 'Kumar', 'Sharma', 'Khan', 'Kaur', 'Gill', 'Sandhu', 'Dhillon', 'Brar',
    
    // 其他欧洲姓氏
    'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Koch',
    'Petrov', 'Ivanov', 'Popov', 'Sokolov', 'Kuznetsov', 'Volkov', 'Smirnov', 'Vasiliev', 'Fedorov', 'Mikhailov'
  ]
},
AU: {
  firstNames: [
    // 男性名字 (约80个)
    'James', 'Oliver', 'Jack', 'William', 'Noah', 'Thomas', 'Henry', 'Lucas', 
    'Liam', 'Alexander', 'Mason', 'Ethan', 'Samuel', 'Benjamin', 'Jacob', 
    'Charlie', 'Harry', 'Oscar', 'Max', 'Archie', 'Leo', 'Joshua', 'Isaac',
    'Ryan', 'Daniel', 'Matthew', 'Nathan', 'Lachlan', 'Connor', 'Dylan',
    'Sebastian', 'Harrison', 'Cooper', 'Patrick', 'Logan', 'Angus', 'Jayden',
    'Tyler', 'Zachary', 'Jackson', 'Hunter', 'Caleb', 'Blake', 'Mitchell',
    'Cameron', 'Nicholas', 'Anthony', 'Andrew', 'Joseph', 'Aiden', 'Luke',
    'Flynn', 'Xavier', 'Ashton', 'Jordan Jordan', 'Kai', 'Riley', 'Declan',
    'Finn', 'Elijah', 'Hudson', 'Austin', 'Felix', 'Theo', 'Louis', 'Jasper',
    'Aaron', 'Callum', 'Elliott', 'Hamish', 'Ryder', 'Spencer', 'Toby',
    'Marcus', 'Hayden', 'Rhys', 'Fletcher', 'Lewis', 'Seth', 'Miles',
    
    // 女性名字 (约80个)
    'Olivia', 'Charlotte', 'Amelia', 'Isla', 'Mia', 'Ava', 'Grace', 'Sophia',
    'Chloe', 'Emily', 'Sophie', 'Ella', 'Ruby', 'Zoe', 'Lucy', 'Lily',
    'Emma', 'Isabella', 'Harper', 'Matilda', 'Zara', 'Evie', 'Sienna',
    'Hannah', 'Jessica', 'Sarah', 'Amy', 'Lauren', 'Caitlin', 'Madison',
    'Rebecca', 'Rachel', 'Alice', 'Georgia', 'Holly', 'Jasmine', 'Katie',
    'Scarlett', 'Abigail', 'Piper', 'Ivy', 'Willow', 'Violet', 'Layla',
    'Aria', 'Mackenzie', 'Poppy', 'Annabelle', 'Imogen', 'Maya', 'Audrey',
    'Claire', 'Heidi', 'Summer', 'Paige', 'Maddison', 'Nicole', 'Brooke',
    'Taylor', 'Alexis', 'Hayley', 'Ellie', 'Freya', 'Lola', 'Eva', 'Indiana',
    'Stella', 'Luna', 'Rose', 'Isabelle', 'Millicent', 'Penelope', 'Amelie',
    'Sabrina', 'Tessa', 'Aurora', 'Gemma', 'Bridget', 'Kiara', 'Phoebe'
  ],
  
  lastNames: [
    // 约120个姓氏
    'Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson',
    'White', 'Martin', 'Anderson', 'Thompson', 'Nguyen', 'Thomas', 'Walker',
    'Harris', 'Lee', 'Ryan', 'Robinson', 'Kelly', 'King', 'Davis', 'Wright',
    'Evans', 'Roberts', 'Green', 'Hall', 'Wood', 'Jackson', 'Clarke', 'Patel',
    'Campbell', 'Stewart', 'Moore', 'Morrison', 'Cooper', 'Reed', 'Bailey',
    'Bell', 'Murphy', 'Edwards', 'Cook', 'Morgan', 'Hughes', 'Watson', 'Mitchell',
    'Young', 'O\'Brien', 'McDonald', 'Scott', 'Henderson', 'Singh', 'Turner',
    'Hill', 'Armstrong', 'Ross', 'Murray', 'Reid', 'Kennedy', 'Grant', 'Dixon',
    
    'Ferguson', 'Palmer', 'Ellis', 'Chapman', 'Barnes', 'Hunt', 'Stevens',
    'Mason', 'Knight', 'Fox', 'Mills', 'Simpson', 'Russell', 'Sutherland',
    'Wallace', 'Gordon', 'Gray', 'Richards', 'Price', 'Robertson', 'Hunt',
    'Fisher', 'Graham', 'Collins', 'Harvey', 'Pearson', 'Bennett', 'Spencer',
    'Gibson', 'Chapman', 'Powell', 'Riley', 'Fitzgerald', 'Barrett', 'Butler',
    'Coleman', 'Barnes', 'Duncan', 'Ferguson', 'Harding', 'Griffin', 'Lane',
    
    'Matthews', 'Bradley', 'Hudson', 'Newton', 'Bishop', 'Wells', 'Curtis',
    'Hayes', 'Walsh', 'Fletcher', 'Sullivan', 'Webb', 'Sanders', 'Fuller',
    'McCarthy', 'Lawson', 'Franklin', 'Berry', 'Tucker', 'Chambers', 'Holland',
    'Woods', 'Burns', 'Boyd', 'Shaw', 'Stone', 'Black', 'Pierce', 'Jennings',
    'Crawford', 'Austin', 'Carr', 'Lynch', 'Porter', 'Warner', 'Watts', 'Gardner',
    'Lawrence', 'McKenzie', 'Chambers', 'Stanley', 'Harrison', 'Gilbert', 'Newman'
  ]
},
IT: {
  firstNames: [
    // 传统男性名字
    'Giuseppe', 'Giovanni', 'Antonio', 'Mario', 'Francesco', 'Luigi', 'Angelo', 'Vincenzo', 'Pietro', 'Salvatore',
    'Carlo', 'Franco', 'Domenico', 'Bruno', 'Roberto', 'Paolo', 'Michele', 'Sergio', 'Stefano', 'Marco',
    'Andrea', 'Maurizio', 'Massimo', 'Claudio', 'Fabio', 'Gianni', 'Alessandro', 'Luca', 'Davide', 'Simone',
    'Matteo', 'Riccardo', 'Daniele', 'Federico', 'Nicola', 'Emanuele', 'Filippo', 'Lorenzo', 'Giacomo', 'Tommaso',
    'Gabriele', 'Diego', 'Alessio', 'Christian', 'Enrico', 'Gianluca', 'Mauro', 'Raffaele', 'Giancarlo', 'Cristiano',
    
    // 传统女性名字
    'Maria', 'Anna', 'Giuseppina', 'Rosa', 'Angela', 'Giovanna', 'Teresa', 'Lucia', 'Carmela', 'Caterina',
    'Francesca', 'Antonietta', 'Concetta', 'Isabella', 'Giulia', 'Paola', 'Laura', 'Alessandra', 'Elisabetta', 'Valentina',
    'Chiara', 'Sara', 'Simona', 'Monica', 'Daniela', 'Silvia', 'Barbara', 'Claudia', 'Rita', 'Patrizia',
    'Stefania', 'Elena', 'Martina', 'Federica', 'Elisa', 'Serena', 'Cristina', 'Roberta', 'Gianna', 'Marisa',
    'Sofia', 'Alessia', 'Giorgia', 'Alice', 'Beatrice', 'Camilla', 'Arianna', 'Greta', 'Aurora', 'Giada',
    
    // 现代流行名字
    'Mattia', 'Leonardo', 'Edoardo', 'Pietro', 'Samuele', 'Niccolò', 'Emanuele', 'Antonio', 'Gaia', 'Emma',
    'Vittoria', 'Viola', 'Ludovica', 'Noemi', 'Rebecca', 'Benedetta', 'Bianca', 'Nicole', 'Luna', 'Mia',
    
    // 区域特色名字（南部）
    'Pasquale', 'Gennaro', 'Ciro', 'Rocco', 'Vito', 'Nunzio', 'Assunta', 'Filomena', 'Immacolata', 'Addolorata'
  ],
  
  lastNames: [
    // 最常见意大利姓氏
    'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
    'Bruno', 'Gallo', 'Conti', 'De Luca', 'Costa', 'Giordano', 'Mancini', 'Rizzo', 'Lombardi', 'Moretti',
    
    // 北部常见姓氏
    'Barbieri', 'Fontana', 'Santoro', 'Mariani', 'Rinaldi', 'Caruso', 'Ferrara', 'Galli', 'Martini', 'Leone',
    'Longo', 'Gentile', 'Martinelli', 'Vitale', 'Lombardo', 'Serra', 'Coppola', 'De Santis', 'D\'Angelo', 'Marchetti',
    
    // 中部常见姓氏
    'Benedetti', 'Giuliani', 'Ferretti', 'Marchi', 'Salvatori', 'Monti', 'Basili', 'Mancini', 'Valentini', 'Morelli',
    'Pellegrini', 'Bianchi', 'Sartori', 'Fabbri', 'Cattaneo', 'Sala', 'Villa', 'Negri', 'Bellini', 'Ferri',
    
    // 南部常见姓氏
    'De Rosa', 'Sorrentino', 'Bruno', 'D\'Amico', 'Napolitano', 'Palumbo', 'Caputo', 'Vitale', 'Leone', 'Iovino',
    'Fiore', 'Santoro', 'Messina', 'Silvestri', 'Greco', 'Ferraro', 'Gatti', 'Donati', 'Poli', 'Montanari',
    
    // 职业相关姓氏
    'Fabbro', 'Barbiere', 'Calzolaio', 'Sarto', 'Pescatore', 'Cacciatore', 'Pastore', 'Contadino', 'Fornari', 'Tessitore',
    
    // 地名相关姓氏
    'Veneziano', 'Fiorentino', 'Milanese', 'Bolognese', 'Modenese', 'Mantovano', 'Parmigiano', 'Toscano', 'Siciliano', 'Calabrese',
    
    // De/Di前缀姓氏
    'De Angelis', 'Di Pietro', 'De Benedetti', 'Di Marco', 'De Stefano', 'Di Giovanni', 'De Simone', 'Di Francesco',
    'De Luca', 'Di Carlo', 'De Martino', 'Di Paolo', 'De Laurentiis', 'Di Salvatore', 'De Vita', 'Di Matteo',
    
    // 贵族/历史姓氏
    'Visconti', 'Medici', 'Borgia', 'Sforza', 'Gonzaga', 'Este', 'Savoia', 'Colonna', 'Orsini', 'Farnese',
    
    // 其他常见姓氏
    'Amato', 'Barone', 'Bianco', 'Carbone', 'Castelli', 'Chiesa', 'Conte', 'Corti', 'Farina', 'Guerra',
    'Lanza', 'Mazza', 'Neri', 'Orlando', 'Pagano', 'Parisi', 'Piras', 'Pozzi', 'Riva', 'Ruggiero',
    'Sala', 'Sanna', 'Testa', 'Valente', 'Vidal', 'Benedetto', 'Bellomo', 'Capobianco', 'Damico', 'Fiorentino'
  ]
},
ES: {
  firstNames: [
    // 传统男性名字
    'Antonio', 'José', 'Manuel', 'Francisco', 'Juan', 'David', 'Javier', 'Daniel', 'Carlos', 'Miguel',
    'Alejandro', 'Pedro', 'Jesús', 'Rafael', 'Ángel', 'Pablo', 'Sergio', 'Fernando', 'Jorge', 'Luis',
    'Andrés', 'Álvaro', 'Diego', 'Adrián', 'Rubén', 'Raúl', 'Enrique', 'Alberto', 'Víctor', 'Ignacio',
    'Marcos', 'Iván', 'Roberto', 'Óscar', 'Ricardo', 'Ramón', 'Guillermo', 'Gonzalo', 'Felipe', 'Emilio',
    'Joaquín', 'Martín', 'Santiago', 'Rodrigo', 'Tomás', 'Cristian', 'Hugo', 'Mario', 'Nicolás', 'Mateo',
    
    // 复合男性名字
    'José Luis', 'Juan Carlos', 'José Antonio', 'José María', 'Miguel Ángel', 'Juan José', 'Francisco Javier',
    'José Manuel', 'Juan Antonio', 'Luis Miguel', 'Carlos Alberto', 'José Francisco', 'Juan Manuel',
    
    // 传统女性名字
    'María', 'Carmen', 'Ana', 'Isabel', 'Dolores', 'Pilar', 'Teresa', 'Rosa', 'Francisca', 'Antonia',
    'Josefa', 'Concepción', 'Mercedes', 'Cristina', 'Lucía', 'Marta', 'Elena', 'Patricia', 'Laura', 'Sara',
    'Paula', 'Raquel', 'Silvia', 'Beatriz', 'Natalia', 'Andrea', 'Eva', 'Rocío', 'Mónica', 'Susana',
    'Alicia', 'Nuria', 'Irene', 'Julia', 'Verónica', 'Sonia', 'Marina', 'Alba', 'Claudia', 'Sofía',
    'Carla', 'Daniela', 'Alejandra', 'Valeria', 'Adriana', 'Carolina', 'Gabriela', 'Victoria', 'Emma', 'Martina',
    
    // 复合女性名字
    'María Carmen', 'María José', 'Ana María', 'María Teresa', 'María Pilar', 'María Dolores', 'María Isabel',
    'María Luisa', 'Rosa María', 'María Ángeles', 'María Victoria', 'Ana Isabel', 'María Elena',
    
    // 现代流行名字
    'Lucas', 'Leo', 'Enzo', 'Gael', 'Bruno', 'Oliver', 'Izan', 'Marc', 'Thiago', 'Liam',
    'Emma', 'Lucía', 'Martina', 'María', 'Sofía', 'Julia', 'Paula', 'Valentina', 'Carla', 'Noa',
    
    // 地区特色名字（加泰罗尼亚、巴斯克等）
    'Jordi', 'Marc', 'Oriol', 'Pol', 'Xavier', 'Mikel', 'Iker', 'Unai', 'Aitor', 'Iñaki',
    'Montserrat', 'Mercè', 'Núria', 'Mireia', 'Aitana', 'Nerea', 'Leire', 'Ane', 'Maite', 'Irati'
  ],
  
  lastNames: [
    // 最常见西班牙姓氏
    'García', 'Fernández', 'González', 'Rodríguez', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín',
    'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez',
    
    // 常见patron姓氏（父名衍生）
    'Ramírez', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Serrano', 'Blanco', 'Suárez', 'Molina',
    'Morales', 'Ortega', 'Delgado', 'Castro', 'Ortiz', 'Rubio', 'Marín', 'Sanz', 'Iglesias', 'Núñez',
    
    // 地名相关姓氏
    'Navarro', 'Medina', 'Castillo', 'Vega', 'León', 'Herrera', 'Vargas', 'Mendoza', 'Cruz', 'Aguilar',
    'Pascual', 'Santana', 'Cortés', 'Guerrero', 'Lozano', 'Cano', 'Prieto', 'Méndez', 'Calvo', 'Gallego',
    
    // 职业/特征相关姓氏
    'Herrero', 'Hidalgo', 'Caballero', 'Pastor', 'Montero', 'Campos', 'Flores', 'Cabrera', 'Reyes', 'Carmona',
    'Soto', 'Fuentes', 'Carrasco', 'Peña', 'Rojas', 'Benítez', 'Salazar', 'Parra', 'Velasco', 'Moya',
    
    // 双姓氏（第二姓）
    'Fernández García', 'García López', 'López Martínez', 'Martínez Pérez', 'González Sánchez', 
    'Rodríguez González', 'Sánchez Fernández', 'Pérez Rodríguez', 'Gómez García', 'Martín López',
    
    // 贵族/历史姓氏
    'De la Cruz', 'De la Torre', 'De la Fuente', 'De los Santos', 'Del Río', 'Del Valle', 'De Castro',
    'De León', 'De Miguel', 'De la Rosa', 'Del Castillo', 'De Dios', 'De la Vega', 'Del Campo',
    
    // 加泰罗尼亚姓氏
    'Vila', 'Pujol', 'Soler', 'Font', 'Roca', 'Vidal', 'Ferrer', 'Bosch', 'Puig', 'Mas',
    'Serra', 'Camps', 'Blanch', 'Sala', 'Casas', 'Coll', 'Ribas', 'Pla', 'Farré', 'Mir',
    
    // 巴斯克姓氏
    'Etxeberria', 'Aguirre', 'Garay', 'Aramburu', 'Zabala', 'Uribe', 'Echeverría', 'Arana', 'Goikoetxea', 'Larrazabal',
    
    // 加利西亚姓氏
    'Regueira', 'Rial', 'Souto', 'Loureiro', 'Fraga', 'Costas', 'Arias', 'Otero', 'Silva', 'Rivas',
    
    // 安达卢西亚姓氏
    'Espinosa', 'Carmona', 'Córdoba', 'Sevilla', 'Granada', 'Trujillo', 'Maldonado', 'Zamora', 'Paredes', 'Ríos',
    
    // 其他常见姓氏
    'Santos', 'Lorenzo', 'Ibáñez', 'Pascual', 'Garrido', 'Santana', 'Vicente', 'Marin', 'Esteban', 'Mora',
    'Santiago', 'Velázquez', 'Marrero', 'Montoya', 'Duran', 'Heredia', 'Salas', 'Villar', 'León', 'Mendoza',
    'Bravo', 'Campos', 'Nieto', 'Franco', 'Peña', 'Crespo', 'Navarro', 'Giménez', 'Gallardo', 'Vega'
  ]
},
BR: {
  firstNames: [
    // 传统男性名字
    'João', 'José', 'Antonio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas', 'Luiz', 'Marcos',
    'Luis', 'Gabriel', 'Rafael', 'Daniel', 'Marcelo', 'Bruno', 'Rodrigo', 'Fernando', 'Gustavo', 'Fábio',
    'Guilherme', 'Matheus', 'Felipe', 'Leonardo', 'Eduardo', 'Diego', 'Thiago', 'Vinicius', 'Juliano', 'Maurício',
    'Alexandre', 'Márcio', 'Ricardo', 'Roberto', 'Sérgio', 'André', 'Renato', 'Júlio', 'César', 'Adriano',
    'Caio', 'Davi', 'Enzo', 'Miguel', 'Arthur', 'Bernardo', 'Heitor', 'Theo', 'Samuel', 'Pietro',
    
    // 复合男性名字
    'João Pedro', 'João Lucas', 'João Gabriel', 'João Victor', 'José Carlos', 'Luiz Felipe', 'Pedro Henrique',
    'Carlos Eduardo', 'João Paulo', 'Luiz Gustavo', 'José Antonio', 'Marco Antonio', 'João Vitor',
    
    // 传统女性名字
    'Maria', 'Ana', 'Francisca', 'Antônia', 'Adriana', 'Juliana', 'Márcia', 'Fernanda', 'Patricia', 'Aline',
    'Sandra', 'Cristina', 'Carla', 'Vanessa', 'Luciana', 'Camila', 'Priscila', 'Tatiana', 'Simone', 'Renata',
    'Rafaela', 'Gabriela', 'Larissa', 'Amanda', 'Bianca', 'Bruna', 'Carolina', 'Letícia', 'Natália', 'Débora',
    'Beatriz', 'Isabella', 'Sofia', 'Laura', 'Manuela', 'Lívia', 'Yasmin', 'Valentina', 'Giovanna', 'Alice',
    'Júlia', 'Mariana', 'Luiza', 'Heloísa', 'Lorena', 'Melissa', 'Nicole', 'Vitória', 'Isadora', 'Marina',
    
    // 复合女性名字
    'Ana Paula', 'Ana Carolina', 'Maria Eduarda', 'Maria Clara', 'Ana Luiza', 'Maria Luiza', 'Ana Julia',
    'Maria Vitória', 'Ana Beatriz', 'Maria Fernanda', 'Ana Laura', 'Maria Alice', 'Luiza Helena',
    
    // 现代流行名字（男）
    'Benício', 'Lorenzo', 'Gael', 'Noah', 'Murilo', 'Pietro', 'Davi Lucca', 'Bryan', 'Cauã', 'Isaac',
    'Anthony', 'Levi', 'Joaquim', 'Vicente', 'Benjamim', 'Nicolas', 'Henrique', 'Otávio', 'Anthony', 'Emanuel',
    
    // 现代流行名字（女）
    'Antonella', 'Cecília', 'Eloá', 'Lara', 'Maitê', 'Helena', 'Emanuelly', 'Eduarda', 'Sophia', 'Elisa',
    'Luna', 'Pietra', 'Aurora', 'Maya', 'Mirella', 'Olivia', 'Alícia', 'Agatha', 'Stella', 'Ísis',
    
    // 非洲裔巴西名字
    'Washington', 'Wellington', 'Jefferson', 'Anderson', 'Robson', 'Edson', 'Jéssica', 'Jaqueline', 'Thaís', 'Raquel',
    'Taís', 'Daiane', 'Tânia', 'Cláudia', 'Sônia', 'Sheila', 'Kátia', 'Mônica', 'Denise', 'Eliane'
  ],
  
  lastNames: [
    // 最常见巴西姓氏
    'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
    'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Rocha', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira',
    
    // 葡萄牙起源姓氏
    'Dias', 'Castro', 'Araújo', 'Cunha', 'Pinto', 'Monteiro', 'Mendes', 'Barros', 'Freitas', 'Barbosa',
    'Reis', 'Cardoso', 'Teixeira', 'Moreira', 'Cavalcanti', 'Ramos', 'Nascimento', 'Correia', 'Nunes', 'Campos',
    
    // 复合姓氏（常见组合）
    'Silva Santos', 'Oliveira Silva', 'Santos Oliveira', 'Souza Silva', 'Costa Silva', 'Lima Santos',
    'Rodrigues Silva', 'Ferreira Santos', 'Alves Silva', 'Pereira Santos', 'Silva Oliveira', 'Gomes Silva',
    
    // De/Da/Do前缀姓氏
    'De Souza', 'Da Silva', 'Dos Santos', 'De Oliveira', 'Da Costa', 'Do Nascimento', 'De Paula',
    'Da Rocha', 'Dos Reis', 'De Almeida', 'Da Cruz', 'Do Carmo', 'De Jesus', 'Da Luz', 'Das Neves',
    
    // 职业相关姓氏
    'Ferreira', 'Pereira', 'Machado', 'Moraes', 'Barbosa', 'Fonseca', 'Pires', 'Guimarães', 'Macedo', 'Tavares',
    
    // 地名相关姓氏
    'Coimbra', 'Porto', 'Moura', 'Miranda', 'Melo', 'Toledo', 'Farias', 'Azevedo', 'Vasconcelos', 'Figueiredo',
    
    // 意大利移民姓氏（南部常见）
    'Rossi', 'Romano', 'Russo', 'Ferrari', 'Bruno', 'Gallo', 'Conti', 'Marino', 'Greco', 'Colombo',
    'Ricci', 'Mancini', 'Martini', 'Lombardi', 'Fontana', 'Santoro', 'Mariani', 'Rinaldi', 'Caruso', 'Ferraro',
    
    // 德国移民姓氏（南部常见）
    'Schmidt', 'Schneider', 'Müller', 'Weber', 'Wagner', 'Becker', 'Hoffmann', 'Schulz', 'Koch', 'Richter',
    'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Hartmann',
    
    // 日本移民姓氏
    'Nakamura', 'Tanaka', 'Yamamoto', 'Watanabe', 'Suzuki', 'Takahashi', 'Kobayashi', 'Sato', 'Ito', 'Kato',
    'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi', 'Matsumoto', 'Inoue', 'Kimura', 'Hayashi', 'Shimizu', 'Yamazaki',
    
    // 阿拉伯/黎巴嫩移民姓氏
    'Haddad', 'Salim', 'Maluf', 'Mansur', 'Abdalla', 'Tuma', 'Azar', 'Saad', 'Elias', 'Khoury',
    'Nasser', 'Aoun', 'Farah', 'Hage', 'Shadid', 'Zogbi', 'Mattar', 'Maron', 'Jaber', 'Mourad',
    
    // 其他常见姓氏
    'Batista', 'Moura', 'Torres', 'Duarte', 'Miranda', 'Nogueira', 'Garcia', 'Borges', 'Rezende', 'Castro',
    'Magalhães', 'Andrade', 'Xavier', 'Siqueira', 'Neves', 'Braga', 'Medeiros', 'Marques', 'Lacerda', 'Guedes',
    'Arruda', 'Brito', 'Pacheco', 'Matos', 'Santana', 'Moraes', 'Leite', 'Santiago', 'Vargas', 'Camargo',
    
    // 圣人/宗教姓氏
    'Santa Rosa', 'São João', 'Santo Antonio', 'Santa Cruz', 'São Pedro', 'Santa Maria', 'Santos Cruz'
  ]
},
MX: {
  firstNames: [
    // 传统男性名字
    'José', 'Juan', 'Miguel', 'Luis', 'Carlos', 'Antonio', 'Francisco', 'Jesús', 'Manuel', 'Pedro',
    'Alejandro', 'Roberto', 'Fernando', 'Jorge', 'Ricardo', 'Alberto', 'Javier', 'Raúl', 'Eduardo', 'Sergio',
    'Rafael', 'Daniel', 'Arturo', 'Guillermo', 'Gustavo', 'David', 'Héctor', 'Óscar', 'Ramón', 'Víctor',
    'Gerardo', 'Armando', 'Pablo', 'Enrique', 'Andrés', 'Rodrigo', 'Rubén', 'Alfredo', 'Martín', 'Ernesto',
    'Marco', 'Diego', 'Ángel', 'Julio', 'César', 'Adrián', 'Gabriel', 'Ignacio', 'Salvador', 'Samuel',
    
    // 复合男性名字（墨西哥特色）
    'José Luis', 'Juan Carlos', 'José Antonio', 'Miguel Ángel', 'José Manuel', 'Juan José', 'Carlos Alberto',
    'Luis Fernando', 'José María', 'Juan Manuel', 'Francisco Javier', 'José Guadalupe', 'Juan Antonio',
    'Luis Miguel', 'José Alfredo', 'Jesús Alberto', 'José Ramón', 'Juan Pablo', 'José Roberto',
    
    // 现代男性名字
    'Santiago', 'Mateo', 'Emiliano', 'Leonardo', 'Sebastián', 'Maximiliano', 'Emmanuel', 'Alexander', 'Gael', 'Christopher',
    'Valentino', 'Iker', 'Bruno', 'Ian', 'Axel', 'Dylan', 'Joshua', 'Kevin', 'Brandon', 'Jonathan',
    
    // 传统女性名字
    'María', 'Guadalupe', 'Juana', 'Margarita', 'Rosa', 'Francisca', 'Teresa', 'Josefina', 'Carmen', 'Elena',
    'Patricia', 'Laura', 'Ana', 'Silvia', 'Martha', 'Beatriz', 'Leticia', 'Gabriela', 'Verónica', 'Sandra',
    'Claudia', 'Adriana', 'Alejandra', 'Diana', 'Carolina', 'Mónica', 'Andrea', 'Daniela', 'Fernanda', 'Paola',
    'Rocío', 'Karla', 'Brenda', 'Jessica', 'Yolanda', 'Norma', 'Gloria', 'Luz', 'Esperanza', 'Dolores',
    'Cristina', 'Susana', 'Raquel', 'Isabel', 'Cecilia', 'Alma', 'Miriam', 'Lidia', 'Alicia', 'Irma',
    
    // 复合女性名字（墨西哥特色）
    'María Guadalupe', 'María José', 'Ana María', 'María Elena', 'Rosa María', 'María Teresa', 'María del Carmen',
    'María Fernanda', 'María Isabel', 'Ana Gabriela', 'María de Jesús', 'María de los Ángeles', 'María Luisa',
    'Ana Patricia', 'María Alejandra', 'María del Pilar', 'María de la Luz', 'María Dolores', 'María del Rosario',
    
    // 现代女性名字
    'Sofía', 'Regina', 'Valentina', 'Camila', 'Natalia', 'Victoria', 'Valeria', 'Isabella', 'Ximena', 'Renata',
    'Paulina', 'Mariana', 'Nicole', 'Ashley', 'Melissa', 'Samantha', 'Vanessa', 'Kimberly', 'Stephanie', 'Michelle',
    
    // 土著名字（纳瓦特尔语影响）
    'Cuauhtémoc', 'Moctezuma', 'Itzel', 'Xochitl', 'Citlali', 'Yolotzin', 'Tonatiuh', 'Yaretzi', 'Xóchitl', 'Nayeli',
    'Zyanya', 'Izel', 'Mayahuel', 'Tlalli', 'Tonantzin', 'Coatl', 'Quetzal', 'Naolin', 'Mizraim', 'Netzahualcóyotl'
  ],
  
  lastNames: [
    // 最常见墨西哥姓氏
    'García', 'Hernández', 'Martínez', 'López', 'González', 'Rodríguez', 'Pérez', 'Sánchez', 'Ramírez', 'Torres',
    'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Reyes', 'Gutiérrez', 'Ortiz', 'Chávez',
    
    // 常见patron姓氏
    'Fernández', 'Álvarez', 'Jiménez', 'Ruiz', 'Moreno', 'Muñoz', 'Romero', 'Alonso', 'Domínguez', 'Vázquez',
    'Herrera', 'Castillo', 'Mendoza', 'Ramos', 'Medina', 'Castro', 'Vargas', 'Rojas', 'Aguilar', 'Contreras',
    
    // 地区特色姓氏
    'Guerrero', 'Delgado', 'Luna', 'Salazar', 'Campos', 'Vega', 'Cortés', 'León', 'Peña', 'Ríos',
    'Ibarra', 'Navarro', 'Sandoval', 'Mejía', 'Cervantes', 'Soto', 'Valdez', 'Cabrera', 'Maldonado', 'Valencia',
    
    // 双姓氏（常见组合）
    'García López', 'Hernández García', 'Martínez Pérez', 'López Hernández', 'González Martínez', 'Rodríguez González',
    'Pérez Rodríguez', 'Sánchez García', 'Ramírez López', 'Torres Hernández', 'Flores García', 'Rivera Martínez',
    'Gómez Pérez', 'Díaz Sánchez', 'Cruz Ramírez', 'Morales Torres', 'Reyes Flores', 'Gutiérrez Rivera',
    
    // De/Del/De la前缀姓氏
    'De la Cruz', 'Del Río', 'De la Rosa', 'De los Santos', 'Del Valle', 'De León', 'De la Torre',
    'Del Castillo', 'De la Fuente', 'De Jesús', 'De la Luz', 'Del Carmen', 'De los Ángeles', 'De Santiago',
    'Del Razo', 'De Anda', 'De Alba', 'De Dios', 'Del Bosque', 'De la Garza',
    
    // 职业/特征相关姓氏
    'Herrera', 'Molina', 'Barrera', 'Caballero', 'Rivas', 'Espinosa', 'Carrillo', 'Rubio', 'Ponce', 'Ochoa',
    'Montes', 'Lara', 'Ayala', 'Salas', 'Cárdenas', 'Mora', 'Trujillo', 'Villanueva', 'Bautista', 'Cordero',
    
    // 州/地区相关姓氏
    'Oaxaca', 'Veracruz', 'Chiapas', 'Durango', 'Jalisco', 'Zacatecas', 'Sinaloa', 'Sonora', 'Tamaulipas', 'Puebla',
    
    // 宗教/圣人姓氏
    'Santiago', 'Santos', 'Santana', 'Santa Cruz', 'San Juan', 'Santa María', 'San Miguel', 'Santo Domingo',
    
    // 历史/土著影响姓氏
    'Cuauhtémoc', 'Moctezuma', 'Azteca', 'Zapata', 'Villa', 'Juárez', 'Hidalgo', 'Morelos', 'Allende', 'Carranza',
    
    // 北部边境姓氏
    'Beltrán', 'Coronado', 'Benavides', 'Hinojosa', 'Treviño', 'Garza', 'Cavazos', 'Elizondo', 'Cárdenas', 'Longoria',
    'Villarreal', 'Guajardo', 'Quiroga', 'Saldivar', 'Olvera', 'Cuellar', 'Macías', 'Escobar', 'Gallegos', 'Arellano',
    
    // 中部高原姓氏
    'Velázquez', 'Padilla', 'Pacheco', 'Estrada', 'Lozano', 'Núñez', 'Serrano', 'Fuentes', 'Bravo', 'Miranda',
    'Tapia', 'Paredes', 'Figueroa', 'Ávila', 'Acosta', 'Rosales', 'Zavala', 'Bustos', 'Cisneros', 'Gallardo',
    
    // 南部姓氏
    'Velasco', 'Solís', 'Betancourt', 'Toledo', 'Marroquín', 'Monroy', 'Ugarte', 'Arteaga', 'Quintero', 'Escalante',
    'Zamora', 'Urbina', 'Palacios', 'Meza', 'Nava', 'Andrade', 'Granados', 'Lucero', 'Bermúdez', 'Valenzuela',
    
    // 殖民时期姓氏
    'Cortés', 'Coronel', 'Hidalgo', 'Montoya', 'Enríquez', 'Guzmán', 'Alcalá', 'Calderón', 'Benavente', 'Cervantes',
    
    // 其他常见姓氏
    'Mata', 'Vega', 'Tovar', 'Robles', 'Suárez', 'Esquivel', 'Osorio', 'Franco', 'Bernal', 'Saenz',
    'Macias', 'Campos', 'Nieto', 'Aguirre', 'Gallegos', 'Salinas', 'Arias', 'Camacho', 'Marin', 'Vidal'
  ]
},
NL: {
  firstNames: [
    // 传统男性名字
    'Jan', 'Peter', 'Hendrik', 'Willem', 'Johannes', 'Pieter', 'Cornelis', 'Gerrit', 'Jacobus', 'Dirk',
    'Adriaan', 'Andries', 'Antonius', 'Bartolomeus', 'Christiaan', 'Daniël', 'Frederik', 'Gijsbert', 'Hendrikus', 'Jozef',
    'Maarten', 'Nicolaas', 'Paulus', 'Simon', 'Theodorus', 'Thomas', 'Martijn', 'Jeroen', 'Bas', 'Tim',
    'Lars', 'Thijs', 'Bram', 'Sander', 'Ruben', 'Niels', 'Jasper', 'Daan', 'Luuk', 'Stijn',
    
    // 现代男性名字
    'Lucas', 'Sem', 'Milan', 'Levi', 'Finn', 'Noah', 'Jesse', 'Max', 'Adam', 'Thomas',
    'Julian', 'Liam', 'Mees', 'Boaz', 'Olivier', 'Sam', 'Gijs', 'Sven', 'Joep', 'Benjamin',
    'Ties', 'Hugo', 'Jayden', 'Niek', 'Dex', 'Mason', 'Teun', 'Lars', 'Tobias', 'Jens',
    
    // 中年常见男性名字
    'Marco', 'Erik', 'Patrick', 'Dennis', 'Richard', 'Ronald', 'Frank', 'Marcel', 'André', 'Mark',
    'Rob', 'Hans', 'Paul', 'Michael', 'John', 'Robert', 'David', 'Tom', 'Bart', 'Joost',
    
    // 传统女性名字
    'Maria', 'Anna', 'Johanna', 'Hendrika', 'Cornelia', 'Geertruida', 'Wilhelmina', 'Petronella', 'Jacoba', 'Adriana',
    'Elisabeth', 'Catharina', 'Margaretha', 'Christina', 'Theodora', 'Alida', 'Antonia', 'Gerarda', 'Helena', 'Sophia',
    'Jannie', 'Truus', 'Greet', 'Riet', 'Neeltje', 'Trijntje', 'Bep', 'Dina', 'Femke', 'Inge',
    
    // 现代女性名字
    'Emma', 'Sophie', 'Julia', 'Lisa', 'Anna', 'Sanne', 'Eva', 'Lotte', 'Fleur', 'Isa',
    'Sara', 'Laura', 'Mila', 'Tess', 'Lynn', 'Noa', 'Liv', 'Fenna', 'Evi', 'Nina',
    'Luna', 'Noor', 'Zoey', 'Sofie', 'Sarah', 'Lieke', 'Roos', 'Jasmijn', 'Amy', 'Lize',
    
    // 中年常见女性名字
    'Linda', 'Sandra', 'Patricia', 'Monique', 'Nicole', 'Marjolein', 'Esther', 'Annemarie', 'Jacqueline', 'Ingrid',
    'Marianne', 'Petra', 'Mandy', 'Yvonne', 'Carolien', 'Renée', 'Miranda', 'Marieke', 'Karin', 'Bianca',
    
    // 弗里斯兰名字（北部）
    'Sjoerd', 'Wiebe', 'Folkert', 'Froukje', 'Sietske', 'Jildou', 'Douwe', 'Tjeerd', 'Wietske', 'Femke',
    'Hylke', 'Auke', 'Feike', 'Rixt', 'Nynke', 'Aukje', 'Fokje', 'Jelle', 'Ids', 'Lieuwe'
  ],
  
  lastNames: [
    // 最常见荷兰姓氏
    'De Jong', 'Jansen', 'De Vries', 'Van den Berg', 'Van Dijk', 'Bakker', 'Janssen', 'Visser', 'Smit', 'Meijer',
    'De Boer', 'Mulder', 'De Groot', 'Bos', 'Vos', 'Peters', 'Hendriks', 'Van Leeuwen', 'Dekker', 'Brouwer',
    
    // Van/Van de/Van den前缀姓氏（非常常见）
    'Van der Meer', 'Van der Linden', 'Van de Ven', 'Van den Heuvel', 'Van der Heijden', 'Van Dam', 'Van Beek',
    'Van Vliet', 'Van Dongen', 'Van Loon', 'Van der Veen', 'Van Essen', 'Van den Brink', 'Van der Wal',
    'Van Rijn', 'Van Os', 'Van Wijk', 'Van Kempen', 'Van Veen', 'Van Houten', 'Van Gelderen', 'Van Eijk',
    
    // 职业相关姓氏
    'Bakker', 'Visser', 'Smit', 'Timmerman', 'Mulder', 'Brouwer', 'Dekker', 'Kok', 'Kuiper', 'Koning',
    'Schouten', 'Smits', 'Jager', 'Boer', 'Vink', 'Bosman', 'Schilder', 'Slager', 'Smid', 'Molenaar',
    
    // 地理/地名相关姓氏
    'Van Amsterdam', 'Van Rotterdam', 'Van Utrecht', 'Van Haarlem', 'Van Delft', 'Van Gouda', 'Van Leiden',
    'Van Groningen', 'Van Arnhem', 'Van Zwolle', 'Van Nijmegen', 'Van Breda', 'Van Tilburg', 'Van Deventer',
    
    // De前缀姓氏
    'De Wit', 'De Bruijn', 'De Graaf', 'De Haan', 'De Lange', 'De Bruin', 'De Ruiter', 'De Vos',
    'De Koning', 'De Leeuw', 'De Rooij', 'De Wilde', 'De Jager', 'De Jonge', 'De Vries', 'De Ridder',
    
    // 描述性姓氏
    'Klein', 'Groot', 'Lange', 'Korte', 'Zwart', 'Wit', 'Rood', 'Groen', 'Blom', 'Bol',
    'Dik', 'Dun', 'Jong', 'Oud', 'Nieuw', 'Hoog', 'Laag', 'Breed', 'Smal', 'Sterk',
    
    // Van der组合（超常见）
    'Van der Meer', 'Van der Berg', 'Van der Velde', 'Van der Ploeg', 'Van der Sluis', 'Van der Laan',
    'Van der Meulen', 'Van der Werf', 'Van der Vlies', 'Van der Schoot', 'Van der Burgh', 'Van der Kamp',
    'Van der Horst', 'Van der Pol', 'Van der Steen', 'Van der Straaten', 'Van der Zande', 'Van der Woude',
    
    // 自然/动物相关姓氏
    'Vos', 'Haas', 'Wolf', 'Leeuw', 'Vogel', 'Vink', 'Kraan', 'Muis', 'Beer', 'Hond',
    'Paard', 'Kat', 'Koe', 'Schaap', 'Geit', 'Varken', 'Eend', 'Zwaan', 'Kraai', 'Uil',
    
    // 树木/植物姓氏
    'Boom', 'Eik', 'Beuk', 'Linde', 'Wilg', 'Els', 'Populier', 'Kastanje', 'Roos', 'Tulp',
    'Lelie', 'Jasmijn', 'Veld', 'Tuin', 'Hof', 'Wei', 'Akker', 'Boomgaard', 'Heide', 'Bos',
    
    // 贵族/历史姓氏（带van）
    'Van Oranje', 'Van Nassau', 'Van Bentinck', 'Van Lynden', 'Van Wassenaer', 'Van Pallandt',
    'Van Randwijck', 'Van Tuyll', 'Van Limburg Stirum', 'Van Hogendorp', 'Van Heemstra', 'Van Rechteren',
    
    // 弗里斯兰姓氏（北部）
    'Dijkstra', 'Hoekstra', 'Visser', 'Boersma', 'Postma', 'Miedema', 'Hofstra', 'Veenstra', 'Tigchelaar', 'Kamstra',
    'Jellema', 'Hiemstra', 'Talsma', 'Andringa', 'Bosma', 'Kuiper', 'Wijma', 'Duursma', 'Nauta', 'Brouwer',
    
    // 双元音/特殊拼写姓氏
    'Booij', 'Blaauw', 'Graaff', 'Hoogen', 'Kooij', 'Maaij', 'Nooij', 'Rooij', 'Tooij', 'Voogt',
    'Duijn', 'Kruijs', 'Schuijt', 'Spruijt', 'Steijn', 'Thijssen', 'Huijgen', 'Kuijpers', 'Ruijter', 'Vuijk',
    
    // 城市/村庄姓氏
    'Amersfoort', 'Appeldoorn', 'Brouwershaven', 'Dordrecht', 'Eindhoven', 'Gouda', 'Heerenveen', 'IJsselstein',
    'Kampen', 'Leeuwarden', 'Middelburg', 'Naarden', 'Ommen', 'Purmerend', 'Roermond', 'Schiedam',
    
    // 其他常见姓氏
    'Vermeer', 'Vermeulen', 'Verhoeven', 'Verstappen', 'Verschoor', 'Verbeek', 'Verhagen', 'Verkerk', 'Verburg', 'Verlinden',
    'Hermans', 'Willems', 'Martens', 'Maes', 'Claes', 'Goossens', 'Peeters', 'Jacobs', 'Aarts', 'Cools',
    'Brands', 'Sanders', 'Franssen', 'Gerrits', 'Klaassen', 'Rovers', 'Timmers', 'Wolters', 'Driessen', 'Hoofs'
  ]
},
SE: {
  firstNames: [
    // 传统男性名字
    'Lars', 'Anders', 'Per', 'Johan', 'Erik', 'Karl', 'Nils', 'Sven', 'Olof', 'Gustav',
    'Bengt', 'Göran', 'Lennart', 'Björn', 'Ulf', 'Åke', 'Håkan', 'Gunnar', 'Bertil', 'Rolf',
    'Ingemar', 'Kjell', 'Stig', 'Arne', 'Leif', 'Tomas', 'Mikael', 'Stefan', 'Peter', 'Jan',
    'Bo', 'Torsten', 'Axel', 'Olle', 'Magnus', 'Mattias', 'Henrik', 'Patrik', 'Daniel', 'Andreas',
    
    // 现代男性名字
    'William', 'Liam', 'Noah', 'Hugo', 'Lucas', 'Oliver', 'Oscar', 'Alexander', 'Elias', 'Viktor',
    'Emil', 'Albin', 'Filip', 'Anton', 'Leo', 'Alfred', 'Theo', 'Axel', 'Adam', 'Isak',
    'Vincent Vincent', 'Ludvig', 'Max', 'Simon', 'Benjamin', 'Samuel', 'Edvin', 'Arvid', 'Charlie', 'Sebastian',
    
    // 中年常见男性名字
    'Fredrik', 'Martin', 'Jonas', 'Kristoffer', 'Niklas', 'Robert', 'David', 'Michael', 'Johan', 'Joakim',
    'Marcus', 'Markus', 'Christian', 'Tobias', 'Jesper', 'Jimmy', 'Claes', 'Mats', 'Urban', 'Robin',
    
    // 传统女性名字
    'Anna', 'Maria', 'Margareta', 'Elisabeth', 'Eva', 'Kristina', 'Birgitta', 'Karin', 'Ingrid', 'Linnéa',
    'Gunilla', 'Marianne', 'Inger', 'Monica', 'Anita', 'Britt', 'Ulla', 'Kerstin', 'Agneta', 'Barbro',
    'Gunnel', 'Inga', 'Maj', 'Berit', 'Siv', 'Astrid', 'Elsa', 'Greta', 'Sigrid', 'Solveig',
    
    // 现代女性名字
    'Alice', 'Maja', 'Elsa', 'Ella', 'Wilma', 'Ebba', 'Olivia', 'Lilly', 'Alma', 'Astrid',
    'Saga', 'Agnes', 'Freja', 'Alicia', 'Stella', 'Clara', 'Linnea', 'Emma', 'Julia', 'Isabelle',
    'Molly', 'Emilia', 'Elin', 'Ellen', 'Signe', 'Vera', 'Nova', 'Luna', 'Iris', 'Selma',
    
    // 中年常见女性名字
    'Jenny', 'Johanna', 'Linda', 'Sandra', 'Erika', 'Susanne', 'Marie', 'Camilla', 'Sara', 'Hanna',
    'Jessica', 'Helena', 'Malin', 'Viktoria', 'Sofie', 'Caroline', 'Charlotte', 'Angelica', 'Therese', 'Louise',
    'Emma', 'Ida', 'Amanda', 'Frida', 'Lisa', 'Katarina', 'Annika', 'Cecilia', 'Nina', 'Rebecca',
    
    // 萨米人名字（北部）
    'Nils', 'Jon', 'Ante', 'Aslak', 'Matti', 'Ánte', 'Jovsset', 'Áilu', 'Berit', 'Elle',
    'Máret', 'Ristin', 'Sunna', 'Áile', 'Birit', 'Inger', 'Marja', 'Signe', 'Ellinor', 'Annika',
    
    // 双名（不太常见但存在）
    'Karl-Johan', 'Lars-Erik', 'Per-Olof', 'Jan-Erik', 'Bo-Göran', 'Ann-Sofie', 'Eva-Lena', 'Ulla-Britt',
    'Anna-Karin', 'Marie-Louise', 'Gun-Britt', 'Ann-Marie', 'Ing-Marie', 'Britt-Marie', 'Gun-Marie'
  ],
  
  lastNames: [
    // -son结尾姓氏（patron系统，最常见）
    'Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson',
    'Pettersson', 'Jonsson', 'Jansson', 'Hansson', 'Bengtsson', 'Jönsson', 'Petersson', 'Gustavsson', 'Olofsson', 'Eliasson',
    'Håkansson', 'Henriksson', 'Sjöberg', 'Lindberg', 'Wallin', 'Eklund', 'Gunnarsson', 'Holm', 'Isaksson', 'Samuelsson',
    'Fransson', 'Bergström', 'Sandberg', 'Lind', 'Lundgren', 'Nyström', 'Claesson', 'Holmberg', 'Engström', 'Danielsson',
    
    // 自然相关姓氏（极常见）
    'Bergman', 'Bergström', 'Lindström', 'Lundberg', 'Sjögren', 'Ström', 'Lund', 'Berg', 'Dahl', 'Ek',
    'Lindqvist', 'Lindgren', 'Axelsson', 'Lundqvist', 'Berglund', 'Sandström', 'Forsberg', 'Sjöström', 'Eklund', 'Sundberg',
    'Hedlund', 'Dahlberg', 'Henningsson', 'Hellström', 'Sjöberg', 'Blomqvist', 'Nordström', 'Löfgren', 'Söderberg', 'Nyberg',
    
    // 地理/地名相关姓氏
    'Nordin', 'Norberg', 'Östberg', 'Westberg', 'Söderström', 'Österberg', 'Nordgren', 'Vesterlund', 'Ångström', 'Dalén',
    'Malmberg', 'Strömberg', 'Åberg', 'Öberg', 'Hallberg', 'Ahlberg', 'Höglund', 'Vikström', 'Ekström', 'Åkesson',
    
    // -lund结尾姓氏（树林）
    'Lundberg', 'Berglund', 'Hedlund', 'Lindlund', 'Englund', 'Edlund', 'Eklund', 'Nyhlund', 'Asplund', 'Björklund',
    'Cederlund', 'Dahlund', 'Elmlund', 'Granlund', 'Haglund', 'Lindlund', 'Rosenlund', 'Sundlund', 'Wikblad', 'Holmlund',
    
    // -berg结尾姓氏（山）
    'Bergqvist', 'Blomberg', 'Carlberg', 'Edberg', 'Fagerberg', 'Hemberg', 'Isberg', 'Kjellberg', 'Lindeberg', 'Moberg',
    'Norrberg', 'Palmberg', 'Rydberg', 'Stenberg', 'Thornberg', 'Westerberg', 'Öhrn', 'Åsberg', 'Erikberg', 'Granberg',
    
    // -ström结尾姓氏（溪流）
    'Bergström', 'Lindström', 'Nyström', 'Sandström', 'Nordström', 'Dahlström', 'Åström', 'Ekström', 'Forström', 'Hedström',
    'Kjellström', 'Malmström', 'Rosenström', 'Sundström', 'Westerström', 'Österström', 'Carlström', 'Engström', 'Hagström', 'Holmström',
    
    // -qvist/-kvist结尾姓氏（树枝）
    'Lindqvist', 'Blomqvist', 'Lundqvist', 'Bergqvist', 'Dahlqvist', 'Hedqvist', 'Nyqvist', 'Almqvist', 'Edqvist', 'Grönqvist',
    'Haglqvist', 'Ivarqvist', 'Karlqvist', 'Malmqvist', 'Nordqvist', 'Sjöqvist', 'Vestqvist', 'Wikqvist', 'Östqvist', 'Åkqvist',
    
    // -gren结尾姓氏（树枝）
    'Lindgren', 'Lundgren', 'Sjögren', 'Nygren', 'Berggren', 'Dahlgren', 'Löfgren', 'Almgren', 'Blomgren', 'Edgren',
    'Hallgren', 'Hedgren', 'Karlgren', 'Nordgren', 'Palmgren', 'Rosengren', 'Sundgren', 'Thorngren', 'Wahlgren', 'Ögren',
    
    // 职业相关姓氏
    'Smed', 'Snickare', 'Skräddare', 'Skomakare', 'Bagare', 'Mjölnare', 'Fiskare', 'Jägare', 'Herde', 'Bonde',
    'Malm', 'Kock', 'Skeppare', 'Timmerman', 'Skogshuggare', 'Bryggare', 'Målare', 'Smid', 'Hantverkare', 'Åkerman',
    
    // 贵族/历史姓氏
    'Von Essen', 'Af Klint', 'Von Platen', 'Wachtmeister', 'De Geer', 'Hamilton', 'Oxenstierna', 'Stenbock', 'Gyllenstierna', 'Bielke',
    'Banér', 'Bonnier', 'Wallenberg', 'Rudbeck', 'Linnaeus', 'Celsius', 'Nobel', 'Ericsson', 'Strindberg', 'Bergman',
    
    // 现代/外来姓氏
    'Ali', 'Ahmed', 'Mohamed', 'Hassan', 'Ibrahim', 'Yusuf', 'Omar', 'Abdullah', 'Hasan', 'Hussein',
    'Kovac', 'Novak', 'Horvat', 'Petrov', 'Ivanov', 'Popov', 'Müller', 'Schmidt', 'Schneider', 'Fischer',
    
    // 双元音/特殊字母姓氏
    'Åberg', 'Åström', 'Åkesson', 'Öberg', 'Öhman', 'Österberg', 'Ålund', 'Ängqvist', 'Ögren', 'Ödman',
    'Ählén', 'Ängström', 'Örn', 'Ås', 'Åslund', 'Öster', 'Öström', 'Ängberg', 'Åman', 'Öman',
    
    // 颜色相关姓氏
    'Grön', 'Blom', 'Roth', 'Vit', 'Svart', 'Grå', 'Brun', 'Blå', 'Röd', 'Gul',
    
    // 动物相关姓氏
    'Björn', 'Örn', 'Varg', 'Räv', 'Älg', 'Hare', 'Falk', 'Lärka', 'Svan', 'Utter',
    
    // 植物相关姓氏
    'Lind', 'Ek', 'Björk', 'Tall', 'Gran', 'Asp', 'Al', 'Lönn', 'Ask', 'Rönn',
    'Alm', 'Hassel', 'Oxel', 'Pilträd', 'Sälg', 'Vide', 'Bok', 'Ceder', 'Cypress', 'Furu',
    
    // 其他常见姓氏
    'Wallin', 'Holm', 'Forsman', 'Falk', 'Hägg', 'Wiklund', 'Åman', 'Holst', 'Hult', 'Strand',
    'Viklund', 'Höglund', 'Malmberg', 'Wallén', 'Hedman', 'Roos', 'Ljung', 'Vass', 'Modig', 'Friberg'
  ]
},
CH: {
  firstNames: [
    // 德语区男性名字（约63%人口）
    'Hans', 'Peter', 'Thomas', 'Daniel', 'Markus', 'Martin', 'Andreas', 'Stefan', 'Michael', 'Christian',
    'Beat', 'Urs', 'Marco', 'Pascal', 'Lukas', 'Philipp', 'Simon', 'David', 'Adrian', 'Dominik',
    'Patrick', 'Reto', 'Marcel', 'Raphael', 'Florian', 'Fabian', 'Sandro', 'Matthias', 'Nicolas', 'Samuel',
    'Niklaus', 'Walter', 'Fritz', 'Ernst', 'Werner', 'Kurt', 'Roland', 'Heinz', 'Max', 'Felix',
    'Yannick', 'Noah', 'Leon', 'Luca', 'Elias', 'Julian', 'Nico', 'Jan', 'Tim', 'Leandro',
    
    // 法语区男性名字（约23%人口）
    'Jean', 'Pierre', 'Michel', 'Jacques', 'Philippe', 'Claude', 'André', 'Alain', 'François', 'Marc',
    'Laurent', 'Patrick', 'Olivier', 'Stéphane', 'Nicolas', 'Julien', 'Alexandre', 'Christophe', 'Vincent', 'Sébastien',
    'Fabien', 'Raphaël', 'Antoine', 'Mathieu', 'Maxime', 'Jérôme', 'Grégoire', 'Damien', 'Gabriel', 'Yves',
    
    // 意大利语区男性名字（约8%人口）
    'Marco', 'Luca', 'Andrea', 'Giuseppe', 'Antonio', 'Paolo', 'Francesco', 'Giovanni', 'Stefano', 'Alessandro',
    'Roberto', 'Matteo', 'Davide', 'Michele', 'Fabio', 'Nicola', 'Giorgio', 'Claudio', 'Riccardo', 'Federico',
    
    // 德语区女性名字
    'Anna', 'Maria', 'Ursula', 'Ruth', 'Barbara', 'Elisabeth', 'Erika', 'Heidi', 'Monika', 'Verena',
    'Sandra', 'Andrea', 'Nicole', 'Claudia', 'Sabrina', 'Daniela', 'Nadine', 'Stefanie', 'Melanie', 'Jasmin',
    'Sarah', 'Laura', 'Julia', 'Nina', 'Lea', 'Lara', 'Mia', 'Emma', 'Sophie', 'Leonie',
    'Anja', 'Petra', 'Brigitte', 'Silvia', 'Christine', 'Marianne', 'Susanne', 'Karin', 'Esther', 'Irene',
    'Lena', 'Jana', 'Michelle', 'Vanessa', 'Jessica', 'Tabea', 'Selina', 'Alina', 'Chiara', 'Livia',
    
    // 法语区女性名字
    'Marie', 'Françoise', 'Catherine', 'Isabelle', 'Nathalie', 'Sylvie', 'Christine', 'Martine', 'Monique', 'Nicole',
    'Sophie', 'Julie', 'Céline', 'Valérie', 'Caroline', 'Stéphanie', 'Aurélie', 'Chloé', 'Camille', 'Emma',
    'Léa', 'Anaïs', 'Marine', 'Sarah', 'Laura', 'Manon', 'Charlotte', 'Pauline', 'Claire', 'Émilie',
    
    // 意大利语区女性名字
    'Laura', 'Chiara', 'Martina', 'Giulia', 'Federica', 'Sara', 'Elena', 'Alessia', 'Valentina', 'Francesca',
    'Silvia', 'Anna', 'Maria', 'Paola', 'Monica', 'Stefania', 'Daniela', 'Claudia', 'Simona', 'Roberta',
    
    // 罗曼什语区名字（稀有）
    'Gion', 'Reto', 'Flurin', 'Andri', 'Gieri', 'Curdin', 'Fadri', 'Dumeng', 'Linard', 'Claudio',
    'Martina', 'Annatina', 'Ladina', 'Seraina', 'Flurina', 'Corina', 'Gianna', 'Selina', 'Ursina', 'Chatrina'
  ],
  
  lastNames: [
    // 德语区最常见姓氏
    'Müller', 'Meier', 'Schmid', 'Keller', 'Weber', 'Huber', 'Schneider', 'Meyer', 'Steiner', 'Fischer',
    'Gerber', 'Brunner', 'Baumann', 'Frei', 'Zimmermann', 'Widmer', 'Moser', 'Graf', 'Roth', 'Wyss',
    'Lehmann', 'Hämmerli', 'Hartmann', 'Hofmann', 'Baumgartner', 'Bosshard', 'Bühler', 'Ammann', 'Stucki', 'Marti',
    
    // 德语区职业姓氏
    'Bäcker', 'Wagner', 'Richter', 'Bauer', 'Metzger', 'Schäfer', 'Koch', 'Becker', 'Schulz', 'Herrmann',
    'König', 'Walter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Braun', 'Hoffmann', 'Krüger',
    
    // 德语区地理姓氏
    'Aebi', 'Egli', 'Egger', 'Imhof', 'Stocker', 'Wegmann', 'Büchler', 'Grob', 'Hofer', 'Künzli',
    'Rüegg', 'Suter', 'Thommen', 'Tanner', 'Wenger', 'Wüthrich', 'Zürcher', 'Berner', 'Basler', 'Luzerner',
    
    // 法语区姓氏
    'Dubois', 'Martin', 'Bernard', 'Favre', 'Rochat', 'Jacot', 'Perret', 'Lévy', 'Duvoisin', 'Rossier',
    'Matthey', 'Pittet', 'Monnier', 'Meylan', 'Vogt', 'Bovey', 'Chappuis', 'Clément', 'Magnin', 'Bettex',
    'Mercier', 'Laurent', 'Guex', 'Pauchard', 'Reymond', 'Aubert', 'Baudin', 'Bonnet', 'Chevalley', 'Derivaz',
    'Genoud', 'Guignard', 'Henchoz', 'Jeanrenaud', 'Kaeser', 'Lambelet', 'Margot', 'Nicolet', 'Pahud', 'Rouiller',
    
    // 意大利语区姓氏
    'Rossi', 'Ferrari', 'Bernasconi', 'Bianchi', 'Colombo', 'Romano', 'Villa', 'Mazzoleni', 'Sala', 'Galli',
    'Fontana', 'Pedretti', 'Pagani', 'Cereghetti', 'Mainetti', 'Carloni', 'Medici', 'Realini', 'Zanetti', 'Guidotti',
    'Moretti', 'Cattaneo', 'Martino', 'Reggiani', 'Bellini', 'Conti', 'Lombardi', 'Marino', 'Neri', 'Russo',
    
    // 罗曼什语区姓氏
    'Caduff', 'Caviezel', 'Gartmann', 'Bearth', 'Decurtins', 'Darms', 'Roffler', 'Bundi', 'Capaul', 'Clalüna',
    'Guidon', 'Hendry', 'Kessler', 'Lardelli', 'Maissen', 'Nadig', 'Pfister', 'Riatsch', 'Sonder', 'Tuor',
    'Arquint', 'Buchli', 'Cantieni', 'Derungs', 'Ellemunter', 'Fasser', 'Gaudenz', 'Hassler', 'Hunger', 'Janett',
    
    // 双重姓氏组合（瑞士特色，用连字符）
    'Müller-Meier', 'Schmid-Weber', 'Keller-Fischer', 'Meyer-Steiner', 'Brunner-Graf', 'Moser-Roth',
    'Dubois-Martin', 'Favre-Rochat', 'Perret-Jacot', 'Rossi-Bernasconi', 'Ferrari-Bianchi', 'Villa-Colombo',
    
    // Von/De前缀姓氏（贵族）
    'Von Arx', 'Von Ah', 'Von Bergen', 'Von Dach', 'Von Gunten', 'Von Salis', 'Von Steiger', 'Von Wattenwyl',
    'De Rham', 'De Coulon', 'De Weck', 'De Pury', 'De Mestral', 'De Ribaupierre', 'De Cérenville', 'De Vallière',
    
    // 特殊拼写姓氏（带变音符号）
    'Grütter', 'Günthard', 'Hürlimann', 'Kündig', 'Küng', 'Lüthi', 'Rüegg', 'Rüfenacht', 'Stähli', 'Zürcher',
    'Bösch', 'Bürgi', 'Bühlmann', 'Dürr', 'Götz', 'Grüter', 'Hüsler', 'Kägi', 'Köhler', 'Lüthy',
    'Schär', 'Schütz', 'Spühler', 'Stöckli', 'Sträuli', 'Wälti', 'Zünd', 'Büchi', 'Fässler', 'Gössi',
    
    // 阿尔卑斯地区姓氏
    'Alpiger', 'Bergmann', 'Bühler', 'Furrer', 'Gasser', 'Gamma', 'Imsand', 'Julen', 'Kalbermatten', 'Lochmatter',
    'Supersaxo', 'Summermatter', 'Taugwalder', 'Truffer', 'Zurbriggen', 'Amherd', 'Biner', 'Brantschen', 'Epiney', 'Imboden',
    
    // 苏黎世州姓氏
    'Bachmann', 'Baur', 'Berger', 'Bolliger', 'Dubs', 'Forrer', 'Gubler', 'Hauser', 'Heusser', 'Hug',
    'Isler', 'Kälin', 'Landolt', 'Matter', 'Nef', 'Pfister', 'Riniker', 'Schenk', 'Stahel', 'Zollinger',
    
    // 伯尔尼州姓氏
    'Aeschlimann', 'Augsburger', 'Binggeli', 'Dietrich', 'Eberle', 'Flückiger', 'Gerber', 'Hadorn', 'Jordi', 'Kaufmann',
    'Lehmann', 'Mosimann', 'Neuhaus', 'Nyffenegger', 'Rieder', 'Röthlisberger', 'Salzmann', 'Schmutz', 'Stadelmann', 'Zaugg',
    
    // 日内瓦/沃州姓氏
    'Amiguet', 'Berney', 'Burnand', 'Decoppet', 'Éperon', 'Forestier', 'Gilliéron', 'Henchoz', 'Isoz', 'Jaccottet',
    'Künzi', 'Lambercy', 'Maillard', 'Nussbaum', 'Olivier', 'Piccard', 'Quartier', 'Ramseyer', 'Savary', 'Vittoz',
    
    // 提契诺州姓氏
    'Alberti', 'Baranzini', 'Cavadini', 'Denti', 'Frigerio', 'Galfetti', 'Jelmini', 'Lepori', 'Moccetti', 'Nosetti',
    'Ortelli', 'Pezzoli', 'Quadri', 'Rezzonico', 'Sciarini', 'Tami', 'Vanini', 'Zaninetti', 'Anastasi', 'Beffa'
  ]
},
PL: {
  firstNames: [
    // 传统男性名字
    'Jan', 'Piotr', 'Andrzej', 'Krzysztof', 'Stanisław', 'Tomasz', 'Paweł', 'Józef', 'Marcin', 'Marek',
    'Michał', 'Grzegorz', 'Jerzy', 'Tadeusz', 'Adam', 'Łukasz', 'Zbigniew', 'Ryszard', 'Kazimierz', 'Henryk',
    'Dariusz', 'Mariusz', 'Janusz', 'Wojciech', 'Robert', 'Mateusz', 'Kamil', 'Damian', 'Jacek', 'Rafał',
    'Sławomir', 'Jarosław', 'Mirosław', 'Władysław', 'Zdzisław', 'Bogdan', 'Leszek', 'Czesław', 'Witold', 'Roman',
    
    // 现代男性名字
    'Jakub', 'Szymon', 'Kacper', 'Filip', 'Wojciech', 'Bartosz', 'Mateusz', 'Dawid', 'Mikołaj', 'Oskar',
    'Patryk', 'Adrian', 'Dominik', 'Sebastian', 'Maksymilian', 'Hubert', 'Krystian', 'Konrad', 'Marcin', 'Karol',
    'Igor', 'Oliwier', 'Nikodem', 'Antoni', 'Franciszek', 'Tymoteusz', 'Wiktor', 'Aleksander', 'Leon', 'Marcel',
    
    // 中年常见男性名字
    'Artur', 'Bartłomiej', 'Przemysław', 'Daniel', 'Radosław', 'Piotr', 'Mariusz', 'Maciej', 'Łukasz', 'Krzysztof',
    'Marcin', 'Sebastian', 'Grzegorz', 'Wojciech', 'Tomasz', 'Michał', 'Robert', 'Kamil', 'Paweł', 'Adam',
    
    // 传统女性名字
    'Maria', 'Anna', 'Katarzyna', 'Małgorzata', 'Agnieszka', 'Barbara', 'Ewa', 'Elżbieta', 'Krystyna', 'Teresa',
    'Zofia', 'Jadwiga', 'Danuta', 'Irena', 'Halina', 'Helena', 'Grażyna', 'Jolanta', 'Beata', 'Renata',
    'Dorota', 'Iwona', 'Joanna', 'Magdalena', 'Monika', 'Bożena', 'Urszula', 'Janina', 'Stanisława', 'Wanda',
    'Genowefa', 'Stefania', 'Kazimiera', 'Władysława', 'Mirosława', 'Bronisława', 'Leokadia', 'Eugenia', 'Pelagia', 'Marianna',
    
    // 现代女性名字
    'Julia', 'Zuzanna', 'Maja', 'Lena', 'Wiktoria', 'Natalia', 'Oliwia', 'Amelia', 'Alicja', 'Hanna',
    'Nikola', 'Aleksandra', 'Emilia', 'Pola', 'Karolina', 'Gabriela', 'Martyna', 'Klaudia', 'Paulina', 'Weronika',
    'Kornelia', 'Laura', 'Maria', 'Antonina', 'Zofia', 'Iga', 'Nadia', 'Liwia', 'Milena', 'Sara',
    
    // 中年常见女性名字
    'Anna', 'Katarzyna', 'Agnieszka', 'Ewa', 'Joanna', 'Magdalena', 'Monika', 'Beata', 'Aleksandra', 'Marta',
    'Justyna', 'Paulina', 'Karolina', 'Natalia', 'Patrycja', 'Sylwia', 'Izabela', 'Aneta', 'Edyta', 'Ilona',
    
    // 圣人/历史名字
    'Bolesław', 'Mieszko', 'Władysław', 'Kazimierz', 'Lech', 'Zbigniew', 'Jarosław', 'Świętosław', 'Bogusław', 'Bronisław',
    'Jadwiga', 'Elżbieta', 'Kinga', 'Kunegunda', 'Świętosława', 'Dobrawa', 'Rycheza', 'Ludmiła', 'Bronisława', 'Bogusława',
    
    // 短昵称形式
    'Janek', 'Piotrek', 'Tomek', 'Marcinek', 'Adaś', 'Karol', 'Wojtek', 'Krzysiek', 'Maciek', 'Bartek',
    'Ania', 'Asia', 'Kasia', 'Magda', 'Gosia', 'Ewa', 'Jola', 'Beata', 'Iwona', 'Basia'
  ],
  
  lastNames: [
    // 最常见波兰姓氏（-ski/-ska结尾）
    'Nowak', 'Kowalski', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński', 'Szymański', 'Woźniak',
    'Dąbrowski', 'Kozłowski', 'Jankowski', 'Wojciechowski', 'Kwiatkowski', 'Kaczmarek', 'Mazur', 'Krawczyk', 'Piotrowski', 'Grabowski',
    
    // -ski结尾姓氏（地名相关）
    'Wiśniewski', 'Kamiński', 'Lewandowski', 'Zieliński', 'Szymański', 'Dąbrowski', 'Kozłowski', 'Jankowski', 'Mazurowski', 'Olszewski',
    'Pawłowski', 'Michalski', 'Górski', 'Zawadzki', 'Krakowski', 'Wróblewski', 'Jasiński', 'Adamski', 'Majewski', 'Ostrowski',
    'Sadowski', 'Brzeziński', 'Kucharski', 'Kwieciński', 'Zakrzewski', 'Rutkowski', 'Baranowski', 'Maciejewski', 'Witkowski', 'Walczak',
    
    // -cki结尾姓氏
    'Krawiec', 'Zalewski', 'Stępień', 'Głowacki', 'Małecki', 'Piątkowski', 'Marciniak', 'Kołodziej', 'Sikorski', 'Pawlak',
    'Wilk', 'Laskowski', 'Bielecki', 'Kowalewski', 'Sobolewski', 'Czarnecki', 'Lasecki', 'Tomaszewski', 'Krupski', 'Osiński',
    
    // -ak结尾姓氏
    'Nowak', 'Kowalczyk', 'Woźniak', 'Mazur', 'Krawczyk', 'Dudek', 'Wieczorek', 'Pawlak', 'Sobczak', 'Witkowski',
    'Król', 'Adamczyk', 'Sikora', 'Baran', 'Gajewski', 'Malinowski', 'Sawicki', 'Borkowski', 'Urbański', 'Czerwiński',
    
    // -czyk结尾姓氏（patron系统）
    'Kowalczyk', 'Adamczyk', 'Wójcik', 'Szczepański', 'Pietrzak', 'Michalczyk', 'Pawliczek', 'Marczak', 'Janczyk', 'Tomczyk',
    'Stasiak', 'Filipiak', 'Marek', 'Kubiak', 'Nowicki', 'Górecki', 'Lis', 'Sobczyk', 'Wilczek', 'Stefaniak',
    
    // 职业相关姓氏
    'Kowal', 'Krawiec', 'Młynarz', 'Piekarz', 'Garbarz', 'Rybak', 'Kołodziej', 'Stolarz', 'Mazur', 'Bednarczyk',
    'Ślusarz', 'Kuźniar', 'Tkacz', 'Szewc', 'Piwowar', 'Garncarz', 'Murarz', 'Kowalewski', 'Kowalewski', 'Kowalik',
    
    // 动物相关姓氏
    'Wilk', 'Zając', 'Sokół', 'Baran', 'Kozioł', 'Koń', 'Lis', 'Borsuk', 'Niedźwiedź', 'Jeleń',
    'Sroka', 'Bąk', 'Sowa', 'Bocian', 'Kaczor', 'Gołąb', 'Wróbel', 'Kruk', 'Orzeł', 'Jastrząb',
    
    // 自然/地理相关姓氏
    'Dąbrowski', 'Zawadzki', 'Górski', 'Jezioro', 'Brzoza', 'Sosna', 'Dębowski', 'Jarzębski', 'Lesiak', 'Polak',
    'Dolny', 'Górny', 'Podgórski', 'Wiśniewski', 'Lipski', 'Modrzejewski', 'Świerczyński', 'Cisek', 'Jodłowski', 'Brzozowski',
    
    // 描述性姓氏
    'Biały', 'Czarny', 'Rudy', 'Siwy', 'Długi', 'Krótki', 'Gruby', 'Chudy', 'Wysocki', 'Mały',
    'Wielki', 'Stary', 'Młody', 'Silny', 'Dobry', 'Zły', 'Szczęsny', 'Bogaty', 'Biedny', 'Wesoły',
    
    // 地区特色姓氏
    'Kaczmarczyk', 'Wierzbicki', 'Kalinowski', 'Cieślak', 'Słowik', 'Kucharski', 'Sobieraj', 'Bagiński', 'Cieslak', 'Bednarek',
    'Karpiński', 'Brzozowski', 'Chmielewski', 'Domański', 'Filipowski', 'Klimek', 'Kopeć', 'Korzeniowski', 'Kędzierski', 'Marek',
    
    // -owski/-ewski结尾（贵族特征）
    'Czartoryski', 'Radziwiłł', 'Potocki', 'Zamoyski', 'Jabłonowski', 'Lubomirski', 'Poniatowski', 'Sapieha', 'Ossoliński', 'Sanguszko',
    'Koniecpolski', 'Sieniawski', 'Branicki', 'Mniszech', 'Tarnowski', 'Wiśniowiecki', 'Sobieski', 'Chodkiewicz', 'Pac', 'Raczyński',
    
    // 西里西亚姓氏
    'Szewczyk', 'Kluczek', 'Jurczyk', 'Hanke', 'Kotas', 'Kubica', 'Malik', 'Szymczak', 'Urban', 'Gawlik',
    'Juraszek', 'Marek', 'Wawrzynek', 'Nowak', 'Kuchta', 'Gołąb', 'Graca', 'Dziedzic', 'Kania', 'Niemiec',
    
    // 波美拉尼亚姓氏
    'Kamiński', 'Januszewski', 'Kruszewski', 'Lipiński', 'Małecki', 'Świerczyński', 'Wiśniewski', 'Zawadzki', 'Cieśliński', 'Duda',
    
    // 小波兰姓氏
    'Adamski', 'Chojnacki', 'Kowalski', 'Krawczyk', 'Mazur', 'Nowak', 'Pawlak', 'Pietrzak', 'Stępień', 'Wójcik',
    
    // 大波兰姓氏
    'Kaźmierczak', 'Kaczmarek', 'Nowicki', 'Owczarek', 'Majchrzak', 'Pawlak', 'Skowronek', 'Zieliński', 'Michalak', 'Bartkowiak',
    
    // 马佐夫舍姓氏
    'Nowakowski', 'Kowalewski', 'Lewandowski', 'Mazurkiewicz', 'Chmielewski', 'Jankowski', 'Górski', 'Pawłowski', 'Rutkowski', 'Zalewski',
    
    // 复合姓氏（罕见但存在）
    'Nowak-Kowalski', 'Kowalczyk-Lewandowski', 'Wiśniewski-Kamiński', 'Dąbrowski-Zieliński', 'Jankowski-Górski',
    
    // 其他常见姓氏
    'Bukowski', 'Czajkowski', 'Duda', 'Dudek', 'Gajewski', 'Głowacki', 'Grzelak', 'Kuchta', 'Laskowski', 'Makowski',
    'Markowski', 'Michalak', 'Muszyński', 'Niemiec', 'Nowicki', 'Owczarek', 'Piasecki', 'Piekarski', 'Przybylski', 'Ratajczak',
    'Rusin', 'Rutkowski', 'Sikora', 'Sikorski', 'Smoliński', 'Sobczak', 'Sokołowski', 'Stachowiak', 'Szulc', 'Urbański',
    'Wasilewski', 'Werner', 'Wierzbicki', 'Wołowicz', 'Wysocki', 'Ziółkowski', 'Żak', 'Żukowski', 'Kłos', 'Krupa'
  ]
},
TR: {
  firstNames: [
    // 传统男性名字
    'Mehmet', 'Mustafa', 'Ahmet', 'Ali', 'Hasan', 'Hüseyin', 'İbrahim', 'İsmail', 'Osman', 'Süleyman',
    'Yusuf', 'Ömer', 'Murat', 'Fatih', 'Emre', 'Burak', 'Serkan', 'Erkan', 'Volkan', 'Kemal',
    'Şahin', 'Kerem', 'Cem', 'Can', 'Kaan', 'Berk', 'Arda', 'Eren', 'Deniz', 'Baran',
    'Çağlar', 'Oğuz', 'Onur', 'Selim', 'Tolga', 'Tuncay', 'Ufuk', 'Yasin', 'Zafer', 'Özgür',
    
    // 现代男性名字
    'Emir', 'Yiğit', 'Efe', 'Eymen', 'Ömer Asaf', 'Alperen', 'Dorukhan', 'Kuzey', 'Miraç', 'Umut',
    'Alp', 'Barış', 'Ege', 'Metehan', 'Emirhan', 'Yağız', 'Atlas', 'Çınar', 'Aras', 'Toprak',
    'Miray', 'Aykut', 'Bilal', 'Cemal', 'Doğan', 'Engin', 'Ferhat', 'Gökhan', 'Halil', 'Koray',
    
    // 中年常见男性名字
    'Abdullah', 'Bayram', 'Cengiz', 'Dursun', 'Erdoğan', 'Faruk', 'Gökhan', 'Hakan', 'İlhan', 'Kadir',
    'Levent', 'Mehmet Ali', 'Nejat', 'Orhan', 'Ramazan', 'Sedat', 'Taner', 'Ümit', 'Veysel', 'Zeki',
    
    // 传统女性名字
    'Fatma', 'Ayşe', 'Emine', 'Hatice', 'Zeynep', 'Elif', 'Meryem', 'Sultan', 'Hacer', 'Şerife',
    'Hanife', 'Fadime', 'Havva', 'Safiye', 'Rukiye', 'Aysel', 'Gülsüm', 'Vesile', 'Şükriye', 'Hayriye',
    'Cemile', 'Zeliha', 'Hacer', 'Naciye', 'Müzeyyen', 'Şefika', 'Neriman', 'Şükran', 'Remziye', 'Ümran',
    
    // 现代女性名字
    'Zehra', 'Selin', 'Esra', 'Merve', 'Büşra', 'Rabia', 'Seda', 'Tuğçe', 'Ece', 'İrem',
    'Melis', 'Derin', 'Asya', 'Nehir', 'Lara', 'Ada', 'Ela', 'Defne', 'Miray', 'Nil',
    'Yağmur', 'Damla', 'İlayda', 'Işıl', 'Özge', 'Sıla', 'Ece', 'Naz', 'Pınar', 'Aslı',
    'Aysun', 'Aylin', 'Başak', 'Burcu', 'Cansu', 'Deniz', 'Ebru', 'Gamze', 'Gizem', 'Gül',
    
    // 中年常见女性名字
    'Fatma', 'Ayşe', 'Emine', 'Zeynep', 'Elif', 'Hatice', 'Sultan', 'Hacer', 'Meryem', 'Şerife',
    'Gülsen', 'Gülay', 'Sevim', 'Nermin', 'Semiha', 'Türkan', 'Nevin', 'Perihan', 'Ayten', 'Filiz',
    'Hülya', 'Özlem', 'Pelin', 'Serap', 'Sibel', 'Tülay', 'Yasemin', 'Zuhal', 'Aysun', 'Dilek',
    
    // 伊斯兰/阿拉伯起源名字
    'Muhammed', 'Ahmed', 'Mahmut', 'Hamza', 'Ömer', 'Osman', 'Ali', 'Hasan', 'Hüseyin', 'Bekir',
    'Ayşe', 'Fatıma', 'Zeynep', 'Hatice', 'Meryem', 'Hafsa', 'Esma', 'Rukiye', 'Zübeyde', 'Ümmü',
    
    // 突厥/历史名字
    'Alp', 'Alparslan', 'Atatürk', 'Atilla', 'Batu', 'Bilge', 'Çağatay', 'Ertuğrul', 'Fatih', 'Genghis',
    'Kılıç', 'Metehan', 'Oğuz', 'Timur', 'Tuğrul', 'Ülgen', 'Yavuz', 'Turhan', 'Korkut', 'Selçuk',
    'Tomris', 'Nene', 'Turandot', 'Soydan', 'Ece', 'Ülkü', 'Aygül', 'Sevgi', 'Türkan', 'Ülker',
    
    // 自然相关名字
    'Deniz', 'Gökyüzü', 'Güneş', 'Ay', 'Yıldız', 'Bulut', 'Rüzgar', 'Dağ', 'Çiçek', 'Gül',
    'Aslan', 'Kartal', 'Kurt', 'Tilki', 'Şahin', 'Doğan', 'Serçe', 'Kumru', 'Lale', 'Menekşe',
    
    // 现代流行名字
    'Asel', 'Azra', 'Belinay', 'Ceren', 'Duru', 'Ecrin', 'Eylül', 'Hiranur', 'Işık', 'Kardelen',
    'Lina', 'Mahir', 'Nazlı', 'Poyraz', 'Rüya', 'Su', 'Tuana', 'Umay', 'Vega', 'Zümra'
  ],
  
  lastNames: [
    // 最常见土耳其姓氏
    'Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir',
    'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şimşek',
    
    // 描述性/特征姓氏
    'Ak', 'Beyaz', 'Kara', 'Siyah', 'Sarı', 'Yeşil', 'Kırmızı', 'Mavi', 'Güzel', 'İyi',
    'Uzun', 'Kısa', 'Kalın', 'İnce', 'Yüksek', 'Alçak', 'Büyük', 'Küçük', 'Genç', 'Yaşlı',
    
    // 职业相关姓氏
    'Demirci', 'Bakırcı', 'Dökmetaş', 'Kuyumcu', 'Nalbant', 'Sarraf', 'Berber', 'Terzi', 'Ayakkabıcı', 'Çıkrıkçı',
    'Kahveci', 'Çiftçi', 'Dülger', 'Çoban', 'Balıkçı', 'Avcı', 'Bekçi', 'Bahçıvan', 'Değirmenci', 'Ekmekçi',
    
    // 动物相关姓氏
    'Aslan', 'Kurt', 'Ayı', 'Tilki', 'Kartal', 'Şahin', 'Doğan', 'Atmaca', 'Akbaba', 'Baykuş',
    'At', 'Koyun', 'Keçi', 'Öküz', 'Boğa', 'Kedi', 'Köpek', 'Kuş', 'Balık', 'Arı',
    
    // 自然/地理姓氏
    'Dağ', 'Tepe', 'Vadi', 'Göl', 'Deniz', 'Irmak', 'Çay', 'Pınar', 'Kaynak', 'Orman',
    'Ağaç', 'Çam', 'Çınar', 'Meşe', 'Kavak', 'Söğüt', 'Ardıç', 'Gül', 'Lale', 'Menekşe',
    'Taş', 'Kaya', 'Kum', 'Toprak', 'Çakıl', 'Maden', 'Altın', 'Gümüş', 'Bakır', 'Demir',
    
    // Öz-前缀姓氏（非常常见）
    'Öztürk', 'Özdemir', 'Özkan', 'Özkaya', 'Özçelik', 'Özyılmaz', 'Özaslan', 'Özdoğan', 'Özgür', 'Özyurt',
    'Özmen', 'Özaydın', 'Özarslan', 'Özkoç', 'Özkılıç', 'Özkartal', 'Özsoy', 'Özalp', 'Özbek', 'Özgen',
    
    // Ak-前缀姓氏
    'Aksu', 'Akgül', 'Akman', 'Akın', 'Akbulut', 'Akdoğan', 'Akyüz', 'Aksoy', 'Akçay', 'Akbaş',
    'Akar', 'Akgün', 'Akşen', 'Aktaş', 'Akyıldız', 'Akpınar', 'Akdeniz', 'Akkaya', 'Akdağ', 'Akyol',
    
    // Kara-前缀姓氏
    'Karasu', 'Karadağ', 'Karakaya', 'Karadeniz', 'Karataş', 'Karabacak', 'Karabulut', 'Karaçam', 'Karaduman', 'Karayel',
    'Karaca', 'Karaaslan', 'Karadaş', 'Karakoç', 'Karaman', 'Karasoy', 'Karayılan', 'Karayağız', 'Karayiğit', 'Karakuş',
    
    // -oğlu结尾姓氏（"...之子"）
    'Ateşoğlu', 'Başoğlu', 'Çamoğlu', 'Demiroglu', 'Erdoğan', 'Fındıkoğlu', 'Güneşoğlu', 'Hasanoğlu', 'İmamoğlu', 'Kocaoğlu',
    'Menderes', 'Nuroğlu', 'Oğuzhan', 'Özoğlu', 'Paşaoğlu', 'Rıfatoğlu', 'Süleymanoglu', 'Tahiroğlu', 'Usluoğlu', 'Yavuzoglu',
    
    // 地名相关姓氏
    'İstanbullu', 'Ankaralı', 'İzmirli', 'Adanalı', 'Konyalı', 'Bursalı', 'Eskişehirli', 'Trabzonlu', 'Erzurumlu', 'Samsunlu',
    'Karadenizli', 'Anadolu', 'Bozkurt', 'Ege', 'Marmara', 'Trakya', 'Rumeli', 'Toroslu', 'Van', 'Maraş',
    
    // -er/-ar结尾姓氏
    'Akbıyık', 'Birinci', 'Demirer', 'Erdem', 'Güler', 'İpek', 'Kahveci', 'Nazlı', 'Sakalar', 'Turan',
    'Erkan', 'Berkay', 'Çınar', 'Dalar', 'Engin', 'Güven', 'Işık', 'Kılınç', 'Mercan', 'Savaş',
    
    // 历史/部落姓氏
    'Seljuk', 'Osmanlı', 'Kayı', 'Kınık', 'Aydın', 'Bayezid', 'Çelebi', 'Fatih', 'Yavuz', 'Kanuni',
    'Barbaros', 'Turan', 'Oğuz', 'Türkmen', 'Yörük', 'Tatar', 'Kıpçak', 'Çerkez', 'Laz', 'Kürt',
    
    // 宗教/精神姓氏
    'Din', 'İman', 'Hak', 'Adil', 'Şerif', 'Hacı', 'Hafız', 'İmam', 'Molla', 'Dede',
    'Bey', 'Ağa', 'Paşa', 'Sultan', 'Han', 'Gazi', 'Şehit', 'Eren', 'Evliya', 'Derviş',
    
    // 现代姓氏
    'Tuncel', 'Polat', 'Yavuz', 'Parlak', 'Güven', 'Sever', 'Temiz', 'Düzen', 'Çalışkan', 'Başaran',
    'Ergin', 'Uysal', 'Özgün', 'Özgür', 'Barış', 'Umut', 'Sevgi', 'Mutlu', 'Güneş', 'Aydın',
    
    // 季节/时间姓氏
    'Yazıcı', 'Kış', 'Bahar', 'Yaz', 'Güz', 'Sonbahar', 'İlkbahar', 'Ocak', 'Şubat', 'Mart',
    
    // 金属/矿物姓氏
    'Altın', 'Gümüş', 'Bakır', 'Demir', 'Çelik', 'Tunç', 'Bronz', 'Elmas', 'İnci', 'Mercan',
    
    // 颜色组合姓氏
    'Akgül', 'Karabacak', 'Sarıkaya', 'Yeşilyurt', 'Beyazıt', 'Kızılkaya', 'Mavişen', 'Morali', 'Pembeci', 'Turuncu',
    
    // 复合/双重姓氏（罕见）
    'Aydın-Doğan', 'Demir-Çelik', 'Kaya-Taş', 'Yıldız-Ay', 'Güneş-Işık', 'Deniz-Su',
    
    // 其他常见姓氏
    'Akça', 'Baltacı', 'Candan', 'Danışman', 'Elmas', 'Fidancı', 'Gedik', 'Harmancı', 'İşçi', 'Keleş',
    'Lale', 'Meriç', 'Nalbant', 'Okur', 'Pamuk', 'Renklí', 'Sevinç', 'Taşkın', 'Uyar', 'Vural',
    'Yakar', 'Zengin', 'Bulut', 'Cesur', 'Duru', 'Erdal', 'Fidan', 'Göktürk', 'Hızır', 'İlhan'
  ]
},
MY: {
  firstNames: [
    // 马来男性名字（约69%人口）
    'Muhammad', 'Ahmad', 'Ali', 'Hassan', 'Abdullah', 'Ibrahim', 'Ismail', 'Yusuf', 'Mohd', 'Adam',
    'Aiman', 'Amin', 'Arif', 'Azim', 'Danial', 'Fahmi', 'Hafiz', 'Hakim', 'Haikal', 'Harith',
    'Iqbal', 'Irfan', 'Iskandar', 'Izwan', 'Khairul', 'Luqman', 'Nabil', 'Naim', 'Nazri', 'Rizal',
    'Syafiq', 'Syahir', 'Zulkifli', 'Azman', 'Firdaus', 'Haziq', 'Imran', 'Kamarul', 'Nazim', 'Rashid',
    'Farid', 'Hamzah', 'Idris', 'Jalal', 'Kamal', 'Latif', 'Mahathir', 'Najib', 'Omar', 'Razak',
    
    // 马来女性名字
    'Nur', 'Siti', 'Noor', 'Ain', 'Aisyah', 'Aliyah', 'Amira', 'Damia', 'Fatin', 'Hana',
    'Irdina', 'Insyirah', 'Maisarah', 'Nabilah', 'Qistina', 'Safiyyah', 'Sarah', 'Sofia', 'Zara', 'Zahra',
    'Nurul', 'Aina', 'Balqis', 'Diana', 'Erina', 'Fara', 'Hanis', 'Izzah', 'Liyana', 'Najwa',
    'Sharifah', 'Suraya', 'Zaleha', 'Aminah', 'Fatimah', 'Khadijah', 'Maryam', 'Ramlah', 'Rohani', 'Zainab',
    'Amalina', 'Batrisyia', 'Humaira', 'Nabila', 'Nadhirah', 'Qasrina', 'Sofea', 'Yasmin', 'Zulaikha', 'Mariam',
    
    // 华人男性名字（约23%人口）
    'Wei', 'Ming', 'Jie', 'Hao', 'Jun', 'Chen', 'Kai', 'Bin', 'Chong', 'Keng',
    'Leong', 'Seng', 'Teck', 'Yong', 'Wai', 'Chee', 'Kheng', 'Meng', 'Boon', 'Hock',
    'Ah', 'Chuan', 'Fong', 'Heng', 'Kian', 'Kok', 'Liang', 'Peng', 'Soon', 'Swee',
    'Chun', 'Hong', 'Keong', 'Siew', 'Yew', 'Chin', 'Eng', 'Guan', 'Hooi', 'Kar',
    
    // 华人女性名字
    'Li', 'Ying', 'Mei', 'Hui', 'Xin', 'Yan', 'Jing', 'Lin', 'Fang', 'Yun',
    'Siew', 'Pei', 'Sze', 'Ai', 'Foong', 'Bee', 'Cheng', 'Hooi', 'Kum', 'Lay',
    'Lee', 'Ling', 'May', 'Mooi', 'Poh', 'Seok', 'Su', 'Yoke', 'Choo', 'Geok',
    'Eng', 'Foon', 'Har', 'Kam', 'Mee', 'Nget', 'Peck', 'Sim', 'Wah', 'Yee',
    
    // 印度男性名字（约7%人口）
    'Rajesh', 'Kumar', 'Ravi', 'Suresh', 'Anand', 'Prakash', 'Mahesh', 'Dinesh', 'Ramesh', 'Ganesh',
    'Vijay', 'Arun', 'Mohan', 'Krishna', 'Sanjay', 'Manoj', 'Ashok', 'Deepak', 'Naresh', 'Prem',
    'Karthik', 'Naveen', 'Rajan', 'Selvam', 'Velu', 'Murugan', 'Siva', 'Bala', 'Arjun', 'Raj',
    
    // 印度女性名字
    'Devi', 'Lakshmi', 'Priya', 'Meena', 'Geetha', 'Shanti', 'Vani', 'Rani', 'Kamala', 'Radha',
    'Kavitha', 'Sumathi', 'Usha', 'Vasanthi', 'Saraswathi', 'Parvathi', 'Sarojini', 'Manjula', 'Indra', 'Lalitha',
    'Anitha', 'Deepa', 'Nirmala', 'Pushpa', 'Ranjitha', 'Savithri', 'Thanaletchimi', 'Vijaya', 'Malini', 'Sharmila',
    
    // 现代/西化名字（所有族群）
    'Daniel', 'David', 'James', 'Michael', 'Andrew', 'Ryan', 'Brandon', 'Joshua', 'Kevin', 'Jason',
    'Michelle', 'Jessica', 'Rachel', 'Emily', 'Nicole', 'Ashley', 'Amanda', 'Melissa', 'Stephanie', 'Rebecca',
    
    // 原住民名字（Bumiputera其他族群）
    'Awang', 'Dayang', 'Jaya', 'Lian', 'Petra', 'Saling', 'Tuai', 'Empiang', 'Gerawat', 'Jinggot'
  ],
  
  lastNames: [
    // 马来姓氏（通常是父名系统：bin/binti + 父亲名字）
    'Abdullah', 'Ibrahim', 'Ahmad', 'Hassan', 'Ali', 'Ismail', 'Yusuf', 'Omar', 'Othman', 'Mohamed',
    'Salleh', 'Kassim', 'Hamid', 'Hashim', 'Karim', 'Rahman', 'Sulaiman', 'Yaacob', 'Yahya', 'Zakaria',
    'Mansor', 'Mahmud', 'Majid', 'Nasir', 'Noor', 'Osman', 'Ramli', 'Razak', 'Said', 'Seman',
    
    // 马来贵族/皇室姓氏
    'Raja', 'Tengku', 'Tunku', 'Datuk', 'Datin', 'Syed', 'Sharifah', 'Megat', 'Nik', 'Wan',
    'Ungku', 'Che', 'Tok', 'Haji', 'Hajjah', 'Tuan', 'Puan', 'Engku', 'Abang', 'Dayang',
    
    // 华人姓氏（福建、广东、客家等方言群）
    'Tan', 'Lim', 'Lee', 'Ng', 'Ong', 'Wong', 'Teo', 'Chan', 'Liew', 'Heng',
    'Lau', 'Low', 'Koh', 'Goh', 'Tay', 'Sim', 'Yap', 'Chong', 'Yeo', 'Chia',
    'Khor', 'Cheong', 'Ooi', 'Teoh', 'Leong', 'Soh', 'Chew', 'Choong', 'Khoo', 'Koay',
    
    // 华人姓氏（普通话拼音）
    'Chen', 'Wang', 'Zhang', 'Liu', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou', 'Xu',
    'Sun', 'Ma', 'Zhu', 'Hu', 'Guo', 'He', 'Lin', 'Luo', 'Gao', 'Zheng',
    
    // 华人复姓
    'Ang', 'Chiang', 'Chua', 'Gan', 'Haw', 'Ho', 'Kang', 'Kong', 'Kwok', 'Lai',
    'Pang', 'Phang', 'Sia', 'Tang', 'Tong', 'Yeoh', 'Yong', 'Foo', 'Kua', 'Soo',
    
    // 印度姓氏（南印度为主）
    'Kumar', 'Raj', 'Singh', 'Dass', 'Nair', 'Pillai', 'Iyer', 'Iyengar', 'Naidu', 'Reddy',
    'Murugan', 'Gopal', 'Krishnan', 'Raman', 'Samy', 'Sundram', 'Velu', 'Arumugam', 'Maniam', 'Subramaniam',
    'Muthu', 'Selvan', 'Govindasamy', 'Ramasamy', 'Narayanan', 'Balakrishnan', 'Thanaraj', 'Chandran', 'Ananda', 'Balan',
    
    // 印度姓氏（北印度）
    'Sharma', 'Patel', 'Gupta', 'Verma', 'Joshi', 'Mehta', 'Agarwal', 'Chopra', 'Kapoor', 'Malhotra',
    
    // 锡克教姓氏
    'Singh', 'Kaur', 'Gill', 'Sandhu', 'Dhillon', 'Grewal', 'Sidhu', 'Brar', 'Mann', 'Randhawa',
    
    // 伊班族姓氏（砂拉越）
    'Anak', 'Jinggot', 'Empiang', 'Gerawat', 'Jugah', 'Masing', 'Nyanggau', 'Nyarok', 'Rijeng', 'Saling',
    'Tuai', 'Unting', 'Wangi', 'Enteri', 'Ngelambong', 'Jalong', 'Mujah', 'Bedindang', 'Mamit', 'Bangat',
    
    // 卡达山杜顺族姓氏（沙巴）
    'Johari', 'Gimbad', 'Kitingan', 'Pairin', 'Salleh', 'Siringan', 'Undikai', 'Andika', 'Mojuntin', 'Mositun',
    
    // 葡萄牙/欧亚混血姓氏（Kristang社群）
    'De Silva', 'Fernandes', 'Rodrigues', 'De Souza', 'Pereira', 'Dias', 'Fernandez', 'Gomez', 'D\'Cruz', 'Pinto',
    'D\'Almeida', 'Sequeira', 'Monteiro', 'Santos', 'Menezes', 'Carvalho', 'Aeria', 'D\'Rozario', 'Sta Maria', 'De Costa',
    
    // 基督教/天主教化姓氏
    'Anthony', 'Bernard', 'Christopher', 'David', 'Francis', 'George', 'Henry', 'James', 'John', 'Joseph',
    'Michael', 'Paul', 'Peter', 'Robert', 'Stephen', 'Thomas', 'William', 'Andrew', 'Daniel', 'Matthew',
    
    // 混合/现代姓氏
    'Abdullah Sani', 'Mohamed Ali', 'Ahmad Shah', 'Hassan Abdullah', 'Ibrahim Ismail', 'Tan Abdullah', 'Lee Mohamed',
    
    // 双姓氏（较罕见）
    'Tan Sri', 'Dato Seri', 'Tan Abdullah', 'Lee Kumar', 'Chan Singh', 'Wong Abdullah',
    
    // 其他常见马来姓氏
    'Adnan', 'Bakar', 'Basir', 'Din', 'Ghani', 'Halim', 'Husin', 'Idris', 'Jamil', 'Kadir',
    'Latif', 'Majid', 'Manaf', 'Musa', 'Mustafa', 'Nizam', 'Nordin', 'Razali', 'Saad', 'Salleh',
    'Samad', 'Taib', 'Yusoff', 'Zain', 'Zainal', 'Zaki', 'Zaman', 'Zulkifli', 'Aziz', 'Harun',
    
    // 其他常见华人姓氏
    'Beh', 'Chai', 'Chay', 'Cheng', 'Chiam', 'Chin', 'Chong', 'Choo', 'Chow', 'Chu',
    'Fong', 'Hoe', 'Hong', 'Hoo', 'Hsia', 'Hsu', 'Huat', 'Hwang', 'Kam', 'Kang',
    'Kee', 'Khong', 'Kin', 'King', 'Kiong', 'Kooi', 'Lam', 'Law', 'Loke', 'Mok',
    
    // 其他常见印度姓氏
    'Anthonysamy', 'Doraisamy', 'Karuppiah', 'Muniandy', 'Perumal', 'Saminathan', 'Suppiah', 'Vasudevan', 'Veloo', 'Veerasamy'
  ]
},
ID: {
  firstNames: [
    // 爪哇男性名字（最大族群，约40%）
    'Budi', 'Agus', 'Andi', 'Bambang', 'Dwi', 'Eko', 'Hadi', 'Joko', 'Putra', 'Rudi',
    'Slamet', 'Sugeng', 'Susilo', 'Tri', 'Wahyu', 'Yanto', 'Gunawan', 'Hartono', 'Santoso', 'Wijaya',
    'Adi', 'Arif', 'Bayu', 'Dian', 'Fajar', 'Hendra', 'Indra', 'Rizki', 'Wawan', 'Yoga',
    
    // 爪哇女性名字
    'Sri', 'Siti', 'Dewi', 'Ratna', 'Wati', 'Endang', 'Ningsih', 'Yanti', 'Ayu', 'Putri',
    'Indah', 'Maya', 'Rina', 'Sari', 'Fitri', 'Lestari', 'Nurul', 'Retno', 'Suci', 'Widya',
    'Ani', 'Diah', 'Erna', 'Ika', 'Lina', 'Novi', 'Rini', 'Tuti', 'Yuni', 'Wulan',
    
    // 伊斯兰/阿拉伯名字（男性）
    'Muhammad', 'Ahmad', 'Abdul', 'Abdullah', 'Ali', 'Amir', 'Aziz', 'Fahmi', 'Faisal', 'Hakim',
    'Hasan', 'Ibrahim', 'Ilham', 'Ismail', 'Malik', 'Omar', 'Rafli', 'Rizal', 'Yusuf', 'Zainal',
    'Ardiansyah', 'Hidayat', 'Nugraha', 'Ramadan', 'Syahrul', 'Zainudin', 'Firmansyah', 'Irfan', 'Lukman', 'Ridwan',
    
    // 伊斯兰/阿拉伯名字（女性）
    'Fatimah', 'Aisyah', 'Aminah', 'Fatma', 'Khadijah', 'Maryam', 'Nuriah', 'Salmah', 'Zahra', 'Zainab',
    'Latifah', 'Nafisah', 'Rahma', 'Safira', 'Salma', 'Syifa', 'Ulfah', 'Zakiyah', 'Azzahra', 'Nayla',
    
    // 巽他族名字（西爪哇，约15%）
    'Dedi', 'Dede', 'Ujang', 'Asep', 'Iwan', 'Entis', 'Dadang', 'Dadan', 'Yadi', 'Udin',
    'Ai', 'Euis', 'Eneng', 'Neneng', 'Teh', 'Lilis', 'Imas', 'Neng', 'Cucu', 'Ade',
    
    // 苏门答腊名字（米南加保、巴tak等）
    'Andi', 'Benny', 'Charlie', 'Denny', 'Eddy', 'Ferry', 'Gery', 'Henry', 'Irwan', 'Jimmy',
    'Roni', 'Tony', 'Willy', 'Yopie', 'Zulkifli', 'Ridho', 'Teguh', 'Syamsul', 'Hairul', 'Khairul',
    'Rina', 'Yenny', 'Fitri', 'Yanti', 'Siska', 'Mira', 'Linda', 'Rika', 'Elvi', 'Sari',
    
    // 巴厘岛名字（印度教，约1.7%）
    'Made', 'Wayan', 'Nyoman', 'Ketut', 'Putu', 'Komang', 'Kadek', 'Gede', 'Nengah', 'Iluh',
    
    // 现代/流行名字（男性）
    'Arya', 'Dimas', 'Farhan', 'Gibran', 'Kenzo', 'Naufal', 'Rafif', 'Satria', 'Sulthan', 'Zidan',
    'Aditya', 'Alif', 'Arkan', 'Bintang', 'Damar', 'Erland', 'Farel', 'Ghifari', 'Hafiz', 'Ilham',
    
    // 现代/流行名字（女性）
    'Alisha', 'Azzahra', 'Cantika', 'Nayla', 'Keysha', 'Zalfa', 'Aira', 'Kayla', 'Aurel', 'Zara',
    'Aisyah', 'Calista', 'Shakila', 'Tiara', 'Nabila', 'Syifa', 'Anindya', 'Bella', 'Cinta', 'Dira',
    
    // 华裔印尼名字（约3%）
    'Hendrik', 'Richard', 'Vincent', 'William', 'David', 'Steven', 'Michael', 'Daniel', 'Anthony', 'Kevin',
    'Jessica', 'Michelle', 'Christine', 'Jennifer', 'Angela', 'Monica', 'Stefanie', 'Melinda', 'Felicia', 'Stephanie',
    'Budi', 'Andi', 'Rudi', 'Hendra', 'Indra', 'Susi', 'Lina', 'Rina', 'Mira', 'Dina',
    
    // 基督教名字
    'Petrus', 'Paulus', 'Yohanes', 'Markus', 'Andreas', 'Simon', 'Stefanus', 'Lukas', 'Yakobus', 'Tomas',
    'Maria', 'Magdalena', 'Elisabeth', 'Ruth', 'Ester', 'Debora', 'Sara', 'Rebeka', 'Hanna', 'Rut',
    
    // 马鲁古/巴布亚名字
    'Yosef', 'Yosua', 'Yohanis', 'Amos', 'Musa', 'Salmon', 'Kornelius', 'Abisai', 'Rafael', 'Gabriel',
    
    // 短昵称形式
    'Agung', 'Bagus', 'Catur', 'Dony', 'Erik', 'Feri', 'Galih', 'Heri', 'Ivan', 'Jaya'
  ],
  
  lastNames: [
    // 爪哇姓氏模式（通常无固定姓氏，但有常见尾缀）
    'Prasetyo', 'Setiawan', 'Nugroho', 'Wibowo', 'Santoso', 'Wijaya', 'Kusuma', 'Saputra', 'Gunawan', 'Putra',
    'Utomo', 'Hartono', 'Susanto', 'Pramono', 'Suryanto', 'Wahyudi', 'Hidayat', 'Kurniawan', 'Atmaja', 'Aditya',
    
    // -anto/-ono结尾（爪哇特色）
    'Prabowo', 'Widodo', 'Susilo', 'Sukarno', 'Haryono', 'Suharto', 'Bambang', 'Handoko', 'Yuwono', 'Supriyanto',
    'Sugianto', 'Subagyo', 'Sutrisno', 'Sulistyo', 'Suryono', 'Suyanto', 'Priyanto', 'Raharjo', 'Riyanto', 'Saptono',
    
    // -awan/-wan结尾（现代常见）
    'Budiman', 'Hermawan', 'Firmansyah', 'Kurniawan', 'Setiawan', 'Syahputra', 'Rahadian', 'Pratama', 'Nugraha', 'Ramadhan',
    'Kurniadi', 'Maulana', 'Permana', 'Purnama', 'Saputra', 'Setyawan', 'Surya', 'Widjaya', 'Wijayanto', 'Yudhistira',
    
    // 爪哇贵族姓氏（Raden, Mas等前缀）
    'Kartini', 'Mangkunegara', 'Pakubuwono', 'Hamengkubuwono', 'Adipati', 'Ranggawarsita', 'Notodiningrat', 'Kusumadiningrat',
    
    // 巽他族姓氏
    'Saepudin', 'Permana', 'Ramadhan', 'Setiadi', 'Suryadi', 'Mulyadi', 'Kurnia', 'Nuryadin', 'Rohaedi', 'Sudrajat',
    'Firmansyah', 'Muhamad', 'Nurdin', 'Ridwan', 'Ruslan', 'Salman', 'Sodikin', 'Syamsuddin', 'Yusuf', 'Zaenal',
    
    // 米南加保姓氏（Minangkabau，西苏门答腊）
    'Datuak', 'Gelar', 'Sutan', 'Rajo', 'Sidi', 'Bakar', 'Nasution', 'Lubis', 'Siregar', 'Harahap',
    'Rangkuti', 'Dalimunthe', 'Rambe', 'Hasibuan', 'Pulungan', 'Batubara', 'Tanjung', 'Daulay', 'Panjaitan', 'Simatupang',
    
    // 巴tak族姓氏（北苏门答腊）
    'Siahaan', 'Simanjuntak', 'Situmorang', 'Sihombing', 'Sihotang', 'Sinaga', 'Simbolon', 'Sitorus', 'Tampubolon', 'Manurung',
    'Hutabarat', 'Hutapea', 'Nababan', 'Napitupulu', 'Pardede', 'Pasaribu', 'Purba', 'Sagala', 'Saragih', 'Silalahi',
    
    // 亚齐姓氏（北苏门答腊）
    'Abdullah', 'Usman', 'Ibrahim', 'Yusuf', 'Ismail', 'Hasan', 'Idris', 'Zakaria', 'Daud', 'Mahmud',
    
    // 巴厘岛姓氏（种姓系统）
    'Ngurah', 'Agung', 'Oka', 'Arya', 'Bagus', 'Dewa', 'Ida', 'Gusti', 'Tjokorda', 'Anak Agung',
    
    // 华裔印尼姓氏（福建闽南为主）
    'Tan', 'Lim', 'Lie', 'Tio', 'Oei', 'Kwee', 'Tjoa', 'Tjan', 'Go', 'Thio',
    'Wijaya', 'Salim', 'Rusli', 'Tanoto', 'Hartono', 'Suharto', 'Ciputra', 'Riady', 'Sumargo', 'Wanandi',
    'Ang', 'Chua', 'Goh', 'Kho', 'Liem', 'Nio', 'Sie', 'Tee', 'Wee', 'Yap',
    
    // 印尼化华人姓氏（苏哈托时期强制改名）
    'Halim', 'Hasyim', 'Husein', 'Karim', 'Nasir', 'Rahman', 'Salim', 'Usman', 'Wahid', 'Yasin',
    'Budiono', 'Gunawan', 'Hermanto', 'Irawan', 'Kurnia', 'Limantara', 'Muljono', 'Nugroho', 'Purnomo', 'Raharjo',
    
    // 基督教姓氏（东部地区）
    'Wattimena', 'Pattiasina', 'Sahetapy', 'Latuheru', 'Matulessy', 'Tuhumury', 'Leimena', 'Sopacua', 'Loppies', 'Pattiselanno',
    
    // 马鲁古姓氏
    'Tahalele', 'Tuasikal', 'Aponno', 'Foenay', 'Haumahu', 'Kakisina', 'Loupatty', 'Metekohy', 'Notanubun', 'Souissa',
    
    // 巴布亚姓氏
    'Wamafma', 'Yoman', 'Waromi', 'Mandacan', 'Ayorbaba', 'Sombuk', 'Bonay', 'Kareth', 'Numberi', 'Wiranata',
    
    // 现代/混合姓氏
    'Adi Putra', 'Budi Santoso', 'Darmawan', 'Efendi', 'Fauzan', 'Habibi', 'Irawan', 'Junaedi', 'Kuncoro', 'Laksono',
    'Mahendra', 'Nusantara', 'Pratama', 'Rachman', 'Sulistyo', 'Tirtayasa', 'Utama', 'Wardana', 'Yudha', 'Zaenudin',
    
    // 描述性/意义姓氏
    'Jaya', 'Sukma', 'Cahaya', 'Mulia', 'Sejati', 'Perdana', 'Utama', 'Mandiri', 'Sentosa', 'Makmur',
    
    // 伊斯兰/阿拉伯姓氏
    'Al-Amin', 'Al-Hakim', 'Al-Rashid', 'Basri', 'Fadhil', 'Hamdani', 'Ihsan', 'Jamal', 'Kamil', 'Latif',
    'Mahfud', 'Natsir', 'Rais', 'Shihab', 'Taufik', 'Umar', 'Wahab', 'Yahya', 'Zaini', 'Zulkarnaen',
    
    // 职业相关
    'Tukang', 'Pandai', 'Dagang', 'Petani', 'Nelayan', 'Kusir', 'Tani', 'Juru', 'Ahli', 'Pande',
    
    // 单名（印尼特色，无姓氏）
    'Soekarno', 'Soeharto', 'Habibie', 'Megawati', 'Yudhoyono', 'Jokowi', 'Prabowo', 'Anies', 'Ridwan', 'Risma',
    
    // 其他常见姓氏
    'Achyar', 'Basuki', 'Chandra', 'Darma', 'Erlangga', 'Firdaus', 'Gustiawan', 'Hamzah', 'Indarto', 'Julianto',
    'Kamaruddin', 'Luhur', 'Mulyadi', 'Nasution', 'Oktavian', 'Pranoto', 'Qadir', 'Rachmat', 'Sadeli', 'Taufan',
    'Utomo', 'Vernando', 'Wahab', 'Yamin', 'Zaenal', 'Akbar', 'Budiarto', 'Catur', 'Djoko', 'Effendi'
  ]
},
PH: {
  firstNames: [
    // 传统男性名字（西班牙起源）
    'Jose', 'Juan', 'Pedro', 'Antonio', 'Francisco', 'Manuel', 'Jesus', 'Carlos', 'Luis', 'Miguel',
    'Rafael', 'Fernando', 'Alejandro', 'Ricardo', 'Roberto', 'Eduardo', 'Rodrigo', 'Ramon', 'Alfredo', 'Emilio',
    'Domingo', 'Salvador', 'Vicente', 'Mariano', 'Andres', 'Enrique', 'Sergio', 'Daniel', 'Martin', 'Lorenzo',
    
    // 传统女性名字（西班牙起源）
    'Maria', 'Ana', 'Rosa', 'Carmen', 'Teresa', 'Luz', 'Gloria', 'Elena', 'Isabel', 'Pilar',
    'Concepcion', 'Esperanza', 'Dolores', 'Mercedes', 'Victoria', 'Soledad', 'Corazon', 'Milagros', 'Rosario', 'Trinidad',
    'Lourdes', 'Remedios', 'Socorro', 'Leonor', 'Beatriz', 'Angelita', 'Catalina', 'Josefina', 'Paz', 'Fe',
    
    // 美式/英文名字（男性）
    'John', 'Mark', 'Michael', 'James', 'Christopher', 'Joshua', 'David', 'Matthew', 'Andrew', 'Daniel',
    'Ryan', 'Kevin', 'Jason', 'Justin', 'Brandon', 'Anthony', 'Steven', 'Eric', 'Brian', 'Kenneth',
    'Jonathan', 'Patrick', 'Richard', 'Ronald', 'Paul', 'Robert', 'Joseph', 'Charles', 'Edward', 'Jeffrey',
    
    // 美式/英文名字（女性）
    'Mary', 'Jennifer', 'Michelle', 'Christine', 'Angela', 'Jessica', 'Sarah', 'Stephanie', 'Amanda', 'Nicole',
    'Melissa', 'Rebecca', 'Rachel', 'Elizabeth', 'Katherine', 'Patricia', 'Linda', 'Barbara', 'Susan', 'Nancy',
    'Karen', 'Lisa', 'Betty', 'Dorothy', 'Sandra', 'Ashley', 'Emily', 'Hannah', 'Sophia', 'Olivia',
    
    // 复合名字（菲律宾特色）- 男性
    'Juan Carlos', 'Jose Maria', 'John Paul', 'Mark Anthony', 'John Michael', 'Jose Antonio', 'Miguel Angel',
    'Juan Paolo', 'Jose Luis', 'John Christian', 'Mark Joseph', 'Joshua Miguel', 'Rafael Antonio', 'Carlos Eduardo',
    
    // 复合名字（菲律宾特色）- 女性
    'Maria Christina', 'Ana Maria', 'Maria Teresa', 'Mary Grace', 'Mary Ann', 'Mary Jane', 'Maria Victoria',
    'Ana Liza', 'Maria Paz', 'Mary Rose', 'Maria Elena', 'Mary Joy', 'Maria Isabel', 'Anna Marie',
    
    // 现代流行名字（男性）
    'Nathan', 'Ethan', 'Jacob', 'Gabriel', 'Samuel', 'Benjamin', 'Elijah', 'Alexander', 'Noah', 'Lucas',
    'Andrei', 'Gian', 'Joaquin', 'Sebastian', 'Tristan', 'Zachary', 'Aaron', 'Caleb', 'Lance', 'Marc',
    
    // 现代流行名字（女性）
    'Angelica', 'Samantha', 'Isabella', 'Bianca', 'Katrina', 'Cassandra', 'Andrea', 'Monica', 'Patricia', 'Clarissa',
    'Kristine', 'Vanessa', 'Jasmine', 'Chelsea', 'Amber', 'Crystal', 'Destiny', 'Faith', 'Hope', 'Charity',
    
    // 缩短/昵称形式（男性）
    'Jun', 'Boy', 'Jojo', 'Nonoy', 'Popoy', 'Dodong', 'Totoy', 'Nene', 'Boboy', 'Toto',
    'Cocoy', 'Bong', 'Junjun', 'Dindo', 'Bimby', 'Kiko', 'Aga', 'Coco', 'Piolo', 'Jericho',
    
    // 缩短/昵称形式（女性）
    'Ate', 'Nene', 'Inday', 'Tina', 'Liza', 'Alma', 'Nora', 'Vilma', 'Sharon', 'Kris',
    'Judy', 'Angel', 'Marian', 'Kim', 'Anne', 'Sarah', 'Toni', 'Bea', 'Heart', 'Julia',
    
    // 独特菲律宾名字（Tagalog起源）
    'Makisig', 'Bayani', 'Dakila', 'Lakas', 'Buhawi', 'Dalisay', 'Bituin', 'Ligaya', 'Tala', 'Mahal',
    'Sinta', 'Hiraya', 'Mayumi', 'Althea', 'Marikit', 'Ningning', 'Mutya', 'Luningning', 'Liwayway', 'Diwata',
    
    // 混合中国-菲律宾名字
    'Kenneth', 'Jeffrey', 'Edwin', 'Raymond', 'Alvin', 'Brian', 'Dennis', 'Gilbert', 'Henry', 'Vincent',
    'Sharon', 'Shirley', 'Grace', 'Rose', 'Cecile', 'Helen', 'Lily', 'Ruby', 'Pearl', 'Jade',
    
    // 穆斯林名字（棉兰老岛）
    'Abdullah', 'Ahmad', 'Ibrahim', 'Yusuf', 'Omar', 'Hassan', 'Khalid', 'Rashid', 'Zainul', 'Jalil',
    'Fatima', 'Aisyah', 'Noraida', 'Zenaida', 'Aminah', 'Khadija', 'Rohani', 'Saleha', 'Zaiton', 'Norma',
    
    // 现代独特名字
    'Xian', 'Primo', 'Franco', 'Marco', 'Carlo', 'Paolo', 'Rico', 'Vince', 'Gab', 'Kyle',
    'Ysabel', 'Mika', 'Sofia', 'Zoe', 'Kaye', 'Gail', 'Pia', 'Lea', 'Regine', 'Lani'
  ],
  
  lastNames: [
    // 最常见西班牙姓氏
    'Santos', 'Reyes', 'Cruz', 'Bautista', 'Ocampo', 'Garcia', 'Mendoza', 'Torres', 'Gonzales', 'Lopez',
    'Flores', 'Ramos', 'Rivera', 'Gomez', 'Fernandez', 'Perez', 'Rodriguez', 'Sanchez', 'Ramirez', 'Diaz',
    
    // 圣人/宗教姓氏
    'De La Cruz', 'Dela Cruz', 'San Jose', 'Santa Maria', 'Santo Domingo', 'San Pedro', 'Santiago',
    'Del Rosario', 'De Jesus', 'De Los Santos', 'De Guzman', 'De Castro', 'Del Carmen', 'De Leon',
    
    // 常见西班牙姓氏
    'Navarro', 'Gutierrez', 'Castro', 'Ortega', 'Morales', 'Herrera', 'Jimenez', 'Rojas', 'Vargas', 'Medina',
    'Castillo', 'Guerrero', 'Valdez', 'Salazar', 'Aguilar', 'Velasco', 'Soriano', 'Villanueva', 'Mercado', 'Padilla',
    
    // De前缀贵族姓氏
    'De Vera', 'De Asis', 'De Luna', 'De Mesa', 'De Dios', 'De Silva', 'De Villa', 'De Torres',
    'De Lara', 'De Chavez', 'De Guia', 'De Paz', 'De Roxas', 'De Ocampo', 'De Venecia', 'De Los Reyes',
    
    // 地名相关姓氏
    'Manalo', 'Magsaysay', 'Macapagal', 'Mabini', 'Quezon', 'Aguinaldo', 'Bonifacio', 'Rizal', 'Maranao', 'Tausug',
    'Ilocano', 'Pangasinan', 'Tagalog', 'Bisaya', 'Batangas', 'Cavite', 'Laguna', 'Manila', 'Cebu', 'Davao',
    
    // 职业/描述性姓氏
    'Aquino', 'Alfonso', 'Salvador', 'Antonio', 'Francisco', 'Vicente', 'Domingo', 'Manuel', 'Carlos', 'Miguel',
    
    // 中国-菲律宾姓氏（福建闽南为主）
    'Tan', 'Lim', 'Ong', 'Lee', 'Go', 'Chua', 'Sy', 'Yap', 'Chan', 'Uy',
    'Co', 'Ang', 'Dy', 'Goh', 'Kho', 'Ng', 'Tiu', 'Siy', 'Yao', 'Yu',
    'Cheng', 'Cue', 'Dee', 'Diy', 'Kua', 'Lao', 'Ong', 'Que', 'See', 'Teo',
    
    // 西班牙化中国姓氏
    'Limjoco', 'Limkaichong', 'Yuchengco', 'Gokongwei', 'Tanchuling', 'Cojuangco', 'Tambunting', 'Yaptinchay', 'Teehankee',
    
    // 混合姓氏
    'Tan-Cruz', 'Lim-Santos', 'Ong-Reyes', 'Lee-Garcia', 'Go-Mendoza', 'Chua-Torres',
    
    // 其他西班牙姓氏
    'Alvarez', 'Alonso', 'Blanco', 'Cabrera', 'Cortes', 'Dominguez', 'Espinosa', 'Estrada', 'Franco', 'Ibarra',
    'Leon', 'Luna', 'Martin', 'Miranda', 'Molina', 'Nunez', 'Parra', 'Quiroz', 'Soto', 'Suarez',
    
    // 葡萄牙姓氏（较少见）
    'Dias', 'Pereira', 'Fernandes', 'Silva', 'Costa', 'Rodrigues', 'Almeida', 'Carvalho', 'Ferreira', 'Oliveira',
    
    // 本土化西班牙姓氏
    'Magno', 'Grande', 'Bueno', 'Dizon', 'Roque', 'Nieves', 'Trinidad', 'Angeles', 'Pastor', 'Salvador',
    'Pascual', 'Mariano', 'Gabriel', 'Rafael', 'Esteban', 'Lorenzo', 'Mateo', 'Pablo', 'Simon', 'Tomas',
    
    // 穆斯林姓氏（棉兰老岛）
    'Abdullah', 'Ibrahim', 'Ismail', 'Hassan', 'Hussein', 'Khalid', 'Rashid', 'Salim', 'Yusuf', 'Zainul',
    'Alonto', 'Dimaporo', 'Lucman', 'Maruhom', 'Pendatun', 'Sarip', 'Sinsuat', 'Adiong', 'Balindong', 'Guimba',
    
    // 美式化姓氏（少见）
    'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas',
    
    // 意大利姓氏（少见）
    'Romano', 'Bruno', 'Marino', 'Greco', 'Ferrari', 'Rossi', 'Colombo', 'Conti', 'Ricci', 'Gallo',
    
    // 双姓氏（连字符）
    'Garcia-Santos', 'Reyes-Cruz', 'Mendoza-Torres', 'Lopez-Bautista', 'Gonzales-Ramos',
    'Aquino-Santos', 'Cojuangco-Aquino', 'Roxas-Gonzales', 'Osmeña-Reyes', 'Laurel-Santos',
    
    // 复合姓氏（无连字符）
    'Dela Rosa', 'San Juan', 'Santa Ana', 'Santo Tomas', 'Del Mundo', 'Del Prado',
    'San Miguel', 'Santa Cruz', 'Del Pilar', 'San Antonio', 'Santa Rosa', 'Del Rio',
    
    // 其他常见姓氏
    'Abella', 'Briones', 'Calderon', 'Delos Santos', 'Enriquez', 'Figueroa', 'Galang', 'Hernandez', 'Ignacio', 'Javier',
    'Kalaw', 'Lacson', 'Manzano', 'Natividad', 'Obispo', 'Pascua', 'Quintos', 'Rosales', 'Sarmiento', 'Tolentino',
    'Umali', 'Velasquez', 'Yabut', 'Zapanta', 'Abad', 'Baltazar', 'Corazon', 'Dantes', 'Ejercito', 'Fajardo',
    
    // 政治家族姓氏
    'Marcos', 'Duterte', 'Arroyo', 'Estrada', 'Binay', 'Villar', 'Pacquiao', 'Romualdez', 'Singson', 'Remulla',
    
    // 财阀家族姓氏
    'Ayala', 'Zobel', 'Soriano', 'Aboitiz', 'Lopez', 'Consunji', 'Razon', 'Pangilinan', 'Gokongwei', 'Tan',
    
    // 娱乐界常见姓氏
    'Padilla', 'Gutierrez', 'Fernandez', 'Barretto', 'Concepcion', 'Eigenmann', 'Muhlach', 'Rivera', 'Sotto', 'Gonzaga'
  ]
},
};