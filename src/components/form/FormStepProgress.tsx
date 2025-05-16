import React from "react";
import { cn } from "@/lib/utils";
import { FormProgress } from "./FormProgress";

interface Step {
  label: string;
  icon: React.ReactNode;
  color: string;
  date?: string;
  current?: boolean;
}

interface FormStepProgressProps {  
  steps: Step[];
}

export const FormStepProgress: React.FC<FormStepProgressProps> = ({ steps }) => {

  let currentStep = 0;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (step.current)
      currentStep = i;
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between relative w-full mb-4 mt-4">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center text-center flex-1">
              <div
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full transition-all mb-2",
                  isActive ? step.color : "bg-gray-200 text-gray-400"
                )}
                style={{ backgroundColor: isActive ? step.color : "#E2E8F0" }}
              >
                {step.icon}
              </div>
              <span
                className={cn(
                  isCurrent ? "text-blue-600 font-semibold" : isActive ? "text-blue-600" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
              {step.date && <span className="text-sm text-gray-500 mt-1">{step.date}</span>}
            </div>
          );
        })}
      </div>

      <FormProgress
        value={(currentStep / (steps.length - 1)) * 100}
        className="h-2 rounded-full bg-gray-200"
        style={{ backgroundColor: steps[currentStep]?.color }}
      />
    </div>
  );
};
