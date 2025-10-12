import React, { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import headerImage from "../../assets/header.jpg";
import "./LandingPage.css";
import Slider from "react-slick";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const LandingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };
    ScrollReveal().reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".header__content form, .cta-button", {
      ...scrollRevealOption,
      delay: 1500,
    });
  }, []);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const featureData = [
    {
      title: "Live Stock Prices",
      description: "Access real-time stock prices and trends.",
    },
    {
      title: "Simulated Trading",
      description: "Execute trades in a risk-free environment.",
    },
    {
      title: "AI-Powered Quizzes",
      description: "Boost your knowledge with AI-generated finance quizzes.",
    },
    {
      title: "Comprehensive Portfolio",
      description: "Manage and analyze your investment portfolio easily.",
    },
    {
      title: "Top Gainers & Losers",
      description:
        "Stay updated with market movements by viewing top gainers and losers.",
    },
    {
      title: "Chatbot Assistance",
      description: "Get help and guidance from our AI chatbot anytime.",
    },
    {
      title: "Latest News",
      description:
        "Access the most recent financial news to make informed trading decisions.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          borderBottom: 2px solid ${theme.palette.primary.main},
        }}
      >
       
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          {/* Logo Icon */}
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <EmojiObjectsIcon
              sx={{
                fontSize: 28,
                color: theme.palette.primary.main,
              }}
            />
          </motion.div>

          {/* Logo Text with hover animation */}
          <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: "1.6rem",
              color: theme.palette.primary.main,
              display: "flex",
              overflow: "hidden",
              position: "relative",
              ml: 0,
            }}
          >
            {!hovered && <span>TradeUp</span>}
            {hovered && (
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "7ch" }}
                transition={{ duration: 1, ease: "linear" }}
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                TradeUp
              </motion.span>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Features", "How It Works", "Benefits", "FAQ"].map((text) => (
            <a
              key={text}
              href={#${text.toLowerCase().replace(/ /g, "-")}}
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
                fontWeight: 500,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#388e3c")}
              onMouseLeave={(e) =>
                (e.target.style.color = theme.palette.primary.main)
              }
            >
              {text}
            </a>
          ))}
          <button
            onClick={() => navigate("/signin")}
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              border: "none",
              borderRadius: 5,
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#388e3c")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = theme.palette.primary.main)
            }
          >
            Login
          </button>
        </Box>
      </nav>

      {/* Hero Section */}
      <header className="header__container">
        <div className="header__image">
          <img src={headerImage} alt="header" />
        </div>
        <div className="header__content">
          <h1 className="large">
            Learn Stock Trading with{" "}
            <span style={{ color: theme.palette.primary.main }}>Zero</span>{" "}
            Risk.
          </h1>
          <p>
            Discover a world of stock trading without the risk. Practice
            trading, improve your skills, and stay updated with the latest
            finance insights—all in one place.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="cta-button"
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Features */}
      <section
        id="features"
        style={{ padding: "4rem 0", display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "70%" }}>
          <h1
            style={{ textAlign: "center", color: theme.palette.primary.main }}
          >
            Features
          </h1>
          <div style={{ marginTop: "2rem" }}>
            <Slider {...settings}>
              {featureData.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  style={{ padding: "0 10px" }}
                >
                  <Card
                    sx={{
                      height: "200px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      border: 2px solid ${theme.palette.primary.main},
                      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.main,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#333" }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="how-it-works-section"
        style={{ padding: "4rem 2rem", backgroundColor: "#f0fdf4" }}
      >
        <h1 style={{ textAlign: "center", color: theme.palette.primary.main }}>
          How It Works
        </h1>
        <div
          className="steps-container"
          style={{ maxWidth: 800, margin: "2rem auto" }}
        >
          <ol
            className="steps"
            style={{ listStyle: "none", padding: 0, counterReset: "step" }}
          >
            {[
              {
                title: "Sign Up",
                desc: "Create your free account and get started with PaperLingo.",
              },
              {
                title: "Choose Stocks",
                desc: "Browse and select stocks to trade with virtual funds.",
              },
              {
                title: "Track Progress",
                desc: "Monitor your progress and enhance your trading skills.",
              },
              {
                title: "Compete & Learn",
                desc: "Join the leaderboard and learn through AI quizzes.",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                style={{ display: "flex", marginBottom: "2rem" }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  className="step-icon"
                  style={{
                    counterIncrement: "step",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    marginRight: "1rem",
                  }}
                >
                  {index + 1}
                </div>
                <div className="step-content">
                  <h4 style={{ color: theme.palette.primary.main }}>
                    {item.title}
                  </h4>
                  <p>{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>  
      
      
      
          {/* Benefits */}
      <section id="benefits" style={{ padding: "4rem 2rem" }}>
        <h1 style={{ textAlign: "center", color: theme.palette.primary.main }}>
          Benefits
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {[
            {
              title: "Risk-Free Learning",
              desc: "Build trading confidence without financial risk.",
            },
            {
              title: "Real-Time Insights",
              desc: "Stay informed with up-to-date financial resources.",
            },
            {
              title: "Progress Tracking",
              desc: "Review your trades and growth over time.",
            },
            {
              title: "Fun & Interactive",
              desc: "Learn through engaging quizzes and gamified elements.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              style={{
                backgroundColor: "#fff",
                border: 2px solid ${theme.palette.primary.main},
                borderRadius: 12,
                padding: "2rem",
                width: "250px",
                textAlign: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            >
              <h4
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        style={{ padding: "4rem 2rem", backgroundColor: "#f9fafb" }}
      >
        <h1 style={{ textAlign: "center", color: theme.palette.primary.main }}>
          Frequently Asked Questions
        </h1>
        <div className="faq" style={{ maxWidth: 800, margin: "2rem auto" }}>
          {[
            {
              question: "Is this platform free?",
              answer: "Yes, PaperLingo is 100% free for educational purposes.",
            },
            {
              question: "Do I need trading experience?",
              answer: "No, our platform is beginner-friendly.",
            },
            {
              question: "Can I access real stock data?",
              answer:
                "Absolutely! However, please note that stock prices are delayed by one day as we retrieve them from an API.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="faq-item"
              style={{ marginBottom: "1rem", cursor: "pointer" }}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem",
                  border: 1px solid ${theme.palette.primary.main},
                  borderRadius: 8,
                  backgroundColor: "#fff",
                }}
              >
                <h4 style={{ margin: 0, color: theme.palette.primary.main }}>
                  {item.question}
                </h4>
                <span
                  style={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p
                  className="faq-answer"
                  style={{
                    padding: "1rem",
                    border: 1px solid ${theme.palette.primary.main},
                    borderTop: "none",
                    borderRadius: "0 0 8px 8px",
                    backgroundColor: "#fff",
                  }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 1rem",
          backgroundColor: "#e8f5e9",
          marginTop: "4rem",
          color: theme.palette.primary.main,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        <p>&copy; 2025 TradeUp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
