# Natiivi-UI: luovutus 6.11.2026 klo 02.25 (konteksti noin 27 %, 7.37)

Täydentää -0146:aa (haara natiivi-ui/luovutus-20261106-0146, vesinimet ja kipsipäät) ja sen kautta -2248:aa ja -2002:ta.

## Jono
Ei omaa ajoa käynnissä. Odottaa: seuraava JU-ajo, jossa proto natiivi-ui/merkki-pinta-219 a43c57fea on mukana (pyydetty PT:ltä 02.2x; sisältää vesinimet 0a5232aec). Ajosta kuva ja rivi PT:lle ja KK:lle.

## Merkit ja nimet maanpinnalle (PT 02.2x, KK sallii kokeen; ei omaa ajoa, ei junaan)
Haara natiivi-ui/merkki-pinta-219, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi (vaihdettu tälle haaralle, vesinimi-100-219 ennallaan), peili natiivi-backup peili/proto/natiivi-ui/merkki-pinta-219. Kartta-testit 624/624. EI KÄÄNNETTY UNITYSSÄ: C#-virhe voi yhä tulla JU:n käännöksessä.

Syy (viety PT:lle ja KK:lle): RuutuPiste ilman korkeutta laskee pisteen 0 metriin, kartta piirtyy kertoimella 2. Ajo natiiviseppa-pariisi-maa2-64820ec1a, kuva m5, kamera NS:n sovitus: Sacré-Cœur 0 m y 1121, 258 m y 848 (kartan kirkko 850) = 273 px; kyltti 42 px pisteen alla = NS:n noin 310. Kuva on kyltin oikealla, siksi x 1470.
Tasaisella 100 m:n pinnalla noin 98 px 45°:ssa. Tarkistukset: Grand Châtelet'n kuvan alareuna m4:ssä täsmää 0 m:iin (1897, 1157). Place du Tertre (nimi) m5: y 1121, 0 m 1141, pinta 866. EI TÄSMÄÄ: Les Hallesin kyltti m4:ssä 130 px pisteen alla, odotus noin 42; syy auki.

Tehty: Kartta/MaanPinta.cs (Cesiumin SampleHeightMostDetailed, noin 150 m:n ruudukko, 32 kulmaa erässä, uusin ensin, aikaraja 10 s, sen jälkeen 0; loki "MATKAKIRJA maanpinta") ja MaanPintaRuudukko.cs (puhdas, testit). Portti: ElavaTyyli.Striimi ja PariisiKallistus.Osuus > 0; muualla 0 kuten ennen. Kutsut: Kohdenostot, NostoKerros.LisaaRuudulta, NostotKartalla (lepoliike), SaapumisKuvat.Ruudulla, Nimikerros.HaePaikka (r.elava). Merkki ja nimi eivät näy ennen korkeutta, joten eivät hyppää. Piirroksen näkyessä korkeus laskee nollaan.

Katso ajosta:
- Sacré-Cœurin merkki kirkolla (m5), nimet paikoillaan, Grand Châtelet, Les Halles, Tuileries (avoin -2248:n kohta 4: voi olla sama syy, ei mitattu).
- Loki: "maanpinta"-rivit, onnistuneet näytteet. Mittaa, tuleeko pinta NS:n kaavaa 2 × maa + 30 vastaavaksi.
- Riskit: kauanko nimet viipyvät Pariisiin tullessa; lisäkyselyt lataavat laattoja, joten iPadin muisti on tarkistettava (raja 4080 Mt). Jos nimet viipyvät liikaa: nimille valmis korkeusruudukko tai vain lähitasot.

Yhdistyminen: ei ristiriitaa natiiviseppa/ajo-pariisi-maa2:een eikä liikevahti-219:ään. malli-kyltit-liike-219 törmää MalliKyltit.cs:ssä vanhalla, tiedetyllä rivillä (ratkaisu ae7278c0a, -2248), ei tämän takia.

Ennallaan, kerrottu PT:lle: Erikoisnostot:143 ja Lautapelinostot:119 (0 m), MalliKyltit (Sovita(90) = 180 m, mallit 90 m; näkyy vain, kun malli ei vielä näy; 2.215:n takia ei muutettu ilman sanaa), NostoKerros:857 ja muut ruudulla-tarkistukset.

## Huomiot
- Lukulista 7.47: en lukenut lukuja 4 ja 6 tässä vuorossa (konteksti), vain 7.47. Lue seuraavassa.
- KK:n osoite tällä koneella on local_231e4bad, ei tilin sami.reivinen@vvi.fi riviä local_d5f31591 (session not found). Globaali CLAUDE.md: omistajan asia, ei muutettu; kerrottu ikkunassa.
- Valovahdin kolme osumaa (Komennot, Nahtavyysalue, NotreDameKirkko) ovat vanhoja, eivät tästä haarasta.
