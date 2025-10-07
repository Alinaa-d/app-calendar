import * as yup from 'yup';
import dayjs from 'dayjs';

export const dateFormat = 'MMMM D, YYYY';
export const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const noteFormSchema = yup.object().shape({
    time: yup.string().required('Required field'),
    text: yup.string().trim().required('Required field').max(50, 'Max 50 characters'),
});

export const getDayClassName = (day, calendarState, currentDate) => {
    const date = dayjs().year(calendarState.year).month(calendarState.month).date(day);

    if (date.isSame(currentDate, 'day')) {
        return 'today';
    } else if (date.isBefore(currentDate, 'day')) {
        return 'past-day';
    } else if (date.isAfter(currentDate, 'day')) {
        return 'future-day';
    }
};

export const getEventClassName = (event) => {
    const eventDateTime = dayjs(event.date)
        .hour(event.time.split(':')[0])
        .minute(event.time.split(':')[1]);
    const now = dayjs();

    if (eventDateTime.isBefore(now)) {
        return 'past-event';
    }
    return '';
};
