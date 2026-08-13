document.addEventListener('DOMContentLoaded', () => {

  /* 手機版選單與子選項展開/收合 */
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
});