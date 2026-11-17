const SUPERSCRIPTS = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  'ᴺ': 'N', '⁺': '+', '⁻': '-',
}
const RUN = new RegExp(`([${Object.keys(SUPERSCRIPTS).join('')}]+)`)

// Unicode superscript digits come from different blocks and render at mismatched sizes, so draw them as <sup>.
export default function MathText({ text }) {
  return text.split(RUN).map((part, i) =>
    i % 2 === 1
      ? <sup key={i} className="text-[0.7em]">{[...part].map((ch) => SUPERSCRIPTS[ch]).join('')}</sup>
      : part
  )
}
