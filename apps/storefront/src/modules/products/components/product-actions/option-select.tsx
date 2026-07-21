import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const colorMap: Record<string, string> = {
  white: "#ffffff",
  black: "#000000",
  red: "#ff0000",
  blue: "#0000ff",
  purple: "#800080",
  green: "#008000",
  yellow: "#ffff00",
  gray: "#808080",
  grey: "#808080",
  pink: "#ffc0cb",
  brown: "#a52a2a",
  orange: "#ffa500",
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const isColor = title.toLowerCase() === "color" || title.toLowerCase() === "colour"

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{title}:</span>
        {current && <span className="text-sm text-gray-700">{current}</span>}
      </div>
      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isActive = v === current
          
          if (isColor) {
            const hex = colorMap[v.toLowerCase()] || "#cccccc"
            return (
              <button
                onClick={() => updateOption(option.id, v)}
                key={v}
                title={v}
                className={clx(
                  "w-8 h-8 flex items-center justify-center p-0.5 transition-colors",
                  {
                    "border border-black": isActive,
                    "border border-transparent hover:border-gray-300": !isActive,
                  }
                )}
                disabled={disabled}
                data-testid="option-button"
              >
                <span 
                  className="w-full h-full block border border-gray-200" 
                  style={{ backgroundColor: hex }} 
                />
              </button>
            )
          }

          // Default / Size buttons
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "min-w-[40px] h-10 px-3 text-sm flex items-center justify-center transition-colors",
                {
                  "border border-black text-black": isActive,
                  "border border-gray-200 text-gray-700 hover:border-black hover:text-black": !isActive,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
