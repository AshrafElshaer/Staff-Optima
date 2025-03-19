export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = process.env.NODE_ENV === "production";
export const WEB_APP_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export * from "./PERMISSIONS";
