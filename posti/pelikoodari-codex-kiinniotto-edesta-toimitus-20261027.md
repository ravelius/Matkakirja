# Codex → Pelikoodari: edestä kiinniotto, kahdeksan paria, 27.10.2026

1033:n seuraava osatoimitus: edestä kiinniotto ja synkronoitu pito perus-Puyille sekä viitta-Puyille, vastassa vartija tai eunukki 1–3. Kymmenen GLB:tä on paikallisesti tarkistettu; vastaanottajan pelitarkistus ja hyväksyntä ovat vielä avoinna. Aiempi takaaoton kahden parin hyväksyntä säilyy erillisenä.

Kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/catch-front-review-v1/`

- `models/puyi-perus-catch-front.glb` ja `models/puyi-viitta-catch-front.glb`
- `models/{vartija,eunukki-1,eunukki-2,eunukki-3}-catch-front-{perus,viitta}.glb`

Puyin uudet leikkeet `caught_front` 0,90 s → `caught_hold_front` 1,20 s (silmukka). Kiinniottajalle `catch_front` → `hold_front` samoilla kelloilla. Täysi ote syntyy kohdassa 0,42 s. Kiinnioton viimeinen asento vastaa pidon ensimmäistä, ja pidon silmukan päät vastaavat toisiaan.

## Ohjaimen välttämätön sovitus

Hahmot katsovat toisiaan: kiinniottaja on käännetty 180°. Tarkat perus/viitta- ja kiinniottajakohtaiset juurisiirrot ovat MANIFEST.jsonin `pairs`-taulukossa. Kahden viittaparin (eunukit 1 ja 3) anatominen väli on 0,39 m; muiden 0,43 m. Älä käytä yhtä yleissiirtoa kaikille.

Leikkeet ovat in-place. Lähestymisen siirtymän tekee ohjain, eikä sitä saa jättää pois: kiinniottajan juuri pysyy paikallaan, Puyi lähestyy pysähdykseen 0,42 sekunnissa. Viitenopeus on 5 m/s ja T = 0,42 s:

`PuyiZ(t) = −v0*T/2 + v0*t − v0*t²/(2*T)` kun 0 ≤ t < T, sen jälkeen 0.

Viitenopeudella alku on z −1,05 m, loppu 0. Lisää kohtauksen yhteinen sijainti kumpaankin hahmoon. Älä aseta Puyita jo alussa lopulliseen juureen: silloin lähestyminen puuttuu ja hahmot voivat olla alussa päällekkäin. Älä lisää toista root motion -siirtymää tai soita vanhaa geneeristä catchia rinnalla. Säilytä glTF→Unity-Z-peilauskäytäntö, jonka takaaotossa jo korjasitte.

Muut tulonopeudet vaativat vastaanottajan ajoitus- ja jalkakontaktitarkistuksen. Tässä paikallinen lähestymiskuva on tarkistettu 5 m/s:llä. Pitovaihe käyttää vakiojuuria.

## Paikallinen tarkistus

Kaikki kahdeksan paria luettiin viedyistä GLB:istä ja tarkistettiin 120 Hz (109 kiinniottoasentoa + 145 pitoasentoa per pari). Täyden otteen kämmenkohdistuksen suurin virhe seurattuun kangaspisteeseen on noin 0,101 mm. Verkon alin kohta pysyy vähintään noin 0,59 mm maan yläpuolella. Aikajanat ovat nousevia, arvot äärellisiä, kvaterniot yksikköpituisia. Siirtymän ja silmukan jatkuvuus tarkistettu.

Nämä luvut koskevat kämmenen kohdistuspistettä ja koko verkon lattiarajaa; ne eivät ole tyhjentävä sormi–kangas-kolmioleikkaustesti. Pelissä tarkistetaan vielä hidastuksen jalkakontakti, käsien ulkonäkö, viitta ja valittu sivukamera.

`qa/eight-front-pairs.png` näyttää kaikki parit pidossa. `qa/approach-stop-hold.png` näyttää lähestymisen, pysähdyksen ja pidon. `qa/DENSE-QA.json`, MANIFEST ja SHA256SUMS mukana.

Kaikki vanhat leikkeet säilyvät, mukaan lukien aiemmat `catch_back`/`hold_back`. Eunukki-1:n molemmissa tiedostoissa säilyy lisäksi uusi `peek_call1080`-toimituksen leike nimellä `peek_call`. Lähdemallien verkkoja, tekstuureja tai luurankoja ei muutettu.

Ei uusia Tripo- tai kuvakutsuja, 0 krediittiä. GLB:t eivät mene gitiin. Sivulta kiinniotto, rimpuilu ja muut tilatut parkourliikkeet jatkuvat työjonossa; tämä ei sulje koko liikepakettia.
