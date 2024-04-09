function FormatsContainer({ children, width }) {
  return (
    <div
      className={`bg-theme-darkGray_1 w-${width} h-auto absolute text-sm top-16 flex flex-col gap-4 p-4 text-theme-white rounded`}
    >
      {children}
    </div>
  );
}

export default FormatsContainer;
