import React from 'react';
import TimePicker from 'react-time-picker';
import { Controller } from 'react-hook-form';
import { Modal } from '../../Modal/Modal.js';
import type {EventModalProps} from "./EventModal.model.js";

export const EventModal = ({
    isOpen,
    onClose,
    onSubmit,
    register,
    handleSubmit,
    control,
    errors,
}: EventModalProps) => {
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
                <p className="errors">{String(errors.time?.message ?? '')}</p>
                <textarea
                    {...register('text')}
                    className="event-textarea"
                    placeholder="Enter event text (Maximum 50 characters)"
                />
                <p className="errors">{String(errors.text?.message ?? '')}</p>
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
