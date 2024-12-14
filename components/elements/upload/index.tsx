'use client';

import putFilesPresignRequest from 'app/api/requests/putFilesPresign';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload ({ children, options, onStart, onChange }) {
	const onDrop = useCallback(async (acceptedFiles) => {
		if (onStart) {
			await onStart();
		}
		const name = acceptedFiles[0].name; // key is required because of the extension
		const type = acceptedFiles[0].type;
		const response = await putFilesPresignRequest({ key: name, type });
		const { file: { presigned_url, asset_url } } = await response.json();
		const form = new FormData();
		form.set('file', acceptedFiles[0]);
		await fetch(presigned_url, {
			method: 'PUT',
			body: form,
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
