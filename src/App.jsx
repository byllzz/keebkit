import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Keyboard, { KEYBOARD_THEMES } from "./components/ui/keyboard";
import { CodeBlock, PackageManagerTabs } from "./components/ui/code-block";
import { FORMAT_SOURCES } from "./lib/format-sources";
import { useSiteMode } from "./hooks/use-site-mode";
import { Sun, Moon, Download, Terminal, FileCode, Maximize2 } from "lucide-react";
function GithubMark(props) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.71 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.44-2.7 5.42-5.27 5.7.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

const THEME_LABELS = {
  classic: "Classic", mint: "Mint", royal: "Royal",
  dolch: "Dolch", sand: "Sand", scarlet: "Scarlet",
};
const THEME_ACCENTS = {
  classic: "#9b72ff", mint: "#37b787", royal: "#5b5fef",
  dolch: "#c98a3f", sand: "#c9a227", scarlet: "#d43b34",
};

const USAGE_CODE = `import Keyboard from "@/components/ui/keyboard";

export default function Page() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <Keyboard theme="classic" enableHaptics enableSound />
    </div>
  );
}`;

const EVENT_CODE = `import Keyboard from "@/components/ui/keyboard";

export default function Page() {
  return (
    <Keyboard
      theme="mint"
      enableHaptics
      enableSound
      onKeyEvent={(event) => {
        console.log(event.code, event.phase, event.source);
      }}
    />
  );
}`;

const API_ROWS = [
  { prop: "theme", type: '"classic" | "mint" | "royal" | "dolch" | "sand" | "scarlet"', def: '"classic"', desc: "Selects one of the six built-in colorways." },
  { prop: "layout", type: '"qwerty" | "azerty" | "dvorak"', def: '"qwerty"', desc: "Remaps letter and symbol keys to the chosen layout." },
  { prop: "enableHaptics", type: "boolean", def: "true", desc: "Vibrates on supported devices when a key is pressed." },
  { prop: "enableSound", type: "boolean", def: "true", desc: "Plays a mechanical click on every keydown." },
  { prop: "soundUrl", type: "string", def: '"/sounds/click.ogg"', desc: "Path to the audio file used for the click sound." },
  { prop: "onKeyEvent", type: "(event: KeyboardInteractionEvent) => void", def: "undefined", desc: "Fires on every physical key down or up." },
  { prop: "className", type: "string", def: "undefined", desc: "Extra classes applied to the keyboard frame." },
];

export default function App() {
  const navigate = useNavigate();
  const { mode, toggle } = useSiteMode();
  const [theme, setTheme] = useState("classic");
  const [layout, setLayout] = useState("qwerty");
  const [lastKey, setLastKey] = useState(null);

  const handleKeyEvent = useCallback((e) => {
    if (e.phase === "down") {
      setLastKey({ code: e.code, id: `${e.code}-${performance.now()}` });
    }
  }, []);

  const openFullKeyboard = () => {
    navigate("/keyboard");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="sticky top-0 z-20 backdrop-blur bg-[var(--bg)]/80 border-b border-[var(--border-soft)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-14">
          <span className="font-display font-semibold tracking-tight text-[15px]">
            keebkit<span style={{ color: THEME_ACCENTS[theme] }}>.</span>
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label="Toggle light and dark mode"
              className="p-1.5 rounded-md text-[var(--text-mute)] hover:text-[var(--text)] hover:bg-[var(--panel-2)] transition-colors"
            >
              {mode === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <a
              href="https://github.com/byllzz/keebkit.git"
              target="_blank"
              className="flex items-center gap-1.5 text-[13px] text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
            >
              <GithubMark /> <span className="relative top-0.5">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-32">
        <section className="pt-20 pb-10 text-center">
          <h1 className="font-display text-[40px] sm:text-[48px] font-semibold tracking-tight leading-[1.05]">
            A keyboard, rebuilt for the web.
          </h1>
          <p className="mt-4 text-[16px] text-[var(--text-dim)] max-w-lg mx-auto">
            A keyboard component with haptics, mechanical sound, and six
            colorways. Drop it into any React project.
          </p>
        </section>

        <section className="mb-24">
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8 sm:p-12">
            <button
              onClick={openFullKeyboard}
              aria-label="Open full keyboard in a new page"
              title="Maximize"
              className="absolute top-4 right-4 z-10 p-1.5 rounded-md text-[var(--text-mute)] hover:text-[var(--text)] hover:bg-[var(--panel-2)] transition-colors"
            >
              <Maximize2 size={15} />
            </button>
            <div className="relative flex justify-center overflow-hidden max-h-[150px] sm:max-h-[170px]">
              <Keyboard
                theme={theme}
                layout={layout}
                enableSound
                enableHaptics
                onKeyEvent={handleKeyEvent}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--panel))",
                }}
              />
            </div>
          </div>
        </section>

        <Section title="Installation" number="01">
          <InstallTabs theme={theme} />
        </Section>

        <Section title="Usage" number="02">
          <CodeBlock code={USAGE_CODE} />
        </Section>

        <Section title="Event callback usage" number="03">
          <p className="text-[var(--text-dim)] text-[14px] mb-3">
            Listen to every key down and up, whether it came from the physical
            keyboard or an on-screen click.
          </p>
          <CodeBlock code={EVENT_CODE} />
        </Section>

        <Section title="API reference" number="04">
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[var(--panel-2)] text-[var(--text-mute)] text-left">
                  <th className="font-medium px-4 py-2.5">Prop</th>
                  <th className="font-medium px-4 py-2.5">Type</th>
                  <th className="font-medium px-4 py-2.5">Default</th>
                  <th className="font-medium px-4 py-2.5">Description</th>
                </tr>
              </thead>
              <tbody>
                {API_ROWS.map((row, i) => (
                  <tr
                    key={row.prop}
                    className={
                      i !== 0 ? "border-t border-[var(--border-soft)]" : ""
                    }
                  >
                    <td className="px-4 py-3 font-mono-key text-[#c7b3ff] align-top whitespace-nowrap">
                      {row.prop}
                    </td>
                    <td className="px-4 py-3 font-mono-key text-[var(--text-mute)] align-top">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 font-mono-key text-[var(--text-mute)] align-top whitespace-nowrap">
                      {row.def}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-dim)] align-top">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[var(--border-soft)] py-8 text-center text-[12px] text-[var(--text-faint)]">
        keebkit - made by{" "}
        <a href="https://github.com/byllzz" target="_blank">
          @byllzz
        </a>
      </footer>
    </div>
  );
}

function Section({ title, number, children }) {
  return (
    <section className="mb-16">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono-key text-[11px] text-[var(--text-faint)]">{number}</span>
        <h2 className="font-display text-[20px] font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const FORMAT_TABS = [
  { id: "jsx", label: "JSX" },
  { id: "tsx", label: "TSX" },
  { id: "html", label: "HTML" },
  { id: "js", label: "JS" },
];

function InstallTabs({ theme }) {
  const [mode, setMode] = useState("cli");
  const [format, setFormat] = useState("jsx");

  return (
    <div>
      <div className="flex gap-1.5 mb-4">
        <button
          onClick={() => setMode("cli")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors ${
            mode === "cli"
              ? "text-white"
              : "text-[var(--text-dim)] bg-[var(--panel-2)] hover:text-[var(--text)]"
          }`}
          style={mode === "cli" ? { background: THEME_ACCENTS[theme] } : undefined}
        >
          <Terminal size={13} /> CLI
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors ${
            mode === "manual"
              ? "text-white"
              : "text-[var(--text-dim)] bg-[var(--panel-2)] hover:text-[var(--text)]"
          }`}
          style={mode === "manual" ? { background: THEME_ACCENTS[theme] } : undefined}
        >
          <FileCode size={13} /> Manual
        </button>
      </div>

      {mode === "cli" ? (
        <PackageManagerTabs registryCommand="shadcn@latest add https://keebkit.vercel.app/r/keyboard.json" />
      ) : (
        <div>
          <p className="text-[var(--text-dim)] text-[14px] mb-3">
            No CLI? Copy the component straight into your project in whichever format fits your stack:
          </p>
          <div className="flex gap-1 mb-3">
            {FORMAT_TABS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-mono-key transition-colors ${
                  format === f.id
                    ? "text-[var(--text)] bg-[var(--panel-2)]"
                    : "text-[var(--text-faint)] hover:text-[var(--text-dim)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <CodeBlock code={FORMAT_SOURCES[format]} language={format === "js" ? "javascript" : format} />
          {format === "html" && (
            <p className="text-[var(--text-faint)] text-[12px] mt-2">
              Save as <code className="font-mono-key text-[var(--code-text)]">index.html</code> and open it directly - style and behavior are self-contained.
            </p>
          )}
          {format === "js" && (
            <p className="text-[var(--text-faint)] text-[12px] mt-2">
              Save as <code className="font-mono-key text-[var(--code-text)]">keyboard.js</code>, then <code className="font-mono-key text-[var(--code-text)]">import {"{"} mountKeyboard {"}"}</code> and call it with a container element.
            </p>
          )}
        </div>
      )}

      <SoundStep theme={theme} />
    </div>
  );
}

function SoundStep({ theme }) {
  return (
    <>
      <p className="text-[var(--text-dim)] text-[14px] mt-8 mb-3">
        Then grab the click sound and drop it in your <code className="font-mono-key text-[var(--code-text)]">public/sounds/</code> folder:
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/sounds/click.ogg"
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: THEME_ACCENTS[theme] }}
        >
          <Download size={14} /> Download click.ogg
        </a>
        <span className="text-[12px] text-[var(--text-faint)]">or run:</span>
      </div>
      <div className="mt-3">
        <CodeBlock
          code={`mkdir -p public/sounds\ncurl -L https://keebkit.vercel.app/sounds/click.ogg -o public/sounds/click.ogg`}
          language="bash"
        />
      </div>
      <p className="text-[var(--text-faint)] text-[12px] mt-3">
        Using a different sound? Point the <code className="font-mono-key text-[var(--code-text)]">soundUrl</code> prop (or <code className="font-mono-key text-[var(--code-text)]">soundUrl</code> option in the JS version) at your own file instead.
      </p>
    </>
  );
}
