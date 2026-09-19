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

## 2. Pulu avoimen paneelin yläpuolelle (PAATOKSET 50)

**Toteutus (yleinen, ei kortti kerrallaan):** uusi `js/pulu-paneelin-ylla.js`
(kytketty `js/pollo.js`:n napin luontiin; sw.js SHELL ja
build-standalone MODULES päivitetty):

- Vahti tarkistaa 200 ms välein ja ruudun kokomuutoksessa, mitä pulun
  OLETUSPAIKAN alla on (`elementsFromPoint`). Paneeli on lähin kiinteä,
  absoluuttinen tai sticky-laatikko, jossa on läpinäkymätön tausta ja
  vähintään 20 merkkiä tekstiä. Yksikään kortti ei ole nimettynä, joten
  uudet paneelit toimivat samoin.
- Pulu nousee paneelin yläreunan päälle (rako 8 px, CSS
  `.pulu-paneelin-ylla`, animoitu 0,28 s). Löydetty paneeli pidetään
  muistissa, joten pulu ei heilu edestakaisin. Pulu palaa, kun
  paneeli sulkeutuu tai siirtyy pois oletuspaikan alta.
- **Korkea paneeli** (nostokortti ja kohdekortti ovat 390 px:llä lähes
  koko ruudun korkuisia, yläreuna 12 ja 53 px): pulu ei mahdu
  yläpuolelle, joten se väistyy näkyvistä paneelin ajaksi
  (`.pulu-paneelin-alla-piilossa`: opacity 0, ei osumaa) ja palaa
  sulkiessa. **Linjaus Fablelle:** tekstin peittäminen on aina väärin,
  joten valitsin väistön. Vaihtoehto olisi kutistaa kortti pulun
  yläpuolelle (kuten `js/livia-nostotila.js` tekee Livian ollessa
  valmis).
- `tests/pulu-paneelin-ylla.test.mjs` (3 testiä): alareunan laskenta,
  yläpalkin raja, puuttuva mitta.

**Vartiot ja mittaukset (Chromium 390 × 844):**

| Pinta | Vastakoe (main) | Korjattu |
| --- | --- | --- |
| Nostokortti (savuke-nostovisa 9) | pulu leikkaa 1 tekstiriviä | 0 (väistynyt) |
| Kohdekortti / hahmotelma (savuke-nostovisa 10) | leikkaa 1 | 0 (väistynyt) |
| Ihmisen matka, Sib.-välilehden Siperia-kortti (savuke-ihmisen-kappaleet 1e) | FAIL: pulun alla `p.ihmisen-vanalappu-teksti` | OK: pulu kortin yläpuolella, alareuna 783 → 612 px |

Kaappaus: `docs/raportit/kaappaukset/nostokortti-20260919/pulu-siperia-ennen-jalkeen-390.jpg`.
savuke-nostovisa 16/16. savuke-ihmisen-kappaleet 22/23: ainoa punainen
`saapuminen siirtyy tasan ZOOMIN_JATKO_MS` on sama myös vastakokeessa,
eli se on vanha eikä tämän erän.

`node --test tests/*.test.mjs`: pass 3657, fail 0; niputus 406 moduulia;
build-standalone kokoontuu.

## 3. Pystykuva ja tilapalkki — EI TEHTY tässä erässä

Koodihavainto (mittaamatta): oikea tumma paneeli on seuraava-nuolen
24 %:n osuma-alue (`.nostosarja-kuvanuoli`, css/fokusnosto.css), joten
todennäköisesti kyse on iOS:n tahmeasta :hover/:active-tilasta, ei
object-fitistä. Kortin yläreuna tilapalkin alla (safe-area) on
mittaamatta.
