# Siirtosepän luovutus 5.–6.10.2026 — TILA KLO 23.3x, TILINVAIHTO (Opus 5.5, high)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Unity-proto: linna, opas-kuva, ääni). Lue tämä osio, sitten CLAUDE.md ja Raamatun Ydinajatus kohta 2.
Worktreet: /Users/Shared/Claude/wt/proto-siirtoseppa-*. Käännös vain Julkaisijan "KÄÄNNÖS NYT", simu vain "SIMU NYT"
(oma UDID D5900D45 = siirtoseppa-iPad13, TYHJENNETTY 19.0x, appit asennettava uudelleen). Ei detachia simupaneelista.
Oikeat tapit: lokit/siirtoseppa-alo/.sk (simkosketus, käännä tarvittaessa tyokalut/todistusajo/simkosketus.m).

## TILA 7.10. 09.2x

- **Junaehdokkaat (Päätoimittajalle ilmoitettu):** siirtoseppa/eleet-2 **f73b387a** (puolilähikuva, kääntyminen lepokameran suunnasta,
  kimallus himmenee, savu häivytetään, alarivi + sumu datasta, huonevalintakorjaus) ja siirtoseppa/aanimaisema **d9a1c1b9**
  (kello 1,0 = +7–8 dB, väistö, lennot, ristihäivytys, NykyinenKaupunkiId; OpasSovitin-ristiriita LS1:n kanssa → ratkaisu koehaarassa b04e63b3).
  Todisteet lokit/siirtoseppa-vuoro-0913/{eleet,kello,vene}.
- **Historiamoottori:** siirtoseppa/historia-h0 **3dfac891** (= eleet-2 + master + H0 + V0 mallit + V1 pelaaja olan yli + kävelygeometria:
  KavelyData, SeikkailuKavely, kuoren leikkaukset). Ajo: yhdistelmä 3dfac891 + natiivi-ui/seikkailu-tapit 34cf54b0 + kuumailmapallo-160
  73ed2612 (Julkaisijan jonossa), ajo-kavely.sh KAVELYDATA=file:///Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-kavely-v1/v1/.
- LR: kävely v1 _valmiit/olavinlinna-kavely-v1/v1, v42 (kavely + mallit[]) tulossa, vene + soutu tulossa; venekuvat lähetetty.
- Levy: omat lokit siivottu (~6,4 Gt tänään).

## TILA 7.10. 08.5x — OMISTAJA: HISTORIAMOOTTORI (seikkailut maan tasalta, VAPAA KÄVELY), SIIRTOSEPPÄ JOHTAA

- Arkkitehtuuri + pystyleikkeen vaiheet V0–V7 + tarpeet LR:ltä: docs/raportit/siirtoseppa-historiamoottori-20261007.md (kohta 11 =
  vapaa kävely, Päätoimittaja kuittasi). Pystyleike Laituri → Keittiö → Kappeli ~10 min; tarina/arvoitus Päätoimittajalta.
- **siirtoseppa/historia-h0 a419e639** (wt/proto-siirtoseppa-face, eleet-2:n päällä): H0 rakennus-id → juuri (poikki rakennus <id>,
  rakennuskohtaiset PlayerPrefs-avaimet) + V0 ymparisto.mallit[] / ymparisto.rantakivet. EI käännetty.
- LR: vene (agentti), rantakivet v1 valmis (_valmiit/olavinlinna-rantakivet-v1), soutu; vapaan kävelyn muodot sovittu (kavely/<osa>-
  tormays.glb + -navi.glb, osat.json, piilo/kiipea/esine/ovi/partio-tyhjät, kapseli 1,75/0,3/0,35, budjetti 150 k / 48 Mt per osa).
- Seuraavaksi: V1 pelaaja + ohjaus (TAPPI / näppäimistö + hiiri / peliohjain) + törmäys ensin nykyisillä tilamesheillä keittiössä.
- Jonossa Julkaisijalla (~09.40): eleet-2 f73b387a (lepokameran suunta viitteenä) + kello b04e63b3 (KelloTaso 1,0) + venekuvat
  (ajo-venekuvat.sh P1–P3 päivä/hämärä LR:lle).

## TILA 7.10. 08.1x

- **eleet-2 = b8de22c2** (käännös 0f84c1b8, lokit/siirtoseppa-eleet2-app): puolilähikuva seuraa puhujan elävää paikkaa/suuntaa,
  lähileikkaus ≤ 1,2 m, puhujan kasvot ≤ 60° kameran suunnasta, kuulija takana → kameraan, etsinnän kimallus himmenee puolilähikuvassa,
  savu häivytetään < 3 m. Päätoimittaja kuittasi kappelin (1344b401); 1f3a6e7c toi kappeliin taantuman (kappalainen selin) → b8de22c2
  korjaa. Ajo ~08.30 (iPad kappeli + keittiö), sitten video Päätoimittajalle vasta oman ruututarkistuksen jälkeen. Junan 158 ehdokas.
- **Äänimaisema/kello**: aanimaisema-157koe 1da72775 (käännös 1e0598d1, lokit/siirtoseppa-aani6-app): KelloTaso 0,6 × väistö (ei Taso),
  soiva lyönti väistää puhetta. Ehto: puheeton +7–8 dB maiseman yli, puheen aikana puhe päällä. Ajo samassa vuorossa.
  aanimaisema-157koe sisältää masterin (juna 156) mergen (OpasOdotusTestit.cs masterin versio).

## TILA 7.10. 07.0x

- **Juna 156 VIE:ssä/TF:ssä** (36b8a852). Linnan osoitin v41 1a1857e0.
- **eleet-2 = cb9abbe9** (wt/proto-siirtoseppa-face): puolilähikuva + kääntyminen (+ ilman paikallaan olevaa kuulijaa kameraan, cb9abbe9
  ajamatta) + alarivi datasta + valaistus.sumu + huonevalintakorjaus. Ajettu ed5a5e89 (=74daa410) iPhone+iPad: lokit/siirtoseppa-vuoro-eleet2/.
  Kappeli OK, keittiössä kokki selin → cb9abbe9. Seuraava: käännös cb9abbe9 + vertailu uudelleen.
- **Äänimaisema**: aanimaisema-157koe eaf80559 (= aanimaisema addb799b + LS1 sallitut-157; opas vaihda -testikomento). Ajo 4
  (lokit/siirtoseppa-aanimaisema4): Pariisi + Venetsia + Kööpenhamina soivat, lennot −30 dB. Kello jäi tallenteen ulkopuolelle →
  ajo-aanimaisema.sh korjattu (kello Notre-Damen jälkeen). Juna 157 -ehdokas; merge-pyyntö Natiivisepälle kun kello todennettu.
- **Kielletty**: v4 (2851289d) kuvat lokit/siirtoseppa-vuoro-eleet2/kielletty/{iphone,ipad}/, v4b (14aa3229) lokit/siirtoseppa-kielletty-v4b/ipad/.

## TILA 7.10. 05.0x

- **Juna 156 = siirtoseppa/linna-valinta 36b8a852** (Päätoimittaja kuittasi d5959026:n tilalle): + savu 156:n huonevalintavika
  (valinta saapumiskaaren aikana ei katkaissut tulevaa kertojan kierrosta; PoikkileikkausLinssi.Kierros, testi). VIE odottaa käännöstä + savua.
- eleet-2 = 50bb5d99 (sis. 36b8a852 + puolilähikuva + alarivi datasta), jonossa junan 156 VIE:n jälkeen.
- Äänimaisema 69558b6b (+ NykyinenKaupunkiId heijastuksella) käännetään yhdessä LS1:n linssiseppa/sallitut-157 a9dc543ec:n kanssa (~05.35).

## TILA 7.10. 04.4x

- **v41 todennettu molemmilla** (TF 154 03.10 + junan 156 koodi a5285a27 04.18–04.21: faceit-glb:t, 11 elettä, 14 reaktiota); osoitin 1a1857e0.
- **Kielletty v3** (64a89525): kiveys näkyy, katon tiilirivit sumeat → LR. Kuvat lokit/siirtoseppa-vuoro-v41/kielletty/.
- **Äänimaisema soi Pariisissa** (f08f28fd, lokit/siirtoseppa-vuoro-v41/aanimaisema/tallenne-aanella.mp4): −39 dB ilman puhetta,
  väistö toimii, ei saumanotkoja. Päätoimittaja: lennoilla hiljaisuus (−inf) → korjattu **28ad5bf2** (lento jatkaa maisemaa + suhina,
  silmukan ristihäivytys kahdella lähteellä, "aanimaisema kello [n]"). Juna 157 -ehdokas. Käännös + simu jonossa (~05.35):
  ajo-aanimaisema.sh (Pariisi + Venetsia + Kööpenhamina + kello, KAAPPAUS 420 s). Ehto: lentojen RMS ≥ ~−45 dB, ei katkoja.
  AUKKO: kartan tunnus Aloituskaupungista, toive ei vaihda → kysytty LS1:ltä 12053ccc:n (KaupunkiTiet.Tunnus) aikataulu.
- **eleet-2 873f24eb** jonossa junan 156 VIE:n jälkeen (iPhone F989814A + iPad, puolilahi 0/1).

## TILA 7.10. 03.4x

- **Linnan osoitin = v41 1a1857e06ec1386f** (Julkaisija 03.39; TF 154 todennettu 03.10, lokit/siirtoseppa-vuoro-v41/tf154*).
  Junan koodin puoli (a5285a27 = d5959026, lokit/siirtoseppa-j156-app) ajetaan simuvuorolla ~04.10: ajo-vuoro-v41.sh
  (kappeli + keittiö eleet päällä tuotannon osoittimella, sitten äänimaisema f08f28fd = ab5407af, lokit/siirtoseppa-aani2-app).
- **eleet-2 8b1a7836** (wt/proto-siirtoseppa-face, siirtoseppa/eleet-2): puolilähikuva puhujaan (poikki puolilahi 0|1) + puhuja
  kääntyy kuulijaan ≤ 150°. EI käännetty. Todennus: ajo-eleet.sh KYTKIN=puolilahi, iPhone + iPad vaaka (Päätoimittaja), junan 156 jälkeen.
- Pelikoodari: tuuli/sade ämpärissä; Venetsia + Kööpenhamina kartat (Päätoimittajan tilaus), lisää vasta Pariisin todistuksen jälkeen.

## TILA 7.10. 03.0x

- **Juna 156 = siirtoseppa/eleet-1 d5959026** (Päätoimittaja kuittasi Natiivisepälle): linna-149 + FACEIT + d7c8596c faceit-kenttä
  (malli3d.skin.faceit, NatiiviGlb faceit → skin.glb) + eleet ca44be90. Ehto: savu tuotannon peilillä a0e53749.
- **LR v40 dfab929f ESTETTY osoittimelta**: TF 154 → hahmot puuttuvat ("morph ei tuettu"). LR tekee v41:n (skin.glb ilman morphia,
  <id>-faceit.glb kenttään skin.faceit) → todennus TF 154 + junan koodi (ajo-vuoro-0258.sh:n kaava) ennen osoitinvaihtoa.
- **Eleiden koe** OK (lokit/siirtoseppa-vuoro-0258/eleet/<huone>-vertailu.mp4), Päätoimittaja kuittasi. SEURAAVA (junan 156 jälkeen):
  kamera puhujan puolilähikuvaan (rauhallinen ~1 s blendi, pieni orbit jatkuu), puhuja kääntyy kuulijaan myös työsilmukassa (kokki),
  todennus iPhone + iPad vaaka, huulet/ilmeet ruuduittain.
- **Kielletty kaupunki** (LR peili 89707f60) aukeaa junan koodilla (kuvat lokit/siirtoseppa-vuoro-0258/kielletty/); alarivi kovakoodattu.
- **Äänimaisema**: 1. ajo epäonnistui (opas jäi aloitusvalikkoon → ajo-aanimaisema.sh korjattu: "opas toive Eiffel-torni Pariisissa").
  2. ajo paljasti viat: aineistoindeksi 403 ilman natiivin otsakkeita + tuuli-01 404 joka kehys → korjattu ab5407af (EI käännetty).
  Pelikoodarilta pyydetty tuuli-01 ja sade-01. Tarvitaan käännös ab5407af + 15 min simua.

## TILA 7.10. 01.5x — OMISTAJA 01.3x: "LINNA LOPPUUN MAHDOLLISIMMAN HYVÄKSI (ELEET YMS.)", SIIRTOSEPPÄ VETÄÄ

- Lista (Päätoimittaja hyväksyi järjestyksen): docs/raportit/siirtoseppa-linna-valmiiksi-20261007.md. 1 eleet (minä), 2 kohdistus
  rakennus.jsoniin + 3 eleleikkeet kaikille ja kuulijan reaktiot (Linnanrakentaja: blender v40, peili ~04.30–05.00), sitten 4–10.
- **Eleet: wt/proto-siirtoseppa-face, haara siirtoseppa/eleet-1 0b0e0e74** (FACEITin 55ad6594 päällä): Ydin Eleajoitus (+5 testiä),
  DioraamaHahmot3D: ajoitetut ele_puhe*/ele_kysymys painotuksiin, kuulijan nyökkäys (ele_nyokkays tai pää), puhujan katse kuulijoihin,
  pään harhailu; poikki eleet 0|1. Käännös Julkaisijan jonossa (levyraja 36 Gi). Koeajo: tyokalut/siirtoseppa-ajot/ajo-eleet.sh
  (kappeli/keittiö eleet 0/1 samalla apilla) → äänellinen video Päätoimittajalle; simuvuoro ~02.20 äänimaiseman jälkeen.
- **Linnapeili a0e537492bff2189 TODENNETTU** (TF 154 + 55ad6594, 0 Exceptionia; lokit/siirtoseppa-peili156) → Päätoimittaja: ehto
  täyttyy, Julkaisija vaihtaa osoittimen. Äänimaisema f90af465 app: lokit/siirtoseppa-aani-app (ajo-aanimaisema.sh).

## TILA 7.10. 00.3x (uusi tili, Opus 5.5 high)

- **Linna-149 183866ed + FACEIT 55ad6594 TODENNETTU** (D5900D45 00.16–00.29, A/V ±1 ms, 0 Exceptionia) → ehdotettu junaan 156,
  tulos Päätoimittajalle. Todisteet: proto-3d/lokit/siirtoseppa-l149v/{ennen,jalkeen}/tallenne-aanella.mp4 (+ tauko.png, veto.png),
  lokit/siirtoseppa-face-v/ik/kappeli-ik0/kasvot-lahikuva.mp4, lokit/siirtoseppa-esineet-v/ (Linnanrakentajalle). Raa'at .mov poistettu
  (levy). Tapit iPad-vaakassa (raakakoordinaatit, pt): II = 993 1299, ☰ = 993 1348; panorointi = veto 500 450 → 500 1000.
- **lokit/siirtoseppa-alo** siivottu: jäljellä .sk, app-183866ed, app-55ad6594, parit.
- **Äänimaisema:** Pariisin kartta ämpärissä (aanet/aanikartta-v1/pariisi.json, yhteensopiva AaniKartta.Lue:n kanssa); silmukat
  aanimaisema-v1/<kerros>-01.mp3 puuttuvat (404) → kysytty Pelikoodarilta (sopimuksen mukaan hänen).
- **COZY:** oma e9729420-käännös peruttu; LS1:n linssiseppa/cozy-kaupunki (sis. e9729420 + COZY_URP + KaupunkiSaa) kääntyi Metalille,
  kevennys a010dc9a (äänet/Luxury-pilvet pois, +140 Mt → mitataan). **Linnan sää: wt/proto-siirtoseppa-cozy, siirtoseppa/cozy-linna
  24eacd5a** (LinnaSaa.cs, koe oletuksena pois, Documents/linna-saa.txt "saa 1 taivas 0 sumu 0 tila Partly Cloudy"; csc ios+COZY_URP 0
  virhettä). EI käännetty eikä simussa. Csc-ansa: COZYn polkujen välilyönnit → käytä vastaustiedostoa ja laske "error CS".
- **Simuvuoroon valmiina:** tyokalut/siirtoseppa-ajot/ajo-peili-todennus.sh (linnapeili a0e537492bff2189: TF 154 787db464 + 55ad6594)
  ja ajo-aanimaisema.sh (Pariisi, vaatii käännöksen c2f93576 ja Pöllön aanikartta-listan #4090).
- **KUITATTU junaan 156** (Päätoimittaja 00.4x): 55ad6594 (sis. 183866ed) → merge-pyyntö Natiivisepälle + ABAB (A 183866ed, B 55ad6594).
  Ennen VIE:tä: #4051 + #4052 mainiin, yhdistetty peili (Linnanrakentaja) ja uusin.json-osoitinvaihto (Julkaisija); nyt osoitin db8630b0.

## Nyt (6.10. 23.3x) — avoimet erät

1. **Linna-149** (wt/proto-siirtoseppa-l149, siirtoseppa/linna-149 **183866ed**, juna 152, EI todennettu): saapuminen.loppu
   "kertoja" (testi), esittelyn tauko II/▶, jakso.nimet nimilappuina, panorointi käännetty, iPad-vaaka + AutoRotation, Codex-
   kasvot pois, kanto/kanto_idle. Käännös 7c62beca lokit/siirtoseppa-alo/app-183866ed. Todennus: ajo-linna-esittely.sh
   (ENNEN = lokit/natiiviseppa-app-150-ea457278 tuotannon peilillä, JÄLKEEN = 7c62beca + PEILI feea163c4ed34d5f; tauko-tap II
   ☰:n vieressä, panorointiveto kierroksen jälkeen), sitten Linnanrakentajan ajo-esineet.sh (peili bba43057) samalla vuorolla.
   jakso.kuva luetaan, näyttö tekemättä (kuva puuttuu Codexilta).
2. **FACEIT** (wt/proto-siirtoseppa-face, siirtoseppa/faceit **55ad6594**, linna-149:n päällä, juna 152, HYVÄKSYTTY, ei
   todennettu): glb morph → blend shapes, Visemit (Linnanrakentajan arvot), räpäytys, aanet[id].kohdistus. Käännös 0960214b
   (app-55ad6594). Video: peili 94a0df22044155fa, kappeli (vouti 9,4–16,1 s ja 25,2–29,0 s) Päätoimittajalle; sitten
   Natiiviseppä iPad ABAB (raja 0,3 ms/kehys).
3. **Kaupunkiäänimaisema** (wt/proto-siirtoseppa-aani, siirtoseppa/aanimaisema **c2f93576**, masterin 3ac88234 + LS1:n silta
   73a0379f mergettynä): Ydin KaupunkiAanimaisema (14 kerrosta ml. rautatie, max 8, 2,5 s liuku, korkeus/alipäästö/tuuli,
   suhina, vuorokausi, väistö −9 dB, kellot) + AaniKartta (Pelikoodarin aanikartta-v1/<id>.json, bilineaarinen, kirkot) +
   Unity KaupunkiAanimaisemaSoitin (vahti lukee OpasSovitin.KaupunkiNakyvissa/KaupunkiKamera/OpasAaniSoi; silmukat
   aanimaisema-v1/<kerros>-01.mp3 file://-suoratoistona; /opas/aineistot-indeksi). Testit 767/767, Unity 0. ODOTTAA:
   Pelikoodarin Pariisin kartta + silmukat → todistustallenne (lento, nousu, nopea siirto, natiivikaappaus) Päätoimittajalle →
   yhteinen merge-pyyntö Natiivisepälle (+73a0379f). Vaihda Tunnus → Kierros.KaupunkiTiet.Tunnus, kun LS1:n 12053ccc on masterissa.
4. **COZY: Stylized Weather 3** (wt/proto-siirtoseppa-cozy, siirtoseppa/cozy **e9729420**, masterin päällä): paketti
   Packages/com.distantlands.cozy.core v3.6.23 ilman Samples~/Content/Demo, LAHTEET.md; lähde _lahteet/unity-paketit-siirtoseppa/.
   EI käännetty (ensimmäinen tuonti + shaderit). Sovittu LS1:n kanssa: yksi tuonti, profiilit Assets/Matkakirja/Saa/ ("linna",
   "kaupunki"), vuorokausi KaupunkiValosta. Linnan sää/pilvet tekemättä; iPad-mittaus + kuvapari ennen junaa.
5. **Katselmoinnit LS1:lle:** kuva-150 e59c9ca0 hyväksytty; ecd0ea94 (kehys lähemmäs) hyväksytty ehdoin (kuvaparit Praha);
   b8b1da9f (korostus + vinjetti) 3 huomiota (post-ketju junan oletuksen ohi, jaettu vinjetti välkkyy, Find-haku).
6. **Muut:** Steam Audio keittiö/piha (wt/proto-siirtoseppa-steam, peili 2147deefd414e4b6) ja Final IK (fik) ennallaan.
   Lupajärjestelmä esti lokien poiston: lokit/siirtoseppa-opas-144d, -opas-jalkeen, -kap143…145pk, siirtoseppa-alo/ennen/t-*.png.

## Valmiit tänään (6.10.)

- Aloitus/Pulu (b6d02f9a juna 147, fcc69f41 ohjeet + valintavihje ilmoitusriviksi), Pulu-chat 7d35f7d9 (juna 149: nosto ei
  sulje, matala Kysy, II/▶, pin yläreunaan). Kuvaparit lokit/siirtoseppa-alo/parit/1–10.

## Aiempi tila 16.2x

### (vanha) 16.2x

- **Odottaa hiljaista D5900D45-vuoroa ~17.10** (TF 150 ensin): käännökset valmiina lokit/siirtoseppa-alo/app-183866ed (7c62beca,
  linna-149) ja app-55ad6594 (0960214b, FACEIT). Ajo: tyokalut/siirtoseppa-ajot/ajo-linna-esittely.sh (UDID APP L N PEILI KESTO).
  ENNEN = lokit/natiiviseppa-app-149vara-e9023eae (tuotannon peili), JÄLKEEN = 7c62beca + PEILI feea163c4ed34d5f, FACEIT =
  0960214b + PEILI 94a0df22044155fa (kappeli, kohdistus aanet['kappeli-keskustelu'], vouti 9,4–16,1 s ja 25,2–29,0 s).
  Tapit simkosketuksella (lokit/siirtoseppa-alo/.sk): tauko II ☰:n vieressä, panorointiveto kierroksen jälkeen.
- **FACEIT** (wt/proto-siirtoseppa-face, siirtoseppa/faceit 55ad6594, linna-149:n päällä, juna 150, HYVÄKSYTTY): glb morph,
  Visemit (Linnanrakentajan arvot), räpäytys, kohdistus. Natiiviseppä ajaa iPad ABAB:n (raja 0,3 ms/kehys) videon jälkeen.
- **Katselmoitu:** Linssisepän kuva-150 e59c9ca0 (oletukset pois kunnes kuittaus).
- Oppaan Kysy (opas → Praha) on tarkoituksella oppaan kerronta, ei Pulu-chat (Päätoimittaja 15.5x).

## Aiempi tila 14.3x

- **Aloitus-pulu** (wt/proto-siirtoseppa-alo): b6d02f9a juna 147; fcc69f41 (ohjeet + valintavihje ilmoitusriviksi) junaan 148/149.
- **Pulu-chat** (wt/proto-siirtoseppa-chat, siirtoseppa/pulu-chat 7d35f7d9, juna-148b:n päällä) KUITATTU junaan 149: noston
  tekstin napautus ei sulje, Kysy → matala chat, Pulun luennan II/▶, pin → yläreunaan ja korvaa noston. Parit parit/7–10.
- **Linna-149** (wt/proto-siirtoseppa-l149, 183866ed): saapuminen.loppu "kertoja", esittelyn tauko, jakso.nimet, panorointi,
  iPad-vaaka + AutoRotation, Codex-kasvot pois, kanto/kanto_idle. EI vielä todennettu: Julkaisijan vuoro ~15.50 (KÄÄNNÖS +
  30 min hiljainen D5900D45), ennen-ajo 148b-apilla (lokit/natiiviseppa-app-148b-8a01ead5), jälkeen peilillä
  dioraama/olavinlinna/feea163c4ed34d5f/ (#4051), esinepeili bba43057b5a83bfe (#4052) erikseen. jakso.kuva-näyttö odottaa kuvaa.
- **Seuraava:** FACEIT morph-tuki (arvio Päätoimittajalla, odottaa kuittausta), Steam Audio keittiö/piha (peili 2147deefd414e4b6).

## Aiempi tila 12.4x

- **Aloitusruutu ja kartan Pulu (omistajan vikaerä, Päätoimittaja 11.42):** haara `siirtoseppa/aloitus-pulu`,
  worktree `wt/proto-siirtoseppa-alo` (säilytä junien ajan).
  - b6d02f9a KUITATTU junaan 147: Pulu piilossa portissa/avauksessa (Aloitusnakyma.PeittaaPulun → UiNakymat);
    napit linkin yläpuolelle vain matalalla ruudulla (SovitaKeskus); ei kuplia: LivianAvaus, LivianPaljastus,
    Saapumisesitys (Pulu.Sano kuplaton).
  - 09158841: aloituslennon ohjeet tilarivin ilmoitukseksi 3 s → juna 149 (148 jo käännetty), odottaa kuittausta.
  - Todisteet ennen/jälkeen: `proto-3d/lokit/siirtoseppa-alo/parit/` (1–5). Skriptit `ajo-aloitus.sh`,
    `ajo-toinen-aloitus.sh`, `kom.sh`; oikeat tapit `simkosketus` (iPad13-paneelin lupa puuttuu).
  - Avoin kysymys Päätoimittajalle: kartan valintavihje (Pulu.NaytaVihje) on yhä Pulun kupla.
- **Lokien poisto estetty lupajärjestelmässä** (~1,7 Gt): komento Päätoimittajalla omistajalle/yösiivoukselle.
- **Poistettu:** worktreet 146, k145, kor, ok. Jäljellä fik (Final IK) ja steam (Steam Audio, ei mainissa).

## Aiempi tila 00.4x

- **Juna 146 (Linssiseppä kokoaa, juna146-silta b7e3e83e):** siirtoseppa/opas-kuvaus bfd0b8af = kaksivaiheinen orbit 388b8707
  (0,9°/s 13 s → 4 s siirtolento: katu/alue +150°, rakennus 30 % lähemmäs, väh. 150 m), lento korkealla ja jyrkkänä 649b30c2
  (TF 144 "mätkähtää"; simussa todennettu 1adcc9ef), OpasOhjaus perussuhteiset rajat bfd0b8af. Linnasta siirtoseppa/kortti-napautus
  85c0a6bb (nimi 3 s, kortti ja nimilaput vain napautuksesta) Natiivisepällä.
- **Pallon tumma vyö oppaan jälkeen:** juurisyy KorkeusKerroin-globaalit (maan keskipiste/akselit) jäivät kaupunkiorigoon;
  Linssiseppä korjasi 229c60e8 (Aseta jokaisen SiirraOrigon jälkeen).
- **Osoitin db8630b07d17411d** todennettu (BUILD 143 + koe 3); Julkaisija vaihtaa Päätoimittajan kuittauksella (#4030).
- **Final IK** siirtoseppa/final-ik 544cd079 (c2d40258:n päällä) — ei junaehdokas ennen simutodistetta (kädet) ja iPad-mittausta (147).
- **Omistajan linjat 5.10. (#4030):** simulaattori vain tarvittaessa (yksi yhteinen video per juna), vika toistetaan ennen
  korjausta, natiivi on malli, pienet korjaukset roolin oman tarkistuksen varassa, nimikyltit 3 s ja kortit vain napautuksesta.

## Aiempi tila 23.1x


- **Juna 144 lähti** (e95826b4: kaupunkikuva 79a3582c, oppaan kamera OpasKuvaus 7d2a70ec + Linssisepän forbidHoles).
- **Juna 145 (kokoaa Natiiviseppä/Linssiseppä):** kappeli = siirtoseppa/linna-146 767fb0e3 (ele-kytkentä + polvillaan puhuminen)
  + siirtoseppa/kappeli-145 0ca128fd (puhujakuva natiivi-ui/puhujakuva-145 6f733f2e + kytkentä); koe 792745f0 todennettu
  (lokit/siirtoseppa-kap145pk). Oppaan tapit (OpasOhjaus 2de41125), kaukokulmat 7ce44e1c ja korostus OpasKorostusKuva 46f452cb
  ovat lontoossa (daeb60d2) — korostusta ei vielä nähty simussa.
- **Osoitin:** db8630b07d17411d todennettu BUILD 143:lla ja koe 3:lla (lokit/siirtoseppa-kap143/-kap144); Päätoimittaja antaa
  omistajalle Run-rivin.
- **Juna 146:** siirtoseppa/kortti-napautus 85c0a6bb (huoneen nimi 3 s, kortti ja nimilaput vain napautuksesta) — odottaa
  käännös- ja simuvuoroa (Julkaisija): ENNEN 792745f0 / JÄLKEEN samalla polulla oikeilla tapeilla (ajo-kortti-tapit.sh, TAP NYT →
  simupaneelista tap → touch $L/<N>/tap-huone|tap-tyhja). Lisäksi linna-146 58636d47 (pään pystykatse ≤ 12°).
- **TYÖTAPA (Päätoimittaja 23.1x):** vika toistetaan oikeilla napautuksilla ennen korjausta; ilman toistoa ei SHA:ta.
- Final IK 60ba4251, Steam Audio cdfe7acd, vesi 1a4e4804: tila Päätoimittajalle 22.4x (146–147).

## Aiempi tila 19.5x


- **Kaupunkikuva junaan 144 — HYVÄKSYTTY (Päätoimittaja 19.5x):** `siirtoseppa/kaupunki-kuva` @ **79a3582c**, worktree
  `wt/proto-siirtoseppa-kk`, Linssisepän `linssiseppa/lontoo`:n päällä, vain `Linssit/Unity/KaupunkiKuva.cs` (tilaa
  `CesiumKaupunki.Avattu/Suljettu`). Junan oletus: Google-SSE 16 (Päätoimittajan muistikatto), MSAA 4x, anisotropia 8–16; sumu
  ja Volume POIS. Viritys ilman käännöstä: laitteen `Documents/kaupunki-kuva-asetukset.txt` (google/maasto/rakennus/msaa/sumu/
  sumualku/sumuloppu/sumualkumin/sumuloppumin/volume/savytys/kontrasti/saturaatio/hehku), A/B `Documents/kaupunki-kuva-pois.txt`.
  Kuvat `proto-3d/lokit/siirtoseppa-kaupunki3/` (A–D, pari-A-B*.png). Sumun/värien viritys jatkuu junan jälkeen; kuvapari
  Päätoimittajalle ennen kuin mitään kytketään päälle. Skripti `ajo-kaupunki-kuva.sh` (KIERROKSET, ASETUKSET_<k>, UIKOMENTO).
- **Final IK** jatkuu: `siirtoseppa/final-ik` @ **60ba4251** (kädet esineisiin, kadet[]-lukija + testi; Grounder pois
  polvistujilta) — ajamatta; appi poistettu levyn takia, käännös uudelleen. Linnanrakentajan esimerkkipeili 9b44d146
  (fatabuurin hoitaja, pulpetti). Skripti `ajo-vuoro-kadet.sh`.

## Aiempi tila 17.3x


- **Juna 144 — merge-pyyntö Natiivisepällä:** `siirtoseppa/linna-144` @ **03d02ee8** (linna-143 b10669da + Natiivi-UI kortti-tiivis a7757d06).
  Päätoimittaja KUITTASI 15.4x. Todisteet: Pulun oikea tap jonottaa keskustelun ajan (`lokit/siirtoseppa-pulutap2/`), lähempi
  keskustelukamera, kortti otsikkoriviksi, ennen/jälkeen (`lokit/siirtoseppa-ennen-jalkeen/`). Käännös vaatii
  `MATKAKIRJA_KIRJASTOT=…/unity-paketit-siirtoseppa/kirjastot` (Cinemachine + Splines). Osoitin TF 144:n jälkeen **56e98a88**
  (#4003, mainista; tarkistettu junan 144 koeapilla 5f257c20 16.55, 0 virhettä).
- **Juna 145 — merge-pyyntö Natiivisepällä:** `siirtoseppa/linna-145` @ **12eeab86** (= linna-144 + 6f7ac8f5 ele-kytkentä
  `vuorot[].ele` → glb-leike `ele_<ele>` kertaliikkeenä + 12eeab86 ele-loki). Päätoimittaja KUITTASI 17.3x; Laitetestaaja
  kuittaa rutiinin, Päätoimittaja katsoo videon `lokit/siirtoseppa-ele2/ik/kappeli-ik1/tallenne-aanella.mp4` ennen VIE 12.
  Eleet näkyvät tuotannossa vasta elepeilillä (#4004, Linnanrakentajan 1f75d8ed-sisältö).
- **Final IK** (omistaja osti 5.10.): `siirtoseppa/final-ik` @ **19944f2d**, worktree `wt/proto-siirtoseppa-fik`. Paketti
  `_lahteet/unity-paketit-siirtoseppa/Final IK.unitypackage`; gitissä vain ajonaikaiset kansiot (ei demoja), LAHTEET.md
  (Asset Store EULA: vain yksityinen proto-git). Tarkistusta varten esikäännetty `dll/RootMotion.FinalIK.dll` (symlinkki
  kirjastot-kansioon). Vaihe 1 FBBIK + GrounderFBBIK (`DioraamaHahmot3D.IK.cs`, päivitys käsin Sekoittimen jälkeen, lattiat
  MeshCollider kerros 30, `poikki ik 0|1`, jalkamittari lokiin). Mittaus (c5cbba3a): kirjuri portailla >5 cm poikkeamat
  65 % → 35 %; seisovat ennallaan. 19944f2d (Grounder pois istuvilta/polvistuvilta) EI vielä ajettu. Seuraavat: Aim IK ja
  Interaction System odottavat Linnanrakentajan dataa (pyydetty 17.3x). iPad-mittaus vasta junaehdokkaana (Päätoimittaja).
- **Steam Audio:** kappelin kaiku leivottu (`siirtoseppa/steam-audio` cdfe7acd, RT60 1,30/1,01/0,85 s, 7 kt); odottaa
  Natiivisepän laitekäännöstä ja iPad-A/B:tä. Ei junaan 144/145.
- **Puhujakuva-koe** (`siirtoseppa/puhujakuva-koe` 1ae53205) odottaa Codexia; ei junaan.
- Skriptit (`proto-3d/tyokalut/siirtoseppa-ajot/`): ajo-linna-ik.sh (OSAT, KAMERA_<huone>), ajo-linna-pulutap.sh,
  ajo-linna-ennen-jalkeen.sh, ajo-vuoro-1715.sh / -1730.sh. Appi: `lokit/siirtoseppa-fik-app` (c5cbba3a) ja
  `lokit/siirtoseppa-juna144koe-app` (5f257c20). Simupaneelin detach irrottaa kaikkien laitteiden paneelit — älä käytä.

## Aiempi tila 14.2x

## Nyt (14.2x)
- **Proto-haarat (kaikki ilman pushia, proto-git):**
  - `siirtoseppa/linna-143` @ 5c12cc5c (worktree wt/proto-siirtoseppa-141): Cinemachine (e9a7915b, blendikäyrä e5c7867b), laineiden uusinta,
    Pulu vain napautuksesta + kuunnelma ainoa keskustelu (cf079e40), kohtaukset v2 -tuki (vuorot, puhuva hahmo, faktat kohteisiin f57f3e20, 7dd23594),
    latauspalkki (3be07c30, todennettu Natiivi-UI 1e32f0b1) + natiivi-ui/latauspalkki mergetty + kytkentä. App lokit/siirtoseppa-5c12-app (fc420a3b).
    MR Natiivisepälle vasta kun Cinemachine ja Pulu-todiste kuitattu (Laitetestaaja toiminnallinen, Päätoimittaja sisältö).
  - `siirtoseppa/latauspalkki-kytkenta` @ da6b8a27 (wt/proto-siirtoseppa-lp): master + latauspalkki + vain LatausOsuus → Natiivisepälle junaan 144.
  - `siirtoseppa/tavli` @ ea02bae1: KUITATTU, MR Natiivisepällä (TF vasta otsikkokorjauksen kanssa, Natiivi-UI 46b62059).
  - `siirtoseppa/vesi` @ 1a4e4804: Stylized Water 3 A/B (oletus pois); kuva vielä huonompi kuin oma (ei heijastusta) → jatkotyö.
  - `siirtoseppa/steam-audio` @ 11518dbd: kappelin leivottu kaiku (DioraamaKaiku, agentin suunnitelma docs-steam-audio-suunnitelma.md),
    simulaattorissa pois. SEURAAVAKSI: leivonta `nice -n 15 tyokalut/kaiku-leivonta.sh kappeli` (Julkaisijan Unity-batch-vuoro) →
    Natiivisepän laitekäännös + koko → iPad A/B (poikki kaiku 0|1) Päätoimittajalle.
- **Odottaa simuvuoroa (~15.05, 25 min):** `ajo-linna-v3.sh` (VANHA=lokit/juna-1.1.143-81ac41ea, UUSI=lokit/siirtoseppa-5c12-app,
  HASH=Linnanrakentajan v3-peili) = osoitinehto: TF 143 lukee v3-datan; Pulu-todiste (ajo-linna-pulu.sh); kirjuri/soutaja (ajo-linna-hahmot.sh
  KIERROKSET=A AHASH=c97dd7e515c71824).
- **v3-äänet:** Pelikoodari _valmiit/linna-kohtaukset-v3; Linnanrakentajalle datasäännöt (kasikirjoitus vain pulu-lenna+taulu, kuunnelma
  kertoja + keskustelu vuoroineen, nimi tyhjä). Osoitinvaihto vasta Päätoimittajan todisteen jälkeen.
- **Käännöksissä aina** `MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/proto-3d/_lahteet/unity-paketit-siirtoseppa/kirjastot`.
- **Kehitystahti (#3992):** VIE 12 ja 20; toiminnallinen kuittaus ensin Laitetestaajalta; todistusajo (tyokalut/todistusajo) kun Pelikoodari
  ilmoittaa mykistyksen valmiiksi.

## Aiempi tila 11.05

## Nyt (päivitetty 11.05)
- **Tavli KUITATTU** (Päätoimittaja ~10.55): proto `siirtoseppa/tavli` @ **ea02bae1** (tekstit HYVÄKSYTTY + laudat v2), merge-pyyntö Natiivisepällä.
  EHTO: TF vain yhdessä Natiivi-UI:n otsikkokorjauksen kanssa ("TAVL I", kapiteelin kirjainväli; tilattu Natiivi-UI:lta). Muuten juna 144.
  Todisteet oikeilla sim-tapeilla: kaappaukset/siirtoseppa-20261005/tavli-laudat-simtap-1052.png (käännös ddbadb73). Simulaattorin tap-lupa on nyt voimassa (omistaja 10.51).
- **Cinemachine vaihe 1**: proto `siirtoseppa/linna-143` @ **c6271398** (e9a7915b Cinemachine + 0fb2fc7b laineiden uusinta + c6271398 blendin pehmennys).
  A/B 566fb9a1 tehty (lokit/siirtoseppa-cm-ab, video kaappaukset/linna-cinemachine-AB-566fb9a1.mp4): levossa ero Ytimeen 0,000 m, napautus pehmeä;
  huippunopeus ~30 % jousta suurempi → c6271398 (blendi + 0,6 s). Käännös jonossa ~11.45, simu ~12.10 (ajo-linna-cm.sh, vain cinemachine-kierros riittää).
  KÄÄNNÖKSET: aina `MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/proto-3d/_lahteet/unity-paketit-siirtoseppa/kirjastot` (esitarkistuksen ScriptAssemblies ilman Cinemachinea).
- **Laineet/tuuli** (Natiivisepän löydös): Aanisoitin.HaePooli uusii Levylle-latauksen 2/5/12 s (0fb2fc7b); A/B:ssä laineet soivat.
- **Stylized Water 3**: proto `siirtoseppa/vesi` @ fb7f7ab2 (yksityinen proto-git, _Demo pois, LAHTEET.md ehtoineen; ei vielä koodissa, vaihe 5).
- **Steam Audio 4.8.1** ladattu (_lahteet/unity-paketit-siirtoseppa, sha256 = GitHub): iOS-kirjastot vain laite-arm64 → simukäännöksissä pois-kytkin; ääni-A/B vain laitteella. Natiiviseppä kuittaa koon (lipo, .app-koko, UnityFramework) ennen junaa. Vaihe 6.
- **Latvus-pari** (27022c94 vs 22968114) toimitettu Linnanrakentajalle; osoitin vaihdettu 22968114:ään 10.45.
- Linnanrakentajan hahmo/Gaia-suositus: natiivikohdat tarkistettu (docs/raportit/suositus-hahmot-gaia-20261005.md, hänen haarassaan).

## Aiempi tila 06.1x

Edellinen luovutus on `viesti-siirtoseppa-luovutus-20261002.md` (5.10. osiot 02.0x ja 05.2x). Tämä korvaa sen jonon.

## Juna 142 — KUITATTU, merge-pyynnöt Natiivisepällä

- **Mylly:** `siirtoseppa/mylly-142` @ **b2f9b0a1**, worktree `wt/proto-siirtoseppa-mylly`, masterin 9663df99 päällä.
  - ✕ → Poistu, JULISTE-otsikko, lippu piiloon, yksi Pelit-rivi.
  - `Aanet.RekisteroiTehoste(omaIsku)`.
  - `Pulu.Peita` → `StyleKeyword.Null`.
  - Vahvistus 1,6 ja lisä-äänet (siirto, mylly, voitto, häviö).
- **Linna:** `siirtoseppa/linna-palaute-142` @ **f531743e**, juna/b13:n päällä.
  - Kameran jousi ja orbit, käsipyöritys 360°.
  - Äänet: ryhmät, väistö, mitatut tasot, huoneäänet vain huoneessa.
  - Avainsanat, kuorivalinta hampurilaiseen, Laiturin leikkauskorjaus.
  - Aanisoitin: saumattomat linssisilmukat.
- **Avainsanadata:** Linnanrakentajan PR (peili 8f4eb611) sai OK:ni. Osoitin on omistajan päätös.
- **360°-veto:** Laitetestaaja todentaa (minulla ei ollut simulaattoripaneelin lupaa).

## Juna 143 — linna (haara `siirtoseppa/linna-143`, worktree `wt/proto-siirtoseppa-141`)

- **Commitit:**
  - **da00c9c6** sauman ristihäivytys 50 ms
  - **e1fdf532** Timeline (DioraamaTimeline + Kertoja-, Jakso- ja AvainsanaKlippi)
  - **b03ef429** Timeline oletuksena päällä (Päätoimittaja). A/B-todiste: lokit/siirtoseppa-linna-timeline, ero ≤ 1 ms, napautus identtinen.
  - **bdd5be5e** teardown-kilpa: DioraamaYmparisto ei pakkaa sulkeutuvan linnan tekstuureja; testikomento `poikki pakota-virhe N`.
  - Kärki **024a098d**.
- **TEHTY 06.13:** teardown todistettu (N 15–75, 0 NRE, lokit/siirtoseppa-linna-virhe).
- ~~**AVOIN, todiste:**~~ viiden N:n latausvirhe (`ajo-linna-virhe.sh`, `APP=lokit/siirtoseppa-linna143b-app` = 698bf6d6).
  - Simuvuoro on noin 06.25 Julkaisijalta.
  - Hyväksyntä: 0 NRE ja "poikki: latausvirhe" joka N:llä.
  - Tulos Päätoimittajalle.
- **TEHTY 06.32:** osoitin-A/B c116f02f vs **27022c94** (AO-B + 8k + tasoitus + avainsanat) kuvattu TF 142:n junan appilla, kuvat Päätoimittajalla; osoitin on omistajan aamupäätös.
- ~~**AVOIN, AO-B valittu:**~~ Linnanrakentaja tekee yhdistetyn peilin (AO-B + 8k + tasoitus).
  - Kuvaa se A:ta (c116f02f) vastaan: `ajo-linna-ao.sh`, vaihda B:n hash.
  - Kuvat Päätoimittajalle omistajan osoitinpäätöstä varten.
- **Odottaa omistajan latauslupaa** (aamun kortti): Cinemachine 3.1.7 + Splines 2.9.1 ja Steam Audio. Suunnitelma: `docs/raportit/linna-unity-suunnitelma-20261005.md`, vaiheet 1, 2b ja 6.
- **Odottaa Päätoimittajan hyväksyntää:** Linnanrakentajan kevennykset A (heijastus kevyellä kuorella) ja C (tilat pois vain yleisnäkymän levossa) (`docs/raportit/linna-kevennys-ehdotus-20261005.md`).
- **iPad-mittaus 00008103** Julkaisijan vuorolla, kun 143 on koottu:
  - fps (mediaani ja 1 %:n alin) junan 142 tasoon nähden
  - muisti
  - Brotli-purun kokonaisaika ja pääsäikeen piikit ensimmäisellä avauksella
  - Linnanrakentajan mittaukset `poikki vesi heijastus 0` ja `poikki kuori kevyt`
- **Muiden työt:**
  - Linssiseppä: tilt-shift ja Volume (vaihe 3). Huone/yleisnäkymä tulee `ViimeisinNakyma.KohdeTila`sta.
  - Natiiviseppä: Brotli (`natiiviseppa/zstd` acb4462a, katselmoitu ja hyväksytty).

## Juna 143 — Tavli (haara `siirtoseppa/tavli` @ **9169187b**, worktree `wt/proto-siirtoseppa-tavli`)

- **Suunnitelma:** `docs/raportit/tavli-suunnitelma-20261005.md` (HYVÄKSYTTY). Botin poikkeama on hyväksytty: helppo valitsee 35 %:n todennäköisyydellä satunnaisesti 8 parhaasta, normaali tekee 10 %:n todennäköisyydellä satunnaisen vuoron.
- **Tehty:**
  - Säännöt, botti ja Peli-testit (412/412).
  - UI Kafeneio-laudalla, 3D-nopat, äänet, Ateenan kohtaaminen, Pelit-rivi.
  - Osuma-ala ± 1 saraketta.
- **Simutodisteet:** `docs/raportit/kaappaukset/siirtoseppa-20261005/tavli-*`
  - oikea polku
  - osuma-ala oikeilla napautuksilla
  - heitto, siirto, lyönti, palkki, poisto ja voitto
- **EI TF:ään** ennen Sisältökirjurin tekstejä (paikkatekstit TODO). Sisältökirjuri aloittaa aamulla.
- **Linnanrakentajalta tulossa:** Bysantti- ja Ottomaani-laudat esikuvatarkistuksen jälkeen. Akustiikkaverkot v1 ovat `_valmiit/olavinlinna-akustiikka-v1/` (Steam Audio, vaihe 6).

## Skriptit ja todisteet

- **Skriptit:** `proto-3d/tyokalut/siirtoseppa-ajot/`
  - `ajo-linna-todennus.sh`, `-kappeli.sh`, `-ao.sh`, `-timeline.sh` ja `-virhe.sh`
  - `ajo-mylly-aani.sh` (kaveri + botti)
  - `ajo-tavli.sh` (rivin napautus 237 258 pt, osuma-ala 61 301 → 84 452)
  - `tallenne-yhdista.py`
- **Todisteet:** `docs/raportit/kaappaukset/siirtoseppa-20261005/` (ei committoitu).

**Huom:** levysiivous tyhjentää vanhoja lokit/*-app-kansioita (levy 97 %), joten käännä uudelleen tai käytä junan appia (lokit/juna-1.1.142-*).
## TILA 7.10. 09.5x — V1-kävelyn ensimmäinen ajo, korjaus ea7a36e4

- V1-ajo (1499a256, iPhone + iPad, lokit/siirtoseppa-kavely1/): kävelygeometria latautuu (5 osaa, 20 merkkiä), pelaaja syntyy
  oikeaan kohtaan ja NUI:n tapit toimivat. Kaksi vikaa: (1) olan yli -kamera ei ottanut kuvaa, vaan lepokamera jäi päälle;
  (2) vesiportilla pelaaja käveli laiturin reunalta veteen ja putosi läpi (vesi ei ole törmäys).
- Korjaus historia-h0 ea7a36e4 (proto, paikallinen): DioraamaCinemachine.PaivitaPelaaja ajaa aivot pelaajan kameralle (prioriteetti
  lepokameroiden yli) ja varalla kopioi kameran tilan suoraan; loki "seikkailu: kamera aivot|suora". Törmäysmeshit kaksipuolisiksi,
  putoaminen palauttaa viimeiseen maakohtaan, aloituskatse oviaukosta osan keskelle, aloitussäde vain kerrokseen 9.
- Julkaisijan jonoon vaihdettu ea7a36e4 + NUI 34cf54b0 + 73ed2612 (LS1:n giza-valmiin jälkeen). Samalla vuorolla: eleet-2-tarkistus,
  apurahakuva (hämärä P1 → lokit/apuraha-kuvat/), laiturin rako LR:lle, LR v42 -peili.
- 09.58: LR:n v43-peili 3ddc05cc85ddbb35 (vene rekvisiittana, laiturin otsalaudat). fc1c13e1: ymparisto.mallit "maailmaan": false
  (tai id vene) → Ymparisto.Rekvisiitta, ei piirretä origoon; LR lisää kentän v44:ään. Julkaisijan jonossa nyt fc1c13e1 + NUI 34cf54b0 + 73ed2612.
  Vuoroskripti valmiina: proto-3d/tyokalut/siirtoseppa-ajot/vuoro-h1.sh (+ kuvat-*.txt; app lokit/siirtoseppa-historia2-app, käännös 10.46) (apurahakuva hämärä P1 ×1,5 → lokit/apuraha-kuvat/, laiturin rako v43,
  eleet-2 puolilähi, kävely v43 iPad + iPhone). Uusi tyokalut/siirtoseppa-ajot/ajo-kuvat.sh (kiinteä kamera + poikki kuva), ajo-kavely.sh PEILI.

## TILA 7.10. 12.13 — historia-vuoro 81574aff ajettu (lokit/siirtoseppa-vuoro-h1/)

- Apurahakuva lokit/apuraha-kuvat/olavinlinna-hamara.png (4128×3096) Päätoimittajalle. Laiturin rako v43: syy (a), otsalaudat korjasivat, LR kuittasi.
- V1-kävely v43: olan yli -kamera toimii ("kamera aivot"), portaat nousevat. Korjattu 457437c0: kävelyosien laatikko-UV (LR:n glb:t ilman UV:ta),
  pinta-aliakset laasti→rappaus, laatta→kivilattia, Ydin PoikkileikkausLinssi.KertojaPois (testi KavelyPoistaaKertojanKierroksen; 810/810).
  LR:lle: UV:t, pintanimet, ovi:kirkkotorni-portaat-alku ilman törmäyspintaa.
- Eleet-2 ruuduittain: puhuja rajattu; tyhjät blendiruudut puhujan vaihdossa + renkaan kaari → b051b5d6 (vaihto leikkaa, rengas 1,5 s).
- Julkaisijan jonoon b051b5d6 + NUI 34cf54b0 + 73ed2612; sitten eleet-2-uusinta (video Päätoimittajalle) + kävely.
- LR v44 tulossa: soutu (_valmiit/olavinlinna-soutu-v1/soutu.json), keittio-g102-tila, kappeli lähteiden mukaan, kävely v2 (Tott-kammio, esine:nauris).
- 12.34: uusinta ec14e9b3 (b051b5d6+NUI) iPad: eleet-2 puolilähi OK (ei tyhjiä ruutuja, video Päätoimittajalle lokit/siirtoseppa-vuoro-h2/eleet/).
  LR v44 peili 5795bcd4039bf161 (soutu, keittio-g102, kappeli lähteistä, kävely v2 UV:llä): kävely tekstuurein, kirkkotorni pihalta.
  e3af31dd: etsinnän renkaat ja syke pois kävelytilassa. Seuraavaksi: V2 venesaapuminen (soutu.json) ja käännös e3af31dd.
- 12.44: V2 venesaapuminen koodattu: 0a2aca06 Ydin Venesaapuminen (+3 testiä, 813/813), ed7a4516 SeikkailuVene + "poikki vene 1 [kesto]|0"
  (reitti merkeistä vene:* / varareitti laiturin kameran suunnasta, nousu:laituri, blendi 1,6 s pelaajaan), 66f3f5bd soutaja irrallisena hahmona.
  LR:lle pyydetty merkit vene:alku/muuri/portti/laituri (kierto_y) + nousu:laituri. Jonossa 66f3f5bd + NUI (4. Julkaisijalla);
  vuoroskripti tyokalut/siirtoseppa-ajot/vuoro-h3.sh (ajo-vene.sh + kävely), app lokit/siirtoseppa-historia4-app.
- 12.52: eleet-2 junaan 161 (Natiiviseppä otti vastaan): siirtoseppa/eleet-2 @ 67728f0b (b051b5d6 poimittu). LR v44b eb413b52d375da8d:
  venereitti vene:alku/muuri/portti/laituri (kierto_y 2,127) + nousu:laituri + istuin_matkustaja. V3: 77492715 Ydin Vartija (+4 testiä,
  817/817), a96bd209 SeikkailuVartijat (NavMesh kävelypinnoista, partio:-reitit, poikki vartijat 1|0|tila). Julkaisijan jonossa a96bd209 + NUI;
  vuoro-h3.sh (vene v44b + kävely VARTIJAT=1), app lokit/siirtoseppa-historia4-app. Päätoimittajalle V1-stillit siitä ajosta.

### JATKA TÄSTÄ (tauko 13.45–15.00, tila 7.10. 12.5x)

1. Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-face, haara siirtoseppa/historia-h0 @ b8724fd8 (paikallinen, ei originia; V4 piiloutuminen mukana).
   eleet-2 @ 67728f0b on Natiivisepän junassa 161.
2. Julkaisijan jonossa historia-käännös b8724fd8 (ilmoitettu a96bd209; kumpi tahansa käy) + natiivi-ui/seikkailu-tapit 34cf54b0 + natiivi-ui/kuumailmapallo-160 73ed2612.
   KÄÄNNÖS KÄYNNISTETTY 13.28 setsid-ajona (tarkista lokit/siirtoseppa-historia4-kaannos.out: KÄÄNNETTY/VIKA; VIKA → käännä uudelleen NYT-luvalla): `PROTO_APP_KOPIO=$PWD/lokit/siirtoseppa-historia4-app nice -n 15 zsh tyokalut/proto-kaanna.sh b8724fd8+34cf54b0+73ed2612`
   (proto-3d:ssa, loki lokit/siirtoseppa-historia4-kaannos.out). Lukko vapaa → SIMU NYT → `zsh tyokalut/siirtoseppa-ajot/vuoro-h3.sh` (iPad).
3. Vuoron jälkeen: venesaapumisen kuvat/video ruuduittain (lokit/siirtoseppa-vuoro-h3/vene), kävely + vartijat (…/kavely);
   Päätoimittajalle 4–6 V1-stilliä (keittiö, kirkkotornin portaat, olan yli) junaan 161 kehittäjäkytkimen taakse; "simu vapaa".
4. Seuraavat vaiheet: V4 (piiloutuminen piilo:-merkkeihin, esineen poiminta ja heitto → SeikkailuVartijat.Aani), Fogg-hahmo
   pelaajaksi (kapselin tilalle, istuin_matkustaja veneessä), valoisuus liekeistä (V7), V5 kappelin valoarvoitus (käsikirjoitus Päätoimittajalta).
5. Pelikoodarin 31 repliikkiä: proto-3d/_valmiit/olavinlinna-repliikit-v1/ (manifest.json, valmis/, ajat/; käsikirjoitus
   docs/raportit/olavinlinna-pystyleike-repliikit.md). Pyydetty vienti media.matkakirja.app/seikkailu/olavinlinna/repliikit-v1/
   — ämpärissä 13.21 (63 tiedostoa, hahmo-id:t <hahmo>-1500); LR tekee portinvartija-1500:n v45:een. Toisto natiivissa: V4/V7 (repliikit tilanteen mukaan).
- 14.05: vuoro-h3 6490286b ajettu (lokit/siirtoseppa-vuoro-h3/): vene merkeillä OK (kamera taakse → 47773a32), laiturin kansi puuttui törmäyksestä
  (LR korjasi), vartija pihalla partio→epäily→kiinni OK, keittiön NavMesh puuttui (→ bfd67992 kaksipuoliset kävelypinnat). V1-stillit
  lokit/siirtoseppa-v1-stillit/ Päätoimittajalle; junahaara siirtoseppa/historia-juna161 @ 526c9373 (b8724fd8 + eleet-2). historia-h0 kärki bfd67992.
  LR tuo Fogg-pelaajan (rakennus.json pelaaja) + laiturin kannen seuraavaan peiliin.
- 14.17: Päätoimittaja kuittasi historia-juna161 @ 526c9373 junaan 161 (korvaa eleet-2:n). Hänen 3 korjaustaan d33bb582 (olan yli FOV 60 / 4,5 m /
  olka 1,45, lähileikkaus ≤ 2,2 m, täytevalo). LR v44c c8a45400570196fe: Fogg (rakennus.json pelaaja) + laiturin kansi. d915022a Fogg pelaajaksi
  (PelaajaMalli Ytimeen + testi, 818/818), 465a8388 SeikkailuRepliikit (soutaja-1/2 venematkalla), a7fc94f4 testikomennot (tapit hiipii|juoksu,
  kavely siirra <merkki>). Jonossa a7fc94f4 + NUI; vuoro-e1.sh → ajo-e1.sh (äänellinen E1-video kahdessa osassa), app lokit/siirtoseppa-historia5-app.
- 14.31: FACEIT ABAB valmis (Natiiviseppä): +0,03 ms/kehys GPU (B 9,39 vs A 9,36, raja 0,3) — FACEIT hyväksyttävä. Osoitinvarmistus
  siirtoseppa/osoitin-varmistus @ 49888505 (peilin vaihto lataa uudelleen, tyhjä osoitin uudelleen, "poikki osoitin esta 1|0"):
  Päätoimittaja kuittasi junaan 161 ehdoin (toisto vanha/uusi, virheilmoitus tilarivillä, lokit + still). Vanha toisto ketjutettu E1:n perään
  (lokit/siirtoseppa-osoitin-vanha), uusi käännös 49888505 jonossa 3. → ajo-osoitin.sh VAIHE=peili ja VAIHE=esta.
- 14.36: E1-ajo 985c758f (lokit/siirtoseppa-vuoro-e1/): vene + soutaja + Fogg OK; viat → 08329b85 (repliikit 2D, laiturilta katse ovelle,
  vartijan mittari hitaammin + takaa-ajo + kiinni 1,2 m, armonaika 4 s). Osoitin vanha toisto OK (lokit/siirtoseppa-osoitin-vanha).
  Jono: osoitin 49888505 (→ vuoro-osoitin.sh, app lokit/siirtoseppa-osoitin-app) ja E1-uusinta 08329b85+NUI (→ APP=…/siirtoseppa-historia6-app
  vuoro-e1.sh). LR:lle: tilan vene kiinnityspaikalla, piilo:tynnyrien-takana irti seinästä.
- 16.01: OMISTAJA 15.5x: testaus kevyemmin (vain automaattiset testit + käännös, kuittaus 1 rivi → Natiiviseppä; simu vain epäselvään vikaan).
  Osoitinvarmistus 49888505 toistot OK (lokit/siirtoseppa-osoitin-toisto/) → merge-pyyntö Natiivisepälle junaan 161.
  E1-uusinta f5882d8c (35ea7ca1): repliikit kuuluvat (+13 dB), piilo toimii, askeleet URL-vika → 186e35e6, kynnyksellä putoaminen → LR.
  Junaehdokas 162: siirtoseppa/historia-juna162 @ a5cd9d81 (historia-h0 186e35e6 + historia-juna161), kuittaus pyydetty Päätoimittajalta.
- 16.05: Päätoimittaja kuittasi juna 162. Kehittäjävalikkoon "Olavinlinna – pelattava pala (kokeilu)" (b47f31d4: LinssiOhjain.AvaaPelattavaPala
  → DioraamaSovitin.PelattavaPalaPyydetty → VenePaalle; laiturilla vartijat; Sulje purkaa seikkailun). Merge-pyyntö Natiivisepälle:
  siirtoseppa/historia-juna162 @ 78e56088 (+ riippuvuus natiivi-ui/seikkailu-tapit 34cf54b0). historia-h0 kärki b47f31d4.
- 16.06: juna 162 -runko (Natiiviseppä) baaa24445 → 3bc7680c1 yhdistetty: historia-juna162 @ a7adab9f (LinssiOhjain-ristiriita ratkaistu), 835/835.
  OMISTAJA 16.0x: roolit eivät tee omia iOS/iPad/Mac-käännöksiä; haaraan riittää unity-tarkistus + automaattiset testit; simukäännös vain
  epäselvään vikaan, ilmoitus Päätoimittajalle etukäteen.
- 16.12: pelattava pala lukee kiinnitetyn v44g-paketin (fd7d3e32, DioraamaSovitin.PelattavaPalaPaketti) peilinä, tuotanto ei muutu (1898cec3).
  Juna 162 SHA → ef6b092d (historia-juna162). LR v44g: laiturin luiska + reunaseinät, keittiön tynnyrit siirretty. Seuraavaksi E2 (poiminta + heitto).
- 16.15: E2 alkuun: 47f7ef95 SeikkailuEsineet (esine:-merkit heitettava + glb, poiminta 1,2 m, heitto 7/3,5 m/s, kolahdus pikari-1 3D +
  SeikkailuVartijat.Aani 12 m; E / peliohjain X / "poikki kavely toiminto"), 829/829. NUI:lta pyydetty toimintonappi (ToimintoPyydetty).
  Seuraavaksi: keittiön repliikit (kokki, vesipoika, vartija) tilanteisiin, juna 163.
- 16.17: d9871e0a repliikit pelitapahtumiin (vartija epäily/etsintä/paluu/kiinni, kokki-harhautus kolahduksesta), 829/829.
  historia-h0 kärki d9871e0a → juna 163 (kuittaus 1 rivi Päätoimittajalta, kun E2 kokonaisuus; NUI toimintonappi tulossa).
- 16.18: Päätoimittaja OK ef6b092d junaan 162. Pala testiosoittimena (levyvälimuisti) historia-h0:ssa → juna 163. NUI toimintonappi
  natiivi-ui/seikkailu-toiminto 43701b94 (kuvakkeet Päätoimittajalla). E3 käsikirjoitus kysytty Päätoimittajalta. Tilinvaihto ~24, luovutus 23.40.
  MUISTA: Wi-Fi/mobiili ei erotella eikä "Wi-Fi suositeltava" -ohjeita (CLAUDE.md).
- 16.23: Päätoimittaja: E2 d9871e0a + NUI 43701b94 junaan 163 kuvakepäätöksen jälkeen; E3-käsikirjoitus docs/raportit/kasikirjoitus-olavinlinna-kappeli-e3.md
  tulossa tänään. E3 perusosat ab9e034a: Ydin Kynttilat (+3 testiä, 832/832), SeikkailuKynttilat (liekit, leivottu _Kirkkaus, kantovalo
  DioraamaLeivottu-varjostimeen, valoisuus vartijoille), toiminto esineiden jälkeen, "poikki kynttilat 1|0|sammuta|oma 0|1|tila".
  LR:ltä pyydetty kappelin merkit (piilo:kaari-ovi, veto:, ontto:, esine:kivi/kalkki/pateeni/liuskekivi, reitti:kappalainen-*).
- 16.30: Foggin mittakaavavika (peri kapselin skaalan) → 678e8a15 historia-h0:ssa, poimittu junaan 162: historia-juna162 @ ee0084ee
  (Natiivisepälle, kuittaus pyydetty). E3: 867f3b69 oma kynttilä näkyväksi liekiksi + veto kallistaa. LR:n kappelin merkit ~1 h:
  kätkö sivualttarin syvennys (0,52×0,60×0,55, kilpien alla), merkit ovi:kappeli-alku, piilo:kaari-ovi, veto:/ontto:syvennys,
  esine:kivi-1..3 (irrotettava), kalkki/pateeni/liuskekivi, reitti:kappalainen-1..5.
- 16.52: LR v44h 87e023c69817a28d (kappeli: syvennys, kivet, kalkki/pateeni/liuskekivi, reitti:kappalainen-1..5). 64ba0459 kivet irrotettaviksi,
  syvennyksen esineet nostettaviksi kivien jälkeen, koputus ("koputa", väliaikainen ääni ovi-puu 0,75), esineiden kierto_y.
  ebdf06e0 pelattava pala → v44h. Puuttuu E3:sta: kappalaisen kohtaus (reitti, kynttilöiden sammutus, paluu lyhdyllä) käsikirjoituksen mukaan.
- 16.56: E3-käsikirjoitus mainissa (docs/raportit/kasikirjoitus-olavinlinna-kappeli-e3.md). Suunnitelma Päätoimittajalle: E3a tänään,
  E3b voudin sääntö, E3c kappalaisen paluu + tyrmä, E3d luukku/ikuinen valo/saumat/4 kiveä/löytö/drone (8.10.). bc6e58a6 E3a valmis koodina
  (SeikkailuKappeli + PiilotetutTilat, "poikki kappeli 1|0|tila"; pelattavassa palassa automaattisesti). LR:lle pyydetty luukku, 4. kivi,
  ikuinen valo, kirja, piilo:alttarin-varjo, portaikko:ylapaa, ovi:paaovi, paluureitit; LR tekee seinäpalan 95–230° kävelyosaan.
  Omistajan lupa äänille kysytty Päätoimittajalta (PUUTTUU-lista). NUI: toimintonapin tilat valmiit (natiivi-ui/seikkailu-toiminto 2ecf2518).
- 16.59: 9f4f4fce E3b voudin sääntö (Ydin VoudinKierros + 3 testiä, 835/835; hehku, askeleet holvin yllä, kiinni → pimeä kappeli).
  9a3357d67 E3c kappalaisen paluu (raapaisu/100 s, kappalainen-2/3, vartija-kiinni-1/2, tyrmä → tallennus), kivet 3 napautusta.
  Seuraavaksi E3d (ikuinen valo, luukku + virtaus, saumat viistovalosta, löytö, kalkki alttarille, drone) — odottaa LR:n merkkejä.
- 17.02: Päätoimittaja: E3a–d OK, äänet ensin CC0 (Freesound/kyles), voudin 2 repliikkiä ja ElevenLabs-tehosteet vasta omistajan luvalla
  (ÄLÄ generoi). Sonnet-agentti hakee 21 CC0-ääntä → proto-3d/_valmiit/olavinlinna-e3-aanet-v1/ (valmis/, raaka/, LAHTEET.md, manifest.json).
  4695eeeb E3d osa 1: kynttilän asetus, saumat viistovalosta, kivet vasta silloin. NUI:lta kysytty paikallisaarteen kutsu löytöön.
- 17.11: E3-äänet ämpärissä (Julkaisija 17.10): seikkailu/olavinlinna/aanet-e3-v1 (19 CC0/PD: Kenney + Commons; puuttuu pulu-siivet, sytytys;
  Freesound-avain tyhjä → Päätoimittajalle). f64ff55fc SeikkailuAanet + kytkennät. 9049d770 löytö NUI:n NaytaLoyto-kutsulla
  (natiivi-ui/seikkailu-toiminto f9f48082). historia-h0 kärki f64ff55fc → juna 163 (E2 + E3a–d osat; NUI-haara mukaan).
- 17.54: E3d valmis 7a95377d (ikuinen valo + luukku paikkamerkein, vaihe 11, nousu: LS2 tekee SeikkailuNousu.Aloita(kamera, lahto, valmis),
  kutsutaan heijastuksella; varanousu; DioraamaSovitin.KameraVapaa). Junahaara 163: siirtoseppa/historia-juna163 @ 2d19eb49 (historia-h0 +
  historia-juna162), 842/842, kuittaus pyydetty; riippuvuus natiivi-ui/seikkailu-toiminto. Paikkamerkit vaihdetaan LR:n peilistä (luukku:koillinen,
  valo:ikuinen, esine:kirja, kivi-4, portaikko:ylapaa).
- 17.56: Päätoimittaja kuittasi historia-juna163 @ 2d19eb49 JO JUNAAN 162 (lukitus 21.15); Natiivisepälle ilmoitettu (+ NUI seikkailu-toiminto,
  LS2 linssiseppa2/e3-nousu = SeikkailuNousu, kutsutaan heijastuksella). Pelikoodari tekee tietokerros-v1 (12 korttia, kenttä lyhyt).
  2bc3ce1f3 V7 valoisuus liekeistä → juna 164.
- 18.06: Tietokerros e140392b (SeikkailuTietokerros; NUI:n kutsut valmiina cbc92a25 natiivi-ui/seikkailu-tietokerros: TietokorttiAvautui = Pulun
  ele utelias, NaytaTietokerros = Pulu ilo, kortisto vasta Pulua napauttamalla; tarjous päättyy kun SeikkailuPelaaja.Aktiivinen = null).
  E3 paikkamerkit vaihdettu LR v44i:hin b4b26a87 (pala d73c80b2): luukku-glb saranalla (95°, yövalo), ikuinen valo -glb, veto kohti
  ovi:kaari-ovi, paluureitti kappalainen-paluu-1…4 ja luukkumuunnelma (sulkee luukun), voudin askeleet vouti-1…8, hehku laskeutumisreitillä,
  piilot kaari-oven syvennys + alttarin varjo (kyyryssä), liinanyytti avautuu (kalkki/pateeni/liuskekivi esiin), kirja lähtee kappalaisen mukana.
  Junahaara siirtoseppa/historia-juna164 @ 1e48174e (juna163 + 2bc3ce1f V7 + e140392b + b4b26a87 + e2bc015d NUI:n null-ansa), 845/845, unity-tarkistus 0;
  kuittaus pyydetty. LS2:n SeikkailuNousu d75b3303 (junaan 163) sopii kutsuuni sellaisenaan.
  JATKA TÄSTÄ: kuittaus → Natiiviseppä; sitten pulun vihjeportaat, tallennus V6, ElevenLabs-äänet vain omistajan luvalla.
- 18.23: LR v44j (42d49bd4 = v44i + Foggin nousu_laiturille) kytketty c652ba83: Fogg aloittaa veneen pohjalta 0,55 m kannen reunasta (reuna ja
  suunta säteillä nousu:laiturin ympäriltä), SeikkailuPelaaja.SoitaEle (kapseli paikallaan, törmäys pois, lopussa root_siirto + idle),
  PelaajaMalli.JuuriSiirto. Junahaara historia-juna164 @ 6d2b1149, 845/845, unity-tarkistus 0; kuittaus pyydetty.
- 18.28: OMISTAJAN PÄÄTÖS (PT:n kautta): historiamoottori ENSIMMÄISEEN PERSOONAAN (malli Thief; ei vartaloa, käsiä eikä peilikuvaa).
  Juna 162 menee nykyisenä. Aloitettu haarassa siirtoseppa/historia-fp @ b2438dbe (historia-h0:n päällä, varmuuskopio natiivi-backupissa):
  silmät 1,62 m / kyyryssä 1,0 m, FOV 62, keho katseen mukana, pystykatse ±75°, Kasi-kantokohta kameran edessä (kynttilä, esineet),
  laiturille nousu kamerapolkuna, ei lähileikkausta, kytkin poikki kavely fp 0|1. 839/839, unity-tarkistus 0. Huomenna jatko
  pelattavuusmallin (docs/raportit/pelattavuusmalli-olavinlinna.md) mukaan; valoisuusosoitin (Thiefin valokivi) tarvitsee NUI-pohjan.
