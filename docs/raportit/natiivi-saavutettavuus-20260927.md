# Natiivin saavutettavuus, perustaso — raportti (erä A), 27.9.2026

Natiivi-UI (Opus). Fablen App Store -laatujono kohta 3. Mittaus: käännös 69f9abad (juna/b13 + natiivi-ui/saavutettavuus),
iPhone 17 -simulaattori (402 × 874 pt). Aineisto: `proto-3d/lokit/natiivi-ui-saavutettavuus/` (kuvat, ui-puu-*.json,
saavutettavuus-*.json, yhteenveto.json, voiceover-puu-*.txt).

## Työkalut (haara natiivi-ui/saavutettavuus)

- `ui saavutettavuus [nimi]` → Documents/saavutettavuus[-nimi].json: jokainen näkyvä Button/Toggle/Slider/TextField
  (VoiceOver-nimi, kosketusala Kosketusnapin laajennus mukaan lukien, alle 44 × 44 pt) ja tekstit (WCAG-kontrasti, kun
  tausta on yksivärinen).
- Pikselikontrasti paperikuvion päällä: `scratchpad/kontrasti.py <kansio>` (ui-puu + kuvakaappaus; tausta = tekstilaatikon
  mediaani, teksti = 3 % kauimpana taustasta). Rajattu ylimpään modaaliseen kerrokseen.
- `ui voiceover [paalle|pois|puu]`: VoiceOver-silta (erä B, alla).

## Tulokset

| Näkymä | Nimettömiä nappeja | Kosketusala < 44 pt | Teksti alle kontrastirajan |
|---|---|---|---|
| Aloitusportti | 0 | 2 | 5 |
| Kartta | 0 | 4 | 2 |
| Valikko (☰) | 0 | 6 (+4 kartalla) | 4 omaa (+ karttaa) |
| Kaupunkilehti | 0 | 2 | 5 |
| Nostokortti | 0 | 2 | 1 |
| Opas | 0 | 10 | 0 |
| Kysymys | 0 | 0 | 4 |

**Nimet: kunnossa.** Kaikilla napeilla on näkyvä teksti tai tooltip. Ongelma oli koko VoiceOver-puun puuttuminen
(UI Toolkit ei välitä elementtejä ruudunlukijalle): sovellus oli VoiceOverille tyhjä. Korjattu erässä B.

**Kosketusalat alle 44 pt (merkittävimmät):**
- Oppaan vyörivit (Museot, Ruoka, … 300 × 26–27 pt) — rivit vierekkäin, laajennus ei mahdu ilman ulkoasun muutosta.
- Valikon kytkin- ja toimintonapit (Kertoja, Musiikki, Äänimaisema, Uusi peli, Muut, Kehittäjä: korkeus 34 pt).
- Nostokortin ratas ja kaiutin 34 × 34, oppaan kaiutin 38 × 40, kartan "Luenta pois" -kaiutin 24 × 24,
  karttaselite 40 × 40, Liiku 60 × 42, lehden maalinkki 102 × 18 ja sääpalkki 345 × 26.
- Laukun selostenappi "i" 18 × 18, aloitusportin "Laita äänet päälle" 202 × 40 ja "Oppiminen on hauskaa" 298 × 42.

**Kontrasti (WCAG 4,5:1 normaali teksti):**
- Lehti: "POISTU LEHDESTÄ" 2,6; "PARIISI PINTAA SYVEMMÄLTÄ" 3,9; päiväys, sääopas ja maalinkki 4,2.
- Kysymys: kaupunki- ja kehysrivi 3,9, sekuntilaskuri 3,5 (#7b6039 pergamentilla).
- Nosto: "LISÄLEHTI"-nimiö 2,2 (9,5 px).
- Valikko: kytkimien pois-tila (Kertoja/Äänimaisema) 2,2–2,3 — tarkoituksellisesti himmeä ei-aktiivinen tila (WCAG
  sallii ei-aktiiviset), mutta tilan erottaa vain väristä → VoiceOverille tila "valittu/ei".
- Kartta: Liiku 3,5, merinimi "DOVER" 3,7. Karttanimiöt 8,5 px: pienet ja paperikuvion päällä, mutta kartan kuvitusta.
- Aloitusportti: "OSA II · UNOHDETTU AARRE" 1,5 ja "Oppiminen on hauskaa" 2,3 kuvan päällä.

## Suositus erälle C (vaatii linjauksen, koska web on malli)

Värit ja mitat ovat webin (mitattu pariteetti). Kontrastin ja 44 pt:n korjaukset muuttavat ulkoasua, joten ne pitää tehdä
yhtä aikaa webiin ja natiiviin:
1. Toissijaiset tekstit #7b6039 / #958877 → tummempi (≥ 4,5:1 pergamentilla, esim. #5e4a2c).
2. Pienet ikoninapit kosketusalaksi 44 pt ilman ulkoasun muutosta (Kosketusnappi-laajennus: nostokortin ratas ja
   kaiutin, oppaan kaiutin, karttaselite, luenta-kaiutin, laukun "i") — natiivissa heti, webissä sama padding.
3. Listarivit (oppaan vyörivit, valikon kytkimet) korkeuteen 44 pt: ulkoasumuutos, omistajan kuvaparilla.
4. Aloitusportin kuvan päällä olevat tekstit varjolla tai taustalaatalla.

## Erä B: VoiceOver-silta (valmis, haara natiivi-ui/saavutettavuus)

Unity 6.3:n AccessibilityHierarchy rakennetaan näkyvistä UITK-ohjaimista ja teksteistä (napit, kytkimet,
liukusäätimet, tekstit; nimi näkyvästä tekstistä ja tooltip vihjeeksi; aktivointi = napautus keskipisteeseen;
modaalinen peite rajaa puun). Päivitys 0,5 s:n allekirjoituksella vain ruudunlukijan ollessa päällä, joten lepopiirto
säilyy. Simulaattorissa ei ole VoiceOveria: puu todennettu `ui voiceover puu` -tulosteella, oikea VoiceOver-kokeilu
laitteella (TF).
