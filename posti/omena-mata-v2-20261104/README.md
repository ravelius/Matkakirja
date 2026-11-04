# Mätä omena v2 — toimitus 4.11.2026

Yksi uusi malli `omena-mata-v2.glb`. Vanhoja malleja tai julkaistua peliä ei ole muutettu.

- Koko X/Y/Z: 0,140000 × 0,140843 × 0,135278 m. Alkuperäinen ground-pivot ja mittakaava.
- 2 376 kolmiota: hedelmä 2 208, varsi 64, alkuperäinen lehti 104.
- Kaikki alkuperäiset geometriatavut, normaalit, UV:t, indeksit ja solmujen muunnokset ovat muuttumattomat. Varren materiaali säilyy myös.
- Uusi ruskea pinta ja tummat läikät. Alkuperäinen lehti on kuivuneen ruskea. Ei kärpäsiä tai lisäosia.

## Materiaalin lukeminen

Hedelmän väri tulee tavallisesta glTF `COLOR_0` -attribuutista (lineaarinen RGBA) ja valkoisesta PBR-baseColorFactorista. Karheus 0,90. Punainen tekstuuri ei ole kytketty yhteenkään materiaaliin; alkuperäiset binääritavut on säilytetty mallin sisällä muuttumattomina. Tuonnissa säilytä vertex colours; älä korvaa materiaalia punaisen omenan materiaalilla. Ei laajennuksia, ulkoisia tekstuuripolkuja, uusia luurankoja tai animaatioita.

## Tarkistuskuvat

`omena-mata-v2-edesta.png`, `omenat-rinnakkain.png`, `omena-mata-v2-neljalta-puolelta.png` ja `omenat-30-48-60px.png` on renderöity toimitettavasta GLB:stä. Pienet natiivikuvat ovat mukana. Sama valaistus ja kamera vertailuparissa. Kevyt CPU-esikatselu näyttää geometrian ja värin, ei Unityn lopullista PBR-kiiltoa tai hehkua. Kuvien tuotto noin 1,1 s, huippumuisti noin 72 MB; ei raskasta Blender-ajoa.

Paikallinen geometria- ja kuvatarkistus läpäisty. PK kytkee uuden nimen erikseen; pelin nykyinen 0,22 m skaalaus voi säilyä. KK tarkistaa oikean 30–60 px pelikuvan ja hehkun. Vastaanotto, hyväksyntä, peli-integraatio ja julkaisu eivät kuulu paikalliseen valmiusmerkintään.

Tripo-jobit: 0. Krediitit: 0. Uudet kuvanluontikutsut: 0.
