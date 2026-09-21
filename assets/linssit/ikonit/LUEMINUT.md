# Linssi-ikonit

Codexin piirtämät 47 linssi-ikonia ja yhteinen messinkikehys
(`linssi-kehys.webp`), Fablen tilaus 21.9.2026
(posti/fable-codexille-linssi-ikonit-20260921.md). Tyyli: vuoden 1873
optikkovälineen messinkikehys ja seepiamusta atlasgrafiikka, ei tekstiä.
Lisenssi: pelin oma tuotanto.

Repossa on vain webp ≤ 192 px (laatu 85; 96 px:n linssikortti @2 ja
44 px:n laukkuruutu) — Fablen päätös 21.9.2026. Codexin 512 × 512 px:n
PNG-alkuperäiset jäävät toimituskansioon
`~/Documents/Codex/2026-09-21/linssi-ikonit/`, eivät repoon.
Muunnos: `sharp(png).resize(192, 192, { fit: 'inside' }).webp({ quality: 85 })`.

Tiedostonimi `linssi-<tunnus>.webp`; tunnus on sama kuin
js/linssit/rekisteri.js:n hiomassa-rivillä. Harmaa hiomassa-tila tehdään
css:llä (grayscale), ei erillisenä kuvana.
