// 修改後的獨立 JS 檔案 (例如 script.js)

// 加上這行檢查：只有在瀏覽器環境下才執行
if (typeof window !== 'undefined' && typeof document !== 'undefined') {

  document.addEventListener('DOMContentLoaded', () => {

    // 1. 手機版選單切換邏輯
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        const isHidden = getComputedStyle(mobileMenu).display === 'none';
        mobileMenu.style.display = isHidden ? 'block' : 'none';
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.style.display = 'none';
        });
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