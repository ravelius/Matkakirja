# Sisältökirjurin luovutuksen päivitys 10.10.2026 klo ~15.3x (tauon jälkeen)

Säännöt ja kanavat kuten `viesti-sisaltokirjuri-luovutus-20261010-yo.md` (ja sen viittaama `-ilta.md` §0). Codex-posti-cron luotu uudelleen (2d31df90, `17 * * * *`, session-only).

## Valmista
1. **70 v -vaihdot koottu** (60 kuvaa, GNQ = Monte Alén): `/Users/Shared/Claude/proto-3d/_tyo/sisaltokirjuri/maafaktat-maailma-20261010/korjaus/` (70v-vaihdot-kaikki.json, tilaus-korjaus-70v.md, kokoa70v.py); alue-JSONit päivitetty (kentät `70v_alkuperainen`, `70v`). Korjaustilaus Codexille postilaatikossa **8b391e945** (`posti/sisaltokirjuri-codex-korjaus-70v-20261010.md`); uudet kuvat `-v2`-polkuun jo toimitetuille. Eurooppa (20 pääkaupunkia) ei ole JSONissa.
2. **Codex-toimitukset tarkistettu** (erät 1–2, Sevilla, Olavinlinna s1): `docs/raportit/sisaltokirjuri-codex-toimitukset-tarkistus-20261010.md`. Hylättävät 11 toimitettua + 2 puuttuvaa (bratislava-1, riika-2) korvataan korjaustilauksella.
3. **Heikot faktat korjattu** 94 kohteelle (6 Sonnet-agenttia): rajan pituus arkistoidusta Factbookista (merkitty), vakiluvut/pinta-alat Maailmanpankista/tilastovirastoista, pääkaupunkien luvut, ajankohtaiset poliittiset väitteet pysyviksi (Haiti, Nauru, GAB, NER jne.). Alue-JSONit + `eurooppa-14-maafaktat.json` päivitetty samoin tiedostonimin; `heikot/varmistamatta.json` listaa 74 kohdetta joilta jäi kenttiä varmistamatta (pääosin citypopulation.de-lähteiset kaupunkiluvut).

## Avoimet
- Erät 3–6 (Afrikka, Aasia, Amerikat, Oseania) odottavat Codexia; kun tulevat, tarkista silmin ja 70 v -rivi; korjaustilaus koskee niitä jos alkuperäinen jo generoitu.
- Sivuhuomio: Guyanan vakiluku 835 986 vs. laskenta 878 674 (ei työlistalla); Israelin pinta-alan huom (Itä-Jerusalem/Golan sisältyvät).
- Vanhat: tähdet iso v4, Olavinlinna-pintakoe (artefaktit), PR #4326 pidossa, Raamatun siivous vaihe 2, worktree `wt/sisaltokirjuri-olavinlinna-esihistoria` poistettava, kontaktiarkki ei commitoitu.
