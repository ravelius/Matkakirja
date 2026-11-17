# Rooma: selvät faktavirheet, korjausehdotukset (SK 17.11.2026, KK 18.12)

Vain virheet, ei tyylimuutoksia; epävarmat jäävät tekstikorjauslistaan. Jokainen korjaus varmistettu kahdesta riippumattomasta lähteestä (Sonnet-hakija; Wikipedia = yksi lähde; hakutuloksissa ei upotettuja komentoja). Korjaus on tehty tähän PR:ään (`js/packs/nahtavyysjutut.js`); äänitystarve on laskettu `tools/aanitysjono/tarkista.mjs`:llä ja jonorivit lisätty samaan committiin (`--lisaa`).

**Äänitystarve yhteensä: 3 kappaletta (3 uutta äänitystä: Castel Sant'Angelo pala 2, Pietarinkirkko pala 2, Pantheon pala 1). Kaikki kolme olivat jo äänitettyjä; vanha ääni jää vanhaksi tekstiksi, kunnes uusi tulee.** Vanhan äänen ja uuden tekstin ero on yksi virke per kappale.

## 1. Castel Sant'Angelo: enkelipatsas
- **Ennen:** "Ensimmäinen enkelipatsas nousi katolle 1536, ja nykyinen pronssiversio on vuodelta 1753."
- **Jälkeen:** "Katolla on ollut useita enkelipatsaita, ja nykyinen pronssiversio on 1700-luvulta."
- **Virhe:** katolla oli enkeli jo ennen 1536 (Pero Tafur näki sellaisen 1435–1439; Nikolai V:n 1400-luvun enkeli tuhoutui räjähdyksessä 1492; Montelupon marmoripatsas noin 1544–1545 ja katolla vuoteen 1747). Nykyinen Verschaffeltin pronssipatsas valmistui 1747–1752 ja paljastettiin 28.6.1752; "1753" on vain en-Wikipedian merkitsemä "citation needed".
- **Lähteet:** Italian kulttuuriministeriö ICCD 11474939 (Montelupo) ja 11476090 (Verschaffelt); Arte.it (enkeli 1492 ja Nikolai V); Treccani (Giardoni/Verschaffelt valu 1751, paikallaan 1752); en-Wikipedia (Tafur).
- **Äänite:** on (pala 2) → uusi äänitys tarvitaan. Jonoon lisätty.

## 2. Pietarinkirkko: Pietarin hauta 1950
- **Ennen:** "Vuonna 1950 kirkon alta kaivettiin esiin muinainen hauta, jonka uskotaan olevan apostoli Pietarin oma — …"
- **Jälkeen:** "Vuonna 1950 julkistettiin kirkon alta tehtyjen kaivausten löytö: muinainen hauta, jonka uskotaan olevan apostoli Pietarin oma — …"
- **Virhe:** kaivaukset olivat 1939/1940–1949; 1950 on Pius XII:n joulun radioviesti (23.12.1950), jossa löytö julkistettiin ("La tomba del Principe degli Apostoli è stata ritrovata"). Vuosirivi "löytö julkistettiin 1950" on jo oikein.
- **Lähteet:** vatican.va (Pius XII 23.12.1950); Avvenire (kaivaukset 1940–1949, julkistus joulun radioviestissä); en-Wikipedia ja EWTN (kaivaukset Pius XI:n kuoleman 1939 jälkeen, noin kymmenen vuotta).
- **Äänite:** on (pala 2) → uusi äänitys tarvitaan.
- **Ei muutosta:** "kesti yli 120 vuotta" on oikein (18.4.1506 – 18.11.1626 = 120 v 7 kk; Italiani.it, Catholic.org); poistettu korjauslistalta.

## 3. Pantheon: Agrippan temppeli
- **Ennen:** "… Marcus Agrippa rakennutti noin 29 eaa., mutta se paloi."
- **Jälkeen:** "… Marcus Agrippa rakennutti noin 27 eaa., mutta se paloi."
- **Virhe:** Agrippan Pantheon on vuodelta 27 eaa. (hänen kolmas konsulikautensa; valmis 25 eaa. Cassius Dion mukaan). 29–19 eaa. on koko Campus Martiuksen hankkeen alku.
- **Lähteet:** Platner & Ashby 1929 (LacusCurtius: rakennettu 27, valmis 25 eaa.); Livius.org (27 eaa.); Turismo Roma (27 eaa.).
- **Äänite:** on (pala 1) → uusi äänitys tarvitaan.

## Ei korjata nyt (jää tekstikorjauslistaan)
- **Banca Romana, "nimeksi tuli Banca Romana":** pelkistys, ei virhe. Nimihistoria (Banca Romana 1834/35 → Banca dello Stato Pontificio 1850/51 → Banca Romana 1870) on kahden lähteen mukaan toisin päin kuin pelkistys antaa ymmärtää, mutta Banca d'Italia sanoo itse "paavinvaltion pankista tuli Banca Romana". Lisäksi sama virke on kahdessa tiedostossa (`nahtavyysjutut.js`, `skandaalit.js`). Ehdotus tarkennukseksi, jos KK haluaa: "pankki otti vanhan nimensä Banca Romana takaisin, kun Rooma oli liitetty Italiaan vuonna 1870".
- **Jupiterin temppeli, "vandaalit veivät sen kullatut tiilet 455":** ylilupaus (Prokopios: puolet katosta, kullattua pronssia), mutta sama virke on kahdessa kappaleessa (`monumentit-eurooppa.js`: teksti ja selite) ja vuosirivi nojaa sanaan "tiilet 455"; ehdotus "veivät puolet sen kullatuista pronssitiilistä".
- Muut Rooman tekstihuomiot (Septizodium jalusta, Forum 179 eaa., Torre Argentina kissojen määrä, Meta Sudans, Porto di Ripetta, Sabina ja Aelius, Trevi 1732, Norsu "veisti") ovat epävarmoja tai pelkistyksiä: listaan.
