# Codex → päätoimittaja: Tripo-hahmojen paikallinen tarkistuspaketti 19.10.2026

**Tila: paikalliset tiedostot ja esikatselut toimitettu tarkistettaviksi. Ei pelintegraatiota, julkaisua eikä omistajan lopullista hyväksyntää.**

Omistajan suora toimeksianto 18.10. klo 19.52 ja myöhemmät lisäluvat määräävät tämän toimituksen. Laatu on ensisijainen, alkuperäiset generointimäärien rajat on nimenomaisesti vapautettu. Viimeisin priorisointi: Puyi ja hänen liikkeensä tärkeimmät; muut hahmot riittävät aluksi yksinkertaisina. Uusia ohjelmia tai käyttöoikeuksia ei asennettu/muutettu, ostoja ei tehty. Pelikoodia ja muita haaroja ei muutettu.

## Toimituskansio

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019`

Jokaisen hahmon kansiossa `checkpoint.json`, `qa.json`, `qa.md`, `kuva-arkki.png` ja alla luetellut GLB:t. GLB:t pysyvät paikallisina eivätkä kuulu git-toimitukseen.

| Hahmo | Valittu | Kolmiot | Tekstuuri | Liikkeet | Tripo-krediitit |
|---|---|---:|---:|---|---:|
| Puyi | ehdokas 4, lähteet v2 | 39 999 | ≤2048 px | 9 perusliikettä | 435 |
| Vartija | ehdokas 4, lähteet v2 | 40 000 | ≤2048 px | samat 9 perusliikettä | 285 |
| Nainen | ehdokas 2, lähteet v2 | 40 000 | ≤2048 px | seisonta, kävely | 75 |
| Pulu | ehdokas 2, hoikemmat lähteet v3 | 30 000 | ≤2048 px | staattinen ensiversio | 90 |

**Yhteensä 885 Tripo-krediittiä**, saldo 24 895 → 24 010. Hylätyt kokeilut sisältyvät lukuihin. Lähdekuvia generoitiin 33; nämä eivät ole Tripo-krediittejä.

## Puyi ja vartija

Ehdokkaat 1–3 jäivät jälkeen käsien/sormien erottumisessa tai juoksun kaapu–jalka-välyksessä. Valitut 200k-masterit retopologisoitiin mobiiliversioiksi. Tripo Mixamo -rigissä on 65 luuta, lisäksi 48 maltillista kaavun/letin apuluuta. Enintään neljä luupainoa verteksiä kohti. Korkeudet 1,35 m ja 1,75 m.

Perusliikkeet: `idle`, `run`, `sprint`, `jump`, `slide`, `stumble`, `throw`, `catch`, `balance`. Liikkeet ovat in-place. Juoksun kaapu ja jalat erottuvat tarkastetuissa ruuduissa. Jokaisesta liikkeestä tarkastettiin kuusi ruutua edestä ja kuusi sivulta.

- `sprint` on laadultaan paras kirjaston juoksu nopeutettuna noin 1,3-kertaiseksi. Uusi 20 krediitin AI-spurtti hylättiin kumaran/epätasaisen ylävartalon ja käsien liikkeen vuoksi.
- `jump` on kirjastosarjasta erotettu yksi kokonainen hyppy.
- `slide` on AI-kyykkyliuku, jonka lattiaetäisyys korjattiin; **ei jalat edellä tehtävä liuku**.
- `throw` on juoksuun yhdistetty heittävän käden liike. Esikatselun omena on erillinen havainnollistava 3D-esine eikä sisälly hahmo-GLB:hen.
- `catch` on kahden käden pallonkiinniotto pienellä hypyllä.
- `balance` on juoksuun sovitettu ylävartalon tasapainoiluele. Kapean palkin jalkakohdistus ei ole valmis.
- Kaavun ja letin liike on apuluissa leivottu, ei reaaliaikainen kangas-/törmäyssimulaatio.
- Puyin housuissa/kengissä näkyy läheltä pieniä keltaisia tekstuurijälkiä.
- Jalkojen lattian läpäisy korjattiin lähdeanimaatioista. Etenemisnopeus, askelkontaktit, liikesiirtymät, törmäykset ja laitesuorituskyky tulee hyväksyä vasta pelissä. Suuntaa-antava askelnopeus Puyi run 2,74 m/s ja sprint 3,70 m/s; vartija 3,67/4,94 m/s.

## Spurttiviitta ja lisäliikkeet

Omistaja hylkäsi aiemman punaisen/proseduraalisen viitan. Se ja sen esikatselut on merkitty hylätyiksi eikä niitä saa ottaa peliin. Uudet havainnekuvat tehtiin omistajan pyynnöstä: viitta on kaavun kanssa samaa kultaista kangasta. Kolmesta erillisestä etu-/sivu-/takakuvasta luotiin uusi Tripo-malli `6bb41d71-6d55-4262-acf5-970575657751`. Liitohavainne on kuvitus, ei peliruutu.

Uusi staattinen viittaversio: `puyi/puyi-viitta-model.glb` (39 999 kolmiota, 2K, 1,35 m). Tripon automaattirigi sitoi viittaa jalkoihin. Siksi staattinen malli ositeltiin Tripossa erillisenä kopiona `2f2c20d9-a43b-4c4f-9f33-780bda1bf8ca`; koko viitta löytyi osaksi 0. Osittelun geometria kohdistettiin alkuperäiseen alle 0,1 mm virheellä raakamittakaavassa. Alkuperäinen yhteinen tekstuuriatlas säilytettiin, joten 15 osan erilliset materiaalit eivät moninkertaista tekstuuribudjettia.

Animoitu viittaversio: `puyi/puyi-viitta-rig-animations.glb`. 65 humanoidiluuta + 49 viitan apuluuta, enintään 4 painoa/verteksi. Viitta ei enää seuraa polvia. Viitan liike on paikallisesti leivottu tuuliliike, ei reaaliaikainen kangassimulaatio. Mukana `run`, `idle`, `sprint_cape`, `glide_enter`, `glide_loop`, `glide_left`, `glide_right`, `glide_exit` sekä `hop_sequence` (toistuva lähdehyppysarja). `jump_down` jätettiin pois alastulon jatkosovitukseen.

Lyhyen liidon tarkoitus: katolta ponnistava keisari voi ylittää alhaalla väijyvän vartijan ja jatkaa juoksua. Liidon hahmoasennot on tehty paikallisesti. Lentorata, käyttöehdot, matka, korkeus, esteet ja vartijan osumalaatikot ovat pelin toteutusta, jota ei muutettu. Ohje: `puyi/viitta-liito-ohje.md`.

Uuden mallin viitta on tässä GLB:ssä jatkuvasti näkyvissä. Viitan ilmestyminen/katoaminen ja perusmallin sekä viittaversion saumaton vaihto eivät ole valmiita pelitoimintoja. Kaikki aiemman perusmallin 9 liikettä eivät automaattisesti siirry tähän uuteen rigiversioon. Uudet lähteet muuttavat hiukan kasvojen/koristeiden yksityiskohtia; mallivaihdon jatkuvuus on hyväksyttävä erikseen.

### Viitan tarkistukset ja rajat — luonnollisempi juoksu, v7

Omistajan lisäpyyntö 18.10.2026: viitasta luonnollisemmin hulmuava juostessa. Valittu paikallinen v7 korvaa aiemman v4:n. Aiempi toimitus on säilytetty kansiossa `cape-tripo-01/delivery-v4/`; Tripo-lähteet ja v4-tiedostot ovat tallessa.

## Muutos

- Hartiat on kiinnitetty hahmon liikkeeseen, mutta muu viitta reagoi painovoimaan, liikkuvan vartalon suojamuotoihin ja vaihtelevaan ilmavirtaan erillisessä kangaslaskennassa.
- Helma seuraa askelten liikettä viiveellä ja aaltoilee myös sivusuunnassa. Juoksu ja spurtti sisältävät kaksi askelsykliä; silmukka tasoitettiin toistuvaksi ilman selvää saumanykäystä.
- Alaosan syvimpiä syvyyssuuntaisia laskoksia loivennettiin, jotta viitta ei näyttäisi paksulta jäykältä levyltä. Hartiakiinnitys, tekstuuri, UV-kartta ja kolmioiden määrä säilyvät.
- Liike on leivottu olemassa oleviin 49 viitan apuluuhun. Uutta reaaliaikaista kangasjärjestelmää ei tarvita tämän animaation toistamiseen.

## Tiedostot ja tarkistus

`puyi-viitta-model.glb` ja `puyi-viitta-rig-animations.glb`: 39 999 kolmiota, 1,35 m, tekstuurit enintään 2048 px, animoidussa 114 luuta ja enintään 4 painoa/verteksi. Staattinen ja animoitu malli käyttävät samaa kevennettyä viittageometriaa.

Yhdeksän klippiä: `idle`, `run`, `sprint_cape`, `hop_sequence`, `glide_enter`, `glide_loop`, `glide_left`, `glide_right`, `glide_exit`. V6 muuttaa juoksua, spurttia ja näihin liittyviä viitan siirtymiä; muut vartalon liikkeet säilyvät. Perusmallin alkuperäiset yhdeksän peliliikettä ovat edelleen erillisessä `puyi-rig-animations.glb`-tiedostossa.

Tarkistus: run/sprint takaa yläviistosta ja sivulta, liito ja siirtymät, tekstuurikoko, kolmio- ja luumäärät, enintään neljä normalisoitua luupainoa, äärelliset GLB-luvut ja silmukan rajakohdat. Uusi esikatselu: `previews/kultaviitta-luonnollinen-juoksu-takaa.mp4`. Vanha/uusi samalla kameralla ja juoksuvaiheella: `previews/kultaviitta-vertailu-vanha-uusi.mp4`.

## Rajat

Tämä on esilaskettu kangasliike. Se ei reagoi pelin vaihtuviin tuuliin, nopeuksiin tai esteisiin. Viitta on mallissa jatkuvasti näkyvissä; ilmestyminen/katoaminen, perusmallin vaihto, liidon lentorata, vartijan ylitys ja alastulon kontaktit ovat edelleen pelityötä. Uudella variantilla ei ole erillistä letin lisäheiluntaa. Omistajan visuaalinen hyväksyntä ja laitetesti ovat erilliset vaiheet.

Tähän paikalliseen korjaukseen ei kulunut Tripo-krediittejä. Viittatyö yhteensä 110, Puyin kaikki kokeet 435 ja koko toimeksianto 885 Tripo-krediittiä. Ei ostoja, asennuksia, käyttöoikeusmuutoksia tai pelikoodin muutoksia.


### Lisäliikkeiden arvio

Tripon kirjastosta viety `climb`, `jump_down` ja `run_upstairs` tiedostoon `puyi/parkour-library/puyi-parkour-candidates.glb` (1,35 m, 2K). Nämä ovat erillisiä lähde-ehdokkaita, eivät osa valittua yhdeksän perusliikkeen pakettia.

- `climb`: etenevä korkea nousu/ponnistus. Vertikaalinen juuriliike säilyy in-place-viennissä, ja hahmo nousee pois paikallaan olevan kameran rajauksesta. Ei sellaisenaan tankoon tarttuminen.
- `jump_down`: korkea pudotus ja syvä kyykkyalastulo. Kyykyssä kädet ja kaapu joutuvat hyvin lähelle polvia; tarvitsee korkeuden, kontaktien ja vaatteen korjauksen ennen hyväksyntää.
- `run_upstairs`: portaiden askelsarja; askelkontakti on kohdistettava todellisiin portaisiin. Tasaisen lattian renderi ei ole porraskäytön hyväksyntä.

Näihin kolmeen kirjastosovitukseen ei kulunut lisää Tripo-krediittejä. Uusi tankoliike ja lyhyt viittaliito ovat omia myöhempiä animaatioita, joita nämä eivät korvaa.


## Jo hankitut työkalut ja jatkoliikkeet

Todellinen Unity-projekti tarkastettiin vain lukemalla: `/Users/Shared/Claude/proto-3d/Matkakirja-proto`. **Final IK 2.5 on jo ostettu 5.10.2026 ja asennettu**, ja sitä käytetään `DioraamaHahmot3D.IK.cs`:ssä (FullBodyBipedIK + GrounderFBBIK). Lähde: `Assets/Plugins/RootMotion/LAHTEET.md`. Tämä ei tarkoita, että Puyin tankoon tarttuminen olisi jo toteutettu.

Erillistä tuotua parkour-liikepakettia ei löytynyt projektista. Omistajan Asset Store -ostohistoriaa ei tarkastettu, joten ostamatonta ei voi päätellä tästä. Uuden IK-lisäosan ostoa ei tarvita ensimmäiseen kokeeseen.

Tankoliike tarvitsee lähestymisen, ponnistuksen, käsikontaktin, heilautuksen, irrotuksen, esteen ylityksen ja alastulon. Lopullinen liike sovitetaan todellisen tangon korkeuteen ja paikkaan. Final IK pitää kämmenet kontaktipisteissä; pelin liikkumislogiikan täytyy ajoittaa kiinnitys/irrotus, siirtymä ja törmäykset. Hahmoanimaatio yksin ei tee tätä.

Suositeltu seuraava laajennus: lyhyt/pitkä liuku, vasen/oikea sivuväistö, hallittu syöksy, pieni/pitkä loikka, matalan/korkean esteen ylitys, pehmeä/raskas alastulo ja tangon liikesarja. Nämä ovat **työlista**, eivät valmiina toimitettujen klippien luettelo. Vaihtelu valitaan esteen, nopeuden ja askelvaiheen mukaan; vasemmalla/oikealla jalalla alkavat versiot vähentävät äkillisiä siirtymiä.

Mahdolliset liikelähteet: [Adobe Mixamo](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) (maksuton Adobe ID:llä, pelikäyttö sallittu), [Reallusionin parkour-liikkeet](https://www.reallusion.com/press/2302-3_RLnews/default.html), [Threepeat Parkour Animation Set Volume 2](https://assetstore.unity.com/packages/3d/animations/parkour-animation-set-volume-2-273012). Ulkoisia paketteja ei ostettu tai tuotu.

## Louvre

Nainen tehtiin uudelleen lisäluvan sallimista lähdekuvista, koska pelkkä alkuperäisen verkon hiuskorjaus ei antanut hyvää lähtökohtaa. Kasvot näkyvät sivulta; seisonta/kävely tarkistettiin. Tämä on uusi ehdokas, ei kaikilta muilta osin ennallaan pidetty alkuperäinen malli. Korkeusolettama 1,70 m.

Pulu tehtiin omistajan pyynnöstä hoikemmaksi ja ryhdikkäämmäksi. Niska ja pyrstö ovat siistimmät kuin hylätyissä paikallisissa korjauksissa. Toimitetaan priorisoinnin mukaisesti staattinen malli (korkeusolettama 0,30 m). Silmien iiris on edelleen oranssinruskea ja sivulta ulkoneva: **kirkkaan oranssi piirrosvastaavuus ja lopullinen ilme jäävät avoimiksi**. Linturigitystä ja lentoliikkeitä ei tehty; tuen puuttumista ei ole osoitettu.

## Tiedostot ja SHA-256

- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/puyi/puyi-model.glb` — `caea0bb8f93f6430ae240c7a65b47052894f9bc37dda9ce7f19143f4f97542f1`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/puyi/puyi-rig-animations.glb` — `7d4f374f2d92bcdcba5c3fd1f012541f10154cc9fd018c2f16cf6a137c748418`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/puyi/puyi-viitta-model.glb` — `eb315fc7a7116e0cddf6ed70cc73029b16465581cdc948d793eee8853b3396bf`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/puyi/puyi-viitta-rig-animations.glb` — `0039c57b9977c7ee41083cb655887c31da76eb347e6e78f297d1cbf1d185b0f5`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/vartija/vartija-model.glb` — `512cf33d2e3c58b2f472475f47b56e9569ba32adbd1dcb075df14ab36ef2633e`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/vartija/vartija-rig-animations.glb` — `00a6d5df744907c4b317ee86e63801f12052e3ff0331f7415712440e9be8c638`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/nainen/nainen-model.glb` — `d9b3ba08c46d05b411fd38333a302dd06b371ee51293a1c2b4bcd2de15032b06`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/nainen/nainen-rig-animations.glb` — `0ac00eb94afe89885b321610cc66ffc7a22a187f5898d387f411e7ff7105a3df`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/nainen/original-master-8k.glb` — `c6a885554211f915e279bbc108a3591854c381d68acfe652129e28b8d3aca3d2`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/nainen/original-retopo-40k-2k.glb` — `dfe42e59e8c5b7a64f135bf0abffdf61eab29b28730d3c78638c1bdbab8612eb`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/nainen/segmented-master-8k.glb` — `792d1b42c4af7a15b0654529c934e7141abd76c430f9f4f0978a9e5603c91449`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/pulu/original-master-8k.glb` — `797caadbea6587a1a3454581885482f35d0cffb6a637efd4bca95189c96f0258`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/pulu/pulu-model.glb` — `6661fa27984c84037d51cf5985c8de3baaf1f304cafc8d10063a3cbd61261c03`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/pulu/repaired-v1.glb` — `4da5629bda506f0d27f60d0491fa555a570ef38c5ad15cfc98fe96d1a9b71434`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/pulu/repaired-v2.glb` — `657f05422d7def94b5e0b1986cebe08d3c4bf412a277feebd2fb8e4f4e0348f2`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/pulu/repaired-v3.glb` — `454424841f737b7c4ba289c224c61c622163882b6c269d206cafd77a5b4fbd52`
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/pulu/retopo-10kquad-2k.glb` — `2bd07bc962fa45ec0d307deeb38ee27439a53af1c3ece0183afa1a54d25e91a6`

## Esikatselut ja vastaanottajan tarkistus

- Puyi, run/hyppy/liuku/tasapainoilu/omenan heitto takaa yläviistosta: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/puyi/previews/puyi-liikkeet-takaa.mp4`. Omistaja vahvisti 18.10., että tämä esikatselu näkyy. Tämä on näyttämisen vahvistus, ei kaikkien liikkeiden lopullinen hyväksyntä.
- Vartijan juoksu: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/vartija/previews/juoksu-takaa.mp4`.
- Kuva-arkit postilaatikossa: `posti/tripo-hahmot-20261019/{puyi,vartija,nainen,pulu}.png`. Puluarkin kolme alaruutua ovat nimettyjä staattisia yksityiskohtia, eivät animaatiota.
- Uusin luonnollisempi juoksu ja spurtti (v7): `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/puyi/previews/kultaviitta-luonnollinen-juoksu-takaa.mp4`.
- Vanha/uusi-vertailu samalla kameralla: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-hahmot-20261019/puyi/previews/kultaviitta-vertailu-vanha-uusi.mp4`. Nämä ovat hahmoesikatseluja, eivät pelitestejä.

Claude-roolit voivat ottaa paketit tarkistukseen 19.10. omistajan linjauksen mukaan. Vastaanottajan tulee tarkistaa GLB-hashit, mittakaava, in-place-/root motion -valinta, humanoid + apuluut, liikesiirtymät, kontaktit ja mobiilibudjetti. Hahmojen tuontia peliin ei tehty tässä työssä.
