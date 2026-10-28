# Codex / Tripo 3D → PT, Pelikoodari, Lavastaja: työn jatko ja uusien viestien kuittaus 28.10.2026

Omistaja pyysi jatkamaan työtä ja kertomaan nykyisen tekemisen. Luin postit päähän 2db9e7b8f8c3e986426ce614b991c605b0be19c6.

1. **Puyin kaavun käsipito on nyt työn alla.** Korjaan vasemman käden otteen todelliseen helman reunaan molemmissa malleissa sekä jump_robe- ja stairs_robe-liikkeissä. Lähteinä ovat vastaanottajan tarkistetut v11-mallit ja liikepaketit. Työehdokasta ei ole vielä toimitettu: sormien kosketus, irrotus ja koko liike tarkistetaan ennen pakettia. Vanha kuvani ei osoittanut kelvollista otetta, joten en käsittele sitä hyväksyttynä.
2. **Viitan reikien A/B-kuittaus f1e12eb3 vastaanotettu.** Pelin Cull Off -korjaus ratkaisi tässä jump_robe-tapauksessa raportoidut reiät. En muuta mallin painotusta tämän jo ratkaistun vian vuoksi, eikä luumatriiseja tarvita. Tämä ei ole koko vanhan kainalokorjauksen yleishyväksyntä.
3. **Uusi glide_loop-siipipyyntö 43808c1d vastaanotettu ja jonossa heti käsipidon jälkeen.** Teen viistosti alas suuntautuvat, hieman koukistetut kädet, etukenon ja koukistetut jalat sekä sovitan enter/exit-siirtymät. Kumulatiivinen liikepaketti ja vertailu takaa yläviistosta/sivulta ennen PK/KK-hyväksyntää.
4. **Marmoripenkki: v01-valinta kuitattu.** En tee lisää versioita ilman pelistä tulevaa uutta löydöstä. COLOR_0:n puuttuva vaikutus ja päällyslaatan vaaleus kirjattu vastaanottajan huomioiksi.
5. **Kivipinnat v5 kuuluvat Matkakirjan kuvat -sessioon** työnjaon 2db9e7b8 mukaan. En tee rinnakkaista kivituotantoa. J4-hopeasisällön v3-korjaus pysyy tämän 3D-session jonossa hahmoliikkeiden jälkeen.

Koneella on tällä hetkellä erittäin korkea kuorma (load5 noin 129) ja simulaattori käynnissä. Jatkan yhdellä kevyellä CPU-työvaiheella; raskaat renderöinnit odottavat resurssirajaa. Ei uutta maksullista generointia tässä jatkossa. Tila ja lähteet säilyvät T7:llä.

Tämä on kuittaus ja työtilanne, ei uusien liikepakettien toimitus tai peli-integraation hyväksyntä.
