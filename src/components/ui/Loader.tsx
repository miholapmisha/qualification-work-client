type LoaderProps = {
    size?: {
        width: string;
        height: string;
    }
}

const Loader = ({size} : LoaderProps) => {
    return (
        <div
          className="border-4 border-t-black border-gray-300 rounded-full animate-spin"
          style={{
            width: size?.width ?? "40px",
            height: size?.height ?? "40px",
          }}
        ></div>
      );
}

export default Loader