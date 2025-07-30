export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}