// THIS FILE IS AUTO GENERATED. DO NOT MODIFY THIS FILE
import * as client from '@novel/next/request';

const operation = {
	url: '/files{*}',
	method: 'put',
	tags: [
		'Files',
	],
	operationId: 'putFilesUpload',
};

export default async function putFilesUploadRequest (param0: string, options = {}) {
	const wrapped = client.wrapper(operation, param0, options);

	return wrapped.run();
}
