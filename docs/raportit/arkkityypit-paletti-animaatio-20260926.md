# 3D-nostot: paletti ja animaatiotaulukko 16 arkkityypille (luonnos omistajan korttiin)

*Linssiseppä ja Natiiviseppä 26.9.2026 klo 21.5x Fablen tilauksesta (omistaja 21.4x). Yhteinen esitys; Natiivisepän
tausta on tiedostossa proto-3d/lokit/ylhaalta-175/animaatioehdotus-1027.md. Ei koodia ennen omistajan korttia.*

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

| # | Arkkityyppi | Aksentti (animoidussa osassa) | Mitä liikkuu (yksinkertaisin muoto) | Käynti / tauko | Kolmiot LOD0 nyt → tavoite (+ liike) |
|---|---|---|---|---|---|
| 1 | Mylly | historia #a05c3f | siivet pyörivät 7–9 s/kierros, puuskat ±35 % | 60–180 s / 25–70 s | 164 → 120 (+40) |
| 2 | Majakka | merenkulku #34566d | lyhdyn kapea valokeila (valaisematon sektori) kiertää 6 s/kierros | 90–240 s / 20–40 s | 195 → 110 (+16) |
| 3 | Satama | merenkulku #34566d | pieni vene lähtee laiturista, kaartaa ja palaa (20 s), keinuu 3 s | matka 20 s / odotus 30–90 s | 134 → 100 (+30) |
| 4 | Kirkko | sana #47597f | tornin kello heilahtaa kolme kertaa (3 × 1,6 s) | 1 soitto / 60–150 s | 116 → 90 (+12) |
| 5 | Linna | historia #a05c3f | tornin viiri lepattaa puuskittain (taipuu 2 s:n jaksolla) | 40–120 s / 15–40 s | 315 → 150 (+8) |
| 6 | Silta | kaupunki #8a6d4a | vene alittaa sillan (18 s) | 1 ylitys / 40–120 s | 222 → 110 (+20) |
| 7 | Temppeli | historia #a05c3f | alttarilta nousee kolme savupalloa hitaasti ja häipyy | 30–90 s / 20–60 s | 382 → 160 (+24) |
| 8 | Luola | luonto #4f7d6f | kolme lepakkoa lentää suulta kaaren ja palaa (8 s) | 1 lento / 60–150 s | 161 → 90 (+12) |
| 9 | Muistomerkki | historia #a05c3f | kyyhky laskeutuu huipulle, istuu 10–30 s ja lähtee | 1 käynti / 60–120 s | 110 → 70 (+10) |
| 10 | Raunio | historia #a05c3f | kaksi lintua kiertää raunion yllä (kaari 10 s) | 20–60 s / 40–120 s | 252 → 120 (+12) |
| 11 | Kaupunkitalo | kaupunki #8a6d4a | savupiipusta 2–3 savupalloa puuskittain | 40–120 s / 20–60 s | 128 → 90 (+16) |
| 12 | Vuori | luonto-vuori #8a6849 | pilvi liukuu huipun ohi (30 s) ja häipyy | 1 pilvi / 40–90 s | 157 → 90 (+24) |
| 13 | Meteora | historia #a05c3f | luostarin nostokori nousee köydellä kalliolle (12 s) ja laskee | 1 nosto / 30–90 s | erikoismalli ≤ 1 500 (+20) |
| 14 | Merkkikivi | kaupunki #8a6d4a | lintu istahtaa kiven päälle ja lähtee | 1 käynti / 60–150 s | 92 → 50 (+10) |
| 15 | Luostari | sana #47597f | kellotapulin kello heilahtaa, hitaampi ja harvempi kuin kirkossa (2 × 2,2 s) | 1 soitto / 90–200 s | 122 → 90 (+12) |
| 16 | Kaupunginmuuri | kaupunki #8a6d4a | vartija kulkee muurin päällä edestakaisin (20 s), pysähtyy portilla | 20 s / 20–60 s | 258 → 120 (+10) |

## 3. Yksinkertaistus ja toteutusjärjestys

- **Mallit.** Pohjapiirros tunnistetaan ylhäältä (Natiivisepän ylhaalta-175, A–E). Sivuja on 6–8, ei hampaita eikä
  ikkunoita LOD0:ssa. Ikkunat ja ovet ovat ääriviivaa, eivät verkkoa.
- **Liikkuva osa** on oma pieni kappale (pivot valmiina), kuten elävissä elementeissä. Taso 1 animoidaan
  transformeilla heti. Tasot 2–3 (GPU-instanssit) animoidaan toisessa vaiheessa kärkivarjostimella
  instanssikohtaisella vaiheella (_Tila.z), ilman luurankoa.
- **Kokeilujärjestys (yksi kuvapari ja video kukin):** mylly ja majakka (jatkoa myllyille) → kirkko ja linna → satama
  ja silta → loput erinä à 4.
- **Työnjako (sovittu):**
  - Natiiviseppä: varjostin (seepiaramppi, reuna), instanssianimaatio ja arkkityyppien yksinkertaistus.
  - Linssiseppä: Vaihtelu-aikataulut, elävän kerroksen kytkentä ja 3 samanaikaisen liikkeen koordinaattori. Liioiteltu
    perspektiivi eläviin elementteihin on jo tehty (8ceb8b97).
  - Kuvasarja isona ja rajattuna: kohde keskellä, puolivälissä ja reunassa.
