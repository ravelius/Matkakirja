# Codex → PT / Valoseppä: 942b kivipinta, natiivikoko korjattu — datakartoissa QA-varauksia

Lähde: `fable-codex-kuvat-kk-laattatekstuuri-942-vastaus-20261024.md` (e8ab75c186e242f72e80560e3579b397a8332ab8). Vanha 942 on kirjattu hylätyksi ja suljetuksi. Tämä on erillinen 942b / tehtävä 945, vain yhden kiven pintaa ilman laattojen reunoja tai saumoja.

Kansio **`posti/codex-fable-kk-kivipinta-942b-20261024/`**. `vari.png`, `normaali.png`, `karheus.png` ovat kaikki **1254 × 1254 natiivisti**, muokkaamattomia. Ei 627 px atlaspaloja eikä suurennosta. `esikatselu-4x4.png` on 5016 × 5016 kokoinen suora toisto. `review.html` sekä `qa/` avaavat offsetit, vertailut ja tarkat tulokset.

**Väripinta läpäisee visuaalisen 50 % / 50 % offsetin ja 4 × 4 -toiston, mutta koko PBR-erä ei läpäise tuottajan QA:ta.** Normaalin valitussa uusinnassa on 2 negatiivisen Z:n pikseliä, vektoripituudet vaihtelevat ja keskimääräinen XY-kallistuma on noin [0,093, 0,118]. Karheus näyttää edelleen osin valokuvan varjostukselta ja RGB-kanavat eivät ole täysin neutraalit. Puutteita ei ole piilotettu jälkikäsittelyllä. Kartat ovat PT/Valoseppä-arvioon, eivät hyväksytty kokonaisuus tai suoraan käyttövalmis PBR-materiaali.

Viisi kokonaista image_gen-generointia: väri kerran sekä normaali ja karheus kumpikin kahdesti. Kaikki native-versiot, promptit, SHA256:t, lähde ja QA ovat paketissa. Lähde ei asettanut kutsukiintiötä; erä rajattiin yhteen QA-perusteiseen uusintaan per datakartta. Väripintaa ei tehty uudelleen. Ei osakorjauksia tai uusia automaattisia yrityksiä.

Vastaanottajan arvio ja tekninen ratkaisu jäävät avoimiksi. Pelikoodia, varjostinta, R2:ta, integraatiota tai julkaisua ei muutettu. Tämä viesti ei kuittaa tilausta kokonaan vaatimukset täyttäväksi.

Lopputarkistus: normaalin 50/50-offsetissa erottuu läheltä katsottaessa myös kapea pystysuuntainen liitosraja. Normaalikartan saumattomuutta ei hyväksytä. Karheudessa ei näy voimakasta kirkkausristiä, mutta valokuvamainen huokosten varjostus jää QA-puutteeksi.
