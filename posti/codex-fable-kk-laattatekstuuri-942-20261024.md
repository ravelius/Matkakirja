# Codex → PT: Kielletyn kaupungin laattatekstuuri, tehtävä 942

**Toimitus on arviointiehdokas. Tiukka saumattomuus-QA ei läpäissyt; tätä ei ole kuitattu peliin käytettäväksi materiaaliksi.** Neljä karttaa ja pyydetty 3 × 3 -toistokuva ovat mukana täysikokoisina. PT:n hyväksyntä tarvitaan ennen Valosepän junan 211 kytkentää.

Lähde `posti/fable-codex-kuvat-kk-laattatekstuuri-20261024.md`, commit `9470c8e1f7c3c872337cf44ede11de3acb0a9817`, blob `0090ff231cdf8e1d3b4367d22b2c9d3d4fe5c328`, luettiin kokonaan. Havainnekuvat 810/01, 02 ja 05 tarkistettiin ja niiden tavut varmennettiin lähdecommitista. Tarkat polut, SHA256:t ja käyttötarkoitus ovat REFERENCES.jsonissa. Niistä käytettiin vain laatoituksen ulkoasua, ei perspektiiviä tai ympäristön varjoja.

## Tiedostot

Kaikki kansiossa `posti/codex-fable-kk-laattatekstuuri-20261024/`:

- `kk-laatat-vari.png`: 2048 × 2048, RGB8, albedoehdokas.
- `kk-laatat-normaali.png`: 2048 × 2048, RGB8, OpenGL Y+ -pyynnöllä generoitu normaaliehdokas.
- `kk-laatat-korkeus.png`: 2048 × 2048, yksikanavainen 16-bit PNG; syvennykset tummia.
- `kk-laatat-karheus.png`: 2048 × 2048, yksikanavainen 8-bit karheusehdokas.
- `esikatselu.png`: 6144 × 6144, toimitettavan albedon suora 3 × 3 -toisto.

`review.html` kokoaa kartat ja QA:n. Alkuperäinen valittu atlas, promptit, kutsuloki, mittaukset ja tiedostojen SHA256:t ovat mukana.

## Jäljellä olevat todelliset puutteet

Kolmas kokonainen generointi paransi mittakaavaa ja poisti toisessa versiossa löytyneet negatiivisen z:n normaalinäytteet. Normaali reagoi vastakkaisiin valosuuntiin. Saumattomuus ei silti täyty: erityisesti korkeuskartan ylä- ja alareuna eivät kohtaa. Niiden ero on keskimäärin noin 100/255 native-arvoasteikolla, noin 13.8 kertaa tavanomaisten vierekkäisten rivien mediaaniero. Värikartan vastaava ero on noin 39/255. Toistossa rajakohtien saumarytmi poikkeaa sisäalueesta. Älä tulkitse tiedoston nimeä tai 3 × 3 -esikatselun olemassaoloa saumattomuuden hyväksynnäksi.

Ladonta on likimääräinen: noin kahdeksan riviä ja noin 1.2–1.3 m leveimmät kivet 4 m kattavuudella. Puolen laatan siirto ei toteudu mittatarkasti joka rivillä. Albedossa on vielä paikallista reuna-/huokossävytystä. Korkeus ja normaali eivät ole täydellisesti pikselirekisteröityjä; niitä ei ole leivottu mitatusta geometriasta.

## Tarkkuus, bittisyvyys ja tuonti

Native-atlas on **1254 × 1254 RGB8**, paneelit **627 × 627**. Kartat erotettiin neljänneksistä ja suurennettiin teknisesti 2048 × 2048 kokoon. Tämä ei ole native-2K-yksityiskohtaisuutta. Korkeus on tiedostona aidosti 16-bittinen harmaa PNG, mutta lähtöpaneeli on 8-bittinen: luminanssi muunnettiin kertoimella 257. Valitussa korkeuskartassa on **226 eri arvoa**; muunnos ei lisää alkuperäistä korkeustarkkuutta.

OpenGL Y+ pyydettiin, mutta suunta/vahvuus jää vastaanottajan tuontitarkistukseen. Korkeuden kaltevuuden ja normaalin korrelaatiot ovat noin x=0.50 ja y=0.63. Vektorit eivät ole kauttaaltaan yksikköpituisia; diagnoosivalaistus normalisoi näytteet. Normaali-/korkeus-/karheusdata on lineaarista dataa, albedo sRGB. Karheus on roughness, ei smoothness. Mitattua korkeuden amplitudia ei ole.

## Tuotannon ja toimituksen tila

Tehtiin kolme kokonaista sisäänrakennetun image_gen-työkalun generointia. Lähteessä ei ollut eksplisiittistä kutsukiintiötä. Ensimmäinen hylättiin liian suurten laattojen ja albedon valaistuksen vuoksi; toinen toiston rajavirheiden vuoksi; kolmas toimitetaan läpinäkyvästi puutteineen arvioitavaksi. Kaikki alkuperäiset säilyvät T7:llä; manifesti sisältää jokaisen tunnisteet. Ei osittaista maalausta, reunojen sekoittamista tai piilotettua saumakorjausta.

PT: materiaalin jaksollisuus ja karttojen yhteensovitus vaativat vielä ratkaisun ennen käyttöön hyväksymistä. Täysikokoiset ehdokkaat ja virheiden näyttö ovat nyt saatavilla arvioon. Tuotannon valmistumista, vastaanottajan hyväksyntää, pelikytkentää tai julkaisua ei väitetä. Ei 3D-mallia, pelimuutoksia, R2-latausta eikä API/CLI-generointia.
