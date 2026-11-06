# Natiivi-UI: luovutus 6.11.2026 klo 02.25 (konteksti noin 27 %, 7.37)

Täydentää -0146:aa (haara natiivi-ui/luovutus-20261106-0146, vesinimet ja kipsipäät) ja sen kautta -2248:aa ja -2002:ta.

## Jono
Ensin alla oleva KK:n kyltin häivytys. Ei omaa ajoa käynnissä. Odottaa: seuraava JU-ajo, jossa proto natiivi-ui/merkki-pinta-219 9e2d0edba on mukana (kerrottu JU:lle ja PT:lle) (pyydetty PT:ltä 02.2x; sisältää vesinimet 0a5232aec). Ajosta kuva ja rivi PT:lle ja KK:lle.

## Merkit ja nimet maanpinnalle (PT 02.2x, KK sallii kokeen; ei omaa ajoa, ei junaan)
Haara natiivi-ui/merkki-pinta-219, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi (vaihdettu tälle haaralle, vesinimi-100-219 ennallaan), peili natiivi-backup peili/proto/natiivi-ui/merkki-pinta-219. Kartta-testit 624/624. EI KÄÄNNETTY UNITYSSÄ: C#-virhe voi yhä tulla JU:n käännöksessä.

Syy (viety PT:lle ja KK:lle): RuutuPiste ilman korkeutta laskee pisteen 0 metriin, kartta piirtyy kertoimella 2. Ajo natiiviseppa-pariisi-maa2-64820ec1a, kuva m5, kamera NS:n sovitus: Sacré-Cœur 0 m y 1121, 258 m y 848 (kartan kirkko 850) = 273 px; kyltti 42 px pisteen alla = NS:n noin 310. Kuva on kyltin oikealla, siksi x 1470.
Tasaisella 100 m:n pinnalla noin 98 px 45°:ssa. Tarkistukset: Grand Châtelet'n kuvan alareuna m4:ssä täsmää 0 m:iin (1897, 1157). Place du Tertre (nimi) m5: y 1121, 0 m 1141, pinta 866. EI TÄSMÄÄ: Les Hallesin kyltti m4:ssä 130 px pisteen alla, odotus noin 42; syy auki.

Tehty: Kartta/MaanPinta.cs (Cesiumin SampleHeightMostDetailed, noin 150 m:n ruudukko, 32 kulmaa erässä, uusin ensin, aikaraja 10 s, sen jälkeen 0; loki "MATKAKIRJA maanpinta") ja MaanPintaRuudukko.cs (puhdas, testit). Portti: ElavaTyyli.Striimi ja PariisiKallistus.Osuus > 0; muualla 0 kuten ennen. Kutsut: Kohdenostot, NostoKerros.LisaaRuudulta, NostotKartalla (lepoliike), SaapumisKuvat.Ruudulla, Nimikerros.HaePaikka (r.elava). Merkki ja nimi eivät näy ennen korkeutta, joten eivät hyppää. Piirroksen näkyessä korkeus laskee nollaan.

Katso ajosta:
- Sacré-Cœurin merkki kirkolla (m5), nimet paikoillaan, Grand Châtelet, Les Halles, Tuileries (avoin -2248:n kohta 4: voi olla sama syy, ei mitattu).
- Loki: "maanpinta"-rivit, onnistuneet näytteet. Mittaa, tuleeko pinta NS:n kaavaa 2 × maa + 30 vastaavaksi.
- Viive KK:lle (loki: merkki … näkyy X s, korkeudet valmiit X s, rajan ylitykset; 9e2d0edba). Jos nimet viipyvät liikaa: nimille valmis korkeusruudukko tai vain lähitasot.

Yhdistyminen: ei ristiriitaa natiiviseppa/ajo-pariisi-maa2:een eikä liikevahti-219:ään. malli-kyltit-liike-219 törmää MalliKyltit.cs:ssä vanhalla, tiedetyllä rivillä (ratkaisu ae7278c0a, -2248), ei tämän takia.

Ennallaan, kerrottu PT:lle: Erikoisnostot:143 ja Lautapelinostot:119 (0 m), MalliKyltit (Sovita(90) = 180 m, mallit 90 m; näkyy vain, kun malli ei vielä näy; 2.215:n takia ei muutettu ilman sanaa), NostoKerros:857 ja muut ruudulla-tarkistukset.

## KK 02.2x ja 02.3x: mitä kuvaparilta odotetaan
Kokemus: merkki, kyltti, pieni kuva ja nimi ovat joka kulmasta sen paikan päällä, jota ne nimeävät; Sacré-Cœurin kyltti kirkon kohdalla. 2.215: "nimiä ei ole koskaan muualla kuin näkyvän kartan päällä". Ei saa muuttua: kylttien koko ja näkymisen etäisyys (kortti 20.08), kaupunkipallot.
Kuvapari KK:lle seuraavasta Mac-ajosta, samat kamerat kuin m4 ja m3 (sk-pariisi-maa2.txt), ennen | jälkeen. Kerro KK:lle: siirtyykö Tuileries'n merkki pois Louvren seinältä (älä oleta), kuinka pitkä viive oli, osuuko kyltti rakennuksen päälle, häivyttääkö usva kyltin aiemmin (piste nousee ruudulla, m.Piste.y).
Ei iPad-ajoa eikä muistimittausta tämän takia (2.209).

Tarkistettu ilman ajoa, kerrottu KK:lle:
- Tasainen kartta (637444ed4, fb45a72c0, oletus pois, kortti auki): KorkeusKerroin.Tasainen vain varjostimessa, joten MaanPinta ei tiedä siitä. Jos omistaja valitsee: sama kaava C#:iin ja MaanPinta käyttää sitä.
- NS:n talot: Sovita(maa + 15) palan korkeudesta, merkit Cesiumin näytteestä; ero mitattava ajosta.
- Nimet: jono 2995, talot 2994, ZTest Always: nimi talojen päällä. Mallit 3080 nimien päällä, väistö ennallaan.
- Les Halles: peli käyttää kartanPiste 48.8622, 2.3447 (sijainnit-json), en lat/lon-arvoa: m4:ssä 0 m (1600, 711), kyltti (1602, 798). x täsmää; y:ssä 45 px yli Sacré-Cœurin 42 px:n, syy auki, ei korkeudesta. Grand Châtelet kartanPiste 0 m (1898, 1112), leikkeen keskikohta (1897, 1111).

## ENSIMMÄINEN TYÖ: kyltti häipyy UI:n alla (KK, aloittamatta, siirretty kontekstirajan takia)
KK:n sanat: "sopii kokeena, samaan haaraan, ei omaa ajoa, ei junaan. Kyltti häipyy pehmeästi, kun osuu RANSKA-otsikkoon tai Liiku-riviin; ei siirry, ei vilku kameran liikkuessa, ja napautus ei mene piilossa olevalle kyltille. Pallo nimen päällä saa jäädä. Omistajan sanaa ei ole puolesta eikä vastaan; kerron aamulla. Kuva yhteisen ajon mukana."
Haara natiivi-ui/merkki-pinta-219 (kärki 9e2d0edba), worktree wt/proto-natiivi-ui-vesinimi. Koskee kolmea kylttiä; omistajan kortin mukaan ei muuta kokoa, näkymisen etäisyyttä eikä sivua (2.215).
Luettu koodista, tarkista:
- Ruudut: NostotKartalla.KalusteetPaneeliin (rivi noin 1388) täyttää kalusteRuudut lähteestä KaupunkiMerkit.Kalusteet. TARKISTA, onko RANSKA (Kartuscha) ja Liiku-rivi siinä listassa; muuten lisää niiden worldBound.
- Kohdekyltti: NostotKartalla: KylttiUsva (rivi 1088), kalusteet ohitetaan kohteilta rivillä 1319 (!kohde), peitto rivi 1333, törmäys 1137, piiloon 1248. Lepoliike rivi 515 vain siirtää translatella: tarkista, että tila päivittyy joka ruutu liikkeessä, muuten vilkkuu.
- Pallon kyltti: KaupunkiPallot.cs rivit 725–737 (KarttaKyltti.Aseta peitolla, VaraaHintakyltti vain kun näkyy).
- Mallikyltti: MalliKyltit.Paivita (r.Kyltti.Aseta ... peitto); Osuma käyttää r.Laatikkoa, joka asetetaan vain, kun peitto > 0.05: napautus hoituu, kun Laatikko jää nollaksi.
Suunnitelma: häivytys ErikoisnostoMitat.Haivytys(nyt, kohde, dt, kesto) (valmis, liikevahti ei hermostu; ei uutta MoveToward-kaavaa), tila per kyltti. Ei vilkkumista: osuma-ala kasvaa noin 8 pt:llä, kun kyltti on jo piilossa (hystereesi). Napautus vain, kun peitto > 0,05. Testi puhtaalle hystereesille Kartta-testeihin. Kuva yhteisen ajon mukana; ei omaa ajoa.
Ilmoita uusi kärki JU:lle ja PT:lle. Tarkista viestiraja: SendMessage on pysähtynyt, varakanava mcp__ccd_session_mgmt__send_message (CLAUDE.md VIESTIRAJA).

## PT 02.5x (KK): kuvat lokit/valoseppa-maa2-0d317ab6f (ei korkeuskorjausta), ei omaa ajoa, ei junaan
1) p-lp: viety KK:lle, odottaa KK:n sanaa: suositus kyltti häipyy, kun osuu otsikkoon tai Liiku-riviin, ei siirry (2.215). Kalusteruudut ohittavat kohteet: NostotKartalla.cs:1319. Pallon kyltti ei korjaudu korkeudella. Pallo Pompidou-nimen päällä: pallo jää ulos (KK 19.59), ei muuteta.
2) tsj-lahi-pohj: Les Hallesin kyltti Saint-Eustachen mallin päällä: katso vasta ajosta lokit/karttaseppa-pariisi-sc4-4c63d8662 (sisältää 9e2d0edba; kansiota ei vielä ollut). Tulos rivinä KK:lle. Sama ajo antaa viiveen ja kuvaparin, jos kamerat m4 ja m3 ovat mukana.

## LOPPUTESTIT (oma lista, ei tehdä nyt; siirrä jokaiseen uuteen luovutukseen; mainissa ei ole yhteistä listaa)
- iPadin muisti, kun Pariisi on valmis (2.209): MaanPinnan lisäkyselyt lataavat laattoja (raja 4080 Mt).

## Huomiot
- Lukulista 7.47: en lukenut lukuja 4 ja 6 tässä vuorossa (konteksti), vain 7.47. Lue seuraavassa.
- KK:n osoite tällä koneella on local_231e4bad, ei tilin sami.reivinen@vvi.fi riviä local_d5f31591 (session not found). Globaali CLAUDE.md: omistajan asia, ei muutettu; kerrottu ikkunassa.
- Valovahdin kolme osumaa (Komennot, Nahtavyysalue, NotreDameKirkko) ovat vanhoja, eivät tästä haarasta.
