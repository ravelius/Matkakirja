# 1.0.27: arkkityyppien sävy, animaatio ja yksinkertaistus (Natiiviseppä 26.9.2026 klo 21.5x, ehdotus ennen koodia)

Omistajan linjaus 21.4x: (1) sävy 2D-kuvamerkkien seepiakaiverruksen mukaan, (2) jokainen arkkityyppi elää Tivolin logiikalla
(käynti ja tauko, Vaihtelu-siemen, ei monotoniaa), (3) mallit mahdollisimman yksinkertaisia, (4) liioiteltu perspektiivi
(LiioiteltuPerspektiivi.Kallistus, yhteinen Linssisepän kanssa).

## Sävy
Yksi seepiarampin varjostin kaikille (kuvamerkkien merkki-*.png-paletista mitattuna): kärkiväri → valoisuus → ramppi
paperi (#efe4cc) … seepia (#8a6a44) … muste (#3b2f22); kaiverrusreuna 1,2 pt musteella (inverted hull, näkyy myös ylhäältä);
yksi aksenttiväri vain animoidussa osassa (valo, liekki, lippu) hillittynä. Ei beigeä + terrakottaa.

## Animaatio (elävä kerros 161-B: vain animoidut osat piirretään 30 fps talletetun kartan päälle; levossa 0 kehystä, kun
kaikki ovat tauolla; tasot 2–3 kärkivarjostimessa instanssikohtaisella vaiheella, ei luurankoa)

| Arkkityyppi | Animaatio (käynti / tauko) | Kolmiot LOD0 → tavoite |
|---|---|---|
| Mylly | siivet pyörivät puuskissa, välillä seis (kuten Zaanse Schans) | 164 → 120 |
| Majakka | valokeila kiertää (additiivinen kiila), tauko päivällä | 195 → 110 |
| Satama | laiva keinuu (±4°, 6 s), lippu mastossa | 134 → 100 |
| Kirkko | kello heilahtaa tornissa (12 s:n välein 3 lyöntiä) | 116 → 90 |
| Luostari | kellotapuli kuten kirkko, savu piipusta | 122 → 90 |
| Linna | viiri liehuu tornissa (Lipputangon kangasvarjostin) | 315 → 150 |
| Kaupunginmuuri | portin viiri liehuu | 258 → 120 |
| Kaupunkitalo | savu piipuista (2–3 hiukkaskiekkoa, hidas nousu) | 128 → 90 |
| Silta | vesi virtaa kaarien alla (uv-liuku), vene alittaa välillä | 222 → 110 |
| Temppeli | pylväiden varjo kiertää auringon mukana (hidas), soihtu | 382 → 160 |
| Raunio | varjo kiertää, pöly-/lehtipyörre välillä | 252 → 120 |
| Muistomerkki | lippu tai seppele heilahtaa tuulessa | 110 → 70 |
| Luola | lepakot lehahtavat suulta (3 pistettä, harvoin) | 161 → 90 |
| Vuori | pilvi liukuu huipun ohi (liukuva kiekko) | 157 → 90 |
| Merkkikivi | lintu laskeutuu ja lähtee (harvoin) | 92 → 50 |
| Erikoismallit (Akropolis, Delfoi, Meteora) | kuten laji (temppeli, temppeli, luostari) | ennallaan ≤ 1 500 |

## Budjetti ja tarkistus
- Elävä kerros enintään 0,5 ms/kehys iPhonella, lämpö 10 min kuten 161; Vaihtelu-tauot 20–60 s, joten usein kaikki seisovat → lepo.
- Kynnykset ennallaan (kerroin ≥ 2,5); kaukana 2D-kuvamerkki ei animoidu.
- Työnjako: Natiiviseppä (varjostin, instanssianimaatio, arkkityyppien yksinkertaistus), Linssiseppä (Vaihtelu-aikataulut, elävän
  kerroksen kytkentä, liioiteltu perspektiivi elävissä elementeissä), kuvasarja isona rajattuna keskellä/puolivälissä/reunassa.
