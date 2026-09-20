# Opus → Fable: astrolinssin väkäsnappi ja inforuudun leveys

20.9.2026 klo 14.20. Haara `opus-local-astro-vakaset` (pohja
origin/v1973-prep, 4f10bb8a). Ei versionostoa, ei PR:ää.

## 1. Mikä se väkäsnappi on — ja onko sillä tehtävää

Se on **karttaselitteiden avaaja**: `.karttaselite-nappi`, title
*"Karttaselitteet"*, tausta `rgba(239, 220, 180, 0.9)` (sama kerma kuin
omistajan kuvassa), paikka iPadilla x 967 / y 74 eli täsmälleen ✕:n
alla. Kolme väkästä on kerrosikoni. **Pakollista tehtävää sillä ei
avaruudessa ole:** se selittää LAUDAN karttamerkit, joita astronautin
kamerassa ei ole ruudulla yhtäkään. Sama nappi on jo ennestään
piilotettu Keksinnöt-linssin ajaksi (`body.aikajana-paalla
.karttaselite`, omistaja 3.9.2026) samasta syystä, joten korjaus on
yhden valitsimen lisäys samaan sääntöön: `body.linssi-satelliitti
.karttaselite`. Luokan lisää ja poistaa js/ui.js, joten nappi palaa
linssin jälkeen itsestään.

## 2. Pienennetty inforuutu venyi koko ruudun levyiseksi

Mitattu syy: avatulla laatikolla oli katto `min(46%, 560px)`, mutta
kelatulla vain `calc(100% − … − nappi − 14px)` eli käytännössä ruudun
leveys miinus ✕. Kapealla ruudulla ero ei näy, koska siellä avattukin
on lähes ruudun levyinen.

| ruutu | kelattu ENNEN | kelattu NYT | avattu NYT | osuus ruudusta |
|---|---|---|---|---|
| 390 | 314 | 314 | 312 | — (kapean ruudun oma sääntö) |
| 1024 | **952** | **471** | 471 | 46 % |
| 1400 | **1328** | **560** | 560 | 40 % |

Korjaus on katto, ei kiinteä leveys: kelattu laatikko kutistuu yhä
sisältönsä kokoiseksi (aiempi linjaus 16.9.2026), mutta ei voi enää
kasvaa avattua leveämmäksi. Pitkällä nimellä molemmat osuvat samaan
kattoon, ja leveydet ovat samat. Kapea ruutu (≤ 620 px) jätettiin
ennalleen.

**Klo 12.08 lisäys (enintään ~60 % leveillä näytöillä): ei vaatinut
muutosta.** Kohdan 2 korjauksen jälkeen avattu on 46 % (iPad) ja 40 %
(työpöytä), eli jo valmiiksi kattoa kapeampi — en kaventanut sitä
lisää arvaamalla, vaan lisäsin mitan, joka pitää katon. Jos omistaja
haluaa sen oikeasti kapeammaksi kuin 46 %, se on yksi luku (`46%`
→ esim. `40%`) ja kerro mikä.

## Savuke

Uusi `tools/savukkeet/savuke-astro-vakaset.mjs`, **32/32 läpi**
leveyksillä 390 / 1024 / 1400. Mitat: karttaselite näkyy kartalla
(vastakoe), ei näy linssin aikana, palaa linssin jälkeen; avattu ja
kelattu inforuutu ovat samalla leveydellä, kumpikin enintään 60 %
ruudusta, eikä kelattu ole avattua leveämpi. Kaappaukset
`docs/raportit/kaappaukset/astro-vakaset-20260920/`.

Matkalla korjasin oman mittani: ensimmäinen versio luki "avatun"
leveyden hetkellä, jolloin laatikko oli jo kelautunut itsestään
(vinkkiavaus), eli vertasi mittaa itseensä — 952 vs 952. Nyt savuke
avaa laatikon ennen mittausta ja vaatii erikseen, että mitattu laatikko
oli oikeasti auki.

`node --test` 3 750 testiä, 0 punaista; `tarkista-savukkeet` kunnossa.

**Mitä jäi tekemättä:** en koskenut muihin linsseihin — karttaselite
piilotetaan vain satelliittilinssin ajaksi, koska vain siitä oli
havainto. Jos sama nappi on turha kaikissa pallolinsseissä, se on yhden
valitsimen muutos lisää.
