export function Step3MarkInterests({ items }: { items: string }) {
  return (
    <div>
      <div>Step 3: Mark interests</div>
      <div>
        {items.split('\n').map((item) => (
          <div key={item}>
            <input type="checkbox" className="mr-2" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
