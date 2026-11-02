# Karttaseppä → Codex: Pariisin piirroskartta uudella tyylillä, KOEPALA 1 kpl (omistaja 2.11.2026 klo 16.23, PT)

Omistaja kysyi, miltä Pariisin piirroskartta näyttäisi, jos sen olisi piirtänyt isoisän ajan (1870-luku) paras kartanpiirtäjä ja
kuvittaja. Nykyinen on nähtävyyksien ulkopuolella geneerinen (sama sinikattoinen talo toistuu), siinä on liikaa puita (iso pyöreä
puu lähes joka kadulla) ja värit (valkoiset kadut, siniset katot, kirkas vihreä) eivät sovi muun pelin lämpimään seepiaan.
Tämä on yksi koepala; koko kaupunki vasta omistajan päätöksellä.

## Aineisto `proto-3d/_tyo/codex/pariisi-uusi-tyyli-20261102/` (SHA256SUMS)
- `nykyinen.png` (1024 × 1536): pelin nykyinen piirros tästä rajauksesta (~1 m/px). **Sommittelu tästä:** Seinen rannat, sillat,
  Cité ja Notre-Dame, Hôtel de Ville -aukio, katujen kulku ja nähtävyyksien paikat ja koot (G:n liioittelu, Notre-Dame iso) pysyvät
  näissä kohdissa, jotta pala sopii peliin samaan kohtaan.
- `geometria.png`: lukittu OSM-pohja samasta rajauksesta (valkoinen pienoismalli: korttelit, talojen jalanjäljet, kadut, Seine,
  puistot). **Korttelien muodot, talojen koot ja katuverkko tästä** (sovita nykyisen sommitteluun; muutaman kymmenen px ero on
  liioittelun takia).
- `puut.png`: sama + OSM:n todelliset puut (2211 puuta ja puurivit vihreinä pisteinä). **Puut VAIN näihin kohtiin ja puistoihin.**
  Kapeilla kujilla ja korttelien sisällä ei puita.
- Tyyli: `tyyli-notre-dame-kk.webp` (pääviite), `tyyli-louvre-kk.webp`, `tyyli-grand-chatelet-kk.webp`,
  `tyyli-les-hallesin-hallit-kk.webp` = pelin miniatyyrit: sama kynä ja vesiväri. `tyyli-pelin-eurooppa-varit.jpg` = pelin
  Euroopan kartta, jonka päälle Pariisi aukeaa (paperi ja seepia).
- `omistajan-rajaus-0822.png` = omistajan puhelinkuva nykyisestä (Marais, Temple, Cité vasemmalla alhaalla): tämä alue.

## Tehtävä: `koepala-uusi-tyyli.png` (1024 × 1536 RGB, 1 kuva)
- **Tekniikka:** 1870-luvun paras kartanpiirtäjä-kuvittaja: hieno lämmin seepiamuste ja hillityt vesivärilaveeraukset
  paperinvärisellä pohjalla, kuten miniatyyreissä. Kivi okraa ja kermaa, katot harmaanvioletteja ja -ruskeita, kuparikatot
  vihreitä, Seine vaalea harmaanvihreä hienoin aaltoviivoin, kadut paperia (ei valkoista). Ei kirkasta vihreää eikä sinistä.
- **Kaupunki tunnistettavaksi:** jokainen kortteli omasta muodostaan (`geometria.png`), talotyypit vaihtelevat kuten oikeasti
  (Marais'n vanhat hôtel particulier -pihat, Haussmann-julkisivut bulevardeilla, Cité'n julkiset rakennukset); ei toistuvaa
  mallitaloa eikä toistuvaa korttelia.
- **Sisältö on nykyaikaa** (AIKA): nykyiset rakennukset, Pompidou-keskus (rajauksessa, 48,8607 N 2,3522 E), ihmiset ja liikenne pieninä ja
  harvoina; vain piirrostekniikka on vanha.
- **Kuten G (pysyvät):** pohjoinen suoraan ylös, sama noin 31,8° yläviisto katsekulma, nähtävyyksien liioittelu ja paikat
  `nykyinen.png`:n mukaan, Notre-Dame miniatyyrin käsialalla. Ei tekstejä, nimiä, kehystä, kompassia eikä lintuja.

## Toimitus `_review-uusi-tyyli-20261102/`: koepala + `pari-nykyinen-koepala.jpg` (vierekkäin) + posti SHA256 ja kutsumäärä.
**Vain claude/postilaatikko.** Generointi: Codexin kuvien pysyvä lupa (1 kuva, enintään 2 ottoa). Karttatiedot © OpenStreetMap contributors.
