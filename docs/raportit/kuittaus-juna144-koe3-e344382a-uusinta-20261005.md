# Junan 144 koe 3 e344382a — uusinta (#4024 julki) 22.29–22.37, iPhone-sim 1572C658: FAIL (Amsterdam 0/5), muut PASS

TODISTUS.md: ajo b `…/todistus-juna144-koe3b-e344382a-20261005-2229/`, ajo c (Amsterdam 5×) `…/todistus-juna144-koe3c-e344382a-20261005-2232/` (kopiot repossa `todistus-juna144-e344382a-{b,amsterdam}-20261005.md`). Kone kuormassa (load 59) → toimintatesti. **0 Exception.** Kaksi oppaan avausta (ajo b ja c), Pöllö vastasi normaalisti (ei 429).

**Rivi: `juna144-koe3 e344382a: FAIL — Vaihda kohde → Eurooppa → Alankomaat → Amsterdam EI vaihda kohdetta eikä sulje valikkoa (0/5 todennettu); Poistu → kartta OK, vastaussirut OK, 1 oppaan avaus OK; kuvakytkin EI TODENNETTU.`**

| Kohta | Tulos |
|---|---|
| Opas oikealla workerilla (#4024) | OK: `opas: auki`, 5+ pysähdystä (Tivoli, raatihuone, Pyöreä torni, Torvehallerne…), `opas: vastaus 1 kysymys (2 vaihtoehtoa)` |
| **Vastaussirut** | **OK**: ruudulla kaksi sirua "Kuka on Absalon?" ja "Jotain vihreää" + mikki-nappi alareunassa (`juna144-e344382a-sirut.png`) |
| **Poistu linssistä → kartta näkyy** | **OK**: ≡ → Poistu linssistä (tap-teksti → (229,243)) → kartta, Liiku ja laatat näkyvät (`…-poistu-kartta-ok.png`); tumma kaista = päivä/yö-varjo, ei tyhjä |
| **Kuvakytkin** | EI TODENNETTU: tap (319,756) ei muuttanut stilleissä mitään näkyvää (ei kytkintä paikassa; sirut ovat y≈756-ristikossa). Tarvitaan napin koordinaatti/nimi (ui-puu ei näytä) |
| **Vaihda kohde → Eurooppa → Alankomaat → Amsterdam, 5×** | **FAIL**: 5 tappia riviin Amsterdam (217,243; tap-teksti) → valikko EI sulkeutunut kertaakaan (still tap 1 ja 5: lista "Alankomaat" yhä auki; `…-amsterdam-tap1.png`, `…-amsterdam-tap5.png`), opas jatkoi Kööpenhaminassa (otsikko "Kööpenhaminan raatihuone", sitten "Nyhavn"), lokissa ei kohteenvaihtoriviä; iteraatioissa 2 ja 4 ≡-tap sulki yhä auki olleen valikon ("Vaihda kohde" ei puussa), joten käytännössä 3 todennettua Amsterdam-tappia + 2 ohjautui väärin — kaikissa kohde ei vaihtunut. HUOM: Natiivi-UI:n mukaan vikaa ei toistu heillä; mitä eroa: tap-teksti → piste riviin (217,243) vs. heillä? |
| Poikkeukset | OK: 0 Exception, 0 VIRHE-riviä (ajo b), ajo c: 0 Exception |

**Seuraava:** Natiivi-UI: yritä oikea tap (kuten `simkosketus … tap 217 243` todistusajon kautta) iPhone 18 Pro -simussa (402×874) — vika toistuu 1/1 ja 5/5. Kuvakytkimen sijainti/nimi tarvitaan.
