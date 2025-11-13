import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewsList from "./NewsList";
import { fetchNews } from "../../api/homeApi";
import { useTheme } from "@mui/material";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const articles = await fetchNews();
        setNews(articles);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 6,
          mt: 5,
          color: theme.palette.primary.main,
          letterSpacing: 1,
        }}
      >
        Latest News
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <NewsList articles={news} />
      )}
    </Container>
  );
};

export default News;
