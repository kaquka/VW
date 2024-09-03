/*!
 * The Bronson adaptation for the Bluelabel Design
 * @version v15.7.1
 * @link https://bronson.vwfs.tools
 * @author Volkswagen Financial Services AG
 * @license LicenseRef-VWFS-Standard-License
 * Copyright Â©2024 Volkswagen Financial Services AG. All rights reserved.
 */
! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("smooth-scroll"), require("flickity"), require("flickity-fullscreen"), require("tippy.js"), require("flatpickr/dist/flatpickr"), require("flatpickr/dist/l10n/de"), require("@popperjs/core"), require("nouislider"), require("wnumb"), require("plyr/dist/plyr")) : "function" == typeof define && define.amd ? define(["smooth-scroll", "flickity", "flickity-fullscreen", "tippy.js", "flatpickr/dist/flatpickr", "flatpickr/dist/l10n/de", "@popperjs/core", "nouislider", "wnumb", "plyr/dist/plyr"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bronson = t(e.SmoothScroll, e.Flickity, e["flickity-fullscreen"], e.tippy, e.flatpickr, e.flatpickr, e.Popper, e.noUiSlider, e.wNumb, e.Plyr)
}(this, (function(e, t, s, i, n, o, r, l, a, c) {
	"use strict";
	const h = window.console || {},
		d = {};
	["log", "info", "warn", "error"].forEach((e => {
		h[e] ? h[e].bind ? d[e] = h[e].bind(h) : d[e] = function() {
			return h[e](...arguments)
		} : d[e] = function() {
			return h.log && h.log(...arguments)
		}
	}));
	const p = {
			logger: d,
			positionStickySupport: (() => {
				let e = null;
				return () => {
					if (null == e) {
						const t = document.createElement("a").style;
						t.cssText = "position:sticky;position:-webkit-sticky;", e = -1 !== t.position.indexOf("sticky")
					}
					return e
				}
			})(),
			findAncestor: (e, t) => e.closest(`.${t}`)
		},
		u = {};
	var m = {get(e) {
			const t = e ? u[e] : u;
			return t || d.warn(`component ${e} not found. Make sure to import and register it using Component.register()`), t
		},
		register(e, t) {
			const s = (e.componentName || e.name).toLowerCase();
			return t && !u[s] && d.error(`You forgot to register your ${s} component in advance.`), u[s] && u[s] !== e && d.error(`There is already a component registered with the same name ${s}.`, e, u[s]), e.componentName || d.info(`No explicit componentName set componentName. We use ${s} as componentName.`), e.componentName = s, u[s] = e, e
		},
		initAll() {
			Object.values(u).forEach((e => {
				e.init()
			}))
		}
	};
	const g = Array.prototype,
		f = function(e, t) {
			let s = e;
			if (!(this instanceof f)) return new f(s);
			if ("string" == typeof s) s = Array.from((t || document).querySelectorAll(s));
			else if ("function" == typeof s) return void(f.isReady ? s(f) : document.addEventListener("DOMContentLoaded", (() => {
				s(f)
			})));
			Array.isArray(s) || (s = s ? s.nodeName || !("length" in s) || s === window ? [s] : Array.from(s) : []), this.items = s, this.length = this.items.length || 0
		},
		b = f.prototype;
	Object.assign(f, {
		fn: b,
		isReady: "loading" !== document.readyState,
		event(e, t, s, i) {
			void 0 === t && (t = {}), void 0 === s && (s = !0);
			const n = document.createEvent("Event");
			return n.initEvent(e, s, i), n.detail = t, n
		}
	}), Object.assign(b, {
		getAll(e) {
			return this.pushStack(this.items.map((t => t[e])))
		},
		nth(e) {
			if (this.items[e]) return this.items[e];
			d.error(`No item at index ${e} found`)
		},
		set(e, t) {
			const s = "object" == typeof e;
			return this.items.forEach((i => {
				s ? Object.assign(i, e) : i[e] = t
			})), this
		},
		callAll(e) {
			for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
			const n = [];
			return this.items.forEach((t => {
				const i = t[e](...s);
				void 0 !== i && n.push(i)
			})), n.length ? this.pushStack(n) : this
		},
		getFirst(e) {
			const [t] = this.items;
			if (t) return t[e]
		},
		callFirst(e) {
			const [t] = this.items;
			if (t) {
				for (var s = arguments.length, i = new Array(s > 1 ? s - 1 : 0), n = 1; n < s; n++) i[n - 1] = arguments[n];
				return t[e](...i)
			}
		},
		pushStack(e) {
			const t = new f(e);
			return t.prevObject = this, t
		},
		eq(e) {
			return this.pushStack(this.items[e])
		},
		end() {
			return this.prevObject || this.constructor()
		},
		trigger() {
			return this.items.forEach((e => {
				const t = f.event(...arguments);
				e.dispatchEvent(t)
			}))
		},
		triggerFirst() {
			const e = f.event(...arguments),
				[t] = this.items;
			return t && t.dispatchEvent(e), e
		}
	}), Object.getOwnPropertyNames(g).forEach((e => {
		b[e] || "function" != typeof g[e] || (b[e] = function() {
			let t = this;
			const s = this.items[e](...arguments);
			return void 0 !== s && this.items !== s && (t = Array.isArray(s) ? this.pushStack(s) : s), t
		})
	})), f.isReady || document.addEventListener("DOMContentLoaded", (() => {
		f.isReady = !0
	})), [
		["on", "addEventListener"],
		["off", "removeEventListener"]
	].forEach((e => {
		let [t, s] = e;
		b[t] = function() {
			return this.callAll(s, ...arguments)
		}
	})), [
		["query", "querySelectorAll"]
	].forEach((e => {
		let [t, s] = e;
		b[t] = function() {
			let e;
			return this.items.forEach((t => {
				const i = t[s](...arguments);
				if (null != i) {
					const t = Array.from(i);
					t.length && (e ? t.forEach((t => {
						e.includes(t) || e.push(t)
					})) : e = t)
				}
			})), this.pushStack(e || [])
		}
	})), ["add", "remove", "toggle"].forEach((e => {
		b[`${e}Class`] = function() {
			return this.items.forEach((t => {
				t.classList[e](...arguments)
			})), this
		}
	})), b.prop = b.set, b.attr = function(e, t) {
		switch (typeof e) {
			case "string":
				if ("string" == typeof e) {
					if (1 === arguments.length) return this.call("getAttribute", e);
					null == t ? this.callAll("removeAttribute", e, t) : this.callAll("setAttribute", e, t)
				}
				break;
			case "object":
				for (const t in e) null == e[t] ? this.callAll("removeAttribute", t) : this.callAll("setAttribute", t, e[t])
		}
		return this
	};
	var v = "_bronsonComponent" + Date.now() * Math.random(),
		y = {
			legacyFix: !0
		};
	f.fn.component = function(e, t) {
		return this.pushStack(this.items.map((s => {
			let i = s[v];
			if (i || (i = {}, s[v] = i), !i[e]) {
				new(m.get(e))(s, t)
			}
			return i[e]
		})))
	};
	const S = /-([\da-z])/gi,
		C = function(e, t) {
			return t.toUpperCase()
		};
	const $ = {},
		{
			toString: w
		} = $,
		A = $.hasOwnProperty,
		E = A.toString,
		k = Object.getPrototypeOf,
		_ = E.call(Object);

	function x(e) {
		if (!e || "[object Object]" !== w.call(e)) return !1;
		const t = k(e);
		if (!t) return !0;
		const s = A.call(t, "constructor") && t.constructor;
		return "function" == typeof s && E.call(s) === _
	}

	function L(e) {
		let t, s, i, n, o, r;
		void 0 === e && (e = {});
		for (var l = arguments.length, a = new Array(l > 1 ? l - 1 : 0), c = 1; c < l; c++) a[c - 1] = arguments[c];
		const {
			length: h
		} = a;
		(!e || "object" != typeof e && "function" != typeof e) && (e = {});
		for (let l = 0; l < h; l++)
			if (t = a[l], null != t)
				for (s in t) i = e[s], n = t[s], e !== n && (n && (x(n) || (o = Array.isArray(n))) ? (o ? (o = !1, r = i && Array.isArray(i) ? i : []) : r = i && x(i) ? i : {}, e[s] = L(r, n)) : void 0 !== n && (e[s] = n));
		return e
	}
	class O {
		static extendDefaultOptions() {
			for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
			return L({}, this.defaultOptions, ...t)
		}
		static register(e, t) {
			return m.register(e || this, t)
		}
		static init(e) {
			this.register(null, !0), this.dataPrefix = `data-${this.componentName.toLowerCase()}-`, y.legacyFix && this.legacyFix(), null != this.componentSelector ? this.componentSelector && f(this.componentSelector).component(this.componentName, e) : d.error(`component class ${this.componentName} has no "componentSelector" defined.`)
		}
		static legacyFix() {}
		constructor(e, t) {
			this.element = e, this.$$element = f(e), e[v][this.constructor.componentName] = this, this.options = this.getOptions(t)
		}
		getOptions(e) {
			void 0 === e && (e = this.options || {});
			const t = {},
				{
					attributes: s
				} = this.element;
			for (let e = 0, i = s.length; e < i; e++) {
				const i = s[e].nodeName;
				if (i.startsWith(this.constructor.dataPrefix)) {
					const n = i.replace(this.constructor.dataPrefix, "").replace(S, C);
					try {
						t[n] = JSON.parse(s[e].nodeValue)
					} catch (i) {
						t[n] = s[e].nodeValue
					}
				}
			}
			return L({}, this.constructor.defaultOptions, e, t)
		}
		setOptions(e) {
			const t = this.getOptions();
			this.options = L({}, t, e)
		}
		query() {
			return this.$$element.query(...arguments)
		}
		trigger(e) {
			for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
			return this.$$element.triggerFirst(`bronson_${e}`, ...s)
		}
	}
	O.$$ = f, O.defaultOptions = {};
	var I = {},
		N = {
			$$: f,
			Component: O,
			ComponentRegister: m,
			options: y,
			libs: I
		};
	class T extends O {
		static init() {
			e ? this.initialized || (this.initialized = !0, e && (this.topScroll = new e("[data-scroll]", {
				updateURL: !1
			}), this.sectionScroll = new e("[data-scroll-section]"))) : console.warn('WARNING: You are using "Back To Top" without its necessary dependency "SmoothScroll".')
		}
	}
	T.componentName = "scroll", T.componentSelector = "[data-scroll], [data-scroll-section]", T.register(), e && (window.SmoothScroll = e, I.SmoothScroll = e);
	class j extends O {
		addTableARIA() {
			try {
				const e = this.element;
				e.setAttribute("role", "table");
				const t = e.querySelectorAll("thead, tbody, tfoot");
				for (let e = 0; e < t.length; e++) {
					t[e].setAttribute("role", "rowgroup");
					const s = t[e].querySelectorAll("tr");
					for (let e = 0; e < s.length; e++) {
						s[e].setAttribute("role", "row");
						const t = s[e].querySelectorAll("td");
						for (let e = 0; e < t.length; e++) t[e].setAttribute("role", "cell");
						const i = s[e].querySelectorAll("th");
						for (let e = 0; e < i.length; e++) i[e].matches("th[scope=row], th[scope=rowgroup]") ? i[e].setAttribute("role", "rowheader") : i[e].setAttribute("role", "columnheader")
					}
				}
			} catch (e) {
				console.log(`addTableARIA(): ${e}`)
			}
		}
		constructor() {
			super(...arguments), this.addTableARIA()
		}
	}
	j.componentName = "tables-aria", j.componentSelector = ".js-table-responsive > table", j.register();
	class P extends O {
		tableSticky() {
			function e(e, t) {
				if (!e || !t) return;
				! function() {
					const e = document.querySelector('meta[name="viewport"]');
					if (e) {
						const t = e ? .getAttribute("content");
						t ? .includes("minimum-scale") || e.setAttribute("content", `${t}, minimum-scale=1`)
					} else {
						const e = document.createElement("meta");
						e.name = "viewport", e.content = "width=device-width, initial-scale=1, minimum-scale=1", document.head.appendChild(e)
					}
				}();
				const s = e.getBoundingClientRect().width,
					i = t.getBoundingClientRect().width;
				e.classList.toggle("has-scroll-overflow", i > s), document.documentElement.style.removeProperty("--scroll-width"), document.documentElement.classList.remove("has-overflow-clip");
				const {
					scrollWidth: n
				} = document.body;
				document.documentElement.style.setProperty("--scroll-width", `${n}px`), document.documentElement.classList.add("has-overflow-clip")
			}

			function t() {
				document.documentElement.style.setProperty("--scroll-offset", `${window.scrollX}px`)
			}
			try {
				const s = this.element,
					i = s.querySelector("table");
				e(s, i);
				let n, o;
				new ResizeObserver((() => {
					e(s, i)
				})).observe(i), window.addEventListener("resize", (() => {
					cancelAnimationFrame(n), n = requestAnimationFrame((() => {
						e(s, i)
					}))
				}), {
					passive: !0
				}), window.addEventListener("scroll", (() => {
					cancelAnimationFrame(o), o = requestAnimationFrame(t)
				}), {
					passive: !0
				});
				Array.from(s.querySelectorAll("thead tr > *")).forEach((e => {
					new IntersectionObserver((e => {
						e.forEach((e => {
							const t = s.getBoundingClientRect().top,
								i = e.boundingClientRect.top;
							let n = i < 0;
							t - i < 0 && (n = t - i < 0), s.classList.toggle(this.options.hasStickyHeadClass, n)
						}))
					}), this.options.observerOptions).observe(e)
				}));
				Array.from(s.querySelectorAll("tr > :first-child")).forEach((e => {
					new IntersectionObserver((e => {
						e.forEach((e => {
							const t = s.getBoundingClientRect().left,
								i = e.boundingClientRect.left;
							let n = i < 0;
							n = t + (parseFloat(window.getComputedStyle(s).marginLeft) + parseFloat(window.getComputedStyle(s.querySelector("table")).marginLeft)) - i != 0 || n, s.classList.toggle(this.options.hasStickyColumnClass, n)
						}))
					}), this.options.observerOptions).observe(e)
				}))
			} catch (e) {
				console.log(`tableSticky(): ${e}`)
			}
		}
		constructor() {
			super(...arguments), this.tableSticky()
		}
	}
	P.componentName = "tables-sticky", P.componentSelector = ".c-table--sticky-head, .c-table--sticky-column", P.defaultOptions = {
		hasStickyHeadClass: "has-sticky-head",
		hasStickyColumnClass: "has-sticky-column",
		observerOptions: {
			threshold: [1]
		}
	}, P.register();
	const q = "float-grid",
		D = "data-float-grid-area",
		F = getComputedStyle(document.documentElement).getPropertyValue("--float-grid-areas").trim().split(" ");
	document.addEventListener("DOMContentLoaded", (() => {
		! function() {
			const e = document.createElement("div");
			e.id = q, e.className = "o-float-grid", document.body.prepend(e), F.forEach((t => {
				e.insertAdjacentHTML("beforeend", `<div class="o-float-grid__area"  ${D}="${t}"></div>`)
			}))
		}();
		const e = getComputedStyle(document.getElementById(q)).getPropertyValue("--float-grid-selectors").trim().split(",").filter(Boolean).concat(".sg-float-grid-item").map((e => e.trim())).filter((function(e) {
			if (/[^#.\\>+~[\]:()*-_@0-9a-zA-Z\s]+/.test(e)) throw new TypeError(`Float Grid: Invalid characters in CSS selector ${e}`);
			return !0
		})).join(", ");

		function t(e) {
			const t = window.getComputedStyle(e).getPropertyValue("--float-grid-area").trim();
			if (t && "false" !== t) {
				const s = `[${D}="${t}"]`,
					i = document.querySelector(s);
				if (!i) throw new TypeError(`Float Grid: Area ${s} does not exist.`);
				i ? .append(e)
			}
		}
		e && document.querySelectorAll(e).forEach((e => t(e))),
			function() {
				const e = document.querySelector("body"),
					s = {
						childList: !0,
						subtree: !0
					},
					i = function(e) {
						e.forEach((e => {
							if ("childList" === e.type) {
								const [s] = e.addedNodes;
								1 !== s ? .nodeType || s ? .parentElement ? .attributes[D] || t(s)
							}
						}))
					};
				if (document.querySelector(".js-enable-3rd-party-float-grid")) {
					new MutationObserver(i).observe(e, s)
				}
			}()
	}));
	class V extends O {
		constructor() {
			super(...arguments), window.ResizeObserver && (this.observer = new ResizeObserver(this.observeEntries.bind(this)), this.observer.observe(this.element))
		}
		observeEntries(e) {
			e.forEach((e => {
				this.setOffsetHeight(e.target)
			}))
		}
		setOffsetHeight(e) {
			document.documentElement.style.setProperty("--bron-sticky-offset", `${e.offsetHeight}px`)
		}
	}
	var M, H;
	V.componentName = "resize-observer", V.componentSelector = "\n        .c-floating-bar\n    ", V.defaultOptions = {}, V.register();
	class z extends O {
		static convertToCamelCase(e) {
			return e.split(/[- _]+/).reverse().reduce(((e, t) => `${t}${e.charAt(0).toUpperCase()+e.slice(1)}`), "")
		}
		constructor() {
			super(...arguments), this.identifier = this.element.getAttribute("id"), this.setupTriggers(), this.element.setAttribute("tabindex", -1), this.$$closers = this.query(this.options.closeSelector), this.$$element.on(this.options.openEventName, (() => {
				this.open()
			})), this.$$element.on(this.options.closeEventName, (() => {
				this.close()
			})), this.$$closers.on("click", (e => {
				e.preventDefault(), this.triggerClose()
			})), this.closeOnEsc = this.closeOnEsc.bind(this)
		}
		setupTriggers() {
			document.addEventListener("click", (e => {
				const t = e.target;
				if (t && t.matches(this.options.triggerSelector)) {
					e.preventDefault();
					const t = z.convertToCamelCase(this.options.componentName),
						s = e.target.dataset[t],
						i = document.querySelector(`#${s}`);
					i && i.dispatchEvent(new Event(this.options.openEventName))
				}
			}))
		}
		triggerClose() {
			this.element.dispatchEvent(new Event(this.options.closeEventName))
		}
		initKeyboardTriggers() {
			window.removeEventListener("keyup", this.closeOnEsc, !1), window.addEventListener("keyup", this.closeOnEsc, !1)
		}
		closeOnEsc(e) {
			let {
				keyCode: t,
				defaultPrevented: s,
				target: i
			} = e;
			27 !== t || s || i.matches("input, select, textarea, .c-input") || this.triggerClose()
		}
		setOverlayFocus() {
			const {
				autofocus: e
			} = this.options;
			if (!e) return;
			const t = this.element.querySelector(e);
			if (t) {
				this._outsideFocus = document.activeElement, t.tabIndex < 0 && !t.getAttribute("tabindex") && (t.setAttribute("tabindex", -1), t.classList.add("is-script-focusable"));
				try {
					t.focus()
				} catch (e) {}
			}
		}
		open() {
			this.toggle(!0), this.initKeyboardTriggers(), this.setOverlayFocus()
		}
		close() {
			this.toggle(!1), window.removeEventListener("keyup", this.closeOnEsc, !1);
			try {
				this._outsideFocus.focus()
			} catch (e) {}
			this._outsideFocus = null
		}
		toggle(e) {
			this.$$element.attr("aria-hidden", !e)
		}
	}
	M = z, z.componentName = "overlay", z.componentSelector = ".c-overlay", z.defaultOptions = M.extendDefaultOptions({
		componentName: M.componentName,
		triggerSelector: ".js-overlay-trigger",
		closeSelector: ".js-overlay-close",
		autofocus: ".js-overlay-autofocus",
		openEventName: "bronson_overlay_open",
		closeEventName: "bronson_overlay_close"
	});
	class R extends z {
		constructor() {
			super(...arguments), this.element.classList.contains("c-interaction-layer--modal") && this.options.closeOnBackdrop && this.element.addEventListener("click", (e => {
				"false" === this.element.getAttribute("aria-hidden") && e.target.matches(R.componentSelector) && this.close()
			}))
		}
	}
	H = R, R.componentName = "interaction-layer", R.componentSelector = ".js-interaction-layer", R.defaultOptions = H.extendDefaultOptions({
		componentName: H.componentName,
		triggerSelector: ".js-interaction-layer-trigger",
		closeSelector: ".js-interaction-layer-close",
		autofocus: ".js-interaction-layer-autofocus",
		openEventName: "bronson_interaction-layer_open",
		closeEventName: "bronson_interaction-layer_close",
		closeOnBackdrop: !1
	}), R.register();
	class W extends O {
		constructor() {
			super(...arguments), this.$$element.on("submit", this.onSubmit.bind(this)), this.$$element.on("reset", this.onReset.bind(this)), this.submitButton = this.element.querySelector(".js-inline-editable-submit"), this.editButton = this.element.querySelector(".js-inline-editable-trigger"), this.editButton.addEventListener("click", this.onClick.bind(this)), this.input = this.element.querySelector(".js-inline-editable-input"), this.addon = this.element.querySelector(".c-input__addon"), this.input.addEventListener("click", this.onClick.bind(this)), this.input.addEventListener("input", this.onChange.bind(this)), this.initialValue = this.input.value, this.setInputSize(this.input.value)
		}
		onClick() {
			"false" !== this.element.getAttribute("aria-hidden") && (this.element.setAttribute("aria-hidden", "false"), this.$$element.off("click", this.onClick), this.input.focus())
		}
		onChange() {
			this.setInputSize(this.input.value), this.initialValue === this.input.value ? this.submitButton.setAttribute("disabled", !0) : this.submitButton.removeAttribute("disabled")
		}
		onSubmit(e) {
			e.preventDefault(), this.element.setAttribute("aria-hidden", !0), this.initialValue = this.input.value, this.input.defaultValue = this.initialValue, this.submitButton.setAttribute("disabled", !0), this.input.blur()
		}
		onReset() {
			this.setInputSize(this.initialValue), this.element.setAttribute("aria-hidden", !0), this.input.blur()
		}
		setInputSize(e) {
			const t = e.replaceAll(" ", " ");
			this.input.parentElement.setAttribute("data-inline-editable-size", t)
		}
	}
	W.componentName = "inline-editable", W.componentSelector = ".js-inline-editable", W.register();
	class B extends O {
		constructor() {
			super(...arguments), this.noFx = !0;
			const {
				options: e
			} = this;
			this.panelStateClasses = [e.panelStateCollapsedClass, e.panelStateCollapsingClass, e.panelStateExpandedClass, e.panelStateExpandingClass], this.element.classList.contains("js-is-fx") && (e.animateHeightClass = "is-closed"), e.closedClass && (e.toggleClass = e.closedClass), requestAnimationFrame((() => {
				const {
					animateHeightClass: t,
					toggleClass: s,
					panelStateCollapsedClass: i,
					panelStateCollapsingClass: n,
					panelStateExpandedClass: o,
					panelStateExpandingClass: r
				} = e;
				t ? this.element.classList.add("js-is-fx") : (this.element.addEventListener("animationstart", (() => {
					this.element.classList.remove(...this.panelStateClasses), "true" === this.element.getAttribute("aria-hidden") ? this.element.classList.add(n) : this.element.classList.add(r)
				})), this.element.addEventListener("animationend", (() => {
					this.element.classList.remove(...this.panelStateClasses), "true" === this.element.getAttribute("aria-hidden") ? this.element.classList.add(i) : this.element.classList.add(o)
				}))), this.isCollapsed && (t || s) && this.collapse(!0), requestAnimationFrame((() => {
					this.noFx = !1, this.$$element.addClass("js-is-ready")
				}))
			}))
		}
		_change(e, t) {
			void 0 === t && (t = this.noFx);
			const {
				animateHeightClass: s,
				toggleClass: i,
				closedClass: n,
				panelStateCollapsedClass: o,
				panelStateCollapsingClass: r,
				panelStateExpandedClass: l,
				panelStateExpandingClass: a,
				useInert: c
			} = this.options, h = this.isCollapsed !== e;
			if (c && (e ? this.element.setAttribute("inert", "") : this.element.removeAttribute("inert")), n || this.$$element.attr("aria-hidden", e), i && this.$$element.toggleClass(i, e), s && this.element.classList.contains(s) !== e) {
				const i = e ? 0 : "auto";
				this.$$element.toggleHeightTransition(i, {
					className: s,
					force: e,
					noFx: t
				}, (e => {
					e.classList.remove(...this.panelStateClasses), e.style.setProperty("display", ""), i ? e.classList.add(a) : e.classList.add(r)
				}), (e => {
					e.classList.remove(...this.panelStateClasses), i ? (e.style.setProperty("display", ""), e.classList.add(l)) : (e.style.setProperty("display", "none"), e.classList.add(o))
				}))
			}
			h && this.trigger(this.options.panelChangeEvent)
		}
		expand(e) {
			this._change(!1, e)
		}
		collapse(e) {
			this._change(!0, e)
		}
		toggle(e) {
			return this._change(!this.isCollapsed, e), this.isCollapsed
		}
		get isCollapsed() {
			const {
				closedClass: e
			} = this.options;
			return e ? this.element.classList.contains(e) : this.element.getAttribute("aria-hidden") === String(!0)
		}
		set isCollapsed(e) {
			this._change(e)
		}
	}
	B.componentName = "panel", B.componentSelector = ".js-panel", B.defaultOptions = {
		animateHeightClass: "",
		toggleClass: "",
		closedClass: "",
		useInert: !0,
		panelChangeEvent: "panelchanged",
		panelStateCollapsedClass: "is-collapsed",
		panelStateCollapsingClass: "is-collapsing",
		panelStateExpandedClass: "is-expanded",
		panelStateExpandingClass: "is-expanding"
	}, B.register();
	class G extends O {
		constructor() {
			super(...arguments), this.$$btnWrapper = this.options.btnWrapper ? this.$$element.callAll("closest", this.options.btnWrapper) : G.$$([]), ["buttonAction", "updateState"].forEach((e => {
				this[e] = this[e].bind(this)
			})), this.initPanel(this.options.target), this.$$element.toggleClass("is-panelbutton-opener", "expand" === this.options.action), this.$$clickElement = this.options.btnWrapperClick && this.$$btnWrapper.length ? this.$$btnWrapper : this.$$element, this.$$clickElement.on("click", (e => {
				e ? .preventDefault(), this.buttonAction(e)
			})), this.$$clickElement.on("keyup", (e => {
				const {
					code: t
				} = e;
				"Enter" !== t && "Space" !== t || (e ? .preventDefault(), this.buttonAction(e))
			}))
		}
		initPanel(e) {
			e && (this.$$panel = G.$$(e || []), this.updateState(), this.$$panel.on(`bronson_${this.options.panelChangeEvent}`, this.updateState))
		}
		updateState() {
			const e = !this.$$panel.component("panel").getFirst("isCollapsed");
			this.$$btnWrapper.toggleClass("is-active", e), "collapse" !== this.options.action && this.$$element.attr("aria-expanded", e), this.options.tabbedInterface && "collapse" !== this.options.action && this.$$element.attr("aria-selected", e), "expand" === this.options.action && this.$$element.attr({
				tabindex: e ? -1 : null
			})
		}
		buttonAction(e) {
			-1 !== e ? .pointerId && this.$$panel.component("panel").callAll(this.options.action)
		}
	}
	G.componentName = "panelbutton", G.componentSelector = ".js-panelbutton", G.defaultOptions = {
		target: "",
		action: "toggle",
		btnWrapper: "",
		panelChangeEvent: "panelchanged"
	}, G.register();
	const K = `_bronson_transitionAuto${Date.now()}`,
		U = "transition" in document.createElement("i").style;

	function Y(e) {
		e[K] && (e[K].endEvent && e.removeEventListener("transitionend", e[K].endEvent), e[K].timer && cancelAnimationFrame(e[K].timer), e[K] = null)
	}

	function X(e, t) {
		t && (t.className ? e.classList.toggle(t.className, t.force) : t.attr ? null !== t.value ? e.setAttribute(t.attr, t.value) : e.removeAttribute(t.attr) : "function" == typeof t && t(e))
	}

	function J(e, t, s, i, n, o) {
		void 0 === s && (s = "0px"), void 0 === i && (i = "height"), void 0 === n && (n = () => {}), void 0 === o && (o = () => {}), Y(e), "auto" === s ? function(e, t, s, i, n) {
			if (void 0 === s && (s = "height"), void 0 === i && (i = () => {}), void 0 === n && (n = () => {}), U) {
				const o = t && t.noFx,
					r = "width" === s ? "overflowX" : "overflowY";
				o && (e.style.transition = "none"), e[K] = {
					endEvent(t) {
						t.propertyName === s && t.target === e && (Y(e), n(e), e.style[s] = "", e.style[r] = "")
					},
					timer: requestAnimationFrame((() => {
						if (X(e, t), o) e[K].timer = requestAnimationFrame((() => {
							Y(e), n(e), e.style.transition = "", e.style.visibility = "", e.style[s] = "", e.style[r] = ""
						}));
						else {
							i(e);
							const t = e["width" === s ? "scrollWidth" : "scrollHeight"];
							e.style[s] = `${t}px`, e.style[r] = "hidden", e.style.visibility = "", e.addEventListener("transitionend", e[K].endEvent)
						}
					}))
				}
			} else X(e, t)
		}(e, t, i, n, o) : function(e, t, s, i, n, o) {
			if (void 0 === i && (i = "height"), void 0 === n && (n = () => {}), void 0 === o && (o = () => {}), U) {
				const r = e["width" === i ? "offsetWidth" : "offsetHeight"],
					l = s && s.noFx,
					a = "width" === i ? "overflowX" : "overflowY",
					c = !(s.noHide || t && "0px" !== t),
					h = () => {
						e.style.transition = "", e.style[i] = t, e.style.visibility = c ? "hidden" : ""
					};
				l && (e.style.transition = "none"), e[K] = {
					endEvent(t) {
						t.propertyName === i && t.target === e && (Y(e), o(e))
					},
					timer: requestAnimationFrame((() => {
						l ? e[K].timer = requestAnimationFrame((() => {
							Y(e), o(e), h(), X(e, s), e.style[a] = "hidden"
						})) : (e.style.transition = "none", e.style[i] = `${r}px`, e[K].timer = requestAnimationFrame((() => {
							n(e), e.style[a] = "hidden", h(), e.addEventListener("transitionend", e[K].endEvent), X(e, s)
						})))
					}))
				}
			} else requestAnimationFrame((() => {
				X(e, s)
			}))
		}(e, s, t, i, n, o)
	}
	f.fn.toggleHeightTransition = function(e, t, s, i) {
		return void 0 === s && (s = () => {}), void 0 === i && (i = () => {}), this.forEach((n => {
			J(n, t, e, "height", s, i)
		}))
	}, f.fn.toggleAutoHeightTransition = function(e, t) {
		return this.forEach((s => {
			const i = s.classList.contains(e);
			J(s, {
				className: e,
				force: !i,
				noFx: t
			}, i ? "auto" : 0, "height")
		}))
	}, f.fn.toggleWidthTransition = function(e, t) {
		return this.forEach((s => {
			J(s, t, e, "width")
		}))
	}, f.fn.toggleAutoWidthTransition = function(e, t) {
		return this.forEach((s => {
			const i = s.classList.contains(e);
			J(s, {
				className: e,
				force: !i,
				noFx: t
			}, i ? "auto" : 0, "width")
		}))
	};
	class Z extends O {
		static addElementPlugin(e, t) {
			Object.assign(Z.defaultOptions, e), Object.keys(e).forEach((e => {
				Z.elementPlugins.push({
					selectorName: e,
					init: t
				})
			}))
		}
		constructor() {
			super(...arguments), this.element.classList.contains("js-is-fx") && (this.options.animateHeightClass = "is-closed"), this._initElements(), requestAnimationFrame((() => {
				this.options.animateHeightClass && this.element.classList.add("js-is-fx"), requestAnimationFrame((() => {
					this.$$element.addClass("js-is-ready")
				}))
			}))
		}
		_getPanelButtonOptions(e) {
			const {
				options: {
					btnAction: t,
					btnWrapper: s,
					btnWrapperClick: i,
					panelChangeEvent: n,
					tabbedInterface: o
				}
			} = this;
			let r = this.$$panels.items[e];
			return void 0 === r && ([r] = this.$$panels.items), {
				action: t,
				btnWrapper: s,
				btnWrapperClick: i,
				target: r,
				panelChangeEvent: n,
				tabbedInterface: o
			}
		}
		_getDefaultSelected() {
			const {
				defaultSelectedIndex: e
			} = this.options;
			let t = this.$$buttons.findIndex((e => e.matches('[aria-expanded="true"]')));
			return -1 === t && (t = this.$$panels.findIndex((e => e.matches('[aria-hidden="false"]')))), -1 === t && -1 !== e && (t = e), t
		}
		filterNesting(e) {
			const {
				checkNesting: t
			} = this.options;
			if (t) {
				const s = "string" == typeof t ? t : this.constructor.componentSelector;
				return e.filter((e => e.closest(s) === this.element))
			}
			return e
		}
		_initElements() {
			const {
				btnSelector: e,
				panelSelector: t,
				defaultCollapsed: s,
				animateHeightClass: i,
				panelToggleClass: n,
				panelClosedClass: o,
				panelChangeEvent: r,
				useInert: l
			} = this.options;
			let a;
			this.$$panels = this.filterNesting(this.query(t)), this.$$buttons = this.filterNesting(this.query(e)), s && (a = this._getDefaultSelected()), this.$$panels.component("panel", {
				animateHeightClass: i,
				toggleClass: n,
				closedClass: o,
				panelChangeEvent: r,
				useInert: l
			}), this.$$buttons.forEach(((e, t) => {
				Z.$$(e).component("panelbutton", this._getPanelButtonOptions(t))
			})), Z.elementPlugins.forEach((e => {
				const t = this.options[e.selectorName] || Z.defaultOptions[e.selectorName];
				this.query(t).forEach((t => {
					e.init(t, this)
				}))
			})), this._initEvents(), null != a && this.collapseAll(a, !0)
		}
		_initEvents() {
			const {
				multiple: e,
				parentToggleClass: t
			} = this.options;
			e || this.$$panels.on(`bronson_${this.options.panelChangeEvent}`, (e => {
				let {
					currentTarget: t
				} = e;
				Z.$$(t).component("panel").getFirst("isCollapsed") || (this._noIndexHandle = !0, this.collapseAll(t, !1), this._noIndexHandle = !1)
			})), t && this.$$panels.on(`bronson_${this.options.panelChangeEvent}`, (() => {
				this.$$element.toggleClass(t)
			}))
		}
		_getIndexFromElement(e) {
			void 0 === e && (e = -1);
			let t = e;
			return "object" == typeof e && e && (t = this.$$panels.findIndex((t => e === t)), -1 === t && (t = this.$$buttons.findIndex((t => e === t)))), t
		}
		_callPanelMethod(e) {
			for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
			return this.$$panels.eq(this._getIndexFromElement(e)).component("panel").callFirst(...s)
		}
		collapseAll(e, t) {
			const s = this._getIndexFromElement(e);
			this.$$panels.component("panel").forEach(((e, i) => {
				const n = i !== s;
				this._noIndexHandle && !n || e[n ? "collapse" : "expand"](t)
			}))
		}
		expand(e) {
			for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
			this._callPanelMethod(e, "expand", ...s)
		}
		collapse(e) {
			for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
			this._callPanelMethod(e, "collapse", ...s)
		}
		toggle(e) {
			for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
			return this._callPanelMethod(e, "toggle", ...s)
		}
		get selectedIndex() {
			return this.$$panels.findIndex((e => !Z.$$(e).component("panel").getFirst("isCollapsed")))
		}
		set selectedIndex(e) {
			this._callPanelMethod(e, "expand")
		}
	}
	Z.componentName = "panelgroup", Z.componentSelector = ".js-panelgroup", Z.defaultOptions = {
		btnSelector: ".js-panelgroup__button",
		panelSelector: ".js-panelgroup__panel",
		multiple: !1,
		btnAction: "toggle",
		btnWrapper: "",
		btnWrapperClick: !1,
		defaultSelectedIndex: -1,
		defaultCollapsed: !0,
		checkNesting: !1,
		animateHeightClass: "",
		panelToggleClass: "",
		panelClosedClass: "",
		parentToggleClass: "",
		panelChangeEvent: "panelchanged",
		tabbedInterface: !1
	}, Z.elementPlugins = [], Z.register();
	class Q {
		constructor(e, t) {
			if (!t) throw new TypeError("AnalyticsHelper â†’  At least a target and a type to operate on are required.");
			if (this.target = e, this.states = Q.trackingStateEnum[t], !this.states) throw new TypeError(`AnalyticsHelper â†’ No state informations were found for type: ${t}`);
			this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.unsetState = this.unsetState.bind(this)
		}
		getState() {
			this.target.attr(Q.trackingStateAttr)
		}
		setState() {
			this.target.attr(Q.trackingStateAttr, this.states.active)
		}
		unsetState() {
			this.target.attr(Q.trackingStateAttr, this.states.inactive)
		}
	}
	Q.trackingStateAttr = "data-tr-state", Q.trackingComponentAttr = "data-tr-component", Q.trackingStateEnum = Object.freeze({
		slideable: {
			active: "Moved",
			inactive: "Unmoved"
		},
		collapsible: {
			active: "Expanded",
			inactive: "Collapsed"
		}
	});
	class ee extends Z {
		constructor() {
			super(...arguments), this.analyticsHelper = new Q(this.$$element, "collapsible"), this.$$panels.on("bronson_panelchanged", this.updateTrackingState.bind(this)), this.$$panels.forEach((e => {
				e ? .matches('[aria-hidden="true"]') ? e ? .classList.add("is-collapsed") : e ? .classList.add("is-expanded")
			})), this.$$panels.on("transitionend", (e => {
				let {
					target: t
				} = e;
				const s = t ? .previousElementSibling ? .closest(".js-accordion__title"),
					{
						multiple: i
					} = this.options;
				t.hasAttribute("aria-hidden") && (t.matches('[aria-hidden="true"]') ? t.classList.add("is-collapsed") : t.classList.add("is-expanded")), i || t.matches('[aria-hidden="true"]') || ee.isInViewport(s) || s ? .scrollIntoView(!0)
			})), this.$$panels.on("transitionstart", (e => {
				let {
					target: t
				} = e;
				t.matches('[aria-hidden="true"]') ? t.classList.remove("is-expanded") : t.matches('[aria-hidden="false"]') && t.classList.remove("is-collapsed")
			}))
		}
		updateTrackingState() {
			this.$$panels.every((e => "true" === e.getAttribute("aria-hidden"))) ? this.analyticsHelper.unsetState() : this.analyticsHelper.setState()
		}
		static isInViewport(e) {
			const {
				top: t,
				left: s,
				bottom: i
			} = e ? .getBoundingClientRect() ? ? {}, {
				innerWidth: n,
				innerHeight: o
			} = window;
			return t >= 0 && s >= 0 && s <= n && i <= o
		}
	}
	ee.componentName = "accordion", ee.componentSelector = ".js-accordion", ee.defaultOptions = Z.extendDefaultOptions({
		btnSelector: ".js-accordion__title-label",
		panelSelector: ".js-accordion__panel",
		btnWrapper: ".js-accordion__title",
		btnWrapperClick: !0,
		btnAction: "toggle"
	}), ee.register();
	class te extends O {
		constructor() {
			super(...arguments), this.$$subTree = this.$$element.query(this.options.subtreeSelector), this.$$treeItems = this.$$element.query(this.options.treeItemSelector), this.$$treeRoot = this.$$element, this.selectedTreeItem = null, this.setupAriaAttributes(), this.$$treeItems.items.length && (this.$$treeItems.forEach((e => e.setAttribute("tabindex", -1))), this.$$treeItems.items[0].setAttribute("tabindex", 0), this.$$treeItems.on("click", this.handleClick.bind(this)), this.$$treeItems.on("keydown", this.handleKeyNavigation.bind(this)), this.$$treeItems.on("focus", this.handleFocus.bind(this)), this.$$treeItems.on("blur", this.handleBlur.bind(this)), this.$$treeItems.on("mouseover", this.handleMouse.bind(this)), this.$$treeItems.on("mouseout", this.handleMouse.bind(this)))
		}
		setupAriaAttributes() {
			this.$$treeRoot.attr("role", "tree"), this.$$subTree.forEach((e => e.setAttribute("role", "group")));
			const e = this.$$treeRoot.query("[role=group]");
			this.$$treeItems.forEach((t => {
				const s = t.parentElement.children,
					i = [].indexOf.call(s, t) + 1,
					n = t.querySelector("[role=group]");
				t.setAttribute("role", "treeitem"), t.setAttribute("aria-level", 1), t.setAttribute("aria-posinset", i), t.setAttribute("aria-setsize", s.length), n && t.setAttribute("aria-expanded", !1), e.forEach(((e, s) => {
					e.contains(t) && t.setAttribute("aria-level", s + 2)
				}))
			}))
		}
		handleClick(e) {
			e.preventDefault(), e.stopPropagation();
			const {
				target: t
			} = e, s = t.closest(this.options.treeItemSelector);
			te.isExpandable(s) && !te.isDisabled(s) && (this.selectItem(s), te.isExpanded(s) ? this.collapseItem() : this.expandItem())
		}
		handleMouse(e) {
			e.preventDefault(), e.stopPropagation();
			const {
				target: t,
				type: s
			} = e, i = t.closest(this.options.treeItemSelector);
			te.isDisabled(i) || ("mouseover" === s ? i.classList.add(this.options.treeItemHoverClass) : "mouseout" === s && i.classList.remove(this.options.treeItemHoverClass))
		}
		handleKeyNavigation(e) {
			const {
				code: t
			} = e;
			switch (t) {
				case "ArrowLeft":
					e.stopPropagation(), e.preventDefault(), this.handleLeftKey();
					break;
				case "ArrowUp":
					e.stopPropagation(), e.preventDefault(), this.handleUpKey();
					break;
				case "ArrowRight":
					e.stopPropagation(), e.preventDefault(), this.handleRightKey();
					break;
				case "ArrowDown":
					e.stopPropagation(), e.preventDefault(), this.handleDownKey();
					break;
				case "Enter":
					this.handleEnterKey()
			}
		}
		collapseAll() {
			this.$$treeItems.filter((e => !te.isDisabled(e))).forEach((e => e.setAttribute("aria-expanded", "false")))
		}
		expandAll() {
			this.$$treeItems.filter((e => !te.isDisabled(e))).forEach((e => e.setAttribute("aria-expanded", "true")))
		}
		collapseItem() {
			te.isDisabled(this.selectedTreeItem) || this.selectedTreeItem.setAttribute("aria-expanded", "false")
		}
		expandItem() {
			te.isDisabled(this.selectedTreeItem) || this.selectedTreeItem.setAttribute("aria-expanded", "true")
		}
		selectItem(e, t) {
			void 0 === t && (t = !0), e && (this.$$treeItems.forEach((e => e.setAttribute("tabindex", -1))), this.selectedTreeItem = e, this.selectedTreeItem.classList.add(this.options.treeItemSelectedClass), this.selectedTreeItem.setAttribute("tabindex", 0), te.isInViewport(this.selectedTreeItem) || this.selectedTreeItem.scrollIntoView(t))
		}
		deselectItem(e) {
			e && (e.classList.remove(this.options.treeItemSelectedClass), e.classList.remove(this.options.treeItemHoverClass), this.selectedTreeItem = null)
		}
		selectNextSibling() {
			const e = this.selectedTreeItem.nextElementSibling;
			if (e) this.deselectItem(this.selectedTreeItem), this.selectItem(e, !1);
			else {
				const e = this.selectedTreeItem.parentElement.parentElement,
					t = e.nextElementSibling;
				t ? (this.deselectItem(this.selectedTreeItem), this.selectItem(t, !1)) : (this.deselectItem(this.selectedTreeItem), this.selectItem(e, !1), this.selectNextSibling())
			}
		}
		selectPreviousSibling() {
			const e = this.selectedTreeItem.previousElementSibling;
			if (e)
				if (te.isExpanded(e)) {
					const {
						treeItemSelector: t,
						subtreeSelector: s
					} = this.options, i = `[aria-expanded=true] > ${s} >  ${t}:last-child`, n = e.querySelectorAll(i), o = n[n.length - 1];
					o && (this.deselectItem(this.selectedTreeItem), this.selectItem(o))
				} else this.deselectItem(this.selectedTreeItem), this.selectItem(e);
			else this.selectParent()
		}
		selectParent() {
			const e = this.selectedTreeItem.parentElement.parentElement;
			e && !te.isRootLevel(this.selectedTreeItem) && (this.deselectItem(this.selectedTreeItem), this.selectItem(e))
		}
		selectFirstChild() {
			const {
				treeItemSelector: e,
				subtreeSelector: t
			} = this.options, s = `${t} ${e}:first-child`, i = this.selectedTreeItem.querySelector(s);
			i && (this.deselectItem(this.selectedTreeItem), this.selectItem(i))
		}
		selectLastChild() {
			const {
				treeItemSelector: e,
				subtreeSelector: t
			} = this.options, s = `${t} ${e}:last-child`, i = this.selectedTreeItem.querySelector(s);
			i && (this.deselectItem(this.selectedTreeItem), this.selectItem(i, !1))
		}
		handleFocus(e) {
			let {
				target: t
			} = e;
			if (!t) return;
			const s = t.closest(this.options.treeItemSelector);
			te.isExpanded(s) || this.selectItem(s)
		}
		handleBlur(e) {
			let {
				target: t
			} = e;
			if (!t) return;
			const s = t.closest(this.options.treeItemSelector);
			document.activeElement !== s && this.deselectItem(s)
		}
		handleDownKey() {
			te.isRootLevel(this.selectedTreeItem) && !this.selectedTreeItem.nextElementSibling || (te.isExpanded(this.selectedTreeItem) ? this.selectFirstChild() : this.selectNextSibling(), te.isInViewport(this.selectedTreeItem) || this.selectedTreeItem.scrollIntoView(!1))
		}
		handleEnterKey() {
			te.isExpandable(this.selectedTreeItem) && (te.isExpanded(this.selectedTreeItem) ? this.collapseItem() : this.expandItem())
		}
		handleUpKey() {
			this.selectedTreeItem.previousElementSibling ? this.selectPreviousSibling() : te.isRootLevel(this.selectedTreeItem) || this.selectParent(), te.isInViewport(this.selectedTreeItem) || this.selectedTreeItem.scrollIntoView(!0)
		}
		handleRightKey() {
			te.isExpandable(this.selectedTreeItem) && (te.isExpanded(this.selectedTreeItem) ? this.selectFirstChild() : this.expandItem())
		}
		handleLeftKey() {
			te.isExpanded(this.selectedTreeItem) ? this.collapseItem() : this.selectParent(), te.isInViewport(this.selectedTreeItem) || this.selectedTreeItem.scrollIntoView(!0)
		}
		static isRootLevel(e) {
			return e && "1" === e.getAttribute("aria-level")
		}
		static isExpanded(e) {
			return e && "true" === e.getAttribute("aria-expanded")
		}
		static isExpandable(e) {
			return e && e.hasAttribute("aria-expanded")
		}
		static isDisabled(e) {
			return e && e.classList.contains(te.defaultOptions.treeItemDisabledClass)
		}
		static isInViewport(e) {
			const {
				top: t,
				left: s,
				bottom: i
			} = e && e.getBoundingClientRect(), {
				innerWidth: n,
				innerHeight: o
			} = window;
			return t >= 0 && s >= 0 && s <= n && i <= o
		}
	}
	if (te.componentName = "tree-view", te.componentSelector = ".js-tree-view", te.defaultOptions = {
			treeItemSelector: ".js-tree-view__item",
			treeItemHoverClass: "is-hovered",
			treeItemSelectedClass: "is-selected",
			treeItemDisabledClass: "is-disabled",
			subtreeSelector: ".js-tree-view__group"
		}, te.register(), t) {
		const e = t.prototype.resize;
		Object.assign(t.prototype, {
			_createResizeClass() {
				this._toggleResizeClass(!0)
			},
			_toggleResizeClass(e, t) {
				const {
					setGallerySize: s,
					resize: i
				} = this.options;
				if (s && i) {
					const s = () => {
						this.element.classList.toggle("flickity-resize", e)
					};
					t ? s() : requestAnimationFrame(s)
				}
			},
			resize() {
				this._toggleResizeClass(!1, !0), e.call(this), this._toggleResizeClass(!0)
			}
		}), t.createMethods.push("_createResizeClass")
	}

	function se(e, t) {
		let s, i, n, o;
		void 0 === t && (t = {});
		const r = () => {
				const l = Date.now() - s;
				l < t.delay ? i = setTimeout(r, t.delay - l) : (i = null, e.apply(n, o))
			},
			l = {
				delay: 100,
				...t
			};
		return function() {
			s = Date.now(), o = arguments, n = l.that || this, i || (i = setTimeout(r, l.delay))
		}
	}
	class ie extends O {
		constructor() {
			super(...arguments);
			const {
				elementSelector: e,
				selectSelector: s,
				cellSelector: i,
				pointerDownExcludeSelector: n
			} = this.options;
			if (["resize", "toggleSliderControls"].forEach((e => {
					this[e] = this[e].bind(this)
				})), this.sliderElement = e && this.element.querySelector(e) || this.element, this.sliderElement && t) this.flickitySlider = new t(this.sliderElement, this.getFlickityOptions());
			else if (!t) return void d.warn(`WARNING: You are using the "${this.constructor.componentName}" component without its necessary dependency "Flickity".`);
			s && this.flickitySlider.selectCell(`${s}${i}`, null, !1), n && this.flickitySlider.options.draggable && this.flickitySlider.on("pointerDown", (function(e) {
				e.target.closest(n) ? this.options.draggable = !1 : this.options.draggable = ">1", this.updateDraggable()
			})), document.addEventListener("visibilitychange", (() => {
				document.hidden || setTimeout((() => this.resize()), parseInt(this.options.refreshThreshold, 10))
			})), this.flickitySlider.on("select", this.toggleSliderControls), this.$$element.on("load", se(this.resize), !0)
		}
		toggleSliderControls() {
			const {
				draggableClass: e,
				slideableClass: t
			} = this.options, {
				size: s,
				slideableWidth: i
			} = this.flickitySlider, n = i > s.width;
			this.flickitySlider.options.draggable && (this.flickitySlider.isDraggable = n, this.$$element.toggleClass(e, n)), this.$$element.toggleClass(t, n)
		}
		resize() {
			this.flickitySlider.resize()
		}
		getFlickityOptions() {
			const {
				flickity: e,
				onInitClass: t
			} = this.options;
			return {...e,
				on: {
					ready: () => this.element.classList.add(t)
				}
			}
		}
	}
	ie.componentName = "basic-slider", ie.componentSelector = "", ie.defaultOptions = {
		slideableClass: "is-slideable",
		draggableClass: "is-draggable",
		onInitClass: "is-initialized",
		elementSelector: ".js-slider__element",
		flickityButtonSelector: ".flickity-prev-next-button",
		flickityDotsSelector: ".flickity-page-dots",
		selectSelector: "",
		pointerDownExcludeSelector: ".js-tooltip, [data-tippy-root]",
		refreshThreshold: 100,
		flickity: {
			initialIndex: ".is-initially-selected"
		}
	}, ie.register();
	class ne extends ie {}
	ne.componentName = "slider", ne.componentSelector = ".js-slider", ne.defaultOptions = ie.extendDefaultOptions({
		flickity: {
			cellSelector: ".js-slider__item",
			pageDots: !0,
			prevNextButtons: !0,
			groupCells: !0,
			cellAlign: "left",
			contain: !1,
			freeScroll: !0
		}
	}), ne.register(), t && (I.Flickity = t);
	class oe extends Z {
		constructor() {
			super(...arguments), this.tabsSlider = this.initTabsSliderContainer(), this.tabsSlider ? (this.$$buttons.on("click", (() => this.tabsSlider.resize())), window.addEventListener("resize", se((() => {
				const e = this.tabsSlider.cells.findIndex((e => e.element.querySelector(".js-tabs__nav-link.is-active"))) ? ? 0;
				this.tabsSlider.selectCell(e, !1, !0)
			}), {
				delay: this.options.debounceThreshold
			}))) : console.warn('WARNING: You are using "Tabs" without its necessary dependency "Flickity".')
		}
		initTabsSliderContainer() {
			const e = this.query(".js-tabs__nav").component("basic-slider", {
				flickity: {
					cellSelector: ".js-tabs__nav-item",
					contain: !0,
					pageDots: !1,
					cellAlign: this.options.cellAlign,
					groupCells: !0,
					freeScroll: !0,
					prevNextButtons: !0,
					on: {
						ready() {
							setTimeout((() => {
								e.resize()
							}), 1e3)
						}
					}
				}
			}).getFirst("flickitySlider");
			return e
		}
	}

	function re(e, t) {
		let s, i, n, o = 0;
		const r = () => {
				s = !1, o = Date.now(), e.apply(t ? .that || i, n)
			},
			l = {
				delay: 200,
				...t
			};
		return function() {
			if (i = this, n = arguments, s) return;
			let e = l.delay - (Date.now() - o);
			e < 0 && (e = 0), s = !0, setTimeout(r, e)
		}
	}
	oe.componentName = "tabs", oe.componentSelector = ".js-tabs", oe.defaultOptions = Z.extendDefaultOptions({
		btnSelector: ".js-tabs__nav-link",
		panelSelector: ".js-tabs__content",
		btnWrapper: ".js-tabs__nav-link",
		defaultSelectedIndex: 0,
		btnAction: "expand",
		debounceThreshold: 200,
		tabbedInterface: !0,
		cellAlign: "left"
	}), oe.register();
	class le extends O {
		constructor() {
			super(...arguments), this._bindDimensionChangeEvents()
		}
		_bindDimensionChangeEvents() {
			this._hasEventsBound || (this._hasEventsBound = !0, this.testDimensionChange = re(this.testDimensionChange, {
				that: this
			}), this.$$element.on("transitionend", (e => {
				let {
					propertyName: t
				} = e;
				le.layoutChangeMap[t] && this.testDimensionChange()
			})).on("load", this.testDimensionChange, !0), le.$$(window).on("resize", this.testDimensionChange))
		}
		testDimensionChange() {
			const {
				offsetHeight: e,
				offsetWidth: t
			} = this.element;
			e === this.offsetHeight && t === this.offsetWidth || (this.offsetHeight = e, this.offsetWidth = t, this.trigger("dimensionchange"))
		}
	}
	le.componentName = "dimension-change", le.componentSelector = "", le.layoutChangeMap = ["width", "height", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "padding-top", "padding-right", "padding-bottom", "padding-left", "flex-grow", "flex-basis"].reduce(((e, t) => (e[t] = !0, e)), {});
	const ae = p.positionStickySupport();
	class ce extends le {
		static get fixedStackedClass() {
			return "is-stacked"
		}
		constructor() {
			super(...arguments), this.updateStackedPosition = re(this.updateStackedPosition, {
				delay: 0,
				that: this
			}), this.initialTopValue = parseFloat(getComputedStyle(this.element).top) || 0, this.stackedHeight = 0, ce.$$(document).on("bronson_stacked_dimensionchange", this.updateStackedPosition), this.$$element.on("bronson_dimensionchange", (() => {
				this.trigger("stacked_dimensionchange")
			})), requestAnimationFrame((() => {
				this.$$element.addClass(ce.fixedStackedClass), this.trigger("stacked_dimensionchange"), this.updateStackedPosition()
			}))
		}
		updateStackedPosition() {
			if (!ae) return;
			const e = ce.$$(`.${ce.fixedStackedClass}`),
				t = e.findIndex((e => e === this.element || this.element.compareDocumentPosition(e) !== Node.DOCUMENT_POSITION_PRECEDING)),
				s = e.slice(0, t).getAll("offsetHeight").reduce(((e, t) => e + t), 0);
			this.stackedHeight !== s && (this.stackedHeight = s, requestAnimationFrame((() => {
				this.element.style.top = `${this.initialTopValue+s}px`;
				const {
					position: e
				} = this.element.style;
				this.element.style.position = "static", this.element.getBoundingClientRect(), this.element.style.position = e
			})))
		}
	}
	ce.componentName = "stacked", ce.componentSelector = ".js-stacked", ce.register();
	class he extends le {
		constructor() {
			super(...arguments), this.stacked = this.$$element.component("stacked")
		}
	}
	he.componentName = "stacked-sticky", he.componentSelector = ".js-stacked-sticky", he.register();
	class de extends Z {
		static updatePosition() {
			de.$$(".c-notifications-group").trigger("bronson_dimensionchange")
		}
		constructor() {
			super(...arguments), this.$$element.component("stacked-sticky"), this.$$element.on("bronson_panelchanged", re((() => {
				this.trigger("dimensionchange")
			}), {
				that: this
			}))
		}
	}
	de.componentName = "notification", de.componentSelector = ".c-notifications-group", de.defaultOptions = {
		btnSelector: ".js-notification-close",
		panelSelector: ".js-notification-container",
		multiple: !0,
		btnAction: "collapse",
		defaultCollapsed: !1,
		animateHeightClass: "is-closed"
	}, de.register();
	class pe extends Z {}
	var ue;
	pe.componentName = "contextNotification", pe.componentSelector = ".js-context-notification", pe.defaultOptions = {
		btnSelector: ".js-notification-close",
		panelSelector: ".js-notification-container",
		btnAction: "collapse",
		defaultCollapsed: !1,
		animateHeightClass: "is-closed"
	}, pe.register();
	const me = {
		name: "hideOnPopperBlur",
		defaultValue: !0,
		fn: e => ({
			onCreate() {
				e.popper.addEventListener("focusout", (t => {
					e.props.hideOnPopperBlur && t.relatedTarget && !e.popper.contains(t.relatedTarget) && e.hide()
				})), e.popper.addEventListener("click", (e => e.stopPropagation())), e.popper.addEventListener("keyup", (e => e.stopPropagation()))
			}
		})
	};
	class ge extends O {
		static init() {
			const e = document.querySelector(this.componentSelector);
			if (e) {
				const {
					missingContent: t,
					missingDependency: s
				} = ge.errors;
				if (i) {
					i.setDefaultProps(this.defaultOptions);
					const {
						tippyContent: s,
						template: n
					} = e.dataset;
					s || n ? i(this.componentSelector, this.defaultOptions) : console.error(t)
				} else console.warn(s)
			}
		}
	}
	ue = ge, ge.componentSelector = ".js-tooltip", ge.componentName = "tooltip", ge.tippy = i, ge.errors = {
		missingContent: "WARNING: Tooltip is missing content, either via '[data-tooltip-content]' or '[data-template]'. The tooltip will not be initialized.",
		missingTemplateElement: "Oh shoot! Seems like the corresponding template to a tooltip was not found. Make sure to link all tooltip triggers ('.js-tooltip') that contain a '[data-template]' attribute to its corresponding templates by matching the '[data-template]' value of '.js-tooltip' with the '[id]' attribute of the template.'",
		missingDependency: 'WARNING: You are using "Tooltip" without its necessary dependency "tippy.js".'
	}, ge.excludedComponentSelector = ".c-table-wrapper, .c-tree-view", ge.scopedStylesSelector = ".bron-body", ge.defaultOptions = {
		arrow: !0,
		hideOnClick: !1,
		interactive: !0,
		placement: "bottom",
		theme: "default",
		animation: "default",
		allowHTML: !0,
		aria: {
			content: "describedby",
			expanded: "auto"
		},
		popperOptions: {
			modifiers: [{
				name: "flip",
				options: {
					fallbackPlacements: ["bottom", "right"]
				}
			}, {
				name: "preventOverflow",
				options: {
					altAxis: !0,
					tether: !1
				}
			}]
		},
		content(e) {
			const t = e.getAttribute("data-template"),
				s = document.getElementById(t);
			if (t) {
				if (s) return s.innerHTML;
				console.error(ue.errors.missingTemplateElement)
			}
			return null
		},
		onCreate(e) {
			e.reference.closest(ue.excludedComponentSelector) && e.setProps({
				appendTo: e.reference.closest(ue.scopedStylesSelector) ? document.querySelector(ue.scopedStylesSelector) : document.body,
				zIndex: 2001
			})
		},
		onTrigger(e) {
			e.reference.closest(ue.excludedComponentSelector) || (e.reference.parentElement.style.setProperty("transition-duration", "0s"), e.reference.parentElement.style.setProperty("z-index", 2001))
		},
		onHidden(e) {
			e.reference.closest(ue.excludedComponentSelector) || (e.reference.parentElement.style.removeProperty("transition-duration"), e.reference.parentElement.style.removeProperty("z-index"))
		},
		plugins: [me]
	}, ge.register(), i && (window.tippy = i);
	class fe extends Z {}
	fe.componentName = "toast-notification", fe.componentSelector = ".js-toast-notifications", fe.defaultOptions = {
		btnSelector: ".c-toast-notification__close",
		panelSelector: ".c-toast-notification",
		multiple: !0,
		btnAction: "collapse",
		defaultCollapsed: !1,
		animateHeightClass: "is-closed"
	}, fe.register();
	class be extends O {
		constructor() {
			super(...arguments), ["update", "updateAll"].forEach((e => {
				this[e] = this[e].bind(this)
			})), this.$$element.addClass("is-js-on").on("change", (e => {
				let {
					target: t
				} = e;
				this.update(t)
			})).on("reset", (() => {
				setTimeout(this.updateAll, 0)
			})), this.updateAll()
		}
		update(e) {
			be.$$(e).callAll("closest", this.options.formfield).filter((e => e)).toggleClass(this.options.activeClass, !!e.value)
		}
		updateAll() {
			be.$$(this.options.formfield).query("input, select, textarea").forEach((e => {
				this.update(e)
			}))
		}
	}
	var ve;
	be.componentName = "floating-label", be.componentSelector = ".js-floating-label", be.defaultOptions = {
		formfield: ".c-form-field:not(.c-form-field--static)",
		activeClass: "is-active"
	}, be.register();
	class ye extends Z {}
	ve = ye, ye.componentName = "site-nav", ye.componentSelector = ".js-site-nav", ye.defaultOptions = {
		btnSelector: ".js-site-nav__toggle",
		panelSelector: ".js-site-nav__navs",
		btnWrapper: ve.componentSelector,
		defaultCollapsed: !1,
		panelClosedClass: "is-collapsed",
		useInert: !1
	}, ye.register();
	const Se = "ScrollObserverEvent",
		Ce = "data-scroll-observer-skip";
	class $e extends O {
		constructor() {
			super(...arguments);
			const {
				target: e,
				root: t,
				rootMargin: s,
				threshold: i
			} = this.options;
			if (!e) throw new TypeError("ScrollObserver â†’ target must be a valid CSS selector!");
			if (null !== t && !t) throw new TypeError("ScrollObserver â†’ root must be a valid CSS selector or null!");
			window.IntersectionObserver && (this.observer = new IntersectionObserver(this.observeEntries.bind(this), {
				root: document.querySelector(t),
				rootMargin: s,
				threshold: i
			}), this.options.trackMultiple ? (this.target = document.querySelectorAll(e), this.target.forEach((e => this.observer.observe(e))), this.targets = Array.from(this.target)) : (this.target = document.querySelector(e), this.observer.observe(this.target)))
		}
		observeEntries(e) {
			e.forEach((e => {
				const {
					boundingClientRect: {
						top: t
					},
					intersectionRect: {
						height: s
					}
				} = e;
				e.target.__intersectionHeight = s, this.element.hasAttribute(Ce) || (e.isIntersecting ? (this.element.classList.remove(this.options.outsideViewportClass), this.element.classList.add(this.options.inViewportClass), this.lastScrollTop > t ? (this.element.classList.add(this.options.belowEnterViewportClass), this.element.classList.remove(this.options.belowLeaveViewportClass), this.element.classList.remove(this.options.aboveEnterViewportClass)) : (this.element.classList.add(this.options.aboveEnterViewportClass), this.element.classList.remove(this.options.aboveLeaveViewportClass), this.element.classList.remove(this.options.belowEnterViewportClass))) : (this.element.classList.add(this.options.outsideViewportClass), this.element.classList.remove(this.options.inViewportClass), this.lastScrollTop > t ? (this.element.classList.add(this.options.aboveLeaveViewportClass), this.element.classList.remove(this.options.aboveEnterViewportClass), this.element.classList.remove(this.options.belowEnterViewportClass)) : (this.element.classList.add(this.options.belowLeaveViewportClass), this.element.classList.remove(this.options.belowEnterViewportClass), this.element.classList.remove(this.options.aboveEnterViewportClass)))), this.lastScrollTop = t
			})), this.options.trackMultiple && (this.mostVisibleEntry = this.targets.reduce(((e, t) => t.__intersectionHeight > (e ? .__intersectionHeight ? ? 0) ? t : e), null), this.mostVisibleEntry && this.element.setAttribute(this.options.mostVisibleViewportAttribute, `#${this.mostVisibleEntry?.id}`));
			const t = new CustomEvent(Se, {
				detail: {
					intersectionObserverEntries: e,
					mostVisibleEntry: this.mostVisibleEntry
				}
			});
			this.element.hasAttribute(Ce) || this.element.dispatchEvent(t)
		}
		disconnect() {
			this.observer && this.observer.disconnect()
		}
	}
	$e.componentName = "scroll-observer", $e.componentSelector = ".js-scroll-observer", $e.defaultOptions = {
		inViewportClass: "has-target-inside-view",
		outsideViewportClass: "has-target-outside-view",
		aboveEnterViewportClass: "has-target-enter-above-view",
		aboveLeaveViewportClass: "has-target-leave-above-view",
		belowEnterViewportClass: "has-target-enter-below-view",
		belowLeaveViewportClass: "has-target-leave-below-view",
		mostVisibleViewportAttribute: "data-target-most-visible-view",
		root: null,
		rootMargin: "0px",
		threshold: 0,
		allowMultiple: !1
	}, $e.register();
	class we extends O {
		constructor() {
			super(...arguments);
			const {
				linkSelector: e,
				sectionListSelector: t,
				scrollPrevSelector: s,
				scrollNextSelector: i,
				sectionContainerSelector: n,
				activeSectionLabelSelector: o,
				activeSectionLabelTextSelector: r
			} = this.options;
			if (this.hasHashNavigation = !!window ? .location ? .hash, this.activeSectionLabel = this.element.querySelector(o), this.activeSectionLabelText = this.element.querySelector(r), this.sectionContainer = this.element.querySelector(n), this.sectionList = this.element.querySelector(t), this.sectionListParent = this.sectionList.parentElement, this.scrollPrevButton = this.element.querySelector(s), this.scrollNextButton = this.element.querySelector(i), this.links = this.element.querySelectorAll(`${e}[href*="#"]`), this.scrollOffset = parseFloat(window.getComputedStyle(this.sectionList, "::before") ? .width ? ? 0), window.ResizeObserver) this.ro = new ResizeObserver((e => {
				for (const t of e) {
					const e = parseFloat(getComputedStyle(t.target).getPropertyValue(this.options.sectionNavBreakpointCustomProp));
					this.handleResize(e)
				}
			})), this.ro.observe(this.element);
			else {
				const e = parseFloat(getComputedStyle(this.element).getPropertyValue(this.options.sectionNavBreakpointCustomProp));
				this.handleResize(e)
			}
			this.links.forEach((e => {
				e.addEventListener("click", (() => this.handleLinkEvent(e)))
			})), this.sectionContainer.addEventListener("click", this.handleBackdropEvent.bind(this)), this.sectionList.addEventListener("scroll", (() => this.checkListOverflow(this.sectionList))), this.sectionList.addEventListener(Se, this.scrollListItemIntoView.bind(this)), this.activeSectionLabel.addEventListener("click", this.toggleScrollContainer.bind(this)), this.scrollPrevButton.addEventListener("click", (() => {
				this.scrollList()
			})), this.scrollNextButton.addEventListener("click", (() => {
				this.scrollList(-1)
			})), this.checkListOverflow(this.sectionList)
		}
		scrollListItemIntoView(e) {
			const {
				detail: {
					mostVisibleEntry: t
				}
			} = e;
			if (t) {
				const e = t ? .getAttribute("id");
				if (this.hasHashNavigation && window ? .location ? .hash !== `#${e}`) return;
				const s = Array.from(this.links).find((t => t.getAttribute("href") === `#${e}`));
				this.links.forEach((e => e.classList.remove(this.options.sectionNavActiveClass))), s.classList.add(this.options.sectionNavActiveClass);
				const i = this.checkLinkOverflow(s);
				setTimeout((() => {
					s.classList.contains(this.options.sectionNavActiveClass) && !this.sectionList.hasAttribute(Ce) && i && requestAnimationFrame((() => {
						this.sectionList.scrollBy({
							top: 0,
							left: s.offsetLeft - this.sectionList.scrollLeft - this.scrollOffset,
							behavior: "smooth"
						})
					}))
				}), this.options.scrollDelayShort), this.activeSectionLabelText.textContent = s.textContent, this.hasHashNavigation = !1
			}
		}
		scrollList(e) {
			void 0 === e && (e = 1), requestAnimationFrame((() => {
				this.sectionList.scrollBy({
					top: 0,
					left: -this.sectionList.offsetWidth / Math.abs(.25 * this.links.length) * e,
					behavior: "smooth"
				})
			}))
		}
		checkListOverflow(e) {
			const {
				clientWidth: t,
				scrollLeft: s,
				scrollWidth: i
			} = e;
			s > this.options.overflowThreshold ? this.sectionListParent.classList.add(this.options.sectionListOverflowLeftClass) : this.sectionListParent.classList.remove(this.options.sectionListOverflowLeftClass), i - t > s ? this.sectionListParent.classList.add(this.options.sectionListOverflowRightClass) : this.sectionListParent.classList.remove(this.options.sectionListOverflowRightClass)
		}
		checkLinkOverflow(e) {
			return e.offsetLeft - this.sectionList.scrollLeft >= this.sectionList.offsetWidth || e.offsetLeft <= this.sectionList.scrollLeft || e.offsetLeft + e.clientWidth >= this.sectionList.offsetWidth
		}
		handleLinkEvent(e) {
			this.sectionList.setAttribute(Ce, !0), this.links.forEach((e => e.classList.remove(this.options.sectionNavActiveClass))), e.classList.add(this.options.sectionNavActiveClass), this.activeSectionLabelText.textContent = e.textContent, this.sectionContainer.classList.contains(this.options.sectionNavVisibleClass) && this.collapseScrollContainer(), setTimeout((() => {
				this.sectionList.removeAttribute(Ce);
				const t = this.checkLinkOverflow(e);
				e.classList.contains(this.options.sectionNavActiveClass) && t && requestAnimationFrame((() => {
					this.sectionList.scrollBy({
						top: 0,
						left: e.offsetLeft - this.sectionList.scrollLeft - this.scrollOffset,
						behavior: "smooth"
					})
				}))
			}), this.options.scrollDelay)
		}
		handleBackdropEvent(e) {
			this.sectionContainer.classList.contains(this.options.sectionNavVisibleClass) && e.target.matches(this.options.sectionContainerSelector) && this.collapseScrollContainer()
		}
		expandScrollContainer() {
			this.sectionContainer.classList.add(this.options.sectionNavVisibleClass), this.activeSectionLabel.setAttribute("aria-expanded", !0), this.element.classList.contains("has-target-inside-view") && document.body.classList.add(this.options.preventScrollClass)
		}
		collapseScrollContainer() {
			this.sectionContainer.classList.remove(this.options.sectionNavVisibleClass), document.body.classList.remove(this.options.preventScrollClass), this.activeSectionLabel.setAttribute("aria-expanded", !1)
		}
		toggleScrollContainer() {
			this.sectionContainer.classList.contains(this.options.sectionNavVisibleClass) ? this.collapseScrollContainer() : this.expandScrollContainer()
		}
		handleResize(e) {
			window.innerWidth > e && (this.sectionContainer.classList.contains(this.options.sectionNavVisibleClass) && this.collapseScrollContainer(), this.checkListOverflow(this.sectionList), this.scrollOffset = parseFloat(window.getComputedStyle(this.sectionList, "::before") ? .width ? ? 0))
		}
	}
	we.componentName = "section-nav", we.componentSelector = ".js-section-nav", we.defaultOptions = O.extendDefaultOptions({
		sectionContainerSelector: ".js-section-nav__container",
		sectionListSelector: ".js-section-nav__list",
		sectionListOverflowLeftClass: "has-overflow-left",
		sectionListOverflowRightClass: "has-overflow-right",
		scrollPrevSelector: ".js-section-nav__scroll-button--prev",
		scrollNextSelector: ".js-section-nav__scroll-button--next",
		linkSelector: ".js-section-nav__link",
		activeSectionLabelSelector: ".js-section-nav__section-label",
		activeSectionLabelTextSelector: ".js-section-nav__section-label__text",
		preventScrollClass: "c-section-nav-prevent-scroll",
		sectionNavVisibleClass: "is-visible",
		sectionNavActiveClass: "is-active",
		sectionNavBreakpointCustomProp: "--bron-section-nav-breakpoint",
		overflowThreshold: 10,
		scrollDelay: 1e3,
		scrollDelayShort: 250
	}), we.register();
	class Ae extends Z {
		constructor() {
			super(...arguments), ["_panelChanged", "_outsideAction", "_onEsc"].forEach((e => {
				this[e] = this[e].bind(this)
			})), this.$$panels.on("bronson_panelchanged", this._panelChanged), this.$$element.on("keydown", this._onEsc)
		}
		_onEsc(e) {
			let {
				keyCode: t,
				defaultPrevented: s,
				target: i
			} = e;
			27 !== t || s || i.matches("input, select, textarea") || this.collapseAll()
		}
		_outsideAction(e) {
			let {
				target: t
			} = e;
			this.element.contains(t) || this.collapseAll()
		}
		_panelChanged() {
			this.$$panels.component("panel").getFirst("isCollapsed") ? Ae.$$(document).off("mouseup", this._outsideAction).off("click", this._outsideAction).off("focus", this._outsideAction).off("keyup", this._outsideAction) : Ae.$$(document).on("mouseup", this._outsideAction).on("click", this._outsideAction).on("focus", this._outsideAction).on("keyup", this._outsideAction)
		}
	}
	var Ee, ke;
	Ae.componentName = "dropdown", Ae.componentSelector = ".js-dropdown", Ae.defaultOptions = Z.extendDefaultOptions({
		btnSelector: ".js-dropdown__button",
		panelSelector: ".js-dropdown__panel",
		checkNesting: !0,
		panelClosedClass: "is-collapsed"
	}), Ae.register();
	class _e extends Ae {}
	Ee = _e, _e.componentName = "notification-center", _e.componentSelector = ".js-notification-center", _e.defaultOptions = {
		btnSelector: ".js-notification-center__toggle",
		panelSelector: ".js-notification-center__panel",
		btnAction: "toggle",
		btnWrapper: Ee.componentSelector
	}, _e.register();
	class xe extends z {
		constructor() {
			super(...arguments), this.initVideo()
		}
		initVideo() {
			const e = this.element.querySelector(".js-modal-video");
			if (!e) return;
			const t = !(!e.dataset.videoCustomAutoplay && "" !== e.dataset.videoCustomAutoplay);
			this.video = bronson.$$(e).component("video").items[0], this.video.autoplay = t, this.$$element.on(this.options.openEventName, (() => {
				this.toggleVideoPlay(!0)
			})), this.$$element.on(this.options.closeEventName, (() => {
				this.toggleVideoPlay(!1)
			}))
		}
		toggleVideoPlay(e) {
			e && this.video.autoplay && this.video.plyr.togglePlay(e), e || this.video.plyr.togglePlay(e)
		}
	}
	ke = xe, xe.componentName = "modal", xe.componentSelector = ".c-modal", xe.defaultOptions = ke.extendDefaultOptions({
		componentName: ke.componentName,
		triggerSelector: ".js-modal-trigger",
		closeSelector: ".js-modal-close",
		autofocus: ".js-modal-autofocus",
		openEventName: "bronson_modal_open",
		closeEventName: "bronson_modal_close"
	}), xe.register();
	class Le extends O {
		constructor() {
			super(...arguments), this.$$element.on("click", (e => {
				e.preventDefault(), this.toggle()
			}))
		}
		toggle() {
			this.element.classList.toggle("is-active")
		}
	}
	Le.componentName = "fav-button", Le.componentSelector = ".js-fav-button", Le.defaultOptions = {}, Le.register();
	class Oe extends O {
		constructor() {
			if (super(...arguments), !n) return void console.warn('WARNING: You are using "Datepicker" without its necessary dependency "flatpickr".');
			["onChange", "onClose", "onOpen", "onMonthChange", "onYearChange", "onReady", "onValueUpdate", "onDayCreate"].forEach((e => {
				const t = this;
				this.options[e] = function() {
					for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++) i[n] = arguments[n];
					t.trigger(e.replace(/^on/, t.constructor.componentName), {
						args: i
					})
				}
			}));
			this.query(".c-input__input").getFirst("readOnly") && (this.options.disableMobile = !0), this.flatpickr = n(this.element, this.options)
		}
	}
	Oe.componentName = "datepicker", Oe.componentSelector = ".js-datepicker", Oe.flatpickr = n, Oe.defaultOptions = {
		allowInput: !0,
		dateFormat: "d.m.Y",
		nextArrow: '<i class="c-icon c-icon--[semantic-forward] c-icon-â€“simple"></i>',
		prevArrow: '<i class="c-icon c-icon--[semantic-back] c-icon-â€“simple"></i>',
		wrap: !0
	}, Oe.register(), n && (I.flatpickr = n);
	class Ie extends O {
		constructor() {
			if (super(...arguments), !n) return void console.warn('WARNING: You are using "Timepicker" without its necessary dependency "flatpickr".');
			["onChange", "onClose", "onOpen", "onReady", "onValueUpdate", "onDayCreate"].forEach((e => {
				const t = this;
				this.options[e] = function() {
					for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++) i[n] = arguments[n];
					t.trigger(e.replace(/^on/, t.constructor.componentName), {
						args: i
					})
				}
			}));
			this.query(".c-input__input").getFirst("readOnly") && (this.options.disableMobile = !0), this.flatpickr = n(this.element, this.options)
		}
	}
	Ie.componentName = "timepicker", Ie.componentSelector = ".js-timepicker", Ie.flatpickr = n, Ie.defaultOptions = {
		allowInput: !0,
		enableTime: !0,
		noCalendar: !0,
		time_24hr: !0,
		wrap: !0
	}, Ie.register(), n && (I.flatpickr = n);
	class Ne extends Z {
		constructor() {
			super(...arguments), this.$$panels.forEach((e => {
				e ? .matches('[aria-hidden="true"]') ? e ? .classList.add("is-collapsed") : e ? .matches('[aria-hidden="false"]') && e ? .classList.add("is-expanded")
			})), this.$$panels.on("transitionend", (e => {
				let {
					target: t
				} = e;
				t ? .classList.contains("js-form-section__panel") && (t.matches('[aria-hidden="true"]') ? t.classList.add("is-collapsed") : t.matches('[aria-hidden="false"]') && t.classList.add("is-expanded"))
			})), this.$$panels.on("transitionstart", (e => {
				let {
					target: t
				} = e;
				t ? .classList.contains("js-form-section__panel") && (t.matches('[aria-hidden="true"]') ? t.classList.remove("is-expanded") : t.matches('[aria-hidden="false"]') && t.classList.remove("is-collapsed"))
			}))
		}
	}
	Ne.componentName = "form-section", Ne.componentSelector = ".js-form-section", Ne.defaultOptions = Z.extendDefaultOptions({
		btnSelector: ".js-form-section__header",
		panelSelector: ".js-form-section__panel",
		btnAction: "toggle",
		parentToggleClass: "is-open"
	}), Ne.register();
	class Te extends O {
		constructor() {
			super(...arguments), this.transformMarkup(), this.$$element.component("panelgroup", this.options.panelgroupOptions)
		}
		transformMarkup() {
			const {
				btnSelector: e
			} = this.options.panelgroupOptions;
			this.$$element.query(e).forEach((t => {
				const {
					className: s,
					innerHTML: i
				} = t, n = t.getAttribute("aria-expanded"), o = document.createElement("button");
				t.classList.remove(e.replace(".", "")), t.classList.add("is-heading"), t.removeAttribute("aria-expanded"), Object.assign(o, {
					className: s,
					innerHTML: i,
					type: "button"
				}), o.classList.add("is-button"), n && o.setAttribute("aria-expanded", n), t.parentNode.append(o)
			}))
		}
	}
	Te.componentName = "footer-accordion", Te.componentSelector = ".js-footer-accordion", Te.defaultOptions = {
		panelgroupOptions: {
			btnSelector: ".js-footer-accordion__title-label",
			panelSelector: ".js-footer-accordion__panel",
			btnWrapper: ".js-footer-accordion__title",
			btnWrapperClick: !0,
			btnAction: "toggle",
			panelClosedClass: "is-closed",
			useInert: !1
		}
	}, Te.register();
	class je extends O {
		constructor() {
			if (super(...arguments), this.setValue = e => {
					let {
						target: t
					} = e;
					const s = parseFloat(t.hasAttribute("data-value") ? t.getAttribute("data-value") : t.nextElementSibling.getAttribute("data-value"));
					if (!(this.element.hasAttribute("disabled") || this.element.hasAttribute("aria-disabled") || this.element.hasAttribute("inert"))) {
						const e = this.nouislider.getTooltips(),
							t = [this.nouislider.get()].flat(1).map(parseFloat),
							i = t.reduce(((e, t) => Math.abs(t - s) < Math.abs(e - s) ? t : e)),
							n = t.findIndex((e => e === i)),
							o = t.map(((e, t) => t === n ? s : null));
						if (this.nouislider.set(o), e && e.length) {
							const t = e[n];
							this.tooltips.get(t) ? .update()
						}
					}
				}, !a && !l) return void console.warn('WARNING: You are using "Custom Range Slider" without its necessary dependencies "nouislider" and "wNumb".');
			const {
				format: e
			} = this.options;
			e && (this.options.format = a(e)), this.element.hasAttribute("aria-disabled") && !this.element.hasAttribute("inert") && this.element.setAttribute("inert"), this.nouislider = l.create(this.element, this.options), this.tooltips = new WeakMap;
			const t = this.nouislider.target,
				s = t.querySelectorAll(`.${this.options.cssPrefix}${this.options.cssClasses.handle}`),
				i = t.getAttribute(`data-${this.constructor.componentName}-tooltip-position`) || "top";
			let n = this.nouislider.getTooltips();
			if (n && n.length && n.forEach(((e, o) => {
					const l = document.createElement("div");
					l.classList.add(`${this.options.cssPrefix}__arrow`);
					const a = document.createElement("div");
					a.classList.add(`${this.options.cssPrefix}__tooltip-wrapper`), e.parentNode.insertBefore(a, e), a.appendChild(e), a.appendChild(l);
					const c = r.createPopper(s[o], a, {
						placement: i,
						modifiers: [{
							name: "preventOverflow",
							options: {
								boundary: t,
								padding: -5
							}
						}, {
							name: "offset",
							options: {
								offset: [0, 15]
							}
						}, {
							name: "arrow",
							options: {
								element: l
							}
						}, {
							name: "flip",
							options: {
								enable: !1,
								enabled: !1,
								flipVariations: !1,
								fallbackPlacements: [i]
							}
						}]
					});
					this.tooltips.set(e, c), this.$$element.on("transitionend", c.update), this.nouislider.on("update", (() => {
						if (!n.some((e => this.nouislider.getTooltips().includes(e)))) {
							this.tooltips = new WeakMap, n = this.nouislider.getTooltips();
							const e = t.querySelectorAll(`.${this.options.cssPrefix}__tooltip-wrapper`);
							n.forEach(((t, s) => {
								t.parentNode.insertBefore(e[s], t), e[s].prepend(t), this.tooltips.set(t, c)
							}))
						}
						c.update()
					})), setTimeout(c.update, 500)
				})), "pips" in this.options && this) {
				const e = this.query(`.${this.options.cssPrefix}${this.options.cssClasses.marker}`);
				e.on("click", this.setValue);
				this.query(`.${this.options.cssPrefix}${this.options.cssClasses.marker}`).on("click", this.setValue), this.nouislider.on("update", (() => {
					const t = [this.nouislider.get()].flat(1).map(parseFloat);
					1 === t.length && t.unshift(this.options.range.min);
					const s = e => parseFloat(e.nextElementSibling.getAttribute("data-value")),
						i = e => t.some((t => s(e) === t));
					e.forEach((e => e.classList.remove("in-range", "is-active"))), e.filter((e => s(e) >= t[0] && s(e) <= t[t.length - 1] && !i(e))).forEach((e => e.classList.add("in-range"))), e.filter(i).forEach((e => e.classList.add("is-active")))
				}))
			}
		}
	}
	je.componentName = "custom-range-slider", je.componentSelector = ".js-custom-range-slider", je.nouislider = l, je.defaultOptions = {
		connect: [!0, !1],
		start: 20,
		range: {
			min: 0,
			max: 100
		},
		format: {
			decimals: 0
		},
		cssPrefix: "c-custom-range-slider",
		cssClasses: {
			active: "--active",
			background: "--background",
			draggable: "--draggable",
			horizontal: "--horizontal",
			vertical: "--vertical",
			ltr: "--left-to-right",
			rtl: "--right-to-left",
			target: "__target",
			base: "__base",
			origin: "__origin",
			handle: "__thumb",
			handleLower: "__thumb--lower",
			handleUpper: "__thumb--upper",
			touchArea: "__touch-area",
			connects: "__connect-container",
			connect: "__connect",
			drag: "--drag",
			tap: "--tap",
			tooltip: "__tooltip",
			pips: "__pips",
			pipsHorizontal: "__pips--horizontal",
			pipsVertical: "__pips--vertical",
			marker: "__marker",
			markerHorizontal: "__marker--horizontal",
			markerVertical: "__marker--vertical",
			markerNormal: "__marker--normal",
			markerLarge: "__marker--large",
			markerSub: "__marker--sub",
			value: "__value",
			valueHorizontal: "__value--horizontal",
			valueVertical: "__value--vertical",
			valueNormal: "__value--normal",
			valueLarge: "__value--large",
			valueSub: "__value--sub"
		}
	}, je.register(), l && (I.nouislider = l);
	class Pe extends je {
		constructor() {
			super(...arguments), this.initTooltips(), this.addIcons()
		}
		initTooltips() {
			const e = Array.from(this.element ? .querySelectorAll("[data-custom-progress-tooltip]")) || [],
				t = Array.from(this.element ? .querySelectorAll(".c-custom-progress__thumb"));
			e.forEach(((e, s) => {
				const n = this.element ? .querySelectorAll(".c-custom-progress__connect, .c-custom-progress__thumb")[s] || null,
					o = "true" === e.getAttribute("data-custom-progress-tooltip-hover"),
					r = e.getAttribute("data-custom-progress-tooltip-placement");
				i(t[s], {
					trigger: o ? "mouseenter" : "manual",
					triggerTarget: n,
					showOnCreate: !o,
					hideOnClick: !1,
					allowHTML: !0,
					appendTo: this.element,
					maxWidth: "none",
					onCreate(e) {
						"bottom" === r && (n.classList.add(`c-custom-progress__tooltip-placement--${r}`), e.reference.classList.add(`c-custom-progress__tooltip-placement--${r}`)), o || (n.classList.add("c-custom-progress__step--main"), e.reference.classList.add("c-custom-progress__step--main"))
					},
					content: () => e.innerHTML,
					placement: r || "top",
					popperOptions: {
						modifiers: [{
							name: "flip",
							options: {
								enable: !1,
								enabled: !1,
								flipVariations: !1,
								fallbackPlacements: []
							}
						}]
					}
				})
			}))
		}
		addIcons() {
			const e = this.element.getAttribute("data-custom-progress-icons") ? .split(",") ? ? [];
			e.length && this.element.querySelectorAll(".c-custom-progress__origin").forEach(((t, s) => {
				const i = e[s];
				if (!i) return;
				const n = t.querySelector(".c-custom-progress__thumb");
				n.insertAdjacentHTML("beforeend", `<i class="c-custom-progress__thumb__icon  c-icon  c-icon--[${i}]" aria-hidden="true" role="img"></i>`), CSS.supports("selector(:has(+ *))") || n.classList.add("c-custom-progress__thumb--has-icon")
			}))
		}
	}
	Pe.componentName = "custom-progress", Pe.componentSelector = ".js-custom-progress", Pe.defaultOptions = je.extendDefaultOptions({
		cssPrefix: "c-custom-progress",
		keyboardSupport: !1
	}), Pe.register();
	class qe extends Z {}
	qe.componentName = "wizard", qe.componentSelector = ".js-wizard", qe.defaultOptions = {
		btnSelector: ".js-wizard__trigger",
		panelSelector: ".js-wizard__list",
		btnAction: "toggle",
		panelClosedClass: "is-closed",
		useInert: !1
	}, qe.register();
	class De extends O {
		constructor() {
			super(...arguments), this.modifyOptions(), [this.sliderComponent] = this.$$element.component("basic-slider", this.options).items, this.flickitySlider = this.sliderComponent.flickitySlider, this.sliderComponent.flickitySlider.on("fullscreenChange", (e => {
				(this.sliderComponent.element ? .querySelectorAll("img[sizes]") ? ? []).forEach((t => {
					if (e) {
						const e = t.getAttribute("sizes");
						t.setAttribute("sizes", "100vw"), t.setAttribute("data-carousel-origin-sizes", e)
					} else {
						const e = t.getAttribute("data-carousel-origin-sizes");
						t.setAttribute("sizes", e), t.removeAttribute("data-carousel-origin-sizes")
					}
				}))
			}))
		}
		modifyOptions() {
			const {
				options: e
			} = this, {
				flickity: t,
				defaultAutoplayDuration: s
			} = e;
			for (const s in e) Object.prototype.hasOwnProperty.call(e, s) && !Object.prototype.hasOwnProperty.call(De.defaultOptions, s) && (t[s] = e[s], delete e[s]);
			!0 === t.autoPlay && (t.autoPlay = s)
		}
	}
	De.componentName = "carousel", De.componentSelector = ".js-carousel", De.defaultOptions = {
		defaultAutoplayDuration: 5e3,
		flickity: {
			cellSelector: ".c-carousel__item",
			imagesLoaded: !0
		}
	}, De.register();
	class Fe extends Z {
		constructor() {
			super(...arguments), this.$$panels.on("bronson_panelchanged", (() => {
				const {
					top: e
				} = this.element.getBoundingClientRect(); - 1 === this.selectedIndex && e < 0 && (Element.prototype.scrollIntoView ? this.element.scrollIntoView(!0) : window.scrollTo(0, this.element.offsetTop))
			}))
		}
		toggle(e) {
			for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
			return this._callPanelMethod(e, "toggle", ...s)
		}
	}
	Fe.componentName = "fold-out", Fe.componentSelector = ".js-fold-out", Fe.defaultOptions = {
		btnSelector: ".js-fold-out__toggle",
		panelSelector: ".js-fold-out__content",
		btnAction: "toggle",
		multiple: !1,
		defaultCollapsed: !0,
		animateHeightClass: ""
	}, Fe.register();
	class Ve extends Z {
		constructor() {
			super(...arguments), this.$$panels.on(`bronson_${ee.defaultOptions.panelChangeEvent}`, (e => {
				let {
					currentTarget: t
				} = e;
				"false" === t.getAttribute("aria-hidden") && (t.style.height = "auto")
			}))
		}
	}
	Ve.componentName = "card-expandable", Ve.componentSelector = ".js-card-expandable", Ve.defaultOptions = Z.extendDefaultOptions({
		btnSelector: ".js-card-expandable__trigger",
		panelSelector: ".js-card-expandable__panel",
		btnAction: "toggle",
		parentToggleClass: "is-open",
		panelChangeEvent: "expandable-card-changed"
	}), Ve.register();
	class Me extends O {
		constructor() {
			super(...arguments), this.$$element.component("stacked-sticky"), this.initialHeight = this.element.clientHeight, this.isSticky = !1, this.element.addEventListener("transitionend", (() => {
				this.element.classList.remove(this.options.isTransitioningClass)
			})), this.element.addEventListener("transitionstart", (() => {
				this.element.classList.add(this.options.isTransitioningClass)
			})), window.addEventListener("scroll", (() => requestAnimationFrame(this.checkIfElementIsSticky.bind(this))))
		}
		checkIfElementIsSticky() {
			if (this.element.classList.contains(this.options.isTransitioningClass)) return !1;
			const {
				bottom: e,
				top: t
			} = window.getComputedStyle(this.element);
			((e, t) => {
				const {
					top: s
				} = this.element.getBoundingClientRect();
				return !("auto" !== e || !t.search("px")) && s <= parseFloat(t, 10)
			})(e, t) ? this.element.classList.add(this.options.isStickyClass): this.element.classList.remove(this.options.isStickyClass)
		}
	}
	Me.componentName = "sticky-container", Me.componentSelector = ".js-sticky-container", Me.stickyTimeout = 100, Me.defaultOptions = {
		isStickyClass: "is-sticky",
		isTransitioningClass: "is-sticky-transitioning"
	}, Me.register();
	const He = Object.freeze({
		"slow-2g": 0,
		"2g": 1,
		"3g": 2,
		"4g": 3
	});
	class ze extends O {
		constructor() {
			if (super(...arguments), this.videoControl = document.querySelector(".js-background-video-control"), this.userForcedPause = !1, this.didPlay = !1, c) {
				this.options.autoplayMinimumConnection && (this.options.autoplay = !1, this.element.removeAttribute("autoplay")), this.element.autoplay && !this.options.autoplayMinimumConnection && (this.options.autoplay = this.element.autoplay), null == this.options.muted && (this.options.muted = this.element.muted, this.options.muted && (this.options.storage = {
					enabled: !1
				}, this.options.volume = 0)), this.plyr = new c(this.element, this.options), this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
				const e = window.matchMedia("(prefers-reduced-motion: reduce)");
				this.prefersReducedMotion = e ? .matches, this.prefersReducedMotion && this.pause(), e.addEventListener("change", (() => {
					e ? .matches && this.stop()
				})), document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this)), this.element ? .closest(".c-hero-teaser__background-video") && this.videoControl ? .addEventListener("click", (() => {
					this.toggleVideo(this.paused), this.userForcedPause = this.paused
				})), this.element ? .addEventListener("click", (() => {
					this.userForcedPause = !this.paused
				})), this.videoControl && window.matchMedia("(pointer: coarse)").matches && this.element ? .addEventListener("click", (() => {
					this.toggleVideo(this.paused), this.userForcedPause = this.paused
				})), this.connection && (this.sufficientConnection = this.checkConnectivity()), this.plyr.on("play", (() => {
					this.didPlay = !0, this.element ? .closest(".c-hero-teaser__background-video") && this.videoControl ? .classList.remove("is-paused")
				})), this.plyr.on("pause", (() => {
					this.element ? .closest(".c-hero-teaser__background-video") && this.videoControl ? .classList.add("is-paused")
				})), this.options.autoplayMinimumConnection && !this.prefersReducedMotion && (this.element.preload = "auto", this.element.autoplay = !0, this.options.autoplay = !0, this.toggleVideo(this.connection && this.sufficientConnection))
			} else d.warn('WARNING: You are using "Video" without its necessary dependency "Plyr".')
		}
		checkConnectivity() {
			const e = this.options.autoplayMinimumConnection ? ? "4g";
			return He[this.connection ? .effectiveType] >= He[e]
		}
		handleVisibilityChange() {
			document.hidden ? this.toggleVideo(!1) : !(this.options.autoplay && !this.options.autoplayMinimumConnection || this.options.autoplayMinimumConnection && this.sufficientConnection) || this.userForcedPause || this.prefersReducedMotion || this.toggleVideo(!0)
		}
		toggleVideo(e) {
			e ? (this.play(), this.videoControl ? .classList.remove("is-paused")) : (this.pause(), this.videoControl ? .classList.add("is-paused"))
		}
		play() {
			this.plyr ? .play()
		}
		pause() {
			this.plyr ? .pause()
		}
		get paused() {
			return this.plyr ? .paused
		}
	}
	ze.componentName = "video", ze.componentSelector = ".js-video", ze.defaultOptions = {
		debug: !1,
		autoplay: !1,
		invertTime: !1,
		controls: ["play", "play-large", "progress", "current-time", "mute", "volume", "captions", "fullscreen"],
		fullscreen: {
			fallback: !0
		},
		youtube: {
			noCookie: !0
		},
		urls: {
			youtube: {
				api: ""
			}
		},
		autoplayMinimumConnection: null
	}, ze.register(), I.Plyr = c;
	class Re extends O {
		constructor() {
			super(...arguments), this.$$trigger = this.$$element.query(this.options.triggerSelector), this.$$trigger.on("click", (e => {
				e.preventDefault(), window.scrollTo(0, 0)
			}))
		}
	}
	Re.componentName = "back-to-top", Re.componentSelector = ".js-back-to-top", Re.defaultOptions = {
		triggerSelector: ".js-back-to-top-trigger"
	}, Re.register();
	class We extends Z {
		constructor() {
			super(...arguments), this.$$element.on("bronson_panelchanged", (() => {
				this.setGroupClass()
			})), this.setGroupClass()
		}
		setGroupClass() {
			this.element.classList.toggle("is-closed-within", -1 === this.selectedIndex)
		}
	}
	We.componentName = "expandable-content", We.componentSelector = ".c-expandable-content", We.defaultOptions = Z.extendDefaultOptions({
		btnSelector: ".c-expandable-content__trigger",
		panelSelector: ".c-expandable-content__collapse"
	}), We.register();
	var Be = 0;

	function Ge(e) {
		return "__private_" + Be++ + "_" + e
	}

	function Ke(e, t) {
		if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
		return e
	}
	var Ue, Ye = Ge("calculateHeightAndLines");
	class Xe extends ie {
		constructor() {
			super(...arguments), Object.defineProperty(this, Ye, {
				value: Je
			});
			const e = Array.from(this.element.querySelectorAll(".js-compare-and-select__details")),
				t = getComputedStyle(this.element).getPropertyValue("--bron-compare-select-accordion-breakpoint");
			if (this.options.preserveHeight && (this.headers = Array.from(this.element.querySelectorAll(".c-compare-and-select__title")) ? ? [], this.subheaders = Array.from(this.element.querySelectorAll(".c-compare-and-select__pricing")) ? ? [], window.ResizeObserver && (this.ro = new ResizeObserver((e => {
					for (const t of e) t.target && Ke(this, Ye)[Ye]()
				})), this.ro.observe(this.element))), Ke(this, Ye)[Ye](), t) {
				const s = window.matchMedia(`(min-width: ${t})`),
					i = t => {
						t.matches ? e.forEach((e => {
							e.setAttribute("open", !0)
						})) : e.forEach((e => {
							e.removeAttribute("open")
						}))
					};
				s.matches && i({
					matches: s.matches
				}), s.addEventListener("change", i)
			}
			new MutationObserver((e => {
				e.filter((e => "attributes" === e.type && !(this.headers ? .includes(e.target) || this.subheaders ? .includes(e.target)))).find((e => "data-container-initialized" === e.attributeName)) && !this.options.preserveHeight && this.flickitySlider ? .resize()
			})).observe(this.element, {
				attributes: !0,
				subtree: !0
			})
		}
	}

	function Je() {
		setTimeout((() => {
			this.headers ? .forEach((e => e ? .style.setProperty("--bron-compare-and-select-min-height", "initial"))), this.subheaders ? .forEach((e => e ? .style.setProperty("--bron-compare-and-select-min-height", "initial")));
			const [e] = this.headers ? .map((e => e ? .clientHeight)).sort(((e, t) => e > t ? -1 : 1)) ? ? [], [t] = this.subheaders ? .map((e => e ? .clientHeight)).sort(((e, t) => e > t ? -1 : 1)) ? ? [];
			e && this.headers ? .forEach((t => t ? .style.setProperty("--bron-compare-and-select-min-height", `${e}px`))), t && this.subheaders ? .forEach((e => e ? .style.setProperty("--bron-compare-and-select-min-height", `${t}px`))), this.flickitySlider ? .resize()
		}), 100)
	}
	Xe.componentName = "compare-and-select", Xe.componentSelector = ".js-compare-and-select", Xe.defaultOptions = ie.extendDefaultOptions({
		preserveHeight: !1,
		flickity: {
			cellSelector: ".js-compare-and-select__item",
			cellAlign: "center",
			groupCells: "100%"
		}
	}), Xe.register();
	class Ze extends O {
		constructor() {
			super(...arguments);
			const {
				scrollOffset: e
			} = this.options;
			document.addEventListener("scroll", se((() => requestAnimationFrame((() => window.scrollY > e ? this.element.classList.add("is-collapsed") : this.element.classList.remove("is-collapsed")))), {
				delay: 250
			}))
		}
	}
	Ze.componentName = "action-buttons-container-toggle", Ze.componentSelector = ".js-action-buttons-container-toggle", Ze.defaultOptions = {
		scrollOffset: 200
	}, Ze.register();
	class Qe extends Z {}
	Qe.componentName = "card-responsive-collapse", Qe.componentSelector = ".js-card-responsive-collapse", Qe.defaultOptions = {
		btnSelector: ".js-card-responsive-collapse__toggle",
		panelSelector: ".js-card__body",
		btnAction: "toggle",
		panelClosedClass: "is-closed",
		useInert: !1
	}, Qe.register();
	var et = Ge("handleEscape"),
		tt = Ge("handleFocusTrap"),
		st = Ge("outsideClick"),
		it = Ge("setA11yAttributes");
	class nt extends O {
		constructor() {
			super(...arguments), Object.defineProperty(this, it, {
				value: at
			}), Object.defineProperty(this, st, {
				value: lt
			}), Object.defineProperty(this, tt, {
				value: rt
			}), Object.defineProperty(this, et, {
				value: ot
			});
			const {
				dropdownMenuTriggerSelector: e,
				dropdownMenuContainerSelector: t,
				flip: s,
				direction: i,
				open: n,
				showArrow: o
			} = this.options;
			this.triggerWrapper = this.element.querySelector(e), this.trigger = this.triggerWrapper ? .querySelector("button"), this.container = this.element.querySelector(t), this.containerOffset = getComputedStyle(this.element).getPropertyValue("--js-dropdown-container-offset") ? ? 0, this.triggerWrapper || this.trigger || this.container || console.error("Bronson dropdown needs a valid trigger and container,"), this.isVisible = n, o && (this.arrow = document.createElement("span"), this.arrow ? .classList.add("c-dropdown-container__arrow", "js-dropdown-container__arrow"), this.arrow ? .setAttribute("aria-hidden", "true"), this.container.prepend(this.arrow)), this.container ? .setAttribute("aria-hidden", !n), this.container ? .addEventListener("keydown", Ke(this, tt)[tt].bind(this), {
				capture: !0
			}), this.trigger ? .setAttribute("aria-controls", this.container ? .getAttribute("id")), this.trigger ? .setAttribute("aria-expanded", n), this.trigger ? .addEventListener("click", this.onClick.bind(this)), document.addEventListener("click", Ke(this, st)[st].bind(this), {
				capture: !0
			}), document.addEventListener("keydown", Ke(this, et)[et].bind(this), {
				capture: !0
			}), this.popper = r.createPopper(this.trigger, this.container, {
				placement: `${i}-start`,
				modifiers: [{
					name: "preventOverflow",
					options: {
						boundary: document.body
					}
				}, {
					name: "offset",
					options: {
						offset: [0, parseInt(this.containerOffset, 10)]
					}
				}, ...o ? [{
					name: "arrow",
					options: {
						element: this.arrow
					}
				}] : [], {
					name: "flip",
					options: {...!s && {
							fallbackPlacements: [i]
						}
					}
				}]
			})
		}
		close() {
			this.isVisible = !1, Ke(this, it)[it]()
		}
		show() {
			this.isVisible = !0, Ke(this, it)[it]()
		}
		toggle() {
			this.isVisible = !this.isVisible, Ke(this, it)[it]()
		}
		onClick() {
			this.toggle()
		}
	}

	function ot(e) {
		if ("Escape" === e.key) {
			const e = this.triggerWrapper ? .querySelector(Ue.focusableSelectors);
			this.close(), e ? .focus()
		}
	}

	function rt(e) {
		const {
			key: t,
			shiftKey: s
		} = e, i = Array.from(this.container ? .querySelectorAll(Ue.focusableSelectors)), n = i ? .at(0), o = i ? .at(-1);
		"Tab" === t && (s ? document.activeElement === n && (o.focus(), e.preventDefault()) : document.activeElement === o && (n.focus(), e.preventDefault()))
	}

	function lt(e) {
		!this.isVisible || e ? .target.closest(".c-dropdown-container__panel") || this.trigger ? .contains(e ? .target) || this.close()
	}

	function at() {
		this.container ? .setAttribute("aria-hidden", !this.isVisible), this.trigger ? .setAttribute("aria-expanded", this.isVisible)
	}
	Ue = nt, nt.componentName = "dropdown-container", nt.componentSelector = ".js-dropdown-container", nt.defaultOptions = O.extendDefaultOptions({
		dropdownMenuTriggerSelector: ".js-dropdown-container__trigger-wrapper",
		dropdownMenuContainerSelector: ".js-dropdown-container__panel",
		dropdownMenuArrowSelector: ".js-dropdown-container__arrow",
		direction: "bottom",
		flip: !0,
		open: !1,
		showArrow: !0
	}), nt.focusableSelectors = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])', nt.register();
	class ct extends O {
		constructor() {
			super(...arguments), this.init()
		}
		handleClick(e) {
			e.preventDefault(), e.stopPropagation();
			const t = this.target.getAttribute("aria-hidden");
			if (this.target.setAttribute("aria-hidden", "true" === t ? "false" : "true"), "false" === t ? this.target.setAttribute("inert", "") : this.target.removeAttribute("inert"), "true" !== t) {
				const {
					y: e
				} = this.target.getBoundingClientRect();
				e < 0 && this.target.scrollIntoView(!0)
			}
			this.relatedButtons.forEach((e => {
				e.setAttribute("aria-expanded", "true" === e.getAttribute("aria-expanded") ? "false" : "true")
			}))
		}
		init() {
			if (!this.options ? .targetId) return console.warn("Toggle: No target [id] was provided."), !1;
			const {
				hidden: e,
				targetId: t
			} = this.options;
			if (this.target = document.querySelector(`#${t}`), this.relatedButtons = Array.from(document.querySelectorAll(`${ct.componentSelector}[data-toggle-target-id="${t}"]`)), !this.target) return console.warn(`Toggle: No target found for [id]: '${t}'`), !1;
			this.element.setAttribute("id", this.options.id), this.element.setAttribute("aria-controls", t), this.element.setAttribute("aria-expanded", !e ? ? "false");
			const s = this.relatedButtons.reduce(((e, t) => `${e} ${t.id}`.trim()), "");
			this.target.classList.add(this.options.targetClass), this.target.setAttribute("aria-labelledby", s), this.target.setAttribute("aria-hidden", e), e ? this.target.setAttribute("inert", "") : this.target.removeAttribute("inert"), this.element ? .addEventListener("click", this.handleClick.bind(this))
		}
	}
	ct.componentName = "toggle", ct.componentSelector = ".js-toggle", ct.defaultOptions = O.extendDefaultOptions({
		targetClass: "js-toggle-target",
		hidden: !0
	}), ct.register();
	const ht = "ArrowDown",
		dt = "End",
		pt = "Enter",
		ut = "Escape",
		mt = "Home",
		gt = "PageDown",
		ft = "PageUp",
		bt = " ",
		vt = "ArrowUp",
		yt = 0,
		St = 1,
		Ct = 2,
		$t = 3,
		wt = 4,
		At = 5,
		Et = 6,
		kt = 7,
		_t = 9,
		xt = 10,
		Lt = 11;

	function Ot(e, t) {
		return t || e !== ht && e !== pt && e !== bt ? e === ht ? wt : e === vt ? Et : e === mt ? Ct : e === dt ? $t : e === ut ? yt : e === pt ? St : e === bt ? kt : e === ft ? xt : e === gt ? _t : Lt : At
	}
	class It extends O {
		constructor() {
			super(...arguments), this.comboEl = this.element.querySelector("[role=combobox]"), this.inputEl = this.element.querySelector('[role="combobox"]'), this.searchInputEl = this.element.querySelector(".js-combobox-search-input"), this.valueEl = this.element.querySelector(".js-combobox-value-presentation"), this.listboxEl = this.element.querySelector("[role=listbox]"), this.optionEls = Array.from(this.listboxEl.querySelectorAll('[role="option"]') ? ? []), this.searchInputEl ? .setAttribute("autocomplete", "off"), this.inputValues = this.element.querySelector(".js-combobox__input-values") || null, this.idBase = this.inputEl.id, this.selectOptions = this.getOptionsData(), this.valuePresentation = this.element.querySelector(`#${this.idBase}-values`), this.initialPlaceholder = this.valuePresentation.textContent || "", this.multiple = "true" === this.listboxEl.getAttribute("aria-multiselectable"), this.options.noOptionsMessage && this.listboxEl.setAttribute("data-combobox-no-options-message", this.options.noOptionsMessage), this.selectedOptions = [], this.activeIndex = 0, this.open = !1, this.inputEl.hasAttribute("aria-disabled") || this.inputEl.hasAttribute("aria-readonly") || (this.inputEl.addEventListener("focusout", this.onInputBlur.bind(this)), this.inputEl.addEventListener("click", this.onInputClick.bind(this)), this.inputEl.addEventListener("keydown", this.onInputKeyDown.bind(this)), this.searchInputEl ? .addEventListener("keyup", this.onSearchInputKeyUp.bind(this)), this.searchInputEl ? .addEventListener("search", this.onSearchInputSearch.bind(this)), this.initOptionElements()), this.checkPreSelectedOptions()
		}
		getOptionsData() {
			return this.optionEls.map(((e, t) => ({
				label: e.querySelector(this.options.selectItemTextSelector).textContent,
				value: e.getAttribute("data-value"),
				selected: "true" === e.getAttribute("aria-selected"),
				disabled: "true" === e.getAttribute("aria-disabled"),
				hidden: e.hasAttribute("hidden"),
				index: t
			})))
		}
		initOptionElements() {
			this.optionEls[0].classList.add(this.options.selectItemFocusClass), this.optionEls.forEach(((e, t) => {
				e.addEventListener("click", (() => {
					const e = this.visibleOptions.findIndex((e => e === this.optionEls[t]));
					this.onOptionClick(e)
				})), e.addEventListener("mousedown", this.onOptionMouseDown.bind(this))
			}))
		}
		checkPreSelectedOptions() {
			this.selectOptions.forEach(((e, t) => {
				e.selected && this.updateOption(t)
			}))
		}
		onInputKeyDown(e) {
			const {
				key: t
			} = e, s = Ot(t, this.open), i = function(e, t, s) {
				const i = t - 1,
					n = e === i;
				switch (s) {
					case Ct:
						return 0;
					case $t:
						return i;
					case Et:
						return Math.max(0 === e ? i : 0, e - 1);
					case xt:
						return Math.max(0, e - 10);
					case wt:
						return Math.min(n ? 0 : t, e + 1);
					case _t:
						return Math.min(i, e + 10);
					default:
						return e
				}
			}(this.activeIndex, this.selectOptions.length, s);
			switch (s) {
				case wt:
				case _t:
				case $t:
				case Ct:
				case Et:
				case xt:
					return e.preventDefault(), this.onOptionChange(i);
				case kt:
					return e.preventDefault(), this.multiple || this.updateMenuState(!1), this.updateOption(this.activeIndex);
				case St:
					return e.preventDefault(), this.updateMenuState(!1), this.updateOption(this.activeIndex), this.resetSearchInput();
				case yt:
					return e.preventDefault(), this.updateMenuState(!1), this.resetSearchInput();
				case At:
					return this.updateActiveDescendent(this.activeIndex), this.updateMenuState(!0)
			}
		}
		onInputClick(e) {
			const t = e.target.getAttribute("role");
			if ("group" === t || "presentation" === t) return;
			let s;
			const i = e.target === this.inputEl;
			!this.open && this.searchInputEl && setTimeout((() => this.searchInputEl.focus()), 100), s = (!this.open || !i) && (!!this.multiple || i), this.updateMenuState(s)
		}
		onInputBlur() {
			this.searchInputEl ? this.ignoreBlur = !1 : this.open && this.updateMenuState(!1, !1)
		}
		onOptionChange(e) {
			this.activeIndex = e, this.updateActiveDescendent(e), this.optionEls.forEach((e => {
				e.classList.remove(this.options.selectItemFocusClass)
			}));
			const t = this.visibleOptions[e];
			t ? .classList.add(this.options.selectItemFocusClass), this.open && t ? .scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start"
			})
		}
		onOptionClick(e) {
			this.onOptionChange(e), this.updateOption(e), this.multiple || this.updateMenuState(!1)
		}
		onOptionMouseDown() {
			this.ignoreBlur = !0
		}
		onOptionSelection(e) {
			this.updateOption(e.target.selectedIndex)
		}
		getOptionDisabled(e) {
			return this.selectOptions[e].disabled
		}
		updateOption(e) {
			if (this.getOptionDisabled(e)) return;
			const t = this.selectOptions[e];
			if (this.multiple) {
				const e = this.selectedOptions.findIndex((e => {
					let {
						label: s,
						value: i
					} = e;
					return s === t.label && i === t.value
				}));
				e > -1 ? (this.selectedOptions.splice(e, 1), this.updateSelectedOptions(this.selectedOptions)) : this.updateSelectedOptions([...this.selectedOptions, t])
			} else this.selectedOptions = [], this.updateSelectedOptions([t]);
			this.updateLabel(t)
		}
		updateMenuState(e, t) {
			void 0 === t && (t = !0), this.open = e, this.comboEl.setAttribute("aria-expanded", `${e}`), t && (this.searchInputEl ? this.searchInputEl.focus() : this.inputEl.focus()), this.open ? this.updateActiveDescendent(this.activeIndex) : setTimeout((() => {
				this.resetSearchInput()
			}), 250)
		}
		updateSelectedOptions(e) {
			this.selectedOptions = e, this.optionEls.forEach((e => {
				const t = !!this.selectedOptions.filter((t => e.getAttribute("data-value") === t.value)).length;
				e.setAttribute("aria-selected", `${t}`)
			})), this.storeOptionValues(e)
		}
		storeOptionValues(e) {
			this.inputValues && this.inputValues.setAttribute("value", function(e) {
				return e.map((e => e.value)).join()
			}(e))
		}
		updateLabel(e) {
			if (this.options.valueFormatter) this.valuePresentation.textContent = this.options.valueFormatter(this.selectedOptions);
			else {
				const {
					length: t
				} = this.selectedOptions;
				this.valuePresentation.classList.toggle("has-placeholder", t <= 0), this.valuePresentation.textContent = this.formatValue(e)
			}
		}
		onSearchInputKeyUp(e) {
			const t = e ? .target ? .classList.contains("js-combobox-search-input"),
				s = e ? .target ? .value ? .toLowerCase(),
				i = Ot(e.key, null);
			t && i === Lt && (this.optionEls.forEach((e => e.getAttribute("data-value").toLowerCase().includes(s) ? e.removeAttribute("hidden") : e.setAttribute("hidden", "true"))), this.selectOptions = this.getOptionsData().filter((e => !e.hidden)), this.listboxEl.classList.toggle("has-no-options", 0 === this.visibleOptions ? .length), this.visibleOptions.forEach((e => e.classList.remove("is-focused"))), this.visibleOptions[0] ? .classList.add("is-focused"), this.updateActiveDescendent(0), this.activeIndex = 0)
		}
		onSearchInputSearch(e) {
			e ? .target ? .value || this.resetSearchInput()
		}
		resetSearchInput() {
			this.searchInputEl && (this.searchInputEl.value = "", this.optionEls.forEach((e => e.removeAttribute("hidden"))), this.selectOptions = this.getOptionsData(), this.listboxEl.classList.remove("has-no-options"))
		}
		formatValue(e) {
			const {
				length: t
			} = this.selectedOptions;
			return this.multiple ? t ? `(${t}) ${this.options.selectionLabel}` : this.initialPlaceholder : e ? .label
		}
		updateActiveDescendent(e) {
			const t = this.visibleOptions[e] ? .id;
			this.inputEl.setAttribute("aria-activedescendant", t ? ? "")
		}
		get visibleOptions() {
			return this.optionEls.filter((e => !e.hasAttribute("hidden")))
		}
	}
	It.componentName = "combobox", It.componentSelector = ".js-combobox", It.defaultOptions = {
		selectItemTextSelector: ".c-combobox__item__text",
		selectItemFocusClass: "is-focused",
		selectionLabel: "Options",
		valueFormatter: null,
		noOptionsMessage: "No options found."
	}, It.register();
	const Nt = Object.assign(N, {
		init() {
			N.$$((() => {
				m.initAll()
			}))
		},
		Utils: p
	});
	Nt.init();
	class Tt extends O {
		static togglePanelFromTargetAsMobile(e, t) {
			let {
				currentTarget: s
			} = e;
			const i = s.nextElementSibling;
			i && (s.classList.toggle("is-open-on-mobile", t), i.classList.toggle("is-open-on-mobile", t))
		}
		constructor() {
			super(...arguments), ["closePanelFromTargetAsDesktop", "_outsideAction", "_onEsc"].forEach((e => {
				this[e] = this[e].bind(this)
			})), this.$$triggerElements = Tt.$$(".js-mega-menu-trigger"), this.$$innerElement = this.query(".js-mega-menu"), [this.innerElement] = this.$$innerElement.items, this.$$buttonsLevel1 = this.query(".c-mega-menu__link--level-one:not(a)"), this.$$buttonsLevel2 = this.query(".c-mega-menu__link--level-two:not(a)"), this._initEvents(), this.collapse(), requestAnimationFrame((() => {
				requestAnimationFrame((() => {
					this.innerElement.tabIndex = -1, this.innerElement.style.outline = "none", this.element.classList.add("js-is-loaded"), this.$$innerElement.removeClass("js-is-not-loaded").addClass(Tt.openLevelClasses[0])
				}))
			}))
		}
		_initEvents() {
			this.$$triggerElements.on("click", (e => {
				this.toggle(), e.preventDefault()
			})), this.$$buttonsLevel1.on("click", Tt.togglePanelFromTargetAsMobile), this.$$buttonsLevel2.on("click", Tt.togglePanelFromTargetAsMobile), this.$$buttonsLevel1.on("click", (e => {
				let {
					currentTarget: t
				} = e;
				this.openPanelFromTargetAsDesktop(t, 1)
			})), this.$$buttonsLevel2.on("click", (e => {
				let {
					currentTarget: t
				} = e;
				this.openPanelFromTargetAsDesktop(t, 2)
			}))
		}
		_outsideAction(e) {
			let {
				target: t
			} = e;
			this.innerElement.contains(t) || this.$$triggerElements.callAll("contains", t).some((e => e)) || this.collapse()
		}
		_onEsc(e) {
			let {
				keyCode: t,
				defaultPrevented: s,
				target: i
			} = e;
			27 !== t || s || i.matches("input, select, textarea") || this.collapse()
		}
		closeAllPanelsAsDesktop(e) {
			1 === e && this.$$buttonsLevel1.forEach(this.closePanelFromTargetAsDesktop), this.$$buttonsLevel2.forEach(this.closePanelFromTargetAsDesktop)
		}
		togglePanelFromTargetAsDesktop(e, t, s) {
			const i = e.nextElementSibling;
			i && (Tt.$$([e, i]).toggleClass("is-open-on-desktop", t), t && (this.setMinHeight(), 1 === s && this.positionSubMenu(e.closest(".c-mega-menu__list"), i)))
		}
		setMinHeight() {
			setTimeout((() => {
				const e = this.query(".c-mega-menu__list.is-open-on-desktop").getAll("offsetHeight").items,
					t = window.getComputedStyle(this.$$innerElement.items[0]),
					s = Math.max(...e) + (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0);
				Number.isFinite(s) && requestAnimationFrame((() => {
					this.innerElement.style.minHeight = `${s}px`
				}))
			}), 0)
		}
		closePanelFromTargetAsDesktop(e) {
			this.togglePanelFromTargetAsDesktop(e, !1)
		}
		openPanelFromTargetAsDesktop(e, t) {
			void 0 === t && (t = 0), this.closeAllPanelsAsDesktop(t), this.$$innerElement.addClass(...Tt.openLevelClasses.slice(0, t + 1)), this.togglePanelFromTargetAsDesktop(e, !0, t)
		}
		positionSubMenu(e, t) {
			const s = this.element.querySelectorAll(".c-mega-menu__link");
			let i;
			for (let e = 0; e < s.length; e++) {
				const t = s[e];
				if (t.offsetWidth > 0 && t.offsetHeight > 0) {
					i = t;
					break
				}
			}
			const n = i.offsetParent ? i.offsetParent.offsetTop : 0,
				o = i.offsetTop + n,
				r = -(e.offsetTop - o);
			requestAnimationFrame((() => {
				t.style.top = `${r}px`
			}))
		}
		removeGlobalEvents() {
			Tt.$$(document).off("keydown", this._onEsc).off("mousedown", this._outsideAction).off("click", this._outsideAction).off("focus", this._outsideAction)
		}
		expand() {
			this.$$triggerElements.addClass("is-open"), this.$$element.removeClass("is-closed"), this.$$triggerElements.attr("aria-expanded", !0), document.body.classList.add("mega-menu-open"), this.removeGlobalEvents(), setTimeout((() => {
				Tt.$$(document).on("keydown", this._onEsc).on("mousedown", this._outsideAction).on("click", this._outsideAction).on("focus", this._outsideAction)
			}))
		}
		collapse() {
			this.$$triggerElements.removeClass("is-open"), this.$$element.addClass("is-closed"), this.$$triggerElements.attr("aria-expanded", !1), document.body.classList.remove("mega-menu-open"), this.removeGlobalEvents()
		}
		toggle() {
			this.setMinHeight(), this.element.classList.contains("is-closed") ? this.expand() : this.collapse()
		}
	}
	Tt.componentName = "megamenu", Tt.componentSelector = ".js-mega-menu-wrap", Tt.openLevelClasses = ["c-mega-menu--first-level-is-open", "c-mega-menu--second-level-is-open", "c-mega-menu--third-level-is-open"], Tt.register();
	class jt extends O {
		constructor() {
			super(...arguments);
			("button" === this.options.trigger ? this.$$element.query("li, .c-mega-menu-dropdown__item").eq(0) : this.$$element).on("click", (() => {
				this.$$element.toggleClass("is-open")
			}))
		}
	}
	var Pt;
	jt.componentName = "mega-menu-dropdown", jt.componentSelector = "#js-mega-menu-dropdown", jt.defaultOptions = {
		trigger: "list"
	}, jt.register();
	class qt extends ie {}
	Pt = qt, qt.componentName = "tab-nav", qt.componentSelector = ".js-tab-nav", qt.activeSelector = ".is-active", qt.defaultOptions = Pt.extendDefaultOptions({
		selectSelector: Pt.activeSelector,
		flickity: {
			initialIndex: Pt.activeSelector,
			cellSelector: ".js-tab-nav__item",
			cellAlign: "left",
			freeScroll: !0,
			draggable: !0,
			contain: !0,
			percentPosition: !1,
			groupCells: "100%",
			pageDots: !1
		}
	}), qt.register();
	class Dt extends O {
		constructor() {
			super(...arguments), this.clone = this.element.cloneNode(), Dt.$$(this.clone).attr({
				"aria-hidden": "true",
				tabindex: "-1",
				id: null
			}).getAll("style").set({
				visibility: "hidden"
			}), this.isSticky = !1, this.checkState = this.checkState.bind(this), this.throttledCheckState = re(this.checkState), Dt.$$(window).on("scroll", this.checkState).on("load", this.throttledCheckState, !0).on("resize", this.throttledCheckState), this.checkState()
		}
		changeSticky(e, t) {
			if (e === this.isSticky) return;
			this.isSticky = e;
			const s = !t && e ? this.element.offsetHeight : t;
			requestAnimationFrame((() => {
				const {
					stickyClass: e
				} = this.options;
				this.isSticky ? (this.clone.style.height = `${s}px`, this.element.before(this.clone), this.element.classList.add(e)) : (this.clone.remove(), this.element.classList.remove(e))
			}))
		}
		checkState() {
			const e = this.isSticky ? this.clone : this.element,
				{
					top: t,
					addHeight: s
				} = this.options,
				{
					top: i
				} = e.getBoundingClientRect(),
				n = s ? this.element.offsetHeight : 0,
				o = i - (t - n) <= 0;
			this.changeSticky(o, n)
		}
	}
	Dt.componentName = "simple-sticky", Dt.componentSelector = ".js-simple-sticky", Dt.defaultOptions = {
		top: 0,
		stickyClass: "is-sticky",
		addHeight: !1
	}, Dt.register();
	class Ft extends Dt {}
	Ft.componentName = "sticky-button", Ft.componentSelector = "#js-sticky-button", Ft.defaultOptions = Dt.extendDefaultOptions({
		addHeight: !0
	}), Ft.register();
	class Vt extends O {
		constructor() {
			super(...arguments), this.modifyOptions(), [this.sliderComponent] = this.$$element.component("basic-slider", this.options).items, this.flickitySlider = this.sliderComponent.flickitySlider, this.analyticsHelper = new Q(this.$$element, "slideable"), this.flickitySlider.on("change", this.analyticsHelper.setState.bind(this))
		}
		modifyOptions() {
			const {
				options: e
			} = this, {
				autoplay: t,
				flickity: s,
				defaultAutoplayDuration: i
			} = e;
			null == s.autoPlay && t && (s.autoPlay = Number.isFinite(t) ? t : i), s.autoPlay && (s.adaptiveHeight = !1)
		}
	}
	Vt.componentName = "hero-slider", Vt.componentSelector = ".js-hero-slider", Vt.defaultOptions = {
		defaultAutoplayDuration: 5e3,
		flickity: {
			wrapAround: !0,
			freeScroll: !1,
			draggable: !1,
			adaptiveHeight: !0,
			pageDots: !0,
			prevNextButtons: !1
		}
	}, Vt.register();
	class Mt extends O {
		constructor() {
			super(...arguments);
			const {
				highlightSelector: e
			} = this.options;
			this.$$highlightAreas = this.query(e), this.$$highlightAreas.on("click", (e => {
				let {
					currentTarget: t
				} = e;
				this.selectArea(t)
			})), this.initTooltip()
		}
		initTooltip() {
			const {
				tooltipSelector: e
			} = this.options;
			i ? i(e, {
				arrow: !0,
				hideOnClick: !1,
				interactive: !1,
				placement: "top",
				theme: "bright",
				animation: "default",
				followCursor: !0,
				plugins: [i.followCursor]
			}) : document.querySelector(e) && d.warn("WARNING: You are using the tooltip without its necessary dependency TippyJS.")
		}
		selectArea(e) {
			const {
				highlightClass: t,
				selectAction: s
			} = this.options;
			this.$$highlightAreas.removeClass(t), e.classList[s](t)
		}
	}
	Mt.componentName = "interactive-map", Mt.componentSelector = ".js-map", Mt.defaultOptions = {
		highlightClass: "is-active",
		tooltipSelector: ".js-map-tooltip",
		highlightSelector: ".js-map-highlight",
		selectAction: "add"
	}, Mt.register(), i && (I.tippy = i);
	class Ht extends O {
		constructor() {
			super(...arguments), ["reflectState", "setState"].forEach((e => {
				this[e] = this[e].bind(this)
			})), this.reflectState = re(this.reflectState), this.setTarget(this.options.target)
		}
		setTarget(e) {
			const {
				controlledComponent: t
			} = this.options;
			e && !this.hasTarget && (this.$$panelGroupElement = Ht.$$(e), this.$$panelGroupElement.items[0] && ([this.panelGroup] = this.$$panelGroupElement.component(t).items, this.panelGroup && (this.hasTarget = !0, this.element.multiple = !!this.panelGroup.options.multiple, this.$$panelGroupElement.on("bronson_pangelchanged", this.reflectState), this.$$element.on("change", this.setState), this.panelGroup.options.defaultCollapsed ? this.reflectState() : this.setState())))
		}
		reflectState() {
			Array.from(this.element.options).forEach((e => {
				const {
					value: t
				} = e;
				if (!t) return;
				const s = Ht.$$(`#${t}`).component("panel").getFirst("isCollapsed");
				e.selected = null != s && s
			}))
		}
		setState() {
			Array.from(this.element.options).forEach((e => {
				const {
					value: t,
					selected: s
				} = e;
				t && Ht.$$(`#${t}`).component("panel").set("isCollapsed", !s)
			}))
		}
	}
	Ht.componentName = "panelgroup-select", Ht.componentSelector = ".js-panelgroup-select", Ht.defaultOptions = {
		target: "",
		controlledComponent: "panelgroup"
	}, Ht.register(), Z.addElementPlugin({
		selectSelector: ".js-panelgroup__select"
	}, ((e, t) => {
		Ht.$$(e).component("panelgroup-select", {
			controlledComponent: t.constructor.componentName,
			target: t.element
		})
	}));
	class zt extends Z {}
	zt.componentName = "multi-accordion", zt.componentSelector = ".js-multi-accordion", zt.defaultOptions = Z.extendDefaultOptions({
		selectSelector: ".js-multi-accordion__select",
		panelSelector: ".js-multi-accordion__section",
		panelToggleClass: "u-hide",
		defaultCollapsed: !1
	}), zt.register();
	class Rt extends ie {}
	Rt.componentName = "thumbnail-slider", Rt.componentSelector = ".js-thumbnail-slider-container", Rt.defaultOptions = ie.extendDefaultOptions({
		elementSelector: ".js-thumbnail-slider",
		flickity: {
			cellSelector: ".c-thumbnail-slider__item",
			pageDots: !0,
			cellAlign: "left",
			imagesLoaded: !0,
			groupCells: !0
		}
	}), Rt.register();
	class Wt extends ie {
		constructor() {
			super(...arguments), this.$$itemsWrapper = this.query(".js-fancy-finder__items-wrapper")
		}
		toggleItemsWrapper() {
			this.$$element.toggleClass(this.options.closedSelector), this.$$itemsWrapper.toggleAutoHeightTransition(this.options.closedSelector)
		}
	}
	Wt.componentName = "fancy-finder", Wt.componentSelector = ".js-fancy-finder", Wt.defaultOptions = ie.extendDefaultOptions({
		elementSelector: ".js-fancy-finder__slider",
		closedSelector: "is-closed",
		flickity: {
			cellSelector: ".js-fancy-finder__filter-item",
			pageDots: !0,
			draggable: !1
		}
	}), Wt.register();
	class Bt extends O {
		constructor() {
			super(...arguments), this.$$element.on("click", (() => {
				this.$$element.toggleClass("is-asc")
			}))
		}
	}
	Bt.componentName = "table-list", Bt.componentSelector = ".c-table-list__header-label", Bt.register();
	const Gt = {
		init() {
			document.addEventListener("DOMContentLoaded", (() => {
				Tt.init(), jt.init(), qt.init(), Ft.init(), Vt.init(), fe.init(), zt.init(), Rt.init(), Wt.init(), Bt.init()
			}))
		},
		MegaMenu: Tt,
		MegaMenuDropdown: jt,
		TabNav: qt,
		StickyButton: Ft,
		HeroSlider: Vt,
		ToastNotification: fe,
		MultiAccordion: zt,
		ThumbnailSlider: Rt,
		FancyFinder: Wt,
		TableList: Bt
	};
	return Gt.init(), Object.assign(Nt, Gt)
}));