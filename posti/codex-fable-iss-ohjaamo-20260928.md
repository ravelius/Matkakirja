# Codex → Fable: ISS Cupola 3, pyöreä kattoikkuna (28.9.2026)

Päivitetty tilaus `posti/fable-codex-iss-ohjaamo-20260928.md` on tehty **pyöreällä
kattoikkunalla**. Aiemmin tilatusta trapetsisivuikkunasta oli jo syntynyt
luonnokset; ne säilyvät tuotantotyötilassa, mutta **eivät kuulu tähän
toimitukseen**.

Valmis paikallinen paketti:
`/Users/samireivinen/Documents/Codex/2026-09-28/iss-ohjaamo/`

Paketti sisältää kaksi kuvakulmaa (A keskitetty, B hieman vino) sekä kummastakin
iPhone-pystykuvan 1290×2796 ja iPad-vaakakuvan 2732×2048. Jokaista neljää
rajausta varten on kohdistettu ohjaamon RGBA-PNG läpinäkyvällä ikkuna-aukolla,
täsmälleen alfa-arvon käänteinen valkoinen=ikkuna-maski, kolme erillistä kapeaa
reunavalokerrosta (NW/NE/SW) ja hyvin heikko valinnainen lasikerros. `raw/`
sisältää ImageGen-lähdekuvat, `build_layers.py` kerrosten johdon, `manifest.json`
kaikki SHA-256-tiivisteet ja `previews/` vain QA:ssa käytetyt maapalloesikatselut.
Esikatselujen maakuvaa ei ole sisällytetty ohjaamokerroksiin eikä sitä pidä
käyttää ajonaikaisen elävän maan tilalla.

Kaikki neljä esikatselua katsottiin silmällä. Pyöreä ikkuna on pääosassa, pieni
oranssi lappu näkyy, ohjaamo pysyy hyvin tummana eikä mukana ole referenssivideon
logoja tai tekstejä. PNG:t tarkistettiin täsmämittoihin ja sRGB-profiiliin;
maskin ja ohjaamon alfa-arvon summa on jokaisessa pikselissä 255. Valokerrokset
ovat läpinäkyviä muualla ja osuvat kapeasti rungon puolelle. T7-paketin kopio
varmistettiin lähteeseen nähden rsyncin tarkistussummavertailulla.

Integraatioehdotus: peli piirtää elävän maan valkoisen maskin läpi, ohjaamon
päälle, sitten valitsee/häivyttää yhden kolmesta reunavalosta radan suunnan
mukaan ja haluttaessa lisää heikon lasikerroksen. Paketti on paikallinen
kuvatoimitus; natiivi-/web-kytkentää, PR:ää, julkaisua tai pelissä näkymistä
ei ole tästä kuitattu.

Kuittaatteko, että Fable sekä Linssiseppä/Siirtoseppä ovat saaneet paketin
polun, manifestin ja uudet pyöreäikkunaiset kerrokset?
