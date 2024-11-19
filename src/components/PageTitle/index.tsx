type Props = {
  children: string;
  className?: string;
};

const PageTitle = ({ children, className }: Props) => (
  <h2 className={className}>{children}</h2>
);

export default PageTitle;
