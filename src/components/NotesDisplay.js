import React, { useState } from "react";
import { Copy, Download, Trash2, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

const NotesDisplay = ({ notes, onClear }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(notes);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadFile = (format) => {
        const element = document.createElement("a");
        const file = new Blob([notes], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `notes-${new Date().getTime()}.${format}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    if (!notes) return null;

    return (
        <div className="output-container">
            <div className="output-header">
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button
                        className="btn-secondary"
                        onClick={copyToClipboard}
                        style={{ width: 'auto', padding: '0.5rem 0.8rem', height: '36px' }}
                    >
                        {copied ? <Check size={14} color="#fff" /> : <Copy size={14} />}
                        <span style={{ fontSize: '0.8rem', fontWeight: 500, marginLeft: '4px' }}>Copy</span>
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => downloadFile("md")}
                        style={{ width: 'auto', padding: '0.5rem 0.8rem', height: '36px' }}
                    >
                        <Download size={14} />
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={onClear}
                        style={{ width: 'auto', padding: '0.5rem 0.8rem', height: '36px' }}
                    >
                        <Trash2 size={14} color="#f87171" />
                    </button>
                </div>
            </div>
            <div className="output markdown-content">
                <ReactMarkdown>
                    {notes}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default NotesDisplay;
