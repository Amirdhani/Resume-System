export default function ResumePreview({ resume, settings }) {
  return (
    <div className="max-w-3xl mx-auto" style={{ fontSize: settings.fontSize }}>
      <div className="border-b pb-3 mb-4 text-center">
        <h1 className="text-2xl font-bold" style={{ color: settings.accent }}>
          {resume.basics.name}
        </h1>
        <p className="text-gray-600">{resume.basics.label}</p>
        <p className="text-sm text-gray-500">
          {resume.basics.email} | {resume.basics.phone} | {resume.basics.website}
        </p>
      </div>

      {resume.basics.summary && (
        <section className="mb-4">
          <h2 className="text-sm font-semibold text-bold uppercase">Summary</h2>
          <p>{resume.basics.summary}</p>
        </section>
      )}

      {resume.sections.map((section) => (
        <section key={section.id} className="mb-4">
          <h2 className="text-sm font-semibold text-bold uppercase mb-1">
            {section.title}
          </h2>
          <div>
            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-2">
                {section.items.map((s) => (
                  <span
                    key={s.id}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                  >
                    {s.skill}
                  </span>
                ))}
              </div>
            ) : (
              section.items.map((it) => (
                <div key={it.id} className="mb-2">
                  <h3 className="font-medium text-gray-700">{it.title}</h3>
                  {it.company && <p className="text-xs text-gray-500">{it.company}</p>}
                  <p className="text-sm">{it.summary}</p>
                </div>
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
