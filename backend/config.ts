// Make sure to replace the values with your actual API key and model

// USING ANTHROPIC CLAUDE SONNET 4 is strongly recommended for best results

export const config = {
  aiSdk: {
    // The base URL for the AI SDK, leave blank for e.g. openai
    baseUrl: "https://api.anthropic.com/v1",

    // Your API key for provider, if using Ollama enter "ollama" here
    apiKey: "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",

    // The model to use, e.g., "gpt-4", "gpt-3.5-turbo", or "ollama/llama2"
    model: "claude-sonnet-4-5",
  },
} as const;
