import Beams from "@/components/magicui/Beams/Beams";
import React, { ReactNode } from "react";

interface BookMarkLayoutProps {
    children: ReactNode;
}

export default function BookmarkLayout({ children }: BookMarkLayoutProps) {
    return (
        <div>
            <main >
                {children}
            </main>
            
        </div>
    );
}