'use client';

import { AbilityBuilder, PureAbility } from '@casl/ability';
import store from 'novel/store';

export default function useAuthorized () {
	const session = store.get('session');
	const ability = new AbilityBuilder(PureAbility);
	session.permissions.forEach(([type, action, subject, fields]) => {
		if (type === 'can') {
			ability.can(action, subject, fields);
		} else {
			ability.cannot(action, subject, fields);
		}
	});
	// allow update of current user
	ability.can('update', session.user.id);
	ability.can('write', session.user.id);
	return {
		...ability.build(),
		role: session.role,
		subscribed: session.subscribed,
	};
}
