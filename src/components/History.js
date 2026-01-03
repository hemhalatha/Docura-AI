import React from "react";
import { History as HistoryIcon, Clock, Trash2 } from "lucide-react";

const History = ({ history, onSelect, onDelete }) => {
    if (!history || history.length === 0) return null;

    return (
        <div className="history-section">
            <div className="sidebar-label">
                <HistoryIcon size={14} />
                Recent History
            </div>

            <div className="history-list">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="history-item"
                        onClick={() => onSelect(item.notes)}
                    >
                        <div className="history-main">
                            <Clock size={12} color="var(--text-dim)" />
                            <span className="history-title">{item.fileName}</span>
                        </div>
                        <Trash2
                            size={14}
                            className="delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item.id);
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
