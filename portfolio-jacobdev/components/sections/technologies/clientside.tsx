'use client'

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Tab {
    id: string
    label: string
}

interface ClientSideSelectProps {
    tabs: Tab[]
    activeTab: string
    setActiveTab: (tabId: string) => void
}

export default function ClientSideSelect({ tabs, activeTab, setActiveTab }: ClientSideSelectProps) {
    return (
        <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full mb-4">
                <SelectValue>
                    {tabs.find(tab => tab.id === activeTab)?.label}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {tabs.map((tab) => (
                    <SelectItem key={tab.id} value={tab.id}>
                        {tab.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
