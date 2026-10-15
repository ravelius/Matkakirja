# Astra: native50 ja contract276-neutraalit

**Rajattu visuaalinen hyväksyntä: 6 RGB-kuvaa, 6 semanttista kuvaa ja 6 neutraalia kuvaa.** Kattosävyn ja neljän pelkistetyn aukion massan hyväksytty pilotti säilyy varsinaisessa kuuden näkymän kierroksessa. Katselmuksessa ei ilmennyt tätä rajattua toimitusta estävää uutta visuaalista regressiota. OFFGAME jatkuu.

Katsoin henkilökohtaisesti kaikki 18 alkuperäistä native50-kuvaa sekä niiden 18 native49-verrokkia samoista profiileista. Kaikki ovat 1600 × 900. Mallin SHA256 on `a66aa21512056731c19399db1fe25bcfef42f63c958e055a09638f1be46b734f`; laskin sen tiedostosta ja varmistin vastaavuuden neutraalin renderöintitositteen kanssa. Kaikkien 36 PNG:n pinnit ovat JSONissa. Neutraalien molempien kierrosten kaikki 12 kuvapinniä täsmäävät renderöintitositteisiin.

## Kolme erillistä tulosta

1. **6 RGB — hyväksytty rajattuun muutoksen ja näkyvän regression tarkastukseen.** Keltakultainen kattosävy on vähemmän oranssi, tiilirytmi ja yksityiskohdat säilyvät. Uudet vaaleat massat täyttävät aukion aiemmin puuttuneita alueita ja tuottavat todellisen peiton sekä uusia varjoja. Näkyvät muodot pysyvät PT:n pelkistysrajassa. Muiden näkymien vanha rakenne säilyy silmämääräisesti.
2. **6 semanttista — hyväksytty karkeaan peitto- ja luokkavertailuun.** Uudet massat näkyvät punaisena rakennusluokkana ilma- ja aukionäkymissä. Taihedianin, Beihain, Jingshanin ja hutongin semanttiset RGB-pikselit ovat täysin identtiset native49:n kanssa. Vihreä sisältää puuston runkoineen, sininen veden ja harmaa maanpinnan; alfan ja reunojen sekoittuminen tarkoittaa, ettei kyse ole tarkasta objektitunnisterasterista.
3. **6 Neutral — hyväksytty erilliseksi contract276-materiaali- ja valaistusreferenssiksi.** Kattojen suunta on johdonmukainen kaikissa niitä näyttävissä näkymissä, eikä sävy näytä liian vihreältä tai ylivalottuneelta. Punaseinät, marmori, kiveys ja puusto säilyvät havaittavasti referenssin mukaisina. Nämä eivät ole pelinäkymiä eivätkä lopullisen peliveden todisteita.

Tallennettujen asetusten kamerat, resoluutio, RGB-asetukset, taustat, taivas, valot ja semanttinen profiili ovat kierroksilla 49 ja 50 samat. RGB on Cycles 128 / AgX Medium High Contrast, exposure −0,05; semanttinen on EEVEE / Standard. Neutraalien valaistus-, väri-, resoluutio- ja näyteasetukset vastaavat toisiaan (Khronos PBR Neutral, 128 näytettä). Tuottajan laitetosite ilmoittaa fresh Metal GPU:n. Asetusvertailu on tositteiden vertailu; en käynnistänyt Blenderiä.

## Näkymäkohtaiset havainnot

- **ilma:** Keltakultainen kattosävy erottuu koko palatsialueella. Uudet aukion reunamassat ja muistomerkin osa tulevat kuvan etureunaan; osa massoista jää kuvan ulkopuolelle. Vesialueiden ja vanhan kaupunkirakenteen laaja sijoittelu säilyy. Semanttinen lisäpeitto on etualan rakennusluokassa.
- **taihedian:** Kattomuutos säilyy sekä AgX- että Neutral-kuvassa. Tiilirytmi, kattosiluetit, marmori ja punaseinät säilyvät havaittavasti. Sävy ei näytä vihreältä tai ylivalottuneelta. Syvät ovien ja räystäiden varjot ovat hyväksytyn PT-päätöksen mukaisia. Semanttinen RGB on identtinen native49:n kanssa.
- **aukio:** Neljä pelkistettyä massaa näkyy: pitkä vasen massa, etualan porrastettu laatikko, jalustallinen kapea obeliski ja oikealla rajautuva massa. Vaalea kivi/harmaa, tasakatot ja porrastukset pysyvät sallitussa rajassa; näkyville pinnoille ei ole lisätty koristeita, reliefejä, tekstiä, lippuja tai muotokuvaa. Kiveys ja ruudukko säilyvät näkyviltä osiltaan. AgX-kuvassa uudet varjot ovat selvät, Neutral-kuvassa pehmeämmät. Oikea ja vasen massa jäävät osittain rajauksen ulkopuolelle.
- **beihai:** Saaren, rantareunan, veden ja puuston sijoittelussa ei näy uutta laajaa häiriötä. Kaksi RGB-profiilia eroavat native49:stä vain pieneltä osin, eivät ole täysin identtisiä. Semanttinen RGB on identtinen. Näkymä ei todista vedenalaisten piilopintojen tai peliveden toimivuutta.
- **jingshan:** Kultakattojen muutos näkyy hallissa ja puuston välistä erottuvassa paviljongissa. Puusto ja taustan rakennusrakenne säilyvät havaittavasti. Semanttinen RGB on identtinen. Tiheä ja paikoin toistuva latvusmassa jää kokonaislaadun aiemmaksi kehityskohteeksi, ei tämän kierroksen regressioksi.
- **hutong_ilma:** Harmaat kattotiilet, ovet, ikkunat, pihat ja puusto säilyvät. Semanttinen RGB on identtinen; AgX:n suurin kanavaero on 1 ja Neutralin 2/255. Pitkät toistuvat julkisivujaksot ja pihojen vähäinen vaihtelu ovat edelleen koko mallin laatutyön asioita.

## Numeerinen vertailu native49 → native50

Kanavaerot ovat asteikolla 0–255. ≥20 laskee pikselit, joissa ainakin yksi RGB-kanava muuttuu vähintään 20. Tämä raja ei ole hyväksyntäkynnys. Kaikkia vähäisiä eroja ei nimetä kohinaksi: kattoväri vaikuttaa myös epäsuoraan valoon, massat muuttavat peittoa ja valaistusta, ja renderöinnin vaihtelua voi jäädä näiden lisäksi.

| Ryhmä | Näkymä | Suurin kanavaero | Keskimääräinen kanavaero | Muuttuneita pikseleitä | Pikseleitä ≥20 |
|---|---|---:|---:|---:|---:|
| rgb | ilma | 146 | 2.257607 | 214329 | 47898 |
| rgb | taihedian | 24 | 1.467173 | 426189 | 141 |
| rgb | aukio | 164 | 9.856857 | 773714 | 261537 |
| rgb | beihai | 16 | 0.001381 | 3917 | 0 |
| rgb | jingshan | 20 | 0.062597 | 32188 | 1 |
| rgb | hutong_ilma | 1 | 0.000078 | 334 | 0 |
| semantic | ilma | 200 | 4.391576 | 43697 | 42633 |
| semantic | taihedian | 0 | 0.000000 | 0 | 0 |
| semantic | aukio | 255 | 24.627148 | 240994 | 237470 |
| semantic | beihai | 0 | 0.000000 | 0 | 0 |
| semantic | jingshan | 0 | 0.000000 | 0 | 0 |
| semantic | hutong_ilma | 0 | 0.000000 | 0 | 0 |
| neutral | ilma | 172 | 2.463070 | 192686 | 42535 |
| neutral | taihedian | 19 | 1.190794 | 442738 | 0 |
| neutral | aukio | 188 | 8.727596 | 657443 | 238155 |
| neutral | beihai | 16 | 0.000993 | 2717 | 0 |
| neutral | jingshan | 16 | 0.051172 | 34206 | 0 |
| neutral | hutong_ilma | 2 | 0.000085 | 354 | 0 |

Aukion ja ilmakuvan suuret muutokset vastaavat pääosin lisättyjen massojen peittoa ja valaistusvaikutuksia; katon muutos on myös ilmakuvassa todellinen. Taihedianin RGB-kuvan 141 vähintään 20:n eroa sijoittuvat kattopintojen kattamaan alueeseen, eivät todista laajaa geometriamuutosta; semanttinen kuva on ennallaan. Jingshanin yksi 20:n ero on kattopinnassa kohdassa (807,352). Beihaissa on molemmissa RGB-profiileissa enintään 16:n pieniä paikallisia eroja ja semanttinen kuva on ennallaan; kuvia ei silti väitetä täysin identtisiksi.

Neutraalin varsinaisen kierroksen vertailu hyväksyttyyn actual-source50-pilottiin: Taihedianin suurin kanavaero 5/255, keskiarvo 0,000121 ja 506 muuttunutta pikseliä; aukion vastaavat luvut 2/255, 0,000160 ja 664. Kummassakaan ei ole ≥20-eroja. Alkuperäisten kuvien katselu tukee pilotin hyväksynnän siirtymistä; täydellistä pikseli-identtisyyttä ei väitetä.

## Kaksi erillistä avointa tilaa

- **Kokonaislaadun korkea tavoite on edelleen kesken.** Tämä kierros hyväksyy nimetyt muutokset. Hutongin pitkät toistuvat julkisivut, pihojen vähäinen vaihtelu, taustarakennusten yleisluontoisuus sekä paikoin toistuva ja yhteen sulautuva latvusto jäävät koko mallin jatkokehitykseen. PT:n vaatimaa neljän massan pelkistystä ei käsitellä korjausvikana.
- **PT284:n erillinen kevennetty pelivienti on vielä testissä.** Sen toteutuneita vienti-/runtimekuvia ei tarkastettu tässä. Native50:n RGB-, semanttiset ja neutraalit PNG:t eivät korvaa niitä. GLB/atlas, pelivesi, runtime, integraatio ja julkaisu eivät saa tästä hyväksyntää.

## Päätösrajat ja tekninen näyttö

PT293–296:n hyväksymiä syviä ovi-/räystäsvarjoja, aukion kiveystä ja ruudukkoa sekä korkeuksien toimitusvalintaa ei avata uudelleen. Height-decisions295 vahvistaa valinnat 36,65 m ja noin 8,1 m toimitukseen; kyse ei ole uudesta maastomittauksesta eikä maan korkeusmallin muutoksesta. Historiallisten numeeristen lähdetoleranssien tuloksia ei muuteta.

Tuottajan final-native-square-readback ilmoittaa avatun ehdokkaan ja tallennetun native50:n meshien, materiaalien, kuvien sekä neljän massan vastaavuuden. Tämä on erillistä teknistä näyttöä, jota en itse suorittanut uudelleen. Katselmus ei kata kaikkia massojen piilopintoja, tarkkoja lähdekorkeuksia, vedenalaista geometriaa, ajallista välkkymättömyyttä tai pelin suorituskykyä. Mallin kuvan ulkopuolelle jääviä osia ei hyväksytä kuvan perusteella.

Kirjoitin vain tämän raportin ja rinnakkaisen JSONin. Alkuperäisiä PNG-kuvia, kameroita, kohteita, mallia tai lähteitä ei muutettu. Omistajan hyväksyntää tai julkaisua ei väitetä tapahtuneeksi.
