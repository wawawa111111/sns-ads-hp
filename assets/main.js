// 共通ヘッダー・フッター（全ページで同じものを使うため、ここで一括して差し込む）
(function(){
  const page = document.body.dataset.page || 'top';
  const nav = [
    ['service','service.html','SERVICE','サービス'],
    ['works','works.html','WORKS','実績・進め方'],
    ['about','about.html','ABOUT','プロフィール'],
    ['contact','contact.html','CONTACT','お問い合わせ'],
  ];
  const items = nav.map(([k,href,en,ja]) =>
    `<a class="item" href="${href}"${k===page?' aria-current="page"':''}><span class="en">${en}</span><small>${ja}</small></a>`).join('');

  document.getElementById('site-header').outerHTML = `
  <div class="draft">下書き版です。公開前に、記載内容（氏名・連絡先・料金の扱い・写真）をご確認ください。</div>
  <header class="site-header" id="hdr">
    <div class="wrap">
      <a href="index.html" class="brand"><span class="en">HARUHITO HASHIMOTO</span><small>熊本のInstagram・Meta広告運用</small></a>
      <nav class="gnav" aria-label="グローバルナビゲーション">${items}
        <a href="contact.html" class="btn btn-accent btn-sm">無料で相談する<span class="arw"></span></a>
      </nav>
      <button class="menu-btn" aria-label="メニューを開く" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;

  document.getElementById('site-footer').outerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="ft-top">
        <div class="ft-brand">
          <div class="en">HARUHITO<br>HASHIMOTO</div>
          <p>熊本の事業者様の、Instagram・Meta広告の運用をお手伝いしています。<br>熊本大学 情報融合学環 DS総合コース 3年</p>
        </div>
        <div class="ft-col"><h4>MENU</h4><ul>
          <li><a href="index.html">トップ</a></li><li><a href="service.html">サービス</a></li>
          <li><a href="works.html">実績・進め方</a></li><li><a href="about.html">プロフィール</a></li></ul></div>
        <div class="ft-col"><h4>CONTACT</h4><ul>
          <li><a href="contact.html">お問い合わせ</a></li><li><a href="contact.html#faq">よくあるご質問</a></li></ul></div>
        <div class="ft-col"><h4>SNS</h4><ul>
          <li><a href="#" aria-disabled="true">Instagram（準備中）</a></li></ul></div>
      </div>
      <div class="ft-bottom"><span>© ${new Date().getFullYear()} Haruhito Hashimoto</span><a href="#" class="pagetop">PAGE TOP ↑</a></div>
    </div>
  </footer>
  <div class="sp-cta" id="spcta"><a href="contact.html" class="btn btn-accent">無料で相談する<span class="arw"></span></a></div>`;

  // ヘッダーの影・スマホの下部ボタン
  const hdr = document.getElementById('hdr'), sp = document.getElementById('spcta');
  const onScroll = () => {
    hdr.classList.toggle('scrolled', scrollY > 10);
    sp.classList.toggle('show', scrollY > 400 && page !== 'contact');
  };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // スマホメニュー
  const mb = document.querySelector('.menu-btn');
  mb.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    mb.setAttribute('aria-expanded', open);
    mb.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  document.querySelectorAll('.gnav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
  document.querySelector('.pagetop').addEventListener('click', e => { e.preventDefault(); scrollTo({top:0, behavior:'smooth'}); });

  // スクロールで出現
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.15});
  document.querySelectorAll('.rv, .tl-item').forEach(el => io.observe(el));

  // 数字の数え上げ
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    if (reduce) return;
    const el = e.target, n = +el.dataset.count, unit = el.querySelector('small')?.outerHTML || '', t0 = performance.now();
    const tick = t => { const p = Math.min((t - t0) / 1400, 1); el.innerHTML = Math.round(n * (1 - Math.pow(1 - p, 3))) + unit; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }), {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el => co.observe(el));

  // タイムラインの縦線をスクロールに合わせて伸ばす
  document.querySelectorAll('.timeline').forEach(tl => {
    const bar = tl.querySelector('.prog'); if (!bar) return;
    const upd = () => {
      const r = tl.getBoundingClientRect(), h = r.height - 20;
      const p = Math.min(Math.max((innerHeight * .6 - r.top) / h, 0), 1);
      bar.style.height = (p * h) + 'px';
    };
    addEventListener('scroll', upd, {passive:true}); upd();
  });

  // お問い合わせフォーム（下書き版のため送信はしない）
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('form-msg').classList.add('show');
  });
})();
