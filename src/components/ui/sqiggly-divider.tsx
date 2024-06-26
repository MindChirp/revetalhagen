import Image from "next/image";
interface SquigglyDividerProps {}

const SquigglyDivider = ({ ...props }: SquigglyDividerProps) => {
  return (
    <Image
      alt="Bølge"
      className="h-auto w-52"
      src="/wave4.svg"
      width={100}
      height={100}
    />
  );
};

export default SquigglyDivider;
