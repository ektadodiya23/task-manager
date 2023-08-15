import { Box, Grid, Typography } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";
import "./style.css";
import Draggable from "react-draggable";
import { NewsItem } from "./NewesForm";

export default function ViewPost() {
   const [dataArray, setDataArray] = useState<NewsItem[]>([]);

 
  useEffect(() => {
    const getData: any = localStorage.getItem("newsData");
    const convertData = JSON.parse(getData);

    if (Array.isArray(convertData)) {
      setDataArray(convertData);
    } else {
      setDataArray([]);
    }
  }, []);

  

  return (
    <Box>
      <Box sx={{ marginTop: "2%", marginLeft: "2%", width: "90%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {dataArray.map((item: NewsItem, index: number) => {
            return (
              <Grid key={index} item xs={2} sm={4} md={4}>
                <Draggable position={item.position}>
                  <Box
                    className={item.isActive ? "box_part_active" : "box_part"}
                    sx={{ boxShadow: "1" }}
                  >
                    <Box sx={{ padding: "3%" }}>
                      <Box
                        sx={{
                          marginTop: "2%",
                          marginBottom: "2%",
                          fontWeight: "600",
                        }}
                      >
                        {item.isActive ? "Top Headline: Newest Update :  " : ""}
                      </Box>
                      <Typography variant="h6" sx={{ marginBottom: "2%" }}>
                        <b>{item.newsTitle}</b>
                      </Typography>
                      <Typography sx={{ marginBottom: "2%" }}>
                        Date : {item.newsDate}
                      </Typography>
                      <Typography sx={{ marginTop: "2%" }}>
                        {HTMLReactParser(item.editorValue)}
                      </Typography>
                    </Box>
                  </Box>
                </Draggable>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>

  );
}
