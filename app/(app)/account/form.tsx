'use client';

import LanguageSection from './components/language';
import NameSection from './components/name';
import NotificationSection from './components/notifications';
import PictureSection from './components/picture';
import ThemeSection from './components/theme';
import TimezoneSection from './components/timezone';
import WebsiteSection from './components/website';

export default function Form ({ profile, settings }) {
	return (
		<div className="flex flex-col gap-10">
			<NameSection profile={profile} />
			<PictureSection profile={profile} />
			<WebsiteSection profile={profile} />
			<ThemeSection settings={settings} />
			<TimezoneSection settings={settings} />
			<LanguageSection settings={settings} />
			<hr/>
			<NotificationSection settings={settings} />
		</div>
	);
}
