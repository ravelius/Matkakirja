# 3D-nostot: paletti, kategoriasymbolit 3D:nä ja erikoismallit (luonnos omistajan korttiin)

**Omistaja 21.5x (toinen tarkennus): nostoja EI animoida.** Animoidaan vain elävät elementit ja lippu. Alta on
poistettu nostojen animaatio: taulukossa on kategoria → 3D-muoto → kolmiot ja erikoismallit maittain.

*Linssiseppä ja Natiiviseppä 26.9.2026 klo 21.5x Fablen tilauksesta (omistaja 21.4x). Yhteinen esitys; Natiivisepän
tausta on tiedostossa proto-3d/lokit/ylhaalta-175/animaatioehdotus-1027.md. Ei koodia ennen omistajan korttia.*

**Omistajan korjaus 21.5x (sitova):** 3D-nostot ovat NOSTOT-paneelin kategoriasymbolit 3D:nä, samat joka maassa, ja
lisäksi muutama erikoismalli maata kohden suurimpina. Rakennusarkkityyppejä ei käytetä. Paletti
pysyy (hyväksytty 21.4x, d88a88d22). Alla kohdat 2 ja 3 on kirjoitettu tämän mukaan uudelleen.

**Omistajan linja 21.4x:**
- 3D-nostot 2D-kuvamerkkien (seepiakaiverrus) tai nähtävyyskartan kohteiden sävyisiksi.
- ~~Kaikki arkkityypit animoidaan Tivolin logiikalla.~~ Korvattu 21.5x: nostoja ei animoida.
- Mallit ovat mahdollisimman yksinkertaisia.
- Liioiteltu perspektiivi: LiioiteltuPerspektiivi.Kallistus, 0° keskellä ja 55° reunoilla.

## 1. Paletti: 2D-kuvamerkki kolmiulotteisena

2D-merkki on seepiamusteinen kaiverrus vaalealla laatalla. Sävyt on mitattu kuvamerkkien merkki-*.png-paletista
(Natiiviseppä). Kaikille malleille on yksi varjostin: kärkiväri → valoisuus → seepiaramppi.

| Rooli | Väri | Käyttö |
|---|---|---|
| Paperi (valoisin) | #efe4cc | valaistut seinät ja katot, 70–80 % mallin alasta |
| Seepia (keski) | #8a6a44 | varjon puoleiset tahkot ja katon lappeet kiedotulla valolla (ei harmaata) |
| Muste (tummin) | #3b2f22 | kaiverrusreuna 1,2 pt (inverted hull, näkyy myös ylhäältä), aukot, ovet ja ikkunat |
| Aksentti | lajin `--sym-*`-väri hillittynä | yhdessä pienessä osassa (tähden keskus, ankkurin rengas, vaa'an kupit), enintään 10 % alasta |
| Maavarjo | muste alfa 0,18 | pehmeä soikio, 0,06 kaakkoon (valo luoteesta) |

- Ei beigeä ja terrakottaa, ei täysiä värejä eikä kiiltoa. Löytämätön ja löydetty samalla paletilla (175, omistaja 21.9.).
- Ääriviiva ja liioiteltu perspektiivi ovat jo valmiina Natiivisepän haarassa ylhaalta-175. Vain kärkivärit ja
  varjostimen valo vaihtuvat.

## 2. Kategoriasymbolit 3D:nä

Kategoriat ovat NOSTOT-paneelin rivit (web js/karttaselite.js KARTTASELITE_JARJESTYS, natiivi Karttaselite), ja
muodot ovat paneelin ja kartan kuvamerkit (assets/nostotyypit/merkki-*.png, minimerkit NOSTOSYM_MINI_LUONNOS)
kolmiulotteisina: paksu kaiverrettu reliefi jalustalla, kuin pöydälle nostettu kuvamerkki.

| Paneelin rivi | Merkki → 3D-muoto | Kolmiot |
|---|---|---|
| Historia | raunioitunut kaari (kaksi pilaria, toinen katkennut, kaarikivet) | 70 |
| Kadonneet ihmeet | tähti, 5 sakaraa, pystyssä matalalla jalustalla | 40 |
| Historian hetket | tiimalasi | 60 |
| Skandaalit | salama, paksu ja pystyssä | 20 |
| Luonto: vuori | kolmiopyramidi, huippu paperinvaalea | 12 |
| Luonto: tulivuori | katkaistu kartio ja kraatteri | 30 |
| Luonto: vesi (meri, joki, järvi, saari) | kaksi aaltoa (kuvamerkin aalto) | 40 |
| Eläimet | tassu, anturat kohollaan | 36 |
| Kulttuuri | kellotorni | 60 |
| Ruoka | malja ja leipä | 50 |
| Kauppa | vaaka | 50 |
| Tekniikka | ratas | 48 |
| Merenkulku | ankkuri | 40 |
| Kaupungit | piste (matala kiekko) | 16 |

- **Koko:** kategoriasymboli on enintään 40 pt (175c). Erikoismalli on 1,5 × kategoriasymboli ja maan suurin.

## 3. Erikoismallit maittain (Eurooppa, 2–3 maata kohden)

Pelin tason 1 nostoista (Pelikoodarin lista, 185 kohdetta) valitaan tunnetuin siluetti. Malli on oma ja
yksinkertainen (≤ 1 500 kolmiota, sama paletti ja reuna) eikä liiku.

| Maa | Erikoismallit (ensimmäinen ensin) |
|---|---|
| Kreikka | Akropolis, Delfoi, Meteora (valmiina) |
| Ranska | Mont-Saint-Michel, Pont du Gard, Carcassonne |
| Iso-Britannia | Stonehenge, Edinburghin linna, Ironbridge |
| Italia | Colosseum, Pisan torni, Vesuvius |
| Espanja | Segovian akvedukti, Córdoban moskeijakatedraali, Santiago de Compostela |
| Saksa | Brandenburgin portti, Kölnin tuomiokirkko, Wartburg |
| Alankomaat | Kinderdijkin myllyt, Afsluitdijk |
| Belgia | Bruggen kellotorni, Menin Gate |
| Sveitsi | Matterhorn, Chillonin linna, Kapellbrücke |
| Itävalta | Hohensalzburg, Großglockner |
| Tšekki | Český Krumlov, Kutná Hora |
| Puola | Malborkin linna, Rysy |
| Unkari | Pannonhalma, Eger |
| Tanska | Kronborg, Jellingin kivet |
| Ruotsi | Visbyn muuri, Kiruna |
| Norja | Nidarosin tuomiokirkko, Preikestolen, Nordkapp |
| Suomi | Olavinlinna, Turun linna |
| Islanti | Geysir, Þingvellir |
| Irlanti | Newgrange, Skellig Michael, Moherin kalliot |
| Portugali | Batalhan luostari, Sintra |
| Kroatia | Pulan areena, Stonin muurit |
| Romania | Branin linna, Peleșin linna |
| Venäjä | Kizhin pogosta, Peterhof, Elbrus |
| Bosnia ja Hertsegovina | Mostarin silta, Višegradin silta |
| Bulgaria | Rilan luostari, Nesebar |
| Slovakia | Spišin linna, Bojnicen linna |
| Slovenia | Bledin saarikirkko, Triglav |
| Viro, Latvia, Liettua | Kuressaaren linna; Rundālen palatsi; Trakain saarilinna |
| Kypros, Malta, Luxemburg | Kourion; Ħaġar Qim, Mdina; Viandenin linna |
| Turkki | Kappadokia, Efesos |

Ensimmäisessä erässä tehdään yksi malli maata kohden (ensimmäinen sarakkeessa) ja myöhemmin loput.

## 4. Yksinkertaistus ja toteutusjärjestys

- **Mallit.** 14 kategoriasymbolia ovat reliefejä (pursotettu kuvamerkin ääriviiva, paksuus 0,15, viistetty reuna).
  Ne tunnistetaan myös ylhäältä, koska ylhäältä näkyy kuvamerkin oma siluetti. Liioiteltu perspektiivi näyttää
  kyljen reunoilla. Ikkunat ja ovet ovat ääriviivaa, eivät verkkoa.
- **Kokeilujärjestys (kuvapari kustakin):** historia (kaari) ja luonto (vuori) ovat yleisimmät (547 ja 294 nostoa)
  → tiimalasi ja tähti → vaaka, ratas ja ankkuri → loput → erikoismallit maa kerrallaan.
- **Työnjako:** Natiiviseppä tekee varjostimen (seepiaramppi, reuna), kategoriasymbolien reliefit ja erikoismallit.
  Linssiseppä tekee vain elävät elementit (liioiteltu perspektiivi on tehty, 8ceb8b97) ja kuvasarjan isona ja
  rajattuna: kohde keskellä, puolivälissä ja reunassa.
