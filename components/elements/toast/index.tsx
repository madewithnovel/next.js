'use client';

import { Transition } from '@headlessui/react';
import cx from 'clsx';
import { AlertTriangleIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const dismiss = () => toast.dismiss();

export const ok = (message, title = null, options = null) => notify('ok', message, title, options);

export const warn = (message, title = null, options = null) => notify('warn', message, title, options);

export const error = (message, title = null, options = null) => notify('error', message, title, options);

export const notify = (type, message, title = null, options = null) => toast.custom((t) => {
	if (type && !title && !message) { // allow shorthand
		message = type;
	}

	return (
		<Transition
			show={t.visible}
			as={Fragment}
			enter="transform ease-out duration-300 transition"
			enterFrom="translate-y-2 opacity-0 md:translate-y-0 md:translate-x-2"
			enterTo="translate-y-0 opacity-100 md:translate-x-0"
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div
				className={`${
					t.visible ? 'animate-enter' : 'animate-leave'
				} pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
			>
				<div className="p-4">
					<div className="flex items-start">
						{type && (
							<div className="flex-shrink-0 mt-1">
								{type === 'ok' && (
									<CheckCircle2Icon className="text-green-600" />
								)}
								{type === 'warn' && (
									<AlertTriangleIcon className="text-amber-500" />
								)}
								{type === 'error' && (
									<XCircleIcon className="text-red-600" />
								)}
							</div>
						)}
						<div className={cx('w-0 flex-1 pt-0.5 flex flex-col gap-1', { 'ml-3': !!type })}>
							{title && <p className="font-medium text-gray-900">{title}</p>}
							<div className="text-gray-500 flex flex-col gap-3">
								{Array.isArray(message) ? message.map((m, i) => (<p key={i}>{m}</p>)) : message}
							</div>
						</div>
						<div className="ml-4 flex flex-shrink-0">
							<button
								type="button"
								className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								onClick={() => toast.dismiss(t.id)}
							>
								<span className="sr-only">Close</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	);
}, options);

export default Toaster;
