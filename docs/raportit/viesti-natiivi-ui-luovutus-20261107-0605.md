# Natiivi-UI: luovutus 7.11.2026 klo 06.05 (konteksti yli 25 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Lokit /Users/Shared/Claude/proto-3d/lokit/. Kaikki kokeena, ei junaan. Kääntö: sh Peli-testit/unity-tarkistus.sh (noin 1 min). Ajot JU:lta.
Uusin worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltti-malli (natiivi-ui/kyltti-mallin-paalla, 3d92da39e, pohja KS b58c19ea9). Muut: proto-natiivi-ui-kyltit-219 (a0edcf706), proto-natiivi-ui-kohta10-yhteinen (055f2572f), proto-natiivi-ui-kainalo-lontoo (e5619a1c1).

## TYÖ JATKAJALLE
JONO TYHJÄ, seuraava työ PT:ltä. Älä aloita mitään omin päin. 3d92da39e on nimetty KS:lle ja PT:lle koko Pariisin viimeiseen yhteisajoon (06.04). Jos yhteisajosta tulee kylttivika, PT jakaa; molemmista kylttitöistä on kaksi yritystä käytetty.
Lupaus auki: jos omistaja päättää PK:n Taso läpi -kortin muunnelmasta (JuoksuLoppukortti.AsetaNosto, proto pelikoodari/tarkastelu-219, 4aa9ec365), NUI lisää sen pohjiin ja tyylikirjaan (Raamattu 4.1). Kuvia en katsonut.

## Tehty tässä vuorossa: Pariisi kohta 8
1. Kyltti toisen mallin päällä (PT 05.26, kuittasi "kelpaa kokeena, ei junaan"), 4222135fc, lokit/nui-kyltti-malli-2-4222135fc, parit pari-v44-m2-*.jpg. MalliKyltit: kyltti häipyy, kun laatikko osuu toisen näkyvän mallin muotoon (16 korkeuskerrosta, tarkka ruututesti, Kylttikohde.Peittaa), palaa 8 pt:n varalla ja 0,4 s:n jälkeen. Hinta: Louvren oma malli jää koko-70:ssä ja koko-85:ssä ilman kylttiä. Sacré-Cœur näkyy liikkeessä kahdesti noin 0,6 s; PT: rivi koontiin.
2. Tähtikyltti Palais de l'Industrie Eiffelin päällä lennossa (PT 05.5x), 3d92da39e, lokit/nui-kyltti-malli-4-3d92da39e. Syy: Nimikerros.LiikeVali = 0, joten KeraaRuudut ei ajanut lennossa ja muodot jäivät vanhaan paikkaan. Korjaus: Nahtavyysalue.TuoreetRuudut liikkeessä joka kehys, mallin tila seurataan myös toisen syyn piilottaessa, piilossa oleva ei tule esiin mallin päälle. Ajo 3: 1,5 s → 0,3 s; ajo 4: ei esiin lainkaan lennossa (lokirivit, 4 lentokuvaa). Ajosta 4 katsottu koko-70, muita still-kuvia ei; opera-70, eiffel-70 ja koko-85 katsottu ajoista 1–3.
Ei mitattu: TuoreetRuudut-kulutus iPadilla (pitkät ruudut Macilla 61 → 64, ei selvää muutosta). Häivytystä ei voi arvioida tallenteesta. Tähtikylttien yleinen vaihtuminen lennossa on yhä runsasta (38 riviä yhdellä lennolla); ei kuulunut työhön.

## MERGE-OHJE
Erillistä tiedostoa ei löytynyt; kirjattu 4986e441c:n ja 3d92da39e:n viesteihin. Poista junaan vietäessä "MATKAKIRJA kyltti malli:" (MalliKyltit.Paivita) ja tarkista TuoreetRuudut iPadilla.
Muut mittarit pois: kylkivaihto-rivi, `kyltit usva/peitto`, `kyltti: … pois/esiin`, `ui kuvajumi`, mittausrivit, ae497b124, paketin rivit, `ui saapuminen: iskulause`, `nimi lähtee`, `rakennus`-rivit. Kuolleet kentät Lukko, Muisti, jos KS:n kiinteä sivu jää.

## Aamun koontiin KK:lla
- Sacré-Cœurin kyltti liikkeessä noin 0,6 s, kahdesti.
- lokit/nui-sijainnit-vertailu/muutokset.md: ESTE-rivi kuvaa tilanteen ennen korjausta; vaihto vain omistajan sanalla.
- Vika 6 85°: yritys 1 jää; suositus yrityksen 2 häivytys vain hyvin matalaan kallistukseen. Grand Châtelet ND:n kyltin alla.
- Pallojen sääntö (NostotKartalla.cs:2325) ja kaksi palloa Lontoossa (:2011 + :2132): KK näyttää omistajalle; ei muuteta yöllä. Lennon korkeutta ei muuteta (omistaja 5.11. 19.22).
- Kohta 10 korjattu a0edcf706:ssa (nui-aloituslento-kuvat-5), kylttikorjauksia ei todennettu KS:n kärjen päällä. Kursiivinimiä kuvan reunassa ja tunnuslauseen sekuntia ei korjata yöllä. Riemukaari ja Sacré-Cœur lennossa ruudun ulkopuolella; parit KK:lla.
- Kainalo e5619a1c1 / 60ca73fad kelpaa (KK 03.53); tumma pallo Macilla WebP:stä (Kuvat.cs:607), iPadilla todistamatta.

## Opit
- Liikkeessä muotoja ei päivitetä (LiikeVali 0): liiketesti vaatii oman tuoreen laskennan.
- Säteet 5 × 3 -pisteillä välkkyivät (kymmenen vaihtoa sekunnissa); ruututesti ja odotus korjasivat. Lokiin t= ja vaihto, niin välke luetaan riveistä.
- `ruutu` kyltti-riveillä + tallenteen alkuruutu = kuvanumero.
- Mac-ajon kuvankaappaus pysäyttää pelin noin 1,4 s. TALLENNE: peli askeltaa 0,02 s/kuva, UI Toolkitin siirtymä oikeassa ajassa.
- Kerrokset ovat eri paneeleilla: laatikot verrataan ruutupikseleinä. Pienennetty kuva voi näyttää porrastusta: rajaa täysikoosta ennen väitettä.
- Toisen roolin rajauksesta väitettyä puuttumista ei uskota ennen koko kuvan katsomista. Komennon aja kolmas luku on kaari asteina.
- zsh:n ${(f)…} komennossa laukaisee turvatarkistuksen, vaikka poistoa ei ole: pidä komennot yksinkertaisina.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (kaikissa ajoissa). Tyhjä pohja ja vino reuna 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti`; tappien lasku vaakapuhelimelle. Kohdekartta.Paikka ei huomioi kainaloita aarretehtävän napautuksessa. Havaintoja: 85°-ajossa sahalaitainen tumma alue; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö; Kuumailmapallon kyltti haalea opera-70:ssä. Eiffelin läpi lentävä kamera: PT jakaa.
