# Karttaseppä: luovutus 4.11.2026 klo 22.56 (KS)
Syy: konteksti 26 % (7.37). Korvaa -2121:n jonon; sen "Opit" pätevät. Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. C = /Users/Shared/Claude/proto-3d/_tyo/codex. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219 (ei muutoksia tässä vuorossa).

## ENSIN
1. **Vahti kuolee nollauksessa: käynnistä Monitor** (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko, tulosta uudet commitit). Käsitelty 48ba13460 asti. Detached HEAD: ennen uutta postia `git checkout --detach FETCH_HEAD`.
2. Tarkista posti, koska jokin näistä voi olla jo tullut: v1b, 22b, 21e.

## Omistaja ja KK
- **Raamattu 2.207 (omistaja 22.41):** ei muistilukuja kuva-ajoihin eikä muistihylkäyksiä; muisti kerran, kun koko Pariisi on valmis. Nähtävyystilaukset eivät odota muistia. Ensin kuvat.
- **KK 22.5x, Louvre:** v1b peliin ilman uutta ottoa; pelikuvat neljästä suunnasta kartan etäisyydeltä ja Notre-Damen vieressä samassa valossa → KK ennen omistajaa. Uusi otto, jos pelissä siipi näyttää tyhjältä, katto piikkiseltä tai läpi näkyvät kaaret ja litteä väri erottuvat kirkon rinnalla huonosti (katso pohjoisesta ja idästä/lännestä). Kattoikkunat eivät yksin ratkaise. Jos otto: harkitse kehää neljästä julkisivusta ja pyramideja erillisenä geometriana (c1bf48c07: monikuvasyötössä ei yläkuvan paikkaa).
- **KK katsoo pelikuvista myös:** sininen (mallissa tummempi kuin 21d; G 128/168/194), pihan puunsyy, pehmeät pinnat; katunimi tai kyltti ei jää mallin alle tai kellu sen päällä; Louvren oma kyltti näkyy.
- **KK, paikka hyväksytty:** akseli 20,3°, iso pyramidi 80 m pohjoiseen oikeasta paikasta, Seinen ranta vapaana, pohja ND:n länsikärkeen yhtenä alueena. Rue de Rivoli jää mallin alle (tarkistettu mvt14:stä).
- **KK, Sainte-Chapelle:** suhteet 106 × 182, räystäs 130, harja 188, huippu 320 mallin pohjaksi. Pelikulma, länsi, etelä, pohjoinen ok. 22b KK:lle ennen Tripoa. Neljä sivua Tripon monikuvasyöttöön, pelikulma tarkistuslähteeksi. **Koko kartalla G:tä vasten, ei suurenneta** (G:ssä huippu noin puolet ND:n torneista, ehdotus 320/540 = 0,59).

## Odottaa muilta
- **Tripo: `louvre-3d-v1b/`** (posti karttaseppa-codex-tripo3d-louvre-21c-v1-korjaus, 4f53610fc + lisäys 8a6b149ed). Vika: 48 kolmion UV romahtanut pisteeseen (0,1), musta tekseli, suurimmat X −87…−54, Y 142–160, Z ≈ −160; raa'assa mallissa 0. Tripo kuittasi 7f236cbdf (ennen sahalaitalisäystä; varmista, että lisäys on nähty). Sahalaita korjataan vain samasta verkosta. **Tarkista toimituksesta itse:** laske nollan UV-alan kolmiot (A/louvre-21c-v1/musta3.py) ja mustat pikselit esikatseluista; toimituksen portti ei huomaa tätä.
- **Codex 22b:** `C/pariisi-sainte-chapelle-20261104/_review-ita-22b/ita.png`: kivinen kolmiopääty ja harjan risti. Vertaa rinnakkain A/louvre-21c-v1/sainte-chapelle-etela-ita-ristiriita.jpg:hen. Sitten KK, sitten Tripo-tilaus.
- **Codex 21e (48ba13460):** `C/pariisi-louvre-20261104/_review-pohja-21e/alue-louvre.png`, työohje `pohja-21e/TILAUS-21e-pohja.md`. Yksi otto; seuraavasta päättää KK. Tarkista jalanjälki, kadut, Seine ja reunat, sitten KK.

## Kun v1b tulee (ei vaadi 21e:tä)
1. SHA, kaikki esikatselut täysikoossa, UV-laskenta.
2. `A/louvre-21c-v1/asenna-louvre.py <louvre.glb> <worktree>` kirjoittaa Resources/NotreDameKoe/louvre.bytes ja louvre-normaali.bytes + .meta.
3. Nahtavyysalue.cs: Notre-Damen Maarityksen Mallit-taulukkoon toinen: `new Malli { Nimi = "Louvre", Tiedosto = "NotreDameKoe/louvre", Normaali = "NotreDameKoe/louvre-normaali", X = -168, Y = -200, Suunta = 20.3f }`. X, Y ovat ND:n pohjan pikseleitä (kehyksen ulkopuolella, sallittu). Suunta laskettu: GlbLukija (x,y,−z), julkisivu −Z, +Euler y myötäpäivään; ND 112° täsmää. Usean mallin aluetta ei ole ajettu: odota poikkeuksia varjoista ja ruuduista. Tarkista syntaksi Unityn csc:llä ennen JU:n vuoroa.
4. Commit natiivi-backup-haaraan, `A/louvre-21c-v1/sk-louvre-v1b-pohja.txt` → `/Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/` (lisää otsikkorivi SHA:lla), Mac-ajo JU:lta, lokit/julkaisija-louvre-v1b-<sha>. Skriptin alussa on aja + odota, koska aiemman sk:n ensimmäinen `aja` ei ehtinyt.
5. Katso: MaanpintaH 90 on mitattu ND:ltä, Louvre voi kellua tai upota (nd21-liitos/mittakaavat.py). _Savy-oletus (1,75/1,85/1,6) on ND:n atlakselle: Louvren tekstuuri 212/168/123 voi palaa puhki. Nimikerros.Peittaa piilottaa nimet mallin ruutulaatikon alta, ja kierretty 860 m laatikko voi piilottaa liikaa.

## Pohjan jatko (kun 21e on KK:lla hyväksytty)
- A/louvre-pohja/: tee-alue.py, alue/ (alue.json, jalanjalki, maski, pohja, tarkistus-alue.jpg), cs/ (VS:n 80 palaa, x 66381–66390, y 45086–45093, koodi wt k30 2d8ec025c). Kehyksen keskipiste 48.861704, 2.336219 = mallin keskipiste (768, 512).
- alue/pohja.png on palat + ND:n valmis pohja päälle. Maski ei koske ND:hen (väli 20 m).
- **Avoin liitos:** VS ei mitannut palojen eroa ND:n pohjaan. Rajaus alue/liitos-nd-rajaus.png: värit ja kadut näyttävät jatkuvan, mutta pohjoisrannassa on noin 12 m porras Pont Neufin kohdalla. Selvitä, onko se oikea vai sauma; ND:n pohja ei muutu.
- Koodi: Maaritykseen toinen pohja tai oma alue (nyt "yksi alue ruudussa"); alfa A/nd19c-k55/reuna-maski.py:n tapaan katuja pitkin.

## Sainte-Chapelle pohjalle (ennallaan)
Paikka ND:n pohjalla 475,502, Oikeuspalatsin piha (A/nd23-alue/pohja-sainte-chapelle-2x.jpg), piha noin 85 × 70 m, akseli noin 112°. Pohjaan oma paikka (kuten 19d), kun mallin koko on sovitettu G:tä vasten.

## Jono ja odottavat (ennallaan)
Seis ilman sanaa: tasankopoltto (PT); nimet 79186922b ja ed711573d kääntämättä; Karsi, Vincennes, Boulogne, minor-nimet ja puut 43ba52fe7 odottavat pelikuvia. Mac- ja iPad-ajot vain JU:n vuorolla. D iPad JU:lta, kun A ja vähintään yksi malli kasassa. s-090:n rengas: tarkista merkki koodista nähtävyysalueen yhteydessä. Eiffel oma kortti (2.92).

## Opit
- Toimituksen "KAIKKI OK" ei todista tekstuuria: kevennys voi romahduttaa UV:t ehjään verkkoon. Laske UV-ala ja katso kaikki kulmat täysikoossa.
- Kuvasarjan sivut verrataan keskenään: yksittäin hyvä itäkuva oli ristiriidassa sivukuvien kanssa.
- Väite "noin 100 m" tuli vinosta kuvasta. Paikat mitataan mvt14:stä; dekooderi ja kehys A/louvre-21c-v1/paikka.py.
