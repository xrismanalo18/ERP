"use client";

import { useRef } from "react";
import { iconValue, imageValue, textValue } from "@/lib/templates/content";
import { TemplateIcon } from "@/lib/templates/icons";
import { Reveal, Stagger } from "@/lib/templates/motion";
import type { TemplateContent } from "@/lib/templates/types";
const __BAKED_CONTENT = {
  "pillars.1.icon": {
    type: "icon",
    value: "lucide:heart-pulse"
  },
  "pillars.2.icon": {
    type: "icon",
    value: "lucide:landmark"
  },
  "pillars.3.icon": {
    type: "icon",
    value: "lucide:university"
  },
  "pillars.4.icon": {
    type: "icon",
    value: "lucide:zap"
  },
  "ui.icon.arrowRight": {
    type: "icon",
    value: "lucide:arrow-right"
  },
  "ui.icon.chevronLeft": {
    type: "icon",
    value: "lucide:chevron-left"
  },
  "ui.icon.chevronRight": {
    type: "icon",
    value: "lucide:chevron-right"
  },
  "ui.icon.info": {
    type: "icon",
    value: "lucide:info"
  },
  "brand.name": {
    type: "text",
    value: "AI Deal Review"
  },
  "nav.link.1": {
    type: "text",
    value: "CRM Integration"
  },
  "nav.link.2": {
    type: "text",
    value: "AI Insights"
  },
  "nav.link.3": {
    type: "text",
    value: "Slack Alerts"
  },
  "nav.link.4": {
    type: "text",
    value: "Sample Review"
  },
  "nav.link.5": {
    type: "text",
    value: "Analytics"
  },
  "nav.signin": {
    type: "text",
    value: "Sign In"
  },
  "nav.cta": {
    type: "text",
    value: "Request Demo"
  },
  "hero.kicker": {
    type: "text",
    value: "AI Deal Review Agent · CRM Sales Intelligence"
  },
  "hero.title.pre": {
    type: "text",
    value: "Automated deal reviews for sales &"
  },
  "hero.title.em": {
    type: "text",
    value: "revenue operations"
  },
  "hero.title.post": {
    type: "text",
    value: "teams."
  },
  "hero.subtitle": {
    type: "text",
    value: "Turn CRM records, ticketing history, contracts, and sales conversations into real-time deal intelligence directly inside your CRM UI."
  },
  "hero.video": {
    type: "video",
    value: "https://videos.pexels.com/video-files/36328573/15406867_1280_720_25fps.mp4",
    poster: "https://images.pexels.com/videos/36328573/analysis-analytics-bars-chart-36328573.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
  },
  "hero.cta.primary": {
    type: "text",
    value: "View Deal Review Dashboard"
  },
  "hero.cta.secondary": {
    type: "text",
    value: "See Salesforce Integration Demo"
  },
  "pillars.kicker": {
    type: "text",
    value: "Automated sales intelligence"
  },
  "pillars.1": {
    type: "text",
    value: "Unified customer health insights delivered directly inside your Salesforce CRM"
  },
  "pillars.2": {
    type: "text",
    value: "Automated churn risk alerts and upsell opportunities mined from customer logs"
  },
  "pillars.3": {
    type: "text",
    value: "Deep analysis of contract terms, support tickets, and Slack conversations"
  },
  "pillars.4": {
    type: "text",
    value: "Actionable next best steps and instant manager review workflows"
  },
  "pillars.cta.primary": {
    type: "text",
    value: "View Deal Review Dashboard"
  },
  "pillars.cta.secondary": {
    type: "text",
    value: "See Salesforce Integration Demo"
  },
  "stat.headline": {
    type: "text",
    value: "85% reduction in manual account review time — giving sales teams instant visibility into churn risks and upgrade opportunities."
  },
  "stat.tooltip": {
    type: "text",
    value: "Based on comparative time-motion studies of sales organizations managing 10,000+ accounts."
  },
  "stat.cta": {
    type: "text",
    value: "View Deal Review Dashboard"
  },
  "testi.1.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXwwfHx8MTc4MDgyNDg1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Portrait of a confident female sales executive"
  },
  "testi.1.quote": {
    type: "text",
    value: "\"Our sales reps used to spend hours digging through Salesforce, Zendesk, and contracts. Now, the AI surfaces churn risks and upsell opportunities instantly inside our CRM.\""
  },
  "testi.1.name": {
    type: "text",
    value: "Sarah Jenkins · VP of Sales, CloudScale Solutions"
  },
  "testi.2.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8MHx8fDE3ODA5MTY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Portrait of a male corporate operations director"
  },
  "testi.2.quote": {
    type: "text",
    value: "\"With 10,000 customers, we were missing critical contract renewal dates. This agent flags contract gaps and alerts our team directly in Slack before it's too late.\""
  },
  "testi.2.name": {
    type: "text",
    value: "David Vance · Director of Revenue Operations, FinTech Global"
  },
  "testi.3.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8MHx8fDE3ODA4NDM4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Portrait of a smiling female customer success leader"
  },
  "testi.3.quote": {
    type: "text",
    value: "\"The qualification score and recommended follow-up messages have completely transformed our account reviews. Our average deal review time dropped from days to minutes.\""
  },
  "testi.3.name": {
    type: "text",
    value: "Elena Rostova · Head of Customer Success, MedTech Systems"
  },
  "testi.4.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1676989880361-091e12efc056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMHJlcHJlc2VudGF0aXZlJTIwcG9ydHJhaXR8ZW58MXwwfHx8MTc4MDkxNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Portrait of a male enterprise account executive"
  },
  "testi.4.quote": {
    type: "text",
    value: "\"I love that I don't have to leave Salesforce to see ticket history or communication logs. The AI-driven insights are right there on the opportunity page.\""
  },
  "testi.4.name": {
    type: "text",
    value: "Marcus Brody · Senior Account Executive, Enterprise SaaS"
  },
  "testi.5.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXwwfHx8MTc4MDczMjA2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Portrait of a professional female executive"
  },
  "testi.5.quote": {
    type: "text",
    value: "\"The Slack integration is a game-changer. Our managers get instant alerts for high-risk accounts and can approve next steps with a single click.\""
  },
  "testi.5.name": {
    type: "text",
    value: "Anya Patel · VP of Customer Experience, Logistics Pro"
  },
  "join.video": {
    type: "video",
    value: "https://videos.pexels.com/video-files/3246669/3246669-hd_1280_720_25fps.mp4",
    poster: "https://images.pexels.com/videos/3246669/free-video-3246669.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
  },
  "join.title": {
    type: "text",
    value: "Join the modern sales organizations transforming CRM data into real-time deal intelligence."
  },
  "join.cta": {
    type: "text",
    value: "See Salesforce Integration Demo"
  },
  "feature.clinic.title": {
    type: "text",
    value: "Surface real-time deal intelligence directly inside your <em>Salesforce CRM</em>."
  },
  "feature.clinic.body": {
    type: "text",
    value: "The AI Deal Review Agent automatically mines your ticketing history, sales logs, and customer contracts to calculate churn risk and upsell opportunities. Sales representatives get instant, actionable insights without ever leaving their primary workspace."
  },
  "feature.clinic.cta": {
    type: "text",
    value: "See Salesforce Integration Demo"
  },
  "feature.clinic.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxjcm0lMjBkYXNoYm9hcmQlMjBsYXB0b3B8ZW58MXwwfHx8MTc4MDkxNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A modern CRM dashboard displayed on a laptop screen with sales metrics"
  },
  "feature.science.title": {
    type: "text",
    value: "Turn scattered customer contracts and ticketing logs into <em>real-time deal intelligence</em>."
  },
  "feature.science.body": {
    type: "text",
    value: "Our AI engine automatically mines your contract repositories, support tickets, and sales logs to surface critical churn risks and upsell opportunities directly inside Salesforce."
  },
  "feature.science.cta": {
    type: "text",
    value: "Explore the CRM integration"
  },
  "feature.science.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwaW50ZWdyYXRpb24lMjBjb25jZXB0fGVufDF8MHx8fDE3ODA5MTY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Abstract visualization of digital data integration and artificial intelligence processing"
  },
  "feature.safety.title": {
    type: "text",
    value: "Flag critical contract gaps and churn risks directly inside your CRM."
  },
  "feature.safety.body": {
    type: "text",
    value: "The AI Deal Review Agent automatically monitors customer contract data, ticketing history, and sales logs to surface hidden risks and missing information before they impact your pipeline."
  },
  "feature.safety.cta": {
    type: "text",
    value: "See Risk Detection Demo"
  },
  "feature.safety.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxyaXNrJTIwYXNzZXNzbWVudCUyMGRhc2hib2FyZHxlbnwxfDB8fHwxNzgwOTE2NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A professional reviewing digital contracts and risk indicators on a computer monitor"
  },
  "pricing.kicker": {
    type: "text",
    value: "Flexible Plans"
  },
  "pricing.title": {
    type: "text",
    value: "Scale your sales intelligence."
  },
  "pricing.body": {
    type: "text",
    value: "Choose the right tier to connect your CRM, ticketing systems, and communication channels with real-time AI insights."
  },
  "pricing.1.tier": {
    type: "text",
    value: "Growth"
  },
  "pricing.1.name": {
    type: "text",
    value: "Team Edition"
  },
  "pricing.1.price": {
    type: "text",
    value: "$1,200"
  },
  "pricing.1.per": {
    type: "text",
    value: "/ month"
  },
  "pricing.1.desc": {
    type: "text",
    value: "Perfect for growing sales teams looking to automate deal reviews and basic CRM intelligence."
  },
  "pricing.1.feature1": {
    type: "text",
    value: "Up to 1,000 active customers"
  },
  "pricing.1.feature2": {
    type: "text",
    value: "Salesforce & Slack integration"
  },
  "pricing.1.feature3": {
    type: "text",
    value: "Automated churn risk alerts"
  },
  "pricing.1.feature4": {
    type: "text",
    value: "Standard AI output dashboard"
  },
  "pricing.1.cta": {
    type: "text",
    value: "Start Team Trial"
  },
  "pricing.2.tier": {
    type: "text",
    value: "Most chosen"
  },
  "pricing.2.name": {
    type: "text",
    value: "Enterprise Scale"
  },
  "pricing.2.price": {
    type: "text",
    value: "$3,500"
  },
  "pricing.2.per": {
    type: "text",
    value: "/ month"
  },
  "pricing.2.desc": {
    type: "text",
    value: "Designed for large sales organizations managing up to 10,000 customers with complex workflows."
  },
  "pricing.2.feature1": {
    type: "text",
    value: "Up to 10,000 active customers"
  },
  "pricing.2.feature2": {
    type: "text",
    value: "Full CRM & ticketing integration"
  },
  "pricing.2.feature3": {
    type: "text",
    value: "Custom AI qualification scoring"
  },
  "pricing.2.feature4": {
    type: "text",
    value: "Manager review queue & workflows"
  },
  "pricing.2.cta": {
    type: "text",
    value: "Request Enterprise Demo"
  },
  "pricing.3.tier": {
    type: "text",
    value: "Custom"
  },
  "pricing.3.name": {
    type: "text",
    value: "Platform Unlimited"
  },
  "pricing.3.price": {
    type: "text",
    value: "Custom"
  },
  "pricing.3.per": {
    type: "text",
    value: "/ flat"
  },
  "pricing.3.desc": {
    type: "text",
    value: "For global revenue operations requiring dedicated AI models, custom integrations, and unlimited scale."
  },
  "pricing.3.feature1": {
    type: "text",
    value: "Unlimited active customers"
  },
  "pricing.3.feature2": {
    type: "text",
    value: "Dedicated AI model training"
  },
  "pricing.3.feature3": {
    type: "text",
    value: "Custom communication channels"
  },
  "pricing.3.feature4": {
    type: "text",
    value: "24/7 RevOps support & SLAs"
  },
  "pricing.3.cta": {
    type: "text",
    value: "Contact Sales"
  },
  "booking.kicker": {
    type: "text",
    value: "Schedule a Demo"
  },
  "booking.title": {
    type: "text",
    value: "Connect your CRM and see real-time deal intelligence in action."
  },
  "booking.body": {
    type: "text",
    value: "Set up a 15-minute technical walkthrough. We will show you how the AI Deal Review Agent connects to Salesforce, Slack, and your contract database."
  },
  "booking.step.1.title": {
    type: "text",
    value: "Choose a convenient time"
  },
  "booking.step.1.body": {
    type: "text",
    value: "Select a slot for a live integration walkthrough with our solutions team."
  },
  "booking.step.2.title": {
    type: "text",
    value: "Specify your CRM setup"
  },
  "booking.step.2.body": {
    type: "text",
    value: "Let us know if you use Salesforce, HubSpot, or custom APIs so we can tailor the demo."
  },
  "booking.step.3.title": {
    type: "text",
    value: "See live deal insights"
  },
  "booking.step.3.body": {
    type: "text",
    value: "We'll run a sample contract and ticket log through the agent to show you instant scores."
  },
  "booking.card.title": {
    type: "text",
    value: "Book a Live Demo"
  },
  "booking.card.body": {
    type: "text",
    value: "No obligation. See how to automate reviews for up to 10,000 customers."
  },
  "booking.card.cta": {
    type: "text",
    value: "Confirm Demo Booking"
  },
  "booking.form.firstname.label": {
    type: "text",
    value: "First name"
  },
  "booking.form.firstname.placeholder": {
    type: "text",
    value: "Sarah"
  },
  "booking.form.lastname.label": {
    type: "text",
    value: "Last name"
  },
  "booking.form.lastname.placeholder": {
    type: "text",
    value: "Chen"
  },
  "booking.form.email.label": {
    type: "text",
    value: "Work email"
  },
  "booking.form.email.placeholder": {
    type: "text",
    value: "sarah@enterprise.com"
  },
  "booking.form.practice.label": {
    type: "text",
    value: "What is your primary CRM?"
  },
  "booking.form.practice.option1": {
    type: "text",
    value: "Salesforce Cloud"
  },
  "booking.form.practice.option2": {
    type: "text",
    value: "HubSpot CRM"
  },
  "booking.form.practice.option3": {
    type: "text",
    value: "Microsoft Dynamics"
  },
  "booking.form.practice.option4": {
    type: "text",
    value: "Custom / In-house CRM"
  },
  "booking.form.practice.option5": {
    type: "text",
    value: "Multiple systems"
  },
  "booking.form.practice.option6": {
    type: "text",
    value: "Other / None"
  },
  "booking.form.slot.label": {
    type: "text",
    value: "Select a 15-min demo slot"
  },
  "booking.form.slot.1": {
    type: "text",
    value: "9:00 AM"
  },
  "booking.form.slot.2": {
    type: "text",
    value: "10:00 AM"
  },
  "booking.form.slot.3": {
    type: "text",
    value: "11:30 AM"
  },
  "booking.form.slot.4": {
    type: "text",
    value: "1:30 PM"
  },
  "booking.form.slot.5": {
    type: "text",
    value: "2:30 PM"
  },
  "booking.form.slot.6": {
    type: "text",
    value: "3:30 PM"
  },
  "booking.form.slot.7": {
    type: "text",
    value: "4:00 PM"
  },
  "booking.form.slot.8": {
    type: "text",
    value: "4:30 PM"
  },
  "booking.form.note.label": {
    type: "text",
    value: "What is your biggest deal review bottleneck? (Optional)"
  },
  "booking.form.note.placeholder": {
    type: "text",
    value: "Reps spend too much time checking support tickets and contract renewal dates manually..."
  },
  "press.label": {
    type: "text",
    value: "As featured in leading enterprise tech and sales publications"
  },
  "press.logo.1": {
    type: "text",
    value: "Salesforce Ben"
  },
  "press.logo.2": {
    type: "text",
    value: "CRM Magazine"
  },
  "press.logo.3": {
    type: "text",
    value: "VentureBeat"
  },
  "press.logo.4": {
    type: "text",
    value: "Sales Hacker"
  },
  "press.logo.5": {
    type: "text",
    value: "SaaS Enterprise Review"
  },
  "articles.1.cat": {
    type: "text",
    value: "Operations"
  },
  "articles.1.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1713947503867-3b27964f042b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHx0aXJlZCUyMHNhbGVzJTIwcmVwcmVzZW50YXRpdmV8ZW58MXwwfHx8MTc4MDkxNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "An overwhelmed sales representative working at a desk with multiple screens"
  },
  "articles.1.title": {
    type: "text",
    value: "Why manual customer record reviews cost sales teams 15 hours per rep every week"
  },
  "articles.2.cat": {
    type: "text",
    value: "Compliance"
  },
  "articles.2.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjB0aWNrZXRzJTIwZGFzaGJvYXJkfGVufDF8MHx8fDE3ODA5MTY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A customer support dashboard showing unresolved tickets and contract statuses"
  },
  "articles.2.title": {
    type: "text",
    value: "Detecting contract gaps and unresolved support tickets before they trigger churn"
  },
  "articles.3.cat": {
    type: "text",
    value: "Growth"
  },
  "articles.3.image": {
    type: "image",
    value: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGdyb3d0aCUyMGNoYXJ0fGVufDF8MHx8fDE3ODA5MTY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A sales team discussing growth opportunities in front of a modern presentation screen"
  },
  "articles.3.title": {
    type: "text",
    value: "How to automatically surface upsell and upgrade opportunities directly inside Salesforce"
  },
  "closer.title": {
    type: "text",
    value: "Equip your sales team with automated *deal intelligence* directly inside Salesforce."
  },
  "closer.cta": {
    type: "text",
    value: "View Deal Review Dashboard"
  },
  "footer.tagline": {
    type: "text",
    value: "Real-time deal intelligence for CRM, ticketing, contracts, and sales conversations."
  },
  "footer.col1.title": {
    type: "text",
    value: "Integrations"
  },
  "footer.col1.link1": {
    type: "text",
    value: "Salesforce CRM"
  },
  "footer.col1.link2": {
    type: "text",
    value: "Slack Channels"
  },
  "footer.col1.link3": {
    type: "text",
    value: "Ticketing Logs"
  },
  "footer.col1.link4": {
    type: "text",
    value: "Contract Repositories"
  },
  "footer.col2.title": {
    type: "text",
    value: "Platform"
  },
  "footer.col2.link1": {
    type: "text",
    value: "Deal Review Dashboard"
  },
  "footer.col2.link2": {
    type: "text",
    value: "AI Input Panel"
  },
  "footer.col2.link3": {
    type: "text",
    value: "Analytics & Metrics"
  },
  "footer.col2.link4": {
    type: "text",
    value: "Security & Compliance"
  },
  "footer.col3.title": {
    type: "text",
    value: "Resources"
  },
  "footer.col3.link1": {
    type: "text",
    value: "Sales Intelligence Blog"
  },
  "footer.col3.link2": {
    type: "text",
    value: "Customer Case Studies"
  },
  "footer.col3.link3": {
    type: "text",
    value: "API Documentation"
  },
  "footer.col3.link4": {
    type: "text",
    value: "Contact Support"
  },
  "footer.news.title": {
    type: "text",
    value: "Stay Ahead of Churn"
  },
  "footer.news.body": {
    type: "text",
    value: "Get weekly sales intelligence insights and deal-review frameworks directly to your inbox."
  },
  "footer.news.placeholder": {
    type: "text",
    value: "you@company.com"
  },
  "footer.news.cta": {
    type: "text",
    value: "Subscribe"
  },
  "footer.copyright": {
    type: "text",
    value: "© 2026 AI Deal Review Agent. All rights reserved."
  },
  "footer.legal.terms": {
    type: "text",
    value: "Terms of Service"
  },
  "footer.legal.privacy": {
    type: "text",
    value: "Privacy Policy"
  },
  "footer.legal.notice": {
    type: "text",
    value: "Data Security Notice"
  },
  "footer.disclaimer": {
    type: "text",
    value: "AI Deal Review Agent is a sales intelligence platform. Our automated insights, risk indicators, and recommendations are designed to assist sales operations and management. Actual deal outcomes, contract compliance, and customer retention strategies remain the sole responsibility of the user organization."
  }
} as any;
function __baked_text(key) {
  const e = __BAKED_CONTENT[key];
  return e && e.type === "text" ? e.value : `[missing: ${key}]`;
}
function __baked_image(key) {
  const e = __BAKED_CONTENT[key];
  return e && e.type === "image" ? {
    src: e.value,
    alt: e.alt
  } : {
    src: "",
    alt: `[missing: ${key}]`
  };
}
function __baked_icon(key) {
  const e = __BAKED_CONTENT[key];
  return e && e.type === "icon" ? e.value : "lucide:circle-help";
}
type Props = {
  content: TemplateContent;
};
const fallbackStep = 320;
export function TestimonialRail({
  content
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const t = (key: string) => __baked_text(key);
  const img = (key: string) => __baked_image(key);
  const iconFor = (key: string) => iconValue(content, key);
  const scrollRail = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".testimonial");
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "");
    const step = card ? card.offsetWidth + (Number.isFinite(gap) ? gap : 18) : fallbackStep;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };
  return <section className="rail" data-screen-label="04 Testimonials" id="stories">
      <div className="rail-head">
        <button type="button" className="rail-arrow" aria-label="Previous" aria-controls="brightway-testimonial-rail" onClick={() => scrollRail(-1)}>
          <TemplateIcon icon={"lucide:chevron-left"} size={18} strokeWidth={2.1} />
        </button>
        <button type="button" className="rail-arrow" aria-label="Next" aria-controls="brightway-testimonial-rail" onClick={() => scrollRail(1)}>
          <TemplateIcon icon={"lucide:chevron-right"} size={18} strokeWidth={2.1} />
        </button>
      </div>
      <div id="brightway-testimonial-rail" className="rail-track" ref={trackRef}>
        <Stagger step={110}>
          {[1, 2, 3, 4, 5].map(n => {
          const portrait = img(`testi.${n}.image`);
          return <Reveal as="article" key={n} className={`testimonial t${n}`} variant="fade-scale" scale="0.92">
                <div className="t-photo">
                  <img src={portrait.src} alt={portrait.alt} loading="lazy" decoding="async" />
                </div>
                <p className="t-quote">{t(`testi.${n}.quote`)}</p>
                <div className="t-name">
                  <span className="t-dot" />
                  {t(`testi.${n}.name`)}
                </div>
              </Reveal>;
        })}
        </Stagger>
      </div>
    </section>;
}