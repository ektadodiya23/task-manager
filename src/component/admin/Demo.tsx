import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import HTMLReactParser from "html-react-parser";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";


export interface NewsItem {
  position: { x: number; y: number };
  id: number;
  isActive: boolean;
  newsTitle: string;
  newsDate: string;
  editorValue: string;
}



export default function Demo() {

  const [dataArray, setDataArray] = useState<NewsItem[]>([]);
    const [event , setEvent] = useState([]);

  useEffect(() => {
    const getData: any = localStorage.getItem("newsData");
    const convertData  = getData ? JSON.parse(getData) : [];

        const layout = convertData.map((item: {
            y: any;  x: any; 
          })=>({
            
            x : item.x  , 
            y : item.y ,
        }))
        setEvent(layout)
        
  }, []);

   

  return (
    <div>
      <GridLayout
        className="layout"
        layout={event}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <Box key="a" sx={{ bgcolor: "pink" }}>
         {event.map((item : NewsItem)=>{
            return (
                <>
                <Typography>{item.newsTitle}</Typography>
                <Typography>{item.editorValue}</Typography></>
            )
         })}
        </Box>
        {/* <Box key="b" sx={{ bgcolor: "gray" }}>
          ireotgfjdk
        </Box>
        <Box key="c" sx={{ bgcolor: "pink" }}>
          ireotgfjdk
        </Box> */}
      </GridLayout>
     
    </div>
  );
}
