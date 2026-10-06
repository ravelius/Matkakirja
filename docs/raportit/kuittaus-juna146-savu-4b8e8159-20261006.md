# Junan 146 savu 4b8e8159 (app 5c1d69bf) — OSITTAIN PASS, yksi kohta todentamatta (09.41–09.49, iPhone-sim 1572C658)

TODISTUS.md: ajo a `/Users/Shared/Claude/proto-3d/lokit/todistus-juna146-4b8e8159-20261006-0941/`, ajo b (oppaan täky) `…-b-20261006-0946/` (kopiot repossa `todistus-juna146-5c1d69bf-{a,b}-20261006.md`). Kone kuormaton/kohtalainen, toimintatesti. **0 Exception, 0 VIRHE-riviä, 0 kaatumista** kummassakin. Testitunnus ei kytketty todistusajoon → 2 oppaan avausta ilman sitä (Pöllö vastasi, ei 429).

**Rivi: `juna146-savu 4b8e8159 (5c1d69bf): OSITTAIN PASS — käynnistys, kartta, ISS, linna (Laituri), opas (täkyt, lento, pysäkki, ääni, +2 kuvat, sirut) OK, 0 Exception/0 kaatumista; "oppaan sulku → kartta ehjänä" EI TODENNETTU (Poistu-napin polku muuttunut, ks. alla).`**

| Kohta | Tulos |
|---|---|
| Käynnistys, kartta; ISS-ohjaamo + kartta ISS:n jälkeen | OK |
| Natiivi mykistys, asetukset datana | OK |
| Opas: täkyt alussa | OK: "MIHIN LENNETÄÄN?" 8 täkyä (Canal Grande, Akropolis, Sagrada Família, Prahan linna, Museumsinsel, Central Park, Shibuya, Sydneyn oopperatalo) + "TAI VALITSE PAIKKA" Aasia/Afrikka/… (`…-opas-taky-valikko.png`); lokissa `opas: täkyt 8`, `nimiäänet ladattu`, siltalauseet 94/94 |
| Opas: täky → lento → pysäkki → ääni | OK: Akropolis → `täky valittu Akropolis (Ateena, GR)`, `saapui Akropolis, ääni soi`, `aani mittaa` rms 0,096 huippu 0,590 (LinssiOhjain) → opaspuhe kuuluu; sitten `Puhuu → Odottaa` |
| +N-kuvat, havainnekuva | OK: kuva-inset "+2" + "HAVAINNEKUVA" (`…-opas-akropolis.png`) |
| Vastaussirut | OK: "Kuka rakensi Parthenonin?", "Missä voisi syödä?" + mikki (`…-opas-sirut.png`) |
| Pin-palkki / ohjaimet | OK: ⏸, lehti, ≡, korkeus- ja kierto-ohjain (alavasen/oikea) näkyvät |
| Linna: Laituri (≡ → Huoneet → Laituri) | OK: `kuunnelma laituri alkaa` |
| **Oppaan sulku → kartta ehjänä (ei tummaa vyötä)** | **EI TODENNETTU**: Poistu-nappia ei löytynyt ui-puusta tekstillä "Poistu linssistä"/"Poistu"; ≡ (374,90) tap ei avannut sitä uudessa oppaassa (ruudulla ⏸ + lehti + ≡; täkyvalikko aukesi itsestään). Kartta ei ehtinyt palata vuoron aikana. Pyydän polun (≡-valikon sisältö / Poistu-napin teksti) Natiivisepältä tai erillisen 3 min vuoron |
| Nimikyltit 3 s, ISS-joystick neutraali, linnan kortit napautuksesta, Amsterdam → Dam | EI TESTATTU (ei erillisiä todisteita; Dam-vaihto vaatii Vaihda kohde -polun) |

Päätöksen "PASS vs. VIE-esto" tekee Päätoimittaja: kaikki muu OK, mutta "Poistu → kartta" oli edellisten kokeiden estävä löydös ja on tässä todentamatta.
