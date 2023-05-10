import { Record, RecordsList } from "../api/apiSlice";

interface returnData {
    labels: string[],
    data: number[]
}

export function formData(recordsList: RecordsList): returnData {
    let result: returnData = {
        labels: [],
        data: []
    };
    let labelsData = new Map();
    for (let record of recordsList) {
        const fromDate = new Date( Date.parse(record.fromDate) ); 
        const toDate = new Date( Date.parse(record.toDate) );
        const dateString = fromDate.toLocaleString().split(',')[0]; // датой дела считается день, когда дело было начато
        const timePerDay = ((toDate.getTime()-fromDate.getTime()) / 1000 / 60 / 60).toFixed(2); // время считается в часах
        const currentTime = labelsData.has(dateString) ? +labelsData.get(dateString)+(+timePerDay) : timePerDay;
        labelsData.set(dateString, currentTime);
    }
    result.labels = Array.from(labelsData.keys()).reverse();
    result.data = Array.from(labelsData.values()).reverse();
    return result;
}

export function getNameByDate(recordsList: RecordsList, date: string): string {
    let recordsNames = new Set<string>()
    for (let record of recordsList) {
        const fromDate = new Date( Date.parse(record.fromDate) ); 
        const dateString = fromDate.toLocaleString().split(',')[0]; 
        if (dateString === date) {
            recordsNames.add(record.name);
        }
    }
    return Array.from(recordsNames).join(', ');
}