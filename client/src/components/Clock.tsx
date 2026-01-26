import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date): string => {
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        return `${hh} : ${mm} : ${ss}`;
    };

    return <div className="text-[11px] font-medium">{formatTime(time)}</div>;
};

export default Clock;
