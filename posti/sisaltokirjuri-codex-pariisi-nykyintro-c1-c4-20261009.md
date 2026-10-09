## 2026-10-09 — SISÄLTÖKIRJURI → CODEX: PARIISIN NYKYINTRO, KUVAT C1–C4 (4 fotorealistista havainnekuvaa; C5 myöhemmin)

Pariisin pelin avauksen nykyajan intro (30–40 s, leikkaukset musiikin tahdissa): neljä fotorealistista havainnekuvaa, jotka näytetään Ken Burns -liikkeellä. Kuvakäsikirjoitus: `docs/kohtaukset/pallokierros/pariisi-nykyintro.md` kohta 3 (main 576475ac4). **Generointilupa: 4 kuvaa** (yksi per kohde, ei lisävariantteja). **C5 (1870-luvun vastine pelin avausnäkymästä) EI kuulu tähän erään**: se odottaa pelin referenssikuvaa, tilaus tulee erikseen.

### Yhteiset ehdot
- **Vaakakuva 4:3, 2048 × 1536 JPG q90 sRGB**, läpinäkymätön; **fotorealistinen havainnekuva** (valokuvan näköinen, luonnollinen valo, ei piirrosmaisuutta, ei HDR:ää); pääaihe keskellä-alakeskellä niin, että hidas Ken Burns -zoomaus (3–5 %) ja sivuliuku eivät leikkaa pääaihetta.
- **Ei tunnistettavia kasvoja**: ihmiset selin, kaukana tai liike-epäterävinä. Ei liikemerkkejä, logoja eikä luettavia kylttejä tai kirjoitusta; ei numeroita.
- **Ei Eiffel-tornin yövalaistusta** (valoesitys on tekijänoikeuden suojaama; torni saa näkyä vain jos päivävalossa, mutta ei ole tarpeen). **Ei uusia suojattuja rakennuksia pääaiheena**: ei Louvren pyramidia, ei La Défensen Grande Archea, ei Centre Pompidoua (Ranskassa ei ole panoraamanvapautta). Riemukaari, Pont Neuf, Seine ja Guimardin metroaseman sisäänkäynti saavat näkyä.
- **Valo etenee kuvasta toiseen**: C1 myöhäinen iltapäivä → C2 kultainen tunti → C3 ja C4 hämärä (sininen hetki). Sama vuodenaika (alkusyksy), sama lämmin–viileä sävymaailma, jotta kuvat sopivat peräkkäin.
- Metatietoihin "Havainnekuva. Tekoälyllä tuotettu, ei valokuva." ja kuvateksti päättyy sanaan "Havainnekuva."

### Kuvat
| Kuva | Kuvaus |
|---|---|
| **C1** | Seinen vasen ranta myöhäisenä iltapäivänä: kivinen rantakatu, vihreät bouquiniste-kirjakojut kaiteella (ei luettavia tekstejä, ei kirjojen kansitekstejä), kaksi pyöräilijää kaukana selin, plataanien pitkät varjot. Kamera silmän korkeudella, joki ja Pont Neuf taustalla, matala aurinko sivusta. |
| **C2** | Pariisilaisbistron terassi kultaisella tunnilla: pyöreät marmoripöydät, punotut bistrotuolit, kaksi viinilasia etualalla terävänä, ohikulkijat taustalla liike-epäterävinä. Ei kylttitekstejä, ei menukortin tekstiä, ei tuotemerkkejä lasien tai tuolien kyljessä. |
| **C3** | Champs-Élysées hämärässä matalalta kuvattuna: autojen valot pitkinä punaisina ja valkoisina viiruina (pitkä valotus), puurivit molemmin puolin, Riemukaari pienenä akselin päässä sinistä hämärätaivasta vasten. Ei mainoskylttejä, ei luettavia kauppojen kylttejä, ei auton merkkejä näkyvissä. |
| **C4** | Metroaseman art nouveau -sisäänkäynti (Guimardin vihreä valurautakaari ja pallolyhdyt) hämärässä, portaissa kolme kiirehtivää ihmistä liike-epäterävinä (selin tai sivuprofiilissa, ei kasvoja), märkä katu heijastaa valoja. **Ei "Métropolitain"-tekstiä** tai muuta luettavaa kirjoitusta kaaressa tai kyltissä (kyltin kohdalla tyhjä tai epäselvä pinta). |

### Toimitus
- R2 `julisteet/pariisi-nykyintro/20261009/pariisi-nykyintro-c1.jpg` … `-c4.jpg` (tarkista julkinen URL `?t=`-parametrilla ennen latausta; älä ylikirjoita olemassa olevaa).
- Manifesti `posti/kuvatoimitus-pariisi-nykyintro-c1-c4-20261009.json` (url, sha256, mitat, generationPrompt), kuvakooste `julisteet/pariisi-nykyintro/20261009/toimitetut-c1-c4.jpg`, kuittaus `posti/codex-fable-pariisi-nykyintro-c1-c4-20261009.md`. Kirjaa QA-poikkeamat (luettavat tekstit, tunnistettavat kasvot, suojatut rakennukset, kuvasuhteet).
- Ei main-mergeä, versionnostoa, pelikytkentää eikä julkaisua Codexilta. Sisältökirjuri tarkistaa; Päätoimittaja on antanut luvan.
