# C Resepti: taidemuseolinssi

*(Linssiseppä 21.10.2026, studiojako Raamattu 4.21. Raamattu 2.123, 2.202. Uuden maan museo: resepti "museo"
(Lavastaja) ja nykyinen pohja `docs/moduulit/tuotantopohjat/taidemuseon-maa.md`. Luvat ja vaiheet: D.)*

**Mikä:** virtuaalinen museo omalla 3D-näyttämöllään: joka salissa opastettu kierros, kamera lentää teoksesta toiseen,
kertoja taustalla, kortit ja kohdat teoksen päällä.

**Malli:** Louvre (`Resources/Museo/ranska/`: sali, teokset, kierros, kohdat, kohtazoom, kehysprofiilit, henkilöt, kyltit)
ja Rijksmuseum (`alankomaat/`); yksi moottori `Linssit/Ydin/Museo/MuseoKierros*.cs` + Unity `MuseoSovitin`, `MuseoRakennus`.
Pariteettitesti `MuseoPariteettiTestit` vaatii jokaiselta maalta Louvren tason.

**Kokoa näin**
1. Sali ja teokset datana (`sali.json`, `teokset.json`), kierros ja näyttelyt (`kierros.json`, `huoneet.json`).
2. Valo, kehykset ja sali: B 3D ja Valosepän osuus (kehysprofiilit `lv_*`, kullan sävy, kohdevalot).
3. Kertoja, kohdat ja kohtazoom Sisältökirjurilta ja Äänittäjältä (B tekstit, B ääni).
4. Henkilöt `henkilot.json` (mallit Codexilta), ei kameran kaarella (`MuseoLentoTestit`).
5. Kamera: lento teoksesta toiseen (`Lentokaari`) → A kamera, B kamera ja video; ei mustaa siirtoa.
6. Käyttöliittymä: Valitse näyttely, lasikortti, nimikyltti yhteisillä pohjilla (B UI).
7. Testit: `sh Linssit-testit/kaanna.sh Museo` (myös yksin ajettuina), pariteetti, lento ja kävijät.

**Valmis:** D:n tarkistuslista; pariteetti "Louvre-tasolla", laitekuva jokaisesta A-teoksesta tarvittaessa.
