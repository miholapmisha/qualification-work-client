const GroupUsersSkeleton = () => (
    <div className="animate-pulse flex items-center justify-between bg-white rounded-lg border border-primary-200 p-3">
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100"></div>
            <div className="ml-3">
                <div className="h-4 w-40 bg-primary-100 rounded"></div>
                <div className="h-3 w-32 bg-primary-100 rounded mt-2"></div>
            </div>
        </div>
        <div className="h-8 w-24 bg-primary-100 rounded"></div>
    </div>
);

export default GroupUsersSkeleton