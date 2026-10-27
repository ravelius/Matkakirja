# Codex → Pelikoodari: jalat edellä liuku, molemmat Puyi-asut

Uusi slide_feet_first on 0,6 s liike: matala istuva liuku ja paluu juoksuun. Molemmat versiot alittavat paikallisessa testissä 0,95 m poikkipuun. Liikekirjastossa on nyt 13 leikettä; tämän erän ainoa uusi leike on slide_feet_first. Pohjana taunt-toimitus59a6fc93, jonka 12 leikettä ja morfikanavat säilyvät tavutarkasti.

Paikallinen paketti: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/feet-first-review-v1/

- motions/puyi-perus-liikkeet.glb: 8 285 440 tavua, SHA256 281108acde732f4a74c3912242027ca3b078dfe486cd8b6c67ed3803439f8c17.
- motions/puyi-liikkeet.glb: 9 124 840 tavua, SHA256 4dc0bc0dce671f400715baf84be181f27a9c5ebdb099e03671f1cabf22018614.

Tuo vain animaatiot sovitulla1182/1187 menetelmällä. Solmuhierarkia/lepoasento sama; ei geometriaa, materiaaleja tai tekstuureja. Päämallia ei korvata. Puuttuva weights nollaa kaavumorfin.

Root on [0,0,5*t], t=0…0,6 s; matka3m. Ei lisä-Y-kaarta, yawia, ylimääräistä land_soft-leikettä tai toista root-siirtoa. Runin lähdevaiheet: perus alku0,152s/loppu0,042000045s; viitta alku0,1805s/loppu1,320500045s. Lähdejuoksun kerroin1,9. Alkua/loppua verrattiin paikallisesti lattiaan sovitettuun runiin; pelin0,18s siirtymä on vielä testattava. parameters.json ja ROOT-SAMPLES.csv mukana.

Uuden liikkeen paikallinen QA:
- Lattia960Hz: perus vähintään+0,49353mm, viitta+0,49392mm.
- Suurin nivelaskel240Hz: perus7,739°, viitta10,008°; kummassakaan ei käsi–vartalo-risteämänäytteitä.
- Määritellyn0,95m puomin kolmioristeämät480Hz:0 molemmissa. Keskiasennon korkeus perus0,674m/viitta0,708m.
- Alku/loppu vastaavat valmisteltua juoksua alle0,000001m/kvaterniokomponentin erolla. Takaa yläviistosta ja sivulta kuusi asentoa/asumalli katsottu.

Tämä on tekninen tarkistustoimitus, ei pelikoe-, KK- tai omistajan hyväksyntä. Viitan alareuna pakkautuu istuvassa liu'ussa maata vasten; sen taittumisen ulkonäkö on tarkistettava pelin kamerasta. Koko vaatteen jatkuvaa itsetörmäystodistusta ei ole. Aiempi viitan kainalokorjaus sekä taunt_runin saappaan pintaliikkeen rajoitus ovat yhä erillisinä auki.

Jatkan kahta kyykkyliukua, kahta loikkaa ja viitan korjausta. Loikkien tapahtuma-aikakysymys90d72c063 odottaa vastausta; työ ei pysähdy siihen. Tämän erän Tripo-/kuvagenerointikutsut0 ja krediitit0. GLB:t vain T7:llä, raportti ja pienet tarkistuskuvat postilaatikossa.
