# Karttaseppä: luovutus 5.11.2026 klo 16.14 (KS)
Syy: konteksti yli 25 %, luonteva tauko (7.37). **Lue tämä, sitten -1548 (karttaseppa/luovutus-20261105-1548; kohdat "Mitä kuvista katsotaan" ja Opit).** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. Proto-worktree W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki b09c05441 (NUI:n natiivi-ui/kyltit-219 ilmoituksensa mukaan sama). Postin worktree /Users/Shared/Claude/wt/karttaseppa-postilaatikko (irrotettu HEAD, `git push origin HEAD:claude/postilaatikko`).

## ENSIN
1. Remote päälle. Vahti Monitorilla (30 min, uusi päättyessä): `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh a85fae8fb` (tila skriptin vieressä).
2. Odotetaan kolmea:
   - **Mac JU:lta:** b09c05441, sk-pariisi-kyltit.txt, tulos `lokit/julkaisija-pariisi-kyltit-b09c05441` (pyydetty 16.0x, yhteinen NUI:n kanssa). **Katso kuvat täysikokoisina, sitten KK:lle ja kopio PT:lle (2.214).**
   - **Tripo: Eiffel 24c:** tilaus `_tyo/codex/pariisi-sarja-20261105/TILAUS-24c-eiffel-tripo.md`, posti a85fae8fb. Toimitus `eiffel-3d-v1/`. Jos Tripo sanoo, ettei sama kuva käy kahdessa paikassa: **rivi KK:lle ennen Tripoa** (luvattu omistajalle). Kytkentä kuten Louvren: katso täysikoossa, sitten peliin, kuva KK:lle.
   - **Codex: seitsemän kohdetta:** posti ce16785b6, toimitus `_review-sarja-24/<id>/`. Tarkista mitat `huomiot.md`:stä ja katso täysikoossa. **Omistajan arkki ennen Tripoa.** Asennus -1407:n ohjeella.

## Mitä ajosta b09c05441 katsotaan
- **Aarrekuvat (00a6c378c, KK 16.01, omistajan "mitään pieniä malleja ei saa jäädä"):** kuva näkyy vasta tunnistettavan kokoisena, kauempana pelkkä ★-kyltti. Raja `LeikePieninPt` = 24 pt (NostotKartalla.cs). Mittaus b4cf1f86d:stä: noin 28 pt tunnistuu, noin 9 pt ei. Keskitaso (`kyltit-keski`): vain ★-kyltit, ei pistettä. Lähikuvat (temple, chatelet, bastilji, galerie, tuileries): kuva ja kyltti. Kyltti saa pysyä "oikea"-kyljellä ilman kuvaa; katso, näyttääkö oudolta.
- **Tuileries (a5a096efd):** kuva ja kyltti pihan länsipäässä, 20 m siipien päiden ulkopuolella (`MallinTieltaSiirretyt`, Kohdenostot.cs), eivät peitä isoa pyramidia. Pisteen laskin mallin mitoista: tarkista kuvista, ettei se jää väärälle puolelle. KK: "Louvresta ei odoteta muuta kuin Tuileries'n siirto."
- **NUI:n korjaukset (kerro tulos NUI:lle):** pyöreä kuva vain kyltin kanssa (Saint-Sulpice, Élysée, Saint-Germain, Orsayn itäpuoli); Les Hallesin kyltti voittaa pallon hintakyltin keskitasolla; 3D-kylttien häivytys kapeampi (lansi-kuva: Notre-Dame ja Sainte-Chapelle eivät haaleana laatikkona mallin päällä).
- **Peilisali (b4cf1f86d):** nähty kunnossa, tarkista vain, ettei palannut.
- Vrain-Lucasin napautus: `ei merkkiä`, koska kohde ei ole ruudulla. Les Hallesin napautus avaa nostoruudun. Ei vikaa pelissä; korjaa skripti, jos ehdit.

## Omistajan päätökset
- **16.10 (KK, aika korjattu 16.03:sta):** "Tehdäänkö Eiffelin malli ilman kolmatta kierrosta?" = "Tehdään (Suositus)". Etelän paikalla pohjoisen kuva. "Saavatko lintuparvet jäädä Pariisin kartalle?" = "Jäävät (Suositus)".
- **KK 16.01:** muut seitsemän Codexille, neljän sivukuvan tarkistus, arkki omistajalle ennen Tripoa. Pienet aarrekuvat kuten yllä.
- Työlista: rivi "Pariisin nähtävyyssarja" päivitetty.

## KK:n tila
KK nollautui 16.1x. Seuraava KK vie b4cf1f86d:n kuvat omistajalle. Niissä näkyvät vielä pienet aarrekuvat, Tuileries pihalla ja pyöreät kuvat. Kun b09c05441 on katsottu, kerro KK:lle heti, että uudet kuvat korvaavat ne.

## Auki
- Pyramidi-merkki: uusi Louvre avaa museon napautuksella, pyramidi-merkki sitten pois (-1509). Ei aloitettu, KK ei ole pyytänyt.
- Leikkeet ovat paketissa, eivät ämpärissä: versioituun kansioon ennen junaa, jos omistaja hyväksyy.
- louvre-normaali 1,4 Mt voi vaatia pakkauksen.
- Eiffelin korkeus pelissä 792 m, jos pohja on 300 m ja suhde oikea: katso kartalta, sopiiko.

## Opit
- JU:n Mac-ajo pitää pyytää vasta, kun NUI:n kärki on yhdistetty: 44e65c788:sta olisi puuttunut korjauksia.
- Versaillesissa kohdekartta on kiinni: `Kohdenostot.Kaupunki` on null rajojen ulkopuolella, joten alue katsotaan kamerasta.
- Tripon moninäkymä: Louvressa Front/Back viistoilla ja Left/Right tyhjinä toimi. Neljä suoraa sivukuvaa täytti Louvren pihan; Eiffelissä voi käydä samoin ristikolle.
- Generoitua sijainnit.json:ää ei muokattu, koska `tools/sisalto/kohdesijainnit.mjs` tekee sen uudelleen; siirrot koodissa.
