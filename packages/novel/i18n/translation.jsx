import { Client } from './client';
import store from 'novel/store';

export function useTranslation() {
	// how to make this work in server and client
	const messages = store.get('i18n')?.messages;
	console.log(2, messages);
	return (message, interpolators = {}) => {
		return messages?.[message] || message;
	}
}

export function I18nProvider({ children, manifest }) {
	store.set('i18n', manifest)
	return <>
		<Client data={manifest}/>
		{children}
	</>
}