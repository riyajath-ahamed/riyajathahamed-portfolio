import Noise from "@/components/magicui/Noise/Noise";
import React from "react";

// Example components to showcase
const Button = ({ children }: { children: React.ReactNode }) => (
    <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border rounded shadow p-4 mb-4">
        <h2 className="font-bold mb-2">{title}</h2>
        <div>{children}</div>
    </div>
);

export default function CraftLabShowcasePage() {
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Craft LAB</h1>
            <Noise
                patternSize={250}
                patternScaleX={1}
                patternScaleY={1}
                patternRefreshInterval={2}
                patternAlpha={15}
            />
            
        </main>
    );
}