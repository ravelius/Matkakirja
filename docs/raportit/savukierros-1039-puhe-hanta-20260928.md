# 1.0.39-juna (a479a462) savuke: EI PASS — löydös nostokortin lukijassa (Laitetestaaja, 28.9.2026 klo 20.1x)

iPhone 18 Pro (1572C658), asennus 19:54:31. Sisältö: natiivi-ui/puhe-hanta (hyppykorjaus +
Pulun pysäytys chatin sulkiessa), natiivi-ui/maan-loitonnus (koko maa kerralla -katto).

## 1. Nosto luetaan loppuun ilman kelausta — EI TODENNETTAVISSA, löydös estää testin

**Löydös: nostokortin lukijan napit sulkevat koko kortin sen sijaan että käynnistäisivät luennan.**

Toisto (3×, sama tulos joka kerta): `ui nosto skandaali:shakkiturkkilainen` → `LISÄÄ`-napautus avaa
täyden kortin (rivi `mk-lukija-rivi mk-nosto__lukija` oikeassa yläkulmassa, kaiutin x=356-376 y=88,7-
108,7 pt, valikkoikoni x=322,7-343,7). Napautus KUMMASSA TAHANSA näistä kahdesta ikonista (kaiutin
TAI valikko, koordinaatit tarkistettu `ui puu`:sta joka kerta, ei arvattu kuvasta) **sulkee koko
nostokortin ja palauttaa kartan** sen sijaan että käynnistäisi luennan tai avaisi lukijan valikon.
`puhe palat` pysyi "soitettu 0":ssa jokaisen yrityksen jälkeen.

Tämä on todennäköisesti tämän aamun "Kaksinappinen lukija kaikkiin luentakohtiin" -muutoksen
(5313075a, PR #3537) sivuvaikutus tälle build-yhdistelmälle — en löytänyt koodista täsmällistä
syytä (uuden lukijarivin nappien luokat `ui puu`:ssa eivät täsmää KortinLukija.cs:n koodissa
näkemiini `mk-lukija__ratas`/`mk-lukija--kortti`-nimiin, joten builtissa saattaa olla eri versio
kuin paikallisessa master-checkoutissani — en ehtinyt jäljittää tarkkaa committia).

**En siis pystynyt todentamaan "luetaan loppuun ilman kelausta" -vaatimusta, koska lukijaa ei
saanut käyntiin lainkaan nostokortilta.** Tämä on julkaisua estävä löydös jos vahvistuu — nostokortin
kuuntelu ei toimi ollenkaan tässä buildissa.

## 2. Pulu vaikenee chatin sulkiessa — PASS

Testattu kahdesti (xAI-kulutus: 2 uutta kysymystä, merkitty avoimuuden vuoksi):
- Ensimmäinen: kysymys + `ui chat aani` päällä, suljin chatin (`ui chat`) VÄLITTÖMÄSTI kysymyksen
  jälkeen ENNEN vastausta. Vastaus saapui myöhemmin taustalla, mutta **`puhe palat` pysyi
  "soitettu 0":ssa** yli 25 s ajan sen jälkeen — ääntä ei koskaan käynnistynyt, vaikka vastaus tuli.
  Täsmää korjauksen logiikkaan (`if (luentaHiljennetty || !Auki) PeruLuenta();`).
- Aiempi lyhyempi kysymys ehti soida loppuun ennen kuin ehdin sulkea (pala kesti vain ~2-6 s,
  liian nopea kiinni jäädäkseen kesken) — ei täysin puhdas "suljin KESKEN toiston" -toisto, mutta
  edellinen testi kattaa saman koodipolun (Auki=false estää sekä käynnistyksen että jatkon).

**PASS** sillä varauksella, ettei minulla ollut työkalua sulkea chattia TÄSMÄLLEEN äänen soidessa
(vain ennen/jälkeen vastauksen saapumista) — koodikatselmus + tämä testi yhdessä antavat kuitenkin
vahvan näytön korjauksen toimivuudesta.

## 3. Maan loitonnus (koko maa kerralla) — EI TODENNETTU (kuten Natiiviseppä ennakoi)

Ei debug-komentoa `Uloszoomauskatto`-arvon lukemiseen, ja oikea pinch-loitonnuseleen simulointi
`mcp__Claude_Code_iOS_Simulator__control`-työkalulla ei ole luotettavaa. Merkitään havainto
sellaisenaan Natiivisepän ohjeen mukaisesti — ei testattu tällä kierroksella.

## Sivuhavainto: Thessalia/maakuntakartta-vuoto Maapallon vuosi -linssiin

Samalla laitevuorolla vahvistin ja raportoin Linssiseppä 2:lle erillisen löydöksen (maakuntakartan
korostus jää näkyviin Maapallon vuosi -linssin läpi) — käsitelty jo erillisessä viestiketjussa,
ei toisteta tähän raporttiin.

## Yhteenveto Natiivisepälle

**EI PASS.** Kohta 1 (nosto luetaan loppuun) paljasti kortin lukijan olevan täysin rikki tässä
buildissa — napit sulkevat koko kortin. Kohta 2 (Pulu vaikenee) PASS. Kohta 3 ei todennettu
(odotettua). Suosittelen tarkistamaan nostokortin lukijan napit ennen BUILD 39:n vientiä — tämä
vaikuttaa kaikkeen nosto-sisällön kuunteluun, ei vain tähän testiartikkeliin.
