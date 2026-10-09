## 2026-10-09 — SISÄLTÖKIRJURI → CODEX: KAKSI TARKKUUSUUSINTAA (tahdet + ihmisen-matka-2; mini ja iso, 4 kuvaa)

Pariisin nykyintron C1–C4 on jo toimitettu (tarkistus kesken); nämä tehdään seuraavina. Peli opettaa, joten kuvien sisällön on oltava oikein. Nykyiset kuvat jäävät käyttöön, kunnes nämä on tarkistettu. **Generointilupa: 4 kuvaa** (yksi per kohde, ei lisävariantteja; Päätoimittaja on antanut luvan).

Yhteiset muotoehdot kuten edellisessä erässä: **fotorealistinen havainnekuva**; mini **512 × 512** JPG q90 sRGB (pääaihe keskellä, pyöreä rajaus keskeltä toimii), iso **1600 × 900** JPG q90 sRGB; ei tekstiä/numeroita/logoja/vesileimaa, ei ihmisiä eikä kasvoja; mini ja iso samasta aiheesta ja samassa sävyssä; metatietoihin "Havainnekuva. Tekoälyllä tuotettu, ei valokuva." ja kuvateksti päättyy sanaan "Havainnekuva."

---
### 1. `tahdet` (mini + iso): OTAVAN GEOMETRIA OIKEIN
Edellisessä toimituksessa (`…-foto-mini-v2`, `…-foto-iso-v2`) tähtikuvion kulmat ja etäisyydet olivat väärät. Nyt annetaan **referenssi, joka on piirretty oikeista tähtikoordinaateista** (Yale Bright Star Catalogue, J2000; pelin oma aineisto `js/packs/linssi-tahdet.js`): liite **`posti/liitteet/otava-referenssi-20261009.png`** (puhdas, 1600 × 1600, tähtien koko = kirkkaus) ja **`posti/liitteet/otava-referenssi-merkitty-20261009.png`** (sama, nimet ja magnitudit näkyvissä; **ei saa näkyä tuloskuvassa**).

**Ehdot (pakollisia):**
- Aihe: Otava (Iso Karhun seitsemän tähteä) + Pohjantähti yöllä järven yllä. **Säilytä referenssin tähtien keskinäiset kulmat ja etäisyydet täsmälleen** (sama kuvio, ei peilausta, ei venytystä; kuvion saa skaalata tasaisesti ja siirtää, mutta kierto enintään ±10° referenssin suunnasta, Pohjantähti Otavan yläpuolella).
- Tähtien paikat referenssikuvassa (pikseleinä, 1600 × 1600): Pohjantähti (809, 399); Dubhe (992, 983); Merak (1035, 1094); Phecda (889, 1186); Megrez (818, 1115); Alioth (702, 1133); Mizar (607, 1140); Alkaid (488, 1245). Kauha = Dubhe–Merak–Phecda–Megrez (neljäkulmio), kahva = Alioth–Mizar–Alkaid. Pohjantähti on Merakin ja Dubhen kautta vedetyn suoran jatkeella, noin 5,3 × Merak–Dubhe-etäisyyden päässä Dubhesta. Kulmaetäisyydet: Dubhe–Merak 5,4°, Merak–Phecda 7,9°, Phecda–Megrez 4,5°, Megrez–Dubhe 10,2°, Megrez–Alioth 5,4°, Alioth–Mizar 4,4°, Mizar–Alkaid 6,7°, Dubhe–Pohjantähti 28,7°.
- Kirkkaus: Megrez on selvästi himmein seitsemästä (mag 3,3); muut kuusi ja Pohjantähti ovat kirkkaita (mag 1,8–2,4). **Täsmälleen seitsemän Otavan tähteä ja yksi Pohjantähti** (ei kahdeksatta kirkasta tähteä kuvion sisällä tai sen välittömässä läheisyydessä); muu tähtikenttä saa olla himmeää taustaa kuten referenssissä, mutta ei muita yhtä kirkkaita tähtiä lähelle kuviota.
- **Ei yhdysviivoja, ei katkoviivoja, ei nimiä, ei kirjaimia.**
- Mini: pieni messinkinen kaukoputki mäellä alaosassa, järvi ja horisontti alimmassa neljänneksessä; kuvio ja Pohjantähti kokonaan ympyrän sisällä (kuvion korkeus enintään noin 60 % kuvasta). Iso: sama maisema ja sama kuvio leveämpänä (kuvio keskellä).

---
### 2. `ihmisen-matka-2` (mini + iso): LEVIÄMISREITTI NÄKYY SELVÄSTI
Nykyisissä kuvissa on päivämaapallo ja valokeila mutta reitti ei näy. Nyt reitin pitää olla kuvan **pääaihe**: nykyihmisen leviäminen **Afrikasta Aasiaan, Eurooppaan, Australiaan ja Amerikkaan** **hohtavina kaarina** (valopolkuja) maapallon päällä. Kaaret kulkevat pelin omien löytöpaikkojen kautta (aineisto `js/linssit/ihmisen-matka-data.js`); **referenssikaavio** (kaavio, ei maanpeitettä, ei kopioitava tyyli): **`posti/liitteet/ihmisen-matka-reitit-referenssi-20261009.png`** (nimet ja vuodet kaaviossa **eivät saa näkyä tuloskuvassa**).

**Reitit (alkupiste → solmut → päätepiste):**
1. **Pääreitti:** Itä-Afrikka (Omo Kibish, 4,8°N 36°E) → Arabia (Al Wusta, 28,3°N 41°E) → Etelä-/Kaakkois-Aasia (Lida Ajer, Sumatra, 0°N 101°E) → **Australia** (Madjedbebe, 12,5°S 133°E) → Lake Mungo (33,8°S 143°E).
2. **Pohjoinen haara:** Arabia → Keski-Aasia (Denisova, Altai, 51°N 85°E) → Itä-Aasia (Tianyuan, 40°N 116°E).
3. **Eurooppa:** Arabia → Balkan (Bacho Kiro, 43°N 25°E) → Etelä-Ranska (Chauvet, 44°N 4°E).
4. **Amerikka:** Altai → Siperia (Yana, 71°N 135°E) → **Beringia** (66°N, 169°W) → Pohjois-Amerikka (White Sands, 33°N 106°W) → **Etelä-Amerikka** (Monte Verde, 42°S 73°W).

**Värikoodaus ajasta (ei tekstiä!):** kaaret hohtavat vanhimmasta nuorimpaan **syvästä kullasta (Afrikka, yli 100 000 v) → oranssi/kulta (70 000–50 000 v) → vaalea keltainen (45 000–35 000 v) → valkoinen (noin 20 000 v) → kylmä vaaleansininen (Etelä-Amerikka, 14 500 v)**. Solmuissa pieni valopiste. Ajat kirjataan pelissä kuvan päälle; kuvaan ei saa tulla vuosilukuja.
- Tausta/maapallo: fotorealistinen päivänvalossa oleva Maa (ei yötä, ei kaupunkivaloja); maanosat ja rannikot tunnistettavia ja oikeassa paikassa; kaaret ovat selvästi näkyviä myös pienessä kuvassa (paksuus vähintään noin 1 % kuvan leveydestä minissä).
- **Iso 1600 × 900:** **litteä, päivänvalossa kuvattu satelliittimosaiikki-maailmankartta** (Blue Marble -henkinen, fotorealistinen, ei piirros), **Tyynenmeren keskitys**: pituusasteet noin **0°E … 290°E (= 70°W)** koko leveydellä (Afrikan länsiosa ja Etelä-Amerikan länsirannikko vielä mukana), leveysasteet noin ±80°; Afrikka vasemmalla, Amerikat oikealla. Kaikki neljä reittiä (1–4) näkyvät kokonaan, myös Beringian yli Amerikkoihin. Ei ihmisiä, ei laivoja, ei tekstiä.
- **Mini 512 × 512:** **pyöreä maapallo päivänvalossa** (ei yötä), keskitys noin **40°N 105°E** (Eurooppa vasemmalla, Aasia keskellä, Australia alhaalla, Afrikka vasemmalla alhaalla, Beringia oikeassa yläreunassa); reitit 1–3 kokonaan ja reitti 4 Altailta Siperiaan ja **Beringiaan asti, jonka jälkeen kaari jatkuu pallon horisontin yli** (Amerikat jäävät horisontin taakse). Sama värikoodaus ja sama hohtavien kaarten tyyli kuin isossa; iso ja mini ovat saman maailman kaksi näkymää (litteä kartta / pallo), ei eri aiheita.

---
### Toimitus
- R2 `linssikatalogi/tahdet-foto-mini-v3.jpg`, `linssikatalogi/tahdet-foto-iso-v3.jpg`, `linssikatalogi/ihmisen-matka-2-foto-mini-v3.jpg`, `linssikatalogi/ihmisen-matka-2-foto-iso-v3.jpg` (tarkista julkinen URL `?t=`-parametrilla ennen latausta; älä ylikirjoita olemassa olevaa).
- Manifesti `posti/kuvatoimitus-tahdet-ihmisen-matka-uusinnat-20261009.json` (url, sha256, mitat, generationPrompt, käytetyt referenssit), kuvakooste `linssikatalogi/20261009-uusinnat-tahdet-ihmisen-matka-kooste.jpg`, kuittaus `posti/codex-fable-tahdet-ihmisen-matka-uusinnat-20261009.md`.
- **Kirjaa QA:ssa erikseen:** (tähdet) mitattu tähtien kulmapoikkeama referenssiin, kirkkaiden tähtien lukumäärä, mahdolliset yhdysjäljet; (ihmisen matka) mitkä reitit 1–4 näkyvät ja mitkä jäävät epäselviksi.
- Ei main-mergeä, versionnostoa, pelikytkentää eikä julkaisua Codexilta.
