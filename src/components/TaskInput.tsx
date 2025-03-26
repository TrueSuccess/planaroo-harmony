
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface TaskInputProps {
  onSubmit: (tasks: string[]) => void;
}

const TaskInput = ({ onSubmit }: TaskInputProps) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [currentTask, setCurrentTask] = useState("");

  const handleAddTask = () => {
    if (currentTask.trim() !== "") {
      setTasks([...tasks, currentTask.trim()]);
      setCurrentTask("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleSubmit = () => {
    if (tasks.length > 0) {
      onSubmit(tasks);
    }
  };

  return (
    <Card className="glass-card w-full max-w-lg mx-auto p-6 animate-scale-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-medium text-center mb-2">What do you want to accomplish today?</h2>
          <p className="text-muted-foreground text-center mb-6">
            Enter your tasks and we'll help optimize your day
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Add a task (e.g., 'Go for a 20 minute run')"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className="transition-all duration-300"
          />
          <Button onClick={handleAddTask} size="sm">
            Add
          </Button>
        </div>

        <div className="space-y-2 mt-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="task-item group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center">
                <span>{task}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  onClick={() => handleRemoveTask(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="shimmer"></div>
            </div>
          ))}
        </div>

        {tasks.length > 0 && (
          <Button 
            onClick={handleSubmit} 
            className="w-full mt-4 transition-all duration-300 hover:shadow-lg"
          >
            Plan My Day
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TaskInput;
