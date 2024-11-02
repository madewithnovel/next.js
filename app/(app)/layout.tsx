import './styles.css';

import Toaster from 'components/elements/toast';
import { BookOpen, Settings2, SquareTerminal } from 'lucide-react';

import Authenticated from './authenticated';
import WithSidebarLayout from './layouts/with-sidebar';

export default async function Layout ({ children }) {
	return (
		<>
			<Authenticated>
				<WithSidebarLayout>
					{ children }
				</WithSidebarLayout>
			</Authenticated>
			<Toaster position="bottom-right" reverseOrder={false} gutter={8} toastOptions={{ duration: 10000 }}/>
		</>
	);
}
