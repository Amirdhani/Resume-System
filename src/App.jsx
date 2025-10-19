import React, { useState, useEffect } from "react";
import EditorPanel from "./components/EditorPanel";
import ResumePreview from "./components/ResumePreview";
import Toolbar from "./components/Toolbar";
import SaveLoadBar from "./components/SaveLoadBar";
import sampleResume from "./data/sampleResume";

export default function App() {
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("resume_data");
    return saved ? JSON.parse(saved) : sampleResume;
  });

  const [settings, setSettings] = useState({
    fontSize: 14,
    accent: "#2563eb",
    compact: false,
  });

  useEffect(() => {
    localStorage.setItem("resume_data", JSON.stringify(resume));
  }, [resume]);

  function updateBasics(update) {
    setResume((r) => ({ ...r, basics: { ...r.basics, ...update } }));
  }

  function updateSection(id, newSec) {
    setResume((r) => ({
      ...r,
      sections: r.sections.map((s) => (s.id === id ? newSec : s)),
    }));
  }

  function addSection(newSec) {
    setResume((r) => ({ ...r, sections: [...r.sections, newSec] }));
  }

  function removeSection(id) {
    setResume((r) => ({ ...r, sections: r.sections.filter((s) => s.id !== id) }));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Resume Builder</h1>
        <Toolbar settings={settings} setSettings={setSettings} />
      </header>

      <main className="flex flex-1 gap-4 p-4 items-start">
        <aside className="w-1/3 bg-white rounded-xl p-4 shadow-md h-[85vh] overflow-y-auto print:hidden">
          
          <SaveLoadBar resume={resume} setResume={setResume} />
          <EditorPanel
            resume={resume}
            updateBasics={updateBasics}
            updateSection={updateSection}
            addSection={addSection}
            removeSection={removeSection}
          />
        </aside>

        <section className="flex-1 bg-white rounded-xl p-6 shadow-md print:block print:w-full print:shadow-none">
          
          <ResumePreview resume={resume} settings={settings} />
        </section>
      </main>


      <footer className="text-center py-3 text-gray-500 text-sm">
        Trial Task — Frontend UI with React & Tailwind
      </footer>
    </div>
  );
}