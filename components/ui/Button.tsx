import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsLink = Common & {
  href: string;
  target?: "_blank";
  rel?: string;
  "aria-label"?: string;
};

type ButtonAsButton = Common & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const className = `btn btn-${props.variant ?? "primary"}${props.className ? ` ${props.className}` : ""}`;

  if ("href" in props && typeof props.href === "string") {
    const external = props.href.startsWith("http");
    if (external) {
      return (
        <a className={className} href={props.href} target={props.target} rel={props.rel} aria-label={props["aria-label"]}>
          {props.children}
        </a>
      );
    }
    return (
      <Link className={className} href={props.href} aria-label={props["aria-label"]}>
        {props.children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      className={className}
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      aria-label={buttonProps["aria-label"]}
    >
      {buttonProps.children}
    </button>
  );
}
