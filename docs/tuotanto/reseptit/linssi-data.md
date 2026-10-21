# C Resepti: datalinssi

*(Linssiseppä 21.10.2026, studiojako Raamattu 4.21. Raamattu 2.115, 2.118–2.121. Luvat ja vaiheet: D.)*

**Mikä:** julkinen data kartalle: rasteripino (vuodet tekstuureina, välivuodet varjostimessa), pisteet ja reitit aikaikkunassa
sekä vertailut 1873 ↔ nyt; aikaselain kelaa vuosia (Maapallon tila, Topografia, Astronautin kamera, yön valot).

**Malli:** Topografia (`Linssit/Ydin/Topografia.cs`), Astronautin kamera (`Linssit/Ydin/Astronautti`, `IssKamera`);
pilotti Maapallon tila (rasteripino + aikaselain, joita muut käyttävät); linssikatalogin osa R ja moottorikortti "Data";
lähdeselvitys `docs/raportit/datalahteet-linsseille-20260924.md`.

**Kokoa näin**
1. Kokemus yhdellä lauseella ja yksi kysymys, johon data vastaa.
2. Lähde alkuperäisestä (esim. NASA SVS, NSIDC) attribuutiolla; aineistoputki `tools/<linssi>/` → ämpäri `virta/<linssi>/`.
3. Rasterit ja pisteet Ytimeen (aikaikkuna, interpolointi) ja ohut piirtäjä; reliefi ja värit tyylikirjasta (A taide).
4. Kamera → A kamera, B kamera ja video (pallon ajot, pisteeseen lento).
5. Kehys, aikaselain ja ⚙:n näkymän säädöt yhteisillä pohjilla (B UI, 2.73).
6. Testit: jokainen vuosi latautuu, puuttuva data näkyy merkittynä, ei tyhjää kehystä.

**Valmis:** D:n tarkistuslista; lähde ja lisenssi näkyvissä linssissä.
