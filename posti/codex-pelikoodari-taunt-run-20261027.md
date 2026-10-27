# Codex → Pelikoodari: taunt_run molemmille asuille, tekninen tarkistustoimitus

Puyi katsoo olkansa yli ja elehtii juostessaan: `taunt_run`2,4s perus- ja viittamallille. Ei uutta mallia tai generointia. Paikallinen paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/taunt-run-review-v2/`.

12leikkeen kumulatiiviset liiketiedostot, pohjana90d72c063:n korjattu11leikkeen kirjasto. Kaikki aiemmat kanavat/näytteet ja kaksi kaavun weights-kanavaa säilyvät tavutarkasti. Uusi taunt_run lisätään/korvaa nimellä, päämallia ei korvata.

- `motions/puyi-perus-liikkeet.glb`:6 929 640tavua; SHA256`6b702dbe99caf689f092ec3c33ee91199e1cdcddd099c5debf69ac8848377b8d`.
- `motions/puyi-liikkeet.glb`:7 712 772tavua; SHA256`a1763a35566d64c51290e12283ca58ddbb13f54b6d2ab1ca25b9d6d71ff9629b`.

Juuri[0,0,5*t], +Y ylös,+Z eteen, ilman lisäsiirtoa tai land_soft-väliä. Runin lähdevaihe alku0,152s; lopussa perus0,96200018s/viitta2,17033344s, lähdenopeus1,9. Sovita0,18s pelisiirtymä/run-vaihe erikseen. Tauntissa morfi0, ei weights-kanavaa:1187:n reset hoitaa sen. Mukana ROOT-SAMPLES.csv ja parameters.json.

**QA ja rajoitus:**960Hz lattia sekä240Hz nivel- ja käsi–vartalo-testit PASS, risteämänäytteitä0. En väitä kaikkia testejä läpäistyiksi: tiukka saappaan pinnan6mm-testi on FAIL ja mukana sellaisenaan. Vanhojen luupainojen vuoksi pohjan reuna muuttaa muotoaan enintään8,93mm/perus ja7,42mm/viitta; samojen todellisten lähellä lattiaa olevien pisteiden pahin ero6,10mm/3,30mm ja mediaanin pahin ero0,485mm/0,126mm. Nilkan lukitusvirhe≤0,235mm. Koko jalkaterän aiempi liukuminen on pienentynyt huomattavasti, mutta pieni kengän pinnan muodonmuutos jää tarkistettavaksi pelissä. Säilytin päämallin luupainot.

Takaa yläviistosta ja edestä8asentoa/asumalli tarkistettu; kuvat posti/juoksupeli-liikkeet-20261027/taunt-run-review-v2/qa/. Tämä on tekninen tarkistustoimitus tunnetulla rajoituksella, ei pelikoe-, KK- tai omistajan hyväksyntä. Viitan aiempi kainalokorjaus erillisenä auki. Ei ääntä/huulisynkkaa tässä. Krediittejä0. GLB:t vain paikallisessa paketissa.

Jatkan muita liuku-/loikkavariaatioita ja viitan korjausta. Loikkien tapahtuma-aikakysymys90d72c063:ssa odottaa vielä vastausta; muita töitä ei pysäytetä siihen.
