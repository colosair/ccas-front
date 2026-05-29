/* ══════════════════════════════════════════════════════════════
   CCAS 플로우 프리뷰 공통 스크립트
   - 테마 초기화/토글 (localStorage)
   - goNext(url): 페이드아웃 후 페이지 이동 (자연스러운 단계 전환)
   - 스테퍼 완료 라인 골드 채움 애니메이션
══════════════════════════════════════════════════════════════ */

// 테마 초기화 (즉시 적용)
(function () {
  var saved = localStorage.getItem('ccas-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function initPreview() {
  // 테마 토글
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ccas-theme', next);
    });
  }

  // 스테퍼: 현재 단계 이전의 완료 라인을 골드로 채움 (로드 직후 트랜지션)
  var steps = Array.prototype.slice.call(document.querySelectorAll('.stepper > .stepper__step'));
  var lines = Array.prototype.slice.call(document.querySelectorAll('.stepper > .stepper__line'));
  var currentIdx = -1;
  steps.forEach(function (s, i) { if (s.classList.contains('is-current')) currentIdx = i; });
  lines.forEach(function (line, i) {
    // i번째 라인은 step[i] 와 step[i+1] 사이. 현재 단계 앞쪽 라인만 채움
    if (currentIdx === -1 || i < currentIdx) {
      setTimeout(function () { line.classList.add('is-done'); }, 200 + i * 110);
    }
  });
}

// DOM이 이미 준비됐으면 즉시, 아니면 로드 시점에 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreview);
} else {
  initPreview();
}

// 단계 전환: 페이드아웃 후 이동
function goNext(url) {
  document.body.classList.add('is-leaving');
  setTimeout(function () { window.location.href = url; }, 220);
}
