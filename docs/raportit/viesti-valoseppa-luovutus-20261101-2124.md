# Valosepän luovutus 1.11.2026 klo 21.24

Syy: konteksti 26 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1945.md.
PYSYVÄT TYÖTAVAT: pitkä Unity-ajo nohupilla + Monitor-vahti (valmis + kuolema; vahdin pgrep-kuvio `ajo[.]zsh`, ettei `pkill -f`
tapa vahtia); ajot väistävät NS:n käännöstä ja varattuja simuja (mallit `_tyo/linssiseppa2/skriptit-20261031/*-ajo.zsh`).
Havainne-editori AINA `ESIKOM="ui juoksupeli valo vertailu 0" REF=<sha> RUNKO=natiiviseppa/juna-216 ESIKATSELU_LAATU=Ultra`
(ilman REF:iä oletus juna-211 = puuttuva Unity b6 → VIKA editori). Jokainen valmis valokoonti: polku + rivi SUORAAN KK:lle
send_messagella, kopio PT:lle. Ajon jälkeen `grep "Shader error" unity.log`. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`.

## TEHTY JA RUNGOSSA 216 (NS 6ad4b8b6b)
- **5677e3b79** (linssiseppa2/vesi07-216): 07 vallihauta punertavan harmaasta siniseksi. SYY: jälkikäsittelyn k15 (sinisen
  kylläisyys × 0,45, sävy 0,56–0,62) osui haudan sävyyn. Korjaus: k15-kaista päättyy .58/.62 (oli .62/.67) + avovesi 0/0,13/0,24;
  07 85/116/148 → 69/128/184 (havainne 58/132/174). QA `valo k15 1 k a ta tl l` (57f81aadc). PT kuittasi, NS testit vihreät.

## SEURAAJAN ENSIMMÄINEN TYÖ (PT 1.11. 21.3x)
- 07 ilmakuvan kiven valotus: peli 219/212/207 vs havainne 188/177/175, säätö VAIN ilmakuvaan rajattuna (lähinäkymien kivi täsmää).
  Lähtötiedot alla kohdassa AVOIN. Koonti KK:lle + kopio PT:lle, sitten kuittauspyyntö → NS.

## KUITATTU PT 21.3x → NS (ei vielä varmistettu rungosta)
- **5c8529d25** (linssiseppa2/ilma07-216, 5677e3b79:n päällä): 07 ilmakuvan puut tummemmiksi. Puut = korttipuut (JuoksuMaailma);
  uusi `_JuoksuPuukorttiSavy` (QA `valo savy puukortti r g b [kyll]`, 07b184df2) + `_Puukortti`-materiaalimerkintä kaikille
  V4_puukortti*-pinnoille (ulkorengas ei saa JUOKSU_KORTTI-avainsanaa, 1d1b93beb) + oletus 0,6/0,68/0,7 kyll 0,4.
  Puut 107/131/10 → 111/134/90 (havainne 72/95/66–88/118/78); 01–05 muutos 1,2–1,7 % px (kaukaiset korttipuut).
  Koonti lokit/havainne-editori-20261101-211745/ilma07-koonti.jpg (ennen | jälkeen | havainne) → KK + PT lähetetty 21.2x.

## AVOIN (PT 21.0x: 07 ilmakuva)
- Kivi/maa 07:ssä 219/212/207 vs havainne 188/177/175. Jälkikäsittely pois → 178/177/181 → syy JUOKSU-profiilin valotus
  (k17 ev +0,45). `k17 1 0.25` → 203, mutta tummentaa kaikki näkymät (lähinäkymien kivi täsmää nyt havainteeseen) → tarvitaan
  ilmakuvaan rajattu säätö (esim. kameran korkeuden painolla kuten JuoksuKaukopuut.Paino / _JuoksuIlmakuvaUsva). Usva 0,
  laattakiilto pois ja savy laatta/kivi vaikuttivat vain 0–4 yksikköä.
- Muut 07-erot: etukulmien kirkkaanvihreä nurmi (maa, ei puita), taivas valkoinen (kamera, ks. JONO 17.40), havainteen
  vallihauta näkyy leveämpänä edessä.
- Mittarit: scratchpadin ilma.py on kopioitu `_tyo/linssiseppa2/skriptit-20261031/ilma07-mittari.py` (puut/kivi/kate/vesi
  alempi 2/3), vesimaski.py (vallihauta, maski c0:sta), k15-koonti.py.

## Worktreet
- wt/proto-linssiseppa2-varjo216: nyt haarassa linssiseppa2/ilma07-216 (5c8529d25). Vanha varjo2-216 4696919fb säilyy haarana.
- wt/proto-linssiseppa2-k17 jää (3 committia ei rungossa: d1415715d räystäskartta, b1fead5dc, 7e7554663). taytto216 poistettu.
