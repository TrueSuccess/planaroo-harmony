
import { generatePlanWithLLM } from "@/services/openaiService";

export interface PlanItem {
  time: string;
  task: string;
}

interface DayPlan {
  items: PlanItem[];
  explanation: string;
}

// Fallback planning algorithm if API call fails
const createFallbackPlan = (tasks: string[]): DayPlan => {
  // Get current hour to base the plan on
  const currentHour = new Date().getHours();
  const startHour = currentHour < 9 ? 9 : currentHour + 1;
  
  // Simple sorting logic to simulate LLM prioritization
  const sortedTasks = [...tasks].sort((a, b) => {
    // Prioritize tasks with "meeting" or "help" keywords
    const aPriority = a.toLowerCase().includes("meeting") || a.toLowerCase().includes("help") ? 1 : 0;
    const bPriority = b.toLowerCase().includes("meeting") || b.toLowerCase().includes("help") ? 1 : 0;
    
    return bPriority - aPriority;
  });

  // Group similar tasks
  const outdoorTasks: string[] = [];
  const workTasks: string[] = [];
  const homeTasks: string[] = [];
  
  sortedTasks.forEach(task => {
    const lowerTask = task.toLowerCase();
    if (lowerTask.includes("run") || lowerTask.includes("walk") || lowerTask.includes("mow") || lowerTask.includes("outside")) {
      outdoorTasks.push(task);
    } else if (lowerTask.includes("meeting") || lowerTask.includes("work") || lowerTask.includes("prepare")) {
      workTasks.push(task);
    } else {
      homeTasks.push(task);
    }
  });
  
  // Organize tasks with meaningful times
  const planItems: PlanItem[] = [];
  let currentPlanHour = startHour;
  
  // First work tasks
  workTasks.forEach(task => {
    planItems.push({
      time: `${currentPlanHour}:00${currentPlanHour < 12 ? 'AM' : 'PM'}`,
      task
    });
    currentPlanHour = (currentPlanHour + 1) % 24;
    if (currentPlanHour === 0) currentPlanHour = 12;
  });
  
  // Then outdoor tasks grouped together
  outdoorTasks.forEach(task => {
    planItems.push({
      time: `${currentPlanHour}:00${currentPlanHour < 12 ? 'AM' : 'PM'}`,
      task
    });
    currentPlanHour = (currentPlanHour + 1) % 24;
    if (currentPlanHour === 0) currentPlanHour = 12;
  });
  
  // Then home tasks
  homeTasks.forEach(task => {
    planItems.push({
      time: `${currentPlanHour}:00${currentPlanHour < 12 ? 'AM' : 'PM'}`,
      task
    });
    currentPlanHour = (currentPlanHour + 1) % 24;
    if (currentPlanHour === 0) currentPlanHour = 12;
  });
  
  // Generate an explanation
  let explanation = "We've optimized your day based on task priorities and efficient grouping. ";
  
  if (workTasks.length > 0) {
    explanation += "Work-related tasks are scheduled earlier to ensure they get completed when your focus is highest. ";
  }
  
  if (outdoorTasks.length > 0) {
    explanation += "Outdoor activities are grouped together to maximize efficiency and minimize transitions. ";
  }
  
  if (homeTasks.length > 0 && homeTasks.some(t => t.toLowerCase().includes("help") || t.toLowerCase().includes("family"))) {
    explanation += "Family-related tasks are scheduled when family members are likely to be available. ";
  }
  
  explanation += "This plan gives you the optimal balance between productivity and well-being throughout your day.";
  
  return {
    items: planItems,
    explanation
  };
};

// Main function to create a day plan using LLM
export const createDayPlan = async (tasks: string[]): Promise<DayPlan> => {
  try {
    // Use the LLM service to generate the plan
    return await generatePlanWithLLM(tasks);
  } catch (error) {
    console.error("Error in LLM planning, using fallback:", error);
    // If the API fails, fall back to the local algorithm
    return createFallbackPlan(tasks);
  }
};
