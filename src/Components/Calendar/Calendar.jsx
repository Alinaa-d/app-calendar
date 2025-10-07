import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { daysOfWeek } from './Calendar.helper.js';
import { monthsOfYear } from './Calendar.helper.js';
import { getDayClassName } from './Calendar.helper.js';
import { getEventClassName } from './Calendar.helper.js';
import { Modal } from '../Modal';
import dayjs from 'dayjs';
import { IoClose } from 'react-icons/io5';
import { EventModal } from './EventModal';
import { useCalendar } from './Calendar.hook.js';
import { dateFormat } from './Calendar.helper.js';

export const Calendar = () => {
    const {
        calendarState,
        register,
        control,
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
    } = useCalendar();

    return (
        <div className="calendar-container">
            <div className="calendar-wrapper">
                <h1 className="heading">Calendar</h1>
                <div className="navigate-date">
                    <h2>
                        {monthsOfYear[calendarState.month]}, {calendarState.year}
                    </h2>
                    <div className="buttons-arrows-wrapper">
                        <FaAngleLeft onClick={handleMoveToPrevMonth} />
                        <FaAngleRight onClick={handleMoveToNextMonth} />
                    </div>
                </div>
                <div className="weekdays">
                    {daysOfWeek.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
                <div className="days-wrapper">
                    {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                        <span key={`empty-${index}`} className="empty-cell" />
                    ))}
                    {[...Array(dayInMonth).keys()].map((day) => (
                        <span
                            key={`day-${day + 1}`}
                            className={`day ${getDayClassName(day + 1, calendarState, currentDate)}`}
                            onClick={() => handleDateSelect(day + 1)}
                        >
                            {day + 1}
                        </span>
                    ))}
                </div>
            </div>

            <EventModal
                isOpen={isEventPopupShown}
                onClose={() => setIsEventPopupShown(false)}
                onSubmit={handleEventSubmit}
                register={register}
                handleSubmit={handleSubmit}
                setValue={setValue}
                watch={watch}
                errors={errors}
                control={control}
            />

            <Modal isOpen={isActionPopupShown} onClose={() => setIsActionPopupShown(false)}>
                <div className="action-container">
                    <IoClose onClick={() => setIsActionPopupShown(false)} />
                    <div className="action-buttons-modal">
                        <button className="action-popup" onClick={handleEventAdd}>
                            Add a new event
                        </button>
                        <button type="button" className="action-popup" onClick={handleEventsView}>
                            Viewing events
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={eventDeletePopup.isShown}
                onClose={() => setEventDeletePopup({ isShown: false, data: null })}
                onClose={() => eventDeletePopup.isShown(false)}
            >
                <div className="delete-container">
                    <h2>Confirm the deletion</h2>
                    <div className="event-buttons-modal">
                        <button className="event-popup-buttons" onClick={handleDeleteEvent}>
                            Delete
                        </button>
                        <button
                            type="button"
                            className="event-popup-buttons"
                            onClick={() => setEventDeletePopup({ isShown: false, data: null })}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="events-wrapper">
                <h2 className="events-header">
                    Events on {dayjs(calendarState.selectedDate).format(dateFormat)}
                </h2>
                {filterEvents(events).map((event, index) => (
                    <div key={event.id} className={`event ${getEventClassName(event)}`}>
                        <div className="event-date-wrapper">
                            <div className="event-date">{dayjs(event.date).format(dateFormat)}</div>
                            <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-text">{event.text}</div>
                        <div className="event-buttons">
                            <AiOutlineEdit onClick={() => handleEditEvent(event)} />
                            <RiDeleteBin6Line onClick={() => openDeleteModal(event.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
