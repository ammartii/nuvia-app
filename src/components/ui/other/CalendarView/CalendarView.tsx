import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarView.scss";
import { Entry } from "../../../../models/entry.model";
import MonthSelector from "../../../layout/MonthSelector/MonthSelector";

type CalendarViewProps = {
  entries: Entry[];
};

const CalendarView = ({ entries }: CalendarViewProps) => {
  const [date, setDate] = useState<Date>(new Date());

  const hasEntryForDate = (day: Date) => {
    return entries.some((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getFullYear() === day.getFullYear() &&
        entryDate.getMonth() === day.getMonth() &&
        entryDate.getDate() === day.getDate()
      );
    });
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container">
      <MonthSelector
        month={date.getMonth()}
        year={date.getFullYear()}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setDate(value);
          } else if (Array.isArray(value) && value[0] instanceof Date) {
            setDate(value[0]);
          }
        }}
        value={date}
        showNavigation={false}
        tileClassName={({ date: tileDate, view }) =>
          view === "month" && hasEntryForDate(tileDate)
            ? "calendar-tile-has-entry"
            : ""
        }
      />
    </div>
  );
};

export default CalendarView;
