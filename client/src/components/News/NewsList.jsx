import React from "react";
import { Grid } from "@mui/material";
import NewsArticle from "./NewsArticle";

const NewsList = ({ articles }) => {
  return (
    <Grid container spacing={3}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <NewsArticle article={article} delay={index * 0.1} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsList;
