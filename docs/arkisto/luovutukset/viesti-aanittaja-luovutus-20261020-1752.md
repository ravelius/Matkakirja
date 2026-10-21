# Äänittäjän luovutus 20.10.2026 klo 17.52 (tilinvaihto)

**Tila: levossa, ei avoimia ajoja eikä lupia. Työ pushattu (aanittaja-tyo-20261011); mediat ämpärissä/`_valmiit`, ei gitissä.**
Edellinen luovutus (pysyvät säännöt, juoksupelin äänet, hylätyt): `docs/arkisto/viesti-aanittaja-luovutus-20261020-1711.md` – lue sekin.

## Tämän vuoron työ: juoksupelin elokuvamainen avaus (PT/KK, omistaja 17.17–17.45)
Raportti: `docs/raportit/aanittaja-juoksu-avaus-20261020.md`. PK kytki äänet (avaus-208).
- **Musiikki (VALITTU: Lyria a):** `audio/juoksupeli/avaus-musiikki-v2/avaus-erhu-lyria-a.mp3` (16 s; b = 14,4 s ei valittu). 1 Lyria-kutsu (lupa 17.37), huilu+harppu, ei erhua; omistaja valitsi a:n 17.45 → **erhu-uusintaa ei tehdä**.
- **Puhe (4 ottoa, 81 mrk, lupa 17.34):** `audio/juoksupeli/avaus-puhe-v1/` 01 "Majesteetti karkasi!", 02 "Majesteetti, palatkaa!", 04 Puyi "Ottakaa kiinni, jos saatte!" (Kavya `bA58y3FqVI6b6gTNh0oT`). 03 uusi otto (lupa 17.41, 12 mrk) → `audio/juoksupeli/avaus-puhe-v2/03-eunukki-majesteetti.mp3` (korvaa v1/03, "Mahesteetti"-ongelma). Eunukkiäänet: äänipankin RgBriz…, 22nhU1…, tueYPm… .
- HYLÄTTY: Freesoundin erhu (`avaus-musiikki-v1/`, omistaja 17.38 "ääni oli huono"; älä käytä). Syy virheeseen: PT:n "valmiista lähteestä" tulkittiin luvaksi vastoin 19.10. linjausta (musiikki vain Lyrialla) → **uusi musiikki aina Lyrialla, muuten lupa omistajalta (omistaja 17.36).**
- Ei jäänyt auki: kaikki viestit PK/NS/PT lähetetty (PK:n viestit voivat olla vielä jonossa).

## Opit
- Soundly-GUI ei toimi, kun omistajan nykyinen Space on koko ruudun sovellus (app_bring_to_current_space kieltäytyy); ei kierretä, vaihtoehto Sonniss/Freesound-haku (workflow 326102787, `fs_haku.zsh`-malli kansiossa `proto-3d/_tyo/juoksupeli-avaus-musiikki-20261020`).
- Lupa lasketaan teksteistä: jos raja on pelkkien tekstien merkkimäärä, ei tageja ([shouting] jne.).
- Gemini-litterointi (kutsu 4×) paljastaa heikon j:n tms.; sokko-sopivuus (arvioi_sfx3) on epävakaa musiikille.
- Vienti: `julkaisija-tyokalut/vie-paketti.sh` (ääniportti mukana); olemassa olevaa avainta ei ylikirjoiteta → korvaava tiedosto uudelle polulle (v2).

## Auki
- Mittaus pelistä käännöksestä (museon askelkytkentä, käännösäänen taso 0,32×askel) – ennallaan.
- Tason 2 musiikit: "etsitään myöhemmin", ei lupaa Lyria-kutsuihin.
- Tuotantotyökalut (ei gitissä): `proto-3d/_tyo/juoksupeli-avaus-musiikki-20261020`, `juoksupeli-avaus-puhe-20261020` sekä aiemmat (ks. edellinen luovutus).
