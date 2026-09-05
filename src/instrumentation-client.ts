import posthog from 'posthog-js'

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST!;

if (token) {
    posthog.init(token, {
        api_host: host,
        defaults: '2026-05-30',
        capture_pageview: true,
        capture_pageleave: true,
    })
}
