import './style.css';

import cx from 'classnames';
import { Input as ShadcnInput } from 'components/ui/input';

export default function Input ({ className, ...props }) {
	return (
		<ShadcnInput {...props} className={cx(className, 'input')} />
	);
}
