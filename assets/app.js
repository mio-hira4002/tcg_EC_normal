/* TCG GATE JAPAN — shared UI (header / footer / cart / i18n / motion) */
(function () {
  "use strict";
  var D = window.TCG;
  document.documentElement.classList.add("js");

  /* ---------- utils ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var yen = function (n) { return "¥" + Number(n).toLocaleString("ja-JP"); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var param = function (k) { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var byId = {}; D.products.forEach(function (p) { byId[p.id] = p; });
  var theme = document.body.getAttribute("data-theme") || "pop";
  var cardIdx = 0;
  var mode = store.get("tcg-mode", "buy");
  function applyMode() { document.body.classList.toggle("sell-mode", mode === "sell"); $$(".mode button").forEach(function (b) { var on = b.getAttribute("data-mode") === mode; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); }); }

  /* ---------- i18n (chrome + data-en) ---------- */
  var lang = store.get("tcg-lang", "ja");
  var T = {
    ja: { top:"トップ", buy:"買いたい", sell:"売りたい", shops:"店舗", cart:"カート", search:"カード名・型番で検索", menu:"メニュー", close:"閉じる",
      cartTitle:"カート", empty:"カートは空です", toShop:"シングルを見る", subtotal:"小計", toFree:"送料無料まで", freeOk:"送料無料の対象です", viewCart:"カートを見る", checkout:"レジに進む", remove:"削除", added:"カートに追加しました",
      shop:"SHOP", bb:"BUY-BACK", about:"ABOUT", guide:"GUIDE" },
    en: { top:"Home", buy:"Buy", sell:"Sell", shops:"Shops", cart:"Cart", search:"Search by card name or number", menu:"Menu", close:"Close",
      cartTitle:"Cart", empty:"Your cart is empty", toShop:"Browse singles", subtotal:"Subtotal", toFree:"Until free shipping", freeOk:"Free shipping applied", viewCart:"View cart", checkout:"Checkout", remove:"Remove", added:"Added to cart",
      shop:"SHOP", bb:"BUY-BACK", about:"ABOUT", guide:"GUIDE" }
  };
  var t = function (k) { return (T[lang] && T[lang][k]) || T.ja[k]; };
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-en]").forEach(function (el) {
      if (!el.hasAttribute("data-ja")) el.setAttribute("data-ja", el.innerHTML);
      el.innerHTML = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-ja");
    });
    $$("[data-t]").forEach(function (el) { el.textContent = t(el.getAttribute("data-t")); });
    $$("[data-tp]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-tp"))); });
    $$(".lang button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === lang); b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang); });
    document.dispatchEvent(new CustomEvent("tcg:lang", { detail: lang }));
  }

  /* ---------- icons ---------- */
  var I = {
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    bag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
    x: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    arr: '<svg class="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* ---------- header / footer ---------- */
  var page = document.body.getAttribute("data-page") || "";
  var navs = [["index.html", "top", "top"], ["buy.html", "buy", "buy"], ["sell.html", "sell", "sell"], ["shops.html", "shops", "shops"]];
  function header() {
    var msgs = ["[金額]円以上のご購入で送料無料", "平日[時刻]までのご注文は当日発送", "秋葉原・西新・久留米で店頭受取", "LINEで写真を送るだけの買取査定"];
    var row = msgs.map(function (m) { return "<span>" + m + "</span><i class=\"dot\"></i>"; }).join("");
    return '<div class="announce marq-host" aria-label="お知らせ"><div class="marq">' + row + row + "</div></div>" +
      '<header class="site-header"><div class="wrap hd">' +
      '<a class="logo" href="index.html" aria-label="TCG GATE JAPAN トップ"><span class="mark" aria-hidden="true"><i></i><i></i></span>TCG GATE<span class="slash">/JP</span></a>' +
      '<nav class="gnav" aria-label="メイン">' + navs.map(function (n) { return '<a class="link' + (page === n[2] ? " on" : "") + '" href="' + n[0] + '"' + (page === n[2] ? ' aria-current="page"' : "") + ' data-t="' + n[1] + '"></a>'; }).join("") + "</nav>" +
      '<div class="hd-tools">' + (theme === "normal" ? '<div class="mode" role="group" aria-label="モード"><button type="button" data-mode="buy">買う</button><button type="button" data-mode="sell">売る</button></div>' : "") +
      '<form class="search" role="search" action="buy.html"><span aria-hidden="true">' + I.search + '</span><label class="sr" for="hq">検索</label><input id="hq" name="q" type="search" data-tp="search"></form>' +
      '<div class="lang" role="group" aria-label="Language"><button type="button" data-lang="ja">JP</button><button type="button" data-lang="en">EN</button></div>' +
      '<button type="button" class="cart-btn" data-open-cart aria-label="カートを開く">' + I.bag + '<span class="lbl" data-t="cart"></span><span class="num" data-cart-count>0</span></button>' +
      '<button type="button" class="icon-btn menu-btn" data-open-menu aria-label="メニュー">' + I.menu + "</button>" +
      "</div></div></header>" +
      '<div class="mnav" id="mnav" role="dialog" aria-label="メニュー"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px"><span class="logo">TCG GATE<span class="slash">/JP</span></span><button type="button" class="icon-btn" data-close-menu aria-label="閉じる">' + I.x + "</button></div>" +
      navs.map(function (n) { return '<a class="big" href="' + n[0] + '" data-t="' + n[1] + '"></a>'; }).join("") +
      '<form role="search" action="buy.html" style="margin-top:28px;display:flex;border-bottom:1.5px solid var(--ink);height:48px;align-items:center;gap:8px">' + I.search + '<label class="sr" for="mq">検索</label><input id="mq" name="q" type="search" data-tp="search" style="border:0;outline:0;flex:1;font-size:16px"></form>' +
      '<div class="lang" role="group" aria-label="Language" style="display:inline-flex;margin-top:24px"><button type="button" data-lang="ja">JP</button><button type="button" data-lang="en">EN</button></div></div>';
  }
  function footer() {
    var col = function (h, items) { return "<div><h4>" + t(h) + "</h4><ul>" + items.map(function (i) { return '<li><a href="' + i[0] + '"' + (i[2] ? ' data-en="' + i[2] + '"' : "") + ">" + i[1] + "</a></li>"; }).join("") + "</ul></div>"; };
    return '<footer class="site-footer"><div class="ft-big" aria-hidden="true"><div>TCG GATE</div></div><div class="wrap">' +
      '<div class="ft-cols"><div><p style="margin:0 0 14px;font-size:14px;line-height:1.9;max-width:22em" data-en="Pokémon card specialist in Akihabara, Nishijin and Kurume.">秋葉原・福岡西新・久留米のポケモンカード専門店。</p><a class="btn sm ghost-w" href="contact.html" data-en="Contact">お問い合わせ</a></div>' +
      col("shop", [["index.html", "トップページ", "Home"], ["buy.html", "シングル販売", "Singles"], ["buy.html?set=M5", "最新弾シリーズ", "Latest set"], ["buy.html#cats", "カテゴリーから探す", "Categories"]]) +
      col("bb", [["sell.html", "買取トップ", "Sell top"], ["sell.html#methods", "買取方法", "How to sell"], ["sell.html#flow", "買取の流れ", "Flow"], ["price.html", "買取価格表", "Buylist"]]) +
      col("about", [["shops.html", "店舗一覧", "Shops"], ["company.html", "企業情報", "Company"], ["company.html#recruit", "採用情報", "Careers"], ["contact.html", "お問い合わせ", "Contact"]]) +
      col("guide", [["legal.html#terms", "利用規約", "Terms"], ["legal.html#tokusho", "特定商取引法に基づく表記", "Legal notice"], ["legal.html#privacy", "プライバシーポリシー", "Privacy"], ["faq.html", "よくある質問", "FAQ"]]) +
      '</div><div class="ft-bottom"><details><summary>古物営業法に基づく表示</summary><p style="margin:8px 0 0;line-height:1.9">[公安委員会名・許可番号を確認のうえ記載]</p></details><span>© 2026 [運営会社名]</span></div></div></footer>' +
      '<div class="scrim" data-close-cart></div><aside class="drawer" id="drawer" aria-label="カート" aria-hidden="true"><div class="dh"><b style="font-size:18px" data-t="cartTitle"></b><button type="button" class="icon-btn" data-close-cart aria-label="閉じる">' + I.x + '</button></div><div class="db" id="drawer-body"></div><div class="df" id="drawer-foot"></div></aside><div class="toast" id="toast" role="status" aria-live="polite"></div>';
  }
  var top = document.createElement("div"); top.innerHTML = header();
  document.body.insertBefore(top, document.body.firstChild);
  var bottom = document.createElement("div"); bottom.innerHTML = footer();
  document.body.appendChild(bottom);

  /* ---------- card art ---------- */
  function art(p, opts) {
    opts = opts || {};
    var flag = opts.flag ? '<span class="flag">' + opts.flag + "</span>" : "";
    var photo = '<img class="ph" src="assets/images/' + p.id + '.jpg" alt="" loading="lazy" onerror="this.remove()">';
    var nm = esc(lang === "en" ? p.en : p.name);
    var face = '<span class="cf"><span class="cf-top"><b>' + nm + "</b>" + (p.hp ? "<i>HP " + p.hp + "</i>" : "") + '</span><span class="cf-win"></span><span class="cf-txt"><i></i><i></i><i></i></span><span class="cf-bot"><span>' + esc(p.rarity) + "</span><span>" + esc(p.set) + (p.num && p.num !== "—" ? " " + esc(p.num) : "") + "</span></span></span>";
    var inner = '<span class="art' + (opts.foil === false ? "" : " foil") + (p.type ? " t-" + p.type : "") + '" style="--h:' + p.hue + '">' + photo + face + "</span>";
    if (p.cond === "PSA10") {
      return '<span class="slab"><span class="lbl"><span>' + flag + esc(p.year || "") + " POKEMON " + esc(p.set) + "<br>" + esc((p.label || p.en).toUpperCase()) + " #" + esc(String(p.num).split("/")[0]) + '</span><span class="g"><b>10</b><span>GEM MT</span></span></span>' + inner + "</span>";
    }
    return inner;
  }
  function condLabel(p) { var c = D.conds[p.cond]; return lang === "en" ? c.en : c.ja + " " + c.note; }
  function card(p) {
    var sold = p.stock <= 0;
    var tag = sold ? '<span class="tag">SOLD OUT</span>' : p.badge ? '<span class="tag' + (p.badge === "SALE" ? " red" : "") + '">' + p.badge + "</span>" : p.stock <= 2 ? '<span class="tag">' + (lang === "en" ? "ONLY " : "残り") + p.stock + "</span>" : "";
    var slab = p.cond === "PSA10";
    var flag = sold ? "SOLD" : p.badge || "";
    var a0 = art(p, slab ? { flag: flag } : {});
    if (theme === "normal") a0 = '<span class="flip" style="--i:' + (cardIdx++ % 12) + '"><span class="flip-in"><span class="face">' + a0 + '</span><span class="face back"><span class="cb"><small>' + (lang === "en" ? "WE BUY" : "買取価格") + "</small><b>" + (p.buy ? yen(p.buy) : (lang === "en" ? "Ask us" : "LINE査定")) + "</b><small>" + esc(p.rarity) + " · " + esc(p.set) + "</small></span></span></span></span>";
    return '<div class="pcard' + (sold ? " sold" : "") + '"><a class="pcard" href="product.html?id=' + p.id + '" style="opacity:1">' + (slab ? "" : tag) + '<span class="shot">' + a0 + "</span>" +
      '<span class="meta"><span>' + esc(p.rarity) + (p.num && p.num !== "—" ? " " + esc(p.num) : "") + "</span><span>" + esc(p.set) + "</span></span>" +
      '<span class="name">' + esc(lang === "en" ? p.en : p.name) + '</span><span class="sub">' + esc(condLabel(p)) + "</span></a>" +
      '<div class="row"><span><span class="price">' + yen(p.price) + "</span>" + (p.old ? '<span class="old">' + yen(p.old) + "</span>" : "") + "</span>" +
      '<button type="button" class="add" data-add="' + p.id + '"' + (sold ? " disabled" : "") + ' aria-label="' + esc(p.name) + ' をカートに入れる">' + I.plus + "</button>" +
      (theme === "normal" ? '<button type="button" class="add sell" data-sell="' + p.id + '" aria-label="' + esc(p.name) + ' を買取リストに追加">' + I.plus + "</button>" : "") + "</div></div>";
  }

  /* ---------- cart ---------- */
  var cart = store.get("tcg-cart", []);
  function saveCart() { store.set("tcg-cart", cart); renderCart(); }
  function cartCount() { return cart.reduce(function (n, i) { return n + i.q; }, 0); }
  function subtotal() { return cart.reduce(function (n, i) { return n + (byId[i.id] ? byId[i.id].price * i.q : 0); }, 0); }
  function addToCart(id, q) {
    var p = byId[id]; if (!p || p.stock <= 0) return;
    var it = cart.filter(function (i) { return i.id === id; })[0];
    if (it) it.q = Math.min(p.stock, it.q + (q || 1)); else cart.push({ id: id, q: Math.min(p.stock, q || 1) });
    saveCart();
    var b = $(".cart-btn"); if (b) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
    toast(t("added") + "　" + (lang === "en" ? p.en : p.name));
  }
  function setQty(id, q) { cart = cart.map(function (i) { return i.id === id ? { id: id, q: Math.max(1, Math.min(byId[id].stock, q)) } : i; }); saveCart(); }
  function removeItem(id) { cart = cart.filter(function (i) { return i.id !== id; }); saveCart(); }
  function shipHTML() {
    var line = D.freeShippingLine, s = subtotal(), rem = Math.max(0, line - s);
    return '<div class="ship"><div style="font-size:13px">' + (rem === 0 ? t("freeOk") : t("toFree") + ' <b class="num">' + yen(rem) + "</b>") + '</div><div class="bar"><i style="width:' + Math.min(100, Math.round(s / line * 100)) + '%"></i></div></div>';
  }
  function itemsHTML(full) {
    return cart.map(function (i) {
      var p = byId[i.id]; if (!p) return "";
      return '<div class="citem"><a href="product.html?id=' + p.id + '"><span class="art" style="--h:' + p.hue + '"></span></a><div><a class="nm" href="product.html?id=' + p.id + '">' + esc(lang === "en" ? p.en : p.name) + '</a><div class="muted" style="font-size:12px">' + esc(p.rarity + " " + p.num + " / " + condLabel(p)) + "</div>" +
        (full ? '<div class="qty" style="height:40px;margin-top:8px"><button type="button" data-q="' + p.id + '" data-d="-1" aria-label="減らす">−</button><input aria-label="数量" value="' + i.q + '" readonly><button type="button" data-q="' + p.id + '" data-d="1" aria-label="増やす">+</button></div>' : '<div style="font-size:12px">× ' + i.q + "</div>") +
        '</div><div style="text-align:right"><div class="num" style="font-weight:500">' + yen(p.price * i.q) + '</div><button type="button" class="rm" data-rm="' + p.id + '">' + t("remove") + "</button></div></div>";
    }).join("");
  }
  function renderCart() {
    $$("[data-cart-count]").forEach(function (el) { el.textContent = cartCount(); });
    var body = $("#drawer-body"), foot = $("#drawer-foot");
    if (body) {
      if (!cart.length) { body.innerHTML = '<div class="empty" style="padding:64px 0"><p class="display d-s" style="margin-bottom:18px">' + t("empty") + '</p><a class="btn" href="buy.html">' + t("toShop") + I.arr + "</a></div>"; foot.innerHTML = ""; }
      else {
        body.innerHTML = shipHTML() + itemsHTML(false);
        foot.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:baseline"><span>' + t("subtotal") + '</span><b class="num" style="font-size:24px">' + yen(subtotal()) + '</b></div><a class="btn block" href="cart.html#checkout">' + t("checkout") + I.arr + '</a><a class="btn ghost block" href="cart.html">' + t("viewCart") + "</a>";
      }
    }
    document.dispatchEvent(new CustomEvent("tcg:cart"));
  }
  function openCart(open) {
    var d = $("#drawer"), s = $(".scrim"); if (!d) return;
    d.classList.toggle("open", open); s.classList.toggle("open", open); d.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var c = $("[data-close-cart].icon-btn", d); if (c) c.focus(); }
  }
  var toastTimer;
  function toast(msg) { var el = $("#toast"); if (!el) return; el.textContent = msg; el.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400); }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-add]"); if (a) { e.preventDefault(); addToCart(a.getAttribute("data-add"), 1); return; }
    if (e.target.closest("[data-open-cart]")) { openCart(true); return; }
    if (e.target.closest("[data-close-cart]")) { openCart(false); return; }
    var rm = e.target.closest("[data-rm]"); if (rm) { removeItem(rm.getAttribute("data-rm")); return; }
    var q = e.target.closest("[data-q]"); if (q) { var it = cart.filter(function (i) { return i.id === q.getAttribute("data-q"); })[0]; if (it) setQty(it.id, it.q + Number(q.getAttribute("data-d"))); return; }
    var md = e.target.closest("[data-mode]"); if (md) { mode = md.getAttribute("data-mode"); store.set("tcg-mode", mode); applyMode(); document.dispatchEvent(new CustomEvent("tcg:mode", { detail: mode })); return; }
    var sl = e.target.closest("[data-sell]"); if (sl && sl.classList.contains("sell")) { var l = store.get("tcg-sell", []), sid = sl.getAttribute("data-sell"); if (l.indexOf(sid) < 0) l.push(sid); store.set("tcg-sell", l); toast((lang === "en" ? "Added to buylist　" : "買取リストに追加しました　") + (byId[sid] ? byId[sid].name : "")); return; }
    var lb = e.target.closest(".lang button"); if (lb) { lang = lb.getAttribute("data-lang"); store.set("tcg-lang", lang); applyLang(); renderCart(); return; }
    if (e.target.closest("[data-open-menu]")) { $("#mnav").classList.add("open"); document.body.style.overflow = "hidden"; return; }
    if (e.target.closest("[data-close-menu]")) { $("#mnav").classList.remove("open"); document.body.style.overflow = ""; return; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { openCart(false); var m = $("#mnav"); if (m) m.classList.remove("open"); document.body.style.overflow = ""; } });

  /* ---------- motion ---------- */
  function reveal() {
    var els = $$("[data-reveal]:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }
  function countUp() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var els = $$("[data-count]");
    var run = function (el) {
      var to = Number(el.getAttribute("data-count")), pre = el.getAttribute("data-pre") || "", suf = el.getAttribute("data-suf") || "";
      var fmt = function (v) { return pre + Math.round(v).toLocaleString("ja-JP") + suf; };
      if (reduce) { el.textContent = fmt(to); return; }
      var st = performance.now(), dur = 1300;
      (function step(now) { var k = Math.min(1, (now - st) / dur); el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(st);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }); }, { threshold: .4 });
    els.forEach(function (el) { io.observe(el); });
  }
  function tilt(el) {
    if (!el || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = "rotateX(" + ((0.5 - y) * 16).toFixed(1) + "deg) rotateY(" + ((x - 0.5) * 20).toFixed(1) + "deg)";
      el.style.setProperty("--gx", (x * 100).toFixed(0) + "%"); el.style.setProperty("--gy", (y * 100).toFixed(0) + "%");
    });
    el.addEventListener("pointerleave", function () { el.style.transform = ""; });
  }

  window.TCGUI = { theme: theme, mode: function () { return mode; }, buyRows: function () { var seen = {}; var rows = D.products.filter(function (p) { return p.buy > 0; }).map(function (p) { seen[p.name] = 1; return { id: p.id, name: p.name + " " + p.rarity, num: p.num === "—" ? p.set : p.num, price: p.buy, cat: p.cat, hue: p.hue }; }); return rows.concat(D.buyback.filter(function (b) { return !seen[b.name.replace(/ [A-Z0-9]+$/, "")]; })); }, $: $, $$: $$, yen: yen, esc: esc, param: param, card: card, art: art, condLabel: condLabel, byId: byId, addToCart: addToCart, cart: function () { return cart; }, subtotal: subtotal, shipHTML: shipHTML, itemsHTML: itemsHTML, reveal: reveal, countUp: countUp, tilt: tilt, lang: function () { return lang; }, icons: I, store: store, toast: toast, applyLang: applyLang, clearCart: function () { cart = []; saveCart(); } };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(); applyMode(); renderCart(); reveal(); countUp();
    document.dispatchEvent(new CustomEvent("tcg:ready"));
  });
})();
