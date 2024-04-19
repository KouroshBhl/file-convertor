import React from 'react';

type ShowFormatFileProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

export default function ShowFormatFile({
  onClick,
  children,
}: ShowFormatFileProps) {
  return (
    <div
      onClick={onClick}
      className='flex justify-center items-center gap-2 cursor-pointer bg-theme-lightGray_2 rounded px-4 py-2'
    >
      {children}
    </div>
  );
}
