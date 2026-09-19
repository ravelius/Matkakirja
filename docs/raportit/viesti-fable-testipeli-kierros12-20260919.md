# Testipeli, kierros 12 (Sonnet local, 19.9.2026 klo 20.33–20.49 Suomen aikaa)

Tuotanto v1963 (päivitysikkuna 20.34), kehittäjätila, iPhone 18 Pro -simulaattori (Safari), 390 px. Äänet: kartan kulmassa mykistyskuvake näkyy, ratasvalikon liukusäätimet 100/100/90/35/100 % (mykistys ei näy niissä). Maailma-kytkin oli päällä ajoittain 20.36–20.46 (hypyt Prahaan, Amsterdamiin, Kööpenhaminaan, Budapestiin; en kirjannut jokaista päälle/pois-vaihtoa), POIS 20.46 (varmistettu valikosta). Haara `sonnet-local-kierros-12`, kuvat `docs/raportit/kaappaukset/kierros12-20260919/01–09-*.jpg`.

## Tulokset

| # | Testi | Tulos |
|---|---|---|
| 1 | Montgolfier 2/2 (Annonay, Ranska) | **Korjattu**: kuva 2/2 (patsas) täyttää kehyksen ilman tummaa paneelia (kuva 03). Pulu oikeassa alakulmassa; leipätekstissä pulu peittää edelleen sanan oikeaa reunaa ("Ennen kuin", "oli") — vähäinen limitys. |
| 2 | Loire-kohdekortti | **Toimii**: pieni kortti näyttää vain lyhyen kuvatekstin ("Loiren leveä uoma…", kuva 04); LISÄÄ-tilassa kaksi kuvaa, lyhyet kuvatekstit, ei "Matkakirjan havainnekuva" / "Valokuva:" -rivejä; **suurennoksessa (kuvan napautus) rivit näkyvät**: "Matkakirjan havainnekuva — lähdeperusteinen johdannainen" (kuva 05). |
| 3 | Belgia maata napauttamalla | **Ei toimi**: napautukset Belgian kohdalle (loitonnetulla kartalla, kuvat ei tallennettu) avasivat Lille-kortin ("Lille" + postikortti + teksti), eivät Belgia-lehteä. Maailma-tilassa napautus Belgian kohtaan avasi taas Lille-kortin tai ei tehnyt mitään. Belgian kohdalla ei näy merkkiä eikä nimeä. Tervurenia/Leijonakumpua ei löytynyt. Vakavuus 2. |
| 4 | Karlovy Vary / Telč | **Ei löytynyt**. Praha: kartta avautui ja Litomyšl (kulttuuri) avautui; en päässyt tarkistamaan Karlovy Varya (länsilaita) enkä Telčiä. Litomyšlin kortti: kuva + suurennos + lähderivi toimivat (kuvat 01, 02). Vakavuus 1. |
| 5 | Tanska / Unkari | **Tanska**: Kööpenhaminan kartta avautuu, Christiansfeld avautuu (3+ kuvaa, historia, kuva latautuu). **Odensen ja Bornholmin nimiöt ovat päällekkäin muiden kanssa** (Odense/Ohita, Ladbyn/Kolding/Christiansfeld/Kalundborg, kuva 06): kartta on nimiöitä täynnä; Ohita-teksti piirtyy Odensen päälle. Vakavuus 1–2. **Unkari**: Budapest-kartta avautuu, Hollókő avautuu (kuva ja LISÄÄ; en avannut Gödöllőä). |
| 6 | Astronautin kamera (Egypti, Joonianmeri) | **Egypti**: kokonaiskuva (Egypti, Sinai, Punainenmeri) näkyi 20.47. **Joonianmeri (Italia–Kreikka) lähizoomissa (kuva 08)**: ei suorakaiteita eikä pilkkuja; merenpohja tasainen sininen sumulla. **Tunisia/Sisilia (kuva 07)**: nimiöt "ETNA" ja "TUNIS YÖLLÄ" selvät, ei limitystä. **Punainenmeri (kuva 09)**: nimiöt "SUEZIN KANAVA", "TIRANIN SALMI", "AL WADJIN RIUTTAMATALIKKO", "KASTELUYMPYRÄT" erillään, ei limitystä; meri tasainen ilman suorakaiteita. Egyptin ylle lähimmäs en päässyt (nipistys osui Tunisian/Sisilian kohtaan), joten "näkyvä leveys vs. k10" jää mittaamatta. |
| 7 | Ihmisen matka: Denisova-kortin kysymysnappi | **Ei testattu** tällä kierroksella (aika loppui; korjaus tulossa v1964:ssä). |

## Muuta

- Ratasvalikko: äänisäätimet 100/100/90/35/100 %; kartan kulmassa mykistyskuvake näkyy. Ei kaatumisia.
- Safari: reunapyyhkäisy (x<10 pt tai >390 pt) avaa välilehtinäkymän; kaksi välilehteä (toinen Prahan tyhjä) — jätin yhden.
- Simulaattori: Budapest, Unkarin kartta, £25, Päivä 1 keskipäivä, maailma POIS.
