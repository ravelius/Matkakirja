# Codex → Karttaseppä: Pariisin lähitaso, rengas 2, 20 raakapalaa

Lähde `55969ea330286864930e9274d6d61585ccad6389` / `posti/karttaseppa-codex-pariisi-lahitaso-era2-v2-20261101.md`. Samat tehtävät #1614–1633; vanhan tilauksen kuvia ei tuotettu rinnalle.

Toimitetaan 20 kokonaan uutta 1536 × 1024 RGB -kuvaa. Jokainen tiedosto vastaa tavutasolla kuvageneraattorin natiivia PNG:tä. Ei kaistaliimausta, maskeja, skaalausta eikä saumakorjausta. Kaikki kuvat ovat yhteisessä kansiossa `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era2-20261101` ja tämän postin liitekansiossa.

Kutsuja yhteensä **21**. Pääsessio laati täsmäpromptit ja tarkisti sisällön; kolme kevyttä suorittajaa käytti samaa kuvageneraattoria. Ei sijaintiperusteisia uusintoja. Mahdolliset sisältöuusinnat perusteluineen ovat manifestissa.

## Maamerkkien mitat

Mitat ovat visuaalisia pikseliarvioita natiivikoossa. Keskipiste tarkoittaa näkyvän maamerkin rajauslaatikon keskikohtaa; jalustan keskikohta ja näkyvät rajat ovat JSONissa erikseen.

- **Eiffel Tower, principal tile / r07c07**: leveys noin 555 px, keskipiste (416.5, 454) px. Antennin kärki puuttuu kuvan yläreunan ulkopuolelle; koko torni kärjineen ei mahdu kuvaan. Tämä on avoin completeness-poikkeama, ei hyväksytty lopputulos. Jalusta noin11% tavoitetta leveämpi.
- **Eiffel Tower, lower-foot continuation / r08c07**: leveys noin 556 px, keskipiste (417, 96) px. Saman Eiffelin alajalat jatkopalassa; rajaus yläreunassa tarkoituksellinen. Jatkon alin jalka vastaa715px askelta likimääräisesti. Tämä ei palauta pohjoisen kuvan puuttuvaa antennin kärkeä.
- **Arc de Triomphe / r05c07**: leveys noin 202 px, keskipiste (451, 597.5) px. Koko Riemukaari näkyy; jalusta noin12% tavoitetta leveämpi. Vastaanottaja arvioi sallitun lievän ylityksen.

## Sisältö-QA ja jatkokäsittely

**Avoin laatupoikkeama: r07c07:n Eiffelin antennin kärki leikkautuu yläreunaan. Koko torni kärjineen yhdessä palassa -ehto ei täyty.** Tämä kuva toimitetaan raw-ehdokkaana Karttasepän päätökseen, eikä sitä merkitä lopullisesti hyväksytyksi. Lähteen kieltoa ankkuri-iterointiin on noudatettu.

Kaikki 20 kuvaa on tarkistettu lähdeohjeen ja hyväksytyn sisärenkaan viitteiden kanssa. Mahdolliset poikkeamat on kirjattu QA.jsoniin ja maamerkkiraporttiin. Karttasepän kokoaminen, vääntö/leikkaus, pelin kameran tarkistus ja PT:n hyväksyntä odottavat vastaanottajaa. Toimitus ei tarkoita runtime-kytkentää eikä pelijulkaisua. Rengasta 3 ei ole käynnistetty eikä uutta tilausta oletettu.

## SHA256 ja kutsut

| Pala | Kutsut | SHA256 |
|---|---:|---|
| r05c07 | 1 | `ae4ea495dfff7ec2a012412ac3374507631779f49fc2544700d4ba3e956cf968` |
| r05c08 | 1 | `66878bde249e496014805710d503ba409b01f2ab6e716a20bfcbc10d30a865fe` |
| r05c09 | 1 | `cf7a8a1ba6ff612a0a5fe70c59c50850f3fd9f3c4d6a285f201f30e263e1614f` |
| r05c10 | 1 | `d86d0874437a65141d6bbde7788173be376f5dd9a1f01de7e49bb546cd8e491e` |
| r05c11 | 1 | `e6f8810290eece9be4e323f4518a5f03ce8e614210c79f711b20749ca289c2df` |
| r05c12 | 1 | `8ec428c19238a4ea2430280032d5138d6de8f3adedf18bcb57c092c57e625bef` |
| r06c12 | 1 | `4ac27808557128b5e26ad9ee94641db7e2b73d3de150c7746ba1c7b1c7c614d6` |
| r07c12 | 1 | `8f3fa70129c69afaf6afc5869b44b75de3958af6dd14c7f1c6c77328777ea293` |
| r08c12 | 1 | `9c2e8f7d4a1d9615036e85fa583bae58a08fa0f40cf53b6465e2bd8dd58570b4` |
| r09c12 | 1 | `c5240edc7b126e00ea6d8a1d2fdb6a060b369d69326b496f897e0748144c1c39` |
| r10c12 | 1 | `bff218661538bbf2a93624b95202ce0f2d989758efd6142329728eeb55dff826` |
| r10c11 | 1 | `5241ab50a337071bc0d4e77ca377aa3b609f4629c864e7fc642e5e91d3242671` |
| r10c10 | 1 | `2e3d62db461cc280a6989007d8f7dbbdc438cec651a225ac21c3ac8cee6aaef6` |
| r10c09 | 1 | `d70b105a1aa34bfb731ba1fe728aab021770a5928c43e73c7914d0dfcd45edeb` |
| r10c08 | 1 | `80ed79630da6f10e6df41be5fe714ddf0db0eaf0d4db3b80da8c70f055eca874` |
| r10c07 | 1 | `b017cf589fddfa271956d1ff4aff45100108956acef2ca00d8d01fef5d0adba3` |
| r09c07 | 1 | `1371a89246b10978bc8092d2516766f54163eba528aa37a7812926b918da323b` |
| r08c07 | 1 | `12c6b5de0e0568d3eb588c45ad6a5da0979918b9f926955177d51c1ae5b62ae6` |
| r07c07 | 1 | `f8831c3c9bf228156011ac5aa2137ea6dcdfaa5ca278d00a895d640cd78c8e24` |
| r06c07 | 2 | `669615ba03c928ab0f17f0979a593a61a482faae21fa1d1083aded2d38005509` |

Liitteet: 20 PNG:tä, manifest.json, QA.json, landmark-measurements.json, mahdollinen riippumaton maamerkkitarkistus ja SHA256SUMS. Karttatietojen alkuperä: © OpenStreetMap contributors. Vain claude/postilaatikko.
