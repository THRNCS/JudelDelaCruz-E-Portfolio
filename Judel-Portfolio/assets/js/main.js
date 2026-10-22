      document.getElementById("year").textContent = new Date().getFullYear();

      const certificateFilters = document.querySelectorAll(".cert-filter");
      const certificates = document.querySelectorAll(".cert-card");

      certificateFilters.forEach((button) => {
        button.addEventListener("click", () => {
          const selectedCategory = button.dataset.filter;

          certificateFilters.forEach((filter) => {
            filter.setAttribute("aria-pressed", String(filter === button));
          });

          certificates.forEach((certificate) => {
            certificate.hidden =
              selectedCategory !== "all" &&
              certificate.dataset.category !== selectedCategory;
          });
        });
      });
