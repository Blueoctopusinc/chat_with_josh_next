interface Technology {
  id: number;
  readable_name: string;
  category: string;
}

// Utility function to group technologies by category
const groupTechnologiesByCategory = (
  technologies: Technology[],
): Record<string, Technology[]> => {
  return technologies.reduce((acc, tech) => {
    if (tech.category === "Languages") {
      return acc;
    }
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {});
};

// Utility function to order grouped technologies
const orderGroupedTechnologies = (
  groupedTechs: Record<string, Technology[]>,
): Record<string, Technology[]> => {
  const ordered = {};
  Object.keys(groupedTechs)
    .filter((key) => key !== "Miscellaneous")
    .forEach((key) => {
      ordered[key] = groupedTechs[key];
    });
  if ("Miscellaneous" in groupedTechs) {
    ordered["Miscellaneous"] = groupedTechs["Miscellaneous"];
  }
  return ordered;
};

// Utility function to process technologies
export const processTechnologies = (
  technologies: Technology[],
): Record<string, Technology[]> => {
  const grouped = groupTechnologiesByCategory(technologies);

  // Sort technologies alphabetically within each category
  for (const category in grouped) {
    grouped[category].sort((a, b) =>
      a.readable_name.localeCompare(b.readable_name),
    );
  }

  const ordered = orderGroupedTechnologies(grouped);
  return ordered;
};
export default Technology;
