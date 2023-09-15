import Technology, { processTechnologies } from "@/types/portfolio/Technology";

const categoryColors = {
  Languages: "bg-red-700",
  "UI Frameworks": "bg-green-700",
  "Web Frameworks": "bg-blue-700",
  Databases: "bg-yellow-700",
  Containerization: "bg-orange-700",
  "Cloud Providers": "bg-purple-700",
  Frontend: "bg-pink-700",
  "State Management": "bg-indigo-700",
  "Build Tools": "bg-lime-700",
  Testing: "bg-emerald-700",
  "CI/CD": "bg-teal-700",
  "Version Control": "bg-cyan-700",
  "Machine Learning Frameworks": "bg-rose-700",
  "Data Science Tools": "bg-fuchsia-700",
  "Large Language Models": "bg-violet-700",
  Miscellaneous: "bg-sky-700",
};

const TechnologyList: React.FC<{ technologies: Technology[] }> = ({
  technologies,
}) => {
  const processedTechnologies = processTechnologies(technologies);

  return (
    <>
      {processedTechnologies &&
        Object.keys(processedTechnologies).map((category) => (
          <div key={category}>
            <h2 className="mb-2 text-lg font-semibold">{category}</h2>
            <div className="grid gap-2 md:grid-cols-8">
              {processedTechnologies[category].map((tech) => (
                <div
                  className={`flex h-full rounded-md drop-shadow-lg ${
                    categoryColors[category] || "bg-gray-700"
                  }`}
                  key={tech.id}
                >
                  <span className="w-content mx-auto my-auto h-fit p-2 text-center text-sm text-white">
                    {tech?.readable_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default TechnologyList;
