# Natiivi-UI: luovutus 7.11.2026 klo 07.48 (konteksti 30 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit SendMessagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Lokit /Users/Shared/Claude/proto-3d/lokit/. Kaikki kokeena, ei junaan. Kääntö: sh Peli-testit/unity-tarkistus.sh (noin 1 min). Ajot JU:lta.
Uusin worktree /Users/Shared/Claude/wt/proto-natiivi-ui-louvre-kyltti (natiivi-ui/louvre-kyltti). Korjaus c390b057f, sen päällä pelkkä mittaus 9a1e39ee5. Muut: proto-natiivi-ui-kyltti-malli (3d92da39e), proto-natiivi-ui-kyltit-219 (a0edcf706), proto-natiivi-ui-kohta10-yhteinen (055f2572f), proto-natiivi-ui-kainalo-lontoo (e5619a1c1).

## TYÖ JATKAJALLE
JONO TYHJÄ, seuraava työ PT:ltä. Älä aloita mitään omin päin. Luvut on lähetetty KK:lle ja PT:lle 07.47 (viestit jonossa, kun lähetin). Molemmista Louvren yrityksistä on käytetty kaksi; KK 07.19: ei lisäyrityksiä yöllä.
Lupaus auki: jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, proto pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1). Kuvia en katsonut.

## Tehty tässä vuorossa: Louvren oma kyltti (PT 06.55)
Vika: Louvren kyltti puuttui koko-45, -70, -85 (ajo 46, a4269054a). Syyt: korkeuskerrokset ovat laatikoita, näkyvää muotoa isompia; lisäksi 8 pt:n vara piti lennossa piiloutuneen kyltin pois myös levossa.
1. Yritys 1, d42761e2a, lokit/nui-louvre-kyltti-1-d42761e2a: oman näkyvän mallin kyltistä verrataan keskiosa (MalliYdin 25 % pois joka sivulta), vara vain liikkeessä. Koko-70 ja -85 kunnossa, koko-45 ei.
2. Yritys 2, c390b057f, lokit/nui-louvre-kyltti-2-c390b057f, parit pari-v46-l2-*.jpg: levossa keskiosa verrataan mallin kolmioihin (Kylttikohde.PeittaaTarkasti), kerran sekunnissa ja vain kerrostestin jälkeen. Kaikki kolme kunnossa. Katsottu 8 kuvaa ja lentotallennetta 12 kuvaa + 2 isona. KK 07.19: kelpaa kokeena, ei junaan.
3. iPad-mittaus 9a1e39ee5, lokit/nui-louvre-mittaus-ipad-9a1e39ee5 (PT 07.25): testi päällä 0,09–0,36 ms/kehys, pois 0,01–0,02; lepokehys 100,1 ms molemmilla; laskenta 1–7 ms, piikit 9,6 ja 14,9 ms kerran. Muisti 8,3 Mt (laskettu, ei A/B), Pariisissa huippu 3908 Mt ilman talokerrosta. Louvre näkyy iPadilla koko-45:ssä. Runko d092f48cc takaisin. Koko-70:n iPad-kuvaa en katsonut.
Havaintoja, KK kertoo omistajalle: Sacré-Cœurin kyltti vilahtaa lennossa kahdesti noin 0,6 s ja kerran lopussa. Place des Vosgesin haalea kyltti häipyy kierrossa Notre-Damen laivan päällä (tallenne kuva 335), eri kylttityyppi, en muuttanut. Sainte-Chapellen kyltti puuttuu koko-85:stä jo ajossa 45; ei selvitetty.

## MERGE-OHJE
Junaan vietäessä: 9a1e39ee5 pois kokonaan. Poista "MATKAKIRJA kyltti malli:", "MATKAKIRJA kyltti reuna:" ja kenttä ReunaMittari (MalliKyltit). Tarkista TuoreetRuudut iPadilla (ei mitattu).
Muut mittarit pois: kylkivaihto-rivi, `kyltit usva/peitto`, `kyltti: … pois/esiin`, `ui kuvajumi`, mittausrivit, ae497b124, paketin rivit, `ui saapuminen: iskulause`, `nimi lähtee`, `rakennus`-rivit. Kuolleet kentät Lukko, Muisti, jos KS:n kiinteä sivu jää.

## Aamun koontiin KK:lla
- Sacré-Cœurin kyltti liikkeessä (yllä).
- lokit/nui-sijainnit-vertailu/muutokset.md: ESTE-rivi kuvaa tilanteen ennen korjausta; vaihto vain omistajan sanalla.
- Vika 6 85°: yritys 1 jää; suositus yrityksen 2 häivytys vain hyvin matalaan kallistukseen. Grand Châtelet ND:n kyltin alla.
- Pallojen sääntö (NostotKartalla.cs:2325) ja kaksi palloa Lontoossa (:2011 + :2132): KK näyttää omistajalle; ei muuteta yöllä. Lennon korkeutta ei muuteta (omistaja 5.11. 19.22).
- Kohta 10 korjattu a0edcf706:ssa (nui-aloituslento-kuvat-5), kylttikorjauksia ei todennettu KS:n kärjen päällä. Kursiivinimiä kuvan reunassa ja tunnuslauseen sekuntia ei korjata yöllä. Riemukaari ja Sacré-Cœur lennossa ruudun ulkopuolella; parit KK:lla.
- Kainalo e5619a1c1 / 60ca73fad kelpaa (KK 03.53); tumma pallo Macilla WebP:stä (Kuvat.cs:607), iPadilla todistamatta.

## Opit
- Kolmiotesti: Korkeuskerroksen yläreuna ulottuu seuraavan kerroksen rajalle, joten kerrostesti osuu ilmaan tornin vierellä. Levossa tarkka testi on halpa, koska se ajetaan kerran sekunnissa.
- Kentän nimi: Malli.Karjet oli jo pyramidilla; KylttiKarjet erikseen.
- iPad: JU:n pk-pallo-ipad-ajo.zsh on valmis malli, oma kopio _tyo/natiivi-ui/louvre-mittaus-ipad-ajo.zsh. `komento kuva X` + odota 3; komentojen väliin odota 3. "App terminated signal 15" LOPPU-merkin jälkeen on skenaarion oma sulkeminen. ipad-skenaario-f1.zsh saattaa kirjoittaa "VIKA lähetys", vaikka komento meni perille: katso lokista.
- Liikkeessä muotoja ei päivitetä (LiikeVali 0): liiketesti vaatii oman tuoreen laskennan.
- `ruutu` kyltti-riveillä + tallenteen alkuruutu = kuvanumero. Mac-ajon kuvankaappaus pysäyttää pelin noin 1,4 s.
- Kerrokset ovat eri paneeleilla: laatikot verrataan ruutupikseleinä. Pienennetty kuva voi näyttää porrastusta: rajaa täysikoosta ennen väitettä.
- Toisen roolin rajauksesta väitettyä puuttumista ei uskota ennen koko kuvan katsomista.
- Komennossa `sed … $(find …)` tyhjä find jää odottamaan syötettä: kirjoita polku ensin muuttujaan.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (kaikissa ajoissa). Tyhjä pohja ja vino reuna 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti`; tappien lasku vaakapuhelimelle. Kohdekartta.Paikka ei huomioi kainaloita aarretehtävän napautuksessa. Havaintoja: 85°-ajossa sahalaitainen tumma alue; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö; Kuumailmapallon kyltti haalea opera-70:ssä. Eiffelin läpi lentävä kamera: PT jakaa. Tähtikylttien vaihtuminen lennossa on runsasta.
