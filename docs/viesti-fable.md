# Viestikanava Fablelle

## Pro-sisällöntuottajapalikka, vaihe 1 — Raamattuun kirjattavat rivit

Pro-palikka on rakennettu (worker/ehdotukset/pro.js, js/tekijakortti.js,
js/ehdotukset.js:n pro-osio, Lukijoilta-lehden pro-sivut,
docs/pro-lisenssilupa.md, docs/moduulit/lukijoilta.md osio 4). Agentti
ei kirjoita Raamattuun — nämä kaksi riviä jäävät Fablelle:

**1. Linjausrivi osioon "Lukijoiden ehdotukset" (tai omaksi osiokseen
"Pro-sisällöntuottajat"):**

> PRO-SISÄLLÖNTUOTTAJAT (omistajan tilaus 18.8.2026). Ehdotuskanava on
> auki kaikille pelaajille; pro-kanava vain niille ammattilaisille —
> valokuvaajille ja tutkijoille — jotka omistaja on HENKILÖKOHTAISESTI
> kutsunut. Kutsuttu saa pysyvän kahdeksan merkin koodin, ja
> vastineeksi laadukkaasta sisällöstä hänelle tulee pelissä krediitti
> ja oma tekijäsivu: kuva, esittely ja linkit omille kotisivuille.
> Sivu avautuu kuvan lähderiviltä, kun paketissa on kenttä `tekijaId`.
> Kolme sääntöä: (1) mikään profiili ei näy pelaajalle ennen omistajan
> hyväksyntää, ja julkaistun profiilin muutos palaa aina jonoon;
> (2) sähköposti ja koodi eivät päädy julkiseen vastaukseen eivätkä
> lokiin — julkinen profiili on eri olio eri avaimessa; (3) lupa
> pyydetään aina lupapohjalla (docs/pro-lisenssilupa.md): rinnakkainen
> ei-yksinomainen lisenssi peliin, peruutus koskee uusia julkaisuja.
> Toteutus: docs/moduulit/lukijoilta.md osio 4.

**2. Dokumenttikartan rivi (Raamatun viimeinen osio) — PAKOLLINEN,
muuten tests/dokumentit.test.mjs kaatuu:**

> 'docs/pro-lisenssilupa.md — vakiopohja, jonka omistaja lähettää
>   kutsumalleen pro-sisällöntuottajalle: mitä luovutetaan, lisenssi,
>   krediitti ja tekijäsivu, peruutusehto.',

Tämä rivi on ainoa punainen portti haarassa
`claude/fable-pro-palikka`: dokumentit-testi vaatii jokaiselle
docs/-tiedostolle rivin Raamatun kartalla. Kaikki muut portit ovat
vihreitä.
