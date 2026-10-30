# Valosepän luovutus 30.10.2026 klo 22.40

Syy: PT pyysi luovutusta 22.3x (konteksti 27 %), kun odotin linjaa 2. Valotyö jatkuu. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (lue rivit 20.3x alkaen). Proto-repo on vain paikallinen.

## PYSYVÄ SÄÄNTÖ (Raamattu 2.177)
Ennen paria tai korttia: värimittaus havainteeseen auringossa ja varjossa (`/opt/homebrew/bin/python3 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/varimittaus.py …`, ilman `-I`) + lähikuvat muutetuista kohdista.

## OMISTAJA 22.27 (PT)
Valo ja 6.7/STP-kokeet tulevat JUNAAN 216 (juna 217:ää ei ole). Juna julkaistaan vasta, kun valo on valmis ja hyväksytty: valo on lähtöehto. Pelin oletus on yhä vertailuvalo (`JuoksuVertailuValo` = true). Oletus muutetaan vasta omistajan päätöksellä, jonka PT kysyy KK:n kautta parien jälkeen.

## Tehty tässä vuorossa
- **METAL 4b54413d7:** 444/0, PIPELINE 436/0.
- **Valoerän koodi junaan 216:** haara `linssiseppa2/valo-216` **580a990a2** = runko f454d3efd + 37f18cca3 (leivonnan vaiheet 1–2) + c7c9697a4 (instanssien elävä varjo) + 006b4cfb9 ja 580a990a2 (6.7 QA). tarkista.sh antoi 0 virhettä, testit 46/46 ja 3/3, valovahti ja leivonta-aurinko ok. Haara on lähetetty NS:lle ja PT:lle, ja PT kuittasi sen NS:lle. Työpuu `/Users/Shared/Claude/wt/proto-linssiseppa2-leivonta` on nyt valo-216:ssa. **Korjaukset tehdään erillisinä committeina tämän päälle.**
- **Työkalupuu `wt/proto-linssiseppa2-p11`:** irrotettu 31143a6eb = 4b54413d7 + NS:n 70f507343 (esikatselu nollaa pysyvän tilan). Ajot tehdään sieltä: `zsh tyokalut/esikatselu.sh <sha> <skenaario> ipad --batch`.
- **PK:n rajapinta (leivottu valo instansseille), kuitattu:** pelikoodari/leivonta-217 45b5492df. Atlas ladataan lähirajalla −40 m ja puretaan +100 m:ssä. Jos tarkiste ei täsmää, JUOKSU_LEIVOTTU-avainsanaa ei käytetä. Leivottu instanssi: cast Off, receive On. Kaukoniput: Off/Off. ST on LAV:n mukaan jo pelin UV1-kehyksessä; **varmista parissa yhden instanssin vertailulla Blenderiin.** PK:n koeajot koe-valo1/0 ajetaan linjalla 2.
- **LAV:** tausta-v82 on leivottu, mutta tarkistus antaa yhä VIKA 3520 (tuplapinnat ja kujan lattia; LAV korjaa). Rakennukset-v86 valmistuu arviolta ~05.30. tarkista_leivonta --valo lukee jo kentän osasarja_varj (yleissilmukka). Aukkotulppia tarkistin ei mallinna: jos sisätiloihin tulee vääriä "tumma"-vikoja, lisää tulpat. v5 nosti kujan 05 kivijalat 1,8 m:iin, ja LAV:llä on osasarja-v5-varjostaja.glb.

## VARJOVIKA – JUNAN LÄHTÖEHDON KÄRJESSÄ (PT)
Uusinnat ajettiin vertailuvalo pois (`valo vertailu 0`):
- Varjopari: esikatselu-20261030-215557.
- Kaskadipari + STP/MSAA: esikatselu-20261030-220040.

Havainto: kun `varjot 1` on päällä, **koko kuva tummuu tasaisesti**, ja **hahmon varjo ei näy missään** (aurinko on kameran takana, joten varjon pitäisi näkyä hahmon edessä).
- Mitatut arvot (perus → `varjot 0`): 03 kauko 195 → 221, 06 lähi 178 → 203, seinät 153 → 161 ja 170 → 177.
- A/B ilman instanssivarjoa (07645ceee, esikatselu-20261030-221048) antoi identtiset arvot, joten vika oli jo pohjassa eikä johdu 4b54413d7:stä.
- **Diagnoosi 1** (esikatselu-20261030-221539, varjo-diag.txt): `heittok 40` (1325 heittäjää) ja `heittok 1` (69) antavat identtiset kuvat, joten syy ei ole iso heittäjä. Kerroin on aurinkoisilla pinnoilla ~0,88 ja leivonnan varjossa ~0,95. Täysvarjo antaisi aurinkoiselle 0,32 (JuoksuLeivottuHahmoVarjo), joten kyse on valon yleistason muutoksesta eikä varjokartan täysvarjosta.
- Poissuljettu: taivas (Off), Lammita-piirrot (vain kuusi ensimmäistä ruutua, 0,001 m).
- Huom: jokainen `valo …` QA-komento (paitsi `tila`) ajaa KaytaValo() ja luo PeliValon uudelleen (JuoksuV4Maailma.Valo.cs:410). Kun varjot ovat pois, PeliValo jättää URP-ohitukset tekemättä (Valopohja.cs ~296: shadowDistance, kaskadit). **Epäilys:** `varjot 0` / `varjot 1` vaihtaa muutakin kuin varjokartan, esimerkiksi URP-assetin tilan, ympäristön tai jälkikäsittelyn (KaytaJalki). Selvitä vertaamalla Valopohja.PeliValon haaroja varjot = true/false.
- **Diagnoosi 2** (`varjo-diag2.txt`, a855d9fb6; kuvat e03/e06 `l1v1` / `l0v1` = leivonta 0 / `l0v0` = myös varjot 0): **näkyykö elävä varjo editorikaappauksessa ylipäätään?** Jos seinien varjot näkyvät l0v1-kuvassa, varjokartta toimii ja vika on leivotun valon ja varjon yhdistelmässä (JuoksuLeivottuVarjolla, _JuoksuLeivonta.z/w) tai PeliValon haarassa. Jos varjoja ei näy, varjokartta ei toimi editorikaappauksessa (Esikatselu.cs:486 kamera.Render ×2), ja asia tarkistetaan laitteella (LT).
  - Ajo on käynnistetty taustalle 22.34 (jonossa PK:n 45b5492df:n perässä). Jos se kuoli nollauksessa, aja uudelleen:
    `cd /Users/Shared/Claude/wt/proto-linssiseppa2-p11 && zsh tyokalut/esikatselu.sh a855d9fb6 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/varjo-diag2.txt ipad --batch`
  - Tulos lokit/esikatselu-20261030-2xxxxx/ (uusin). Mittaa alueet kuten JONO.md:n 22.2x-rivillä (kauko 0,33–0,38 / 0,4–0,6, lähi 0,85–0,95 / 0,1–0,3, seinä-vas 0,3–0,4 / 0,02–0,08, hahmon edessä 0,55–0,65 / 0,45–0,55). Arvio PT:lle enintään 3 rivillä.

## Muut avoimet
- **Kaskadit:** tilarivi on ok (atlas 1024²/2048²/4096²). Vertailusta ei voi päätellä mitään ennen varjovian korjausta. Tulokset NS:lle, kun varjo toimii.
- **STP vs MSAA:** ero näkyy editorissa vain hahmossa, joten arvio tehdään laitteella (NS:n L1-vuoro LT:n kanssa).
- **Lokivirhe:** "pelivalo korkeus 45°, atsimuutti 215°" (Valopohja.cs:375 tulostaa JuoksuPaiva-vakiot). Todellinen aurinko on K20 30°/188°. Korjaa lokiteksti samalla, kun korjaat varjovian.
- **Linjasopimus PK:n kanssa:** ilmoita "linja vapaa" PK:lle (local_601d33fc-1c61-4ccd-8389-fa425417fafb) omien ajojen jälkeen.

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LT local_ede7e965-02ff-40a0-a77d-44f3218ca146.
