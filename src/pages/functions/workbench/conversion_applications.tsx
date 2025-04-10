import { Iconify } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Skeleton } from "antd";

export function Conversion({ title, count, loading }: { title: string; count: number; loading: boolean }) {
	return (
		<Basic
			title={count.toString()}
			subtitle={title}
			iconify="tabler:user-filled"
			bg={themeVars.colors.palette.primary.default}
			strokeColor={themeVars.colors.palette.primary.light}
			loading={loading}
		/>
	);
}

export function Applications({ title, count, loading }: { title: string; count: number; loading: boolean }) {
	return (
		<Basic
			title={count.toString()}
			subtitle={title}
			iconify="ic:round-email"
			bg={themeVars.colors.palette.info.default}
			strokeColor={themeVars.colors.palette.info.light}
			loading={loading}
		/>
	);
}

export function CertificatesIssued({ title, count, loading }: { title: string; count: number; loading: boolean }) {
	return (
		<Basic
			title={count.toString()}
			subtitle={title}
			iconify="ic:round-verified"
			bg={themeVars.colors.palette.success.default}
			strokeColor={themeVars.colors.palette.success.light}
			loading={loading}
		/>
	);
}

type Props = {
	title: string;
	subtitle: string;
	iconify: string;
	bg?: string;
	strokeColor?: string;
	loading?: boolean;
};

function Basic({ title, subtitle, iconify, bg, strokeColor, loading }: Props) {
	return (
		<div
			className="relative flex items-center rounded-2xl p-6"
			style={{ background: bg, color: themeVars.colors.background.default }}
		>
			{loading ? (
				<div className="w-full">
					<Skeleton
						active
						title={false}
						paragraph={{ rows: 2, width: ["60%", "40%"] }}
					/>
				</div>
			) : (
				<>
					<div className="ml-2 flex flex-col">
						<span className="text-2xl font-bold">{title}</span>
						<span className="opacity-50">{subtitle}</span>
					</div>
					<div className="absolute right-0">
						<Iconify icon={iconify} style={{ opacity: 0.08 }} size={100} />
					</div>
				</>
			)}
		</div>
	);
}
