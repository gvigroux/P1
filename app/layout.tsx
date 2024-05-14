import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { getAuthSession } from "./lib/auth";
import React from "react";
import SessionProvider from "./lib/SessionProvider";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import ModalLogin from "./ui/components/modalLogin";
import { FormCreateUser } from "./ui/components/FormCreateUser";
import ModalRegister from "./ui/components/ModalRegister";
import { createUserFromAction } from "./action/login";
import UserInNavbar from "./ui/components/UserInNavbar";


export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
	const session = await getAuthSession();
	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"Help & Feedback",
		"Log Out",
	  ];
	  
	return (
	  <html lang="en" className='dark'>
		<body>
        	<SessionProvider session={session}>
				
			<Navbar>			
				<NavbarMenuToggle aria-label="Menu" className="sm:hidden" />
				<NavbarBrand>
					<p className="font-bold text-inherit">ACME</p>
				</NavbarBrand>
				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem>
					<Link color="foreground" href="#">
						Features
					</Link>
					</NavbarItem>
					<NavbarItem isActive>
					<Link href="#" aria-current="page">
						Customers
					</Link>
					</NavbarItem>
					<NavbarItem>
					<Link color="foreground" href="#">
						Integrations
					</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent justify="end">
					<NavbarItem>
						{session && (
							<UserInNavbar name={session.user?.name!} img={session.user?.image || "https://raw.githubusercontent.com/gvigroux/P1/main/public/images/avatar.png"} />
						) }
						{!session && (
							<>
							<ModalLogin createUserFromAction={createUserFromAction}/>
							<ModalRegister>
								<></>
							</ModalRegister>
							</>
						)}
		
					</NavbarItem>
				</NavbarContent>					
				<NavbarMenu>
					{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
						color={
							index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
						}
						className="w-full"
						href="#"
						size="lg"
						>
						{item}
						</Link>
					</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>			
			<Providers>
				{children}
			</Providers>
		</SessionProvider>
	</body>
	</html>
	);
  }

  /*
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center py-3">
							<Link
								isExternal
								className="flex items-center gap-1 text-current"
								href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
								title="nextui.org homepage"
							>
								<span className="text-default-600">Powered by</span>
								<p className="text-primary">NextUI</p>
							</Link>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
*/