import Loader from "../../../components/common/Loader"

const LoaderCard = () => {
    return (
        <div className="transition-discrete duration-200 ease-linear hover:scale-105 border-1 border-primary-400 w-full max-w-[456px] min-h-[128px] px-6 py-4 rounded-xl flex justify-center items-center">
            <Loader size={{ width: '54px', height: '54px' }} />
        </div>
    )
}

export default LoaderCard