'use client';

import Button from 'components/elements/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'components/ui/dialog';

export default function Deactivate () {
	return (
		<section className="section">
			<header>
				<h3 className="font-medium">Deactivate Account</h3>
				<p className="text-muted-foreground">Permanently delete this account. This action cannot be undone.</p>
			</header>
			<div className="flex items-center gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="destructive">Deactivate</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[520px]">
						<DialogHeader>
							<DialogTitle>Are you sure you want to deactivate this account?</DialogTitle>
							<DialogDescription>
								You are about to deactivate this account. All your private information and details will be deleted. This action cannot be undone.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline">Yes, Deactivate</Button>
							<DialogClose asChild>
								<Button>Cancel</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
