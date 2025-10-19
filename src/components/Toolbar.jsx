import { FiPrinter } from "react-icons/fi";

export default function Toolbar({ settings, setSettings }) {
  return (
    <div className="flex gap-4 items-center">
      <input
        type="color"
        value={settings.accent}
        onChange={(e) => setSettings((s) => ({ ...s, accent: e.target.value }))}
        className="w-10 h-8 border rounded"
      />

      <input
        type="range"
        min={12}
        max={20}
        value={settings.fontSize}
        onChange={(e) => setSettings((s) => ({ ...s, fontSize: +e.target.value }))}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={settings.compact}
          onChange={(e) => setSettings((s) => ({ ...s, compact: e.target.checked }))}
        />
        Compact
      </label>

      <button
        onClick={() => window.print()}
        className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition"
      >
        <FiPrinter /> Print / PDF
      </button>
    </div>
  );
}