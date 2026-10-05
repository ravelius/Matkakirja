# Junan 144 lopullinen koe 74a8609f (app 3607fe70) — napautuspolku, PUUTE (5.10.2026 19.11–19.25, iPhone-sim 1572C658)

TODISTUS.md-ajot (4 kpl): `/Users/Shared/Claude/proto-3d/lokit/todistus-juna144-74a8609f-20261005-1911/`, `…-b-20261005-1914/`, `…-c-20261005-1918/`, `…-d-20261005-1922/` (kopiot repossa `todistus-juna144-3607fe70-{1,4}-20261005.md`).
Kone kuormaton ajon alussa (load 15,6 < 16). 0 Exception, 0 VIRHE-riviä kaikissa neljässä. Haara 74a8609f sisältyy käännökseen.

**Kuittausrivi: `juna144-koe 74a8609f (3607fe70): PUUTE — ISS-ohjaamo ei ole testattu (opas ei sulkeutunut puhtaasti / satelliittilinssi ei avautunut), kartta jää tyhjäksi oppaan sulkemisen jälkeen; Vaihda kohde -polku loppuun asti ja chat-vastaukset testaamatta; muut OK.`**

| Kohta | Tulos |
|---|---|
| Natiivi testimykistys (`aani mykistys 1`) | OK: "unity päällä, natiivi päällä" kaikissa ajoissa |
| Asetukset datana | OK: "oletukset (ei tiedostoa)" |
| Elävä opas aukeaa (kehittäjätila, `opas testi 1`, Kööpenhamina) | OK: `opas: auki, data Google, TESTI`; Cesium-3D-näkymä, kortti "Olen Livia, pulu…", 7 pysähdystä ~40 s:ssa (Raatihuone, Tivoli, Christiansborg, Musta timantti, Vor Frelsers Kirke, CopenHill, Ooppera), napit: chat, kynä, ≡, kaiutin, näppäimistö, mikki |
| Kartussi "ISO-BRITANNIA" ei näy oppaan aikana | OK (ajo 1 ja 2: ei näy; ajo 3:n "näkyy yhä" oli Vaihda kohde -listan rivi "Iso-Britannia", ei kartussi). Matkakirjakorttia ei näkynyt stilleissä |
| Oppaan ≡-valikko | OK: "Vaihda kohde ›" ja "Poistu linssistä" (still `…-opas-valikko.png`) |
| Vaihda kohde: maanosat → maat | OSITTAIN OK: maanosat (Aasia, Afrikka, Etelä-Amerikka, Etelämanner, Eurooppa, Oseania, Pohjois-Amerikka, Valtameret), Euroopan maat aukeavat. **HUOM/löydös:** maalistassa näkyy koodeja nimien tilalla: "ALD", "AND", "FRO", "GIB", "IMN" (still `…-vaihda-kohde-maat.png`) — Ahvenanmaa/Andorra/Färsaaret/Gibraltar/Mansaari puuttuvat nimet. Maa → kaupunki → vaihto jäi testaamatta (maa/kaupunki ei näkyvissä ilman vieritystä; tap-teksti ei löytänyt Ranskaa/Pariisia) |
| Poistu linssistä | OSITTAIN: opas sulkeutuu (`opas: kiinni`, kartta + Liiku näkyy), mutta **kartta on tyhjä** (vain taustaväri + lintu, ei laattoja/paikkoja) vielä ≥ 18 s myöhemmin (stillit `…-poistu-tyhja-kartta.png`); `linssi satelliitti` ei avannut taulua tämän jälkeen (ISS-ohjaamoa ei saatu auki) |
| ISS-ohjaamo (Cupola → ohjaamo, LCD, kuvat) | **EI TESTATTU**: ajoissa 1–2 opas oli yhä auki (`linssi pois` ei sulje opasta), ajossa 4 kartta tyhjä oppaan jälkeen |
| Ääni | EI MITATTU: opas testitilassa ilman ääntä; `aani mittaa` hiljaista (odotettu) |
| Chat-vastaukset (kaksi vastaussirua), puhu/kirjoita, tunnus Pöllöstä, toive | EI TESTATTU |

**Seuraava:** tarvitaan (a) onko tyhjä kartta oppaan sulkemisen jälkeen tunnettu/muistikorjauksen sivuvaikutus (Linssiseppä/Natiivi-UI), (b) maalistan koodit (ALD/AND/FRO/GIB/IMN) nimiksi, (c) uusinta ISS-ohjaamolle tuoreella pelillä ilman opasta ja chat/puhu/kirjoita-kohdille (+ iPad 00008103 10 min opas-mittaus, jota en voi ajaa ilman IPAD NYT -vuoroa).
