# Viesti Fablelle: Espanjan hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 15.30 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-esp` (pohja origin/main 50d38f7c, v1954). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 30 nostoa (kaikki hyväksytyn listan 30 kohdetta), 68 Commons-kuvaa, yksikään kohde ei jäänyt pois.**
Uusi tiedosto `js/packs/hahmotelma-esp.js` (`HAHMOTELMA_ESP`, rakenne täsmälleen kuin
hahmotelma-fra.js: `kuva` + `kuvat`, `nimi`, `tyyppi`, `lahi: true`, `kysymykset`, `korostukset`,
`nappi`, `laudat`, `teksti`, `lahde`). Rekisteröinti kuten hahmotelma-fra.js: `js/fokuskohteet.js`
(import + `KOHDE_MAAT.ESP`), `sw.js` SHELL, `tools/build-standalone.mjs`.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | lähin pelikaupunki (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| picos-de-europa | Picos de Europa | vuori | 519 | 3 | AnaisGoepner, Javier Mendia García from leioa | CC BY-SA 4.0, CC BY 2.0 | madrid 117.5 |
| cabo-de-finisterre | Finisterren niemi | meri | 547 | 2 | Basotxerri, Luis Miguel Bugallo Sánchez | CC BY-SA 4.0, CC BY-SA 3.0 | madrid 210.1 |
| bardenas-reales | Bardenas Reales | vuori | 535 | 2 | Ant°AM, Diego Delso | CC BY-SA 4.0 | madrid 103.1 |
| tablas-de-daimiel | Tablas de Daimiel | jarvi | 480 | 2 | Xemenendura, Jl FilpoC | CC BY-SA 4.0 | madrid 49.2 |
| sierra-de-gredos | Sierra de Gredos | vuori | 500 | 2 | Frayle, Torobravo2011 | CC0, CC BY-SA 3.0 | madrid 46.0 |
| tabernas | Tabernasin autiomaa | vuori | 589 | 2 | Amjad Sheikh, Pablo | CC BY 3.0, CC BY 2.0 | granada 39.0 |
| sierra-de-cazorla | Sierra de Cazorla | vuori | 538 | 2 | Edmundo Sáez | CC BY-SA 4.0 | granada 36.5 |
| atapuerca | Atapuerca | historia | 503 | 2 | Malopez 21 | CC BY-SA 4.0 | madrid 78.3 |
| covadonga | Covadonga | historia | 565 | 2 | Zarateman, Luis de Madrazo | CC0, Public domain | madrid 124.5 |
| roncesvalles | Roncesvalles | historia | 588 | 2 | AlexKramer(ZGZ), Cherubino | CC BY-SA 4.0, CC BY-SA 3.0 es | barcelona 116.1 |
| numancia | Numancia | historia | 577 | 2 | Txo, Multitud | Public domain, CC BY 3.0 | madrid 70.0 |
| trujillo | Trujillo | historia | 542 | 3 | José Luis Filpo Cabana, Diego Delso | CC BY-SA 4.0 | sevilla 80.6 |
| el-escorial | El Escorial | historia | 579 | 3 | Zvonimir Stamenov, José Luis Filpo Cabana, Diego Delso | CC BY-SA 4.0, CC BY 3.0 | madrid 16.5 |
| yuste | Yusten luostari | historia | 544 | 3 | José Luis Filpo Cabana, Benjamín Núñez González, Alonso de Mendoza | CC BY-SA 4.0 | madrid 68.7 |
| las-navas | Las Navas de Tolosa | historia | 593 | 2 | Francisco de Paula Van Halen, Fondo Antiguo de la Biblioteca de la Universidad de Sevilla | Public domain, CC BY 2.0 | granada 45.2 |
| campo-de-criptana | Campo de Criptanan tuulimyllyt | kulttuuri | 617 | 2 | Edmundo Sáez, Marc Costa Carcereny | CC BY-SA 4.0 | madrid 44.1 |
| albufera | Albufera | ruoka | 554 | 2 | Diego Delso | CC BY-SA 4.0 | barcelona 112.3 |
| la-tomatina | La Tomatina, Buñol | ruoka | 655 | 2 | flydime | CC BY-SA 2.0 | madrid 104.7 |
| rioja-haro | Rioja ja Haro | ruoka | 610 | 2 | Zarateman, LBM1948 | CC0, CC BY-SA 4.0 | madrid 91.4 |
| jabugo | Jabugo | ruoka | 577 | 2 | Txo, DarkEngel1 | CC BY-SA 4.0 | sevilla 32.0 |
| ronda | Ronda | kulttuuri | 542 | 2 | Christopher Down, Andreas Tille | CC BY 4.0, CC BY-SA 3.0 | sevilla 37.2 |
| riotinto | Riotinton kaivokset | tekniikka | 659 | 3 | FJavier GómezL, tuntematon, Benjamín Núñez González | CC BY-SA 4.0, Public domain | sevilla 23.8 |
| almaden | Almadénin elohopeakaivos | kauppa | 617 | 2 | Raimundo Pastor | CC BY-SA 3.0 | sevilla 66.0 |
| vizcayan-silta | Vizcayan silta | tekniikka | 582 | 2 | José Ligero Loarte, Roberto Chamoso G | CC BY-SA 4.0, CC BY-SA 3.0 es | madrid 119.0 |
| alcantaran-silta | Alcántaran silta | tekniikka | 570 | 2 | Amfeli, Jean Laurent | CC BY 4.0, Public domain | sevilla 95.5 |
| canal-de-castilla | Kastilian kanava | tekniikka | 532 | 2 | Jl FilpoC, Adolfobrigido | CC BY 4.0, CC BY-SA 4.0 | madrid 61.9 |
| gernikako-arbola | Guernican tammi | historia | 671 | 3 | Graeme Churchard, Timtregenza, Pere prlpz | CC BY 2.0, CC BY-SA 3.0 | madrid 121.3 |
| tordesillas | Tordesillas | historia | 588 | 3 | Txo, Jl FilpoC, José Luis Filpo Cabana | Public domain, CC BY-SA 4.0, CC BY 4.0 | madrid 61.2 |
| aranjuez | Aranjuez | historia | 659 | 3 | Javier Perez Montes, Barcex, Jl FilpoC | CC BY-SA 4.0, CC BY-SA 3.0 | madrid 15.0 |
| poblet | Pobletin luostari | historia | 603 | 2 | Malopez 21, José Luis Filpo Cabana | CC BY-SA 4.0, CC BY 3.0 | barcelona 22.4 |

Kuvia yhteensä 68; lisenssijakauma: CC BY-SA 4.0 35, CC BY-SA 3.0 8, Public domain 6, CC BY 2.0 4, CC BY 3.0 4, CC BY 4.0 4, CC0 3, CC BY-SA 3.0 es 2, CC BY-SA 2.0 2.

## Koneellinen tarkistus (vaihe 3)

Skripti ajettu samasta pakasta, jonka peli lataa (Node 22).

| Mittari | Tulos |
| --- | --- |
| Nostoja | 30 |
| Teksti ≥ 200 merkkiä | 30/30 (480–671 merkkiä, 4–6 virkettä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 30/30 |
| 2 kysymystä pululle | 30/30 |
| ≥ 2 kuvaa | 30/30 (8 kohteella 3 kuvaa) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 68/68 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 68/68; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain), yksikään ei ole NC/ND/GFDL/FAL |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 68/68 |
| Kuvien leveys | 67 kpl ≥ 1200 px (1350–1920); Riotinton vanha asemakuva 908 px (alkuperäinen on vain sen kokoinen) |
| Korostukset löytyvät tekstistä | 30/30 |
| Fokuslehden rajaus (`osuuLehteen('ESP')`) | 30/30 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 30/30 pääkartalla, `kaupunginKohdalla` = null kaikilla |
| Etäisyys pelikaupunkiin | pienin Aranjuez 15,0 ja El Escorial 16,5 (Madrid), raja 7 |
| Päällekkäisyys 41 nykyisen ESP-noston kanssa | ei samoja id:itä eikä nimiä; lähin nykyinen nosto on El Escorial – Segovian akvedukti 14,1 lautayksikköä |
| Piste Espanjan maalla (pelin maailmankartan ESP-renkaat, pistemäinen sisällä-testi) | 29/30; Finisterre ks. alla |
| `node --test tests/*.test.mjs` | # tests 3663, # pass 3650, # fail 0, # skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

(Ensimmäisellä ajolla yksi testi, "haku on nopea myös koko aineistolla" (tests/pollo.test.mjs),
kaatui aikarajaan, kun viisi kuva-agenttia ajoi samaan aikaan koneella; kahdella uusinnalla, myös
yksin ajettuna, 124/124 ja koko sarja 0 fail.)

## Poikkeamat ja päätettävää

1. **Finisterre, piste maalla?** Wikipedian koordinaatti (42,8825 N / −9,2722 E) on majakan kohdalla
   niemen kärjessä eli oikeasti maalla. Pelin yksinkertaistettu maailmankartan ESP-rengas jättää sen
   kuitenkin 3,9 lautayksikköä merelle, koska rengas ei tarkenna Galician rannikkoa niin tarkasti.
   Pistettä ei ole siirretty (siirto oikealle "maalle" renkaan mukaan olisi noin 13 km sisämaahan,
   eli ei enää niemen kärki). Jos ankkurilogiikka lukee rengasta, Finisterre kannattaa mitata pallolla.
   Muut rannikon kohteet (Albufera 2,2, Vizcayan silta 2,3, Guernica 3,0) ovat renkaan sisällä.
2. **Numancia**: Alejo Veran maalaus (PD, 1881) esittää itsemurhan jälkeisiä ruumiita ja verta,
   joukossa lapsi — vaihdettu 13+ peliin sopimattomana jälleenrakennettuihin vartiotorneihin
   (Multitud, CC BY 3.0). Maalaus on varalla kansiossa `_varalla/` ja JSON:n `varakuva`-kentässä.
3. **Las Navas de Tolosa**: koordinaatti on es-Wikipedian (38,343 N / −3,549 E), ei Fablen
   arviota 38,28 / −3,58; pisteen sisällä on Santa Elenan lähistö. Lähderiveillä mainittu.
4. **Pisteet lähekkäin**: Picos de Europa – Covadonga 9 yks., Vizcayan silta – Guernica 11 yks. (Fable
   hyväksyi). Tordesillas ja Riotinto käyttävät kaupungin / Corta Atalayan pistettä, koska artikkelilla
   ei ole omaa koordinaattia.
5. **Heikoin kuva**: Jabugon dehesa-kuva (siat pieniä, aidan rautalanka kuvan alareunassa) on ainoa
   löytynyt kuva, jonka Commonsin kuvaus vahvistaa Huelvan dehesaksi. Cabo de Finisterren toinen kuva
   (lyhtytorni) on tiukka yksityiskohta. Vaihto on yhden rivin muutos.
6. **1873-näkökulma**: `nappi`-alaotsikot on kirjoitettu vuoden 1873 katseella (mm. Riotinto: kaivos
   vaihtaa omistajaa brittiyhtiölle 1873, Guernican tammi kolmannen karlistisodan symbolina, Alcántaran
   silta korjattu 1860); Vizcayan silta (1893) ja La Tomatina (1945) "tänne nousee myöhemmin…".
7. **Tekstit** ovat omin sanoin en-Wikipedian johdannoista ja artikkelien osioista (Las Navasilla myös
   es-Wikipedia); Jabugon tekstiin on käytetty myös "Jamón ibérico" -artikkelin tuotanto-osioita
   (kirjattu lähderiville). Yhtään faktaa ei ole otettu muualta; esim. Rioja-tekstin bodegojen
   perustamisvuodet ja "ensimmäinen sähkökatuvalaistu kaupunki" ovat Haron artikkelista.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 68 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/esp/` (62,1 Mt) osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Espanjan nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA); nostot ovat elävinä
  ankkurilla kuten muidenkin maiden. Havainnekuvat (PAATOKSET 44 kohta 4) odottavat.
- Peliä ei avattu selaimessa (ei ajettu näyttötarkistusta); piirto todettu samalla reitillä kuin
  hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Pakan sisällön silmäpistokoe: 3 kuvaa katsottu itse (Numancian kaksi, Jabugo; sha-tarkistus koneellisesti kaikille);
  loput 65 kuvaa katsoi viisi Sonnet-kuva-agenttia (kukin omat kuutensa kohdetta), jotka raportoivat
  jokaisen katsotuksi ja listasivat hylätyt ehdokkaat syineen.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/esp/`: 68 kpl `esp-nosto-<id>-<sha8>.jpg`, alikansiot
`_json/` (kuvatiedot kohteittain) ja `_varalla/` (Veran maalaus).
