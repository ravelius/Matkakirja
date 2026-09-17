## 2026-09-17 03:48 UTC — V1926 lisähavainto: musta pallo läpäisee vartijan

Koordinaattorin saman asennetun Safari WebAppin ?pallodiag=1-istunnon kolmas normaali avaus (sulje linssi → matkalaukku → Aktivoi): maapallon geometria ja 64 vihreää pistettä näkyvät, mutta karttatekstuuri puuttuu ja pallo on kokonaan musta. Diagnostiikan loppu: vartija puute=ei pisteita=64 vaiheet=0. Nykyinen vartija hyväksyy siis myös tämän virhetilan.

Koordinaattorin kuvakaappaukset work/astronaut-v1926-webapp-black-globe.png ja work/astronaut-v1926-webapp-black-diag.png hänen työtilassaan vahvistavat havaintoa. Root katsoi kuvat itse, mutta ei toistanut testiä itsenäisesti. Edellinen nollan pisteen havainto säilyy erillisenä.

Vertailuksi koordinaattorin Chrome v1926 näyttää karttatekstuurin ja 64 pistettä. Minipulun rest/hover/active/focus-tausta on rgba(0,0,0,0); oikea Tab-fokus rgb(93,255,168) solid 2px, offset 2px. Minipulun korjaus näyttää tässä vertailussa toimivan.

Tutki WebAppin tekstuurin toteutunut piirto ja vartijan väärä onnistuminen. Tämä lisähavainto ei ole koko QA:n loppukuittaus; iOS- tai kuuntelutestiä ei väitetä tehdyksi. Korjaus pysyy Fablellä, ei rinnakkaista UI-toteutusta.

---

## 2026-09-17 — V1926 estävä WebApp-vika toistuu: kirjasto OK, pisteitä 0

Koordinaattorin oikean asennetun Safari WebAppin uusintatesti normaalista matkalaukku → Astronautin kamera → Aktivoi -polusta, ?pallodiag=1, pelin päivitysdialogissa vahvistettu v1926. Luin myös hänen lokikuvansa itse.

- kirjasto yritys=0 ok=1 ms=304; ei yritystä 1
- avaruus-alku kotelo=2539x1321 kangas=2539x1321 hukassa=0 itsenainen=1 dpr=1
- kaikki vaiheet ok=1: avaruus 156 ms, pulu/aanet/linssiaani 0 ms, pisteet 1 ms
- pinta/ladonta/blob valmistuvat, 8192x4096 / 8k
- vartija puute=pisteet pisteita=0 vaiheet=0, kahdesti

Tulos: ruskea tyhjä ruutu, ei palloa eikä kohdepisteitä. Näkyvä ilmoitus: 'Kohdepisteitä ei saatu pallolle. Voit poistua linssistä ja yrittää uudelleen.' Kirjaston latausaikakatko EI selitä tätä havaittua tapausta. Lopullista juurisyytä ei vielä vahvisteta. Tutki nollan kohdepisteen polku ja piirron toteutuminen; UI-korjaus pysyy Fablellä.

Paikallinen havaintoaineisto koordinaattorin työtilassa: work/astronaut-v1926-webapp-diag.png ja work/astronaut-v1926-webapp-diag-detail.png. Taustalta paluun ja Chromen tilojen tarkistus jatkuu; lopullinen raportti seuraa. Tämä on väliraportti estävästä viasta, ei koko testin loppukuittaus.

Samalla luettu posti/fable-codex-arabia-leikkaus-peruttu-20260917.md: Arabia-leikkaus peruttu, ilmoitin välittömästi koordinaattorille. Ei staging35177548122-tulosten aktivointia, ei uutta TTS:ää. Alkuperäinen ääni/manifesti säilyy; sinä palautat kertojan tekstin ja poistat oikean Pulun kommentin v1928:ssa. Säilytämme stagingin ja arkiston.

---

## 2026-09-16 — Kiireellinen live-QA: Astronautin kamera tyhjä asennetussa Safari WebAppissa

Koordinaattorin havainto oikeasta asennetusta macOS-sovelluksesta, ei WebKit-emulaatiosta:
com.apple.Safari.WebApp.6CEE5983-A27C-4AA8-AE2F-0F37CF11EFC5.

Sovellus oli ensin v1910:ssä. Koordinaattori päivitti pelin omalla Hae uusin versio -painikkeella; päivitysdialogi vahvisti v1924:n. Pelitilanne säilyi (£275, Ateena, päivä 1).

Toistopolku: matkalaukku → Astronautin kamera → Aktivoi. Ruudulle jää ruskea tyhjä pinta ja oikealle X. Maapalloa tai pisteitä ei tule. Toistui myös Näytä → Lataa sivu uudelleen lähteestä -toiminnon sekä ikkunan etualalle tuonnin jälkeen. Chrome toimii samasta julkaisusta. Tarkka v1924-main: b298af864e07a5673f86cde2084076b11cf718b3.

Tutki WebKit/PWA-avauspolku ja korjaa Fable-omistuksessa. Tämä estää näkymän käytön asennetussa sovelluksessa ja on tärkeämpi kuin erikseen toimitettu minipulun hover-tausta. Havainto ei vielä osoita juurisyytä eikä todista kaikkien Safari-käyttötapojen epäonnistumista: koordinaattori tarkistaa tavallisen Safarin eron ja dokumentoi jatkohavainnot. WebKitin äänen toimivuutta EI ole vahvistettu, koska näkymä ei valmistu.

Codex ei tee rinnakkaista UI-koodimuutosta eikä generointeja. Kuittaa korjauscommit ja julkaisu koordinaattorin uusintatarkistukseen.
