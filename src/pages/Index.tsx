
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TaskInput from "@/components/TaskInput";
import PlanningAnimation from "@/components/PlanningAnimation";
import DayPlan from "@/components/DayPlan";
import ApiKeyInput from "@/components/ApiKeyInput";
import { createDayPlan } from "@/utils/planner";

const Index = () => {
  const { toast } = useToast();
  const [stage, setStage] = useState<"api-key" | "input" | "planning" | "result">("api-key");
  const [tasks, setTasks] = useState<string[]>([]);
  const [plan, setPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if API key exists in localStorage
  useState(() => {
    const apiKey = localStorage.getItem("openai_api_key");
    if (apiKey) {
      setStage("input");
    }
  });

  const handleApiKeySubmit = () => {
    setStage("input");
  };

  const handleTaskSubmit = (inputTasks: string[]) => {
    setTasks(inputTasks);
    setStage("planning");
    setError(null);
    
    // Start the planning process
    createDayPlan(inputTasks)
      .then(result => {
        setPlan(result);
        setTimeout(() => {
          setStage("result");
        }, 1000); // Small delay for smooth transition
      })
      .catch(err => {
        console.error("Planning error:", err);
        setError(err.message || "Failed to create plan");
        toast({
          title: "Error",
          description: "Could not generate your plan. Using fallback planner.",
          variant: "destructive",
        });
        // Try again with the fallback planner
        createDayPlan(inputTasks)
          .then(result => {
            setPlan(result);
            setStage("result");
          });
      });
  };

  const handleReset = () => {
    setStage("input");
    setTasks([]);
    setPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full py-10 px-4 sm:px-6 flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent/20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">AI Daily Planner</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Smart planning powered by AI for your most productive day
          </p>
        </div>

        <div className="w-full min-h-[50vh] flex items-center justify-center p-2">
          {stage === "api-key" && <ApiKeyInput onSubmit={handleApiKeySubmit} />}
          {stage === "input" && <TaskInput onSubmit={handleTaskSubmit} />}
          {stage === "planning" && <PlanningAnimation />}
          {stage === "result" && plan && <DayPlan plan={plan} onReset={handleReset} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
