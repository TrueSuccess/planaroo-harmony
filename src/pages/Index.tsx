
import { useState } from "react";
import TaskInput from "@/components/TaskInput";
import PlanningAnimation from "@/components/PlanningAnimation";
import DayPlan from "@/components/DayPlan";
import { createDayPlan } from "@/utils/planner";

const Index = () => {
  const [stage, setStage] = useState<"input" | "planning" | "result">("input");
  const [tasks, setTasks] = useState<string[]>([]);
  const [plan, setPlan] = useState<any>(null);

  const handleTaskSubmit = (inputTasks: string[]) => {
    setTasks(inputTasks);
    setStage("planning");
    
    // Start the planning process
    createDayPlan(inputTasks).then(result => {
      setPlan(result);
      setTimeout(() => {
        setStage("result");
      }, 1000); // Small delay for smooth transition
    });
  };

  const handleReset = () => {
    setStage("input");
    setTasks([]);
    setPlan(null);
  };

  return (
    <div className="min-h-screen w-full py-10 px-4 sm:px-6 flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent/20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Daily Planner</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Smart planning for your most productive day
          </p>
        </div>

        <div className="w-full min-h-[50vh] flex items-center justify-center p-2">
          {stage === "input" && <TaskInput onSubmit={handleTaskSubmit} />}
          {stage === "planning" && <PlanningAnimation />}
          {stage === "result" && plan && <DayPlan plan={plan} onReset={handleReset} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
