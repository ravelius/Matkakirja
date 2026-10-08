# Ehdotus: Tavlin lauta ja nappulat 3D-malleina (Linnanrakentaja 8.10.2026)

Päätoimittaja 8.10.: valittiin A (tarkistus). Tämä ehdotus (C) viedään omistajalle myöhemmin, jos sopiva hetki tulee.
Nykyinen ilme (LAUTAPELI-paperi) on omistajan hyväksymä, eikä tätä tehdä ilman hänen pyyntöään.

## Nykytila (tarkistettu 8.10., proto master bdd0e8c5f)
- Resources/Pelit/Tavli/: lauta-, nappula-vaalea-, nappula-tumma- ja nappula-varjo-kerrokset kaikille kolmelle laudalle
  (kafeneio, tabula = Bysantti, tavla = Ottomaani; .meta kaikilla), tavli-mitat.json ja noppa-glb.bytes (3D-noppa).
- TavliNakyma.cs: lautavalinta valintakortissa (tabula avautuu normaalilla, tavla vaikealla botilla), TavliNopat.cs piirtää
  nopat ylhäältä kuvaavalla kameralla RenderTextureen laudan päälle.

## Ehdotus C
Lauta ja nappulat 3D-glb:nä samalla ylhäältä kuvaavalla RenderTexture-kameralla kuin nopat (TavliNopat: laudan pikseli
(px, py) → (px / 100, y, −py / 100)):
- Laudan kehys, sarana ja kolmiot kevyenä kohokuvana, nappulat sorvattuina kiekkoina (pyöristetty reuna, upotettu kuvio).
- Valo ja varjot samasta valosta kuin nopat; liikkuva nappula nousee hieman (varjo siirtyy) liu'un aikana.
- Osumatestaus ja tavli-mitat.json ennallaan (kamera kohtisuoraan ylhäältä), joten pelilogiikka ja testit eivät muutu.
- Budjetti: lauta noin 4 000 kolmiota + 1024² ASTC 6×6, nappula noin 300 kolmiota (30 instanssia), yhteensä alle 15 000 kolmiota.
- Työ noin 3–4 h (vienti Blender-skripteistä tools/linssit/blender/tavli_lauta.py ja tavli_noppa.py + kytkentä Natiivi-UI:n kanssa).

Vaihtoehto B (kalteva kamera, aito perspektiivi) vaatisi osumatestauksen uudelleenkirjoituksen projektiolla, noin 6–8 h.
