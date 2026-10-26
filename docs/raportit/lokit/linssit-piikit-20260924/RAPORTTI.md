# Linssien kehyspiikit iPadilla 24.9.2026 (Linssiseppä)

Ajo: `KAUPUNKI=lontoo KESTO=480 Linssit-testit/laitetesti.sh piikit ajo1` (Development-käännös masterista
2f63483, `ui piikit 480 20`, kynnys 20 ms, iPad Pro 11"). Loki: `ajo1/konsoli.txt`. Development-käännös on
releasea hitaampi, joten absoluuttiset ajat ovat ylärajoja. Tavoite (Fable 24.9.): ei yli 16 ms:n kehyksiä
linssin avauksessa eikä pysäkinvaihdossa. Lepotilassa ei ollut yhtään piikkiä.

| Vaihe | Pisin kehys | Raskain osa | Omistaja | Tila |
|---|---|---|---|---|
| Ihmisen matka, avaus | **215,6 ms** | SoundManager.LoadFMODSound 208 ms (kertojan 399 s:n mp3 puretaan PCM:ksi pääsäikeessä) | Linssiseppä | korjattu edfb0b8: `compressed = true` |
| Ihmisen matka, avaus | 50,0 ms | ScriptRunBehaviourUpdate 39,7 ms | Linssiseppä | merkit lisätty, mitataan uudelleen |
| Vertailu, avaus | **100,0 ms** | Korutiini 92,6 ms, GC.Alloc 55,8 ms (maakayrat.json jäsennettiin pääsäikeessä) | Linssiseppä | korjattu edfb0b8: Task.Run |
| Vertailu, avaus | 41,7 ms | Update 26 ms | Linssiseppä | merkit, uusi mittaus |
| Vertailu, arkki | 41,7 ms | UI-asettelu 11 ms, glyfien rasterointi 10,8 ms | Natiivi-UI | ilmoitettu |
| Maatiedot, lehti | **82,5 ms** | TextJob.GenerateText 27,8 ms, asettelu 24,9 ms, repaint 22 ms, korutiini 29 ms, GC.Resize | Natiivi-UI (maalehti) | ilmoitettu |
| Satelliitti, avaus | 48,5 ms | Update 31,2 ms, fontti GPOS 10,5 ms / TMP Parse 12,6 ms | Linssiseppä + Natiivi-UI (fontti) | merkit, uusi mittaus |
| Keksinnöt, avaus | 31,9 ms | Update 15,6 ms, UI-asettelu 7,9 ms, glyfit 7,7 ms | Linssiseppä + Natiivi-UI | merkit |
| Keksinnöt, pysäkki 11 ja 25 | 33,4 ms | UIElementsRepaintPanels 17–19 ms (ConvertMesh), seuraavassa kehyksessä UploadTexture 15 ms | Natiivi-UI (kortti ja kuva) | ilmoitettu |
| Keksinnöt, sulku | 32,2 ms | Audio.Thread 21 ms / ExecuteMainThreadJobs 25 ms (luennan mp3) | Linssiseppä | korjattu edfb0b8 (LuentaSoitin) |
| Topografia ja vesistöt, avaus | 25–34,5 ms | Update 9–20 ms | Linssiseppä | merkit |
| Radio, Lontoo | 25,0 ms | Update 22 ms | Linssiseppä | merkit |

`GfxResource.Register/Unregister` -arvot ovat laskureita, eivät aikoja. Ne eivät kuulu tulkintaan.

## Korjaukset (proto-haara linssiseppa/suorituskyky, edfb0b8)

- EsityksenAani, LuentaSoitin ja RadioAanet lataavat mp3:n pakattuna muistiin (`DownloadHandlerAudioClip.compressed`,
  kuten Aanisoitin ja Puhe). Samalla kertojan PCM-kopio (~140 Mt) jää pois.
- Maakäyrien jäsennys tehdään taustasäikeessä, kuten maissa ja radiossa.
- Profilointimerkit `Update.Linssi.<id>.Avaa|Paivita|Sulje|Vaihtui`, `Update.Linssi.Kerrokset` ja
  `Update.Linssi.Komennot`. Seuraava piikkiajo erottelee linssin oman ajan UI:n kuuntelijoista (Vaihtui).

## Seuraavaksi

Uusi piikkiajo Natiivisepän Development-käännöksellä, kun edfb0b8 on masterissa. Sen jälkeen korjataan
satelliitin, ihmisen matkan ja vertailun Update-aika merkkien perusteella.

## Ajo 2 (Development-käännös c633408 = edfb0b8 + 4a3011e, 24.9.)

Loki: `ajo2/konsoli.txt`. Lepotilassa ei ollut piikkejä. Keksintöjen pysäkinvaihdoissa ja sulussa ei ollut yhtään piikkiä
(Natiivi-UI:n korjaukset ja luennan pakattu mp3).

| Vaihe | Ajo 1 | Ajo 2 | Juurisyy merkeistä | Osa |
|---|---|---|---|---|
| Ihmisen matka, avaus | 215,6 ms | 40,2 ms | ihmisen-matka.Avaa.Linssi 23,4 ms (ydin: muisti, esitys, jatko; eritellään ajossa 3) | logiikka |
| Satelliitti, avaus | 48,5 ms | 40,7 ms | satelliitti.Avaa.Linssi 25,8 ms, josta 64 TextMeshPro-nimeä ja fontin OpenType-taulut ~12 ms | UI-teksti (3D) |
| Keksinnöt, avaus | 31,9 ms | 33,3 ms | keksinnot.Vaihtui 11,4 ms (Natiivi-UI:n kuuntelijat), Avaa 9,1 ms | UI + logiikka |
| Vesistöt, avaus | 34,5 ms | 32,0 ms | vesistot.Avaa 12,8 ms (viivaverkot ja nimet), renderöinnin ScheduleDraw 15,7 ms | geometria + teksti |
| Topografia, avaus | ~25 ms | 26,4 ms | topografia.Avaa 7,4 ms, renderöinti 11 ms | geometria |
| Vertailu, avaus | 100,0 ms | 25,0 ms | vertailu.Avaa 15,4 ms (maanimet) | UI-teksti (3D) |
| Maatiedot, lehti | 82,5 ms | 67,2 ms | Natiivi-UI:n korutiini 38 ms, TextJob.GenerateText 26,5 ms, GC.Resize | UI (maalehti) |
| Radio, Lontoo | 25,0 ms | 25,1 ms | komento 23,5 ms ilman linssimerkkiä → radion virta, viritin ja korostus merkitty ajoon 3 | ääni / natiivi soitin |
| Radio, avaus ja sulku | 25 ms | 23–25 ms | UIElementsRepaintPanels 19 ms | UI |

Kaikissa jäljellä olevissa on yksi pitkä kehys; toistuvia piikkejä ei ole. Development-käännös on releasea
hitaampi, mutta eroa ei ole mitattu. Release-lukemat saadaan vasta, kun samat merkit ajetaan releasessa (ei ProfilerRecordereita).

**Korjaukset ajoa 3 varten (linssiseppa/piikit2 3dfc383):**
- TextMeshPro-nimet rakennetaan Kehysjonolla (2 ms/kehys) astronautin, vesistöjen ja maanimien kerroksissa. Astronautin nimet näkyvät vasta laskeutumisen jälkeen, joten viive ei näy. Vesistöjen ja vertailun nimet ilmestyvät muutaman kehyksen kuluessa (tarkistetaan iPad-kuvasta ajossa 3).
- NimiKortti on välimuistissa (koko kohtauksen läpi käyvä haku pois avauksesta).
- Merkit: ihmisen matkan Avaa.Muisti, Avaa.Esitys ja Avaa.Jatka; Ymparisto.Pelikerrokset, AjaKamera ja Kirjaa; radion Virta.Avaa, Viritin.Aloita ja Korosta.

**Muiden osuudet:**
- Natiivi-UI: maalehti (67 ms), keksintöjen Vaihtui-kuuntelijat (11 ms), radion paneelin repaint (19 ms).
- Natiiviseppä: renderöinnin ensikehys vesistöjen ja topografian avauksessa (ScheduleDraw / SRP Batcher 10–16 ms, uudet materiaalit ja verkot).

## Ajo 3 (Development-käännös ef84aae = piikit2 + paketti2, 24.9.)

Loki: `ajo3/konsoli.txt`. Kehysten tavoite tässä käännöksessä on 8,33 ms (120 Hz).

| Vaihe | Ajo 2 | Ajo 3 | Linssin oma osa ajossa 3 | Seuraava korjaus (piikit3 39846ad) |
|---|---|---|---|---|
| Satelliitti, avaus | 40,7 | 40,2 ms | Avaa 12,9 ms (oli 28,8); LateUpdate 12 ms = ensimmäinen nimi ja fontin OpenType-taulut 11 ms | fontin esilämmitys käynnistyksessä |
| Ihmisen matka, avaus | 40,2 | 40,7 ms | Avaa.Linssi 22,7 ms = vanapiirron rakennus (~4 ms Macilla) ja rantamaskin 4 Mt:n tavumuunnos ja tekstuuri (~13 ms Macilla) | piirto valmiiksi taustasäikeessä, jaettu maskitekstuuri |
| Vertailu, avaus | 25,0 | 23,6 ms | Avaa 6,8 ms (oli 15,4) | – |
| Keksinnöt, avaus | 33,3 | 25,1 ms | Vaihtui 6,8 (UI), Avaa 4,5 | – |
| Vesistöt, avaus | 32,0 | 32,4 ms | Avaa 10,6 ms; renderöinnin ScheduleDraw 17,6 ms | Natiiviseppä: ensipiirron lämmitys |
| Topografia, avaus | 26,4 | 24,1 ms | Avaa 6,2 ms; renderöinti 10,5 | Natiiviseppä |
| Radio, Lontoo | 25,1 | 24,9 ms | Virta.Avaa 15,9 ms = MatkakirjaRadio.mm setCategory/setActive pääsäikeessä | istunto sarjajonoon |
| Maatiedot, lehti | 67,2 | 49,2 ms | – | Natiivi-UI: ExecuteMainThreadJobs 37–43 ms |

Keksintöjen pysäkinvaihdoissa ei ollut piikkejä. Natiivi-UI:n oman ajon 42 ms:n UploadTexture keksintöjen lopussa syntyi
UI:n testinäkymästä (ei linssiä auki).

## Ajo 4 (Development-käännös 63a2852 = piikit3 + avaruusavaus + kamera-ajot, 24.9.)

Loki: `ajo4/konsoli.txt`. Radio soi setActive-muutoksen jälkeen, myös relaunchin jälkeen (`ajo4-radio/`).

| Vaihe | Ajo 3 | Ajo 4 | Juurisyy | Osa / tila |
|---|---|---|---|---|
| Ihmisen matka, avaus | 40,7 | **25,0 ms** | Avaa.Linssi 11,2 ms (oli 22,7) | logiikka, parani |
| Vertailu, avaus | 23,6 | **ei piikkiä** | – | ✓ |
| Maatiedot, lehti | 49,2 | **ei piikkiä** | Natiivisepän 5a5c6e2 | ✓ |
| Keksinnöt, avaus | 25,1 | 23,6 ms | Vaihtui 7,3 (UI), Avaa 3,8 | UI |
| Satelliitti, avaus | 40,2 | 50,0 ms | LateUpdate 16 ms = ensimmäinen 3D-nimi (TMP Parse 14,6: uudet merkit dynaamiseen atlakseen); ScheduleDraw 17,8 | korjaus 2c57d30 (koko merkistö esilämmitetään) + ensipiirto |
| Vesistöt, avaus | 32,4 | 41,7 ms | Avaa 15,7 ms (viivaverkot), ScheduleDraw 18,2 | viivaverkot taustasäikeeseen (seuraava erä) + Natiiviseppä |
| Topografia, avaus | 24,1 | 33,4 ms | Avaa 8,6, renderöinti 10,5 | Natiiviseppä (ensipiirto) |
| Radio, Lontoo | 24,9 (1) | 33,4 ms (9 piikkiä) | Virta.Avaa 9,2 (oli 15,9); UI:n PrepareRepaint 15 ms joka kehys soiton aikana | Natiivi-UI |
| Radio, avaus | – | 32,0 ms | UI repaint 17 ms | Natiivi-UI |

Kehysten tavoite on tässä käännöksessä 8,33 ms (120 Hz), joten yli 16 ms:n kehys tarkoittaa vähintään yhtä pudonnutta kehystä.
Development-käännöksen ja releasen eroa ei ole mitattu.

## Ajo 5 (Development-käännös 3f70eb8 = koreografia2 + vesistot-jono + fontin esilämmitys, 24.9.)

Loki: `ajo5/konsoli.txt`. Fontin esilämmitys: 173 merkkiä, 743 ms käynnistyksessä kuusi merkkiä kehyksessä (ei pitkää kehystä).

| Vaihe | Ajo 4 | Ajo 5 | Jäljellä | Osa |
|---|---|---|---|---|
| Satelliitti, avaus | 50,0 | 40,5 ms | TMP-nimi poissa ✓; Avaa.Linssi 9,8; ScheduleDraw 15,6 (ensipiirto) | Linssiseppä + Natiiviseppä (lämmitys) |
| Vesistöt, avaus | 41,7 | 31,9 ms | Avaa poissa kärjestä ✓; ScheduleDraw 17,9 (ensipiirto) | Natiiviseppä |
| Topografia, avaus | 33,4 | 25,0 ms | Avaa 5,8, RenderLoop 11,2 | Natiiviseppä |
| Ihmisen matka, avaus | 25,0 | 31,5 ms | Avaa.Linssi 12,3 = rantamaskin 4 Mt:n tekstuurin ensimmäinen luonti | korjaus koreografia3: tekstuuri latausvaiheessa |
| Keksinnöt, avaus | 23,6 | 25,5 ms | UI.Linssi.Aikajana 7,7 (Natiivi-UI:n uusi merkki), Avaa 7,3 | UI + Linssiseppä |
| Radio, Lontoo | 9 | 35 piikkiä | UI PrepareRepaint 15 ms joka kehys | Natiivi-UI (luovutuksessa) |
| Maatiedot, lehti | – | 25,2 ms | GC.Collect 5,7, PrepareRenderTarget 5,7 | – |

## Ajo 6 (Development-käännös 7b3adee = koreografia3 + rantamaskin esilataus, 24.9.)

Loki: `ajo6/konsoli.txt`.

| Vaihe | Ajo 5 | Ajo 6 | Jäljellä | Seuraava |
|---|---|---|---|---|
| Ihmisen matka, avaus | 31,5 | 24,1 ms | Avaa.Linssi 10,9 ms, merkityt osat (Muisti, Esitys, Jatka) < 0,5 ms | merkit Avaa.Vanat ja Ymparisto.Musiikki (piikit6 f27d2f1) |
| Satelliitti, avaus | 40,5 | 48,6 ms | Avaa.Linssi 18,5 ms (64 havaintopisteen objektit), ScheduleDraw 20,3 | pisteet Kehysjonolla (f27d2f1) + Natiivisepän varjostinlämmitys |
| Vertailu, avaus | – | 23,3 ms | – | – |
| Keksinnöt, avaus | 25,5 | 24,5 ms | Avaa 7,6, Vaihtui 7,5 (UI.Linssi.Aikajana 6,7) | – |
| Vesistöt / topografia, avaus | 31,9 / 25,0 | 42,0 / 40,1 ms | renderöinnin ensipiirto | Natiiviseppä |
| Radio, Lontoo | 35 piikkiä | **1 piikki** 24,9 ms | Natiivi-UI:n repaint-korjaus toimi | ✓ |

## Ajo 7 (Development-käännös 374fbe6 = piikit6 + VU, 24.9.)

Loki: `ajo7/konsoli.txt`. Jokaisessa vaiheessa enintään 1–2 piikkiä (kynnys 20 ms); lepo, pysäkinvaihdot ja
ihmisen matkan Levantti puhtaat.

| Vaihe | Ajo 6 | Ajo 7 | Raskain osa | Seuraava |
|---|---|---|---|---|
| Ihmisen matka, avaus | 24,1 | 31,7 ms | Avaa 17,4: Avaa.Linssi 11,3, josta **Avaa.Vanat 9,6**; Avaa.Kerros 5,6; Ymparisto.Musiikki ei 12 raskaimmassa | vanat Kehysjonolle (Linssiseppä) |
| Satelliitti, avaus | 48,6 | **33,3 ms** | Avaa 11,1, ScheduleDraw 18,9 (ensipiirto) | varjostinlämmitys (Natiiviseppä) |
| Vertailu, avaus | 23,3 | 23,4 ms | Avaa 8,0 | – |
| Keksinnöt, avaus | 24,5 | 23,6 ms | Vaihtui 7,3 = UI.Linssi.Aikajana 6,4 | Natiivi-UI |
| Topografia / vesistöt, avaus | 40,1 / 42,0 | **31,8 / 31,9 ms** | Avaa 9,2; ScheduleDraw 19,1 (ensipiirto) | Natiiviseppä |
| Vesistöt, sulku | – | 25,1 ms | ExecuteMainThreadJobs 23,6 / Audio.Thread 15,9 (äänen lataus sulkiessa) | selvitettävä |
| Maatiedot, lehti | 25,2 | 33,5 ms | CoroutinesDelayedCalls 16,9, UI ValidateLayout 8,1 | Natiivi-UI |
| Radio, avaus | 24,9 | 25,0 ms | UI PrepareRepaint 17,8 (TextJob, FontAsset.UpdateGlyphAdjustment) | Natiivi-UI (fontti) |

`Update.Linssi.Komennot` sisältää testikomentojen kautta avatun linssin Avaa-ajan (ei erillinen kustannus).

## Ajo 8 (Development-käännös ≥ f5a8906, sisältää piikit7; 24.9. klo 16)

Loki: `ajo8/konsoli.txt`. Ensimmäinen yritys (`ajo8-keskeytynyt/`) keskeytyi, kun sovellus meni taustalle
(iPad oli juuri kytketty). Jokaisessa vaiheessa on enintään yksi tai kaksi piikkiä.

| Vaihe | Ajo 7 | Ajo 8 | Huomio |
|---|---|---|---|
| Ihmisen matka, avaus | 31,7 ms | **ei piikkejä (< 20 ms)** | vanat seuraavaan kehykseen toimi ✓ |
| Satelliitti, avaus | 33,3 | 40,6 ms | ScheduleDraw 25,8 (ensipiirto, Natiivisepän varjostinlämmitys) |
| Topografia / vesistöt, avaus | 31,8 / 31,9 | 32,3 / 32,1 ms | ensipiirto |
| Topografia, sulku | 23,6 | **50,0 ms** | ExecuteMainThreadJobs 45 / Audio.Thread 34,5 / LoadFMODSound: ääni ladataan linssin sulussa (sama kuin ajo 7:n vesistösulku) → Natiivi-UI:n sulkuääni esiladattavaksi |
| Keksinnöt, avaus | 23,6 | 23,6 ms | – |
| Vertailu, avaus | 23,4 | 25,0 ms | – |
| Maatiedot, lehti | 33,5 | 32,6 ms | Natiivi-UI |
| Radio, avaus ja Lontoo | 25,0 | 25,0 ms | – |
