# Claude Haiku 5.5 vs Sonnet 5.5: Pulu, Kysy ja elävän oppaan kertoja

*Pelikoodari 7.10.2026 klo 22.5x, Päätoimittajan ja omistajan pyynnöstä. Vertailu, ei tuotantovaihtoa.*

## Tiivistelmä

**Suositus: ei vaihdeta Pulua eikä oppaan kertojaa Haiku 5.5:een.** Haiku 5.5 on selvästi nopeampi (ensimmäinen
sana noin 0,2–0,4 s aiemmin, koko vastaus noin 40–50 % nopeammin) ja noin 20 kertaa halvempi, mutta sillä oli tässä
otoksessa paljon enemmän asiavirheitä, kielivirheitä ja roolin rikkomista. Eron arvo on euroissa pieni (alle 40 € kuussa
nykyisellä käytöllä), laadun ero näkyy pelaajalle heti. Haikun voi myöhemmin kokeilla rajattuihin, matalan riskin
tehtäviin (esimerkiksi Kysy-kysymysehdotukset, kohdelistan järjestys) omalla testillään.

## Menetelmä

- Tuotannon worker (main 6b37efec) ajettiin paikallisesti, joten kehotteet, kontekstit ja pyynnöt olivat täsmälleen
  tuotannon mukaiset. Malli vaihdettiin vain ympäristömuuttujilla (POLLO_MALLI, OPAS_MALLI).
- Anthropic-kutsut siepattiin ja lähetettiin striimattuina, jotta saatiin aika ensimmäiseen tekstitokeniin (TTFT),
  kokonaisaika ja tokenit. Muut haut (Wikipedia, Wikidata) menivät oikeaan verkkoon.
- **Haiku 5.5:n asetus:** Models API:n mukaan `thinking.types.disabled` on tuettu (Sonnet 5.5:llä ei). Haikulle
  käytettiin ajattelu pois ja ei `temperature`-kenttää (muu kuin oletus palauttaa 400). Nykyinen koodi
  (`rajat.js ajatteluKentat`) jättäisi Haiku 5.5:lle oletuksen (adaptiivinen ajattelu, medium), ja `worker.js`
  lähettää tuomioissa `temperature: 0`. Molemmat pitää muuttaa, jos Haikua käytetään.
- Aineisto: **Pulu 10** valmiskysymystä (`js/packs/pollo-kysymykset.js`: Firenze, Tampere, Helsinki, Lontoo, Dublin,
  Edinburgh, Marseille, Lissabon), **Kysy 10** kysymystä kuudesta kaupungista ja kahdesta muusta, **oppaan kertoja**
  3 kaupunkia × 5 pysähdystä (Tampere, Ljubljana, Bergen) ilman esigeneroitua esittelyä ja ilman kuvalistaa, jolloin
  malli valitsee pysähdykset ja kirjoittaa kerronnan. Yhteensä 57 + 56 mallikutsua, ei virheitä.
- Raakadata: `/Users/Shared/Claude/proto-3d/_tyo/haiku-vertailu/` (haiku.json, sonnet.json, vertaa.mjs).
- Arviointi: luin kaikki 70 vastausta rinnakkain. Asiavirheet tarkistin omasta tiedostani; epävarmat on merkitty.

## Viive ja pituus (mediaani)

| Tehtävä | Malli | TTFT | TTFT p90 | Kokonaisaika | Pituus (sanaa) |
|---|---|---|---|---|---|
| Pulu | Haiku 5.5 | 0,60 s | 0,91 s | 3,9 s | 111 |
| Pulu | Sonnet 5.5 | 1,00 s | 1,35 s | 7,5 s | 124 |
| Kysy | Haiku 5.5 | 0,46 s | 0,49 s | 1,8 s | 40 |
| Kysy | Sonnet 5.5 | 0,67 s | 0,78 s | 2,9 s | 38 |
| Opas (kierros + kerronta) | Haiku 5.5 | 0,48 s | 0,60 s | 3,0 s | 77 |
| Opas (kierros + kerronta) | Sonnet 5.5 | 0,69 s | 0,90 s | 4,2 s | 66 |

Haikulla yksi oppaan kutsu pysähtyi `max_tokens`-rajaan (Sonnet ei yhtään).

## Laatu

### Pulu (10 kysymystä)

- **Roolin rikkominen, Haiku:** "Kas, Livia tässä. Pöllö on poissa, ja minä hoidan hänen virkaansa" (Tampere),
  "Livian lisäys:" (Firenze) ja kehotteen sisäistä puhetta vastauksessa: "Vastaus on kirjakielellä, koska kysymys on
  aihe-alkuinen", "Firenze on pelaajan kartalla juuri nyt, joten puhun siitä", "Muut kuvaukset ovat kirjakielistä
  kallioperää". Sonnetilla yksi vastaava ("kuten kontekstissa ei sen tarkemmin kerrota").
- **Asiavirheet, Haiku:** James Finlayson esitettiin Laurel ja Hardy -elokuvien näyttelijänä, vaikka pelaaja seisoi
  Tampereella (vakava). Ponte Vecchio: Ferdinando I:n asetus kuvattiin päinvastoin (hän ajoi teurastajat pois).
  Big Benin Benjamin Caunt "painonnostaja" (nyrkkeilijä). Edinburgh "kuningaskivi" ja basaltti (keksittyä).
  Marseille "foinikialaisia ja kreikkalaisia" ja "kahdeksan–yhdeksän vuosisataa vanhempi kuin Pariisin
  kaupunginosat" (järjetön vertaus). Tampere "kaupunkia on perustettu ... 1779, kun Tampereen kaupunkia ei vielä
  ollut" (ristiriita).
- **Asiavirheet, Sonnet:** Tammerkosken korkeusero "noin kolmekymmentä metriä" (oikein noin 18 m; Haiku sanoi 18).
  Marseille aloitti "foinikialaisilla" ja korjasi itsensä vastauksen lopussa ("Huomasin, että aloitin virheellisesti").
  Muut vastaukset (Medicit, Suomenlinna, Bloomsday, Lissabon 1755, Finlayson) olivat asiallisia ja yksityiskohtaisia.
- **Kieli:** Haikulla kömpelöitä ilmauksia ("palasi vallan kahvasta", "Elizabeth Towerksi", "Pulla ei kuulu juhlaan").
  Sonnetin kieli on luontevampaa; Sonnet käytti `[[linkki]]`-merkintöjä (Pulun muoto sallii ne).

### Kysy (10 kysymystä)

- Molemmat vastasivat aiheeseen ja oikean pituisesti (2–3 virkettä).
- **Haiku:** kielivirheitä ("arkkitehti I. M. Peiille", "kiviltoja", "kaksikaksoisvaakuna", "kapeilla kadulla"),
  epävarma väite Notre-Damen palon syystä ("liittyvän rakennustöihin") ja Colosseumin "teatterinäytelmät".
- **Sonnet:** tarkemmat yksityiskohdat (Notre-Damen uudelleenavaus 2024, Stephansdomin katon 1950-luku), yksi lyhenne
  vastoin kehotetta ("H. C. Andersen").

### Elävän oppaan kertoja (3 × 5 pysähdystä)

- **Kohdevalinta:** Sonnet valitsi jokaisessa kaupungissa vahvat kohteet (Bergen: Bryggen, Mariankirkko, Bergenhus,
  Kalastajatori, Vågen; Ljubljana: Kolmoissilta, linna, Lohikäärmesilta, keskustori, Prešerenin aukio). Haiku valitsi
  heikompia (Ljubljanan kongressikeskus, Bergenin Media City, Lille Lungegårdsvann), ja yksi pysähdys oli nimeltään
  pelkkä "Bergen".
- **Asiavirheet, Haiku:** Tampereen tuomiokirkko "punatiilinen" ja "Akseli Gallen-Kallelan töitä" (harmaa graniitti,
  Simberg ja Enckell); raatihuone "tummanpunainen tiili, kansallisromantiikka" (vaalea uusrenessanssi);
  kauppahalli "1800-luvun lopulla" (1901); Prešeren "ranskalainen runoilija" (slovenialainen); keksitty isoisän
  merkintä Ljubljanasta 1873 (kaanonin vastainen).
- **Asiavirheet, Sonnet:** ei selviä; pieniä epätarkkuuksia (tuomiokirkon katon "kyykäärme", Tampere-talon sijainti).
- **Tarinallisuus ja kieli:** Sonnet kertoo konkreettisen yksityiskohdan (Simbergin haavoittunut enkeli, Julijan
  kasvot ikkunassa, Lohikäärmesillan myytti); Haikulla enemmän yleistä kuvailua ("kannattaa katsoa", "näkyy
  ylhäältä") ja kömpelöitä virkkeitä.

## Kustannus kuukaudessa nykyisellä käytöllä

Hinnat: Haiku 5.5 $0,10 / $0,50 per Mtok (Päätoimittajan tieto, alle 100k tokenin kehotteet), Sonnet 5.5 noin 20×.
Välimuisti: luku 0,1×, kirjoitus 1,25×. Mitatut tokenit per kutsu (sama kehote molemmilla):

| Tehtävä | Syöte (välimuistista) | Tuotos | Sonnet / kutsu | Haiku / kutsu |
|---|---|---|---|---|
| Pulu | ~15 000 (13 400 luettu, 1 500 kirjoitettu) | ~520–620 | ~$0,013 | ~$0,0006 |
| Opas-pysähdys | ~2 100 | ~320–370 | ~$0,004 | ~$0,0002 |
| Kysy | ~1 600 | ~230 | ~$0,003 | ~$0,0001 |

Käyttö: Pulu 279 kysymystä syyskuussa (KV `pollo:k:2026-09`), lokakuussa 52 tähän mennessä; oppaan tekstitallenteita
R2:ssa 6.10. 221 ja 7.10. 138 (pääosin kehitystä ja testejä).

- **Sonnet 5.5:** Pulu ~$4 + opas ja Kysy ~$25–40 → **noin $30–45 kuukaudessa**.
- **Haiku 5.5:** **noin $1,5–2,5 kuukaudessa**.
- Esigeneroidut esittelyt (37 kaupunkia) poistavat jatkossa suurimman osan oppaan kerrontakutsuista, joten oppaan osuus
  pienenee kummallakin mallilla; jäljelle jäävät Kysy, vapaat toiveet ja muut kuin sallitut kaupungit.

## Jos Haikua halutaan myöhemmin kokeilla

1. `rajat.js ajatteluKentat`: `haiku-5-5` → `{ thinking: { type: 'disabled' } }` (nyt `{}` = adaptiivinen ajattelu).
2. `worker.js` tuomiot: `temperature` pois Haiku 5.5:ltä (400).
3. Ensimmäiseksi matalan riskin tehtäviin (Kysy-kysymysehdotukset, kohdelistan järjestys), ja tämä sama vertailu
   uudelleen ennen laajentamista.

## Lisävertailu: Haiku 5.5 adaptiivisella ajattelulla (omistaja 7.10. 23.0x)

Omistaja kysyi, muuttuuko tulos, jos Haiku saa ajatella. Samat 10 Pulu-, 10 Kysy- ja 3 × 5 oppaan pyyntöä ajettiin
Haiku 5.5:llä `thinking: adaptive` ja `effort` low tai medium. Ajattelutokenit lasketaan `max_tokens`-rajaan, joten
ajatteleville lisättiin 3000 tokenia, ettei näkyvä vastaus katkea (tuotannossa tarvittaisiin sama korotus).

**Tasapuolisuus:** myöskään Sonnet 5.5 ei käytännössä ajattele tuotannossa: `rajat.js` antaa sille `thinking:
between_tools` (Sonnet 5.5 ei hyväksy `disabled`-tilaa), eli ajattelua vain työkalukutsujen välissä, eikä Pululla tai
oppaalla ole työkaluja. Mittauksissa Sonnet ei tuottanut yhtään ajattelulohkoa. Alkuperäinen vertailu (Haiku ilman
ajattelua vs Sonnet) oli siis tasapuolinen; tämä osio vastaa siihen, auttaako ajattelu Haikua.

### Mittarit (mediaani; kustannus per kutsu ajattelutokenit mukaan)

| Asetus | Tehtävä | Aika 1. näkyvään tekstiin | Kokonaisaika | Tuotos (tokenia) | $ / kutsu |
|---|---|---|---|---|---|
| Haiku, ei ajattelua | Pulu | 0,60 s | 3,9 s | 521 | 0,0006 |
| Haiku, adaptiivinen low | Pulu | 4,2 s | 7,4 s | 1 068 | 0,0009 |
| Haiku, adaptiivinen medium | Pulu | 8,0 s | 10,1 s | 1 730 | 0,0010 |
| Sonnet 5.5 (tuotanto) | Pulu | 1,00 s | 7,5 s | 619 | 0,0128 |
| Haiku, ei ajattelua | Kysy | 0,46 s | 1,8 s | 228 | 0,0002 |
| Haiku, adaptiivinen low | Kysy | 1,1 s | 2,6 s | 382 | 0,0002 |
| Haiku, adaptiivinen medium | Kysy | 3,7 s | 4,5 s | 730 | 0,0004 |
| Sonnet 5.5 (tuotanto) | Kysy | 0,67 s | 2,9 s | 226 | 0,0031 |
| Haiku, ei ajattelua | Opas | 0,48 s | 3,0 s | 369 | 0,0003 |
| Haiku, adaptiivinen low | Opas | 5,2 s (p90 8,6 s) | 6,7 s | 1 273 | 0,0007 |
| Haiku, adaptiivinen medium | Opas | 5,6 s (p90 12,0 s) | 6,1 s | 1 423 | 0,0008 |
| Sonnet 5.5 (tuotanto) | Opas | 0,69 s | 4,2 s | 320 | 0,0042 |

### Laatu

| Mittari | Haiku, ei ajattelua | Haiku, low | Haiku, medium | Sonnet 5.5 |
|---|---|---|---|---|
| Roolin rikkominen (Pulu) | 4/10 ("Livia tässä", kehotteen sisäistä puhetta) | 2/10 (varaumia: "en ole varma, joten jätän pois", "tietoni voi olla vanhentunutta") | 0/10 | 1/10 |
| Vakavat asiavirheet (Pulu + Kysy) | 6 (Finlayson näyttelijänä, Ponte Vecchio, Caunt, Marseille, Tampere 1779) | 1 (Finlayson näyttelijänä) | 1 (Finlayson näyttelijänä) | 2 (Tammerkoski 30 m, Marseille aloitti väärin) |
| Oppaan kierros toimi (15 pysähdystä) | 15/15 | 13/15 (Tampere päättyi 3 pysähdykseen) | 5/15 (Ljubljana ja Bergen: kierros ei alkanut, vain kysymys "Mitä haluaisit nähdä?") | 15/15 |
| Kohdevalinta | heikko (Media City, kongressikeskus) | hyvä (Bryggen, Rosenkrantz, Fisketorget, Prešeren, Tromostovje, tori, Lohikäärmesilta, linna) | Tampere hyvä, muut puuttuivat | hyvä |
| Oppaan asiavirheet | 6 (tuomiokirkon väri ja taiteilija, raatihuone, kauppahalli, Prešeren "ranskalainen", keksitty isoisä) | 2 (Pyynikki "eteläpuolella", Rosenkrantz "Bryggenin etelälaidalla") | 1 (Tampere-talo "Raili ja Reima Pietilä") | 0 selvää |
| Suomen kieli | kömpelö, kirjoitusvirheitä | parempi; "Themsen", "tampereelaiset", "I.M. Pei" | hyvä | luontevin |

### Johtopäätös

Ajattelu korjaa Haikun suurimmat laatuongelmat: roolin rikkominen loppuu ja asiavirheitä on selvästi vähemmän (low:lla
kolme, medium:lla kaksi vakavaa koko otoksessa). Hinta silti: aika ensimmäiseen näkyvään sanaan nousee 4–8 sekuntiin
(Sonnet 0,7–1,0 s), mikä on liikaa puhuvalle oppaalle ja Pulun chatille. Medium-tasolla oppaan kierroksen suunnittelu
epäonnistui kahdessa kaupungissa kolmesta. Kustannus pysyy noin 12–15 kertaa Sonnetia pienempänä.

**Suositus pysyy:** Sonnet 5.5 tuotannossa. Haiku 5.5 low-ajattelulla voisi sopia taustatehtäviin, joissa viiveellä ei
ole väliä (esim. kohdelistojen esihaku, Kysy-kysymysehdotukset välimuistiin), oman testin jälkeen. Finlaysonin
sekaannus toistui kaikilla Haiku-asetuksilla, joten Pulun aineistokonteksti (kaupunki) ei riitä Haikulle ohjaamaan
oikeaan henkilöön.

Raakadata: `/Users/Shared/Claude/proto-3d/_tyo/haiku-vertailu/` (haiku-low.json, haiku-medium.json, vertaa.mjs `:low` / `:medium`).
