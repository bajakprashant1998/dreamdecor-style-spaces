import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Get in Touch</h1>
          <p className="text-muted-foreground mt-2">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="border rounded-lg p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Send us a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Name</Label><Input placeholder="Your name" className="mt-1" /></div>
                <div><Label>Phone</Label><Input placeholder="Phone number" className="mt-1" /></div>
              </div>
              <div><Label>Email</Label><Input type="email" placeholder="Your email" className="mt-1" /></div>
              <div><Label>Message</Label><Textarea placeholder="How can we help?" className="mt-1" rows={5} /></div>
              <Button type="submit" className="w-full rounded-none">Send Message</Button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Address", value: "Above Chandra Motors, Opp. Townhall, Jamnagar" },
                  { icon: Phone, label: "Phone", value: "0288 - 2661287 / 87582 99988" },
                  { icon: Mail, label: "Email", value: "dream_decor@rediffmail.com" },
                  { icon: Clock, label: "Hours", value: "Mon - Sat: 10:00 AM - 8:00 PM" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden border h-64">
              <iframe
                title="Dream Decor Furniture Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d70.0703!3d22.4707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI4JzE0LjUiTiA3MMKwMDQnMTMuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Cities */}
            <div>
              <h4 className="font-display font-semibold mb-2">Our Presence</h4>
              <div className="flex flex-wrap gap-2">
                {["Jamnagar", "Porbandar", "Bhavnagar", "Surat"].map((city) => (
                  <span key={city} className="px-3 py-1 text-sm border rounded-full bg-secondary">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
