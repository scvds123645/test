// Facebook 图标
export const facebookIcon = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path fill="#1877F2" d="M50,2.5c-58.892,1.725-64.898,84.363-7.46,95l0,0h0H50h7.46l0,0C114.911,86.853,108.879,4.219,50,2.5z"/>
  <path fill="#FFFFFF" d="M57.46,64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779,1.85-7.463,7.781-7.463h6.021c0,0,0-11.761,0-11.761c-12.894-2.323-28.385-1.616-28.722,17.66V50.29H30.417v13.814H42.54c0,0,0,33.395,0,33.396H50h7.46l0,0h0V64.104z"/>
</svg>`;

// 文档图标 (用于 Logo)
export const docIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="5" fill="url(#gradient)"/>
  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6366F1"/>
      <stop offset="1" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
</svg>`;

// 国家旗帜 SVG 图标
export const countryFlags: Record<string, string> = {
  CN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#de2910" width="900" height="600"/>
    <polygon fill="#ffde00" points="149.9,115.5 179.6,224.6 289.1,224.6 201.8,287.4 231.5,396.5 149.9,333.6 68.3,396.5 98,287.4 10.7,224.6 120.2,224.6"/>
    <polygon fill="#ffde00" points="364.8,47.5 372.5,77.6 403.5,77.6 378.3,96.2 386,126.3 364.8,110.7 343.6,126.3 351.3,96.2 326.1,77.6 357.1,77.6"/>
    <polygon fill="#ffde00" points="439.3,111.5 443.8,129.1 461.9,129.1 447.4,140.2 451.9,157.8 439.3,148.7 426.7,157.8 431.2,140.2 416.7,129.1 434.8,129.1"/>
    <polygon fill="#ffde00" points="439.3,209.5 443.8,227.1 461.9,227.1 447.4,238.2 451.9,255.8 439.3,246.7 426.7,255.8 431.2,238.2 416.7,227.1 434.8,227.1"/>
    <polygon fill="#ffde00" points="364.8,273.5 372.5,303.6 403.5,303.6 378.3,322.2 386,352.3 364.8,336.7 343.6,352.3 351.3,322.2 326.1,303.6 357.1,303.6"/>
  </svg>`,
  
  HK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#DE2910" width="900" height="600"/>
    <g fill="#FFF">
      <path d="M 450,300 L 470,320 L 490,300 L 470,280 Z"/>
      <path d="M 450,300 L 430,320 L 410,300 L 430,280 Z"/>
      <path d="M 450,300 L 470,280 L 490,300 L 470,320 Z"/>
      <path d="M 450,300 L 430,280 L 410,300 L 430,320 Z"/>
      <circle cx="450" cy="300" r="80" fill="none" stroke="#FFF" stroke-width="8"/>
    </g>
  </svg>`,
  
  TW: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FE0000" width="900" height="600"/>
    <rect fill="#000095" width="450" height="300"/>
    <circle cx="225" cy="150" r="120" fill="#FFF"/>
    <circle cx="225" cy="150" r="100" fill="#000095"/>
    <circle cx="225" cy="150" r="33" fill="#FFF"/>
  </svg>`,
  
  MO: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#00785E" width="900" height="600"/>
    <g fill="#FFF">
      <circle cx="450" cy="250" r="60"/>
      <path d="M 390,350 L 510,350 L 450,290 Z"/>
    </g>
  </svg>`,
  
  SG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <rect fill="#EF3340" width="900" height="300"/>
    <circle cx="300" cy="150" r="80" fill="#FFF"/>
    <circle cx="320" cy="140" r="70" fill="#EF3340"/>
    <g fill="#FFF">
      <polygon points="380,100 390,130 420,130 395,150 405,180 380,160 355,180 365,150 340,130 370,130"/>
      <polygon points="470,100 480,130 510,130 485,150 495,180 470,160 445,180 455,150 430,130 460,130"/>
      <polygon points="380,170 390,200 420,200 395,220 405,250 380,230 355,250 365,220 340,200 370,200"/>
      <polygon points="470,170 480,200 510,200 485,220 495,250 470,230 445,250 455,220 430,200 460,200"/>
      <polygon points="425,135 435,165 465,165 440,185 450,215 425,195 400,215 410,185 385,165 415,165"/>
    </g>
  </svg>`,
  
  US: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <g fill="#B22234">
      <rect width="900" height="46.15"/>
      <rect y="92.3" width="900" height="46.15"/>
      <rect y="184.6" width="900" height="46.15"/>
      <rect y="277" width="900" height="46.15"/>
      <rect y="369.2" width="900" height="46.15"/>
      <rect y="461.5" width="900" height="46.15"/>
      <rect y="553.85" width="900" height="46.15"/>
    </g>
    <rect fill="#3C3B6E" width="360" height="323"/>
  </svg>`,
  
  JP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <circle cx="450" cy="300" r="180" fill="#BC002D"/>
  </svg>`,
  
  GB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#012169" width="900" height="600"/>
    <path d="M 0,0 L 900,600 M 900,0 L 0,600" stroke="#FFF" stroke-width="120"/>
    <path d="M 0,0 L 900,600 M 900,0 L 0,600" stroke="#C8102E" stroke-width="80"/>
    <path d="M 450,0 V 600 M 0,300 H 900" stroke="#FFF" stroke-width="200"/>
    <path d="M 450,0 V 600 M 0,300 H 900" stroke="#C8102E" stroke-width="120"/>
  </svg>`,
  
  DE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#000" width="900" height="200"/>
    <rect fill="#D00" y="200" width="900" height="200"/>
    <rect fill="#FFCE00" y="400" width="900" height="200"/>
  </svg>`,
  
  FR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#002395" width="300" height="600"/>
    <rect fill="#FFF" x="300" width="300" height="600"/>
    <rect fill="#ED2939" x="600" width="300" height="600"/>
  </svg>`,
  
  KR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <circle cx="450" cy="300" r="120" fill="#C60C30"/>
    <circle cx="450" cy="300" r="80" fill="#003478"/>
  </svg>`,
  
  CA: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <rect fill="#FF0000" width="225" height="600"/>
    <rect fill="#FF0000" x="675" width="225" height="600"/>
    <path fill="#FF0000" d="M 450,150 L 420,250 L 350,230 L 400,300 L 350,340 L 430,340 L 450,450 L 470,340 L 550,340 L 500,300 L 550,230 L 480,250 Z"/>
  </svg>`,
  
  AU: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#00008B" width="900" height="600"/>
    <path d="M 0,0 L 180,120 L 0,120 Z" fill="#FFF"/>
    <path d="M 0,0 L 180,120 M 0,120 L 180,0" stroke="#FFF" stroke-width="40"/>
    <path d="M 0,0 L 180,120 M 0,120 L 180,0" stroke="#C8102E" stroke-width="24"/>
    <path d="M 90,0 V 120 M 0,60 H 180" stroke="#FFF" stroke-width="72"/>
    <path d="M 90,0 V 120 M 0,60 H 180" stroke="#C8102E" stroke-width="40"/>
  </svg>`,
  
  IT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#009246" width="300" height="600"/>
    <rect fill="#FFF" x="300" width="300" height="600"/>
    <rect fill="#CE2B37" x="600" width="300" height="600"/>
  </svg>`,
  
  ES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#AA151B" width="900" height="600"/>
    <rect fill="#F1BF00" y="150" width="900" height="300"/>
  </svg>`,
  
  BR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#009B3A" width="900" height="600"/>
    <path fill="#FEDF00" d="M 450,50 L 800,300 L 450,550 L 100,300 Z"/>
    <circle cx="450" cy="300" r="105" fill="#002776"/>
  </svg>`,
  
  RU: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="200"/>
    <rect fill="#0039A6" y="200" width="900" height="200"/>
    <rect fill="#D52B1E" y="400" width="900" height="200"/>
  </svg>`,
  
  IN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <rect fill="#FF9933" width="900" height="200"/>
    <rect fill="#138808" y="400" width="900" height="200"/>
    <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" stroke-width="4"/>
  </svg>`,
  
  MX: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#006847" width="300" height="600"/>
    <rect fill="#FFF" x="300" width="300" height="600"/>
    <rect fill="#CE1126" x="600" width="300" height="600"/>
  </svg>`,
  
  NL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#21468B" width="900" height="600"/>
    <rect fill="#FFF" width="900" height="400"/>
    <rect fill="#AE1C28" width="900" height="200"/>
  </svg>`,
  
  SE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#006AA7" width="900" height="600"/>
    <rect fill="#FECC00" x="200" width="100" height="600"/>
    <rect fill="#FECC00" y="250" width="900" height="100"/>
  </svg>`,
  
  CH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FF0000" width="900" height="600"/>
    <rect fill="#FFF" x="350" y="150" width="200" height="300"/>
    <rect fill="#FFF" x="250" y="250" width="400" height="100"/>
  </svg>`,
  
  PL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="300"/>
    <rect fill="#DC143C" y="300" width="900" height="300"/>
  </svg>`,
  
  TR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#E30A17" width="900" height="600"/>
    <circle cx="360" cy="300" r="120" fill="#FFF"/>
    <circle cx="390" cy="300" r="96" fill="#E30A17"/>
    <polygon fill="#FFF" points="480,240 500,290 550,290 510,320 530,370 480,340 430,370 450,320 410,290 460,290"/>
  </svg>`,
  
  TH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#A51931" width="900" height="600"/>
    <rect fill="#FFF" y="100" width="900" height="400"/>
    <rect fill="#2D2A4A" y="200" width="900" height="200"/>
  </svg>`,
  
  MY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <g fill="#CC0001">
      <rect width="900" height="43"/>
      <rect y="86" width="900" height="43"/>
      <rect y="172" width="900" height="43"/>
      <rect y="258" width="900" height="43"/>
      <rect y="344" width="900" height="43"/>
      <rect y="430" width="900" height="43"/>
      <rect y="516" width="900" height="43"/>
    </g>
    <rect fill="#010066" width="450" height="300"/>
    <circle cx="180" cy="120" r="60" fill="#FFC900"/>
    <circle cx="200" cy="110" r="55" fill="#010066"/>
    <polygon fill="#FFC900" points="260,80 270,110 300,110 275,130 285,160 260,140 235,160 245,130 220,110 250,110"/>
  </svg>`,
  
  ID: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#FFF" width="900" height="600"/>
    <rect fill="#FF0000" width="900" height="300"/>
  </svg>`,
  
  PH: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#0038A8" width="900" height="600"/>
    <rect fill="#CE1126" y="300" width="900" height="300"/>
    <path fill="#FFF" d="M 0,300 L 450,100 L 450,500 Z"/>
    <circle cx="200" cy="300" r="60" fill="#FCD116"/>
    <g fill="#FCD116">
      <polygon points="200,160 210,200 250,200 220,225 230,265 200,240 170,265 180,225 150,200 190,200"/>
      <polygon points="100,250 110,290 150,290 120,315 130,355 100,330 70,355 80,315 50,290 90,290"/>
      <polygon points="300,250 310,290 350,290 320,315 330,355 300,330 270,355 280,315 250,290 290,290"/>
    </g>
  </svg>`,
  
  VN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
    <rect fill="#DA251D" width="900" height="600"/>
    <polygon fill="#FFFF00" points="450,120 480,230 590,230 500,300 530,410 450,340 370,410 400,300 310,230 420,230"/>
  </svg>`,
};

// 获取国旗 SVG
export function getCountryFlag(countryCode: string): string {
  return countryFlags[countryCode] || countryFlags['US'];
}

// 创建国旗元素
export function createFlagElement(countryCode: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = getCountryFlag(countryCode);
  div.style.width = '32px';
  div.style.height = '21px';
  div.style.display = 'inline-block';
  return div;
}