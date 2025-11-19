import Beams from "@/components/magicui/Beams/Beams";
import React, { ReactNode } from "react";

interface BlogLayoutProps {
    children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    return (
        <div>
            <main >
                {children}
            </main>
            
        </div>
    );
}