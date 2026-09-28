# Ehdotus: Ihmeet 14 maahan + historian hetket

Omistajan päätös 27.9.2026 klo 23.4x (Fablen välittämänä): ihmeet 14 maahan
(AUT, NLD, CHE, DNK, SWE, SRB, BIH, ALB, MKD, MNE, CYP, MLT, MDA, BLR) ja
historian hetket 1–2 per puuttuva Euroopan maa. Kaikki faktat tarkistettu
WebSearchilla (lähteet mainittu).

**FABLEN HYVÄKSYNTÄ 28.9.2026 (kuittaus committiin 6fbc832d4)**: hyväksytty
korjauksin — ks. muutokset alla. Historian hetket koskevat KAIKKIA puuttuvia
Euroopan maita (ei vain näitä 14); erä 1 = nämä 14, erä 2 = loput kun erä 1
on tilattu. Tilataan nyt suoraan Codexilta, ei uutta hyväksyntäkierrosta.

## Ihmeet (Matkakirjan ihme / rappeutunut kohde, js/packs/monumentit-eurooppa.js-mallia)

Molempia luokkia on: KADONNUT (ei enää olemassa, tähtisymboli) ja
RAPPEUTUNUT (yhä olemassa raunioina/muuttuneena, ennen/nyt-pari).

| Maa | Kohde | Luokka | Ydin |
|---|---|---|---|
| AUT | Wienin maailmannäyttelyn Rotunde (1873) | Kadonnut | Maailman suurin kupoli, rakennettu isoisän oman matkavuoden näyttelyyn Praterissa, paloi 1937. Suorin mahdollinen 1873-kytkös koko listalla. |
| NLD | Paleis voor Volksvlijt, Amsterdam | Kadonnut | Lontoon Crystal Palacen innoittama lasi-rautapalatsi, valmistui 1864 (seisoi jo isoisän aikaan), tuhoutui tulipalossa 1929. |
| CHE | Grand Hotel Schreiber, Rigi Kulm | Kadonnut | Yksi Alppien komeimmista suurhotelleista Euroopan ensimmäisen vuoristorautatien päätepisteessä (rata Rigi Kulmiin valmistui kesäkuussa 1873); hotelli purettu myöhemmin. |
| DNK | Christiansborgin toinen linna, Kööpenhamina | Kadonnut | Paloi 3.10.1884, rauniot seisoivat 23 vuotta ennen nykyistä (kolmatta) linnaa. |
| SWE | Industripalatset, Tukholman 1897 näyttely | Kadonnut | 100 m kupoli + 4 minareettia, purettu näyttelyn jälkeen kuten muutkin tilapäisrakennukset. |
| SRB | Smederevon linnoitus | Rappeutunut | Jugoslavian armeijan ammusvarasto räjähti 5.6.1941, yksi WWII:n suurimmista räjähdyksistä Euroopassa; linnoitus yhä paikallaan raunioituneena. |
| BIH | Bobovacin kuninkaanlinna | Kadonnut | Bosnian kuninkaiden linnoitettu pääkaupunki 1300-luvun puolivälistä; osmanit valtasivat ja hävittivät sen kolmen päivän piirityksen jälkeen 21.5.1463 — viimeinen kuningas Stjepan Tomašević oli juuri paennut Jajceen. (Korvaa alkuperäisen ehdotuksen Vijećnican, joka on nykyään ennallaan jälleenrakennettu — ennen/nyt-pari ei toimisi.) |
| ALB | Butrint | Rappeutunut | Yli 2500 vuoden kerrostumat (kreikkalainen, roomalainen, bysanttilainen), hylätty keskiajalla soistumisen vuoksi, Unesco-kohde. |
| MKD | Skopjen vanha rautatieasema | Rappeutunut | Kello pysähtyi 5.17 maanjäristyksessä 26.7.1963, julkisivu säilytetty muistomerkkinä (nyk. kaupunginmuseo). |
| MNE | Žabljak Crnojevića | Rappeutunut | Zetan hylätty keskiaikainen pääkaupunki Skadarjärvellä, menetettiin osmaneille 1478; alue palasi Montenegron hallintaan vasta 1878 Berliinin kongressissa — vain 5 vuotta isoisän matkan jälkeen. Rauniot yhä paikallaan (rappeutunut, ei kadonnut). |
| CYP | Varosha, Famagusta | Rappeutunut | Famagustan lomakaupunginosa on ollut suljettuna vuodesta 1974; seisoo yhä lähes koskemattomana aikakapselina. (Neutraali sävy — ei poliittista arviota tapahtumista.) |
| MLT | Royal Opera House, Valletta | Rappeutunut | Pommitettiin raunioiksi 7.4.1942, rauniot seisoivat vuosikymmeniä ennen kuin Renzo Piano muotoili ne avoimeksi teatteriksi (Pjazza Teatru Rjal, 2013). |
| MDA | Orheiul Vechi | Rappeutunut | Kalkkikivijyrkänteeseen kaiverretut luolaluostarit + geto-daakialaiset/keskiaikaiset rauniot, käytössä vieläkin osittain. |
| BLR | Vanha Minsk | Kadonnut | 80–90 % kaupungista tuhoutui WWII-pommituksissa; vanhaa kaupunkia ei rakennettu ennalleen vaan täysin uudeksi neuvostotyyliseksi kaupungiksi. |

## Historian hetket — ERÄ 1 (nämä 14 maata; erä 2 = loput puuttuvat Euroopan maat myöhemmin)

SÄÄNTÖ (Fable 28.9.): hetken on tapahduttava MAAN OMALLA NYKYALUEELLA (jotta
se voidaan sijoittaa kartalle) ja oltava silmien korkeudelta nähtävä sekunti
(historian-hetket.js:n "ihminen edellä" -sääntö). Kaikki alla vahvistettu
en-Wikipediasta.

- AUT: Wienin pörssiromahdus "Der Krach" 9.5.1873 — sama kuukausi kuin isoisän matka.
- NLD: Afsluitdijkin viimeisen aukon sulkeminen 28.5.1932 (Zuiderzee muuttuu IJsselmeeriksi).
- CHE: Gotthardin tunnelin läpimurto 29.2.1880 — rakennustyö alkoi 1872, isoisän aikaan.
- DNK: Dybbølin rynnäkkö 18.4.1864.
- SWE: Vaasa-laivan uppoaminen neitsytmatkallaan 1628.
- SRB: Belgradin piiritys 1456 (Hunyadi torjuu osmanit).
- BIH: Arkkiherttua Frans Ferdinandin salamurha, Sarajevo 28.6.1914.
- ALB: Vlorën itsenäisyysjulistus 1912.
- MKD: Ilindenin kapina, Kruševon tasavalta 1903.
- MNE: Obodin kirjapaino, Oktoih prvoglasnik 4.1.1494 — ensimmäinen kyrillinen kirja eteläslaavien keskuudessa.
- CYP: Britannian lipun nosto Nikosiassa 4.6./1.7.1878 (hallinto siirtyy osmaneilta Britannialle).
- MLT: Maltan suuri piiritys 1565.
- MDA: Bessarabian liittyminen Romaniaan 1918.
- BLR: Berezinan ylitys Studziankassa marraskuussa 1812 (Napoleonin perääntymisen katastrofi — Borisov, nykyinen Valko-Venäjä).

Codex-tilaus postilaatikkoon (haara claude/postilaatikko, kansio posti/,
#3426-malli) seuraavaksi: ihmeet ensin, sitten nämä 14 historian hetkeä.
