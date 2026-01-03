import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import NotesDisplay from "./components/NotesDisplay";
import Loader from "./components/Loader";
import History from "./components/History";
import useNotes from "./hooks/useNotes";

function App() {
  const {
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
  } = useNotes();

  return (
    <div className="layout-container">
      <motion.aside
        className="sidebar"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />

        <div className="sidebar-scroll">
          <UploadSection
            onFileChange={setFile}
            onUpload={handleGenerateNotes}
            file={file}
            loading={loading}
          />

          <History
            history={history}
            onSelect={setNotes}
            onDelete={deleteHistoryItem}
          />
        </div>
      </motion.aside>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loader"
              className="center-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              className="error-container"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </motion.div>
          )}

          {notes && !loading ? (
            <motion.div
              key="notes"
              className="notes-wrapper"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <NotesDisplay notes={notes} onClear={clearNotes} />
            </motion.div>
          ) : !loading && !error && (
            <div className="empty-state">
              <div className="empty-icon">📂</div>
              <h3>Ready to Generate</h3>
              <p>Upload a PDF in the sidebar to get started.</p>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
