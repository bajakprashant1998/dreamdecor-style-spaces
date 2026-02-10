import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 md:py-24 bg-accent text-accent-foreground">
      <div className="container text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Stay in the Loop</h2>
        <p className="text-accent-foreground/70 mb-8 max-w-md mx-auto">
          Get exclusive deals, new arrivals & interior tips straight to your inbox.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEmail("");
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50 flex-1"
            required
          />
          <Button type="submit" className="gap-2">
            Subscribe <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
