# Natiivi-UI: luovutus 7.11.2026 klo 04.12 (konteksti 33 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS osoitekirjasta, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Lokit /Users/Shared/Claude/proto-3d/lokit/. Kaikki kokeena, ei junaan. Kääntö: sh Peli-testit/unity-tarkistus.sh (noin 1 min). Ajot JU:lta.
Worktreet /Users/Shared/Claude/wt/: proto-natiivi-ui-kyltit-219 (natiivi-ui/kyltit-liike, kärki a0edcf706), proto-natiivi-ui-kohta10-yhteinen (natiivi-ui/kohta10-yhteinen, 055f2572f = KS da0a6ae6b + a0edcf706), proto-natiivi-ui-kainalo-lontoo (natiivi-ui/kainalo-lontoo-testi, e5619a1c1).

## TYÖ JATKAJALLE ENSIN: PT:n kysymys ajosta 43
KS 43, da0a6ae6b (haara karttaseppa/ajo-yhteinen-43), 71 kuvaa, L1, alkoi 03.45, aikaraja 50 min, jonoskripti pid 20505, tulos /Users/Shared/Claude/julkaisija-tyokalut/ks-yhteinen43.tulos, kansio lokit/karttaseppa-yhteinen-43-*. JU kuittaa KS:lle, ei välttämättä tähän: aseta vahti pidille heti (Monitor, ps), jos ajo ei ole valmis.
PT:n kysymys: kelpaavatko KS:n ratkaisut, joissa se poikkesi NUI:n versiosta: kiinteä kyltin sivu (2.215) pysyy; ElavaTyyliVersio e23; usvakyltti täysi tai poissa (KK 6.11.); törmäyksen ydin ääripisteiden kuori ilman 0,85-kutistusta. Rikkooko jokin viat 3, 4 tai Les Hallesin korjauksen? **Yksi rivi KS:lle ja PT:lle.**
Koodista luettu (git show --cc 477d31ed9), ei vielä ajosta:
- Kiinteä sivu: vika 3 ei voi palata. Lukko ja Muisti jäävät kuolleeksi koodiksi. Reuna rajoittaa myös liikkeessä, kyltti häipyy eikä leikkaudu.
- e23: ei vaikuta kyltteihin; e30 oli vain työhaaran merkki samoille väreille.
- Usvakyltti: sopii vikaan 6, poistaa haalean kyltin.
- Pallo (vika 4): NostoKylttiVaraus mukana.
- **Ainoa todellinen riski: ydin.** YdinOsuus 1 tekee ytimestä saman kuin kuori. Les Hallesin korjaus mitattiin laatikkokuoren 85 %:lla. Louvren U-muodossa kuori kattaa sisäpihan, joten Les Halles ja Grand Châtelet voivat kadota kameran pysähtyessä. Katso: grep 'kyltti: .*pois (malli).*levossa' unity.log ja kuvat Louvren vierestä.
Vertailu NUI:n ajoon: kuvat-4 ja kuvat-5 antavat lento-7:n jälkeen samat rivit (Grand Châtelet ja Les Halles pois (malli) levossa, ruutu noin 3100), joten yksi tällainen rivi ei yksin ole uusi vika; ratkaisevaa on, näkyykö kyltti levossa kuvassa.

## TYÖ 2: kerro KK:lle kyltittömyyden syy (lupasin)
Ajossa lokit/nui-aloituslento-yhteinen-1 kartalla ei näy yhtään nostokylttiä (ei edes lento-7:ssä), vain palloja, ja lokissa on 0 'MATKAKIRJA kyltti:' -riviä. Kuvat-5:ssä sama näkymä on täynnä kylttejä. Todennäköinen syy: KS:n kärjen lähiportti (KarttaKyltti.LahiPortti, omistaja 5.11. 19.23, kylttiPortti NostotKartalla), ei todennettu. Ajo 43 näyttää saman kärjen ilman minun muutostani: jos sielläkin pallot ilman kylttejä samalla korkeudella, syy ei ole yhdistykseni. Huomaa, että pallo ilman kylttiä on ristiriidassa kommentin kanssa "Pariisissa pyöreä kuva vain kyltin kanssa": kerro se KS:lle, jos se näkyy 43:ssa. Sen vuoksi kuvat-5:n kylttikorjauksia ei ole todennettu KS:n kärjen päällä. Yhdistyskärki 055f2572f on valmis KS:lle otettavaksi, ei omaa junaa.

Kun nämä on tehty: PT:lle "JONO TYHJÄ: Natiivi-UI". Seuraava työ PT:ltä (KK 03.44).

## Tulokset, jotka on jo kuitattu
- Aloituslento kohta 10: kuvat-5 (a0edcf706) kelpaa kokeena, KK 03.56. Yritykset on käytetty tältä yöltä. Valokuva väistää Notre-Damen ja Louvren; Bastilji/Place des Vosges -kulma poissa; tunnuslause kuvattu näkyvissä (lento-1, noin 1 s nimen kanssa, loki 63,844 → 64,864); puolikkaat kyltit piiloutuvat kuvan ajaksi (Saapumistraileri.KuvaPeittaa).
- KK 03.56: kursiivinimiä kuvan reunassa ja tunnuslauseen sekuntia ei korjata yöllä; KK kertoo omistajalle aamulla. Kylttien piiloutumista liikkeessä ei ole nähty (ei tallennetta).
- Riemukaari ja Sacré-Cœur: mallit löytyvät KS:n kärjessä, mutta ovat kuvan noustessa ruudun ulkopuolella (loki yhteinen-1, koko 1,00 → 1,00). Parit KK:lla. Kyselyn "ajautuuko malli myöhemmin kuvan alle" ei mitattu.
- Kainalo: e5619a1c1 / 60ca73fad kelpaa, KK 03.53. Abbey Road ja Greenwich oikein ilman Lontoon poikkeusta; PK:lle kerrottu. Muiden kaupunkien kainaloita ei kuvata yöllä; sijainnit-tiedostoa ei vaihdeta; hakunapin alle jäävää tähtikylttiä ei korjata (KK 03.53). Tumma pallo Macilla johtuu WebP:stä (Kuvat.cs:607), iPadilla todistamatta.
- Kaksi palloa Lontoossa: NostotKartalla.cs:2011 (piirros, jos ei pariisiKyltti) + :2132 (noston kuva, pariisi ja lontoo). KK:lla.

## Aamun koontiin KK:lla
- lokit/nui-sijainnit-vertailu/muutokset.md: ESTE-rivi kuvaa tilanteen ennen korjausta; vaihto vain omistajan sanalla.
- Vika 6 85°: yritys 1 jää; suositus yrityksen 2 häivytys vain hyvin matalaan kallistukseen. Grand Châtelet ND:n kyltin alla.

## Junaan vietäessä pois
Mittarit: kylkivaihto-rivi, `kyltit usva/peitto`, `kyltti: … pois/esiin`, `ui kuvajumi`, mittausrivit, ae497b124, paketin rivit, `ui saapuminen: iskulause`, `nimi lähtee`, `rakennus`-rivit. Kuolleet kentät Lukko, Muisti, jos KS:n kiinteä sivu jää.

## Opit
- Mac-ajon kuvankaappaus pysäyttää pelin noin 1,4 s, ja ajastimet purkautuvat samassa ruudussa, nimi ensin. Tunnuslause kuvataan: oleta iskulause näkyviin + odota 0.5 (sk-aloituslento-kuvat-3.txt). Ajo siirtää seuraavia kuvia noin 0,8 s, joten kartta ei ole parin kummallakin puolella samassa kohdassa.
- TALLENNE: peli askeltaa 0,02 s/kuva, UI Toolkitin siirtymä oikeassa ajassa: häivytystä ei voi arvioida tallenteesta.
- Kerrokset ovat eri paneeleilla: laatikot verrataan ruutupikseleinä.
- Pienennetty kuva voi näyttää porrastusta: rajaa täysikoosta ennen väitettä.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (kaikissa ajoissa). Tyhjä pohja ja vino reuna 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti`; tappien lasku vaakapuhelimelle. Kohdekartta.Paikka ei huomioi kainaloita aarretehtävän napautuksessa. Havaintoja: 85°-ajossa sahalaitainen tumma alue; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö. Eiffelin läpi lentävä kamera: PT jakaa.
