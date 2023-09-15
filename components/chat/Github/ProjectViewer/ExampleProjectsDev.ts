import GitHubProject from "@/types/portfolio/GithubProject";

const exampleProjects = [
  {
    id: 1,
    name: "ChatGPT-Labeller",
    github_link: "https://github.com/Blueoctopusinc/Lazy-labeler/",
    readme:
      "\n" +
      "---\n" +
      "\n" +
      "# UFO Shape Classification Program\n" +
      "\n" +
      "## Purpose\n" +
      'This program is designed to classify UFO sighting descriptions into refined shape categories. By taking a CSV file containing descriptions of UFO sightings, it categorizes them into predefined shape classes like "Saucer or Disk," "Triangle," "Cylinder/Cigar," etc. The classification leverages OpenAI\'s GPT-4 model with detailed classification instructions.\n' +
      "More of a proof of concept for using GPT-4 to classify UFO sightings and has surprisingly good results. Also includes a CLI program to quickly validate the results manually. Data used is included in /data folder. \n" +
      "It labelled 894 samples in a couple of minutes and cost just under 4 dollars in API credits. \n" +
      "\n" +
      "## Installation and Setup\n" +
      "\n" +
      "### Requirements\n" +
      "- Python 3.11\n" +
      "- Required libraries: pydantic, openai, pandas, tiktoken, python-dotenv, logging\n" +
      "\n" +
      "### Installation Steps\n" +
      "\n" +
      "1. **Install pyenv:**\n" +
      "   If you don't have `pyenv` installed, follow the instructions for your platform [here](https://github.com/pyenv/pyenv#installation).\n" +
      "\n" +
      "2. **Install Python 3.11 Using pyenv:**\n" +
      "   Once `pyenv` is installed, you can install Python 3.11 with the following command:\n" +
      "\n" +
      "   ```bash\n" +
      "   pyenv install 3.11.0\n" +
      "   ```\n" +
      "\n" +
      "3. **Create a Virtual Environment (Optional but Recommended):** \n" +
      "   Using a virtual environment helps in isolating the dependencies for this project from your global Python environment.\n" +
      "\n" +
      "   ```bash\n" +
      "   pyenv virtualenv 3.11.0 my_project_env\n" +
      "   pyenv local my_project_env\n" +
      "   ```\n" +
      "\n" +
      "4. **Clone the Repository (if applicable):**\n" +
      "   If this code is hosted in a repository, clone it to your local machine.\n" +
      "\n" +
      "   ```bash\n" +
      "   git clone <repository_url>\n" +
      "   cd <repository_directory>\n" +
      "   ```\n" +
      "\n" +
      "5. **Install the Required Libraries:**\n" +
      "   The required libraries can be installed using the following command.\n" +
      "\n" +
      "   ```bash\n" +
      "   pip install pydantic openai pandas tiktoken python-dotenv\n" +
      "   ```\n" +
      "\n" +
      "6. **Set Up Environment Variables:**\n" +
      "   You'll need to set up environment variables for your OpenAI API key and organization. Create a `.env` file in the project directory with the following content:\n" +
      "\n" +
      "   ```env\n" +
      "   OPENAI_API_KEY=your_openai_api_key\n" +
      "   OPENAI_ORGANIZATION=your_openai_organization\n" +
      "   ```\n" +
      "\n" +
      "   Make sure to replace the placeholders with your actual values.\n" +
      "\n" +
      "7. **Data Preparation:**\n" +
      "   Place your cleaned and exported sightings CSV file in the `data/` directory.\n" +
      "\n" +
      "8. **Run the Program:**\n" +
      "   You can run the program by executing the main script.\n" +
      "\n" +
      "   ```bash\n" +
      "   python main.py\n" +
      "   ```\n" +
      "\n" +
      "## How It Works\n" +
      "\n" +
      "1. **Preprocessing:** The program reads the UFO sighting descriptions, preprocesses the data, and prepares it for classification.\n" +
      "2. **Tokenizing & Batching:** Descriptions are tokenized and batched to ensure they fit within the token limits for the OpenAI model.\n" +
      "3. **API Calls & Classification:** OpenAI's GPT-4 model is called to classify each description into one of the predefined shape categories.\n" +
      "4. **Retry Mechanism:** If a batch results in empty labels, the program can retry the request a specified number of times.\n" +
      "5. **Logging:** The program includes detailed logging to both a file and the console, making it easier to track the flow and diagnose any issues.\n" +
      "6. **Output:** The classified labels along with the descriptions are saved in a JSON file.\n" +
      "\n" +
      "\n" +
      "---\n" +
      "\n" +
      "## UFO Sightings Label Verification CLI\n" +
      "\n" +
      "### Overview\n" +
      "\n" +
      "The UFO Sightings Label Verification program is a command-line interface tool designed to allow users to interactively verify and modify the shape categories assigned to UFO sighting descriptions. The program presents the descriptions and existing labels, and the user has the ability to view, modify, and confirm the labels.\n" +
      "\n" +
      "### Running the CLI\n" +
      "\n" +
      "#### Requirements\n" +
      "- Python 3.11\n" +
      "- Curses library (should be included with Python)\n" +
      "\n" +
      "#### Usage\n" +
      "\n" +
      "1. **Navigate to the Project Directory:**\n" +
      "   Open a terminal and navigate to the directory containing the CLI script.\n" +
      "\n" +
      "2. **Run the CLI Program:**\n" +
      "   Execute the following command, replacing `<file_path>` with the path to the JSON file containing the UFO sighting descriptions and labels.\n" +
      "\n" +
      "   ```bash\n" +
      "   python cli_program.py <file_path>\n" +
      "   ```\n" +
      "\n" +
      "### Interface\n" +
      "\n" +
      "The CLI presents the following information for each UFO sighting:\n" +
      "\n" +
      "- **Description:** The description of the UFO sighting.\n" +
      "- **Existing Labels:** The current shape categories assigned to the description.\n" +
      "- **All Categories:** A list of all possible shape categories.\n" +
      "\n" +
      "### Interaction\n" +
      "\n" +
      "- **Scrolling:** Use the UP and DOWN arrow keys to scroll through the description if it is too long to fit on the screen.\n" +
      "- **Modifying Labels:** At the prompt \"Choose categories (e.g., '1 2 3'):\", enter the numbers corresponding to the categories you want to add or remove. If a category is already assigned, it will be removed; if not, it will be added.\n" +
      "- **Confirming Changes:** Press the Enter key to confirm the changes and move to the next description.\n" +
      "\n" +
      "### Saving\n" +
      "\n" +
      "The program saves changes continuously to the JSON file specified in the command line argument.\n" +
      "\n",
    summary: `the UFO Shape Classification Program is a proof of concept project that uses OpenAI\\'s GPT - 4model toclassify descriptions
    of UFO
    sightings into
    shape categories
    such as
    "Saucer or Disk," "Triangle,"
    and "Cylinder/Cigar."
    The program
    takes a
    CSV file
    containing the
    descriptions and
    categorizes them
    using the
    model
    . It
    also includes
    a command - line
    interface tool
    for manual
    verification and
    modification of
    the assigned
    labels
    . The
    project uses
    Python 3.11
    and libraries
    such as
    pydantic,
    openai,
    pandas,
    tiktoken,
    and python - dotenv.The
    installation steps
    involve setting
    up the
    required dependencies,
    creating a
    virtual environment,
    and configuring
    environment variables
    for the
    OpenAI API
    key and
    organization
    . The
    program preprocesses
    the data,
    tokenizes and
    batches the
    descriptions,
    calls the
    GPT-4
    model
    for classification,
    and includes
    logging
    for tracking
    and troubleshooting.The
    classified labels
    along
    with the
    descriptions are
    saved
    in a
    JSON file.`,
    file_structure: {
      src: {
        "main.ts": null,
        utils: {
          "helper.ts": null,
          utils: {
            "helper.ts": null,

            app: {
              "routes.py": null,
              templates: {
                "index.html": null,
              },
            },
            "requirements.txt": null,
          },
        },
      },
      "README.md": null,
      "package.json": null,
    },
    languages: {
      TypeScript: 31050,
      SCSS: 7984,
      Python: 7731,
      JavaScript: 129,
    },
    technologies: [
      { id: 1, readable_name: "Python", category: "Languages" },
      {
        id: 2,
        readable_name: "OpenAI's GPT-4",
        category: "Large Language Models",
      },
      { id: 3, readable_name: "pydantic", category: "Miscellaneous" },
      { id: 4, readable_name: "openai", category: "Miscellaneous" },
      { id: 5, readable_name: "pandas", category: "Data Science Tools" },
      { id: 6, readable_name: "tiktoken", category: "Miscellaneous" },
      { id: 7, readable_name: "python-dotenv", category: "Miscellaneous" },
      { id: 8, readable_name: "logging", category: "Miscellaneous" },
      { id: 9, readable_name: "Curses", category: "Miscellaneous" },
    ],
  },
  {
    id: 2,
    name: "E-commerceApp",
    github_link: "https://github.com/YourOrg/E-commerceApp",
    readme: "An e-commerce app built with React and Django.",
    summary: "This project aims to create an e-commerce platform.",
    file_structure: {
      frontend: {
        "App.tsx": null,
        "index.tsx": null,
      },
      backend: {
        "settings.py": null,
        "urls.py": null,
      },
    },
    technologies: [
      { id: 3, readable_name: "React", category: "UI Frameworks" },
      { id: 4, readable_name: "Django", category: "Web Frameworks" },
    ],
    languages: {
      TypeScript: 31050,
      SCSS: 7984,
      Python: 7731,
      JavaScript: 129,
    },
  },

  {
    id: 3,
    name: "WeatherApp",
    github_link: "https://github.com/YourOrg/WeatherApp",
    readme: "A weather app using Flutter and a weather API.",
    summary: "A mobile application to fetch and display weather information.",
    file_structure: {
      lib: {
        "main.dart": null,
        utils: {
          "helper.dart": null,
        },
      },
      "pubspec.yaml": null,
    },
    technologies: [
      { id: 5, readable_name: "Flutter", category: "UI Frameworks" },
      { id: 6, readable_name: "Dart", category: "Languages" },
    ],
  },
  {
    id: 4,
    name: "BlockchainExplorer",
    github_link: "https://github.com/YourOrg/BlockchainExplorer",
    readme: "A blockchain explorer built using Python and Flask.",
    summary: "This project aims to explore blockchain transactions.",
    file_structure: {
      app: {
        "routes.py": null,
        templates: {
          "index.html": null,
        },
      },
      "requirements.txt": null,
    },
    technologies: [
      { id: 7, readable_name: "Python", category: "Languages" },
      { id: 8, readable_name: "Flask", category: "Web Frameworks" },
    ],
    languages: {
      TypeScript: 31050,
      SCSS: 7984,
      Python: 7731,
      JavaScript: 129,
    },
  },
];

export default exampleProjects;
