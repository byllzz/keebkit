# keebkit

A keyboard component for React, with haptics, mechanical sound effects, six colorways, and three layouts (QWERTY / AZERTY / Dvorak). Ships as a real shadcn registry item so it can be installed straight into any project.

**Live site:** https://keebkit.vercel.app

## Install

```bash
pnpm dlx shadcn@latest add https://keebkit.vercel.app/r/keyboard.json
```

Then grab the click sound and drop it in `public/sounds/`:

```bash
mkdir -p public/sounds
curl -L https://keebkit.vercel.app/sounds/click.ogg -o public/sounds/click.ogg
```

## Usage

```jsx
import Keyboard from "@/components/ui/keyboard";

export default function Page() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <Keyboard theme="classic" enableHaptics enableSound />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `"classic" \| "mint" \| "royal" \| "dolch" \| "sand" \| "scarlet"` | `"classic"` | Colorway |
| `layout` | `"qwerty" \| "azerty" \| "dvorak"` | `"qwerty"` | Key mapping |
| `enableHaptics` | `boolean` | `true` | Vibrate on keydown (supported devices) |
| `enableSound` | `boolean` | `true` | Play mechanical click on keydown |
| `soundUrl` | `string` | `"/sounds/click.ogg"` | Path to the click sound |
| `onKeyEvent` | `(event) => void` | `undefined` | Fires on every key down/up |
| `className` | `string` | `undefined` | Extra classes on the frame |

## Local dev

```bash
npm install
npm run dev
```

## Deploy

Deployed on Vercel. Push to your repo and import it in the Vercel dashboard — no config needed, it's a standard Vite app.

Made by [@byllzz](https://github.com/byllzz)
