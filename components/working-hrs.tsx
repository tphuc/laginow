import React, { useState } from 'react';

type DayOfWeek =  '0' | '1' | '2' | '3' | '4' | '5' | '6'

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
    };
};

type EditWorkingHoursProps = {
    initialWorkingHours: WorkingHours;
    onSave: (workingHours: WorkingHours) => void;
};

const EditWorkingHours: React.FC<EditWorkingHoursProps> = ({ initialWorkingHours, onSave }) => {
    const [workingHours, setWorkingHours] = useState<WorkingHours>(initialWorkingHours);

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

    return (
        <div className='w-full'>
                <div className='flex flex-col gap-2 w-full'>
                    { workingHours && Object.keys(workingHours)?.map((_day: any) => {
                        let day: DayOfWeek = _day;
                        return <div className='w-full' key={day}>
                                <div className='w-full mb-1'>{dayOfWeekVN[day]}</div>
                          
                                <select
                                    disabled={workingHours[day].isOpen24Hours}
                                    className='bg-white mr-1 rounded-md border-none shadow shadow-sm disabled:opacity-50'
                                    value={workingHours[day].openingHour as number}
                                    onChange={(event) => handleDayChange(day as DayOfWeek, "openingHour", event)}
                                >
                                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                        <option key={hour} value={hour}>{hour}:00</option>
                                    ))}
                                </select>

                                <select
                                 disabled={workingHours[day].isOpen24Hours}
                                    className='bg-white mr-1 rounded-md border-none shadow shadow-sm disabled:opacity-50'
                                   
                                   
                                    value={workingHours[day].closingHour}
                                    onChange={(event) => handleDayChange(day as DayOfWeek, "closingHour", event)}
                                >
                                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                        <option key={hour} value={hour}>{hour}:00</option>
                                    ))}
                                </select>
                            
                                <label className='inline-flex flex-row gap-1 items-center'>
                                <input
                                    className='ml-1 rounded-sm'
                                    type="checkbox"
                                    checked={workingHours[day].isOpen24Hours}
                                    onChange={(event) => handle24HourChange(day as DayOfWeek, event)}
                                />
                                    cả ngày 24h
                                </label>
                        
                        </div>
                    })}
                </div>
       
        </div>
    );
};

export default EditWorkingHours;