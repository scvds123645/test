export interface CountryConfig {  
  code: string;  
  name: string;  
  phonePrefix: string;  
  phoneFormat: string;  
}  
  
export const countries: CountryConfig[] = [  
  { code: 'CN', name: '中国', phonePrefix: '+86', phoneFormat: '1XXXXXXXXXX' },  
  { code: 'HK', name: '香港', phonePrefix: '+852', phoneFormat: 'XXXX XXXX' },  
  { code: 'TW', name: '台湾', phonePrefix: '+886', phoneFormat: 'XXXX XXX XXX' },  
  { code: 'MO', name: '澳门', phonePrefix: '+853', phoneFormat: 'XXXX XXXX' },  
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
  CN: {
    // 中国大陆：简体中文，涵盖单字名和双字名
    firstNames: [
      '伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军', 
      '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀兰', '霞'
    ],
    lastNames: [
      '王', '李', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周', 
      '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗'
    ]
  },
  HK: {
    // 香港：繁体中文，粤语拼音习惯的汉字
    firstNames: [
      '志明', '嘉欣', '俊傑', '淑芬', '家豪', '慧心', '子謙', '美玲', '偉文', '佩珊',
      '國強', '麗華', '振邦', '曉彤', '家康', '雅婷', '志偉', '凱琳', '浩然', '詩雅'
    ],
    lastNames: [
      '陳', '黃', '李', '林', '張', '梁', '吳', '劉', '葉', '何', 
      '鄭', '周', '郭', '鄧', '許', '曾', '馮', '蔡', '蘇', '楊'
    ]
  },
  TW: {
    // 台湾：繁体中文，带有明显的台湾命名风格（如“雅”、“豪”、“君”）
    firstNames: [
      '志豪', '淑芬', '家豪', '雅婷', '冠宇', '怡君', '宗翰', '雅雯', '承翰', '欣怡',
      '柏翰', '诗涵', '建宏', '美玲', '彦廷', '雅惠', '志伟', '佩珊', '俊宏', '心怡'
    ],
    lastNames: [
      '陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊', 
      '許', '鄭', '謝', '郭', '洪', '曾', '邱', '廖', '賴', '徐'
    ]
  },
  MO: {
    // 澳门：繁体中文，与香港相似，但也保留了一些传统广东名字
    firstNames: [
      '志明', '嘉欣', '偉強', '麗莎', '建國', '美儀', '家輝', '曉琳', '志華', '佩儀',
      '國樑', '秀珍', '文彪', '雅麗', '子軒', '靜儀', '振華', '嘉敏', '偉傑', '詩敏'
    ],
    lastNames: [
      '陳', '黃', '李', '林', '張', '梁', '吳', '劉', '何', '鄭', 
      '羅', '許', '周', '蘇', '馬', '高', '馮', '蔡', '葉', '鄧'
    ]
  },
  SG: {
    // 新加坡：多民族融合（华裔、马来裔、印裔），英语名+方言拼音姓氏常见
    firstNames: [
      'Wei Ming', 'Hui Ling', 'Jun Jie', 'Siti', 'Muhammad', 'Nur', 'James', 'Michelle', 'Kevin', 'Rachel',
      'Yi Ling', 'Jian Hong', 'Ahmad', 'Faridah', 'Ravi', 'Priya', 'Daniel', 'Grace', 'Jason', 'Cheryl'
    ],
    lastNames: [
      'Tan', 'Lim', 'Lee', 'Ng', 'Wong', 'Heng', 'Chua', 'Koh', 'Teo', 'Goh', 
      'Tay', 'Ong', 'Low', 'Sim', 'Yeo', 'Chan', 'Chia', 'Toh', 'Abdullah', 'Kumar'
    ]
  },
  US: {
    // 美国：包含传统英语名、拉丁裔、非裔及现代流行名
    firstNames: [
      'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
      'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen'
    ],
    lastNames: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
      'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
    ]
  },
  JP: {
    // 日本：汉字为主，包含现代流行名和传统名
    firstNames: [
      '太郎', '花子', '翔', '陽菜', '健', '結衣', '大輔', '美咲', '誠', '愛',
      '直人', '未来', '拓也', 'さくら', '剛', '美優', '達也', '七海', '亮', '葵'
    ],
    lastNames: [
      '佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤',
      '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水'
    ]
  },
  GB: {
    // 英国：传统英语名，包含苏格兰、威尔士特色
    firstNames: [
      'Oliver', 'Olivia', 'George', 'Amelia', 'Harry', 'Isla', 'Noah', 'Ava', 'Jack', 'Emily',
      'Leo', 'Sophia', 'Arthur', 'Grace', 'Muhammad', 'Mia', 'Oscar', 'Poppy', 'Charlie', 'Lily'
    ],
    lastNames: [
      'Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright',
      'Thompson', 'Evans', 'Walker', 'White', 'Roberts', 'Green', 'Hall', 'Wood', 'Harris', 'Martin'
    ]
  },
  DE: {
    // 德国：传统德语名，注意特殊字符
    firstNames: [
      'Maximilian', 'Marie', 'Alexander', 'Sophie', 'Paul', 'Maria', 'Elias', 'Sophia', 'Ben', 'Emilia',
      'Leon', 'Mia', 'Lukas', 'Hannah', 'Finn', 'Anna', 'Jonas', 'Emma', 'Felix', 'Laura'
    ],
    lastNames: [
      'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann',
      'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann'
    ]
  },
  FR: {
    // 法国：经典法语名，包含重音符号
    firstNames: [
      'Gabriel', 'Jade', 'Léo', 'Louise', 'Raphaël', 'Emma', 'Arthur', 'Alice', 'Louis', 'Ambre',
      'Lucas', 'Lina', 'Adam', 'Chloé', 'Jules', 'Mia', 'Hugo', 'Léa', 'Maël', 'Manon'
    ],
    lastNames: [
      'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent',
      'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard'
    ]
  },
  KR: {
    // 韩国：韩文（Hangul），反映当代常用名
    firstNames: [
      '민준', '서연', '서준', '서윤', '도윤', '지우', '예준', '하은', '주원', '민서',
      '시우', '하윤', '준우', '윤서', '지호', '지민', '준서', '채원', '현우', '지유'
    ],
    lastNames: [
      '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
      '한', '오', '서', '신', '권', '황', '안', '송', '류', '전'
    ]
  },
  CA: {
    // 加拿大：英法双语混合
    firstNames: [
      'James', 'Marie', 'Liam', 'Olivia', 'Noah', 'Emma', 'William', 'Charlotte', 'Benjamin', 'Ava',
      'Lucas', 'Sophia', 'Oliver', 'Amelia', 'Jack', 'Mia', 'Thomas', 'Evelyn', 'Logan', 'Chloe'
    ],
    lastNames: [
      'Smith', 'Tremblay', 'Brown', 'Gagnon', 'Wilson', 'Roy', 'Martin', 'Côté', 'MacDonald', 'Bouchard',
      'Johnson', 'Gauthier', 'Thompson', 'Morin', 'Jones', 'Lavoie', 'Williams', 'Fortin', 'White', 'Levesque'
    ]
  },
  AU: {
    // 澳大利亚：英式为主，略带现代风格
    firstNames: [
      'Oliver', 'Charlotte', 'Noah', 'Olivia', 'William', 'Mia', 'Jack', 'Amelia', 'Leo', 'Isla',
      'Henry', 'Ava', 'Thomas', 'Chloe', 'Lucas', 'Grace', 'Charlie', 'Sophie', 'Elijah', 'Zoe'
    ],
    lastNames: [
      'Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Nguyen', 'Johnson', 'Martin', 'White',
      'Anderson', 'Walker', 'Thompson', 'Thomas', 'Lee', 'Ryan', 'Robinson', 'Kelly', 'King', 'Campbell'
    ]
  },
  IT: {
    // 意大利：经典意大利名
    firstNames: [
      'Giuseppe', 'Maria', 'Antonio', 'Anna', 'Giovanni', 'Giuseppina', 'Francesco', 'Rosa', 'Mario', 'Angela',
      'Luigi', 'Giovanna', 'Salvatore', 'Teresa', 'Roberto', 'Lucia', 'Alessandro', 'Carmela', 'Franco', 'Caterina'
    ],
    lastNames: [
      'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
      'Bruno', 'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti'
    ]
  },
  ES: {
    // 西班牙：双姓氏传统（这里列出单姓供组合），经典名
    firstNames: [
      'Antonio', 'María', 'Manuel', 'Carmen', 'José', 'Ana', 'Francisco', 'Isabel', 'David', 'Dolores',
      'Juan', 'Pilar', 'Javier', 'Josefa', 'Daniel', 'Teresa', 'Luis', 'Rosa', 'Carlos', 'Cristina'
    ],
    lastNames: [
      'García', 'Fernández', 'González', 'Rodríguez', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín',
      'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez'
    ]
  },
  BR: {
    // 巴西：葡萄牙语，包含大量复合名
    firstNames: [
      'João', 'Maria', 'José', 'Ana', 'Antônio', 'Francisca', 'Francisco', 'Antônia', 'Carlos', 'Adriana',
      'Paulo', 'Juliana', 'Pedro', 'Márcia', 'Lucas', 'Fernanda', 'Luiz', 'Patrícia', 'Marcos', 'Aline'
    ],
    lastNames: [
      'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
      'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'
    ]
  },
  RU: {
    // 俄罗斯：西里尔字母，包含常见名
    firstNames: [
      'Alexander', 'Sofia', 'Sergey', 'Maria', 'Dmitry', 'Anna', 'Andrey', 'Elena', 'Alexey', 'Natalia',
      'Maxim', 'Olga', 'Evgeny', 'Tatiana', 'Ivan', 'Irina', 'Mikhail', 'Svetlana', 'Artem', 'Yulia'
    ],
    lastNames: [
      'Ivanov', 'Smirnov', 'Kuznetsov', 'Popov', 'Vasilyev', 'Petrov', 'Sokolov', 'Mikhailov', 'Novikov', 'Fedorov',
      'Morozov', 'Volkov', 'Alekseev', 'Lebedev', 'Semenov', 'Egorov', 'Pavlov', 'Kozlov', 'Stepanov', 'Nikolaev'
    ]
  },
  IN: {
    // 印度：反映南北差异及主要宗教，英语化拼写
    firstNames: [
      'Rahul', 'Priya', 'Amit', 'Neha', 'Rajesh', 'Pooja', 'Suresh', 'Anjali', 'Sunil', 'Sneha',
      'Vijay', 'Divya', 'Sanjay', 'Kavita', 'Manoj', 'Aarti', 'Ramesh', 'Riya', 'Arjun', 'Deepika'
    ],
    lastNames: [
      'Kumar', 'Singh', 'Sharma', 'Patel', 'Gupta', 'Mishra', 'Yadav', 'Das', 'Reddy', 'Nair',
      'Shah', 'Khan', 'Jain', 'Chaudhary', 'Verma', 'Mehta', 'Ray', 'Iyer', 'Joshi', 'Gowda'
    ]
  },
  MX: {
    // 墨西哥：西班牙语，常见复合名
    firstNames: [
      'José', 'María', 'Juan', 'Guadalupe', 'Luis', 'Juana', 'Francisco', 'Margarita', 'Antonio', 'Verónica',
      'Jesús', 'Elizabeth', 'Alejandro', 'Alejandra', 'Miguel', 'Leticia', 'Carlos', 'Rosa', 'Roberto', 'Patricia'
    ],
    lastNames: [
      'García', 'Hernández', 'Martínez', 'López', 'González', 'Pérez', 'Rodríguez', 'Sánchez', 'Ramírez', 'Cruz',
      'Flores', 'Gómez', 'Morales', 'Vázquez', 'Reyes', 'Jiménez', 'Torres', 'Díaz', 'Gutiérrez', 'Mendoza'
    ]
  },
  NL: {
    // 荷兰：包含前缀（tussenvoegsel）的姓氏
    firstNames: [
      'Jan', 'Emma', 'Johannes', 'Julia', 'Peter', 'Sophie', 'Cornelis', 'Mila', 'Willem', 'Tess',
      'Hendrik', 'Lotte', 'Dennis', 'Zoë', 'Thomas', 'Sara', 'Mark', 'Eva', 'Patrick', 'Anna'
    ],
    lastNames: [
      'De Jong', 'Jansen', 'De Vries', 'Van den Berg', 'Van Dijk', 'Bakker', 'Janssen', 'Visser', 'Smit', 'Meijer',
      'De Boer', 'Mulder', 'De Groot', 'Bos', 'Vos', 'Peters', 'Hendriks', 'Van Leeuwen', 'Dekker', 'Brouwer'
    ]
  },
  SE: {
    // 瑞典：以 -son 结尾的姓氏为主
    firstNames: [
      'Lars', 'Anna', 'Mikael', 'Eva', 'Anders', 'Maria', 'Johan', 'Karin', 'Erik', 'Sara',
      'Per', 'Kristina', 'Karl', 'Lena', 'Peter', 'Emma', 'Jan', 'Kerstin', 'Thomas', 'Malin'
    ],
    lastNames: [
      'Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson',
      'Pettersson', 'Jonsson', 'Jansson', 'Hansson', 'Bengtsson', 'Jönsson', 'Lindberg', 'Jakobsson', 'Magnusson', 'Olofsson'
    ]
  },
  CH: {
    // 瑞士：德语、法语、意大利语混合
    firstNames: [
      'Hans', 'Anna', 'Daniel', 'Maria', 'Peter', 'Ursula', 'Thomas', 'Sandra', 'Christian', 'Nicole',
      'Martin', 'Verena', 'Andreas', 'Elisabeth', 'Michael', 'Barbara', 'Markus', 'Claudia', 'Stefan', 'Monika'
    ],
    lastNames: [
      'Müller', 'Meier', 'Schmid', 'Keller', 'Weber', 'Huber', 'Schneider', 'Meyer', 'Frei', 'Fischer',
      'Christen', 'Brunner', 'Baumann', 'Moser', 'Zimmermann', 'Roth', 'Gerber', 'Sutter', 'Graf', 'Bühler'
    ]
  },
  PL: {
    // 波兰：注意姓氏的性别变化（这里取通用词根或男性形式，Facebook上通用）
    firstNames: [
      'Jan', 'Maria', 'Piotr', 'Anna', 'Krzysztof', 'Katarzyna', 'Andrzej', 'Małgorzata', 'Tomasz', 'Agnieszka',
      'Paweł', 'Barbara', 'Michał', 'Ewa', 'Marcin', 'Krystyna', 'Jakub', 'Magdalena', 'Adam', 'Elżbieta'
    ],
    lastNames: [
      'Nowak', 'Kowalski', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński', 'Szymański', 'Woźniak',
      'Dąbrowski', 'Kozłowski', 'Jankowski', 'Mazur', 'Wojciechowski', 'Kwiatkowski', 'Krawczyk', 'Kaczmarek', 'Piotrowski', 'Grabowski'
    ]
  },
  TR: {
    // 土耳其：现代土耳其语姓名
    firstNames: [
      'Mehmet', 'Fatma', 'Mustafa', 'Ayşe', 'Ahmet', 'Emine', 'Ali', 'Hatice', 'Hüseyin', 'Zeynep',
      'Hasan', 'Elif', 'İbrahim', 'Meryem', 'Murat', 'Şerife', 'Yusuf', 'Zehra', 'Osman', 'Sultan'
    ],
    lastNames: [
      'Yılmaz', 'Kaya', 'Demir', 'Çelik', 'Şahin', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir',
      'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şimşek'
    ]
  },
  TH: {
    // 泰国：使用罗马拼音，姓氏通常较长且独特，这里列出常见词根或短姓
    firstNames: [
      'Somchai', 'Somying', 'Somsak', 'Mali', 'Arthit', 'Ratana', 'Kittisak', 'Siriporn', 'Prasert', 'Nipa',
      'Wichai', 'Urai', 'Surachai', 'Jintana', 'Thongchai', 'Supaporn', 'Sombat', 'Wanee', 'Preecha', 'Anchalee'
    ],
    lastNames: [
      'Siriwat', 'Chaiyaporn', 'Saetang', 'Srisai', 'Kaewmanee', 'Wongsuwan', 'Thongthai', 'Suwannarat', 'Charoenphon', 'Promthep',
      'Saelim', 'Ratanaporn', 'Chanthara', 'Phonprasit', 'Srisuk', 'Wattana', 'Intarasit', 'Kongsri', 'Bunyarat', 'Sae-Ngow'
    ]
  },
  MY: {
    // 马来西亚：包含马来名（无姓氏，用父名）、华裔姓氏、印裔姓氏
    firstNames: [
      'Muhammad', 'Nur', 'Wei', 'Siti', 'Ahmad', 'Yee', 'Abdul', 'Hui', 'Mohd', 'Li',
      'Adam', 'Min', 'Zainal', 'Jing', 'Farid', 'Xin', 'Ismail', 'Ling', 'Aziz', 'Jun'
    ],
    lastNames: [
      'Abdullah', 'Tan', 'Mohamad', 'Lim', 'Ali', 'Lee', 'Ibrahim', 'Wong', 'Ahmad', 'Ng',
      'Rahman', 'Chong', 'Hassan', 'Low', 'Hussein', 'Yong', 'Salleh', 'Chan', 'Zakaria', 'Goh'
    ]
  },
  ID: {
    // 印度尼西亚：许多人只有单名，这里模拟 First/Last 结构（Last 常为父名或家族名）
    firstNames: [
      'Budi', 'Sri', 'Agus', 'Dewi', 'Muhammad', 'Siti', 'Eko', 'Nur', 'Bambang', 'Ratna',
      'Adi', 'Dwi', 'Heri', 'Lestari', 'Joko', 'Ayu', 'Rudi', 'Indah', 'Iwan', 'Wati'
    ],
    lastNames: [
      'Prasetyo', 'Setiawan', 'Santoso', 'Hidayat', 'Nugroho', 'Saputra', 'Wijaya', 'Utami', 'Kusuma', 'Sari',
      'Purnomo', 'Yulianto', 'Wibowo', 'Lestari', 'Kurniawan', 'Susanti', 'Mulyadi', 'Handayani', 'Susanto', 'Putri'
    ]
  },
  PH: {
    // 菲律宾：西班牙姓氏 + 英语/西班牙语名字
    firstNames: [
      'Jose', 'Maria', 'John', 'Mary', 'Mark', 'Jennifer', 'Michael', 'Elizabeth', 'Angelo', 'Grace',
      'Juan', 'Christine', 'Pedro', 'Michelle', 'Francis', 'Joy', 'Ramon', 'Anna', 'Joshua', 'Rose'
    ],
    lastNames: [
      'Santos', 'Reyes', 'Cruz', 'Garcia', 'Mendoza', 'Torres', 'Bautista', 'Flores', 'Gonzales', 'Lopez',
      'Castillo', 'Villanueva', 'Ramos', 'Fernandez', 'Rivera', 'De la Cruz', 'Aquino', 'Del Rosario', 'Sanchez', 'Tolentino'
    ]
  },
  VN: {
    // 越南：阮（Nguyen）姓占绝对主导，名字通常为双字
    firstNames: [
      'Minh', 'Linh', 'Hung', 'Huong', 'Tuan', 'Lan', 'Duc', 'Trang', 'Dung', 'Mai',
      'Hai', 'Phuong', 'Thanh', 'Thu', 'Long', 'Hien', 'Nam', 'Thuy', 'Son', 'Ha'
    ],
    lastNames: [
      'Nguyen', 'Tran', 'Le', 'Pham', 'Huynh', 'Hoang', 'Phan', 'Vu', 'Vo', 'Dang',
      'Bui', 'Do', 'Ho', 'Ngo', 'Duong', 'Ly', 'Doan', 'Luu', 'Trinh', 'Dinh'
    ]
  }
};