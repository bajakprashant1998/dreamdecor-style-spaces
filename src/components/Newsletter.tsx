import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-10 md:py-24 bg-accent text-accent-foreground">
      <div className="container text-center px-6">
        <h2 className="font-display text-2xl md:text-4xl font-bold mb-2 md:mb-3">Stay in the Loop</h2>
        <p className="text-accent-foreground/70 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
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
            className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50 flex-1 h-11 md:h-10 text-sm"
            required
          />
          <Button type="submit" className="gap-2 h-11 md:h-10 px-6">
            Subscribe <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
