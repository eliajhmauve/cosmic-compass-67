import { useState } from "react";
import { CosmicIntro } from "@/components/CosmicIntro";
import { ChartSelector } from "@/components/ChartSelector";
import { AnalysisReport } from "@/components/AnalysisReport";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChartCombination, formatCombination } from "@/lib/astrology";
import { Sparkles, Library } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [situation, setSituation] = useState("");
  const [currentCombination, setCurrentCombination] = useState<ChartCombination | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const generateAnalysis = async (combination: ChartCombination, isRandom: boolean) => {
    if (!situation.trim()) {
      toast({
        title: "請描述你的現況",
        description: "為了提供更精準的星盤解析，請先描述你目前的人生狀態",
        variant: "destructive",
      });
      return;
    }

    setCurrentCombination(combination);
    setIsGenerating(true);

    // 模擬 AI 生成（實際應用需接入 AI API）
    const mockAnalysis = generateMockAnalysis(combination, situation);
    
    // 模擬生成時間
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysis(mockAnalysis);
    setIsGenerating(false);
    setShowReport(true);

    toast({
      title: isRandom ? "宇宙已為你選擇" : "星盤解析完成",
      description: formatCombination(combination),
    });
  };

  const handleSave = () => {
    // 實際應用需實作儲存到資料庫
    toast({
      title: "已保存至復盤紀錄庫",
      description: "你可以隨時回顧這次的星盤解析",
    });
  };

  const handleBack = () => {
    setShowReport(false);
    setCurrentCombination(null);
    setAnalysis("");
  };

  if (showIntro) {
    return <CosmicIntro onComplete={() => setShowIntro(false)} />;
  }

  if (showReport && analysis) {
    return (
      <div className="min-h-screen bg-background starfield p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <AnalysisReport
            combination={currentCombination!}
            situation={situation}
            analysis={analysis}
            onSave={handleSave}
            onBack={handleBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background starfield p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold cosmic-gradient bg-clip-text text-transparent">
            西洋星盤復盤學習系統
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            探索宇宙能量的軌跡 · 解讀行星之間的訊息 · 發現生命藍圖的智慧
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>由福星何大師設計</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Situation Input */}
        <Card className="cosmic-border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full cosmic-gradient flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <Label className="text-lg font-bold">現況描述</Label>
                <p className="text-sm text-muted-foreground">
                  描述你目前的人生狀態，讓宇宙能量更精準地為你解析
                </p>
              </div>
            </div>
            <Textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="例如：我目前是一名創業者，正在發展新的事業方向。家庭關係穩定，但工作壓力較大。最近在思考如何平衡事業與生活..."
              className="min-h-32 cosmic-border text-base"
            />
            <p className="text-xs text-muted-foreground">
              💡 你可以描述：職業狀態、家庭狀況、健康、事業發展、人際關係、生活變化等
            </p>
          </div>
        </Card>

        {/* Chart Selector */}
        <ChartSelector onGenerate={generateAnalysis} />

        {/* Records Library Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="cosmic-border"
            onClick={() => {
              toast({
                title: "復盤紀錄庫",
                description: "此功能將在下一階段實作",
              });
            }}
          >
            <Library className="mr-2 w-4 h-4" />
            查看復盤紀錄庫
          </Button>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <Card className="cosmic-border bg-card p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full cosmic-gradient animate-pulse-glow flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center animate-rotate-slow">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
              <p className="text-lg font-bold">宇宙正在為你解讀星盤...</p>
              <p className="text-sm text-muted-foreground">
                行星能量正在排列組合，請稍候
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// Mock analysis generator
function generateMockAnalysis(combination: ChartCombination, situation: string): string {
  const comboText = formatCombination(combination);
  
  return `# ${comboText}

## 🌟 宇宙能量概述

這個星盤組合揭示了一個獨特的能量場域，將天體運行的智慧與你的生命旅程緊密相連。

${combination.type === "planet-sign-house" ? `
### 行星能量：${combination.planet1.name}
${combination.planet1.name}代表著生命中的核心驅動力，象徵著我們內在的心理動機與外在的行為模式。

### 星座表現：${combination.sign?.name}
當行星的能量透過${combination.sign?.name}的濾鏡展現時，形成了一種獨特的性格風格與表達方式。

### 宮位領域：${combination.house?.name}
${combination.house?.description}成為這股能量的主要展現舞台，影響著你在這個生活領域的體驗與成長。
` : `
### 行星相位：${combination.planet1.name} × ${combination.planet2?.name}
兩顆行星之間的${combination.aspect?.name}（${combination.aspect?.degree}）創造了一種特殊的能量互動模式。

### 能量動態
這個相位代表著${combination.aspect?.description}，影響著兩種心理能量如何在你的生命中共舞。
`}

## 💫 結合你的現況分析

根據你描述的生命狀態：

> ${situation.substring(0, 200)}...

這個星盤組合為你的當前處境帶來以下洞見：

### 心理動機解析
從占星的角度來看，你目前的狀態反映了宇宙能量在特定時空點的凝聚。這個組合顯示...

### 生命課題與挑戰
宇宙正在透過這個星盤配置，邀請你面對特定的成長課題。這些挑戰並非障礙，而是靈魂進化的階梯。

### 潛能與機會
星盤中也蘊藏著豐富的可能性。當你理解並善用這些能量，將能開啟新的生命視野。

## ✨ 占星智慧啟示

> "當行星在天空中排列，它們不是在決定我們的命運，而是在反映宇宙的節奏。我們每個人都是這個宇宙交響樂中的一個音符。"

### 寓言故事：星辰的禮物

從前，有一位旅人在夜晚迷失於森林中。當他抬頭仰望星空時，發現星星們正在天空中組成不同的圖案。每一個圖案都在訴說著一個故事，指引著不同的方向。

聰明的旅人明白，星星並不會替他選擇道路，但它們照亮了所有可能的路徑。最終，是旅人自己的內心羅盤，決定了他要走向何方。

### 人生指引

1. **覺察能量流動**：注意生活中哪些領域正在經歷變化
2. **平衡不同需求**：在多重角色中找到和諧
3. **信任宇宙節奏**：允許事情在適當的時機展開
4. **整合內在資源**：善用你獨特的天賦與優勢

## 🌙 深層解讀

### 事業與成就
這個星盤組合在事業領域的啟示...

### 人際與關係
在關係互動中，你可能展現出...

### 內在成長
靈性層面的發展方向指向...

## 📖 學習要點

作為占星復盤練習，這個組合教導我們：

- 理解行星能量的基本象徵
- 掌握星座如何調節能量表現
- 認識宮位所代表的生活領域
- 體會相位角度的互動本質

## 🎯 實踐建議

1. 觀察這週生活中是否出現相關主題
2. 記錄你對這個解析的感受與共鳴
3. 思考如何在日常中應用這些洞見
4. 定期回顧，觀察能量如何隨時間演化

---

*願宇宙的智慧照亮你的道路 ✨*

**福星何大師**  
*西洋星盤復盤學習系統*`;
}

export default Index;
