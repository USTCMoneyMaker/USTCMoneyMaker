// 1. 平滑滚动功能
document.documentElement.style.scrollBehavior = 'smooth';

// 2. 回到顶部按钮
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #333;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  display: none;
  z-index: 1000;
`;
document.body.appendChild(backToTop);

// 监听滚动事件显示/隐藏回到顶部按钮
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// 回到顶部功能
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3. BibTeX 复制功能（点击复制，不复制提示文本）
const copyTip = document.getElementById('copyTip');
const bibtexContent = document.getElementById('bibtexContent');

copyTip.addEventListener('click', () => {
  // 获取BibTeX纯文本内容（去除多余空格）
  const textToCopy = bibtexContent.textContent.trim();
  
  // 复制到剪贴板
  navigator.clipboard.writeText(textToCopy).then(() => {
    // 复制成功提示
    const originalText = copyTip.innerHTML;
    copyTip.innerHTML = '✅ Copied successfully!';
    copyTip.style.color = '#28a745';
    
    // 2秒后恢复原提示
    setTimeout(() => {
      copyTip.innerHTML = originalText;
      copyTip.style.color = '#0066cc';
    }, 2000);
  }).catch(err => {
    // 复制失败提示
    copyTip.innerHTML = '❌ Copy failed, try again!';
    copyTip.style.color = '#dc3545';
  });
});

// 4. 点击BibTeX区域也可复制（扩展复制范围）
bibtexContent.parentElement.addEventListener('click', () => {
  copyTip.click(); // 触发上述复制逻辑
});