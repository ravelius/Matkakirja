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

## c) Espanjan historialliset maakunnat/kuningaskunnat 1873 (16 riviä)

Espanja Ranskan jälkeen, samalla kaanontarkkuudella: nimet ovat
1800-luvun historiallisia alue-/kuningaskuntanimiä — EI vuoden 1833
Javier de Burgosin 49 provinssin jakoa eikä nykyisiä 17
itsehallintoaluetta. Nämä olivat vielä 1873 yleisesti käytössä
maantieteellisinä ja kulttuurisina aluenimimä, samaan tapaan kuin
Ranskan vanhat maakunnat.

| Maakunta | Iso | Koko | Huomio |
| --- | --- | --- | --- |
| Galicia | ESP | suuri | |
| Asturia | ESP | pieni | Entinen Asturian kuningaskunta |
| Kantabria | ESP | pieni | Santander — ks. huomautus (2) alla |
| Baskimaa | ESP | pieni | "Provincias Vascongadas" (Vizcaya, Guipúzcoa, Álava) yhtenä nimiönä, ks. huomautus (1) |
| Navarra | ESP | pieni | Entinen Navarran kuningaskunta |
| Aragonia | ESP | suuri | Entinen Aragonian kuningaskunta |
| Katalonia | ESP | suuri | |
| Valencia | ESP | suuri | Entinen Valencian kuningaskunta |
| Murcia | ESP | pieni | Entinen Murcian kuningaskunta |
| Vanha-Kastilia | ESP | suuri | Castilla la Vieja |
| Uusi-Kastilia | ESP | suuri | Castilla la Nueva, Madridin ympäristö |
| León | ESP | suuri | Entinen Leónin kuningaskunta — pidetty erillään Vanha-Kastiliasta, ks. huomautus (3) |
| Extremadura | ESP | suuri | |
| Andalusia | ESP | suuri | Entinen Andalusian kuningaskunta |
| Baleaarit | ESP | pieni | Saaristo |
| Kanariansaaret | ESP | pieni | Saaristo, kaukana Atlantilla |

### Kolme harkinnanvaraista päätöstä (reviewer, tarkistakaa)

1. **Baskimaa yhtenä nimiönä.** 1800-luvun kartat ja matkakirjat
   käyttivät usein yhteisnimeä "Provincias Vascongadas" kolmesta
   pienestä maakunnasta (Vizcaya, Guipúzcoa, Álava). Valitsin yhden
   nimiön kolmen sijaan, koska yksittäiset maakunnat olisivat
   nimiökartalla hyvin pieniä (samaa kokoluokkaa kuin Ranskan Béarn
   tai Foix) ja koska Baskimaa on suomeksi vakiintunut yleisnimitys.
   Jos Karttaseppä haluaa kolme erillistä pientä nimiötä, listan voi
   pilkkoa.
2. **Kantabria erillään Vanha-Kastiliasta.** Vuoden 1833 hallinnollinen
   jako (ja siten myös fi-Wikipedian "Vanha-Kastilia"-artikkeli)
   laskee Santanderin/Kantabrian osaksi Vanha-Kastiliaa. Valitsin
   silti oman nimiön Kantabrialle, koska rantaviivan seutu ("La
   Montaña") oli kulttuurisesti ja maantieteellisesti erottuva jo
   ennen 1833-jakoa — sama logiikka kuin Ranskan Bretagnen tai
   Normandian oma nimiö Île-de-Francen vieressä. Tämä on tulkinta,
   jonka reviewer voi kumota: vaihtoehto olisi poistaa Kantabria
   listalta ja siirtää Vanha-Kastilian keskipiste pohjoisemmaksi
   rannikolle asti ulottuvaksi.
3. **León erillään Vanha-Kastiliasta.** León oli oma kuningaskuntansa
   ennen liittoa Kastiliaan vuonna 1230, ja seutu (nykyiset Leónin,
   Zamoran ja Salamancan maakunnat) tunnettiin edelleen 1800-luvulla
   omana historiallis-kulttuurisena alueenaan — siksi erillinen nimiö
   eikä sulautus Vanha-Kastiliaan.

### Suomenkieliset nimet (ESP)

Fablen 20.9.2026 linjaus (ks. Ranskan lohko) — vain vakiintuneet
suomenkieliset muodot suomennetaan, loput jäävät alkukielisiksi.
Espanjan kohdalla lähes kaikilla alueilla ON vakiintunut suomenkielinen
muoto (Galicia, Asturia, Kantabria, Baskimaa, Aragonia, Katalonia,
Andalusia, Vanha-Kastilia, Uusi-Kastilia — tarkistettu fi-Wikipediasta
21.9.2026), joten näiltä osin Espanjan lohko poikkeaa Ranskan lohkosta,
jossa suurin osa jäi alkukielisiksi. Navarra, Valencia, Murcia,
Extremadura ja León eivät saa erillistä suomenkielistä muotoa (samat
sanat espanjaksi ja suomeksi vakiintuneesti), joten ne jäävät
alkukielisiksi kapiteeleiksi Ranskan Bretagne/Provence-tapaan.
Baleaarit ja Kanariansaaret ovat suomenkielisiä saaristonimiä.

Lähde: en-Wikipedia "Old Castile", "New Castile", "Kingdom of León",
"Kingdom of Asturias", "Basque Provinces" ja "Provinces of Spain"
(johdanto-osat); suomenkieliset nimet tarkistettu fi-Wikipediasta
(artikkelit "Vanha-Kastilia", "Kantabria", "Baleaarit", "Asturia",
"Baskimaa" ym.). Tarkistettu 21.9.2026. Koordinaatit ovat tämän
kirjoittajan arvioita alueen painopisteestä — EI tietokoneellisesti
kartalta tarkistettuja; Karttaseppä tarkistaa visuaalisesti
koelaatalla ja siirtää tarvittaessa, samaan tapaan kuin Ranskan ja
merien lohkoissa.

## Seuraava vaihe

Muu Eurooppa maa kerrallaan (sama kaanontarkkuus: 1873-rajat ja
-nimet — Itävalta-Unkari, Osmanien Balkan jne., ei nykyisiä rajoja),
samalla schemalla. Saksa ja Italia tehtiin samassa erässä (ESP:n
kanssa rinnakkain, kukin omalla haarallaan), loput Fablen antaman
järjestyksen mukaisesti.
