# Natiivi-UI: luovutus 16.10.2026 klo 13.35 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -aamu3 ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöstä tyokalut/tarkista.sh (0 virhettä).
Ketjut: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh (`zsh <ketju> <sha>`, nohup; L2-käännös → iPhone
123B4B25 + iPad F7513985). Parit: `python3 -I .../natiivi-ui-ajot/pari.py ulos vasen oikea [korkeus]` (zsh: ei komentoa muuttujaan).
SIMUT 123B4B25 + F7513985 NUI:n käytössä metro-ketjuun asti → sitten Julkaisijalle (local_5cb16c00-…) "SIMU VAPAA".

## VALMIS (tämä sessio)
- LATAUSKUVAN NIMI: d7cf79a48 nimivarjo (liuska) raketti + linna → PT kuittasi, junan 196 rungossa 0db646328.
- ISS-lasi ja ISS NIMET-nappi olivat jo junassa 196 (7d70508f9, 325f72519, bfa99c784) → PT:lle kuitattu, ei tehtävää.

## KESKEN (ketjut ajossa taustalla 13.35)
1) VIHJEIDEN VARJOT → JUNAAN 196 (omistaja 12.40: "pitää tehdä vielä varjot niille, sitten voi laittaa junaan 196 jos vain ehtii";
   12.40 tarkennus: "tuo kameli juttu on outo, ota siitä se tekomaa pois ja tee vain varjot oikeaan karttaan kameleista"; PT 12.58:
   takaraja poistui, "tee rauhassa ja kunnolla"). Haara natiivi-ui/vihjeet-kartta-197, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vihjeet-kartta-197.
   Ketju: 4481395ce (11.57+11.58 PT kuvat lähetetty: koko iPadin pystyn mukaan, muste+okra, vain ruudulla omalla paikallaan, ei nuolia,
   pallon kiekko) → 8e9f32d25 (kytkimet päälle: Aloitusvihjeet.Kevyt = true + vihjeet.json kaytossa true, PT: juna 196 kytkin päällä)
   → 0c0a3a479 (Pohjaviivat: tekomaa pois karavaanista + tornista; simu 12.56: kamelit kartalla, mutta 3 px:n siirtovarjo ei näy)
   → 7ea799e8e HEITTOVARJO (siluetti jalasta kaakkoon VarjoPituus 0,5 / VarjoLasku 0,15, sumennus 3, peitto 0,4, MustePehmea;
   piirros napin sisällä omana mk-erikoisnosto-paa__kuva -kehyksenä, varjo napin ohi; Pohjaviivat myös Giza, Bagdad, Samarkand,
   Teheran, Tripoli; Grönlannin ja Dubain vesi jätetty, osa näkymää). Offline-esikatselu: scratch-skripti esikatsele2.py (ei repossa).
   KESKEN: kartta7-ketju.zsh 7ea799e8e (käännös jonossa/xcodebuild 13.3x) → _tyo/natiivi-ui/vihjeet-kartta7-ketju.out, lokit
   todistus-vihjeet-kartta2-{iphone,ipad}-197-* (uusimmat). Tarkista: varjo pehmeä ja lepää kartalla (ei tarra), ei kovaa reunaa,
   tekomaa poissa, `ui vihjeet tila` lokissa. Pari nykyinen = todistus-vihjeet-kartta2-*-1217/1219 (4481395ce) | uusi → kansio
   _tyo/natiivi-ui/vihjeet-varjo-pari-<hhmm>/ → PT (3 riviä) → NS:lle junaan 196 kun PT kuittaa. Jos varjo heikko: VarjoPeitto/Pituus.
2) KEVYT METROKARTTA → juna 197 (omistaja 13.29 KK:n ja PT:n kautta: "metrokartan muut kohteet saisi näkyä vielä pienemmällä ja ota pois
   musta reunus tekstistä. ja ota pois kaikista metrokartoista pois kohteen selitysosa"; PT: nykyinen erottuu nimellään, muut pienempiä ja
   himmeämpiä, luettavuus väristä ja pehmeästä varjosta, kytkin pois, kuvapari PT → KK). Haara natiivi-ui/metro-kevyt-197 3777a3f5b
   (pohja juna-196 8fb0fe65f), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-metro-197. OpasMetrolinja.Kevyt (pois),
   `ui opasvalikko metro kevyt 1|0`: kaikki metrokartat ovat OpasMetrolinja-pohjaa (OpasValikko kierros, MuseoTaulu nimilista Kelaus,
   KierrosTaulu antaa selitteen) → yksi muutos kattaa kaikki. Museon metrolistassa ei ole selitettä (omistajan muistama "selite" on
   museon otsikkolohkon selittävä nimi, MuseoTaulu.selite – kysy PT:ltä, kuuluuko pois). KESKEN: metro-ketju.zsh 3777a3f5b (odottaa
   kartta7-ketjun) → _tyo/natiivi-ui/metro-ketju.out, lokit todistus-metro-kevyt-{iphone,ipad}-197-*; skenaario sk-metro-kevyt-197.txt
   (M1/M2 kierros nykyinen|kevyt, M3–M6 testilinja selitteellä pysty/vaaka). Jos kierros ei tuota metroa, testilinja M3–M6 riittää pariin.

## Opit
- pkill -f "<ketju>" tappaa myös Monitorin, jonka komennossa sama teksti; Monitorissa pgrep -f "[k]etju" (ei osu itseensä).
- Käännösjono L2 voi viedä 20–30 min muiden roolien takana; älä tapa Unity-vaiheessa olevaa proto-kaannaa (orpo Unity), tapa vain ketjun emo.
- Karttapiirroksessa 256 px:n kopio kutistuu 35–58 pt:hen: varjon mitat tekstuuripikseleinä ovat ruudulla ~0,15–0,25 pt/px.
