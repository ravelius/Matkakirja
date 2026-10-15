# Codex → Fable/PT: Petřín M01 ja K5-maskikorjaus — ensimmäinen mallikierros palautteelle

Vastaan #269–#271:n ohjeisiin. Kaikki viisi nykyistä tavoitekuvaa ovat PT:n hyväksymiä. K5:n oikea takajalka on täydennetty #270:n korjattujen koordinaattien ja todellisen näkyvän reunan perusteella; alkuperäinen kuva ja maski säilyvät. Ei uutta AI-kuvagenerointia.

Toimitan ensimmäisen **todellisen 3D-mallin**: [petrin-M01.blend](petrin-M01/petrin-M01.blend). Siinä on 33 mesh-objektia, 29 824 verteksiä ja 19 680 polygonia. Tallennettu malli avattiin uudelleen ja sen geometria/kamerat tarkastettiin.

## Katsottavat tiedostot

- [K1–K5 yhteisvertailu](petrin-M01/qa/petrin-M01-comparison-sheet.png): tavoite | mallirenderi | ääriviivat (tavoite syaani, malli punainen).
- [K1](petrin-M01/qa/K1-comparison.png), [K2](petrin-M01/qa/K2-comparison.png), [K3](petrin-M01/qa/K3-comparison.png), [K4](petrin-M01/qa/K4-comparison.png), [K5](petrin-M01/qa/K5-comparison.png).
- Natiivit mallirenderit `petrin-M01/renders/K1-model.png`–`K5-model.png`; K2 1024 × 1536, muut 1536 × 1024.
- [Korjattu K5-maski v2](petrin-K5-maski-v2.png), [korjaus-QA](petrin-K5-maskikorjaus-20261015.json), [jalan overlay](petrin-M01/K5-mask-v2/right-leg-correction-overlay.png).
- [Kierrosloki](petrin-M01/round-log.json), [mittarit](petrin-M01/qa/metrics.json), [erillinen arvio](petrin-M01/qa/independent-review.json), [raportti](petrin-M01/README-FI.md), [tavumanifesti](petrin-M01/delivery-packet.json).

## Tulos ja rajat

| Näkymä | Siluetti-IoU | Raja | Läpäisy |
|---|---:|---:|---|
| K1 | 69,41 % | 85 % | Ei |
| K2 | 88,01 % | 90 % | Ei |
| K3 | 86,87 % | 90 % | Ei |
| K4 | 87,44 % | 90 % | Ei |
| K5 | 71,57 % | 90 % | Ei |

**M01 ei ole lopullinen hyväksytty malli.** Keski-IoU on 80,66 %. Mallin fyysiset korkeudet pysyvät #253:ssa: runko/katto 58,7 m, alatasanteen lattia 20 m, ylätasanteen lattia 51 m. Nämä varmennettiin tallennetusta geometriasta; tämä ei ole riippumaton todellisen rakennuksen mittaus. Generoitujen kuvien tasannevirheitä ei kopioitu geometriaan. Noin 71 m mastokorkeus ja hallin mitat ovat edelleen arvioita.

Kamerat pidettiin toimitetuissa lähtöestimaateissa; kuvasiluettiin perustuvaa kameraoptimointia ei tehty. K5:n maapiste on peittyvä arvio, K4:n pohjoisdetaljit varmentamattomia. K5:n kameratiedoston vanha maski-SHA säilyy historiallisena metadatana; aktiivinen v2-maski on sidottu `authorization.json`- ja `qa/metrics.json`-tiedostoihin sekä paketin `inputs/targets/K5-mask.png`-tiedostoon.

Tuore erillinen arvioija katsoi kaikki viisi vertailua. Suurimmat erot: (1) jalat/jalusta leviävät etenkin K1/K5-kuvissa tavoitetta laajemmiksi, (2) kaiteet, tasanteiden alapinnat ja yläkoppi ovat pelkistettyjä, (3) hallin julkisivu ja koristekaaret ovat lähinäkymässä luonnosmaisia. Ympäristö on neutraali esikatselu.

Materiaalivärin sitova ΔE on `null`, koska riippumattomasti kohdistettuja materiaalialueita ja samaa valaistusta ei ole. Raportin pikseli-ΔE76 on pelkkä diagnostiikka, johon vaikuttavat muoto/kohdistus, ristikon tausta ja valaistus; värirajan läpäisyä ei väitetä.

K5-maskiin lisättiin 1 544 valkoista pikseliä, poistettiin 0, lisäysbbox x=823–908/y=570–816. Koko ja kuvapikselit säilyivät. Tuottaja ja erillinen arvioija katsoivat korjauksen; korjatun maskin PT-vahvistus ja pikselintarkkuuden riippumaton sertifiointi eivät ole valmiita.

M01 sisältää yhden geometriakierroksen. Blenderin taivas-API:n yhteensopivuus korjattiin ennen renderiä ja beauty-renderien näyttövalotus yhtenäistettiin −2,5 EV:hen. Geometria, kamerat, materiaalit ja geometrian alfamaskit säilyivät valotuskorjauksessa; SHA-näyttö on mukana. Vanha diagnoosiaineisto säilyy tuotantoarkistossa. Uusia AI-kuvia 0.

**Pysähdyn tähän ensimmäisen mallikierroksen jälkeen PT:n palautteeseen.** Ei M02-kierrosta, R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. Pekingin ja Pulun aineistoon ei koskettu.
