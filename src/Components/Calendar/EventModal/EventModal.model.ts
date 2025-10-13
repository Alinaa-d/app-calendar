import type {
    Control,
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
    FieldValues,
} from 'react-hook-form';

export type EventModalProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    register: UseFormRegister<TFieldValues>;
    handleSubmit: UseFormHandleSubmit<TFieldValues>;
    control: Control<TFieldValues, TContext>;
    errors: FieldErrors<TFieldValues>;
};
