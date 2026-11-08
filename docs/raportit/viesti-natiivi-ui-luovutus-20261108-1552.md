# Natiivi-UI: luovutus 8.11.2026 klo 15.52 (napautus-3 skenaariovika, kl5 ✓ KK:lle, topoesittelyt AjaEsittelyyn, FPV-maasto ei NUI)

Korvaa luovutuksen -1518 (`git show 3ebac55f7:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1518.md`); siitä yhä voimassa: kohta 1 (FPV-haara
natiivi-ui/fpv-nakyma d1c8a074f/7ddc42970), JONO c (FPV avoimet: tikkujen koko, vuoret peittävät nimet), Opit (-1322).
PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…, KK local_37f7c945-…, Postivahti local_afae44f0-….
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (remote natiivi-backup), nyt haaralla natiivi-ui/topoesittelyt-221 (puhdas).
Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.

## UUSI SÄÄNTÖ (PT 15.2x)
Ennen JOKAISTA iPad-ajopyyntöä: skenaario Macilla (JU:n vuorolla) tai sen ui-tilan komennot läpi koodista (näkyykö kuvattava kerros,
oikea tila kuvaushetkellä) ja pyyntöön rivi "TARKISTUS: …". `ui lentopiilo` piilottaa Nostot/Tilarivi/Matkavalinta/Linssi/Pulu pysyvästi
(UiNakymat.lentoVaihePiilo, ei nollaudu) → ei napautus-/merkkiskenaarioihin. Tarkistus: _tyo/natiivi-ui/skenaariotarkistus-20261108.md.

## TEHTY TÄLLÄ VUOROLLA
1. NAPAUTUS-3 (491fdf026) katsottu: käsittelijä toimii (kierto 54 s, kertoja, juttu auki nn-6, sormi pysäyttää), MUTTA skenaarion
   `ui lentopiilo` piilotti nostokerroksen → merkit/palkki näkymättömiä, "Pick nostoissa: ei mitään" (myös ajot 1–2). Koodissa ei vikaa.
   Uusinta sk-nahtavyysnapautus-3.txt (ilman lentopiiloa) → JU jono, lokit/nui-nahtavyysnapautus-4-491fdf026 (pid 34029).
   _tyo/natiivi-ui/nahtavyysnapautus-3/TULOS.md.
2. KARTTA-LUKITTU-5 (ef81c021d) katsottu: korjaus toimii (vain Musée de l'Armée oman mallin yllä 3,1 em; Carrousel/Auxerrois/Parvis eivät
   leiju). PT kuittasi 16.0x → pari VIETY KK:lle 15.5x (lahi-invalides, lahi-louvre-notredame) + sivuhuomio: "Kunnialegioonan museo"
   kadun päällä ~150 m Hôtel de Salmista itään (vanha ladonta, myöhemmin). _tyo/natiivi-ui/kartta-lukittu-5/.
3. FPV-PIENOISMALLI d1c8a074f "ei maastoa" (PT:n pyyntö): EI FPV-näkymästä – FpvNakyma/KupoliNimet eivät koske kameraan/kerroksiin;
   verrokki 2efebff6e ilman FPV:tä sama oire (fpv-kooste.jpg). Vihje NS:lle: topografian esilataus "(lat, lon, 2000 m, 60°)" dronen
   jalasta, silmä 43–129 km. NS ajaa A/B:n (sk-fpv-ab). _tyo/natiivi-ui/fpv-pienoismalli-d1c8a074f/TULOS.md.
4. TOPOESITTELYT (PT 15.5x): natiivi-ui/topoesittelyt-221 (pushattu natiivi-backup):
   - 2b7e2b091 = NS fdd642058 yhdistetty (PalloKierto.cs: AjaKiertaen + KohdeKiertoHiivu [nähtävyys] JA AjaEsittelyyn [topo] rinnakkain).
   - d48ce3917 LinssiOhjain.TopoKamera → PalloKierto.AjaEsittelyyn (kaari KorkeusKaarelle, kallistus laskeutuessa, alku → loppu lyhintä
     tietä; tauon jatko laskeutumisen jälkeen nykyisestä suuntimasta). TopoKohde.AlkuSuuntima; KS:n pilotti (kohteet-pilotti.json):
     Alpit 45.85/7.35 kaari 5 kall 50, 0→330; Himalaja 28.4/86.9 kaari 8 kall 45, 0→30; TopoKierrosS = 24 (koko kierto).
     Linssit 2270/2270, unity 0. PT kuittasi.
   - Mac-video sk-topoesittely-4-mac.txt JU:n jonossa → lokit/nui-topoesittely-4-d48ce3917. VAIN PT:LLE (KK 13.47: topovideo
     omistajalle vasta iPad-ajona Williamin äänen + ruutukuvien kanssa). Esilataus ennen laskua NS:llä.

## JONO NYT
a) JU: merenpohja-1b c54d3ba0d → napautus-4 491fdf026 → topoesittely-4 d48ce3917 (Mac). JU kuittaa NUI:lle.
   - merenpohja-1b: parit mp-<paikka>-tasainen (1b) | mp-<paikka>-3d (lokit/nui-merenpohja-1-c54d3ba0d), skripti kuten
     _tyo/natiivi-ui/merenpohja-1/ → PT → KK; lokissa "kohokartta tila" tasaisen osuudessa. Sitten tallenne sk-merenpohja-2 (TARKISTUS!).
   - napautus-4: nn-1 Concorden kyltti näkyy, nn-2…5 palkki yläreunassa, ui-loki "Pick nostoissa: merkki" → kuvasarja PT → KK.
     Jos yhä "ei mitään": syy oikean sormen kannalta → PT. AVOIN: 3D-mallin kyltti ei esittele (kysymys PT:lle kuvien kanssa).
   - topoesittely-4: loki "topoesittely <id>: AjaEsittelyyn", "perillä"; video → vain PT.
b) FPV: NS:n A/B-tulos (maasto) ja pm-kuvat; avoimet (tikut 64 pt, vuoret peittävät nimet) PT:lle kuvien kanssa.

## LISÄYS 16.1x (luovutuksen jälkeen tehty – ÄLÄ TOISTA)
- topoesittely-4 d48ce3917 katsottu (Mac-video, vain PT:lle): Alpit 0→330 24 s, Himalaja tauko+jatko nykyisestä suuntimasta ✓.
  _tyo/natiivi-ui/topoesittely-4/arkki.jpg. PT:lle kerrottu.
- merenpohja-1b katsottu: parit kelpaavat (9/9 eri; JU:n lähetysvirhe ei haitannut). Viety KK:lle PT:n pyynnöstä 16.1x
  (Mariaanien piikit ×15-rinteitä, pallonäkymässä ero pieni). _tyo/natiivi-ui/merenpohja-1b/. Seuraava: tallenne sk-merenpohja-2 (TARKISTUS!).
- JUNA 222: kiinteä ladonta oletuksena päällä b3914b64b (natiivi-backup natiivi-ui/kiintea-oletus-222 = JU:n a774658a9 + 1;
  OMISTAJAN PÄÄTÖS 16.0x "Kelpaa"). Kartta-testit 720/720, unity 0. Sha annettu JU:lle ja PT:lle.
- Proto-työkopio nyt haaralla natiivi-ui/kiintea-oletus-222 (puhdas).
- JU:n jonossa enää napautus-4.

## LISÄYS 16.2x – JONON KÄRKI SEURAAJALLE
- napautus-4 katsottu ✓ (Pick nostoissa: merkki; _tyo/natiivi-ui/nahtavyysnapautus-4/), PT välitti KK:lle. JU:n jono tyhjä.
- PT 16.2x: "Jatka Notre-Damen 3D-mallin kyltti → esittely; sha + parit PT:lle." Haara natiivi-ui/nahtavyyden-napautus-222 (491fdf026).
  Ajo 1 (ae84dd1dd): Notre-Damella 3D-malli, sen kyltti ei esittele. NS:n vihje: NahtavyysEsittely.Hiivuta = k => k.KohdeKiertoHiivu()
  vaatii 79f8a637b:n PalloKierto-muutoksen (on natiivi-ui/topoesittelyt-221:ssä). Selvitä ensin, kulkeeko mallin kyltin napautus
  NostotKartalla.Napautus → AvaaNosto → NahtavyysEsittely.Napautus (vai mallin oma kyltti/Kohdenostot.On eri id). Todennus iPadilla
  `ui kohdenostot napauta Notre-Dame` + kuvat (TARKISTUS-rivi; ei ui lentopiiloa).
