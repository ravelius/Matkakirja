# Natiivisepän luovutus 5.11.2026 klo 23.50 (konteksti 30 %, 7.37)

Korvaa -2329:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (7.41). Yötila: omistaja nukkuu, kysymykset PT:lle.

## SEURAAVA TYÖ: osan C ajon tulos
Ajo `natiiviseppa-pariisi-c1-22f6538a9` pyydetty JU:lta sarjan ja Ateena-ajojen jälkeen. Skenaario `/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/sk-pariisi-c1.txt`, kuvat c1–c4, ei ole vielä nähty ajossa eikä käännetty Unityssä.
KK 23.38: Marais kelpaa, koko Pariisi paloina vain lähellä. Ei junaan, ei iPadia, sarja ei saa hidastua. Tumma kartta on KS:llä, ei odoteta. Seuraava kuva Macilta KK:lle, kun osasta C on näytettävää. KK näyttää omistajalle aamulla k3, k2 ja m2 viat kerrottuina; omistaja voi yhä pysäyttää.

Kun ajo valmis, kuvat täysikokoisina:
- c1 lähellä Marais: näkyykö kartan oma talo 3D-talojen alta? Ei → poista maski kokonaan (`TaloAlue.Maski`, `RengasPois`, `PalaOsuu`, ElavaTyyli:n ja Laattapalvelin.Elava:n rivit). Kyllä → maski takaisin koko alueelle, mutta ladatun alueen ulkopuolelle ei saa jäädä tyhjiä tontteja.
- c2 kaukaa: näkyykö rengas tai raja, kun talot painuvat litteiksi? Säde `TaloAlue.SisaSade`, kaista `ReunaKaista` 500 m.
- c3 Montmartre: leijuuko tai uppoaako talo? Maa = `Sovita(alt_sol + 55)`, kerroin 2 leivottu tee-palat.py:ssä; pohja normaalin w:ssä 1 m:n tarkkuudella.
- c4 Louvren ja ND:n alueraja: talot loppuvat kokonaisina, ei aukkoa.
- `grep "MATKAKIRJA talot\|hader" unity.log`: "talot tila" kertoo palat ja Mt:t.

## Tehty 22f6538a9 (natiiviseppa/marais-talot, työpuu wt/proto-natiiviseppa-marais, peili natiivi-backup peili/proto/natiiviseppa/marais-talot)
Kartta-testit TaloAlue 5/5. Marais'n Resources-aineisto poistettu.
- Aineisto `_tyo/natiiviseppa/pariisi-talot/`: `hae-osm.mjs` (Geofabrik T7:ltä), `hae-ign-koko.py` (WFS, robots.txt 404, 208 408 kohdetta), `tee-palat.py`, `tarkista-palat.py`. Tulos `palat/`: 219 palaa z15, 126 024 taloa, 360 Mt, keskim. 1,6 Mt, suurin 4,6 Mt, 0 virhettä. Palat EIVÄT ole haarassa eikä ämpärissä: Media-vienti = julkaisu, ei viedä ennen lupaa. ODbL tarkistettava ennen julkaisua.
- Kerralla ladattuna 71–134 Mt säteellä 2–2,8 km (laskettu tiedostokoista; muistia ei mitata, omistaja 4.11. 22.41).
- `TaloKerros`: palat vain lähellä, yksi kerrallaan taustasäikeellä, vapautus kauempana. Komento `talot kansio <polku>` (oletus persistentDataPath/talopalat). Näkyy kaarilla 0,035–0,055, joten aloituslennon korkeudella ei lataudu mitään.
- Varjostin: kerroin = aineiston raja × etäisyys kameran kohdasta × nousu; täysin litteänä clip, jolloin näkyy kartan oma talo. Jono 2994.
- Pois keskipisteestä: v7-maskit (10 aluetta, 2 951 taloa), Hôtel de Ville, building=roof/ruins ym., alle 8 m².

## Auki osasta C
- VS:n ensimmäisen erän kohteet (Madeleine, Palais Bourbon, Pompidou, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice) lisättävä tee-palat.py:n OHJELMA-listaan vasta, kun ne ovat pelissä; muuten tilalle jäisi litteä talo.
- Temple-torni (piirrostähti 48.865195, 2.360455): tarkistamatta, peittävätkö talot sen.
- Maanpinnan kerroin leivottu oletukseen 2; komento `korkeus` ei siirrä talojen pohjia suhteessa.
- Suorituskyky isossa iPadissa kohta D, kerran kun Pariisi valmis.

## Tumma kartta (KS)
KS: syy todistettu: nähtävyysmallin maavarjo oli jopa 65 km leveä (lokit/esikatselu-20261105-234647). Korjaus e726bba9f (natiivi-backup, karttaseppa/nahtavyydet-219; Nahtavyysalue.AsetaMallinVarjo), ei junassa. Älä lisää taloja varjon reitille: TaloKerroksen KartanSavy ja _KarttaValo voi arvioida uudelleen, kun korjaus on haarassa.
Talot jakavat jonon 2994 varjon kanssa, joten riski koskee enää mallin vieressä olevia taloja. KS ehdottaa siirtoa jonoon 2995, jos ne jäävät varjon alle. VAROITUS: 2995 on Nimikerros.jono, joten siirto voi peittää nimet (KK 22.4x: nimi kokonaan). Tarkista kuvalla ennen siirtoa.
PT 23.5x: Marais'n m2:n tumma kuva on todennäköisesti sama syy, ei todistettu. Korjaus ei ole haarassa marais-talot, joten tumma kuva C-ajossa EI ole uusi vika: älä selvitä sitä. SÄVYVERTAILU TULEE, kun haarat yhdistetään (e726bba9f + marais-talot): talot ja kartta samassa kuvassa, sama kohta kuin m2.
PT 23.5x halusi C-ajon ajohaarasta 22f6538a9 + e726bba9f, mutta ajo oli jo käynnissä 22f6538a9:llä (23.55, kerrottu PT:lle). PT: annetaan mennä, EI toista ajoa ennen PT:n sanaa. Jos PT sanoo: kertakäyttöinen ajohaara (yhdistyy ilman ristiriitoja, kääntöä ei kokeiltu), ei commitia marais-talotiin eikä KS:n haaraan, ajohaaraa ei viedä, uusi SHA JU:lle.

## Ateena 388742104: katsottu, tulos KK:lla 23.5x
Kamera pysyy Ateenassa ja Tukholmassa Pulun sarjan ajan (b3–b4 ero 0,00 %). Esityskuva ei putoa; PUUTE on skenaarion ajoitusvirhe. KK 23.50: kamera kelpaa, ei junaan. Kaksi näkyvää vikaa (Tukholma b5 ohjeteksti läpinäkyvänä kylttien päällä; Ateena b6 lipun yläpää ruudun yli) EI korjata nyt: omistajan 10.52 ja Raamattu 2.209, odottavat Pariisia, PT kirjaa työlistalle. Haara natiiviseppa/pariisi-aloitus-219, kärki 388742104, junaan vain PT:n kautta. Tila ei muutu ilman viestiä, joka mainitsee 388742104:n.

## Työtapa
kaanna.sh sh:lla, ei zsh:lla. zsh:ssa `echo ==` on virhe. Peili: `git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/marais-talot`. tee-palat.py ajetaan python3.14:llä ilman -I:tä (numpy, PIL); noin 3 min. JU palauttaa pyynnön ilman ratkaisee-riviä tai yli noin 5 kuvalla ilman perustelua.
