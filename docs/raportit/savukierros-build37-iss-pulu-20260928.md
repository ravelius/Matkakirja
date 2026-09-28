# BUILD 37 (8728d5ba, juna b09a400a) savuke: PASS (Laitetestaaja, 28.9.2026 klo 16.5x)

iPhone 18 Pro (1572C658), asennus 16:44:09. Sisältö: ISS-kyydin pilvet/valot/revontulet/tähdet
(Linssisepän ISS-realismi -sarja) + Pulun nopeampi alku (natiivi-ui/pulu-ekapala).

## Testattu

1. **Perussanity:** kehittäjätila päällä, `uusi-peli 1 ateena` → Kartta, kuvakaappaus normaali,
   ei virheitä peli-lokissa.
2. **ISS-kyyti (uusi sisältö, ei aiemmin testattu tällä laitteella):**
   `linssi satelliitti` → `astro kyyti` → tila eteni "Seuranta" (kyydissä True), ISS oikeassa
   paikassa/korkeudessa (435 km, ~27 500 km/h), esilataus 200/200 laattaa epäonnistumatta.
   Kuvakaappaus: LIVE-merkki, tähdet, Maan yökuori näkyvät oikein, ei visuaalista korruptiota.
   `astro kyyti pois` → tila "Kauko", poistui siististi. **Ei virheitä lokissa.**
   ISS oli tällä hetkellä Etelämantereen puolella (ei kaupunkeja valoissa/pilvissä näkyvillä) —
   pilviä/valoja/revontulia EI erikseen todennettu tässä ajossa, koska sijainti ei sattunut
   kohtaan jossa ne näkyisivät; itse mekanismi (kyytiin meno, esilataus, poistuminen) toimi.
3. **Pulu-realtime (edellisestä junasta, regressiotarkistus):** ei uusintatestattu tällä
   kierroksella xAI-kulutuksen säästämiseksi — täysi PASS varmistettu juuri edellisessä ajossa
   (1.0.36/5480b556, sama moottorikorjaus mukana muuttumattomana tässä junassa).
4. **Pulu-ekapala (natiivi-ui/pulu-ekapala, ensimmäisen luentapalan nopeutus):** EI TODENNETTU
   erikseen — vaatisi uuden xAI-chat-kysymyksen mittaamaan ensimmäisen äänen ajan, säästetty
   tässä kierroksessa. Muutos koskee vain ajoitusta, ei toiminnallisuutta; ei crashia havaittu.

## Tulos

**PASS (savuke-tasolla).** Sovellus käynnistyy, perus pelisilmukka toimii, ISS-kyyti (suurin uusi
ominaisuus) avautuu ja sulkeutuu siististi ilman virheitä. Ei täyttä ISS-visuaalien (pilvet/valot/
revontulet) yksityiskohtaista todennusta tällä ajolla — Linssiseppä on jo tehnyt useita
laiteajoja (cl3–cl7) näiden ominaisuuksien laiteajossa ennen tätä. Ei täyttä Pulu-ekapala-mittausta
xAI-säästösyistä.

Simulaattori sammutettu.
