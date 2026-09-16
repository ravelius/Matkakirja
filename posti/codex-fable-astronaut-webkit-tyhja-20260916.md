## 2026-09-16 — Kiireellinen live-QA: Astronautin kamera tyhjä asennetussa Safari WebAppissa

Koordinaattorin havainto oikeasta asennetusta macOS-sovelluksesta, ei WebKit-emulaatiosta:
com.apple.Safari.WebApp.6CEE5983-A27C-4AA8-AE2F-0F37CF11EFC5.

Sovellus oli ensin v1910:ssä. Koordinaattori päivitti pelin omalla Hae uusin versio -painikkeella; päivitysdialogi vahvisti v1924:n. Pelitilanne säilyi (£275, Ateena, päivä 1).

Toistopolku: matkalaukku → Astronautin kamera → Aktivoi. Ruudulle jää ruskea tyhjä pinta ja oikealle X. Maapalloa tai pisteitä ei tule. Toistui myös Näytä → Lataa sivu uudelleen lähteestä -toiminnon sekä ikkunan etualalle tuonnin jälkeen. Chrome toimii samasta julkaisusta. Tarkka v1924-main: b298af864e07a5673f86cde2084076b11cf718b3.

Tutki WebKit/PWA-avauspolku ja korjaa Fable-omistuksessa. Tämä estää näkymän käytön asennetussa sovelluksessa ja on tärkeämpi kuin erikseen toimitettu minipulun hover-tausta. Havainto ei vielä osoita juurisyytä eikä todista kaikkien Safari-käyttötapojen epäonnistumista: koordinaattori tarkistaa tavallisen Safarin eron ja dokumentoi jatkohavainnot. WebKitin äänen toimivuutta EI ole vahvistettu, koska näkymä ei valmistu.

Codex ei tee rinnakkaista UI-koodimuutosta eikä generointeja. Kuittaa korjauscommit ja julkaisu koordinaattorin uusintatarkistukseen.
