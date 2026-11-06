# Natiivi-UI: luovutus 6.11.2026 klo 17.34 (pehmeä kontekstiraja 27 %, 7.37)

Korvaa -1707:n kohdat "Tila", "Toistoajo JU:lla" ja "Tähtikyltit". -1707:n "NS, tiedoksi", "Havainnot", "Opit" ja -1616:n "Mitä 13dab1aac muutti", -1612:n "Odottaa, aloittamatta", -1510:n "Mitä muutin" ja "Opit", -1306:n Havainnot sekä -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse.

## Lue ensin
- proto-3d/lokit/nui-ui-13dab1aac-toisto/tulos-nui.md (toisto, E seurannassa, PT:n sanat, junakuittauksen ehto)
- proto-3d/lokit/nui-tahtikyltit-20261106/tulos-nui.md (ajo 24, korjaus, PT:n sana)

## Tila: kaksi odotusta, ei muuta jonoa
Ei omia ajoja käynnissä. Ei koodia ennen tuloksia.

### 1. UI-sarja: JU:n vuorolla (jonossa ennen tätä LAV, ajo 26, origokoe; ei ohituksia)
Pyydetty JU:lta: natiivi-ui/ui-sarja-219 13dab1aac rungon 603d4213a päälle omana haarana, käännös, koko UI-sarja 15 ilman kuvia, tulos lokit/nui-ui-yhdistelma-<sha>/. Sen jälkeen skenaario lokit/nui-piilo-palautus/sk-piilo-palautus.txt kerran Macilla ja sitten kerran isolla iPadilla, tulos lokit/nui-piilo-palautus-<sha>/. Jos Macin oleta ei täyty, ei iPadia. JU lähettää sha:n ja polut tälle sessiolle. JU:n kuittausta ei ollut vielä 17.34: jos ei tule, tarkista list_eventsillä.
Kun tulos tulee:
- UI-sarja: vain D:n 3 riviä saa jäädä. Uusi rivi tai yli 10 s:n vika = PT:lle. Unityn rivit `<varauksen loki>.unity.log`.
- Palautus: PT:n junakuittauksen ehto, sellaisenaan: "lokissa poistoja ja palautuksia > 0, 0 RenderTreeCompositor-kaatoa ja suodin näkyy palautuksen jälkeen kuvassa". Katso kuvat 2 ja 4 täysikoossa, Mac ja iPad erikseen.
- Tulos PT:lle 3 rivinä. Junaan vasta PT:n kuittauksella.
Skenaario on AJAMATTA. Kortin sumennus komennolla `ui nosto` on luettu koodista (UiNakymat 586-587), ei nähty. Jos se ei sumenna, keksi toinen vaihe ilman koodia tai kysy PT:ltä.

### 2. Tähtikyltit: KS:n ajo 26
f0384fdbe (natiivi-ui/kyltti-diag, peilissä natiivi-backup, 10c8060de:n päällä): levossa ei paluuvaraa. Kääntämättä Unityssä, kokeena, ei junaan. Kartta-testit KylttiUiEste 4/4; koko sarjaa ei ajettu.
KS 17.2x: ajo 25 oli jo käynnissä, joten commit ja _tyo/karttaseppa/lisa-kyltit-nui-2.txt menevät ajoon 26. KS lähettää lokin polun ja rivit, käännösvirheen heti. Virheen korjaan itse.
Kun loki tulee: Bastilji näkyy molemmissa kuvissa (kyltit-eka, kyltit-laikka), levossa True kyltti-riveillä. Lue Templen levon usva-arvot: jos syvyysUsva on enintään 0,744, näkyvyys 0,531 on hystereesin välillä, ja vain muisti pitää kyltin poissa. Usvaa ei muuteta ilman PT:n sanaa. PT: "Tulos ja parit KK:lle, jos ero näkyy."
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltti-diag: levyllä vain testiajon lähteet, muut näkyvät poistettuina. Älä aja siellä `git add -A`. Poista, kun lukema on saatu.

## Havainnot
- Ajon 24 kyltti-riveillä levossa False ja syvyysUsva ovat seuraavien komentojen jälkeisiä: skenaarion komennot ajautuvat ennen ui-lukemaa. Muista odota, kun luet tilaa skenaariosta.
- Katujen nimet eroavat samalla kameralla samassa ajossa (kyltit-eka | kyltit-laikka). Syytä ei mitattu.
- Runko on nyt 603d4213a (JU 17.29), ei d092f48cc.

## Opit
- zsh: `$R:Assets` tulkitaan muuntimeksi. Kirjoita lainausmerkit ja sha suoraan: `"6a037d9bc:Assets/..."`.
- `echo ====` kaataa zsh-komennon (=-laajennus).
- Lautapeli ei todista PiiloVartijan palautusta: sulkiessa omistaja asettaa Null. Toistossa 51 poistoa, 0 palautusta.

## Ei todennettu
f0384fdbe:n kääntyminen ja vaikutus kuvassa. Templen syy. Yhdistelmä 13dab1aac + 603d4213a kääntämättä. Palautus näkyvälle elementille, tyhjä lista iPadilla. E:n ja yli 10 s:n vian syy, ja tuleeko vika kovassa kuormassa (toistossa enintään 1 rinnakkainen). Laiterungoista tarkistin vain neljä uusinta. -1414:n Ei todennettu -lista on voimassa. En lukenut Raamatun lukua 7 tässä sessiossa, vain luovutukset.

## Muuta
Remote Control ei päällä: vain omistajan pyynnöstä.
Hookin työlistarivit (Pariisi uudelleen striimikartan päälle, Pariisin eteneminen, Juoksupeli: tason 1 kulkualue) eivät tunnistu omikseni, en päivittänyt.
