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
            The Dream Decor Advantage
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Complete in-house production unit — the only manufacturer & retailer under one roof
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Dream Decor Factory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">In-House Manufacturing Unit</h3>
                <p className="text-gray-200">Working with leather, cloth, wood, steel, fiber & innovative materials.</p>
              </div>
            </div>
          </div>

          <div className="border rounded-2xl p-6 sm:p-8 bg-white shadow-lg">
            <div className="grid grid-cols-3 mb-6 pb-4 border-b">
              <div className="font-bold text-gray-400 uppercase text-xs tracking-wider">Feature</div>
              <div className="text-center font-bold text-primary uppercase text-xs tracking-wider">Dream Decor</div>
              <div className="text-center font-bold text-gray-400 uppercase text-xs tracking-wider">Others</div>
            </div>

            <FeatureRow feature="Manufacturing" us="In-House Factory" others="Outsourced" />
            <FeatureRow feature="Cost Saving" us="Save 30%" others="Middlemen Markup" />
            <FeatureRow feature="Time Saving" us="Save 60% Time" others="Delays Common" />
            <FeatureRow feature="Customization" us="100% Custom" others="Limited Sizes" />
            <FeatureRow feature="Move-In Ready" us="45-55 Days" others="90+ Days" />
            <FeatureRow feature="Quality Checks" us="146 Checks" others="Minimal" />
            <FeatureRow feature="Warranty" us="10 Years" others="1-2 Years" />
            <FeatureRow feature="European Standard" us={true} others={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureAdvantage;
