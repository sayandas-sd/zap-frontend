import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (

    <div className="px-2 py-2 pointer" onClick={onClick}>
      {children}
    </div>
    
  );
}
