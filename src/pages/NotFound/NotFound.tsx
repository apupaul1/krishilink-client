import { Button } from "antd";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { Link, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <SearchX size={44} strokeWidth={1.8} />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
          404 Error
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-900 md:text-7xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-500 md:text-lg">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved, deleted, or the URL might be incorrect.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            size="large"
            icon={<ArrowLeft size={18} />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Link to="/">
            <Button type="primary" size="large" icon={<Home size={18} />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
