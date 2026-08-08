import React, { useEffect, useState, useRef } from "react";

const CODE_TO_LABEL = {
  Space: "space", Enter: "enter", Backspace: "⌫", Tab: "tab",
  ShiftLeft: "shift", ShiftRight: "shift", ControlLeft: "ctrl",
  ControlRight: "ctrl", AltLeft: "alt", AltRight: "alt", Escape: "esc",
  ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→",
  CapsLock: "caps",
};

function labelFor(code) {
  if (!code) return "";
  if (CODE_TO_LABEL[code]) return CODE_TO_LABEL[code];
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  if (code.startsWith("F") && /^F\d+$/.test(code)) return code;
  return code;
}

export default function LastKey({ lastKey, accent = "#9b72ff" }) {
  const [display, setDisplay] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!lastKey) return;
    clearTimeout(timerRef.current);
    setDisplay({ label: labelFor(lastKey.code), id: lastKey.id });
    timerRef.current = setTimeout(() => setDisplay(null), 500);
    return () => clearTimeout(timerRef.current);
  }, [lastKey]);

  return (
    <div className="h-14 flex items-end justify-center mb-1 pointer-events-none">
      {display && (
        <div
          key={display.id}
          className="key-pop font-display font-semibold text-[34px] tracking-tight px-2"
          style={{ color: accent }}
        >
          {display.label}
        </div>
      )}
    </div>
  );
}
