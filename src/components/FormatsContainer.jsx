import { use } from 'react';
import { useFilePicker } from '../context/filePicker';
import { useDetectOutside } from '../utils/hooks/useDetectMouseOutside';

function FormatsContainer({ children, width, className }) {
  const { setShowFrom, setShowTo } = useFilePicker();
  const ref = useDetectOutside([setShowFrom, setShowTo], false);
  return (
    <div
      ref={ref}
      className={`bg-theme-darkGray_1 w-[30rem] h-auto absolute text-sm top-16 flex flex-col gap-4 p-4 text-theme-white rounded ${className}`}
    >
      {children}
    </div>
  );
}

export default FormatsContainer;
