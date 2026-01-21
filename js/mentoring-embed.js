document.addEventListener('DOMContentLoaded', function () {
  // Helper: find the mentoring card by locating the heading "Sizning Mentoring"
  function findMentoringCard() {
    const headings = Array.from(document.querySelectorAll('h1,h2,h3,.heading-section'));
    for (const h of headings) {
      const txt = (h.textContent || '').replace(/\s+/g, ' ').trim();
      if (!txt) continue;
      if (txt.includes('Sizning') && txt.includes('Mentoring')) {
        // Prefer the previous sibling if it looks like the visual card
        let cand = h.previousElementSibling;
        for (let i = 0; i < 6 && cand; i++) {
          if (cand.classList && /rounded-3xl/.test(cand.className)) return cand;
          // if the sibling contains a rounded card inside, use that
          const inside = cand.querySelector && cand.querySelector('[class*=\"rounded-3xl\"]');
          if (inside) return inside;
          cand = cand.previousElementSibling;
        }

        // Fallback: search within the same section for the first rounded card
        const section = h.closest('section') || h.parentElement;
        if (section) {
          const found = section.querySelector('[class*=\"rounded-3xl\"]');
          if (found) return found;
        }
      }
    }
    return null;
  }

  let card = findMentoringCard();

  // Fallback to older text search (very narrow scope) only if the above failed
  if (!card) {
    function findByText(root, text) {
      const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
          try {
            if (node.textContent && node.textContent.trim().includes(text)) return NodeFilter.FILTER_ACCEPT;
          } catch (e) {}
          return NodeFilter.FILTER_SKIP;
        }
      });
      return walker.nextNode();
    }
    const targetText = "Sizning yo'lboshchingiz";
    const el = findByText(document.getElementById('root'), targetText) || findByText(document.body, targetText);
    if (el) {
      let anc = el;
      while (anc && !(anc.className && /rounded-3xl/.test(anc.className))) anc = anc.parentElement;
      if (anc) card = anc;
    }
  }

  if (!card) return;

  // don't run twice on the same card
  if (card.classList && card.classList.contains('mentoring-processed')) return;
  card.classList.add('mentoring-processed');

  // Preserve original content and build a two-column layout: video (left) + content (right)
  const originalHTML = card.innerHTML;

  // Create wrapper row
  const row = document.createElement('div');
  row.className = 'mentoring-row';

  // Left column: iframe
  const left = document.createElement('div');
  left.className = 'mentoring-left';
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/n6riWnw7IrU?rel=0';
  iframe.title = 'YouTube Short';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  iframe.setAttribute('allowfullscreen', '');
  iframe.className = 'mentoring-iframe';
  left.appendChild(iframe);

  // Right column: preserve original content
  const right = document.createElement('div');
  right.className = 'mentoring-right';
  right.innerHTML = originalHTML;

  // Remove heart / decorative round icon commonly present in the original card
  try {
    // Common classes seen in the bundle for that circle/icon
    const removeSelectors = [
      '.w-32.h-32', // Tailwind-like container
      '.rounded-full.bg-card',
      '.text-gold',
      '.icon-heart',
      'svg[data-icon="heart"]'
    ];
    for (const sel of removeSelectors) {
      const node = right.querySelector(sel);
      if (node) node.remove();
    }

    // Remove any single-element that only contains a heart character
    const nodes = Array.from(right.querySelectorAll('*'));
    nodes.forEach(n => {
      const txt = (n.textContent || '').trim();
      if (txt === '♥' || txt === '❤') n.remove();
    });
  } catch (e) {
    // non-fatal
  }

  // Replace card contents with new layout
  card.innerHTML = '';
  row.appendChild(left);
  row.appendChild(right);
  card.appendChild(row);

  // If the original card had an absolute inset container (Tailwind classes), place the iframe there so it fully fills
  try {
    const absSel = '.absolute.inset-0.flex.items-center.justify-center';
    const absContainer = card.querySelector(absSel);
    if (absContainer) {
      // ensure the left wrapper is the positioned parent
      const leftWrapper = card.querySelector('.mentoring-left');
      if (leftWrapper) leftWrapper.style.position = leftWrapper.style.position || 'relative';

      // move iframe into the absolute container
      const existingIframe = card.querySelector('.mentoring-iframe');
      if (existingIframe) {
        // clear container and append
        absContainer.innerHTML = '';
        absContainer.appendChild(existingIframe);
      }
    }
  } catch (e) {
    // non-fatal
  }
});
