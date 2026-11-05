# Karttaseppä: luovutus 5.11.2026 klo 14.52 (KS)
Syy: konteksti 30 % (7.37). **Lue tämä, sitten -1407 (karttaseppa/luovutus-20261105-1407) ja -1350.** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. Proto-worktree W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup (EI origin), kärki 8b19d7de1.

## KK 14.5x, uusin: tämä täsmentää KORJAUKSEN kohdelistan
KK: "lista ei täsmää, koska kuvassa näkyy muitakin kohteita." Omistajan oma kuva 14.52 ("Tässä näkyy"): `docs/raportit/kaappaukset/omistaja-20261105/pieni-ipad-pienet-3d-kohteet-1452.png` (pieni iPad; hae KK:n haarasta tai kysy polku, jos ei ole tässä checkoutissa). Katso se ensin.
- **Poistoon kuvasta:** vaaka + kaari nappulan alla, pieni värillinen Notre-Dame pyöreän kuvan vieressä (iso nimi "Notre-Dame" sen vieressä), Place des Vosgesin pienoismalli, pieni torni, "!!"-merkit oikealla alhaalla, laiva Seinellä.
- **ÄLÄ POISTA ennen omistajan vastausta (KK kysyy nyt):** kadonneiden ihmeiden kuvat Grand Châtelet, Temple-torni, Bastilji, Les Hallesin hallit (omistaja 2.11. 08.31, 08.42).
- **Tee:** piirtopolku ja pelin toiminta kohde kohteelta: mitä napautus avaa; mukana myös turistiinfo ja lehtikioski (2.11. 08.40). Lista ja Mac-kuva KK:lle **ilman piilotettua ui-kerrosta**.
- **Louvren museo:** KK kertoo seurauksen omistajalle. KK hyväksyi suosituksen: napautus uuteen Louvreen avaa museon. Pyramidin poisto odottaa silti KK:n sanaa (8b19d7de1 palautti sen).

## KORJAUS 14.5x (KK, omistaja 14.51): ENSIMMÄINEN TYÖ, voittaa alla olevan
**Lista KK:lle oli väärä.** Kirjoitin KK:lle "muita 3D-kohteita ei tässä haarassa Pariisissa ole" koodin luvun perusteella, mutta omistaja näki niitä pienellä iPadilla (MK kehitys 661377bbb, juuri tämän haaran rakennus). Ali-agentin päätelmä "Symbolimallit on oletuksena pois" ei siis riitä, eivätkä Oikeuspalatsi, Hôtel de Ville ja Saint-Jacques ole kohteita: ne olivat KK:n arvaus.
- **Omistajan sanat 14.44:** "pienellä ipadilla näkyi notre damen vieressä pieniä 3d kohteita, ne varmaan poistuvat kaikki? ei jätetä muita 3d kohteita näkyviin kuin nämä uudet juuri tekeillä olevat."
- **Omistaja 14.51, kortti kuvalla** `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pienet-kohteet/notre-damen-vieressa.jpg`: "Näitkö pienellä iPadilla nämä kuvan pienet kohteet?" = "Nämä (Suositus)". Kuvassa: kaari+torni+vaaka, kaari pallon ympärillä, pieni torni, pylväs, laiva Seinellä. Kuva on NUI:n Mac-ajosta 9fd4cfdc8 (a14), ja ne eivät näy ajoissa, joissa ui-kerros on piilossa.
- **KK:n ehto:** pelin toimintaan kuuluvat (kaupunkipallot, avattavat nostot) listalle erikseen, eikä niitä poisteta ilman omistajan sanaa. **Siksi pyramidi on peruttu** (8b19d7de1 peruu 7516b44ee): se avaa Louvren museon. Pyramidi on listalla KK:lle omistajan päätettäväksi.
- **Tee:** 1) selvitä, mikä nämä piirtää. Ehdokkaat: `NostoSaannot.KuvamerkkiKaytossa`, `UI/NostotKartalla.cs`, `Kartta/Symbolimallit.Tasot23.cs` (`Taso23Kaytossa`, silmukka rivillä 257, `s.Id/s.Lat/s.Lon`), kategoriasymbolit (`Symbolimallit.Kategoriat`), `UI/KarttaesineGalleria.cs`:n otsikon polut. Ali-agentti ei löytänyt näitä, joten anna sille tämä kuva ja nämä ehdokkaat tai katso itse. 2) Toista Macilla ui-kerros näkyvissä, jos mahdollista (a14). 3) Lista KK:lle: mitkä nostot nuo ovat (`UI/Resources/Kohdenostot/sijainnit.json`, avaimet `pariisi:*`), ja mikä on pelin toimintaa. Tavoite: 3D-kuva pois Pariisista, ja nosto säilyy 2D-merkkinä, jos se on toimintaa (`NostotKartalla.cs:1877` näyttää 2D-merkin, kun `OnMalli` on epätosi: tarkista). 4) Sitten koodi ja Mac-kuva samasta kohdasta (`sk-pariisi-3d.txt`; lisää ui-kerros, jos ajo piilottaa sen).

## ENSIN
1. Remote päälle. Vahti Monitorilla (30 min, uusi päättyessä): `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh 44e9c6123`. Tilatiedosto syntyy skriptin viereen, ja omat "Karttaseppä →" -rivit ohitetaan.
2. Odotetaan neljää asiaa, ja näkyvä asia menee heti kuvana KK:lle (2.214):
   - **Eiffel** Codexilta: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/eiffel/`. Katso täysikoossa, vertaa oikeaan rakennukseen, kuvat KK:lle. **Muut seitsemän saavat luvan postilaatikosta vasta KK:n sanan jälkeen** (PT:n oikaisu 14.09).
   - **Louvre-malli** Tripolta: tilaus 21h (44e9c6123), toimitus `louvre-3d-v2/`. Työohje `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-louvre-20261104/TILAUS-21h-tripo.md`.
   - **Mac-ajot JU:lta** (pyydetty; JU ajaa haaran kärjen, nyt 8b19d7de1): `sk-hotelli.txt` ja `sk-pariisi-3d.txt` (`_tyo/karttaseppa/`), tulokset `lokit/julkaisija-hotelli-<sha>` ja `lokit/julkaisija-pariisi3d-<sha>`.
   - **KK:n sana** pyramidista (museon merkki).

## Omistajan päätökset (välitetty)
- **14.40:** "Tehdäänkö Louvren malli näillä piirroksilla?" = "Tehdään (Suositus)". KK: tuo kuva, kun malli näkyy pelin Pariisissa (Macilta, Louvre kokonaan). Omistajalle on kerrottu ero lännestä (ei siipeä paviljongin sivuilla), päätykolmiot ja katon kaari; niitä ei korjata.
- **14.44 (PT):** Pariisin kartalla 3D-kohteina vain uudet: Notre-Dame, Sainte-Chapelle, Louvre ja sarja 24:n kahdeksan. Muut pois heti, myös Oikeuspalatsi, Hôtel de Ville ja Saint-Jacques. Uusi kohde ilmestyy, kun se on valmis. Kumoaa sarjasuunnitelman rivin "muut pienet jäävät nykyisiksi". Kuumailmapallo ja nappula jäävät, muut kaupungit ennallaan. Lista poistuvista KK:lle ennen kuvaa (lähetetty), sitten Mac-kuva KK:lle ja kopio PT:lle. **Pieni iPad vasta erässä** (tämä, NS:n kallistus, NUI:n kyltit ja nimet) PT:n tai KK:n sanalla.
- **PT 14.36:** ketjuhotellien nimet pois Pariisista suodattimella, muut nykykohteet jäävät (1.10). Macin kuva samasta kohdasta KK:lle, kopio PT:lle.

## Tehty, ei vielä nähty pelissä
- **d4929e087 hotellit:** `Nimikerros.cs`, `KetjuhotelliPariisissa` (ketjujen nimet kokonaisina sanoina, Pariisin alue; merkittävät ja elävä kartta). Aineistoa vasten: 122 Pariisin nimestä vain Hyatt poistuu, historialliset hôtelit jäävät. Park Inn Berlin täsmäisi, mutta jää rajauksen takia. Elävän kartan nimiä ei voinut tarkistaa ennakkoon. Syy, miksi Hyatt näkyi: poisto 76d11201a 4.11. jäi sivuhaaroihin.
- **7516b44ee pyramidi: PERUTTU** (katso KORJAUS). Ali-agentin luku koodista: Maamerkit-taulukossa ja `tools/vienti/maamerkit.json`:ssa ei ole Pariisia, Ajattelijat vain kehittäjätilassa, `Resources/Esineet/pariisi.json` vain 4.11. koehaaroissa. Väite "Symbolimallit oletuksena pois, ei piirrä" on kumoutunut tai ei kata näitä kohteita.

## Auki
- **Louvren museo:** pyramidi avaa museon, ja se on palautettu. Suositus KK:lle: kun pyramidi joskus poistetaan, 3D-Louvren napautus avaa museon. Omistajan päätös.
- **Louvre-mallin kytkentä:** pyramidit pois mallista, peli tekee ne koodilla (`Nahtavyysalue.cs` `Pyramidit`, `RakennaPyramidit`; Louvren rivillä ei vielä `Pyramidit`-arvoa). Suhde 0,63 pihan leveydestä (omistaja 14.04). Jos Tripo toimittaa pyramidit mukana, ratkaise kytkennässä.
- **Sarja 24:n asennus:** -1407:n ohje pätee. Taulukkoon tulee uusi kohde, kun se on valmis.

## Opit
- zsh: `$b:Assets/...` tulkitaan muuttujan muokkaimeksi (`:A`), ja silmukka antoi väärän 0-tuloksen. Kirjoita `${b}:polku`.
- Komento `node tools/raamattu-luku.mjs 2` on 156 kt: lue kohdat, ei lukua.
- Piirtopolkujen kartoitus kannatti antaa Sonnet-agentille (Explore), koska se vei 73 000 tokenia.
