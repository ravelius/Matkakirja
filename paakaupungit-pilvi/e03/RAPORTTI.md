# RAPORTTI — erä e03 (Kaukasus ja Lähi-itä)

## 1. Yleistä

- Haara `paakaupungit-e03-pilvi`. Alku 2026-10-11 00:41 UTC, loppu 2026-10-11 05:30 UTC, kesto noin 4 h 50 min.
- Kaupungit: tbilisi, jerevan, baku, amman, beirut, abudhabi, manama (7). Ramallah ei kuulunut tähän ajoon.
- Agenttiajoja 40 (Sonnet, effort low, enintään 2 rinnakkain), tokenit yhteensä noin 6,42 M (Agent-työkalun ilmoittamat). Yksi vahingossa kolmanneksi käynnistetty kuva-agentti (Manama B) pysäytettiin heti ja ajettiin uudelleen; sen kulutusta ei ole mukana.
- Erittely vaiheittain: A faktapohja 7 ajoa, 1,36 M · B kuvat 7 ajoa, 1,20 M · C kirjoitus 7 ajoa, 1,13 M · D tarkistus 7 ajoa, 1,43 M · E korjaus 7 ajoa, 0,62 M · lukupassit (lisäsääntö 11.10.) 4 ajoa, 0,61 M · Manaman nostopituus 1 ajo, 0,06 M.
- Lisäsääntö (Päätoimittaja 11.10.2026, tarkat luvut vain kahden riippumattoman lähteen tuella) löytyi ohjeen lopusta vasta Beirutin faktapohjan jälkeen. Se otettiin käyttöön Beirutista, Manamasta ja Abu Dhabista alkaen A/C/D/E-kehotteissa; Tbilisille, Jerevanille, Bakulle ja Ammanille tehtiin erillinen lukupassi (osio "Lukupassi" kunkin `tarkistus.md`:n lopussa). Beirutin, Manaman ja Abu Dhabin kohdalla sääntö on D/E-vaiheissa, ei erillistä passia.
- Säädata: Open-Meteo ei vastannut (kiintiö täynnä / verkko), joten `saatiedot: null` kaikille seitsemälle; oppaiden sääjaksot nojaavat Wikipedian ilmasto-osioihin.
- Commons-rajapinta antoi toistuvasti 429; `tarkista --verkko` ajettiin lopuksi kaupunki kerrallaan uusinnoin.

## 2. Taulukko per kaupunki

| id | intro mrk | nostoja | kohteita / juttuja | kuvia (valittu / hylätty) | kysymykset / tiedot | säärivi | D: VÄÄRIN / EPÄVARMA → korjattu | tarkistin: virheet / varoitukset |
|---|---|---|---|---|---|---|---|---|
| tbilisi | 978 | 8 | 7 / 7 | 24 / useita (kuvat.md) | 5 / 3 | null | 9 / 9 → korjattu + lukupassi | 0 / 3 |
| jerevan | 977 | 8 | 8 / 8 | 25 / useita | 5 / 3 | null | 15 / 7 → korjattu + lukupassi | 0 / 4 |
| baku | 992 | 8 | 6 / 6 | 23 / useita | 5 / 3 | null | 15 / 6 → korjattu + lukupassi | 0 / 2 |
| amman | 1094 | 8 | 7 / 7 | 24 / 24 | 5 / 3 | null | 10 / 9 → korjattu + lukupassi | 0 / 2 |
| beirut | 1024 | 8 | 8 / 8 | 24 / useita | 5 / 3 | null | 14 / 17 → korjattu | 0 / 7 |
| abudhabi | 827 | 8 | 4 / 4 | 22 / useita | 5 / 3 | null | 10 / 8 → korjattu | 0 / 2 |
| manama | 1041 | 8 | 7 / 7 | 24 / useita | 5 / 3 | null | 13 / 40 → korjattu | 0 / 1 |

Hylättyjen kuvien tarkka lista ja syyt ovat kunkin kaupungin `kuvat.md`:n lopussa. Jokaisen kaupungin `tarkistus.md` sisältää D:n taulukon ja "Korjattu"-osion.

## 3. Korjaamatta jätetyt varoitukset (tarkistus-kone.txt)

- **saatiedot puuttuu** (kaikki 7): ei säädataa (Open-Meteo ei vastannut). Sääjakso oppaassa Wikipedian ilmasto-osiosta.
- **Pyöreä suuruusluokka -varoitukset** (amman, baku, beirut, jerevan, tbilisi): asukasluvut on tarkoituksella pyöristetty muotoon "yli X miljoonaa" / "noin X" lisäsäännön mukaan tai ne ovat `konteksti.json`:n vuosineen annettu luku.
- **abudhabi: kohteita 4 (pohjataso 6):** Kulttuurisäätiöstä ei löytynyt ≥ 1200 px kuvaa; Founder's Memorialin ainoa kelvollinen kuva on käytössä nostossa; Umm Al Emarat -puistolla on vain Wikivoyage-lähde; Corniche on katu, ei sovi kohdetyyppeihin; Suurmoskeija ja Louvre ovat kaukana ytimestä.
- **beirut: lisenssi "CC BY 3.0" ≠ Commons "CC BY 3.0 pl"** (4 kuvaa, Radosław Botev): tarkistimen lähderivimuoto ei tunne "pl"-päätettä; Päätoimittajan päätettäväksi, kirjoitetaanko "CC BY 3.0 pl". Lisäksi `kansi.johdanto` on yli 1–2 virkettä.
- **jerevan: kansi nosto 2 on 665 mrk** (raja 660): kosmeettinen.
- Manaman kirjallisuuden nosto 1 pidennettiin 440 mrk:n yläpuolelle erillisellä korjauksella (agentti ei laskenut merkkejä; tarkistin ei enää varoittanut).

## 4. Poisjätetyt aiheet ja syyt

- Nykypolitiikka ja nykysota pois kaikista (esim. Karabah/Baku, Libanonin sisällissota ja 2020-räjähdys, Abu Dhabin Etihad Towersin 2026 iskuvaurio, Heydar Aliyev -keskus nykypoliittisena kontekstina).
- Toisto vältetty: Dubain/Jerusalemin/Damaskoksen/Dohan pelilehtien nostoja ja Jordanian/Bahrainin maalehden aiheita (esim. Ammanin Suuren temppelin teksti kirjoitettiin uudelleen; Qasr Al Hosnin ensimmäinen kappale kirjoitettiin uudelleen; Bahrainin helmenpyynti vain sivulauseessa).
- **Pienten kohdekarttojen perustelut:** Baku 6 (lisäkohteiden lähteet ohuita), Abu Dhabi 4 (ks. kohta 3), Amman 7 (Hashemite Plazalla ei lähdekoordinaattia, Linnavuori yhdistetty Suureen temppeliin ~110 m).
- Valokuvat: Tbilisi (1900, PD), Jerevan (1800-luku, PD, tarkka vuosi tuntematon), Baku (1861, PD), Amman ("Odeum c 1900", tunnistus varmistamatta), Beirut (Bonfils 1867), Manama (1870, linnaketunnistus varmistamatta), Abu Dhabi: ei ≤1900-vedosta, päätiedostona nykykuva `Qasr al Hosn.jpg` ilman vuotta (Päätoimittaja päättää).

## 5. Päätoimittajalle: kevyen pisteen virheet ja muut huomiot

- Kevytpisteissä (`js/packs/paakaupungit.js`): Jerevanin Kaskadin sijainti "kaupungin pohjoisosassa" → lähteiden mukaan Kentronin pohjoislaidalla; Ammanin kuvauksen "Herkuleen temppeli" on lähteen mukaan epätarkka nimi, ehdotus "Suuri temppeli (Herkuleen temppeli)".
- **um.fi palautti 403 koko ajon ajan:** kaikkien oppaiden matkustusturvallisuuslauseet nojaavat Wikivoyageen tai ovat yleisiä; tarkistettava ennen julkaisua (Baku: rajasulun sanamuoto; Beirut ja Amman: yleislause).
- Tbilisin `pallo` on `konteksti.json`:n mukainen, vaikka tarkistaja arvioi sen ~3 km keskustasta; huomio on kaupungin `ehdotukset.huomiot`-kentässä.
- Beirutin mezze-kuva on otettu Genevessä ja mouneh-nostossa on kibbeh-kuva (kuvatekstit kertovat tämän).
- Kuvat joissa kasvosääntö/tulkinta: Bakun Taghiyev-nosto (historiallinen muotokuva), Bakun valokuva 3132×620 (leveä, layout tarkistettava), Manaman matkailijalle-kuvassa pieniä kauppakylttejä.
- Kaikki kaupungit: `valokuva`/`uusi`-parit puuttuvat useimmista (nykykuva samasta paikasta puuttui tai samaa tiedostoa ei saa käyttää kahdesti).
- Ohjeiden ristiriita: PILVIOHJE 4.2 sallii "lähteen mukaan" leipätekstissä, 4.11 kieltää lähdeviittaukset kuvateksteissä; ratkaisu: leipätekstissä kyllä, kuvateksteissä ei.

## 6. Avoimet kysymykset

1. Beirutin Botev-kuvien lisenssimerkintä: "CC BY 3.0" vai "CC BY 3.0 pl"?
2. Abu Dhabin valokuva-osio: hyväksytäänkö nykykuva `Qasr al Hosn.jpg`, vai haetaanko isoisän aikainen vedos Macilla?
3. Abu Dhabin kohdekartta: riittääkö 4 kohdetta, vai lisätäänkö Suurmoskeija/Louvre (kaukana ytimestä)?
4. Säädata: ajetaanko `tools/hae-saaperusdata.mjs` Macilla kaikille seitsemälle (saatiedot null)?
5. Ammanin Hashemite Plaza ja Abu Dhabin Kulttuurisäätiö: hankitaanko koordinaatti/kuva Macilla?
