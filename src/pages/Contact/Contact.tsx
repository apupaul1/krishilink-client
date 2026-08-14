import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Button, Form, Input, message } from "antd";

const Contact = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    console.log(values);

    message.success(
      "Your message has been submitted successfully.",
    );

    form.resetFields();
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-emerald-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Contact KrishiLink
          </span>

          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            We'd love to
            <span className="text-emerald-600"> hear from you.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Have a question about an order, selling products, becoming a
            rider, or using KrishiLink? Send us a message and we'll get
            back to you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                Get in touch
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                We're here to help.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Reach out to us through any of the channels below. For
                order-related questions, keep your tracking ID nearby.
              </p>
            </div>

            {/* Email */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Mail size={21} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Email
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  support@krishilink.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Phone size={21} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Phone
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  +880 1XXX-XXXXXX
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MapPin size={21} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Office
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Support Hours */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Clock3 size={21} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Support Hours
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Saturday – Thursday
                  <br />
                  9:00 AM – 8:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageCircle size={21} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Send us a message
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Fill out the form and we'll get back to you.
                    </p>
                  </div>
                </div>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Your name"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="you@example.com"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Subject"
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a subject",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="How can we help?"
                  />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={7}
                    placeholder="Write your message here..."
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<Send size={17} />}
                  className="mt-2"
                >
                  Send Message
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-emerald-600 px-6 py-12 text-center md:px-12">
            <h2 className="text-3xl font-bold text-white">
              Need help with an order?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
              Keep your tracking ID ready when contacting support so
              we can help you faster.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;