# Junan 144 koe 0eb27a05 — rutiinitarkistus, OSITTAINEN (5.10.2026 15.49–15.53, iPhone-sim 1572C658)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna144-koe-20261005-1549/TODISTUS.md` (kopio repossa `todistus-juna144-koe-0eb27a05-20261005.md`).
Kone kuormassa (load 28,8 > 16) → toimintatesti, ei fps/laatu/A-V. 0 Exception, 0 VIRHE-riviä.

**Kuittausrivi: `juna144-koe 0eb27a05: OSITTAIN OK — kohdat 3 ja 4 + linnan Laituri OK; kohta 2 (Lukija William kuvaselite kaiutinnapista) EI TODENNETTU (oma skenaariovirhe), muut linnan muutokset EI TESTATTU.`**

| Kohta | Tulos |
|---|---|
| 3) Testimykistys natiivi | OK: `aani mykistys 1` → "mykistys päällä (… testimykistys unity päällä, natiivi päällä)"; ääntä ei Macin kaiuttimiin (ei radio-/astronauttilinssiä avattu) |
| 4) Asetukset datana | OK: `asetus` → "asetukset: oletukset (ei tiedostoa)" |
| 1) Linna: Laituri (≡ → Huoneet → Laituri oikeilla kosketuksilla) | OK: `kuunnelma laituri alkaa`, kuunnelman ääni laituri.wav 8 s mean −24,3 dB, max −6,9 dB |
| 1) Linna: latauspalkki nimiruudussa, Pulu vain napautuksesta, kertoja→keskustelu yhtenä, Cinemachine-kamera puhujaan, huonekortti otsikkoriviksi, laineet | EI TESTATTU (ei erillistä todistetta; ei stilliä nimiruudusta) |
| 2) Lukija William, kuvaselite kaiutinnapista | EI TODENNETTU: skenaario ei avannut astronauttilinssiä (`linssi satelliitti` ei tuonut taulua; still 02 = kartta), `tap 109 603` osui karttaan. Puuttuva lokirivi "kuvaselite luetaan" EI siis ole koodivika |
| Natiivi-wav (laituri-natiivi, kuvaselite-natiivi) | HUOM: 0,0 s — natiivikaappaus ei tuottanut dataa (mykistyksellä oletettavasti, tarkista todistusajon puolelta) |

**Seuraava:** uusi koe ec0038f4 (kutsuminiatyyri ei heilu panoroidessa; Mitä uutta -kortin versionumero). Ajan uudelleen, kun .app-polku ja simuvuoro (Julkaisija) tulevat: lisään kuvaselite-kaiutinnappi (linssin avaus ensin ja stillillä todennettuna), linnan latauspalkki-still heti avauksesta, kutsukortin panorointi, Mitä uutta -kortin versio, ISS-POISTU 10 tapia iPad-simussa 3B4CDACB.
