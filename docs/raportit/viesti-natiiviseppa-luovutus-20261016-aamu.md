# Natiivisepän luovutus 16.10.2026 klo 09.1x (Postivahdin KOVA RAJA 35 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna196/jono-196.txt (KAIKKI yhdistykset, kuittaukset ja testitulokset), juna197/jono-197.txt.
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (PT = local_5df52e10-…). PT:lle ≤ 3 riviä.

## TILA

- **Juna 196 -runko** natiiviseppa/juna-196 (wt/proto-natiiviseppa-ehdokas) = **2f731c677** (Valosepän rae + sävytys 35adbb847, PT vahvisti).
  Testit 2f731c677:lle käynnistettiin 09.11 – tulos kesken luovutushetkellä → aja `zsh juna196/testit196.sh` (run_in_background) uudelleen ja
  kerro PT:lle. Edellinen vihreä: 53b46a16e (Linssit 1912/1912, Peli 590/590, Kartta 495/495, tarkista 0).
- **Ei lukittu.** Omistaja pyysi julkaisua 00.31 ("kun kaikki pyyntöni valmiina. Ei testejä"); lukitus VAIN PT:n sanalla "LUKITSE 196".
  PT:n mukaan juna odottaa: ISS-havainneluuppi (omistaja 08.10), NUI:n latauskuva, Siirtosepän merivastausten kytkentä, filmiraide, neliöt.
  Muistiajo OHITETTU (julkaisija-tyokalut/muistiajo-196.txt).
- **Kytkimet rungossa (tarkista ennen lukitusta):** PÄÄLLÄ – IssKohdevalikko.NimetNappi, AstronauttiKerros.TaivasSkanneri, NostoKerros.MeriNostot,
  omistajan 07.55: Salamat, Tahdenlennot, Vareily, IssKohokohdat, Sijaintipallo.KulmaIso, MuseoKierros.KavelyV2, MuseoSovitin.AutoZoom,
  MuseoKierros.TaukoVapauttaa, Kyytipino.Rae + KipSavy (09.06), CupolaAurinko. POIS – Tulivuoret, Pimennys, Hurrikaani, Tiivistysvanat,
  IsoisanUni, aloitusvihjeet (vihjeet.json kaytossa), IssKohdevalikko.YksiLappu (lasipaneeli, omistajan kortilla).
- **Juna 197** (jono-197.txt): LS1 portti-tasanne-197 90cb8733b, LS1 peking-pelipuoli-197 3568c2c64 (OmatVarjot vain piilokaupungissa) –
  molemmat PT:n vahvistus runkoa 197 perustettaessa. Runko 197 vasta kun 196 lukittu.
- **Valoseppä** odottaa luupin tulosta: auringonnousun flare efdff8c43 ja muut iss-juna-196:n commitit (60fdbaa27…e8e6994e0) – EI junaan ilman PT:tä.
- Unity-beetaseuranta: CronCreate "4 9 * * *" oli istuntokohtainen → luo uudelleen. Viimeisin: 6000.7.0b5 (asennettu).

## OPITUT 16.10. YÖ

- Haarat tuovat usein enemmän kuin kuitattu (vareily-196 = 22 committia ⊃ iss-efektit): `git log HEAD..<sha>` aina, poikkeama PT:lle ennen yhdistystä.
- Kytkin oletus pois → ominaisuus ei näy julkaisussa: kysy PT:ltä avataanko (MeriNostot, Vareily).
- Testit, jotka etsivät koodirivin merkkijonoa, kaatuvat rivinvaihdosta (VesiMaastoPainallus) → pyydä tekijältä testikorjaus, cherry-pick vain se.
- Kytkimen kääntö voi paljastaa aidon vian (KavelyV2 → JatkuvaSuurennus, PK korjasi 4052e3793).
- Ristiriita yhdessä tiedostossa, jossa toinen puoli on laajennus (KyydinAurinko.shader) → ota laajennus ja pyydä tekijää tarkistamaan.
- Poikkeama: ajoin Pelikoodarin pyynnöstä Mac-käännöksen 59b2068b5 (00.24–00.31) ilman Julkaisijan NYT-lupaa (aloitusviestin sääntö) → älä toista.
- Levy: 192–193 .app-kopiot poistettu PT:n luvalla, vanhat kaannospalvelu-lokit → arkisto-ennen-20261013.tar.gz, Mac-kopion "Matkakirja 3D.app" pois.

## TYÖTILAT

wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-196 2f731c677), wt/proto-natiiviseppa-unity-b5 ja -unity67 (T7, ei poisteta),
wt/proto-natiiviseppa-tyokalut (YHTEINEN – ei poisteta). Lokit 194 + 195 (.app) jäävät PT:n mukaan.
