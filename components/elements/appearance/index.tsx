'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useState } from 'react';

// can be taken from user settings
export default function AppearanceToggle ({ selectedTheme }) {
	if (!selectedTheme) {
		// selectedTheme = (typeof window !== 'undefined' && window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
	}
	const [theme, setTheme] = useState(selectedTheme);

	function changeTheme () {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.remove(theme);
		document.documentElement.classList.add(newTheme);
		setTheme(newTheme);
		// TODO: propagate to user settings
	}

	return (
		<div className="p-2" onClick={() => changeTheme()}>
			{theme === 'light' ? <SunIcon /> : <MoonIcon />}
		</div>
	);
}
