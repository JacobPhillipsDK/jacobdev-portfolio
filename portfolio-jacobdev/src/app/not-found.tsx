import Link from 'next/link';
import Cursor from '@/components/cursor/cursor';

import '../components/glitch.css';


export default function NotFound() {
    return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="w-full space-y-6 text-center">
                <div className="space-y-3">
                    <h2 className="hero glitch layers" data-text="404 ERROR"><span>404 ERROR</span></h2>
                    <p className="text-3xl text-gray-500">Looks like you&apos;ve ventured into the unknown digital realm.</p>
                </div>
                <Link
                    href="/"
                    className="inline-flex h-12 items-center rounded-md bg-gray-900 px-10 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                >
                    Return to website
                </Link>
            </div>
            <Cursor />
        </div>
    );
}
