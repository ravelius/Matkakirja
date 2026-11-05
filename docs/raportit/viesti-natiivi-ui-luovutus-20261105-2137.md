# Natiivi-UI: luovutus 5.11.2026 klo 21.37

Korvaa -2105:n. Työhaara proto-repossa: natiivi-ui/kyltit-219, kärki 49cdc5cc3, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili natiivi-backup, peili/proto/natiivi-ui/kyltit-219. Ei junaan ennen KK:n sanaa.

## Seuraavaksi: ajo 49cdc5cc3
JU:lta pyydetty 21.36, skripti _tyo/natiivi-ui/sk-pariisi-kyltit-17.txt, 8 kuvaa, lokit lokit/julkaisija-pariisi-kyltit-49cdc5cc3 (proto-3d). JU lähettää polun tälle sessiolle. Jos viesti ei tullut, katso kansio ja JU.
Katso täysikoossa ja vie KK:lle (local_231e4bad), rivi PT:lle:
1. Grand Châtelet ylhäältä ja 45° (kyltti "yla"): näkyvätkö kyltti ja kuva molemmissa. Loki: ui kohdenostot kyltti. Tarkista kyltti Tour Saint-Jacques'n ja metro-nimen kanssa.
2. Kortit viideltä (Tuileries, Bastilji, Temple, Galerie, Grand Châtelet): sama ihmekuva kaikilla. Tuileries ja Bastilji: kuva lisätty juttuun (HaeNostonOmaKuva); samalla ne tulevat selattaviksi (‹ ›, Selattava vaatii kuvan), kerro KK:lle. Muilla kolmella nostokortin ihmekuvan pitäisi olla valmiina, ei nähty kuvassa.
3. galerie-45: pyöreä merkki taivaalla poissa? Merkki oli Eiffelin oikealla puolella ylhäällä, kuva tummansininen. Kohde ei ole varma; `ui kohdenostot` -tilarivi lokissa juuri ennen kuvaa antaa merkit ja paikat. Usvasääntö on KuvatKylttienMukaan (KylttiUsva < 0,05), ja se vaikuttaa vain, jos merkki on tästä kerroksesta: logiikan mukaan kohdekyltin kuvan olisi pitänyt jo häipyä (PeitaMallienAlta), joten syy ei ole selvä. Jos merkki jää, selvitä kohde, älä arvaa.

## Tehty tässä vuorossa (omistaja 21.07, 21.04; KK; PT)
- 7551a76cc: viidelle pyöreä merkki noston omalla ihmekuvalla, tumma tähtikyltti vieressä; Tuileries'n vasen kyltti kuvan verran kauemmas (kyltti palasi 45°:een). Kuvat kuitattu KK:lla, joka vie omistajalle. Parvis: KK ok, ei näy (nimi on ladottu, mutta NimenEste piilottaa; tarkka este ei selvinnyt), ei muutosta.
- 8814fbffa: kehittäjän komento `ui kohdenostot kyltti <nimi>` (törmäys, häivytys vai poissa ja joka kylki).
- Mittaus 8814fbffa: Grand Châtelet 45°: törmää malliin vasemmalla; oikea, yla ja ala vapaat. Ylhäältä ei törmää. Mallia ei nimetty.
- d75e66a12: kortin kuva ja usvasääntö. 49cdc5cc3: Grand Châtelet "yla" (KK: "kuten suunnittelit"; PT hyväksyi syyn jälkeen: ei vastausta kirjattu, rivi lähetetty).
- 581c8e7b8 + 25f9e6ed6: sama yla-siirto peruttiin PT:n käskystä ennen mittausta.

## PT:n linjaukset
- 2.215: kyltti pysyy kiinteällä sivullaan, siirto on poikkeus ja vaatii KK:n sanan ennen ajoa; selvitä syy ensin.
- Valo- ja liikevahdin muiden osumat eivät estä Mac-ajoja, jos muut tarkistukset menevät läpi ja haara ei lisää osumia. Junaan vahdit puhtaiksi. Lista: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/vahtiosumat-20261105.md, PT jakaa.
- tarkista.sh on zsh-skripti: aja zsh:lla, ei bashilla. Se pysähtyy valovahtiin, joten muut ajetaan erikseen (ajettu 8814fbffa:lle: 0 virhettä, kameratesti 57/57; d75e66a12:lle käännös ja liikevahti; 49cdc5cc3 ei).
- JU: enintään noin 5 kuvaa ajossa tai yhden rivin perustelu pyynnössä.

## Muu avoin
- Leikkeiden koodi ja kuvat (LeikeKuva, LeikePuoli, LeikeTunnistuu, Resources) jäävät, kunnes omistaja hyväksyy muodon: siivous vasta sitten (SEIS 21.04).
- b0bc70e7b (lennon kohde, pariisi-lento-219, proto-natiivi-ui-nousu-pieni): tarkistamatta yhdistettynä. Tuileries'n lento tässä haarassa: perillä, kyltti ja kuva näkyvät (7551a76cc), komennolla ui kohdenostot lenna.
- Palais de l'Industrie ja Trocadéro: pelkkä kyltti, ei kuvattu, koodi ennallaan.
- b7e7a1de0:n vesinimet ja saaren nimet: kuittausta ei kirjattu. Sivuhavainto: pystysauma vesisaanto-tuileries-45 (rajaukset/g-sauma.png), ei selvitetty.
- Junaan: 627a664c4 ja web PR 6307, ks. -2002. Avoin: nappien kuvapari, ks. -2002.
