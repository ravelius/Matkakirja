# Nimistö 1873 — atlastyyliset nimiöt uusintapolttoon

Omistajan päätös 20.9.2026: uusintapolttoon tulevat 1873-maakuntien ja
merien nimet harvennetuin kapiteelein (kuten vanhan ajan atlaksissa).
Koneellinen muoto: `js/packs/nimisto-1873.js` (`NIMISTO_1873`),
61 riviä. Muoto sovittu Karttasepän kanssa suoraan (pilottilista
lähetetty viestinä 20.9.2026 ennen tätä täyttä versiota); **korjattu
Fablen palautteen mukaan 20.9.2026 illalla** (suomalaiset vakiintuneet
nimet, Vienanmeri, Skagerrak + Marmaranmeri, kokoluokka):

```js
{ teksti: 'BRETAGNE', luokka: 'maakunta' | 'meri', lon, lat, iso, koko?, kulma? }
```

`lon`/`lat` on nimiön keskipiste (ei aluerajaus). `iso` on maakunnan
omistajamaa VUONNA 1873, tai `null` merille/lahdille/salmille. `koko`
(`'suuri'`/`'pieni'`) on vain maakunnilla — suuret näkyvät jo
kaukozoomilla (z5–z6), pienet vasta lähempänä (z7+). `kulma` (asteina)
on valinnainen kiertoparametri isoille pitkänomaisille nimiöille — ei
käytetty tässä erässä, Karttaseppä lisää tarvittaessa koelaatan
perusteella.

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

| Nimi | Tyyppi | Sijainti (suuntaa-antava) |
| --- | --- | --- |
| VÄLIMERI | meri | Etelä-Eurooppa |
| ITÄMERI | meri | Pohjois-Eurooppa |
| POHJANMERI | meri | Britannia–Manner-Eurooppa |
| NORJANMERI | meri | Norjan rannikko |
| BARENTSINMERI | meri | Jäämeri, Pohjois-Venäjä/Norja |
| VIENANMERI | meri | Luoteis-Venäjä |
| MUSTAMERI | meri | Kaakkois-Eurooppa |
| ASOVANMERI | meri | Mustanmeren pohjoispuoli |
| EGEANMERI | meri | Kreikka–Turkki |
| MARMARANMERI | meri | Istanbulin eteläpuoli |
| JOONIANMERI | meri | Kreikka–Etelä-Italia |
| TYRRHENANMERI | meri | Länsi-Italia |
| ADRIANMERI | meri | Italia–Balkan |
| LIGURIANMERI | meri | Luoteis-Italia–Ranskan Riviera |
| KELTIENMERI | meri | Irlanti–Länsi-Ranska |
| IRLANNINMERI | meri | Irlanti–Britannia |
| BISKAJANLAHTI | lahti | Ranska–Espanja, Atlantti |
| LIONINLAHTI | lahti | Ranskan Välimeren rannikko |
| POHJANLAHTI | lahti | Suomi–Ruotsi |
| SUOMENLAHTI | lahti | Suomi–Viro–Venäjä |
| RIIANLAHTI | lahti | Viro–Latvia |
| ENGLANNIN KANAALI | salmi | Britannia–Ranska |
| SKAGERRAK | salmi | Norja–Tanska–Ruotsi |
| GIBRALTARINSALMI | salmi | Espanja–Marokko |
| BOSPORINSALMI | salmi | Istanbul |
| DARDANELLIT | salmi | Turkin salmet, eteläinen |
| JUUTINRAUMA | salmi | Tanska–Ruotsi (Öresund) |
| KATTEGAT | salmi/meri | Tanska–Ruotsi, Skagerrakin eteläpuoli |
| MESSINANSALMI | salmi | Sisilia–Manner-Italia |

Lähde: en-/fi-Wikipedian artikkelit kunkin meren omalla nimellä
(johdanto-osat), tarkistettu 20.9.2026. Koordinaatit ovat tämän
kirjoittajan arvioita nimiön keskipisteestä avovedellä — EI
tietokoneellisesti kartalta tarkistettuja. Karttaseppä tarkistaa
visuaalisesti koelaatalla ja siirtää tarvittaessa.

## b) Ranskan historialliset maakunnat 1873 (32 riviä)

Ranska ensin, kuten Fable pyysi ("koelaattaa varten"). Nimet ovat
Ranskan vanhat maakunnat (provinces), sellaisina kuin ne olivat ennen
vuoden 1789 departementtijakoa mutta yhä yleisesti käytössä
maantieteellisinä ja kulttuurisina aluenimimä 1800-luvulla — samat
nimet joita isoisän aikainen matkakirja olisi käyttänyt. `koko`-sarake
on Fablen esimerkkien mukainen niiltä osin kuin hän nimesi ne
(merkitty *), loput tämän kirjoittajan arvio pinta-alasta.

| Maakunta | Iso | Koko | Huomio |
| --- | --- | --- | --- |
| Bretagne | FRA | suuri* | |
| Normandia | FRA | suuri* | |
| Picardie | FRA | suuri | |
| Artois | FRA | pieni* | |
| Flanderi | FRA | pieni | Ranskan Flanderi, ei Belgian |
| Île-de-France | FRA | pieni | Pariisin ympäristö |
| Champagne | FRA | suuri* | |
| Lorraine | FRA | suuri | Ranskaan jäänyt läntinen osa |
| Elsass-Lothringen | **DEU** | suuri* | Saksan Reichsland 1871–1918 |
| Burgundi | FRA | suuri* | |
| Franche-Comté | FRA | pieni | |
| Orléanais | FRA | pieni | |
| Anjou | FRA | pieni | |
| Touraine | FRA | pieni* | |
| Poitou | FRA | suuri | |
| Aunis | FRA | pieni* | La Rochellen ympäristö |
| Saintonge | FRA | pieni* | |
| Berry | FRA | pieni | |
| Nivernais | FRA | pieni* | |
| Auvergne | FRA | suuri* | |
| Limousin | FRA | pieni | |
| Guyenne | FRA | suuri | Bordeaux'n ympäristö |
| Gascogne | FRA | suuri* | |
| Béarn | FRA | pieni* | |
| Foix | FRA | pieni* | |
| Roussillon | FRA | pieni* | |
| Languedoc | FRA | suuri* | |
| Provence | FRA | suuri* | |
| Nizzan kreivikunta | FRA | pieni* | Liitetty Ranskaan 1860 |
| Dauphiné | FRA | suuri | |
| Savoiji | FRA | pieni | Liitetty Ranskaan 1860 |
| Korsika | FRA | suuri* | |

Lähde: en-Wikipedia "Provinces of France" ja "Alsace-Lorraine"
(johdanto-osat), tarkistettu 20.9.2026.

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

| Maakunta/osavaltio | Iso | Koko | Huomio |
| --- | --- | --- | --- |
| Itä-Preussi | DEU | suuri | Preussin provinssi |
| Länsi-Preussi | DEU | pieni | Preussin provinssi |
| Posen | DEU | suuri | Preussin provinssi |
| Pommeri | DEU | suuri | Preussin provinssi (Pommern) |
| Brandenburg | DEU | suuri | Preussin provinssi, sisältää Berliinin |
| Preussin Saksi | DEU | suuri | Provinz Sachsen — EI Saksin kuningaskunta |
| Schlesien | DEU | suuri | Preussin provinssi |
| Hannover | DEU | suuri | Preussin provinssi 1866 alkaen (ent. kuningaskunta) |
| Westfalen | DEU | suuri | Preussin provinssi |
| Rheinland | DEU | suuri | Preussin provinssi, Reinin länsiranta |
| Schleswig-Holstein | DEU | suuri | Preussin provinssi 1867 alkaen |
| Hessen-Nassau | DEU | pieni | Preussin provinssi 1868 alkaen |
| Baijeri | DEU | suuri | Kuningaskunta, oma armeija/posti keisarikunnan sisällä |
| Saksin kuningaskunta | DEU | suuri | Königreich Sachsen — EI Preussin Sachsen-provinssi |
| Württemberg | DEU | suuri | Kuningaskunta |
| Baden | DEU | suuri | Suurherttuakunta |
| Hessen | DEU | pieni | Suurherttuakunta (Hessen-Darmstadt) |
| Mecklenburg-Schwerin | DEU | pieni | Suurherttuakunta |
| Mecklenburg-Strelitz | DEU | pieni | Suurherttuakunta, pieni naapuri Schwerinille |
| Oldenburg | DEU | pieni | Suurherttuakunta |
| Sachsen-Weimar-Eisenach | DEU | pieni | Suurherttuakunta, Weimarin klassismin koti |
| Braunschweig | DEU | pieni | Herttuakunta |
| Sachsen-Meiningen | DEU | pieni | Herttuakunta |
| Sachsen-Altenburg | DEU | pieni | Herttuakunta |
| Sachsen-Coburg-Gotha | DEU | pieni | Herttuakunta, Britannian kuningashuoneen sukujuuret |
| Anhalt | DEU | pieni | Herttuakunta |
| Hampuri | DEU | pieni | Vapaakaupunki |
| Bremen | DEU | pieni | Vapaakaupunki |
| Lübeck | DEU | pieni | Vapaakaupunki |

Lähde: en-Wikipedia "German Empire" (osio "States"), "Kingdom of Prussia"
(osio "Provinces") ja kunkin osavaltion oma artikkeli (johdanto-osat),
tarkistettu 21.9.2026. Koordinaatit ovat tämän kirjoittajan arvioita
kunkin alueen painopisteestä — EI tietokoneellisesti kartalta
tarkistettuja, samaan tapaan kuin Ranska-erässä; Karttaseppä tarkistaa
visuaalisesti koelaatalla ja siirtää tarvittaessa.

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

| Maakunta | Iso | Koko | Huomio |
| --- | --- | --- | --- |
| Piemonte | ITA | suuri | Yhdistymisen ydinalue, Torino |
| Liguria | ITA | pieni | Kapea rannikkokaistale, Genova |
| Lombardia | ITA | suuri | Liittyi jo 1859, Milano |
| Veneto | ITA | suuri | Liitetty 1866, Venetsia |
| Emilia | ITA | suuri | 1873-nimi; "Emilia-Romagna" on 1900-luvun nimitys |
| Toscana | ITA | suuri | Firenze, entinen suurherttuakunta |
| Umbria | ITA | pieni | Sisämaa, ei rannikkoa |
| Marche | ITA | pieni | |
| Latium | ITA | suuri | Liitetty 1870, Rooma pääkaupunki 1871 |
| Abruzzi e Molise | ITA | pieni | Yksi compartimento 1873; Molise erotettiin omaksi vasta 1963 |
| Campania | ITA | suuri | Napoli, Vesuvius, Pompeji |
| Apulia | ITA | suuri | Italian "koron" alue |
| Basilicata | ITA | pieni | Vuoristoinen, harvaan asuttu |
| Calabria | ITA | pieni | Italian "kärki" |
| Sisilia | ITA | suuri | Välimeren suurin saari |
| Sardinia | ITA | suuri | Välimeren toiseksi suurin saari |

Lähde: en-Wikipedia "Unification of Italy", "Kingdom of Italy" ja
"Regions of Italy" (yhdistymisen aikajana 1861/1866/1870–71 ja
compartimenti-jaon periaate); fi-Wikipedian omat artikkelit kustakin
alueesta nimimuodon vakiintuneisuuden tarkistamiseksi — Sisilia,
Sardinia, Latium (Lazio-artikkeli on pelkkä täsmennyssivu, itse alueen
artikkeli on "Latium") ja Apulia (Puglia-artikkelin otsikko on
latinapohjainen "Apulia") ovat fi-Wikipedian vakiintuneita
suomalaisia/latinalaisia nimiä; Piemonte, Liguria, Lombardia, Veneto,
Toscana, Umbria, Marche, Campania, Calabria ja Basilicata jäävät
italiankielisiksi, koska fi-Wikipedia käyttää niitä sellaisenaan ilman
erillistä suomennosta. Tarkistettu 21.9.2026.

## Seuraava vaihe

Muu Eurooppa maa kerrallaan (sama kaanontarkkuus: 1873-rajat ja
-nimet — Itävalta-Unkari, Osmanien Balkan jne., ei nykyisiä rajoja),
samalla schemalla. Espanja seuraa samassa erässä (DEU:n ja ITA:n
kanssa rinnakkain, kukin omalla haarallaan), loput Fablen antaman
järjestyksen mukaisesti.
