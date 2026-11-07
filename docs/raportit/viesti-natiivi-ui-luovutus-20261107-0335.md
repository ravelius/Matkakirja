# Natiivi-UI: luovutus 7.11.2026 klo 03.35 (konteksti 30 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Lokit /Users/Shared/Claude/proto-3d/lokit/. Kaikki kokeena, ei junaan. Kääntö: sh Peli-testit/unity-tarkistus.sh (noin 1 min). Ajot JU:lta.
Kokeen worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, haara natiivi-ui/kyltit-liike, kärki 60ca73fad. Lontoon testin worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kainalo-lontoo, haara natiivi-ui/kainalo-lontoo-testi, kärki e5619a1c1 (pelikoodari/lontoo-b + kainalokorjaus).

## TYÖ JATKAJALLE ENSIN: kaksi ajoa JU:lla, JU kuittaa tähän sessioon
Järjestys L1:llä: KS 42, NS:n intro, LAV jalusta1, sitten kuvat-4 (pid 6244), sitten kainalo-lontoo-1 (pid 12704).

### 1. lokit/nui-aloituslento-kuvat-4 (ef23bbd63), KK 03.26, kohta 10
Skenaario _tyo/natiivi-ui/sk-aloituslento-kuvat-2.txt, samat kuvakohdat kuin ennen.
Tarkista täysikoossa lento-1 ... lento-5 ja loki:
- `grep 'traileri kuva . rakennus' unity.log`: väistikö kuva, koko ennen → jälkeen. Rakennusta ei ehkä löydy, jos malli ei ole vielä näkyvissä tai on yli 400 m kuvan pisteestä; silloin riviä ei tule.
- `grep -E 'iskulause|nimi lähtee' unity.log`.
KK:n päätös: (2) jäljelle jäävät päällekkäiset tekstit ja taivaalla leijuva kyltti, kaksi yritystä, tämä on 1.; tunnuslause saa oman tilansa, sen alle jäävät kyltit väistyvät niin kauan kuin se näkyy. (3) Valokuva väistää oman rakennuksensa, yksi yritys, ja tämä on se: kuva Notre-Damen tai Louvren viereen. Jos ei onnistu pienellä muutoksella, nykyinen jää ja syy kerrotaan.
Lähetä KK:lle kuvat ennen | jälkeen: ennen = lokit/nui-aloituslento-kuvat-3 (ffe233d50, yön kylttien ja usvan päällä), jälkeen = kuvat-4. Nimien karsinta on jo koekärjessä, ei erillistä työtä.
Kuvat-3:n tila: Riemukaaren kyltti ei leiju eikä Montparnasse-nimiä ole päällekkäin. Jäljellä tunnuslause Place des Vosgesin päällä (lento-5) ja valokuva Notre-Damen ja Louvren päällä.
Epäily, ei todistettu: tunnuslauseen ei pitäisi näkyä nimen lähdön jälkeen (koodin kommentti ja NimiUlos). Mac-ajon lento-1:n kuvankaappaus pysäyttää noin 1,4 s, jolloin ajastimet voivat osua samaan ruutuun, nimi ensin, ja iskulause jää päälle. Korjaus: lippu nimiLahti, lokirivit. Jos kuvat-4 näyttää tunnuslauseen yhä jäävän, epäily oli väärä: kokeile nostokerroksen piilon jatkamista tunnuslauseen ajalle (UiNakymat.OtsikkoPiilo, Saapumistraileri.NimenAika) tai väistöä sen alueella. Jos se ei näy kuvissa 2–5, tämä ajo ei näytä sitä lainkaan näkyvissä: mainitse KK:lle.

### 2. lokit/nui-kainalo-lontoo-1 (e5619a1c1), PT 03.3x
Skenaario _tyo/pelikoodari/lontoo/sk-d5.txt, 3 kuvaa (d5-hydepark, d5-abbeyroad, d5-greenwich), kerroin 0,465. Vertailu: Pelikoodarin D5 samoilla nimillä (etsi kansio lokeista), jossa oli Lontoon oma poikkeus; tässä poikkeusta ei ole.
Odotus: Abbey Roadin pallo St John's Woodissa, ei Maryleboneen; Greenwichin palatsin pallo Greenwichissä. Tulos KK:lle, rivi PT:lle. Kaksi yritystä, tämä on 1. Ei sijainnit-tiedoston vaihtoa, ei junaan.

Kun molemmat on tehty ja jatkotyöt kuitattu: PT:lle "JONO TYHJÄ: Natiivi-UI".

## Kainalotarkistus: tulos
Syy: Kohdenostot vertasi tiedoston pistettä Kohdekartta.Paikka-pisteeseen. Se on lineaarinen koko julisteesta, ja kainalokohteen x, y on kuvassa kainalon kohdalla, joten vertailupiste on julisteen kulmassa; yli 1 km:n ero hylkäsi oikean pisteen ja vei pallon kulmaan. Korjaus 60ca73fad: KartanPiste käyttää paketin lat, lon -arvoja (KohdekarttaKohde.Lat, Lon), jos ne ovat; varalla entinen Paikka.
Laskettu: kohteen oma piste vs tiedostopiste 1 km:n rajalla: nykyinen tiedosto hylkää 4 (Bamako, Freetown, Nouakchott, Abuja, kaikki aitoja), uusi data 0. Kainalo-pisteen käänteislasku ei kelvannut: Budapestin Maanalainen ja Lontoon Metron höyryveturi ovat kuvassa kainalon alla.
Ei tarkistettu: onko lat, lon jokaisessa ladatussa paketissa (skeema vie ne; ilman niitä käytös on entinen). Kohdekartta.Paikka ei vieläkään huomioi kainaloita aarretehtävän napautuksessa (Aarretehtavakortti), ei muutettu.
Lontoon kokeeseen tullessa poista `k.Kaupunki != "lontoo"`, kuten testihaarassa. Kerro PK:lle, kun tulos on nähty.

## Sijainnit: aamun koontiin KK:lla
lokit/nui-sijainnit-vertailu/muutokset.md, tiedostoa ei vaihdettu. Yhteenvedon ESTE-rivi kuvaa tilanteen ennen korjausta: 60ca73fad poistaa esteen, kun ajo vahvistaa sen. Uudet tunnisteet piilottavat myös kartan nimiä (Merkittavat.NostoQidt, 1087 riviä). Vaihto vain omistajan sanalla; PT päättää ajan.

## Tila
Pariisi kohta 8 valmis: Tuileries'n kyltti ei katoa levossa (ajo -7, kuva KK:lla, lokit/nui-kyltit-koonti-0700/tuileries-kulma-ajo7-2080.jpg). Liu'un tuntumaa ei ole nähty.
Työlistan rivit "Nimet häipyvät horisontissa kartan mukana" ja "Uusien 3D-kohteiden vaaleat kyltit" päivitetty 03.2x.
Aiemmat tulokset ja päätökset:
- Kylkivaihdot, pallo ja Les Halles kelpaavat (KK 02.20, 02.58, 03.15). Tuileries saa olla Louvren päällä, ffe233d50.
- Vika 6 85°: yritys 1 (2b0b360bc) jää; yritys 2 peruttu 4f80574cf, Temple-torni haalea. Suositus aamuun KK:lla: yrityksen 2 häivytys vain hyvin matalaan kallistukseen. Kolmatta ei yöllä.
- Grand Châtelet ND:n kyltin alla: KK kertoo aamulla.

## Junaan vietäessä pois
Mittarit: kylkivaihto-rivi, `kyltit usva/peitto`, `kyltti: … pois/esiin`, `ui kuvajumi`, mittausrivit, ae497b124 ja paketin rivit. Lisäksi `ui saapuminen: iskulause`, `nimi lähtee`, `rakennus`-rivit, jos niistä ei ole enää hyötyä.

## Opit
- TALLENNE: peli askeltaa 0,02 s/kuva, UI Toolkitin siirtymä kulkee oikeassa ajassa: kyltin häivytystä ei voi arvioida tallenteesta.
- Mac-ajon kuvankaappaus pysäyttää pelin noin 1,4 s, ja ajastimet purkautuvat sen jälkeen samassa ruudussa. Älä päättele ajoitusta kuvista ilman lokirivejä.
- Pienennetty kuva voi näyttää pilvissä porrastusta, jota täysikokoisessa ei ole: rajaa täysikoosta ennen väitettä.
- Luku poimittuna: laske pelin säännöillä, älä vain tiedostoja vertaamalla. Kuvapisteet ohittavat tiedoston piirroskartalla, ja hylkäys koskee vain tunnisteellisia rivejä.
- `komento kallista 85` asettaa heti; eleellä kulma jää 60–70°:een.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (kaikissa ajoissa). Tyhjä pohja ja vino reuna 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti`; tappien lasku vaakapuhelimelle. Havaintoja: 85°-ajossa sahalaitainen tumma alue vasemmassa alakulmassa; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö; lento-8:n iso saapumiskuva näyttää pehmeältä, en mitannut. Eiffelin läpi lentävä kamera: PT jakaa.
