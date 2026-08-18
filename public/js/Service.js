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

  });