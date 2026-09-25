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

Havainnot esilatauspolitiikalle:
1. **Molemmat verhot osuvat aina kattoonsa, myös lämpimänä.** Lämpimänä kaikki 278 reitin laattaa ovat
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
