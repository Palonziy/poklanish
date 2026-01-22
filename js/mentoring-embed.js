document.addEventListener('DOMContentLoaded', function () {
  /**
   * Mentoring bo'limini topish va YouTube videoni vertikal (Shorts) 
   * formatga moslab, mobil va desktopda chiroyli ko'rsatish.
   */
  function setupMentoringVideo() {
    // "Sizning Mentoring" sarlavhasini qidirish
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, .heading-section'));
    let mentoringHeading = null;
    
    for (const h of headings) {
      const text = (h.textContent || '').trim();
      if (text.includes('Sizning') && text.includes('Mentoring')) {
        mentoringHeading = h;
        break;
      }
    }

    if (!mentoringHeading) return;

    // Sarlavhaga eng yaqin bo'lgan asosiy konteynerni (card) topish
    const card = mentoringHeading.closest('[class*="rounded-3xl"]') || 
                 mentoringHeading.closest('section')?.querySelector('[class*="rounded-3xl"]');
    
    if (!card || card.classList.contains('mentoring-processed')) return;
    card.classList.add('mentoring-processed');

    // Mavjud kontentni saqlab qolish
    const originalContent = card.innerHTML;

    // Yangi ikki ustunli layout yaratish
    // Video ID: n6riWnw7IrU
    card.innerHTML = `
      <div class="mentoring-row">
        <div class="mentoring-left">
          <div class="mentoring-video-container">
            <iframe 
              class="mentoring-iframe"
              src="https://www.youtube.com/embed/n6riWnw7IrU?autoplay=0&rel=0&modestbranding=1&playsinline=1"
              title="Mentoring Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              playsinline>
            </iframe>
          </div>
        </div>
      </div>
    `;

    // O'ng ustundagi ortiqcha dekorativ elementlarni tozalash
    const rightCol = card.querySelector('.mentoring-right');
    
    // 1. Mutloq joylashgan (absolute) dekorativ elementlarni o'chirish
    const decorators = rightCol.querySelectorAll('.w-32.h-32, .rounded-full.bg-card, .absolute, [class*="top-"], [class*="left-"], [class*="right-"], [class*="bottom-"]');
    decorators.forEach(el => {
        // Sarlavha yoki asosiy matn bo'lmasa o'chiramiz
        if (!el.contains(mentoringHeading) && el.tagName !== 'H1' && el.tagName !== 'H2' && el.tagName !== 'H3') {
            el.remove();
        }
    });
    
    // 2. "Sizning yo'lboshchingiz" kabi takroriy matnlarni o'chirish
    const allElements = rightCol.querySelectorAll('p, span, div, h1, h2, h3');
    allElements.forEach(el => {
        const txt = el.textContent.toLowerCase();
        if (txt.includes('yo\'lboshchingiz') || txt.includes('yolboshchingiz')) {
            el.remove();
        }
    });

    // 3. Padding va marginlarni tozalash
    const inner = rightCol.querySelector('.mentoring-content-inner');
    if (inner) {
        inner.style.position = 'relative';
        inner.style.zIndex = '10';
    }
  }

  // Sahifa yuklanganda ishga tushirish
  setupMentoringVideo();
});
