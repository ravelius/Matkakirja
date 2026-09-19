# Viesti Fablelle: Saksan hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 16.45 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-deu` (pohja origin/main 88f43233, v1956). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 29 nostoa (Fablen päätösten mukainen lista, Peenemünde korvattu Rammelsbergillä), 76 Commons-kuvaa. Yksikään kohde ei jäänyt pois, korvauksia ei tarvittu (Bad Ems ja Ansbach saivat molemmat kolme kuvaa).**
Uusi tiedosto `js/packs/hahmotelma-deu.js` (`HAHMOTELMA_DEU`, rakenne täsmälleen kuin
hahmotelma-fra.js, hahmotelma-esp.js ja hahmotelma-ita.js). Rekisteröinti: `js/fokuskohteet.js`
(import + `KOHDE_MAAT.DEU`), `sw.js` SHELL, `tools/build-standalone.mjs`. HUOM: haara on v1956:n
päällä; hahmotelma-ita-rivit (v1957) puuttuvat, joten rekisteröintirivit tulevat hahmotelma-fra-rivien
jälkeen samoihin kohtiin kuin ITA:n — merge tuottaa triviaalin konfliktin, ja molemmat rivit jäävät.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | lähin pelikaupunki (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| saechsische-schweiz | Saksilainen Sveitsi | vuori | 557 | 3 | Andraszy, Johan Christian Dahl, S.Rose Fotografie | CC BY-SA 4.0, Public domain, CC BY 4.0 | berliini 76.1 |
| ruegen | Rügenin liitukalliot | saari | 549 | 2 | NilsMargott, Caspar David Friedrich | CC BY-SA 4.0, Public domain | berliini 93.3 |
| sylt | Sylt | saari | 551 | 2 | Nordenfan, Alice Wiegand | CC BY-SA 4.0 | berliini 199.7 |
| helgoland | Helgoland | saari | 604 | 2 | Jörg Braukmann, Dionysos1970 | CC BY-SA 4.0 | berliini 197.7 |
| lueneburger-heide | Lüneburgin nummi | kulttuuri | 675 | 2 | Lotte76, Oxfordian Kissuth | CC BY-SA 4.0, CC BY-SA 3.0 | berliini 118.0 |
| spreewald | Spreewald | jarvi | 568 | 2 | TricksterWildcat, Stefan Fussan | CC BY-SA 4.0, CC BY-SA 3.0 | berliini 33.1 |
| chiemsee | Chiemsee | jarvi | 586 | 3 | SimonWaldherr, Carsten Steger, Woidbua | CC BY-SA 4.0 | berliini 204.8 |
| hermannsdenkmal | Hermannsdenkmal | historia | 623 | 3 | Clemensfranz, Daniel Schwen, Carsten Steger | CC BY-SA 4.0, Public domain | berliini 153.7 |
| externsteine | Externsteine | historia | 672 | 2 | Jörg Braukmann | CC BY-SA 4.0 | berliini 151.5 |
| saalburg | Saalburg | historia | 541 | 2 | Carole Raddato | CC BY-SA 2.0 | berliini 189.0 |
| hohenzollern | Hohenzollernin linna | historia | 649 | 2 | A. Kniesel, Hans J. Mast | CC BY-SA 3.0, CC BY-SA 4.0 | berliini 235.5 |
| quedlinburg | Quedlinburg | historia | 656 | 2 | Barnos, Kora27 | CC BY-SA 4.0 | berliini 81.3 |
| maulbronn | Maulbronnin luostari | historia | 665 | 3 | Elke Wetzig (Elya), Dguendel, Carsten Steger | CC BY-SA 3.0, CC BY 4.0, CC BY-SA 4.0 | berliini 217.2 |
| rothenburg | Rothenburg ob der Tauber | kulttuuri | 604 | 3 | Berthold Werner, Rainer Lippert | Public domain, CC0 | berliini 174.7 |
| bayreuth | Bayreuthin Festspielhaus | kulttuuri | 661 | 2 | Tuntematon, El Grafo | Public domain, CC BY-SA 4.0 | berliini 128.4 |
| ruedesheim | Rüdesheim ja Rheingau | ruoka | 619 | 3 | Partonez, AK-Bino, Rhetos | CC BY-SA 4.0, CC0 | berliini 213.6 |
| bernkastel | Bernkastel ja Mosel | ruoka | 612 | 3 | Dguendel, Dkvtig, Elisabeth Schittenhelm | CC BY 3.0, CC BY-SA 4.0 | berliini 239.8 |
| triberg | Triberg | kulttuuri | 542 | 2 | Uoaei1, Stefan Gerl | CC BY-SA 4.0, CC0 | berliini 257.7 |
| hameln | Hameln | kulttuuri | 625 | 3 | Helmlechner, tekijä tuntematon, Max Sonnen | CC0, Public domain | berliini 135.0 |
| oberammergau | Oberammergau | kulttuuri | 603 | 3 | Andreas Praefcke, 0n3 70uch | CC BY-SA 3.0, CC BY 3.0 | berliini 228.4 |
| voelklingen | Völklingenin rautatehdas | tekniikka | 619 | 3 | Carsten Steger, Zairon, TeKaBe | CC BY-SA 4.0, CC BY-SA 3.0 | berliini 261.2 |
| freiberg | Freibergin hopeakaivokset | kauppa | 562 | 3 | Jörg Blobelt, Brück & Sohn Kunstverlag Meißen, Unukorno | CC BY-SA 4.0, CC0, CC BY-SA 3.0 | berliini 72.0 |
| meissen | Meissenin posliini | kauppa | 582 | 3 | Matti Blume, Goldi64, Radler59 | CC BY 4.0, CC BY-SA 3.0 | berliini 60.9 |
| jena | Jena ja Zeiss | tekniikka | 651 | 3 | Bernard Ladenthin, Chad Anderson, staff photographer for SFO Museum, Thuringius | CC BY 4.0, CC BY-SA 2.0, CC0 | berliini 93.0 |
| muengsten | Müngstenin silta | tekniikka | 599 | 3 | InterCityImpress, Max Wipperling, Elberfeld, Frank Vincentz | CC BY-SA 2.0, Public domain, CC BY-SA 3.0 | berliini 216.9 |
| hambach | Hambachin linna | historia | 562 | 3 | Fischer.H, tekijä tuntematon, Aristides2 | CC BY-SA 4.0, Public domain | berliini 225.0 |
| bad-ems | Bad Ems | historia | 572 | 3 | Dguendel, Holger Weinandt, Franzfoto | CC BY 3.0, CC BY-SA 3.0 de, CC BY-SA 3.0 | berliini 212.3 |
| rammelsberg | Rammelsbergin kaivos | kauppa | 572 | 3 | Aagnverglaser, Ymblanter, Ellafranziska | CC BY-SA 4.0 | berliini 102.7 |
| ansbach | Ansbach | historia | 578 | 3 | 19Wilhelm18, Tilman2007, Carsten Steger | CC BY-SA 4.0 | berliini 170.0 |

Kuvia yhteensä 76; lisenssijakauma: CC BY-SA 4.0 36, CC BY-SA 3.0 11, Public domain 10, CC0 6, CC BY 4.0 4, CC BY-SA 2.0 4, CC BY 3.0 4, CC BY-SA 3.0 de 1.

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 29 |
| Teksti ≥ 200 merkkiä | 29/29 (541–675 merkkiä, 4–5 virkettä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 29/29 |
| 2 kysymystä pululle | 29/29 |
| ≥ 2 kuvaa | 29/29 (18 kohteella 3 kuvaa) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 76/76 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 76/76; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain), yksikään ei ole NC/ND/GFDL/FAL |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 76/76 |
| Korostukset löytyvät tekstistä | 29/29 |
| Fokuslehden rajaus (`osuuLehteen('DEU')`) | 29/29 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 29/29 pääkartalla, `kaupunginKohdalla` = null kaikilla |
| Etäisyys pelikaupunkiin (Berliini) | pienin Spreewald 33,1; raja 7 |
| Päällekkäisyys 39 nykyisen DEU-noston kanssa | ei samoja id:itä eikä nimiä; lähimmät nykyiset: Rammelsberg – Brocken 7,7, Oberammergau – Zugspitze 7,9, Bad Ems – Rein 8,7, Rüdesheim – Rein 9,6, Meissen – Dresden 9,8 lautayksikköä (Fable hyväksyi) |
| Piste Saksan maalla (pelin maailmankartan DEU-renkaat) | 26/29; renkaan ulkopuolella (etäisyys renkaasta lautayksikköä): ruegen 19.3, sylt 10.8, helgoland 22.3 |
| `node --test tests/*.test.mjs` | # tests 3663, # pass 3650, # fail 0, # skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää

1. **Saaret DEU-renkaan ulkopuolella** (Fablen pyynnöstä etäisyydet): Rügen (Königsstuhl) 19,3, Sylt 10,8
   ja Helgoland 22,3 lautayksikköä; pisteet ovat oikeasti saarilla, mutta pelin karkea rengas ei sisällä
   pieniä saaria (ankkurilukitus hoitaa). Muut rannikko- ja raja-arvot ovat renkaan sisäpuolella:
   Saksilainen Sveitsi 2,9, Völklingen 3,5, Chiemsee 8,1, Oberammergau 6,8.
2. **Fablen päätökset toteutettu**: Peenemünde pois ja Rammelsberg (Goslar) tilalle (kauppa; koordinaatti en-Wikipedian
   Rammelsberg-artikkelista); Ansbach ja Bad Ems pysyivät, molemmille löytyi kaksi kelvollista kuvaa
   (Bad Ems: Kurhaus, Emsin sähkeen muistokivi ja Kurhausin promenadi; Ansbach: Residenz, Kaspar Hauser -muistomerkki, Hofgarten);
   Lüneburgin nummi tyyppiä 'kulttuuri', Spreewald 'jarvi'; Bayreuth ja Jena mukana.
3. **Rammelsberg – Brocken 7,7**: uusi kohde on lähempänä nykyistä Brockenia kuin muut; yli kaupunkirajan
   (7), mutta merkit voivat törmätä lähizoomissa. Kuvat ovat Rammelsbergin kaivosalueesta ja Goslarin
   Kaiserpfalzista ja ristikkotaloista (Goslar noin 2 km päässä).
4. **13+ ja kuvat**: kuva-agentit hylkäsivät kuvat, joissa oli paljasrintaisia patsaita (Hamelnin Leisthaus,
   Meissenin figuuri) ja Oberammergaun Pilatushaus (Ecce Homo -maalaus). Verta sisältäviä kuvia ei tullut vastaan.
   Hambachin juhlan 1832 -piirros on väritetty kaiverrus juhlakulkueesta (ei väkivaltaa). Bad Emsin
   muistokivi (13.7.1870) on kivi ja infotaulu, joka on kuvan oma sisältö.
5. **Kuvien käsittely**: neljä kuvaa on rajattu leikkaamalla pois kirjoitusrivi, ihmisjoukko tai
   paspartuu (Bayreuthin vanha kuva, Rüdesheimin Drosselgasse, Tribergin käkikello, Freibergin Himmelfahrt 1903
   -postikortti); sha8 on rajatusta tiedostosta. Alle 1800 px:n alkuperäiset on käytetty sellaisenaan.
6. **Koordinaatit**: Rügenille käytetty Königsstuhlin piste (en-Wikipedia; saaren oma artikkeli ei ole
   kohteena), Saksilaiselle Sveitsille "Saxon Switzerland" (Elbe Sandstone Mountains -artikkelin piste oli Tšekin puolella).
7. **Tekstit** ovat omin sanoin en-Wikipedian johdannoista ja artikkelien osioista; listan "miksi"-virkkeiden
   muistista kirjoitetut väitteet (esim. Rügenin Friedrich, Helgolandin Lange Anna, Triberg-käkikellot,
   Quedlinburgin Henrik Linnustaja) tarkistettiin artikkeleista ja jätettiin pois, ellei artikkeli niitä
   sisältänyt (Triberg: käkikellot pois, kelloseppäperinne mukana; Helgoland: Lange Anna vain kuvassa).
8. **1873-näkökulma**: nappi-alaotsikot on kirjoitettu 1873-katseella (Völklingen: Julius Buchin terästehdas
   perustettu juuri 1873; Helgoland: vielä Britannian hallussa; Hohenzollern: uusi linna valmistui 1867;
   Bad Ems: sähke sytytti sodan 1870); Hermannsdenkmal (1875), Bayreuth (peruskivi 1872, avattu 1876),
   Chiemsee (Herrenchiemsee 1878), Müngsten (1897): "tänne nousee myöhemmin…".

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 76 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/deu/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Saksan nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Havainnekuvat odottavat.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja
  testit ovat vihreitä.
- Silmäpistokoe: itse katsoin Hambachin ja Bad Emsin kuvat; loput katsoi viisi Sonnet-kuva-agenttia
  (kukin omat 5–6 kohdettaan), jotka raportoivat jokaisen katsotuksi ja listasivat hylätyt ehdokkaat.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/deu/`: 76 kpl `deu-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
