
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, ChevronLeft, Upload, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    propertyType: z.string().min(1, "Please select a property type"),
    areaSize: z.string().min(1, "Please enter area size"),
    budget: z.string().min(1, "Please select a budget range"),
    location: z.string().min(1, "Please enter location"),
    timeline: z.string().min(1, "Please select a timeline"),
    style: z.string().min(1, "Please select a style preference"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const steps = [
    { id: "propertyType", title: "Property Type" },
    { id: "areaSize", title: "Area & Location" },
    { id: "budget", title: "Budget & Timeline" },
    { id: "details", title: "Contact Details" },
];

const LeadCaptureForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyType: "",
            areaSize: "",
            budget: "",
            location: "",
            timeline: "",
            style: "",
            name: "",
            email: "",
            phone: "",
        },
        mode: "onChange",
    });

    const { register, handleSubmit, watch, trigger, setValue, formState: { errors } } = form;
    const formData = watch();

    const nextStep = async () => {
        let fieldsToValidate: any[] = [];
        if (currentStep === 0) fieldsToValidate = ["propertyType", "style"];
        if (currentStep === 1) fieldsToValidate = ["areaSize", "location"];
        if (currentStep === 2) fieldsToValidate = ["budget", "timeline"];

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form Submitted:", data);
        toast({
            title: "Inquiry Received!",
            description: "Our design expert will contact you shortly.",
        });
        setIsSubmitting(false);
        // Reset or redirect logic here
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <section className="py-20 bg-white" id="inquiry-form">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Start Your Project Journey
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Tell us about your dream space, and we'll create a plan for you.
                    </p>
                </div>

                <Card className="mx-auto max-w-3xl shadow-xl border-gray-100">
                    <CardHeader>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-gray-500">Step {currentStep + 1} of {steps.length}</span>
                            <span className="text-sm font-medium text-primary">{steps[currentStep].title}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </CardHeader>
                    <CardContent className="p-6 sm:p-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <AnimatePresence mode="wait">
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <Label className="text-lg">What type of property is this?</Label>
                                            <RadioGroup
                                                onValueChange={(val) => setValue("propertyType", val)}
                                                defaultValue={formData.propertyType}
                                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                            >
                                                {["Apartment", "Villa / House", "Office", "Retail / Commercial"].map((type) => (
                                                    <div key={type}>
                                                        <RadioGroupItem value={type} id={type} className="peer sr-only" />
                                                        <Label
                                                            htmlFor={type}
                                                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                                                        >
                                                            {type}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType.message}</p>}
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-lg">Preferred Design Style</Label>
                                            <Select onValueChange={(val) => setValue("style", val)} defaultValue={formData.style}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a style" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="modern">Modern & Minimalist</SelectItem>
                                                    <SelectItem value="contemporary">Contemporary</SelectItem>
                                                    <SelectItem value="classic">Classic / Traditional</SelectItem>
                                                    <SelectItem value="industrial">Industrial</SelectItem>
                                                    <SelectItem value="bohemian">Bohemian</SelectItem>
                                                    <SelectItem value="unsure">I'm valid unsure</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.style && <p className="text-red-500 text-sm">{errors.style.message}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 1 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <Label className="text-lg">Carpet Area (Approx Sq Ft)</Label>
                                            <Input
                                                type="number"
                                                placeholder="e.g. 1200"
                                                {...register("areaSize")}
                                                className="h-12 text-lg"
                                            />
                                            {errors.areaSize && <p className="text-red-500 text-sm">{errors.areaSize.message}</p>}
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-lg">Project Location (City & Area)</Label>
                                            <Input
                                                placeholder="e.g. Bandra West, Mumbai"
                                                {...register("location")}
                                                className="h-12 text-lg"
                                            />
                                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <Label className="text-lg">Estimated Budget</Label>
                                            <Select onValueChange={(val) => setValue("budget", val)} defaultValue={formData.budget}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select budget range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="5-10L">₹5 Lakhs - ₹10 Lakhs</SelectItem>
                                                    <SelectItem value="10-20L">₹10 Lakhs - ₹20 Lakhs</SelectItem>
                                                    <SelectItem value="20-50L">₹20 Lakhs - ₹50 Lakhs</SelectItem>
                                                    <SelectItem value="50L+">₹50 Lakhs+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-lg">When do you want to start?</Label>
                                            <Select onValueChange={(val) => setValue("timeline", val)} defaultValue={formData.timeline}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select timeline" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="immediate">Immediately</SelectItem>
                                                    <SelectItem value="1-month">Within 1 month</SelectItem>
                                                    <SelectItem value="3-months">1-3 months</SelectItem>
                                                    <SelectItem value="later">Planning for later</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.timeline && <p className="text-red-500 text-sm">{errors.timeline.message}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <Label className="text-lg">Full Name</Label>
                                            <Input placeholder="Enter your full name" {...register("name")} className="h-12" />
                                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-lg">Email Address</Label>
                                            <Input placeholder="Enter your email" type="email" {...register("email")} className="h-12" />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-lg">Phone Number</Label>
                                            <Input placeholder="Enter your phone number" type="tel" {...register("phone")} className="h-12" />
                                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex justify-between mt-8 pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className={currentStep === 0 ? "invisible" : ""}
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                </Button>

                                {currentStep === steps.length - 1 ? (
                                    <Button type="submit" disabled={isSubmitting} size="lg" className="bg-primary hover:bg-primary/90">
                                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Inquiry"}
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={nextStep} size="lg">
                                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default LeadCaptureForm;
