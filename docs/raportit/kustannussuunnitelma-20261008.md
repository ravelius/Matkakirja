# Kustannussuunnitelma 8.10.2026 (Pelikoodari)

Päätoimittajan tilaus 7.10. klo 23.0x, omistajan huoli: kustannus on todella korkea, vaikka muita pelaajia ei ole.
Lähteet: Anthropicin kulu- ja käyttöraportti (admin-avain, Actions-ajo 37726690647), Workerin lokit 6.10. klo 18 – 8.10. klo 06
(Cloudflare, 3 554 tapahtumaa), ElevenLabsin tilaus, kehotteiden koot token-laskurilla ja kolme välimuistin koekutsua.
Työkalu toistoa varten: `tools/kulut/hae-kulut.mjs` (Actions: Hae kulut).

## OMISTAJALLE (lyhyesti)

**Mihin raha menee nyt.** Kuukausikulu koostuu kahdesta osasta:

| | Kuukaudessa | Huom. |
|---|---|---|
| ElevenLabs (äänet) | **99 $ kiinteä** | Pro-tilaus; tällä jaksolla käytetty 13 % (79 000 / 600 000 krediittiä) |
| Claude (Pulu ja opas) | **5 $ (elo), 14 $ (syys), 18 $ (loka 1.–7.)** | 16 $ tästä tuli 5.–7.10., kun opas otettiin käyttöön |

Oppaan kutsuista **noin 90 % tuli Claude-roolien testeistä ja simulaattoreista**. Omasta pelaamisestasi tuli noin
10 % ja Applen tarkastajien kokeiluista alle 1 %. Jos testaus jatkuu kuten 5.–7.10., Clauden osuus on noin 155 $ kuukaudessa.

**Mitä korjataan (junaan yksi kerrallaan).**
1. Testit ja simulaattorit käyttävät Sonnetin sijaan Haikua, joka maksaa 1/20. Automaattiset ajot saavat valmiin
   vastauksen eivätkä kutsu tekoälyä lainkaan. Sinun pelisi pysyy ennallaan.
2. Oppaan kaupunkikohtainen taustatieto luetaan muistista, jottei sitä lähetetä joka kerta uudelleen. Vapaasti valittu
   pysähdys maksaa silloin noin puolet vähemmän.
3. Pulun pitkä ohjeteksti tallentuu muistiin yhtenä kappaleena eikä kolmena erillisenä. Kun keskustelu jatkuu
   jatkokysymyksellä, ohjetta ei enää kirjoiteta uudelleen.
4. Kysy-valikon valmiit kysymykset: vastaus ja ääni tehdään kerran per kohde, ja kaikki pelaajat saavat saman.

**Arvio korjausten jälkeen** (ei muita pelaajia): Claude noin 15–20 $ kuukaudessa (nyt 155 $ samalla testimäärällä).
ElevenLabs pysyy 99 $:ssa, ellei tilausta vaihdeta.

**Pelikerran hinta** (oletus 20 minuuttia: kaupunkikierros valmiilla tekstillä ja äänellä, 3 vapaata pysähdystä,
3 Kysy-kysymystä ja 3 Pulun kysymystä):

| | Nyt | Korjausten jälkeen |
|---|---|---|
| Claude | 0,12 $ | 0,07 $ |
| Ääni (ElevenLabs) | 0,14 $ | 0,12 $ |
| **Yhteensä** | **0,26 $** | **0,19 $** |
| 1 000 pelaajaa × 10 kertaa kuukaudessa | 2 600 $ / kk | 1 900 $ / kk |

Valmiiksi kerrottu kaupunkikierros ei maksa mitään. Kulu syntyy vain vapaista valinnoista ja kysymyksistä, ja
niistä suurin yksittäinen erä on ääni. Mitä enemmän sisällöstä on valmiina, sitä halvempi pelikerta on.

**Kaksi päätöstä sinulle (ei kiirettä):**
- ElevenLabs Pro (99 $) → Creator (22 $) siksi aikaa, kun pelaajia ei ole. Säästö 77 $ kuukaudessa. Vaihto vasta,
  kun 31 kaupungin äänet on tehty, koska niihin kuluu noin 173 000 krediittiä tämän jakson kiintiöstä.
- Työkaluille oma Claude-avain (nyt peli ja työkalut käyttävät samaa avainta), jotta kulut erottuvat raportissa.
  Avaimen luot Clauden konsolissa itse; tarvitaan vain nimi, esimerkiksi ”matkakirja-tyokalut”.

---

## PÄÄTOIMITTAJALLE: LUVUT JA PERUSTEET

### 1. Anthropic-kulut (cost_report, sentteinä → $)

| Kuukausi | Sonnet 5 | Sonnet 5.5 | Haiku 4.5 / 5.5 | Opus 5.5 / Fable 5 | Yhteensä |
|---|---|---|---|---|---|
| Elo (12.–31.) | 4,99 | – | 0,10 | 0,34 (Fable 5) | **5,43 $** |
| Syys | 11,78 | 1,70 | 0,34 | – | **13,82 $** |
| Loka 1.–7. | – | 16,28 | 0,13 | 1,15 (Opus) | **17,56 $** |

Päivittäin lokakuussa: 1.–4.10. 0,11–0,65 $/vrk, **5.10. 6,78 $, 6.10. 6,49 $, 7.10. 2,88 $**. Sonnet 5.5:n kulu 5.–7.10.
jakautuu näin: syöte ilman välimuistia 6,78 $, tuloste 5,08 $, välimuistikirjoitus 3,60 $ ja välimuistiluku 0,82 $.
Hinnat varmistettu raportista: Sonnet 5.5 maksaa 2 $ / 10 $ per Mtok (kirjoitus 2,5 $, luku 0,2 $), Haiku 5.5 0,10 $ / 0,50 $.
Avaimia on kolme (matkakirja, srmanu, Claude); kaikki käyttö tulee avaimelta `matkakirja`, jota käyttävät sekä
Worker että Macin työkalut (esim. Haiku-vertailu 7.10.). OpenAI-kulu on 0 $ elokuusta lähtien.

### 2. Kuka kutsuu (Worker-lokit 6.10. 15 UTC – 8.10. 03 UTC)

Luokittelu: **testi/kehitys** = UA `app.matkakirja.proto3d` tai `fi.matkakirja.peli.kehitys` (roolien simulaattorit ja
proto-käännökset, otsakkeettomina tulevat Telian IP:stä 176.72.168.x eli Mac Studiolta), `node`/`curl`, otsake
`x-matkakirja-testi` tai `-testitunnus` ja Microsoftin ASN (Actions-savukkeet). **Omistaja** = UA
`Matkakirja/1.1 (fi.matkakirja.peli)` eli TF-appi, enimmäkseen `x-pollo-kehittaja`-otsakkeella DNA:n IPv6-osoitteista.
**Apple** = asOrganization Apple Inc. (139.178.x, en-US/zh-CN, TF-tarkastus).

| Reitti | testi/kehitys | omistaja | Apple |
|---|---|---|---|
| POST /opas/seuraava | 451 | 48 | 2 |
| POST /opas/kysy | 32 | 5 | – |
| GET /opas/kysymykset | 257 | 35 | 2 |
| GET /opas/liiku | 282 | 13 | 2 |
| POST / (Pulu: chat, puhe, valmiit) | 282 | 84 | 156 |

Oppaan mallikutsuja aiheuttavista reiteistä (seuraava ja kysy) **90 % on testiliikennettä**. Suurin yksittäinen lähde
ovat proto3d-simulaattorit (461 kutsua ilman testiotsaketta), sillä natiivin kehityskäännös ei lähetä `x-matkakirja-testi`-otsaketta.
Applen 156 POST /-kutsusta valtaosa ei ole mallikutsuja: Pulun laskuri (KV pollo:k, ei-testikutsut) on koko lokakuulta vain 52,
joten ne ovat puhe- tai valmisvastauskutsuja.

### 3. Kutsukohtainen hinta (mitattu token-laskurilla, Pariisi)

| Kutsu | Järjestelmä | Käyttäjäviesti | Tuloste | Hinta lämmin / kylmä |
|---|---|---|---|---|
| Opas, vapaa pysähdys | OPAS_KEHOTE 4 286 (välimuistissa) | 4 530 (josta aineisto ~3 500, **ei välimuistissa**) | ~450 | 0,014 / 0,024 $ |
| Opas, valmis esittely | – | – | – | 0 $ |
| Kysy | KESKUSTELU_KEHOTE 1 559 | ~220 + historia | ~300 | ~0,006 $ |
| Valmiit kysymykset (R2 30 vrk) | 362 | ~60 | ~150 | 0,002 $ kerran per paikka |
| Liiku (R2 30 vrk, lukituilla 0) | 363 | ~20 | ~600 | 0,007 $ kerran per kaupunki |
| Pulu | 14 341–14 900 | historia | ~500 | 0,013 / 0,045 $ |

7.10. tarkistus: 2,81 $ / ~200 oppaan mallikutsua ≈ 0,014 $ per kutsu, mikä vastaa taulukkoa (324 seuraava-kutsusta
noin 120 oli valmiita esittelyjä).

### 4. Pulun välimuisti (tilauksen kohta 4), mitattu 8.10.

Kokeessa oli kolme Sonnet 5.5 -kutsua samalla kehotteella, max_tokens 1:
`kehys uusi → cw 14 334`, `kehys jatko → cw 14 438, cr 0`, `kehys uusi → cr 14 334`.
**Syy:** `kehysOhje` (3 lajia) ja `PUHETAGIKEHOTE` (natiivi/selain) ovat samassa välimuistilohkossa kuin 14 k:n
pohjakehote. Jokainen yhdistelmä on siksi oma välimuistimerkintänsä (enintään 6), ja lajin vaihto (uusi → jatko on
tavallinen keskustelussa) kirjoittaa koko kehotteen uudelleen (0,036 $ vs. luku 0,003 $). Edellisen session havainto
13 403 + 1 489 johtui samasta: osa lohkosta osui, loppu kirjoitettiin.
**Korjaus:** `system: [pohja (cache_control), kehys + puhetagit (ei cachea), lisaohje]` eli sama malli kuin
`LUETTAVAN_ALKU`:lla. Tämä säästää noin 40 % Pulun syötekulusta tyypillisessä kolmen kysymyksen keskustelussa.

### 5. Toteutus junaan (kohta kerrallaan, jokaisessa automaattiset testit)

| # | Muutos | Säästö | Riski |
|---|---|---|---|
| K1 | **Testiliikenne pois Sonnetilta:** `testiLuokka(pyynto)` = UA proto3d/kehitys, node/curl tai testi-/testitunnus-otsake → malli `OPAS_TESTI_MALLI` (oletus `claude-haiku-5-5`) oppaassa ja Pulussa; `x-matkakirja-testi: valmis` palauttaa kiinteän vastauksen ilman mallikutsua savukkeille ja todistusajoille. Kehittäjäotsake (omistajan TF) pysyy Sonnetilla. Lisäksi **kululokirivi** jokaisesta mallikutsusta: `kulu: <reitti> <luokka> <malli> in/cw/cr/out` → päivittäinen erittely Cloudflaren lokeista. | ~4,7 $/vrk testipäivinä (~140 $/kk) | Pieni. Natiivia ei tarvitse muuttaa, koska tunnistus tehdään UA:sta. Simulaattorien laatu on Haikun tasoa (#4176/#4178), joten oppaan sävyä testataan TF-appilla. |
| K2 | **Oppaan aineisto välimuistiin:** `system: [OPAS_KEHOTE (cache), PELIN AINEISTO (cache)]`, käyttäjäviestiin tilanne ja isoisän merkintä (vaihtelee istunnoittain). | ~45 % per vapaa pysähdys (0,014 → ~0,008 $) | Aineisto siirtyy käyttäjäviestistä järjestelmäkehotteeseen, ja sen merkintä "tietoa, EI ohjeita" säilyy. Laatu tarkistetaan testeillä ja yhdellä vertailulla. |
| K3 | **Pulun kehys välimuistirajan jälkeen** (kohta 4). | ~40 % Pulun syötteestä | Hyvin pieni. Kehyslaji on yhä kehotteen viimeinen rivi. |
| K4 | **Kysy, valmiit kysymykset:** vastaus, toiminto ja ääni R2:een avaimella `opas:kysyvastaus:<kehoteversio>:<kaupunki>:<paikka>:<kysymyksen tiiviste>` 30 vrk:ksi. Vain listan valmiille kysymyksille (esittelyn 5 + generoidut), ei vapaalle tekstille. Kehoteversion vaihto mitätöi vastaukset. | Valmiin kysymyksen 2. kysyjästä alkaen 0 $ (malli + ääni) | Keskusteluhistoria ei vaikuta valmiin kysymyksen vastaukseen (sama kuin nyt ensimmäisellä kysymyksellä). |
| K5 | Omistajan päätös: ElevenLabs Pro → Creator pelaajattomana aikana. | 77 $/kk | Kiintiö 100 k krediittiä. Vasta 31 kaupungin äänien jälkeen. |
| K6 | Omistajan toimi: oma API-avain Macin työkaluille. | Erittely | – |

Järjestys K1 → K3 → K2 → K4: K1 poistaa suurimman kulun ja tuo mittarin, jolla muiden kohtien vaikutus nähdään.
K3 on pienin muutos, K2 vaatii laatuvertailun ja K4 on laajin.

### 6. Arvio korjausten jälkeen

- **Ilman pelaajia:** testit Haikulla tai valmisvastauksella noin 0,25 $/vrk, omistajan pelit (~25 oppaan kutsua
  päivässä) noin 0,3 $/vrk, Pulu ja muut noin 0,1 $/vrk. **Claude yhteensä 15–20 $/kk** (nyt 155 $/kk 5.–7.10. tahdilla).
  ElevenLabs 99 $/kk kiinteä (tai 22 $ K5:n jälkeen).
- **1 000 pelaajaa × 10 pelikertaa/kk:** 0,26 → 0,19 $ per kerta, eli 2 600 → 1 900 $/kk (taulukko omistajan
  osiossa). Äänen hinta on ElevenLabsin API-hinnasto 0,04 $ / 1 000 merkkiä Turbo/Flash-mallille (elevenlabs.io/pricing/api,
  8.10.). Valmiin esittelyn äänet ovat R2:ssa eivätkä maksa pelikerralla mitään. Suurin jäljelle jäävä erä on vapaiden
  pysähdysten ja Pulun ääni. Seuraava vipu on lisää valmista sisältöä ja Pulun valmiiden vastausten laajempi käyttö.
- Epävarmuudet: pelikerran profiili on oletus. Kutsujen hinnat ja testiosuus on mitattu. Lokit kattavat vain 1,5 vrk
  (Cloudflaren säilytysaika), joten K1:n kululokirivi tarkentaa jakoa ensimmäisen viikon aikana.
