import { useState } from 'react';
import Button from './Button';

function SubmitFiles({ canUpload }) {
  // const [outpotFormat, setOutpotFormat] = useState(false);
  // const isOutpotFormatChoose = pickedFiles.every((file) => file.formatTo);
  // setOutpotFormat(isOutpotFormatChoose);
  // console.log(outpotFormat);
  return (
    <Button isSelector={false} disabled={!canUpload}>
      Convert
    </Button>
  );
}

export default SubmitFiles;
