"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const graphRef = useRef<HTMLDivElement>(null);

  const handleScrollToSignup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const signupSection = document.getElementById("signup");
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim()) {
      setSubmitMessage("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubmitMessage("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Replace with YOUR Google Apps Script Web App URL
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxtZ0mdd04UMaTjnOP_Vkb6zoPXFvHH9i3M9tdDa8_glwVbSb2KGTAKn-0hm_-qbpyG/exec";

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      // Since mode is 'no-cors', we can't read the response
      // Assume success and redirect
      setSubmitMessage("Success! Redirecting...");
      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 1500);
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Animation observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    // SVG animation observer - start/stop based on visibility
    const svgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation when visible
            entry.target.classList.add("svg-animating");
          } else {
            // Stop animation when not visible
            entry.target.classList.remove("svg-animating");
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% visible
      }
    );

    if (graphRef.current) {
      svgObserver.observe(graphRef.current);
    }

    return () => {
      observer.disconnect();
      svgObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Header/Navbar */}
      <nav className="navbar navbar-light bg-white sticky-top shadow-sm">
        <div className="container">
          <a
            className="navbar-brand d-flex align-items-center gap-2"
            href="#"
            onClick={handleScrollToTop}
          >
            <Image src="/logo.svg" alt="GraphNet Logo" width={50} height={50} />
            <span className="fs-4 fw-bold">GraphNet</span>
          </a>
          <div className="d-flex gap-2">
            <a
              className="btn btn-primary"
              href="#signup"
              onClick={handleScrollToSignup}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero-sec snap-section"
        style={{
          background: "linear-gradient(135deg, #0A66C2 0%, #7C3AED 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center min-vh-100">
            {/* Left Section - Text */}
            <div className="col-lg-6 hero-left-sec text-white">
              <span className="badge bg-light text-primary mb-3 px-3 py-2 fs-6 fade-in-up">
                GraphNet
              </span>
              <h1
                className="hero-left-heading display-3 fw-bold mb-4 fade-in-up"
                style={{ animationDelay: "0.15s" }}
              >
                Find Your Path to Anyone
              </h1>
              <p
                className="hero-left-para lead mb-4 fs-4 fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                Stop sending cold messages. GraphSocial analyzes your LinkedIn
                network to find who can introduce you to anyone.
              </p>
              <div
                className="d-flex gap-3 flex-wrap fade-in-up"
                style={{ animationDelay: "0.45s" }}
              >
                <a
                  href="#signup"
                  onClick={handleScrollToSignup}
                  className="btn btn-light btn-lg px-5 py-3 fw-semibold shadow"
                >
                  Start Connecting
                </a>
              </div>
              <p
                className="text-white-50 mt-4 fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                ⭐ Trusted by 500+ professionals
              </p>
            </div>

            {/* Right Section - Image */}
            <div
              className="col-lg-6 hero-right-sec mt-5 mt-lg-0 fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div
                className="position-relative shadow-lg rounded-4 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  aspectRatio: "4/3",
                }}
              >
                <Image
                  src="/Hero-img.png"
                  alt="GraphSocial Chrome Extension"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section className="py-5 bg-light snap-section">
        <div className="container py-5">
          <div className="row align-items-center g-5 mb-5">
            {/* Left Side - SVG Animation */}
            <div className="col-lg-6 animate-on-scroll slide-in-left">
              <div
                ref={graphRef}
                className="p-4 bg-white rounded-4 shadow graph-container"
              >
                <Image
                  src="/graph.svg"
                  alt="Network Path Animation"
                  width={1200}
                  height={800}
                  className="w-100 h-auto graph-svg"
                />
              </div>
            </div>

            {/* Right Side - Explanation */}
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4 animate-on-scroll fade-in-up">
                See the Path to Anyone
              </h2>
              <p
                className="lead text-muted mb-4 animate-on-scroll fade-in-up"
                style={{ animationDelay: "0.15s" }}
              >
                GraphSocial maps your entire LinkedIn network and finds the
                shortest path to connect you with anyone.
              </p>

              <div
                className="d-flex gap-3 mb-4 animate-on-scroll slide-in-right"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    }}
                  >
                    <span className="fs-5 fw-bold text-white">1</span>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Start from You</h5>
                  <p className="text-muted mb-0">
                    Your network is the center. Every connection you have is a
                    potential bridge.
                  </p>
                </div>
              </div>

              <div
                className="d-flex gap-3 mb-4 animate-on-scroll slide-in-right"
                style={{ animationDelay: "0.45s" }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #f472b6, #ec4899)",
                    }}
                  >
                    <span className="fs-5 fw-bold text-white">2</span>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Discover Paths</h5>
                  <p className="text-muted mb-0">
                    Our algorithm analyzes millions of connections to find the
                    optimal introduction path.
                  </p>
                </div>
              </div>

              <div
                className="d-flex gap-3 animate-on-scroll slide-in-right"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                    }}
                  >
                    <span className="fs-5 fw-bold text-white">3</span>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">Make the Connection</h5>
                  <p className="text-muted mb-0">
                    Reach out through mutual connections for warm introductions
                    that actually work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - Combined within same section */}
          <div className="container py-5">
            <div className="row text-center g-4">
              <div
                className="col-md-4 animate-on-scroll scale-in"
                style={{ animationDelay: "0.15s" }}
              >
                <h2 className="display-4 fw-bold" style={{ color: "#0A66C2" }}>
                  10k+
                </h2>
                <p className="text-muted fs-5">Active Users</p>
              </div>
              <div
                className="col-md-4 animate-on-scroll scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <h2 className="display-4 fw-bold" style={{ color: "#10B981" }}>
                  50k+
                </h2>
                <p className="text-muted fs-5">Connections Made</p>
              </div>
              <div
                className="col-md-4 animate-on-scroll scale-in"
                style={{ animationDelay: "0.45s" }}
              >
                <h2 className="display-4 fw-bold" style={{ color: "#7C3AED" }}>
                  95%
                </h2>
                <p className="text-muted fs-5">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="more-info-sec bg-white py-5 snap-section">
        <div className="container py-5">
          <div className="row text-center mb-5">
            <div className="col animate-on-scroll fade-in-up">
              <h2 className="display-5 fw-bold">Why GraphSocial?</h2>
              <p className="lead text-muted">
                Transform your LinkedIn networking
              </p>
            </div>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
            <div
              className="col-md-4 animate-on-scroll scale-in"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="card more-info-card-1 h-100 border-0 shadow-sm hover-card">
                <div className="card-body p-4 text-center">
                  <div
                    className="mx-auto rounded-circle d-inline-flex p-3 mb-3"
                    style={{
                      background: "linear-gradient(135deg, #0A66C2, #7C3AED)",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923z" />
                    </svg>
                  </div>
                  <h4 className="fw-bold mb-3">Instant Path Discovery</h4>
                  <p className="text-muted">
                    Find the shortest warm introduction path to anyone in
                    seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="col-md-4 animate-on-scroll scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="card more-info-card-2 h-100 border-0 shadow-sm hover-card">
                <div className="card-body p-4 text-center">
                  <div
                    className="mx-auto rounded-circle d-inline-flex p-3 mb-3"
                    style={{
                      background: "linear-gradient(135deg, #10B981, #059669)",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                    </svg>
                  </div>
                  <h4 className="fw-bold mb-3">100% Private</h4>
                  <p className="text-muted">
                    Your data stays on your device. Zero data sharing, complete
                    privacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="col-md-4 animate-on-scroll scale-in"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="card more-info-card-3 h-100 border-0 shadow-sm hover-card">
                <div className="card-body p-4 text-center">
                  <div
                    className="mx-auto rounded-circle d-inline-flex p-3 mb-3"
                    style={{
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52z" />
                    </svg>
                  </div>
                  <h4 className="fw-bold mb-3">Chrome Extension</h4>
                  <p className="text-muted">
                    Works seamlessly while you browse LinkedIn. No tab switching
                    needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="signup"
        className="py-5 snap-section"
        style={{
          background: "linear-gradient(135deg, #0A66C2 0%, #7C3AED 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 animate-on-scroll scale-in">
              <div
                className="card border-0 shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="card-body p-5">
                  <h2 className="text-white text-center mb-2 fw-bold">
                    Join the Waitlist
                  </h2>
                  <p className="text-white text-center mb-4 opacity-75">
                    Be the first to transform your networking
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    {submitMessage && (
                      <div
                        className={`alert ${
                          submitMessage.includes("Success")
                            ? "alert-success"
                            : "alert-warning"
                        } mb-3`}
                      >
                        {submitMessage}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-light btn-lg w-100 fw-semibold shadow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Get Early Access →"}
                    </button>
                  </form>
                  <p className="text-white text-center mt-3 mb-0 small opacity-75">
                    🔒 Your data is secure and private
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Logo and Brand */}
            <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
              <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start mb-3">
                <Image
                  src="/logo.svg"
                  alt="GraphNet Logo"
                  width={40}
                  height={40}
                />
                <h5 className="mb-0 fw-bold">GraphNet</h5>
              </div>
              <p className="text-white-50 mb-2">
                Find your path to anyone on LinkedIn
              </p>
              <p className="text-white-50 small mb-0">
                Built by Team GraphNet 🚀
              </p>
            </div>

            {/* Links and Copyright */}
            <div className="col-md-6 text-center text-md-end">
              <div className="mb-3">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none me-3 hover-link"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-white-50 text-decoration-none me-3 hover-link"
                >
                  Terms
                </a>
                <a
                  href="mailto:team@graphnet.com"
                  className="text-white-50 text-decoration-none hover-link"
                >
                  Contact
                </a>
              </div>
              <p className="text-white-50 small mb-0">
                © 2025 GraphNet. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Smooth scrolling for anchor links */
        :global(html) {
          scroll-behavior: smooth;
          scroll-padding-top: 70px; /* Account for navbar height */
        }

        :global(body) {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
        }

        /* Each section snaps - with margin for navbar */
        .snap-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          scroll-margin-top: 70px; /* Account for fixed navbar */
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        /* Navbar stays fixed, doesn't interfere with snap */
        :global(.navbar) {
          z-index: 1000;
          height: 70px;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        :global(.navbar-brand) {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        :global(.navbar-brand img) {
          flex-shrink: 0;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          :global(html) {
            scroll-padding-top: 70px;
          }

          .snap-section {
            scroll-margin-top: 70px;
            padding-top: 70px;
          }

          :global(.navbar) {
            height: 70px;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }

          :global(.navbar-brand) {
            font-size: 1.1rem;
          }

          :global(.navbar-brand img) {
            width: 40px;
            height: 40px;
          }
        }

        /* Initial hidden states */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
        }

        /* Animation keyframes - SLOWER */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* SVG Graph animations - only when visible */
        @keyframes graphFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes graphPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        /* SVG only animates when it has svg-animating class */
        .graph-container.svg-animating .graph-svg {
          animation: graphFloat 4s ease-in-out infinite,
            graphPulse 3s ease-in-out infinite;
        }

        /* Remove animation when not visible */
        .graph-container:not(.svg-animating) .graph-svg {
          animation: none;
        }

        /* Hero animations (play immediately) - SLOWER */
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        /* Scroll-triggered animations - SLOWER */
        .animate-on-scroll.animate-in.fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-on-scroll.animate-in.slide-in-left {
          animation: slideInLeft 1.2s ease-out forwards;
        }

        .animate-on-scroll.animate-in.slide-in-right {
          animation: slideInRight 1.2s ease-out forwards;
        }

        .animate-on-scroll.animate-in.scale-in {
          animation: scaleIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Hover effects */
        .hover-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }

        .hover-link {
          transition: color 0.3s ease;
        }
        .hover-link:hover {
          color: white !important;
        }
      `}</style>
    </>
  );
}
