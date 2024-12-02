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

export const NOVEL = process.env.NEXT_PUBLIC_NOVEL_CONFIG ? JSON.parse(process.env.NEXT_PUBLIC_NOVEL_CONFIG) : {};

export const LOCALES = process.env.NEXT_PUBLIC_LOCALES ? JSON.parse(process.env.NEXT_PUBLIC_LOCALES) : [];

export const ANALYTICS = process.env.NEXT_PUBLIC_ANALYTICS ? JSON.parse(process.env.NEXT_PUBLIC_ANALYTICS) : {};
