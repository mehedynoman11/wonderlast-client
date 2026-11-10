import { Empty } from "@/components/ui/empty";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <Empty className="w-64 h-64 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-48 mx-auto mb-4 fill-current text-gray-400"
          viewBox="0 0 24 24"
        >
          <path d="M19 14c1.49 0 2.76-1.23 2.73-2.77H15.5a2.7 2.7 0 0 0-1.75 2.55.7.7 0 0 1-.58.3 1.2 1.2 0 0 1-.83-.18 2.5 2.5 0 0 1-2.42-2.15C6.29 11.39 4. 9.66 4 7.74 4 4.48 5.66 2 8 2c1.9 0 3.58.8 4.7 2.14.66.76.8 1.5.8 2.32 0 1.54-.7 2.46-1.7 2.86a.7.7 0 0 1-.59.3 1.2 1.2 0 0 1-.83.02 2.5 2.5 0 0 1-2.43-2.15.7.7 0 0 0-1.75 2.55 2.7 2.7 0 0 0 1.76 2.28h2.77c.01-1.54.86-2.6 2.4-2.77m-11.4-5L.6 3.5A2.3 2.3 0 0 0 .4 7c0 3.6 2.6 6.5 5.9 6.6a12.26 12.26 0 0 0 2.8 0 2.3 2.3 0 0 0 .4-1.1c3.5-0.1 5.9-3 5.9-6.6a2.3 2.3 0 0 0-.4-1.2L11.4 9.6" />
        </svg>
      </Empty>

      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">404</h1>

      <p className="text-lg text-gray-500 mb-6">Page not found</p>

      <div className="flex gap-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Home
        </a>
        <a
          href="/destination"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          View Destinations
        </a>
      </div>
    </section>
  );
}
