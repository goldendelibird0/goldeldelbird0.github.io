//Project Modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("projectModal");
  const modalOverlay = modal.querySelector(".modal-overlay");
  const modalClose = modal.querySelector(".modal-close");
  const projectCards = document.querySelectorAll(".project-card");

  // Project data put ur info here
  const projectsData = {
    1: {
      title: "Customer Churn Analysis & Predictive Modeling",
      tags: [
        "Python",
        "Logistic Regression",
        "Churn Modeling",
        "Feature Engineering",
      ],
      description:
        "Analyzed customer transaction and behavior data to identify churn patterns, built usage-based features, and estimated churn risk.",
      features: [
        "Identified churn patterns, usage trends, and activity differences.",
        "Built usage-based features for modeling.",
        "Trained logistic regression to estimate churn risk and likelihood of attrition.",
        "Reviewed model outputs to surface key drop-off factors.",
        "GitHub/demo links and project image needed.",
      ],
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Logistic Regression",
        "Data Visualization",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
    2: {
      title: "AI and Data Science Market Trends Analysis",
      tags: [
        "Data Cleaning",
        "Market Analysis",
        "Data Visualization",
        "Skill Trends",
      ],
      description:
        "Cleaned and analyzed global AI/data science job posting data to identify in-demand skills and hiring trends.",
      features: [
        "Cleaned and analyzed global AI and data science job postings.",
        "Identified in-demand technical skills.",
        "Analyzed skill co-occurrence patterns.",
        "Built visualizations to summarize hiring trends.",
        "GitHub/demo links and project image needed.",
      ],
      technologies: [
        "Python",
        "Pandas",
        "Data Visualization",
        "Statistical Analysis",
        "Market Analysis",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
    3: {
      title: "Match Outcome Analysis & Modeling - VALORANT Champions Tour 2025",
      tags: [
        "Predictive Modeling",
        "Logistic Regression",
        "Feature Engineering",
        "Match Analysis",
      ],
      description:
        "Cleaned professional match data, engineered features, and trained logistic regression models to predict match results and benchmark team performance.",
      features: [
        "Cleaned and analyzed professional match data.",
        "Engineered features for outcome prediction models.",
        "Trained logistic regression models to predict match results.",
        "Benchmarked team performance.",
        "GitHub/demo links and project image needed.",
      ],
      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Logistic Regression",
        "Data Visualization",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
    4: {
      title: "Philippine Farmgate Price Analytics Dashboard",
      tags: [
        "Tableau",
        "Data Cleaning",
        "Data Visualization",
        "Price Trends",
      ],
      description:
        "Built a Tableau dashboard showing farmgate price trends by commodity, region, and month using cleaned government datasets.",
      features: [
        "Built a Tableau dashboard for farmgate price trends.",
        "Cleaned and merged government price datasets.",
        "Created summary tables for visualization.",
        "Reported trends by commodity, region, and month.",
        "GitHub/demo links and project image needed.",
      ],
      technologies: [
        "Tableau",
        "Excel",
        "Data Visualization",
        "Data Cleaning",
        "Statistical Analysis",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
    5: {
      title: "Project info needed",
      tags: [
        "Info needed",
        "Write about project",
        "Tools needed",
        "Dates needed",
      ],
      description:
        "Write about another project here (title, dates, summary, tools) - project info needed.",
      features: [
        "Project title needed.",
        "Project dates needed.",
        "Project summary needed.",
        "Tools/technologies needed.",
        "Results/impact needed.",
        "GitHub link needed.",
        "Demo link needed.",
        "Project image needed.",
      ],
      technologies: [
        "Tools needed",
        "Tech stack needed",
        "Dataset info needed",
      ],
      github: "#",
      demo: "#",
      image: "",
    },
  };

  projectCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function (e) {
      const projectId = this.getAttribute("data-project");
      const project = projectsData[projectId];

      if (project) {
        showProjectDetails(project);
      }
    });
  });

  modalOverlay.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  function showProjectDetails(project) {
    modal.querySelector(".modal-title").textContent = project.title;
    modal.querySelector(".modal-description").textContent = project.description;

    const modalImage = modal.querySelector(".modal-image img");
    modalImage.src = project.image;
    modalImage.alt = project.title;

    const tagsContainer = modal.querySelector(".modal-tags");
    tagsContainer.innerHTML = "";
    project.tags.forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.className = "tag";
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });

    const featuresContainer = modal.querySelector(".modal-features");
    featuresContainer.innerHTML = "";
    project.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresContainer.appendChild(li);
    });

    const techContainer = modal.querySelector(".modal-tech");
    techContainer.innerHTML = "";
    project.technologies.forEach((tech) => {
      const span = document.createElement("span");
      span.className = "tech-badge";
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    const githubLink = modal.querySelector(".btn-github");
    const demoLink = modal.querySelector(".btn-demo");

    githubLink.href = project.github || "#";
    demoLink.href = project.demo || "#";

    openModal();
  }

  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});
