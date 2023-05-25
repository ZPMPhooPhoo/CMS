import React, { useState } from "react";

type DateProps = {
  initialDate?: Date;

  onDateChange: (date: Date) => void;
};

export const DateInput: React.FC<DateProps> = ({ initialDate, onDateChange }) => {
  const [date, setDate] = useState<Date>(
    initialDate ? initialDate : new Date()
  );

  // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newDate = new Date(event.target.value);
  //   setDate(newDate);
  //   onDateChange(newDate);
  // };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split("-").map(Number);
    const newDate = new Date(year, month - 1, day); // month is 0-based in JavaScript Date object
    setDate(newDate);
    onDateChange(newDate);
  };
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <input type="date" value={formattedDate} onChange={handleDateChange} />
  );
};