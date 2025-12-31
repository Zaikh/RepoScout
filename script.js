const languageSelect = document.getElementById("languageSelect");
const topicSelect = document.getElementById("topicSelect");
const fetchBtn = document.getElementById("fetchBtn");
const refreshBtn = document.getElementById("refreshBtn");

const state = document.getElementById("state");
const repoCard = document.getElementById("repoCard");

const repoName = document.getElementById("repoName");
const repoDesc = document.getElementById("repoDesc");
const stars = document.getElementById("stars");
const forks = document.getElementById("forks");
const issues = document.getElementById("issues");
const repoLink = document.getElementById("repoLink");

let currentLanguage = "";
let currentTopic = "";

async function fetchRepository(language, topic) {
  try {
    state.textContent = "Loading repositories...";
    repoCard.classList.add("hidden");

    const query = `language:${language} ${topic}`;

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=50`
    );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      state.textContent = "No repositories found for this topic.";
      return;
    }

    const randomRepo =
      data.items[Math.floor(Math.random() * data.items.length)];

    displayRepo(randomRepo);
    state.textContent = "";

  } catch (error) {
    state.textContent = "Error fetching repositories. Try again later.";
  }
}

function displayRepo(repo) {
  repoName.textContent = repo.name;
  repoDesc.textContent = repo.description || "No description available.";
  stars.textContent = repo.stargazers_count;
  forks.textContent = repo.forks_count;
  issues.textContent = repo.open_issues_count;
  repoLink.href = repo.html_url;

  repoCard.classList.remove("hidden");
}

fetchBtn.addEventListener("click", () => {
  const language = languageSelect.value;
  const topic = topicSelect.value;

  if (!language || !topic) {
    state.textContent = "Please select both language and topic.";
    return;
  }

  currentLanguage = language;
  currentTopic = topic;

  fetchRepository(language, topic);
});

refreshBtn.addEventListener("click", () => {
  if (currentLanguage && currentTopic) {
    fetchRepository(currentLanguage, currentTopic);
  }
});