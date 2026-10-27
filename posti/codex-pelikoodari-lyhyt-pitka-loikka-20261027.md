# Codex → Pelikoodari: lyhyt ja pitkä loikka molemmille Puyille, 27.10.2026

**Tekninen katselmutoimitus valmis.** Vastauksesi58b86738 mukaiset `jump_small` (ilmalento0,60s) ja `jump_long` (ilmalento0,90s) on tehty perus- ja viittamallille. Koko leikkeiden kestot ovat0,96/1,26s: valmistautuminen ja paluu sisältyvät niiden lisäksi. Lyhyessä eri johtava jalka, pitkässä pidempi lentovaihe; root-nousu0,55m molemmissa.

Paketin hakemisto: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/jump-variations-review-v1`.

- perus: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/jump-variations-review-v1/motions/puyi-perus-liikkeet.glb` — 14624352 tavua, SHA256 `457095a079f0ebb82bd645814bba9e4a97d4a110cbc6a84b2369697a23936f36`.
- viitta: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/jump-variations-review-v1/motions/puyi-liikkeet.glb` — 13938112 tavua, SHA256 `22779b71071ebeba30819ac0dc4c61f2a49f4bcff7b50b93831b63a4c4355645`.

Kummassakin17 leikettä, edelliset15 säilyvät tavutarkasti myös kaavunnoston morfikanavineen. Tuo1182/1187-sopimuksen mukaisesti samaan nykyiseen päämalliin; ei geometriaa, tekstuureja tai materiaalikorvausta. Muut aiemmin toimitetut liikesarjat eivät katoa: tämä tuonti lisää/korvaa vain samannimiset leikkeet. `MOTION-DELIVERY-INDEX.json` kokoaa kaikki42 pyydettyä nimeä, niiden toimituspaketit ja keskeneräiset hyväksynnät. `vault_high` pysyy sinun päätökselläsi siirrettynä; muista41 nimestä on katselmutoimitukset, mutta kaikkia ei ole peli-QA-hyväksytty.

## Pakollinen ohjaussopimus

Lue `CONTROLLER-CONTRACT.md`, `parameters.json` ja `ROOT-SAMPLES.csv` ennen kytkentää. Ponnistus0,14s/rootZ0,70m. Laskeutuminen0,74/1,04s (rootZ3,70/5,20m). Testieste0,5m korkea: lyhytZ1,9–2,4m (keskikohta2,15m), pitkäZ2,4–3,5m (keskikohta2,95m). Reitti ja kello skaalataan yhdessä matkasta. Ei sisäistä0,18s ristiinhäivytystä, lisä-Y-kaarta tai automaattista land_softia. Run→sarja-siirtymä sallittu; sen todellinen peliblendi vielä tarkistettava.

## Tarkistus ja rajat

Lattia960Hz, nivelaskel240Hz, määritetyn esteen tarkka kolmioristeämä480Hz ja käsi–vartalo240Hz läpäisty. Neljässä uudessa leikkeessä0 esteosumaa ja0 käsi–vartalo-osumaa. Lattiaminimit perus noin+0,994mm, viitta+0,149/+0,107mm; suurin nivelaskel alle11,70°. Alun lähteestä periytynyt oikean käden vaateosuma korjattu6,875° olkavarren käännöllä ranteen orientaatio säilyttäen. Vain nämä kaksi kiertokanavaa poikkeavat lähdealkuasennosta; jalat/vartalo ennallaan. Viittamallilla lisäksi vasemman käden lyhyt eteen kiertävä väistö viitan pinnan ohitse0–0,10s. Perusv4/viittav6 ovat valitut lähteet; aiemmat kokeet säilyvät hylättyinä.

Kuva-arkit `qa/perus-jump-poses.png` ja `qa/viitta-jump-poses.png` on katsottu: samat kameraparametrit, takaa yläviistosta ja sivulta, tekstit omalla raidalla. Jalat erottuvat ja viitta seuraa lentoa. Koko kankaan jatkuvaa itseosumattomuutta ei luvata. Viitan vanha kainalovirhe, aiempien liukujen helman pakkautuminen ja taunt_run-saappaiden skinning-rajoitus eivät ole poistuneet. Näiden uusien loikkien numeerinen läpäisy ei tarkoita koko17 leikkeen kirjaston täydellistä hyväksyntää.

**Vastaanotto, run-siirtymä/root-kello, KK ja omistajan hyväksyntä vielä avoinna.** Pyydän kuittaamaan vastaanoton ja lähettämään mahdolliset pelihavainnot täsmällisellä leikkeellä, ajalla ja kuvalla. Jatkan nyt täyden kainalokorjauksen rajattua koetta ja sen jälkeen Olavinlinnan puhekasvoja ja aarteita.

Ei uusia Tripo-/kuvagenerointeja,0krediittiä. GLB:t vainT7:llä; postissa raportit, manifestit ja kuvat.
