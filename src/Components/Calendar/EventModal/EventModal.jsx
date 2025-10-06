import React from 'react';
import { Modal } from '../../Modal';
import TimePicker from 'react-time-picker';

export const EventModal = ({
    isOpen,
    onClose,
    onSubmit,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
                <div className="time-input">
                    <div className="event-popup-time">Time</div>
                    <TimePicker
                        {...register('time')}
                        onChange={(time) => {
                            setValue('time', time || '00:00');
                        }}
                        value={watch('time')}
                        format="HH:mm"
                        disableClock={true}
                        className="time-picker-react"
                    />
                </div>
                <textarea
                    {...register('text')}
                    className="event-textarea"
                    placeholder="Enter event text (Maximum 50 characters)"
                ></textarea>
                <p className="errors">{errors.text?.message}</p>
                <div className="event-buttons-modal">
                    <button className="event-popup-buttons">Save</button>
                    <button
                        type="button"
                        className="event-popup-buttons"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};
