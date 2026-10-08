# PR-katsaus 9.10.2026 (Laitetestaaja, vain luku)

Tilaus: Päätoimittaja, 9.10. Mikään PR:ää ei suljettu, mergetty eikä kommentoitu. Avoimia PR:jä on **9** (8.10. katsauksessa 68; Päätoimittaja ja Julkaisija mergesivät/sulkivat välissä mm. kaikki Codexin miniatyyri-PR:t (#4184-koonti), siivous-PR:t, #3993, #4070, #4035).

Menetelmä kuten 8.10.: PR:n pää haettu (`refs/pull/N/head`), diffi koeajettu tuoreeseen `origin/main`iin (bdfb9c079): `git apply --check` (menisikö päälle) ja `-R` (onko jo mainissa); CI `gh pr view`. Ei simulaattoria eikä testiajoja.

## Yhteenveto
- **Mikään ei ole jo mainissa toista reittiä.** Kaikki 9 menevät puhtaasti päälle (ei konflikteja).
- **Mergettävissä nyt (päätöksellä):** #4182, #4228, #4242. **Odottaa ehtoa:** #4243 (CI kesken), #4238 (draft + vientipaketti). **Vanhentuneet/epäselvät, päätös tarvitaan:** #3105, #3108, #3969, #4006.

## PR:t
| PR | Ikä | Tila | Arvio | Perustelu |
|---|---|---|---|---|
| #3105 `karttaseppa-nimiofontti` | 14 vrk | CI vihreä, puhdas, 998 commitia jäljessä | **Sulje (vanhentunut)** | Liberation Serif -fontit webin/nimiötason polttoon (löydös 38, 24.9.); `tools/fokuskartta/fontit` ei mainissa, mutta web on jäädytetty 3.10. ja nimet ovat natiivissa eläviä (vaihtoehto b) → polttotyökalun pysäytys ei enää ajankohtainen. Karttaseppä vahvistaa. |
| #3108 `karttaseppa-satelliitti` | 14 vrk | CI vihreä, puhdas, 1034 jäljessä | **Päätettävä (Karttaseppä/PT)** | Satelliittisarja natiivin lentotilaan (`tools/tee-satelliitti.mjs`, 72 kaupunkia, 1960 riviä): ei mainissa eikä korvaajaa; kuuluu "LENNON PINTA" -korttiin. Jos lentotilan satelliittipinta ei ole suunnitelmissa → sulje, muuten mergeä erikseen ajettavaksi työkaluksi. |
| #3969 `codex/varuste-linna` | 4 vrk | DRAFT, CI vihreä, ei kommentteja | **Päätettävä (Sisältökirjuri/PT)** | Yksi tiedosto (`assets/varusteet/varuste-poikkileikkaus.jpg`, 91 kt): Muurien sisällä -linssin varustekuvake puuttuu mainista; linssi on olemassa (linssikatalogi). Merge kun kuva hyväksytty (draft). |
| #4006 `linnanrakentaja-kadet` | 3 vrk | CI vihreä, puhdas | **Mergettävä kun Siirtoseppä kuittaa** | Olavinlinna Final IK -data (`hahmo.kadet`, `vuoro.osoita`), sijoituskonvertteri (`kadet` ei ole mainin `sijoitus.mjs`:ssä); koskee `fatabuuri.js`:ää → ajettava `git merge-tree` ajantasaisella mainilla ennen mergeä (M-osa kehittyy nopeasti). |
| #4182 `pelikoodari-kustannus` | 0 vrk | CI vihreä, mergeable | **Mergettävä (PT:n tilaus)** | Kustannussuunnitelma 8.10.: vain docs (raportti + 2 muuta tiedostoa), omistajan selkokielinen osio alussa; arvo arkistona/päätöspohjana. |
| #4228 `karttaseppa-ehdot-leikkaus` | 0 vrk | ei CI-ajoja (docs), puhdas | **Mergettävä** | Ehtoraportti: kohteen leikkaus Googlen 3D-laatoista ja korvaus omalla mallilla (omistajan päätös: kyllä ehdoin). Vain dokumentti. |
| #4238 `pelikoodari-esittely-30-aanet` | 0 vrk | DRAFT, CI vihreä | **Odottaa — älä mergeä vielä** | 30 kaupungin esittelyt kertojan äänin (`esittely_polut` v3 → v2). PR itse: "ÄLÄ MERGEÄ ennen kuin vientipaketti `esittely-30-aanet-vienti-20261012` on ämpärissä 200" (Pelikoodari ilmoittaa). Vastausmuoto ennallaan → vanhat appit toimivat. |
| #4242 `karttaseppa-tyokalut2` | 0 vrk | CI vihreä, mergeable | **Mergettävä** | Vesipinta-työkalut 2 (#4227:n mergen jälkeiset muutokset): geoidi (Tukholma SWEN17/RH2000), kanavakorjaus (LS1:n Pariisin löydös), OSM-pohjapiirrokset 37 kaupunkia / 295 kohdetta; vain työkalut (3 tiedostoa, +269). |
| #4243 `fable-raamattu-20261009` | 0 vrk | CI kesken (`reitti` OK, `testit` IN_PROGRESS), mergeable | **Mergettävä kun CI vihreä** | Raamatun omistajan 8.–9.10. linjaukset (ämpäri ei ole jakelua, T7/NAS, kehityskaupungit …); vain `js/tyohuone-raamattu.js` (+60/−13), päätöshistoria lokissa #4241. |

## Suositeltu järjestys
1. Sulje #3105 (Karttaseppä kuittaa); päätä #3108 ja #3969.
2. Merge: #4228 (docs), #4182 (docs), #4242 (työkalut), sitten #4243 kun `testit` vihreä.
3. #4006 vasta Siirtosepän kuittauksen + `merge-tree`-tarkistuksen jälkeen; #4238 vasta kun vientipaketti on ämpärissä.

## Ei toimia minulta
Ei sulkemisia, mergejä, kommentteja eikä rebaseja. `refs/remotes/pr/*` haettu tähän checkoutiin vain lukua varten.
