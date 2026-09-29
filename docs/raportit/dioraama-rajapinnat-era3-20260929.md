# Dioraaman rajapinnat, erä 3: linna auki (Linnanrakentaja 29.9.2026)

Pohja: `dioraama-rajapinnat-20260929.md` (koordinaatisto, reseptit, kamera), `…-era2-…` (äänet, media) ja
`…-era2b-…` (valot, pinnat, 3D-hahmot, kierto). Tämä speksi lisää 7 uutta tilaa, uudet reseptit ja henkilöt,
kiertueen ja massan yksityiskohdat. Tyyli pysyy: Codexin pinnat (B), tumma yleisvalo, tulisijat, kynttilät,
soihdut ja ikkunakeilat tekevät tunnelman. Hahmot ovat 3D-pienoisfiguureja. Mikään kulma ei paljasta pahvia.

Faktat ja nimet: Sisältökirjurin `sisaltokirjuri-olavinlinna-faktantarkistus-20260929.md` (kohta E) ja erä 3:n
tilaus (`sisaltokirjuri-olavinlinna-era3-20260929.md`, tulossa). Kunnes faktat ovat tarkistettu, tilojen taulut ovat
`tila: 'luonnos'` eikä niissä ole `aani`-kenttiä (kesto arvioidaan tekstistä).

## 0. Koordinaatisto ja asettelu (sitova)

Metrit, +X itä, +Y ylös, +Z etelä, pihan lattia y = 0, vesi y = −7. Atsimuutti = kameran suunta kohteesta
(180 = etelä). Tornit n1500 (nimet tarkistuksessa; geometria ei riipu nimistä):

| Torni | paikka | sade / paksuus / korkeus | auki (kompassiasteet) | Sisältö |
|---|---|---|---|---|
| Kellotorni (luode) | [−30, 0, −20] | 7,5 / 2 / 28 | 95…235 | y 0…4,5 `fatabuuri`, y 4,5…18 `kierreportaat`, ylin kerros massassa |
| Kirkkotorni (pohjoinen, Kellotornin itäpuolella) | [0, 0, −20] | 7 / 2 / 32 | 100…230 | 1.–2. krs massassa, y 9…13,5 `kappeli`, ylemmät massassa |
| Pyhän Eerikin torni | [32, 0, −4] | 7,5 / 2 / 28 | ei auki | massa (todellisuudessa etelässä; dioraama tiivistää) |

Sisältökirjuri 29.9.: päälinna saaren länsipäässä, Kellotorni luoteessa ja Kirkkotorni sen itäpuolella, Keskushalli
pohjoissiivessä tornien välissä (alakerta väentupa, yläkerta voudin asunto), Kirkkotornin pohjakerroksesta ovi tupaan.
Portti ja laituri etelä-/lounaispuolella (tulkinta).

Tilat (rajat = AABB, sisältää lattian ja kaiken tilan geometrian; kamerat eivät saa olla rajojen sisällä):

| id | nimi (lappu) | rajat min → max | Kuvaus |
|---|---|---|---|
| `laituri` | Laituri | [−27, −7.5, 33] → [−11, −3, 47] | kavassisatama: lankkulaituri paaluilla (kansi y −6,2), vene kiinni itäkyljessä, tavaraa |
| `vartiotupa` | Vartiotupa | [−32, 0, 5] → [−22, 3.6, 12.5] | portinvartijat (tulkinta); eteläseinä poistettu kuten keittiössä, itäseinässä ovi porttikäytävään |
| `fatabuuri` | Fatabuuri | [−35.5, 0, −25.5] → [−24.5, 4.5, −14.5] | Kellotornin pohjakerros (sisäsäde 5,5), holvattu varasto |
| `kierreportaat` | Kierreportaat | [−35.5, 4.5, −25.5] → [−24.5, 18, −14.5] | Kellotornin 2.–4. krs: kierreportaat seinän vierellä (tulkinta), avoin kuilu, välitasanteet |
| `muurinharja` | Muurinharja | [−22, 13, −22] → [−7.5, 16, −18] | pohjoismuurin (korkeus 13) puolustuskäytävä tornien välissä, lankkukansi, sakarat pohjoisreunalla |
| `kappeli` | Kappeli | [−5, 9, −25] → [5, 13.5, −15] | Kirkkotornin 3. krs: alttari, 12 vihkimisristiä, holvikatto, hagioskooppiaukko |
| `keskushalli` | Keskushalli | [−22, 0, −18.5] → [−7.5, 5, −9] | väentupa tornien välissä, eteläseinä poistettu, katto porrastettu taaemmas |
| `keittio` | Keittiö | [8, 0, 4] → [20, 4, 11] | ennallaan |

Massa muuttuu (Linnanrakentaja tekee itse, `olavinlinna/massa.js`):
- Kellotorni siirtyy luoteeseen pohjoismuurin linjalle; länsivarasto poistuu (peitti fatabuurin kameran).
- Pohjoismuuri korkeus 13 (Savon historia: kehämuurit 13 m): tornien välinen osa x −22,5…−7, itäosa x 7…32.
  Länsimuuri x = −34, z −13,7…14. Itämuuri z −20…−11,5 ja 3,5…14 (Eerikin torni välissä).
- Eteläseinään aukko vartiotuvan kohdalle (x −32…−22) ja portti (aukko, leveys 3, korkeus 3,2) x −19,5:ssä.
- Kellotornin ja Kirkkotornin auki-sektorit; muiden kerrosten lattiat `kiekko`-reseptillä, vähäinen rekvisiitta.
- Keskushallin yläkerta (voudin asunto) ja pulpettikatto muuria vasten, porrastettu taaemmas (z −18,5…−14).
- Itäsiipi (Kuninkaansali, ikkunat pienelle linnanpihalle, keittiön lämpö) x 10…24, z −14…−2.
- Sakarat (`sakarat`) muurien ulkoreunoille. Portaat laiturilta portille (massan `porras`).
- Kolmiobudjetti: massa ≤ 90 k.

Kiertue (RAKENNUS.kiertue, kohta 5): `laituri → vartiotupa → fatabuuri → kierreportaat → muurinharja → kappeli →
keskushalli → keittio`.

## 1. Tilatiedostot ja omistus

`js/dioraama/rakennukset/olavinlinna.js` kokoaa rakennuksen. Tilat omissa tiedostoissaan
`js/dioraama/rakennukset/olavinlinna/<id>.js`, kukin `export const TILA = { … }` (+ tarvittaessa omat vakiot).
Yksi agentti = yksi tilatiedosto. Tila noudattaa keittiön mallia (`olavinlinna/keittio.js`):

- `id, nimi, kohdistettava: true, rajat, naapurit` (aina `'massa'` + fyysiset naapurit; molemminsuuntaiset, kokoaja
  korjaa), `kamera` + `kameraPysty` (+ valinnainen `kierto`, era2b kohta 1; torneissa atsimuutti [−40, 40]),
  `pulu { laskeutuminen (rajojen sisällä), taulupuoli }`, `taulu` (3 kohtaa ≤ 110 merkkiä, `tila: 'luonnos'`, ei
  `aani`), `valot` (tunnelma: 1 lämmin päälähde + 0–2 pienempää; ikkunakeila jos ikkuna), `palikat`, `hahmot`
  (1–3), `aanet` (vain AANET-pankin olemassa olevia id:itä tai tyhjä), `tehosteet`, `liekit` (tulisija/kynttila/
  soihtu), `kasikirjoitus` (pulu-lenna, taulu, kohta 0, repliikki, reaktio, kohta 1, repliikki, kohta 2).
- Repliikit ja Pulun reaktiot luonnoksena ilman `aani`-kenttää. Repliikki ≤ 90 merkkiä, aikalaisuuteen sopiva,
  ei [softly]/[whispers]. Pulu on nykyajan lintu, joka tietää enemmän kuin 1500-luvun väki (keittiön malli).
- **Kolmiobudjetti per tila ≤ 30 k** (rakenna.mjs tulostaa). Rekvisiitta tiheänä mutta pienin segmenttimäärin.
- Tarkistus ennen luovutusta: `node --test tests/dioraama-*.test.mjs` 0 fail, `node tools/dioraama/rakenna.mjs
  olavinlinna --ulos <scratch>` ilman virheitä, esikatselukuva tilasta (`node tools/dioraama/esikatselu-kuvat.mjs`).

## 2. Uudet reseptit (tools/dioraama/reseptit-linna.mjs ja reseptit-kalusteet2.mjs)

Paikallinen kehys (u, y, w) kuten ennen; `suunta` kiertää. Roolit ja OLETUSPINNAT kuten muissa. Kaikki lisätään
`reseptit.mjs`:n kokoajaan ja `tests/dioraama-data.test.mjs`:n RESEPTIT-listaan.

**Rakenne (reseptit-linna.mjs):**
- `kiekko { sade, paksuus = 0.3, segmentit = 32, auki?: {alku, loppu} }`: pyöreä lattia/katto, y −paksuus…0.
  Roolit yla, ala, sivu (auki-reunat 'leikkaus'). Oletus yla 'lankku', ala 'rappaus', sivu 'leikkaus'.
- `kierreportaat { sadeSisa, sadeUlko, korkeus, askelmat, alkukulma = 0, kierto = 1 (1 = myötäpäivään ylhäältä) }`:
  askelmat nousevat kulmaa pitkin, jokainen askel kiilamainen laatikko alapinnasta lattiaan asti (ei leijuvia).
  Rooli 'askel' (oletus 'kivi'). Lisäksi `kierrePiste(param, s01) → [u, y, w]` exportattuna (kävelyreitin pisteet).
- `sakarat { pituus, korkeus = 0.9, leveys = 0.8, vali = 0.7, paksuus = 0.6 }`: hammasrivi u-akselilla,
  y 0…korkeus. Rooli 'kivi'. Päät tasan pituuden sisällä.
- `paalu { sade = 0.15, korkeus }` (puu), `laiturikansi { leveys, pituus, paksuus = 0.12 }` (lankut u-suunnassa, osa per lankku).
- `vene { pituus = 5, leveys = 1.5, korkeus = 0.6 }`: soutuvene (kaareva kylki segmenteittäin, 2 tuhtoa, airot
  vierellä), roolit 'runko' (puu), 'sisa' (lankku). ≤ 1 200 kolmiota.
- `lippu { korkeus = 3, leveys = 1.2, lippu = 0.8 }`: salko + lippukangas (pinta 'lippu', kangas, punainen #8a2e20).
- `rako { leveys = 0.2, korkeus = 1.0 }`: ampumarako/ikkunarako ohuena tummana levynä pinnan eteen (pinta 'aukko' #1c1611).
- `kupoli { sade, korkeus, segmentit = 24, auki?: {alku, loppu} }`: pyöreän huoneen holvi (sisäpinta näkyy alta,
  y 0…korkeus, reunat 'leikkaus'); rooli 'holvi' (oletus 'rappaus'), ulkopinta 'ulko' (kivi).

**Kalusteet ja rekvisiitta (reseptit-kalusteet2.mjs):** `alttari`, `vihkimisristi` (seinään, punamulta),
`kirkonpenkki`, `kynttilakruunu` (+ .valo kuten kynttilänjalalla), `seinasoihtu` (+ .valo), `arkku`, `keihasteline`
(3–4 keihästä), `kilpi` (seinälle), `hakapyssy` (tukijalalla), `ruutitynnyri`, `pelilauta` (+ nopat), `pulpetti`
(kirjoituspulpetti + kirja), `kirja`, `koysikieppi`, `airot`, `verkko` (kuivumassa telineellä), `kello` (pieni
kirkonkello orressa), `jalkajousi` (seinätelineessä), `nuolitynnyri`. Jokainen ≤ 600 kolmiota. Uudet pinnat PINNAT-pankkiin: `punamulta`, `kulta`, `aukko`,
`lippu`, `olki` (kuvio 'olki').

## 3. Uudet henkilöt (js/dioraama/pankit/henkilot.js + tools/dioraama/hahmot3d.mjs)

hahmot3d.mjs:iin uudet `paahine`: `'kypara'` (metallinen kattilakypärä lierillä), `'hattu'` (leveälierinen huopa),
`'huppu'`, `'lakki'` (papin musta lakki); uusi vaatelippu `kaapu: true` (nilkkapituinen kaapu, pinta 'vaate', peittää
housut); uudet `esine`: `'keihas'` (2,2 m, pystyssä oikeassa kädessä), `'kirja'`, `'airo'`, `'avaimet'`, `'lyhty'`.
Henkilöt (malli3d, ei atlasta; `maalattu` puuttuu = paikkamerkkiatlas varalle):
`vartija-1500` (kypärä, keihäs), `vartija2-1500` (kypärä, ei esinettä), `kirjuri-1500` (hattu, kirja),
`renki-1500` (huppu, kanto), `pappi-1500` (kaapu, lakki, kirja), `vouti-1500` (hattu, avaimet),
`palvelija-1500` (huivi, esiliina), `soutaja-1500` (paljas, airo), `lahetti-1500` (huppu, lyhty).
Liikkeet: nykyiset (idle, tyo, kavely, kanto, puhe) riittävät erässä 3.

## 4. Äänet (Pelikoodarin tilaus, erillinen)

Silmukat ja kertaäänet tiloittain (ElevenLabs SFX, CC0 oma tuotanto): laituri (laineet laituria vasten, airot,
köysi), vartiotupa (hiljainen tuli, noppien kalina, keihään kolahdus), fatabuuri (tippuva vesi, puinen kansi,
säkin laskeminen), muurinharja (kova tuuli, lippu, kaukaiset lokit), kierreportaat (kaikuvat askeleet),
kappeli (hiljainen kaiku, kynttilän rätinä, kaukainen laulu), keskushalli (puheensorina, tuli, pikarit).
Puhe (repliikit, reaktiot, taulut) vasta kun Sisältökirjuri on tarkistanut tekstit.

## 5. Kiertue (data + JS + C#, pariteetti)

- `RAKENNUS.kiertue: [tilaId, …]` (vain kohdistettavia).
- `seuraavaKiertueella(rakennus, tilaId) → tilaId | null`: null/"massa" → ensimmäinen; viimeinen → null (yleisnäkymä).
  JS `js/dioraama/ohjaaja.js`, C# `Ohjaaja.SeuraavaKiertueella`, samat testivektorit.
- Natiivi: kun tilan käsikirjoitus on lopussa (taulu jää näkyviin), napautus taulua → `Kohdista(seuraava)`; lopussa
  yleisnäkymä. Yleisnäkymässä linnan taulun jälkeen napautus → kiertueen ensimmäinen tila. Taulun alareunaan pieni
  teksti "Seuraavaksi: <nimi> ›" (UI kevyt, ei nappia).

## 6. Budjetti ja mittaus

Kolmiot: massa ≤ 90 k, tila ≤ 30 k, yhteensä ≤ 330 k (+ hahmot ≤ 20 × 2,5 k). Tekstuurimuisti ei kasva (samat
pinnat). Mittaus `poikki mittaus` iPhonella ja iPadilla; jos yli, tilojen pienrekvisiitta piilotetaan
kohdistamattomista tiloista (erä 3b).

## 7. Erä 3b (myöhemmin)

Linna aukeaa (seinäkannet), ympäristön elämä (savu, liput, lokit, veneet, vesi), puheäänet, Codexin uudet pinnat
(kappelin maalaukset, laiturin puu), liikkeet (istuu, soutaa, rukoilee).
