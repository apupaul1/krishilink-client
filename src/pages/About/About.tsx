import {
  ArrowRight,
  Handshake,
  Leaf,
  ShieldCheck,
  ShoppingBasket,
  Truck,
  Users,
} from "lucide-react";
import { Link } from "react-router";

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-emerald-50 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              About KrishiLink
            </span>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Connecting Farmers,
              <span className="text-emerald-600">
                {" "}
                Delivering Freshness.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              KrishiLink connects farmers directly with customers,
              helping fresh agricultural products reach the people
              who need them through a simple and reliable delivery
              network.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-white p-3 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200"
                alt="Farmland"
                className="h-100 w-full rounded-2xl object-cover md:h-125"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Our Story
            </p>

            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Making the connection between farm and home simpler.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Traditional agricultural supply chains often create
              unnecessary distance between farmers and customers.
              KrishiLink is designed to shorten that distance by
              creating a direct marketplace where farmers can list
              their products and customers can purchase them easily.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Once an order is placed, the products are prepared by
              the farmer and picked up by a rider for delivery to the
              customer.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Leaf className="text-emerald-600" size={28} />
                <h3 className="mt-4 font-semibold text-slate-900">
                  Fresh Products
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Products come directly from local farmers.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Handshake className="text-emerald-600" size={28} />
                <h3 className="mt-4 font-semibold text-slate-900">
                  Direct Connection
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Farmers and customers connect through one platform.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Truck className="text-emerald-600" size={28} />
                <h3 className="mt-4 font-semibold text-slate-900">
                  Reliable Delivery
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Riders handle pickup and delivery from farm to home.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <ShieldCheck className="text-emerald-600" size={28} />
                <h3 className="mt-4 font-semibold text-slate-900">
                  Simple Process
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  A straightforward experience for everyone involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              One platform, three simple steps
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: ShoppingBasket,
                title: "Choose Products",
                description:
                  "Customers browse products and place an order from local farmers.",
              },
              {
                number: "02",
                icon: Users,
                title: "Farmer Prepares",
                description:
                  "The farmer receives the order, prepares the products and marks them ready for pickup.",
              },
              {
                number: "03",
                icon: Truck,
                title: "Rider Delivers",
                description:
                  "An available rider picks up the products and delivers them to the customer.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl bg-white p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-600">
                      {step.number}
                    </span>

                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why KrishiLink */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Why KrishiLink
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Built around the needs of farmers and customers.
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                We want agricultural commerce to feel less complicated.
                Farmers get a place to showcase their products,
                customers get access to local produce, and riders get
                a structured delivery workflow.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Direct access to local agricultural products",
                "A simple selling experience for farmers",
                "Transparent order and delivery tracking",
                "A structured pickup and delivery process",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
                >
                  <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                    <ShieldCheck size={18} />
                  </div>

                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-600 px-6 py-14 text-center md:px-12">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Be part of the KrishiLink community.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
            Whether you are a farmer, customer, or rider, KrishiLink
            gives you a simple way to be part of a better agricultural
            marketplace.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Start Exploring
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;