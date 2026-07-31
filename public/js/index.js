// 確保 DOM 結構與頁面元件載入完成後才執行程式碼
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. 手機版選單與子選項展開/收合 (Mobile Menu & Submenu Toggle)
     ========================================================================== */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    // 點擊漢堡按鈕：開啟或關閉手機版選單面板
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('is-active');
    });

    // 取得手機選單內所有包含子項目的群組
    const mobileNavGroups = mobileMenu.querySelectorAll('.mobile-nav-group');

    mobileNavGroups.forEach((group) => {
      const mainLink = group.querySelector('.mobile-nav-link');
      const subMenu = group.querySelector('.mobile-submenu');

      if (mainLink && subMenu) {
        // 點擊主項目時，切換展開/收合狀態，不進行頁面跳轉
        mainLink.addEventListener('click', (e) => {
          e.preventDefault();
          subMenu.classList.toggle('is-open');
        });
      }
    });

    // 點擊選單以外的空白區域時，自動關閉手機選單與所有子選單
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileMenu.classList.remove('is-active');
        
        // 將所有開啟中的子選單復原為隱藏狀態
        mobileMenu.querySelectorAll('.mobile-submenu').forEach(sub => {
          sub.classList.remove('is-open');
        });
      }
    });
  }

  /* ==========================================================================
     2. 主視覺圖片輪播邏輯 (Hero Carousel Logic)
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
     3. 最新消息跑馬燈無縫動態注入 (News Ticker)
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
    // 將陣列複製一份，以達到 CSS Seamless Scroll 無縫銜接滾動效果
    const doubleItems = [...tickerItems, ...tickerItems];

    tickerTrack.innerHTML = doubleItems.map(text => `
      <div class="ticker-item">
        <span>${text}</span>
        <span class="ticker-symbol">◆</span>
      </div>
    `).join('');
  }

});