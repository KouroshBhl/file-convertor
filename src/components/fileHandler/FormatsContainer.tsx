import { type ReactNode } from 'react';
import { useFilePicker } from '../../context/FilePickerContext';
import { useDetectOutside } from '../../utils/hooks/useDetectMouseOutside';

type FormatsContainerProps = {
  children: ReactNode;
  width?: string;
  className?: string;
  setIsFormatShowing?: (value: boolean) => void;
  setShowFrom?: (value: boolean) => void;
  setShowTo?: (value: boolean) => void;
};

function FormatsContainer({
  children,
  width,
  className,
  setIsFormatShowing,
}: FormatsContainerProps) {
  // const { setShowFrom, setShowTo } = useFilePicker();
  // const ref = useDetectOutside(setIsFormatShowing, false);

  return (
    <div
      // ref={ref}
      className={`bg-theme-darkGray_1 w-[30rem] h-auto absolute text-sm top-16 flex flex-col gap-4 p-4 text-theme-white rounded ${className}`}
    >
      {children}
    </div>
  );
}

export default FormatsContainer;
