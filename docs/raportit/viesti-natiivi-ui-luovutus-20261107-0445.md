# Natiivi-UI: luovutus 7.11.2026 klo 04.45 (konteksti 25 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Lokit /Users/Shared/Claude/proto-3d/lokit/. Kaikki kokeena, ei junaan. Kääntö: sh Peli-testit/unity-tarkistus.sh (noin 1 min). Ajot JU:lta.
Worktreet /Users/Shared/Claude/wt/: proto-natiivi-ui-kyltit-219 (natiivi-ui/kyltit-liike, a0edcf706), proto-natiivi-ui-kohta10-yhteinen (natiivi-ui/kohta10-yhteinen, 055f2572f = KS da0a6ae6b + a0edcf706), proto-natiivi-ui-kainalo-lontoo (natiivi-ui/kainalo-lontoo-testi, e5619a1c1).

## TYÖ JATKAJALLE
JONO TYHJÄ, PT:lle ilmoitettu 04.2x. Seuraava työ PT:ltä. Älä aloita mitään omin päin.
Yksi lupaus auki: jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, proto pelikoodari/tarkastelu-219, 4aa9ec365; iPad: nostettu, alamarginaali 20 %; yli 1,6:1 vasempaan reunaan), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1). PK:lle kerrottu, että junaan vaaditaan omistajan päätös PT:n kautta. Kuvia en katsonut.

## Tulokset, jotka on kuitattu tai lähetetty
- Ajo 43 (da0a6ae6b, 71/71, kansio lokit/karttaseppa-yhteinen-43-b8-da0a6ae6b; 7 kuvaa + loki katsottu): KS:n ratkaisut kelpaavat. Les Halles näkyy v43-louvre, Grand Châtelet v43-nd-45, usvakyltti täysi v43-usva-85, kylkivaihtoja 0. Molemmat kyltit piilossa koko-45 ja koko-70 (ND:n kohdalla, näköarvio) ja opera-70 (syy auki). Ei kata 0,85-vertailua samasta kulmasta, liikettä eikä e23:a (e23 ja kiinteä sivu koodista/lokista).
- Havainnot KS:lle ja PT:lle: mallikyltit jäävät lähemmän mallin päälle (Panthéon Louvressa opera-70, Sacré-Cœur ND:n tornissa koko-70; MalliKyltit.cs, ei kulje ytimen törmäyksen kautta). Kuumailmapallon kyltti ja pallo haaleita opera-70:ssä. Sacré-Cœur meni vain PT:lle.
- Kyltittömyys lennon lopussa (nui-aloituslento-yhteinen-1, 0 kylttiriviä): lähiportti KarttaKyltti.LahiPortti, on KS:n kärjessä, ei a0edcf706:ssa. Lento päättyy 4,0 km:iin, portti aukeaa laskennan mukaan noin 2,4 km:ssä (kaari 0,02°, kuvakulma 50°), sulkeutuu noin 2,9 km:ssä; rajaa ei mitattu ajossa. Ajo 43 ei voi näyttää tätä: sen kaikki kaaret ≤ 0,012°.
- KK 04.17 valtuutuksella: lennon korkeutta ei muuteta (omistajan sanat 5.11. 19.22). Pallojen sääntöä (NostotKartalla.cs:2325, ehto katsoo kyltin olemassaoloa, ei porttia) ei muuteta yöllä eikä se ole KS:n työ; KK näyttää omistajalle aamulla.
- Kohta 10: korjattu kuvissa a0edcf706, nui-aloituslento-kuvat-5/lento-4-notre-dame.png (KK 03.56). KS:n kärjen päällä (055f2572f) kylttejä ei näy, joten kuvat-5:n kylttikorjauksia ei ole todennettu siellä. Yhdistyskärki 055f2572f on valmis KS:lle, ei omaa junaa.
- Karttanimet (PT 04.3x): La Madeleine ei puutu v43-opera-45:stä, KS:n rajaus tark/opera45-talot.png leikkaa sen pois (v39-v18:ssa nimi kirkon oikealla). Rue Desaix ja muut poistuneet: kadunnimet oletuksena pois (omistaja 6.11. 22.20, 4cb886968); ajossa 32 (092fee5bb) sääntöä ei ollut. Square Desaixin luokkaa ei tarkistettu.
- Valokuva väistää Notre-Damen ja Louvren; tunnuslause kuvattu näkyvissä (lento-1); puolikkaat kyltit piiloutuvat kuvan ajaksi (Saapumistraileri.KuvaPeittaa). KK 03.56: kursiivinimiä kuvan reunassa ja tunnuslauseen sekuntia ei korjata yöllä; yritykset käytetty tältä yöltä. Kylttien piiloutumista liikkeessä ei ole nähty.
- Riemukaari ja Sacré-Cœur: mallit löytyvät KS:n kärjessä, mutta ovat kuvan noustessa ruudun ulkopuolella. Parit KK:lla. "Ajautuuko malli kuvan alle" ei mitattu.
- Kainalo: e5619a1c1 / 60ca73fad kelpaa, KK 03.53; Abbey Road ja Greenwich oikein. Muiden kaupunkien kainaloita ei kuvata yöllä; sijainnit-tiedostoa ei vaihdeta; hakunapin alle jäävää tähtikylttiä ei korjata. Tumma pallo Macilla WebP:stä (Kuvat.cs:607), iPadilla todistamatta.
- Kaksi palloa Lontoossa: NostotKartalla.cs:2011 + :2132. KK:lla.

## Aamun koontiin KK:lla
- lokit/nui-sijainnit-vertailu/muutokset.md: ESTE-rivi kuvaa tilanteen ennen korjausta; vaihto vain omistajan sanalla.
- Vika 6 85°: yritys 1 jää; suositus yrityksen 2 häivytys vain hyvin matalaan kallistukseen. Grand Châtelet ND:n kyltin alla.

## Junaan vietäessä pois
Mittarit: kylkivaihto-rivi, `kyltit usva/peitto`, `kyltti: … pois/esiin`, `ui kuvajumi`, mittausrivit, ae497b124, paketin rivit, `ui saapuminen: iskulause`, `nimi lähtee`, `rakennus`-rivit. Kuolleet kentät Lukko, Muisti, jos KS:n kiinteä sivu jää.

## Opit
- Mac-ajon kuvankaappaus pysäyttää pelin noin 1,4 s, ajastimet purkautuvat samassa ruudussa. Tunnuslause: oleta iskulause näkyviin + odota 0.5 (sk-aloituslento-kuvat-3.txt).
- TALLENNE: peli askeltaa 0,02 s/kuva, UI Toolkitin siirtymä oikeassa ajassa: häivytystä ei voi arvioida tallenteesta.
- Kerrokset ovat eri paneeleilla: laatikot verrataan ruutupikseleinä.
- Pienennetty kuva voi näyttää porrastusta: rajaa täysikoosta ennen väitettä.
- Toisen roolin rajauksesta väitettyä puuttumista ei uskota ennen koko kuvan katsomista (Madeleine).
- Komennon aja kolmas luku on kaari asteina, ei korkeus: pienempi = lähempänä. v43-koko-*:n 0,0015 ei ole koko Pariisi nimestään huolimatta.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (kaikissa ajoissa). Tyhjä pohja ja vino reuna 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti`; tappien lasku vaakapuhelimelle. Kohdekartta.Paikka ei huomioi kainaloita aarretehtävän napautuksessa. Havaintoja: 85°-ajossa sahalaitainen tumma alue; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö. Eiffelin läpi lentävä kamera: PT jakaa.
