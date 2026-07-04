import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPaperPlane, FaTimes, FaMicrophone } from "react-icons/fa";
import botImage from "../assets/medintel-bot.png";
const API_URL = import.meta.env.VITE_API_URL;

export default function ChatBot() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Voice Input States
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const defaultMessages = [
    {
      sender: "bot",
      text: "👋 Welcome to MedIntel AI!\n\nI can help you with:\n\n📅 Book Appointments\n📄 Upload Medical Reports\n💊 View Prescriptions\n👨‍⚕️ Find Doctors\n🩺 General Health Questions\n\nHow may I assist you today?",
    },
  ];

  const [messages, setMessages] = useState(defaultMessages);
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isUserAtBottom = useRef(true);
  const historyLoaded = useRef(false);

  // Helper function to handle saving chat history securely
  const saveChatToMongoDB = async (updatedMessages) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        `${API_URL}/api/chat-history/save`,
        { messages: updatedMessages },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to save chat history:", err);
    }
  };

  // Dedicated Auto-Scroll Effect
  useEffect(() => {
    if (!chatContainerRef.current) return;
    if (!isUserAtBottom.current) return;

    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [messages]);

  // Load chat history from MongoDB on mount
  useEffect(() => {
    if (historyLoaded.current) return;

    const loadHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          historyLoaded.current = true;
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/chat-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          res.data.messages &&
          res.data.messages.length > 0
        ) {
          setMessages(res.data.messages);
        }

        historyLoaded.current = true;

      } catch (err) {
        console.log(err);
        historyLoaded.current = true;
      }
    };

    loadHistory();
  }, []);

  // Speech Recognition Initialization
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          alert("Microphone access denied. Please enable microphone permissions in your browser settings.");
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const sendMessage = async () => {
    const cleanMessage = message.trim();

    if (!cleanMessage || loading) return;

    // Turn off listening if user manually sends
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const userMessage = {
      sender: "user",
      text: cleanMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    let currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setMessage("");

    const lowerMessage = cleanMessage.toLowerCase();

    // Appointment
    if (
      lowerMessage.includes("book appointment") ||
      lowerMessage === "appointment"
    ) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Sure 😊 Redirecting you to Appointment page...",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => {
        navigate("/appointment");
      }, 1200);

      return;
    }

    // Upload Report
    if (
      lowerMessage.includes("upload report") ||
      lowerMessage === "report"
    ) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Opening Report Upload page 📄",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => {
        navigate("/upload-report");
      }, 1200);

      return;
    }

    // Prescription
    if (lowerMessage.includes("prescription")) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Opening Prescription page 💊",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => {
        navigate("/prescription");
      }, 1200);

      return;
    }

    // My Appointments
    if (
      lowerMessage.includes("my appointment") ||
      lowerMessage.includes("appointments")
    ) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Opening My Appointments 📅",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => {
        navigate("/my-appointments");
      }, 1200);

      return;
    }

    // Doctors
    if (
      lowerMessage.includes("doctor") ||
      lowerMessage.includes("find doctor")
    ) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Taking you to Doctors 👨‍⚕️",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => {
        navigate("/");
      }, 1200);

      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chatbot/chat`, {
        message: cleanMessage,
      });

      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: res.data.reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);
    } catch (error) {
      console.log(error);

      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to MedIntel AI.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);
    }

    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleQuickAction = (text) => {
    const userMessage = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    let currentMessages = [...messages, userMessage];
    setMessages(currentMessages);

    const lowerMessage = text.toLowerCase();

    if (lowerMessage.includes("book appointment")) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Sure 😊 Redirecting you to Appointment page...",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => navigate("/appointment"), 1200);
      return;
    }

    if (lowerMessage.includes("upload report")) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Opening Report Upload page 📄",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => navigate("/upload-report"), 1200);
      return;
    }

    if (lowerMessage.includes("prescription")) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Opening Prescription page 💊",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => navigate("/prescription"), 1200);
      return;
    }

    if (lowerMessage.includes("doctor")) {
      const nextMessages = [
        ...currentMessages,
        {
          sender: "bot",
          text: "Taking you to Doctors 👨‍⚕️",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      setMessages(nextMessages);
      saveChatToMongoDB(nextMessages);

      setTimeout(() => navigate("/"), 1200);
      return;
    }

    setLoading(true);
    axios.post(`${API_URL}/api/chatbot/chat`, { message: text })
      .then((res) => {
        const nextMessages = [
          ...currentMessages,
          {
            sender: "bot",
            text: res.data.reply,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
        setMessages(nextMessages);
        saveChatToMongoDB(nextMessages);
      })
      .catch((error) => {
        console.log(error);
        const nextMessages = [
          ...currentMessages,
          {
            sender: "bot",
            text: "Sorry, I couldn't connect to MedIntel AI.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
        setMessages(nextMessages);
        saveChatToMongoDB(nextMessages);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClearHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(`${API_URL}/api/chat-history/clear`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error("Failed to clear chat history from backend:", err);
    } finally {
      setMessages(defaultMessages);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      {isOpen && (
        <div className="-mb-8 w-[calc(100vw-32px)] sm:w-[370px] h-[540px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col border border-teal-100 overflow-hidden">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={botImage}
                alt="MedIntelAI Bot"
                className="w-18 h-18 object-contain -my-3"
              />
              <div>
                <h2 className="font-bold text-sm">MedIntelAI Bot</h2>
                <p className="text-xs text-teal-50 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                  Online • Health Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                className="px-3 py-1 text-xs font-medium bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                Clear
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div
            ref={chatContainerRef}
            tabIndex={0}
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-[#f6fbfb] px-4 py-5 space-y-4"
            onScroll={() => {
              const container = chatContainerRef.current;

              if (!container) return;

              const distanceFromBottom =
                container.scrollHeight -
                container.scrollTop -
                container.clientHeight;

              isUserAtBottom.current = distanceFromBottom <= 60;
            }}
          >
            {messages.length === 1 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => handleQuickAction("Book Appointment")}
                  className="rounded-xl bg-white border border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-lg transition-all duration-300 p-3 text-sm font-semibold text-teal-700"
                >
                  📅 Book Appointment
                </button>

                <button
                  onClick={() => handleQuickAction("Upload Report")}
                  className="rounded-xl bg-white border border-gray-200 hover:border-cyan-500 hover:bg-cyan-50 hover:shadow-lg transition-all duration-300 p-3 text-sm font-semibold text-cyan-700"
                >
                  📄 Upload Report
                </button>

                <button
                  onClick={() => handleQuickAction("Prescription")}
                  className="rounded-xl bg-white border border-gray-200 hover:border-orange-500 hover:bg-orange-50 hover:shadow-lg transition-all duration-300 p-3 text-sm font-semibold text-orange-700"
                >
                  💊 Prescription
                </button>

                <button
                  onClick={() => handleQuickAction("Find Doctor")}
                  className="rounded-xl bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 hover:shadow-lg transition-all duration-300 p-3 text-sm font-semibold text-green-700"
                >
                  👨‍⚕️ Find Doctor
                </button>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => handleQuickAction("I have fever")}
                  className="px-3 py-2 text-xs rounded-full bg-gray-100 hover:bg-teal-100"
                >
                  🤒 I have fever
                </button>

                <button
                  onClick={() => handleQuickAction("I have cough")}
                  className="px-3 py-2 text-xs rounded-full bg-gray-100 hover:bg-teal-100"
                >
                  🤧 I have cough
                </button>

                <button
                  onClick={() => handleQuickAction("Explain my prescription")}
                  className="px-3 py-2 text-xs rounded-full bg-gray-100 hover:bg-teal-100"
                >
                  💊 Explain Prescription
                </button>

                <button
                  onClick={() => handleQuickAction("How do I upload report")}
                  className="px-3 py-2 text-xs rounded-full bg-gray-100 hover:bg-teal-100"
                >
                  📄 Upload Report?
                </button>
              </div>
            )}
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender === "bot" && (
                  <div className="mr-2 flex flex-col items-center">
                    <img
                      src={botImage}
                      alt="Bot"
                      className="w-10 h-10 object-contain"
                    />

                    <span className="text-[10px] text-gray-400 mt-1">
                      {item.time}
                    </span>
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    item.sender === "user"
                      ? "bg-teal-500 text-white rounded-br-md"
                      : "bg-white text-gray-700 shadow-sm rounded-bl-md"
                  }`}
                >
                  {item.text}

                  <p className="text-[10px] mt-2 opacity-60 text-right">
                    {item.time}
                  </p>

                  {item.sender === "bot" && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.text);

                        setCopiedIndex(index);

                        setTimeout(() => {
                          setCopiedIndex(null);
                        }, 2000);
                      }}
                      className="ml-auto block mt-2 px-3 py-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-600 text-xs font-medium transition"
                    >
                      {copiedIndex === index ? "✅ Copied" : "📋 Copy"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <img
                  src={botImage}
                  alt="Bot"
                  className="w-12 h-12 object-contain mr-2"
                />

                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm font-medium">
                      MedIntelAI
                    </span>

                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></span>

                      <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>

                      <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* INPUT AREA */}
          <div className="p-3 border-t bg-white flex gap-2 items-center">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center gap-2 focus-within:ring-2 focus-within:ring-teal-300">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask MedIntelAI..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button
                type="button"
                onClick={toggleListening}
                className={`text-gray-400 hover:text-teal-600 transition flex items-center justify-center p-0.5 ${
                  isListening ? "text-red-500 animate-pulse" : ""
                }`}
                title={isListening ? "Listening... Click to stop" : "Voice input"}
              >
                <FaMicrophone size={16} className={isListening ? "text-red-500" : ""} />
              </button>
            </div>

            <button
              onClick={sendMessage}
              disabled={loading}
              className="w-11 h-11 rounded-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white flex items-center justify-center flex-shrink-0"
            >
              {loading ? "..." : <FaPaperPlane />}
            </button>
          </div>
        </div>
      )}

      {/* FLOATING ROBOT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-[155px] h-[155px] sm:w-[185px] sm:h-[185px] hover:scale-110 transition duration-300"
        aria-label="Open MedIntelAI chatbot"
      >
        <img
          src={botImage}
          alt="Open MedIntelAI chatbot"
          className="w-full h-full object-contain"
        />
      </button>
    </div>
  );
}