
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const materials = {
    wood: [
        { name: "Teak Wood", img: "https://images.unsplash.com/photo-1543013862-2313620f4f9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Oak Veneer", img: "https://images.unsplash.com/photo-1517549649033-66f81e6e9692?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Walnut Finish", img: "https://images.unsplash.com/photo-1610271171098-acbf7a3243d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    ],
    fabric: [
        { name: "Velvet", img: "https://images.unsplash.com/photo-1594042875152-3d779f6479f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Linen", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Leather", img: "https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    ],
    hardware: [
        { name: "Hettich", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Hafele", img: "https://images.unsplash.com/photo-1581105435940-d37eb6f76c52?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Blum", img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }
    ]
};

const MaterialsSelection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Premium Materials & Finishes
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We use only the best brands and materials for lasting quality.
                    </p>
                </div>

                <Tabs defaultValue="wood" className="w-full max-w-4xl mx-auto">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-full grid-cols-3 bg-white p-1 rounded-full shadow-sm">
                            <TabsTrigger value="wood" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Woods & Veneers</TabsTrigger>
                            <TabsTrigger value="fabric" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Fabrics & Upholstery</TabsTrigger>
                            <TabsTrigger value="hardware" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Hardware & Fittings</TabsTrigger>
                        </TabsList>
                    </div>

                    {Object.entries(materials).map(([key, items]) => (
                        <TabsContent key={key} value={key} className="mt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {items.map((item, index) => (
                                    <div key={index} className="group cursor-pointer">
                                        <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="mt-3 text-center font-medium text-gray-900">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};

export default MaterialsSelection;
