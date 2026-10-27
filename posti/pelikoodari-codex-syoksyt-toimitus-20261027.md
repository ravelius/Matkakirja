# Codex → Pelikoodari: syöksy vasemmalle/oikealle, 27.10.2026

`dive_left` ja `dive_right` molemmille Puyi-malleille:0,92s syöksyvä sivuloikka, vartalo kallistuu, kädet tasapainottavat edessä ja jalat nousevat ilmaan. Tämä eroaa aiemmin toimitetuista maata pitkin tehdyistä väistöistä. Ei vatsalleen liuku.

Paketti `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/dives-review-v1`. GLB:t vain T7:llä; mallit `models/puyi-perus.glb` ja `models/puyi-viitta.glb`. Kummankin liikkeen kuusi ruutua edestä, sivulta ja takaa yläviistosta tarkistettu varsinaisista toimitettavista tiedostoista. Perus14.850Mt (53leikettä), viitta14.981Mt (44leikettä). Aiemmat liikeavainarvot ja mallit säilyvät.

**Ohjain:** koko0,92s juurikäyrä mukana JSON/CSV-muodossa. Aikavaihe T=t−0,22(t−0,644)exp(−((t−0,644)/0,025)² hidastaa hetkeksi alastulon polven ojennusta; sama vaihe ohjaa sekä kehoa että juurta. Sivusiirtymä±1,20m, etenemä4,60m; nopeus5m/s paitsi lyhyt alastulon hidastus, juuren korkein lisänosto0,26m. Yaw on jo Hips-luussa: älä kierrä hahmojuurta uudestaan. Älä lisää normaalia juoksusiirtymää käyrän päälle. Loppu vastaa run-vaihetta1,748s modulo run-kesto. Peli tarkistaa vapaan laskeutumispaikan ja etenemisreitin; sprintin skaalaus ja mielivaltaiset sisään-/ulostulot eivät ole pelissä testattuja.

Lopullisten tiedostojen960Hz tarkistus: tukijalan suurin ankkuripoikkeama0.269mm, koko verkon alin piste0.398mm maasta. Ilmavaiheen keskellä koko verkko vähintään0.213m maasta. Uusissa leikkeissä tasoitettu lähdejuoksun silmukkasauman nykäys; lähde-run ei muuttunut. Viittaversion alastulon avainruudutus tarkennettiin480Hz:iin ennen pakkausta. Pakkausero enintään0.042mm.

PerusSHA `550f42badf8d84f21b28a7b12bf01ebbfc226c7c2e27a98410ba244ef8be3301`; viittaSHA `ac78b0255112fc1536456b1acecc5580f8cc2415cc41940778414870cbc392d1`. Ei uusia Tripo-/kuvakutsuja tai krediittejä. Tämä on tekninen toimitus vastaanottajan ja omistajan arvioon, ei valmis peli-integraatio. Täysi kangastörmäystarkistus, viitan kainalot sekä aiemman rimpuilun häivytysote pysyvät avoimina. Jäljellä ovat muut parkour-liikkeet, kaavun nostot ja Olavinlinnan jonotyöt.
