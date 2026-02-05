//Project Modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("projectModal");
  const modalOverlay = modal.querySelector(".modal-overlay");
  const modalClose = modal.querySelector(".modal-close");
  const projectCards = document.querySelectorAll(".project-card");

  // Project data put ur info here
  const projectsData = {
    1: {
      title: "PlaceHolder",
      tags: ["PlaceHolder", "PlaceHolder", "PlaceHolder", "PlaceHolder"],
      description:
        "PlaceHolder",
      features: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      technologies: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      github: "https://github.com/goldendelibird0/project1",
      demo: "https://demo-project1.com",
      image:
        "PlaceHolder",
    },
    2: {
      title: "PlaceHolder",
      tags: ["PlaceHolder", "PlaceHolder", "PlaceHolder", "PlaceHolder"],
      description:
        "PlaceHolder",
      features: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      technologies: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      github: "https://github.com/goldendelibird0/project1",
      demo: "https://demo-project1.com",
      image:
        "PlaceHolder",
    },
    3: {
      title: "PlaceHolder",
      tags: ["PlaceHolder", "PlaceHolder", "PlaceHolder", "PlaceHolder"],
      description:
        "PlaceHolder",
      features: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      technologies: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      github: "https://github.com/goldendelibird0/project1",
      demo: "https://demo-project1.com",
      image:
        "PlaceHolder",
    },
    4: {
      title: "PlaceHolder",
      tags: ["PlaceHolder", "PlaceHolder", "PlaceHolder", "PlaceHolder"],
      description:
        "PlaceHolder",
      features: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      technologies: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      github: "https://github.com/goldendelibird0/project1",
      demo: "https://demo-project1.com",
      image:
        "PlaceHolder",
    },
    5: {
      title: "PlaceHolder",
      tags: ["PlaceHolder", "PlaceHolder", "PlaceHolder", "PlaceHolder"],
      description:
        "PlaceHolder",
      features: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      technologies: [
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
        "PlaceHolder",
      ],
      github: "https://github.com/goldendelibird0/project1",
      demo: "https://demo-project1.com",
      image:
        "PlaceHolder",
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
