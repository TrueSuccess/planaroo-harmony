
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import { PlanItem } from "@/utils/planner";

interface DayPlanProps {
  plan: {
    items: PlanItem[];
    explanation: string;
  };
  onReset: () => void;
}

const DayPlan = ({ plan, onReset }: DayPlanProps) => {
  return (
    <Card className="glass-card w-full max-w-xl mx-auto p-6 animate-scale-in overflow-hidden">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-medium text-center mb-2">Your Optimized Day Plan</h2>
          <div className="h-1 w-20 bg-primary/60 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground bg-secondary/50 p-4 rounded-lg">
          <p>{plan.explanation}</p>
        </div>

        <div className="space-y-4 mt-6">
          {plan.items.map((item, index) => (
            <div
              key={index}
              className="relative pl-8 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute left-0 top-0 flex items-center justify-center h-6 w-6">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="task-item border-primary/10 bg-white/60">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium mb-1">{item.time}</div>
                    <div className="flex items-center">
                      <span>{item.task}</span>
                    </div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-primary/60" />
                </div>
                <div className="shimmer"></div>
              </div>
              {index < plan.items.length - 1 && (
                <div className="absolute left-3 top-10 w-px h-8 bg-primary/20"></div>
              )}
            </div>
          ))}
        </div>

        <Button 
          onClick={onReset} 
          variant="outline" 
          className="w-full mt-6 transition-all duration-300"
        >
          Plan Another Day
        </Button>
      </div>
    </Card>
  );
};

export default DayPlan;
