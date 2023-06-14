import { type PropsWithChildren } from "react";

const IconContainer = (props: PropsWithChildren) => {
  return (
    <div className="flex h-[25px] w-[25px] items-center rounded bg-accent/30 object-cover p-1 md:h-[50px] md:w-[50px] md:justify-center">
      {props.children}
    </div>
  );
};

export default IconContainer;
