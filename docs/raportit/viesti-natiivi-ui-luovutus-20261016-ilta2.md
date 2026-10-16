# Natiivi-UI: luovutus 16.10.2026 klo 19.19 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -ilta ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöstä tyokalut/tarkista.sh (0 virhettä).
Ketjut: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh (`nohup zsh <ketju> <sha>`; L2 → iPhone 123B4B25 +
iPad F7513985). Parit: pari.py. LEVY: _tyo/natiivi-ui/ enintään 2 uusinta .app-käännöstä.

## ENSIMMÄISENÄ (PT 19.2x): MUSEO-NIMI-KUVASARJA PT:LLE → JUNA 197
Haara natiivi-ui/museo-nimi-197, uusin c65d2e66c (⊃ c5dff5d39, 6d2043e0c, 902e2266b). LS:n 90b7a67b3 EI mukaan. iPad-ajon tila: 902e2266b iPad OK
(…-ipad-197-20261016-1909); c65d2e66c ajossa iPad + iPhone (museo-nimi3-ketju.out). Heti kun ajo valmis ja kuvat tarkistettu → pari.py-kuvat PT:lle.

### Tausta: omistajan 18.10 palaute
Omistaja (PT:n kautta): "Miksi noissa esimerkkikuvissa näkyy vielä liikaa tekstiä otsikon ympärillä?" + "Ja tuo tummennus tekstin takana on
myös huono idea." PT: 1) museossa vain nimi + tekijä ja vuosi, ‹ › pois, kevyt-kytkin pois kokonaan (poistot, ei kytkintä; koskee metroa),
2) kaikki tummennukset/taustaliu'ut pois, 3) korkeissa teoksissa otsikko seinälle teoksen yläpuolelle. PT 18.4x: 3) Natiivi-UI tekee itse,
vain Katseluasento (Linssiseppä tietää; hänen 90b7a67b3 hylätty, ei poimita – Linssit 1927/1927 myös KavelyJokaisenTeoksenEteen).
Haara natiivi-ui/museo-nimi-197 (pohja juna-196 e3bc359fe), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-museo-nimi-197:
- c5dff5d39: OpasMetrolinja.Kevyt-kytkin, selite ja historiaotsikko aseman alla poistettu (myös KierrosTaulu/OpasValikko-asetukset ja
  testikomennot metro selite|kevyt, historia); MuseoTaulu: selite, ‹ ›-rivit (edelNimi/seurNimi/naapurit) ja nimiTausta poistettu,
  vaalealla tekstillä kevyen metron pehmeä varjo (LaattaMuste blur 4), tummalla ei; nimilista aina vaalea; DioraamaTaulu Seuraavaksi-rivi pois.
- 6d2043e0c: MuseoKierros.KorkeaTaytto 0,64 – pystymuotoinen teos (H > W) ≤ 64 % korkeudesta, kamera keskikorkeudella; MuseoTestit raja.
- 902e2266b + c65d2e66c: nimi seinälle teoksen yläpuolelle KAIKILLA leveyksillä; sävy (tumma vaaleassa salissa) teoksen päällekkäisyydestä
  lohkon keskikohdan mukaan.
- AJOSSA: museo-nimi3-ketju.zsh c65d2e66c (19.2x) → _tyo/natiivi-ui/museo-nimi3-ketju.out, lokit todistus-museo-nimi-{ipad,iphone}-197-*,
  skenaario sk-museo-nimi-197.txt (T1 Orsay, T2 nimilista, T3–T7 salit; T4 Salon Carré korkea, T6 Daru).
  Tarkista: iPadilla Darun nimi punaisella seinällä teoksen yläpuolella (ei kultalistan päällä), iPhonella Salon Carrén nimi TUMMA
  vaalealla seinällä, Orsay tumma. Kuvasarja PT:lle (Orsay, Daru, Salon Carré, nimilista; pari.py) → PT kuittaa NS:lle junaan 197.
  PT:lle luvattu ~19.45 (myöhästyy).
- Edellinen ajo 902e2266b: iPad OK (todistus-museo-nimi-ipad-197-20261016-1909), iPhone (…-1913) Salon Carré vaalea nimi seinällä → korjattu.

## VALMIS (tämä sessio)
- Juna 196: museotekstit natiivi-ui/museo-teksti-196 dcdffd0d4 (⊃ 14b96078a, a573c96ee) – PT kuittasi, junassa (e3bc359fe).
- Juna 197: TF 188 salilistan napautus b1ce221ba (haara natiivi-ui/salilista-197, kärki a60097fef = + testikomento ja lokirivit) – PT:lle
  ilmoitettu 17.4x; todiste todistus-salilista7-iphone-197-20261016-1748 ("kosketus liu'un aikana 49 pt/s → pysäytys ja napautus läpi",
  raja 150). Sormella laitteella varmistus suositeltava. Ei PT:n kuittausta nähty → tarkista PT:ltä, onko junassa 197.

## Opit
- Kova kuorma (load > 16) voi jäädyttää iPadin museon latauksen 18 s → mykistysvahti keskeyttää ajon: aja uudelleen, ei koodivika.
- Proto-kaanna.sh-jono on lukko + pollaus: vanhan ketjun voi tappaa (pkill ketju + proto-kaanna.sh <sha>) ja käynnistää uudella sha:lla.
- Kosketusheitto-testikomento: GetPooled(Touch) ei käännä y:tä; lepotaajuus venyttää pyyhkäisyn (Ruudunpaivitys.Vierita joka askeleella).
