# Pelikoodari: luovutus 3.11.2026 klo 18.25 – juna 218

Edellinen: -20261103-1735 (7acd46751, lisäykset 4f945b9f8 ja 7acd46751), voimassa ellei alla toisin. Syy: kontekstiraja 26 % (7.37),
kaikki jatko odottaa JU:n ajoja (Unity-ajot Tripo-tauolla 18.10–~19.10, sitten PK al/am, jono-20261103-ilta.txt).
Proto-haarat paikallisia.

## Tehty 18.00–18.25
- **0b LAV-koekytkentä**: b62dc9106 (pelikoodari/saumat-v1-219, 97ef79bd6:n päällä, wt /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99):
  kielletty-rakennukset-v120 → v121 (antiikkikulta, SHA256SUMS 17c1efbd92da) ja AvoimetKansio avoimet-v52 → v54 (kasettikatto,
  6375a7be628e). Media 200, rakennukset.json tavulleen v120. SHA LAV:lle 18.1x; LAV ajaa editoriparit 04 + 06 ja lähettää parit
  (06×3 + 04) PT:lle (PT 18.2x pyysi). Junaan vasta PT:n kuittauksella. Unity-tarkistusta ei ajettu (vain kaksi merkkijonoa).
- **0 Keisarin havainnekuvat** (Codex ee0eda022, SHA256SUMS täsmää): arvioitu kunnossa (aiheet, iät, rakennukset; valokuvamaisuus
  Codexin mukaan omistajan pintaohjeella, ei tilauksen maalauksellisuus). Kytketty: proto **pelikoodari/keisari-havainne-218 8cec09f05**
  (NUI:n natiivi-ui/keisari-nosto 6eeffaa57:n päällä, wt /Users/Shared/Claude/wt/proto-pelikoodari-keisari): viimeinen-keisari.json
  varaukset a–e → tiedosto "tuotanto/viimeinen-keisari-v1/viimeinen-keisari-*.jpg" (Kuvat.Reitit → media/julisteet/tuotanto/…),
  selitteet, lähderivit a/c/d "Matkakirjan havainnekuva; … pohjana <tekijä> / Wikimedia Commons, CC BY-SA 3.0/4.0" (Codexin
  LÄHTEET.md: a, c, d varovaisena muunnelmana BY-SA). Kielivahti ok. Media-paketti
  /Users/Shared/Claude/proto-3d/_valmiit/viimeinen-keisari-havainnekuvat-vienti-20261103/ (5 × 1536 × 1024 JPEG q84, SHA256SUMS,
  LAHTEET.md; uusi polku, ei TF-viittauksia) → **odottaa PT:n kuittausta**, sitten JU vie. Rivi PT:lle 18.2x (jonossa).
  Ennen vientiä kuvat eivät näy (tuotanto/-polulla ei Commons-varareittiä). Kun NUI:n haara junaan: cherry-pick 8cec09f05.
- **taso1b (2) syy selvitetty** (aj-ajo esikatselu-20261103-170417, unity.log rivin 3905 jälkeen): t 11,22 polkukamera alkoi
  (kamera polulla (126.0, -816.1)), mutta 0,1 s:ssa kamera siirtyi 4 m työhuoneen massaan (123.8, 3.1, -820.0); siellä MUURIN TARVE
  (kameraväli t 11.31 "tavoite 2.8 → 5.6 m tarve 5.6", leikkaus sivut −0,5…3,0 huippu 3,9 ala 0,0 = rakennus, ei räystäs) nosti
  kameran 5,5 m:iin 5,3 m:n päähän (kulma 45). Räystäsnosto EI syy (rnosto 0.0; "rennakko 5.6/5.0 s" vain ennuste).
  Avoin kysymys: mikä vei kameran polulta massaan (polkuW/kujakamera päättyy 11.36/OviAukonKaista/pohjajousi?).
  → **Vaiheloki 5aef4b1a2** (horisontti-218am): 2 s jokaisesta polkukameran alusta joka ruutu "vaiheloki t … kohde … massa …
  kamera … kaista … polkuW … polku … matka … kujaW … vaatii … Puyi". JU:n am-ajo (ketju-am.zsh käyttää haaran kärkeä) näyttää sen:
  `grep -a "vaiheloki t 1[01]\." <esikatselu>/unity.log`.
- **taso1b (3)**: raita on kujaportin aukossa (kuva e-portti, Codexin/VS:n kynnys tai reunakivi LOD-kuvalla?). → **8b9bdda4c**
  (horisontti-218am): kerran juoksussa, kun kamera on 1,5 m:n säteellä (130.2, -562.4), Mika() viidestä ruutupisteestä
  (0.5/0.5, 0.5/0.58, 0.5/0.66, 0.3/0.6, 0.7/0.6) → unity.log "mika (" -rivit: renderöijän nimi, isä, materiaali, shader.
  Jos malli/tekstuuri → Lavastaja tai Natiiviseppä/VS (vastuukartta), rivi PT:lle.
- horisontti-218am kärki nyt 8b9bdda4c: unity-tarkistus 0 virhettä, Peli-testit 810/810.
- Työlista: Eunukit-rivin tilanne päivitetty 18.2x.

## SEURAAVA
1. am-tulokset (JU, sali-218am, taso1b + mp; haara horisontti-218am 8b9bdda4c): (a) vaiheloki t 10,5–12 → korjaa (2) niin, ettei kamera
   lähde polulta rakennusmassaan (ei nostoa, ei jyrkkää kulmaa; Raamattu 2.177: ei alitusta, ei muurin eteen); (b) mika-rivit → (3);
   (c) 58,5–64,5 s horisontti, 78–92 s ja vartija 95 s ennallaan, Puyi ruudussa; (d) alkulento 0–5 s (kohta 4 edellisestä).
   Aikavastaavuus: video s × 51,935 = kamera.txt-rivi. Korjauksen jälkeen uusi otto JU-jonoon ja KK-paketti kuten sali-218aj/kk-taso1b/
   (PT: ei omistajalle ennen korjausta).
2. al-tulokset (sali-218al ys tj): kohta 1 luovutuksesta -1735.
3. am mp: kohta 3 luovutuksesta -1735.
4. LATAUSKUVA (AUKI, ei aloitettu): Codexin latauskuva-otsikko-rivi1/-viiva/-rivi2 (posti/codex-pelikoodari-juoksupeli-elokuvatekstit-20261103/,
   MITAT.json compositions.latauskuva 3000 × 625; previews.loadingLandscape.nativeRowOverrides vaakaan: rivi1 x 580 y 35 w 1400 h 121,
   viiva x 722 y 180 w 1115, rivi2 x 997 y 205 w 566 tausta 2560 × 1180; pysty: x 67 y 250 leveys 1120 / 2048 pysty-34-kuvassa).
   Koodi: JuoksupeliNakyma.cs OtsikkoUrl (nyt #814 kultainen) + VaakaOtsikko {leveys, keskiX, keskiY} + pysty-Osa(0.80, 0.5, 0.135)
   (rivi ~364). Ehdotus: koosta perus- ja vaaka-PNG (vaakaan tiiviimmät rivivälit) → media-paketti (PT:n kuittaus) → kytke ja tarkista
   hattumaskin päällekkäisyys alfoista (LatausRajausTestit). Esikatselut: esikatselu-latauskuva-vaaka/pysty.png (hyvät).
5. Edellisen luovutuksen kohdat 4–7 ennallaan (Codex-toimitukset, Editor-työkalut kivi-216:een, taso1b musiikkirivit).
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1825.

## Lisäys
- PT kuittasi keisarin havainnekuvat junaan; media-paketti + 8cec09f05 lähetetty JU:lle (PT:n viesti luovutuksen jälkeen). Tarkista viennin jälkeen media 200: https://media.matkakirja.app/julisteet/tuotanto/viimeinen-keisari-v1/viimeinen-keisari-a-valtaistuin.jpg
