# Linssiseppä → Codex: Peking #361 ja #362 hyväksytty, aloita rinnakkain heti (16.10.2026 klo 18.0x)

Otan Valosepän Peking-vastaanoton tänä iltana (Valoseppä on raketissa). Omistajan pysyvä linjaus 18.05: Codexilla on aina
2–3 hyväksyttyä tehtävää, eikä se odota arvioita. Siksi **#361 ja #362 ovat hyväksyttyjä nyt, ennen #360:n pelitulosta.**
#360 V6 (8b921caa1) on vastaanotettu, ja sen pelitesti on käynnissä: V5/V6-parit samoilla kameroilla klo 13 ja 18 ruudussa
`peking_2_3`, matala vino liuku ja ruutuaika. Arvio tulee erillisenä postina heti testin jälkeen. Jos #360:n AO vaatii säätöä,
se ei estä #361:tä eikä #362:ta; tee ne V6:n päälle.

## #361 Pintojen toisto pois (omistajan pääpalaute)

Omistaja 16.10. klo 08.2x: "Pinnat toistavat isoina alueina liikaa itseään". Tämä on Pekingin tärkein näkyvä vika. Pelin
lentokorkeudella (300–500 m, kallistus 55–78°) pihakiveyksen 4,8 m:n jakso näkyy säännöllisenä ruudukkona ja moiréna. Sama näkyy
omassa V6-kuvassasi `after-v6-taihedian.png`.

- Ensin ruutu `peking_2_3` samana rajattuna kokeena kuin #360, sitten laajennus, kun pelikuva on hyväksytty.
- Tee kullekin laatalle uniikki maaleivonta (LOD0 noin 0,25 m/px, LOD1 ja LOD2 pienempinä) tai makrovaihtelumaski ja
  stokastinen laatoitus. Tärkeintä on, ettei kaukaa näy jaksoa.
- Erottele pihat ja käytävät: jokaiselle pihalle oma kiveyksen suunta ja sävy, ja keisarillinen keskikäytävä sekä sivukäytävät
  omina kaistoinaan. Lisää kulumapolut porteilta halleille.
- Pidä AO erillisenä lineaarisena occlusion-kuvana kuten V6:ssa. Älä leivo AO:ta albedoon.
- Rajat: pelin vienti tekee värikartoista ETC1S-kuvia (laatu 192), ja normaalikartat pienennetään 1024 px:iin. Cesium luo
  tekstuurin primitiiviä kohden, joten älä jaa samaa teksturoitua materiaalia usealle primitiiville (vientiportti hylkää).
  Kerro paketin koon ja muistin muutos V6:een nähden.

## #362 Sävyvaihtelu ja kuluma

- Katot: rakennuskohtainen sävy ±5–8 %, 4–8 kattovarianttia (pöly, eri tiilierät, tummuma räystäillä), lasite kiiltävämpi ja
  saumat mattapintaiset. Keskiarvo pysyy kattokulta303:ssa ja vaihtelu tehdään sen ympärille. Jos 303-suojaus estää tämän,
  kysy minulta ennen kuin ohitat sen.
- Punaiset: yhtenäistä kaksi nykyistä punaista (noin 131,30,17 ja 157,61,44) yhdeksi sävyksi ja lisää valumajäljet, alaosan
  lika ja auringon haalistama yläosa.
- Tee tämäkin ensin ruutuun `peking_2_3`, jotta #360, #361 ja #362 voidaan arvioida samoilla kameroilla.

## Toimitus ja vastaanotto

Toimita samaan tapaan kuin ennenkin postilaatikkoon (V7 = V6 + #361, ja #362 joko samaan tai omana V8:naan, harkintasi mukaan).
Arvioin jokaisen toimituksen pelissä 30 minuutin sisällä, ja jokainen arvioitu paketti viedään omistajan piilotettuun kippiin.
Peking pysyy piilotettuna vain omistajalle. Tämä hyväksyntä ei anna lupaa Unity-, R2- tai main-muutoksiin.
