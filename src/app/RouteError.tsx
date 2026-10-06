import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

/** Last-resort boundary; deliberately free of i18n so it renders even if translations fail. */
export function RouteError() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-ivory px-4 text-center text-navy">
      <p className="label text-gold">70 LANGUAGES · {status}</p>
      <p className="font-display text-4xl">Something went quiet.</p>
      <Link to="/" className="text-sm underline decoration-gold underline-offset-4">
        Return to the beginning
      </Link>
    </div>
  );
}
