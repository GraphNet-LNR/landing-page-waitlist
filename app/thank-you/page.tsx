"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #0A66C2 0%, #7C3AED 100%)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div
                className={`text-center card-animate ${mounted ? "show" : ""}`}
              >
                {/* Logo and Brand */}
                <div className="mb-4 logo-bounce">
                  <Image
                    src="/logo.svg"
                    alt="GraphNet Logo"
                    width={120}
                    height={120}
                    className="mx-auto d-block"
                  />
                </div>

                <h1 className="display-4 fw-bold text-white mb-3 fade-in-text">
                  GraphNet
                </h1>

                {/* Success Icon */}
                <div className="mb-4 checkmark-container">
                  <div className="checkmark-circle">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      className="checkmark"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        className="checkmark-circle-path"
                      />
                      <path
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        d="M20 40 L35 55 L60 25"
                        className="checkmark-check"
                      />
                    </svg>
                  </div>
                </div>

                {/* Thank You Message */}
                <h2 className="display-5 fw-bold text-white mb-3 fade-in-text-delay-1">
                  Thank You for Joining!
                </h2>

                <p
                  className="lead text-white mb-4 opacity-90 fade-in-text-delay-2"
                  style={{ fontSize: "1.25rem" }}
                >
                  We are excited to have you on board. You are now on our
                  exclusive waitlist!
                </p>

                <div
                  className="card border-0 shadow-lg mb-4 fade-in-text-delay-3"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                      <svg
                        width="32"
                        height="32"
                        fill="white"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                      <h4 className="text-white mb-0 fw-bold">
                        Expected Launch
                      </h4>
                    </div>
                    <p className="text-white mb-0 fs-3 fw-bold">Early 2026</p>
                    <p className="text-white-50 small mb-0 mt-2">
                      We will reach out when we are ready to launch
                    </p>
                  </div>
                </div>

                <p className="text-white opacity-75 mb-4 fade-in-text-delay-4">
                  ✉️ Keep an eye on your inbox for updates and early access
                  details
                </p>

                {/* Call to Action */}
                <div className="fade-in-text-delay-5">
                  <Link
                    href="/"
                    className="btn btn-light btn-lg px-5 py-3 fw-semibold shadow-lg"
                  >
                    ← Back to Home
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="mt-5 fade-in-text-delay-6">
                  <p className="text-white-50 small mb-2">
                    Join 500+ professionals already on the waitlist
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <div
                      className="rounded-circle bg-white"
                      style={{ width: "8px", height: "8px", opacity: 0.6 }}
                    ></div>
                    <div
                      className="rounded-circle bg-white"
                      style={{ width: "8px", height: "8px", opacity: 0.6 }}
                    ></div>
                    <div
                      className="rounded-circle bg-white"
                      style={{ width: "8px", height: "8px", opacity: 0.6 }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Card entrance animation */
        .card-animate {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.6s ease-out;
        }

        .card-animate.show {
          opacity: 1;
          transform: scale(1);
        }

        /* Logo bounce animation */
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .logo-bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        /* Text fade in animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-text {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .fade-in-text-delay-1 {
          animation: fadeInUp 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }

        .fade-in-text-delay-2 {
          animation: fadeInUp 0.8s ease-out 0.7s forwards;
          opacity: 0;
        }

        .fade-in-text-delay-3 {
          animation: fadeInUp 0.8s ease-out 0.9s forwards;
          opacity: 0;
        }

        .fade-in-text-delay-4 {
          animation: fadeInUp 0.8s ease-out 1.1s forwards;
          opacity: 0;
        }

        .fade-in-text-delay-5 {
          animation: fadeInUp 0.8s ease-out 1.3s forwards;
          opacity: 0;
        }

        .fade-in-text-delay-6 {
          animation: fadeInUp 0.8s ease-out 1.5s forwards;
          opacity: 0;
        }

        /* Checkmark animation */
        .checkmark-container {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }

        .checkmark-circle {
          animation: scaleIn 0.5s ease-out 0.3s forwards;
          transform: scale(0);
        }

        @keyframes scaleIn {
          to {
            transform: scale(1);
          }
        }

        .checkmark-circle-path {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
          animation: drawCircle 1s ease-out 0.5s forwards;
        }

        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }

        .checkmark-check {
          stroke-dasharray: 70;
          stroke-dashoffset: 70;
          animation: drawCheck 0.6s ease-out 1.2s forwards;
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Button hover effect */
        .btn-light {
          transition: all 0.3s ease;
        }

        .btn-light:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }

          .display-5 {
            font-size: 2rem;
          }

          .lead {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </>
  );
}
