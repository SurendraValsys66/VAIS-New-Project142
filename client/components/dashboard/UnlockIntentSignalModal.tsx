import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Play } from "lucide-react";

interface UnlockIntentSignalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUnlock: (selectedOptions: string[]) => void;
  currentlyClickedBadgeId?: string;
}

export default function UnlockIntentSignalModal({
  open,
  onOpenChange,
  onUnlock,
  currentlyClickedBadgeId,
}: UnlockIntentSignalModalProps) {
  const handleUnlock = () => {
    onUnlock(["all"]);
    onOpenChange(false);
  };

  const premiumFeatures = [
    "Premium Templates",
    "Context page",
    "Bulk Runner",
    "Scheduler",
    "API",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 border-0 rounded-2xl overflow-hidden bg-white">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-50 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10">
          {/* Left Column - Text and Image */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Main Heading */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Unlock the{" "}
                <span className="text-teal-500">full power</span>
                <br />
                of Intent Signal
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Unlock advanced AI automation. Boost your productivity, streamline
                your tasks, and stay ahead of the competition. Experience the
                future of efficiency today.
              </p>
            </div>

            {/* Device Mockup Image with Video Button */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 p-1">
              <div className="relative rounded-xl bg-gradient-to-br from-blue-600 to-teal-400 aspect-video flex items-center justify-center overflow-hidden">
                {/* Placeholder for device mockup - in real scenario, replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20"></div>

                {/* Mock device interface */}
                <div className="relative w-full h-full flex items-center justify-center p-6">
                  <div className="space-y-4 w-full">
                    <div className="h-2 bg-white/30 rounded w-3/4"></div>
                    <div className="h-2 bg-white/20 rounded"></div>
                    <div className="h-2 bg-white/20 rounded w-5/6"></div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors"></div>
                    <div className="relative w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/40 transition-colors">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </button>
                  <span className="absolute bottom-6 left-6 text-white text-sm font-medium">
                    Watch video
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features and CTA */}
          <div className="flex flex-col justify-between space-y-6">
            {/* Features Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <h3 className="text-xl font-bold text-gray-900">
                  Unlock premium features
                </h3>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                onClick={handleUnlock}
                className="w-full h-12 bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200"
              >
                See pricing
              </Button>

              {/* Disclaimer */}
              <p className="text-center text-xs text-gray-500 leading-relaxed">
                Some plans don't include all features. Review and upgrade to the
                plan that best fits your needs
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
