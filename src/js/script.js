// 確保只在瀏覽器環境下執行，並於 DOM 載入後觸發
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. 手機版選單切換開關 (Hamburger Menu Toggle)
     ========================================================================== */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-btn-consult');

  if (mobileBtn && mobileMenu) {
    // 點擊漢堡選單按鈕開關選單
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('is-active');
    });

    // 點擊選單內部項目後自動收合選單
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
      });
    });

    // 點擊頁面其他區域自動收合選單
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileMenu.classList.remove('is-active');
      }
    });
  }

  /* ==========================================================================
     2. 主視覺自動圖片輪播 (Hero Carousel Logic)
     ========================================================================== */
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('carousel-dots');

  if (carouselTrack) {
    const slides = Array.from(carouselTrack.children);
    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
    let currentIndex = 0;
    let autoSlideInterval = null;

    // 更新輪播圖位置與圓點狀態
    function updateCarousel(index) {
      // 確保索引值在合法範圍內循環
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      // 移動軌道 (以百分比位移)
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

      // 更新圓點點亮狀態
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // 切換下一張
    function nextSlide() {
      updateCarousel(currentIndex + 1);
    }

    // 切換上一張
    function prevSlide() {
      updateCarousel(currentIndex - 1);
    }

    // 開啟自動播放 (每 4 秒切換一次)
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    // 暫停自動播放
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    }

    // 監聽左右切換按鈕事件
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide(); // 點擊後重新計時
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide(); // 點擊後重新計時
      });
    }

    // 監聽圓點點擊事件
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateCarousel(idx);
        startAutoSlide(); // 點擊後重新計時
      });
    });

    // 滑鼠移入輪播圖區塊時暫停播放，移出時恢復自動播放
    const carouselContainer = carouselTrack.parentElement;
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // 初始化輪播圖與啟動自動播放
    updateCarousel(0);
    startAutoSlide();
  }

  /* ==========================================================================
     3. 最新消息跑馬燈資料動態注入與無縫滾動 (News Ticker)
     ========================================================================== */
  const tickerItems = [
    "恭賀！艾城市輔導台灣好行「縱谷花蓮線」成為全台首條獲碳足跡認證客運路線！",
    "【熱門課程】2026年 iPAS 淨零碳規劃管理師初級輔導考照班開放報名",
    "【政府補助】經濟部產發署低碳淨零人才培育計畫補助名額釋出",
    "【公司公告】本公司通過勞動部 TTQS 評核，榮獲訓練機構版「銅牌」認證",
    "【政策快訊】環境部公告溫室氣體排放量應盤查登錄對象與碳費收費標準"
  ];

  const tickerTrack = document.getElementById('ticker-track');

  if (tickerTrack) {
    // 將資料陣列複製兩份，達到動態 Seamless Scroll 無縫銜接效果
    const doubleItems = [...tickerItems, ...tickerItems];

    tickerTrack.innerHTML = doubleItems.map(text => `
      <div class="ticker-item">
        <span>${text}</span>
        <span class="ticker-symbol">◆</span>
      </div>
    `).join('');
  }

});