# Natiivi-UI: luovutus 7.11.2026 klo 03.16 (konteksti 30 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, haara natiivi-ui/kyltit-liike, kärki ffe233d50. Lokit /Users/Shared/Claude/proto-3d/lokit/, skenaariot _tyo/natiivi-ui/. Kaikki kokeena, ei junaan. Kääntö: sh Peli-testit/unity-tarkistus.sh (noin 1 min). Ajot JU:lta.

## TYÖ JATKAJALLE ENSIN (KK 03.15): ajo nui-kyltit-liike-7
JU ajaa sen kärjestä ffe233d50 ja kuittaa tähän sessioon. Tuileries'n kyltti ei enää väistä Louvrea (KK:n päätös omistajan valtuutuksella 03.15, vain tämä kyltti ja Louvre; 2. yritys). Tarkista levossa: kuvat noin 1745–2080, `grep 'kyltti: Tuileries' lokit/nui-kyltit-liike-7/unity.log`; edellisessä ajossa kyltti katosi kuvassa noin 1772 (rajaus koko kuvan x 0,2–0,6, y 0,72–1). Lähetä KK:lle kuva samasta kulmasta: lokit/nui-kyltit-koonti-0700/. Sen jälkeen kohdan 8 kyltit ovat tältä yöltä valmiit. Liu'un tuntumaa ei ole nähty (KK tietää).

## TYÖ SEN JÄLKEEN (PT 03.2x). Tulokset KK:lle, rivi PT:lle; kun tehty, PT:lle "JONO TYHJÄ: Natiivi-UI".
1 Katso lokit/nui-aloituslento-kuvat-2, kun ajo on valmis: viisi kuvaa täysikoossa (lento-1-eiffel.png ... lento-5-louvre.png), tulos KK:lle. Kansiossa on jo nämä kuvat; varmista, että ajo on valmis.
2 Työlistan rivit "Nimet häipyvät horisontissa kartan mukana" ja "Uusien 3D-kohteiden vaaleat kyltit": tarkista tila ja päivitä `python3 -I tools/asemataulu/tyolista.py tilanne "OTSIKKO" "teksti"` vain se, minkä tiedät.
3 sijainnit.json aamun kortin pohjaksi: lista muutoksista (108 yli 100 m, 706 yli metrin), tunnisteiden tarkistus ja vertailu rungon tiedostoon. Ei tiedoston vaihtoa, ei junaan. Ennen kuin KK:n kainalo-epäily on selvä, älä päivitä. Kumpaa sijainnit.json-tiedostoa ja mitä kainalo-epäily tarkoittaa, en tiedä: hae lokista (node tools/loki-hae.mjs) tai kysy PT:ltä.

## TILA: Pariisi kohta 8 valmis, seuraava työ edellä.
Pariisi kohta 8 tehty, tulos KK:lla (koonti lokit/nui-kyltit-koonti-0700/). Kohta 10: viisi aloituslennon kuvaa jo kytketty 356eb0101, ei työtä.

## Tulokset ja KK:n päätökset (omistajan valtuutuksella 02.20, 02.58)
- Vika 3 kylkivaihdot: kelpaa. Nostokyltit 0 vaihtoa; aiemmat 35 riviä olivat mittarin virhettä (m.Kylki väliaikainen "oikea" ennen kiinteän kyltin kylkeä). MalliKyltit: Rivi.Lukko, sivu pysyy liikkeessä.
- Vika 4 pallo: kelpaa. KaupunkiPallot väistää NostoKylttiVaraus-laatikoita levossa; näkyvä siirto liukuu (VaistoLiuku 8/s, ajo -6: 75 px yhden kuvan hyppy → noin 25 kuvaa, enintään 13 px/kuva). Liikkeessä pallo voi olla kyltin päällä (omistaja 3.11.: pallot pysyvät paikallaan).
- Vika 6 85°: yritys 1 (2b0b360bc, m.KylttiUsva, KylttiNakyvyys) JÄÄ. Yritys 2 (9486ee940) peruttu 4f80574cf: Temple-torni haalea tavallisessa kallistuksessa. Kolmatta ei tehdä yöllä. Suositus aamuun KK:lla: yrityksen 2 aikaisempi häivytys vain hyvin matalaan kallistukseen. Ruudun 980 tyhjä näkymä kelpaa (KK).
- Grand Châtelet ND:n kyltin alla: ei toimia yöllä, KK kertoo aamulla.
- Pallo ja Les Halles kelpaavat (KK 03.15). Les Halles: korjattu (d580119ec): törmäys kuoren 85 %:n ytimeen (Nahtavyysalue.OsuuMallinYtimeen, YdinOsuus), koska rajauslaatikon kuori on rakennusta isompi.
- Tuileries: kyltti oli kulmassa aidosti Louvren länsipaviljongin päällä ja katosi levossa. KK 03.15: saa olla päällä, poikkeus ffe233d50 (NostotKartalla ohita "louvre", Nahtavyysalue.OsuuMallinYtimeen), ei aamun kysymystä. Tulos näkemättä: ajo -7.

## Junaan vietäessä pois
Mittarit: kylkivaihto-rivi, `kyltit usva/peitto`, `kyltti: … pois/esiin`, mallikyltti-rivin liikkeessä/levossa ei haittaa; lisäksi `ui kuvajumi`, mittausrivit, ae497b124 ja paketin rivit.
Skenaarion sk-kyltit-liike.txt loppuun lisätty 6 s lepoa: kuvanumerot säilyvät, ajo pitenee (2083 kuvaa).

## Ajot ja videot (lokit/)
nui-kyltit-liike-4/liike.mp4 (yritys 1), -6/liike.mp4 (kärki), -85-2/liike85.mp4 (yritys 1, 85°), -85-3/liike85.mp4 ja -5/liike.mp4 (peruttu yritys 2).

## Työkalut (kirjoita uudelleen, jos scratchpad on poissa; vain Pillow)
Arkki: joka n:s kuva numeroituna. Pallon paikka: punaisten pikselien painopiste (r>120, g<75, b<70) 688 px:n koossa, siirto kuvien välillä. Video: zsh tyokalut/tallenne-video.sh <lokikansio> <nimi> <ulos.mp4> worktreestä.

## Opit
- TALLENNE: peli askeltaa pysäytettynä 0,02 s/kuva, unscaledDeltaTime kulkee sen mukana, UI Toolkitin siirtymä oikeassa ajassa: kyltin häivytystä ei voi arvioida tallenteesta. Päätelty kuvista.
- Törmäysmuodot (Nahtavyysalue.KeraaRuudut) päivittyvät Nimikerroksen ladonnassa, eivät joka kuvassa; loki `kyltti: … pois (malli)` näkyy myös liikkeessä, joten aivan vanhentuneita ne eivät ole.
- Kallistus 85°: `komento kallista 85` asettaa heti; eleellä kulma jää 60–70°:een.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (kaikissa ajoissa, syy selvittämättä). Tyhjä pohja ja vino reuna 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti`; tappien lasku vaakapuhelimelle. Havaintoja: 85°-ajossa etualalla sahalaitainen tumma alue vasemmassa alakulmassa; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö. Eiffelin läpi lentävä kamera: PT jakaa, ei minun.
