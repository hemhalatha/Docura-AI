import React, { useState } from "react";
import { File, X } from "lucide-react";

const UploadSection = ({ onFileChange, onUpload, file, loading }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            onFileChange(droppedFile);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    return (
        <div
            className={`upload-section ${isDragging ? "active" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {!file ? (
                <div className="upload-placeholder">
                    <div className="upload-header-content">
                        <div className="upload-branding">
                            <p className="brand-title">Docura AI</p>
                            <p className="brand-subtitle">Intelligence for your documents</p>
                        </div>
                    </div>

                    <div className="file-input-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => onFileChange(e.target.files[0])}
                            disabled={loading}
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="upload-btn">
                            Upload PDF
                        </label>
                    </div>
                </div>
            ) : (
                <div className="file-preview">
                    <div className="file-info">
                        <File size={16} color="var(--primary)" />
                        <span className="file-info-text">{file.name}</span>
                        {!loading && (
                            <X
                                size={14}
                                className="close-btn"
                                onClick={() => onFileChange(null)}
                                style={{ cursor: 'pointer' }}
                            />
                        )}
                    </div>

                    <button className="primary-btn" onClick={onUpload} disabled={loading}>
                        {loading ? "Processing..." : "Generate Analysis"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadSection;
