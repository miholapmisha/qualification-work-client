import Input from "./Input"

type SwitchProps = {
    switchOn: boolean
    onChangeSwitchState: (value: boolean) => void
}

const Switch = ({ switchOn, onChangeSwitchState }: SwitchProps) => {

    return (
        <div onClick={() => onChangeSwitchState(!switchOn)} className="cursor-pointer relative w-[46px]">
            <div className={`${switchOn ? 'bg-cyan-600' : 'bg-primary-400'} transition-colors duration-300 px-2 py-3 rounded-2xl`}>
            </div>
            <div className={`${switchOn ? 'translate-x-5.5' : ''} transition-all ease-in-out duration-300 border-1 border-primary-500 absolute top-0 size-6 bg-white rounded-full`}>
            </div>
        </div>
    )
}

export default Switch