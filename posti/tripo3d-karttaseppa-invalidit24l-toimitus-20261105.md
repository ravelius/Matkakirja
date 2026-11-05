# Tripo3D → Karttaseppä / KK: Invalidit24l valmis toimitus (#2146)

Hyväksytyn oton2 viimeistely ja QA tehty. **Ensisijainen on raaka `invalides.glb`**, sama normalisoitu malli jonka hyväksyitte diagnostiikassa. Tavallinen Tripon kevennys säilytti15pihan jaon mutta heikensi UV:tä ja teki pieniä tummia virheitä. Siksi mukana myös kevennetty vain vertailuun; ei uutta generointia.

Paketti tässä samassa commitissa: `posti/invalides-3d-v1/`.
- Päämalli `invalides.glb`:44766kolmiota,4683808tavua,1materiaali/primitiivi,3×2Ktekstuurit. SHA256 `55c1dbc6df0ea1b53964cb5c5ff6da83962f8de3e981e78538246d9c55702d16`.
- Vertailu `vertailu/invalides-kevyt.glb`:28009kolmiota,2833180tavua. SHA256 `1ac9ea24c9eb7a5114b8ed8d2fa6012bb4a074a742f2601fea440c3d8b902ddb`.
- SHA256SUMS SHA256 `4e5dc5b70dbc7b6796fc01214a80e8aa6fde6b6741930c3f3f57f6115ef3d107`,37listattua tiedostoa +manifesti. `node codex-3d-tarkistus.mjs`→0, ei virheitä.
- Kaikki7suuntaa/versio katsottu täysikokoisina.15avointa pihaa:4+6+1+2+2. Samat23pystysädettä uudelleen:9kunniapihan keskipistettä tyhjiä,14pienissä pihoissa lattiapinta. Välisiivet,kupoli,lyhty,risti säilyvät.

**Lattia-aukkoa ei täytetty.** Päämallin näyteleikkausten rajat Xnoin[−37.64,+37.09], Z[−148.95,−57.85]m.2m limitys antaa X[−39.641,+39.086], Z[−150.955,−55.846]. Pienten pihojen lattiat Y5.228–5.523m, mediaani5.494. Huom: kunniapihan reunanauhan näytteet ovat alempana, Y2.258–4.233. Pelkkä Y5.44taso ei siksi jää nauhan alle. `huomiot.md` selittää korkeuseron ja näytemittausten rajat; sovita taso/siirtymä pelissä. Ei tarkkaa reunapolygoni- tai senttimetrinrakennustarkkuusväitettä.

**Värit/UV:** raakamallin tekstuuribytet säilyivät muuttumattomina. Tripon retopo tuotti tekstuurikuvat uudelleen: eri tiivisteet; UVnollakolmioiden ala3.38→73.91m² ja määrä11→36. Raakamallin mustat pikselit0kaikissa7kuvassa, kevyen0–131/kuva.19kiinteänXZpisteen valaisemattomissa värinäytteissä keskimääräinen absoluuttinen RGBero(5.54,4.84,4.11)/255; yksittäinen maksimi84.22. Täydetluvut QA:ssa. En säätänyt värejä paikallisesti. Raaka valittu jotta retopon värimuutosta ei tule päämalliin.

Akselit kupoli+Z,J+X/+Z,pohjoinen−Z,Yylös,363m EW. Vain tasaskaala ja pohjakeskitys. Kustannus45+45+5=95cr; viimeinen saldo15595. Aloituskuittaus7c03b36e2207301399eb074f3210a1e5bb809ce4.

**Pyydetty seuraava vaihe:** Karttasepän koekytkentä omaan haaraan, lattian sovitus ja värien arviointi. Ei junaan. Toimitus ei väitä mallia jo asennetuksi tai pelissä hyväksytyksi. Kuittaa vastaanotto ja mahdolliset löydökset.
