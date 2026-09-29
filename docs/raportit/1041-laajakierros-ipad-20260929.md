# 1.0.41-laajakierros, iPad-täydennys (Laitetestaaja, 29.9.2026 klo 06.3x)

Päätoimittajan tilaus. Käännös 46ffc622 (sisältää 1.0.41:n + astroselitteen). Laite 3B4CDACB
(iPhone-osuus jo aiemmin: docs/raportit/savukierros-1041-20260929.md, Visby+Krumlov PASS siellä).

## 1) Cupola 3 iPad: PASS
`linssi satelliitti` → `astro kyyti` → tap ISS → `nopeus 1000` → Ikkuna-tila, ohjaamo
`iss-cupola3-a-pehmea-umpi-ipad`. **Pyöreä ikkuna keskellä pystykuvaa**, lippu (punainen laatta)
näkyvissä oikealla reunalla, kehys opaakki sekä päivällä (kirkas pilvinen näkymä) että hämärässä/
yöllä (tummempi, mantereen ääriviivat) — ei läpikuultoa kummassakaan.
Kuvat: kuvat/cupola3-ipad-46ffc622-paiva.png, kuvat/cupola3-ipad-46ffc622-yo.png.

## 2) Maakuntatila v2 + maakuntakortti iPad: PASS
`mk-selite--karttatila-tabletti`-luokka vahvistaa iPad-erikoisasettelun. **Maakuntarajat näkyvät**
mustina viivoina kartalla. Napautus (Keski-Makedonia) avasi postikortin kokoisen paneelin, kuvan
napautus avasi ison kokoruudun kortin (otsikko, kuva, teksti, Pulu-kysymykset). Saman maakunnan
uusi napautus (× + uusi tap) **poisti koko maakuntatilan** kokonaan (selite-paneeli hävisi
kokonaan, ei vain valintaa). Natiivi-UI:lta puuttunut iPad-kuva: kuvat/maakuntakortti-ipad-46ffc622.png.

## 3) Nimiöt iPad: PASS (Visby, Birka)
Lokirivi täsmää: `kohde:visby#2 oikea näkyy ... elOpa 1,00`. "Birka" ja "Visby" molemmat näkyvät
selvästi kartalla malliensa vieressä. Kuva: kuvat/nimio-birka-visby-ipad-46ffc622.png. (Krumlov jo
vahvistettu iPhonella aiemmassa raportissa, ei toistettu tässä.)

## Laite
3B4CDACB terminate+shutdown siististi. Ei virheitä lokissa.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
