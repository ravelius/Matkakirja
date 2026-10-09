# Pariisin nykyintro: kuva-arkin arvio 9.10.2026

Arvioija on Linssiseppä (Opus, high). Kuvakäsikirjoitus on tiedostossa [pariisi-nykyintro.md](pariisi-nykyintro.md).

## Käännös ja kuvat

- Käännös `beb3fe9d`: proto `linssiseppa/nykyintro-173` 533c67e47, `kaupunkiaanet-173` 5fe96a74d ja `esilataus-173` 2b9ba3189. Intron haarassa ovat Pelikoodarin kaupunkijakso-intro 2ae1b0e1a ja NUI:n NytRivi c3270b673. iPad 13 -simu, ääni mykistettynä.
- 13 kuvaa: `proto-3d/lokit/todistus-yovalot-diag-20261009-1547/`. Kuva-arkki: [kuva-arkki-20261009/pariisi-nykyintro-beb3fe9d.jpg](kuva-arkki-20261009/pariisi-nykyintro-beb3fe9d.jpg).
- Edellinen ajo (`95f6cdb2`) ohitti intron, koska opas-linssi pitää musiikin pidossa. Pelikoodari korjasi tämän (35393b309).

## Aikajana pelin lokista

| Tapahtuma | Malli | Mitattu |
|---|---|---|
| musiikki alkaa (kohta 0) | 0,00 | 0,00 |
| otos 2 (C1) | 7,74 | 7,75 |
| nyt-rivi ja otos 3 (Eiffel) | 15,48 | 15,50 |
| otos 4 (C2) | 19,36 | 19,37 |
| otos 5 (C3) | 23,23 | 23,23 |
| otos 6 (C4) | 27,10 | 27,10 |
| otos 7 (3D) | 30,97 | 30,98 |
| C5 täysi | 33,0 | 33,00 |
| isoisän avaus | 33,5 | 33,50 |
| paluu 3D:hen | 36,0 | 36,02 |

Kaikki leikkaukset osuvat alle 20 ms:n päähän tahdin iskusta. Opastus soi Notre-Damen pysähdyksellä ennen lähtöä Louvreen, kuten PT päätti. Avauksen ääni latautui intron aikana.

## Toimii

- C1–C4 näkyvät koko ruudulla terävinä hitaalla lähentymisellä. "Havainnekuva"-merkintä on oikeassa alakulmassa kokonaan.
- Eiffel-otoksessa (500 m) koko torni on kuvassa, ja horisontti näkyy.
- Nyt-rivi näkyy vasemmassa alakulmassa ("PARIISI · nyt 15.49 · 15 °C"), eikä se osu merkinnän kanssa samaan aikaan.
- C5 (vanha valokuva) on seepiana ja vaikuttava, ja isoisän avaus alkaa sen päällä.

## Kolme suurinta virhettä

1. **C5 ei ole sama näkymä kuin pelin kamera** (31,5–33,0 ja 36–38 s). Codex rajasi kuvan noin 2,5 kertaa lähemmäs ja lännestä: Notre-Dame on suurena ja Pont Neuf etualalla. Ristihäivytys on siksi tavallinen elokuvan häivytys kahden otoksen välillä, ei saman näkymän muutos. Rajausta ei voi kohdistaa, koska ulospäin zoomaaminen ei ole mahdollista. **Suositus:** C5 v2 Codexilta tiukemmalla ohjeella ("koko kuva-ala kuten referenssissä, Notre-Dame pienenä keskellä alhaalla, ei lähennystä"). Siihen asti nykyinen häivytys on hyväksyttävä.
2. **Pallon kori ja köydet näkyivät nykyajan 3D-otoksissa** (otokset 1, 3 ja 7). **Korjattu** (bf0017f1b): kori on pois nykyajan otoksista ja palaa 36,0 s:ssa C5:n alla, joten isoisän maailmaan palataan pallossa.
3. **Googlen sumennusläiskä avausnäkymässä** (otokset 1 ja 7, prefektuurin kortteli). Linnanrakentaja mallintaa sen (PT 9.10.).

## Ei kuvattu tässä ajossa

- ohitus napautuksella (testattu automaattitestillä KaupunkiIntroTestit)
- muu kaupunki ilman introa (Tukholman kuva-arkki 1428 ennen introa: ei muutosta, intro vain Pariisissa)
- ääni (mykkä ajo)
