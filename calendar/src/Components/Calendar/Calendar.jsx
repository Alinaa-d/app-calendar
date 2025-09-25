import {useState, useEffect} from "react";
import {FaAngleLeft} from 'react-icons/fa6';
import {FaAngleRight} from 'react-icons/fa6';
import {AiOutlineEdit} from 'react-icons/ai';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {daysOfWeek} from './Calendar.helper.js';
import {monthsOfYear} from './Calendar.helper.js';
import {useForm} from "react-hook-form";
import {helper} from "./Calendar.helper.js";
import {yupResolver} from "@hookform/resolvers/yup";
import {Modal} from "../Modal/Modal.jsx";
import dayjs from 'dayjs';
import TimePicker from 'react-time-picker'
import { IoClose } from 'react-icons/io5';

const Calendar = () => {

    const currentDate = dayjs();
    const [currentMonth, setCurrentMonth] = useState(currentDate.month());
    const [currentYear, setCurrentYear] = useState(currentDate.year());
    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [showIsEventPopup, setShowIsEventPopup] = useState(false)
    const [eventToDelete, setEventToDelete] = useState(null);
    const [showDeleteEventPopup, setShowDeleteEventPopup] = useState(false)
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('calendarEvents');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });
    const [eventTime, setEventTime] = useState({hours: "00", minutes: "00"})
    const [eventText, setEventText] = useState('')
    const [editingEvent, setEditingEvent] = useState(null)
    const dayInMonth = dayjs().year(currentYear).month(currentMonth).daysInMonth();
    const firstDaySunday = dayjs().year(currentYear).month(currentMonth).date(1).day();
    const firstDayOfMonth = firstDaySunday === 0 ? 6 : firstDaySunday - 1;
    const [showActionPopup, setShowActionPopup] = useState(false)

    const weekdaysElements = daysOfWeek.map((item, index) => (
        <span key={index}>{item}</span>
    ));

    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    const MoveToThePrevMonth = () => {
        setCurrentMonth((MoveToThePrevMonth) => (MoveToThePrevMonth === 0 ? 11 : MoveToThePrevMonth - 1))
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
    }

    const MoveToTheNextMonth = () => {
        setCurrentMonth((MoveToThePrevMonth) => (MoveToThePrevMonth === 11 ? 0 : MoveToThePrevMonth + 1))
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    const handleDayClick = (day) => {

        const clickedDate = dayjs().year(currentYear).month(currentMonth).date(day)
        const today = dayjs()

        if (clickedDate.isAfter(today) || clickedDate.isSame(today,'day')) {
            setSelectedDate(clickedDate)
            setShowActionPopup(true)
        }
        else if (clickedDate.isBefore(today)){
            setSelectedDate(clickedDate)
            setShowActionPopup(false)
        }
    }

    const handleAddEvent = () => {
        setShowActionPopup(false)
        setShowIsEventPopup(true)
        setEventTime({hours: "00", minutes: "00"})
        setEventText("")
        setEditingEvent(null)
    }

    const handleViewEvents = () => {
        setShowActionPopup(false)
    }

    const getDayClassName = (day) => {
        const date = dayjs().year(currentYear).month(currentMonth).date(day)
        const today = dayjs()

        if (date.isSame(today, 'day')) {
            return 'today'
        } else if (date.isBefore(today, 'day')) {
            return 'past-day'
        } else if (date.isAfter(today, 'day')) {
            return 'future-day'
        }
    }

    const getEventClassName = (event) => {
        const eventDateTime = dayjs(event.date).hour(event.time.split(':')[0]).minute(event.time.split(':')[1]);
        const now = dayjs();

        if (eventDateTime.isBefore(now)) {
            return 'past-event';
        }
        return '';
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(helper),
    })

    const handleEventSubmit = (data) => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
            text: data.textarea,
        }

        let updatedEvents = [...events]

        if(editingEvent) {
            updatedEvents = updatedEvents.map((event) =>
                event.id === editingEvent.id ? newEvent : event,
            )
        }
        else{
                updatedEvents.push(newEvent)
        }

        updatedEvents.sort((a, b) => {
            const dateTimeA = dayjs(a.date).hour(a.time.split(':')[0]).minute(a.time.split(':')[1]);
            const dateTimeB = dayjs(b.date).hour(b.time.split(':')[0]).minute(b.time.split(':')[1]);
            return dateTimeA.valueOf() - dateTimeB.valueOf();
        });

        setEvents(updatedEvents)
        setEventTime({hours: "00", minutes: "00"})
        setEventText("")
        setShowIsEventPopup(false)
        setEditingEvent(null)
        reset()
    }

    const handleEditEvent = (event) => {
        setSelectedDate(dayjs(event.date))
        setEventTime({
            hours: event.time.split(":")[0],
            minutes: event.time.split(":")[1],
        })
        setEventText(event.text)
        setEditingEvent(event)
        setShowIsEventPopup(true)
    }

    const openDeleteModal = (eventId) => {
        setEventToDelete(eventId);
        setShowDeleteEventPopup(true);
    };

    const handleDeleteEvent = () => {
        if (eventToDelete) {
            const updatedEvents = events.filter((event) => event.id !== eventToDelete);
            setEvents(updatedEvents);
            setEventToDelete(null);
            setShowDeleteEventPopup(false);
        }
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <h1 className="head">Calendar</h1>
                <div className="navigate-date">
                    <h2 className="month">{monthsOfYear[currentMonth]},</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="buttons-arrows">
                        <FaAngleLeft onClick={MoveToThePrevMonth}/>
                        <FaAngleRight onClick={MoveToTheNextMonth}/>
                    </div>
                </div>
                <div className="weekdays">
                    {weekdaysElements}
                </div>
                <div className="days">
                    {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                        <span key={`empty-${index}`} className="empty-cell"/>
                    ))}
                    {[...Array(dayInMonth).keys()].map((day) => (<span  className={`day ${getDayClassName(day + 1)}`}
                                                                       onClick={() => handleDayClick(day + 1)}
                    >{day + 1}
                    </span>))}
                </div>
            </div>

            <Modal
                show={showIsEventPopup}
                onClose={() => setShowIsEventPopup(false)}
            >
                <form onSubmit={handleSubmit(handleEventSubmit)} className='form'>
                    <div className="time-input">
                        <div className="event-popup-time">Time</div>
                        <TimePicker
                            onChange={(time) => {
                                if (time) {
                                    const [hours, minutes] = time.split(':');
                                    setEventTime({ hours, minutes });
                                }
                            }}
                            value={`${eventTime.hours}:${eventTime.minutes}`}
                            format="HH:mm"
                            disableClock={true}
                            className="time-picker-react"
                        />
                    </div>
                    <textarea
                        {...register('textarea')}
                        className="event-textarea"
                        placeholder="Enter event text (Maximum 50 characters)"
                        value={eventText}
                        onChange={(e) => {
                            if (e.target.value.length <= 50) {
                                setEventText(e.target.value)
                            }
                        }}
                    ></textarea>
                    <p className="errors">{errors.textarea?.message}</p>
                    <div className="event-buttons-modal">
                        <button className="event-popup-save">Save</button>
                        <button type="button" className="event-popup-cancel"
                                onClick={() => {setShowIsEventPopup(false); reset();}}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                show={showActionPopup}
                onClose={() => setShowActionPopup(false)}>
                <div className="action-container">
                    <IoClose onClick={() => setShowActionPopup(false)}/>
                    <div className="action-buttons-modal">
                        <button className="action-popup-add" onClick={handleAddEvent}>Add a new event</button>
                        <button type="button" className="action-popup-viewing" onClick={handleViewEvents}>Viewing events</button>
                    </div>
                </div>
            </Modal>

            <Modal
                show={showDeleteEventPopup}
                onClose={() => showDeleteEventPopup(false)}
            >
                <div className="delete-container">
                <h2>Confirm the deletion</h2>
                <div className="event-buttons-modal-delete">
                    <button className="event-popup-delete" onClick={handleDeleteEvent}>Delete</button>
                    <button type="button" className="event-popup-cancel" onClick={() => setShowDeleteEventPopup(false)}>
                        Cancel
                    </button>
                </div>
                </div>
            </Modal>
            <div className="events">
                <h2 className="events-head">Events on {dayjs(selectedDate).format('MMMM D, YYYY')}</h2>
                {events
                    .filter(event => {
                    if (!selectedDate) return true;
                    return dayjs(event.date).isSame(selectedDate, 'day');
                })
                    .map((event, index) => (
                        <div className={`event ${getEventClassName(event)}`}>
                            <div className="event-date-wrapper">
                                <div className="event-date">
                                    {dayjs(event.date).format('MMMM D, YYYY')}
                                </div>
                                <div className="event-time">{event.time}</div>
                            </div>
                            <div className="event-text">{event.text}</div>
                            <div className="event-buttons">
                                <AiOutlineEdit onClick={() => handleEditEvent(event)}/>
                                <RiDeleteBin6Line onClick={() => openDeleteModal(event.id)}/>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Calendar
