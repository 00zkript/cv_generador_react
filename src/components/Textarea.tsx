import { ChangeEvent } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    classNameParent?: string;
    className?: string;
    label?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ classNameParent = '' ,className = '',label, value, onChange, ...props }: TextareaProps) {
    return (
        <div className={classNameParent}>
            {label && (<label className="form-label">{label}</label>)}
            <textarea 
                className={`form-control ${className}`  }
                onChange={onChange} 
                value={value}
                {...props} 
                >
            </textarea>
        </div>
    );
}
