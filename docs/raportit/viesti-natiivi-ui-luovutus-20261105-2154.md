# Natiivi-UI: luovutus 5.11.2026 klo 21.54 (konteksti 26 %, 7.37)

Korvaa -2137:n. Työhaara proto-repossa: natiivi-ui/kyltit-219, kärki e4b376546, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili natiivi-backup, peili/proto/natiivi-ui/kyltit-219.

## Tila: ei omaa jonoa
Erä valmis ja KK kuittasi e4b376546:n omistajan 21.07:n sanoihin (2.204, "Pyöreä kuva"). PT katsoi kuvat 21.51. EI junaan: junalupaa ei ole, koska tarkista.sh:n vahtiosumat ovat auki (poikkeus koski vain Mac-ajoja). Lista: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/vahtiosumat-20261105.md, PT jakaa. Koko tarkista.sh on ajamatta e4b376546:lle; käännös 0 virhettä.

Ei odottavaa työtä: PT:lle on jo mennyt "JONO TYHJÄ: Natiivi-UI"; aloituksessa rivi uudelleen, ellei uutta tullut.

## Avoin
1. Esittelykuva jää pois hitaalla latauksella (Introesitys.Kuva, ehto oma != kuvaNro): KK päätti korjata. Tavoite (KK): jokainen esittelykuva näkyy esityksessä ja jää kartalle myös hitaalla latauksella, eikä esitys pysähdy niin, että pelaaja huomaa. Työ kuuluu NS:n haaraan natiiviseppa/pariisi-aloitus-219, joka muuttaa samat neljä tiedostoa (Introesitys, Saapumisesitys, Saapumistraileri, SaapumisKuvat). KK:n ohje: siinä tapauksessa rivi PT:lle eikä omaa korjausta. PT 21.5x: siirretty NS:lle, ET korjaa sitä.
   Näyttö: ajo e4b376546: "kuva c1 0.4 s", ensimmäinen näkynyt c2; "esitys pois (4 kuvaa)", 3 saapumiskuvaa kartalla (49cdc5cc3:ssa 4). Latausaikaa ei mitattu. NS:n haarassa uuden pelin Pariisi menee esilatauksen kautta (Saapumistraileri, EsilatausKattoMs), uudelleenkäynti ja muut kaupungit Introesitys.Kuva:n kautta.
2. Yhdistyskoe e4b376546 + natiiviseppa/pariisi-aloitus-219: törmäys Nimikerros.cs:ssä; SaapumisKuvat.cs yhdistyy. PT: törmäys ratkaistaan vasta, kun haarat yhdistetään.
3. Tuileries'n merkki ja kyltti ovat 45°:ssa Louvren seinän päällä (kyltit18-chatelet-45). KK kertoi omistajalle. ÄLÄ siirrä ilman sanaa.

## Tehty tässä vuorossa
- Ajo 49cdc5cc3 (lokit/julkaisija-pariisi-kyltit-49cdc5cc3): Grand Châtelet näkyy molemmista kulmista, ei osu nimiin; viisi korttia ihmekuvalla.
- e4b376546: taivaan merkki oli Champs-Élysées'n saapumiskuva (pariisi-nykyintro-c3), ei noston kuva, joten d75e66a12:n sääntö ei koskenut sitä. SaapumisKuvat.Paivita: opacity = Horisonttiusva.KylttiNakyvyys, piiloon alle 0,05. Ajo lokit/julkaisija-pariisi-kyltit-e4b376546: merkki poissa, Citén merkki kartalla.
- PT:n kysymykset 21.51 vastattu 21.5x: POIKKEUS (ArgumentOutOfRange) on Unityn editorin SearchDatabase-indeksointi, vanha ja muissakin ajoissa. Aukion merkki on saapumiskuva c4 "Cité (Guimardin metrokäynti)" ja kuuluu sinne (2.205). Parvis: ei näy, NimenEste, KK ok, este mittaamatta; arvio Notre-Damen malli, ei tämä merkki.

## Muu avoin (ennallaan -2137:stä)
- Leikkeiden koodi ja kuvat (LeikeKuva, LeikePuoli, LeikeTunnistuu, Resources) jäävät, kunnes omistaja hyväksyy muodon: siivous vasta sitten (SEIS 21.04).
- b0bc70e7b (lennon kohde, pariisi-lento-219, proto-natiivi-ui-nousu-pieni): tarkistamatta yhdistettynä.
- Palais de l'Industrie ja Trocadéro: pelkkä kyltti, ei kuvattu, koodi ennallaan.
- b7e7a1de0:n vesinimet ja saaren nimet: kuittausta ei kirjattu. Sivuhavainto: pystysauma vesisaanto-tuileries-45 (rajaukset/g-sauma.png), ei selvitetty.
- Junaan: 627a664c4 ja web PR 6307, ks. -2002. Avoin: nappien kuvapari, ks. -2002.

## PT:n linjaukset (ennallaan)
- 2.215: kyltti pysyy kiinteällä sivullaan, siirto vaatii KK:n sanan ennen ajoa; selvitä syy ensin.
- Valo- ja liikevahdin muiden osumat eivät estä Mac-ajoja, jos muut tarkistukset menevät läpi ja haara ei lisää osumia. Junaan vahdit puhtaiksi.
- tarkista.sh on zsh-skripti: aja zsh:lla. Se pysähtyy valovahtiin, joten muut ajetaan erikseen.
- JU: enintään noin 5 kuvaa ajossa tai yhden rivin perustelu pyynnössä.

## Huomio komentoihin
zsh: lainausmerkitön "$r:Assets..." tulkitaan muuttujan muunnokseksi (:A), käytä "${r}:polku". Lainausmerkitön "$P" ei jakaudu sanoiksi, käytä taulukkoa.
