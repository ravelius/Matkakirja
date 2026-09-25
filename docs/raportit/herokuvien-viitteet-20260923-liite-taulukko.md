# Kaupunkilehden herokuvat ja niiden viitekuvat

Laadittu 23.9.2026 (lukutehtävä, ei muutoksia repoon). Lähde: main d95bd1198 (haara siirtoseppa-vienti).

## Tiivistelmä

- `ampari:`-kenttiä herokoe/-kansiossa: **394** (288 .png, 106 .jpg; kaikki `lahde: 'Matkakirjan havainnekuva'`).
- **60** heroa on tuotettu tools/hero-ajuri.mjs:llä `tarkkaKohde: true` -kohtina eli viitekuvien kanssa (23.–24.8.2026), ja ämpärissä oleva tiedosto on yhä tuo ajurin tuotos.
- **4** Tampereen heroa (aamu, keskipaiva, ilta, nasinneula) tehtiin ensin viitekuvin (7528724db, 23.8.), mutta ne korvattiin 27.8. "Herot era 2 … Tampereen uusinta" -kuvilla (242492d1a; aamu vielä d719d3429 28.8.). Pelissä olevat .jpg:t ovat eri kuvia (tarkistettu silmin keskipäivästä), tuotettu omistajan omalla prosessilla eikä ajurilla → viitteet tuntemattomat.
- **189** on työlistassa ilman `tarkkaKohde`a → ajuri generoi ne ilman viitteitä (/v1/images/generations). Näistä 8 on myöhemmin korvattu omistajan tuottamalla versiolla (6 × d719d3429 28.8., 2 × era 2 27.8.).
- **141** ei löydy mistään työlistasta: 47 on 22.8. varhaisia kierroksia (Herokierros 2–6, Herolaajennus, Herokoe v5–v7) ennen viitekuvaputkea (hae-viitekuvat.mjs syntyi 24.8. e95c282d4) → ei viitteitä; 94 on 26.–28.8. omistajan ChatGPT/Drive-eriä (era 2: 32, era 31: 30, era 3: 14, Sisilia/Kreeta/Sarajevo/Bukarest/Izmir/Kappadokia 18). Pakan kommentti kutsuu näitä "viiteankkuroiduksi prosessiksi", mutta niiden viitteistä ei ole mitään kirjausta repossa.

## Viitelokin sijainti: EI LÖYDY

- Ajuri ajettiin pilvikontissa (tools/hero-ajuri.mjs importtaa polusta `/home/user/Matkakirja/…`; siirtoraportti docs/raportit/siirto-2026-08-24-paatoimittaja.md: `node tools/hero-ajuri.mjs 24 4 99 $S/hero24`). Kohdekansio oli kontin scratchpad, joten `viitekuvat-loki.txt` katosi kontin mukana.
- `find` (Mac Studion käyttäjäkansiot, väliaikaiskansiot ja koko levy): ei osumia. Codexin työkansiossa (~/Documents/Codex) vain repokopioita työkaluista, ei lokia.
- Git: `git log --all -- '*viitekuvat-loki*'` tyhjä; vientihaarojen commitit (7528724db, 36286d079, 6470642a9, 567dd1f0a, e46a2765c, 858dbee03, e07986bbf) sisältävät vain PNG:t. claude/julisteet-vienti-haarassa ei lokia.
- Ämpäri: 404 polkuihin julisteet/herokoe/viitekuvat-loki.txt, julisteet/viitekuvat-loki.txt, herokoe/…, juuri, julisteet/herokoe-uudet/… (sekä media.matkakirja.app että pub-…r2.dev). vie-julisteet.yml synkkaa vain haaran julisteet/-kansion.
- GitHub Actions: herogenerointi ei ole koskaan ollut workflow (grep .github/workflows: ei hero-ajuria eikä hae-viitekuvia).
- Worker (tools/pollo/worker.js hoidaKuva): saa viitteet pelkkinä base64-kuvina ilman nimiä eikä kirjaa niitä R2:een/KV:hen; palauttaa vain lukumäärän (`viitteita`).
- Ainoat säilyneet jäljet: katselmointi docs/mantereet-tyoaineisto/katselmointi-herot-22-25.md (38 viitekuvallista kohtaa kierroksilla 22–25, ei tiedostonimiä) ja silmätarkistukset -1/-2 (viitekuvamäärät, ei nimiä).

## Rekonstruktio (60 heroa)

Ajettu tools/hae-viitekuvat.mjs:n `haeViitekuvat()` muuttamattomana moduulina kuivana (`lataa: false`, ei generointia, ei avaimia), samoilla parametreilla kuin ajuri (viitehaku ?? wiki, kaupunki, wiki, kategoria, viitesuosi, maara 4). Kääreessä fetch sai User-Agentin "Matkakirja-lisenssitarkistus/1" ja ≥ 1,1 s välin. Lisenssi = extmetadata LicenseShortName, tekijä = Artist (samasta Commons-vastauksesta).

**Nämä ovat TODENNÄKÖISIÄ viitteitä, eivät lokista varmistettuja.** (Päivitys 23.9.: varmistettu Commonsin ajonaikaista tilaa vasten 60/60, ks. [varmistus](herokuvien-viitteet-20260923-varmistus.md).) Valinta on deterministinen samalla datalla (kategorian jäsenlista → järjestysavain → eri kuvaajat), mutta Commons-data elää: kategorioihin lisätään ja siirretään kuvia, metatietoja muokataan. Todettu poikkeama: `Category:Fannie Bay Goal` (Darwin keskipäivä) siirrettiin nimelle `…Gaol` 11.9.2026, joten työlistan kategoria on nyt tyhjä uudelleenohjaus; rekonstruktio ajettiin uudella nimellä. Kaikki 239 valittua tiedostoa oli ladattu Commonsiin ennen 24.8.2026 (tarkistettu imageinfo-aikaleimoista), joten mikään valinta ei ole mahdoton. Lisäksi ajurissa latausvirhe olisi pudottanut viitteen ilman korvaajaa — sitä ei voi rekonstruoida. Kašgarin keskipäivä generoitiin vielä kerran 24.8. (e07986bbf "korjatulla miljoolla") ilman commitoitua työlistamuutosta; oletettu korjaus1:n parametrit. Damaskoksen keskipäivälle käytetty korjaus3 (linnoitus), ei korjaus1:n suqia.

## Lisenssijakauma (rekonstruoidut viitteet)

Viitteitä yhteensä 240 (60 heroa × enintään 4).

| Luokka | kpl |
| --- | --- |
| PD | 14 |
| CC0 | 10 |
| CC BY | 58 |
| CC BY-SA | 158 |
| muu | 0 |

Tarkat lisenssit: CC BY-SA 4.0 94, CC BY 2.0 41, CC BY-SA 3.0 39, CC BY-SA 2.0 24, Public domain 14, CC0 10, CC BY 4.0 8, CC BY 3.0 7, CC BY 2.5 au 2, CC BY-SA 3.0 de 1.

- Heroja, joissa vähintään yksi **CC BY-SA** -viite: **56 / 60** (joista pelkkiä BY-SA-viitteitä: 20).
- Heroja, joissa vähintään yksi **CC BY** (ei-SA) -viite: **32 / 60**.
- Heroja, joiden kaikki viitteet PD/CC0: 0.

## Näkyykö lähde pelissä

- Kaikilla 394 herolla `lahde: 'Matkakirjan havainnekuva'`. Avauskuvat piirtyvät js/lehti.js piirraLehtiKuvat → nahtavyydenKaruselli (js/kuvasarja.js): kortin kuvatekstiin tulee pieni "Havainnekuva"-merkki (lisaaHavainnekuvaMerkki, title "Tekoälyllä tuotettu havainnekuva"), ja lähderivi täytetään kortinKuvalahde-apurilla (js/tekijakortti.js) luokalla KUVALAHDE_VAIN_SUURENNOKSESSA, eli "Matkakirjan havainnekuva" näkyy suurennoksessa.
- Lähderivin "Matkakirjan havainnekuva" on painettava ja avaa omistajan hyväksymän yleisselitteen (js/havainnekuva.js): "havainnekuva kootaan useista kohteen valokuvista ja kirjallisista lähteistä…". Yksittäisiä viitekuvia, niiden kuvaajia tai lisenssejä ei mainita missään pelissä eikä pakassa.

## Taulukko: kaikki 394 heroa

Lähde-sarake: **rekonstruoitu** = viitteet ajettu nyt uudelleen (todennäköiset); **ei viitteitä** = ajuri ilman tarkkaKohdetta tai ennen viiteputkea; **tuntematon** = omistajan/Drive-erä tai korvattu versio, viitteistä ei kirjausta. Loki: ei yhtään riviä (lokia ei löytynyt).

| # | hero-tiedosto | kaupunki | tarkkaKohde | viitteet (Commons-tiedosto — lisenssi — tekijä) | lähde |
| --- | --- | --- | --- | --- | --- |
| 1 | hero-lontoo-tower-bridge.jpg | lontoo | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 2 | hero-lontoo-westminster-thames.jpg | lontoo | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 3 | hero-lontoo-st-pauls.jpg | lontoo | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 4 | hero-kairo-aamu.png | kairo | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 5 | hero-kairo-keskipaiva.png | kairo | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 6 | hero-kairo-ilta.png | kairo | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 7 | hero-praha-st-vitus.jpg | praha | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 8 | hero-praha-kaarlensilta-linna.jpg | praha | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 9 | hero-praha-tyn-church.jpg | praha | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 10 | hero-wien-stephansdom-fiaker.jpg | wien | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 11 | hero-wien-schonbrunn.jpg | wien | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 12 | hero-wien-state-opera.jpg | wien | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 13 | hero-madrid-almudena.jpg | madrid | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 14 | hero-madrid-aamu.png | madrid | ei (6) | — | ei viitteitä (ajuri) |
| 15 | hero-madrid-keskipaiva.png | madrid | ei (6) | — | ei viitteitä (ajuri) |
| 16 | hero-madrid-ilta.png | madrid | ei (6) | — | ei viitteitä (ajuri) |
| 17 | hero-berliini-aamu.png | berliini | ei (6) | — | ei viitteitä (ajuri) |
| 18 | hero-berliini-keskipaiva.png | berliini | ei (6) | — | ei viitteitä (ajuri) |
| 19 | hero-berliini-ilta.png | berliini | ei (6) | — | ei viitteitä (ajuri) |
| 20 | hero-venetsia-st-marks.jpg | venetsia | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 21 | hero-venetsia-rialto-bridge.jpg | venetsia | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 22 | hero-venetsia-santa-maria-della-salute.jpg | venetsia | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 23 | hero-tukholma-aamu.png | tukholma | ei (8) | — | ei viitteitä (ajuri) |
| 24 | hero-tukholma-keskipaiva.png | tukholma | ei (8) | — | ei viitteitä (ajuri) |
| 25 | hero-tukholma-ilta.png | tukholma | ei (8) | — | ei viitteitä (ajuri) |
| 26 | hero-tukholma-gamlastan.jpg | tukholma | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 27 | hero-pariisi-invalidit.jpg | pariisi | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 28 | hero-pariisi-eiffel.jpg | pariisi | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 29 | hero-pariisi-notre-dame.jpg | pariisi | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 30 | hero-pariisi-sacre-coeur.jpg | pariisi | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 31 | hero-ateena-akropoliskallio.jpg | ateena | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 32 | hero-ateena-aamu.png | ateena | ei (3) | — | ei viitteitä (ajuri) |
| 33 | hero-ateena-keskipaiva.png | ateena | ei (3) | — | ei viitteitä (ajuri) |
| 34 | hero-ateena-ilta.png | ateena | ei (3) | — | ei viitteitä (ajuri) |
| 35 | hero-amsterdam-kanaalikeha.jpg | amsterdam | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 36 | hero-amsterdam-aamu.png | amsterdam | ei (7) | — | ei viitteitä (ajuri) |
| 37 | hero-amsterdam-keskipaiva.png | amsterdam | ei (7) | — | ei viitteitä (ajuri) |
| 38 | hero-amsterdam-ilta.png | amsterdam | ei (7) | — | ei viitteitä (ajuri) |
| 39 | hero-istanbul-kultainensarvi.jpg | istanbul | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 40 | hero-istanbul-aamu.png | istanbul | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 633826b59 2026-08-22 Herokierros 2: Pariisi, Istanbul ja Delhi (3 kuvaa/kaupunki, v7)) |
| 41 | hero-istanbul-keskipaiva.png | istanbul | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 633826b59 2026-08-22 Herokierros 2: Pariisi, Istanbul ja Delhi (3 kuvaa/kaupunki, v7)) |
| 42 | hero-istanbul-ilta.png | istanbul | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 633826b59 2026-08-22 Herokierros 2: Pariisi, Istanbul ja Delhi (3 kuvaa/kaupunki, v7)) |
| 43 | hero-dublin-hapenny.jpg | dublin | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 44 | hero-dublin-aamu.png | dublin | ei (11) | — | ei viitteitä (ajuri) |
| 45 | hero-dublin-keskipaiva.png | dublin | ei (11) | — | ei viitteitä (ajuri) |
| 46 | hero-dublin-ilta.png | dublin | ei (11) | — | ei viitteitä (ajuri) |
| 47 | hero-edinburgh-aamu.png | edinburgh | ei (9) | — | ei viitteitä (ajuri) |
| 48 | hero-edinburgh-keskipaiva.png | edinburgh | ei (9) | — | ei viitteitä (ajuri) |
| 49 | hero-edinburgh-ilta.png | edinburgh | ei (9) | — | ei viitteitä (ajuri) |
| 50 | hero-marseille-aamu.jpg | marseille | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 51 | hero-marseille-keskipaiva.jpg | marseille | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 52 | hero-marseille-ilta.jpg | marseille | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 53 | hero-lissabon-alfama.jpg | lissabon | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 54 | hero-lissabon-aamu.png | lissabon | ei (10) | — | ei viitteitä (ajuri) |
| 55 | hero-lissabon-keskipaiva.png | lissabon | ei (10) | — | ei viitteitä (ajuri) |
| 56 | hero-lissabon-ilta.png | lissabon | ei (10) | — | ei viitteitä (ajuri) |
| 57 | hero-barcelona-aamu.png | barcelona | ei (11) | — | ei viitteitä (ajuri) |
| 58 | hero-barcelona-keskipaiva.png | barcelona | ei (11) | — | ei viitteitä (ajuri) |
| 59 | hero-barcelona-ilta.png | barcelona | ei (11) | — | ei viitteitä (ajuri) |
| 60 | hero-granada-aamu.jpg | granada | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 61 | hero-granada-keskipaiva.jpg | granada | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 62 | hero-granada-ilta.jpg | granada | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 63 | hero-budapest-parliament.jpg | budapest | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 64 | hero-budapest-lanchid.jpg | budapest | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 65 | hero-budapest-fishermans-bastion.jpg | budapest | ei työlistassa | — | tuntematon (6ad3e1754 2026-08-27 Herot era 3: 18 kuvaa kuudelle kaupungille) |
| 66 | hero-rooma-forum.jpg | rooma | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 67 | hero-rooma-aamu.png | rooma | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 68 | hero-rooma-keskipaiva.png | rooma | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 69 | hero-rooma-ilta.png | rooma | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 70 | hero-krakova-aamu.png | krakova | ei (10) | — | ei viitteitä (ajuri) |
| 71 | hero-krakova-keskipaiva.png | krakova | ei (10) | — | ei viitteitä (ajuri) |
| 72 | hero-krakova-ilta.png | krakova | ei (10) | — | ei viitteitä (ajuri) |
| 73 | hero-varsova-vanhatori.jpg | varsova | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 74 | hero-varsova-aamu.png | varsova | ei (13) | — | ei viitteitä (ajuri) |
| 75 | hero-varsova-keskipaiva.png | varsova | ei (13) | — | ei viitteitä (ajuri) |
| 76 | hero-varsova-ilta.png | varsova | ei (13) | — | ei viitteitä (ajuri) |
| 77 | hero-helsinki-senaatintori.jpg | helsinki | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 78 | hero7-uspenski.png | helsinki | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 0c052f1af 2026-08-22 Herokoe v5–v7: Helsinki-kohdeherot eri valolla ja kulmilla) |
| 79 | hero7-oodi.png | helsinki | kyllä (lista oodi; Category:Helsinki Central Library Oodi) | Helsingin keskustakirjasto Oodi 2022-09-16 01.jpg — CC0 — Leonhard Lenz<br>Kansalaistori square and the Central Library in Helsinki, Finland, 2020 April.jpg — CC BY 4.0 — Yehia Eweis<br>Central Library Oodi in Helsinki, Finland, 2019 September.jpg — CC BY 4.0 — ALA Architects<br>Helsinki Central Library Oodi, Helsinki, Finland.jpg — CC BY 2.0 — Ninara | rekonstruoitu (kategoria, kelvollisia 49) |
| 80 | hero-tampere-aamu.jpg | tampere | kyllä (14, 14korjaus, tampere*), versio korvattu | — | tuntematon: ajurin viiteversio (7528724db) korvattu era 2 -kuvalla 27.8. |
| 81 | hero-tampere-keskipaiva.jpg | tampere | kyllä (14, tampere*), versio korvattu | — | tuntematon: ajurin viiteversio (7528724db) korvattu era 2 -kuvalla 27.8. |
| 82 | hero-tampere-ilta.jpg | tampere | kyllä (14, tampere*), versio korvattu | — | tuntematon: ajurin viiteversio (7528724db) korvattu era 2 -kuvalla 27.8. |
| 83 | hero-tampere-nasinneula.jpg | tampere | kyllä (tampere*), versio korvattu | — | tuntematon: ajurin viiteversio (7528724db) korvattu era 2 -kuvalla 27.8. |
| 84 | hero-tallinna-kaupunginmuuri.jpg | tallinna | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 85 | hero-tallinna-aamu.png | tallinna | ei (14) | — | ei viitteitä (ajuri) |
| 86 | hero-tallinna-keskipaiva.png | tallinna | ei (14) | — | ei viitteitä (ajuri) |
| 87 | hero-tallinna-ilta.png | tallinna | ei (14) | — | ei viitteitä (ajuri) |
| 88 | hero-kiova-mihaelin-luostari.jpg | kiova | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 89 | hero-kiova-aamu.jpg | kiova | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 90 | hero-kiova-keskipaiva.jpg | kiova | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 91 | hero-kiova-ilta.jpg | kiova | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 92 | hero-pietari-aamu.png | pietari | ei (6) | — | ei viitteitä (ajuri) |
| 93 | hero-pietari-keskipaiva.png | pietari | ei (6) | — | ei viitteitä (ajuri) |
| 94 | hero-pietari-ilta.png | pietari | ei (6) | — | ei viitteitä (ajuri) |
| 95 | hero-moskova-aamu.png | moskova | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 96 | hero-moskova-keskipaiva.png | moskova | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 97 | hero-moskova-ilta.png | moskova | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 98 | hero-sofia-nevski.jpg | sofia | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 99 | hero-sofia-banya-bashi.jpg | sofia | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 100 | hero-sofia-vitosa.jpg | sofia | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 101 | hero-bukarest-parlamentti.jpg | bukarest | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 102 | hero-bukarest-aamu.jpg | bukarest | ei työlistassa | — | tuntematon (2fed50b5a 2026-08-26 Bukarestin herokuvat (3): Arcul de Triumf, Stavropoleos, CEC-palatsi) |
| 103 | hero-bukarest-keskipaiva.jpg | bukarest | ei työlistassa | — | tuntematon (2fed50b5a 2026-08-26 Bukarestin herokuvat (3): Arcul de Triumf, Stavropoleos, CEC-palatsi) |
| 104 | hero-bukarest-ilta.jpg | bukarest | ei työlistassa | — | tuntematon (2fed50b5a 2026-08-26 Bukarestin herokuvat (3): Arcul de Triumf, Stavropoleos, CEC-palatsi) |
| 105 | hero-sarajevo-bascarsija.jpg | sarajevo | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 106 | hero-sarajevo-aamu.jpg | sarajevo | ei työlistassa | — | tuntematon (85a494247 2026-08-26 Sarajevon herokuvat (3): Gazi Husrev-beg, Sacred Heart, Latinalainen silta) |
| 107 | hero-sarajevo-keskipaiva.jpg | sarajevo | ei työlistassa | — | tuntematon (85a494247 2026-08-26 Sarajevon herokuvat (3): Gazi Husrev-beg, Sacred Heart, Latinalainen silta) |
| 108 | hero-sarajevo-ilta.jpg | sarajevo | ei työlistassa | — | tuntematon (85a494247 2026-08-26 Sarajevon herokuvat (3): Gazi Husrev-beg, Sacred Heart, Latinalainen silta) |
| 109 | hero-odessa-potemkinin-portaat.jpg | odessa | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 110 | hero-odessa-aamu.jpg | odessa | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 111 | hero-odessa-keskipaiva.jpg | odessa | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 112 | hero-odessa-ilta.jpg | odessa | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 113 | hero-dubai-aamu.png | dubai | ei työlistassa | — | ei viitteitä (ennen viiteputkea: ece830e86 2026-08-22 Herokierros 3: Lontoo, Dubai ja Shanghai (3 kuvaa/kaupunki, v7)) |
| 114 | hero-dubai-keskipaiva.png | dubai | ei työlistassa | — | ei viitteitä (ennen viiteputkea: ece830e86 2026-08-22 Herokierros 3: Lontoo, Dubai ja Shanghai (3 kuvaa/kaupunki, v7)) |
| 115 | hero-dubai-ilta.png | dubai | ei työlistassa | — | ei viitteitä (ennen viiteputkea: ece830e86 2026-08-22 Herokierros 3: Lontoo, Dubai ja Shanghai (3 kuvaa/kaupunki, v7)) |
| 116 | hero-petra-aamu.png | petra | ei työlistassa | — | ei viitteitä (ennen viiteputkea: aedc9b767 2026-08-22 Herokierros 6: Wien, Petra ja Bangkok (3 kuvaa/kaupunki, v7)) |
| 117 | hero-petra-keskipaiva.png | petra | ei työlistassa | — | ei viitteitä (ennen viiteputkea: aedc9b767 2026-08-22 Herokierros 6: Wien, Petra ja Bangkok (3 kuvaa/kaupunki, v7)) |
| 118 | hero-petra-ilta.png | petra | kyllä (lista korjaus2; Category:Palace Tomb (Petra)) | Palace Tomb (Petra) 02.jpg — CC BY-SA 4.0 — Davide Mauro<br>Petra Palace Tomb 1999.jpg — CC BY-SA 4.0 — Dosseman<br>The Palace Tomb, Corinthian Tomb (12293969153).jpg — CC BY 2.0 — Jorge Láscar from Australia<br>Palace Tomb in Petra.jpg — CC BY-SA 4.0 — Dudva | rekonstruoitu (kategoria, kelvollisia 49) |
| 119 | hero-mekka-aamu.png | mekka | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 120 | hero-mekka-keskipaiva.png | mekka | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 121 | hero-mekka-ilta.png | mekka | kyllä (lista korjaus2; Category:Jabal al-Nour) | Jabal Nur.JPG — Public domain — Adiput ( talk )<br>Jabbal An-Nour - Makkah (2241558560).jpg — CC BY 2.0 — Wal N.<br>Jabal al-Nour And cave Hira.jpg — CC BY-SA 4.0 — Sadath i<br>Jabal al-Nur, Mecca, Saudi Arabia (2).jpg — CC BY 2.0 — Richard Mortel | rekonstruoitu (kategoria, kelvollisia 18) |
| 122 | hero-goreme-aamu.jpg | kapadokia | ei työlistassa | — | tuntematon (8f13432db 2026-08-27 Kappadokian herot: Goreme, Ortahisar, Selime (aamu)) |
| 123 | hero-ortahisar-aamu.jpg | kapadokia | ei työlistassa | — | tuntematon (8f13432db 2026-08-27 Kappadokian herot: Goreme, Ortahisar, Selime (aamu)) |
| 124 | hero-selime-aamu.jpg | kapadokia | ei työlistassa | — | tuntematon (8f13432db 2026-08-27 Kappadokian herot: Goreme, Ortahisar, Selime (aamu)) |
| 125 | hero-jerusalem-aamu.png | jerusalem | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 126 | hero-jerusalem-keskipaiva.png | jerusalem | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 127 | hero-jerusalem-ilta.png | jerusalem | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 128 | hero-tromssa-aamu.jpg | tromssa | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 129 | hero-tromssa-keskipaiva.jpg | tromssa | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 130 | hero-tromssa-ilta.jpg | tromssa | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 131 | hero-islanti-hallgrimskirkja.jpg | islanti | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 132 | hero-islanti-keskipaiva.jpg | islanti | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 133 | hero-islanti-ilta.jpg | islanti | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 134 | hero-lappi-aamu.jpg | lappi | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 135 | hero-lappi-keskipaiva.jpg | lappi | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 136 | hero-lappi-ilta.jpg | lappi | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 137 | hero-kreeta-aamu.jpg | kreeta | ei työlistassa | — | tuntematon (1e46980a2 2026-08-26 Kreetan herokuvat (Arkadi, Koules, Fortezza — omistajan ChatGPT-era)) |
| 138 | hero-kreeta-keskipaiva.jpg | kreeta | ei työlistassa | — | tuntematon (1e46980a2 2026-08-26 Kreetan herokuvat (Arkadi, Koules, Fortezza — omistajan ChatGPT-era)) |
| 139 | hero-kreeta-ilta.jpg | kreeta | ei työlistassa | — | tuntematon (1e46980a2 2026-08-26 Kreetan herokuvat (Arkadi, Koules, Fortezza — omistajan ChatGPT-era)) |
| 140 | hero-sisilia-aamu.jpg | sisilia | ei työlistassa | — | tuntematon (14eb7bf82 2026-08-26 Sisilian herokuvat (Concordia, Syrakusa, Monreale — omistajan ChatGPT-era)) |
| 141 | hero-sisilia-keskipaiva.jpg | sisilia | ei työlistassa | — | tuntematon (14eb7bf82 2026-08-26 Sisilian herokuvat (Concordia, Syrakusa, Monreale — omistajan ChatGPT-era)) |
| 142 | hero-sisilia-ilta.jpg | sisilia | ei työlistassa | — | tuntematon (14eb7bf82 2026-08-26 Sisilian herokuvat (Concordia, Syrakusa, Monreale — omistajan ChatGPT-era)) |
| 143 | hero-alpit-aamu.jpg | alpit | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 144 | hero-alpit-keskipaiva.jpg | alpit | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 145 | hero-alpit-ilta.jpg | alpit | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 146 | hero-dubrovnik-kaupunginmuurit.jpg | dubrovnik | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 147 | hero-dubrovnik-aamu.jpg | dubrovnik | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 148 | hero-dubrovnik-keskipaiva.jpg | dubrovnik | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 149 | hero-dubrovnik-ilta.jpg | dubrovnik | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 150 | hero-riika-vanhakaupunki.jpg | riika | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 151 | hero-riika-aamu.png | riika | ei (13) | — | ei viitteitä (ajuri) |
| 152 | hero-riika-keskipaiva.png | riika | ei (13) | — | ei viitteitä (ajuri) |
| 153 | hero-riika-ilta.png | riika | ei (13) | — | ei viitteitä (ajuri) |
| 154 | hero-vilna-gediminas.jpg | vilna | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 155 | hero-vilna-aamu.jpg | vilna | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 156 | hero-vilna-keskipaiva.jpg | vilna | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 157 | hero-vilna-ilta.jpg | vilna | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 158 | hero-oslo-oopperatalo.jpg | oslo | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 159 | hero-oslo-aamu.png | oslo | ei (12) | — | ei viitteitä (ajuri) |
| 160 | hero-oslo-keskipaiva.png | oslo | ei (12) | — | ei viitteitä (ajuri) |
| 161 | hero-oslo-ilta.png | oslo | ei (12) | — | ei viitteitä (ajuri) |
| 162 | hero-firenze-aamu.png | firenze | ei (9) | — | ei viitteitä (ajuri) |
| 163 | hero-firenze-keskipaiva.png | firenze | ei (9) | — | ei viitteitä (ajuri) |
| 164 | hero-firenze-ilta.png | firenze | ei (9) | — | ei viitteitä (ajuri) |
| 165 | hero-firenze-piazzale-michelangelo.jpg | firenze | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 166 | hero-kobenhavn-aamu.png | kobenhavn | ei (12) | — | ei viitteitä (ajuri) |
| 167 | hero-kobenhavn-keskipaiva.png | kobenhavn | ei (12) | — | ei viitteitä (ajuri) |
| 168 | hero-kobenhavn-ilta.png | kobenhavn | ei (12) | — | ei viitteitä (ajuri) |
| 169 | hero-kobenhavn-nyhavn.jpg | kobenhavn | ei työlistassa | — | tuntematon (83b785d43 2026-08-28 Herokuvaera 31: 30 eurooppalaista heroa julisteet/herokoe/) |
| 170 | hero-doha-aamu.png | doha | ei (9) | — | ei viitteitä (ajuri) |
| 171 | hero-doha-keskipaiva.png | doha | ei (9) | — | ei viitteitä (ajuri) |
| 172 | hero-doha-ilta.png | doha | ei (9) | — | ei viitteitä (ajuri) |
| 173 | hero-nikosia-aamu.jpg | nikosia | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 174 | hero-nikosia-keskipaiva.jpg | nikosia | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 175 | hero-nikosia-ilta.jpg | nikosia | ei työlistassa | — | tuntematon (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 176 | hero-kuwait-aamu.png | kuwait | ei (13) | — | ei viitteitä (ajuri) |
| 177 | hero-kuwait-keskipaiva.jpg | kuwait | ei (13) | — | tuntematon: korvattu (d719d3429 2026-08-28 Herokuvat: Tampereen Nasilinna, 6 korjattua kuvaa ja 5 slotittamatonta) |
| 178 | hero-kuwait-ilta.jpg | kuwait | ei (13) | — | tuntematon: korvattu (d719d3429 2026-08-28 Herokuvat: Tampereen Nasilinna, 6 korjattua kuvaa ja 5 slotittamatonta) |
| 179 | hero-masqat-aamu.png | masqat | ei (8) | — | ei viitteitä (ajuri) |
| 180 | hero-masqat-keskipaiva.png | masqat | ei (8) | — | ei viitteitä (ajuri) |
| 181 | hero-masqat-ilta.png | masqat | ei (8) | — | ei viitteitä (ajuri) |
| 182 | hero-bagdad-aamu.png | bagdad | ei (7) | — | ei viitteitä (ajuri) |
| 183 | hero-bagdad-keskipaiva.png | bagdad | ei (7) | — | ei viitteitä (ajuri) |
| 184 | hero-bagdad-ilta.png | bagdad | ei (7) | — | ei viitteitä (ajuri) |
| 185 | hero-izmir-aamu.jpg | izmir | ei työlistassa | — | tuntematon (a7b428336 2026-08-26 Izmirin herokuvat vientiin (aamu kellotorni, keskipaiva Asansor, ilta Kizlaragasi Han)) |
| 186 | hero-izmir-keskipaiva.jpg | izmir | ei työlistassa | — | tuntematon (a7b428336 2026-08-26 Izmirin herokuvat vientiin (aamu kellotorni, keskipaiva Asansor, ilta Kizlaragasi Han)) |
| 187 | hero-izmir-ilta.jpg | izmir | ei työlistassa | — | tuntematon (a7b428336 2026-08-26 Izmirin herokuvat vientiin (aamu kellotorni, keskipaiva Asansor, ilta Kizlaragasi Han)) |
| 188 | hero-ankara-aamu.jpg | ankara | ei (12) | — | tuntematon: korvattu (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 189 | hero-ankara-keskipaiva.jpg | ankara | ei (12) | — | tuntematon: korvattu (242492d1a 2026-08-27 Herot era 2: 12 kaupunkia + Tampereen uusinta (40 kuvaa)) |
| 190 | hero-ankara-ilta.jpg | ankara | ei (12) | — | tuntematon: korvattu (d719d3429 2026-08-28 Herokuvat: Tampereen Nasilinna, 6 korjattua kuvaa ja 5 slotittamatonta) |
| 191 | hero-damaskos-aamu.png | damaskos | ei (6) | — | ei viitteitä (ajuri) |
| 192 | hero-damaskos-keskipaiva.png | damaskos | kyllä (lista korjaus3; Category:Damascus Citadel) | Citadel of old Damascus.jpg — CC BY-SA 4.0 — Soleman aldbeat<br>Damascus north-western tower of the Citadel 1410.jpg — CC BY-SA 4.0 — Dosseman<br>Damascus-citadel.JPG — Public domain — User:Aziz1005<br>Damascus Castle Walls 1.jpg — CC BY-SA 3.0 — Freedom's Falcon | rekonstruoitu (kategoria, kelvollisia 46) |
| 193 | hero-damaskos-ilta.jpg | damaskos | ei (6) | — | tuntematon: korvattu (d719d3429 2026-08-28 Herokuvat: Tampereen Nasilinna, 6 korjattua kuvaa ja 5 slotittamatonta) |
| 194 | hero-luxor-aamu.jpg | luxor | ei (3) | — | tuntematon: korvattu (d719d3429 2026-08-28 Herokuvat: Tampereen Nasilinna, 6 korjattua kuvaa ja 5 slotittamatonta) |
| 195 | hero-luxor-keskipaiva.png | luxor | ei (3) | — | ei viitteitä (ajuri) |
| 196 | hero-luxor-ilta.png | luxor | ei (3) | — | ei viitteitä (ajuri) |
| 197 | hero-riad-aamu.png | riad | ei (11) | — | ei viitteitä (ajuri) |
| 198 | hero-riad-keskipaiva.png | riad | ei (11) | — | ei viitteitä (ajuri) |
| 199 | hero-riad-ilta.png | riad | ei (11) | — | ei viitteitä (ajuri) |
| 200 | hero-tabriz-aamu.png | tabriz | ei (13) | — | ei viitteitä (ajuri) |
| 201 | hero-tabriz-keskipaiva.png | tabriz | ei (13) | — | ei viitteitä (ajuri) |
| 202 | hero-tabriz-ilta.png | tabriz | ei (13) | — | ei viitteitä (ajuri) |
| 203 | hero-teheran-aamu.png | teheran | ei (10) | — | ei viitteitä (ajuri) |
| 204 | hero-teheran-keskipaiva.png | teheran | ei (10) | — | ei viitteitä (ajuri) |
| 205 | hero-teheran-ilta.png | teheran | ei (10) | — | ei viitteitä (ajuri) |
| 206 | hero-isfahan-aamu.png | isfahan | ei (3) | — | ei viitteitä (ajuri) |
| 207 | hero-isfahan-keskipaiva.png | isfahan | ei (3) | — | ei viitteitä (ajuri) |
| 208 | hero-isfahan-ilta.png | isfahan | ei (3) | — | ei viitteitä (ajuri) |
| 209 | hero-peking-aamu.png | peking | ei työlistassa | — | ei viitteitä (ennen viiteputkea: df7140a53 2026-08-22 Herokoe: Peking kolmena vuorokaudenaikana (v7-resepti)) |
| 210 | hero-peking-keskipaiva.png | peking | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 1afa71980 2026-08-22 Herokoe: myös Pekingin keskipäiväkuvalle umlauttiturvallinen nimi) |
| 211 | hero-peking-ilta.png | peking | ei työlistassa | — | ei viitteitä (ennen viiteputkea: df7140a53 2026-08-22 Herokoe: Peking kolmena vuorokaudenaikana (v7-resepti)) |
| 212 | hero-delhi-aamu.png | delhi | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 633826b59 2026-08-22 Herokierros 2: Pariisi, Istanbul ja Delhi (3 kuvaa/kaupunki, v7)) |
| 213 | hero-delhi-keskipaiva.png | delhi | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 633826b59 2026-08-22 Herokierros 2: Pariisi, Istanbul ja Delhi (3 kuvaa/kaupunki, v7)) |
| 214 | hero-delhi-ilta.png | delhi | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 633826b59 2026-08-22 Herokierros 2: Pariisi, Istanbul ja Delhi (3 kuvaa/kaupunki, v7)) |
| 215 | hero-tokio-aamu.png | tokio | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 216 | hero-tokio-keskipaiva.png | tokio | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 217 | hero-tokio-ilta.png | tokio | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 218 | hero-soul-aamu.png | soul | ei (3) | — | ei viitteitä (ajuri) |
| 219 | hero-soul-keskipaiva.png | soul | ei (3) | — | ei viitteitä (ajuri) |
| 220 | hero-soul-ilta.png | soul | ei (3) | — | ei viitteitä (ajuri) |
| 221 | hero-shanghai-aamu.png | shanghai | ei työlistassa | — | ei viitteitä (ennen viiteputkea: ece830e86 2026-08-22 Herokierros 3: Lontoo, Dubai ja Shanghai (3 kuvaa/kaupunki, v7)) |
| 222 | hero-shanghai-keskipaiva.png | shanghai | ei työlistassa | — | ei viitteitä (ennen viiteputkea: ece830e86 2026-08-22 Herokierros 3: Lontoo, Dubai ja Shanghai (3 kuvaa/kaupunki, v7)) |
| 223 | hero-shanghai-ilta.png | shanghai | ei työlistassa | — | ei viitteitä (ennen viiteputkea: ece830e86 2026-08-22 Herokierros 3: Lontoo, Dubai ja Shanghai (3 kuvaa/kaupunki, v7)) |
| 224 | hero-tripoli-aamu.png | tripoli | ei (8) | — | ei viitteitä (ajuri) |
| 225 | hero-tripoli-keskipaiva.png | tripoli | ei (8) | — | ei viitteitä (ajuri) |
| 226 | hero-tripoli-ilta.png | tripoli | ei (8) | — | ei viitteitä (ajuri) |
| 227 | hero-jekaterinburg-aamu.png | jekaterinburg | ei (13) | — | ei viitteitä (ajuri) |
| 228 | hero-jekaterinburg-keskipaiva.png | jekaterinburg | ei (13) | — | ei viitteitä (ajuri) |
| 229 | hero-jekaterinburg-ilta.png | jekaterinburg | ei (13) | — | ei viitteitä (ajuri) |
| 230 | hero-vladivostok-aamu.png | vladivostok | ei (9) | — | ei viitteitä (ajuri) |
| 231 | hero-vladivostok-keskipaiva.png | vladivostok | ei (9) | — | ei viitteitä (ajuri) |
| 232 | hero-vladivostok-ilta.png | vladivostok | ei (9) | — | ei viitteitä (ajuri) |
| 233 | hero-bangkok-aamu.png | bangkok | ei työlistassa | — | ei viitteitä (ennen viiteputkea: d18f51f41 2026-08-22 Herokierros 6 loppuun: Bangkok (3 kuvaa, v7)) |
| 234 | hero-bangkok-keskipaiva.png | bangkok | ei työlistassa | — | ei viitteitä (ennen viiteputkea: d18f51f41 2026-08-22 Herokierros 6 loppuun: Bangkok (3 kuvaa, v7)) |
| 235 | hero-bangkok-ilta.png | bangkok | ei työlistassa | — | ei viitteitä (ennen viiteputkea: d18f51f41 2026-08-22 Herokierros 6 loppuun: Bangkok (3 kuvaa, v7)) |
| 236 | hero-kioto-aamu.png | kioto | ei (6) | — | ei viitteitä (ajuri) |
| 237 | hero-kioto-keskipaiva.png | kioto | ei (6) | — | ei viitteitä (ajuri) |
| 238 | hero-kioto-ilta.png | kioto | ei (6) | — | ei viitteitä (ajuri) |
| 239 | hero-singapore-aamu.png | singapore | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 240 | hero-singapore-keskipaiva.png | singapore | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 241 | hero-singapore-ilta.png | singapore | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 4102c42e9 2026-08-22 Herokierros 4: Rooma, Jerusalem ja Singapore (3 kuvaa/kaupunki, v7)) |
| 242 | hero-samarkand-aamu.png | samarkand | ei (3) | — | ei viitteitä (ajuri) |
| 243 | hero-samarkand-keskipaiva.png | samarkand | ei (3) | — | ei viitteitä (ajuri) |
| 244 | hero-samarkand-ilta.png | samarkand | ei (3) | — | ei viitteitä (ajuri) |
| 245 | hero-xian-aamu.png | xian | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 246 | hero-xian-keskipaiva.png | xian | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 247 | hero-xian-ilta.png | xian | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 06f83f672 2026-08-22 Herolaajennus: Xi'an, Tokio ja Kairo (3 kuvaa/kaupunki, v7-resepti)) |
| 248 | hero-varanasi-aamu.png | varanasi | ei (6) | — | ei viitteitä (ajuri) |
| 249 | hero-varanasi-keskipaiva.png | varanasi | ei (6) | — | ei viitteitä (ajuri) |
| 250 | hero-varanasi-ilta.png | varanasi | ei (6) | — | ei viitteitä (ajuri) |
| 251 | hero-hanoi-aamu.png | hanoi | ei (7) | — | ei viitteitä (ajuri) |
| 252 | hero-hanoi-keskipaiva.png | hanoi | ei (7) | — | ei viitteitä (ajuri) |
| 253 | hero-hanoi-ilta.png | hanoi | ei (7) | — | ei viitteitä (ajuri) |
| 254 | hero-ulanbator-aamu.png | ulanbator | ei (11) | — | ei viitteitä (ajuri) |
| 255 | hero-ulanbator-keskipaiva.png | ulanbator | ei (11) | — | ei viitteitä (ajuri) |
| 256 | hero-ulanbator-ilta.png | ulanbator | ei (11) | — | ei viitteitä (ajuri) |
| 257 | hero-kathmandu-aamu.png | kathmandu | ei (7) | — | ei viitteitä (ajuri) |
| 258 | hero-kathmandu-keskipaiva.png | kathmandu | ei (7) | — | ei viitteitä (ajuri) |
| 259 | hero-kathmandu-ilta.png | kathmandu | ei (7) | — | ei viitteitä (ajuri) |
| 260 | hero-astana-aamu.png | astana | ei (10) | — | ei viitteitä (ajuri) |
| 261 | hero-astana-keskipaiva.png | astana | ei (10) | — | ei viitteitä (ajuri) |
| 262 | hero-astana-ilta.png | astana | ei (10) | — | ei viitteitä (ajuri) |
| 263 | hero-kanton-aamu.png | kanton | ei (7) | — | ei viitteitä (ajuri) |
| 264 | hero-kanton-keskipaiva.png | kanton | ei (7) | — | ei viitteitä (ajuri) |
| 265 | hero-kanton-ilta.png | kanton | ei (7) | — | ei viitteitä (ajuri) |
| 266 | hero-yangon-aamu.png | yangon | ei (10) | — | ei viitteitä (ajuri) |
| 267 | hero-yangon-keskipaiva.png | yangon | ei (10) | — | ei viitteitä (ajuri) |
| 268 | hero-yangon-ilta.png | yangon | ei (10) | — | ei viitteitä (ajuri) |
| 269 | hero-mandalay-aamu.jpg | mandalay | ei (12) | — | tuntematon: korvattu (d719d3429 2026-08-28 Herokuvat: Tampereen Nasilinna, 6 korjattua kuvaa ja 5 slotittamatonta) |
| 270 | hero-mandalay-keskipaiva.png | mandalay | ei (12) | — | ei viitteitä (ajuri) |
| 271 | hero-mandalay-ilta.png | mandalay | ei (12) | — | ei viitteitä (ajuri) |
| 272 | hero-taipei-aamu.png | taipei | ei (8) | — | ei viitteitä (ajuri) |
| 273 | hero-taipei-keskipaiva.png | taipei | ei (8) | — | ei viitteitä (ajuri) |
| 274 | hero-taipei-ilta.png | taipei | ei (8) | — | ei viitteitä (ajuri) |
| 275 | hero-hongkong-aamu.png | hongkong | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 276 | hero-hongkong-keskipaiva.png | hongkong | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 277 | hero-hongkong-ilta.png | hongkong | ei työlistassa | — | ei viitteitä (ennen viiteputkea: 3a980337d 2026-08-22 Herokierros 5: Moskova, Mekka ja Hongkong (3 kuvaa/kaupunki, v7)) |
| 278 | hero-jakarta-aamu.png | jakarta | ei (9) | — | ei viitteitä (ajuri) |
| 279 | hero-jakarta-keskipaiva.png | jakarta | ei (9) | — | ei viitteitä (ajuri) |
| 280 | hero-jakarta-ilta.png | jakarta | ei (9) | — | ei viitteitä (ajuri) |
| 281 | hero-manila-aamu.png | manila | ei (11) | — | ei viitteitä (ajuri) |
| 282 | hero-manila-keskipaiva.png | manila | ei (11) | — | ei viitteitä (ajuri) |
| 283 | hero-manila-ilta.png | manila | ei (11) | — | ei viitteitä (ajuri) |
| 284 | hero-kashgar-aamu.png | kashgar | ei (13) | — | ei viitteitä (ajuri) |
| 285 | hero-kashgar-keskipaiva.png | kashgar | kyllä (lista korjaus1; Category:Mausoleum of Yusuf Khass Hajib) | Mausoleum of Yusuf Khass Hajib Introduction.jpg — CC BY-SA 4.0 — Voidvector<br>Mausoleum of Yusuf Khass Hajib main building.jpg — CC BY-SA 4.0 — Voidvector<br>Mausoleum of Yusuf Khass Hajib front gate.jpg — CC BY-SA 4.0 — Voidvector<br>Mausoleum of Yusuf Khass Hajib tomb.jpg — CC BY-SA 4.0 — Voidvector | rekonstruoitu (kategoria, kelvollisia 8) |
| 286 | hero-kashgar-ilta.png | kashgar | ei (13) | — | ei viitteitä (ajuri) |
| 287 | hero-lhasa-aamu.png | lhasa | ei (12) | — | ei viitteitä (ajuri) |
| 288 | hero-lhasa-keskipaiva.png | lhasa | ei (12) | — | ei viitteitä (ajuri) |
| 289 | hero-lhasa-ilta.png | lhasa | ei (12) | — | ei viitteitä (ajuri) |
| 290 | hero-kolkata-aamu.png | kolkata | ei (8) | — | ei viitteitä (ajuri) |
| 291 | hero-kolkata-keskipaiva.png | kolkata | ei (8) | — | ei viitteitä (ajuri) |
| 292 | hero-kolkata-ilta.png | kolkata | ei (8) | — | ei viitteitä (ajuri) |
| 293 | hero-kabul-aamu.png | kabul | kyllä (lista kabul; Category:Kart-e Sakhi Mosque) | Kart-e Sakhi memorial yard in 2009.jpg — CC BY-SA 3.0 — vetman<br>Sakhi memorial main gate (2009) - panoramio.jpg — CC BY-SA 3.0 — Masoud Akbari<br>Sakhi memorial - panoramio.jpg — CC BY-SA 3.0 — Masoud Akbari<br>Sakhi memorial back yard - panoramio.jpg — CC BY-SA 3.0 — Masoud Akbari | rekonstruoitu (kategoria, kelvollisia 7) |
| 294 | hero-kabul-keskipaiva.png | kabul | kyllä (lista kabul; Category:Kabul University) | Angel Center at Kabul University.jpg — CC BY 2.0 — Colleen Taugher from Lewiston Idaho, USA<br>Library at Kabul University-2008.jpg — CC BY 2.0 — Step from Amherst, USA<br>Kabul University Central Library.jpg — CC BY 2.0 — stepnout<br>Professor Azim Noorbakhsh, Lecturer for the Faculty of Journalism at Kabul University (111201-N-TH437-002).jpg — Public domain — NATO Training Mission-Afghanistan | rekonstruoitu (kategoria, kelvollisia 12) |
| 295 | hero-kabul-ilta.png | kabul | kyllä (lista kabul; Category:Abdul Rahman Mosque) | Abdul Rahman Mosque in 2010.jpg — Public domain — Daniel Wilkinson, employee of U.S. Department of …<br>Abdul Rahman mosque, Kabul.jpg — CC0 — Hogai Aryoubi<br>Grand Mosque of Kabul.jpg — CC BY-SA 2.0 — Joe Burger from Siegburg, Germany<br>Grand Mosque Kabul.jpg — CC BY-SA 3.0 — Casimiri at en.wikipedia | rekonstruoitu (kategoria, kelvollisia 7) |
| 296 | hero-chennai-aamu.png | chennai | ei (11) | — | ei viitteitä (ajuri) |
| 297 | hero-chennai-keskipaiva.png | chennai | ei (11) | — | ei viitteitä (ajuri) |
| 298 | hero-chennai-ilta.png | chennai | ei (11) | — | ei viitteitä (ajuri) |
| 299 | hero-mumbai-aamu.png | mumbai | ei (9) | — | ei viitteitä (ajuri) |
| 300 | hero-mumbai-keskipaiva.png | mumbai | ei (9) | — | ei viitteitä (ajuri) |
| 301 | hero-mumbai-ilta.png | mumbai | ei (9) | — | ei viitteitä (ajuri) |
| 302 | hero-colombo-aamu.png | colombo | ei (10) | — | ei viitteitä (ajuri) |
| 303 | hero-colombo-keskipaiva.png | colombo | ei (10) | — | ei viitteitä (ajuri) |
| 304 | hero-colombo-ilta.png | colombo | ei (10) | — | ei viitteitä (ajuri) |
| 305 | hero-karachi-aamu.png | karachi | ei (12) | — | ei viitteitä (ajuri) |
| 306 | hero-karachi-keskipaiva.png | karachi | ei (12) | — | ei viitteitä (ajuri) |
| 307 | hero-karachi-ilta.png | karachi | ei (12) | — | ei viitteitä (ajuri) |
| 308 | hero-sanfrancisco-aamu.png | sanfrancisco | ei (4) | — | ei viitteitä (ajuri) |
| 309 | hero-sanfrancisco-keskipaiva.png | sanfrancisco | ei (4) | — | ei viitteitä (ajuri) |
| 310 | hero-sanfrancisco-ilta.png | sanfrancisco | ei (4) | — | ei viitteitä (ajuri) |
| 311 | hero-newyork-aamu.png | newyork | ei (4) | — | ei viitteitä (ajuri) |
| 312 | hero-newyork-keskipaiva.png | newyork | ei (4) | — | ei viitteitä (ajuri) |
| 313 | hero-newyork-ilta.png | newyork | ei (4) | — | ei viitteitä (ajuri) |
| 314 | hero-auckland-aamu.png | auckland | ei (5) | — | ei viitteitä (ajuri) |
| 315 | hero-auckland-keskipaiva.png | auckland | ei (5) | — | ei viitteitä (ajuri) |
| 316 | hero-auckland-ilta.png | auckland | ei (5) | — | ei viitteitä (ajuri) |
| 317 | hero-buenosaires-aamu.png | buenosaires | ei (5) | — | ei viitteitä (ajuri) |
| 318 | hero-buenosaires-keskipaiva.png | buenosaires | ei (5) | — | ei viitteitä (ajuri) |
| 319 | hero-buenosaires-ilta.png | buenosaires | ei (5) | — | ei viitteitä (ajuri) |
| 320 | hero-rio-aamu.png | rio | ei (5) | — | ei viitteitä (ajuri) |
| 321 | hero-rio-keskipaiva.png | rio | ei (5) | — | ei viitteitä (ajuri) |
| 322 | hero-rio-ilta.png | rio | ei (5) | — | ei viitteitä (ajuri) |
| 323 | hero-sydney-aamu.png | sydney | ei (5) | — | ei viitteitä (ajuri) |
| 324 | hero-sydney-keskipaiva.png | sydney | ei (5) | — | ei viitteitä (ajuri) |
| 325 | hero-sydney-ilta.png | sydney | ei (5) | — | ei viitteitä (ajuri) |
| 326 | hero-wellington-aamu.png | wellington | ei (14) | — | ei viitteitä (ajuri) |
| 327 | hero-wellington-keskipaiva.png | wellington | ei (14) | — | ei viitteitä (ajuri) |
| 328 | hero-wellington-ilta.png | wellington | ei (14) | — | ei viitteitä (ajuri) |
| 329 | hero-sevilla-aamu.png | sevilla | ei (14) | — | ei viitteitä (ajuri) |
| 330 | hero-sevilla-keskipaiva.png | sevilla | ei (14) | — | ei viitteitä (ajuri) |
| 331 | hero-sevilla-ilta.png | sevilla | ei (14) | — | ei viitteitä (ajuri) |
| 332 | hero-bergen-aamu.png | bergen | ei (14) | — | ei viitteitä (ajuri) |
| 333 | hero-bergen-keskipaiva.png | bergen | ei (14) | — | ei viitteitä (ajuri) |
| 334 | hero-bergen-ilta.png | bergen | ei (14) | — | ei viitteitä (ajuri) |
| 335 | hero-montreal-aamu.png | montreal | ei (14) | — | ei viitteitä (ajuri) |
| 336 | hero-montreal-keskipaiva.png | montreal | ei (14) | — | ei viitteitä (ajuri) |
| 337 | hero-montreal-ilta.png | montreal | ei (14) | — | ei viitteitä (ajuri) |
| 338 | hero-melbourne-aamu.png | melbourne | kyllä (lista melbourne; Category:State Library of Victoria) | SLV 2007 front entrance.jpg — CC BY-SA 4.0 — Orderinchaos<br>SLV - Russell St Entrance.jpg — CC BY-SA 4.0 — Canley<br>Forecourt of the State Library of Victoria.jpg — Public domain — State Library Victoria<br>State Library of Victoria (26970400544).jpg — CC BY 2.0 — Travellers travel photobook from Melbourne, Austr… | rekonstruoitu (kategoria, kelvollisia 47) |
| 339 | hero-melbourne-keskipaiva.png | melbourne | kyllä (lista melbourne; Category:Princes Bridge) | Melbourne (AU), Princes Bridge -- 2019 -- 1418.jpg — CC BY-SA 4.0 — Dietmar Rabich<br>Night view of the Melbourne CBD, over the Yarra River, showing Princes Bridge, St Kilda Road, St Paul's Cathedral, and Federation Square. Peter Neaum. - panoramio.jpg — CC BY 3.0 — Peter Neaum<br>Melbourne Skyline and Princes Bridge - Dec 2008.jpg — CC BY 3.0 — Diliff<br>Melbourne Princes bridge 2017-10-10.jpg — CC BY-SA 4.0 — Tangerineduel | rekonstruoitu (kategoria, kelvollisia 47) |
| 340 | hero-melbourne-ilta.png | melbourne | kyllä (lista melbourne; Category:Luna Park, Melbourne) | Melbourne's Luna Park entrance at night.jpg — CC BY 2.0 — Nicholas Cole<br>Entrance to Luna park (36254211646).jpg — CC BY 2.0 — oatsy40<br>Entrance to Melbourne's Luna Park 2014.jpg — CC BY-SA 4.0 — MusikAnimal<br>Luna Park as night falls (9181240085).jpg — CC BY 2.0 — Scott Cresswell from Melbourne, Australia | rekonstruoitu (kategoria, kelvollisia 47) |
| 341 | hero-vancouver-aamu.png | vancouver | kyllä (lista vancouver; Category:Lions Gate Bridge) | DSC00668-edited.jpg — CC BY 4.0 — IanMoVill<br>Lion's Gate Bridge.jpg — CC BY 2.0 — David J Laporte from Great Falls, Montana, USA<br>Cape Brazil after entering Vancouver harbour.jpg — CC BY 2.0 — Tavis Ford from Canada<br>CPR Princess Ship Lions Gate Bridge, Vancouver. (50119763427).jpg — Public domain — William Davies | rekonstruoitu (kategoria, kelvollisia 47) |
| 342 | hero-vancouver-keskipaiva.png | vancouver | kyllä (lista vancouver; Category:Science World (Vancouver)) | Science World, Vancouver, west view 20240901 1.jpg — CC BY-SA 4.0 — DXR<br>Science World (10930526533).jpg — CC BY 2.0 — GoToVan from Vancouver, Canada<br>Science World, Vancouver, BC (2012) - 1.JPG — CC BY-SA 3.0 — Another Believer<br>Science World Dome (11437379163).jpg — CC BY 2.0 — Michael Pereckas from Milwaukee, WI, USA | rekonstruoitu (kategoria, kelvollisia 48) |
| 343 | hero-vancouver-ilta.png | vancouver | kyllä (lista vancouver; Category:Marine Building) | Marine Building Vancouver (86584765).jpg — CC BY 2.0 — Sandra Cohen-Rose and Colin Rose from Montreal, C…<br>Marine Building from granville.jpg — Public domain — Bobanny<br>Marine Building (8048367519).jpg — CC BY 2.0 — Tony Hisgett from Birmingham, UK<br>Marine Building Vancouver BC.jpg — CC BY-SA 3.0 — Darren Kirby | rekonstruoitu (kategoria, kelvollisia 28) |
| 344 | hero-brisbane-aamu.png | brisbane | kyllä (lista brisbane; Category:Story Bridge, Brisbane) | Brisbane CBD from Story Bridge, Brisbane in August 2018, 04.jpg — CC BY-SA 4.0 — Kgbo<br>Altostratus undulatus and Story Bridge from CityCat Gootcha Brisbane River P1260817.jpg — CC BY-SA 4.0 — John Robert McPherson<br>About to travel under Story Bridge-1= (36081209505).jpg — CC BY-SA 2.0 — John from Redcliffe, Australia<br>Brisbane River and Story Bridge-01+ (2743952092).jpg — CC BY-SA 2.0 — Sheba_Also 43,000 photos | rekonstruoitu (kategoria, kelvollisia 44) |
| 345 | hero-brisbane-keskipaiva.png | brisbane | kyllä (lista brisbane; Category:St John's Cathedral, Brisbane) | St John's Anglican Cathedral from Cathedral Square Ann St Brisbane P1050774.jpg — CC BY-SA 4.0 — John Robert McPherson<br>Side Door St John's Cathedral, Brisbane 052013 664.jpg — CC BY-SA 3.0 — Kgbo<br>North Wall St Johns-01+ (201532492).jpg — CC BY-SA 2.0 — Sheba_Also 43,000 photos<br>Brisbain - panoramio (1).jpg — CC BY 3.0 — Tanya Dedyukhina | rekonstruoitu (kategoria, kelvollisia 39) |
| 346 | hero-brisbane-ilta.png | brisbane | kyllä (lista brisbane; Category:Wheel of Brisbane) | A ferris wheel in Brisbane is pretty small after seeing the London Eye (5019459971).jpg — CC BY 2.0 — cogdogblog<br>Nepalese Peace Pagoda and Wheel of Brisbane Southbank Parklands South Brisbane L1180443.jpg — CC BY-SA 4.0 — John Robert McPherson<br>"Spinning2" - Wheel of Brisbane (6586693905).jpg — CC BY 2.0 — Jorge Láscar from Australia<br>Brisbane Southbank Ferris Wheel-1and (3642392295).jpg — CC BY-SA 2.0 — Sheba_Also 43,000 photos | rekonstruoitu (kategoria, kelvollisia 49) |
| 347 | hero-chicago-aamu.png | chicago | kyllä (lista chicago; Category:Wrigley Building) | 20080615 Wrigley Building clock and Tribune Tower from Sixteen.jpg — CC BY-SA 2.0 — flickr user sindlinger<br>20170903 07 Michigan Ave. @ Wrigley Bldg. (48562022752).jpg — CC BY 2.0 — David Wilson from Oak Park, Illinois, USA<br>20070913 Rush Street Swing Bridge beyond Wrigley Building.JPG — Public domain — Unknown author Unknown author<br>20061205 Trump Int Hot & Tower from Columbus Dr. @ Chicago River.JPG — CC BY-SA 3.0 — User:TonyTheTiger | rekonstruoitu (kategoria, kelvollisia 42) |
| 348 | hero-chicago-keskipaiva.png | chicago | kyllä (lista chicago; Category:Marina City) | 2016 Chicago River IMG 5893.jpg — CC BY-SA 4.0 — SecretName101<br>19680412 24 Marina City (5575890336).jpg — CC BY 2.0 — David Wilson from Oak Park, Illinois, USA<br>20061205 Trump Int Hot & Tower from Columbus Dr. @ Chicago River.JPG — CC BY-SA 3.0 — User:TonyTheTiger<br>20080524 Daley - Casey Memorial Day Parade.jpg — Public domain — Photo by U.S. Army Public Affairs - Midwest / sol… | rekonstruoitu (kategoria, kelvollisia 40) |
| 349 | hero-chicago-ilta.png | chicago | kyllä (lista chicago; Category:Buckingham Fountain) | Buckingham Fountain (7071536267).jpg — CC BY 2.0 — Marlin Keesler from Streamwood, IL<br>Bikes at Buckingham Fountain.jpg — Public domain — Marmstrong21<br>Buckingham Fountain & close Chicago skyline, Aug 10.jpg — CC BY-SA 4.0 — An Errant Knight<br>Beautiful Buckingham Fountain (169404404).jpg — CC BY 2.0 — Richie Diesterheft from Santa Barbara, CA, USA | rekonstruoitu (kategoria, kelvollisia 43) |
| 350 | hero-perth-aamu.png | perth | kyllä (lista perth; Category:St Mary's Roman Catholic Cathedral, Perth) | St Mary's Roman Catholic Cathedral, Perth, 2023, 03.jpg — CC BY-SA 4.0 — Kgbo<br>St Mary's Roman Catholic Cathedral, Perth, January 2021 02.jpg — CC BY-SA 4.0 — Calistemon<br>St Mary's Roman Catholic Cathedral (South face).jpg — CC BY-SA 4.0 — Travis Saron<br>St Mary's Cathedral, Perth (aerial) 02.jpg — CC BY-SA 4.0 — Dan arndt | rekonstruoitu (kategoria, kelvollisia 43) |
| 351 | hero-perth-keskipaiva.png | perth | kyllä (lista perth; Category:Matagarup Bridge) | Matagarup Bridge, July 2018 02.jpg — CC0 — Samuel Wiki<br>Matagarup Bridge, April 2025.jpg — CC BY 4.0 — The editor next door<br>Matagarup Bridge, Perth, 2023, 03.jpg — CC BY-SA 4.0 — Kgbo<br>Matagarup Bridge at sunset, Western Australia, November 2023.jpg — CC BY-SA 4.0 — Chuq | rekonstruoitu (kategoria, kelvollisia 48) |
| 352 | hero-perth-ilta.png | perth | kyllä (lista perth; Category:Council House, Perth) | Council House Lights - Perth, Western Australia (4510840995).jpg — CC BY 2.0 — Michael_Spencer from Perth, WA, Australia<br>City of perth night gnangarra.jpg — CC BY 2.5 au — Gnangarra<br>AUS Perth, Central Business District, Council House 001.jpg — CC BY 4.0 — -wuppertaler<br>Burt Hall and Council house from east end of St Georges Cathedral looking south.jpg — CC BY 2.5 au — JarrahTree | rekonstruoitu (kategoria, kelvollisia 50) |
| 353 | hero-saopaulo-keskipaiva.png | saopaulo | kyllä (lista 22; Category:Edifício Copan) | Brises Copan.jpg — CC BY-SA 4.0 — Gabigeraldelli<br>Edifício Copan (3407143895).jpg — CC BY 2.0 — Rodrigo Soldon from Rio de Janeiro, Brazil<br>Copan sao paulo brasil.jpg — CC BY-SA 2.0 — Gabriel de Andrade Fernandes<br>Copan (7908313340).jpg — CC BY-SA 2.0 — Gabriel Fernandes from São Paulo, Brasil | rekonstruoitu (kategoria, kelvollisia 46) |
| 354 | hero-saopaulo-ilta.png | saopaulo | ei (22) | — | ei viitteitä (ajuri) |
| 355 | hero-toronto-aamu.png | toronto | kyllä (lista 22; Category:Exterior of the Royal Ontario Museum) | Exterior of the Royal Ontario Museum, March 2010.jpg — CC BY-SA 3.0 — Pemolo<br>Crystal Carriage (2372666402).jpg — CC BY-SA 2.0 — Benson Kua from Toronto, Canada<br>Motto-exterior-Royal-Ontario-Museum-June-2024.jpg — CC BY 4.0 — Acediscovery<br>Royal Ontario Museum, south facade, 1922.jpg — Public domain — James Salmon | rekonstruoitu (kategoria, kelvollisia 40) |
| 356 | hero-toronto-keskipaiva.png | toronto | kyllä (lista 22; Category:Toronto City Hall) | At Nathan Phillips Square on May 21, 2022 (4).jpg — CC BY-SA 4.0 — Maksim Sokolov (maxergon.com)<br>City Hall - Toronto, Ontario, Canada - October 16, 2023 04.jpg — CC BY-SA 4.0 — Giorgio Galeotti<br>City Hall (41647547975).jpg — CC0 — Daniel Lobo<br>Couple at City Hall Toronto (15084810785).jpg — CC BY 2.0 — Joseph Morris from Toronto, Canada | rekonstruoitu (kategoria, kelvollisia 48) |
| 357 | hero-lima-aamu.png | lima | kyllä (lista 22; Category:San Francisco de Asis (Lima)) | Basílica y Convento de San Francisco de Lima, Peru.jpg — CC BY-SA 4.0 — BrunoLocatelli<br>2017 Lima - Iglesia de San Francisco.jpg — CC BY-SA 4.0 — Felipe Restrpo Acosta<br>Basilica and Convent of San Francisco, Lima.jpg — CC BY-SA 4.0 — CEllen<br>Basílica y Convento de San Francisco de Lima 2019-10-06.jpg — CC BY-SA 4.0 — Alexey Komarov | rekonstruoitu (kategoria, kelvollisia 35) |
| 358 | hero-lima-keskipaiva.png | lima | kyllä (lista 22; Category:Huaca Huallamarca) | Huallamarca Archaeological site - adobe.jpg — CC BY-SA 3.0 — AgainErick<br>Huaca Huallamarca.jpg — CC BY-SA 4.0 — Reyniercm<br>Huaca Huallamarca in Lima, Peru.jpg — CC BY-SA 4.0 — BrunoLocatelli<br>Huaca Huallamarca, gran monumento.jpg — CC BY-SA 4.0 — Lucía Pérez2 | rekonstruoitu (kategoria, kelvollisia 46) |
| 359 | hero-lima-ilta.png | lima | ei (22) | — | ei viitteitä (ajuri) |
| 360 | hero-quito-aamu.png | quito | kyllä (lista 22; Category:Carondelet Palace, Quito) | Carondelet Palace, Flag of Ecuador, UNESCO World Cultural Heritage Site.jpg — CC BY-SA 4.0 — David Adam Kess<br>Carondelet - Quito.JPG — CC BY 3.0 — Taty2007<br>Bandera del Ecuador sobre el Palacio de Carondelet.jpg — CC BY-SA 4.0 — Martín Vasco<br>ALMUERZO CARONDELET (32044590504).jpg — CC BY-SA 2.0 — Agencia de Noticias ANDES | rekonstruoitu (kategoria, kelvollisia 46) |
| 361 | hero-quito-keskipaiva.png | quito | kyllä (lista 22; Category:Iglesia de Guápulo) | (Guápulo) Iglesia de Guápulo antique wooden exterior door, right side, complete.JPG — CC BY-SA 4.0 — David Adam Kess<br>Iglesia de Guápulo, fachada.jpg — CC BY-SA 4.0 — Ranoutofusername<br>Iglesia de Guápulo y puente.jpg — CC BY-SA 3.0 — EcuadorCiencia.org<br>Iglesia de Guápulo - panoramio.jpg — CC BY-SA 3.0 — Ciencia1.com | rekonstruoitu (kategoria, kelvollisia 25) |
| 362 | hero-losangeles-aamu.png | losangeles | kyllä (lista 23; Category:Union Station (Los Angeles)) | Abstract view of Los Angeles Union Station.jpg — CC BY-SA 4.0 — Phileven<br>Las Pasturas Building ( Union Station ) (16665166387).jpg — CC BY 2.0 — Prayitno / Thank you for (12 millions +) view fro…<br>El Monte Busway & Alameda- Union Station- Metro Silver Line.JPG — CC BY-SA 3.0 — METRO96<br>LA Metro A Line Union Station platform, October 2023.jpg — CC BY-SA 4.0 — OrdinaryScarlett | rekonstruoitu (kategoria, kelvollisia 47) |
| 363 | hero-losangeles-keskipaiva.png | losangeles | kyllä (lista 23; Category:Watts Towers) | Watts Towers in Los Angeles 03.jpg — CC BY-SA 4.0 — Levi Clancy<br>Watts Towers Arts Center.jpg — CC BY-SA 4.0 — Bjlee2020<br>Dettaglio delle Watts Towers a Los Angeles.jpg — CC BY-SA 4.0 — André Corboz<br>Watts Tower How.JPG — CC BY-SA 3.0 — Trackinfo | rekonstruoitu (kategoria, kelvollisia 28) |
| 364 | hero-losangeles-ilta.png | losangeles | kyllä (lista 23; Category:Getty Center) | Los Angeles from the Getty Center (5465683022).jpg — CC BY-SA 2.0 — KimonBerlin<br>Getty Center Los Angeles Basin California 2015-08-22.jpg — CC BY-SA 4.0 — LucynaPrz<br>Los Angeles - Getty Center - GRI - arch sunset.JPG — CC BY-SA 3.0 — Remi Mathis<br>View of Bel Air, Getty Center, Los Angeles, California (3125793528).jpg — CC BY-SA 2.0 — Ken Lund from Reno, Nevada, USA | rekonstruoitu (kategoria, kelvollisia 26) |
| 365 | hero-montevideo-aamu.png | montevideo | kyllä (lista 23; Category:Palacio Salvo) | 2016 contrapicado del Palacio Salvo en Montevido.jpg — CC BY-SA 4.0 — Felipe Restrepo Acosta<br>Columnas del Palacio Salvo.jpg — CC BY-SA 3.0 — Ximegenta16<br>Conferencia de Prensa Palacio Salvo - dsc3475.jpg — CC BY-SA 4.0 — Jorge Sánchez<br>Artigas y el Palacio Salvo..JPG — CC BY-SA 3.0 — Carlucha Pérez | rekonstruoitu (kategoria, kelvollisia 50) |
| 366 | hero-montevideo-keskipaiva.png | montevideo | kyllä (lista 23; Category:Estadio Centenario) | Entrevista a Diego Lugano en el Estadio Centenario (Montevideo, Uruguay).jpg — CC BY-SA 3.0 — AnselmiJuan<br>Estadio Centenario (6031696884).jpg — CC BY-SA 2.0 — Sandra Cohen-Rose and Colin Rose from Montreal, C…<br>Estadio Centenario (Montevideo) Tribuna Colombes.jpg — CC BY-SA 3.0 — Uwebart<br>Estadio Centenario inscription.JPG — CC0 — Ypsilon from Finland | rekonstruoitu (kategoria, kelvollisia 41) |
| 367 | hero-montevideo-ilta.png | montevideo | kyllä (lista 23; Category:Teatro Solís (Montevideo)) | Don Giovanni Alvaro Brechner Teatro Solis Opera.jpg — CC0 — Rob Shcultze<br>J34 637 Teatro Solis.jpg — CC BY-SA 3.0 de — Falk2<br>2016 fachada columnas Teatro Solís de Montevideo.jpg — CC BY-SA 4.0 — Felipe Restrepo Acosta<br>Montevideo Teatro Solis 1030762PSD.jpg — CC BY-SA 4.0 — Ermell | rekonstruoitu (kategoria, kelvollisia 48) |
| 368 | hero-havanna-aamu.png | havanna | kyllä (lista 23; Category:El Capitolio, La Habana) | Capitolio (Cuba, La Habana, 2017).jpg — CC BY-SA 4.0 — Jan Almeida B.<br>Capitolio, Havana, Cuba (42236033882).jpg — CC BY 2.0 — kuhnmi<br>Capitolio Havanna 184-06.jpg — CC BY-SA 4.0 — Mozzihh<br>Capitolio (3030095920).jpg — CC BY-SA 2.0 — Martin Abegglen from Bern, Switzerland | rekonstruoitu (kategoria, kelvollisia 42) |
| 369 | hero-havanna-keskipaiva.png | havanna | kyllä (lista 23; Category:Castillo de la Real Fuerza de La Habana) | Castillo de la Real Fuerza, Habana.jpg — CC BY 2.0 — Randolph Croft<br>Castillo de la Real Fuerza - Havana, Cuba.jpg — CC BY-SA 4.0 — Kate Perez<br>Castillo de la Real Fuerza rear view.jpg — CC0 — Jan Pešula<br>2012-Castillo de la Real Fuerza anagoria.JPG — CC BY 3.0 — Anagoria | rekonstruoitu (kategoria, kelvollisia 46) |
| 370 | hero-havanna-ilta.png | havanna | kyllä (lista 23; Category:University of Havana) | Entrada de la Universidad de La Habana 20160225.jpg — CC BY-SA 4.0 — Aniol<br>Entrada Universidad de la Habana.jpg — CC BY-SA 4.0 — Knomrm<br>Biblioteca Central de la Universidad de la Habana.jpg — CC BY-SA 4.0 — BTK-UH<br>Front view of Universidad de La Habana.jpg — CC BY-SA 3.0 — This photo was taken by Anton Zelenov . Please cr… | rekonstruoitu (kategoria, kelvollisia 41) |
| 371 | hero-mexico-aamu.png | mexico | kyllä (lista 23; Category:Templo Mayor - Main Pyramid) | Etapas - Templo Mayor - Ciudad de México - II.jpg — CC BY-SA 4.0 — Juan Carlos Fonseca Mata<br>Exterior of the Templo Mayor IMG 7052.JPG — CC BY-SA 3.0 — Deror_avi<br>El Templo Mayor en el año 2003 - 01.jpg — CC BY-SA 4.0 — Luis Alvaz<br>Aztec Great Temple (9780117184).jpg — CC0 — Gary Todd from Xinzheng, China | rekonstruoitu (kategoria, kelvollisia 45) |
| 372 | hero-mexico-keskipaiva.png | mexico | kyllä (lista 23; Category:Nueva Basílica de Nuestra Señora de Guadalupe) | Basilica of Our Lady of Guadalupe - Wiki Loves Pyramids tour 001.jpg — CC BY-SA 4.0 — Photograph by Mike Peel ( www.mikepeel.net ).<br>Nun talking to women on steps of new Basilica of Our Lady of Guadulupe.jpg — CC BY-SA 3.0 — Daniel Case<br>Bazilika de Guadalupe DSC 5562.jpg — CC BY-SA 4.0 — Karolja<br>Peregrinación llegando a la Basílica de Guadalupe.jpg — CC BY-SA 4.0 — ProtoplasmaKid | rekonstruoitu (kategoria, kelvollisia 9) |
| 373 | hero-mexico-ilta.png | mexico | ei (23) | — | ei viitteitä (ajuri) |
| 374 | hero-neworleans-aamu.png | neworleans | kyllä (lista 24; Category:St. Louis Cemetery 1) | Do you know what it means to miss New Orleans? - St Louis Cemetery 1.jpg — CC BY 2.0 — Ben Ledbetter, Architect<br>BasinStStation StLouisCem1Night.jpg — CC BY 2.0 — Infrogmation of New Orleans<br>Fifty Two, St. Louis Cemetery No. 1 (New Orleans, LA) (6039805945).jpg — CC BY 2.0 — takomabibelot<br>Bolt, St Louis I cemetery 127, New Orleans, Louisiana.jpg — CC BY-SA 2.0 — Cory Doctorow | rekonstruoitu (kategoria, kelvollisia 49) |
| 375 | hero-neworleans-keskipaiva.png | neworleans | kyllä (lista 24; Category:Caesars Superdome) | Caesars Superdome illuminated at night, April 2025.jpg — CC BY 2.0 — Paul Lowry<br>SUPERDOME - Poydras Street, New Orleans, 10 August 2021 - 01.jpg — CC BY-SA 4.0 — Infrogmation of New Orleans<br>Patti LaBelle at the 2026 Essence Festival of Music 03.jpg — CC BY-SA 4.0 — LaShawnda Jones<br>Poydras Street, New Orleans CBD, 24 August 2021 - 09.jpg — CC BY-SA 4.0 — Infrogmation of New Orleans | rekonstruoitu (kategoria, kelvollisia 17) |
| 376 | hero-neworleans-ilta.png | neworleans | ei (24) | — | ei viitteitä (ajuri) |
| 377 | hero-bogota-aamu.png | bogota | kyllä (lista 24; Category:Chorro de Quevedo) | Plaza del Chorro de Quevedo de Bogotá.JPG — CC BY-SA 3.0 — Javier Benítez<br>Plaza del Chorro de Quevedo 01.jpg — CC0 — Guaiquerí<br>Plaza Chorro de Quevedo.JPG — CC BY-SA 4.0 — Felipe Restrepo Acosta<br>Letreros de la plaza del chorro de Quevedo. Bogotá. Colombia..jpg — CC BY-SA 3.0 — Kamilokardona | rekonstruoitu (kategoria, kelvollisia 21) |
| 378 | hero-bogota-keskipaiva.png | bogota | kyllä (lista 24; Category:Museo del Oro, Bogotá) | MOS 01 ClarkManuelRodriguez (24843596547).jpg — CC BY-SA 2.0 — Actividad Cultural Banco de la República<br>Collar de cuentas de concha Conus.jpg — CC BY-SA 2.0 — Banrep cultural<br>BOG Museo del Oro.JPG — CC BY-SA 3.0 — Felipe Restrepo Acosta<br>BOG 04 2012 Museo de Oro 1278.JPG — CC BY-SA 3.0 — Mariordo (Mario Roberto Durán Ortiz) | rekonstruoitu (kategoria, kelvollisia 49) |
| 379 | hero-bogota-ilta.png | bogota | kyllä (lista 24; Category:Torre Colpatria) | Colpatria Tower Bogota.jpg — CC BY-SA 2.0 — Gustavo Andres Perdomo Morales from Bogota, Colom…<br>Colpatria Tower, Bogotá, Colombia.jpg — CC BY-SA 4.0 — CivArmy<br>Bogota Planet II (4213463098).jpg — CC BY-SA 2.0 — Tijs Zwinkels<br>Bogota Monserrate desde la Caracas.jpg — CC BY-SA 3.0 — Felipe Restrepo Acosta | rekonstruoitu (kategoria, kelvollisia 49) |
| 380 | hero-adelaide-aamu.png | adelaide | kyllä (lista 24; Category:Central Market, Adelaide) | FacadeJuly2018-14.jpg — CC BY-SA 4.0 — Adelcentralmarket<br>Adelaide Central Market building in Adelaide, June 2026 (DSCF7266).jpg — CC BY-SA 4.0 — Yu Chu Chin<br>Central Market, Adelaide on 25 April 2025 02.jpg — CC BY-SA 4.0 — Pangalau<br>Adelaide's Central Market.jpg — CC BY 2.0 — Danijel-James Wynyard | rekonstruoitu (kategoria, kelvollisia 50) |
| 381 | hero-adelaide-keskipaiva.png | adelaide | kyllä (lista 24; Category:St Peter's Cathedral, Adelaide) | St Peter's Cathedral, Adelaide SA.jpg — CC BY 2.0 — Belle Hammond<br>Adelaide Cathedral. SA.jpg — CC BY-SA 2.0 — Amanda Slater<br>OIC n adelaide lights vision towards st peters.jpg — CC BY 3.0 — User:Orderinchaos<br>King William Road, North Adelaide.jpg — CC BY-SA 2.0 — Jocelyn Kinghorn | rekonstruoitu (kategoria, kelvollisia 49) |
| 382 | hero-adelaide-ilta.png | adelaide | kyllä (lista 24; Category:Beehive Corner) | Beehive Corner at Rundle Mall, Adelaide (DSCF4268).jpg — CC BY-SA 4.0 — Yu Chu Chin<br>Beehive Corner on 25 April 2025.jpg — CC BY-SA 4.0 — Pangalau<br>Beehive corner Adelaide south Australia.jpg — Public domain — Andrew McMillan<br>Beehive Corner Adelaide 159.JPG — CC BY-SA 3.0 — Schwede66 | rekonstruoitu (kategoria, kelvollisia 12) |
| 383 | hero-hobart-aamu.png | hobart | kyllä (lista 25; Category:Theatre Royal, Hobart) | Theatre Royal Campbell Street Hobart Tasmania Australia.jpg — CC BY-SA 4.0 — TaswegianSchnapps<br>The Hedberg performing arts precinct in Hobart.jpg — CC BY-SA 4.0 — Canley<br>David Methuen in the play "Monday Next", Theatre Royal, Hobart, ca. 1950-1952 - photographer unknown (4291796039).jpg — Public domain — Unknown author Unknown author<br>Earlandgirlaust.jpg — Public domain — tuntematon | rekonstruoitu (kategoria, kelvollisia 7) |
| 384 | hero-hobart-keskipaiva.png | hobart | kyllä (lista 25; Category:Cascade Brewery) | Cascade Brewery, South Hobart.jpg — CC BY-SA 4.0 — Rakesh Vyas<br>Cascade Brewery 2015.jpg — CC BY-SA 4.0 — Michael fromholtz<br>Mount Wellington and Cascade Brewery in Hobart.jpg — CC BY-SA 4.0 — CHIELO<br>Former Cascade Brewery Depot Queenstown Tasmania.jpg — CC BY-SA 4.0 — Jimmyjrg | rekonstruoitu (kategoria, kelvollisia 12) |
| 385 | hero-hobart-ilta.png | hobart | kyllä (lista 25; Category:MONA) | MONA pavilions 20171120-073.jpg — CC0 — Gary Houston<br>Museum of Old and New Art (MONA) - Hobart - 49142246651.jpg — CC BY 2.0 — Jorge Láscar<br>Museum on the Derwent MONA 2023.jpg — CC BY-SA 2.0 — Michael Coghlan<br>Meeting New Zealander Vinnie Trim, Executive Chef at MONA.jpg — CC BY 4.0 — New Zealand Government, Office of the Governor-Ge… | rekonstruoitu (kategoria, kelvollisia 48) |
| 386 | hero-darwin-aamu.png | darwin | kyllä (lista 25; Category:Government House, Darwin) | Darwin (AU), Government House -- 2019 -- 4353.jpg — CC BY-SA 4.0 — Dietmar Rabich<br>Government House in Darwin.jpg — CC BY 2.0 — Stephen Michael Barnett<br>Government House, Darwin.jpg — CC BY 2.0 — kenhodge13<br>Government House in Darwin photographed in June 2011.jpg — CC BY 2.0 — Ken Hodge | rekonstruoitu (kategoria, kelvollisia 14) |
| 387 | hero-darwin-keskipaiva.png | darwin | kyllä (lista 25; Category:Fannie Bay Gaol (työlistassa Goal; siirretty 11.9.2026)) | Fannie Bay Gaol gallows.jpg — CC BY 2.0 — Ken Hodge<br>Fannie Bay Gaol 2.jpg — CC BY-SA 4.0 — D0a5l0e6<br>Fannie Bay Gaol P6200008.jpg — CC BY-SA 3.0 — Cuddy Wifter<br>Fannie bay nt.jpg — CC BY 3.0 — Bidgee | rekonstruoitu (kategoria, kelvollisia 8) |
| 388 | hero-darwin-ilta.png | darwin | kyllä (lista 25; Category:Christ Church Cathedral, Darwin) | Christ Church Cathedral, Darwin, 2023 (01).jpg — CC BY-SA 4.0 — Bahnfrend<br>Christ Church Cathedral, Darwin, Australia.jpg — CC BY-SA 4.0 — Bernard Gagnon<br>Christ Church Cathedral 2, Darwin.jpg — CC BY-SA 4.0 — Torbenbrinker<br>AU-Darwin-christ-church-cathedral-innen.jpg — CC BY-SA 4.0 — Balou46 | rekonstruoitu (kategoria, kelvollisia 15) |
| 389 | hero-portmoresby-aamu.png | portmoresby | kyllä (lista 25; Category:National Parliament of Papua New Guinea) | Indian Social Activist Dr Harikumar Pallathadka posing in front of the National Parliament House of PNG.JPG — CC BY-SA 3.0 — Bharathiya<br>Papua New Guinea 1991-039 Parliament House, Port Moresby (33351725760).jpg — CC BY-SA 2.0 — Brian ireland<br>PNG National Court after independence.jpg — CC BY-SA 3.0 — Masalai<br>NahauRooney.jpg — CC BY-SA 4.0 — Michelle Rooney | rekonstruoitu (kategoria, kelvollisia 6) |
| 390 | hero-portmoresby-keskipaiva.png | portmoresby | kyllä (lista 25; Category:Jacksons International Airport) | Port Moresby Airport looking west.jpg — CC BY-SA 3.0 — Masalai<br>Port Moresby Intl Airport 2008.jpg — CC BY-SA 3.0 — Jialiang Gao (peace-on-earth.org)<br>Gg-state-visit-papua-new-guinea-2009-events-acting-pm.jpg — CC BY 4.0 — New Zealand Government, Office of the Governor-Ge…<br>Secretary of Defense Lloyd Austin greets Joe Zadrozny (center), Chargé d’Affaires, a.i. U.S. Embassy Papua New Guinea and Elias Wohengu, Deputy Chief of Mission in Port Moresby, Papua New Guinea, July 27, 2023 - 230727-D-TT977-0017.jpg — CC BY 2.0 — U.S. Secretary of Defense | rekonstruoitu (kategoria, kelvollisia 5) |
| 391 | hero-portmoresby-ilta.png | portmoresby | ei (25) | — | ei viitteitä (ajuri) |
| 392 | hero-valparaiso-aamu.png | valparaiso | kyllä (lista 24; Category:Ascensor Concepción) | Ascensor Concepción, Valparaíso - ambos carros.JPG — CC BY-SA 3.0 — Nereidas<br>Cartel Ascensor Concepción.JPG — CC BY-SA 3.0 — PameMV<br>Ascensor Concepción, Cerro Concepción, Valparaíso 20201102 150.jpg — CC BY-SA 4.0 — Carlos Figueroa Rojas<br>Ascensor reina.jpg — CC BY-SA 4.0 — Lemurdeformee | rekonstruoitu (kategoria, kelvollisia 35) |
| 393 | hero-valparaiso-keskipaiva.png | valparaiso | kyllä (lista 24; Category:Palacio Baburizza) | Museo Bellas Artes de Valparaiso (3).jpg — CC BY-SA 4.0 — Beyts27<br>Mirador de Valparaiso .jpg — CC BY-SA 4.0 — Ric.arredondo<br>CL-valpa-palacio-baburizza.jpg — CC BY-SA 4.0 — Balou46<br>Detalle Palacio Baburizza 1.jpg — CC BY-SA 4.0 — Joaquin Abarca | rekonstruoitu (kategoria, kelvollisia 49) |
| 394 | hero-valparaiso-ilta.png | valparaiso | kyllä (lista 24; Category:La Sebastiana) | Casa Museo La Sebastiana - Pablo Neruda, Valparaiso.jpg — CC BY-SA 2.0 — Mikel Santamaria<br>La Sebastiana 20171108 fRF07.jpg — CC BY-SA 4.0 — Rodrigo Fernández<br>Casa Museo La Sebastiana 02.jpg — CC BY-SA 3.0 — Marcelo Ois Lagarde<br>La Sebastiana, casa de Neruda en Valparaíso.jpg — CC BY-SA 4.0 — Luciajimena1990 | rekonstruoitu (kategoria, kelvollisia 44) |
