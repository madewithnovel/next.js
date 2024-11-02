import './style.css';

import cx from 'clsx';
import { Input as ShadcnInput } from 'components/ui/input';

export default function Input (props) {
	const { className, ...rest } = props;
	return (
		<ShadcnInput {...rest} className={cx(className, 'input')} />
	);
}
