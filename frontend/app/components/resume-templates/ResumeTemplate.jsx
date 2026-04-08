export default function ResumeTemplate({ data }) {
    if (!data) return null;

    const skillCategories = data?.skills || {};

    return (
        <div
            id="resume"
            className="p-10 bg-white text-black max-w-3xl mx-auto shadow-lg rounded-lg"
        >
            {/* HEADER */}
            <div className="text-center border-b pb-4">
                <h1 className="text-3xl font-bold">{data.name}</h1>
                <p className="mt-2 text-gray-700 text-start text-sm">{data.summary}</p>
            </div>

            {/* SKILLS */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b pb-1">Skills</h2>

                <div className="mt-3 flex flex-col gap-4">
                    {Object.entries(skillCategories).map(([category, skills]) =>
                        skills?.length > 0 ? (
                            <div key={category} className="flex gap-2 items-center">
                                <p className="font-bold capitalize">{category} : </p>
                                <ul className="list-none text-sm text-gray-700 flex gap-2">
                                    {skills.map((skill, i) => (
                                        <li key={i}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null
                    )}
                </div>
            </div>

            {/* EXPERIENCE */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b pb-1">Experience</h2>

                {data.experience?.map((exp, i) => (
                    <div key={i} className="mt-3">
                        <div className="flex justify-between">
                            <p className="font-medium">
                                {exp.role} @ {exp.company}
                            </p>
                            <p className="text-sm text-gray-600">{exp.duration}</p>
                        </div>

                        <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                            {exp.points?.map((p, j) => (
                                <li key={j}>{p}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* PROJECTS */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b pb-1">Projects</h2>

                {data.projects?.map((proj, i) => (
                    <div key={i} className="mt-3">
                        <p className="font-medium">{proj.name}</p>

                        {/* Tech Stack */}
                        {proj.tech_stack?.length > 0 && (
                            <p className="text-sm text-gray-600">
                                Tech: {proj.tech_stack.join(", ")}
                            </p>
                        )}

                        <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                            {proj.points?.map((p, j) => (
                                <li key={j}>{p}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* EDUCATION */}
            {data.education?.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold border-b pb-1">Education</h2>

                    {data.education?.map((edu, i) => (
                        <div key={i} className="mt-2 flex justify-between">
                            <p>
                                {edu.degree} - {edu.institution}
                            </p>
                            <p className="text-sm text-gray-600">{edu.year}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}   