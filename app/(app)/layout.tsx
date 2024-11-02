import './styles.css';

import Toaster from 'components/elements/toast';

import Authenticated from './authenticated';

export default async function Layout ({ children }) {
	return (
		<Authenticated>
			{children}
			<Toaster position="bottom-right" reverseOrder={false} gutter={8} toastOptions={{ duration: 10000 }}/>
		</Authenticated>
	);
}
