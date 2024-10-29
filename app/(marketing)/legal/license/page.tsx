import Footer from '../../footer';
import Header from '../../header';

export default async function Page () {
	return (
		<>
			<Header/>
			<main className="flex flex-col gap-20 py-10">
				<div className="container flex flex-col gap-10 mx-auto px-5 md:px-20">
					<div>
						<h1 className="text-2xl md:text-6xl tracking-tight font-medium mb-5">License</h1>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						<div className="col-span-2 flex flex-col gap-8 text-lg">
							<p>
								This document outlines the terms under which the SaaS Boilerplate,
								developed using Node.js and Next.js and incorporating open source
								libraries, is licensed for use. This Boilerplate is designed to
								accelerate the development of SaaS projects by providing a foundational
								codebase. It is available under two licensing options to accommodate
								different scales of use.
							</p>

							<h2 className="text-xl">Single Project License Highlights</h2>
							<ul className="list-disc pl-5">
								<li>
									<strong>Limited Usage:</strong> Licensee is granted the right to use the Boilerplate
									for a single project under one Top-Level Domain (TLD).
								</li>
								<li>
									<strong>Non-Transferable:</strong> The license cannot be shared with other parties,
									nor can the project that utilizes the Boilerplate be transferred to another owner
									without explicit permission.
								</li>
								<li>
									<strong>No Redistribution:</strong> The Boilerplate, or any derivatives thereof,
									cannot be sold or redistributed in any form.
								</li>
							</ul>
							<h2 className="text-xl">Unlimited Projects License Highlights</h2>
							<ul className="list-disc pl-5">
								<li>
									<strong>Extended Usage:</strong> Licensee is granted the right to use the
									Boilerplate for an unlimited number of projects.
								</li>
								<li>
									<strong>Company Friendly:</strong> Specifically designed to cater to companies
									seeking to leverage the Boilerplate across multiple projects.
								</li>
								<li>
									<strong>No Redistribution:</strong> Similar to the Single Project License, the
									Boilerplate cannot be sold or redistributed.
								</li>
							</ul>
							<h2 className="text-xl">Sales and Tax Collection</h2>
							<p>
								Sales are processed automatically via Stripe, with applicable taxes collected
								at the point of sale based on the purchaser’s location. The price for each
								license type is clearly stated, with the higher price for the Unlimited
								Projects License reflecting its broader scope of use.
							</p>
							<h2 className="text-xl">Refunds and Chargebacks</h2>
							<p>
								Requests for refunds are considered on a case-by-case basis. Licensees
								must provide a valid reason for their request within a specified period from
								the date of purchase. In the event of a chargeback, the licensee’s rights to
								use the Boilerplate will be temporarily suspended pending investigation.
								Licensees are encouraged to contact support to resolve disputes before initiating a
								chargeback.
							</p>
							<h2 className="text-xl">Prohibited Uses</h2>
							<ul className="list-disc pl-5">
								<li>
									No Sharing or Reuse: Licensees are prohibited from sharing the Boilerplate with
									others,
									reusing it across multiple TLDs (under the Single Project License), or using it in a
									manner not explicitly authorized by this license.
								</li>
								<li>
									Anti-Resale Clause: The resale of the Boilerplate, either in its original form or
									any
									modified version, is strictly prohibited to ensure the integrity and value of the
									product for all users.
								</li>
							</ul>

							<p>
								By purchasing and using the SaaS Boilerplate under this license, you acknowledge and
								agree to
								these terms, ensuring that the Boilerplate remains a valuable resource for the
								development
								community while also respecting the efforts of its creators.
							</p>

							<p>
								If you have any questions or suggestions regarding this License, please contact us at
								license@madewithnovel.com.
							</p>

							<p className="text-lg text-zinc-400">Last updated at January 24, 2024</p>
						</div>
						<div className="relative">
							<div className="bg-zinc-100 rounded-2xl p-10 sticky top-48">
								<div className="font-semibold mb-3">Subscribe to updates</div>
								<div>
									See how this document has changed over time or subscribe to updates on{' '}
									<a href="#">GitHub →</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer/>
		</>
	);
}

/**
 * Remove this if you want to use SSG for this page.
 *
 * We are keeping this in the marketing pages to ensure that they are always static.
 */
export const dynamic = 'force-static';
