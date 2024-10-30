import { LibraryBigIcon } from 'lucide-react';

import Form from './form';

export default async function Page () {
	return (
		<div className="w-1/2 min-h-screen mx-auto flex flex-col justify-center">
			<div className="flex flex-col justify-center mx-auto gap-5 p-10" style={{ minWidth: 300, maxWidth: 500 }}>
				<LibraryBigIcon size={42}/>
				<Form/>
			</div>
		</div>
	);
}
