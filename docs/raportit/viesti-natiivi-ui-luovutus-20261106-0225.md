# Natiivi-UI: luovutus 6.11.2026 klo 02.25 (konteksti noin 27 %, 7.37)

Täydentää -0146:aa (haara natiivi-ui/luovutus-20261106-0146, vesinimet ja kipsipäät) ja sen kautta -2248:aa ja -2002:ta.

## Jono
Ensin alla oleva työjärjestys. Ei omaa ajoa käynnissä. Odottaa: seuraava JU-ajo, jossa proto natiivi-ui/merkki-pinta-219 9e2d0edba on mukana (kerrottu JU:lle ja PT:lle) (pyydetty PT:ltä 02.2x; sisältää vesinimet 0a5232aec). Ajosta kuva ja rivi PT:lle ja KK:lle.

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

## TYÖJÄRJESTYS (KK, kyllä korkeustaulukolle; korvaa alla olevan odotuksen ja etujonon)
KK:n sanat: "kyllä, valmis korkeustaulukko kokeena samaan haaraan, ei omaa ajoa, ei junaan. Seuraava vuoro tekee sen ensimmäisenä, ja Cesium-kyselyt jäävät pois. Ehdot: kartan alueen ulkopuolella ei 0 m:ä eikä näkyvää hyppyä rajalla (laajenna tai käytä reunan arvoa); mäen laki tarkistetaan kuvasta. Sen jälkeen leikatut kuvat, nimet nurmen ja sillan alla sekä kyltin häipyminen. Kuva yhteisen ajon mukana."
1) Korkeustaulukko. 2) Leikatut kuvat (KK:n vastaus 21.07 vs 2.215 tarkistettava viesteistä). 3) Nimet nurmen ja sillan alla (selvitys KK:lle ennen korjausta). 4) Kyltin häipyminen.

## TAUSTA: KORKEUSTAULUKKO (KK ja PT 03.0x; ei korjausta ennen sanaa, ei omaa ajoa, ei junaan)
KK:n sanat: "merkit ja nimet ovat paikallaan heti saapuessa, ilman odotusta ja ilman lisälatauksia". Viety KK:lle ja PT:lle: suositus korkeustaulukko samasta lähteestä kuin talojen palat. Tämä KORVAA alla olevan viiveen korjauksen (etujono), jos KK sanoo kyllä.
Mittaus: 41 438 näytettä, kaikki onnistuivat; jaksot 14 682 / 23,6 s, 7 490 / 22,3 s, 7 878 / 13,4 s, 8 873 / 9,8 s; erä 35–95 ms; tyhjällä jonolla 0,2 s.
Tekotapa: skripti lukee _tyo/natiiviseppa/pariisi-talot/tee-palat.py:n IGN-datan (T['maa'] = altitude_minimale_sol) ja tekee noin 150 m:n ruudukon (MaanPintaRuudukko, 6 417 kulmaa, int16 noin 13 kt), täyttö naapureista; Resources-tiedosto. MaanPinta lukee sen synkronisesti: 2 × (maa + 15) kuten TaloKerros (64820ec1a), Cesium-kyselyt pois, jono ja "ei näy ennen korkeutta" pois. Alue lat 48.8141..48.9081, lon 2.2412..2.4280; ulkopuolella 0 m tai laajennus. Sijaintitaulukon 38 kohdetta sisällä. Tasainen kartta: kaava samaan lukijaan, jos omistaja valitsee. Tarkista kuvasta mäen laki.
Kyltin häivytys (alla) on KK:n hyväksymä, ei riipu tästä.

## KK:N LISTA (nui-m4 ja nui-m3 katsottu; samaan haaraan, ei omaa ajoa; SELVITYS KK:LLE ENNEN KORJAUSTA)
1) Kadonneiden leikatut kuvat puuttuvat: nui-m4:ssä Grand Châtelet on kyltti + pyöreä kuva, vanhassa m4:ssä (64820ec1a) leikattu kuva + kyltti. KK: "2.215 sanoo leikattuina kuvina. Selvitä syy, älä oleta viivettä." Johtolanka: commit 7551a76cc (ks. Kohdenostot.cs:44), tarkista 2.215:n sanat ja omistajan päätöksen aika.
2) Nimet katkeavat Sacré-Cœurin nurmen alle (Place Saint-…, Rue des Trois Fr…, Rue Gabriell…, …vingstone; nui-m3) ja Pont Neuf sillan alle (nui-m4). KK: "nimi kokonaan tai ei ollenkaan." Tausta: mallit piirtyvät jonossa 3080 nimien (2995) päälle; väistö Nahtavyysalue.Peittaa (kutsu Nimikerros.cs). Selvitä, miksi väistö ei koske näitä (malli ja sillat OhjelmaKohteissa?).

## AJON TULOS (lokit/karttaseppa-pariisi-sc4-4c63d8662, kuvat nui-m4 ja nui-m3; sis. 9e2d0edba; kääntyi, 0 virhettä; kerrottu KK:lle ja PT:lle)
- Viive Macilla: merkki mediaani 18,3 s, enintään 34,3 s; rajan ylityksiä 0. Ensimmäinen jakso 22,3 s, 7 490 näytettä: Nimikerros.HaePaikka pyytää korkeuden jokaiselle ladontaan tulevalle elävälle nimelle ennen näkyvyystestejä (rivi noin 625), ja merkit jonottavat niiden takana.
- ENSIMMÄINEN KORJAUS samaan haaraan: merkeille oma etujono (Nosto ennen Hae) ja nimille pyyntö vain lähialueelta, esim. siirrä HaePaikka-kutsun korkeuspyyntö etäisyystestin taakse tai rajaa kameran katseen säteeseen. Tavoite: merkki näkyy kuvan latautuessa, ei sekunteja myöhässä. Kysy tavoiteaika KK:lta vain, jos se ei selviä; kerro uusi viive lokista.
- Tuileries: EI siirtynyt, merkki ja kyltti Louvren seinällä (piste mallin alalla, korkeus ei ratkaise). KK tietää; ei korjausta ilman sanaa.
- Sacré-Cœur m3: kyltti 3D-mallin juurella. "Place Saint-…"-nimi leikkautuu mallin nurmeen: selvitä väistö (Nahtavyysalue.Peittaa), kun malli on ajossa.
- Les Halles / Saint-Eustache: ajossa ei kameraa tsj-lahi-pohj (aja 48.8579974 2.3489140 0.0004 2); katso seuraavasta ajosta, jossa se on. KK:n vanha-uusi-kuvaparia en koonnut: KS vie kuvat KK:lle (JU).

## TOINEN TYÖ: kyltti häipyy UI:n alla (KK, aloittamatta, siirretty kontekstirajan takia)
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
