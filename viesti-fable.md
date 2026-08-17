# Fable max → päätoimittaja: M2 valmis katselmoitavaksi

17.8.2026, haara `claude/fable-max-m2`. Kiitos M1:n mergestä
(#1214) — huomasin että merge-tapahtuma HERÄTTI tämän session
webhookilla (pull_request.closed tuli perille, toisin kuin
kommentit). Eli: mergesi herättävät minut automaattisesti; vain
kommenttiherätys vaatii omistajan tönäisyn.

## M2 (v814): UI:n apurit ja kehysmatematiikka omaan moduuliin

Suunnitelman M2 sanatarkkana siirtona (malli A):

- UUSI js/ui-apurit.js (772 riviä): puhtaat apufunktiot (html,
  suojaa, ekaLause, virkkeiksi, jaaKappaleiksi, piirraLeipa,
  shortIntro, poimiNostoVirke, lahdemerkinta, vuosiluku,
  onVanhaKuva), ikonikirjasto (VIIVA_IKONIT, AIHE_IKONIT,
  MERKKI_SOITA/SEIS, viivaIkoni*), polkugeometria (pehmeatJaksot,
  pehmeaPolku, polunPituus), alkuanimaation kehysmatematiikka
  (alkuKehykset, kierraKehykset, jaljenKehykset,
  JALJEN_PYYHKAISY), esilataus, huudahdukset, aarreikonit ja
  linssivalinnan tallennus.
- js/ui.js: 18 669 → 17 912 riviä (yhteensä M1+M2: 19 167 →
  17 912). Luokka ja sen vakiot ennallaan.
- tests/alkureitit.test.mjs: kehysfunktioiden tuonti jaettu
  kahtia (ALKUREITIT yhä ui.js:stä — data ei liikkunut).
  Tekstihaut osuvat edelleen luokkakoodiin, joka jäi paikalleen.
- sw.js SHELL + MODULES päivitetty; HUUDAHDUKSET-tuonti siirtyi
  ui.js:stä apureihin.

## Portit

739/739 testiä · ei kaksoisavaimia · niputusvartija vihreä (101
moduulia, 0 törmäystä) · standalone kokoontuu ja käynnistyy
selaimessa (savuke 5/6 — sama vanha pöllö-FAIL).

## Havainto (EN korjannut — kustannuskuri)

AIHE_IKONIT on ollut mainissa pelkkä määrittely ILMAN yhtään
käyttökohtaa (grep -w: vain rivi 1453). docs/tutki-aiheet.md
kuvaa sen liuskakuvakkeiden hakujärjestykseen (kategoria.ikoni →
AIHE_IKONIT[id] → yleiskuvake) — joko kytkös on kadonnut jossain
refaktoroinnissa tai dokumentti kuvaa toteutumatonta. Ansaitsee
tarkistuksen: jos vakioaiheiden kuvakkeet toimivat pelissä, ne
tulevat jotain muuta reittiä ja AIHE_IKONIT on kuollutta dataa.

## Seuraavaksi

M3 (pilotti mallille B: liput, vertailutila, karttazoom-widget)
on suunnitelman seuraava askel — kylmää aluetta sekin. Aloitan
kun M2 on mainissa; mergesi herättää minut. Muistathan poistaa
tämän tiedoston haaralta ennen squashia.
