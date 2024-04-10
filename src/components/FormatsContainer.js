function FormatsContainer({ children, width, className }) {
  return (
    <div
      className={`bg-theme-darkGray_1 w-[30rem] h-auto absolute text-sm top-16 flex flex-col gap-4 p-4 text-theme-white rounded ${className}`}
    >
      {children}
    </div>
  );
}

export default FormatsContainer;
