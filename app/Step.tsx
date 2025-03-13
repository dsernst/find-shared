export const Step = ({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) => {
  const isOpen = true
  return (
    <div className="border border-white/15 rounded-md p-2 w-full">
      <h3 className="font-semibold">
        <span className="text-sm mr-1 opacity-70">
          {isOpen ? <span>▼</span> : <span>▶</span>}
        </span>
        {title}
      </h3>
      {children}
    </div>
  )
}
