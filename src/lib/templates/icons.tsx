import {
  Apple,
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Atom,
  BellOff,
  Bot,
  Building2,
  CalendarDays,
  Camera,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleDollarSign,
  CircleUserRound,
  Clock,
  Command,
  Compass,
  Cookie,
  Copyright,
  Diamond,
  Factory,
  Feather,
  FileDown,
  FileText,
  Flame,
  FlaskConical,
  GitCompareArrows,
  Globe,
  Heart,
  HelpCircle,
  HeartPulse,
  HousePlus,
  Inbox,
  Info,
  Key,
  Landmark,
  Laptop,
  LayoutGrid,
  LifeBuoy,
  List,
  Lock,
  Mail,
  MailCheck,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  MessageCircleHeart,
  MessageSquare,
  Mic,
  Minus,
  Monitor,
  Music2,
  NotebookText,
  Package,
  Phone,
  Play,
  Plus,
  Rabbit,
  Recycle,
  RadioTower,
  Refrigerator,
  RefreshCw,
  Rocket,
  ScrollText,
  Search,
  Send,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquareKanban,
  Star,
  Tags,
  TextCursorInput,
  TriangleAlert,
  Truck,
  University,
  UserCheck,
  Users,
  UtensilsCrossed,
  Vegan,
  Wine,
  Workflow,
  Wrench,
  X,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { forwardRef } from "react";

import type { TemplateIconValue } from "./types";

const Facebook = forwardRef<SVGSVGElement, LucideProps>(function Facebook(
  {
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  const resolvedStrokeWidth =
    absoluteStrokeWidth && typeof size === "number"
      ? (Number(strokeWidth) * 24) / size
      : strokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2z" />
    </svg>
  );
});

const Linkedin = forwardRef<SVGSVGElement, LucideProps>(function Linkedin(
  {
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  const resolvedStrokeWidth =
    absoluteStrokeWidth && typeof size === "number"
      ? (Number(strokeWidth) * 24) / size
      : strokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 11v5m0-8v.01M12 16v-5m4 5v-3a2 2 0 1 0-4 0" />
      <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
    </svg>
  );
});

const Instagram = forwardRef<SVGSVGElement, LucideProps>(function Instagram(
  {
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  const resolvedStrokeWidth =
    absoluteStrokeWidth && typeof size === "number"
      ? (Number(strokeWidth) * 24) / size
      : strokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0m7.5-4.5v.01" />
    </svg>
  );
});

const Youtube = forwardRef<SVGSVGElement, LucideProps>(function Youtube(
  {
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  const resolvedStrokeWidth =
    absoluteStrokeWidth && typeof size === "number"
      ? (Number(strokeWidth) * 24) / size
      : strokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
      <path d="m10 9l5 3l-5 3z" />
    </svg>
  );
});

const Pinterest = forwardRef<SVGSVGElement, LucideProps>(function Pinterest(
  {
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  const resolvedStrokeWidth =
    absoluteStrokeWidth && typeof size === "number"
      ? (Number(strokeWidth) * 24) / size
      : strokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m8 20l4-9m-1.3 3c.437 1.263 1.43 2 2.55 2c2.071 0 3.75-1.554 3.75-4a5 5 0 1 0-9.7 1.7" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
    </svg>
  );
});

const Paypal = forwardRef<SVGSVGElement, LucideProps>(function Paypal(
  {
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  const resolvedStrokeWidth =
    absoluteStrokeWidth && typeof size === "number"
      ? (Number(strokeWidth) * 24) / size
      : strokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 13h2.5c2.5 0 5-2.5 5-5c0-3-1.9-5-5-5H7c-.5 0-1 .5-1 1L4 18c0 .5.5 1 1 1h2.8L9 14c.1-.6.4-1 1-1m7.5-5.8C19.2 8.2 20 10 20 12c0 2.5-2.5 4.5-5 4.5h-2.6l-.6 3.6a1 1 0 0 1-1 .8H8.1a.5.5 0 0 1-.5-.6l.2-1.4" />
    </svg>
  );
});

const Tiktok = forwardRef<SVGSVGElement, LucideProps>(function Tiktok(
  {
    size = 24,
    ...props
  },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path
        fill="currentColor"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64a3 3 0 0 1 .88.13V9.4a7 7 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5 5 0 0 1-1-.1z"
      />
    </svg>
  );
});

const TwitterX = forwardRef<SVGSVGElement, LucideProps>(function TwitterX(
  {
    size = 24,
    ...props
  },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path
        fill="currentColor"
        d="M13.68 10.62L20.24 3h-1.55L13 9.62L8.45 3H3.19l6.88 10.01L3.19 21h1.55l6.01-6.99l4.8 6.99h5.24l-7.13-10.38Zm-2.13 2.47l-.7-1l-5.54-7.93H7.7l4.47 6.4l.7 1l5.82 8.32H16.3z"
      />
    </svg>
  );
});

const Visa = forwardRef<SVGSVGElement, LucideProps>(function Visa(
  {
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  },
  ref,
) {
  const resolvedStrokeWidth =
    absoluteStrokeWidth && typeof size === "number"
      ? (Number(strokeWidth) * 24) / size
      : strokeWidth;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m21 15l-1-6l-2.5 6M9 15l1-6M3 9h1v6h.5L7 9m9 .5a.5.5 0 0 0-.5-.5h-.75c-.721 0-1.337.521-1.455 1.233l-.09.534A1.06 1.06 0 0 0 14.25 12a1.06 1.06 0 0 1 1.045 1.233l-.09.534A1.476 1.476 0 0 1 13.75 15H13a.5.5 0 0 1-.5-.5M18 14h2.7" />
    </svg>
  );
});

const LUCIDE_ICONS: Record<string, LucideIcon> = {
  apple: Apple,
  "arrow-down": ArrowDown,
  "arrow-down-right": ArrowDownRight,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  asterisk: Asterisk,
  atom: Atom,
  "bell-off": BellOff,
  bot: Bot,
  "building-2": Building2,
  "calendar-days": CalendarDays,
  camera: Camera,
  "chart-no-axes-combined": ChartNoAxesCombined,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  circle: Circle,
  "circle-check": CircleCheck,
  "circle-dollar-sign": CircleDollarSign,
  "circle-user-round": CircleUserRound,
  clock: Clock,
  command: Command,
  compass: Compass,
  cookie: Cookie,
  copyright: Copyright,
  diamond: Diamond,
  facebook: Facebook,
  factory: Factory,
  feather: Feather,
  "file-down": FileDown,
  "file-text": FileText,
  flame: Flame,
  "flask-conical": FlaskConical,
  "git-compare-arrows": GitCompareArrows,
  globe: Globe,
  heart: Heart,
  "help-circle": HelpCircle,
  "heart-pulse": HeartPulse,
  "house-plus": HousePlus,
  inbox: Inbox,
  instagram: Instagram,
  info: Info,
  key: Key,
  landmark: Landmark,
  laptop: Laptop,
  "layout-grid": LayoutGrid,
  "life-buoy": LifeBuoy,
  list: List,
  linkedin: Linkedin,
  lock: Lock,
  mail: Mail,
  "mail-check": MailCheck,
  "map-pin": MapPin,
  megaphone: Megaphone,
  menu: Menu,
  "message-circle": MessageCircle,
  "message-circle-heart": MessageCircleHeart,
  "message-square": MessageSquare,
  mic: Mic,
  minus: Minus,
  monitor: Monitor,
  "music-2": Music2,
  "notebook-text": NotebookText,
  package: Package,
  paypal: Paypal,
  phone: Phone,
  pinterest: Pinterest,
  play: Play,
  plus: Plus,
  rabbit: Rabbit,
  recycle: Recycle,
  "radio-tower": RadioTower,
  refrigerator: Refrigerator,
  "refresh-cw": RefreshCw,
  rocket: Rocket,
  "scroll-text": ScrollText,
  search: Search,
  send: Send,
  shield: Shield,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  "shopping-basket": ShoppingBasket,
  "sliders-horizontal": SlidersHorizontal,
  smartphone: Smartphone,
  sparkles: Sparkles,
  "square-kanban": SquareKanban,
  star: Star,
  tags: Tags,
  "text-cursor-input": TextCursorInput,
  tiktok: Tiktok,
  "triangle-alert": TriangleAlert,
  truck: Truck,
  "twitter-x": TwitterX,
  university: University,
  "user-check": UserCheck,
  users: Users,
  "utensils-crossed": UtensilsCrossed,
  vegan: Vegan,
  visa: Visa,
  wine: Wine,
  workflow: Workflow,
  wrench: Wrench,
  x: X,
  youtube: Youtube,
  zap: Zap,
};

const LOCAL_ICON_FAMILIES: Record<string, ReadonlySet<string>> = {
  lucide: new Set(Object.keys(LUCIDE_ICONS)),
};

/**
 * Sorted list of lucide icon names we actually render in templates.
 * Used to constrain the LLM (it picks from this whitelist instead of
 * hallucinating an icon name that resolves to nothing on the client).
 *
 * Returned as bare names (e.g. `"arrow-right"`) — callers can prefix
 * with `"lucide:"` to form a TemplateIconValue.
 */
export function listAvailableLucideIconNames(): readonly string[] {
  return Object.keys(LUCIDE_ICONS).sort();
}

export type ParsedTemplateIconValue = {
  family: string;
  name: string;
};

export function parseTemplateIconValue(
  value: string,
): ParsedTemplateIconValue | null {
  const separatorIndex = value.indexOf(":");

  if (separatorIndex <= 0 || separatorIndex === value.length - 1) {
    return null;
  }

  return {
    family: value.slice(0, separatorIndex),
    name: value.slice(separatorIndex + 1),
  };
}

export function isTemplateIconAvailable(value: string): boolean {
  const parsed = parseTemplateIconValue(value);

  if (!parsed) {
    return false;
  }

  return LOCAL_ICON_FAMILIES[parsed.family]?.has(parsed.name) ?? false;
}

type TemplateIconProps = Omit<LucideProps, "children" | "ref"> & {
  icon: TemplateIconValue;
  title?: string;
};

export function TemplateIcon({
  icon,
  title,
  size = 24,
  strokeWidth = 1.6,
  ...props
}: TemplateIconProps) {
  const parsed = parseTemplateIconValue(icon);
  const Icon =
    parsed?.family === "lucide" ? LUCIDE_ICONS[parsed.name] : undefined;

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      aria-hidden={title ? undefined : true}
      aria-label={title}
      role={title ? "img" : undefined}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
