'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface DownloadButtonProps {
    danishFileUrl?: string;
    englishFileUrl?: string;
    className?: string;
    buttonText?: string;
}

export default function DownloadButton({
                                           danishFileUrl = '/CV-Danish.pdf',
                                           englishFileUrl = '/CV-English.pdf',
                                           className = '',
                                           buttonText = 'View Resume'
                                       }: DownloadButtonProps) {
    const [fileUrl, setFileUrl] = useState<string>(englishFileUrl)

    useEffect(() => {
        const checkGeolocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                console.log('Geolocation response:', response)
                const data = await response.json()
                setFileUrl(data.country_code === 'DK' ? danishFileUrl : englishFileUrl)
            } catch (error) {
                console.error('Failed to fetch geolocation:', error)
                // Default to English if geolocation fails
                setFileUrl(englishFileUrl)
            }
        }

        checkGeolocation()
    }, [danishFileUrl, englishFileUrl])

    const downloadFile = () => {
        window.open(fileUrl, '_blank')
    }

    return (
        <Button
            onClick={downloadFile}
            variant="outline"
            className={className}
        >
            {buttonText}
        </Button>
    )
}