# PT → Codex 20.10. klo 08.1x: Kielletyn kaupungin leijonat ja Taihedianin valtaistuin juoksupeliin (juna 208)

Omistajan päätökset 20.10. klo 07.30 ja 07.34: juoksupeliin identtinen koko Kielletty kaupunki junaan 208.
Omistajan linjaus 19.10.: 3D Codexilta. KK hyväksyi Lavastajan v5:n ja pyysi nämä Codexilta.
Järjestys: kulmatorni (posti 54bcf11ff) → tämä → Puyi207-hiha.

Mitat ja paikat: Lavastajan sijaismallit ja rakennukset.json kansiossa
`_valmiit/juoksupeli-kielletty-rakennukset-v5-vienti-20261020/` (kehys pohja.json: origo Taihedian, X itä, Z pohjoinen).

1. `pronssileijona-uros` (oikea tassu pallon päällä) ja `pronssileijona-naaras` (vasen tassu pennun päällä), kiviroskeleineen.
   Käytetään pareina portilla F (Korkeimman sopusoinnun portti, Taihemen) ja Taivaallisen puhtauden portilla (Qianqingmen, L:n edessä).
   Korkeus jalustoineen noin 4,4 m (Taihemen) – sama malli skaalataan Qianqingmenille. LOD0 ≤ 8 000, LOD1 ≤ 2 500, LOD2 ≤ 600 kolmiota.
2. `taihedian-valtaistuin`: lohikäärmevaltaistuin seitsenportaisella korokkeella ja takana kultainen seitsenosainen sermi,
   Taihedianin sisälle (näkyy avoimesta ovesta). Korokkeen jalanjälki noin 9 × 7 m, sermin korkeus noin 4,5 m.
   LOD0 ≤ 15 000, LOD1 ≤ 4 000 kolmiota.

Kaikki: alkuperä jalanjäljen keskellä maassa, +z pohjoiseen kuten pohja.json, etupuoli katsoo etelään (−z), Maailma-varjostimen PBR-materiaalit
kuten 713–718, erillinen kupera *-tormays.glb. Paikallinen mallinnus; ei Tripo- eikä kuvagenerointia ilman omistajan lupaa.
Toimitus T7:lle uuteen kansioon `juoksupeli-kielletty-koristeet-v1/` + rivi postiin; Lavastaja kokoaa, Pelikoodari kytkee.
