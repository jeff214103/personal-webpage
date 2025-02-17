/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  // Social Link Interaction
  document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.classList.add('hover');
    });
    link.addEventListener('mouseleave', function () {
      this.classList.remove('hover');
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Lazy Loading Images
    var lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));

    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;

            // Set src from data-src
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;

              // Remove data-src to prevent reloading
              lazyImage.removeAttribute('data-src');
            }

            // Add loaded class for fade-in effect
            lazyImage.classList.add('loaded');

            // Stop observing this image
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      }, {
        rootMargin: "50px" // Start loading slightly before image enters viewport
      });

      // Observe each lazy image
      lazyImages.forEach(function (lazyImage) {
        // Ensure initial state
        lazyImage.classList.remove('loaded');
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      let active = false;

      const lazyLoad = function () {
        if (active === false) {
          active = true;

          setTimeout(function () {
            lazyImages.forEach(function (lazyImage) {
              if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.add('loaded');
                lazyImage.removeAttribute('data-src');

                lazyImages = lazyImages.filter(function (image) {
                  return image !== lazyImage;
                });

                if (lazyImages.length === 0) {
                  document.removeEventListener("scroll", lazyLoad);
                  window.removeEventListener("resize", lazyLoad);
                  window.removeEventListener("orientationchange", lazyLoad);
                }
              }
            });

            active = false;
          }, 200);
        }
      };

      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
    }

    // Scroll-triggered animations
    const scrollAnimations = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    scrollAnimations.forEach(element => {
      observer.observe(element);
    });
  });
})()

document.addEventListener('DOMContentLoaded', function() {
  // URL for the Blogger RSS feed passed through the rss2json API
  const blogRSS = 'https://blog.itdogtics.com/feeds/posts/default?alt=rss';
  const apiURL = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(blogRSS);

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      let output = '<h3 class="mb-3">Latest Blogs</h3>';
      output += '<div class="row">';

      const numPostsToShow = 3;
      let posts = [];

      if (data && data.items && data.items.length > 0) {
        posts = data.items.slice(0, numPostsToShow);
        // Loop through available posts and create a card for each
        posts.forEach(item => {
          // Instead of fetching the thumbnail, extract the first image from the content.
          let imageUrl;
          if (item.content) {
            // Create a temporary element to parse the HTML content.
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.content;
            let imgTag = tempDiv.querySelector('img');
            if (imgTag && imgTag.src) {
              imageUrl = imgTag.src;
            } else {
              imageUrl = 'assets/img/blogger_preview.jpg';
            }
          } else {
            imageUrl = 'assets/img/blogger_preview.jpg';
          }
          
          output += `
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <a href="${item.link}" target="_blank">
                  <img src="${imageUrl}" class="card-img-top" alt="${item.title}">
                </a>
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description ? item.description.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : ''}</p>
                </div>
                <div class="card-footer text-center">
                  <a href="${item.link}" target="_blank" class="btn btn-custom-green">Read More</a>
                </div>
              </div>
            </div>
          `;
        });
      }

      // If there are fewer than 3 posts, add Coming Soon cards for the remaining columns
      const displayedCount = posts.length;
      for (let i = displayedCount; i < numPostsToShow; i++) {
        output += `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="assets/img/blogger_preview.jpg" class="card-img-top" alt="Coming Soon">
              <div class="card-body">
                <h5 class="card-title">Coming Soon</h5>
                <p class="card-text">More posts are on the way. Stay tuned!</p>
              </div>
            </div>
          </div>
        `;
      }

      output += '</div>';
      document.getElementById('blog-previews').innerHTML = output;
    })
    .catch(error => {
      console.error('Error fetching RSS feed:', error);
      document.getElementById('blog-previews').innerHTML = '<p>Error loading feed.</p>';
    });
});