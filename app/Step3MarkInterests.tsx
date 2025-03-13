import { useState } from 'react'

type Checked = { [key: string]: boolean }

export function Step3MarkInterests({ items }: { items: string }) {
  const [checked, setChecked] = useState<Checked>({})

  return (
    <div>
      <div>Step 3: Mark interests</div>
      <div>
        {items
          .split('\n')
          .filter(Boolean)
          .map((item) => (
            <div
              key={item}
              className="hover:bg-white/10 rounded-md p-1 cursor-pointer"
              onClick={() => setChecked({ ...checked, [item]: !checked[item] })}
            >
              <input
                type="checkbox"
                className="mr-2"
                readOnly
                checked={!!checked[item]}
              />
              {item}
            </div>
          ))}
      </div>
    </div>
  )
}
