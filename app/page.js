"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatBdPhone(raw) {
  let digits = (raw || "").replace(/\D/g, "");
  // strip country code variants
  if (digits.startsWith("880")) digits = digits.slice(3);
  if (digits.startsWith("0") && digits.length > 11) digits = digits.slice(0, 11);
  // ensure leading 0 for 10-digit input starting with 1
  if (digits.length === 10 && digits.startsWith("1")) digits = "0" + digits;
  digits = digits.slice(0, 11);
  // format: 01XXX-XXXXXX
  if (digits.length > 5) {
    return digits.slice(0, 5) + "-" + digits.slice(5);
  }
  return digits;
}

function useAutoScroll(speed = 0.5) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    let paused = false;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("touchend", onLeave, { passive: true });
    const tick = () => {
      if (!paused && el) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          if (el.scrollLeft >= max - 1) {
            el.scrollTo({ left: 0, behavior: "auto" });
          } else {
            el.scrollLeft += speed;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onEnter);
      el.removeEventListener("touchend", onLeave);
    };
  }, [speed]);
  return ref;
}

const heroSlides = [
  "/assets/lifestyle/prestige-lifestyle-1.png",
  "/assets/lifestyle/yn-lifestyle-1.png",
  "/assets/lifestyle/prestige-lifestyle-2.png",
  "/assets/lifestyle/yn-lifestyle-2.png",
  "/assets/lifestyle/prestige-lifestyle-3.png",
  "/assets/lifestyle/yn-lifestyle-3.png",
  "/assets/lifestyle/yn-lifestyle-4.png"
];

const products = {
  yn: {
    key: "yn",
    name: "YN মাল্টি কুকার",
    tagline: "১.৮ লিটার - ডেইলি রান্নার স্মার্ট সঙ্গী",
    capacity: "১.৮ লিটার",
    price: 650,
    oldPrice: 1200,
    hero: "/assets/product/yn-product-image.png",
    gallery: [
      "/assets/lifestyle/yn-lifestyle-1.png",
      "/assets/lifestyle/yn-lifestyle-2.png",
      "/assets/lifestyle/yn-lifestyle-3.png",
      "/assets/lifestyle/yn-lifestyle-4.png"
    ],
    colors: [{ label: "ক্লাসিক", value: "ক্লাসিক" }],
    points: [
      "মাল্টি-ফাংশন কুকিং - ভাত, তরকারি, স্যুপ, নুডলস সব এক পটে",
      "ফুড গ্রেড সেফ ম্যাটেরিয়াল, স্বাস্থ্যের জন্য নিরাপদ",
      "ইজি-ক্লিন কোটিং, ধোয়া হয় খুব সহজে",
      "১.৮ লিটার ক্যাপাসিটি - ছোট পরিবারের জন্য পারফেক্ট"
    ],
    features: [
      { icon: "🍳", label: "মাল্টি-ফাংশন কুকিং" },
      { icon: "🛡️", label: "ফুড গ্রেড সেফটি" },
      { icon: "✨", label: "ইজি-ক্লিন কোটিং" }
    ],
    freebies: []
  },
  prestige: {
    key: "prestige",
    name: "Prestige Electric Multi-Cooker",
    tagline: "Colorful & Convenient - ২ লিটার",
    capacity: "২ লিটার",
    price: 850,
    oldPrice: 1500,
    badge: "LIMITED OFFER",
    hero: "/assets/product/prestige-red.png",
    gallery: [
      "/assets/lifestyle/prestige-lifestyle-1.png",
      "/assets/lifestyle/prestige-lifestyle-2.png",
      "/assets/lifestyle/prestige-lifestyle-3.png"
    ],
    colors: [
      { label: "লাল", value: "লাল", image: "/assets/product/prestige-red.png", inStock: true },
      { label: "হলুদ", value: "হলুদ", image: "/assets/product/prestige-yellow.png", inStock: false },
      { label: "সবুজ", value: "সবুজ", image: "/assets/product/prestige-green.png", inStock: false }
    ],
    points: [
      "ইলেকট্রিক মাল্টি-কুকার - রান্না হবে ঝামেলাহীন",
      "২ লিটার বড় ক্যাপাসিটি - ফ্যামিলি সাইজ",
      "৩টি সুন্দর কালার - রান্নাঘরে আনে নতুন লুক",
      "লং লাস্টিং বিল্ড, প্রিমিয়াম কোয়ালিটি"
    ],
    features: [
      { icon: "⚡", label: "ইলেকট্রিক হিটিং" },
      { icon: "🎨", label: "৩টি কালার অপশন" },
      { icon: "🍲", label: "২ লিটার ক্যাপাসিটি" }
    ],
    freebies: [
      "🍚 রাইস মেজারিং পট ফ্রি",
      "🥣 মম বাটি ফ্রি",
      "🥄 চামচ ফ্রি"
    ]
  }
};

const testimonialData = [
  {
    name: "সাবিহা আক্তার, মিরপুর",
    text: "YN পটটা একদম ডেইলি ইউজের জন্য পারফেক্ট। দ্রুত গরম হয়, পরিষ্কারও সহজ।",
    product: "YN"
  },
  {
    name: "রিমি রহমান, খুলনা",
    text: "Prestige এর হলুদ কালারটা নিয়েছি, রান্নাঘরে দেখতেই মন ভালো হয়ে যায়।",
    product: "Prestige"
  },
  {
    name: "মাহিনূর ইসলাম, চট্টগ্রাম",
    text: "দুইটাই অর্ডার করেছি। কোয়ালিটি দামের তুলনায় অসাধারণ।",
    product: "YN + Prestige"
  },
  {
    name: "তানিয়া সুলতানা, সিলেট",
    text: "ফ্রি গিফটগুলো পেয়ে অনেক খুশি হয়েছি। প্যাকেজিংও দারুণ ছিল।",
    product: "Prestige"
  },
  {
    name: "ফারজানা পারভিন, রাজশাহী",
    text: "ছোট পরিবারের জন্য YN একদম পারফেক্ট সাইজ। দামটাও সাধ্যের মধ্যে।",
    product: "YN"
  },
  {
    name: "শারমিন আক্তার, ঢাকা",
    text: "ডেলিভারি সময়মতো পেয়েছি। ইলেকট্রিক কুকার সত্যিই সময় বাঁচায়।",
    product: "Prestige"
  }
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState("prestige");
  const [selectedColor, setSelectedColor] = useState("লাল");
  const [heroIndex, setHeroIndex] = useState(0);

  const [ynGallery, setYnGallery] = useState(products.yn.gallery);
  const [prestigeGallery, setPrestigeGallery] = useState(products.prestige.gallery);
  const [reviews, setReviews] = useState(testimonialData);

  useEffect(() => {
    setYnGallery(shuffle(products.yn.gallery));
    setPrestigeGallery(shuffle(products.prestige.gallery));
    setReviews(shuffle(testimonialData));
  }, []);

  const ynRailRef = useAutoScroll(0.4);
  const prestigeRailRef = useAutoScroll(0.4);
  const reviewRailRef = useAutoScroll(0.3);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const active = products[selectedProduct];
  const activeColors = active.colors;
  const previewImage =
    activeColors.find((c) => c.value === selectedColor)?.image || active.hero;

  function handleProductChange(key) {
    setSelectedProduct(key);
    const firstAvailable = products[key].colors.find((c) => c.inStock !== false) || products[key].colors[0];
    setSelectedColor(firstAvailable.value);
  }

  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const order = Object.fromEntries(form.entries());
    const productName = products[order.product]?.name || order.product;
    const productPrice = products[order.product]?.price;
    const cleanPhone = (order.phone || "").replace(/\D/g, "");

    const qty = parseInt(order.quantity, 10) || 1;
    const totalPrice = productPrice ? productPrice * qty : 0;
    const prettyPhone = formatBdPhone(cleanPhone);

    const payload = {
      _subject: `🛒 নতুন অর্ডার - ${productName} | ৳${totalPrice} | ${order.name}`,
      _cc: "azimrupok109@gmail.com",
      _template: "table",
      _captcha: "false",
      _replyto: cleanPhone,
      "🛍️ প্রোডাক্ট": productName,
      "🎨 কালার": order.color,
      "🔢 পরিমাণ": `${qty} পিস`,
      "💰 মোট দাম": `৳ ${totalPrice} (প্রতি পিস ৳${productPrice})`,
      "👤 কাস্টমারের নাম": order.name,
      "📞 ফোন নম্বর": prettyPhone,
      "📍 এলাকা": order.area,
      "🏠 ডেলিভারি ঠিকানা": order.address,
      "🕐 অর্ডার সময়": new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }) + " (BD)",
      "🌐 সোর্স": "yn-prestige.vercel.app"
    };

    // WhatsApp fallback message (most reliable delivery for BD)
    const waMsg = encodeURIComponent(
      `🛒 নতুন অর্ডার\n\n` +
        `👤 নাম: ${order.name}\n` +
        `📞 ফোন: ${formatBdPhone(cleanPhone)}\n` +
        `📦 প্রোডাক্ট: ${productName}\n` +
        `🎨 কালার: ${order.color}\n` +
        `🔢 পরিমাণ: ${order.quantity} পিস\n` +
        `💰 দাম: ৳ ${productPrice || ""}\n` +
        `📍 এরিয়া: ${order.area}\n` +
        `🏠 ঠিকানা: ${order.address}`
    );
    const waUrl = `https://wa.me/8801604074609?text=${waMsg}`;

    let emailOk = false;
    try {
      setSubmitting(true);
      const res = await fetch(
        "https://formsubmit.co/ajax/mazharronydxb@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
      const data = await res.json().catch(() => ({}));
      emailOk = res.ok && data.success !== false;
    } catch (err) {
      emailOk = false;
    }

    setConfirmation({
      type: "success",
      name: order.name,
      product: productName,
      color: order.color,
      quantity: order.quantity,
      phone: formatBdPhone(cleanPhone),
      price: productPrice,
      waUrl,
      emailOk
    });
    formEl.reset();
    setPhone("");
    setSelectedProduct("prestige");
    setSelectedColor("লাল");
    setSubmitting(false);
  }

  return (
    <main>
      <header className="top-bar">
        <a href="#" className="brand" aria-label="Shobkichu Kitchen">
          <Image
            src="/logo.svg"
            alt="সবকিছু কিচেন"
            width={140}
            height={42}
            priority
          />
        </a>
        <div className="top-actions">
          <a href="tel:+8801604074609" className="top-phone" aria-label="কল করুন">
            📞 +880 16 0407 4609
          </a>
          <a href="#order-now" className="top-cta">
            এখনই অর্ডার দিন
          </a>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <p className="tag-pill">লেডিস ফেভারিট কিচেন কালেকশন</p>
          <h1>
            একই জায়গায় <span className="accent-text">YN</span> ও{" "}
            <span className="accent-text">Prestige</span> কুকিং পট
          </h1>
          <p className="hero-subtitle">
            স্টাইল, স্পিড আর সাশ্রয় - তিনটাই এক প্যাকেজে। আপনার পছন্দের প্রোডাক্ট
            বেছে নিন, সীমিত অফারে আজই অর্ডার করুন।
          </p>
          <div className="hero-points">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span>সারা বাংলাদেশে ডেলিভারি</span>
            <span>৭ দিনের রিপ্লেসমেন্ট</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="hero-carousel">
            <div className="hero-track">
              {heroSlides.map((src, idx) => (
                <div
                  key={src}
                  className={`hero-slide ${idx === heroIndex ? "active" : ""}`}
                  aria-hidden={idx !== heroIndex}
                >
                  <Image
                    src={src}
                    alt={`Lifestyle ${idx + 1}`}
                    fill
                    sizes="(max-width: 980px) 100vw, 520px"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="hero-nav prev"
              onClick={() =>
                setHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)
              }
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              className="hero-nav next"
              onClick={() => setHeroIndex((i) => (i + 1) % heroSlides.length)}
              aria-label="Next slide"
            >
              ›
            </button>
            <div className="hero-dots">
              {heroSlides.map((src, idx) => (
                <button
                  type="button"
                  key={src}
                  className={idx === heroIndex ? "active" : ""}
                  onClick={() => setHeroIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="order-section" id="order-now">
        <div className="order-grid">
          <div className="order-preview">
            <Image
              src={previewImage}
              alt={`${active.name} preview`}
              width={420}
              height={420}
              key={previewImage}
            />
            <div className="order-preview-info">
              {active.badge && <span className="limited-badge">{active.badge}</span>}
              <h3>{active.name}</h3>
              <p>{active.tagline}</p>
              <div className="price-row">
                <span className="price-now">৳ {active.price}</span>
                <span className="price-old">৳ {active.oldPrice}</span>
                <span className="price-save">
                  সেভ ৳ {active.oldPrice - active.price}
                </span>
              </div>
              {active.freebies && active.freebies.length > 0 && (
                <ul className="freebie-list">
                  {active.freebies.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <form className="order-form" onSubmit={handleSubmit}>
            <div className="order-head">
              <h2>অর্ডার কনফার্ম করুন</h2>
              <p>নিচের তথ্য দিন - আমাদের টিম ফোন করে কনফার্ম করবে।</p>
            </div>

            <div className="product-toggle" role="tablist">
              {Object.values(products).map((p) => {
                const thumbImg =
                  p.key === selectedProduct ? previewImage : p.hero;
                return (
                  <button
                    type="button"
                    key={p.key}
                    className={`thumb-btn ${selectedProduct === p.key ? "active" : ""}`}
                    onClick={() => handleProductChange(p.key)}
                    aria-pressed={selectedProduct === p.key}
                  >
                    <span className="thumb-img">
                      <Image
                        src={thumbImg}
                        alt={p.name}
                        width={120}
                        height={120}
                        key={thumbImg}
                      />
                    </span>
                    <span className="thumb-meta">
                      <span className="thumb-name">
                        {p.key === "yn" ? "YN" : "Prestige"}
                      </span>
                      <span className="thumb-price">৳ {p.price}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="product" value={selectedProduct} />

            {activeColors.length > 1 && (
              <div className="color-row">
                <span className="color-label">কালার সিলেক্ট করুন:</span>
                <div className="color-options">
                  {activeColors.map((c) => {
                    const outOfStock = c.inStock === false;
                    return (
                      <button
                        type="button"
                        key={c.value}
                        className={`color-chip ${
                          selectedColor === c.value ? "active" : ""
                        } chip-${c.value} ${outOfStock ? "out-of-stock" : ""}`}
                        onClick={() => !outOfStock && setSelectedColor(c.value)}
                        disabled={outOfStock}
                        aria-disabled={outOfStock}
                        title={outOfStock ? "স্টক আউট" : c.label}
                      >
                        {c.label}
                        {outOfStock && <span className="stock-tag">স্টক আউট</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <input type="hidden" name="color" value={selectedColor} />

            <label>
              আপনার নাম
              <input
                type="text"
                name="name"
                placeholder="যেমন: ফারজানা আক্তার"
                required
              />
            </label>
            <label>
              মোবাইল নাম্বার
              <input
                type="tel"
                name="phone"
                placeholder="01XXX-XXXXXX"
                value={phone}
                onChange={(e) => setPhone(formatBdPhone(e.target.value))}
                inputMode="numeric"
                maxLength={12}
                pattern="01[0-9]{3}-?[0-9]{6}"
                title="বাংলাদেশী মোবাইল নাম্বার (১১ ডিজিট)"
                required
              />
            </label>
            <label className="full">
              সম্পূর্ণ ঠিকানা
              <textarea
                name="address"
                rows={3}
                placeholder="বাসা, রোড, এলাকা, থানা, জেলা"
                required
              />
            </label>
            <label>
              পরিমাণ
              <select name="quantity" defaultValue="1">
                <option value="1">১ পিস</option>
                <option value="2">২ পিস</option>
                <option value="3">৩ পিস</option>
              </select>
            </label>
            <label>
              ডেলিভারি এরিয়া
              <select name="area" defaultValue="ঢাকার ভিতরে">
                <option value="ঢাকার ভিতরে">ঢাকার ভিতরে (৭০৳)</option>
                <option value="ঢাকার বাইরে">ঢাকার বাইরে (১২০৳)</option>
              </select>
            </label>

            <button type="submit" className="cta-btn" disabled={submitting}>
              {submitting ? "পাঠানো হচ্ছে..." : "এখনই অর্ডার কনফার্ম করুন"}
            </button>
            <p className="secure-note">
              ১০০% সিকিউর অর্ডার। ক্যাশ অন ডেলিভারি, পণ্য দেখে টাকা দিন।
            </p>
          </form>
        </div>
      </section>

      <section className="product-block" id="yn">
        <div className="product-info">
          <p className="tag-pill soft">প্রোডাক্ট ০১</p>
          <h2>{products.yn.name}</h2>
          <p className="lead">{products.yn.tagline}</p>
          <div className="price-row left">
            <span className="price-now">এখন মাত্র ৳ {products.yn.price}</span>
            <span className="price-old">৳ {products.yn.oldPrice}</span>
          </div>
          <div className="feature-icons">
            {products.yn.features.map((f) => (
              <div key={f.label} className="feature-chip">
                <span className="f-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
          <ul className="benefit-list">
            {products.yn.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            href="#order-now"
            className="inline-cta"
            onClick={() => handleProductChange("yn")}
          >
            YN অর্ডার করুন - ৳ {products.yn.price}
          </a>
        </div>
        <div className="product-media">
          <Image
            src={products.yn.hero}
            alt={products.yn.name}
            width={460}
            height={460}
          />
        </div>
      </section>

      <section className="lifestyle-strip">
        <div className="section-heading">
          <h2>YN লাইফস্টাইল গ্যালারি</h2>
          <p className="scroll-hint">« সাইড স্ক্রল করুন »</p>
        </div>
        <div className="scroll-rail" ref={ynRailRef}>
          {[...ynGallery, ...ynGallery].map((src, idx) => (
            <div className="rail-card" key={`yn-${idx}`}>
              <Image
                src={src}
                alt={`YN lifestyle ${idx + 1}`}
                width={420}
                height={320}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="product-block reverse" id="prestige">
        <div className="product-media">
          <div className="color-trio">
            {products.prestige.colors.map((c) => (
              <Image
                key={c.value}
                src={c.image}
                alt={`Prestige ${c.label}`}
                width={220}
                height={220}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <p className="tag-pill soft">প্রোডাক্ট ০২</p>
          <span className="limited-badge">LIMITED OFFER</span>
          <h2>{products.prestige.name}</h2>
          <p className="lead">{products.prestige.tagline}</p>
          <div className="price-row left">
            <span className="price-now">মাত্র ৳ {products.prestige.price}</span>
            <span className="price-old">৳ {products.prestige.oldPrice}</span>
          </div>
          <div className="feature-icons">
            {products.prestige.features.map((f) => (
              <div key={f.label} className="feature-chip">
                <span className="f-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
          <ul className="benefit-list">
            {products.prestige.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="freebie-box">
            <h4>ফ্রি গিফট এই অফারে</h4>
            <ul className="freebie-list">
              {products.prestige.freebies.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="color-badges">
            {products.prestige.colors.map((c) => (
              <span
                key={c.value}
                className={`color-chip static chip-${c.value} ${c.inStock === false ? "out-of-stock" : ""}`}
              >
                {c.label}
                {c.inStock === false && <span className="stock-tag">স্টক আউট</span>}
              </span>
            ))}
          </div>
          <a
            href="#order-now"
            className="inline-cta"
            onClick={() => handleProductChange("prestige")}
          >
            Prestige অর্ডার করুন - ৳ {products.prestige.price}
          </a>
        </div>
      </section>

      <section className="lifestyle-strip">
        <div className="section-heading">
          <h2>Prestige লাইফস্টাইল গ্যালারি</h2>
          <p className="scroll-hint">« সাইড স্ক্রল করুন »</p>
        </div>
        <div className="scroll-rail" ref={prestigeRailRef}>
          {[...prestigeGallery, ...prestigeGallery].map((src, idx) => (
            <div className="rail-card" key={`pr-${idx}`}>
              <Image
                src={src}
                alt={`Prestige lifestyle ${idx + 1}`}
                width={420}
                height={320}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="compare-section">
        <div className="section-heading">
          <h2>কোনটা আপনার জন্য?</h2>
          <p>এক নজরে দুই প্রোডাক্টের পার্থক্য</p>
        </div>
        <div className="compare-grid">
          <article>
            <h3>YN মাল্টি কুকার</h3>
            <p className="price-now">৳ {products.yn.price}</p>
            <ul>
              <li>১.৮ লিটার ক্যাপাসিটি</li>
              <li>মাল্টি-ফাংশন কুকিং</li>
              <li>ফুড গ্রেড সেফটি</li>
            </ul>
            <a
              href="#order-now"
              className="inline-cta"
              onClick={() => handleProductChange("yn")}
            >
              YN বেছে নিন
            </a>
          </article>
          <article className="featured">
            <span className="ribbon">LIMITED OFFER</span>
            <h3>Prestige Electric Multi-Cooker</h3>
            <p className="price-now">৳ {products.prestige.price}</p>
            <ul>
              <li>২ লিটার বড় ক্যাপাসিটি</li>
              <li>৩টি কালার অপশন</li>
              <li>ফ্রি: রাইস পট + বাটি + চামচ</li>
            </ul>
            <a
              href="#order-now"
              className="inline-cta"
              onClick={() => handleProductChange("prestige")}
            >
              Prestige বেছে নিন
            </a>
          </article>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="section-heading">
          <h2>কাস্টমার রিভিউ</h2>
          <p className="scroll-hint">« সাইড স্ক্রল করুন »</p>
        </div>
        <div className="scroll-rail testimonial-rail" ref={reviewRailRef}>
          {[...reviews, ...reviews].map((item, idx) => (
            <article key={`r-${idx}`} className="rail-card t-card">
              <p>“{item.text}”</p>
              <h3>{item.name}</h3>
              <span className="t-tag">{item.product}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} সবকিছু কিচেন - সব রাইট সংরক্ষিত।</p>
        <p className="footer-contacts">
          <a href="tel:+8801604074609">📞 +880 16 0407 4609</a>
          <span className="dot-sep">•</span>
          <a
            href="https://wa.me/8801604074609"
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 WhatsApp
          </a>
        </p>
        <p>সকাল ৯টা - রাত ১০টা (প্রতিদিন)</p>
        <div className="dev-credit">
          <p>
            ল্যান্ডিং পেজ, ওয়েবসাইট বা মোবাইল অ্যাপ বানাতে চান?{" "}
            <a
              href="https://wa.me/971507217156"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp +971 50 721 7156
            </a>
          </p>
        </div>
      </footer>

      <a
        href="https://wa.me/8801604074609?text=আমি%20অর্ডার%20করতে%20চাহি"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="WhatsApp"
      >
        <span className="wa-icon">💬</span>
        <span className="wa-text">WhatsApp</span>
      </a>

      <a href="#order-now" className="sticky-cta">
        অর্ডার দিন
      </a>

      {confirmation && (
        <div
          className="modal-backdrop"
          onClick={() => setConfirmation(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`modal-card ${confirmation.type}`}
            onClick={(e) => e.stopPropagation()}
          >
            {confirmation.type === "success" ? (
              <>
                <div className="modal-icon success-icon">✓</div>
                <h3>অর্ডার কনফার্ম হয়েছে!</h3>
                <p className="modal-greeting">
                  ধন্যবাদ <strong>{confirmation.name}</strong>, আপনার অর্ডার আমরা পেয়েছি।
                </p>
                <ul className="modal-summary">
                  <li>
                    <span>প্রোডাক্ট</span>
                    <strong>{confirmation.product}</strong>
                  </li>
                  <li>
                    <span>কালার</span>
                    <strong>{confirmation.color}</strong>
                  </li>
                  <li>
                    <span>পরিমাণ</span>
                    <strong>{confirmation.quantity} পিস</strong>
                  </li>
                  {confirmation.price && (
                    <li>
                      <span>দাম</span>
                      <strong>৳ {confirmation.price}</strong>
                    </li>
                  )}
                  <li>
                    <span>মোবাইল</span>
                    <strong>{confirmation.phone}</strong>
                  </li>
                </ul>
                <p className="modal-note">
                  আমাদের টিম শীঘ্রই আপনাকে কল করে কনফার্ম করবে।
                </p>
                {confirmation.waUrl && (
                  <a
                    href={confirmation.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-btn wa-confirm"
                  >
                    💬 WhatsApp এ অর্ডার পাঠান (দ্রুত কনফার্ম)
                  </a>
                )}
                <button
                  type="button"
                  className="modal-close-link"
                  onClick={() => setConfirmation(null)}
                >
                  বন্ধ করুন
                </button>
              </>
            ) : (
              <>
                <div className="modal-icon error-icon">!</div>
                <h3>অর্ডার পাঠাতে সমস্যা হয়েছে</h3>
                <p className="modal-note">
                  অনুগ্রহ করে আবার চেষ্টা করুন বা সরাসরি কল করুন।
                </p>
                <a href="tel:+8801604074609" className="cta-btn">
                  📞 +880 16 0407 4609
                </a>
                <button
                  type="button"
                  className="modal-close-link"
                  onClick={() => setConfirmation(null)}
                >
                  বন্ধ করুন
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
