import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";

type StaggerProps = {
  children: ReactNode;
  /** Override the personality's `--m-stagger` for these children */
  step?: number | string;
  /** Optional starting index offset (useful when composing groups) */
  start?: number;
  /** Wrap in an element to give the group its own layout */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * Apply a sequential `--m-i` index to each immediate child so that any
 * descendant `<Reveal>` picks up a cascading delay via CSS:
 *   animation-delay: calc(var(--m-delay) + (var(--m-i) * var(--m-stagger)))
 *
 * SSR-safe (no client state). Pure React.Children mapping.
 */
export function Stagger({
  children,
  step,
  start = 0,
  as,
  className,
  style,
}: StaggerProps) {
  const items = Children.toArray(children).map((child, i) => {
    if (!isValidElement(child)) return child;
    const existing =
      (child.props as { style?: CSSProperties; "data-stagger-index"?: number })
        .style ?? {};
    const idx = start + i;
    const merged: CSSProperties = {
      ...existing,
      ["--m-i" as never]: idx,
      ...(step != null
        ? ({
            ["--m-stagger" as never]:
              typeof step === "number" ? `${step}ms` : step,
          } as CSSProperties)
        : {}),
    };
    return cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
      style: merged,
    });
  });

  if (as) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {items}
      </Tag>
    );
  }

  if (className || style) {
    return (
      <div className={className} style={style}>
        {items}
      </div>
    );
  }

  return <>{items}</>;
}
