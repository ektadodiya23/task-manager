import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import Draggable from "react-draggable";
import HTMLReactParser from "html-react-parser";
import CloseIcon from "@mui/icons-material/Close";
// import GridLayout, { WidthProvider } from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";




export interface NewsItem {
 
  position: { x: number; y: number; };
  id: number;
  isActive: boolean;
  newsTitle: string;
  newsDate: string;
  editorValue: string;
}

export default function NewesForm() {
  const [dataArray, setDataArray] = useState<NewsItem[]>([]);
  
  

  // get news data from localStorage
  useEffect(() => {
    const getData: any = localStorage.getItem("newsData");
    const convertData = JSON.parse(getData);

    if (Array.isArray(convertData)) {
      setDataArray(convertData);
    } else {
      setDataArray([]);
    }
  }, []);


  // onStop set new position into localStorage

  const handleDrag = (id: number, data: { x: number; y: number }) => {
    const updatedDataArray = dataArray.map((item) =>
      item.id === id ? { ...item, position: { x: data.x, y: data.y } } : item
    );
    setDataArray(updatedDataArray);
    console.log("draggable", updatedDataArray);
    localStorage.setItem("newsData", JSON.stringify(updatedDataArray));
  };

  // Remove news post
  const handleRemoveNews = (id: number) => {
    const newsData = [...dataArray];
    const removeNews = newsData.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("newsData", JSON.stringify(removeNews));
    setDataArray(removeNews);
  };

 

  return (
    

    <div>
      <Box sx={{ marginTop: "2%", marginLeft: "2%", width: "90%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {dataArray.map((item, index) => {
            return (
              <Grid key={index} item xs={2} sm={4} md={4}>
                <Draggable
                    onStop={(e, data) => handleDrag(item.id, data)}
                    position={item.position}
                  >
               
                  <Box
                    className={item.isActive ? "box_part_active" : "box_part"}
                    sx={{ boxShadow: "1" }}
                  >
                    <Box
                      onClick={() => handleRemoveNews(item.id)}
                      className="icon_part"
                    >
                      <CloseIcon />
                    </Box>
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
                      <Typography sx={{ marginBottom: "2px" }}>
                        Date : {item.newsDate}
                      </Typography>
                      <Typography sx={{ marginTop: "2px" }}>
                        {/* first convert html code into HTMLReactParser than show data into page */}
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
    </div>
  );
}


