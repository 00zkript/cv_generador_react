import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'value'> {
    label: string;
    className?: string;
    type?: HTMLInputTypeAttribute;
    // value?: string | number;
    value?: React.InputHTMLAttributes<HTMLInputElement>['value'] | null; // Extiende el tipo original y agrega null
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, className = '', type = 'text', value, onChange, ...props }: InputProps) {

    const formattedValue = type === 'date' 
        ? value instanceof Date 
            ? value.toISOString().split('T')[0]  // Convierte Date a 'YYYY-MM-DD'
            : value === null 
                ? '' 
                : value
        : value;



    return (
        <div className={className}>
            <label className="form-label">{label}</label>
            <input 
                className="form-control" 
                type={type} 
                value={formattedValue ?? ''} 
                onChange={onChange} 
                {...props} 
            />
        </div>
    );
}
