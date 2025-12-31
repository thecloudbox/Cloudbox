import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"

export function BlogCTA() {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Ready to Transform Your Infrastructure?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let TheCloudbox help you implement these best practices. Our team of experts has delivered solutions for
            Paytm, Gojek, IRCTC, and more. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" asChild className="group">
              <Link href="/contact">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                <Mail className="mr-2 h-4 w-4" />
                View Our Services
              </Link>
            </Button>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contact@thecloudbox.com</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
