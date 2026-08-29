const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('site-nav');
const year = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formSubmit = document.getElementById('formSubmit');
const formStatus = document.getElementById('formStatus');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', function () {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (contactForm && formSubmit && formStatus) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const originalLabel = formSubmit.textContent;
    formSubmit.disabled = true;
    formSubmit.textContent = 'Sending…';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Form submission failed');

      contactForm.reset();
      formStatus.classList.add('is-success');
      formStatus.textContent = 'Thanks — your enquiry has been sent. We’ll be in touch.';
    } catch (error) {
      formStatus.classList.add('is-error');
      formStatus.innerHTML = 'We could not send your enquiry. Please email <a href="mailto:info@iogate.co.uk">info@iogate.co.uk</a> instead.';
    } finally {
      formSubmit.disabled = false;
      formSubmit.textContent = originalLabel;
    }
  });
}
