# Viesti Fablelle: Bulgarian hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 20.33 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-bgr` (pohja origin/main ec319360, v1962). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 25 nostoa (Fablen hyväksymä lista sellaisenaan, ei korvauksia), 60 Commons-kuvaa, 10 rahavisaa.**
Uusi tiedosto `js/packs/hahmotelma-bgr.js` (`HAHMOTELMA_BGR`, rakenne täsmälleen kuin hahmotelma-fra.js ja muut EU-pakat).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.BGR`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-nld-rivien jälkeen.
Bulgariassa on jo 26 nykyistä nostoa; uudet lisätään niiden jatkoksi, eikä mikään toista niitä.
**Haara on tehty origin/mainin (v1962) päälle**: BGR-rekisteröintirivit ovat samoissa kohdissa (fokuskohteet.js, sw.js, build-standalone.mjs) kuin IRL:n ja HRV:n, joten yhdessä julkaistaessa voi tulla pieni mergekonflikti, joka ratkeaa pitämällä kaikki rivit.

## Etäisyys BGR-renkaaseen

**Kaksi rannikkokohdetta on karkean renkaan ULKOPUOLELLA** (rengas on yksinkertaistettu; koordinaatit ovat Wikipedian todelliset): Sozopol 2,1 ja Kaliakra 1,4 lautayksikköä. Muut 23 ovat sisällä ja kaikki 25 osuvat Bulgarian fokuslehteen (`osuuLehteen('BGR')`). Reunalla sisäpuolella Vidin 0,2, Balchik 0,9, Nikopol 1,2, Ruse 1,5, Trigrad 2,5, Strandzha 2,9, Svishtov 3,0.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys BGR-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| bansko | Bansko | vuori | 612 | 3 | Explorer1940, Christian Koehn (fragwürdig), Colin W | CC BY-SA 4.0, CC BY-SA 3.0 | 16.5 |
| pobiti-kamani | Pobiti kamani | vuori | 584 | 2 | www.vacacionesbulgaria.com, Ivaylo80 | CC BY-SA 4.0 | 6.8 |
| kaliakra | Kaliakra | meri | 662 | 2 | Diego Delso, Dan Kollmann | CC BY-SA 4.0 | 1.4 (ulkopuolella) |
| vratsa-ledenika | Ledenikan luola | vuori | 555 | 2 | Martin Marinov, Gligan | CC BY-SA 3.0, CC BY-SA 4.0 | 17.6 |
| trigrad | Trigradin rotko | vuori | 637 | 2 | Borislav krustev, Vislupus | CC BY-SA 4.0 | 2.5 |
| strandzha | Strandzha | vuori | 712 | 2 | Julian Nyča, TodorBozhinov | CC BY-SA 4.0 | 2.9 |
| smolyan | Smolyan | vuori | 726 | 2 | Vislupus, Krisko26 | CC BY-SA 4.0 | 5.4 |
| berkovitsa | Berkovitsa | vuori | 674 | 2 | Пакко | CC BY-SA 3.0 | 5.3 |
| sozopol | Sozopol | meri | 767 | 2 | Daniel Albrecht, MrPanyGoff | CC BY 2.0, CC BY-SA 3.0 | 2.1 (ulkopuolella) |
| koprivshtitsa | Koprivshtitsa | historia | 756 | 2 | Esther Westerveld, TwoWings | CC BY 2.0, Public domain | 42.9 |
| shipka | Shipkan sola | historia | 633 | 3 | Dennis G. Jarvis, Klearchos Kapoutsis, Иван Иванов | CC BY-SA 2.0, CC BY 2.0, CC BY-SA 3.0 | 37.3 |
| perperikon | Perperikon | historia | 756 | 2 | Kritzolina, Anton Lefterov | CC BY-SA 4.0 | 17.3 |
| bachkovo | Bachkovon luostari | historia | 735 | 3 | Ymblanter, Michael Desnoyelles, Kritzolina | CC BY-SA 4.0 | 19.5 |
| lovech | Lovech | historia | 802 | 3 | Klearchos Kapoutsis, Камен Ханджиев, Svilen Enev | CC BY 2.0, CC BY-SA 4.0, CC BY-SA 3.0 | 24.7 |
| pleven | Pleven | historia | 781 | 3 | Vassia Atanassova - Spiritia, Todor Bozhinov, Спасимир | Public domain, CC BY-SA 3.0 | 14.1 |
| nikopol | Nikopol | historia | 836 | 2 | tekijä tuntematon (julkaisija PD-self), Felix Philipp Kanitz | Public domain | 1.2 |
| vidin | Baba Vida | historia | 814 | 2 | Erik Cleves Kristensen, Elena Chochkova | CC BY 2.0, CC BY-SA 3.0 | 0.2 |
| stara-zagora | Stara Zagora | historia | 684 | 3 | Rjdeadly, LZ1ALT, Balkanregion | CC BY-SA 4.0, CC BY-SA 3.0 | 31.6 |
| kyustendil | Kyustendil | historia | 762 | 3 | Vassia Atanassova - Spiritia, MrPanyGoff, Спасимир | CC BY-SA 3.0 | 6 |
| ruse | Ruse | merenkulku | 737 | 3 | Diego Delso, Tiia Monto, Felix Philipp Kanitz | CC BY-SA 4.0, Public domain | 1.5 |
| svishtov | Svishtov | merenkulku | 802 | 2 | Erminy (piirros), Adolph Kunike (litografia), Powerfox | Public domain, CC BY-SA 4.0 | 3 |
| melnik | Melnik | ruoka | 769 | 3 | Vislupus, StefkaVasileva | CC BY-SA 4.0 | 4.7 |
| karlovo | Karlovo | kulttuuri | 757 | 2 | TodorBelomorski, MrPanyGoff | CC BY-SA 4.0, CC BY-SA 3.0 | 44 |
| sliven | Sliven | kauppa | 780 | 2 | Felix Philipp Kanitz, Evgeni Dinev | Public domain, CC BY-SA 3.0 | 29.8 |
| balchik | Balchik | kulttuuri | 820 | 3 | Boby Dimitrov from Sofia, Bulgaria, Izvora, Спасимир (Spasimir Pilev) | CC BY-SA 2.0, Public domain, CC BY-SA 4.0 | 0.9 |

Kuvia yhteensä 60; lisenssijakauma: CC BY-SA 4.0 28, CC BY-SA 3.0 17, Public domain 8, CC BY 2.0 5, CC BY-SA 2.0 2.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD:ssä ja fokusvirta-*.js:ssä)

Neljä vaihtoehtoa, oikea-indeksit 2,0,1,1,3,0,1,0,3,2 (tasainen), vastaus noston omasta tekstistä; `fakta` on saman artikkelin muu tieto. Tyypit: meri ×1, vuori ×2, historia ×4, merenkulku ×1, ruoka ×1, kauppa ×1.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| kaliakra | meri | Mitä nimi Kaliakra tarkoittaa perinteisen käännöksen mukaan? | Kaunis niemi (2) |
| trigrad | vuori | Mihin luolaan Trigradska-joki syöksyy Trigradin rotkossa? | Paholaisen kurkkuun (0) |
| strandzha | vuori | Mitä perinnettä Strandzhassa harjoitetaan paljain jaloin hehkuvilla hiilillä? | Nestinarstvo (1) |
| bachkovo | historia | Kuka perusti Bachkovon luostarin vuonna 1083? | Georgialainen valtiomies (1) |
| lovech | historia | Kuka rakensi Lovechin kuuluisan katetun sillan Osam-joen yli vuosina 1872–1874? | Kolyu Ficheto (3) |
| vidin | historia | Minkä kuninkaantyttären legendan mukaan rakennutti Baba Vidan linnoituksen? | Vidan (0) |
| stara-zagora | historia | Millä turkkilaisella nimellä Stara Zagoraa kutsuttiin ennen nykyisen nimen vahvistamista vuonna 1871? | Eski Zagra (1) |
| ruse | merenkulku | Minä vuonna Rusen ja Varnan yhdistävä ensimmäinen rautatie otettiin käyttöön? | 1867 (0) |
| melnik | ruoka | Mikä on Bulgarian pienin kaupunki? | Melnik (3) |
| sliven | kauppa | Minä vuonna Dobri Zhelyazkov perusti Slivenin ensimmäisen tehtaan Bulgarian maissa? | 1834 (2) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 25 |
| Teksti ≥ 200 merkkiä | 25/25 (555–836 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 25/25 |
| 2 kysymystä pululle | 25/25 |
| ≥ 2 kuvaa | 25/25 (kolme kuvaa kymmenellä: Bansko, Shipka, Bachkovo, Lovech, Pleven, Stara Zagora, Kyustendil, Ruse, Melnik ja Balchik; muilla kaksi) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 60/60 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 60/60; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 60/60 |
| Korostukset löytyvät tekstistä | 25/25 |
| Fokuslehden rajaus (`osuuLehteen('BGR')`) | 25/25 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 25/25 pääkartalla, `kaupunginKohdalla` = null kaikilla (pelikaupunki Sofia; lähin Ledenika 21,7 merkistä; Sofian merkki 0,5 yksikköä todellisesta paikasta) |
| Nostojen etäisyys nykyisiin 27 BGR-nostoon (lautayks.) | pienin **Shipka – Ruusulaakso 6,6 (alle 7:n; Fable hyväksyi)**; Pobiti kamani – Varna 7,0, Bachkovo – Plovdiv 8,9, Sozopol – Nesebar 9,8, Lovech – Balkanvuoret 10,6, Bansko – Rila 10,7, Stara Zagora – Ruusulaakso 11,0; muut ≥ 11,1. Nostot keskenään ≥ 10,4 |
| Päällekkäisyys nykyisten BGR-nostojen kanssa | ei samoja id:itä eikä nimiä |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja, ei selvästi pisin oikea (≤ 2,0 × lyhin, oikea ei pisin) | 10/10 |
| `node --test tests/*.test.mjs` | # tests 3698, # pass 3685, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`: ei nimiö–nimiö-limityksiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, tyyppi/teksti vaihdettu ja kirjattu)

1. **Ruse–Varna-rautatie 1867, ei 1866** (listassa virheellisesti 1866; en-artikkeli sanoo 1867). Nappi ja visa käyttävät 1867. Muut tyypit ovat listan mukaiset.
2. **Lähdesäännön poisjätöt**: Koprivshtitsan 1876 kansannousu mainitaan vain yhdellä lauseella (ensimmäinen laukaus, silta, muistomerkit); artikkelin luettelossa on kansannousun ossuaari, jonka kuvaa ei käytetä. Melnik-nosto tyyppi `ruoka` (artikkeli: tupakka ja viini, vienti Englantiin ja Itävaltaan). Slivenin tyyppi `kauppa` (1834 ensimmäinen tehdas, 1843 ensimmäinen tekstiiliyritys). Berkovitsan nappi käyttää artikkelin Levski-mainintaa (elokuu 1872), ja Karlovon nappi mainitsee Levskin teloituksen Sofiassa helmikuussa 1873 vain tosiasiana (ei kuvaa).
3. **Herkät aiheet**: **Shipka ja Pleven** muistopaikkoina: teksti kertoo sotaan liittyvät tosiasiat (Shipkan taistelut 1877–78, Plevnan piiritys ja Osman Pashan antautuminen 28.11.1877) ilman taistelukuvauksia; kuvina vain Shipkan muistomerkki (kolme kuvaa: portaat, lähikuva leijonasta, sola) ja Plevenin panoraamarakennus, kaupungintalo ja puistopolku. Skobelevin puiston tykki- ja muistolaattakuvat hylätty. Batakia ei mukana. Stara Zagoran teksti ei mainitse vuoden 1877 verilöylyä (artikkelin muuten).
4. **Kuvat**: ei tunnistettavia yksityishenkilöitä (agenttien ohje ja silmäys; Plevenin kaupungintalokuvassa pieni etäinen ihmisjoukko; Lovech-Varosha-kuvassa kukkulalla Levskin patsas). **Nikopolin pääkuva** on PD-self (Commonsin tekijäkenttä tyhjä; tekijä tuntematon) ja toinen on Kanitzin maalaus (PD); **Svishtovin pääkuva** on 1824 litografia (PD, Adolph Kunike). **Slivenin pääkuva** on Kanitzin akvarelli (vain 1024 px), toinen 1491 px. Balchikin pääkuva 1600 px. Kanitzin maalausten selitteet perustuvat vain siihen, mitä kuvassa näkyy. **Stara Zagoran neoliittisista asuinrakennuksista** ei löytynyt käyttökelpoista kuvaa (museon ovi, kehystetty mosaiikki puolialastomalla hahmolla hylätty); kuvina antiikin katu ja forum sekä kaupunkinäkymä. **Kyustendil**: roomalaisten kylpylöiden kuvat Commonsissa ovat vaatimattomia; kolmas kuva paras. Melnikin kaupunkinäkymän Commons-kuvaus on vain yleinen; selite kuvaa vain näkyvän. Kuvista suurin osa on 1920 px leveitä (Commonsin vakiokoko).
5. **1873-näkökulma**: Koprivshtitsa (kansannousu vasta 1876), Shipka (1877–78), Pleven (piiritys 1877), Nikopol (valtaus 1877): "vasta muutaman vuoden kuluttua"; Lovech (Kolyu Ficheton silta rakenteilla 1872–74), Stara Zagora (nimi vahvistettu 1871), Sliven (eksarkaatti 1870, tehtaat), Berkovitsa (Levski 1872), Ledenika (löytyy 1900-luvun alussa), Kaliakra (majakka 1866), Karlovo (Levski teloitettu helmikuussa 1873).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 60 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/bgr/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Bulgarian nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Renkaan ulkopuoliset rannikkokohteet jäävät ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/bgr/`: 60 kpl `bgr-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
