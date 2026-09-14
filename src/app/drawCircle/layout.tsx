import React, { ReactNode } from "react";

interface GameLayoutProps {
    children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
    return (
        <div>
            <main >
                {children}
            </main>
        </div>
    );
}