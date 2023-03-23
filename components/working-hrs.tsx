import React, { useState } from 'react';
import { NativeSelect } from '@/components/shared/native-select';
import { Checkbox } from './shared/checkbox';

type DayOfWeek = '0' | '1' | '2' | '3' | '4' | '5' | '6'

const dayOfWeekVN = {
  '0': 'CN',
  '1': 'T2',
  '2': 'T3',
  '3': 'T4',
  '4': 'T5',
  '5': 'T6',
  '6': 'T7'
}

export type WorkingHours = {
  [day in DayOfWeek]: {
    isOpen24Hours: boolean;
    openingHour: number;
    closingHour: number;
    isClose: boolean;
  };
};

type EditWorkingHoursProps = {
  initialWorkingHours: WorkingHours;
  onSave: (workingHours: WorkingHours) => void;
};

const EditWorkingHours: React.FC<EditWorkingHoursProps> = ({ initialWorkingHours, onSave }) => {
  const [workingHours, setWorkingHours] = useState<WorkingHours>(initialWorkingHours);

  React.useEffect(() => {
    if (initialWorkingHours)
      setWorkingHours(initialWorkingHours)
  }, [initialWorkingHours])

  const handleSave = () => {
    onSave(workingHours);
  };

  const handleDayChange = (day: DayOfWeek, field: 'openingHour' | 'closingHour', event: React.ChangeEvent<HTMLSelectElement>) => {
    const newWorkingHours: WorkingHours = { ...workingHours };
    newWorkingHours[day][field] = parseInt(event.target.value) as number;
    onSave(newWorkingHours)
    setWorkingHours(newWorkingHours);
  };

  const handle24HourChange = (day: DayOfWeek, event: React.ChangeEvent<HTMLInputElement>) => {
    const newWorkingHours: WorkingHours = { ...workingHours };
    newWorkingHours[day].isOpen24Hours = event.target.checked;
    onSave(newWorkingHours)
    setWorkingHours(newWorkingHours);
  };

  const handleCloseChange = (day: DayOfWeek, event: React.ChangeEvent<HTMLInputElement>) => {
    const newWorkingHours: WorkingHours = { ...workingHours };
    newWorkingHours[day].isClose = event.target.checked;
    onSave(newWorkingHours)
    setWorkingHours(newWorkingHours);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2 w-full'>
        {workingHours && Object.keys(workingHours)?.map((_day: any) => {
          let day: DayOfWeek = _day;
          return <div className='w-full' key={day}>
            <div className='w-full mb-1'>{dayOfWeekVN[day]}</div>
            <div className='flex gap-2'>
              <NativeSelect

                disabled={workingHours[day].isClose}
                value={workingHours[day].openingHour as number}
                onChange={(event: any) => handleDayChange(day as DayOfWeek, "openingHour", event)}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <option key={hour} value={hour}>{hour}:00</option>
                ))}
              </NativeSelect>

              <NativeSelect

                disabled={workingHours[day].isClose}
                value={workingHours[day].closingHour}
                onChange={(event) => handleDayChange(day as DayOfWeek, "closingHour", event)}
              >
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <option key={hour} value={hour}>{hour}:00</option>
                ))}
              </NativeSelect>

              <label className='inline-flex flex-row gap-1 items-center'>
                <Checkbox
                  checked={workingHours[day].isOpen24Hours}
                  onChange={(event) => handle24HourChange(day as DayOfWeek, event)}
                />
                Cả ngày 24h
              </label>

              <label className='inline-flex flex-row gap-1 items-center'>
                <Checkbox
                  checked={workingHours[day].isClose}
                  onChange={(event) => handleCloseChange(day as DayOfWeek, event)}
                />
                Off
              </label>
            </div>



          </div>
        })}
      </div>

    </div>
  );
};

export default EditWorkingHours;
