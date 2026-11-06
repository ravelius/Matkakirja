# Pelikoodari → Codex (Tripo 3D): ovilehden väritekstuurin musta täyte pois, mallit-v2 (6.11.2026)

Koskee toimitusta `posti/tripo3d-keskustelukanava-ovi-mallit-toimitus-20261104.md` (tilaus #2029–2031). PT:n päätös 6.11.: korjataan ennen vientiä. Omistaja 06.58 (PT:n välittämä tavoite): lehti ilman reunan tummia piikkejä.

## Mikä on vialla
Lehden pinnalla näkyy pelissä täysin musta merkki, ja saumoissa ohuita katkoviivoja. Merkki on ristikon alakulmassa saranan puolella, ja sama vika on molemmissa lehdissä peilattuna, siis kaikissa 245 ovessa.

Todennäköinen syy on väritekstuurin musta täyte UV-saarten välissä: lehdellä viidellä kolmiolla on ainakin yksi kulma täytteen päällä ja kuudennella keskipiste, yhteensä noin 96 cm². Merkin kohtaan sopii parhaiten kolmio, jonka kohta on noin (-0,128; 1,35; -0,039) ja ala 34 cm², ja jolla on kaksi kulmaa mustalla. **Kolmion ja kuvan kohdan vastaavuutta ei ole todennettu.** Samoin saumojen katkoviivojen syy on todennäköinen, ei todennettu.

## Mitä tehdään
Kaksi lehteä: `ovi-lehti-vasen.glb` ja `ovi-lehti-oikea.glb`, samoilla tiedostonimillä uuteen kansioon.

- **Väritekstuuri (`baseColorTexture`):** musta täyte korvataan viereisellä värillä, eli UV-saarten väri levitetään täytteen alueelle, myös niiden kolmioiden sisälle, jotka osuvat täytteeseen.
- **Mallin oma tumma väri säilyy:** ristikon raot, renkaat ja muut maalatut tummat kohdat eivät saa vaaleta. Erota täyte UV-peitosta, älä pelkästä kirkkaudesta.
- **Muuttumatta:** muoto ja mitat. Geometria, normaalit, UV:t, indeksit, muunnokset ja saranaorigot pysyvät tavulleen samoina, samoin normaali- ja metalli/karheuskuvat. Jos UV:ta on pakko muuttaa, kerro miksi ennen toimitusta.
- **Tekstuurin koko 1024²** ennallaan. Lehtien väritekstuurit pysyvät keskenään tavulleen samoina, jotta resurssit voidaan jakaa.
- **Ei uutta Tripo-generointia eikä krediittejä.** Tämä on tekstuurin korjaus.
- **Karmi ei kuulu korjaukseen:** sen väritekstuurissa ei ole täysin mustaa. Kopioi `ovi-karmi.glb` muuttamattomana uuteen kansioon, jotta kansio on kokonainen.

## Tarkistukset toimitukseen
1. **Täytteen osuus ennen ja jälkeen, sama mittari.** Pelikoodarin aiempi luku oli 34,5 %, mutta se riippuu kynnyksestä. Mitattu nyt `ovi-lehti-*.glb`:n väritekstuurista: täysin musta 13,6 %, alle 16/255 36,5 %. Kuva on JPEG, joten täytteen reunassa on kohinaa. Kerro kumpikin luku korjatusta ja mustien pikselien osuus UV-peiton sisällä (tavoite: ei täytteen mustaa).
2. **Kolmiot:** lista kolmioista, joilla on kulma tai keskipiste täytteen päällä, ennen ja jälkeen, kolmioiden pinta-ala mukana.
3. **Saumojen katkoviivat:** suurennos (noin 8×) samasta saumasta ennen ja jälkeen. Kerro, poistuivatko ne ja oliko täyte niiden syy.
4. **Merkin kohta:** rajaus samasta kohdasta ennen ja jälkeen, samalla kameralla.
5. **Oma tumma väri:** sama rajaus ristikosta ja renkaasta ennen ja jälkeen.
6. `node tools/codex-3d-tarkistus.mjs <kansio> --json` ja SHA-256 kaikista kolmesta GLB:stä.

Vertailukuvat pelistä: `/Users/Shared/Claude/proto-3d/lokit/esikatselu-20261106-072617/t1-*.png`. Täysikoossa (2752 × 2064 px) merkki on noin (2254; 1566).

## Tiedoston paikka
`/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ovi-20261104/mallit-v2/`. Älä korvaa `mallit-v1`:tä.

## Toimitus
Viesti `posti/codex-pelikoodari-ovi-lehti-v2-toimitus-20261106.md` postilaatikko-haaraan. Ei vientiä mediaan eikä junaan. Pelikoodari tarkistaa mallin pelistä ja vie parin samasta kohdasta KK:lle ennen vientiä; `ovi-v1` puuttuu mediasta, joten korjattu malli on se, joka sinne viedään.
