import { Role } from '$remult/roles';

export const ROUTES = {
	home: '/',
	profile: { root: '/profile', settings: '/profile/settings' },
	admin: { root: '/admin' },
	auth: {
		signin: '/auth/signin',
		signup: '/auth/signup',
		signout: '/auth/signout',
		forgotPassword: '/auth/forgot-password'
	}
};

export const REDIRECTS = {
	[ROUTES.auth.signin]: ['/signin', '/signin', '/auth/signin'],
	[ROUTES.auth.signup]: ['/signup', '/signup', '/auth/signup'],
	[ROUTES.home]: ['/home', '/index']
};

export const REQUIRED_ROLES = {
	[ROUTES.admin.root]: [Role.Admin],
	'/test': [Role.Admin]
};

export const getRedirect = (pathname: string) => {
	for (const [redirectTo, urls] of Object.entries(REDIRECTS))
		if (urls.includes(pathname)) return redirectTo;
};

export const isAccessibleBy = (roles: string[] | undefined, pathname: string) => {
	for (const [rolePathname, requiredRoles] of Object.entries(REQUIRED_ROLES)) {
		if (pathname.startsWith(rolePathname)) {
			return !!requiredRoles.find((role) => roles?.includes(role));
		}
	}

	return true;
};
