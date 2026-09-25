# Natiivisepän luovutus 25.9.2026 klo 12.2x (c)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: omistajan pysäytys tilinvaihtoa varten (Fable klo 12.1x).
Edellinen luovutus: viesti-natiiviseppa-luovutus-20260925-b.md. Suunnitelma: docs/raportit/build-13-suunnitelma.md.

## Tila (turvallinen: ei mergejä kesken, työkopiot puhtaat)

- **Build 12** = proto-master b79f036 = TF 1.0.12. proto-master 8b3660d0 (palvelutyökalut).
- **juna/b13 75cd4c89**, varmuuskopioitu (natiivi-backup proto/juna/b13 = 75cd4c89, VIKA-tiedosto tyhjä). Tänään junaan
  lisää: Natiivi-UI ylapalkki-73 (73/68/78), nahtavyydet-63 (webp-purku), nostokahva-79, linssikerrokset, saaririvi-74e
  (sis. ihminen-74 f7918f7). Merge-pyyntö kuvineen: proto-3d/lokit/pariteetti-b12/merge-pyynto-natiivi-ui-b13-73-78-63-79-linssit.md.
- Käännösvahti fi.matkakirja.juna-vahti ladattuna (launchctl); se kääntää 75cd4c89:n Laitetestaajan simeihin.
- Oma simulaattori FBBD41D7 sammutettu.

## Valmis

1. **Lentopinnan kylmäkoe** (Fable hyväksyi): oletus 0 pysyy. D ei kaadu, orbit terävä (z8–z10), mutta laskun jälkeen
   harmaita laattalaikkuja ~2 s. Tulos proto-3d/lokit/lentopinta-b13-TULOS.md, kuvat lentopinta-b13-0D*.jpg.
   Haara natiiviseppa/lento-pinta 24259cbc (juna cbf63c96 mergetty, shadergraph generoitu tee_tileset.py:llä; Cesiumin
   lähde: Library/PackageCache/com.cesium.unity@79587D546513/Source/Runtime/Resources). EI build 13:een.
   Valkoinen suorakulmio koneen vieressä lennolla näkyy VAIN lento-pinta-haarassa, ei junassa (mitattu käännöksestä
   53b155e2, lokit/lentopinta-b13-juna/arkki.jpg) → ei b13-korjausta. Kerrottu Fablelle.

## Kesken

1. **Pohjan vaihto** natiiviseppa/pohja-25 **fb200e37** (worktree wt/proto-natiiviseppa-nimikerros): Karttasepän
   2026-09-25-pohja-20260925 (viivaton, Z0–Z9) pohjaksi (Rakennus.LaattaUrl, LaattaMaxTaso 9, Pallo.unity templateUrl,
   rasteriPohja, _maximumLevel 9) ja sileäksi pohjaksi (KarttaKerrokset.SileaUrl, SileaMaxTaso 9). Vektoriranta ja -rajat
   (Rannikko, Rajat, 2026-09-25-gshhs-korkeus) ovat jo junassa. Valtamerinimet ja koristeet ovat uudessa sarjassa laatoissa
   → Nimikerroksen valtameret-oletus ennallaan. Isoisa1873.RajatonPohja (Linssisepän) viittaa yhä 23a-rajattomaan.
   - Käännös juna/b13(d76c9669)+pohja-25 = a72218fc, .app talletettu scratchpadiin (katoaa; käännä uudelleen:
     `proto-kaanna.sh juna/b13+natiiviseppa/pohja-25 FBBD41D7-…`).
   - **Odottaa Karttasepän Z9-synkkausta ämpäriin** (aws s3 sync käynnissä klo 12.02 alkaen, klo 12.21 x ≈ 150–200/512;
     tarkista esim. `curl -sI …/2026-09-25-pohja-20260925/9/511/300.jpg` = 200 ja `pgrep -f "aws s3 sync"` tyhjä).
     Ennen sitä Z9 = 404 → Laattapalvelin antaa pergamentin värisen varalaatan.
   - Kuvapari: ennen-kuvat valmiit (junan käännös 53b155e2) proto-3d/lokit/pohja-25/ennen/ (arkki.jpg: Eurooppa, Ranska,
     Provence, Marseille, Alpit, Kreikka, Ateena). Jälkeen: `APP=<pohja-.app> lokit/natiiviseppa-skriptit/pohjakuvat.sh
     pohja-25/jalkeen` synkkauksen jälkeen, sitten vierekkäin → Fablelle. Sen jälkeen juna-merge.sh natiiviseppa/pohja-25.
2. **Offline Z9** Siirtosepällä (Fablen päätös): offline.jsonin rasteriväleihin uusi pohjasarja, Z9 vain kaupunkien
   ympärille ~0,5° (sama rajaus kuin satelliittipinnan Z8–Z11), muualla Z8. Pyyntö lähetetty 12.1x; odottaa paketin versiota.
3. **Natiivi-UI**: avauskaaro-11 ja maapilleri-41 käännöksessä b13n → merge junaan, kun merge-pyyntö tulee.
4. **BUILD**: merge masteriin sanalla BUILD vasta Laitetestaajan savukierroksen jälkeen (kaava
   lokit/natiiviseppa-skriptit/build12-master.sh; SHA Fablelle ja Julkaisijalle).
5. E28 syvät tasot Z9–Z11 vasta Fablen ilmoituksesta. Pariteetin D-osio: A3/A14/A15 jo junassa.

## Opit

- Käännöspalvelun kopio (Matkakirja-proto-kaannos/Build) ylikirjoittuu seuraavasta käännöksestä: kopioi .app talteen heti
  (tai `simctl get_app_container … app`), ennen kuin ajat vertailuja myöhemmin.
- Käännöspalvelu sammuttaa käynnistämänsä simulaattorin; asennuksen tila voi näkyä vanhana (listapps viittasi
  olemattomaan juna.app-polkuun) → uninstall + install ennen kuvausta.
- Käännöksen sisällön voi todentaa il2cpp-merkkijonoista: `LC_ALL=C grep -a -o … Data/Managed/Metadata/global-metadata.dat`.
- Incremental-käännös kestää nyt ~2 min, kun muutos on pieni.

## Worktreet (katto 3)

wt/proto-natiiviseppa-loydos46 (natiiviseppa/lento-pinta, puhdas), wt/proto-natiiviseppa-nimikerros
(natiiviseppa/pohja-25, puhdas, käytössä), wt/proto-natiiviseppa-saapuminen (natiiviseppa/saattokamera, mergetty — vapaa).
