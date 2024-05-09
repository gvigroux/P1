import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
//import { Navbar } from "@/components/navbar";
//import { Link } from "@nextui-org/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ModalLogin from "./ui/components/modalLogin";


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

export default function RootLayout({children}: { children: React.ReactNode }) {
	return (
	  <html lang="en" className='dark'>
		<body>
			
		<Navbar>
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
				<NavbarItem className="hidden lg:flex">
					<Link href="/signIn">Login</Link>
		  			<ModalLogin></ModalLogin>
				</NavbarItem>
				<NavbarItem>
				<Button as={Link} color="primary" href="#" variant="flat">
					Sign Up
				</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
		  <Providers>
			{children}
		  </Providers>
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