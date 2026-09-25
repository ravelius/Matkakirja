# Natiivisepän luovutus 25.9.2026 klo 15.5x (d)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti ~65 % (Fablen käsky). Edellinen: -c.md (klo 12.2x).
Löydöslista: docs/raportit/omistajan-loydokset-b13-20260925.md (haara claude/bold-ride-vow4ki, Fablen).

## Tila

- **Build 13** = proto-master ddb3cfb6 = TF 1.0.13 (Julkaisija 13.28; vienti ajaa nyt LuoPallon, #3161). master 168fe238 (+junavahti).
- **juna/b13 066c01fb** = build 14 -juna (nimi yhä juna/b13). BUILD-merge masteriin vasta Laitetestaajan savukierroksen jälkeen
  (kaava lokit/natiiviseppa-skriptit/build12-master.sh; sama puu kuin käännöspalvelun testikäännös; SHA Fablelle + Julkaisijalle).
- Junavahti: uusi yläraja 20 min vanhimmasta kääntämättömästä juna-commitista (tyokalut/juna-ajo.sh, --first-parent;
  versioitu master 168fe238).
- Tuotannon sisältö: 1.x v106 (1.41). v107 (1.42, maakuntarajat 138 maata) ämpärissä, palaa tuotantoon vasta build 14:n TF:n
  jälkeen Fablen luvalla (Siirtoseppä kysyy minulta ennen isoja aineistokasvuja).

## Junassa tänään (build 14)

Omat: pohja-25 (peruskartta 2026-09-25 Z0–Z9 + RasterinLaatikko maaMax), 84–85 aloituslento (Mustaverho, topografia koko
lennon, purku saapumiskortin paperin alla, OhitaAloituslento-API), 110 (10 s, dynaaminen aikajana: kaksi lähikäyntiä,
LennonAikajana.JaaAloitus, testi), Fablen A: Sentinel pois liu'usta + lennon pilvien Piilota-korjaus, 98 pallon sävy
(_pallonTummuus, KarttaKerrokset.PallonSavy), 99 napakalotit topografiassa (etelä jääkansi −65,4°, pohjoinen reunaväreillä),
kotimaan korostus (kerma Z3:sta, Maaraja.Pakota, SallittuLinssissa), 111 reittimuste/lentokaari/helmet alfa lineaarikompensoitu,
112 aloitusnäytön kone + punainen viiva (Etusivulento/EtusivunLento, komento `etusivu aika|tila|sumennus`), kuvasumennus pois
linssin ajaksi (PalloKierto.LinssiAuki — Linssisepän rivi 39 -sumeuden juurisyy).
Muiden: Pelikoodari 100/101/104/109/A13/66-7/radio-tila, Natiivi-UI 11/41/63/72/73…/81–83/86–92/96/103/105/106,
Linssiseppä astro-tumma (98).

## Kesken (haarat valmiina, EI junassa)

1. **natiiviseppa/kerma-25 d679fdb3**: Varitaso.Versio = 2026-09-25-p080 (Karttasepän uusi kerma uudelle pohjalle, ämpärissä).
2. **natiiviseppa/verho-ohita dbcc0eb1**: Mustaverho järjestys 44 (< UiKerros.Traileri 45) → Ohita näkyy mustan aikana (Fable).
   Käännös juna+kerma-25+verho-ohita oli käynnissä 15.50 (FBBD41D7): tarkista (a) aloituslennon mustassa näkyy Ohita
   (skripti lokit/natiiviseppa-skriptit/aloituslento84.sh), (b) kerman reuna osuu rantaan (Eurooppa/Marseille). Sitten merget.
   Jos UGUI-verho ei lajittele UITK:n kanssa, Ohita jää yhä alle → vaihtoehto: verho UITK-elementiksi Traileri-kerrokseen.
   Käännös 40a1e50d on asennettu FBBD41D7:ään; klo 15.59 kuvaus epäonnistui (sovellus ei käynnistynyt juuri bootatussa
   simissä → skriptiin lisätty `simctl bootstatus -b`). Pyydä simulaattorivuoro Julkaisijalta ennen ajoa.
   Natiivi-UI lukee Mustaverho.Peitto (> 0,5 = musta) piilottaakseen kaistaleen; paljastus-c16b on jo junassa (066c01fb).
3. **natiiviseppa/maakunnat-kaikki 86e9b4ca** (worktree wt/proto-natiiviseppa-loydos46), VALMIS, EI simulaattorissa nähty:
   maakuntakerros maakohtaiseksi (web asetaMaa): Kartta/Maakuntajako.cs (kaaret maille renkaista, rypäät ±180°, Kreeta/Korsika
   mukaan, Alaska/Havaiji omina), MaaKartta `maakohtainen` (seuraa Varitaso.Kohdetta, rasterointi taustasäikeessä), MaaTaytto
   ±180°, Rakennus: Euroopan rajaus pois, komento `maakunta maa ISO3|pois|tila`, testit 156/156. Mitattu Macilla: jäsennys
   0,3–0,4 s (hetkellisesti ~80 Mt), maa 1–17 ms, tunnuskartta ≤ 16,8 Mt (RUS 8192×1980), suurin 86 aluetta (RUS).
   Fable: kuvapari Eurooppa (Ranska) + Euroopan ulkopuolinen (Japani/Kreikka) v107:ää vasten (sisalto-koe-ohitus
   Siirtosepältä), katso myös RUS Tšukotka ±180° ja kehyspiikki maan vaihtuessa. Build 14:ään.
4. natiiviseppa/aloitus-purku de010ffe (purun varmistus 8 s) — ei tarpeen tämänhetkisen tiedon mukaan; ei mergetty.

## Avoimet löydökset

- Kotimaan korostus + kuvasumennuskorjaus TODENNETTU (Linssiseppä rivit 39/41, iPhone + iPad, juna 6ea5cdc2; kuvapari
  lokit/pariteetti-ajo/kotimaan-korostus-kuvapari-3-20260925.jpg). Pieni ero: natiivin meri vaaleampi ja vähemmän
  harmaansininen kuin webissä (tarkista kerma-25:n ja pohja-25:n kanssa).

- **80** avauskuvan musta neliö: ei toistu simulaattorissa (lokit/avaus-80) → tarkista laitteella (iso iPad 00008103 vapaa;
  laitekäännös lokit/natiiviseppa-skriptit/laite.sh ajaa nyt LuoPallon ensin).
- **106** junassa (Natiivi-UI nimiolukko-106, mittari "kylkivaihdot vedossa 0"); omistajan todennus build 14:ssä.
- **107** merinimet veden päällä (v106) todennettu simulaattorissa (lokit/merinimet-107).
- **99** etelän kansi on tasainen jäänvalkea (webin sääntö); pysyvä korjaus = Karttasepän reliefipoltto jäällä −65,4° etelään.
- **S2-loppuorbit**: pilvetön Sentinel-2-sarja (C) Karttasepän jonossa (19 kaupunkia, Z8–Z10 300 km, Z11 60 km); sitten
  Sentinel takaisin aloituslennon loppuun (Nappula: `aloitus && t >= jako.Liuku` → LentoSentinelPois).
- **112 ulkoasu**: kone/viiva otsikon alla (webin portissa ei otsikkoa) → Natiivi-UI/Fable päättää.
- **Lepopiirto** (Pelikoodarin mittaus iPadilla): pallo levossa p95 25 ms (ei 120 Hz) → PalloKierron peitto kamerakohtaiseksi
  (renderFrameInterval harvensi koko piirron, Pelikoodari poisti lehden peiton 101:ssä).
- Reittiviiva 5 km vs. web 12,7 km: korotettu maasto (×2) peittää viivan > 2,5 km huipuilla (Olympos, Alpit).

## Opit

- Käännöspalvelun kopio ylikirjoittuu: kopioi .app talteen Bundle-kansiosta (get_app_container viittaa vanhaan asennukseen);
  data-kontti metatiedosta (skriptit aloituslento84.sh, pohjakuvat.sh tekevät sen).
- TaskStop omalle käännökselle jättää lukon; proto-kaanna.sh vapauttaa kaatuneen ajon lukon itse.
- Pariteettiajon sumeus = kuvasumennus kerronnan aikana (renderScale-lokirivi) — tarkista stdoutista ennen epäilyjä.

## Worktreet (katto 3)

wt/proto-natiiviseppa-loydos46 (maakunnat-kaikki, agentti), -nimikerros (etusivulento-112, mergetty → vapaa),
-saapuminen (verho-ohita). Unity-työkopio Matkakirja-proto: master puhdas.
