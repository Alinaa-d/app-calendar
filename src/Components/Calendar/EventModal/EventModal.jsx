import React from 'react';
import { Modal } from '../../Modal';
import TimePicker from 'react-time-picker';
import { Controller } from 'react-hook-form';

export const EventModal = ({
    isOpen,
    onClose,
    onSubmit,
    register,
    handleSubmit,
    control,
    errors,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
                <div className="time-input">
                    <div className="event-popup-time">Time</div>
                    <Controller
                        name="time"
                        control={control}
                        render={({ field }) => (
                            <TimePicker
                                {...field}
                                format="HH:mm"
                                onChange={(time) => field.onChange(time)}
                                disableClock={true}
                                className="time-picker-react"
                            />
                        )}
                    />
                </div>
                <p className="errors">{errors.time?.message}</p>
                <textarea
                    {...register('text')}
                    className="event-textarea"
                    placeholder="Enter event text (Maximum 50 characters)"
                />
                <p className="errors">{errors.text?.message}</p>
                <div className="event-buttons-modal">
                    <button className="event-popup-buttons">Save</button>
                    <button type="button" className="event-popup-buttons" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};
