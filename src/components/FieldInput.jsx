export default function FieldInput({ label, value, onChange, multiline }) {
  return (
    <div className="mb-2">
      <label className="text-xs text-gray-600">{label}</label>
      {multiline ? (
        <textarea
          className="w-full border border-gray-300 rounded p-1 mt-1 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full border border-gray-300 rounded p-1 mt-1 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
