/**
 * WARNING
 *
 * This file is used to consolidate various constants and
 * configuration in the application.
 *
 * Anything you add here will be included in the bundle and
 * exposed to the public.
 *
 * DO NOT ADD SENSITIVE INFORMATION HERE.
 */
export const HOST = process.env.NEXT_PUBLIC_HOST;

export const NOVEL = JSON.parse(process.env.NEXT_PUBLIC_NOVEL_CONFIG);
