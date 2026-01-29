import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  DollarSign,
  Target,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import IntentSignalModal from "./IntentSignalModal";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface IntentSignalData {
  compositeScore: number;
  deltaScore: number;
  matchedTopics: number;
  intentSignal: string;
  companyName: string;
  vais: number;
  revenue: string;
  city: string;
  relatedTopics: string[];
}

interface IntentSignalPopoverProps {
  data: IntentSignalData;
  children: React.ReactNode;
}

const chartConfig = {
  compositeScore: {
    label: "Composite Score",
    color: "#EF4444", // Red/Orange color
  },
  deltaScore: {
    label: "Delta Score",
    color: "#6366F1", // Indigo/Blue color
  },
};

const generateChartData = (intentData: IntentSignalData) => {
  const baseData = [];
  const compositeBase = intentData.compositeScore;
  const deltaBase = intentData.deltaScore;

  // Generate 7 weeks of data
  for (let i = 0; i < 7; i++) {
    const variation = (i / 6) * 0.6; // Progressive increase from week 1 to week 7
    baseData.push({
      week: `week${i + 1}`,
      compositeScore: Math.max(0, Math.round(compositeBase * (0.2 + variation))),
      deltaScore: Math.max(0, Math.round(deltaBase * (0.2 + variation))),
    });
  }
  return baseData;
};

const getIntentSignalColor = (signal: string) => {
  switch (signal) {
    case "Super Strong":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case "Very Strong":
      return "bg-green-100 text-green-800 border border-green-200";
    case "Strong":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "Medium":
      return "bg-orange-100 text-orange-800 border border-orange-200";
    case "Weak":
      return "bg-red-100 text-red-800 border border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

export default function IntentSignalPopover({
  data,
  children,
}: IntentSignalPopoverProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chartData = generateChartData(data);

  const handleChartClick = () => {
    setIsPanelOpen(false);
    setIsModalOpen(true);
  };

  const closePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPanelOpen(false);
  };

  return (
    <>
      {/* Trigger - Clone and add onClick handler */}
      <div
        onClick={() => setIsPanelOpen(true)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {/* Right-side Slide-in Panel */}
      <div
        className={cn(
          "fixed inset-0 z-50",
          isPanelOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/30 transition-opacity",
            isPanelOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setIsPanelOpen(false)}
        />

        {/* Panel */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[50%] max-w-2xl bg-white shadow-xl transition-transform duration-300 overflow-auto",
            isPanelOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="p-6 space-y-6">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={closePanelClick}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Company Header */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-valasys-orange" />
                  <h3 className="text-lg font-bold text-gray-900">
                    {data.companyName}
                  </h3>
                </div>
                <Badge
                  className={cn(
                    "text-xs px-3 py-1",
                    getIntentSignalColor(data.intentSignal),
                  )}
                >
                  {data.intentSignal}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-valasys-orange" />
                  <span>VAIS:</span>
                  <span className="font-semibold text-valasys-orange">
                    {data.vais}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>{data.revenue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{data.city}</span>
                </div>
              </div>
            </div>

            {/* Intent Signal Breakdown Chart */}
            <div>
              <h4 className="text-sm font-semibold mb-4">Intent Signal Breakdown</h4>
              <div
                className="h-64 border rounded-lg p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleChartClick}
              >
                <ChartContainer config={chartConfig}>
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: -20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-20"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#666" }}
                    />
                    <YAxis
                      hide={false}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#999" }}
                      width={30}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="compositeScore"
                      stroke={chartConfig.compositeScore.color}
                      strokeWidth={2}
                      dot={{
                        fill: chartConfig.compositeScore.color,
                        strokeWidth: 2,
                        r: 5,
                      }}
                      activeDot={{
                        r: 7,
                      }}
                      isAnimationActive={true}
                    />
                    <Line
                      type="monotone"
                      dataKey="deltaScore"
                      stroke={chartConfig.deltaScore.color}
                      strokeWidth={2}
                      dot={{
                        fill: chartConfig.deltaScore.color,
                        strokeWidth: 2,
                        r: 5,
                      }}
                      activeDot={{
                        r: 7,
                      }}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>

            {/* Topics Section */}
            <div className="border-t pt-4">
              <h5 className="text-sm font-semibold mb-4">Topics</h5>
              <div className="space-y-2">
                {data.relatedTopics.slice(0, 3).map((topic, index) => {
                  const scores = [65, 63, 58];
                  const score = scores[index] || Math.floor(Math.random() * 40 + 60);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm text-gray-700 font-medium">{topic}</span>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        {score}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <div className="text-xs text-gray-500 mt-3">
                Showing all topics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Modal - shown when user clicks on chart */}
      <IntentSignalModal
        data={data}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
