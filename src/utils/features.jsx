import moment from 'moment';

export const generateRandomNumber = () => {
    const min = 1;
    const max = 100; 
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
    return randomNumber;
  }

  export function generateColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16).padStart(2, '0');
    }
    return color;
}

export const getLastMonths = ()=>{
    const currentDate= moment();

    currentDate.date(1);

    const last6Months = [];
    const last12Months= [];

    for(let i=0; i<6; i++){
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        last6Months.unshift(monthName);
    }

    for(let i=0; i<12; i++){
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        last12Months.unshift(monthName);
    }

    return {last6Months, last12Months};
}