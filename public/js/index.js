// 確保 DOM 結構與頁面元件載入完成後才執行程式碼
document.addEventListener('DOMContentLoaded', () => {

  /* 主視覺圖片輪播邏輯 (Hero Carousel Logic) */
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('carousel-dots');

  if (carouselTrack) {
    const slides = Array.from(carouselTrack.children);
    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
    let currentIndex = 0;
    let autoSlideInterval = null;

    // 更新輪播圖片位移與對應的圓點高亮狀態
    function updateCarousel(index) {
      // 處理第一張與最後一張的循環邊界
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      // 使用 CSS translateX 計算橫向位移百分比
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

      // 切換圓點高亮 active 類別
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // 切換至下一張與上一張
    const nextSlide = () => updateCarousel(currentIndex + 1);
    const prevSlide = () => updateCarousel(currentIndex - 1);

    // 啟動每 4 秒自動輪播
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    // 停止自動輪播
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    }

    // 綁定下一張按鈕點擊事件
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide(); // 點擊後重置 4 秒倒數
      });
    }

    // 綁定上一張按鈕點擊事件
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide(); // 點擊後重置 4 秒倒數
      });
    }

    // 綁定指示圓點點擊事件
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateCarousel(idx);
        startAutoSlide(); // 點擊後重置 4 秒倒數
      });
    });

    // 當滑鼠移入輪播圖時暫停輪播，移出時恢復
    const carouselContainer = carouselTrack.parentElement;
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // 頁面初次載入：初始化第 0 張並開始自動輪播
    updateCarousel(0);
    startAutoSlide();
  }

  /* ==========================================================================
   3. 最新消息跑馬燈垂直翻轉 (Vertical News Ticker)
   ========================================================================== */
function initTicker() {
  const tickerTrack = document.getElementById('ticker-track');
  if (!tickerTrack) return;

  // 從 Astro 傳過來的全域變數讀取跑馬燈資料
  const tickerItems = window.TICKER_ITEMS || [];

  // 如果後台沒有任何文章勾選「顯示於跑馬燈」，直接隱藏整個跑馬燈區塊
  if (!tickerItems || tickerItems.length === 0) {
    document.querySelector('.ticker-section')?.remove();
    return;
  }

  // 複製第一筆放到最後面，用來做無縫循環銜接
  const displayItems = [...tickerItems, tickerItems[0]];

  // 渲染 HTML
  tickerTrack.innerHTML = displayItems.map(text => `
    <div class="ticker-item">
      <span>${text}</span>
    </div>
  `).join('');

  let currentIndex = 0;
  const itemHeight = 64; // 需與 CSS 行高 64px 一致
  const totalItems = tickerItems.length;
  let intervalId = null;

  function startSlide() {
    // 若只有 1 筆消息，就不需要滾動動畫
    if (totalItems <= 1) return;

    intervalId = setInterval(() => {
      currentIndex++;
      tickerTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      tickerTrack.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

      // 當滾動到複製的第一筆時，瞬間切回真正的第一筆（實現無縫循環）
      if (currentIndex === totalItems) {
        setTimeout(() => {
          tickerTrack.style.transition = 'none';
          tickerTrack.style.transform = 'translateY(0px)';
          currentIndex = 0;
        }, 600); // 需配合 CSS transition 0.6s
      }
    }, 3500); // 每 3.5 秒翻一頁
  }

  // 滑鼠移入暫停、移出繼續
  const tickerWrapper = document.querySelector('.ticker-wrapper');
  if (tickerWrapper) {
    tickerWrapper.addEventListener('mouseenter', () => clearInterval(intervalId));
    tickerWrapper.addEventListener('mouseleave', startSlide);
  }

  startSlide();
}

document.addEventListener('DOMContentLoaded', initTicker);

});