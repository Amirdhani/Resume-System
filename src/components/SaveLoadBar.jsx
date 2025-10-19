import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

export default function SaveLoadBar({ resume, setResume }) {
  /* ---------- helpers ---------- */
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.json";
    link.click();
  };

  const clearAll = () => {
    if (window.confirm("Clear all resume data?")) {
      setResume({
        basics: { name: "", label: "", email: "", phone: "", website: "", summary: "" },
        sections: [],
      });
      localStorage.removeItem("resume_data");
    }
  };

  /* ---------- simple text → resume parser ---------- */
  const parseTextToResume = (text) => {
    const lines = text.split(/\n|,|;/).map((l) => l.trim()).filter(Boolean);
    const result = {
      basics: { ...resume.basics },
      sections: [],
    };

    // crude patterns
    const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = text.match(/(\+?\d[\d\s\-]{6,}\d)/);
    const websiteMatch = text.match(/https?:\/\/[^\s)]+/);
    const nameLine = lines.find((l) => /^[A-Z][a-z]+(\s[A-Z][a-z]+){0,2}$/.test(l));
    if (nameLine) result.basics.name = nameLine;
    if (emailMatch) result.basics.email = emailMatch[0];
    if (phoneMatch) result.basics.phone = phoneMatch[0];
    if (websiteMatch) result.basics.website = websiteMatch[0];

    // find title keywords
    const titleLine = lines.find((l) =>
      /(developer|engineer|designer|manager|student|intern)/i.test(l)
    );
    if (titleLine) result.basics.label = titleLine;

    // basic section extraction
    const lower = text.toLowerCase();
    const getBetween = (start, end) => {
      const s = lower.indexOf(start);
      if (s === -1) return "";
      const e = end ? lower.indexOf(end, s + start.length) : -1;
      return text
        .substring(
          s + start.length,
          e > s ? e : text.length
        )
        .trim();
    };

    const summaryText = getBetween("summary", "work experience") ||
      getBetween("profile", "experience");
    if (summaryText)
      result.basics.summary = summaryText.replace(/\n+/g, " ").slice(0, 1500);

    const workText = getBetween("work experience", "project") ||
      getBetween("experience", "project");
    if (workText)
      result.sections.push({
        id: crypto.randomUUID(),
        type: "work",
        title: "Work Experience",
        items: [{ id: crypto.randomUUID(), title: "", summary: workText.trim().slice(0, 1500) }],
      });

    const projText = getBetween("project", "education") || getBetween("project", "skill");
    if (projText)
      result.sections.push({
        id: crypto.randomUUID(),
        type: "projects",
        title: "Projects",
        items: [{ id: crypto.randomUUID(), title: "", summary: projText.trim().slice(0, 1500) }],
      });

    const skillMatch = text.match(/skills?:?\s*([\w\s,]+)/i);
    if (skillMatch)
      result.sections.push({
        id: crypto.randomUUID(),
        type: "skills",
        title: "Skills",
        items: skillMatch[1]
          .split(/,|\s{2,}/)
          .filter((s) => s.trim())
          .map((s) => ({ id: crypto.randomUUID(), skill: s.trim() })),
      });

    return result;
  };

  /* ---------- file import ---------- */
  const importFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();

    try {
      if (ext === "json") {
        const text = await file.text();
        const parsed = JSON.parse(text);
        setResume(parsed);
        alert("✅ JSON imported!");
      } else if (ext === "pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((it) => it.str).join(" ") + "\n";
        }
        setResume(parseTextToResume(text));
        alert("✅ PDF parsed and fields auto-filled!");
      } else if (ext === "docx") {
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.convertToHtml({ arrayBuffer });
        const plain = value.replace(/<[^>]+>/g, " ");
        setResume(parseTextToResume(plain));
        alert("✅ Word parsed and fields auto-filled!");
      } else {
        alert("⚠️ Please upload .json, .pdf or .docx only.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to import this file.");
    }

    e.target.value = "";
  };

  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={exportJSON}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
      >
        Export JSON
      </button>

      <label className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer text-sm">
        Import (.json / .pdf / .docx)
        <input
          type="file"
          accept=".json,.pdf,.docx"
          onChange={importFile}
          className="hidden"
        />
      </label>

      <button
        onClick={clearAll}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        Clear
      </button>
    </div>
  );
}
