"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, integrate with email service
    console.log("Newsletter subscription:", email)
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <Card className="border-2">
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">Stay Updated with DevOps Insights</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter for weekly updates on AIOps, cloud migrations, and infrastructure best practices.
        </p>
        {subscribed ? (
          <div className="text-sea-green font-semibold">Thanks for subscribing! Check your email.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
