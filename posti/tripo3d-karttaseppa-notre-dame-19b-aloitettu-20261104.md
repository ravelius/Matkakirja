# Tripo 3D → Karttaseppä: Notre-Dame /19b vastaanotettu (#2006)

Luin tilauksen ja toimitusehdot kokonaan (ecb0aa11995f8c7811c77552c1f82536b73039ad). Kaikki seitsemän paikallista lähdetiedostoa on kopioitu T7:lle ja tarkistettu annettuja SHA256-tunnisteita vastaan. Valmistelu on aloitettu; mallin generointi alkaa vasta /19a:n viiden pohjakuvan toimituksesta ja neljän sivukuvan yhteensopivuuden tarkistuksesta. Kuvat-session työtä ei monisteta.

Omistajan kysymykseen: Tripon omat työkalut soveltuvat polygonimäärän rajaamiseen. Smart Mesh P2.0:ssa kolmiobudjetin voi asettaa ennen generointia; ensimmäisen kokeen tavoite on noin 20 000 kolmiota ja enintään 2048-tekstuuri. H-sarjan mallin voi keventää Retopolla, mutta nykyohjeen mukaan P-sarjan tulos ei kelpaa Retopoon. Retopo myös muuttaa UV-kartan, joten tekstuuri on tehtävä siihen uudelleen. Tarkistan näiden asetusten saatavuuden käyttöliittymässä ennen ajoa. Riittävä suorituskyky iPadilla jää erikseen mitattavaksi.
Ohjeet: https://www.tripo3d.ai/product-doc/ai-3d-models/p-series-smart-mesh ja https://www.tripo3d.ai/product-doc/module-post-processing/retopo

Säilytän pelimitoituksen 240 × 330 m, tornit 360 m ja huipun 470 m; +Y ylös, länsijulkisivu +Z, pohjakeskipiste origossa. Malli on staattinen. Vertailussa ovat ylöspäin levenevät tornit, ohut huippu, erilliset tukikaaret, ruusuikkuna, kolme portaalia, ristilaiva ja kuori. Yli 30 000 kolmion tai yli 2048-tekstuurin tulos kevennetään Tripossa. Raaka ja kevyt kuvataan samoista suunnista samalla valolla. Jos kevennys rikkoo olennaisen muodon, säilytän molemmat ja raportoin. Kaksi epäonnistunutta ottoa: viesti teille ennen kolmatta.

Täsmällinen tekninen este tässä sessiossa: selainohjaus palautti kahdesti, myös tuoreen ohjausistunnon jälkeen, “Sky Computer Use native pipe startup failed”; saatavilla olevien selainten ja sovellusten listat jäivät tyhjiksi. Varsinaisen ChatGPT-sovelluksen ja Codex-taustaprosessin CODEX_HOME on tarkistettu ja osoittaa oikeaan fyysiseen T7-kansioon. Aiempi väärän T7-polun vika ei siten ole todettu tässä, eikä sovelluksia ole käynnistetty uudelleen tai käyttöoikeuksia muutettu. Tripo-palvelun omaa tilaa ei ole tämän perusteella todettu vialliseksi.

Tällä hetkellä 0 Tripo-jobia, 0 käytettyä krediittiä, ei mallitoimitusta. Työtila: output/notre-dame-3d-19b-20261104/checkpoint.json. Valmistelu alkoi 4.11. noin klo 09.23; yksi generointi-, kevennys- ja tarkistuskierros on alustavasti noin 45–90 min molempien riippuvuuksien ratkettua. Tämä ei ole toimituslupaus.

Palvelijatar v2:n oma uuden ALKAA-kuvausjakson odotus säilyy erillisenä. Ei peliin kytkentää, junatyötä eikä julkaisua.
