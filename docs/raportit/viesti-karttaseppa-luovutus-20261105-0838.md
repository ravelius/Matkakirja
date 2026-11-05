# Karttaseppä: luovutus 5.11.2026 klo 08.38 (KS)
Syy: konteksti yli 25 % (7.37). **Lue tämä, sitten -0836 (fe89b4555), sitten -0821 (d5dee27ab).** Tämä voittaa ristiriidassa. S = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nahtavyyssarja (lue S/LUE.md).

## ENSIN
Vahti kuten -0836:ssa, käsitelty a66346394 asti.

## Muuttui -0836:n jälkeen
- **Eiffel ratkesi:** OMISTAJAN PÄÄTÖS 08.20 (KK:n välitys, kortti): oma 3D-malli kartalle kuten muista, sarjassa kahdeksan kohdetta. Omistaja: "sinä taisit sekoittaa tämän kartan kuuma ilmapallokarttaan." PT kirjasi 2.206 ja 2.92 (74a47d8f0); Googlen torni koskee vain kuumailmapallokarttaa. PT: korvaa "ei ennen korttia". **Eiffel B:hen.**
- **PT: jatka B:tä, pysähtyy ennen Tripoa.** Tee tilauksen pohja kohdelistasta, vaikka KK:n sana alueista puuttuu; koot voivat vielä muuttua, joten lähetä Codexille vasta, kun KK on sanonut (katso, onko sana jo tullut).
- **KK:n viesti alueista (08.3x) oli jonossa, kun KK kirjoitti 08.4x;** vastausta alueista ei ole. Älä lähetä uudelleen, tarkista list_eventsillä, jos sana viipyy.

## KK: Sainte-Chapellen varjo
- KK: b2c4ed6a9 pohja istuu, saumaa ei näy, kuvat omistajalla. "kirkon juurella ei näy maassa varjoa, ja Notre-Damen juurella näkyy. Tee sama tapa, jos se on pieni muutos, ja lähetä kuva KK:lle. Älä pysäytä sarjaa."
- Sama varjo on jo käytössä, mutta ellipsi jää matalan rakennuksen alle (kuva sc-lahi-0; syy päätelty mitoista, ei lokista). Korjaus **626a3a68b** (nahtavyydet-219, natiivi-backup): Malli.VarjoKerroin, Sainte-Chapelle 1,5. Kääntämättä.
- Mac-ajo pyydetty JU:lta: sk-sc-pohja.txt, lokit/julkaisija-sc-varjo-626a3a68b. **Kun tulee:** rajaa sc-lahi-0 täysikoossa, vertaa b2c4ed6a9:ään, kuva KK:lle. Jos varjo näyttää väärältä, säädä kerrointa.
- Sarjan matalat kohteet voivat tarvita saman kertoimen; lisää peli.py:hyn, kun mallit näkyvät.
- iPad-rivi b2c4ed6a9 on yhä JU:lla, sha ei vaihdettu (varjo ei vaadi laitetta).
