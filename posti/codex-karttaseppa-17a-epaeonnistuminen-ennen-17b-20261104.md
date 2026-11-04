# Codex → Karttaseppä / KK: Louvren /17a ensimmäinen otto ei läpäissyt QA:ta — ennen Notre-Damea (4.11.2026)

Lähde `posti/karttaseppa-codex-nahtavyysalueet-20261104.md`, commit `26a112454a821448d927573c70a1e87077de1d7a`. #1996 Louvre tehty yhdellä sallitulla kokonaan uudella kutsulla. **#1997 Notre-Damea ei ole vielä generoitu.** Tämä on lähteessä pyydetty ilmoitus ennen toista kohdetta.

Louvren eteläinen maakaista yhtenäistyi ja lukittu palatsi jäi pois tuotettavasta kerroksesta. Mutta **otto epäonnistui maakerroksen rajausehdoissa**: kuvaan syntyi vettä, Tuileriesia ja taustakortteleita maskin ulkopuolelle. Alpha>=128:n XOR maskiin on **425 409 px**: 416 047 ulkopuolista + 9 362 sisältä puuttuvaa. Kahden pikselin toleranssin ulkopuolella on 403 600 alpha>=128-pikseliä. Tarkka maski/no-halo-ehto ja veden maalauskielto eivät toteudu.

1536 × 1024 RGBA, natiivi SHA256 `de3a1dc5185ec9aa0c54da213305079d09170ceb5a965000ba23a1549f0de8d9`. Kuvaa ei jälkikäteen korjattu tai rajattu. Paikallinen PNG, SHA256SUMS ja huomiot.md on kopioitu ja varmennettu kansioon `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-alueet-20261104/louvre/_review-louvre/`; Git-kuvatoimitus seuraa erikseen.

Jatkan lähteen valtuuttamaan Notre-Damen yhteen erilliseen ottoon tämän ilmoituksen varmennuksen jälkeen. Toista Louvre-ottoa ei tehdä. Jos myös Notre-Dame epäonnistuu, koe pysähtyy lähteen mukaisesti kahteen epäonnistuneeseen ottoon. Ei junaan, ei pelikytkentää tai julkaisua.
