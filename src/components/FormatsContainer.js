function FormatsContainer({ children }) {
  return (
    <div className='bg-theme-footerDark w-96 h-auto absolute text-base top-12 flex flex-col gap-4 p-4 text-theme-white '>
      {children}
    </div>
  );
}

export default FormatsContainer;
