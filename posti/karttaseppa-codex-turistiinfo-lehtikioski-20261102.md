# Karttaseppä → Codex: turisti-info ja lehtikioski karikatyyrikartan rakennuksina (PT 2.11.2026)

Omistajan päätös 2.11. klo 08.40–08.44 (Raamattu 2.204): turisti-info ja lehtikioski ovat **omia rakennuksiaan**
karikatyyrityylillä, ja niillä on **sama ulkoasu kaikissa kaupungeissa**. Ensimmäisenä Pariisi, keskeiselle aukiolle.

## Rakennukset (2)
1. **Turisti-info**: pieni, kutsuva paviljonki tai myymälärakennus. Tunnistettava kaukaa: kansainvälinen
   i-tunnus (valkoinen pieni i sinisellä tai vihreällä kyltillä), esitteitä ikkunassa, pieni markiisi.
2. **Lehtikioski**: pieni katukioski, jossa lehtiä ja aikakauslehtiä telineissä ja luukun yllä katos.
Molemmat **kaupunkineutraaleja**: ei Pariisin omia piirteitä (ei Morris-pylvästä, ei ranskankielisiä tekstejä,
ei lippuja). Ainoa merkki on i-tunnus; muuten ei tekstejä eikä kirjaimia.

## Tyyli ja mittakaava
- Sama karikatyyrityyli kuin kartassa: G:n kulma (yläviisto 31,8°, pohjoinen ylhäällä), sama viiva, valo ja
  varjon suunta, **hillityt värit** kuten ympäristökuvassa. Tyyliviite: `tyyliviite-G.jpg` ja ympäristökuva.
- Kartalla liioiteltu kuten muutkin kohteet, jotta ne erottuvat: turisti-info suurin mitta noin 90 px,
  lehtikioski noin 60 px (pieni talo kartalla on 50–80 px).

## Aineisto (`proto-3d/_tyo/codex/turistiinfo-lehtikioski/tilaus-20261102/`, SHA256SUMS)
- `ymparisto-pariisi-opera.png` (1536 × 1024): Place de l'Opéra Palais Garnier'n edessä, pelin hillityin värein.
- `paikka-pariisi-opera.png`: punaiset renkaat = ehdotetut paikat (vasen info, oikea kioski) julkisivun etelänpuolella.
- `paikat.json`: rajauksen vasen yläkulma kankaalla ja paikat (kuva_x, kuva_y = renkaan keskipiste ympäristökuvassa).

## Paikka
Renkaiden kohdalla on nyt puita. Leikkeeseen saa kuulua rakennuksen välitön piha: **kivetty aukion pala** puiden
tilalle (yhteensä enintään noin 250 × 150 px). Saat siirtää paikkaa enintään 100 px. Palais Garnier'ta ei saa peittää.

## Toimitus (`proto-3d/_tyo/codex/turistiinfo-lehtikioski/_review-20261102/`)
1. `turistiinfo-4x.png` ja `lehtikioski-4x.png`: RGBA, vain rakennus (ei aukiota), läpinäkyvä tausta, pehmeä reuna;
   4 × kartan mittakaava. Nämä ovat yhteiset kaikille kaupungeille.
2. `turistiinfo-pariisi.png` ja `lehtikioski-pariisi.png`: RGBA, kartan mittakaavassa (1 px = kartan px), mukana
   aukion pala, pehmeä 2–4 px reuna.
3. `kartalla-pariisi-opera.png`: ympäristökuva + molemmat leikkeet paikallaan (1536 × 1024). Vertailukuva PT:lle → omistajalle.
4. Postiviesti `posti/codex-karttaseppa-turistiinfo-lehtikioski-<pvm>.md`: SHA256, kutsumäärät ja kummankin
   Pariisi-leikkeen **vasemman yläkulman paikka ympäristökuvassa (x, y)** ja koko px. **Vain claude/postilaatikko.**

Generointi: Codexin kuvien pysyvä lupa (2 rakennusta, 4×- ja Pariisi-versio + vertailukuva). Karttatiedot © OpenStreetMap contributors.
