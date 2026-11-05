# Natiivi-UI: luovutus 5.11.2026 klo 16.42 (konteksti 31 %)

Korvaa -1616:n. Työhaara `natiivi-ui/kyltit-219`, kärki 5263cacb5, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). KS nollautui, joten NUI on haaran ainoa kirjoittaja (JU 16.3x). Jos KS palaa, yhdistä sen kärki karttaseppa/nahtavyydet-219 ennen jatkoa.

Omistaja 16.41 (PT): "keskitytään vain pariisin 3d rakennuksiin". Jatka vain kylttejä ja KK:n pyytämää kuvien palautusta. Muu odottaa. Mac-vuorot menevät ensin Eiffelille ja sarjan seitsemälle, joten tämä ajo voi viipyä.

## Ensin
1. Kuittaa JU:lle (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd) "NUI valmis". JU:lla on jonossa 5263cacb5, tulos lokit/julkaisija-pariisi-kyltit-5263cacb5. Älä vaihda kärkeä ennen tulosta (lupasin JU:lle). Jos JU ajoi jonkin muun kärjen (85aedf3a5 tai 92d793025), tarkista viestistä.
2. Kun ajo on valmis, katso kuvat täysikokoisina ja vie tulos KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a), kopio PT:lle (2.214). KK odottaa Macin kuvaa.

## Mitä ajosta katsotaan
- `kyltit-katukuva-ennen` ja `kyltit-katukuva-suuri`: KK:n pyyntö: katukuva suurenee napautuksesta. Lisäsin nämä skenaarion sk-pariisi-kyltit.txt loppuun. Napautuskohta `ui napauta 299 291` on laskettu ajon b09c05441 keski-kuvasta (434,423)/2000 × 0,688, joten tarkista lokista osuma; jos meni ohi, korjaa piste. Yhteensä 22 kuvaa.
- `kyltit-viisto`: Louvren oma kyltti täytenä, ei haaleana (korjaus 3731343c3).
- `kyltit-louvre-lansi`: Notre-Damen ja Sainte-Chapellen kyltit näkyvät (KK 1). Temple-tornin kyltti palasi. Les Halles ja Bastilji eivät ole rakennusten päällä.
- `kyltit-keski` ja `kyltit-louvre-viisto`: pallon hintakyltti väistää narun pään viereen (KK 2).
- Katukuvat näkyvät pyöreinä ilman kylttiä: tämä on oikein, ei vika.

## Tehty tässä sessiossa
- 3731343c3: Horisonttiusva.KylttiNakyvyys: ruudun ja syvyyden usvista suurempi ratkaisee (täysi 0,6:een, poissa 0,9:ssä). Pallon reunan kulmahäivytys pois 3D-kylteiltä. Testi PariisiKallistusTestit.KylttiEiHaaleneKirkkaanKartanPaalla. Syy (viisto-kuvan kulmista laskettu, ei mitattu): 0,75 × 0,77 = 0,58, ja c62dbe66f:n kapea häivytys vei sen noin 0,3:een.
- 040681412: näkyvän rakennuksen kyltti ei häviä usvaan (MalliKyltit: peitto vähintään mallin näkyvyys); hintakyltti kuudessa paikassa narun pään ympärillä, edellinen paikka ensin (KaupunkiPallot.HintakyltinAlue).
- d655a857f: nostokylttien ja hintakyltin törmäys mallin kahdeksan kulman kuperaa kuorta vasten (Nahtavyysalue.OsuuMallinMuotoon), ei rajauslaatikkoa. Ajo 59fde3622 näytti rajauslaatikon piilottavan Temple-tornin kyltin vierestä, kuten KS varoitti.
- 92d793025: katukuvat takaisin kartalle (KK 16.3x), SaapumisKuvat.cs ennallaan.
- 5263cacb5: KS:n 85aedf3a5 yhdistetty. Tarkistus 0, pohjavahti ok, PariisiKallistus-testit 11/11 ennen viimeistä yhdistämistä.

## Virhe, josta opittiin
Piilotin katukuvat, koska luin 2.210:n "eivät nouse" väärin; KK oli myös listannut ne viaksi. Omistajan sanat 3.11. 08.48 ja 5.11. 15.01: kuvat jäävät pieninä kartalle. PT tarkensi 2.210:n. Pyöreät kuvat ilman kylttiä -kohta -1616:n Auki 1:ssä on näin ratkaistu: niitä ei korjata.

## Auki
1. Grand Châtelet'n ja Bastiljin pienoismallit jäävät ilman kylttiä, kun kyltti häipyy rakennuksen edestä (kyltit-viisto, kyltit-louvre-lansi). Kiinteä kyltti ei siirry (omistaja 2.11. 08.14), joten en muuttanut tätä. Katso kuvasta, ja jos kyltti puuttuu näkyvästi, kysy KK:lta.
2. Kaukaiset kyltit matalalta (omistaja 14.55 "matalalta vain lähimmät kohteet"): ei etäisyysrajaa. Kohdenostot eivät lue usvaa lainkaan (NostotKartalla ~1180), joten Sacré-Cœurin kyltti leijuu usvassa.
3. -1616:n muut: Temple-tornin, Bastiljin ja Galerien leikkeet kaukaa, kylttien pysty- ja kursiivi-ero (2.212), `komento nimet etsi Pariisi`.

## Huomiot
- 7.47: luin luovutuksen, 0 Periaatteet ja 7.x-rivit, mutta lukujen 4 ja 6 tulosteen vain esikatseluna. Lue ne aloituksessa.
- Viestit: SendMessage pysähtyi rajaan 16.3x; käytä mcp__ccd_session_mgmt__send_message session-id:llä.
- tarkista.sh generoi Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json: palauta `git restore`:lla, älä committaa.
- Kartta-testit ajetaan `sh Kartta-testit/kaanna.sh <nimi>`, ei zsh:lla.
- Älä yhdistä lento-haaraa suoraan; siitä päättää PT.
