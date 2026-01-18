import { useEffect } from "react";
import { CrossIcon } from "../assets/crossIcon";

type ResponseProps = {
    message: string;
    onClose?: () => void;
    autoClose?: boolean;
    autoCloseDelay?: number;
};

export function Response({ 
    message, 
    onClose, 
    autoClose = true, 
    autoCloseDelay = 5000 
}: ResponseProps) {
    useEffect(() => {
        if (autoClose && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, autoCloseDelay);
            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseDelay, onClose]);

    // Determine if message is success or error based on content
    const isError = message.toLowerCase().includes('error') || 
                   message.toLowerCase().includes('fail') || 
                   message.toLowerCase().includes('invalid');

    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className={`
                relative min-w-[300px] max-w-md rounded-lg shadow-2xl
                ${isError 
                    ? 'bg-red-50 border-2 border-red-200' 
                    : 'bg-green-50 border-2 border-green-200'
                }
                p-4 pr-10
                backdrop-blur-sm
            `}>
                <div className="flex items-start gap-3">
                    <div className={`
                        flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                        ${isError ? 'bg-red-200' : 'bg-green-200'}
                    `}>
                        {isError ? (
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    <p className={`
                        flex-1 text-sm font-medium
                        ${isError ? 'text-red-800' : 'text-green-800'}
                        break-words
                    `}>
                        {message}
                    </p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className={`
                            absolute top-2 right-2 p-1 rounded-md
                            ${isError 
                                ? 'hover:bg-red-100 text-red-600' 
                                : 'hover:bg-green-100 text-green-600'
                            }
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${isError ? 'focus:ring-red-500' : 'focus:ring-green-500'}
                        `}
                        aria-label="Close notification"
                    >
                        <CrossIcon />
                    </button>
                )}
            </div>
        </div>
    );
}