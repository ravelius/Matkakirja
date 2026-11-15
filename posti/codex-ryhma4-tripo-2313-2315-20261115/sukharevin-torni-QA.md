# Sukharevin torni #2313 — riippumaton GLB-kuvien QA

**Verdict: WARNING — KK:n malliarvioon, ei hyväksytty/integratoitu pelimalli.** Viisi katselukuvaa tarkastettu; näkyvä pääsiluetti seuraa hyväksyttyä mallikuvaa, aukkojen syvyys ja piilopuolten lähdevastaavuus jäävät varauksiksi. Ei uusintaa tai korjausta.

Vertailu: hyväksytty `../../sukharevin-torni/sukharevin-torni-model-v1.png` (SHA256 tarkistettu checkpointiin) sekä kaikki viisi `qa-browser/01-plusX-full.png`, `02-plusZ-full.png`, `03-minusX-full.png`, `04-minusZ-full.png`, `05-upper-oblique-full.png`. Kuviin on valmiiksi tallentunut Tripo-UI; tätä QA:ta varten ei käytetty selainta tai tuotettu uusia kuvia.

| Kohde | Havainto |
|---|---|
| Päämassat/siluetti | **PASS yleiselle syötevastaavuudelle:** pitkä porrastettu alarunko, kapea kellotorni, terävä tornihuippu ja yksi ulkoportaikko säilyvät. Ei ylimääräistä korkeaa päätornia tai suurta irrallista siipeä. Sivukuvissa rakennus on kapea ja pitkä; lähtökuva ei yksin todista sen todellista3D-syvyyttä tai mittasuhteita. |
| Portaat | **PARTIAL:** sama yksi ulkoportaikko kiinnittyy rakennuksen päätyyn, kaiteet ja askelaihe näkyvät. Eri akselikuvien portaikon näkyminen ei tarkoita toista porrasta. Askelten tasaisuus, yläpään liittymän täsmägeometria ja sisäänkäyntiyhteys jäävät kuvallisesti varmistamatta. |
| Ala-arkadi | **WARNING:** kaaret ja niitä erottavat tukirungot ovat näkyvää muotoa, mutta useat aukot näyttävät heti kaaren takana vaalealla tasopinnalla suljetuilta tai hyvin matalilta syvennyksiltä. Hyväksytyssä syötekuvassa holvien sisäsyvyys on selvempi. Mallista ei väitetä aidosti läpi avointa arkadia tai porttikäytävää. Pelkkä vaalea tausta ei ole tässä hyväksyntä aukolle; ei säde-/verkkotestiä. |
| Kellotorni/yläaukot | **PARTIAL:** kellot, kerrosvaiheet ja ylin avoimen näköinen aukotus säilyvät. Pienet pilarit ja koristeet pehmenevät/toistuvat; ylimpien aukkojen todellinen läpäisevyys ei ratkea kuvista. Kärkikoriste säilyy mallikuvan tulkintana. |
| Takapuolen tulkinta | **UNCERTAIN:** vastakkaisten sivujen julkisivut ovat hyvin säännöllisiä ja saman detaljikielen toistoa. Syöte oli yksi kulmakuva, joten nämä eivät saa omaa historiallista lähdehyväksyntää. Mallikuvaan jo kuuluneet pinnakkelit, runsas koristelu ja alarungon suhteet eivät muutu varmennetuiksi historiaksi, vaikka Tripo säilyttää ne. |
| Katto ja pinta | Yläviisto näyttää yhtenäisen matalan katon kellotornin ympärillä; ei valtavaa uutta katettua piharakennusta. Kattosaumojen ja piilokattopinnan kaavio on tulkintaa. Vaalea neutraali pinta säilyy; pienet koristeet ja kattokuviot ovat paikoin rakeisia/sulautuneita. Kuvista ei näy selvää irrallista suurta kattopalaa. |

**Koordinaatit:** neljä katselusuuntaa ovat katselimen paikalliset+X,+Z,-X,-Z, viides yläviisto. Niitä ei nimetä maantieteellisiksi ilmansuunniksi. Fyysinen mittakaava ja geografinen rekisteröinti ovat avoimet.

**Metadata:**1 850 493 kolmiota,1 061 245 POSITION-verteksialkiota,72 986 020 tavua. GLB-verteksialkiot eivät tarkoita hitsattuja geometrisia paikkoja; UI ilmoittaa1 007 401, joten näitä eri laskentatapoja ei sekoiteta. Upotetut JPEG-kuvat: baseColor8192², normal4096², metallicRoughness4096². Ei ulkoisia riippuvuuksia tai vaadittuja laajennuksia. SHA256 täsmää arkistokirjaukseen. Metriikka on rakenneinventaario, ei täysi glTF-validointi tai pelikameratesti.

**KK-rivi:** Kellotornin, porrastetun rungon ja yhden ulkoportaikon hahmo säilyy; ala-arkadin aukot näyttävät osin matalilta/umpitaustaisilta ja vastapuolten aukotus sekä kattokaavio jäävät yhden syötekuvan tulkinnoiksi.

Vain metriikkaskripti,glb-metrics.json ja tämä QA kirjoitettu sallittuun työjuureen. Alkuperäinen GLB säilyi; ei selainta, generointia, renderöintiä, postia tai checkpoint/ledger-muutoksia.
