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

  /* 最新消息跑馬燈垂直翻轉 */
    
  function initTicker() {
    const tickerTrack = document.getElementById('ticker-track');
    const tickerSection = document.querySelector('.ticker-section');
    if (!tickerTrack || !tickerSection) return;

    // 1. 優先檢查 HTML 內部是否已經由 Astro 渲染出 .ticker-item
    let items = Array.from(tickerTrack.querySelectorAll('.ticker-item'));

    // 2. 如果 HTML 內沒有，再嘗試從全域變數 window.TICKER_ITEMS 動態注入
    if (items.length === 0) {
      const rawTickerItems = typeof window !== 'undefined' ? (window.TICKER_ITEMS || []) : [];
      
      // 如果都沒有資料，隱藏跑馬燈並結束
      if (!rawTickerItems || rawTickerItems.length === 0) {
        tickerSection.style.display = 'none';
        return;
      }

      // 複製第一筆做無縫循環
      const displayItems = [...rawTickerItems, rawTickerItems[0]];
      tickerTrack.innerHTML = displayItems.map(text => `
        <div class="ticker-item">
          <span>${text}</span>
        </div>
      `).join('');

      items = Array.from(tickerTrack.querySelectorAll('.ticker-item'));
    }

    // 3. 取得有效資料筆數（扣除重複的銜接項）
    const totalItems = items.length > 1 ? items.length - 1 : items.length;
    if (totalItems <= 1) return; // 只有 1 筆時不啟動滾動動畫

    // 4. 計算滾動高度（固定 64px 或動態抓取容器高度）
    const itemHeight = tickerSection.offsetHeight || 64;
    let currentIndex = 0;
    let intervalId = null;

    function startSlide() {
      // 避免重複綁定定時器
      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        currentIndex++;
        tickerTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        tickerTrack.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

        // 當翻到複製的最後一筆時，秒切回第 0 筆
        if (currentIndex === totalItems) {
          setTimeout(() => {
            tickerTrack.style.transition = 'none';
            tickerTrack.style.transform = 'translateY(0px)';
            currentIndex = 0;
          }, 600); // 對應 transition 0.6s
        }
      }, 3500); // 每 3.5 秒翻頁一次
    }

    // 5. 滑鼠移入暫停、移出繼續
    const tickerWrapper = document.querySelector('.ticker-wrapper');
    if (tickerWrapper) {
      tickerWrapper.addEventListener('mouseenter', () => {
        if (intervalId) clearInterval(intervalId);
      });
      tickerWrapper.addEventListener('mouseleave', startSlide);
    }

    startSlide();
  }

  // 支援一般載入與 Astro View Transitions 頁面載入
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTicker);
  } else {
    initTicker();
  }
  document.addEventListener('astro:page-load', initTicker);

  });