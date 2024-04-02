"use client";
import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
// import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { enUS, enGB } from "date-fns/locale";
interface DatePickerprops {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  //   onChange: (value: RangeKeyDict) => void;
  bookedDates?: Date[];
}
const CalendarDatePicker: React.FC<DatePickerprops> = ({
  value,
  onChange,
  bookedDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction={"vertical"}
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates}
      locale={enGB}
    />
  );
};

export default CalendarDatePicker;
