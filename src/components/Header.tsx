interface HeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Header = ({ title, description, children }: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">
          {title}
        </h1>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">{description}</p>
      </div>

      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
};

export default Header;
