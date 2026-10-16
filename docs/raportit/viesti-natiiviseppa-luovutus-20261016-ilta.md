# Natiivisepän luovutus 16.10.2026 klo 22.2x (Postivahdin KOVA RAJA 35 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna197/jono-197.txt ja juna198/jono-198.txt (juna196/jono-196.txt = valmis juna).
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (PT = local_5df52e10-…). PT:lle ≤ 3 riviä.

## TILA

- **JUNA 196 VALMIS:** BUILD 196 = cbf1d288b (proto master; juna/b24 = runko e3bc359fe, KÄÄNNETTY 49c0f0a3e L2 18.25, Unity 6000.7.0b5).
  iOS TF lähetetty 18.37 (Julkaisija, ajo 38923836532), Mac 1.1 (196) TF-ajo 38927392116 SUCCESS. Muutosloki M = b8aac3e35 (#4706, korvasi #4697).
  Omistaja 15.39 "laita kaikki junaan 196" ja 16.02 "ilman testejä" → vanha 197-runko yhdistettiin 196:een. Muistiajo OHITETTU.
- **JUNA 197 -runko:** natiiviseppa/juna-197 (wt/proto-natiiviseppa-juna197) = **4b6ef2395**, VIHREÄ (Linssit 1929/1929, Peli 590/590, Kartta 495/495,
  tarkista 0), PT kuittasi rungon. Sisältö: BUILD 196 + NUI salilista a60097fef (⊃ 5 TF 188 -koecommitia), Valoseppä savu k7 c5b6dcd1a,
  varjopuoli 32c2ee110. **Ei lukitusta ennen PT:n "LUKITSE 197".** Odottaa: NUI museo-nimi (omistaja 21.38 muutokset; SHA VAIN PT:n erillisellä ok:lla,
  LS:n 90b7a67b3 EI mukaan). Prahan historia v3 ämpärissä – vaatii kytkennän OpasHistoria.Versiot["praha"] (tekijän SHA puuttuu) → muuten 198.
  LUKITUSEHDOT 197 (JU): Louvre-osoitin v6k21 (omistaja hyväksyi k53 20.44), 7 pääkaupunkia worker/web (#4713 f8111eec0, #4721 86dc83b71; ei runkomuutosta,
  natiivi lukee /opas/aineistot ajonaikaisesti) + opas esittely-v2a ämpärissä. Muutosloki 197 kirjoitetaan kun runko lukittavissa (PT kuittaa, ≤ 3 lausetta/280 mrk!).
- **JUNA 198 -runko avattu:** natiiviseppa/juna-198 = 4b6ef2395 (ei omaa worktreetä; peilattu). Jono: SS äänipohja-198 c4ca8207d (EI ennen PT + SS:n lopullista SHA:ta),
  Valoseppä valopohja cc4f1e595 (EI ennen V1/V2-kuvaparia + PT), LS1 Kiinan dynastiat 50ade51e8 (PT: 198; filminauha/kello + Taiwan tulossa → lopullinen kärki),
  LS1 museo-manifest-198 b3885c750 (PT:n kuittaus odottaa; LUKITUSEHTO manifest-198.json ämpäriin), PK pehmeä auto zoom / liikepohja, NUI lasipohja-198 a25eb9122.
  Ennen 198:n lukitusta yhdistä juna-197:n myöhemmät erät 198:aan.
- Työkalut: juna196/lukitse196-*.sh, mac196.sh, build196-viesti.txt → kopioi 197:lle (python-korvaus 196→197, b24→b25, master cbf1d288b, BUILD 196).
  lukitse19x-ajo.sh odottaa VAIN L2:ta (Julkaisijan linja). testit197.sh = juna197-worktree.
- Unity-beetaseuranta: CronCreate "4 9 * * *" oli istuntokohtainen → luo uudelleen (unity-julkaisut.py). Viimeisin 6000.7.0b5.

## OPITUT 16.10. PÄIVÄ

- Muutosloki: työkalu hylkää > 3 lausetta tai > 280 mrk → tiivistä ja anna PT:n kuitata; pois pelaajalle näkymättömät (piilokaupunki, kytkin pois).
- Lukituksen jälkeinen muutoslokipäivitys tehtiin ennen lukitusta uudella PR:llä (rivin teksti vaihdettu, sama versio).
- mac-kaanna.sh vaatii ≥ 30 Gi vapaata (Julkaisijan L2-raja 26 Gi ei riitä) – älä ohita, ilmoita Julkaisijalle.
- Main-repon PR:t (opas/worker) eivät vaadi runkomuutosta, jos natiivi lukee datan ajonaikaisesti → lukitusehto Julkaisijalle.
- zsh: `$R:Assets/...` tulkitaan :A-modifioijaksi → käytä "${R}:polku".
- Levy: poistettu lokit/natiiviseppa-mac-tf-194/195/196 + app-194-lukitus-sim (PT:n pyynnöstä); app-195/196 jäävät.

## TYÖTILAT

wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-196 e3bc359fe = lukittu, voi käyttää 198:lle), wt/proto-natiiviseppa-juna197 (juna-197 4b6ef2395),
wt/proto-natiiviseppa-unity-b5 ja -unity67 (T7, ei poisteta), wt/proto-natiiviseppa-tyokalut (YHTEINEN – ei poisteta).
