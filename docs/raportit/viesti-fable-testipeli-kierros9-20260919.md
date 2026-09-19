# Testipeli, kierros 9 (Sonnet local, 19.9.2026 klo 18.41–18.52 Suomen aikaa)

Tuotanto v1960 (päivitysikkuna 18.41: "Alankomaat 29 nostoa ja 80 rahavisaa 8 EU-maahan"), kehittäjätila, iPhone 18 Pro -simulaattori (Safari), 390 px -näkymä, yksi välilehti, äänet POIS. "Maailma"-kytkin PÄÄLLÄ 18.42–18.44 (Wien → Berliini) ja 18.44–18.46 (Berliini → Amsterdam); POIS molemmilla kerroilla (varmistettu ratasvalikossa). Haara `sonnet-local-kierros-9`, kuvat `docs/raportit/kaappaukset/kierros9-20260919/01–02-*.jpg`.

## 1. Rahavisat — EI TESTATTAVISSA: laatikkoa ei näy

Avasin Alankomaiden kartalta (Amsterdam) neljä nostoa kokonaan (kortti auki, LISÄÄ, vieritys loppuun): **Texel, Leiden, Gouda, Kinderdijk** sekä Biesbosch. Koodin mukaan (`js/packs/hahmotelma-nld.js`, kentät `visa`) visa on tietueissa Texel, Leiden, Gouda, Oostvaardersplassen, Naarden, Oudewater, Keukenhof, Urk, Cruquius, Enkhuizen (10 kpl). Texel, Leiden ja Gouda kuuluvat niihin.

**Tulos: kolmessakaan visallisessa nostossa ei näy "LUKIJAN KYSYMYS … +25 puntaa" -laatikkoa.** Kortin järjestys on: kuva(t) + kuvatekstit → teksti (2 kappaletta) → "KYSY VIISAALTA PÖLLÖLTÄ PULULTA" + 2 kysymysnappia → lähde. Visalaatikkoa ei ole missään kohdassa (kuva 02: Goudan kortti alalaitaan vieritettynä; Texelin kortti läpikäyty ylhäältä alas). Siksi:
- vastausta oikein/väärin ei voitu kokeilla,
- rahapillerin (£0 koko ajan) muutosta ei voitu mitata,
- "toinen avaus ei maksa uudelleen" -vartiota ei voitu testata,
- laatikon ulkoasua 390 px:llä ei voitu kuvata.

Vakavuus **2**. Perusteltu epäilys (ei varmennettu koneella tässä sessiossa): `js/fokusnosto.js` `piirraNostonVisa` kutsuu `nostonVisa(nosto)` ja lukee `nosto.visa`; `js/fokuskohteet.js` ja `js/pallolauta/*` eivät mainitse sanaa "visa" lainkaan, joten pallolaudan kohdeketju (KOHDE_MAAT → kortti) voi pudottaa `visa`-kentän. Pulun valmiit kysymykset kortin lopussa toistavat visan aiheen (esim. Gouda: "Missä Goudan juusto valmistetaan?"), eli sama sisältö on siis näkyvissä pulun kysymyksenä mutta ei kolikkovisana. Ehdotus Opukselle: Playwright-vartija, joka avaa `hahmotelma-texel` (ja 9 muuta) ja väittää `.fokusnosto-visa` DOMissa.

## 2. Saksa — sisältö luettu

- **Bad Ems** (Berliinin kartalta, kohdemaan pisteet): kortti avautuu, kuva (Kurhaus, Franzfoto, CC BY-SA 3.0, lähde- ja lisenssilinkit toimivat), teksti 2 kappaletta (Lahn, kylpylä, Emsin sähke 1870), 2 kysymystä ("Mikä Emsin sähke oli?", "Miksi Bad Ems oli kuuluisa kylpylä?"), lähde en-Wikipedia "Bad Ems" 19.9.2026. **OK.**
- **Zugspitze** (Saksan kartalla): kortti avautuu kuvalla (Treeem, CC BY-SA 4.0), teksti 2 kappaletta (2 962 m, ensinousu 27.8.1820), 2 kysymystä, lähde en-Wikipedia "Zugspitze" **27.8.2026**. **OK.**
- **Rügen**: kartalla nimi näkyy (Rügeni…) mutta en avannut sitä.

## 3. Muut havainnot

- **Vaalea suorakulmio (kuva 01):** Wienistä loitonnettaessa (Itävalta/Slovenia/Unkari, maailma-tila) Alppien eteläpuolella, Itävallan rajan ja Balatonin välissä, on **vaalea, kermanvalkoinen suorakulmio** (n. 170 × 70 px kuvassa) reliefin päällä — samanlainen kuin kierroksen 7 vaaleat laatat. **Vaaleat laatat toistuvat siis v1960:llä.** Ne eivät näkyneet 8a/8b-kierroksilla. Vakavuus 1–2, viedään Opus 1:lle topografia-/seepiapohjan tutkimukseen (PAATOKSET 46).
- **Kinderdijk:** kortti toimii (kuva, kuvateksti, teksti, 2 kysymystä, lähde en-Wikipedia 19.9.2026). **Gouda:** kuva on **pystykuva**, joka täyttää 390 px:llä lähes koko ruudun (kuva ~1 000 px korkea) — kortin sisältöön pääsee vasta LISÄÄ-napilla ja kortti on korkeampi kuin muut; ei virhe.
- Heiligenkreuz (Itävalta) uudelleenavattu: sisältö ennallaan, OK.
- Wienin ja Berliinin saapumiskortit ja Ohita toimivat (Ohita ja Liiku eri paikoissa).
- **Version tarkistus:** päivitysikkuna 18.41 näytti v1960, en avannut ratasvalikon versiota.

## Simulaattorin tila

Amsterdam, Alankomaiden kartta, £0, Päivä 1 keskipäivä, ei noppaa, maailma POIS, äänet POIS, yksi Safari-välilehti.
