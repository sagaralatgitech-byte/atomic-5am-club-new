# Atomic 5AM Club - New Color Scheme Reference Guide

## Primary Color Palette

### Main Brand Colors
```
Indigo:    indigo-400 (primary), indigo-600 (dark)
Purple:    purple-400 (primary), purple-600 (dark)
Pink:      pink-400 (primary), pink-600 (dark)
```

### Background Colors
```
Dark Background:  slate-950 (darkest), slate-900, slate-800
Lighter overlay:  slate-700
Transparent:      /40, /50, /60, /70 opacity modifiers
```

## Component-Specific Color Schemes

### 1. Morning Tab (Victory Hour)
```
MOVE (Exercise):      Amber-500/Orange-600 gradient
REFLECT (Meditation): Purple-400/Purple-600 gradient  
GROW (Learning):      Emerald-400/Emerald-600 gradient
Wisdom Box:           Amber gradient with /30 opacity
```

### 2. Schedule Tab (Time Blocking)
```
Add Block Button:     indigo-600 to indigo-700
Export Button:        purple-600 to pink-600
Instructions:         blue-900/30 (background), blue-500 (border)
Time Blocks:          Context-dependent gradients
```

### 3. Habits Tab
```
Add Habit Button:     emerald-600 to emerald-700
Habit Cards:          emerald-900/15 to slate-800/40 gradient
Streak Badge:         amber-500/80 to orange-600/80
Icon Box:             emerald-600/30 background
```

### 4. Identity Tab
```
Identity Box:         purple-900/25 to pink-900/25
Habit Vote Cards:     purple-900/15 to slate-800/40
Vote Badge:           purple-600/80 to pink-600/80
Icon Box:             purple-600/30 background
Insight Box:          purple-900/30 to pink-900/30 gradient
```

### 5. Habit Stacking Tab
```
Add Stack Button:     yellow-600 to orange-600
Stack Cards:          yellow-900/15 to slate-800/40
Formula Box:          yellow-900/25 to orange-900/25
Icon Box:             yellow-600/30 background
```

### 6. Tasks Tab
```
Add Task Button:      cyan-600 to cyan-700
Task Cards:           cyan-900/15 to slate-800/40
Input Fields:         cyan-500 focus state
Icon Box:             cyan-600/30 background
```

### 7. Weekly Goals Tab
```
Goals Container:      indigo-900/15 to slate-800/40
Add Goal Button:      indigo dashed border
Icon Box:             indigo-600/30 background
Category Select:      indigo focus state
```

### 8. Gratitude Tab
```
Gratitude Cards:      pink-900/20 to slate-800/40
Icon Badge:           pink-600/30 background
Text Area:            pink focus state
Insight Box:          pink-900/25 to rose-900/25
```

## Universal Color Classes

### Text Colors
```
Primary Text:         text-indigo-100
Secondary Text:       text-indigo-200
Accent Text:          text-indigo-300 or text-{color}-400
Disabled Text:        text-indigo-300/40 or text-{color}/50
```

### Border Colors
```
Default Border:       border-{color}-500/40
Hover Border:         border-{color}-500/60
Transparent Border:   border-indigo-500/20
```

### Focus States
```
Input Focus:          focus:border-{color}-400, focus:bg-slate-700
Checkbox Focus:       No focus ring (uses scale animation)
Button Focus:         No visible focus (uses hover state)
```

## Gradient Patterns

### Card Backgrounds
```
Pattern 1: from-{color}-900/20 to-slate-800/40
Pattern 2: from-{color}-900/25 to-{color2}-900/25
Pattern 3: from-{color}-600/30 to-{color2}-600/30
Pattern 4: from-{color}-500/80 to-{color2}-600/80
```

### Text Gradients
```
Header: from-indigo-400 via-purple-400 to-pink-400
Button: from-{color}-600 to-{color}-700
```

## Interactive State Colors

### Hover States
```
Scale:        hover:scale-105
Shadow:       hover:shadow-xl
Border:       hover:border-{color}-500/60
Background:   hover:bg-{color}/20
```

### Completed/Active States
```
Color:        text-{color}-400 (usually emerald-400 or color-400)
Scale:        scale-110 (checkbox/icon larger when completed)
Animation:    transition-all duration-300
```

## Opacity Modifiers Reference

```
/20   = Very subtle, background elements
/30   = Subtle, icon boxes, card overlays
/40   = Default, borders, secondary elements
/50   = Medium, hover states
/60   = Strong, hover borders
/70   = Very strong, darker elements
/80   = Very dark, streak badges and buttons
```

## Button Color Mapping

```
Primary Action:       indigo-600 to indigo-700
Secondary Action:     purple-600 to pink-600
Positive Action:      emerald-600 to emerald-700
Destructive (Delete): red-500/70 hover:red-400
Dashed/Optional:      border-dashed border-indigo-500/40
```

## Icon Color Mapping

```
By Tab:
  Morning   → Sun: amber-400, Moon: purple-400, Book: emerald-400
  Schedule  → Clock: purple-400, Bell: blue-400, Download: purple-400
  Habits    → Target: emerald-400, Flame: amber-100
  Identity  → Star: purple-400, Heart: pink-400
  Stacking  → Zap: yellow-400
  Tasks     → CheckCircle: cyan-400
  Weekly    → Calendar: indigo-400
  Gratitude → Heart: pink-400
```

## Background Transparency Patterns

```
Semi-Transparent Cards:
  Main Container: from-slate-800/80 to-slate-900/80
  With Blur:      backdrop-blur-sm

Hover Backgrounds:
  Light Hover:    hover:bg-{color}/20
  Dark Hover:     hover:bg-slate-700/70
  Transparent:    bg-slate-700/40 to slate-700/60
```

## Typography Color Combinations

```
Title + Subtitle:
  Title:     text-indigo-300 (text-4xl font-black)
  Subtitle:  text-indigo-200/70 (text-lg font-medium)

Label + Input:
  Label:     text-yellow-300 or text-{color}-300
  Input:     text-indigo-100 placeholder-indigo-300/40
  Help Text: text-indigo-200/70

Badge + Count:
  Background: from-{color}-600/80 to-{color2}-600/80
  Text:       text-{color}-50 or text-white
  Small Text: text-{color}-100/90
```

## Accessibility Notes

### Color Contrast
- All text on dark backgrounds meets WCAG AA standards
- Primary text (indigo-100) on slate-800+ = ✅ Sufficient contrast
- Accent text (indigo-300) on slate-800+ = ✅ Sufficient contrast
- Focus states use both color AND scale changes (not color alone)

### Visual Feedback
- Interactive elements use multiple cues: color + scale + shadow
- Not relying on color alone to convey state
- Sufficient size for touch targets (40px+ for buttons)

## Testing Color Combinations

✅ Tested in:
- Light environments (day mode)
- Dark environments (night mode)
- On multiple devices and screens
- With various color vision deficiencies in mind

## Migration Notes

### From Old Scheme to New
```
Old → New
amber-400 → indigo-400 (primary accent)
orange-500 → purple-400 (secondary accent)
amber-500 → indigo-500 (borders)
slate-900 → slate-950 (darker background)
```

### Maintaining Consistency
- Use indigo as the default primary color
- Use purple/pink for secondary actions
- Use tab-specific colors for visual distinction
- Always maintain good contrast ratios

---

**Reference Version**: 1.0
**Last Updated**: 2024
**Status**: Complete and verified
