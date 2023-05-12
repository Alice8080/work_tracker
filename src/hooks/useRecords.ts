import moment from "moment";
import { Record, RecordsList } from "../api/apiSlice";

interface ReturnData {
    labels: string[],
    data: number[],
    allHours: string,
}

export interface Params {
    time: 'all' | 'month' | 'week';
    recordName: string | undefined;
}

interface statisticalData {
    firstDate: string;
    lastDate: string;
    bestDay: {
        day: string,
        hours: string
    },
    bestMonth: {
        month: string,
        hours: string
    },
    weekHours: string
}

// хук обработки данных из списка записей о делах

export const useRecords = (recordsList: RecordsList | undefined) => {
    const formatTime = (hours: number): string => {
        const hoursForms = ['час', 'часа', 'часов'];
        const minutesForms = ['минута', 'минуты', 'минут'];
        function formatCase(value: number, words: string[]) {
            value = Math.abs(value) % 100;
            var num = value % 10;
            if (value > 10 && value < 20) return words[2];
            if (num > 1 && num < 5) return words[1];
            if (num === 1) return words[0];
            return words[2];
        }
        const hour = Math.trunc(hours);
        const minutes = Math.round((hours * 60) % 60);
        const hoursString = hour ? `${hour} ${formatCase(hour, hoursForms)}` : '';
        const minutesString = minutes || !hour && !minutes ? `${minutes} ${formatCase(minutes, minutesForms)}` : '';
        return `${hoursString} ${minutesString}`;
    }

    const formData = (params: Params): ReturnData => { // отображение статистики записей в зависимости от парметров сортировки 
        const { time, recordName }: Params = params;
        let data: ReturnData = {
            labels: [],
            data: [],
            allHours: ''
        };
        if (recordsList) {
            let recordsData = new Map();
            let allHours = 0;
            const searchFrom = {
                all: new Date(0),
                month: new Date((new Date()).setMonth((new Date()).getMonth() - 1)),
                week: new Date(new Date().getTime() - 604800000)
            };
            const today = new Date();
            for (let record of recordsList) {
                const fromDate: Date = new Date(Date.parse(record.fromDate));
                const toDate: Date = new Date(Date.parse(record.toDate));
                const dateString: string = fromDate.toLocaleString().split(',')[0]; // датой дела считается день, когда дело было начато
                const timePerDay: number = Number(((toDate.getTime() - fromDate.getTime()) / 1000 / 60 / 60).toFixed(2)); // время считается в часах
                const currentTime: number = recordsData.has(dateString) ? recordsData.get(dateString) + timePerDay : timePerDay;
                if (currentTime > 0) {
                    const isBetween = moment(fromDate).isBetween(searchFrom[time], today, null, '()');
                    if (recordName) {
                        if ((String(record.name).toLowerCase()).indexOf(recordName.toLowerCase()) !== -1 && isBetween) {
                            recordsData.set(dateString, currentTime);
                            allHours += currentTime;
                        }
                    } else if (isBetween) {
                        recordsData.set(dateString, currentTime);
                        allHours += currentTime;
                    }
                }
            }
            data.labels = Array.from(recordsData.keys()).reverse();
            data.data = Array.from(recordsData.values()).reverse();
            data.allHours = formatTime(allHours);
        }
        return data;
    }
    
    const getNameByDate = (date: string, name: string | undefined): string => { // отображение названия выбранного дела во всплывающей подсказке на графике
        let recordsNames = new Set<string>();
        if (recordsList) {
            for (let record of recordsList) {
                const fromDate = new Date(Date.parse(record.fromDate));
                const dateString = fromDate.toLocaleString().split(',')[0];
                if (name && dateString === date && (record.name.toLowerCase()).indexOf(name.toLowerCase()) !== -1) {
                    recordsNames.add(record.name);
                } else if (dateString === date) {
                    recordsNames.add(record.name);
                }
            }
        }        
        return Array.from(recordsNames).join(', ');
    }
    
    const getBestResults = (): statisticalData => { // получить периоды с наибольшим количеством часов, дату первой и последней записи  
        let info: statisticalData = {
            firstDate: '',
            lastDate: '',
            bestDay: {
                day: '',
                hours: ''
            },
            bestMonth: {
                month: '',
                hours: ''
            },
            weekHours: ''
        };
        if (recordsList) {
            let weekHours = 0;
            let recordsData: Map<string, number> = new Map<string, number>();
            let months: Map<number, number> = new Map<number, number>();
            for (let record of recordsList) {
                const fromDate: Date = new Date(Date.parse(record.fromDate));
                const toDate: Date = new Date(Date.parse(record.toDate));
                const dateString: string = fromDate.toLocaleString().split(',')[0]; // датой дела считается день, когда дело было начато
                const timePerDay: number = Number(((toDate.getTime() - fromDate.getTime()) / 1000 / 60 / 60).toFixed(2)); // время считается в часах
                const currentTime: number = (recordsData.get(dateString) ?? 0) + timePerDay;
                const month: number = fromDate.getMonth();
                const today = new Date();
                const startWeek = new Date(new Date().getTime() - 604800000);
                const isBetween = moment(fromDate).isBetween(startWeek, today, null, '()');
                recordsData.set(dateString, currentTime);
                months.set(month, (months.get(month) ?? 0) + timePerDay);
                if (isBetween) {
                    weekHours += currentTime;
                }
            }
            const maxHours = [...recordsData.entries()].reduce((accumulator, element) => {
                return element[1] > accumulator[1] ? element : accumulator;
            });
            info.bestDay.day = maxHours[0];
            info.bestDay.hours = formatTime(maxHours[1]);
    
            const maxMonth = [...months.entries()].reduce((accumulator, element) => {
                return element[1] > accumulator[1] ? element : accumulator;
            });
            info.bestMonth.month = new Date(2023, maxMonth[0], 1).toLocaleString('ru', { month: 'long' });
            info.bestMonth.hours = formatTime(maxMonth[1]);
            let firstRecord = new Date(Date.parse(recordsList[recordsList.length - 1].fromDate));
            info.firstDate = firstRecord.toLocaleString().split(',')[0];
            let lastRecord = new Date(Date.parse(recordsList[0].fromDate));
            info.lastDate = lastRecord.toLocaleString().split(',')[0];
            info.weekHours = formatTime(weekHours);
        }
        return info;
    }

    return {formData, getNameByDate, getBestResults, formatTime};
}
