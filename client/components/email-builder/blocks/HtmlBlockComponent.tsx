import React from "react";
import { HtmlBlock } from "../types";
import { Code } from "lucide-react";

interface HtmlBlockComponentProps {
  block: HtmlBlock;
  isSelected: boolean;
  onContentChange: (content: string) => void;
}

export const HtmlBlockComponent: React.FC<HtmlBlockComponentProps> = ({
  block,
  isSelected,
  onContentChange,
}) => {
  return (
    <div
      className={`relative p-4 transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "12px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontFamily: "monospace",
          fontSize: "12px",
          color: "#333",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        <div className="flex items-start gap-2 mb-2">
          <Code className="w-4 h-4 text-valasys-orange flex-shrink-0" />
          <span className="text-xs font-semibold">Custom HTML</span>
        </div>
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {block.content || "<div>Add your HTML here</div>"}
        </pre>
      </div>
    </div>
  );
};
