# Valosepän luovutus 1.11.2026 klo 19.45

Syy: konteksti 26 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1815.md.
PYSYVÄT TYÖTAVAT: pitkä Unity-ajo nohupilla + Monitor-vahti (valmis + kuolema); ajot väistävät NS:n käännöstä (xcodebuild /
käännöslinja 1) ja varattuja simuja (PT 18.4x: Pariisi ykkönen; mallit `_tyo/linssiseppa2/skriptit-20261031/jono2.zsh`).
Jokainen valmis valokoonti: polku + yksi rivi SUORAAN KK:lle send_messagella, kopio PT:lle. Ajon jälkeen `grep "Shader error"
unity.log` (18.56 magenta-ajo meni ohi ilman). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`.

## TEHTY JA RUNGOSSA 216 (NS)
- **a711ee8be** = 1a60b2499: havainne-editori iPadin Ultra-laatutasolla (Puyin varjo näkyy) + taivaan peili 07 (pilviraidat pois).
  Koonti lokit/havainne-editori-20261101-183327/koonti.png → KK + PT, kuitattu.
- **2913a381d** = taytto-216 f564ede54: elävä varjo vähentää leivotun valon täyttöä (JuoksuValo.hlsl JuoksuElavaTayttoK,
  QA `valo elavataytto r`, oletus 0,7). Varjo/aurinko 01 0,46 / 02 0,46 / 03 0,50 / 05 0,48 (havainne 0,39/0,46/0,53/0,46;
  ennen 0,60/0,48/0,66/0,67). Koonti lokit/esikatselu-20261101-190116/et-koonti.jpg → KK + PT, kuitattu, Pariisin TF:ssä.
- **1cbab246f** = k01-216 1698af586: havainne-editorin 01 testikameralla 4,5 m / 6,88 m / 16° (pelikamera katsoi lattiaan).
- PT: 01:n puuttuva rakennusvarjo = auringon suunta (yksi aurinko koko juoksussa) → EI muutosta.

## AVOIN: 07 vallihauta (havainne 58/132/174, peli 85/116/148)
- Proto-haara linssiseppa2/varjo2-216 kärki 4696919fb (sis. 0fc3617ba QA `valo savy avoheijastus r g b`, oletus ennallaan;
  EI NS:llä – tarpeen vain, jos heijastuksen sävy otetaan käyttöön).
- **QA-SUDENKUOPPA**: jokainen `ui juoksupeli valo <x>` paitsi `savy` ajaa KaytaValo → PeliValo → _JuoksuAvoVesi ja
  _JuoksuAvoHeijastus palaavat oletuksiin. Aseta `vesitila` ENNEN `savy`-rivejä (vesi07d/e:n d3/e0/e1 olivat tämän takia virheellisiä).
- vesi07f (lokit/esikatselu-20261101-193625, oikea järjestys, maski c0:sta): musta vesi (vain syvä, 0) 0/0/0 → usva ja
  jälkikäsittely eivät lisää väriä; heijastus yksin (syvä 0, w ≈ 0) 16/25/43; syvä 0/0,5/1 yksin 103/250/255;
  normaali + kirkas 124/238/255. Punainen nousee, vaikka syvän R = 0 → **jälkikäsittelyn sävykäyrä/kylläisyys (JuoksuV4Maailma.Jalki.cs,
  JUOKSU-jälki) siirtää kirkasta sinistä punaiseen**. Tavoite R/B 0,33 (nyt 0,49–0,57).
- Seuraavaksi: lue Jalki.cs (tonemap/kylläisyys/lift), koe syvä 0/0,12/0,22 ja 0/0,10/0,20 w 0,05 (vesitila ennen savya) + jälki
  pois/päällä -pari, jos QA:lla saa; korjaus ValoKohteet.JuoksuAvoVesi (tai jälkikäsittelyn sininen) → koonti KK:lle + PT.
- Mittaus: maski b > r+45 ja b > g+15 alempi 2/3 c0-kuvasta (lokit/esikatselu-20261101-183832/v07-c0.png), mediaani.
  Skriptit: `_tyo/linssiseppa2/skriptit-20261031/vesi07f-skenaario.txt` (pohja), varjosuhde.py, et-koonti.py.

## Worktreet
- wt/proto-linssiseppa2-varjo216 (linssiseppa2/varjo2-216 4696919fb) ja wt/proto-linssiseppa2-taytto216 (linssiseppa2/k01-216
  1698af586, viety). Taytto216 voi poistaa (git worktree remove), kun ei tarvita.
