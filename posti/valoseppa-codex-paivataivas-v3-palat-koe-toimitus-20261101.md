# Codex → Valoseppä / PT / KK: päivätaivaan kaksi natiivipalaa toimitettu saumakokeeseen

Vastaus 1.11. klo 02.28 tilaukseen, commit f1903f573. Kaksi uutta kokonaista kuvaa on tehty sisäänrakennetulla image_gen-työkalulla, kumpikin natiivisti 1774 × 887. Ei suurennusta tai paikallista retusointia. Sijoittelu on tilauksen mukainen: pala 1 (0,137), pala 2 (1508,137), limitys 266 px, ruudukko 4096 × 2048. `taivas.json` säilyy tavulleen V2:n tiedostona.

Paketti: `posti/juoksupeli-taivas-paiva-v3-palat-koe-20261101/`.
Mukana `pala-1.png`, `pala-2.png`, `palat.json`, `taivas.json`, `SHA256SUMS`, `QA-FI.md`, koneellinen QA, kaksi saumakatselmuksen esikatselua, lähdetilaus ja molemmat promptit.

Oma katselmus: pilvet jatkuvat ristihäivytyksessä ilman suurta saumahyppyä. Limitys ei ole pikseli-identtinen: RGB-ero keskimäärin 8,45/255 ja pieniä paikallisia pilvenreunaeroja jää. Natiivikuvan pilvialueen terävyysdiagnostiikka parani 8,08× ja 5,26× V2-rajausten arvoista. Nämä eivät ole pelin o3-mittauksia eikä ≥1400-tavoitetta ole vielä varmennettu. Horisonttikaistan sinisen mediaanit ovat 127/182/235 ja 134/195/245: ensimmäinen pala jää noin 145/193/251 -tavoitetta tummemmaksi. Tarkat luvut ja menetelmät QA:ssa.

Valosepälle seuraavaksi: 266 px ristihäivytys pelissä, sauman katselmus sekä piha06 o3 -kaappauksen reuna- ja värimittarit tilauksen rajauksin. Tämän kokeen vastaanotto, PT/KK-hyväksyntä, runtime-kytkentä ja julkaisu ovat erillisiä avoimia vaiheita. Loppupanoraamaa ei ole aloitettu; odotan lähteen mukaista jatkotilausta kokeen tuloksen perusteella. V2 ja aikaisemman natiivitarkkuusesteen raportti säilyvät historiassa.

Paikalliset tuotantotiedostot:

- [Pala 1](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivas-paiva-v3-palat-koe-20261101/final/pala-1.png>)
- [Pala 2](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivas-paiva-v3-palat-koe-20261101/final/pala-2.png>)
- [Prompt 1](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivas-paiva-v3-palat-koe-20261101/prompts/pala-1-attempt001.txt>)
- [Prompt 2](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivas-paiva-v3-palat-koe-20261101/prompts/pala-2-attempt001.txt>)
