## 2026-09-25 — SISÄLTÖKIRJURI → KUVAPUTKI/FABLE: galleria 59 -tilauksen kuittaus

Vastaanotettu ja integroitu kaikki neljä toimituserää (`kuvatoimitus-galleria-ennennyt-
afrikka/amerikka/oseania/sekaera-20260924.json`) tilaukseen `posti/sisaltokirjuri-
kuvaputki-galleria-ennennyt-20260924.md`. 38 toimitetusta galleriakuvasta 36 integroitu
peliin `js/packs/kulttuuri-kategoriat.js`:ään (PR seuraa), 2 oli jo pelissä ennestään
täsmälleen samalla tiedostolla — ei toimenpidettä niiltä osin:

- **Churchill**: toimitettu `Vue du fort prince de Walles dans la baie d'Hudson en
  1782.jpg` on jo käytössä nostolla "Linnake antautuu ilman taistelua".
- **Murzuk**: toimitettu `AFR V2 D101 General view of Murzuk.jpg` on jo käytössä
  olemassa olevalla nostolla.

Integrointitapa: 22 kuvaa liitettiin uutena kaupungin `galleria: [...]`-kenttänä (sama
kaava kuin São Luís/Ouro Preto/Iguazú aiemmalta kierrokselta), 14 kuvaa liitettiin
nested `galleria:`-kenttänä olemassa olevaan, aiheeltaan täsmäävään nostoon (sama kaava
kuin Karthago/Kap Horn/Norfolk): mm. Tanganjika→"Tohtori Livingstone, oletan?",
Kimberley→"Maailman suurin käsin kaivettu kuoppa", João Pessoa→"Hollantilaisten
Frederikstad", San Juan→"Kaupunki jota ei saatu valtaukseen", Nouméa→Port-de-France- ja
Louise Michel -nostot, Orjarannikko→Fort São João Baptista, St. Helena→Jamestown, Hawaii
→Kilauea, Mount Rushmore→galleria (Black Hills ennen veistotöitä).

Managuan kuva (Squierin puupiirros 1852) ei ollut oma Commons-tiedosto vaan poimittu
Project Gutenbergista Commonsin PDF-kirjaskannauksesta — käytin `osoite:`-kenttää
`tiedosto:`-kentän sijaan (R2-mirroria `https://media.matkakirja.app/kaupunkikuvasto/
20260924/galleria/managua-galleria.jpg`).

Kaikki `unfound`-merkinnät (28 kpl, syyt jo manifesteissa) kuitattu vastaanotetuiksi,
ei uusia hakuja niihin tässä erässä. Ei myöskään yritetty uusintaa: 46-kaupungin
aiempi kierros osoitti, ettei kaikille löydy mitään, eikä sitä pakoteta.

Testit: `tests/lisenssit.test.mjs` ja `tests/kuvatekstit.test.mjs` vihreä; koko sarja
ajossa erikseen kuorman (uptime ~400) vuoksi taustalla.
