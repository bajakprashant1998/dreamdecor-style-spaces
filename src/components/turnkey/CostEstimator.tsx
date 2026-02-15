
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PROPERTY_TYPES = [
    { value: "apartment", label: "Apartment", baseRate: 1500 },
    { value: "villa", label: "Villa / Independent House", baseRate: 1800 },
    { value: "office", label: "Office Space", baseRate: 2000 },
];

const LOCATIONS = [
    { value: "mumbai", label: "Mumbai", factor: 1.2 },
    { value: "delhi", label: "Delhi NCR", factor: 1.0 },
    { value: "bangalore", label: "Bangalore", factor: 1.1 },
    { value: "pune", label: "Pune", factor: 0.95 },
    { value: "hyderabad", label: "Hyderabad", factor: 0.9 },
];

const DESIGN_LEVELS = [
    { value: "standard", label: "Standard (Essential)", multiplier: 1 },
    { value: "premium", label: "Premium (High-End)", multiplier: 1.5 },
    { value: "luxury", label: "Luxury (Bespoke)", multiplier: 2.2 },
];

const CostEstimator = () => {
    const [area, setArea] = useState([1000]);
    const [propertyType, setPropertyType] = useState("apartment");
    const [location, setLocation] = useState("mumbai");
    const [designLevel, setDesignLevel] = useState("premium");
    const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

    useEffect(() => {
        const type = PROPERTY_TYPES.find((t) => t.value === propertyType) || PROPERTY_TYPES[0];
        const loc = LOCATIONS.find((l) => l.value === location) || LOCATIONS[0];
        const level = DESIGN_LEVELS.find((l) => l.value === designLevel) || DESIGN_LEVELS[1];

        const baseCost = area[0] * type.baseRate * loc.factor * level.multiplier;
        // Add +/- 15% range
        setEstimatedCost({
            min: Math.round(baseCost * 0.85),
            max: Math.round(baseCost * 1.15),
        });
    }, [area, propertyType, location, designLevel]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumSignificantDigits: 3,
        }).format(amount);
    };

    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Smart Project Cost Estimator
                        </h2>
                        <p className="mt-4 text-lg text-gray-300">
                            Get an instant approximate budget for your dream project. Adjust the parameters to see how they affect the overall cost.
                        </p>
                        <ul className="mt-8 space-y-4 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">1</span>
                                <span>Transparent pricing with no hidden costs</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">2</span>
                                <span>Real-time market rate adjustments</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">3</span>
                                <span>Detailed breakdown provided upon consultation</span>
                            </li>
                        </ul>
                    </div>

                    <Card className="border-gray-800 bg-gray-950 text-white">
                        <CardHeader>
                            <CardTitle>Calculate Your Budget</CardTitle>
                            <CardDescription className="text-gray-400">
                                Enter your property details below
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Property Type</Label>
                                <Select value={propertyType} onValueChange={setPropertyType}>
                                    <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                        {PROPERTY_TYPES.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label>Area Size (Sq. Ft)</Label>
                                    <span className="text-primary font-bold">{area[0]} sq ft</span>
                                </div>
                                <Slider
                                    value={area}
                                    onValueChange={setArea}
                                    max={5000}
                                    min={500}
                                    step={50}
                                    className="py-4"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Select value={location} onValueChange={setLocation}>
                                        <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                            {LOCATIONS.map((loc) => (
                                                <SelectItem key={loc.value} value={loc.value}>
                                                    {loc.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Design Level</Label>
                                    <Select value={designLevel} onValueChange={setDesignLevel}>
                                        <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                            {DESIGN_LEVELS.map((level) => (
                                                <SelectItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 border-t border-gray-800 pt-6">
                            <div className="w-full">
                                <p className="text-center text-sm text-gray-400">Estimated Cost Range</p>
                                <p className="text-center text-3xl font-bold text-primary mt-1">
                                    {formatCurrency(estimatedCost.min)} - {formatCurrency(estimatedCost.max)}
                                </p>
                            </div>
                            <Button className="w-full" size="lg">
                                Get Detailed Quote
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default CostEstimator;
