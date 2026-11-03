# Karttaseppä: luovutus 2.11.2026 klo 22.10 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-2010.md (c51872757; käsitelty: Pariisin AVOIN 2 tehty, AVOIN 1 jatkuu alla).
Syy: kontekstivahti 27 %. P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/` (LUE.md = työtapa),
T = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kohdetunnisteet-20261102/`, posti-worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko`
(detached, push `HEAD:claude/postilaatikko`; rebase origin/claude/postilaatikko ennen committia).

## TEHTY
1. **Pariisi uudella tyylillä (omistaja 20.36 tyyli, 21.53 "Kyllä": Codex piirtää loput palat samalla tyylillä).**
   P:ssä: pala00-koepala (runko, merkit), palat/pala01–15 (runko, merkit), palajako.json, palajako-yleiskuva.jpg,
   tyylimalli-hyvaksytty-2029.png, lukitse.py, tarkista_ala.py, kylttisiirrot-pala00.json, SHA256SUMS (ei kata _review*-kansioita).
   Posti Codexille: 325b4e52b (rungot), 8fd78feb1 (vanavesi), 4cb22a767 (pala00-kuittaus), **10a39d6b9 TILAUS palat 1–15**
   (järjestys 6, 10, 5, 9, 7, 11, 2, 1, 3, 14, 13, 15, 4, 8, 12; ennen jokaista `python3 lukitse.py NN` → ohjaus.png + maski).
2. Codexin pala00 (`_review-pala00-koepala/pala00.png`, otto 04): Seine ja saaret osuvat runkoon. **Mittari:** Codexin pohjapiste on
   viistokuvan etuseinässä, joten se mitataan etäisyytenä rungon rakennusalaan (`tarkista_ala.py <review> <merkit.json>`, raja 60 m).
   Tulos 20/25 OK; 5 yli rajan (84 aukio 138 m, 37 102, 68 74, 13 63, 39 62). **PT 21.5x:** kyltit siirretään piirrokseen
   (≤ 140 m), ei uutta Codex-kierrosta; sama sääntö paloissa 1–15. Kirjattu kylttisiirrot-pala00.json + LUE.md.
   Omistaja näki pala00:n yksinään (KK). **Seuraavaksi omistajalle vasta koottu koko kaupunki (KK:lle, kopio PT:lle).**
   PT 20.46: KS hoitaa palatyön Codexin kanssa postilaatikon kautta (kysymykset, korjaukset, kokoaminen), ei omistajan kautta.
3. Animointi (NUI:n palajako hyväksytty, `proto-3d/_tyo/natiivi-ui/pariisi-animaatiot-uusi-tyyli-20261102.md`): spritet
   `_review-pala00-koepala/sprites/` (3 venettä + vanavedet, lintu 4 asentoa, pallo; 1254 px). Codexin `sillat.png` EI osu kartan
   omiin siltoihin → **siltaleikkeet tehdään kootun kartan omista silloista** (rungon siltapolygonit laajennettuna, ei-vesipikselit).
4. tarkista.py ottaa nyt merkit.json-polun toisena argumenttina (isoisan-kartta-20261102/runko/).

## AVOIN (järjestyksessä)
1. **Tunnisteajo** (pid T/ajo.pid = 21538, 22.10 Aasia menossa: baku, beirut). Valmis = pid poissa ja T/ajo.log:n viimeinen rivi ei virhe.
   Kaatuessa `zsh T/kaynnista.zsh` (EI session taustakomentona). Sitten luovutuksen 1430 AVOIN 3–4 (haara karttaseppa-kohdetunnisteet
   91ccdbf70, worktree wt/karttaseppa-kohdetunnisteet): neljä käsilukkoa data/kohdetunnisteet.json:iin, `node tools/sisalto/kohdesijainnit.mjs
   --kaikki`, KAUKANA-lista PT:lle, raportti docs/raportit/kohdetunnisteet-20261102.md, PR.
2. **Pariisin palat 1–15:** seuraa Codexin postia (`git log origin/claude/postilaatikko`, "Codex → Karttaseppä") ja P/_review-palaNN/.
   Jokaiselle: SHA256SUMS, `python3 P/tarkista_ala.py P/_review-palaNN P/palat/palaNN/merkit.json`, yli 60 m → kylttisiirrot-palaNN.json,
   yli 140 m → korjauspyyntö Codexille postilla. Kokoaminen: kangas 5454 × 3634 (palajako.json kangas_px); aiemmin valmis pala voittaa
   lukitulla alueella, sauma häivytetään sen reunalla (~40 px). Sitten tasot (laaja 12 / väli 6 / kaupunki 2,5 m/px, ruudukko.json:n
   `tasot`), uusi TasoVersio-kansio (piirroslaatat versioituina), siltaleikkeet + rivit (tunnus, P, E, L, I) kansioon pariisi-sillat-<pvm>
   ja Seinen venereitti lat/lon ~40 m välein lännestä itään NUI:lle (luvattu), kylttisiirrot peliin, koottu kaupunki KK:lle + PT.
   NUI kytkee (PiirrosKerros-vakiot palajako.json:sta). NS muutti ElavaMvt/ElavaPiirto (9be37e4f2): merge-tree ennen omia PR:iä.
3. **UUSI (PT 22.0x, omistaja 21.42): suunnitelma `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261102-nostot-ja-zoomaus-kaikkiin.md`.**
   KS:lle **B** heti (palojen odotellessa) ja **D** sen jälkeen (NUI aloittaa E:n vasta D:n jälkeen); **G** NUI:n kanssa.
   - B, aloitettu vasta selvittämällä: 60 Euroopan kaupunkia = `MAAILMANKARTTA.cities`, joiden `map.cityManner == 'europe'`
     (js/packs/maailmankartta.js); piste = `PALLON_KAUPUNKIPISTEET` (js/packs/maailmankartta-pallopisteet.js, Wikidata P625,
     3 desimaalia) → kokoelmat/kaupungit.json lat/lon (tools/vienti/kokoelmat.mjs:102–116). Alueet: alpit, sisilia, kreeta, lappi,
     islanti (A: rajataan kokonaisina, ei keskipistettä). Pariisin keskusta nyt koodissa PiirrosKerros.Keskusta (48.857, 2.351).
     Ehdotus: tools/sisalto/kaupunkikeskustat.mjs → data/kaupunkikeskustat.json (id → lat, lon, lähde, perustelu) ja vienti
     kokoelmat/kaupungit.json-kenttään `keskusta` (NUI ja kioski lukevat; sovi NUI:n kanssa ennen skeemamuutosta). Tarkistus:
     OSM:n place-solmu (wikidata=Q, fi-wikin kautta tools/sisalto/kohdesijainnit.mjs:n qidit/koordinaatit), vesi (Overpass is_in) ja
     katuja ≤ 100 m (meri), poikkeama > 700 m → käsin. Overpassin robots.txt palautti 406 curlilla: tarkista käyttöehto ennen ajoa.
     Worktree `/Users/Shared/Claude/wt/karttaseppa-keskipisteet` (haara karttaseppa-keskipisteet, main c079c5fca, ei muutoksia).
   - D: 17 keskipisteen nostoa + ~39 kohdekartan nostoa ilman paikkaa → kuratoitu paikka lähteineen (Sonnet-parvi sallittu,
     viimeisenä viuhka); tarkistus: kaupungin alueella, ei vedessä, ei 25 m päällekkäisyyttä (Kohdenostot.cs:30). Malli: Pariisi.
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; 7.48: muita Pariisin osia ei aloiteta ennen KK:n suunnitelmaa ja PT:n viestiä.
