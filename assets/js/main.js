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

      const videoCarousel = document.querySelector(".interest-video-carousel");
      const videoTrack = videoCarousel?.querySelector(".interest-video-track");
      const videoSlides = videoTrack?.querySelectorAll(".interest-video");
      const videoCount = videoCarousel?.querySelector(".video-count");
      const videoArrows = videoCarousel?.querySelectorAll(".video-arrow");

      if (videoCarousel && videoTrack && videoSlides && videoCount && videoArrows) {
        const updateVideoCarousel = () => {
          const slideWidth = videoTrack.clientWidth;
          const activeIndex = slideWidth
            ? Math.round(videoTrack.scrollLeft / slideWidth)
            : 0;

          videoCount.textContent =
            `${String(activeIndex + 1).padStart(2, "0")} / ${String(videoSlides.length).padStart(2, "0")}`;
          videoArrows.forEach((button) => {
            const direction = Number(button.dataset.direction);
            button.disabled =
              (direction < 0 && activeIndex === 0) ||
              (direction > 0 && activeIndex >= videoSlides.length - 1);
          });
        };

        videoArrows.forEach((button) => {
          button.addEventListener("click", () => {
            const direction = Number(button.dataset.direction);
            const activeIndex = Math.round(videoTrack.scrollLeft / videoTrack.clientWidth);
            const nextIndex = Math.max(
              0,
              Math.min(videoSlides.length - 1, activeIndex + direction),
            );

            videoTrack.scrollTo({
              left: nextIndex * videoTrack.clientWidth,
              behavior: "smooth",
            });
          });
        });

        videoTrack.addEventListener("scroll", updateVideoCarousel, { passive: true });
        window.addEventListener("resize", updateVideoCarousel);
        updateVideoCarousel();
      }
