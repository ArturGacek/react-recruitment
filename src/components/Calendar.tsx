import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { HolidayType } from '../enums/HolidayType';
import { Holiday } from '../interfaces/Holiday';
import ArrRightIcon from '../assets/icons/arr-right.svg';
import ArrLeftIcon from '../assets/icons/arr-left.svg';
import InfoIcon from '../assets/icons/info-icon.svg';
import { daysOfWeek } from '../constants/daysOfWeek';
import { useActionData } from 'react-router-dom';

interface CalendarProps {
  availableTimes: string[];
  holidays: Holiday[];
  onChange: (name: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  availableTimes,
  holidays,
  onChange,
}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData && actionData === 'Success') {
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [actionData]);

  const startOfMonth = currentDate.startOf('month');
  const daysInMonth = currentDate.daysInMonth();

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
    setSelectedTime(null);
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
    setSelectedTime(null);
    setSelectedDate(null);
  };

  const handleDateClick = (date: dayjs.Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setSelectedTime(null); // Reset selected time when a new date is selected
    onChange('selectedDate');
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onChange('selectedTime');
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = startOfMonth.date(i);
      const dayOfWeek = date.day(); // 0 (Sunday) to 6 (Saturday)
      const formattedDate = date.format('YYYY-MM-DD');
      const isSundayOrNationalHoliday =
        dayOfWeek === 0 ||
        holidays.some(
          (h) => h.date === formattedDate && h.type === HolidayType.National
        );

      days.push(
        <div
          key={i}
          className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-full 
          ${
            selectedDate === date.format('YYYY-MM-DD')
              ? 'bg-primary text-text-white'
              : ''
          } 
          ${
            isSundayOrNationalHoliday
              ? 'text-secondary pointer-events-none'
              : ''
          }`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    const startDay = startOfMonth.day() || 7;
    const emptyDays = Array(startDay - 1)
      .fill(null)
      .map((_, index) => (
        <div key={`empty-${index}`} className="h-10 w-10"></div>
      ));

    return [...emptyDays, ...days];
  };

  const observanceHoliday = selectedDate
    ? holidays.find(
        (h) => h.date === selectedDate && h.type === HolidayType.Observance
      )
    : null;

  return (
    <>
      <div
        className={`bg-background flex items-start justify-between ${
          observanceHoliday ? '' : 'mb-8'
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto">
            <label className="block mb-2  text-text-normal">Date</label>
            <div className="bg-background-white p-4 rounded-lg border border-border-color">
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  className="ml-5"
                  onClick={handlePrevMonth}
                >
                  <img src={ArrLeftIcon} alt="Previous month" />
                </button>
                <span>{currentDate.format('MMMM YYYY')}</span>
                <button
                  type="button"
                  className="mr-5"
                  onClick={handleNextMonth}
                >
                  <img src={ArrRightIcon} alt="Next month" />
                </button>
              </div>
              <div className="grid grid-cols-7 text-center">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={index}
                    className="h-11 w-11 flex items-center justify-center font-bold"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">{renderDays()}</div>
            </div>
          </div>
          {selectedDate && (
            <div className="w-full md:w-20 mt-4 md:mt-0">
              <label className="block mb-2 text-text-normal">Time</label>
              <div className="flex flex-wrap md:flex-col gap-2">
                {availableTimes.map((time, index) => (
                  <div
                    key={index}
                    className={`w-20 h-11 flex items-center justify-center border rounded-lg  bg-background-white
                  ${
                    selectedTime === time
                      ? 'border-primary border-2'
                      : 'border-border-color'
                  } cursor-pointer
                  ${
                    dayjs(selectedDate).day() === 0
                      ? 'text-text-normal pointer-events-none'
                      : ''
                  }`}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}
          <input type="hidden" name="selectedDate" value={selectedDate || ''} />
          <input type="hidden" name="selectedTime" value={selectedTime || ''} />
        </div>
      </div>
      {observanceHoliday && (
        <div
          className={`text-text-normal flex ${observanceHoliday ? 'mb-8' : ''}`}
        >
          <img src={InfoIcon} alt="Info icon" className="inline pr-2" />{' '}
          <p className="pt-1">It is {observanceHoliday.name}</p>
        </div>
      )}
    </>
  );
};

export default Calendar;
