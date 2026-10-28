# Pelikoodari → Codex: KORJAUSPYYNTÖ glide_loop – viitta siiviksi, ei suoria käsiä (KK 28.10. klo 12.2x)

KK:n päätös: liidon keskivaiheen "T-asento" korjataan Codexilla. Pelin puolella glide_enter ja glide_exit ovat jo käytössä
(proto 6556d0e97), ja ne näyttävät hyviltä; vika on `glide_loop`.

**Vika:** spurttiviitan liidossa (viitallinen Puyi `puyi.glb`) `glide_loop` pitää kädet suorina vaakaan koko liidon ajan,
vartalo pystyssä ja jalat suorina roikkuen. Viitan hihat näkyvät litteinä vaakapalkkeina – pelikamerasta takaa se näyttää
jäykältä T-asennolta, ei liidolta. Pelissä liito kestää 1,9 s (hyppy katon reunalta 3,4 m:stä maahan, 12 m).

**Toive (KK):**
- viitta levittyy SIIVIKSI (kangas jännittyy käsistä/hartioista taaksepäin ja sivuille, kevyt lepatus),
- kädet VIISTOSSA ALASPÄIN (noin 30–45° vaakatason alapuolella, kyynärpäät hieman koukussa) – ei suoria käsiä missään liidon ruudussa,
- vartalo kevyesti etukenossa, jalat hieman koukussa yhdessä (ei suorina roikkuen),
- sama hahmo ja liikepaketti kuin jump_robe-viitassa (sama rigi ja solmunimet, cape_*-luut).

**Pelin käyttö:** `glide_enter` (1,04 s) soi 2× nopeudella liidon alussa (0,52 s), sitten `glide_loop` silmukkana, `glide_exit` 2×
nopeudella 0,52 s ennen alastuloa, sitten `land_soft`. Siirtymät ristihäivytetään 0,25 s. Jos muutat loopin asentoa, sovita enter
alkamaan hypyn asennosta ja päättymään uuteen looppiin sekä exit alkamaan loopista (glide_left/right valinnaisia, peli ei käytä niitä).

Kuvat `posti/pelikoodari-codex-glide-loop-siivet-20261028/` (SHA256SUMS):
- `1-glide-loop-yksin-3ff939c35.jpg` – 8 ruutua liidosta pelkällä glide_loopilla (vika näkyy koko liidon)
- `2-enter-loop-exit-6556d0e97.jpg` – nykyinen: enter ja exit sulavat, keskiruuduissa yhä suorat kädet
- Video (Macilla): `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kaapu-kk-20261028/liito-6556d0e97/liito-6556d0e97.mp4` (hyppy → laskeutuminen)

Pelin tiedostot (hahmot-v10-koe):
- `puyi.glb` SHA256 18ce772392f550d6ce95c9d7cc26dce7fc6359620a67a3524e6a5b532e08fc08 (glide_* tästä)
- `puyi-liikkeet.glb` SHA256 158489bcedc2d5e9083fd7f067a384df308c2b4b42a3363769d253b695d017c5 (liikepaketin leikkeet korvaavat
  päämallin samannimiset)

**Toimitus:** kumulatiivinen liikepaketti `puyi-liikkeet.glb` (nykyiset leikkeet + korjatut `glide_enter`/`glide_loop`/`glide_exit`,
sama rigi ja nimet) + SHA256SUMS + vertailukuva (vanha vs uusi glide_loop takaa yläviistosta ja sivulta). Vastaanotto PK,
hyväksyntä KK: tavoite liitoarkki 8/8 ruutua ilman T-asentoa.
