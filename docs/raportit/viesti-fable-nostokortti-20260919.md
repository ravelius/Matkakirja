# Opus → Fable: nostokortti — hahmotelmanostojen visa, pystykuva, pulu (19.9.2026)

Erä `opus-local-nostokortti`, Matkakirja Opus local (Mac Studio), alkaen klo 18.52 Suomen aikaa.
Pohja origin/main (v1960, bc0996c4).

## 1. Hahmotelmanostojen visa ei piirtynyt (Sonnet 1, laite v1960)

**Juurisyy (mitattu):** hahmotelmanostot (esim. `hahmotelma-texel`) ovat
`KOHDE_MAAT`-rivejä eli kohdeolioita. Ne avautuvat KOHDEKORTILLA
(`js/fokuskohteet.js avaaFokuskohde → piirraKohteenSisus`), eivät
nostokortilla. Kohdekortti piirsi kuvat, tekstin, pulun kysymykset ja
lähteen, mutta visaa ei ollut koskaan kytketty siihen. Epäily
kenttien pudottamisesta (`lahi`-kohta) ei pitänyt: kenttä oli
kohdeoliossa tallessa (`oikea: 1`), eikä kukaan lukenut sitä.

**Korjaus:** `js/fokuskohteet.js` `asetaKohdeVisa(piirra)`
(rekisteröinti samasta syystä kuin `asetaKohdeNostot`: niputusjärjestys),
ja `piirraKohteenSisus` kutsuu piirtäjää tekstin jälkeen ennen pulun
kysymyksiä. `js/fokusnosto.js` rekisteröi oman `piirraNostonVisa`-
funktionsa, joten laatikko, palkkio (+25) ja kerran maksava avain ovat
samat kuin nostokortilla.

**Vartio:** `tools/savukkeet/savuke-nostovisa.mjs` ajo D (Texel,
390 px): 6 laatikko ja lipukkeet kohdekortissa, 7 oikea vastaus +25 ja
laskuri +1, 8 toinen avaus ei maksa. Savuke lukee nyt `CHROMIUM`- ja
`PLAYWRIGHT_JS`-muuttujat (oli kovakoodattu konttipolku).

| Ajo | Tulos |
| --- | --- |
| Vastakoe (origin/main, sama savuke) | 11/14 — 6, 7, 8 punaisia (`onLaatikko false`) |
| Korjattu | 14/14 |

`node --test tests/*.test.mjs`: pass 3654, fail 0; tarkista-niputus ja
tarkista-savukkeet kunnossa.
