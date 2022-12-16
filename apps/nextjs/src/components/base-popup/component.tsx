type Props = {
  children?: React.ReactNode;
};

export const BasePopup: React.FC<Props> = ({ children }) => (
  <div className="fixed inset-0 z-10 bg-opacity-60">
    <div className="h-full w-full" />
    <div className="absolute bottom-0 left-[50%] h-[300px] w-full translate-x-2/4 bg-white py-[10px] px-[15px]">
      {children}
    </div>
  </div>
);
