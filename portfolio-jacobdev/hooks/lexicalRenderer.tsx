import React, {ReactNode} from "react";
import Image from 'next/image'

/* Format bit flags */
const FORMAT = {
    BOLD: 1,
    ITALIC: 2,
    UNDERLINE: 4,
    STRIKETHROUGH: 8,
    CODE: 16,
    SUBSCRIPT: 32,
    SUPERSCRIPT: 64,
    HIGHLIGHT: 128,
} as const;

type ClassMap = {
    inline?: Partial<Record<string, string>>;
    block?: Partial<Record<string, string>>;
    containerClass?: string;
};

type RenderOptions = {
    classMap?: ClassMap;
    allowInlineStyles?: boolean;
    context?: "list" | "detail";
    mode?: "block" | "inline"; // <-- add this
};

/* =============
   Dark-theme defaults (Tailwind + shadcn-friendly)
   - container: black bg, white text, use `prose-invert` for typography colors
   - code blocks / inline code: dark slate background, light text
   - links: bright, visible on dark
   - blockquote: muted border + lighter text
   ============= */
const DEFAULT_INLINE_CLASS_MAP = {
    base: "inline",
    bold: "font-semibold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    // inline code: dark background, monospace, slightly padded
    code: "font-mono text-sm px-1 rounded-sm bg-slate-800 text-white",
    // highlight (use a warm highlight with dark-foreground text)
    highlight: "bg-yellow-300 text-black px-0.5 rounded-sm",
    subscript: "align-sub text-xs",
    superscript: "align-super text-xs",
};

const DEFAULT_BLOCK_CLASS_MAP = {
    // container uses prose-invert so typography colors (links, headings etc) invert for dark backgrounds
    root: "prose max-w-none prose-invert text-white p-6 rounded-lg",
    paragraph: "leading-7 [&:not(:first-child)]:mt-6",
    h1: "scroll-m-20 text-4xl font-extrabold",
    h2: "scroll-m-20 text-3xl font-bold",
    h3: "scroll-m-20 text-2xl font-semibold",
    h4: "scroll-m-20 text-xl font-semibold",
    blockquote: "border-l-2 border-slate-700 pl-4 italic text-slate-300",
    ul: "list-disc pl-6 [&>li]:mt-2",
    ol: "list-decimal pl-6 [&>li]:mt-2",
    listitem: "mt-2",
    // code block: darker slate background, white text, rounded
    pre: "rounded bg-slate-900 p-3 overflow-auto",
    code: "font-mono text-sm text-white",
    // links: visible and slightly bright in dark mode
    link: "text-sky-400 underline hover:text-sky-300",
    // images: keep rounded and ensure they don't overflow
    image: "max-w-full rounded",
};

/* utility to join classes */
function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/* format check */
function hasFormat(formatMask: number | undefined, flag: number) {
    if (formatMask === undefined || formatMask === null) return false;
    return (formatMask & flag) === flag;
}

/* Whitelist maps for style -> Tailwind (include common dark friendly colors) */
const COLOR_CLASS_MAP: Record<string, string> = {
    black: "text-black",
    white: "text-white",
    red: "text-red-400",
    blue: "text-sky-400",
    green: "text-green-400",
    yellow: "text-yellow-300",
    gray: "text-slate-400",
    slate: "text-slate-400",
    // hex shortcuts
    "#000": "text-black",
    "#000000": "text-black",
    "#fff": "text-white",
    "#ffffff": "text-white",
    // add more as needed
};

function normalizeColor(val: string) {
    return String(val).trim().toLowerCase();
}

function mapFontSizeToTailwind(size: string | number) {
    const px = typeof size === "number" ? size : parseInt(String(size).replace("px", ""), 10);
    if (isNaN(px)) return undefined;
    if (px <= 12) return "text-xs";
    if (px <= 14) return "text-sm";
    if (px <= 16) return "text-base";
    if (px <= 18) return "text-lg";
    if (px <= 20) return "text-xl";
    if (px <= 24) return "text-2xl";
    return "text-3xl";
}

function mapFontWeightToTailwind(weight: string | number) {
    const w = typeof weight === "number" ? weight : parseInt(String(weight), 10);
    if (!isNaN(w)) {
        if (w >= 800) return "font-extrabold";
        if (w >= 700) return "font-bold";
        if (w >= 600) return "font-semibold";
        if (w >= 500) return "font-medium";
        if (w >= 400) return "font-normal";
    } else {
        const lw = String(weight).toLowerCase();
        if (lw === "bold") return "font-bold";
        if (lw === "semibold") return "font-semibold";
    }
    return undefined;
}

/* Map inline style object (from Lexical) into Tailwind classes + optional sanitized inline style */
function mapInlineStylesToTailwind(style: any, allowInlineStyles = false) {
    if (!style || typeof style !== "object") return {classes: [], inlineStyle: undefined};
    const classes: string[] = [];
    const inlineStyle: Record<string, string> = {};

    if (style.color) {
        const n = normalizeColor(style.color);
        const mapped = COLOR_CLASS_MAP[n];
        if (mapped) classes.push(mapped);
        else if (allowInlineStyles) inlineStyle.color = style.color;
    }

    if (style.backgroundColor) {
        const n = normalizeColor(style.backgroundColor);
        if (n in COLOR_CLASS_MAP) classes.push(COLOR_CLASS_MAP[n].replace(/^text-/, "bg-"));
        else if (allowInlineStyles) inlineStyle.backgroundColor = style.backgroundColor;
    }

    if (style.fontSize) {
        const mapped = mapFontSizeToTailwind(style.fontSize);
        if (mapped) classes.push(mapped);
        else if (allowInlineStyles) inlineStyle.fontSize = typeof style.fontSize === "number" ? `${style.fontSize}px` : style.fontSize;
    }

    if (style.fontWeight) {
        const mapped = mapFontWeightToTailwind(style.fontWeight);
        if (mapped) classes.push(mapped);
        else if (allowInlineStyles) inlineStyle.fontWeight = String(style.fontWeight);
    }

    if (style.textDecoration) {
        const td = String(style.textDecoration).toLowerCase();
        if (td.includes("underline")) classes.push("underline");
        if (td.includes("line-through") || td.includes("strike")) classes.push("line-through");
    }

    if (allowInlineStyles) {
        const safeProps = ["letterSpacing", "lineHeight", "textTransform"];
        for (const p of safeProps) {
            if (style[p]) inlineStyle[p as any] = String(style[p]);
        }
    }

    return {classes, inlineStyle: Object.keys(inlineStyle).length ? inlineStyle : undefined};
}

/* Render text with formats and mapped styles (server-safe) */
function renderTextWithFormatServer(
    text: string,
    formatMask?: number,
    key?: string | number,
    inlineMap = DEFAULT_INLINE_CLASS_MAP,
    nodeStyle?: any,
    allowInlineStyles = false
): ReactNode {
    const baseClass = inlineMap.base ?? "";
    const classes = [baseClass];
    if (hasFormat(formatMask, FORMAT.BOLD)) classes.push(inlineMap.bold);
    if (hasFormat(formatMask, FORMAT.ITALIC)) classes.push(inlineMap.italic);
    if (hasFormat(formatMask, FORMAT.UNDERLINE)) classes.push(inlineMap.underline);
    if (hasFormat(formatMask, FORMAT.STRIKETHROUGH)) classes.push(inlineMap.strikethrough);
    if (hasFormat(formatMask, FORMAT.CODE)) classes.push(inlineMap.code);
    if (hasFormat(formatMask, FORMAT.HIGHLIGHT)) classes.push(inlineMap.highlight);
    if (hasFormat(formatMask, FORMAT.SUBSCRIPT)) classes.push(inlineMap.subscript);
    if (hasFormat(formatMask, FORMAT.SUPERSCRIPT)) classes.push(inlineMap.superscript);

    const mapped = mapInlineStylesToTailwind(nodeStyle, allowInlineStyles);
    if (mapped.classes.length) classes.push(...mapped.classes);
    const className = cn(...classes);

    const elementProps: any = {};
    if (mapped.inlineStyle) elementProps.style = mapped.inlineStyle;

    if (hasFormat(formatMask, FORMAT.CODE)) {
        return (
            <code key={key} className={className} {...elementProps}>
                {text}
            </code>
        );
    }
    return (
        <span key={key} className={className} {...elementProps}>
      {text}
    </span>
    );
}

// keep currently selected options for nested calls
let optionsRef: RenderOptions | undefined;


/* Server recursive node renderer */
function renderLexicalNodeServer(node: any, key?: string | number, inlineMap?: any, blockMap?: any, allowInlineStyles = false, context: "list" | "detail" = "detail"): ReactNode {
    if (!node) return null;
    const k = String(key ?? Math.random().toString(36).slice(2, 9));
    inlineMap = inlineMap ?? DEFAULT_INLINE_CLASS_MAP;
    blockMap = blockMap ?? DEFAULT_BLOCK_CLASS_MAP;

    if (node.type === "text" || node.tag === "text") {
        const text = node?.text ?? node?.value ?? "";
        const formatMask = node?.format;
        const style = node?.style ?? node?.attributes?.style;
        return renderTextWithFormatServer(String(text), formatMask, k, inlineMap, style, allowInlineStyles);
    }

    if (node.type === "linebreak") {
        return <br key={k}/>;
    }

    if (node.type === "heading" || (typeof node.tag === "string" && node.tag.startsWith("h"))) {
        const tag = (node.tag ?? "h3") as string;
        const children = (node.children || []).map((c: any, i: number) => renderLexicalNodeServer(c, `${k}-c${i}`, inlineMap, blockMap, allowInlineStyles, context));
        const cls = blockMap[tag] ?? blockMap.h3;
        switch (tag) {
            case "h1":
                return <h1 key={k} className={cls}>{children}</h1>;
            case "h2":
                return <h2 key={k} className={cls}>{children}</h2>;
            case "h3":
                return <h3 key={k} className={cls}>{children}</h3>;
            case "h4":
                return <h4 key={k} className={cls}>{children}</h4>;
            default:
                return <h3 key={k} className={cls}>{children}</h3>;
        }
    }

    if (node.type === "paragraph" || node.tag === "p" || node.type === "root-container") {
        const children = (node.children || []).map((c: any, i: number) =>
            renderLexicalNodeServer(c, `${k}-p${i}`, inlineMap, blockMap, allowInlineStyles, context)
        );

        // For inline mode: render children and add a <br/> after non-empty paragraph
        if ((optionsRef as any)?.mode === "inline") {
            const hadContent = children.some(Boolean);
            return (
                <React.Fragment key={k}>
                    {children}
                    {hadContent ? <br/> : null}
                </React.Fragment>
            );
        }

        // Default block mode
        return <p key={k} className={blockMap.paragraph}>{children}</p>;
    }


    if (node.type === "blockquote" || node.tag === "blockquote") {
        const children = (node.children || []).map((c: any, i: number) => renderLexicalNodeServer(c, `${k}-bq${i}`, inlineMap, blockMap, allowInlineStyles));
        return <blockquote key={k} className={blockMap.blockquote}>{children}</blockquote>;
    }

    if (node.type === "list" || node.tag === "ul" || node.tag === "ol") {
        const isOrdered = (node.listType && node.listType !== "bullet") || node.tag === "ol";
        const children = (node.children || []).map((li: any, i: number) => renderLexicalNodeServer(li, `${k}-li${i}`, inlineMap, blockMap, allowInlineStyles));
        return isOrdered ? <ol key={k} className={blockMap.ol}>{children}</ol> :
            <ul key={k} className={blockMap.ul}>{children}</ul>;
    }

    if (node.type === "listitem") {
        const children = (node.children || []).map((c: any, i: number) => renderLexicalNodeServer(c, `${k}-li-c${i}`, inlineMap, blockMap, allowInlineStyles));
        return <li key={k} className={blockMap.listitem}>{children}</li>;
    }

    if (node.type === "code" || node.tag === "code") {
        const codeText = (node.children || []).map((c: any) => c?.text ?? "").join("");
        return (
            <pre key={k} className={blockMap.pre}>
        <code className={blockMap.code}>{codeText}</code>
      </pre>
        );
    }

    if (node.type === "image" || node.tag === "img" || node.tag === "figure") {
        const src = node?.src ?? node?.attributes?.src ?? node?.url;
        const alt = node?.alt ?? "";
        if (!src) return null;
        return <img key={k} src={src} alt={alt} className={blockMap.image}/>;
    }

    if (node.type === "link" || node.tag === "a") {
        const url = node?.url ?? node?.href ?? node?.attributes?.url;
        const children = (node.children || []).map((c: any, i: number) => renderLexicalNodeServer(c, `${k}-a${i}`, inlineMap, blockMap, allowInlineStyles));
        return (
            <a key={k} href={url} target="_blank" rel="noopener noreferrer" className={blockMap.link}>
                {children}
            </a>
        );
    }

    if (node.type === "image" || node.tag === "img" || node.tag === "figure") {
        // Accept node being the image object or nested shapes
        const imgObj = node?.attributes?.image ?? node?.image ?? node?.value ?? node ?? {};

        const pick = (o: any, path: string[]) => {
            let cur = o;
            for (const p of path) {
                if (!cur) return undefined;
                cur = cur[p];
            }
            return cur;
        };

        // payload sizes object (common shape)
        const sizesObj = imgObj.sizes ?? pick(imgObj, ["thumbnail", "sizes"]) ?? {};
        const thumbnail = sizesObj.thumbnail ?? null;
        const small = sizesObj.small ?? null;
        const medium = sizesObj.medium ?? null;
        const square = sizesObj.square ?? null;
        const og = sizesObj.og ?? null;

        // choose candidate order based on context
        const candidateOrder =
            context === "list"
                ? [thumbnail, small, square, medium, og]
                : [medium, og, largeIfExists(sizesObj), small, thumbnail];

        // helper to pick the first available candidate
        const candidates = candidateOrder.filter(Boolean);
        const best = candidates[0] ?? null;

        const fallbackUrl = imgObj?.url ?? imgObj?.thumbnailURL ?? imgObj?.src ?? null;
        let src = best?.url ?? fallbackUrl;
        let width = best?.width ?? imgObj?.width ?? 100;
        let height = best?.height ?? imgObj?.height ?? 100;
        const alt = imgObj?.alt ?? imgObj?.caption ?? "";

        if (!src) return null;

        // If src is relative, prefix with server base
        if (typeof src === "string" && src.startsWith("/")) {
            const payloadUrl = process.env.PAYLOAD_URL ?? "";
            if (payloadUrl) {
                const base = payloadUrl.replace(/\/+$/, "");
                src = base + src;
            }
        }

        // sizes attribute tuned to context
        const sizesAttr = context === "list" ? "(max-width: 768px) 100vw, 300px" : "(max-width: 768px) 100vw, 800px";

        // priority: detail pages may want priority lazy behavour
        const priority = context === "detail";

        // Optional: wrap with fixed aspect-ratio container for consistent grid cards.
        if (context === "list") {
            // smaller thumb for lists — show consistent aspect with aspect-[4/3] or similar
            return (
                <div key={k} className={cn("relative w-full overflow-hidden rounded", blockMap.image)}>
                    <Image src={src} alt={alt} width={width} height={height} sizes={sizesAttr} quality={75}
                           priority={false} className="object-cover w-full h-auto"/>
                </div>
            );
        } else {
            // detail page: larger image, priority true optionally
            return (
                <Image
                    key={k}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={blockMap.image}
                    sizes={sizesAttr}
                    quality={80}
                    priority={priority}
                />
            );
        }
    }

// helper (small) to attempt "large" if present
    function largeIfExists(sizesObj: any) {
        if (!sizesObj) return undefined;
        return sizesObj.large ?? sizesObj.xlarge ?? undefined;
    }

    if (Array.isArray(node.children)) {
        const children = node.children.map((c: any, i: number) => renderLexicalNodeServer(c, `${k}-g${i}`, inlineMap, blockMap, allowInlineStyles));
        return <div key={k}>{children}</div>;
    }

    if (typeof node.text === "string") return <span key={k}>{node.text}</span>;
    return null;
}


export function renderLexicalRoot(root: any, options?: RenderOptions): React.ReactNode {
  const opts = options ?? {};
  const context = opts.context ?? "detail";
  const blockMap = { ...DEFAULT_BLOCK_CLASS_MAP, ...(opts.classMap?.block ?? {}) };
  const inlineMap = { ...DEFAULT_INLINE_CLASS_MAP, ...(opts.classMap?.inline ?? {}) };
  const containerClass =
    opts.mode === "inline"
      ? "" // no container in inline mode
      : opts.classMap?.containerClass ?? DEFAULT_BLOCK_CLASS_MAP.root;

  if (!root) return null;

  // expose opts to node renderer (for inline paragraph behavior)
  optionsRef = opts;

  const childrenArr = Array.isArray(root.children) ? root.children : root.children || [];
  const renderedChildren = childrenArr.map((n: any, i: number) =>
    renderLexicalNodeServer(n, `r-${i}`, inlineMap, blockMap, opts.allowInlineStyles ?? false, context)
  );

  if (opts.mode === "inline") {
    // Trim trailing <br/> if any
    const trimmed = [...renderedChildren];
    while (
      trimmed.length &&
      React.isValidElement(trimmed[trimmed.length - 1]) &&
      (trimmed[trimmed.length - 1] as any).type === "br"
    ) {
      trimmed.pop();
    }
    return <>{trimmed}</>;
  }

  return <div className={containerClass}>{renderedChildren}</div>;
}


