document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://youtube.com/@psixolog-surayyoaziz?si=SO_TJcaPo70im6zX';

  // Prefer existing footer, then fall back to common footer containers, then create one
  const footerSel = 'footer, .site-footer, .footer, [role="contentinfo"], #footer';
  let footer = document.querySelector(footerSel);
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'site-footer';
    // append near the end of body so it visually sits as a footer
    document.body.appendChild(footer);
  }

  // Reuse existing link if present (move it to center), otherwise create it
  let a = document.querySelector('.footer-youtube-link');
  if (!a) {
    a = document.createElement('a');
    a.className = 'footer-youtube-link';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', "YouTube kanalimizga o'tish");

    // YouTube SVG icon (play in a rounded square) + text
    a.innerHTML = `
      <span class="fy-icon" aria-hidden="true">\n        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.58A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.58A3 3 0 0 0 23.5 17.8 31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8z" fill="#FF0000"/>
          <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="#fff"/>
        </svg>
      </span>
      <span class="fy-text">YouTube</span>
    `;
  }

  // Insert link at the end of footer, but prefer an inline place (like .container) if available
  // Try to place the link specifically between the site copyright and Telegram text
  const telegramSelectorText = ['Telegram', '@T_M_Manager'];

  // helper to find an element that contains Telegram text
  function findTelegramElement(root) {
    const all = Array.from((root || document).querySelectorAll('*'));
    for (const el of all) {
      const txt = (el.textContent || '').trim();
      if (!txt) continue;
      for (const key of telegramSelectorText) {
        if (txt.includes(key)) return el;
      }
    }
    return null;
  }

  // Create or find a centered container inside the footer
  let center = footer.querySelector('.footer-center');
  if (!center) {
    center = document.createElement('div');
    center.className = 'footer-center';
    footer.appendChild(center);
  }

  // move the link into the center container
  center.appendChild(a);

  // If Telegram element exists, keep it in footer but don't duplicate link
  const telEl = findTelegramElement(footer);
  if (telEl) {
    // nothing else needed; link sits centered
  }
  else {
    // check for a text node that mentions Telegram and split it
    // nothing to do; link already centered
  }
});
