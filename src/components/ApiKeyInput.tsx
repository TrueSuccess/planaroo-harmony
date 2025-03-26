
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

interface ApiKeyInputProps {
  onSubmit: () => void;
}

const ApiKeyInput = ({ onSubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check if API key is already saved
    const savedKey = localStorage.getItem("openai_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setSaved(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setSaved(true);
      onSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setSaved(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveKey();
    }
  };

  return (
    <Card className="glass-card w-full max-w-lg mx-auto p-6 animate-scale-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-medium text-center mb-2">Enter your OpenAI API Key</h2>
          <p className="text-muted-foreground text-center mb-6">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <KeyRound className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="pl-10 transition-all duration-300"
            />
          </div>
          <Button onClick={handleSaveKey} size="sm">
            {saved ? "Saved" : "Save"}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            This app uses OpenAI to create personalized daily plans.
            You'll need your own API key from{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              OpenAI
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ApiKeyInput;
