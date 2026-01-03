import { useState, useEffect } from "react";
import { generateNotes } from "../services/api";

const useNotes = () => {
    const [file, setFile] = useState(null);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    // Load history from localStorage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem("ai_notes_history");
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to load history", e);
            }
        }
    }, []);

    const saveToHistory = (newNotes, fileName) => {
        const historyItem = {
            id: Date.now(),
            notes: newNotes,
            fileName: fileName,
            date: new Date().toLocaleString(),
        };
        const updatedHistory = [historyItem, ...history.slice(0, 9)]; // Keep last 10
        setHistory(updatedHistory);
        localStorage.setItem("ai_notes_history", JSON.stringify(updatedHistory));
    };

    const handleGenerateNotes = async () => {
        if (!file) return;

        setLoading(true);
        setNotes("");
        setError(null);

        try {
            const data = await generateNotes(file);

            // Normalize data: n8n often returns an array [item]
            const normalizedData = Array.isArray(data) ? data[0] : (data || {});

            // Try common n8n AI response fields + deep nesting for Gemini/Google AI
            const content = normalizedData.notes ||
                normalizedData.output ||
                normalizedData.response ||
                normalizedData.text ||
                normalizedData.message ||
                normalizedData.content ||
                normalizedData.parts?.[0]?.text ||
                normalizedData.candidates?.[0]?.content?.parts?.[0]?.text;

            if (content) {
                let finalContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);

                // 1. Fix literal \n strings first to make parsing easier
                if (typeof finalContent === 'string') {
                    finalContent = finalContent.replace(/\\n/g, '\n');
                }

                // 2. Identify and format structured JSON
                if (typeof finalContent === 'string' && finalContent.trim().startsWith('{')) {
                    try {
                        const parsed = JSON.parse(finalContent);

                        // Detect structured notes (with units/topics/concepts)
                        if (parsed.units || parsed.title || parsed.topics) {
                            let md = "";
                            if (parsed.title) md += `# ${parsed.title}\n\n`;

                            (parsed.units || []).forEach(unit => {
                                if (unit.unit_title) md += `## ${unit.unit_title}\n\n`;
                                (unit.topics || []).forEach(topic => {
                                    if (topic.topic_title) md += `### ${topic.topic_title}\n`;
                                    (topic.concepts || []).forEach(concept => {
                                        md += `* ${concept}\n`;
                                    });
                                    md += `\n`;
                                });
                            });

                            // If we didn't get a strict unit structure but have general topics
                            if (!md && parsed.topics) {
                                parsed.topics.forEach(topic => {
                                    md += `## ${topic.topic_title || topic.title || 'Topic'}\n`;
                                    (topic.concepts || topic.details || []).forEach(detail => {
                                        md += `* ${detail}\n`;
                                    });
                                    md += `\n`;
                                });
                            }

                            finalContent = md.trim() || JSON.stringify(parsed, null, 2);
                        } else {
                            // Extract common single fields or stringify small objects
                            finalContent = parsed.notes || parsed.output || parsed.response || JSON.stringify(parsed, null, 2);
                        }
                    } catch (e) {
                        // Not valid JSON, keep original
                    }
                }

                setNotes(finalContent);
                saveToHistory(finalContent, file.name);
            } else {
                console.warn("⚠️ No standard fields found. Raw data:", data);
                const raw = JSON.stringify(data, null, 2);
                setNotes(`⚠️ Unexpected format. Please check your n8n output node.\n\nRaw data received:\n${raw}`);
            }
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const clearNotes = () => {
        setNotes("");
        setFile(null);
        setError(null);
    };

    const deleteHistoryItem = (id) => {
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem("ai_notes_history", JSON.stringify(updated));
    };

    return {
        file,
        setFile,
        notes,
        setNotes,
        loading,
        error,
        history,
        handleGenerateNotes,
        clearNotes,
        deleteHistoryItem
    };
};

export default useNotes;
