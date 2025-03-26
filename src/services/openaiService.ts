
interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const generatePlanWithLLM = async (tasks: string[]): Promise<any> => {
  const OPENAI_API_KEY = localStorage.getItem('openai_api_key');
  
  if (!OPENAI_API_KEY) {
    throw new Error("API key not found");
  }
  
  const prompt = `
    I need help planning my day. Here are the tasks I want to accomplish:
    ${tasks.map((task) => `- ${task}`).join('\n')}
    
    Please create an optimal day plan with specific times for each task. 
    Consider task dependencies, time constraints, and logical groupings.
    Format your response as a JSON object with this structure:
    {
      "items": [
        {"time": "9:00AM", "task": "Task description"},
        ...
      ],
      "explanation": "A paragraph explaining the reasoning behind this schedule..."
    }
    
    Only respond with valid JSON and nothing else.
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate plan');
    }
    
    const data: OpenAIResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    // Extract the JSON from the response (handles case where LLM adds extra text)
    const jsonMatch = content.match(/({[\s\S]*})/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }
    
    const parsedPlan = JSON.parse(jsonMatch[0]);
    return parsedPlan;
  } catch (error) {
    console.error('Error generating plan:', error);
    throw error;
  }
};
