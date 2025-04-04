import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ThemeLayout } from "#/enum";
import { HEADER_HEIGHT } from "../config";
import logo from "@/assets/images/logo.png";
import { useSelector } from "react-redux";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function NavLogo({ collapsed, onToggle }: Props) {
  const { themeLayout } = useSettings();
const stateUser=useSelector((state:any)=>state.user);
  return (
    <div
      style={{ height: `${HEADER_HEIGHT}px` }}
      className="flex items-center justify-between pl-4 py-4"
    >
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
			<img
  src={logo}
  alt="Logo"
  className={cn(
    "rounded-full transition-all duration-300", // Smooth transition for size change
    collapsed ? "w-6 h-6" : "w-10 h-10" // Smaller size when collapsed
  )}
/>
{themeLayout !== ThemeLayout.Mini && (
  <div className="flex flex-col items-start">
    {/* Column layout for RA Admin and username */}
    <span className="text-xl font-bold text-primary">RA Admin</span>
    <p className="text-sm ">{stateUser?.username}</p>
  </div>
)}
      </div>

      {/* Collapsible Icon */}
      <div
        onClick={onToggle}
        onKeyDown={onToggle}
				style={{ backgroundColor: "gray", color: "white" }}
        className={cn(
          "flex items-center justify-center rounded-full cursor-pointer select-none",
          "bg-black text-white", // Black background, white icon
          "md:flex", // Show on medium screens and above
					collapsed ? "w-4 h-4" : "w-6 h-6" 
         // Margin auto for centering (if needed in parent context)
        )}
      >
        {collapsed ? (
          <RightOutlined className="text-sm " />
        ) : (
          <LeftOutlined className="text-sm" />
        )}
      </div>
    </div>
  );
}