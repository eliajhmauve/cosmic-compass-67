export const planets = [
  { id: "sun", name: "太陽", symbol: "☉" },
  { id: "moon", name: "月亮", symbol: "☽" },
  { id: "mercury", name: "水星", symbol: "☿" },
  { id: "venus", name: "金星", symbol: "♀" },
  { id: "mars", name: "火星", symbol: "♂" },
  { id: "jupiter", name: "木星", symbol: "♃" },
  { id: "saturn", name: "土星", symbol: "♄" },
  { id: "uranus", name: "天王星", symbol: "♅" },
  { id: "neptune", name: "海王星", symbol: "♆" },
  { id: "pluto", name: "冥王星", symbol: "♇" },
];

export const zodiacSigns = [
  { id: "aries", name: "牡羊座", symbol: "♈" },
  { id: "taurus", name: "金牛座", symbol: "♉" },
  { id: "gemini", name: "雙子座", symbol: "♊" },
  { id: "cancer", name: "巨蟹座", symbol: "♋" },
  { id: "leo", name: "獅子座", symbol: "♌" },
  { id: "virgo", name: "處女座", symbol: "♍" },
  { id: "libra", name: "天秤座", symbol: "♎" },
  { id: "scorpio", name: "天蠍座", symbol: "♏" },
  { id: "sagittarius", name: "射手座", symbol: "♐" },
  { id: "capricorn", name: "摩羯座", symbol: "♑" },
  { id: "aquarius", name: "水瓶座", symbol: "♒" },
  { id: "pisces", name: "雙魚座", symbol: "♓" },
];

export const houses = [
  { id: "house1", name: "第一宮", description: "自我、外貌、生命力" },
  { id: "house2", name: "第二宮", description: "財富、價值觀、物質資源" },
  { id: "house3", name: "第三宮", description: "溝通、學習、手足關係" },
  { id: "house4", name: "第四宮", description: "家庭、根源、內在情感" },
  { id: "house5", name: "第五宮", description: "創造、娛樂、戀愛" },
  { id: "house6", name: "第六宮", description: "健康、工作、日常服務" },
  { id: "house7", name: "第七宮", description: "伴侶、合作、一對一關係" },
  { id: "house8", name: "第八宮", description: "轉化、深層連結、共享資源" },
  { id: "house9", name: "第九宮", description: "哲學、高等教育、遠行" },
  { id: "house10", name: "第十宮", description: "事業、社會地位、成就" },
  { id: "house11", name: "第十一宮", description: "朋友、理想、社群" },
  { id: "house12", name: "第十二宮", description: "潛意識、隱藏、靈性" },
];

export const aspects = [
  { id: "conjunction", name: "合相", degree: "0°", description: "能量融合" },
  { id: "sextile", name: "六合相", degree: "60°", description: "和諧機會" },
  { id: "square", name: "刑相", degree: "90°", description: "緊張挑戰" },
  { id: "trine", name: "三分相", degree: "120°", description: "流暢協調" },
  { id: "opposition", name: "對分相", degree: "180°", description: "對立平衡" },
];

export type ChartType = "planet-sign-house" | "planet-aspect";

export interface ChartCombination {
  type: ChartType;
  planet1: typeof planets[number];
  planet2?: typeof planets[number];
  sign?: typeof zodiacSigns[number];
  house?: typeof houses[number];
  aspect?: typeof aspects[number];
}

export const getRandomCombination = (): ChartCombination => {
  const type: ChartType = Math.random() > 0.5 ? "planet-sign-house" : "planet-aspect";
  
  if (type === "planet-sign-house") {
    return {
      type,
      planet1: planets[Math.floor(Math.random() * planets.length)],
      sign: zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)],
      house: houses[Math.floor(Math.random() * houses.length)],
    };
  } else {
    const planet1Index = Math.floor(Math.random() * planets.length);
    let planet2Index = Math.floor(Math.random() * planets.length);
    while (planet2Index === planet1Index) {
      planet2Index = Math.floor(Math.random() * planets.length);
    }
    return {
      type,
      planet1: planets[planet1Index],
      planet2: planets[planet2Index],
      aspect: aspects[Math.floor(Math.random() * aspects.length)],
    };
  }
};

export const formatCombination = (combo: ChartCombination): string => {
  if (combo.type === "planet-sign-house") {
    return `${combo.planet1.symbol} ${combo.planet1.name} × ${combo.sign?.symbol} ${combo.sign?.name} × ${combo.house?.name}`;
  } else {
    return `${combo.planet1.symbol} ${combo.planet1.name} × ${combo.planet2?.symbol} ${combo.planet2?.name} × ${combo.aspect?.name} (${combo.aspect?.degree})`;
  }
};
