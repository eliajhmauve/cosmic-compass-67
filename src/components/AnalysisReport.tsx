import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartCombination, formatCombination } from "@/lib/astrology";
import { BookOpen, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AnalysisReportProps {
  combination: ChartCombination;
  situation: string;
  analysis: string;
  onSave: () => void;
  onBack: () => void;
}

export const AnalysisReport = ({
  combination,
  situation,
  analysis,
  onSave,
  onBack,
}: AnalysisReportProps) => {
  return (
    <div className="space-y-6">
      <Card className="cosmic-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">星盤解析報告</h2>
          </div>
          <div className="flex gap-3">
            <Button onClick={onSave} variant="outline" className="cosmic-border">
              <Save className="mr-2 w-4 h-4" />
              保存紀錄
            </Button>
            <Button onClick={onBack} variant="outline" className="cosmic-border">
              返回
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 cosmic-border bg-muted rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-primary">
              宇宙能量組合
            </h3>
            <p className="text-xl font-mono">{formatCombination(combination)}</p>
          </div>

          {situation && (
            <div className="p-4 cosmic-border bg-muted rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-secondary">
                現況描述
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{situation}</p>
            </div>
          )}

          <div className="p-6 cosmic-border bg-background rounded-lg">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4 text-primary">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-3 mt-6 text-secondary">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mb-2 mt-4 text-accent">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-foreground leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>✨ 由福星何大師設計 · 宇宙能量指引系統 ✨</p>
      </div>
    </div>
  );
};
