"use client";

import { Paperclip, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { createContainer } from "../../../lib/backend/api";

interface ProjectPromptInterfaceProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export const ProjectPromptInterface = ({
  selectedTemplate,
  onTemplateChange,
}: ProjectPromptInterfaceProps) => {
  const [promptInput, setPromptInput] = useState("");
  const [isCreatingFromPrompt, setIsCreatingFromPrompt] = useState(false);
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Claude Sonnet 4");
  const router = useRouter();

  const handlePromptSubmit = async () => {
    if (!promptInput.trim() || isCreatingFromPrompt) return;

    setIsCreatingFromPrompt(true);

    toast("Creating new project...", {
      icon: "🚀",
      duration: 3000,
    });

    try {
      const containerResponse = await createContainer();
      const containerId = containerResponse.containerId;

      toast.success("Project created! Redirecting...", {
        duration: 2000,
      });

      router.push(
        `/projects/${containerId}?prompt=${encodeURIComponent(
          promptInput.trim()
        )}`
      );
    } catch (error) {
      console.error("Failed to create project from prompt:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsCreatingFromPrompt(false);
    }
  };

  const handlePromptKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  const communityOptions = [
    "Next.js",
    "Express & React",
    "Express & Vue",
    "Django",
  ];

  const modelOptions = ["Claude Sonnet 4"];

  const handleCommunitySelect = (option: string) => {
    onTemplateChange(option);
    setShowCommunityDropdown(false);
  };

  const handleModelSelect = (option: string) => {
    setSelectedModel(option);
    setShowModelDropdown(false);
  };

  return (
    <>
      <div className="text-center mb-10">
        <h1
          style={{ fontFamily: "Suisse" }}
          className="text-2xl font-semibold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent"
        >
          What do you want to build?
        </h1>
      </div>

      <div className="group/form-container content-center relative mx-auto w-full max-w-5xl mb-16">
        <div className="relative z-10 flex w-full flex-col">
          <div className="rounded-b-xl">
            <form className="focus-within:border-gray-300 bg-white/90 border-gray-200 relative rounded-2xl border shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 backdrop-blur-xl">
              <div className="relative z-10 grid min-h-0 rounded-2xl">
                <label className="sr-only" htmlFor="chat-main-textarea">
                  Chat Input
                </label>
                <textarea
                  id="chat-main-textarea"
                  name="content"
                  placeholder="Ask Toyon to build..."
                  spellCheck="false"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={handlePromptKeyDown}
                  disabled={isCreatingFromPrompt}
                  className="resize-none overflow-auto w-full flex-1 bg-transparent p-4 text-sm outline-none ring-0 placeholder:text-gray-400 text-gray-900 disabled:opacity-50"
                  style={{
                    height: "54px",
                    minHeight: "54px",
                    maxHeight: "384px",
                  }}
                />
                <div className="flex items-center gap-3 px-4 pb-3">
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={handlePromptSubmit}
                      disabled={!promptInput.trim() || isCreatingFromPrompt}
                      className="flex items-center justify-center w-9 h-9 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed cursor-pointer"
                      type="submit"
                    >
                      {isCreatingFromPrompt ? (
                        <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg
                          height="16"
                          strokeLinejoin="round"
                          viewBox="0 0 16 16"
                          width="16"
                          fill="currentColor"
                        >
                          <path d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z" />
                        </svg>
                      )}
                      <span className="sr-only">Send Message</span>
                    </button>
                  </div>
                </div>

                {(showCommunityDropdown || showModelDropdown) && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                      setShowCommunityDropdown(false);
                      setShowModelDropdown(false);
                    }}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
