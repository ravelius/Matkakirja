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

## Seuraava vaihe

Muu Eurooppa maa kerrallaan (sama kaanontarkkuus: 1873-rajat ja
-nimet — Itävalta-Unkari, Osmanien Balkan jne., ei nykyisiä rajoja),
samalla schemalla. Tehdään erillisenä jatko-eränä kartuschan vajaiden
maiden ja kuvattomien nostojen jälkeen, Fablen antaman järjestyksen
mukaisesti.
