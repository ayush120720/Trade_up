import React, { useState } from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { motion } from "framer-motion";

const NewsArticle = ({ article, delay }) => {
  const theme = useTheme();
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      style={{ perspective: "1000px", width: "100%" }} // full width
    >
      <Box
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        sx={{
          width: "100%",
          minHeight: 320, 
          cursor: "pointer",
          position: "relative",
        }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative", 
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front Side */}
          <Card
            sx={{
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              component="img"
              src={article.banner_image}
              alt={article.title}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 180, 
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                {article.title.length > 60
                  ? article.title.slice(0, 60) + "..."
                  : article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(article.time_published)}
              </Typography>
            </CardContent>
          </Card>

          {/* Back Side */}
          <Card
            sx={{
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "16px",
              background: theme.palette.primary.main,
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              p: 2,
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              {article.summary
                ? article.summary.slice(0, 120) + "..."
                : "Click below to read more."}
            </Typography>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Read More →
            </a>
          </Card>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default NewsArticle;
