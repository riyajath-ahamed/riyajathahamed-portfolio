import React, { ReactNode } from "react";

interface CraftLabLayoutProps {
    children: ReactNode;
}

export default function CraftLabLayout({ children }: CraftLabLayoutProps) {
    return (
        <div>
            <main >
                {children}
            </main>
        </div>
    );
}