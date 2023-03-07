import { Suspense, ReactNode } from 'react';
import Components from 'components/index';

export const Lazy = (children: ReactNode): ReactNode => (
	<Suspense fallback={<Components.LoadingSpinner />}>{children}</Suspense>
);
export const lazyLoad = (moduleName: string): any => {
	const modules: any = import.meta.glob('src/views/*/**/*.tsx');
  console.log(modules,'---modules--lazyLoad')
	return lazy(modules[/* @vite-ignore */ `/src/views/${moduleName}.tsx`]);
};
