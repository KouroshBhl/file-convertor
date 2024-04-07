import Button from '@/components/Button';
import FilePicker from '@/components/FilePicker.js';
import Form from '@/components/Form';
import Heading from '@/components/Heading';
import { convert } from '@/utils/actions';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // const t = useTranslations('Index');
  return (
    <div>
      {/* <Form action={convert}>
        <Heading title='File Convertor!' />
        <FilePicker />
        <Button name='Choose File' isSelector={true}></Button>
      </Form> */}
    </div>
  );
}
