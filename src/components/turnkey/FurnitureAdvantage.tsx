
import React from "react";
import { Check, X } from "lucide-react";

const FeatureRow = ({ feature, us, others }: { feature: string; us: boolean | string; others: boolean | string }) => (
    <div className="grid grid-cols-3 border-b py-4 text-sm sm:text-base last:border-0 hover:bg-gray-50 transition-colors">
        <div className="font-medium text-gray-700 flex items-center">{feature}</div>
        <div className="text-center font-semibold text-gray-900 flex items-center justify-center bg-primary/5 rounded-lg mx-2">
            {typeof us === "boolean" ? (
                us ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />
            ) : (
                <span>{us}</span>
            )}
        </div>
        <div className="text-center text-gray-500 flex items-center justify-center">
            {typeof others === "boolean" ? (
                others ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-400" />
            ) : (
                <span>{others}</span>
            )}
        </div>
    </div>
);

const FurnitureAdvantage = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        The Manufacturing Advantage
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Why direct-from-factory furniture makes a difference
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Factory machine"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <h3 className="text-2xl font-bold mb-2">In-House Precision Factory</h3>
                                <p className="text-gray-200">German machinery ensuring 100% mm-perfect finishes.</p>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-2xl p-6 sm:p-8 bg-white shadow-lg">
                        <div className="grid grid-cols-3 mb-6 pb-4 border-b">
                            <div className="font-bold text-gray-400 uppercase text-xs tracking-wider">Feature</div>
                            <div className="text-center font-bold text-primary uppercase text-xs tracking-wider">DreamDecor</div>
                            <div className="text-center font-bold text-gray-400 uppercase text-xs tracking-wider">Traditional Contractors</div>
                        </div>

                        <FeatureRow feature="Manufacturing" us="In-House Factory" others="Outsourced" />
                        <FeatureRow feature="Cost Saving" us="Factory Direct (Save 30%)" others="Middlemen Markup" />
                        <FeatureRow feature="Customization" us="100% Fully Custom" others="Limited Standard Sizes" />
                        <FeatureRow feature="Delivery Time" us="25-30 Days" others="45-60 Days" />
                        <FeatureRow feature="Quality Control" us="Machine Precision" others="Manual / Carpenter" />
                        <FeatureRow feature="Warranty" us="10 Years" others="1-2 Years / None" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FurnitureAdvantage;
