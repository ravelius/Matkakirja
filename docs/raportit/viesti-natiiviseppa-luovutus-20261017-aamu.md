# Natiivisepän luovutus 17.10.2026 klo 05.0x (Postivahdin KOVA RAJA 35 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jono (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna198/jono-198.txt (juna197/jono-197.txt = valmis juna).
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (PT = local_5df52e10-…). PT:lle ≤ 3 riviä.
Omistajan pysyvä päätös 16.10. 22.24: kaikki vain YHTEEN avoimeen junaan (nyt 198).

## TILA

- **JUNA 197 VALMIS:** BUILD 197 = b2bc7aac0bcc951f7842d0dbc3c20ac5b6a27f75 (proto master; juna/b25 = runko fd8e3f769, lukituskäännös 3e1182bc9 L2 01.42).
  M = c6bcb6bc4 (#4761, muutosloki 1.1 (197), PT kuittasi). iOS TF -ajo 38977439766 (JU, 01.43). Mac 1.1 (197) TF-ajo 38978772738 SUCCESS 02.08.
  Lukitusehdot täyttyivät: koopenhamina.json v7, manifest-198.json, #4742, Louvre v6k22 (JU), iPad-kehyskuva (lokit/todistus-museo-kehys-ipad-197-20261017-0122).
- **JUNA 198 -runko** natiiviseppa/juna-198 (wt/proto-natiiviseppa-ehdokas) = **60f4445d4** (testit ajossa luovutushetkellä:
  `zsh …/juna198/testit198.sh`; edellinen vihreä 27443edd3 Linssit 1972, Peli 592, Kartta 499). Pohja fd8e3f769 (PT). Sisältö: KS vihjeet cbd0ad793,
  SS siirto-198-1 a8196acdf (⊃ aanivahti), PK iss-ab-198 d58c50517 (KupoliAanet-ristiriita: nimijono lahde.Soi:lla), Valoseppä Linnunrata 4ca02d476,
  SS luennat-v6 c25ed3049, NUI lasipohja e9a2852b4, SS äänipohjan siirto 0bfc62868, LS vapaalento c59d63e01, PK yhteis-198b 6e1e510c8 (ilman C:tä).
- **Lukitus 198 noin 06.30 (PT):** työkalut juna198/lukitse198-ajo/-a/-b.sh, mac198.sh, build198-viesti.txt (master b2bc7aac0 → juna/b26).
  build198-viesti.txt:n rivi 3 "JULKAISUPYYNTÖ: TÄYTÄ …" täytetään PT:n LUKITSE 198 -viestistä (-b estää muuten).
  Muutosloki 198 -luonnos juna198/muutosloki-198-luonnos.txt (267 mrk) lähetetty PT:lle → kuittauksen jälkeen muutosloki-198.txt,
  main-PR `node tools/vienti/muutosloki-natiivi.mjs --versio "1.1 (198)" --teksti …` (worktree tools/uusi-worktree.sh, ≤ 3 lausetta/280 mrk) → M.
  LUKITUSEHTO (JU): aanet/luennat/v6 ämpärissä.
- **Odottaa 198:aan:** LS kontrastikorjaus (jos ehtii), KS iss-rajat 2d0957ef6 (KK ok), Kiina-kuvat (KK ok). PK C intron nykäys → JUNA 199.
- **Lukituksen jälkeen (matala, PT):** todistusajo.sh (wt/proto-natiiviseppa-tyokalut, YHTEINEN) r. 208 + 219: tap-teksti → `rm -f "$D/ui-puu.json"`
  + odota tiedostoa kuten r. 283–284 (kiinteä 1,5 s luki vanhaa puuta kuormassa). Älä muokkaa kesken muiden ajojen.
- Unity-beetaseuranta CronCreate "4 9 * * *" oli istuntokohtainen → luo uudelleen (unity-julkaisut.py).

## OPITUT 16.–17.10. YÖ

- MODE: ristiriitaratkaisu os.replace:lla pudotti tarkista.sh:n +x:n (4d210f6d6) → käännöspalvelu kaatui. Nyt AINA shutil.copymode +
  `git diff --cached --summary | grep "mode change"` ennen jokaista merge-committia (`merge --no-commit`).
- merge-tree: `git merge-tree --write-tree … >/dev/null; echo $?` – älä luota `&& echo` -ketjuun putken kanssa (luin 93dd78948:n väärin puhtaaksi).
- Rinnakkaiset vahdit: uusi vahti (valovahti, liikevahti) kaatuu toisen erän koodiin → PT:n päätöksellä // valopoikkeus: / // liikepoikkeus: rivin perään.
- Peer-viestin "PT kuittasi HH.MM" tulevaisuuden kellonajalla → vahvista PT:ltä ennen yhdistämistä.
- Testi kaatui vain yhdistelmässä (museo AutoZoom, iPad 4:3): aja kaatunut testi erän omasta SHA:sta git archive → scratch + `git init` → kaanna.sh <nimi>.
- Levyhätä = swap (VM-volyymi), ei simudata: `ls -lt /System/Volumes/VM`, `sysctl vm.swapusage`.

## TYÖTILAT

wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-198 – AKTIIVINEN runko), wt/proto-natiiviseppa-juna197 (lukittu fd8e3f769, voi käyttää 199:lle),
wt/proto-natiiviseppa-unity-b5 ja -unity67 (T7, ei poisteta), wt/proto-natiiviseppa-tyokalut (YHTEINEN – ei poisteta).
Appit: lokit/natiiviseppa-app-196-lukitus-sim, _tyo/natiiviseppa/juna-197-app (195 poistettu). Mac: lokit/natiiviseppa-mac-tf-197.
