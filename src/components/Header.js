import React from "react";
import { FileText } from "lucide-react";

const Header = () => {
    return (
        <header className="app-header">
            <h1>
                <FileText size={18} color="var(--primary)" />
                Docura AI
                <span className="badge">ENTERPRISE</span>
            </h1>
            <p>Intelligent document analysis.</p>
        </header>
    );
};

export default Header;
