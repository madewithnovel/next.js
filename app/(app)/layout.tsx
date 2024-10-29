import './styles.css';

import Toaster from 'components/elements/toast';

export default function Layout ({ children }) {
	return (
		<>
			{children}
			<Toaster position="bottom-right" reverseOrder={false} gutter={8} toastOptions={{ duration: 10000 }}/>
		</>
	);
}
