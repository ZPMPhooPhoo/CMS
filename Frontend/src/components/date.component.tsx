import React, { useState } from "react";

type DateProps = {
  initialDate?: Date;

  onDateChange: (date: Date) => void;
};

export const DateComponent: React.FC<DateProps> = ({ initialDate, onDateChange }) => {
  const [date, setDate] = useState<Date>(
    initialDate ? initialDate : new Date()
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <input type="date" value={date.toISOString().substr(0, 10)} onChange={handleDateChange} />
  );
};
