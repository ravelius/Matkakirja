# Natiivin esilatauksen nykytila ja verkko-odotusmittari (Pelikoodari 25.9.2026)

Fablen erä: kartoita, mitä natiivi lataa verkosta missäkin vaiheessa, lisää mittari "pelaaja odotti verkkoa X ms"
per vaihe (loki + savuke) ja aja kylmä käynnistys → Ateena → nosto → linssi. Tämä on ESILATAUSPOLITIIKAN
(omistaja hyväksyi 25.9. klo 16.1x) mittapohja; toteutus: `esilataaja-suunnitelma-20260925.md`.

Natiivi luettu haarasta juna/b13 (066c01fb). Mittari: proto-haara `pelikoodari/verkko-odotus` (2d62b413).

## 1. Mittari

- `Assets/Matkakirja/Kartta/VerkkoOdotus.cs`. **Odotus** = pelaaja odottaa näkymää, joka ei tule ennen dataa.
  Rivi lokiin `MATKAKIRJA verkko-odotus {"t","vaihe","mita","ms","haut","tulos"}` ja tiedostoon
  `Documents/verkko-odotus.jsonl`. `haut` = odotuksen aikana valmistuneet verkkohaut (0 = odotus ei johtunut verkosta).
- **Haku** = jokainen oikea verkkohaku (ei välimuistiosumia) vaiheen ja lähteen summiin: sisalto (Sisalto.HaePaketista),
  peli (PeliOhjain.HaeTiedosto), kuva (Kuvat), puhe (Puhe.LataaJaSoita), laatta (Laattapalvelin.Lataa), linssi
  (LinssiSisalto).
- Vaihe: aktiivinen odotus, muuten PeliOhjain.VerkkoVaihe: kaynnistys (Lataa/Virhe), lento (aloituslento), aloitus,
  linssi (linssi auki), lehti, matka (Matkalla), saapuminen (20 s perillä olosta), kaupunki.
- Odotuskohdat: käynnistyksen sisältö (kaupungit + reitit + laattamäärät ennen AloitaTaiJatka) ja aloitusverho
  (logo pois, kun pallo ladattu), aloituslennon musta verho (Nappula), nostokortti (Nostokortti.AvaaReitti: kortti
  piilossa kunnes data jäsennetty), linssin aineisto (LinssiSisalto.Hae, vain linssin ollessa auki), puheen lataus
  (ääni alkaa vasta latauksen jälkeen).
- Yhteenveto: peli-komento `verkko` → `Documents/verkko-yhteenveto.json`; `verkko nollaa`.
- Savuke: `Peli-testit/verkko-savuke.sh <app> <UDID> <kansio>` (kylmä = sovellus poistetaan ja asennetaan).

## 2. Mitä natiivi lataa missäkin vaiheessa (kartoitus)

| Vaihe | Mitä (luokka) | Välimuisti | Pelaaja odottaa? | Esilataus nyt |
|---|---|---|---|---|
| Käynnistys | uusin.json + kokoelmat kaupungit, reitit, laatat (PeliOhjain.HaeVersio/HaeKokoelma/HaeLaattamaarat) | levy (sisalto/) | **KYLLÄ** ("Haetaan matkakirjaa…") | ei |
| Käynnistys | pallon laatat aloitusverhon alla (Aloitusverho) | laattavälimuisti + offline | **KYLLÄ** (logo, katto) | ei |
| Käynnistys, taustalla | kysymykset ym. 13 tiedostoa, luennat, maamerkit + GLB, tehosteäänet, astronautin aineisto | levy | ei | tehosteet ja maamerkit kyllä |
| Aloitusnäkymä | aloitustekstit (Sisalto), aloituspuhe + aikaleimat (Puhe) | levy (puhe) | teksti osittain; puhe ei estä | ei |
| Aloituslento | lennon pinnan ja laskeutumiskohteen laatat (KarttaKerrokset.EsilataaLento/EsilataaKohde) | laattavälimuisti | **KYLLÄ** (musta verho, katto) | **kyllä** (tämä on esilataus) |
| Saapuminen | sähkehakemisto (Fokusvirrat), maan nostodata 2 s saapumisesta (NostoSisalto.Esilataa, löydös 104) | Sisalto-levy | ei | kyllä |
| Saapuminen | saapumispuhe ja luenta (Puhe), luentakuvat ja PuluCam (Kuvat) | levy | ääni alkaa latauksen jälkeen; kuva tulee jälkikäteen | ei |
| Karttanosto | kortin data (NostoSisalto.Hae), kortin kuva (Kuvat) | Sisalto-levy / kuvat-levy + RAM 48 | **KYLLÄ** data (kortti piilossa); kuva ei | data kyllä (saapuminen) |
| Kaupunki-/maalehti | lehden data (Sisalto), sää (Open-Meteo), uutiset (BBC-proxy + MyMemory), Wikipedia | Sisalto-levy; muut istunto/ei | lehti osittain; Wiki ja uutisartikkeli **kyllä** | ei |
| Linssi | aineisto (LinssiSisalto), radiovirta (AVPlayer), viritysäänet, pilvikuori, linssiluennat | Sisalto-levy; muut ei | ihmisen matka **kyllä** (Käynnistä odottaa); muut ei | ei |
| Matka | karttakerrosten laatat (Laattapalvelin), maarajat, vektorikerros, väritaso | laattavälimuisti | ei (striimaus) | osittain |
| Offline | maan paketti (Alueet.LataaMaa) | offline-kansio | pelaajan oma valinta | on itse esilataus |

Huomiot:
- Kaksi rinnakkaista sisältöväylää samalle datalle: `Sisalto.HaePaketista` (UI, linssit) ja PeliOhjainin oma
  `HaeVersio/HaeKokoelma/HaeTiedosto`. Sama välimuistikansio, mutta uusin.json haetaan kahdesti (ja kolmannen kerran
  LinssiSisalto).
- Ulkoiset palvelut ilman levyvälimuistia: Open-Meteo, BBC-uutisproxy + MyMemory, fi.wikipedia.org,
  workers.dev (palaute, reaktiot, TTS).

## 3. Mittaus: kylmä käynnistys → Ateena → nosto → linssi (simulaattori)

Käännös ef3febbf (juna/b13 066c01fb + pelikoodari/verkko-odotus 2d62b413), pariteetti-iPhone A2FD9C9F, Macin
verkko. Tulokset: `proto-3d/lokit/verkko-odotus/{kylma-1,lammin-1}/RAPORTTI.txt`. Kulku: kylmä = sovellus poistettu
ja asennettu; lämmin = sama ajo heti perään välimuistit tallessa. Nostot `kohde:olympos`, `kohde:thessaloniki` ja
olympos uudelleen, linssit radio ja satelliitti.

| Vaihe | Odotus | Kylmä | Lämmin | Verkkoa odotuksen aikana |
|---|---|---|---|---|
| Käynnistys | sisältö (kaupungit, reitit, laatat) | 2 253 ms | 387 ms | 42 hakua / 1 |
| Käynnistys | aloitusverho (katto 8 s, pallo ≥ 99 %) | **8 004 ms, pallo 10 %** | **8 008 ms, pallo 72 %** | laatat |
| Lento | aloituslennon musta verho (katto 5 s, pallo ≥ 97 %) | **5 000 ms, pallo 10 %, esilataus 117/278** | **5 016 ms, pallo 71 %, esilataus 278/278** | laatat |
| Lento | aloituspuhe ennen ääntä | 1 039 ms | 0 (välimuisti) | 1 |
| Saapuminen | isoisän luenta ennen ääntä | 749 ms | 0 (välimuisti) | 1 |
| Nosto | kortin data (3 avausta) | 99, 116, 100 ms | 99, 116, 99 ms | **0** (104:n esilataus toimii) |
| Linssi | aineisto | ei odotusta | ei odotusta | aineisto ladataan käynnistyksessä |

Verkkohaut vaiheittain (kylmä): käynnistys 42 hakua (sisältö 8 Mt, linssit 1,9 Mt, laatat 12), aloitusnäkymä
19 (sisältö 15,5 Mt), lento 1 062 (laatat 1 046 = 20,7 Mt), saapuminen 461 (laatat 451), kaupunki 406, linssi
859 laattaa (6,1 Mt). Lämpimänä verkkoon menevät lähes vain laatat (aloitus 77, kaupunki 395).

**KORJAUS 25.9. ilta (Natiiviseppä):** ajoissa kylma-1 ja lammin-1 `uusi-matka` käynnistyi kesken aloitusverhon
(2,0 s / 4,9 s), joten niiden aloitusverhon rivi mittasi lennon mustaa. Savuke odottaa nyt lokiriviä
"aloitusverho: pois" (proto 3cd5259c). Uusi kylmä ajo `kylma-2` (juna/b13 c7091b7c + löydös 117):
aloitusverho 8 004 ms (pallo 60 %), aloituslennon musta 5 001 ms (esilataus 278/278, pallo 41 %), aloituspuhe
531 ms, luenta 82 ms, nostot 99–115 ms ilman verkkohakuja. Natiivisepän mittaus normaalissa kulussa: aloitusverho
1,9–2,8 s (aste 100 %, lokit/verho-valmius). Kylmänä verho osuu siis yhä kattoon; lämmin uusitaan savukkeella.

Havainnot esilatauspolitiikalle:
1. **Molemmat verhot osuivat kattoonsa (katso korjaus yllä: aloitusverhon lämmin luku oli mittausvirhe).** Lämpimänä kaikki 278 reitin laattaa ovat
   välimuistissa, mutta pallon latausaste jää 71–72 %:iin (raja 97 ja 99 %). Verho ei siis odota verkkoa vaan
   latausastetta, joka ei simulaattorissa nouse rajaan. Kylmänä pallo on verhon lähtiessä 10 % (pelaaja näkee
   keskeneräisen pallon). → Natiiviseppä: latausasteen raja tai laskenta ja pallon Z0–Z5 buildiin (politiikka, kohta 1).
2. **Puhe on ainoa verkko-odotus saapumisessa:** aloituspuhe 1,0 s ja luenta 0,75 s kylmänä. Kohta 3 (lennon aikana)
   poistaa nämä.
3. **Nostodata on jo nollassa** (0 hakua odotuksen aikana); jäljelle jäävä ~100 ms on jäsennys ja kehys, ei verkkoa.
4. **Linssit eivät odota dataa**, mutta avaus hakee satoja laattoja (859 kylmänä). Kohta 6 tarvitsee laattalistat
   Natiivisepältä ja Linssisepältä.
5. Kylmänä sisältöä ladataan 23,5 Mt ennen ensimmäistä kaupunkia (käynnistys 8 Mt, aloitusnäkymä 15,5 Mt), kahta
   väylää pitkin (Sisalto ja PeliOhjain, kumpikin hakee uusin.json:n). Väylät yhdistetään Esilataajan erässä 1.

## 4. Esilataaja erä 1 (25.9. ilta): jono, uusinta, osuma-% — mittauspohja

Proto `pelikoodari/esilataaja-1` (1c2c0d14 käännös; `Kartta/Esilataaja.cs`). Sisältö, peli, linssit, kuvat ja puhe
kulkevat yhden jonon kautta (6 rinnakkaista, näkyvä ohittaa, tausta väistää näkyviä laattoja, uusinta 1/2/4/8 s);
uusin.json kerran istunnossa (Sisalto.VersioPolku, ennen kolme väylää). Laatat pysyvät laattapalvelimen omassa
jonossa (12 rinnakkaista + kiire- ja kohdejono, Natiiviseppä): suunnitelman "laatat taso Nakyva" toteutuu niin, että
Esilataajan tausta odottaa, kun näkyviä laattoja on haussa. Mittarin vaihepino ei enää vuoda (yli 30 s vanhat karsitaan).

Mittaus `proto-3d/lokit/verkko-odotus/{era1-kylma,era1-lammin}/RAPORTTI.txt` (vertailu kylma-2 ennen erää):

| Odotus | kylma-2 (ennen) | erä 1 kylmä | erä 1 lämmin |
|---|---|---|---|
| Käynnistyksen sisältö | 1 267 ms (64 hakua) | 1 210 ms (56) | 447 ms (1) |
| Aloitusverho | 8 004 ms | 8 013 ms | 2 764 ms |
| Aloituslennon musta verho | 5 001 ms | 5 000 ms | 5 017 ms |
| Aloituspuhe ennen ääntä | 531 ms | 515 ms | 0 |
| Luenta ennen ääntä | 82 ms | 798 ms | 0 |
| Nostot (3) | 99–115 ms, 0 hakua | 100–115 ms, 0 hakua | 99–116 ms, 0 hakua |

Osuma-% (välimuistista / pyynnöt), kylmä → lämmin: sisältö 18–50 % → 83–100 %, kuvat 0–80 % → 100 %, puhe 0 % → 100 %,
laatat lennolla 19 % → 54 %, kaupungissa 55 % → 72 %, linssissä 6 % → 94 %. Jonossa lopuksi 0, käynnissä 0, uusintoja 0.
Erä 1 ei lisännyt esilatausta, joten odotukset pysyivät ennallaan (luennan 82/798 ms vaihtelee verkon mukaan); erä 2
(kohta 3 lennon aikana) tähtää saapumisen puheisiin ja kuviin. Löydös 118: avausluenta ja etusivun musiikki buildissa
(StreamingAssets/mukana): "puhe: alkoi 31 ms pyynnöstä (välimuisti) intro-puhe.mp3 [buildissa]" (Natiivi-UI eb6a9c8c; ennen verkosta noin 1–4 s), ja etusivun raita soi koko intron ajan vaimennettuna webin vakioilla.

## 5. Esilataaja erät 2 ja 3 (25.9. ilta): saapuminen, joutilas ja ennakointi

**Erä 2** (proto `pelikoodari/esilataaja-2` eaf5b352, käännös 2d8d5851): kohta 3 lennon ja matkan aikana.
`PeliOhjain.SaapuminenTiedossa` (aloituslennon ja matkan alku) esilataa saapumispuheen ja luennon, ja
`UiNakymat` esilataa isoisän luentakuvat, PuluCam-kuvat, trailerin avaus- ja kansikuvat sekä maan nostodatan
(taso SeuraavaRuutu). Aloituslennon repliikki `puhe-lento-alku.mp3` on buildissa (StreamingAssets/mukana).

**Erä 3** (proto `pelikoodari/esilataaja-3` 64794fe8, sisältää erän 2; käännös 9a228d0f yhdessä natiivi-ui/lampon kanssa):
- Kohta 4: `Esilataaja.Joutilas` herää, kun ruudunpäivitys ei ole täysi (ei kosketusta eikä kamera-ajoa), jono on tyhjä
  eikä näkyviä laattoja haeta 2 s aikana. Tapahtuma herää kerran toimintajaksoa kohden, joten epäonnistunut esilataus
  yritetään uudelleen seuraavana joutilaana hetkenä. Kaupungissa ladataan tämän kaupungin puheet ja maan karttanostojen
  kuvat (`NostoSisalto.EsilataaKuvat`: ensin kunkin noston ensimmäinen kuva, sitten galleria; taso TamaKaupunki). Sen
  jälkeen ladataan nopalla (1–6, maitse tai meritse) ja bussilla saavutettavat kaupungit, enintään 8 lähintä, tasolla
  Kohdekaupungit, ja niiden nostodata tasolla Muu.
- Kohta 5: `SiirtoKohteetMuuttui` → näkyvien kohdekaupunkien saapumistarpeet heti (Kohdekaupungit).
- Kohdat 4–5 ovat seis virransäästössä ja kuumana (`Esilataaja.Seis` = `Lampo.Kuuma`).
- Korjaus erän 3 ensimmäisestä ajosta: kylmänä aloituslento voi alkaa ennen kuin `luennat.json` on luettu, jolloin
  puheen osoitetta ei vielä tiedetty (saapumispuhe odotti 97 ms ja luento 1,8 s). Pyyntö odottaa nyt luennat-hakua.
- Savuke: `ENNAKOINTI=1 Peli-testit/verkko-savuke.sh …` (joutilas + liftauksen siirtokohteet, heittää uudelleen, kunnes
  kohteena on kaupunki).

Mittaus `proto-3d/lokit/verkko-odotus/{era2-kylma,era2-lammin,era3-kylma,era3-kylma-2,era3-lammin}/RAPORTTI.txt` (A2FD9C9F):

| Odotus | erä 1 kylmä | erä 2 kylmä | erä 2 lämmin | erä 3 kylmä | erä 3 lämmin |
|---|---|---|---|---|---|
| Käynnistyksen sisältö | 1 210 ms | 2 349 ms (47 hakua) | 386 ms (1) | 1 348 ms | 398 ms (1) |
| Aloituspuhe ennen ääntä | 515 ms | 0 | 0 | 0 | 0 |
| Luenta ennen ääntä | 798 ms | 0 | 0 | 0 | 0 |
| Nostot (3) | 100–115 ms | 199–234 ms, 0 hakua | 199–233 ms | 199–233 ms | 199–233 ms |
| **RAJA saapuminen 0 ms** | – | **PASS** | **PASS** | **PASS** | **PASS** |

Käynnistyksen sisällön vaihtelu (1,2–2,9 s kylmänä) johtuu verkosta: hakujen määrä on sama. Nostojen 200 ms on kortin
avausanimaation odotus, eikä siinä ole verkkohakuja. Osuma-% kylmänä: saapumisen kuvat 7/7 ja puhe 100 %,
kaupungin kuvat 86 % (erä 1: 75 %).
Erä 3 kylmänä: joutilas heräsi 6 kertaa, ja ennakointeja kirjattiin 31. Nopan päässä olivat Kreeta, Sisilia, Sofia,
Bukarest ja Valletta; kohta 5 ennakoi Sofian. Kreikan nostojen kuvia ladattiin 75 + 49. Joutilaan kuvien hinta kylmänä
oli noin 157 hakua ja 95 Mt ensimmäisellä käynnillä maassa, kaikki taustalla. Lämpimänä kaikki kuvat tulivat levyltä. Jonossa ja käynnissä
lopuksi 0, uusintoja 0.
Avoinna (erä 4): lehtien kuvat ja linssien data joutilaana (kohta 6, Linssisepän listat), muistin LRU ja 2 Gt:n
levysiivous, Siirtosepän `Kohde.Tiedosto`/`RyhmaValmis`.
