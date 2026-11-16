# PT:n luovutus 6.11.2026 klo 17.20 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261106-1558.md (JUNARUNKO ja OPIT -1458:sta voimassa; AUKI-listan korvaa tämä). Tila: fable-tila-20261019-1910.md, ylimmät rivit.

## ENSIMMÄISENÄ
- Viritä vahdit (7.41): odottajat-vahti.py ja codex-posti-vahti.sh. Tässä vuorossa niitä EI viritetty.
- Etäyhteys vain KK:lla (omistaja 16.08, Raamattu 7.9): älä kytke itsellesi. KK:lla pois 16.38 nollauksen takia: varmista, että uusi KK kytki sen (ei tarkistettu sen jälkeen).
- Viestit: SendMessage pysähtyi rajaan 16.1x; varakanava mcp__ccd_session_mgmt__send_message (12.20). Omistajalle kerrottu, että raja ei näin pysäytä viestejä; hänen vastaustaan ei ole.

## OMISTAJAN PÄÄTÖKSET (kaikki lokissa)
- 16.05 renkaat luonnoksen suuntaan (PR 6359); 16.20 ja 17.16 kelpaavat (PR 6362, 6367).
- 16.08 etäyhteys vain KK:lla; Pompidoun siksak riittää (PR 6361).
- 16.46 Seinen litteät muodot pois, myös Bercy (PR 6363); 17.08 Off Paris Seine lähtee (PR 6366). Kuva KK:lle ja omistajalle ennen junaa.
- 16.53 ND #2168 ja Riemukaari #2169 ei vielä, nykyiset pysyvät (PR 6364). Riemukaaren "ei vielä" on KK:n tulkinta omistajan sanoista, hänelle kerrottu. KS kuittasi Codexille ac1ce57a0, 542155d12.
- 17.05 palikoiden iPad-mittaus odottaa, kunnes Pariisi on valmis ja muisti kevennetty (PR 6365). KK 17.08: koskee korvauksen mittausta, ei origokoetta.

## AJOSSA JA JONOSSA (JU)
1. RENKAAT: ae161fdb6 (pelikoodari/renkaat-juna-219) kuitattu junaan 219, PT luki diffin. JU yhdistää; kuittaus oli JU:n jonossa, tarkista. Junarivi puuttuu vielä taulusta, koska yhdistämistä ei ole nähty. Näkemättä: häivytys liikkeessä, oikea laite.
2. PK: yhdistää web PR 6368 vihreänä (testit oli kesken) ja korjaa unity-tarkistus.sh: kaanna() ohittaa csc:n poistumiskoodin, grep ': error ' ei tunnista "error CS2007:". PK:n mukaan zsh-ajo antaa väärän "0 virhettä", jos vanhat DLL:t ovat paikalla. Viesti oli jonossa, tarkista. Aiempia zsh-ajoja ei ole käyty läpi.
3. LAVASTAJA: leivonta 20 palaa + aja-levyt3c 35140432d, ei vientiä. Ennen vientiä tummat kolmiot, ohut viiva r--265 ja PK:n kävelytarkistus (lattia laskee 0,3-0,7 m).
4. ORIGOKOE (NS): iPad 5 d907286cb kerran LAV:n jälkeen, 0 palaa, vahti päällä, koe sulkeutuu tähän. Vahdin keskeytys = "ei tulosta". Tulos aina KK:lle. Mac-13:a PT ei lukenut. Odotettu lasku vain noin 10 %. NS kysyy C1:n ja D2:n sulun jälkeen.
5. UI-SARJA (NUI): toistoajo 13dab1aac x6 käynnissä 17.07. Sääntö: yli 10 s toistuu = reitti luetaan, E auki; ei toistu = E seurantaan, mittari päälle, riski tulokseen, liitos kun vain D jäljellä. Ei kolmatta sarjaa. Rungon fcce6131f..d092f48cc "ei junaan" on vanhentunut (räystäs ja dither kuitattu).
6. KARTTA (KS): ajo 25 (8b6e10803, 5 kuvaa + pelin palat) JU:lla, vuoro annettu. Sen jälkeen versio e24 → e23 ja vain Pariisin palat päätteellä (PT:n sana); muiden kaupunkien katettu vesi jää vanhoihin paloihin, määrä laskematta. Haalean raidan syy auki: ei talot, ohjelmakohteet eikä veneet. Omistajalle luvattu kuva puuttuu vielä.
7. KYLTIT (NUI): Bastiljin korjaus omassa commitissa kokeena (PT:n sana, viesti oli jonossa), todennus KS:n seuraavassa ajossa, odota 2; Templen syy auki. NS:n 2 px:n kylttiportaat erikseen, ei korjausta. iPadin kehysaikapiikit vedossa auki.

## HUOM
- Laikan ja ND:n kuitti: alkuperäinen kaupunkitarkistus peruttu, kun ehto rajattiin Pariisiin; 16.46 kumosi rajan 1 000 m². Karttasepän nykyinen ehto: tulos ajossa 25.
- Työlistalla yhä hookin vanhat rivit: Pariisi uudelleen striimikartan päälle, Pariisin eteneminen kuvina, Juoksupeli: tason 1 kulkualue. Niistä ei ollut uutta tietoa, joten en päivittänyt.
- Yösiivoukseen: koti/Matkakirja-karttaseppa (22 omaa commitia mainin edellä, 10 vanhaa luovutusta ei mainissa); KS tarkistaa ennen poistoa. Levy 59 Gi 16.57.
- Viikko 84 % 16.57, hälytys 85 %, tilinvaihtoraja 92 %.
- Postivahdin luovutuksen "PT nollattu 16.2x" on virhe: PT ei nollautunut tässä välissä.
- VS ja LAV ilman luovutusta klo 16.55 (27 %, 25 %).

## ODOTTAA OMISTAJAA
Ei PT:n kortteja. KK näyttää ajon 25 kuvat.

## OPIT
- Tarkista viestin perillemeno jonon yli: nollautuneen roolin seuraaja pyysi jo annettua sanaa, ja vanha jonoviesti voi käskeä tuoretta sessiota nollautumaan.
- Lupa origokokeelle meni NS:lle ennen KK:n kantaa ja ristiin 17.05:n kanssa: kun omistajan päätös koskee samaa laitetta, kerro JU:lle samalla, mitkä jonon ajot jäävät ja mitkä pysähtyvät.
- `gh pr merge --delete-branch` ei voi poistaa haaraa, jonka worktree on auki: poista worktree ja haara heti perään ja varmista.
