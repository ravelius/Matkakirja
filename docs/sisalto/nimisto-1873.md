# Nimistö 1873 — atlastyyliset nimiöt uusintapolttoon

Omistajan päätös 20.9.2026: uusintapolttoon tulevat 1873-maakuntien ja
merien nimet harvennetuin kapiteelein (kuten vanhan ajan atlaksissa).
Koneellinen muoto: `js/packs/nimisto-1873.js` (`NIMISTO_1873`),
121 riviä (Ranska, Saksa, Italia, Espanja + kaikki Euroopan meret).
Muoto sovittu Karttasepän kanssa suoraan (pilottilista lähetetty
viestinä 20.9.2026 ennen tätä täyttä versiota); **korjattu Fablen
palautteen mukaan 20.9.2026 illalla** (suomalaiset vakiintuneet nimet,
Vienanmeri, Skagerrak + Marmaranmeri, kokoluokka) **ja 21.9.2026**
(`aika`-kenttä, Latium → Lazio, Kantabria poistettu — ks. osio f):

```js
{ teksti: 'BRETAGNE', luokka: 'maakunta' | 'meri', lon, lat, iso, koko?, aika, kulma? }
```

`lon`/`lat` on nimiön keskipiste (ei aluerajaus). `iso` on maakunnan
omistajamaa VUONNA 1873, tai `null` merille/lahdille/salmille. `koko`
(`'suuri'`/`'pieni'`) on vain maakunnilla — suuret näkyvät jo
kaukozoomilla (z5–z6), pienet vasta lähempänä (z7+). `aika`
(`'pysyva'`/`'1873'`) kertoo, näkyykö nimiö pohjakartalla (`pysyva`)
vai vain Vuosi 1873 -linssissä (`1873`) — ks. osio f. `kulma`
(asteina) on valinnainen kiertoparametri isoille pitkänomaisille
nimiöille — ei käytetty tässä erässä, Karttaseppä lisää tarvittaessa
koelaatan perusteella.

## Kaanontarkkuus: vuosi 1873, ei nykyistä

Nimet ja rajat ovat isoisän matkan ajalta. Tärkein ero nykyiseen:

- **Elsass-Lothringen on Saksan puolella.** Frankfurtin rauha
  (10.5.1871) luovutti Alsacen ja Itä-Lothringenin äskettäin
  perustetulle Saksan keisarikunnalle omana Reichslandina — ei
  osavaltiona, vaan suoraan keisarin alaisena alueena — ja tilanne
  jatkui vuoteen 1918 asti. Rivin `iso` on siis `DEU`, ei `FRA`, ja
  nimi jää saksalaisittain (ei suomenneta ranskalaisittain).
- **Savoiji ja Nizzan kreivikunta ovat jo Ranskaa.** Sardinian
  kuningaskunta luovutti ne Ranskalle Torinon sopimuksella 1860
  (Napoleon III:n tuki Italian yhdistymiselle vastineeksi) — vuonna
  1873 ne ovat siis vakiintuneesti ranskalaisia maakuntia.
- **Itävalta-Unkari, Osmanien Balkan ja muu Eurooppa** eivät kuulu
  tähän erään — ne tulevat myöhemmässä erässä, kun muu Eurooppa
  käydään läpi maa kerrallaan (sama kaanontarkkuus: 1873-rajat).

## Nimet suomalaisittain, kuten pelin muu nimistö

Fablen korjaus 20.9.2026: maakuntien nimet käyttävät vakiintuneita
suomenkielisiä muotoja siellä missä sellainen on olemassa (Korsika,
Burgundi, Flanderi, Normandia, Savoiji, Nizzan kreivikunta) — loput
(Bretagne, Provence, Champagne, Lorraine, Picardie, Languedoc ym.)
jäävät alkukielisiksi, koska niillä ei ole erillistä vakiintunutta
suomenkielistä nimeä pelin muun nimistön tapaan. Elsass-Lothringen
jää saksalaisittain, koska alue OLI Saksaa 1873. Merillä samoin:
Vienanmeri (ei "Valkoinenmeri" — fi-Wikipedian oma nimi samalle
vesialueelle kuin en-Wikipedian "White Sea").

## a) Meret, lahdet ja salmet Euroopassa (29 riviä)

Kaikki Euroopan merkittävät merialueet, ei vain Ranskan rannikko —
Fablen tilaus kattoi koko Euroopan tässä osiossa. Luokka on tässä
koneellisessa muodossa yhtenäisesti `'meri'` (meri/lahti/salmi eivät
eriydy erillisiksi arvoiksi, koska nimiön piirtosääntö ei toistaiseksi
tarvitse eroa niiden välillä — jos Karttaseppä tarvitsee tarkemman
jaon, tässä on sanallinen luokitus):

| Nimi | Tyyppi | Aika | Sijainti (suuntaa-antava) |
| --- | --- | --- | --- |
| VÄLIMERI | meri | pysyvä | Etelä-Eurooppa |
| ITÄMERI | meri | pysyvä | Pohjois-Eurooppa |
| POHJANMERI | meri | pysyvä | Britannia–Manner-Eurooppa |
| NORJANMERI | meri | pysyvä | Norjan rannikko |
| BARENTSINMERI | meri | pysyvä | Jäämeri, Pohjois-Venäjä/Norja |
| VIENANMERI | meri | pysyvä | Luoteis-Venäjä |
| MUSTAMERI | meri | pysyvä | Kaakkois-Eurooppa |
| ASOVANMERI | meri | pysyvä | Mustanmeren pohjoispuoli |
| EGEANMERI | meri | pysyvä | Kreikka–Turkki |
| MARMARANMERI | meri | pysyvä | Istanbulin eteläpuoli |
| JOONIANMERI | meri | pysyvä | Kreikka–Etelä-Italia |
| TYRRHENANMERI | meri | pysyvä | Länsi-Italia |
| ADRIANMERI | meri | pysyvä | Italia–Balkan |
| LIGURIANMERI | meri | pysyvä | Luoteis-Italia–Ranskan Riviera |
| KELTIENMERI | meri | pysyvä | Irlanti–Länsi-Ranska |
| IRLANNINMERI | meri | pysyvä | Irlanti–Britannia |
| BISKAJANLAHTI | lahti | pysyvä | Ranska–Espanja, Atlantti |
| LIONINLAHTI | lahti | pysyvä | Ranskan Välimeren rannikko |
| POHJANLAHTI | lahti | pysyvä | Suomi–Ruotsi |
| SUOMENLAHTI | lahti | pysyvä | Suomi–Viro–Venäjä |
| RIIANLAHTI | lahti | pysyvä | Viro–Latvia |
| ENGLANNIN KANAALI | salmi | pysyvä | Britannia–Ranska |
| SKAGERRAK | salmi | pysyvä | Norja–Tanska–Ruotsi |
| GIBRALTARINSALMI | salmi | pysyvä | Espanja–Marokko |
| BOSPORINSALMI | salmi | pysyvä | Istanbul |
| DARDANELLIT | salmi | pysyvä | Turkin salmet, eteläinen |
| JUUTINRAUMA | salmi | pysyvä | Tanska–Ruotsi (Öresund) |
| KATTEGAT | salmi/meri | pysyvä | Tanska–Ruotsi, Skagerrakin eteläpuoli |
| MESSINANSALMI | salmi | pysyvä | Sisilia–Manner-Italia |

Lähde: en-/fi-Wikipedian artikkelit kunkin meren omalla nimellä
(johdanto-osat), tarkistettu 20.9.2026. Koordinaatit ovat tämän
kirjoittajan arvioita nimiön keskipisteestä avovedellä — EI
tietokoneellisesti kartalta tarkistettuja. Karttaseppä tarkistaa
visuaalisesti koelaatalla ja siirtää tarvittaessa. Kaikki meret ovat
`aika: 'pysyva'` (meren nimi ei riipu 1873-poliittisesta rajasta).

## b) Ranskan historialliset maakunnat 1873 (32 riviä)

Ranska ensin, kuten Fable pyysi ("koelaattaa varten"). Nimet ovat
Ranskan vanhat maakunnat (provinces), sellaisina kuin ne olivat ennen
vuoden 1789 departementtijakoa mutta yhä yleisesti käytössä
maantieteellisinä ja kulttuurisina aluenimimä 1800-luvulla — samat
nimet joita isoisän aikainen matkakirja olisi käyttänyt. `koko`-sarake
on Fablen esimerkkien mukainen niiltä osin kuin hän nimesi ne
(merkitty *), loput tämän kirjoittajan arvio pinta-alasta.

| Maakunta | Iso | Koko | Aika | Huomio |
| --- | --- | --- | --- | --- |
| Bretagne | FRA | suuri* | pysyvä | |
| Normandia | FRA | suuri* | pysyvä | |
| Picardie | FRA | suuri | pysyvä | |
| Artois | FRA | pieni* | pysyvä | |
| Flanderi | FRA | pieni | pysyvä | Ranskan Flanderi, ei Belgian |
| Île-de-France | FRA | pieni | pysyvä | Pariisin ympäristö, nykyinen région |
| Champagne | FRA | suuri* | pysyvä | |
| Lorraine | FRA | suuri | pysyvä | Ranskaan jäänyt läntinen osa |
| Elsass-Lothringen | **DEU** | suuri* | 1873 | Saksan Reichsland 1871–1918, ei käytössä nimenä nykyään |
| Burgundi | FRA | suuri* | pysyvä | |
| Franche-Comté | FRA | pieni | pysyvä | |
| Orléanais | FRA | pieni | 1873 | Ei käytössä alueen nimenä nykyään |
| Anjou | FRA | pieni | pysyvä | |
| Touraine | FRA | pieni* | pysyvä | |
| Poitou | FRA | suuri | pysyvä | |
| Aunis | FRA | pieni* | 1873 | La Rochellen ympäristö, ei käytössä nykyään |
| Saintonge | FRA | pieni* | 1873 | Ei käytössä alueen nimenä nykyään |
| Berry | FRA | pieni | pysyvä | |
| Nivernais | FRA | pieni* | 1873 | Ei käytössä alueen nimenä nykyään |
| Auvergne | FRA | suuri* | pysyvä | |
| Limousin | FRA | pieni | pysyvä | |
| Guyenne | FRA | suuri | 1873 | Bordeaux'n ympäristö, nyk. Aquitaine/Gascogne |
| Gascogne | FRA | suuri* | pysyvä | |
| Béarn | FRA | pieni* | pysyvä | |
| Foix | FRA | pieni* | 1873 | Lähinnä kaupungin nimi nykyään, ei alueen |
| Roussillon | FRA | pieni* | pysyvä | |
| Languedoc | FRA | suuri* | pysyvä | |
| Provence | FRA | suuri* | pysyvä | |
| Nizzan kreivikunta | FRA | pieni* | 1873 | Liitetty Ranskaan 1860, kreivikunta ei enää olemassa |
| Dauphiné | FRA | suuri | pysyvä | |
| Savoiji | FRA | pieni | pysyvä | Liitetty Ranskaan 1860 |
| Korsika | FRA | suuri* | pysyvä | |

Lähde: en-Wikipedia "Provinces of France" ja "Alsace-Lorraine"
(johdanto-osat), tarkistettu 20.9.2026. Aika-sarake lisätty 21.9.2026,
ks. osio f.

## c) Saksan keisarikunnan osavaltiot 1873 (29 riviä)

Saksan keisarikunta (Deutsches Reich) julistettiin 18.1.1871 Versailles'ssa
Ranskan–Preussin sodan päätteeksi. Se oli liittovaltio: 25 osavaltiota
(Bundesstaaten — 4 kuningaskuntaa, 6 suurherttuakuntaa, 5 herttuakuntaa,
7 ruhtinaskuntaa, 3 vapaakaupunkia) sekä keisarin suoraan alainen
Reichsland Elsass-Lothringen (jo NIMISTO_1873:ssa, ei toisteta tässä).
Preussin kuningaskunta oli ylivoimaisesti suurin: se kattoi n. kaksi
kolmasosaa koko valtakunnan pinta-alasta ja väestöstä, ja jakautui
sisäisesti provinsseihin. Yksi ainoa "PREUSSI"-nimiö olisi peittänyt
puolet Saksasta ja olisi atlaksena hyödytön — siksi tässä on noudatettu
oikeiden 1800-luvun atlasten tapaa ja nimetty Preussin suuret provinssit
erikseen, samalla tavalla kuin Ranskan vanhat maakunnat. Muut
kuningaskunnat (Baijeri, Saksi, Württemberg), suurherttuakunnat ja kolme
vapaakaupunkia ovat omina riveinään.

Rajaus: seitsemän pienintä Thüringenin/Waldeckin ruhtinaskuntaa —
Schwarzburg-Sondershausen, Schwarzburg-Rudolstadt, Reussin vanhempi ja
nuorempi linja, Waldeck, Lippe ja Schaumburg-Lippe — on jätetty tästä
erästä pois. Ne olisivat kartalla muutaman kymmenen kilometrin kokoisia
pilkkuja Thüringenin ja Hannoverin väliin ahdettuina; niiden nimiöt
olisivat päällekkäin keskenään ja naapuriosavaltioiden kanssa millä
tahansa käytännöllisellä zoomitasolla, eikä pelin 1873-tarina käsittele
niitä erikseen. Jos Karttaseppä haluaa jonkin niistä myöhemmin mukaan,
ne olisivat kaikki `koko: 'pieni'` -tason nimiöitä.

**Nimeämishuomio:** Königreich Sachsen (Saksin kuningaskunta) ja Preussin
sisäinen Sachsen-provinssi ("Provinz Sachsen") ovat eri asioita samalla
nimellä — sekaannuksen välttämiseksi taulukossa ja koodissa käytetään
"SAKSIN KUNINGASKUNTA" ja "PREUSSIN SAKSI".

| Maakunta/osavaltio | Iso | Koko | Aika | Huomio |
| --- | --- | --- | --- | --- |
| Itä-Preussi | DEU | suuri | 1873 | Preussin provinssi, ei nykyistä paikkaa |
| Länsi-Preussi | DEU | pieni | 1873 | Preussin provinssi, ei nykyistä paikkaa |
| Posen | DEU | suuri | 1873 | Preussin provinssi, nyk. Poznań, Puola |
| Pommeri | DEU | suuri | 1873 | Preussin provinssi (Pommern), jakautunut nykyään |
| Brandenburg | DEU | suuri | pysyvä | Preussin provinssi, sisältää Berliinin; nykyinen osavaltio |
| Preussin Saksi | DEU | suuri | 1873 | Provinz Sachsen, nyk. osa Sachsen-Anhaltia — EI Saksin kuningaskunta |
| Schlesien | DEU | suuri | 1873 | Preussin provinssi, nyk. pääosin Puolan Śląsk |
| Hannover | DEU | suuri | pysyvä | Preussin provinssi 1866 alkaen (ent. kuningaskunta); nykyinen kaupunki/alue |
| Westfalen | DEU | suuri | pysyvä | Preussin provinssi; nykyisen Nordrhein-Westfalenin osa |
| Rheinland | DEU | suuri | pysyvä | Preussin provinssi, Reinin länsiranta; nykyisen Rheinland-Pfalzin nimiosa |
| Schleswig-Holstein | DEU | suuri | pysyvä | Preussin provinssi 1867 alkaen; nykyinen osavaltio samalla nimellä |
| Hessen-Nassau | DEU | pieni | 1873 | Preussin provinssi 1868 alkaen, ei käytössä nykyään |
| Baijeri | DEU | suuri | pysyvä | Kuningaskunta, oma armeija/posti keisarikunnan sisällä; nykyinen osavaltio |
| Saksin kuningaskunta | DEU | suuri | 1873 | Königreich Sachsen — kuningaskunta ei enää olemassa (Saksi/Sachsen itsessään on pysyvä) |
| Württemberg | DEU | suuri | pysyvä | Kuningaskunta; nimi elää Baden-Württembergissä |
| Baden | DEU | suuri | pysyvä | Suurherttuakunta; nimi elää Baden-Württembergissä |
| Hessen | DEU | pieni | pysyvä | Suurherttuakunta (Hessen-Darmstadt); nykyinen osavaltio |
| Mecklenburg-Schwerin | DEU | pieni | 1873 | Suurherttuakunta, yhdistetty Mecklenburg-Vorpommeniin |
| Mecklenburg-Strelitz | DEU | pieni | 1873 | Suurherttuakunta, pieni naapuri Schwerinille, yhdistetty |
| Oldenburg | DEU | pieni | pysyvä | Suurherttuakunta; nykyinen kaupunki/alue |
| Sachsen-Weimar-Eisenach | DEU | pieni | 1873 | Suurherttuakunta, Weimarin klassismin koti, ei käytössä yhdistelmänimenä |
| Braunschweig | DEU | pieni | pysyvä | Herttuakunta; nykyinen kaupunki |
| Sachsen-Meiningen | DEU | pieni | 1873 | Herttuakunta, ei käytössä yhdistelmänimenä |
| Sachsen-Altenburg | DEU | pieni | 1873 | Herttuakunta, ei käytössä yhdistelmänimenä |
| Sachsen-Coburg-Gotha | DEU | pieni | 1873 | Herttuakunta, Britannian kuningashuoneen sukujuuret, ei käytössä yhdistelmänimenä |
| Anhalt | DEU | pieni | pysyvä | Herttuakunta; nimi elää Sachsen-Anhaltissa |
| Hampuri | DEU | pieni | pysyvä | Vapaakaupunki, nykyinen osavaltio |
| Bremen | DEU | pieni | pysyvä | Vapaakaupunki, nykyinen osavaltio |
| Lübeck | DEU | pieni | pysyvä | Vapaakaupunki; nykyinen kaupunki (ei enää itsenäinen valtio) |

Lähde: en-Wikipedia "German Empire" (osio "States"), "Kingdom of Prussia"
(osio "Provinces") ja kunkin osavaltion oma artikkeli (johdanto-osat),
tarkistettu 21.9.2026. Koordinaatit ovat tämän kirjoittajan arvioita
kunkin alueen painopisteestä — EI tietokoneellisesti kartalta
tarkistettuja, samaan tapaan kuin Ranska-erässä; Karttaseppä tarkistaa
visuaalisesti koelaatalla ja siirtää tarvittaessa. Aika-sarake lisätty
21.9.2026, ks. osio f.

### Tarkistettavaksi reviewerille (DEU)

- Preussin provinssien lukumäärä ja rajat vaihtelivat vuosien saatossa
  (esim. Hessen-Nassau syntyi 1868 Frankfurtin ja Nassaun liittämisestä,
  Schleswig-Holstein 1867); vuoden 1873 tilanne on tässä pyritty
  osumaan tarkasti, mutta rajaviivat (etenkin Hessen-Nassaun ja
  Rheinlandin väli) ovat karkea arvio, ei tarkka historiallinen kartta.
- "Preussin Saksi" vs. "Saksin kuningaskunta" -erottelu on tämän
  kirjoittajan ratkaisu sekaannuksen välttämiseksi; jos pelissä on jo
  vakiintunut nimeämiskäytäntö näille kahdelle, sitä kannattaa käyttää
  sen sijaan.
- Seitsemän pienimmän Thüringenin/Waldeckin ruhtinaskunnan poisjättö on
  harkinnanvarainen päätös (ohjeen mukaan sallittu) — reviewer voi
  halutessaan lisätä ne `koko: 'pieni'` -tasolla, jos Karttaseppä
  arvioi tilan riittävän.

## d) Italian hallinnolliset alueet 1873 (16 riviä)

Italia yhdistymisen jälkeen: kuningaskunta julistettiin 17.3.1861
Sardinian kuningaskunnasta (Piemonte, Liguria, Lombardia — liittynyt jo
1859 — Toscana, Emilia, Umbria, Marche, Napolin ja Sisilian
kuningaskunnat). Veneto liitettiin 1866 kolmannen Italian
itsenäisyyssodan jälkeen (Preussi voitti Itävallan, ja Venetsia siirtyi
rauhanteossa Italialle). Rooma vallattiin paavilta 20.9.1870, Lazio
liitettiin samalla, ja Roomasta tuli Italian pääkaupunki 1871. Vuonna
1873 Italian alue vastaa siis riviä Piemonte–Sisilia–Sardinia tässä
taulukossa — **Trentino, Etelä-Tiroli (Alto Adige/Südtirol), Triest ja
Friuli olivat yhä Itävalta-Unkuria** eivätkä kuulu tähän erään
(siirtyivät Italialle vasta 1918–1920 ensimmäisen maailmansodan
jälkeen); sama rajaustapa kuin Elsass-Lothringenille Ranska-erässä,
paitsi että aluetta ei ole edes merkitty tähän — Itävalta-Unkari
käydään läpi kokonaisuudessaan omana myöhempänä eränään.

| Maakunta | Iso | Koko | Aika | Huomio |
| --- | --- | --- | --- | --- |
| Piemonte | ITA | suuri | pysyvä | Yhdistymisen ydinalue, Torino |
| Liguria | ITA | pieni | pysyvä | Kapea rannikkokaistale, Genova |
| Lombardia | ITA | suuri | pysyvä | Liittyi jo 1859, Milano |
| Veneto | ITA | suuri | pysyvä | Liitetty 1866, Venetsia |
| Emilia | ITA | suuri | 1873 | 1873-nimi; nykyinen nimi "Emilia-Romagna" (1900-luvulta) |
| Toscana | ITA | suuri | pysyvä | Firenze, entinen suurherttuakunta |
| Umbria | ITA | pieni | pysyvä | Sisämaa, ei rannikkoa |
| Marche | ITA | pieni | pysyvä | |
| Lazio | ITA | suuri | pysyvä | Liitetty 1870, Rooma pääkaupunki 1871; **korjattu 21.9.2026: rivi oli "Latium"** |
| Abruzzi e Molise | ITA | pieni | 1873 | Yksi compartimento 1873; jaettu kahdeksi alueeksi 1963 |
| Campania | ITA | suuri | pysyvä | Napoli, Vesuvius, Pompeji |
| Apulia | ITA | suuri | pysyvä | Italian "koron" alue |
| Basilicata | ITA | pieni | pysyvä | Vuoristoinen, harvaan asuttu |
| Calabria | ITA | pieni | pysyvä | Italian "kärki" |
| Sisilia | ITA | suuri | pysyvä | Välimeren suurin saari |
| Sardinia | ITA | suuri | pysyvä | Välimeren toiseksi suurin saari |

Lähde: en-Wikipedia "Unification of Italy", "Kingdom of Italy" ja
"Regions of Italy" (yhdistymisen aikajana 1861/1866/1870–71 ja
compartimenti-jaon periaate); fi-Wikipedian omat artikkelit kustakin
alueesta nimimuodon vakiintuneisuuden tarkistamiseksi — Sisilia,
Sardinia ja Apulia (Puglia-artikkelin otsikko on latinapohjainen
"Apulia") ovat fi-Wikipedian vakiintuneita suomalaisia/latinalaisia
nimiä; Piemonte, Liguria, Lombardia, Veneto, Toscana, Umbria, Marche,
Campania, Calabria ja Basilicata jäävät italiankielisiksi, koska
fi-Wikipedia käyttää niitä sellaisenaan ilman erillistä suomennosta.
Tarkistettu 21.9.2026; Aika-sarake ja Latium→Lazio-korjaus lisätty
samana päivänä, ks. osio f.

## e) Espanjan historialliset maakunnat/kuningaskunnat 1873 (15 riviä)

Espanja Ranskan jälkeen, samalla kaanontarkkuudella: nimet ovat
1800-luvun historiallisia alue-/kuningaskuntanimiä — EI vuoden 1833
Javier de Burgosin 49 provinssin jakoa eikä nykyisiä 17
itsehallintoaluetta. Nämä olivat vielä 1873 yleisesti käytössä
maantieteellisinä ja kulttuurisina aluenimimä, samaan tapaan kuin
Ranskan vanhat maakunnat.

| Maakunta | Iso | Koko | Aika | Huomio |
| --- | --- | --- | --- | --- |
| Galicia | ESP | suuri | pysyvä | |
| Asturia | ESP | pieni | pysyvä | Entinen Asturian kuningaskunta; nykyinen itsehallintoalue |
| Baskimaa | ESP | pieni | pysyvä | "Provincias Vascongadas" (Vizcaya, Guipúzcoa, Álava) yhtenä nimiönä, ks. huomautus (1) |
| Navarra | ESP | pieni | pysyvä | Entinen Navarran kuningaskunta; nykyinen itsehallintoalue |
| Aragonia | ESP | suuri | pysyvä | Entinen Aragonian kuningaskunta; nykyinen itsehallintoalue |
| Katalonia | ESP | suuri | pysyvä | |
| Valencia | ESP | suuri | pysyvä | Entinen Valencian kuningaskunta; nykyinen itsehallintoalue |
| Murcia | ESP | pieni | pysyvä | Entinen Murcian kuningaskunta; nykyinen itsehallintoalue |
| Vanha-Kastilia | ESP | suuri | 1873 | Castilla la Vieja, ei nykyinen itsehallintoalue |
| Uusi-Kastilia | ESP | suuri | 1873 | Castilla la Nueva, Madridin ympäristö, ei nykyinen itsehallintoalue |
| León | ESP | suuri | 1873 | Entinen Leónin kuningaskunta, nyk. osa Castilla y Leóniä — ks. huomautus (2) |
| Extremadura | ESP | suuri | pysyvä | |
| Andalusia | ESP | suuri | pysyvä | Entinen Andalusian kuningaskunta; nykyinen itsehallintoalue |
| Baleaarit | ESP | pieni | pysyvä | Saaristo |
| Kanariansaaret | ESP | pieni | pysyvä | Saaristo, kaukana Atlantilla |

Kantabria (Santander) poistettu listalta 21.9.2026, ks. osio f.

### Kaksi harkinnanvaraista päätöstä (reviewer, tarkistakaa)

1. **Baskimaa yhtenä nimiönä.** 1800-luvun kartat ja matkakirjat
   käyttivät usein yhteisnimeä "Provincias Vascongadas" kolmesta
   pienestä maakunnasta (Vizcaya, Guipúzcoa, Álava). Valitsin yhden
   nimiön kolmen sijaan, koska yksittäiset maakunnat olisivat
   nimiökartalla hyvin pieniä (samaa kokoluokkaa kuin Ranskan Béarn
   tai Foix) ja koska Baskimaa on suomeksi vakiintunut yleisnimitys.
   Jos Karttaseppä haluaa kolme erillistä pientä nimiötä, listan voi
   pilkkoa.
2. **León erillään Vanha-Kastiliasta.** León oli oma kuningaskuntansa
   ennen liittoa Kastiliaan vuonna 1230, ja seutu (nykyiset Leónin,
   Zamoran ja Salamancan maakunnat) tunnettiin edelleen 1800-luvulla
   omana historiallis-kulttuurisena alueenaan — siksi erillinen nimiö
   eikä sulautus Vanha-Kastiliaan.

### Suomenkieliset nimet (ESP)

Fablen 20.9.2026 linjaus (ks. Ranskan lohko) — vain vakiintuneet
suomenkieliset muodot suomennetaan, loput jäävät alkukielisiksi.
Espanjan kohdalla lähes kaikilla alueilla ON vakiintunut suomenkielinen
muoto (Galicia, Asturia, Baskimaa, Aragonia, Katalonia, Andalusia,
Vanha-Kastilia, Uusi-Kastilia — tarkistettu fi-Wikipediasta
21.9.2026), joten näiltä osin Espanjan lohko poikkeaa Ranskan lohkosta,
jossa suurin osa jäi alkukielisiksi. Navarra, Valencia, Murcia,
Extremadura ja León eivät saa erillistä suomenkielistä muotoa (samat
sanat espanjaksi ja suomeksi vakiintuneesti), joten ne jäävät
alkukielisiksi kapiteeleiksi Ranskan Bretagne/Provence-tapaan.
Baleaarit ja Kanariansaaret ovat suomenkielisiä saaristonimiä.

Lähde: en-Wikipedia "Old Castile", "New Castile", "Kingdom of León",
"Kingdom of Asturias", "Basque Provinces" ja "Provinces of Spain"
(johdanto-osat); suomenkieliset nimet tarkistettu fi-Wikipediasta
(artikkelit "Vanha-Kastilia", "Baleaarit", "Asturia", "Baskimaa" ym.).
Tarkistettu 21.9.2026. Koordinaatit ovat tämän kirjoittajan arvioita
alueen painopisteestä — EI tietokoneellisesti kartalta tarkistettuja;
Karttaseppä tarkistaa visuaalisesti koelaatalla ja siirtää
tarvittaessa, samaan tapaan kuin Ranskan ja merien lohkoissa.
Aika-sarake ja Kantabrian poisto lisätty 21.9.2026, ks. osio f.

## f) Aika-kenttä: pysyvä vs. 1873 (omistajan päätös 21.9.2026)

Pohjakartalle tulee vain PYSYVÄT nimet — meret ja nykyisin käytössä
olevat kulttuurialueiden nimet. Vuoden 1873 POLIITTISET nimet
siirtyvät omaan Vuosi 1873 -linssiin, eivät näy pohjakartalla. Tätä
varten jokainen `NIMISTO_1873`-rivi (kaikki neljä maata) sai kentän
`aika: 'pysyva' | '1873'`:

- **`pysyva`** = nimi on nykyisin käytössä alueen nimenä (esim.
  Bretagne, Normandia, Provence, Burgundi, Korsika, Toscana, Sisilia,
  Baijeri, Andalusia, Katalonia).
- **`1873`** = poliittinen yksikkö, jota ei enää ole tai joka on
  nykyisin eri maassa/nimellä (Elsass-Lothringen, Preussin provinssit
  kuten Itä-/Länsi-Preussi ja Posen, Vanha-/Uusi-Kastilia,
  herttuakunnat kuten Sachsen-Meiningen).

Samalla korjattiin kaksi asiaa: **Latium → Lazio** (Italia-osiossa
rivin nimi oli fi-Wikipedian artikkelinimen mukainen "Latium", mutta
"Lazio" on alueen nykyisin käytössä oleva nimi — tietoinen poikkeus
muuten johdonmukaisesta fi-Wikipedia-artikkelinimi-periaatteesta) ja
**Kantabria poistettu kokonaan** Espanja-osiosta (rajatapaus, joka ei
täyttänyt selvästi kumpaakaan luokkaa yhtä siististi kuin muut rivit).

### Lukumäärät per maa

| Maa | Rivejä yhteensä | Pysyvä | 1873 |
| --- | --- | --- | --- |
| FRA (Ranska) | 31 | 24 | 7 |
| DEU (Saksa, sis. Elsass-Lothringen) | 30 | 15 | 15 |
| ITA (Italia) | 16 | 14 | 2 |
| ESP (Espanja, Kantabria poistettu) | 15 | 12 | 3 |
| Meret/lahdet/salmet (`iso: null`) | 29 | 29 | 0 |
| **Yhteensä** | **121** | **94** | **27** |

Rajatapaukset (esim. onko "Schlesien" tai "Saksin kuningaskunta"
pysyvä vai 1873) on ratkaistu kirjoittajan parhaalla arviolla samaan
tapaan kuin `koko`-kenttä — periaatteena on, viittaako TÄSMÄLLEEN
TÄMÄ teksti/nimi siihen, miten aluetta kutsutaan tänään (esim.
"Brandenburg" ja "Schleswig-Holstein" ovat nykyisiä osavaltioiden
nimiä sellaisenaan, joten pysyvä; "Itä-Preussi" ja "Posen" eivät ole
minkään nykyisen paikan nimi, joten 1873). Karttaseppä/Fable voi
korjata yksittäisiä rivejä tarvittaessa.

## Seuraava vaihe

Muu Eurooppa maa kerrallaan (sama kaanontarkkuus: 1873-rajat ja
-nimet — Itävalta-Unkari, Osmanien Balkan jne., ei nykyisiä rajoja),
samalla schemalla, `aika`-kenttä mukana alusta asti. Saksa, Italia ja
Espanja tehtiin samassa erässä, kukin omalla haarallaan, yhdistettynä
`sisalto-nimisto-aika`-haaraan. Loput Fablen antaman järjestyksen
mukaisesti.
