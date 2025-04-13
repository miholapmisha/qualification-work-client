import { ReactElement } from "react"
import { MultipleChoiceGrid, } from "../../../../types/survey"

type InactiveOptionsGridProps =
    (Pick<MultipleChoiceGrid, "rows" | "options">) & { icon?: ReactElement }

const InactiveOptionsGrid = ({ rows, options, icon }: InactiveOptionsGridProps) => {

    const gridTemplateColumns = `minmax(80px, 1fr) repeat(${options.length}, 1fr)`

    return (
        <div
            className="w-full overflow-auto"
            style={{
                display: 'grid',
                gridTemplateColumns,
                gap: '1rem',
                alignItems: 'center'
            }}
        >
            <div className="font-medium text-primary-600">
            </div>

            {options.map(option => (
                <div key={option._id} className="text-center font-medium py-2">
                    {option.text}
                </div>
            ))}

            {rows.map(row => (
                <>
                    <div key={`label-${row._id}`}>
                        {row.text}
                    </div>

                    {options.map(option => (
                        <div key={`${row._id}-${option._id}`} className="flex justify-center">
                            {icon}
                        </div>
                    ))}
                </>
            ))}
        </div>
    )
}

export default InactiveOptionsGrid