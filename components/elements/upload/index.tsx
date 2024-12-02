'use client';

import * as novel from '@novel/next/sdk';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload ({ children, options, onStart, onChange }) {
	const onDrop = useCallback(async (acceptedFiles) => {
		if (onStart) {
			await onStart();
		}
		const name = acceptedFiles[0].name; // key is required because of the extension
		const type = acceptedFiles[0].type;
		const response = await novel.rpc.FilesPresign({ operation: 'PUT', key: name, type });
		const { file: { presigned_url, asset_url } } = await response.json();
		const data = acceptedFiles[0];
		await fetch(presigned_url, {
			method: 'PUT',
			body: data,
			headers: {
				'content-type': type,
			},
		});
		if (onChange) {
			await onChange(asset_url);
		}
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop, ...options });

	return (
		<div {...getRootProps()}>
			{children}
			<input {...getInputProps()}/>
		</div>
	);
}
