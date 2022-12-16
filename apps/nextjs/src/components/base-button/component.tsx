type Props = {
  isLoading?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
};

export const BaseButton: React.FC<Props> = ({
  onClick,
  children,
  className = '',
  // isLoading,
}) => (
  <button
    className={`rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
