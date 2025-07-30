import React from 'react';
import { LoadingSpinnerProps } from './type';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading products...' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div data-testid="loading-spinner" className="flex flex-col justify-center items-center py-8" role="status" aria-label={text}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-blue-600`}></div>
      {size !== 'sm' && (
        <p className="mt-4 text-gray-600 text-sm">{text}</p>
      )}
      <span className="sr-only">{text}</span>
    </div>
  );
};