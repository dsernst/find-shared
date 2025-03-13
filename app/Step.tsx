export const Step = ({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) => {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  )
}
