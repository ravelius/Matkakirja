# Tripo 3D → Keskustelukanava: ulkoesineet 2019–2022, mallit v1

Vastaus tilaukseen 006ff6d7. Neljä GLB:tä on valmiina **KK:n katselmukseen**. Omistajan kuvahyväksyntä 4.11. klo 12.23. Ei vielä vastaanottajan hyväksyntää, pelikytkentää tai julkaisua.

## Paketti
`/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ulkoesineet-20261104/mallit-v1/`

Tämä on symbolinen linkki T7:n toimituskansioon:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-ulkoesineet-mallit-20261104/delivery/mallit-v1/`
39 sisältötiedoston SHA256 tarkistettiin pyydetyn Shared-polun kautta; validaattorin raportti varmennettiin lisäksi erikseen. Ei tuotantotallennusta käynnistyslevylle.

ZIP T7:llä: `../juoksupeli-ulkoesineet-mallit-v1.zip`, 9 140 078 tavua.
ZIP SHA256: `045a250708c6936dcc745d624806aac82f934ecbaef6aa10ebfb65bd7db3e98b`.
SHA256SUMS SHA256: `ec4692d70bd13621dd2cfbbde5c923b7fab5afa9dbd4d06598ff29e76c38194d`.

## Mitatut rajat
Kaikissa **5800 kolmiota, yksi mesh/primitive/materiaali, yksi PBR-tekstuurisarja** (1024² väri, 1024² normaali, 512² metallisuus/karheus). Kaikki upotettu GLB:hen, OPAQUE, ei luurankoa/animaatioita/pakkauslaajennuksia. Metrit, Y ylös, muunnokset sovellettu, alin piste y=0.

| Malli | Leveys × korkeus × syvyys m | Tavua |
|---|---|---:|
| kala-allas-ehja.glb | 0,995 × 0,900 × 1,000 | 1 891 164 |
| kala-allas-rikki.glb | 1,695 × 0,573 × 1,734 | 2 110 532 |
| kukkaruukku-ehja.glb | 1,017 × 2,000 × 0,868 | 1 565 264 |
| kukkaruukku-rikki.glb | 1,615 × 1,433 × 1,379 | 1 931 232 |

Ehjän ruukun reuna 0,70 m; kokonaiskorkeus puineen 2,00 m. Rikki-mallin laajempi jalanjälki sisältää maahan levinneet osat. Tripon kevennysraja ja 1024² tarkistettiin tiedostoista erikseen. `node tools/codex-3d-tarkistus.mjs`: **PASS, 0 virhettä, 0 huomautusta**; raportti `qa/codex-3d-tarkistus.json`.

## Vaihto, poikkeamat ja katselmointi
**Rikki-mallit ovat yhtenäisiä kiinteitä meshejä; sirpaleita ei ole erotettu nimetyiksi osiksi.** Tilauksen sallima vaihtoehto, ei sirpalefysiikkaa. Sama maailman sijainti/rotaatio/skaala ehjälle ja rikkinäiselle. Allas kohdistettu kivijalustan keskipisteen ja halkaisijan perusteella, ruukku juuripaakun silmämääräisen keskipisteen ja 0,70 m:n reunasirpaleen avulla. Kyse on erikseen generoitujen tilojen visuaalisesta sovituksesta, ei kärki kärjeltä samasta murtogeometriasta. PK tarkistaa vaihdon ja törmäysrajat pelissä.

Altaan neljän kalan Tripossa liian korkea kohouma madallettiin reunan alapuolelle. Vesi on läpinäkymätön. Sirpaleiden kuviot poikkeavat hieman lähteestä; vasemman suuren sirpaleen sisäreunassa pieni kellertävä värialue. Puu säilyttää kolme hedelmää ja paksut oksat, mutta lehtien/oksien sijoittelu sekä kapeampi sivuprofiili ovat Tripon tulkintaa. Kaatunut puu ei ole ehjän puun tarkka rotaatio.

`esikatselu/<malli>/`: neljä 60° yläviistoa, sivu, 15 m / FOV60 perspektiivi, lähdevertailu. `esikatselu/kooste.jpg`: kaikki samassa mittakaavassa. Kaikki mallit luettu lopullisista GLB:istä. Lähdevertailun kamerakulma on arvio ja kuvarajaus sovitettu; havainnekuvissa ei ollut täsmällisiä kameratietoja. Kevyt CPU-katselu käyttää väriä ja normaaleja, ei pelin PBR-valaistusta. Tarkka menetelmä ja rajat README:ssä. Ei raskasta renderöintiä eikä videoita. QA-kierros 15,4 s, huippumuisti 175 MiB.

## Lähteet ja kustannus
Kuusi hyväksyttyä kuvaa SHA256-varmennettu, ei uusia kuvia. H3.1, yksi ensimmäinen otto per malli:
- 2019: `d4516528-1bdc-47e4-a3cc-c656c28cc3bd`
- 2020: `61468465-24a8-480c-8eb1-1e2084acb15d`
- 2021: `80d57934-6ef1-4d11-b184-44953272b480`
- 2022: `69164370-bfbb-4f44-b095-a247d1cd3321`

4 × 45 generointi + 4 × 5 native-retopologia = **200 krediittiä**, saldo 16950 → 16750. Ei uusintaottoja tai ostoja. Retopologian erillistä jobid:tä käyttöliittymä ei näyttänyt. Alkuperäiset, kevennetyt lähteet ja kaikki hyväksytyt kuvat säilyvät T7:llä; jobit ja tarkistussummat mukana GENERATION.json / MANIFEST.json / LAHTEET.md.

Seuraavaksi KK katsoo mallit; sen jälkeen PK:n vastaanotto ja pelikytkentä tilauksen mukaisesti.
