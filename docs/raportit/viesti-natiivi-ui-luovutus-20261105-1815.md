# Natiivi-UI: luovutus 5.11.2026 klo 18.15 (konteksti 33 %)

Korvaa -1805:n. Työhaara `natiivi-ui/kyltit-219`, kärki 26c7ffcfc, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki).

Omistaja 16.41: vain Pariisin 3D-rakennukset. Omistaja 17.58 (Raamattu 10.5): jokainen Mac-ajo ratkaisee yhden kysymyksen, pyynnössä JU:lle rivi "mitä tämä ratkaisee" ja noin 5 kuvaa.

## Ensin
1. Kuittaa JU:lle (id osoitekirjasta) "NUI valmis". Ei NUI:n ajoja jonossa.
2. KK 18.06 (omistajan näkemä 6ff3ef451): viat samaan seuraavaan ajoon, EI omaa Mac-ajoa. 26c7ffcfc odottaa sitä. PT:lle kerrottu, että ajossa riittää 4 kuvaa: louvre-viisto, tuileries, chatelet, keski.
3. Kun ajo on tehty: katso nuo kuvat täysikoossa ennen kuin kerrot mitään valmiiksi, ja kerro KK:lle ja PT:lle.

## Tehty 26c7ffcfc (KÄÄNTÄMÄTTÄ, EI KATSOTTU; vain Unity-ajo todistaa, Kartta-testit eivät käännä NostotKartallaa)
- Kohta 1, horisontti: syy NostotKartalla.PeitaMallienAlta "kohde ? 1f" (kohdenosto näkyy aina, TF 213). Kyltillisellä kohdenostolla peitto on nyt m.KylttiUsva (Horisonttiusva.KylttiNakyvyys), ja KylttienTormays käsittelee usvaan hävinneen törmäyksenä: ei varaa tilaa, ei ota napautusta. Muut kohdenostot ennallaan. Kuvan napautus pois myös törmänneeltä (KuvatKylttienMukaan).
- Kohta 2, Tuileries: leike-tuileries.png on pitkä vino siipi 268×400; yhteisessä 59 pt:n koossa suikale. Kuvaa ei muutettu; rivi KS:lle lähetetty (tiivis näkymä tai oma koko). "Tuileries" kahdesti: KyltinKorvaamatNimet + Nahtavyysalue.KirjaaKorvattuNimi; puiston nimi väistyy palatsin kyltin näkyessä. Toimii vain, jos nimi on elävä nimi (Nimikerros rivi 589); tarkista kuvasta.
- Kohta 4, Grand Châtelet: KyltinLaatikko laski kyltin minimerkin ruudusta. Nyt Merkki.LeikePuoli (Kohdenostot.LeikeSuhde) ja kyltti leikkeen reunasta + 2 pt.
- Kohta 4, nimet: KeraaPyoreat kirjaa pyöreät merkit Nahtavyysalueelle (KirjaaPyorea), ja Peittaa väistää nimen. Seuraus: Hôtel Matignon ja Hôpital Lariboisière katoavat keski-kuvasta, Saint-Germain-des-Prés'n luostari merkin kohdalta. KK:lle sanottu; jos nimi on tärkeämpi, KK sanoo.

## Auki
1. Kohta 3, tumma läiskä nappulan vieressä (kyltit-chatelet, nd, viisto): syy ei tiedossa. Ei aarrepiste (Valopiste _Ydin 1 piirtää pienen ytimen ja hehkun), ei näytä pyöreältä kuvamerkiltä (reuna noin 5 pt). Arvaus: kaupungin oma merkki Hôtel de Villen kohdalla (KaupunkiMerkit, Kohdemerkki-varjostimen halo), ei todennettu. KK:lle sanottu "en tiedä varmasti". Jatko: lue KaupunkiMerkit.cs Kohdemerkki-osa ja vertaa pisteeseen 48.8566, 2.3522.
2. Odotetaan KS:n vastausta Tuileries'n leikkeestä.
3. -1805:n Auki 1, 2, 4, 5, 6, 7 ja 8 ennallaan: "merkin päälle" -haaraa ei nähty kuvissa; liikkeessä kyltin sivu voi hypätä (rajat edellisestä kehyksestä, ei katsottu); hintakyltti ei väistä nimiä; Grand Châtelet, Temple-torni, Bastilji ilman kylttiä tietyissä kuvissa, odottaa KK:n sanaa; Vrain-Lucas todistamatta (KS); pulu ND:n kyltin päällä jää PT:n päätöksellä; tarkista.sh exit 1 valovahdista, PT ratkaisee; -1642:n Auki 2 ja 3.

## Huomiot
- tarkista.sh: `zsh tyokalut/tarkista.sh`, palauta sen jälkeen Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json `git restore`:lla.
- proto-repon etähaara on `natiivi-backup`, ei origin. Push saattaa antaa "fatal error in commit_refs" (GitHub); uusinta riitti 18.1x.
- Viestit: send_message session-id:llä; PT:n, KK:n, KS:n ja JU:n id:t osoitekirjasta (päätili). Lento-haaraa ei yhdistetä; siitä päättää PT.
