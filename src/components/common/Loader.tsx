type LoaderProps = {
  size?: {
    width: string;
    height: string;
  },
  classes?: string,
  color?: string
}

const Loader = ({ size, classes, color }: LoaderProps) => {
  return (
    <div
      className={`${classes} border-4 border-gray-300 rounded-full animate-spin`}
      style={{
        width: size?.width ?? "40px",
        height: size?.height ?? "40px",
        borderTopColor: color ?? "black",
      }}
    ></div>
  );
}

export default Loader;