# Natiivisepän luovutus 11.11.2026 klo 08.57

Edellinen: -0825 (ac98b75f5, lisäyksineen) VOIMASSA paitsi alla päivitetyt. Syy: kontekstivahti 26 % (7.37).
Cron (klo 9.04 unity-julkaisut.py) ja vahti ovat sessiokohtaisia: LUO UUDELLEEN. Vahti: Monitor
`bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajovahti/vahti.sh` (lisätty kuviot natiiviseppa-saapuminen-* ja natiiviseppa-laattalataus-*).
UUSI wt: /Users/Shared/Claude/wt/proto-natiiviseppa-saapuminen (haara natiiviseppa/saapuminen-pariisi, natiivi-backup, pohja juna-224 494595623).
Käännöstarkistus: `sh Peli-testit/unity-tarkistus.sh` wt:ssä (EI zsh; tarkista "virheitä yhteensä 0" ENNEN committia).

## 1. KAUPUNKIIN SAAPUMINEN, PARIISI KOKEENA (kärki; omistaja 08.34+08.37, PT 08.5x)
TAVOITEKUVA (lue ensin): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saapuminen-kaupunkiin.md
TOTEUTUS 3f75e733a (0651a87bb + aloituslento e70bf93c8 + sulkukorjaus; e70bf93c8 EI käänny), unity 0:
- Uusi Scripts/Peli/PeliOhjain.SaapumisKoe.cs: SaapumisKoeMatkalta (Perilla, myös aloituslento YleisnakymastaKeskustaan-reittiä),
  SaapumisKoeNapautuksesta (ZoomaaKaupunkiin), SaapumisKoeAjo: zoomaus KoeLahestymisM 60 km:iin (kallistus 0) → Introesitys sumealla
  taustalla (NUI: kutsu suoraan, UiNakymat.Hae().Introesitys) + PalloKierto.LataaPeitossa → kamera Pariisin ylle 1,8 × kierron korkeus →
  kuvat KoeKuvat C1–C4 2,7 s välein → Nimi + iskulause + William (KoeWilliamUrl ?? aloitusintron v2-otto) → odotus: puhe ohi + nimi luettu +
  KarttaKerrokset.SaapumisTerava (katto 20 s) → Lopeta → AjaKeskustaanKiertaen KiertoOhje Kallistus 45 → SaavuLehteen (aloituskaupungissa
  lykkäys + Pulu peruu, 2.161).
- Ruudunpaivitys: LataaPeitossa → pysäytyskuvan alla kamera PÄÄLLÄ cullingMask 0 (Cesium lataa, ei piirrä). PalloKierto.LataaPeitossa.
- SaavuLehteen ohittaa SaapumisluentoPois/KorvaaLuennan kokeessa; Saapumisesitys.UusiEsittely false kokeen kaupungissa (NUI:n tiedosto, 1 rivi).
- Komento `peli saapumiskoe 0|1 [lähestymis-m] [kallistus]`.
AJO: JU:n jonossa _tyo/natiiviseppa/saapuminen/ajopyynto-mac-1.md + sk-mac-saapuminen-1.txt → lokit/natiiviseppa-saapuminen-mac-1 (video;
Lontoo → Pariisi liftaus + nimen napautus). JU sai sha-päivityksen 3f75e733a.
SEURAAVAKSI: katso video/kuvat s0–s7, n0–n2 ja lokin "saapumiskoe"-rivit (taso peitteen alkaessa: ei striimiä? pysäytyskuva päällä? häivytyksen
aika ja "terävä/katto"?). Korjaa, sitten KARKEA TALLENNE KK:lle (kopio PT), leikkaamaton (tavoitekuva: Näyttötapa; KK:n liike.py).
AVOIMET: (a) nimi tulee viimeisen kuvan päälle (tavoitekuva: "kuvien päällä" = ok; viimeinen kuva pysyy, kunnes valmis = toteutettu);
(b) Introesitys.Lopeta häivyttää 200 ms + kameran sumennuksen liuku – jos liian äkkinäinen, pyydä NUI:lta pidempi häivytys;
(c) kierron suunta/kaista: täysi ympyrä 38 s (KiertoOhje oletus), omistaja 08.35 ei ±90°-kaistaa; (d) muistihuippu isolla iPadilla ENNEN
junaa (KK:n ehto); (e) toisto (lyhyt versio myöhemmin) vasta omistajan sanalla; (f) kartan pinch-zoom maan näkymästä ei laukaise mitään
(ei ollut ennenkään) – kysy KK:lta, kuuluuko kohtaan 1 "maan yleisnäkymästä".
ÄÄNITTÄJÄ: ottopyyntö lähetetty 08.4x (1 William-otto "Pariisi." + iskulause ≤ 5 s, uusi versiokansio) → kytke osoite KoeWilliamUrl:iin.

## 2. LIIKKEEN LAATTALATAUS → KORJATTU KUVA: _tyo/natiiviseppa/laattalataus/analyysi-1.md
+800 Mt tulee 80°:n KALLISTUKSESTA (Pallo-laatat 426→853, malloc + iogpu), EI liikkeestä; kierto pudottaa muistia. PT:lle kerrottu 08.5x.
Seuraava mittaus (SSE 16/32/64, kaukoraja 80°:ssa, staattinen) vasta PT:n sanalla.

## 3. JUOKSUPELIN PIIRTO
juoksu-piirto-1 VALMIS (lue.py): msaa0 −10,6 ms, varjot0 −7,7/−4,2, leivheitto0 −5,2, kopio0 −3,4/+0,2, jalki0 +6/+13 (?? selvitä),
kaikkipois ristiriitainen (−10,3 / +2,9); jäädytetyn perus ajelehtii ~4 ms. juoksu-piirto-2 KÄYNNISSÄ 08.5x. Kun valmis: vertaa ajot,
katso P*-kuvat täysikoossa (kopio0 = perus?), sitten -2010 kohta 3:n korjaukset (wt proto-natiiviseppa-juoksupiirto) ja pari PT:lle.

## 4. Muut ennallaan (-0825 kohta 4, -1705).

## VIESTIT TÄLLÄ VUOROLLA
NUI: introkomponentti (vastasi: Introesitys suoraan). JU: saapumiskoe-ajo + sha-päivitys. Äänittäjä: ottopyyntö (jonossa). PT: saapumiskoe +
muistipiikin korjaus + luovutus tulossa. PT 08.5x: tavoitekuva (luettu, aloituslento lisätty sen mukaan).

## LISÄYS 09.0x (PT: sana annettu muistimittaukselle)
- SSE-MITTAUS JU:n jonossa (saapumiskokeen jälkeen): _tyo/natiiviseppa/laattalataus/ajopyynto-ipad-1.md + sk-ipad-sse-1.txt (iso iPad, 2 kylmää,
  80° staattinen ilman kiertoa, `komento maasto sse` 16→32→64→16, 45 s / taso) → lokit/natiiviseppa-laattalataus-sse-{1,2}.
  Luenta: N-rivien fp/malloc + A-rivien iogpu + U-rivin Pallo per taso (aikaleimat L-riveistä "maasto sse"); horisonttikuvat h80-* PT:lle
  samalla rajauksella. Tavoite huippu < 3200 Mt ilman näkyvää eroa horisontissa.
- KAUKORAJA 80°:ssa: valmista komentoa EI ole (Komennot.cs: vain maasto sse / maasto lataus / usva). Seuraaja: pieni QA-komento (esim. Cesiumin
  fog culling / culledScreenSpaceError tai kameran kaukoraja), käännös + 2. iPad-ajo. PT tietää.
- Saapumistallenne KK:lle, kopio PT:lle (PT 09.0x vahvisti).

## LISÄYS 2, 09.1x: SAAPUMISKOKEEN MAC-AJO TEHTY (JU 09.04, 3f75e733a) → KK:lle lähetetty (kopio PT), viat kerrottu
Kansio lokit/natiiviseppa-saapuminen-mac-1 (saapuminen-koko.mp4 164 Mt, kuvat s0–s7, n0–n2, unity.log); arkki _tyo/natiiviseppa/saapuminen/arkki-mac-1.jpg.
Lokista: peite 2,22 s (60 km, taso 9.9, piirros 0) → pysäytyskuva 0,36 s → kamera lataa peitossa → kuvat c1–c4 2,7 s välein → nimi 13,46 s →
häivytys 16,74 s ("kartta terävä, lähinäkymä kesken") → kierto 45° 21,76 s → luenta alkaa. Kierto 45° (s5–s6) näyttää hyvältä.
KORJATTAVAT (KK:lle luvattu):
1. HÄIVYTYS LIIAN AIKAISIN: s4 näyttää karkean/harmaan kartan 1–3 s. SaapumisTerava mitattiin peitteen alla 1,8 × korkeudelta ylhäältä, ei lopullisesta
   näkymästä; lähinäkymä kesken. Korjausehdotus: peitteen alla kamera SUORAAN kierron alkunäkymään (45°, kierron korkeus) ja odota
   SaapumisTerava + Laattapalvelin.LahinakymaValmis (katto), tai pidä kamera lopullisessa näkymässä ja tee "ylhäältä liuku" lyhyempänä.
2. NAPAUTUS: peite alkoi 2 220 km:ssä (skenaarion `komento aja 49.5 3.5 0.6 2` vei liian ylös, ja lähestymisajo katkesi KoeLahestymisS + 1 s
   rajaan). Odota lähestymisajo loppuun (pidempi raja korkeuden mukaan) tai mitoita kesto korkeudesta (PalloKierto.MitoitaMatka).
3. Pysäytyskuvan peite lähes musta (TraileriTausta sävy) – kysy KK:lta kelpaako.
4. Skenaarion oleta-rajat: "nimi" 30 → 60, "kierto 45" 15 → 40.
Sitten uusi Mac-ajo → KK, ja iPad-muistimittaus (KK:n ehto) ennen junaa.
