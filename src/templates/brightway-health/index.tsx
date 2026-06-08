import { textValue, iconValue, imageValue, videoValue } from "@/lib/templates/content";
import { motionTokenPresets, Reveal, Stagger, Ticker } from "@/lib/templates/motion";
import { TemplateIcon } from "@/lib/templates/icons";
import { themeStyle } from "@/lib/templates/theme";
import type { TemplateComponentProps, TemplateDefinition, TemplateIconSet } from "@/lib/templates/types";
import styles from "./brightway-health.module.css";
import { Navigation } from "./components/navigation";
import { TestimonialRail } from "./components/testimonial-rail";
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
const icon = (label: string, value: `lucide:${string}`) => ({
  type: "icon",
  label,
  value
}) as const;
const image = (label: string, value: string, alt: string) => ({
  type: "image",
  label,
  value,
  alt
}) as const;
const brightwayHealthDefaultIconSet = {
  id: "brightway-health-lucide-outline",
  label: "Brightway Health outline icons",
  family: "lucide",
  style: "outline",
  source: "local",
  icons: {
    "pillars.1.icon": icon("Patient outcomes pillar icon", "lucide:heart-pulse"),
    "pillars.2.icon": icon("Compliance pillar icon", "lucide:landmark"),
    "pillars.3.icon": icon("Clinical advisors pillar icon", "lucide:university"),
    "pillars.4.icon": icon("Hands-on delivery pillar icon", "lucide:zap"),
    "ui.icon.arrowRight": icon("Text link arrow icon", "lucide:arrow-right"),
    "ui.icon.chevronLeft": icon("Previous rail icon", "lucide:chevron-left"),
    "ui.icon.chevronRight": icon("Next rail icon", "lucide:chevron-right"),
    "ui.icon.info": icon("Info tooltip icon", "lucide:info")
  }
} satisfies TemplateIconSet;
const pressLogos = [{
  key: "press.logo.1",
  modifier: ""
}, {
  key: "press.logo.2",
  modifier: "bold"
}, {
  key: "press.logo.3",
  modifier: "condensed"
}, {
  key: "press.logo.4",
  modifier: ""
}, {
  key: "press.logo.5",
  modifier: "bold"
}] as const;
function BrightwayHealthTemplate({
  content,
  theme
}: TemplateComponentProps) {
  const t = (key: string) => __baked_text(key);
  const img = (key: string) => imageValue(content, key);
  const iconFor = (key: string) => iconValue(content, key);
  const heroVideo = {
    src: "https://videos.pexels.com/video-files/36328573/15406867_1280_720_25fps.mp4",
    poster: "https://images.pexels.com/videos/36328573/analysis-analytics-bars-chart-36328573.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
  };
  const joinVideo = {
    src: "https://videos.pexels.com/video-files/3246669/3246669-hd_1280_720_25fps.mp4",
    poster: "https://images.pexels.com/videos/3246669/free-video-3246669.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
  };
  const clinicImage = {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxjcm0lMjBkYXNoYm9hcmQlMjBsYXB0b3B8ZW58MXwwfHx8MTc4MDkxNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A modern CRM dashboard displayed on a laptop screen with sales metrics"
  };
  const scienceImage = {
    src: "https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwaW50ZWdyYXRpb24lMjBjb25jZXB0fGVufDF8MHx8fDE3ODA5MTY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Abstract visualization of digital data integration and artificial intelligence processing"
  };
  const safetyImage = {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxyaXNrJTIwYXNzZXNzbWVudCUyMGRhc2hib2FyZHxlbnwxfDB8fHwxNzgwOTE2NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A professional reviewing digital contracts and risk indicators on a computer monitor"
  };
  const articleImages = [{
    src: "https://images.unsplash.com/photo-1713947503867-3b27964f042b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHx0aXJlZCUyMHNhbGVzJTIwcmVwcmVzZW50YXRpdmV8ZW58MXwwfHx8MTc4MDkxNjU5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "An overwhelmed sales representative working at a desk with multiple screens"
  }, {
    src: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjB0aWNrZXRzJTIwZGFzaGJvYXJkfGVufDF8MHx8fDE3ODA5MTY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A customer support dashboard showing unresolved tickets and contract statuses"
  }, {
    src: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MDU3MTJ8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGdyb3d0aCUyMGNoYXJ0fGVufDF8MHx8fDE3ODA5MTY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "A sales team discussing growth opportunities in front of a modern presentation screen"
  }];
  return <div className={styles.root} style={themeStyle(theme)}>
      <Navigation content={content} />

      <section className="hero" data-screen-label="01 Hero">
        <div className="hero-bg" />
        <div className="hero-photo" aria-hidden="true">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={heroVideo.poster}>
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        </div>
        <div className="hero-content">
          <Reveal className="hero-eyebrow" variant="fade-up" distance="18px">{"AI Deal Review Agent · CRM Sales Intelligence"}</Reveal>
          <Reveal as="h1" variant="mask-up" duration="var(--m-dur-slow)" distance="64px" delay={140}>
            {"Automated deal reviews for sales &"} <em>{"revenue operations"}</em> {"teams."}
          </Reveal>
          <Reveal as="p" className="hero-sub" variant="blur-in" delay={460}>{"Turn CRM records, ticketing history, contracts, and sales conversations into real-time deal intelligence directly inside your CRM UI."}</Reveal>
          <Reveal className="hero-actions" variant="fade-up" delay={700}>
            <a href="#book" className="btn sun">{"View Deal Review Dashboard"}</a>
            <a href="#how" className="btn ghost" style={{
            borderColor: "color-mix(in srgb, var(--paper) 40%, transparent)",
            color: "var(--paper)"
          }}>
              {"See Salesforce Integration Demo"}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="pillars" data-screen-label="02 Pillars" id="how">
        <div className="wrap pillars-inner">
          <Reveal className="pillars-eyebrow" variant="fade-up" distance="20px">{"Automated sales intelligence"}</Reveal>
          <div className="pillars-divider" />
          <Stagger as="div" className="pillars-grid" step={110}>
            <Reveal className="pillar" variant="fade-up" distance="40px">
              <div className="pillar-icon">
                <TemplateIcon icon={"lucide:heart-pulse"} size={28} strokeWidth={1.7} />
              </div>
              <p className="pillar-text">{"Unified customer health insights delivered directly inside your Salesforce CRM"}</p>
            </Reveal>
            <Reveal className="pillar" variant="fade-up" distance="40px">
              <div className="pillar-icon">
                <TemplateIcon icon={"lucide:landmark"} size={28} strokeWidth={1.7} />
              </div>
              <p className="pillar-text">{"Automated churn risk alerts and upsell opportunities mined from customer logs"}</p>
            </Reveal>
            <Reveal className="pillar" variant="fade-up" distance="40px">
              <div className="pillar-icon">
                <TemplateIcon icon={"lucide:university"} size={28} strokeWidth={1.7} />
              </div>
              <p className="pillar-text">{"Deep analysis of contract terms, support tickets, and Slack conversations"}</p>
            </Reveal>
            <Reveal className="pillar" variant="fade-up" distance="40px">
              <div className="pillar-icon">
                <TemplateIcon icon={"lucide:zap"} size={28} strokeWidth={1.7} />
              </div>
              <p className="pillar-text">{"Actionable next best steps and instant manager review workflows"}</p>
            </Reveal>
          </Stagger>
          <Reveal className="pillars-actions" variant="fade-up" delay={300}>
            <a href="#approach" className="btn sun">{"View Deal Review Dashboard"}</a>
            <a href="#pricing" className="text-link">
              {"See Salesforce Integration Demo"}
              <TemplateIcon className="text-link-icon" icon={"lucide:arrow-right"} size={14} strokeWidth={2.2} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="stat-section" data-screen-label="03 Stat">
        <div className="wrap stat">
          <Reveal as="h2" variant="mask-up" duration="var(--m-dur-slow)" distance="48px">
            {"85% reduction in manual account review time — giving sales teams instant visibility into churn risks and upgrade opportunities."}
            <span className="info" title={"Based on comparative time-motion studies of sales organizations managing 10,000+ accounts."}>
              <TemplateIcon icon={"lucide:info"} title={"Based on comparative time-motion studies of sales organizations managing 10,000+ accounts."} size={13} strokeWidth={2} />
            </span>
          </Reveal>
          <Reveal className="stat-actions" variant="fade-up" delay={320}>
            <a href="#stories" className="btn">{"View Deal Review Dashboard"}</a>
          </Reveal>
        </div>
      </section>

      <TestimonialRail content={content} />

      <section className="join" data-screen-label="05 Join">
        <video className="join-video" autoPlay muted loop playsInline preload="metadata" poster={joinVideo.poster} aria-hidden="true">
          <source src={joinVideo.src} type="video/mp4" />
        </video>
        <div className="wrap">
          <div className="join-grid">
            <div className="join-copy">
              <h2>{"Join the modern sales organizations transforming CRM data into real-time deal intelligence."}</h2>
              <div className="join-actions">
                <a href="#book" className="btn">{"See Salesforce Integration Demo"}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature" data-screen-label="06 Feature: Clinic">
        <div className="wrap">
          <div className="feature-grid">
            <Reveal className="feature-text" variant="fade-right" delay={140}>
              <h3>{"Surface real-time deal intelligence directly inside your <em>Salesforce CRM</em>."}</h3>
              <p>{"The AI Deal Review Agent automatically mines your ticketing history, sales logs, and customer contracts to calculate churn risk and upsell opportunities. Sales representatives get instant, actionable insights without ever leaving their primary workspace."}</p>
              <div className="feature-actions">
                <a href="#book" className="btn">{"See Salesforce Integration Demo"}</a>
              </div>
            </Reveal>
            <Reveal className="feature-img img-clinic" variant="wipe-right" duration="var(--m-dur-slow)">
              <img src={clinicImage.src} alt={clinicImage.alt} loading="lazy" decoding="async" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="feature reverse" data-screen-label="07 Feature: Science">
        <div className="wrap">
          <div className="feature-grid">
            <Reveal className="feature-img img-science" variant="wipe-right" duration="var(--m-dur-slow)">
              <img src={scienceImage.src} alt={scienceImage.alt} loading="lazy" decoding="async" />
            </Reveal>
            <Reveal className="feature-text" variant="fade-right" delay={140}>
              <h3>{"Turn scattered customer contracts and ticketing logs into <em>real-time deal intelligence</em>."}</h3>
              <p>{"Our AI engine automatically mines your contract repositories, support tickets, and sales logs to surface critical churn risks and upsell opportunities directly inside Salesforce."}</p>
              <div className="feature-actions">
                <a href="#book" className="btn">{"Explore the CRM integration"}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="feature" data-screen-label="08 Feature: Safety" id="approach">
        <div className="wrap">
          <div className="feature-grid">
            <Reveal className="feature-text" variant="fade-right" delay={140}>
              <h3>{"Flag critical contract gaps and churn risks directly inside your CRM."}</h3>
              <p>{"The AI Deal Review Agent automatically monitors customer contract data, ticketing history, and sales logs to surface hidden risks and missing information before they impact your pipeline."}</p>
              <div className="feature-actions">
                <a href="#book" className="btn">{"See Risk Detection Demo"}</a>
              </div>
            </Reveal>
            <Reveal className="feature-img img-safety" variant="wipe-right" duration="var(--m-dur-slow)">
              <img src={safetyImage.src} alt={safetyImage.alt} loading="lazy" decoding="async" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pricing" data-screen-label="09 Pricing" id="pricing">
        <div className="wrap">
          <Reveal className="pricing-head" variant="fade-up" distance="28px">
            <span className="lbl">{"Flexible Plans"}</span>
            <h2>{"Scale your sales intelligence."}</h2>
            <p>{"Choose the right tier to connect your CRM, ticketing systems, and communication channels with real-time AI insights."}</p>
          </Reveal>
          <Stagger as="div" className="pricing-grid" step={110}>
            <Reveal className="price-card" variant="fade-up" distance="48px">
              <div>
                <span className="price-tier">{"Growth"}</span>
                <h3 className="price-name">{"Team Edition"}</h3>
              </div>
              <div className="price-amount">
                <span className="num">{"$1,200"}</span>
                <span className="per">{"/ month"}</span>
              </div>
              <p className="price-desc">{"Perfect for growing sales teams looking to automate deal reviews and basic CRM intelligence."}</p>
              <ul className="price-list">
                <li>{"Up to 1,000 active customers"}</li>
                <li>{"Salesforce & Slack integration"}</li>
                <li>{"Automated churn risk alerts"}</li>
                <li>{"Standard AI output dashboard"}</li>
              </ul>
              <a href="#book" className="btn ghost">{"Start Team Trial"}</a>
            </Reveal>
            <Reveal className="price-card featured" variant="fade-up" distance="48px">
              <div>
                <span className="price-tier">{"Most chosen"}</span>
                <h3 className="price-name">{"Enterprise Scale"}</h3>
              </div>
              <div className="price-amount">
                <span className="num">{"$3,500"}</span>
                <span className="per">{"/ month"}</span>
              </div>
              <p className="price-desc">{"Designed for large sales organizations managing up to 10,000 customers with complex workflows."}</p>
              <ul className="price-list">
                <li>{"Up to 10,000 active customers"}</li>
                <li>{"Full CRM & ticketing integration"}</li>
                <li>{"Custom AI qualification scoring"}</li>
                <li>{"Manager review queue & workflows"}</li>
              </ul>
              <a href="#book" className="btn">{"Request Enterprise Demo"}</a>
            </Reveal>
            <Reveal className="price-card" variant="fade-up" distance="48px">
              <div>
                <span className="price-tier">{"Custom"}</span>
                <h3 className="price-name">{"Platform Unlimited"}</h3>
              </div>
              <div className="price-amount">
                <span className="num">{"Custom"}</span>
                <span className="per">{"/ flat"}</span>
              </div>
              <p className="price-desc">{"For global revenue operations requiring dedicated AI models, custom integrations, and unlimited scale."}</p>
              <ul className="price-list">
                <li>{"Unlimited active customers"}</li>
                <li>{"Dedicated AI model training"}</li>
                <li>{"Custom communication channels"}</li>
                <li>{"24/7 RevOps support & SLAs"}</li>
              </ul>
              <a href="#book" className="btn ghost">{"Contact Sales"}</a>
            </Reveal>
          </Stagger>
        </div>
      </section>

      <section className="booking" data-screen-label="10 Booking" id="book">
        <div className="wrap">
          <div className="booking-grid">
            <Reveal variant="fade-right" delay={140}>
              <span className="lbl" style={{
              color: "color-mix(in srgb, var(--paper) 60%, transparent)"
            }}>{"Schedule a Demo"}</span>
              <h2 style={{
              marginTop: 14
            }}>{"Connect your CRM and see real-time deal intelligence in action."}</h2>
              <p className="lead">{"Set up a 15-minute technical walkthrough. We will show you how the AI Deal Review Agent connects to Salesforce, Slack, and your contract database."}</p>
              <div className="booking-bullets">
                <div className="booking-bullet">
                  <div className="booking-bullet-num">1</div>
                  <div>
                    <h4>{"Choose a convenient time"}</h4>
                    <p>{"Select a slot for a live integration walkthrough with our solutions team."}</p>
                  </div>
                </div>
                <div className="booking-bullet">
                  <div className="booking-bullet-num">2</div>
                  <div>
                    <h4>{"Specify your CRM setup"}</h4>
                    <p>{"Let us know if you use Salesforce, HubSpot, or custom APIs so we can tailor the demo."}</p>
                  </div>
                </div>
                <div className="booking-bullet">
                  <div className="booking-bullet-num">3</div>
                  <div>
                    <h4>{"See live deal insights"}</h4>
                    <p>{"We'll run a sample contract and ticket log through the agent to show you instant scores."}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="book-card" variant="wipe-right" duration="var(--m-dur-slow)" delay={200}>
              <h3>{"Book a Live Demo"}</h3>
              <p className="small">{"No obligation. See how to automate reviews for up to 10,000 customers."}</p>
              <div className="form-row split">
                <div>
                  <label>{"First name"}</label>
                  <input type="text" placeholder={"Sarah"} />
                </div>
                <div>
                  <label>{"Last name"}</label>
                  <input type="text" placeholder={"Chen"} />
                </div>
              </div>
              <div className="form-row">
                <label>{"Work email"}</label>
                <input type="email" placeholder={"sarah@enterprise.com"} />
              </div>
              <div className="form-row">
                <label>{"What is your primary CRM?"}</label>
                <select defaultValue={"Salesforce Cloud"}>
                  <option>{"Salesforce Cloud"}</option>
                  <option>{"HubSpot CRM"}</option>
                  <option>{"Microsoft Dynamics"}</option>
                  <option>{"Custom / In-house CRM"}</option>
                  <option>{"Multiple systems"}</option>
                  <option>{"Other / None"}</option>
                </select>
              </div>
              <div className="form-row">
                <label>{"Select a 15-min demo slot"}</label>
                <div className="slot-grid">
                  <button type="button" className="slot">{"9:00 AM"}</button>
                  <button type="button" className="slot active">{"10:00 AM"}</button>
                  <button type="button" className="slot">{"11:30 AM"}</button>
                  <button type="button" className="slot">{"1:30 PM"}</button>
                  <button type="button" className="slot">{"2:30 PM"}</button>
                  <button type="button" className="slot">{"3:30 PM"}</button>
                  <button type="button" className="slot">{"4:00 PM"}</button>
                  <button type="button" className="slot">{"4:30 PM"}</button>
                </div>
              </div>
              <div className="form-row">
                <label>{"What is your biggest deal review bottleneck? (Optional)"}</label>
                <textarea placeholder={"Reps spend too much time checking support tickets and contract renewal dates manually..."} />
              </div>
              <button type="button" className="btn lg">{"Confirm Demo Booking"}</button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="press" data-screen-label="11 Press">
        <div className="wrap">
          <Reveal className="press-label" variant="fade-up" distance="20px">{"As featured in leading enterprise tech and sales publications"}</Reveal>
          <Reveal variant="fade-up" delay={100} distance="18px">
            <Ticker className="press-carousel" duration="30s" gap="clamp(48px, 8vw, 96px)" aria-label={"As featured in leading enterprise tech and sales publications"}>
              {pressLogos.map(logo => <span key={logo.key} className={["press-logo", logo.modifier].filter(Boolean).join(" ")}>
                  {t(logo.key)}
                </span>)}
            </Ticker>
          </Reveal>
        </div>
      </section>

      <section className="articles" data-screen-label="12 Articles">
        <div className="wrap">
          <Stagger as="div" className="articles-grid" step={110}>
            <Reveal as="article" className="article-card" variant="fade-up" distance="48px">
              <span className="article-cat">{"Operations"}</span>
              <div className="article-img a1">
                <img src={articleImages[0].src} alt={articleImages[0].alt} loading="lazy" decoding="async" />
              </div>
              <h4>{"Why manual customer record reviews cost sales teams 15 hours per rep every week"}</h4>
            </Reveal>
            <Reveal as="article" className="article-card" variant="fade-up" distance="48px">
              <span className="article-cat">{"Compliance"}</span>
              <div className="article-img a2">
                <img src={articleImages[1].src} alt={articleImages[1].alt} loading="lazy" decoding="async" />
              </div>
              <h4>{"Detecting contract gaps and unresolved support tickets before they trigger churn"}</h4>
            </Reveal>
            <Reveal as="article" className="article-card" variant="fade-up" distance="48px">
              <span className="article-cat">{"Growth"}</span>
              <div className="article-img a3">
                <img src={articleImages[2].src} alt={articleImages[2].alt} loading="lazy" decoding="async" />
              </div>
              <h4>{"How to automatically surface upsell and upgrade opportunities directly inside Salesforce"}</h4>
            </Reveal>
          </Stagger>
        </div>
      </section>

      <section className="closer" data-screen-label="13 Closer">
        <div className="wrap">
          <Reveal as="h2" variant="mask-up" duration="var(--m-dur-slow)" distance="48px">{"Equip your sales team with automated *deal intelligence* directly inside Salesforce."}</Reveal>
          <Reveal variant="fade-up" delay={320}>
            <a href="#book" className="btn lg">{"View Deal Review Dashboard"}</a>
          </Reveal>
        </div>
      </section>

      <footer data-screen-label="14 Footer">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="foot-mark" />
              <div style={{
              fontFamily: "var(--serif)",
              fontSize: 22,
              fontWeight: 500
            }}>{"AI Deal Review"}</div>
              <p style={{
              color: "var(--ink-3)",
              fontSize: 14,
              maxWidth: 240
            }}>{"Real-time deal intelligence for CRM, ticketing, contracts, and sales conversations."}</p>
            </div>
            <div className="foot-col">
              <h5>{"Integrations"}</h5>
              <ul>
                <li><a href="#">{"Salesforce CRM"}</a></li>
                <li><a href="#">{"Slack Channels"}</a></li>
                <li><a href="#">{"Ticketing Logs"}</a></li>
                <li><a href="#">{"Contract Repositories"}</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>{"Platform"}</h5>
              <ul>
                <li><a href="#">{"Deal Review Dashboard"}</a></li>
                <li><a href="#">{"AI Input Panel"}</a></li>
                <li><a href="#">{"Analytics & Metrics"}</a></li>
                <li><a href="#">{"Security & Compliance"}</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>{"Resources"}</h5>
              <ul>
                <li><a href="#">{"Sales Intelligence Blog"}</a></li>
                <li><a href="#">{"Customer Case Studies"}</a></li>
                <li><a href="#">{"API Documentation"}</a></li>
                <li><a href="#">{"Contact Support"}</a></li>
              </ul>
            </div>
            <div className="foot-news">
              <h5>{"Stay Ahead of Churn"}</h5>
              <p>{"Get weekly sales intelligence insights and deal-review frameworks directly to your inbox."}</p>
              <form className="foot-news-form">
                <input type="email" placeholder={"you@company.com"} required />
                <button type="submit" className="btn">{"Subscribe"}</button>
              </form>
            </div>
          </div>
          <div className="foot-bottom">
            <span>{"© 2026 AI Deal Review Agent. All rights reserved."}</span>
            <div className="foot-legal">
              <a href="#">{"Terms of Service"}</a>
              <a href="#">{"Privacy Policy"}</a>
              <a href="#">{"Data Security Notice"}</a>
            </div>
          </div>
          <div className="foot-disc">{"AI Deal Review Agent is a sales intelligence platform. Our automated insights, risk indicators, and recommendations are designed to assist sales operations and management. Actual deal outcomes, contract compliance, and customer retention strategies remain the sole responsibility of the user organization."}</div>
        </div>
      </footer>
    </div>;
}
export const brightwayHealthTemplate: TemplateDefinition = {
  metadata: {
    id: "brightway-health",
    name: "Brightway Health",
    description: "A healthcare consulting landing page with a sun-yellow primary, dark hero video, real clinic and strategy photography, four-pillar value framing, alternating feature rows, pricing, booking, and 14 sections.",
    category: "consulting",
    preferredIconSets: ["lucide"]
  },
  ai: {
    summary: {
      purpose: "A landing page for a healthcare-strategy and operations consulting firm that sells discovery sprints, embedded operating-partner engagements, and ongoing strategic retainers.",
      audience: "Founders and operators of independent clinics, multi-site clinic groups, telehealth startups, and single-product health companies.",
      tone: "Trustworthy, plainspoken, expert. Sounds like a senior operator or clinical leader — never marketing-fluffy or vague.",
      visualStyle: "Sun-yellow primary on cream paper backgrounds, dark photographic hero, rounded sun-style brand mark, real healthcare consulting photography, a background-video join CTA, and a single-page editorial cadence."
    },
    editingHints: ["Headlines are statement sentences with one italic noun phrase, never marketing slogans.", "Pricing tiers are named (Diagnostic Sprint / Operating Partner / Strategic Retainer) — keep tier vocabulary consultative.", "Compliance, HIPAA, FDA references are intentional — preserve them when editing healthcare copy.", "Use real-feeling clinic and product company names in testimonials; mix family practices, telehealth, and devices.", "Theme edits should keep the sun-yellow primary and the dark hero — switching to medical-green will fight the editorial warmth."],
    sections: [{
      id: "navigation",
      name: "Navigation",
      purpose: "Sticky nav with brand sun mark, five anchor links, sign-in, and Book a call CTA.",
      copyGuidance: "Brand short. Five links to internal anchors.",
      contentKeys: ["brand.name", "nav.link.1", "nav.link.2", "nav.link.3", "nav.link.4", "nav.link.5", "nav.signin", "nav.cta", "ui.icon.arrowRight"],
      themeKeys: ["sun", "ink", "paper"]
    }, {
      id: "hero",
      name: "Hero",
      purpose: "Dark photographic hero with anchored bottom-left content.",
      copyGuidance: "Headline: clinics & [italic]product[/italic] teams. Subtitle is one sentence about the firm. Two CTAs.",
      contentKeys: ["hero.video", "hero.kicker", "hero.title.pre", "hero.title.em", "hero.title.post", "hero.subtitle", "hero.cta.primary", "hero.cta.secondary"],
      themeKeys: ["sun", "paper", "hero-muted", "hero-base", "hero-bg-gradient", "hero-photo-gradient"]
    }, {
      id: "pillars",
      name: "Pillars",
      purpose: "Four-pillar value strip on a sun-yellow background.",
      copyGuidance: "Each pillar is two short lines describing a capability.",
      contentKeys: ["pillars.kicker", "pillars.1.icon", "pillars.1", "pillars.2.icon", "pillars.2", "pillars.3.icon", "pillars.3", "pillars.4.icon", "pillars.4", "pillars.cta.primary", "pillars.cta.secondary", "ui.icon.arrowRight"]
    }, {
      id: "stat",
      name: "Headline stat",
      purpose: "One large statistic claim with a tooltip and a CTA.",
      copyGuidance: "Statement format with a verifiable percentage and a tooltip noting time period.",
      contentKeys: ["stat.headline", "stat.tooltip", "stat.cta", "ui.icon.info"]
    }, {
      id: "testimonials",
      name: "Testimonial rail",
      purpose: "Horizontally scrollable rail with five testimonial cards over real advisor/client portraits.",
      copyGuidance: "Each card: 1-sentence quote in serif italic + name + role/clinic.",
      mediaGuidance: "Portrait images should feel candid and professional; avoid abstract gradients or illustrations.",
      contentKeys: ["testi.1.image", "testi.1.quote", "testi.1.name", "testi.2.image", "testi.2.quote", "testi.2.name", "testi.3.image", "testi.3.quote", "testi.3.name", "testi.4.image", "testi.4.quote", "testi.4.name", "testi.5.image", "testi.5.quote", "testi.5.name", "ui.icon.chevronLeft", "ui.icon.chevronRight"]
    }, {
      id: "join",
      name: "Join CTA",
      purpose: "Two-column CTA with headline + action over a muted background video and readability gradient.",
      copyGuidance: "Single statement headline + one CTA.",
      mediaGuidance: "Background video should show healthcare teams, clinic movement, or strategy work. Keep it calm enough for overlaid text.",
      contentKeys: ["join.video", "join.title", "join.cta"]
    }, {
      id: "feature-clinic",
      name: "Feature: Clinic",
      purpose: "First feature row about clinic operations.",
      copyGuidance: "Sentence headline + 2-sentence body + action CTA.",
      mediaGuidance: "Use a real clinic, care-team, or operations photo rather than a graphic placeholder.",
      contentKeys: ["feature.clinic.title", "feature.clinic.body", "feature.clinic.cta", "feature.clinic.image"]
    }, {
      id: "feature-science",
      name: "Feature: Science",
      purpose: "Reversed feature row about single-product health companies.",
      copyGuidance: "Same shape; image left, copy right.",
      mediaGuidance: "Use a real product, lab, or health-technology work image.",
      contentKeys: ["feature.science.title", "feature.science.body", "feature.science.cta", "feature.science.image"]
    }, {
      id: "feature-safety",
      name: "Feature: Safety / Compliance",
      purpose: "Third feature row about HIPAA / FDA / regulators.",
      copyGuidance: "Compliance-focused statement headline + supporting body.",
      mediaGuidance: "Use a real review, paperwork, or compliance work photo; avoid flat color placeholders.",
      contentKeys: ["feature.safety.title", "feature.safety.body", "feature.safety.cta", "feature.safety.image"]
    }, {
      id: "pricing",
      name: "Pricing",
      purpose: "Three engagement tiers; middle one is the sun-featured Operating Partner.",
      copyGuidance: "Tier labels (Compass / Most chosen / North star), service names, fixed fees with /flat or /month suffix.",
      contentKeys: ["pricing.kicker", "pricing.title", "pricing.body", "pricing.1.tier", "pricing.1.name", "pricing.1.price", "pricing.1.per", "pricing.1.desc", "pricing.1.feature1", "pricing.1.feature2", "pricing.1.feature3", "pricing.1.feature4", "pricing.1.cta", "pricing.2.tier", "pricing.2.name", "pricing.2.price", "pricing.2.per", "pricing.2.desc", "pricing.2.feature1", "pricing.2.feature2", "pricing.2.feature3", "pricing.2.feature4", "pricing.2.cta", "pricing.3.tier", "pricing.3.name", "pricing.3.price", "pricing.3.per", "pricing.3.desc", "pricing.3.feature1", "pricing.3.feature2", "pricing.3.feature3", "pricing.3.feature4", "pricing.3.cta"]
    }, {
      id: "booking",
      name: "Booking section",
      purpose: "Dark booking section with three-step explainer and a real form card.",
      copyGuidance: "Three numbered steps with title + 1-sentence body. Form card has name/email/practice/slot/note fields.",
      contentKeys: ["booking.kicker", "booking.title", "booking.body", "booking.step.1.title", "booking.step.1.body", "booking.step.2.title", "booking.step.2.body", "booking.step.3.title", "booking.step.3.body", "booking.card.title", "booking.card.body", "booking.card.cta"]
    }, {
      id: "press",
      name: "Press logos",
      purpose: "Five press wordmarks on a paper background.",
      copyGuidance: "Real-feeling healthcare publications.",
      contentKeys: ["press.label", "press.logo.1", "press.logo.2", "press.logo.3", "press.logo.4", "press.logo.5"]
    }, {
      id: "articles",
      name: "Articles",
      purpose: "Three article preview cards with category tag, real image, and title.",
      copyGuidance: "Categories: Operations / Compliance / Growth.",
      mediaGuidance: "Article thumbnails should map to the topic: clinic ops, compliance review, and growth planning.",
      contentKeys: ["articles.1.cat", "articles.1.image", "articles.1.title", "articles.2.cat", "articles.2.image", "articles.2.title", "articles.3.cat", "articles.3.image", "articles.3.title"]
    }, {
      id: "closer",
      name: "Closer",
      purpose: "Big sun-yellow closer with one statement and one CTA.",
      copyGuidance: "Single sentence + single button.",
      contentKeys: ["closer.title", "closer.cta"]
    }, {
      id: "footer",
      name: "Footer",
      purpose: "Paper-background footer with brand block, three link columns, newsletter signup, and a regulatory disclaimer.",
      copyGuidance: "Disclaimer is the regulatory paragraph; keep it intact when editing for healthcare verticals.",
      contentKeys: ["footer.tagline", "footer.col1.title", "footer.col1.link1", "footer.col1.link2", "footer.col1.link3", "footer.col1.link4", "footer.col2.title", "footer.col2.link1", "footer.col2.link2", "footer.col2.link3", "footer.col2.link4", "footer.col3.title", "footer.col3.link1", "footer.col3.link2", "footer.col3.link3", "footer.col3.link4", "footer.news.title", "footer.news.body", "footer.news.placeholder", "footer.news.cta", "footer.copyright", "footer.disclaimer"]
    }]
  },
  defaultTheme: {
    sun: {
      type: "color",
      label: "Sun yellow primary",
      value: "#F5C518"
    },
    "sun-soft": {
      type: "color",
      label: "Sun yellow soft",
      value: "#FBE08A"
    },
    "sun-glow": {
      type: "color",
      label: "Sun yellow glow",
      value: "#FFE066"
    },
    paper: {
      type: "color",
      label: "Paper background",
      value: "#FFFCF2"
    },
    surface: {
      type: "color",
      label: "Card and field surface",
      value: "#FFFFFF"
    },
    "hero-muted": {
      type: "color",
      label: "Hero muted text",
      value: "#E8DDB7"
    },
    "hero-base": {
      type: "color",
      label: "Hero dark base",
      value: "#1d2118"
    },
    "hero-bg-gradient": {
      type: "background",
      label: "Hero background wash",
      value: "radial-gradient(ellipse at 70% 40%, rgba(255, 210, 90, .18) 0%, transparent 60%), linear-gradient(135deg, #2c3326 0%, #1a1d14 50%, #232a1d 100%)"
    },
    "hero-photo-gradient": {
      type: "background",
      label: "Hero photo abstraction",
      value: "radial-gradient(ellipse 600px 400px at 65% 50%, rgba(245, 197, 24, .22) 0%, transparent 70%), radial-gradient(ellipse 800px 500px at 30% 60%, rgba(180, 160, 120, .15) 0%, transparent 70%), linear-gradient(180deg, rgba(22, 23, 14, .45) 0%, rgba(22, 23, 14, .15) 40%, rgba(22, 23, 14, .55) 100%), linear-gradient(135deg, #3d4030 0%, #5a5740 35%, #7a6e4c 60%, #4a4838 100%)"
    },
    ink: {
      type: "color",
      label: "Primary ink",
      value: "#16170E"
    },
    "ink-2": {
      type: "color",
      label: "Secondary ink",
      value: "#3A3A2C"
    },
    "ink-3": {
      type: "color",
      label: "Tertiary ink",
      value: "#6B6A56"
    },
    line: {
      type: "color",
      label: "Line color",
      value: "rgba(22, 23, 14, .14)"
    },
    "line-soft": {
      type: "color",
      label: "Soft line color",
      value: "rgba(22, 23, 14, .08)"
    },
    serif: {
      type: "font",
      label: "Display serif",
      value: '"Fraunces", "Times New Roman", serif'
    },
    sans: {
      type: "font",
      label: "Body sans",
      value: '"Inter", system-ui, -apple-system, sans-serif'
    },
    ...motionTokenPresets.cinematic
  },
  defaultIconSet: brightwayHealthDefaultIconSet,
  defaultContent: {
    ...brightwayHealthDefaultIconSet.icons,
    "brand.name": {
      type: "text",
      label: "Brand name",
      value: "Brightway"
    },
    "nav.link.1": {
      type: "text",
      label: "Nav link 1",
      value: "How we help"
    },
    "nav.link.2": {
      type: "text",
      label: "Nav link 2",
      value: "Approach"
    },
    "nav.link.3": {
      type: "text",
      label: "Nav link 3",
      value: "Stories"
    },
    "nav.link.4": {
      type: "text",
      label: "Nav link 4",
      value: "Pricing"
    },
    "nav.link.5": {
      type: "text",
      label: "Nav link 5",
      value: "Book"
    },
    "nav.signin": {
      type: "text",
      label: "Nav sign in",
      value: "Sign in"
    },
    "nav.cta": {
      type: "text",
      label: "Nav primary CTA",
      value: "Book a call"
    },
    "hero.kicker": {
      type: "text",
      label: "Hero kicker",
      value: "Healthcare consulting · Independent practice"
    },
    "hero.title.pre": {
      type: "text",
      label: "Hero title prefix",
      value: "Consulting for clinics &"
    },
    "hero.title.em": {
      type: "text",
      label: "Hero title italic",
      value: "health-product"
    },
    "hero.title.post": {
      type: "text",
      label: "Hero title post",
      value: "teams."
    },
    "hero.subtitle": {
      type: "text",
      label: "Hero subtitle",
      value: "We help small clinics, telehealth startups, and single-product health companies grow without losing the care that made them worth visiting."
    },
    "hero.video": {
      type: "video",
      label: "Hero background video",
      value: "https://assets.mixkit.co/videos/4809/4809-720.mp4",
      poster: "https://assets.mixkit.co/videos/4809/4809-thumb-720-0.jpg"
    },
    "hero.cta.primary": {
      type: "text",
      label: "Hero primary CTA",
      value: "Book a discovery call"
    },
    "hero.cta.secondary": {
      type: "text",
      label: "Hero secondary CTA",
      value: "How we work"
    },
    "pillars.kicker": {
      type: "text",
      label: "Pillars kicker",
      value: "A practical kind of expertise"
    },
    "pillars.1": {
      type: "text",
      label: "Pillar 1",
      value: "Outcomes-led growth strategy built around your patients"
    },
    "pillars.2": {
      type: "text",
      label: "Pillar 2",
      value: "Compliance-aware playbooks that ship in weeks, not quarters"
    },
    "pillars.3": {
      type: "text",
      label: "Pillar 3",
      value: "Clinical and operator advisors with real-world chair time"
    },
    "pillars.4": {
      type: "text",
      label: "Pillar 4",
      value: "Hands-on delivery, not slide decks handed off to a junior"
    },
    "pillars.cta.primary": {
      type: "text",
      label: "Pillars primary CTA",
      value: "How our engagements work"
    },
    "pillars.cta.secondary": {
      type: "text",
      label: "Pillars secondary CTA",
      value: "Pricing & packages"
    },
    "stat.headline": {
      type: "text",
      label: "Stat headline",
      value: "92% of clinics we work with hit their year-one growth targets — without compromising clinical quality."
    },
    "stat.tooltip": {
      type: "text",
      label: "Stat tooltip",
      value: "Based on engagements completed Jan 2022 – Mar 2026"
    },
    "stat.cta": {
      type: "text",
      label: "Stat CTA",
      value: "See client outcomes"
    },
    "testi.1.image": image("Testimonial 1 portrait", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80", "Healthcare practice leader portrait"),
    "testi.1.quote": {
      type: "text",
      label: "Testi 1 quote",
      value: "\"They rebuilt our intake in six weeks. Wait times dropped 40% and our team finally stopped dreading Mondays.\""
    },
    "testi.1.name": {
      type: "text",
      label: "Testi 1 name",
      value: "Dr. Lena Ortiz · Family Practice, Austin"
    },
    "testi.2.image": image("Testimonial 2 portrait", "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=900&q=80", "Healthcare operations executive portrait"),
    "testi.2.quote": {
      type: "text",
      label: "Testi 2 quote",
      value: "\"Brightway gave us the financial model we'd been winging for three years. Our investors finally trust the numbers.\""
    },
    "testi.2.name": {
      type: "text",
      label: "Testi 2 name",
      value: "Marcus Chen · COO, NovaCardio"
    },
    "testi.3.image": image("Testimonial 3 portrait", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80", "Digital health founder portrait"),
    "testi.3.quote": {
      type: "text",
      label: "Testi 3 quote",
      value: "\"The compliance playbook alone paid for the whole engagement. We launched our second state in half the time.\""
    },
    "testi.3.name": {
      type: "text",
      label: "Testi 3 name",
      value: "Priya Shah · Founder, Clearpath Therapy"
    },
    "testi.4.image": image("Testimonial 4 portrait", "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=900&q=80", "Medical director portrait"),
    "testi.4.quote": {
      type: "text",
      label: "Testi 4 quote",
      value: "\"Honest, clinical, and bluntly useful. I forwarded their first memo to my whole leadership team.\""
    },
    "testi.4.name": {
      type: "text",
      label: "Testi 4 name",
      value: "Dr. James Whitaker · Medical Director"
    },
    "testi.5.image": image("Testimonial 5 portrait", "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80", "Clinic CEO portrait"),
    "testi.5.quote": {
      type: "text",
      label: "Testi 5 quote",
      value: "\"They sat with our nurses, our front desk, our billing person — then handed back a plan that actually felt like us.\""
    },
    "testi.5.name": {
      type: "text",
      label: "Testi 5 name",
      value: "Anya Park · CEO, Pinegate Health"
    },
    "join.video": {
      type: "video",
      label: "Join background video",
      value: "https://assets.mixkit.co/videos/4809/4809-720.mp4",
      poster: "https://assets.mixkit.co/videos/4809/4809-thumb-720-0.jpg"
    },
    "join.title": {
      type: "text",
      label: "Join title",
      value: "Join the dozens of practices who've grown with Brightway alongside them."
    },
    "join.cta": {
      type: "text",
      label: "Join CTA",
      value: "Is my clinic a fit?"
    },
    "feature.clinic.title": {
      type: "text",
      label: "Feature clinic title",
      value: "Run a calmer clinic without rebuilding from scratch."
    },
    "feature.clinic.body": {
      type: "text",
      label: "Feature clinic body",
      value: "We map your patient flow, your staff schedule, and your tech stack — then quietly rebuild the parts that are costing you energy. No rip-and-replace. No vendor lock-in."
    },
    "feature.clinic.cta": {
      type: "text",
      label: "Feature clinic CTA",
      value: "Explore clinic engagements"
    },
    "feature.clinic.image": image("Feature clinic image", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80", "Clinician reviewing care operations on a laptop"),
    "feature.science.title": {
      type: "text",
      label: "Feature science title",
      value: "Take a single-product health company from launch to category leader."
    },
    "feature.science.body": {
      type: "text",
      label: "Feature science body",
      value: "Positioning, clinical evidence narrative, payer strategy, and a roadmap your engineers can actually ship. We've shepherded 23 health products from seed to series B."
    },
    "feature.science.cta": {
      type: "text",
      label: "Feature science CTA",
      value: "See product engagements"
    },
    "feature.science.image": image("Feature science image", "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80", "Medical device hardware and diagnostic technology detail"),
    "feature.safety.title": {
      type: "text",
      label: "Feature safety title",
      value: "Stay confidently inside the lines of HIPAA, FDA, and state regulators."
    },
    "feature.safety.body": {
      type: "text",
      label: "Feature safety body",
      value: "Our compliance partners read every contract, every privacy review, every marketing claim before it ships. You move fast — they make sure fast doesn't mean fragile."
    },
    "feature.safety.cta": {
      type: "text",
      label: "Feature safety CTA",
      value: "Compliance review"
    },
    "feature.safety.image": image("Feature safety image", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80", "Compliance documents and laptop during a review session"),
    "pricing.kicker": {
      type: "text",
      label: "Pricing kicker",
      value: "Engagements"
    },
    "pricing.title": {
      type: "text",
      label: "Pricing title",
      value: "Three ways to work with us."
    },
    "pricing.body": {
      type: "text",
      label: "Pricing body",
      value: "Every engagement starts with a free 30-minute discovery call. No surprise scopes, no billable-hour surprises."
    },
    "pricing.1.tier": {
      type: "text",
      label: "Pricing 1 tier",
      value: "Compass"
    },
    "pricing.1.name": {
      type: "text",
      label: "Pricing 1 name",
      value: "Diagnostic Sprint"
    },
    "pricing.1.price": {
      type: "text",
      label: "Pricing 1 price",
      value: "$8.4k"
    },
    "pricing.1.per": {
      type: "text",
      label: "Pricing 1 per",
      value: "/ flat"
    },
    "pricing.1.desc": {
      type: "text",
      label: "Pricing 1 desc",
      value: "A 3-week deep audit of your clinic or product, with a clear 90-day plan to act on."
    },
    "pricing.1.feature1": {
      type: "text",
      label: "Pricing 1 feature 1",
      value: "2 founder & team workshops"
    },
    "pricing.1.feature2": {
      type: "text",
      label: "Pricing 1 feature 2",
      value: "Patient-flow + ops audit"
    },
    "pricing.1.feature3": {
      type: "text",
      label: "Pricing 1 feature 3",
      value: "Compliance gap report"
    },
    "pricing.1.feature4": {
      type: "text",
      label: "Pricing 1 feature 4",
      value: "Prioritized 90-day roadmap"
    },
    "pricing.1.cta": {
      type: "text",
      label: "Pricing 1 CTA",
      value: "Start a sprint"
    },
    "pricing.2.tier": {
      type: "text",
      label: "Pricing 2 tier",
      value: "Most chosen"
    },
    "pricing.2.name": {
      type: "text",
      label: "Pricing 2 name",
      value: "Operating Partner"
    },
    "pricing.2.price": {
      type: "text",
      label: "Pricing 2 price",
      value: "$14k"
    },
    "pricing.2.per": {
      type: "text",
      label: "Pricing 2 per",
      value: "/ month"
    },
    "pricing.2.desc": {
      type: "text",
      label: "Pricing 2 desc",
      value: "Embedded with your team for 3–6 months. We don't just advise — we ship the work alongside you."
    },
    "pricing.2.feature1": {
      type: "text",
      label: "Pricing 2 feature 1",
      value: "Weekly strategy + delivery cadence"
    },
    "pricing.2.feature2": {
      type: "text",
      label: "Pricing 2 feature 2",
      value: "Hands-on ops, hiring, and finance"
    },
    "pricing.2.feature3": {
      type: "text",
      label: "Pricing 2 feature 3",
      value: "Direct line to clinical advisors"
    },
    "pricing.2.feature4": {
      type: "text",
      label: "Pricing 2 feature 4",
      value: "Quarterly board-ready reporting"
    },
    "pricing.2.cta": {
      type: "text",
      label: "Pricing 2 CTA",
      value: "Discuss an engagement"
    },
    "pricing.3.tier": {
      type: "text",
      label: "Pricing 3 tier",
      value: "North star"
    },
    "pricing.3.name": {
      type: "text",
      label: "Pricing 3 name",
      value: "Strategic Retainer"
    },
    "pricing.3.price": {
      type: "text",
      label: "Pricing 3 price",
      value: "$4.5k"
    },
    "pricing.3.per": {
      type: "text",
      label: "Pricing 3 per",
      value: "/ month"
    },
    "pricing.3.desc": {
      type: "text",
      label: "Pricing 3 desc",
      value: "Ongoing advisory once you're on the path. Kept warm for the moments that decide a year."
    },
    "pricing.3.feature1": {
      type: "text",
      label: "Pricing 3 feature 1",
      value: "Monthly executive session"
    },
    "pricing.3.feature2": {
      type: "text",
      label: "Pricing 3 feature 2",
      value: "On-call review of major decisions"
    },
    "pricing.3.feature3": {
      type: "text",
      label: "Pricing 3 feature 3",
      value: "Network introductions"
    },
    "pricing.3.feature4": {
      type: "text",
      label: "Pricing 3 feature 4",
      value: "Annual strategic offsite"
    },
    "pricing.3.cta": {
      type: "text",
      label: "Pricing 3 CTA",
      value: "Stay in touch"
    },
    "booking.kicker": {
      type: "text",
      label: "Booking kicker",
      value: "Book"
    },
    "booking.title": {
      type: "text",
      label: "Booking title",
      value: "Tell us about your clinic — we'll bring the rest."
    },
    "booking.body": {
      type: "text",
      label: "Booking body",
      value: "A short note + a 30-minute call is all we need to figure out if we're a fit. No pitches, no slides — just an honest conversation."
    },
    "booking.step.1.title": {
      type: "text",
      label: "Booking step 1 title",
      value: "Pick a 30-min slot"
    },
    "booking.step.1.body": {
      type: "text",
      label: "Booking step 1 body",
      value: "Discovery calls happen Tues–Thurs, mornings or afternoons."
    },
    "booking.step.2.title": {
      type: "text",
      label: "Booking step 2 title",
      value: "Share a quick brief"
    },
    "booking.step.2.body": {
      type: "text",
      label: "Booking step 2 body",
      value: "Just enough context so we don't waste the first 15 minutes on intros."
    },
    "booking.step.3.title": {
      type: "text",
      label: "Booking step 3 title",
      value: "Get a direct, free read"
    },
    "booking.step.3.body": {
      type: "text",
      label: "Booking step 3 body",
      value: "If we're not the right team, we'll point you toward people who are."
    },
    "booking.card.title": {
      type: "text",
      label: "Booking card title",
      value: "Book a discovery call"
    },
    "booking.card.body": {
      type: "text",
      label: "Booking card body",
      value: "No payment required. We confirm within one business day."
    },
    "booking.card.cta": {
      type: "text",
      label: "Booking card CTA",
      value: "Confirm discovery call"
    },
    "booking.form.firstname.label": {
      type: "text",
      label: "Booking form first name label",
      value: "First name"
    },
    "booking.form.firstname.placeholder": {
      type: "text",
      label: "Booking form first name placeholder",
      value: "Avery"
    },
    "booking.form.lastname.label": {
      type: "text",
      label: "Booking form last name label",
      value: "Last name"
    },
    "booking.form.lastname.placeholder": {
      type: "text",
      label: "Booking form last name placeholder",
      value: "Mitchell"
    },
    "booking.form.email.label": {
      type: "text",
      label: "Booking form email label",
      value: "Work email"
    },
    "booking.form.email.placeholder": {
      type: "text",
      label: "Booking form email placeholder",
      value: "avery@yourclinic.com"
    },
    "booking.form.practice.label": {
      type: "text",
      label: "Booking form practice label",
      value: "What kind of practice?"
    },
    "booking.form.practice.option1": {
      type: "text",
      label: "Booking form practice option 1",
      value: "Independent clinic (1–5 providers)"
    },
    "booking.form.practice.option2": {
      type: "text",
      label: "Booking form practice option 2",
      value: "Multi-site clinic group"
    },
    "booking.form.practice.option3": {
      type: "text",
      label: "Booking form practice option 3",
      value: "Telehealth / digital health"
    },
    "booking.form.practice.option4": {
      type: "text",
      label: "Booking form practice option 4",
      value: "Single-product health company"
    },
    "booking.form.practice.option5": {
      type: "text",
      label: "Booking form practice option 5",
      value: "Medical device / diagnostic"
    },
    "booking.form.practice.option6": {
      type: "text",
      label: "Booking form practice option 6",
      value: "Something else"
    },
    "booking.form.slot.label": {
      type: "text",
      label: "Booking form slot label",
      value: "Pick a 30-min slot — Thu, May 14"
    },
    "booking.form.slot.1": {
      type: "text",
      label: "Booking form slot 1",
      value: "9:00"
    },
    "booking.form.slot.2": {
      type: "text",
      label: "Booking form slot 2",
      value: "10:30"
    },
    "booking.form.slot.3": {
      type: "text",
      label: "Booking form slot 3",
      value: "1:00"
    },
    "booking.form.slot.4": {
      type: "text",
      label: "Booking form slot 4",
      value: "2:30"
    },
    "booking.form.slot.5": {
      type: "text",
      label: "Booking form slot 5",
      value: "3:30"
    },
    "booking.form.slot.6": {
      type: "text",
      label: "Booking form slot 6",
      value: "4:00"
    },
    "booking.form.slot.7": {
      type: "text",
      label: "Booking form slot 7",
      value: "4:30"
    },
    "booking.form.slot.8": {
      type: "text",
      label: "Booking form slot 8",
      value: "5:00"
    },
    "booking.form.note.label": {
      type: "text",
      label: "Booking form note label",
      value: "One sentence on what's on your mind (optional)"
    },
    "booking.form.note.placeholder": {
      type: "text",
      label: "Booking form note placeholder",
      value: "We're growing fast but our scheduling is breaking…"
    },
    "press.label": {
      type: "text",
      label: "Press label",
      value: "Brightway is referenced in"
    },
    "press.logo.1": {
      type: "text",
      label: "Press logo 1",
      value: "The Lancet Digital"
    },
    "press.logo.2": {
      type: "text",
      label: "Press logo 2",
      value: "MedCity News"
    },
    "press.logo.3": {
      type: "text",
      label: "Press logo 3",
      value: "Healthcare Brew"
    },
    "press.logo.4": {
      type: "text",
      label: "Press logo 4",
      value: "STAT Reports"
    },
    "press.logo.5": {
      type: "text",
      label: "Press logo 5",
      value: "Fierce Healthcare"
    },
    "articles.1.cat": {
      type: "text",
      label: "Article 1 category",
      value: "Operations"
    },
    "articles.1.image": image("Article 1 image", "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80", "Clinic operations planning session"),
    "articles.1.title": {
      type: "text",
      label: "Article 1 title",
      value: "Why most independent clinics undercharge — and what to do about it"
    },
    "articles.2.cat": {
      type: "text",
      label: "Article 2 category",
      value: "Compliance"
    },
    "articles.2.image": image("Article 2 image", "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80", "Healthcare compliance meeting around printed documents"),
    "articles.2.title": {
      type: "text",
      label: "Article 2 title",
      value: "Reading the new HIPAA security rule without scaring your engineering team"
    },
    "articles.3.cat": {
      type: "text",
      label: "Article 3 category",
      value: "Growth"
    },
    "articles.3.image": image("Article 3 image", "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80", "Health company growth strategy conversation"),
    "articles.3.title": {
      type: "text",
      label: "Article 3 title",
      value: "The 90-day plan we use to get a single-product health company to its first 1,000 patients"
    },
    "closer.title": {
      type: "text",
      label: "Closer title",
      value: "A clearer path, made together."
    },
    "closer.cta": {
      type: "text",
      label: "Closer CTA",
      value: "Book a discovery call"
    },
    "footer.tagline": {
      type: "text",
      label: "Footer tagline",
      value: "Healthcare consulting for clinics and single-product health companies."
    },
    "footer.col1.title": {
      type: "text",
      label: "Footer col 1 title",
      value: "Engagements"
    },
    "footer.col1.link1": {
      type: "text",
      label: "Footer col 1 link 1",
      value: "Diagnostic Sprint"
    },
    "footer.col1.link2": {
      type: "text",
      label: "Footer col 1 link 2",
      value: "Operating Partner"
    },
    "footer.col1.link3": {
      type: "text",
      label: "Footer col 1 link 3",
      value: "Strategic Retainer"
    },
    "footer.col1.link4": {
      type: "text",
      label: "Footer col 1 link 4",
      value: "Compliance review"
    },
    "footer.col2.title": {
      type: "text",
      label: "Footer col 2 title",
      value: "Company"
    },
    "footer.col2.link1": {
      type: "text",
      label: "Footer col 2 link 1",
      value: "Approach"
    },
    "footer.col2.link2": {
      type: "text",
      label: "Footer col 2 link 2",
      value: "Advisors"
    },
    "footer.col2.link3": {
      type: "text",
      label: "Footer col 2 link 3",
      value: "Press"
    },
    "footer.col2.link4": {
      type: "text",
      label: "Footer col 2 link 4",
      value: "Careers"
    },
    "footer.col3.title": {
      type: "text",
      label: "Footer col 3 title",
      value: "Resources"
    },
    "footer.col3.link1": {
      type: "text",
      label: "Footer col 3 link 1",
      value: "Field notes"
    },
    "footer.col3.link2": {
      type: "text",
      label: "Footer col 3 link 2",
      value: "Case studies"
    },
    "footer.col3.link3": {
      type: "text",
      label: "Footer col 3 link 3",
      value: "Compliance library"
    },
    "footer.col3.link4": {
      type: "text",
      label: "Footer col 3 link 4",
      value: "Contact"
    },
    "footer.news.title": {
      type: "text",
      label: "Footer news title",
      value: "Stay connected"
    },
    "footer.news.body": {
      type: "text",
      label: "Footer news body",
      value: "Field notes from inside small clinics — once a month, no fluff."
    },
    "footer.news.placeholder": {
      type: "text",
      label: "Footer news placeholder",
      value: "you@clinic.com"
    },
    "footer.news.cta": {
      type: "text",
      label: "Footer news CTA",
      value: "Subscribe"
    },
    "footer.copyright": {
      type: "text",
      label: "Footer copyright",
      value: "© 2026 Brightway Health Partners, LLC"
    },
    "footer.legal.terms": {
      type: "text",
      label: "Footer legal terms",
      value: "Terms"
    },
    "footer.legal.privacy": {
      type: "text",
      label: "Footer legal privacy",
      value: "Privacy"
    },
    "footer.legal.notice": {
      type: "text",
      label: "Footer legal notice",
      value: "Notice of Practices"
    },
    "footer.disclaimer": {
      type: "text",
      label: "Footer disclaimer",
      value: "Brightway Health Partners, LLC is a healthcare strategy and operations consulting firm. We do not provide medical care, diagnose conditions, or substitute for the judgment of a licensed clinician. Materials shared on this site are for informational purposes; engagement scopes, compliance support, and clinical advisory work are governed by individual statements of work."
    }
  },
  Component: BrightwayHealthTemplate
};