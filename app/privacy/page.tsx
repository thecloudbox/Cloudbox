import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Privacy Policy | TheCloudbox",
  description: "TheCloudbox privacy policy and data protection practices",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2026</p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                TheCloudbox ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our infrastructure management
                and cloud services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Name, email address, phone number, and company information</li>
                <li>Account credentials and authentication information</li>
                <li>Payment and billing information</li>
                <li>Communications and support requests</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Infrastructure metrics, logs, and performance data</li>
                <li>IP addresses, browser types, and device information</li>
                <li>Usage patterns and service interaction data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to comments, questions, and customer service requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Protection & Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>End-to-end encryption for data in transit and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>24/7 security monitoring and incident response</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                Infrastructure logs and metrics are typically retained for 90 days unless longer retention is required
                for compliance or security purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability to another service provider</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party service providers to help us operate our business and deliver services. These
                providers have access to your information only to perform specific tasks on our behalf and are obligated
                to protect your information and not use it for other purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place for such transfers in accordance with applicable data protection
                laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services
                after such modifications constitutes acknowledgment and acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 rounded-lg border bg-card">
                <p className="font-mono text-terminal-green mb-2">privacy@thecloudbox.com</p>
                <p className="text-sm text-muted-foreground">
                  TheCloudbox Privacy Team
                  <br />
                  Response time: Within 48 hours
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
