import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { planets, zodiacSigns, houses, aspects, ChartCombination } from "@/lib/astrology";
import { Sparkles, Shuffle } from "lucide-react";

interface ChartSelectorProps {
  onGenerate: (combination: ChartCombination, isRandom: boolean) => void;
}

export const ChartSelector = ({ onGenerate }: ChartSelectorProps) => {
  const [mode, setMode] = useState<"planet-sign-house" | "planet-aspect">("planet-sign-house");
  const [planet1, setPlanet1] = useState("");
  const [planet2, setPlanet2] = useState("");
  const [sign, setSign] = useState("");
  const [house, setHouse] = useState("");
  const [aspect, setAspect] = useState("");

  const handleManualGenerate = () => {
    if (mode === "planet-sign-house") {
      if (!planet1 || !sign || !house) return;
      onGenerate(
        {
          type: "planet-sign-house",
          planet1: planets.find((p) => p.id === planet1)!,
          sign: zodiacSigns.find((s) => s.id === sign)!,
          house: houses.find((h) => h.id === house)!,
        },
        false
      );
    } else {
      if (!planet1 || !planet2 || !aspect) return;
      onGenerate(
        {
          type: "planet-aspect",
          planet1: planets.find((p) => p.id === planet1)!,
          planet2: planets.find((p) => p.id === planet2)!,
          aspect: aspects.find((a) => a.id === aspect)!,
        },
        false
      );
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="cosmic-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shuffle className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold">隨機星盤組合</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          讓宇宙為你隨機選擇一個星盤組合，開始你的占星解析之旅
        </p>
        <Button
          onClick={() => {
            const combo = require("@/lib/astrology").getRandomCombination();
            onGenerate(combo, true);
          }}
          className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold text-lg py-6"
        >
          <Sparkles className="mr-2" />
          隨機生成宇宙能量
        </Button>
      </Card>

      <Card className="cosmic-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-secondary" />
          <h3 className="text-xl font-bold">星盤復盤模式</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <Label className="mb-2 block">選擇模式</Label>
            <Select value={mode} onValueChange={(v: any) => setMode(v)}>
              <SelectTrigger className="cosmic-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planet-sign-house">行星 × 星座 × 宮位</SelectItem>
                <SelectItem value="planet-aspect">行星 × 行星 × 相位</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mode === "planet-sign-house" ? (
            <>
              <div>
                <Label className="mb-2 block">選擇行星</Label>
                <Select value={planet1} onValueChange={setPlanet1}>
                  <SelectTrigger className="cosmic-border">
                    <SelectValue placeholder="選擇行星" />
                  </SelectTrigger>
                  <SelectContent>
                    {planets.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.symbol} {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">選擇星座</Label>
                <Select value={sign} onValueChange={setSign}>
                  <SelectTrigger className="cosmic-border">
                    <SelectValue placeholder="選擇星座" />
                  </SelectTrigger>
                  <SelectContent>
                    {zodiacSigns.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.symbol} {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">選擇宮位</Label>
                <Select value={house} onValueChange={setHouse}>
                  <SelectTrigger className="cosmic-border">
                    <SelectValue placeholder="選擇宮位" />
                  </SelectTrigger>
                  <SelectContent>
                    {houses.map((h) => (
                      <SelectItem key={h.id} value={h.id}>
                        {h.name} ({h.description})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label className="mb-2 block">第一顆行星</Label>
                <Select value={planet1} onValueChange={setPlanet1}>
                  <SelectTrigger className="cosmic-border">
                    <SelectValue placeholder="選擇行星" />
                  </SelectTrigger>
                  <SelectContent>
                    {planets.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.symbol} {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">第二顆行星</Label>
                <Select value={planet2} onValueChange={setPlanet2}>
                  <SelectTrigger className="cosmic-border">
                    <SelectValue placeholder="選擇行星" />
                  </SelectTrigger>
                  <SelectContent>
                    {planets
                      .filter((p) => p.id !== planet1)
                      .map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.symbol} {p.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">相位角度</Label>
                <Select value={aspect} onValueChange={setAspect}>
                  <SelectTrigger className="cosmic-border">
                    <SelectValue placeholder="選擇相位" />
                  </SelectTrigger>
                  <SelectContent>
                    {aspects.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name} ({a.degree}) - {a.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <Button
          onClick={handleManualGenerate}
          className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-lg py-6"
          disabled={
            mode === "planet-sign-house"
              ? !planet1 || !sign || !house
              : !planet1 || !planet2 || !aspect
          }
        >
          開始星盤解析
        </Button>
      </Card>
    </div>
  );
};
