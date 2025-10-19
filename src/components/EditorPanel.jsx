import FieldInput from "./FieldInput";
import SectionEditor from "./SectionEditor";
import { v4 as uuidv4 } from "uuid";

export default function EditorPanel({ resume, updateBasics, updateSection, addSection, removeSection }) {
  const addNewSection = (type) => {
    addSection({ id: uuidv4(), type, title: "New Section", items: [] });
  };

  return (
    <div>
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">Basic Info</h3>
        <FieldInput label="Name" value={resume.basics.name} onChange={(v) => updateBasics({ name: v })} />
        <FieldInput label="Title" value={resume.basics.label} onChange={(v) => updateBasics({ label: v })} />
        <FieldInput label="Email" value={resume.basics.email} onChange={(v) => updateBasics({ email: v })} />
        <FieldInput label="Phone" value={resume.basics.phone} onChange={(v) => updateBasics({ phone: v })} />
        <FieldInput label="Website" value={resume.basics.website} onChange={(v) => updateBasics({ website: v })} />
        <FieldInput label="Summary" multiline value={resume.basics.summary} onChange={(v) => updateBasics({ summary: v })} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => addNewSection("work")} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm">+ Work</button>
        <button onClick={() => addNewSection("projects")} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ Project</button>
        <button onClick={() => addNewSection("skills")} className="px-3 py-1 bg-indigo-500 text-white rounded text-sm">+ Skill</button>
      </div>

      {resume.sections.map((s) => (
        <SectionEditor
          key={s.id}
          section={s}
          updateSection={(ns) => updateSection(s.id, ns)}
          removeSection={() => removeSection(s.id)}
        />
      ))}
    </div>
  );
}
