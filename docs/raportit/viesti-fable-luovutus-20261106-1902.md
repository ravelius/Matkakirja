# PT:n luovutus 6.11.2026 klo 19.02 (uusi tili vvi@vvi.fi; konteksti 30 %)

Korvaa -1830:n AUKI-listan; sen OPIT, OMISTAJAN PÄÄTÖKSET ja JUNARUNKO -1458 voimassa. Id:t osoitekirjassa. Taulu Qo5w6Wk4JSYRwYbyf2fJrm.

## ALOITUKSESSA
- Monitorit uudelleen: `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py` ja `/Users/Shared/Claude/hooks/codex-posti-vahti.sh` (30 min). Ei jonokierros-cronia. Etäyhteys vain KK:lla; tarkista `list_sessions`, sovellus voi kytkeä sen käynnistyvälle sessiolle.
- Tilinvaihto valmis: tilinvaihto-valmis.mjs paluu 0, ohjeiden koe 10/10 uusinnassa, rivi KK:lle lähetetty. Ei toistoa.

## OMISTAJAN PÄÄTÖKSET 18.49 (lokissa, PR 6384)
- vvi@vvi.fi raja 99 %: rivi, ei keventämistä.
- Eiffelin reuna (ajo 28) Kelpaa: hyväksytty, mutta lähtee vasta, kun Eiffel ja Pariisin mallit menevät runkoon 603d4213a (rungossa ei Eiffeliä). KS 0ab14d552, haara karttaseppa/nahtavyydet-219; Y:ssä 1ab552a69. KK:n viestin sha 33ea85e3b oli NUI:n mittausrivi "ei junaan": jätetään pois, kun Y kootaan junaan.
- Maalattu taivas #2178 Kokeillaan: väliversio pelikokeeseen, KK sopii muodon ja tilaa Codexilta koko kierroksen. VS 38ab4d14d (linssiseppa2/maalattu-taivas, koe, ei junaan), varjostin ajamatta.

## AJOSSA JA ODOTTAA
1. JU:n jono iPadilla: origokoe uusinta 18.59 → NUI:n yhdistelmä ja UI-sarja 1104d0994 alusta → KS:n ajo 30.
2. ORIGOKOE: PT antoi yhden uusinnan, koska keskeytys tuli JU:n skriptivirheestä (desimaalipilkku), ei vahdista. Seuraava keskeytys mistä tahansa syystä = EI TULOSTA ja koe sulkeutuu. Ensimmäisen ajon A1 3/7 ei kuulu aineistoon. Tulos NS:lle ja KK:lle. NS kysyy C1:n ja D2:n vasta tuloksen jälkeen.
3. KS ajo 30 (Y 1ab552a69, 10 kuvaa, kokeena): Pont d'Iénan pohjoispää, Notre-Dame #2175 nykyinen | uusi. Mukana listat: VS:n usva-viisto (b3bff978f, sk-usva-viisto.txt), maalattu taivas (sk-taivas-maalattu.txt), NUI:n välketallenne (lisa-kyltti-valke.txt). KUVAT PT:LLE ENNEN KK:TA: katso koko parit täysikokoisina omistajan sanoja vasten.
4. VS: nollautuu Postivahdin kautta (luovutus ad1f03f1d). Järjestys: taivaan kuvat, sitten ääriviivavarjot esilaskettuna (Python-arvio 246 911 → 953 kolmiota, ei laitemittausta), sitten yksi iPad-mittaus JU:n vuorolla. Ei junaan ennen mitattua lukua ja omistajan sanaa. Parissa koko kohde, S-C:n kirkon varjo, ND/SC/GP:n reuna, Eiffelin aukot. Kovien varjojen lista KK:lla.
5. NUI: kyltit EI kuittausta, ennen kuin 30 vaihtoa nopeissa lennoissa nähdään ruutusarjalla tai videolla; korjaus kulkee Y:n mukana vasta, kun Y hyväksytään. Löydös: Liiku-teksti puuttuu ajon 28 kuvasta 1, syy selvittämättä (työlistalla). Yhdistelmän ehdot luovutuksessa -1830 kohta 4.
6. LAV: 3c katsottu, tummat kolmiot ja r--265:n viiva poissa. Kävelyehto ei täyty: vienti vaatii kartan uuden ajon; 6 ovea siirtyy (suurin 21,5 m), 3 levyä (168 m²) jää esteiksi. PT antoi jatkaa vain mittauksin; uusi leivonta tai kartta-ajo vasta PT:n sanalla. Ei vientiä.
7. KS Riemukaaren 2 vikaa Codexille 08aef8575. Pompidou 9e84124d4: junavuoro yhä antamatta, tarkista rungosta.
8. PK lepää, kunnes kartta on valmis LAV:lta.

## HUOM
- Asemataulu: TYOLISTA LIIKAA 31 työn alla (raja 15): PT valitsee, tekemättä. Hook muistuttaa kolmesta vanhasta rivistä: Pariisi striimikartan päälle, Pariisin eteneminen kuvina, Juoksupeli täysin valmiiksi.
- Levy 67 Gi, alle 100 Gi:n tavoitteen; yösiivouksen asia.
- Postivahdin Codex-hälytys oli väärä: vahti ei tunnista KS:n kuittausta PT:lle osoitettuun toimitukseen (#2168, 2169, 2171, 2172). Korjaamatta codex-odottaa.py:ssä.
- Postivahdin kansiossa KIERROS.md, NOLLAUS.md ja codex-odottaa.py ovat seuraamattomina juuressa haarassa koti/Matkakirja-posti (palautettu main-peilistä 6.11.). Oikea tila on haara postivahti: Postivahti siirtyy sinne, kun ehtii.
- KS, VS ja PK jäivät kotikansiossa mainista jälkeen omien tiedostojen takia; CLAUDE.md sama.
- PT:n checkout on main, jäljessä; muutokset worktreissä (`tools/uusi-worktree.sh fable <aihe>`). Tämän vuoron worktree wt/fable-tilinvaihto-20261106 voi poistaa.

## ODOTTAA OMISTAJAA
Ei PT:n kortteja. KK: Notre-Dame #2175 ja taivaan kierros Codexilta.

## OPIT
- Tarkista sha ennen kuin välität sen roolille: omistajan päätöksen sha voi olla ajon kärki eikä itse korjaus.
- Ohjeiden kokeen tehtävänanto ei saa rajata pois CLAUDE.md:n viitteitä; vastausavain 3 päivitetty kohtaan 1.11.
