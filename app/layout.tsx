import './globals.css';

export const metadata = {
	title: 'Novel',
	description: 'Modern SaaS Starter Kit',
};

export default async function RootLayout ({ children, params }) {
	return (
		<html lang={params.locale} suppressHydrationWarning>
			<body className="w-full min-h-screen flex flex-col relative">
				{children}
			</body>
		</html>
	);
}
