import { Divider, type MenuProps } from "antd";
import Dropdown, { type DropdownProps } from "antd/es/dropdown/dropdown";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router";

import { IconButton } from "@/components/icon";
import { useLoginStateContext } from "@/pages/sys/login/providers/LoginStateProvider";
import { useRouter } from "@/router/hooks";
import { useUserActions, useUserInfo } from "@/store/userStore";
import { useTheme } from "@/theme/hooks";
import { clearUserToken } from "@/api/state/userStore";
import { useDispatch, useSelector } from "react-redux";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
	const { replace } = useRouter();
	const { username, email, avatar } = useUserInfo();

	const { t } = useTranslation();
	const navigator = useNavigate();
	const dispatch=useDispatch();
	const logout = () => {

		try {
			dispatch(clearUserToken()); // Dispatch the clearUserToken action to clear Redux state and localStorage
			// setAnchorEl(null); // Close the menu
		navigator("/login"); 
		} catch (error) {
			console.log(error);
		} finally {
			replace("/login");
		}
	};
	const {
		themeVars: { colors, borderRadius, shadows },
	} = useTheme();

	const contentStyle: React.CSSProperties = {
		backgroundColor: colors.background.default,
		borderRadius: borderRadius.lg,
		boxShadow: shadows.dropdown,
	};

	const menuStyle: React.CSSProperties = {
		boxShadow: "none",
	};
const userState=useSelector((state:any)=>state.user);
	const dropdownRender: DropdownProps["dropdownRender"] = (menu) => (
		<div style={contentStyle}>
			<div className="flex flex-col items-start p-4">
			
				<div className="text-gray">{userState?.username}</div>
			</div>
			<Divider style={{ margin: 0 }} />
			{React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
		</div>
	);

	const items: MenuProps["items"] = [
		{
			label: (
				<NavLink to="/" >
					{t("sys.docs")}
				</NavLink>
			),
			key: "0",
		},
		// {
		// 	label: <NavLink to={HOMEPAGE}>{t("sys.menu.dashboard")}</NavLink>,
		// 	key: "1",
		// },
		// {
		// 	label: <NavLink to="/management/user/profile">{t("sys.menu.user.profile")}</NavLink>,
		// 	key: "2",
		// },

		{ type: "divider" },
		{
			label: (
				<button className="font-bold text-warning" type="button">
					{t("sys.login.logout")}
				</button>
			),
			key: "4",
			onClick: logout,
		},
	];

	return (
<Dropdown menu={{ items }} trigger={["click"]} dropdownRender={dropdownRender}>
  <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105 relative">
    {/* Parent container with relative positioning */}
    <div className="relative h-8 w-8 bg-primary border-1 border-spacing-1 border-info-dark rounded-full">
      {/* Image */}
      <img
        className="h-8 w-8 rounded-full"
        src={avatar}
        alt=""
      />
      {/* Centered Text */}
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
        A
      </span>
    </div>
  </IconButton>
</Dropdown>

	);
}
