/**
* Template Name: iPortfolio - v3.7.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
* Modified by: Jeff Lam (Refactored to Pure HTML/CSS)
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
    this.querySelector('i').classList.toggle('bi-list')
    this.querySelector('i').classList.toggle('bi-x')
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
        navbarToggle.querySelector('i').classList.toggle('bi-list')
        navbarToggle.querySelector('i').classList.toggle('bi-x')
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
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
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

  // Show More Projects
  const loadMoreBtn = document.getElementById('load-more-projects');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      const hiddenProjects = document.querySelectorAll('.more-project-item');
      hiddenProjects.forEach((project, index) => {
        project.classList.remove('d-none');
        // Add funny animation class
        project.classList.add('funny-animate');
        // Stagger the animation
        project.style.animationDelay = (index * 0.15) + 's';
      });
      this.style.display = 'none';
      if (typeof AOS !== 'undefined') {
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      }
    });
  }

})()

document.addEventListener('DOMContentLoaded', function () {
  // URL for the Blogger RSS feed passed through the rss2json API
  const blogRSS = 'https://blog.itdogtics.com/feeds/posts/default?alt=rss';
  const apiURL = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(blogRSS);

  const blogPreviews = document.getElementById('blog-previews');
  if (!blogPreviews) return;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      let output = '<h3 class="mb-3 text-center">Latest Blogs</h3>';
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
            <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${100 * (posts.indexOf(item) + 1)}">
              <div class="blog-card">
                <a href="${item.link}" target="_blank">
                  <img src="${imageUrl}" class="card-img-top" alt="${item.title}">
                </a>
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description ? item.description.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : ''}</p>
                </div>
                <div class="card-footer">
                  <a href="${item.link}" target="_blank" class="btn btn-primary">Read More</a>
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
          <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${100 * (i + 1)}">
            <div class="blog-card">
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
      blogPreviews.innerHTML = output;
    })
    .catch(error => {
      console.error('Error fetching RSS feed:', error);
      blogPreviews.innerHTML = '<p class="text-center">Error loading feed.</p>';

    });
});

/**
 * Theme Toggle Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const icon = themeToggleBtn.querySelector('i');
  const html = document.documentElement;

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.setAttribute('data-theme', 'dark');
    icon.classList.remove('bi-moon');
    icon.classList.add('bi-sun');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      icon.classList.remove('bi-sun');
      icon.classList.add('bi-moon');
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-sun');
    }
  });
});