import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SectionEditor({ section, updateSection, removeSection }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const addItem = () => {
    const newItem =
      section.type === "skills"
        ? { id: uuidv4(), skill: "" }
        : { id: uuidv4(), title: "", summary: "" };
    updateSection({ ...section, items: [...section.items, newItem] });
  };

  const updateItem = (id, patch) => {
    updateSection({
      ...section,
      items: section.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    });
  };

  const deleteItem = (id) => {
    updateSection({
      ...section,
      items: section.items.filter((i) => i.id !== id),
    });
  };

  // ✅ Editable section title
  const handleTitleChange = (e) => {
    updateSection({ ...section, title: e.target.value });
  };

  return (
    <div className="border rounded-lg p-3 mb-3 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <div className="flex-1">
          {isEditingTitle ? (
            <input
              type="text"
              value={section.title}
              onChange={handleTitleChange}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
              className="w-full text-gray-800 font-semibold border-b border-gray-300 bg-transparent focus:outline-none"
            />
          ) : (
            <h3
              className="font-semibold text-gray-700 cursor-pointer"
              onClick={() => setIsEditingTitle(true)}
              title="Click to edit section name"
            >
              {section.title}
            </h3>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={addItem}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add
          </button>
          <button
            onClick={removeSection}
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Section Items */}
      {section.items.length === 0 && (
        <p className="text-gray-400 text-sm italic">No items yet</p>
      )}

      {section.items.map((item) => (
        <div
          key={item.id}
          className="border rounded p-2 mb-2 bg-white shadow-sm"
        >
          {section.type === "skills" ? (
            <input
              className="w-full border border-gray-300 rounded p-1 text-sm"
              value={item.skill}
              onChange={(e) => updateItem(item.id, { skill: e.target.value })}
              placeholder="Skill name"
            />
          ) : (
            <>
              <input
                className="w-full border border-gray-300 rounded p-1 text-sm mb-1"
                value={item.title}
                onChange={(e) => updateItem(item.id, { title: e.target.value })}
                placeholder="Title / Role"
              />
              <textarea
                className="w-full border border-gray-300 rounded p-1 text-sm"
                value={item.summary}
                onChange={(e) => updateItem(item.id, { summary: e.target.value })}
                placeholder="Summary"
              />
            </>
          )}

          <button
            onClick={() => deleteItem(item.id)}
            className="text-xs text-red-500 mt-1 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
