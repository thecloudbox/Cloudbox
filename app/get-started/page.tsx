"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { services } from "@/lib/services-data"
import { CheckCircle2 } from "lucide-react"

export default function GetStartedPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Started with TheCloudbox</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tell us about your infrastructure needs and we'll create a custom solution tailored to your business.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="space-y-12">
              {/* Step 1: Company Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      1
                    </div>
                    <CardTitle>Company Information</CardTitle>
                  </div>
                  <CardDescription>Tell us about your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" placeholder="Acme Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://acme.com" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input id="industry" placeholder="E-commerce, Healthcare, etc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Input id="companySize" placeholder="e.g., 50-200 employees" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Service Selection */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      2
                    </div>
                    <CardTitle>Select Services</CardTitle>
                  </div>
                  <CardDescription>Choose the services you're interested in (select multiple)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => {
                      const Icon = service.icon
                      const isSelected = selectedServices.includes(service.id)
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                            isSelected ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                          }`}
                        >
                          <Checkbox checked={isSelected} onCheckedChange={() => toggleService(service.id)} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="h-4 w-4 text-primary" />
                              <span className="font-semibold text-sm">{service.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {selectedServices.length > 0 && (
                    <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm font-medium mb-2">Selected Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((id) => {
                          const service = services.find((s) => s.id === id)
                          return (
                            <Badge key={id} variant="secondary">
                              {service?.title}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Step 3: Contact Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      3
                    </div>
                    <CardTitle>Your Contact Information</CardTitle>
                  </div>
                  <CardDescription>How should we reach you?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@acme.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input id="role" placeholder="e.g., CTO, VP Engineering, DevOps Lead" />
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex flex-col items-center gap-6">
                <Button size="lg" className="w-full md:w-auto">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Submit Request
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  We'll review your request and get back to you within 24 hours to schedule a consultation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
