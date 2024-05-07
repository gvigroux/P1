import { title } from "@/components/primitives";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";


export default function PricingPage() {
	return (
		<div>
			<div>
				<h1 className={title()} >Pricing</h1>
			</div>
			<div>
				<Card isBlurred
					className="border-2 border-zinc-900 max-w-[610px]"
					shadow="sm">
				<CardHeader className="flex gap-3 border-zinc-900">
					<Image
					alt="nextui logo"
					height={40}
					radius="sm"
					src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
					width={40}
					/>
					<div className="flex flex-col">
					<p className="text-md">NextUI</p>
					<p className="text-small text-default-500">nextui.org</p>
					</div>
				</CardHeader>
				<CardBody>
					<p>The essentials to provide your best work for clients.				</p>
				</CardBody>
				<CardFooter>
					<Button >Buy</Button>
				</CardFooter>
				</Card>
			</div>
		</div>




	);
}
