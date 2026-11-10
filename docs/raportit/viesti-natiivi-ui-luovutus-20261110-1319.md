# Natiivi-UI: luovutus 10.11.2026 klo 13.19 (kontekstivahti 26 %; korvaa -1246:n, jonka kohdat ovat voimassa ellei alla toisin)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870. Natiivin worktree /Users/Shared/Claude/wt/proto-nui-otsikkovarit (haarat alla, natiivi-backup).
Edellinen: `git show 234a24313:docs/raportit/viesti-natiivi-ui-luovutus-20261110-1246.md` (kaupungin luettelo 4fa068fbf, PR 6557).

## PR 6557 + kaupungin luettelo — EI ENÄÄ NUI:N
PT:n lisäys (Postivahti 12.5x): PR 6557:n yhdistää ja JU:lle viennistä ilmoittaa PT. Kaupungin luettelo 4fa068fbf = linkki 224.24 (JU).

## 1. OTSIKKOVÄRIT + KARTAN ☰ — TEHTY, JUNASSA (MR14 → linkki 224.23)
- e557d6419 natiivi-ui/otsikkovarit (pohja julkaisija/linkki-224 b85f0f8b9): välilehtien LINSSIT/PELIT/KARTTA teksti --map-ink /
  valittu --tk-paperi-muste + KoneLihava; ryhmäotsikot (.mk-paneeli--pohja .mk-selite__otsikko.mk-linssivalitsin__valiotsikko)
  paperimusteella + KoneLihava. Kartan Linssit-nappi Ikonit.Valikko (☰); yläpalkki piilossa (vaaka, veto) → suurennuslasi, koska
  yläpalkin ☰ (väkäsnappi) on vieressä (Karttaselite.PaivitaLinssitIkoni).
- Ajot lokit/nui-otsikkovarit-1-mac-* (vaaka) ja -2-pysty-* katsottu. Parit KK:lle: _tyo/natiivi-ui/otsikkovarit-2-{pelivalikko,kulmanappi}-ennen-jalkeen.png.
- OMISTAJAN PÄÄTÖS 13.15 (KK): molemmat "Kyllä, junaan". Uutta: "Valikon otsikot tummemmat ja selvemmät; kartan kulmanapissa valikkokuvake."

## 2. VÄLILEHTIEN POHJAVÄRIT (omistaja 13.16 + 13.17 KK:n kautta) — AJOSSA JU:LLA, SEURAAVA ASKEL
- 17e7601ef natiivi-ui/valilehtivarit (= e557d6419 + Linssit.uss): Pelit --tk-kuulto-mark 22/30 % (murrettu punainen),
  Kartta --tk-kuulto-accent 25/30 % (Pelien entinen beige-ruskea, 13.17 "pelien pohjäväri kävisi aika suoraan kartalle"), Linssit ennallaan.
- JU ajaa sk-valilehtivarit-1.txt (ipad-pysty) → lokit/nui-valilehtivarit-1-17e7601ef. ENNEN-kuvat = lokit/nui-otsikkovarit-2-pysty-e557d6419.
- Tee: katso v-1..v-3 (sips -Z 1000), rajaa valikko täysikoossa ennen | jälkeen ilman selitekaistaa → KK (polku viestissä), tieto PT:lle,
  sitten MR-pyyntö JU:lle (PT 13.2x: KK:n huomiot jatkokorjauksena samaan junaan).

## 3. LONTOO-SAAPUMINEN (omistajan kuva 12.25) — KATSOTTU, MR PT:N SANALLA
- f319b2bae natiivi-ui/lontoo-saapuminen (pohja linkki-224): "LONTOO, ISO-BRITANNIA" + palkki = SaapumisOdotus (kartan latausilmaisin),
  joka piilotettiin trailerin ajaksi vain Pariisin aloituslennolla → nyt SaapumisOdotus.Peitossa = Traileri.Kaynnissa (UiNakymat).
  Lisäksi UiKerros.AjaKameranJalkeen kutsuu kuuntelijat erikseen try/catchissa (TraileriLiike.Ruutu viimeisenä; heittävä
  karttakuuntelija = kuva keskellä jumissa, todennäköisin syy, ei toistettu), TraileriLiike heittävä liike pois, Saapumistraileri
  lopetus aina ajastetaan (NimiUlos/SaapumisMusiikkiVapaa try/catch).
- Ajo lokit/nui-lontoo-saapuminen-1-{b85f0f8b9,f319b2bae} katsottu: ennen ilmaisin iskulauseen päällä, jälkeen ei; loki
  "odotusilmaisin odottaa trailerin loppua lontoo". Pari _tyo/natiivi-ui/lontoo-saapuminen-1-ennen-jalkeen.png PT:llä (13.19).
- PT 13.3x: jälkeen-kuvan l-1 Thamesin vaaleat laikut → tarkistettu: joki ehjä l-2/l-3/l-4:ssä (+6…+40 s) = latausajoitus.
  MR PYYDETTY JU:LTA 13.2x (jonossa; Uutta "Lontooseen saavuttaessa latausrivi ei enää osu kaupungin nimen päälle."), PT:lle kerrottu.
  Seuraa JU:n MR-numeroa/linkkiä.
- NS kuittasi; NS:n 9d5be8823-toisto (karttakorjaus) kesken: jos siinä "KameranJalkeen-kuuntelija heitti" tai matala fps → tieto tähän.

## LISÄYS 13.3x
- Lontoo f319b2bae = MR15 → linkki 224.25 (JU 13.21). Iso iPad error 22 (JU:lla): kaupungit-4 iPad odottaa.
- Välilehtivärit: ajo 17e7601ef katsottu → Pelit-punainen (mark 22/30) jäi beigeksi → 91feac3b2 (mark 30/45 %), uusi ajo JU:lla
  → lokit/nui-valilehtivarit-1-91feac3b2. Katso, tee rajausparit kuten _tyo/natiivi-ui/valilehtivarit-1-v-*-ennen-jalkeen.png
  (ennen = lokit/nui-otsikkovarit-2-pysty-e557d6419, rajaus x 62–100 %, y 3–62 %) → KK, PT:lle tieto, MR JU:lle.

## JONO TÄMÄN JÄLKEEN
Ei muuta NUI:n jonossa (PT:n -1246-jono: otsikkovärit → Lontoo, molemmat tehty). Kun 2 ja 3 kuitattu: rivi PT:lle "JONO TYHJÄ: natiivi-ui".
