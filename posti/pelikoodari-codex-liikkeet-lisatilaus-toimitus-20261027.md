# Codex → Pelikoodari ja KK: kuusi uutta liikettä katseluun, 27.10.2026

Omistajan suorasta parkour-tilauksesta ja lisätilauksesta 1033–1042 on valmistunut ensimmäinen kuuden liikkeen tarkistuspaketti. Tämä on perusmallin osatoimitus peliin sovituksen arviointiin, ei koko liiketilauksen valmistuminen eikä lopullinen pelihyväksyntä. Viittamalliin sovitus ja muut tilatut leikkeet ovat vielä avoinna.

## Malli ja leikkeet

T7-kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/review-batch-v3/`

Tiedosto `puyi-perus-six-motion-review.glb`, 14 861 084 tavua. SHA256 `1ba798cb2dafdde2ad66802bc9add734c904e9e040323e5c55ae71a2e8cf7a57`.

Mukana ovat 12 vanhaa leikettä, kuusi uutta nimettyä leikettä sekä juuri toimitettu kengänpohjien ja nilkan korjaus. Geometriaa, luurankoa, painoja tai tekstuureja ei muutettu kenkäkorjauksen hyväksyttyyn pohjamalliin nähden. GLB ei ole gitissä.

| Uusi leike | Natiivikesto | Keskeinen sovitustieto |
|---|---:|---|
| slide_short | 0,60 s | Syvempi kyykky. Koko hahmo on alle 0,93 m noin 0,091–0,477 s. Alitus on kohdistettava puomiin, alku/loppu ovat juoksuasentoja. |
| slide_long | 1,20 s | Alitus alle 0,93 m noin 0,125–1,008 s; 0,60 s toistossa noin 0,063–0,504 s. |
| slide_feet_first | 0,60 s | Lantion aiempi noin 10 cm ilmarako korjattu: keskivaiheen kaavun tukialue noin 4 mm lattiasta. Siirtymän ilme tarvitsee vielä pelissä liikkuvan katselmuksen. |
| jump_small | 0,55 s | Paikallisen poosin alin saapas nousee noin 0,176 m. Ei yksin osoita 0,4 m kynnyksen ylitystä. |
| jump_long | 0,80 s | Paikallisen poosin alin saapas nousee noin 0,331 m. Ei yksin osoita 0,5 m esteen ylitystä. |
| taunt_run | 2,40 s | Juoksu jatkuu, ylävartalo ja pää kääntyvät taakse ja käsi heilauttaa. Jalkojen liike perustuu nykyiseen run-leikkeeseen. |

Kysymys hyppyjen peliohjaimen pystysuuntaisesta kaaresta on edelleen avoin. Säilyttäkää pituussuunta ja esteiden siirtymä peliohjaimessa; nämä ovat in-place-leikkeitä. Muutosten kuvasarjat ovat alikansiossa juoksupeli-liikkeet-20261027, kuusi aikaa sekä takaa yläviistosta että sivulta kutakin leikettä kohden.

## Tarkistus

Tavallisten liukujen ensimmäiset versiot olivat liian korkeita (noin 1,031 m). Korjatuissa keskivaihe on enintään noin 0,923 m. Avain- ja välipoosien tarkistuksessa ei todettu lattialäpimenoa näissä liu'uissa; vähäinen positiivinen saapasrako on noin 1–5 mm. Jalat edellä -liu'un välipoosien aiempi noin 2 mm lattialäpimeno korjattiin tiheämmällä ajoituksella.

Paketti oli aluksi 18,6 Mt. Vain uusien animaatiokäyrien tarpeettomia avaimia poistamalla se mahtui alle 15 Mt:n rajan. Tekstuurit ja vanhat leikkeet säilyivät tavutarkasti. Tiivistyksen 808 koko verkon näytteessä suurin mitattu kärjen muutos oli 0,112 mm.

taunt_run perii nykyisestä run-liikkeestä noin 3 mm:n hetkellisen lattialäpimenon. Sitä ei merkitä kontaktien osalta virheettömäksi. Kokonaisen liikkeen vaatteen läpilyönnit, jalkojen nopeus, äänen ajoitus ja tilasiirtymät on vielä tarkistettava pelissä. 39 999 kolmiota, yksi materiaali ja yksi piirtokutsu; ei uusia Tripo-kutsuja eikä krediittejä.

## Kiinniottoparin ensimmäinen koe

Lisätilauksen takaa kiinniotto on myös ensimmäisenä parikokeena: catch_back/caught_back 0,90 s sekä hold_back ja caught_hold_back. Molemmat lähderigit ja niiden vanhat leikkeet säilyvät. Vartijan juuren siirto Puyin juureen nähden on **(0, 0, −0,38) m**, suhteellinen kierto **0°**, +Z eteen. Molempien maailmamittakaava on huomioitu; vartijan vanha sisäinen juuriskaala säilyy mallissa.

Polut: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/work/paired-catch-back-v1/` → `puyi-caught-back.glb`, `vartija-catch-back.glb`, `PAIR-QA.json`.

Ranteet kohdistuvat toisen hahmon olkavarsien takapuolelle ja hahmot päätyvät yhteiseen pitoasentoon. Riippumaton katselmus ei kuitenkaan hyväksynyt varsinaista otetta: kädet peittyvät hihoihin/ylävartaloon, sormien tarttuminen ei näy varmasti ja loppu 0,54–0,90 s näyttää jäykältä. Ranteen kohdistus ei siis todista pintakontaktia. Tämä on edelleen korjattava työkoe. Älä korvaa sillä tuotannon hahmoja. Edestä/sivulta tulevat parit ja rimpuilut rakennetaan vasta vakuuttavan kontaktiperustan päälle.

Riippumaton katselmus jätti myös jalat edellä -liu'un nopeat siirtymät ja taunt_run-eleen pilkallisuuden/huutoilmeen auki. Kuvasarja ei korvaa jatkuvaa toistoa. Raportti second-review.json on mukana.

Kuittauspyyntö: tarkistakaa kuuden liikkeen ajoitus pelissä ja vahvistakaa hyppykaaren toiminta. Koko tilaus pysyy Codexilla työn alla, ei uutta animaatiotyötä toiselle tekijälle ilman koordinointia.
