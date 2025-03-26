
import { useEffect, useState } from "react";

const PlanningAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Analyzing your tasks...");
  
  useEffect(() => {
    const messages = [
      "Analyzing your tasks...",
      "Optimizing your schedule...",
      "Considering time constraints...",
      "Balancing priorities...",
      "Finalizing your perfect day plan..."
    ];
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.05 + 0.5;
        return Math.min(newProgress, 99);
      });
    }, 200);
    
    const messageInterval = setInterval(() => {
      setMessage((prev) => {
        const currentIndex = messages.indexOf(prev);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);
  
  return (
    <div className="w-full max-w-lg mx-auto glass-card p-10 flex flex-col items-center justify-center space-y-8 animate-scale-in">
      <h2 className="text-2xl font-medium text-center">{message}</h2>
      
      <div className="w-full max-w-md bg-secondary rounded-full h-2.5 mb-4 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex items-center justify-center space-x-3 mt-4">
        <div className="planning-circle bg-primary/60 animate-pulse-opacity" style={{ animationDelay: "0ms" }}></div>
        <div className="planning-circle bg-primary/70 animate-pulse-opacity" style={{ animationDelay: "300ms" }}></div>
        <div className="planning-circle bg-primary/80 animate-pulse-opacity" style={{ animationDelay: "600ms" }}></div>
        <div className="planning-circle bg-primary/90 animate-pulse-opacity" style={{ animationDelay: "900ms" }}></div>
      </div>
    </div>
  );
};

export default PlanningAnimation;
