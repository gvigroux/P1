'use client'
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import React from "react";

export default function CustomNavbar({children}: {children: React.ReactNode}) {	
    
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
    return (<Navbar onMenuOpenChange={setIsMenuOpen}>
			
        <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
        />
    
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
                {children}
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

    )

}