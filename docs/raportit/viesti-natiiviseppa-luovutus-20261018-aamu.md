# Natiivisepän luovutus 18.10.2026 klo 08.35 (Postivahti: KOVA RAJA 35 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna201/jono-201.txt ja juna202/jono-202.txt.
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (TILINVAIHTO 18.10.: PT local_cf5b4eca-…, JU local_1325b8e8-…, Postivahti local_63227b57-…).

## ENSIN (PT 08.3x)
1. **Mac TF 201 ajo 39100405913** (mac201.sh, KÄÄNNETTY-MAC 2f9b5dc6, kopio lokit/natiiviseppa-mac-tf-201): seuraa `gh run view 39100405913 --repo ravelius/Matkakirja`
   → valmis/epäonnistui yhdellä rivillä PT:lle (ja JU:lle). iOS TF 201 ajo 39099807656 on JU:n.
2. **Juna 202 -runko natiiviseppa/juna-202 = 511a53249** (wt/proto-natiiviseppa-ehdokas, nyt haaralla juna-202) = BUILD 201 2ba609861 + LR yksi-kehys-202 05833ad6e
   (omistajan "Kaksi kehystä" 08.10) + NUI kehysnapit-opas-202 0583403e9. Testit202 VIHREÄT 08.34 (2074/607/508, tarkista 0, peili 0).
   **Kuvakäännös 1 JU:lla** (L1 08.3x → _tyo/julkaisija/juna202-kuva1-app): LR:n seuraaja kuvaa Kaksi kehystä -parin (kärkeen), NUI oman parinsa.
3. Juna 202 jatkuu: uudet erät vain PT:n kuittauksella → merge-tree → `git merge --no-ff` "Juna 202: …" → `zsh juna202/testit202.sh` → sha PT:lle (≤ 3 riviä).
   Ei yhdistämistä testiajon aikana. LUKITSE 202 vain PT:n viestistä (skriptit: kopioi juna201/lukitse201-*.sh, mac201.sh, build201-viesti.txt → 202, master = 2ba609861).

## TILA: BUILD 201 LUKITTU
- PT 08.1x LUKITSE 201 = runko 2f9b5dc64 (kuvakäännös 8, JU 007c891a2) → **BUILD 201 = proto master 2ba609861** (merge juna/b29), puu identtinen, peilit ok.
  Lukituskäännökseksi kelpuutettiin JU:n kuvakäännös 8 samasta rungosta (ei uutta käännöstä). Muutosloki #4849 MERGED = M 3e97fd83e
  (PT:n teksti tiivistetty validaattoriin: 3 lausetta, ≤ 280 mrk). Lukitusehto R2 aanet/taidemuseo-kertoja-v2/manifest-201.json = 200.
- Omistaja 02.03 "Laita kaikki suoraan samaan junaan": yön erät (alun perin juna 202) menivät junaan 201; vanha juna-202 f2b89e8a7 ⊂ 201.
- **Siirtyi junaan 202+ (ei vielä rungossa):** VS sininen maa opas → ISS e9f4f08f6 (ei korjannut, VS jatkaa); LR Andøya-kaukolaatan ETC-virhe
  (RakettiMaasto.cs:521 Compress mip 9 = 6×6, mukana 14.10. alkaen; PT: LR seuraavaan junaan); SS Kaanaan häät -puheotto; KS 8effba503 (5 taistelun kummut, simu kesken).

## LAITEMITTAUS (valmis)
- LampoMittari A|B iPad Pro 13, taidemuseo Valitse näyttely 10 min: A (BUILD 200) 27,3 fps piirtoväli 1 | B (f51e44545) 10 fps piirtoväli 20, thermal 0 molemmat;
  iPad laturissa 100 % → akkua ei voitu mitata. Tulos lokit/lampo-ab-201-20261018-0154/tulos.txt. Työkalut juna201/laite-ab-201.sh, lampo-ab-201.sh (+ yhteenveto.py).

## LEVY
- Poistettu: wt/proto-natiiviseppa-juna-202 (yhdistetty), wt/proto-natiiviseppa-kokoruutu-201 (git worktree remove; kansioon jäi vain .DS_Store – omistajan/PT:n luvalla pois).
- Poistettavissa TF 201:n varmistuttua (omat): lokit/natiiviseppa-app-200-lukitus-sim, -app-kokosivu-201-sim, -app-a200-laite, -app-b201-laite, natiiviseppa-mac-tf-200 (~3 G).
  wt/proto-natiiviseppa-tyokalut on YHTEINEN – ei poisteta.

## OPITUT 18.10.
- laite-sha.sh: T7-kopion Unity-.meta-jäänteet estivät checkoutin ("untracked … would be overwritten") → nyt `checkout -f`.
- Valovahti (tarkista.sh) voi kaatua vasta rungossa, vaikka erän tekijä ilmoitti 0 → aja aina tarkista yhdistyksen jälkeen; punainen → reset edelliseen vihreään + `push -f` peiliin + palaute tekijälle.
- PT:n viestit tulevat usein myöhässä ja ristiin (kuvakäännös 5): toimi viimeisimmän mukaan ja kuittaa yhdellä rivillä, ettei JU käännä kahdesti.
- Unity-beetaseuranta CronCreate "4 9 * * *" on istuntokohtainen → luo uudelleen (unity-julkaisut.py).
