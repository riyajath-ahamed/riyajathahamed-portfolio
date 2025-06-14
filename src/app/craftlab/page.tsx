import Noise from "@/components/magicui/Noise/Noise";
import React from "react";

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
            <div>
                <h1 className="text-3xl"> Work on Progress</h1>
            </div>
            
        </main>
    );
}