# Natiivi-UI: luovutus 12.10.2026 päivä

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md. Edellinen: viesti-natiivi-ui-luovutus-20261011-ilta.md.
Ajoskriptit tämän session scratchpadissa: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/034a15d9-e7e4-4555-8469-d05dd8363a79/scratchpad
(introvinkki-ajo.sh, metro-ajo.sh + sk-metro*.txt, pari.py = merkitty NYKYINEN | UUSI -pari, yksi.py = merkitty yksittäiskuva).

## UUDET SÄÄNNÖT 12.10.

1. **VAATII TOIMIA → Asemataulu** (omistaja 10.3x): kaikki omistajan toimia vaativa heti ArtifactData set,
   url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix, kokoelma "talo", doc_id "toimi-natiivi-ui",
   data {rooli:"Natiivi-UI", kysymys:"<rivi>", ts:<ms>}. Jos ei onnistu: Postivahdille "VAATII TOIMIA: Natiivi-UI: <asia>".
   Hoidettu → get + delete (if_version).
2. **Kuvat omistajalle TÄYSIKOKOISINA** (omistaja 11.1x): yksittäin tai NYKYINEN | UUSI -pari natiivikorkeudella, kumpikin
   puolisko merkitty (NYKYINEN/UUSI, laite, kaupunki, kuvan numero, SHA). Ei pienennettyjä monikuva-arkkeja omistajalle;
   PT:lle arkki saa olla, mutta tee myös täysikokoiset.
3. **Ei lupakyselyjä** (PT 12.10. 12.2x; omistaja joutui hyväksymään kaksi käsin): ei rm-komentoja globeilla (joka ajolle
   uusi kansio, esim. …-savy4-<aika>/), ei python- tai stdin-heredocia, ei pitkiä ;- tai &&-ketjuja. Skripti tiedostoon
   (Write) ja aja se.

## AUKI 12.10. ~12.25

- **Taidehalli iPhone vaaka** (PT: 183 jos todiste ennen raketin kuittausta, muuten 184): korjaus
  natiivi-ui/taidehalli-vaaka-183 f7363c7c2 (juna-183 d72cb91ba:n päällä; alkuvalikko turva-alueelle + vieritys,
  ☰-valikon leveys- ja korkeusraja, aarretehtävän kortin varapolku ilman reittiverkkoa). Testihaara natiivi-ui/asettelu-184
  053b862f4. Asettelutesti iphone taidehalli,aarretehtävä jonossa linjalla 1 → kuvat ennen (kaannospalvelu/
  20261012-120147-testit-tuntematon-pallo-kuvat/iphone-vaaka-taidehalli-*.png) | jälkeen merkittyinä PT:lle.
- **Intron sävy** c0e04260c + 4c596c7d0 (intro-vinkki-183): 8 paria PT:llä kuittauksessa
  (lokit/natiivi-ui-intro-savy4-20261012/, NYKYINEN 2127c0097 = 0fae4495f). Kuittauksen jälkeen SHA Natiivisepälle.
- **Metro vapaassa lennossa** ef1bc2818 (metro-vapaa-183): simuajo OK iPhone + iPad (todistus-metro-*-20261012-1209),
  PT:llä kuittauksessa. Paluun valmistuminen testissä = "opas: saapui" (LS1). Kun metro yhdistetään LS1:n
  184-haaraan linssiseppa/katso2-yhd-184 (53d2f08cc), EtsintaKaynnissa-määrittely pidetään VAIN OpasSovitin.Etsinta.cs:ssä
  (183:n aina-false-versio pois); VapaaKohteeseen palauttaa siellä false etsinnän aikana.
- **Aarretehtävän Kartta-laji** (omistajan lupa 14.2x, juna 184): natiivi-ui/aarre-kartta-184 559496447 (worktree
  wt/proto-natiivi-ui-aarrekartta): Kohdekartan.AvaaValinta + Kohdekartta.Paikka. Pelikoodari yhdistää pelikoodari/aarre-lajit-184:ään
  → kuvat iPhone + iPad (Pariisi Notre-Dame -testitehtävä) PT:lle Julkaisijan vuorolla.
- **184**: varivakiot 2c2054d8a + web #4482; museo-nyt-184 b2599db7f; Pelikoodarin säädin-paperi 028764614.
