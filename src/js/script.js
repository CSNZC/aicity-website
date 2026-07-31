//有判斷式才能夠顯示在網站上
if (typeof window !== 'undefined' && typeof document !== 'undefined') {

  document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        // 點擊右上角漢堡圖示：切換展開 / 隱藏
        menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('is-active');
        });

        // 點擊選單項目後自動收合選單
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('is-active');
        });
        });

        // 點擊頁面其他空白區域時自動收合選單
        document.addEventListener('click', function (e) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('is-active');
        }
        });
    }
    // 2. 跑馬燈內容渲染
    const tickerItems = [
      '【政策動態】環境部公告 2025 年碳費徵收費率，每噸 CO₂e 新台幣 300 元',
      '【公司公告】艾城市 2026 年 iPAS 淨零碳規劃管理師初級班即日起開放報名',
      '【新聞轉載】台灣 2030 年再生能源占比目標上調至 30%，太陽光電裝置量持續擴大',
      '【政策動態】經濟部產業發展署低碳淨零人才培育計畫補助名額釋出，歡迎企業申請',
      '【公司公告】艾城市榮獲勞動部 TTQS 銅牌認證，培訓品質獲國家認可',
      '【新聞轉載】全球 ESG 投資規模突破 40 兆美元，永續資訊揭露需求大幅成長'
    ];

    const tickerContainer = document.querySelector('.ticker-track');
    if (tickerContainer) {
      const fullItems = [...tickerItems, ...tickerItems]; 
      tickerContainer.innerHTML = fullItems.map(item => `
        <span class="ticker-item">
          ${item} <span class="ticker-symbol">◆</span>
        </span>
      `).join('');
    }

    // 3. 聯絡表單送出模擬
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
      });
    }
  });
}