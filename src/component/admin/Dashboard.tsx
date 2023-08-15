import { Box, Typography } from "@mui/material";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './style.css';
import { useEffect, useState } from "react";
import { IformValue } from "../dataType/Datatype";









export default function Dashboard() {


 const localizer = momentLocalizer(moment);
 const [events, setEvents] = useState<IformValue[]>([]);



 useEffect(() => {

   const dataFromLocalStorage = localStorage.getItem("TaskData");
   const formData: IformValue[] = dataFromLocalStorage
     ? JSON.parse(dataFromLocalStorage)
     : [];

   const calendarEvents: any[] = formData.map((item) => ({
     id: item.id,
     title: item.title,
     desc: item.desc,
     start: new Date(item.startDate),
     end: new Date(item.endDate),
   }));
   setEvents(calendarEvents);

 }, []);



return (
    <Box>
      <Box sx={{ padding: "35px" }}>
        <Calendar
         events={events}
          localizer={localizer}
          formats={{
            dayHeaderFormat: (date) => moment(date).format("dddd  DD"),
          }}
          selected={events}
          style={{ height: "83vh", width: "100%" }}
        />
      </Box>
    </Box>
  );
}
