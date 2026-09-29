import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";
import "./ModelPicker.css";

export type IconProps = SVGProps<SVGSVGElement>;

/* ---------- Brand marks ---------- */

export function OpenAIIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 256 260" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/>
    </svg>
  );
}

export function ClaudeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 256 257" fill="#D97757" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/>
    </svg>
  );
}

/* Gemini spark: the original stacks blurred radial gradients per-color, which needs
   a per-instance filter id and doesn't survive small exports anyway. We approximate by
   masking the 4-petal star and painting one solid quadrant per brand color underneath —
   at 16px it reads as the same 4-tone spark. */
export function GeminiIcon(props: IconProps) {
  const rawId = useId();
  const mid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id={`mpgem-${mid}`}>
        <rect width="24" height="24" fill="black"/>
        <path
          d="M12 1.2c.6 4.6 4.2 8.2 8.8 8.8 -4.6.6 -8.2 4.2 -8.8 8.8 -.6 -4.6 -4.2 -8.2 -8.8 -8.8 4.6 -.6 8.2 -4.2 8.8 -8.8Z"
          fill="white"
        />
      </mask>
      <g mask={`url(#mpgem-${mid})`}>
        <rect x="0"  y="0"  width="12" height="12" fill="#3689FF"/>
        <rect x="12" y="0"  width="12" height="12" fill="#FA4340"/>
        <rect x="0"  y="12" width="12" height="12" fill="#14BB69"/>
        <rect x="12" y="12" width="12" height="12" fill="#F6C013"/>
      </g>
    </svg>
  );
}

export function GrokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M395.479 633.828 735.91 381.105c16.689-12.39 40.544-7.557 48.496 11.687 41.854 101.493 23.155 223.461-60.118 307.204-83.272 83.743-199.137 102.108-305.041 60.281l-115.691 53.866c165.934 114.059 367.431 85.852 493.345-40.861 99.875-100.439 130.807-237.345 101.884-360.806l.262.263c-41.942-181.369 10.311-253.865 117.353-402.107 2.53-3.515 5.07-7.03 7.6-10.632L883.144 141.651v-.439L395.392 633.916"/>
      <path d="M325.226 695.251C206.128 580.84 226.662 403.776 328.285 301.668c75.146-75.571 198.264-106.414 305.741-61.072l115.428-53.602c-20.797-15.114-47.448-31.371-78.03-42.794-138.234-57.206-303.731-28.735-416.101 84.182C147.234 337.081 113.244 504.215 171.613 646.833c43.603 106.59-27.874 181.985-99.875 258.083C46.224 931.893 20.622 958.87 0 987.429l325.139-292.09"/>
    </svg>
  );
}

/* ---------- Small utility icons (hand-rolled instead of pulling lucide-react) ---------- */

/* Phosphor Brain (filled) — the studio asset. currentColor lets the chip accent through. */
function IconBrain(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"/>
    </svg>
  );
}
/* Phosphor ImageSquare (filled) — the studio asset. */
function IconImage(props: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208v77.38l-24.69-24.7a16,16,0,0,0-22.62,0L53.37,208H48ZM208,208H76l96-96,36,36v60ZM96,120A24,24,0,1,0,72,96,24,24,0,0,0,96,120Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,96,88Z"/>
    </svg>
  );
}
function IconSearch(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7"/>
      <path d="m20 20-3.5-3.5"/>
    </svg>
  );
}
function IconX(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}
function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 12 5 5 9-11"/>
    </svg>
  );
}
function IconChevron(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

/* ---------- Types ---------- */

export type ModelCapability = "reasoning" | "image";
export type ThinkingEffort = "none" | "low" | "medium" | "high" | "max";

export type ModelPickerModel = {
  id: string;
  name: string;
  description?: string;
  available?: boolean;
  capabilities?: readonly ModelCapability[];
  thinking?: readonly ThinkingEffort[];
  defaultThinking?: ThinkingEffort;
};

export type ModelPickerProvider = {
  id: string;
  name: string;
  icon?: ReactNode;
  models: ModelPickerModel[];
};

export type ModelPickerProps = {
  providers: readonly ModelPickerProvider[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (modelId: string, providerId: string, thinking?: ThinkingEffort) => void;
  thinking?: ThinkingEffort;
  defaultThinking?: ThinkingEffort;
  closeOnSelect?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
};

const CAPABILITY_LABEL: Record<ModelCapability, string> = { reasoning: "Reasoning", image: "Image" };
const THINKING_LABEL: Record<ThinkingEffort, string> = {
  none: "Off", low: "Low", medium: "Medium", high: "High", max: "Max",
};

const FULL_THINKING = ["low", "medium", "high", "max"] as const;
const FLASH_THINKING = ["none", "low", "medium"] as const;

export const defaultModelProviders: readonly ModelPickerProvider[] = [
  {
    id: "openai", name: "OpenAI",
    models: [
      { id: "gpt-5.6-sol", name: "GPT-5.6 Sol", description: "Flagship depth for hard problems", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "medium" },
      { id: "gpt-5.6-terra", name: "GPT-5.6 Terra", description: "Balanced speed and reasoning", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "medium" },
      { id: "gpt-5.6-luna", name: "GPT-5.6 Luna", description: "Fast replies for light work", capabilities: ["image"], thinking: FLASH_THINKING, defaultThinking: "low" },
      { id: "gpt-5.5", name: "GPT-5.5", description: "Previous generation, still dependable", capabilities: ["reasoning", "image"], thinking: ["low", "medium", "high"], defaultThinking: "medium" },
    ],
  },
  {
    id: "anthropic", name: "Anthropic",
    models: [
      { id: "claude-opus-5", name: "Claude Opus 5", description: "Deepest reasoning, long context", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "high" },
      { id: "claude-sonnet-5", name: "Claude Sonnet 5", description: "Agentic coding and tool use", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "medium" },
      { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", description: "Quick drafts at low cost", capabilities: ["image"] },
    ],
  },
  {
    id: "xai", name: "xAI",
    models: [
      { id: "grok-4.6", name: "Grok 4.6", description: "Flagship with live search", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "high" },
      { id: "grok-4.20", name: "Grok 4.20", description: "Extended reasoning for tough prompts", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "high" },
      { id: "grok-4.5", name: "Grok 4.5", description: "Previous generation, broad knowledge", capabilities: ["reasoning", "image"], thinking: ["low", "medium", "high"], defaultThinking: "medium" },
    ],
  },
  {
    id: "google", name: "Google",
    models: [
      { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash", description: "Fast multimodal all rounder", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "medium" },
      { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro", description: "Deep think for hard analysis", capabilities: ["reasoning", "image"], thinking: FULL_THINKING, defaultThinking: "high" },
      { id: "gemini-3.1-flash-image", name: "Gemini 3.1 Flash Image", description: "Image generation and editing", capabilities: ["image"] },
    ],
  },
];

/* ---------- Helpers ---------- */

const isAvailable = (m: ModelPickerModel) => m.available !== false;
const visibleModels = (p: ModelPickerProvider) => p.models.filter(isAvailable);
const visibleProviders = (list: readonly ModelPickerProvider[]) =>
  list.filter((p) => visibleModels(p).length > 0);

function findModel(providers: readonly ModelPickerProvider[], id: string | undefined) {
  if (!id) return undefined;
  for (const p of providers) {
    const m = p.models.find((x) => x.id === id);
    if (m) return { provider: p, model: m };
  }
  return undefined;
}

function matchesQuery(m: ModelPickerModel, p: ModelPickerProvider, q: string) {
  return [m.name, m.id, m.description ?? "", p.name].some((f) => f.toLowerCase().includes(q));
}

function ProviderGlyph({ provider }: { provider: ModelPickerProvider }) {
  if (provider.icon) return <span className="mp-glyph">{provider.icon}</span>;
  if (provider.id === "openai") return <OpenAIIcon className="mp-glyph" aria-hidden="true" />;
  if (provider.id === "anthropic") return <ClaudeIcon className="mp-glyph" aria-hidden="true" />;
  if (provider.id === "google") return <GeminiIcon className="mp-glyph" aria-hidden="true" />;
  if (provider.id === "xai") return <GrokIcon className="mp-glyph" aria-hidden="true" />;
  return <span className="mp-glyph mp-glyph-fallback">{provider.name.charAt(0)}</span>;
}

/* Stepped bars: fill up to the current effort, blank ones stay flat gray. Decorative. */
function EffortMeter({ levels, filled }: { levels: readonly ThinkingEffort[]; filled: number }) {
  return (
    <span className="mp-meter" aria-hidden="true">
      {levels.map((eff, i) => (
        <span
          key={eff}
          className={"mp-meter-bar" + (i < filled ? " mp-meter-bar-on" : "")}
          style={{ height: `${5 + i * 2.5}px` }}
        />
      ))}
    </span>
  );
}

/* ---------- Component ---------- */

export function ModelPicker({
  providers,
  value,
  defaultValue,
  onValueChange,
  thinking,
  defaultThinking,
  closeOnSelect = false,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Select a model",
}: ModelPickerProps) {
  const listId = useId();
  const rails = useMemo(() => visibleProviders(providers), [providers]);

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedId = value ?? internalValue;
  const isOpen = open ?? internalOpen;
  const selected = findModel(providers, selectedId);

  const [internalThinking, setInternalThinking] = useState<ThinkingEffort | undefined>(
    defaultThinking ?? selected?.model.defaultThinking,
  );
  const selectedThinking = thinking ?? internalThinking;

  const [activeProviderId, setActiveProviderId] = useState(
    () => selected?.provider.id ?? rails[0]?.id ?? "",
  );
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const searching = search.length > 0;

  const activeProvider = rails.find((p) => p.id === activeProviderId) ?? rails[0];

  const rows = useMemo(() => {
    if (searching) {
      return rails.flatMap((p) =>
        visibleModels(p).filter((m) => matchesQuery(m, p, search)).map((m) => ({ provider: p, model: m })),
      );
    }
    if (!activeProvider) return [];
    return visibleModels(activeProvider).map((m) => ({ provider: activeProvider, model: m }));
  }, [activeProvider, rails, search, searching]);

  const rootRef = useRef<HTMLDivElement>(null);

  /* Click-outside close. Only wired when the popover is open — cheaper than adding at mount. */
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setInternalOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen, onOpenChange]);

  const changeOpen = useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
      if (next) {
        setQuery("");
        const owner = findModel(providers, selectedId)?.provider.id;
        if (owner) setActiveProviderId(owner);
      }
    },
    [onOpenChange, providers, selectedId],
  );

  const selectModel = useCallback(
    (modelId: string, providerId: string) => {
      const found = findModel(providers, modelId)?.model;
      const effort = found?.defaultThinking ?? found?.thinking?.[0];
      setInternalValue(modelId);
      setInternalThinking(effort);
      onValueChange?.(modelId, providerId, effort);
      if (closeOnSelect) changeOpen(false);
    },
    [changeOpen, closeOnSelect, onValueChange, providers],
  );

  const selectThinking = useCallback(
    (effort: ThinkingEffort) => {
      setInternalThinking(effort);
      if (selected) onValueChange?.(selected.model.id, selected.provider.id, effort);
    },
    [onValueChange, selected],
  );

  const thinkingLevels = selected?.model.thinking;
  const effortIndex = thinkingLevels && selectedThinking ? thinkingLevels.indexOf(selectedThinking) : -1;
  const filledSteps =
    !thinkingLevels || selectedThinking === "none" || effortIndex < 0 ? 0 : effortIndex + 1;
  const thinkingLabel =
    thinkingLevels && selectedThinking && selectedThinking !== "none" ? THINKING_LABEL[selectedThinking] : null;
  const triggerLabel = selected?.model.name ?? placeholder;

  const footerLevels = thinkingLevels ?? FULL_THINKING;
  const footerActive = thinkingLevels
    ? Math.max(0, thinkingLevels.indexOf(selectedThinking ?? thinkingLevels[0]))
    : -1;

  return (
    <div className="mp-root" ref={rootRef}>
      <button
        type="button"
        className={"mp-trigger" + (isOpen ? " mp-trigger-open" : "")}
        aria-label={triggerLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => changeOpen(!isOpen)}
      >
        {selected ? (
          <span className="mp-trigger-icon"><ProviderGlyph provider={selected.provider} /></span>
        ) : null}
        <span className="mp-trigger-label" translate="no">{triggerLabel}</span>
        {thinkingLabel ? (
          <span className="mp-trigger-effort">
            <EffortMeter levels={thinkingLevels ?? []} filled={filledSteps} />
          </span>
        ) : null}
        <IconChevron className={"mp-chevron" + (isOpen ? " mp-chevron-open" : "")} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="mp-panel" role="dialog" aria-label="Model picker">
          {rails.length === 0 || !activeProvider ? (
            <p className="mp-empty">No models available</p>
          ) : (
            <>
              <div className="mp-body">
                <div className="mp-rail" role="tablist" aria-label="Providers" aria-orientation="vertical">
                  {rails.map((provider) => {
                    const on = provider.id === activeProvider.id && !searching;
                    return (
                      <button
                        key={provider.id}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        aria-controls={listId}
                        aria-label={provider.name}
                        className={"mp-rail-btn" + (on ? " mp-rail-btn-on" : "")}
                        onClick={() => { setQuery(""); setActiveProviderId(provider.id); }}
                      >
                        <ProviderGlyph provider={provider} />
                      </button>
                    );
                  })}
                </div>

                <div className="mp-col">
                  <div className="mp-search">
                    <IconSearch className="mp-search-icon" aria-hidden="true" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search models"
                      aria-label="Search models"
                      aria-controls={listId}
                      autoComplete="off"
                      spellCheck={false}
                      className="mp-search-input"
                    />
                    {query ? (
                      <button
                        type="button"
                        aria-label="Clear search"
                        className="mp-search-clear"
                        onClick={() => setQuery("")}
                      >
                        <IconX aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>

                  <div className="mp-list-wrap">
                    <p className="mp-list-title" translate="no">
                      {searching
                        ? `${rows.length} ${rows.length === 1 ? "result" : "results"}`
                        : activeProvider.name}
                    </p>
                    <div
                      role="listbox"
                      id={listId}
                      aria-label={searching ? "Search results" : `${activeProvider.name} models`}
                      className="mp-list"
                    >
                      {rows.length === 0 ? (
                        <p className="mp-list-empty">{`No models match "${query.trim()}"`}</p>
                      ) : null}
                      {rows.map(({ provider, model }) => {
                        const isSelected = model.id === selectedId;
                        return (
                          <div
                            key={model.id}
                            role="option"
                            aria-selected={isSelected}
                            tabIndex={0}
                            onClick={() => selectModel(model.id, provider.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                selectModel(model.id, provider.id);
                              }
                            }}
                            className={"mp-row" + (isSelected ? " mp-row-on" : "")}
                          >
                            {searching ? (
                              <span className="mp-row-provider"><ProviderGlyph provider={provider} /></span>
                            ) : null}
                            <span className="mp-row-text">
                              <span className="mp-row-title">
                                <span className="mp-row-name" translate="no">{model.name}</span>
                                {isSelected ? <IconCheck className="mp-row-check" aria-hidden="true" /> : null}
                              </span>
                              {model.description ? (
                                <span className="mp-row-desc">{model.description}</span>
                              ) : null}
                            </span>
                            {model.capabilities?.length ? (
                              <span className="mp-caps">
                                {model.capabilities.map((cap, i) => (
                                  <Fragment key={cap}>
                                    {i > 0 ? <span aria-hidden="true" className="mp-cap-sep" /> : null}
                                    <span
                                      className={"mp-cap mp-cap-" + cap}
                                      aria-label={CAPABILITY_LABEL[cap]}
                                      title={CAPABILITY_LABEL[cap]}
                                    >
                                      {cap === "reasoning" ? <IconBrain /> : <IconImage />}
                                    </span>
                                  </Fragment>
                                ))}
                              </span>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mp-foot">
                <span className="mp-foot-label">
                  <EffortMeter levels={footerLevels} filled={filledSteps} />
                  <span className="mp-foot-word">Thinking</span>
                </span>
                {thinkingLevels?.length ? (
                  <div
                    className="mp-track"
                    role="radiogroup"
                    aria-label="Thinking effort"
                    style={{ ["--mp-count" as string]: thinkingLevels.length }}
                  >
                    <span
                      aria-hidden="true"
                      className="mp-track-thumb"
                      style={{ transform: `translateX(${footerActive * 100}%)` }}
                    />
                    {thinkingLevels.map((eff, i) => (
                      <button
                        key={eff}
                        type="button"
                        role="radio"
                        aria-checked={i === footerActive}
                        className={"mp-track-btn" + (i === footerActive ? " mp-track-btn-on" : "")}
                        onClick={() => selectThinking(eff)}
                      >
                        {THINKING_LABEL[eff]}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="mp-foot-note">
                    {selected ? "Not available for this model" : "Select a model to set the effort"}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
