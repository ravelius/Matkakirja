# 3D-nostot: paletti, kategoriasymbolit 3D:nä ja erikoismallit (luonnos omistajan korttiin)

*Linssiseppä ja Natiiviseppä 26.9.2026 klo 21.5x Fablen tilauksesta (omistaja 21.4x). Yhteinen esitys; Natiivisepän
tausta on tiedostossa proto-3d/lokit/ylhaalta-175/animaatioehdotus-1027.md. Ei koodia ennen omistajan korttia.*

**Omistajan korjaus 21.5x (sitova):** 3D-nostot ovat NOSTOT-paneelin kategoriasymbolit 3D:nä, samat joka maassa, ja
lisäksi muutama erikoismalli maata kohden suurimpina. Rakennusarkkityyppejä ei käytetä. Paletti ja animaatiologiikka
pysyvät (hyväksytty 21.4x, d88a88d22). Alla kohdat 2 ja 3 on kirjoitettu tämän mukaan uudelleen.

**Omistajan linja 21.4x:**
- 3D-nostot 2D-kuvamerkkien (seepiakaiverrus) tai nähtävyyskartan kohteiden sävyisiksi.
- Kaikki arkkityypit animoidaan Tivolin logiikalla: elävä kerros, ei monotoniaa.
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
| Aksentti | lajin `--sym-*`-väri hillittynä | **vain animoidussa osassa** (valo, liekki, lippu, viiri), enintään 10 % alasta |
| Maavarjo | muste alfa 0,18 | pehmeä soikio, 0,06 kaakkoon (valo luoteesta) |

- Ei beigeä ja terrakottaa, ei täysiä värejä eikä kiiltoa. Löytämätön ja löydetty samalla paletilla (175, omistaja 21.9.).
- Ääriviiva ja liioiteltu perspektiivi ovat jo valmiina Natiivisepän haarassa ylhaalta-175. Vain kärkivärit ja
  varjostimen valo vaihtuvat.

## 2. Animaatiotaulukko (Tivolin logiikka)

**Yhteiset säännöt, jotka ovat samat kuin elävillä elementeillä (säännöt 1–8):**
- Liike on hidasta, ja liikkuva osa on enintään kolmannes mallista. Runko on paikallaan.
- Jokaisella nostolla on oma siemenellä toistettava aikataulu (Ydin/Elava/Vaihtelu): käynti vuorottelee tauon kanssa,
  hidastus kestää 3 s ja kiihdytys 4 s.
- Liike näkyy vain maa- ja kaupunkinäkymässä, kun malli on ruudulla. Vähennetty liike pysäyttää kaiken, ja levossa
  piirretään 0 kehystä.
- **Ruudulla liikkuu yhtä aikaa enintään 3 nostoa.** Muut ovat tauolla, ja ensimmäisenä liikkuu keskustaa lähinnä
  oleva. Näin koko kartta ei vilise, vaikka kaikilla on animaatio.
- Animaation lisäkolmiot ovat enintään 60 mallia kohden. Kerroksen budjetti on ≤ 0,5 ms (iPhone, 30 fps, lämpö
  10 min kuten 161). Tauot ovat 20–60 s, joten usein kaikki seisovat ja kerros lepää.
- Animaatio vain 3D-kynnyksen yllä (kerroin ≥ 2,5). Kaukana näkyy 2D-kuvamerkki, joka ei animoidu.

Kategoriat ovat NOSTOT-paneelin rivit (web js/karttaselite.js KARTTASELITE_JARJESTYS, natiivi Karttaselite), ja
muodot ovat paneelin ja kartan kuvamerkit (assets/nostotyypit/merkki-*.png, minimerkit NOSTOSYM_MINI_LUONNOS)
kolmiulotteisina: paksu kaiverrettu reliefi jalustalla, kuin pöydälle nostettu kuvamerkki.

| Paneelin rivi | Merkki → 3D-muoto | Mitä liikkuu | Käynti / tauko | Kolmiot (+ liike) |
|---|---|---|---|---|
| Historia | raunioitunut kaari (kaksi pilaria, toinen katkennut, kaarikivet) | kyyhky laskeutuu kaaren laelle, istuu 10–30 s ja lähtee | 1 käynti / 60–120 s | 70 (+10) |
| Kadonneet ihmeet | tähti, 5 sakaraa, pystyssä matalalla jalustalla | tähti kiertyy hitaasti pystyakselinsa ympäri (12 s/kierros); aksentti vanha kulta `--sym-ihme` | 40–90 s / 30–60 s | 40 |
| Historian hetket | tiimalasi | hiekka valuu (yläkartio pienenee, keko kasvaa); tyhjänä lasi kääntyy 1,5 s:ssa | valuu 30–50 s, tauko 10–30 s | 60 (+16) |
| Skandaalit | salama, paksu ja pystyssä | keinuu hitaasti ±8° (4 s), välillä pehmeä nytkähdys (ei välähdystä, sääntö 2) | 20–60 s / 30–90 s | 20 |
| Luonto: vuori | kolmiopyramidi, huippu paperinvaalea | pilvi liukuu huipun ohi ja häipyy | 1 pilvi / 40–90 s | 12 (+24) |
| Luonto: tulivuori | katkaistu kartio ja kraatteri | savupallot nousevat hitaasti ja kaartuvat tuulessa | 30–90 s / 20–60 s | 30 (+24) |
| Luonto: vesi (meri, joki, järvi, saari) | kaksi aaltoa (kuvamerkin aalto) | aallot liukuvat ja keinuvat (3 s) | 60–180 s / 20–40 s | 40 |
| Eläimet | tassu, anturat kohollaan | tassu astuu kolme askelta (nousee ja laskee), sitten lepää | 1 askelsarja / 40–90 s | 36 |
| Kulttuuri | kellotorni | kello heilahtaa kolme kertaa | 1 soitto / 60–150 s | 60 (+12) |
| Ruoka | malja ja leipä | maljasta nousee kaksi pientä höyrykiehkuraa | 30–60 s / 30–90 s | 50 (+16) |
| Kauppa | vaaka | kupit keinuvat tasapainoon (vaimeneva heilahdus 6 s) | 1 punnitus / 40–120 s | 50 (+12) |
| Tekniikka | ratas | ratas pyörii 8 s/kierros puuskittain | 60–180 s / 25–70 s | 48 |
| Merenkulku | ankkuri | ankkuri keinuu kuin aallossa (±6°, 5 s) | 60–180 s / 20–60 s | 40 |
| Kaupungit | piste (matala kiekko) | ei liikettä: kaupungilla on oma elävä elementti (myllyt, karuselli, ilmapallo…) | – | 16 |

- **Koko:** kategoriasymboli on enintään 40 pt (175c). Erikoismalli on 1,5 × kategoriasymboli ja maan suurin.
- **Liikkuva osa** (kyyhky, tiimalasin hiekka, kello, vaa'an kupit, pilvi, savu) on oma kappale, jolla on pivot.
  Kokonaan liikkuvissa (tähti, salama, ratas, ankkuri, tassu) liikkuu symboli ja jalusta pysyy.

## 3. Erikoismallit maittain (Eurooppa, 2–3 maata kohden)

Pelin tason 1 nostoista (Pelikoodarin lista, 185 kohdetta) valitaan tunnetuin siluetti. Malli on oma ja
yksinkertainen (≤ 1 500 kolmiota, sama paletti ja reuna). Animaatio on kategorian mukainen, tai oma, jos se on merkitty
tähdellä (*).

| Maa | Erikoismallit (ensimmäinen ensin) |
|---|---|
| Kreikka | Akropolis, Delfoi, Meteora* (nostokori) — valmiina |
| Ranska | Mont-Saint-Michel, Pont du Gard, Carcassonne |
| Iso-Britannia | Stonehenge, Edinburghin linna, Ironbridge |
| Italia | Colosseum, Pisan torni, Vesuvius* (savu) |
| Espanja | Segovian akvedukti, Córdoban moskeijakatedraali, Santiago de Compostela |
| Saksa | Brandenburgin portti, Kölnin tuomiokirkko, Wartburg |
| Alankomaat | Kinderdijkin myllyt* (siivet), Afsluitdijk |
| Belgia | Bruggen kellotorni* (kello), Menin Gate |
| Sveitsi | Matterhorn* (pilvi), Chillonin linna, Kapellbrücke |
| Itävalta | Hohensalzburg, Großglockner |
| Tšekki | Český Krumlov, Kutná Hora |
| Puola | Malborkin linna, Rysy |
| Unkari | Pannonhalma, Eger |
| Tanska | Kronborg, Jellingin kivet |
| Ruotsi | Visbyn muuri, Kiruna |
| Norja | Nidarosin tuomiokirkko, Preikestolen, Nordkapp |
| Suomi | Olavinlinna, Turun linna |
| Islanti | Geysir* (purkaus höyrynä), Þingvellir |
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
| Turkki | Kappadokia* (kuumailmapallo nousee), Efesos |

Ensimmäisessä erässä tehdään yksi malli maata kohden (ensimmäinen sarakkeessa) ja myöhemmin loput.

## 4. Yksinkertaistus ja toteutusjärjestys

- **Mallit.** 14 kategoriasymbolia ovat reliefejä (pursotettu kuvamerkin ääriviiva, paksuus 0,15, viistetty reuna).
  Ne tunnistetaan myös ylhäältä, koska ylhäältä näkyy kuvamerkin oma siluetti. Liioiteltu perspektiivi näyttää
  kyljen reunoilla. Ikkunat ja ovet ovat ääriviivaa, eivät verkkoa.
- **Liikkuva osa** on oma pieni kappale (pivot valmiina), kuten elävissä elementeissä. Taso 1 animoidaan
  transformeilla heti. Tasot 2–3 (GPU-instanssit) animoidaan toisessa vaiheessa kärkivarjostimella
  instanssikohtaisella vaiheella (_Tila.z), ilman luurankoa.
- **Kokeilujärjestys (yksi kuvapari ja video kukin):** historia (kaari) ja luonto (vuori) ovat yleisimmät (547 ja 294
  nostoa) → tiimalasi ja tähti → vaaka, ratas ja ankkuri → loput → erikoismallit maa kerrallaan.
- **Työnjako (sovittu):**
  - Natiiviseppä: varjostin (seepiaramppi, reuna), instanssianimaatio, kategoriasymbolien reliefit ja erikoismallit.
  - Linssiseppä: Vaihtelu-aikataulut, elävän kerroksen kytkentä ja 3 samanaikaisen liikkeen koordinaattori. Liioiteltu
    perspektiivi eläviin elementteihin on jo tehty (8ceb8b97).
  - Kuvasarja isona ja rajattuna: kohde keskellä, puolivälissä ja reunassa.
