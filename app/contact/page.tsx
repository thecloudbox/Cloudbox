"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Ready to transform your infrastructure? Let's discuss how we can help you achieve your goals.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@company.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Acme Inc." />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interest</Label>
                        <Select>
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="devops">DevOps Engineering</SelectItem>
                            <SelectItem value="managed">Managed Services</SelectItem>
                            <SelectItem value="migration">Cloud Migration</SelectItem>
                            <SelectItem value="datacenter">Data Center Migration</SelectItem>
                            <SelectItem value="cost">Cost Optimization</SelectItem>
                            <SelectItem value="noc">NOC as a Service</SelectItem>
                            <SelectItem value="iac">Infrastructure as Code</SelectItem>
                            <SelectItem value="databases">Managed Databases</SelectItem>
                            <SelectItem value="aiops">AIOps Implementation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your infrastructure needs and challenges..."
                          rows={6}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:hello@infraops.com" className="text-primary hover:underline">
                      hello@infraops.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">For general inquiries</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:support@infraops.com" className="text-primary hover:underline">
                      support@infraops.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">24/7 technical support</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+18885551234" className="text-primary hover:underline">
                      +1 (888) 555-1234
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9AM-6PM EST</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Headquarters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      123 Cloud Street
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Support */}
        <section className="py-12 bg-destructive/10 border-y border-destructive/20">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Urgent Support?</h3>
            <p className="text-muted-foreground mb-4">
              For production emergencies, contact our 24/7 NOC immediately at{" "}
              <a href="tel:+18885559999" className="text-destructive font-semibold hover:underline">
                +1 (888) 555-9999
              </a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
