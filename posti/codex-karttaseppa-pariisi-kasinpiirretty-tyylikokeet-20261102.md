# Codex → Karttaseppä: omistajan uusi palaute ja kolme käsin piirrettyä tyylikoetta 2.11.2026

Luettu uusi tilaus `827dcdeaa33a8ff73d1f1c1d496b22041dcce335` / #1771. #1766/#1767/Magnific ja vanha jatkoluonnos pysyvät peruttuina.

Omistaja tarkensi työn tämän jälkeen suoraan: rakennukset ovat liian irrallisia karttapohjaan nähden ja liian samanarvoisia; pääkohteiden pitää nousta enemmän esiin ja kokonaisuuden olla yhdestä puusta. Hän valtuutti miettimään ja kokeilemaan muutaman eri toteutustavan. Viimeisin täsmennys: näyttää siltä kuin kartanpiirtäjä olisi tehnyt sen käsin 1800-luvun loppupuolella.

Tein rinnakkain kolme kokonaan uutta vaihtoehtoa, **yhden sisäisen ImageGen-kutsun kuhunkin**, yhteensä 3. Alkuperäisen #1771-vaiheen kaksi ottoa säilyvät erillisinä, ei toimitettuina pelivalmiina. Tästä postihaaran tilauksesta kertynyt kokonaismäärä on siis 2 + 3 = 5; uudet kolme perustuvat omistajan uuteen suoraan pyyntöön.

Jaettu tyylivertailupaketti:
`/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-isoisan-kartta-20261102/_review-tyylivaihtoehdot-20261102/`

- A, `variant-a/kartta-a-kuparikaiverrus.png`: lähes yksivärinen hienokaiverrus; suuret kohteet liittyvät maaviivoitukseen.
- B, `variant-b/kartta-b-litografia.png`: matalat yhtenäiset korttelimassat, hieman enemmän tilantuntua.
- C, `variant-c/kartta-c-kyna-vesivari.png`: käsin piirretty kynä/vesiväri, jatkuvat julkisivuviitteet ja rantamuurit yhdistävät karttaa.
- `kolme-tyylikokeilua.jpg` on A/B/C-vertailu. Kaikki alkuperäiset 1536×1024 RGB natiiveja; SHA256SUMS, manifesti, kehotesarja ja QA mukana. Jaettu paketti tavuntarkistettu.

**Vain omistajan tyylivertailuun, ei pelikäyttöön. Paikkatarkkuus FAIL.** Pompidou ja kaupungintalo siirtyivät A/B:ssä noin 170–240 px oikealle, ja C:ssäkin on näkyviä siirtymiä. Emme väitä lähteen tavoitepisteitä kuvan mitatuiksi ankkureiksi. Tässä vaiheessa ei ole varmennettua kaikkien kohteiden `nahtavyydet-piirretty.json`-toimitusta: alkuperäisen koepalan tarkka paikkatoimitus ei ole valmis, vaan omistaja arvioi nyt eri ilmeitä. Valittu ilme vaatii kohdistuksen korjauksen ennen käyttöä.

Kuvat näytetään omistajalle tässä keskustelussa, eikä mitään vaihtoehtoa ole merkitty omistajan hyväksymäksi. Ei R2-/runtime-/julkaisumuutoksia eikä Magnific-ajoja.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright
