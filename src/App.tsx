import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import img4ply from "./pic/4ply.png";
import img3ply from "./pic/3ply.png";
import imgFacial4 from "./pic/facial4ply.png";
import SDlogo from "./pic/SDlogo.png";
import { APIProvider } from "@vis.gl/react-google-maps";
import shopVideo from "./pic/shop.mp4";
/* import ShopMap from "./ShowMap";
 */ function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // simple translations map
  type ProductItem = {
    name: string;
    description: string;
    features: string[];
  };

  type FaqItem = {
    q: string;
    a: string;
  };

  type Translations = {
    about: { story: string };
    nav: Record<string, string>;
    hero: {
      line1: string;
      line2: string;
      desc: string;
      shopNow: string;
      learnMore: string;
    };
    products: { title: string; desc: string; items: ProductItem[] };
    faq: { title: string; desc: string; items: FaqItem[] };
    social: { title: string; desc: string };
    contact: { title: string; getInTouch: string; send: string };
    footer: { quickLinks: string; products: string; followUs: string };
  };

  const translations: Record<string, Translations> = {
    zh: {
      about: {
        story:
          "Spring Day Daily Care 创立于2023年10月23日。我们秉持着“Love Yourself, Love Your Loved One”的品牌理念，希望每位使用我们产品的用户，能爱自己，也能爱自己所爱的人，享受高品质、健康的生活用品。",
      },
      nav: {
        home: "主页",
        about: "关于我们",
        products: "产品",
        "why-us": "为什么选择",
        testimonials: "社交",
        contact: "联系我们",
      },
      hero: {
        line1: "爱自己，",
        line2: "爱你所爱",
        desc: "精选日常护理用品，由天然材料精制而成。温和适用于敏感肌肤。",
        shopNow: "立即购买",
        learnMore: "了解更多",
      },
      products: {
        title: "我们的产品",
        desc: "为您和家人精心设计的优质日常护理品。",
        items: [
          {
            name: "豪华卫生纸",
            description: "4层超柔软卫生纸，适合敏感肌肤，厚实耐用。",
            features: ["4层加厚", "适合敏感肌", "天然木浆"],
          },
          {
            name: "面巾纸",
            description: "3层优质面巾纸，温和吸水，适合日常使用。",
            features: ["3层柔软", "日常护理", "无化学添加"],
          },
          {
            name: "豪华面巾纸",
            description: "4层豪华面巾纸，纹理升级，质感更佳。",
            features: ["4层奢华", "增强纹理", "高端品质"],
          },
        ],
      },
      faq: {
        title: "常见问题",
        desc: "我们致力于在每一款产品中保证质量、安全与可持续性。下面是一些常见问题：",
        items: [
          {
            q: "产品的主要成分是什么？",
            a: "我们的产品采用环保和天然材料，确保无添加无刺激。比如我们的面巾纸使用了纯天然木浆，不含任何有害化学成分，适合所有皮肤类型。",
          },
          {
            q: "如何正确使用面巾纸和卫生纸？",
            a: "面巾纸可以用于日常护肤，轻轻擦拭面部，保持皮肤清洁；卫生纸则适用于日常生活中如厕时使用。请根据个人需要选择适合的产品。",
          },
          {
            q: "我如何储存这些产品？",
            a: "我们的产品温和无刺激，适合敏感肌及婴幼儿使用；如有特殊需求请先咨询儿科医生。",
          },
          {
            q: "这些产品适合哪些人群？",
            a: "我们的产品适合所有年龄段的人群，尤其是皮肤敏感的用户。由于我们使用天然原材料，产品非常温和。",
          },
          {
            q: "在哪可以购买这些产品？",
            a: "您可以通过我们的 Shopee 店铺购买我们的产品，或通过社交平台了解最新的促销信息。",
          },
          {
            q: "产品是否经过安全测试？",
            a: "是的，所有产品都经过严格的安全和质量检测，确保无刺激，适合所有皮肤类型。",
          },
          {
            q: "这些产品适合宝宝使用吗？ ",
            a: "是的，我们的产品非常温和，适合宝宝和敏感肌肤使用。我们采用了天然和无刺激的材料，确保宝宝的肌肤得到温柔的呵护。",
          },
          {
            q: "如何联系客户服务？",
            a: "您可以通过我们的电子邮件：springdaydailycare@gmail.com 或拨打电话 019-769 5299 来联系客户服务。我们会在工作日尽快回复您。",
          },
        ],
      },
      social: {
        title: "关注我们的社交平台",
        desc: "在您喜欢的平台上与我们互动。点击卡片打开页面。",
      },
      contact: {
        title: "联系我们",
        getInTouch: "有问题？欢迎联系我们。",
        send: "发送信息",
      },
      footer: {
        quickLinks: "快速链接",
        products: "产品",
        followUs: "关注我们",
      },
    },
    en: {
      about: {
        story:
          'Spring Day Daily Care was founded on 23 Oct 2023. We believe in the brand promise "Love Yourself, Love Your Loved One" — delivering high-quality, healthy daily care products for you and those you love.',
      },
      nav: {
        home: "Home",
        about: "About",
        products: "Products",
        "why-us": "Why Us",
        testimonials: "Social",
        contact: "Contact",
      },
      hero: {
        line1: "Love Yourself,",
        line2: "Love Your Loved One",
        desc: "Premium daily care essentials crafted with pure natural materials. Gentle on sensitive skin.",
        shopNow: "Shop Now",
        learnMore: "Learn More",
      },
      products: {
        title: "Our Products",
        desc: "Premium daily care essentials designed with your comfort and well-being in mind.",
        items: [
          {
            name: "Deluxe Toilet Paper",
            description:
              "4-ply ultra-soft toilet paper designed for sensitive skin. Extra thick and durable for superior comfort.",
            features: [
              "4-Ply Thickness",
              "Sensitive Skin Safe",
              "Natural Wood Pulp",
            ],
          },
          {
            name: "Facial Tissue",
            description:
              "3-ply premium facial tissue perfect for everyday use. Gentle and absorbent for all skin types.",
            features: ["3-Ply Softness", "Daily Care", "Chemical-Free"],
          },
          {
            name: "Deluxe Facial Tissue",
            description:
              "4-ply luxury facial tissue with enhanced texture. Premium quality for those special moments.",
            features: ["4-Ply Luxury", "Enhanced Texture", "Premium Quality"],
          },
        ],
      },
      faq: {
        title: "FAQ",
        desc: "We're committed to delivering quality, safety, and sustainability in every product.",
        items: [
          {
            q: "What are the main ingredients of the products?",
            a: "Our products are made from eco-friendly and natural materials, ensuring they are additive-free and non-irritating. For example, our facial tissues are crafted from pure natural wood pulp, free of any harmful chemical ingredients, making them suitable for all skin types.",
          },
          {
            q: "How to correctly use the facial tissue and toilet paper?",
            a: "Facial tissues are ideal for daily skincare routines—gently wiping the face to keep skin clean—while toilet paper is designed for everyday bathroom use. Please select the appropriate product based on your personal needs.",
          },
          {
            q: "How should I store these products?",
            a: "To maintain optimal product quality, store paper products in a dry, well-ventilated area, away from direct sunlight and high temperatures.",
          },
          {
            q: "Who can use these products?",
            a: "Our products are suitable for people of all ages, especially those with sensitive skin. Thanks to the use of natural raw materials, the products are exceptionally gentle.",
          },
          {
            q: "Where can I purchase the products?",
            a: "You can make purchases through our Shopee store. Click here to buy now.",
          },
          {
            q: "Are the products tested for safety?",
            a: "Yes, all products undergo rigorous safety and quality testing to ensure they are non-irritating and suitable for all skin types.",
          },
          {
            q: "Are the products suitable for babies?",
            a: "Yes, our products are very gentle and suitable for babies and sensitive skin. We use natural and non-irritating materials to ensure gentle care for your baby’s skin.",
          },
          {
            q: "How to contact customer service?",
            a: "For customer service, you can reach us via email at springdaydailycare@gmail.com or by phone at 019-769 5299. We will respond as soon as possible during business days.",
          },
        ],
      },
      social: {
        title: "Follow Us on Social Media",
        desc: "Connect with Spring Day Daily Care on your favourite platforms. Click any card to open our store or page.",
      },
      contact: {
        title: "Get In Touch",
        getInTouch: "Have questions? We'd love to hear from you.",
        send: "Send Message",
      },
      footer: {
        quickLinks: "Quick Links",
        products: "Products",
        followUs: "Follow Us",
      },
    },
  };

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "zh" || saved === "en") setLang(saved as "zh" | "en");
  }, []);

  const t = (path: string): string => {
    const parts = path.split(".");
    let cur: unknown = translations[lang];
    for (const p of parts) {
      if (typeof cur !== "object" || cur === null || !(p in cur)) return path;
      cur = (cur as Record<string, unknown>)[p];
    }
    return typeof cur === "string" ? cur : path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "products",
        "why-us",
        "testimonials",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <APIProvider apiKey="AIzaSyDr4f-WIYP4FsWF7RW-ElMHMvrB_nGNRNo">
      {" "}
      <div className="min-h-screen bg-white">
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-2">
                <div className="w-14 h-14 rounded-full flex items-center justify-center">
                  <img
                    src={SDlogo}
                    alt="SD Logo"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Spring Day Daily Care
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                {[
                  "home",
                  "about",
                  "products",
                  "why-us",
                  "testimonials",
                  "contact",
                ].map((id) => {
                  const label = t(`nav.${id}`);
                  return (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`text-sm font-medium transition-colors relative group ${
                        activeSection === id
                          ? "text-purple-600"
                          : "text-gray-700 hover:text-purple-600"
                      }`}
                    >
                      {label}
                      <span
                        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 transform origin-left transition-transform ${
                          activeSection === id
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </button>
                  );
                })}

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setLang("zh");
                      localStorage.setItem("lang", "zh");
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      lang === "zh"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    中文
                  </button>
                  <button
                    onClick={() => {
                      setLang("en");
                      localStorage.setItem("lang", "en");
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      lang === "en"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-purple-600" />
                  ) : (
                    <Menu className="w-6 h-6 text-purple-600" />
                  )}
                </button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden bg-white border-t border-purple-100">
                <div className="px-4 py-4 space-y-3">
                  {[
                    "home",
                    "about",
                    "products",
                    "why-us",
                    "testimonials",
                    "contact",
                  ].map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        scrollToSection(id);
                      }}
                      className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      {t(`nav.${id}`)}
                    </button>
                  ))}
                  <div className="pt-2 flex space-x-2">
                    <button
                      onClick={() => {
                        setLang("zh");
                        localStorage.setItem("lang", "zh");
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        lang === "zh"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      中文
                    </button>
                    <button
                      onClick={() => {
                        setLang("en");
                        localStorage.setItem("lang", "en");
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        lang === "en"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        <section
          id="home"
          className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                  {t("hero.line1")}
                </span>
                <br />
                <span className="text-gray-800">{t("hero.line2")}</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {t("hero.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("products")}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  {t("hero.shopNow")}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-medium border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                >
                  {t("hero.learnMore")}
                </button>
              </div>
            </div>

            <div className="relative animate-fade-in-up animation-delay-300">
              <div className="relative z-10">
                <img
                  src={SDlogo}
                  alt="Spring Day Products"
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl -z-10" />
            </div>
          </div>
        </section>

        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                {t("nav.about")}{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Spring Day Daily Care
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-left">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Our Story
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t("about.story")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-6 bg-purple-50 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      100%
                    </div>
                    <div className="text-sm text-gray-600">
                      Natural Materials
                    </div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      2023
                    </div>
                    <div className="text-sm text-gray-600">Established</div>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in-right">
                <img
                  src="https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Natural Materials"
                  className="rounded-3xl shadow-xl w-full"
                />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="py-24 bg-gradient-to-b from-purple-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                {t("products.title")}{" "}
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent" />
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("products.desc")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {([img4ply, img3ply, imgFacial4] as string[]).map(
                (image, index) => {
                  const item = translations[lang].products.items[index];
                  return (
                    <div
                      key={item.name}
                      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        {/*
                        To adjust the image position inside the fixed frame, change the object-position class below.
                        Examples: object-top, object-center, object-bottom, object-left, object-right, or object-[50%_20%] for custom.
                        The frame will always be 16rem (h-64) tall. Adjust as needed.
                      */}
                        <img
                          src={
                            image &&
                            typeof image === "string" &&
                            image.startsWith("/")
                              ? image
                              : image
                          }
                          alt={item.name}
                          className="w-full h-85 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature: string) => (
                            <span
                              key={feature}
                              className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                          {lang === "zh" ? "了解更多" : "Learn More"}
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section id="why-us" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                {t("faq.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("faq.desc")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {translations[lang].faq.items.map(
                (item: FaqItem, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow p-6"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left"
                      aria-expanded={openFaq === idx}
                      aria-controls={`faq-${idx}`}
                    >
                      <div>
                        <div className="font-semibold text-lg text-gray-800">
                          {item.q}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-6 h-6 text-gray-500 transform transition-transform ${
                          openFaq === idx ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <div
                      id={`faq-${idx}`}
                      className={`mt-4 text-gray-600 transition-all ${
                        openFaq === idx ? "block" : "hidden"
                      }`}
                    >
                      {item.a}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="py-24 bg-gradient-to-b from-purple-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                {t("social.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("social.desc")}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  id: "facebook",
                  title: "Facebook",
                  url: "https://www.facebook.com/share/17g2cJyAxP/?mibextid=wwXIfr",
                  bgClass: "bg-[#1877F2]",
                },
                {
                  id: "instagram",
                  title: "Instagram",
                  url: "https://www.instagram.com/springdaytissuemalaysia?igsh=MWNwNzV2OTdiZGRt",
                  bgClass:
                    "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
                },
                {
                  id: "xhs",
                  title: "小红书",
                  url: "https://xhslink.com/m/54JSJQJanZp",
                  bgClass: "bg-[#FF0036]",
                },
                {
                  id: "shopee",
                  title: "Shopee",
                  url: "https://my.shp.ee/1jLCkiZ",
                  bgClass: "bg-[#EE4D2D]",
                },
              ].map((item, index) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-8 bg-white rounded-3xl hover:shadow-xl transition-all duration-500 border border-purple-100 hover:border-purple-300 animate-fade-in-up flex flex-col items-center justify-center text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-16 h-16 ${item.bgClass} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-all duration-300`}
                  >
                    {item.id === "facebook" && (
                      <Facebook className="w-8 h-8 text-white" />
                    )}
                    {item.id === "instagram" && (
                      <Instagram className="w-8 h-8 text-white" />
                    )}
                    {item.id === "xhs" && (
                      <span className="text-white font-bold text-lg">
                        小红书
                      </span>
                    )}
                    {item.id === "shopee" && (
                      <span className="text-white font-bold text-2xl">S</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info Column */}
              <div className="animate-fade-in-left flex flex-col justify-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                  {t("contact.title")}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {t("contact.getInTouch")}
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="w-6 h-6" />,
                      label: "Email",
                      value: "springdaydailycare@gmail.com",
                    },
                    {
                      icon: <Phone className="w-6 h-6" />,
                      label: "Phone",
                      value: "+601 9-769 5299",
                    },
                    {
                      icon: <MapPin className="w-6 h-6" />,
                      label: "Address",
                      value:
                        "26, Jalan Perdana 3/2, Taman Sri Pulai Perdana 2, 81300, Johor Bahru, Johor",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {item.label}
                        </div>
                        <div className="text-gray-600">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Map Column */}
              <div className="animate-fade-in-right flex items-center justify-center">
                <div className="w-full h-96 max-w-xl">
                  <video
                    src={shopVideo}
                    controls
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    poster=""
                  >
                    Sorry, your browser does not support embedded videos.
                  </video>
                </div>
              </div>

              {/*   <form className="space-y-6 animate-fade-in-right">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {t("contact.send")}
              </button>
            </form> */}
            </div>
          </div>
        </section>

        <footer className="bg-gradient-to-br from-purple-900 to-purple-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-semibold">
                    Spring Day Daily Care
                  </span>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  Premium daily care essentials crafted with love and care for
                  you and your loved ones.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  {t("footer.quickLinks")}
                </h3>
                <div className="space-y-2">
                  {["home", "about", "products", "contact"].map((id) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className="block text-purple-200 hover:text-white transition-colors text-sm"
                    >
                      {id === "products" ? t("products.title") : t(`nav.${id}`)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  {t("footer.products")}
                </h3>
                <div className="space-y-2 text-purple-200 text-sm">
                  {translations[lang].products.items.map((it: ProductItem) => (
                    <div key={it.name}>{it.name}</div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">
                  {t("footer.followUs")}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-purple-700 pt-8 text-center text-purple-200 text-sm">
              <p>
                © 2023-2024 Spring Day Daily Care Sdn Bhd. All rights reserved.
              </p>
              <p className="mt-2">Registration: 202301041770</p>
            </div>
          </div>
        </footer>
      </div>
    </APIProvider>
  );
}
export default App;
