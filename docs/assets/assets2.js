import { t as __vitePreload } from "./index.js";
// assets/index.js
var __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f || (m.f = ["./main.js", "./index2.css"])) => i.map((i) => d[i]);
(function() {
	let e = document.createElement(`link`).relList;
	if (e && e.supports && e.supports(`modulepreload`)) return;
	for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
	new MutationObserver((e) => {
		for (let t of e) if (t.type === `childList`) for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
	}).observe(document, {
		childList: !0,
		subtree: !0
	});
	function t(e) {
		let t = {};
		return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), t.credentials = e.crossOrigin === `use-credentials` ? `include` : e.crossOrigin === `anonymous` ? `omit` : `same-origin`, t;
	}
	function n(e) {
		if (e.ep) return;
		e.ep = !0;
		let n = t(e);
		fetch(e.href, n);
	}
})();
var e = `modulepreload`;
var t = function(e, t) {
	return new URL(e, t).href;
};
var n = {};
var r = function(e) {
	return e.pathname.endsWith(`.css`);
};
var i = function(e, t, n) {
	if (t in e) return e[t];
	let r = n();
	if (!r) {
		e[t] = void 0;
		return;
	}
	let i = r.then(() => {
		e[t] = void 0;
	}, (n) => {
		throw e[t] = void 0, n;
	});
	return e[t] = i, i;
};
var a = function(a, o, s) {
	let c = Promise.resolve();
	if (o && o.length > 0) {
		let a, l = document.querySelector(`meta[property=csp-nonce]`), u = l?.nonce || l?.getAttribute(`nonce`);
		function d(e) {
			return Promise.all(e.map((e) => Promise.resolve(e).then((e) => ({
				status: `fulfilled`,
				value: e
			}), (e) => ({
				status: `rejected`,
				reason: e
			}))));
		}
		function f(e) {
			return import.meta.resolve ? new URL(import.meta.resolve(e)) : new URL(e, import.meta.url);
		}
		c = d(o.map((o) => {
			o = t(o, s);
			let c = f(o), l = r(c);
			return i(n, c.href, () => {
				if (a === void 0) {
					a = {
						all: /* @__PURE__ */ new Set(),
						styles: /* @__PURE__ */ new Set()
					};
					let e = document.getElementsByTagName(`link`);
					for (let t = e.length - 1; t >= 0; t--) {
						let n = e[t];
						a.all.add(n.href), n.rel === `stylesheet` && a.styles.add(n.href);
					}
				}
				if ((l ? a.styles : a.all).has(c.href)) return;
				let t = document.createElement(`link`);
				if (t.rel = l ? `stylesheet` : e, l || (t.as = `script`), t.crossOrigin = ``, t.href = c.href, u && t.setAttribute(`nonce`, u), document.head.appendChild(t), l) return new Promise((e, n) => {
					t.addEventListener(`load`, e), t.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${c}`)));
				});
			});
		}).filter((e) => e !== void 0));
	}
	function l(e) {
		let t = new Event(`vite:preloadError`, { cancelable: !0 });
		if (t.payload = e, window.dispatchEvent(t), !t.defaultPrevented) throw e;
	}
	return c.then((e) => {
		for (let t of e || []) t.status === `rejected` && l(t.reason);
		return a().catch(l);
	});
};
(function() {
	window.location.hostname === `localhost` || window.location.hostname === `127.0.0.1` || window.location.port === `3000` || window.__vite_plugin_react_preamble_installed__ ? a(() => __vitePreload(() => import("./main.js"), [], import.meta.url), __vite__mapDeps([0, 1]), import.meta.url).catch(function() {
		a(() => __vitePreload(() => import("./assets.js"), [], import.meta.url), [], import.meta.url);
	}) : a(() => __vitePreload(() => import("./assets.js"), [], import.meta.url), [], import.meta.url).catch(function() {
		a(() => __vitePreload(() => import("./main.js"), [], import.meta.url), __vite__mapDeps([0, 1]), import.meta.url);
	});
})();
