# Karttaseppä: luovutus 5.11.2026 klo 14.52 (KS)
Syy: konteksti 30 % (7.37). **Lue tämä, sitten -1407 (karttaseppa/luovutus-20261105-1407) ja -1350.** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. Proto-worktree W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup (EI origin), kärki 7516b44ee.

## ENSIN
1. Remote päälle. Vahti Monitorilla (30 min, uusi päättyessä): `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh 44e9c6123`. Tilatiedosto syntyy skriptin viereen, ja omat "Karttaseppä →" -rivit ohitetaan.
2. Odotetaan neljää asiaa, ja näkyvä asia menee heti kuvana KK:lle (2.214):
   - **Eiffel** Codexilta: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/eiffel/`. Katso täysikoossa, vertaa oikeaan rakennukseen, kuvat KK:lle. **Muut seitsemän saavat luvan postilaatikosta vasta KK:n sanan jälkeen** (PT:n oikaisu 14.09).
   - **Louvre-malli** Tripolta: tilaus 21h (44e9c6123), toimitus `louvre-3d-v2/`. Työohje `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-louvre-20261104/TILAUS-21h-tripo.md`.
   - **Mac-ajot JU:lta** (pyydetty, kärki 7516b44ee): `sk-hotelli.txt` ja `sk-pariisi-3d.txt` (`_tyo/karttaseppa/`), tulokset `lokit/julkaisija-hotelli-<sha>` ja `lokit/julkaisija-pariisi3d-<sha>`.
   - **KK:n vastaus** kahteen kysymykseen: missä omistaja näki Oikeuspalatsin, Hôtel de Villen ja Saint-Jacquesin; ja Louvren museon merkki (alla).

## Omistajan päätökset (välitetty)
- **14.40:** "Tehdäänkö Louvren malli näillä piirroksilla?" = "Tehdään (Suositus)". KK: tuo kuva, kun malli näkyy pelin Pariisissa (Macilta, Louvre kokonaan). Omistajalle on kerrottu ero lännestä (ei siipeä paviljongin sivuilla), päätykolmiot ja katon kaari; niitä ei korjata.
- **14.44 (PT):** Pariisin kartalla 3D-kohteina vain uudet: Notre-Dame, Sainte-Chapelle, Louvre ja sarja 24:n kahdeksan. Muut pois heti, myös Oikeuspalatsi, Hôtel de Ville ja Saint-Jacques. Uusi kohde ilmestyy, kun se on valmis. Kumoaa sarjasuunnitelman rivin "muut pienet jäävät nykyisiksi". Kuumailmapallo ja nappula jäävät, muut kaupungit ennallaan. Lista poistuvista KK:lle ennen kuvaa (lähetetty), sitten Mac-kuva KK:lle ja kopio PT:lle. **Pieni iPad vasta erässä** (tämä, NS:n kallistus, NUI:n kyltit ja nimet) PT:n tai KK:n sanalla.
- **PT 14.36:** ketjuhotellien nimet pois Pariisista suodattimella, muut nykykohteet jäävät (1.10). Macin kuva samasta kohdasta KK:lle, kopio PT:lle.

## Tehty, ei vielä nähty pelissä
- **d4929e087 hotellit:** `Nimikerros.cs`, `KetjuhotelliPariisissa` (ketjujen nimet kokonaisina sanoina, Pariisin alue; merkittävät ja elävä kartta). Aineistoa vasten: 122 Pariisin nimestä vain Hyatt poistuu, historialliset hôtelit jäävät. Park Inn Berlin täsmäisi, mutta jää rajauksen takia. Elävän kartan nimiä ei voinut tarkistaa ennakkoon. Syy, miksi Hyatt näkyi: poisto 76d11201a 4.11. jäi sivuhaaroihin.
- **7516b44ee pyramidi:** `UI/KaupunkiPallot.cs`, `PariisiPyramidiKartalla = false`. Ali-agentin luku koodista (ei pelistä): tässä haarassa Pariisin ainoa muu 3D-kohde oli tämä pyramidi. Symbolimallit on oletuksena pois, Maamerkit-taulukossa ja `tools/vienti/maamerkit.json`:ssa ei ole Pariisia, Ajattelijat vain kehittäjätilassa. `Resources/Esineet/pariisi.json` on vain 4.11. koehaaroissa, ja siellä Oikeuspalatsi ym. olivat.
- **Tarkista Mac-kuvasta**, että kartalla ei ole muita kohteita. Jos on, listasi on väärä: kerro KK:lle.

## Auki
- **Louvren museo:** avautui kartalla poistetusta pyramidista, joten museolla ei nyt ole merkkiä kartalla. Kerrottu KK:lle ⚠️:lla; suositus: 3D-Louvren napautus avaa museon, kun uusi malli on pelissä. Odottaa KK:n sanaa. `Peli/Testihypyt.cs:72` käyttää merkkiä `taidemuseo-pariisi` testiaskeleena, eikä sitä ole päivitetty.
- **Oikeuspalatsi ym.:** jos omistaja näki ne pohjakuvaan piirrettyinä, poisto vaatii uudet laatat (uusi TasoVersio), ei koodisuodatinta.
- **Louvre-mallin kytkentä:** pyramidit pois mallista, peli tekee ne koodilla (`Nahtavyysalue.cs` `Pyramidit`, `RakennaPyramidit`; Louvren rivillä ei vielä `Pyramidit`-arvoa). Suhde 0,63 pihan leveydestä (omistaja 14.04). Jos Tripo toimittaa pyramidit mukana, ratkaise kytkennässä.
- **Sarja 24:n asennus:** -1407:n ohje pätee. Taulukkoon tulee uusi kohde, kun se on valmis.

## Opit
- zsh: `$b:Assets/...` tulkitaan muuttujan muokkaimeksi (`:A`), ja silmukka antoi väärän 0-tuloksen. Kirjoita `${b}:polku`.
- Komento `node tools/raamattu-luku.mjs 2` on 156 kt: lue kohdat, ei lukua.
- Piirtopolkujen kartoitus kannatti antaa Sonnet-agentille (Explore), koska se vei 73 000 tokenia.
