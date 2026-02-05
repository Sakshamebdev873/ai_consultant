"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Building2, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utlis";

// Mock Data for Tool Recommendation
const TOOL_RECOMMENDATION = {
  id: "tool-1",
  name: "FinBot Pro",
  price: "$49/mo",
  compliance: ["SOC2", "GDPR"],
  description: "Automated financial reconciliation with human-in-the-loop validation.",
};

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  attachment?: any; // For tool cards
};

export default function ConsultantInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello. I am your specialized AI Consultant. To begin, please tell me your industry and the primary problem you are trying to solve.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Latency & "Thinking"
    setTimeout(() => {
      setIsTyping(false);
      
      // Simulated Logic: If user mentions "finance", show a tool card
      const isFinance = input.toLowerCase().includes("finance") || input.toLowerCase().includes("bank");
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: isFinance 
            ? "Based on your requirements for banking compliance, I've analyzed 40+ tools. 'FinBot Pro' appears to be the safest and most efficient choice." 
            : "I understand. Could you elaborate on your budget constraints and team size?",
        attachment: isFinance ? TOOL_RECOMMENDATION : null
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      
      {/* Sidebar (Context) */}
      <aside className="w-80 border-r border-white/10 bg-[#0A0F1E] hidden md:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-8 text-primary font-bold">
            <Sparkles className="w-5 h-5" /> Decision Engine
        </div>
        
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase">Current Domain</label>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium">General / Discovery</span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase">Consultation Goals</label>
                <div className="space-y-2">
                    {["Identify Problem", "Filter Compliance", "Compare ROI"].map((step, i) => (
                        <div key={step} className="flex items-center gap-3 text-sm text-slate-400">
                            <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-green-500 animate-pulse" : "bg-slate-700")} />
                            {step}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center px-6 justify-between bg-background/50 backdrop-blur-md sticky top-0 z-10">
            <h2 className="font-semibold text-slate-200">New Consultation Session</h2>
            <div className="text-xs text-slate-500">Session ID: #8829-XJ</div>
        </header>

        {/* Messages List */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            <AnimatePresence>
                {messages.map((msg) => (
                    <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex gap-4 max-w-3xl", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}
                    >
                        {/* Avatar */}
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                            msg.role === "ai" ? "bg-primary/20 text-primary" : "bg-white/10 text-white"
                        )}>
                            {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                        </div>

                        {/* Bubble */}
                        <div className={cn(
                            "space-y-2",
                            msg.role === "user" ? "items-end flex flex-col" : ""
                        )}>
                            <div className={cn(
                                "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                msg.role === "ai" 
                                    ? "bg-white/5 border border-white/5 text-slate-300 rounded-tl-none" 
                                    : "bg-primary text-white rounded-tr-none"
                            )}>
                                {msg.content}
                            </div>

                            {/* Attachment (Tool Card) */}
                            {msg.attachment && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full max-w-sm bg-[#111827] border border-white/10 rounded-xl p-4 mt-2 overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-bold text-white">{msg.attachment.name}</h4>
                                            <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded mt-1 inline-block">Recommended</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-primary">{msg.attachment.price}</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-4">{msg.attachment.description}</p>
                                    <div className="flex gap-2 mb-4">
                                        {msg.attachment.compliance.map((tag: string) => (
                                            <span key={tag} className="text-[10px] uppercase font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-2 bg-white text-black text-xs font-bold rounded hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                                        <ShoppingCart size={14} /> Add to Selection
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
                <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <Bot size={16} />
                    </div>
                    <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className="p-6 pt-0 bg-gradient-to-t from-background via-background to-transparent">
            <div className="relative">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Describe your business problem..."
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-slate-600 shadow-2xl"
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-2 top-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!input.trim()}
                >
                    <Send size={16} />
                </button>
            </div>
            <p className="text-center text-[10px] text-slate-600 mt-3">
                AI Agent can make mistakes. Please verify critical compliance data manually.
            </p>
        </div>
      </main>
    </div>
  );
}