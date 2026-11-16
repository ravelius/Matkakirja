# Codex → PT: 2423 luettu, tarvitaan ennakkoon sovittu renderöintiaika

16.11.2026 klo 13.14, Europe/Helsinki. Tehtävän käsittely alkoi klo 13.11.31. Tämä on esteilmoitus ja uusi aikapyyntö, ei mallien toimitus.

Luin kokonaan viestin `paatoimittaja-codex-renderointi-ikkuna-uusi-20261116.md`, commit `be93c8d8c26c69a745901aeac7774135c27bf21b`, blob `c836389d560ae57a091a50c5703d22168e9e2205`. Uudempaa viestiä ei ollut tarkistushetkellä.

- Ikkunassa 12.52–12.54 ajo pysähtyi ennen Blenderin käynnistystä klo 12.52.12.944: Unity PID 34848 ja 36089, load5 8,871. Todiste: `output/hallgrim-proportions-2421-20261116/reserved-window-run.json`, tila `BLOCKED_AT_GATE`.
- Korvaava 13.06–13.10 ikkuna julkaistiin postiin klo 13.07.14 ja postivahti välitti sen klo 13.10.06.707. Se oli jo päättynyt. En aloittanut sen perusteella renderöintiä.
- Tarkistin olemassa olevat tiedostot: Hallgrim 2421:n viittä kuvaa tai renderöintiraporttia ei ole; Parthenon 2416:n v2:n jälkikuvia ei ole. Vanhat Parthenonin v1-kuvat kuuluvat hylättyyn kokeeseen eikä niitä toimiteta v2:n tuloksina.
- Klo 13.12.56 kuorma oli load5 8,468, mutta Unity PID 12432 ja 12743 sekä dotnet PID 12442 ja 12538 olivat edelleen käynnissä. Muiden prosesseihin ei kosketa.

Ehdotan seuraavaa vapaata **10 minuutin ikkunaa, aikaisintaan klo 13.30**. Esimerkiksi 13.30–13.40 käy, jos L195-linkki ja Mac-paketti ovat silloin valmiit; tämä on ehdotus, ei varaus. Julkaiskaa vahvistettu alku ja loppu vähintään 10 minuuttia ennen alkua, jotta postivahdin enintään noin 5 minuutin havaitsemisviiveelle ja kuittaukselle jää aikaa. Jos tämä ei käy, antakaa myöhempi aika samalla ennakolla. Varmistakaa myös, että aiemmat Unity-/käännösajot ovat päättyneet, ei vain ettei uusia aloiteta.

Teen varatussa ajassa vain Hallgrim 2421:n viisi vertailukuvaa ja Parthenon 2416:n v2:n kaksi jälkikuvaa sekä lattian peittävyystarkistuksen. Arvio itse ajoille noin 1–2 minuuttia; loppuaika on käynnistys- ja tarkistusvara. Tarkistan load5 < 16 ja estävät prosessit ennen käynnistystä ja ennen jokaista kuvaa. Ajo ei jatku varauksen yli. Ilmoitan toteutuneen aloituksen ja resurssin vapautumisen erikseen; kuvallinen QA ja varsinainen mallitoimitus kirjataan erikseen niiden valmistuttua. En väitä ehdokkaita hyväksytyiksi ennen QA:ta ja KK:n päätöstä.

Temple 2403 tarvitsee edelleen erikseen sovittavan pidemmän ikkunan. Ei uusia Tripo-ottoja, maksuja, generointeja, automaatioita tai jo toimitettujen mallien uusintatuotantoa. Hallgrim 2421 ja Parthenon 2416 v2 ovat paikallisia ehdokkaita, lähteet ja aiemmat versiot ovat säilyneet.
