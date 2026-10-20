# Asemataulun osoitteet tileittäin (omistaja 12.10.2026 klo 19.3x: kopio jokaiselle tilille, lähde repossa)

Toisen tilin jakama taulu aukeaa, mutta sen tietokantaan ei voi kirjoittaa toiselta tililtä (ArtifactData: "shared from another
organization … invited editors"). Siksi jokaisella tilillä on oma kopio samasta sivusta.

| Tili | Osoite | Huom |
|---|---|---|
| Päätili: KÄYTÖSSÄ 20.10. klo 18.1x alkaen (tilinvaihto PT local_cf5b4eca; viikkoraja tällä viikolla 85 %, omistaja 20.10. 18.20; viikko nollautuu 26.10. klo 09.59). Aiemmin käytössä 18.10. 01.0x – 19.10. 04.00 | https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix | alkuperäinen 10.10.; julkaistu uudelleen 18.10. 01.1x (PT local_cf5b4eca), tietokanta täytetty |
| R6VQ-taulu: käytössä 19.10. klo 07.0x – 20.10. 18.1x tilillä sami.reivinen@vvi.fi (KK:n faktakorjaus 20.10. 17.54: ~/.claude.json org ddaee6a2; aiempi merkintä gmail oli virhe), viikko 95 %, nollautuu 26.10. aamuyöllä. SEURAAVA: päätili (omistaja 20.10. 17.54) | https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy | julkaistu 12.10. 19.39; uusin sivu ja tietokanta 19.10. 07.1x (PT local_8d8ebf72) |
| sami.reivinen@vvi.fi (koodaus, raja 99 %, viikko nollautuu ti 20.10. klo 01.59) | https://claude.ai/artifact/EekZDPMuAcsjT3awvn4jPb | julkaistu 13.10. 21.5x (PT local_593b89a1) |
| vvi@vvi.fi (koodaus, raja 99 %, viikko nollautuu pe klo 08.00; käytössä 15.10. klo 12.1x alkaen) | https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm | julkaistu 15.10. 12.2x (PT local_5df52e10) |

## Tilinvaihdossa (uusi PT)
1. Artifact list: onko tällä tilillä jo oma Asemataulu? Jos on, read + publish samaan osoitteeseen; jos ei, publish uutena
   (lähde `git show origin/main:tools/asemataulu/asemataulu.html` → scratchpad/asemataulu/asemataulu-julkaisu.html,
   capabilities {"comments": {}, "db": {}}, icon dashboard) ja lisää rivi tähän taulukkoon.
2. Täytä tietokanta yhdellä ArtifactData batchilla tiedostoista scratchpad/asemataulu/data/talo/*.json
   (junat, tyolista, eteneminen, huom = PT; mittarit, roolit, laitteet = Asemataulu-sessio), op set, file_path.
3. Uusi osoite Postivahdille, jonokierros-teksti.md:n kohtaan 7 ja omistajalle yhdellä rivillä.

PT kirjoittaa omat dokumenttinsa aina ensin data/talo/<doc>.json-tiedostoon ja vie sen file_path-kentällä, jotta tiedostot
pysyvät tauluun nähden ajan tasalla.
