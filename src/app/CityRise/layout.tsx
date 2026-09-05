import React, { ReactNode } from "react";

interface CityRiseLayoutProps {
    children: ReactNode;
}

export default function CityRiseLayout({ children }: CityRiseLayoutProps) {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    );
}