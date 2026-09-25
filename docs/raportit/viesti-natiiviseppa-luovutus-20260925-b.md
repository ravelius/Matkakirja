# Natiivisepän luovutus 25.9.2026 klo 10.3x (b)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 71 % (Fable). Edellinen luovutus:
viesti-natiiviseppa-luovutus-20260925.md. Suunnitelma: docs/raportit/build-13-suunnitelma.md (tämä haara).

## Tila

- **Build 12** = proto-master b79f036 = TestFlight 1.0.12. **juna/b13 cbf63c96** (c12ad3ae + siirtokohteet pois linssin
  ajaksi). BUILD-merge masteriin vasta Laitetestaajan savukierroksen jälkeen (kaava lokit/natiiviseppa-skriptit/build12-master.sh:
  valmistelu testihaarassa, LuoPallo + generoidut samaan BUILD-commitiin, SHA Fablelle ja Julkaisijalle).
- Junassa (kaikki todennettu simulaattorissa tai omistajan sessiolla):
  - Natiiviseppä: kaupunkinimet webin ehdokaskehällä (laudan oma asettelu = paketin nimionAnkkuri, pinon kehä, 8 suuntaa,
    lukko, liikevara; varattu lukko vapautuu), rasteriavain (raster-kerrosten kierrätys), kohdesovitus (löydös 56),
    maarajat D7/D8/D11 (+ MaailmaTila PeliOhjaimessa), reitit-b13 (B4/B5/B10/B23/A14/D15, NaytaPeli, ReittiPiste),
    saattokamera (A20/B12–B16, Matkaliike, Laskeutui; B24 kaari lennolla pois), aloitusruutu (löydös 75: Unityn ruutu pois,
    LaunchScreen + Aloitusverho), loydos77 (radion jäänteiden vahti), Sofia kerran, yövalot (Black Marble emissiona,
    YovalotSuodatettu = true), siirtokohteet pois linssin ajaksi.
  - Pelikoodari: liikkuminen (53–60, 58 Maailma, 55 automaattiheitto). Linssiseppä: ihminen-74 (korvasi loydos74),
    radio-sulku-varmistus. Natiivi-UI: 65, 62, 59, liikkuminen-ui, 69, 71, 64, 70, 66, 72, 76, hyppy-kuvat, c16, d6, paljastus-vara.
- Kuvat: lokit/b13-yhdistelma (nimet, katto, panorointi, noppa, kylmä käynnistys), lokit/yovalot-b13, lokit/loydos77.
- Fablen päätökset: B25/D14 hyväksytty poikkeama (LENNON ESITYS kaikille lennoille, kesto TEMPO-linjauksen mukaan);
  löydös 75 todisteeksi simulaattorikuvat 0a–0d (C) ja omistaja katsoo kylmän käynnistyksen build 13:sta (A).

## Kesken

1. **Lentopinnan kylmäkoe**: haara natiiviseppa/lento-pinta 97239dd9 (juna bca83610 mergetty, generaattorin ristiriidat
   ratkaistu, PalloKierto.Asento → KameranAsento). Taustalla ajettiin käännös + kylmakoe.sh 0 ja D → lokit/lentopinta-b13-0 ja
   lentopinta-b13-D (orbit.jpg, konsoli.txt). Katso tulos; jos D ei kaadu ja on terävämpi, tee oletukseksi. Ennen junaan
   mergeä: merge juna/b13 uudelleen (yövalot muuttivat tee_tileset.py:n RadioHamara-runkoa → aja generaattori).
2. **Karttasepän uusi peruskarttasarja 2026-09-25** ämpäriin ~10.45 → pohjan vaihto (Rakennus.LaattaUrl / PohjaPolku,
   Laattapalvelin) ja vektorirajat build 13:een; kysy Karttasepältä polku ja rajakorkeussarja.
3. **Pariteettirivit D-osio** (Pelikoodarin lista docs/raportit/liikkuminen-pariteetti-20260925.md Matkakirja-pelikoodarissa):
   D17 on Natiivi-UI:n (KortinRuutupiste), D13/D14 poikkeama; tarkista jäljellä olevat Natiivisepän rivit (A3/A15 reittiviuhka
   Liiku-painalluksesta — Pelikoodari ohjaa reitit nyt NaytaPelillä).
4. Natiivi-UI:n seuraava yhdistelmä (73, 63, 74e, 79, linssikerrokset, avauskaaro-11) oli käännösjonossa 10.27: odota merge-pyyntöä.
5. E28 syvät tasot Z9–Z11: vasta Fablen ilmoituksesta.

## Työkalut ja säännöt (uutta tänään)

- proto-gitin tyokalut/palvelu/ 8b3660d0: versioitu kopio proto-3d/tyokalut-skripteistä ja launchd-plisteistä
  (synkkaa.sh + commit muutosten jälkeen). Ajettavat polut ennallaan.
- varmuuskopioi-natiivi.sh (Fablen sääntö): force peili/proto/*, master ja juna/* fast-forward, VIKA-tiedosto
  lokit/varmuuskopio-VIKA.txt, tuntiajo junavahdista (lokit/varmuuskopio-viimeisin.txt). Uutta launchd-agenttia ei tehty
  (pysyvä järjestelmäasetus → omistajan lupa).
- proto-kaanna.sh sammuttaa asennuksen jälkeen ne simulaattorit, jotka se itse käynnisti. Oma simulaattori FBBD41D7:
  sammuta kierroksen jälkeen (muisti), testit `hiljaa`-komennolla.
- JUMI → FABLE: jumissa yksi viesti Fablelle (tilanne, vaihtoehdot, suositus), ei korttia omistajalle.
- Levysiivous: Clauden omat työtiedostot (vanhat scratchpadit, Build/laite, dd-laite) saa poistaa Fablen luvalla
  koeajetulla skriptillä (vapauta-levy-natiiviseppa-20260925.sh); lokikansiot omistajan.
- Merge-portti: kuvapari/video/mittaus merge-pyynnössä; muiden omistamiin tiedostoihin (esim. PeliOhjain) omistajan kuittaus.

## Opit

- git merge-tree + commit-tree -koemerge kadottaa historian ja antaa vääriä ristiriitoja: kokeile oikealla mergellä erillisessä haarassa.
- Eleiden koordinaatit Komennot.cs:ssä (veto, nipistys) ovat ruudun osuuksia 0–1. `uusi-peli <siemen> <kaupunki>` peli-komentona.
- zsh: `"$r:refs/..."` tulkitsee `:r`-muokkaimen → käytä `${r}`. Käynnissä olevaa zsh-skriptiä muokataan vain atomisesti (tmp + mv).
- AddComponent<CesiumRasterOverlay> liittää kerroksen heti oletusavaimella "0" (rasteriavain-korjaus kierrättää kerrokset).
- Löydös 77:n "asteverkko" oli radion kuuluvuuskalotti ja maavalo, ei laattojen kattavuus.

## Worktreet (katto 3)

wt/proto-natiiviseppa-loydos46 (natiiviseppa/siirtokohteet-linssi, mergetty — vapaa), wt/proto-natiiviseppa-nimikerros
(natiiviseppa/yovalot, mergetty — vapaa), wt/proto-natiiviseppa-saapuminen (natiiviseppa/saattokamera, mergetty — vapaa).
Väliaikainen haara koe/b13-yhdistelma (proto-git) voi poistaa.
