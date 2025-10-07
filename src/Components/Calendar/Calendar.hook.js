import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { noteFormSchema } from './Calendar.helper.js';

export const useCalendar = () => {
    const currentDate = dayjs();

    const [calendarState, setCalendarState] = useState({
        month: currentDate.month(),
        year: currentDate.year(),
        selectedDate: currentDate,
    });

    const [isEventPopupShown, setIsEventPopupShown] = useState(false);
    const [isActionPopupShown, setIsActionPopupShown] = useState(false);

    const [eventDeletePopup, setEventDeletePopup] = useState({
        isShown: false,
        data: null,
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(noteFormSchema),
        defaultValues: {
            time: '',
            text: '',
            events: [],
        },
    });

    const {
        fields: events,
        append,
        update,
        remove,
        replace,
    } = useFieldArray({
        control,
        name: 'events',
    });

    const [editingEvent, setEditingEvent] = useState(null);

    const currentMonthDate = dayjs().year(calendarState.year).month(calendarState.month); //дата с текущим годом и месяцем из календаря
    const dayInMonth = currentMonthDate.daysInMonth();

    const firstDaySunday = dayjs()
        .year(calendarState.year)
        .month(calendarState.month)
        .date(1)
        .day();

    const firstDayOfMonth = firstDaySunday === 0 ? 6 : firstDaySunday - 1;

    const handleMoveToPrevMonth = () => {
        setCalendarState((currentState) => {
            const newMonth = currentState.month === 0 ? 11 : currentState.month - 1;
            const newYear = currentState.month === 0 ? currentState.year - 1 : currentState.year;
            return { month: newMonth, year: newYear };
        });
    };

    const handleMoveToNextMonth = () => {
        setCalendarState((currentState) => {
            const newMonth = currentState.month === 11 ? 0 : currentState.month + 1;
            const newYear = currentState.month === 11 ? currentState.year + 1 : currentState.year;
            return { month: newMonth, year: newYear };
        });
    };

    const handleDateSelect = (day) => {
        const selectedDate = currentMonthDate.date(day);

        setCalendarState((currentState) => ({
            ...currentState,
            selectedDate: selectedDate,
        }));

        if (selectedDate.isAfter(currentDate) || selectedDate.isSame(currentDate, 'day')) {
            setIsActionPopupShown(true);
        } else if (selectedDate.isBefore(currentDate)) {
            setIsActionPopupShown(false);
        }
    };

    const handleEventAdd = () => {
        setIsActionPopupShown(false);
        setIsEventPopupShown(true);
        setEditingEvent(null);
        setValue('time', '');
        setValue('text', '');
    };

    const handleEventsView = () => {
        setIsActionPopupShown(false);
    };

    const handleEventSubmit = (data) => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: calendarState.selectedDate.format('YYYY-MM-DD'),
            time: data.time,
            text: data.text,
        };

        if (editingEvent) {
            const eventIndex = events.findIndex((event) => event.id === editingEvent.id);
            if (eventIndex !== -1) {
                update(eventIndex, newEvent);
            }
        } else {
            append(newEvent);
        }

        setIsEventPopupShown(false);
        setEditingEvent(null);
    };

    const handleEditEvent = (event) => {
        setCalendarState((currentState) => ({
            ...currentState,
            selectedDate: dayjs(event.date),
        }));

        setValue('time', event.time);
        setValue('text', event.text);

        setEditingEvent(event);
        setIsEventPopupShown(true);
    };

    const openDeleteModal = (eventId) => {
        setEventDeletePopup({
            isShown: true,
            data: eventId,
        });
    };

    const handleDeleteEvent = () => {
        if (eventDeletePopup.data) {
            const eventIndex = events.findIndex((event) => event.id === eventDeletePopup.data);
            if (eventIndex !== -1) {
                remove(eventIndex);
            }
            setEventDeletePopup({ isShown: false, data: null });
        }
    };

    const filterEvents = (events) => {
        if (!calendarState.selectedDate) return events;
        return events.filter((event) =>
            dayjs(event.date).isSame(calendarState.selectedDate, 'day')
        );
    };

    useEffect(() => {
        const savedEvents = localStorage.getItem('calendarEvents');
        if (savedEvents) {
            const parsedEvents = JSON.parse(savedEvents);
            if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
                replace(parsedEvents);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    return {
        calendarState,
        handleMoveToPrevMonth,
        handleMoveToNextMonth,
        firstDayOfMonth,
        dayInMonth,
        currentDate,
        handleDateSelect,
        isEventPopupShown,
        setIsEventPopupShown,
        handleEventSubmit,
        handleSubmit,
        setValue,
        watch,
        errors,
        register,
        isActionPopupShown,
        setIsActionPopupShown,
        handleEventAdd,
        handleEventsView,
        eventDeletePopup,
        handleDeleteEvent,
        setEventDeletePopup,
        filterEvents,
        openDeleteModal,
        handleEditEvent,
        events,
        control,
    };
};
