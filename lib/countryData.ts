export interface CountryConfig {  
  code: string;  
  name: string;  
  phonePrefix: string;  
  phoneFormat: string;  
  flag: string;  
}  
  
export const countries: CountryConfig[] = [  
  { code: 'CN', name: '中国', phonePrefix: '+86', phoneFormat: '1XXXXXXXXXX', flag: '🇨🇳' },  
  { code: 'HK', name: '香港', phonePrefix: '+852', phoneFormat: 'XXXX XXXX', flag: '🇭🇰' },  
  { code: 'TW', name: '台灣', phonePrefix: '+886', phoneFormat: 'XXXX XXX XXX', flag: '🇹🇼' },  
  { code: 'MO', name: '澳門', phonePrefix: '+853', phoneFormat: 'XXXX XXXX', flag: '🇲🇴' },  
  { code: 'SG', name: '新加坡', phonePrefix: '+65', phoneFormat: 'XXXX XXXX', flag: '🇸🇬' },  
  { code: 'US', name: '美国', phonePrefix: '+1', phoneFormat: 'XXX-XXX-XXXX', flag: '🇺🇸' },  
  { code: 'JP', name: '日本', phonePrefix: '+81', phoneFormat: 'XX-XXXX-XXXX', flag: '🇯🇵' },  
  { code: 'GB', name: '英国', phonePrefix: '+44', phoneFormat: 'XXXX XXX XXX', flag: '🇬🇧' },  
  { code: 'DE', name: '德国', phonePrefix: '+49', phoneFormat: 'XXX XXXXXXXX', flag: '🇩🇪' },  
  { code: 'FR', name: '法国', phonePrefix: '+33', phoneFormat: 'X XX XX XX XX', flag: '🇫🇷' },  
  { code: 'KR', name: '韩国', phonePrefix: '+82', phoneFormat: 'XX-XXXX-XXXX', flag: '🇰🇷' },  
  { code: 'CA', name: '加拿大', phonePrefix: '+1', phoneFormat: 'XXX-XXX-XXXX', flag: '🇨🇦' },  
  { code: 'AU', name: '澳大利亚', phonePrefix: '+61', phoneFormat: 'XXX XXX XXX', flag: '🇦🇺' },  
  { code: 'IT', name: '意大利', phonePrefix: '+39', phoneFormat: 'XXX XXX XXXX', flag: '🇮🇹' },  
  { code: 'ES', name: '西班牙', phonePrefix: '+34', phoneFormat: 'XXX XX XX XX', flag: '🇪🇸' },  
  { code: 'BR', name: '巴西', phonePrefix: '+55', phoneFormat: 'XX XXXXX-XXXX', flag: '🇧🇷' },  
  { code: 'RU', name: '俄罗斯', phonePrefix: '+7', phoneFormat: 'XXX XXX-XX-XX', flag: '🇷🇺' },  
  { code: 'IN', name: '印度', phonePrefix: '+91', phoneFormat: 'XXXXX XXXXX', flag: '🇮🇳' },  
  { code: 'MX', name: '墨西哥', phonePrefix: '+52', phoneFormat: 'XXX XXX XXXX', flag: '🇲🇽' },  
  { code: 'NL', name: '荷兰', phonePrefix: '+31', phoneFormat: 'X XXXXXXXX', flag: '🇳🇱' },  
  { code: 'SE', name: '瑞典', phonePrefix: '+46', phoneFormat: 'XX-XXX XX XX', flag: '🇸🇪' },  
  { code: 'CH', name: '瑞士', phonePrefix: '+41', phoneFormat: 'XX XXX XX XX', flag: '🇨🇭' },  
  { code: 'PL', name: '波兰', phonePrefix: '+48', phoneFormat: 'XXX XXX XXX', flag: '🇵🇱' },  
  { code: 'TR', name: '土耳其', phonePrefix: '+90', phoneFormat: 'XXX XXX XX XX', flag: '🇹🇷' },  
  { code: 'TH', name: '泰国', phonePrefix: '+66', phoneFormat: 'XX XXX XXXX', flag: '🇹🇭' },  
  { code: 'MY', name: '马来西亚', phonePrefix: '+60', phoneFormat: 'XX-XXX XXXX', flag: '🇲🇾' },  
  { code: 'ID', name: '印度尼西亚', phonePrefix: '+62', phoneFormat: 'XXX-XXX-XXXX', flag: '🇮🇩' },  
  { code: 'PH', name: '菲律宾', phonePrefix: '+63', phoneFormat: 'XXX XXX XXXX', flag: '🇵🇭' },  
  { code: 'VN', name: '越南', phonePrefix: '+84', phoneFormat: 'XXX XXX XXXX', flag: '🇻🇳' },  
];  
  
export const namesByCountry: Record<string, { firstNames: string[], lastNames: string[] }> = {  
  // 中国大陆 - 简体中文
  CN: {  
    firstNames: [  
      '伟', '强', '磊', '军', '波', '涛', '超', '勇', '杰', '鹏',  
      '浩', '亮', '宇', '辉', '刚', '健', '峰', '建', '明', '勇',  
      '芳', '娜', '秀英', '敏', '静', '丽', '强', '艳', '秀兰', '莉',  
      '玲', '燕', '红', '霞', '梅', '婷', '雪', '倩', '琳', '慧'  
    ],  
    lastNames: [  
      '王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',  
      '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',  
      '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧'  
    ],  
  },
  // 香港 - 繁体中文
  HK: {  
    firstNames: [  
      '志明', '家豪', '偉豪', '健華', '俊傑', '建華', '俊宏', '志偉', '家輝', '偉強',  
      '嘉欣', '詩雅', '詠琪', '美玲', '雅婷', '慧敏', '淑賢', '美華', '麗珍', '秀娟'  
    ],  
    lastNames: [  
      '陳', '黃', '李', '林', '張', '吳', '劉', '梁', '鄭', '何',  
      '羅', '高', '葉', '朱', '鍾', '盧', '潘', '謝', '曾', '鄧'  
    ],  
  },
  // 台湾 - 繁体中文
  TW: {  
    firstNames: [  
      '志豪', '建宏', '家豪', '俊宏', '志偉', '宗翰', '宇翔', '承翰', '冠廷', '柏翰',  
      '淑芬', '雅婷', '怡君', '淑惠', '美玲', '佩珊', '雅雯', '欣怡', '詩涵', '靜怡'  
    ],  
    lastNames: [  
      '陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊',  
      '鄭', '賴', '謝', '徐', '許', '何', '羅', '葉', '蘇', '周'  
    ],  
  },
  // 澳门 - 繁体中文
  MO: {  
    firstNames: [  
      '志明', '嘉欣', '家豪', '詩雅', '偉豪', '詠琪', '健華', '美玲', '俊傑', '雅婷',  
      '建華', '淑賢', '志強', '慧敏', '德華', '美華', '家輝', '麗珍', '俊宏', '秀娟'  
    ],  
    lastNames: [  
      '陳', '黃', '李', '林', '張', '吳', '劉', '梁', '鄭', '何',  
      '羅', '高', '葉', '朱', '鍾', '盧', '潘', '謝', '曾', '鄧'  
    ],  
  },
  // 新加坡 - 简体中文（新加坡官方使用简体）
  SG: {  
    firstNames: [  
      'Wei Ming', 'Jun Hao', 'Kai Wen', 'Jia Wei', 'Zhi Hao', 'Wei Jie', 'Jun Wei', 'Kai Yang',  
      'Hui Ling', 'Xin Yi', 'Ying Xuan', 'Li Ting', 'Mei Lin', 'Hui Min', 'Xin Hui', 'Ying Ying'  
    ],  
    lastNames: [  
      'Tan', 'Lim', 'Lee', 'Ng', 'Ong', 'Wong', 'Goh', 'Chua', 'Chan', 'Koh',  
      'Teo', 'Ang', 'Yeo', 'Low', 'Tay', 'Sim', 'Chia', 'Ho', 'Chong', 'Seah'  
    ],  
  },
  US: {  
    firstNames: [  
      'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',  
      'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',  
      'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',  
      'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle'  
    ],  
    lastNames: [  
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',  
      'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',  
      'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'  
    ],  
  },
  GB: {  
    firstNames: [  
      'Oliver', 'George', 'Harry', 'Noah', 'Jack', 'Leo', 'Arthur', 'Muhammad', 'Oscar', 'Charlie',  
      'Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Ivy', 'Lily', 'Isabella', 'Rosie', 'Sophia'  
    ],  
    lastNames: [  
      'Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',  
      'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'Wright', 'Watson', 'Edwards', 'Hughes'  
    ],  
  },
  DE: {  
    firstNames: [  
      'Maximilian', 'Alexander', 'Paul', 'Elias', 'Ben', 'Noah', 'Leon', 'Louis', 'Jonas', 'Felix',  
      'Marie', 'Sophie', 'Maria', 'Sophia', 'Emilia', 'Emma', 'Hannah', 'Anna', 'Mia', 'Luisa'  
    ],  
    lastNames: [  
      'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann',  
      'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann'  
    ],  
  },
  FR: {  
    firstNames: [  
      'Gabriel', 'Léo', 'Raphaël', 'Arthur', 'Louis', 'Lucas', 'Adam', 'Jules', 'Hugo', 'Maël',  
      'Jade', 'Louise', 'Emma', 'Ambre', 'Alice', 'Alba', 'Rose', 'Anna', 'Mia', 'Romy'  
    ],  
    lastNames: [  
      'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent',  
      'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard'  
    ],  
  },
  RU: {  
    firstNames: [  
      'Alexander', 'Mikhail', 'Maxim', 'Ivan', 'Artem', 'Dmitry', 'Daniil', 'Mark', 'Lev', 'Matvey',  
      'Sofia', 'Maria', 'Anna', 'Alice', 'Victoria', 'Polina', 'Eva', 'Elizaveta', 'Arina', 'Varvara'  
    ],  
    lastNames: [  
      'Ivanov', 'Smirnov', 'Kuznetsov', 'Popov', 'Vasilyev', 'Petrov', 'Sokolov', 'Mikhailov', 'Novikov', 'Fedorov',  
      'Morozov', 'Volkov', 'Alekseev', 'Lebedev', 'Semenov', 'Egorov', 'Pavlov', 'Kozlov', 'Stepanov', 'Nikolaev'  
    ],  
  },
  JP: {  
    firstNames: [  
      '太郎', '一郎', '健太', '翔', '大輔', '健', '誠', '拓也', '大樹', '裕太',  
      '花子', '美咲', '桜', '結衣', '七海', '陽菜', '愛', '結菜', '美月', '莉子'  
    ],  
    lastNames: [  
      '佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '山本', '中村', '小林', '加藤',  
      '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水'  
    ],  
  },  
  KR: {  
    firstNames: [  
      '민준', '서준', '예준', '도윤', '시우', '주원', '하준', '지호', '준서', '건우',  
      '서연', '서윤', '지우', '서현', '민서', '하은', '하윤', '윤서', '지유', '지민'  
    ],  
    lastNames: [  
      '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',  
      '한', '오', '서', '신', '권', '황', '안', '송', '류', '전'  
    ],  
  },  
  VN: {  
    firstNames: [  
      'Minh', 'Khang', 'Phuc', 'Tuan', 'Hung', 'Quan', 'Huy', 'Dung', 'Khanh', 'Bao',  
      'Linh', 'Huong', 'Trang', 'Hoa', 'Anh', 'Ngoc', 'Phuong', 'Mai', 'Lan', 'Thu'  
    ],  
    lastNames: [  
      'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Phan', 'Vu', 'Vo', 'Dang', 'Bui'  
    ],  
  },  
  TH: {  
    firstNames: [  
      'Somchai', 'Somsak', 'Surasak', 'Prasit', 'Wichai', 'Sompong', 'Narong', 'Pradit', 'Suchart', 'Thawee',  
      'Somying', 'Siriporn', 'Saowanee', 'Sumalee', 'Siriwan', 'Pensri', 'Wilaiwan', 'Pimchanok', 'Rattana', 'Suchada'  
    ],  
    lastNames: [  
      'Siriwat', 'Chaiyaporn', 'Rattanakorn', 'Phuangphiphat', 'Thongchai', 'Jaturong', 'Komsawat', 'Nithipong',  
      'Pattanasin', 'Raksanti', 'Suwannarat', 'Thanawat', 'Wongsuwan', 'Apiraksakul', 'Boonyarat', 'Chaiyanon'  
    ],  
  },  
  IN: {  
    firstNames: [  
      'Rahul', 'Amit', 'Raj', 'Rohan', 'Arjun', 'Vikram', 'Karan', 'Aditya', 'Ravi', 'Suresh',  
      'Priya', 'Anjali', 'Sneha', 'Pooja', 'Kavita', 'Neha', 'Ritu', 'Sunita', 'Anita', 'Preeti'  
    ],  
    lastNames: [  
      'Kumar', 'Singh', 'Sharma', 'Patel', 'Gupta', 'Verma', 'Reddy', 'Rao', 'Joshi', 'Mehta',  
      'Desai', 'Shah', 'Kapoor', 'Chopra', 'Malhotra', 'Agarwal', 'Bansal', 'Goyal', 'Jain', 'Khanna'  
    ],  
  },  
};