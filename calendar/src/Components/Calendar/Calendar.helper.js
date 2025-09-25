export const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
export const monthsOfYear = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

import *as yup from 'yup';

export const helper = yup.object().shape(
    {
        hours: yup.date(),
        minutes: yup.date(),
        textarea: yup.string().trim().required('Required field').max(50, 'Max 50 characters')
    }
)

