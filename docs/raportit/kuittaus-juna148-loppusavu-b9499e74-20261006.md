# Junan 148 loppusavu 385894e2 (app b9499e74) — OK, 2 kohtaa todentamatta (13.46–13.54, iPhone-sim 1572C658, mykkä)

TODISTUS.md: ajo a `/Users/Shared/Claude/proto-3d/lokit/todistus-juna148c-a-20261006-1346/`, ajo b `…-b-20261006-1350/` (kopiot repossa `todistus-juna148-b9499e74-{a,b}-20261006.md`). Kone kuormassa (load 35 > 16, Siirtosepän D5900D45 rinnalla) → toimintatesti. Simu oli tyhjennetty 12.26 → ensilataus hidas. **0 Exception, 0 VIRHE-riviä, 0 kaatumista** kummassakin. Testimykistys natiivi päällä.

**Rivi: `juna148-loppusavu 385894e2 (b9499e74): OK — käynnistys, kartta, ISS v3, opas (täkyt, lento, pysäkki, PCM-ääni, +7 kuvat, Kysy-paneeli, nappirivi, näppäimistö) ja Poistu → kartta ehjänä OK; 0 Exception, 0 kaatumista; linnan Laituri ja Liiku-nappi todentamatta.`**

| Kohta | Tulos |
|---|---|
| Käynnistys + kartta (ensilataus), ISS-ohjaamo v3, kartta ISS:n jälkeen | OK |
| Natiivi mykistys, asetukset datana | OK |
| Opas: täkyt alussa (8), valinta Akropolis → lento → pysäkki | OK: `opas: täkyt 8`, 3D-Ateena, "+7" kuvat + HAVAINNEKUVA |
| Oppaan ääni PCM-virtana | OK: `aani mittaa` rms **0,109** huippu 0,707, soivia `[LinssiOhjain:opas-pcm]` (alkoi ≤ 35 s, ääni oli lähde mitattaessa) |
| Kysy-paneeli | OK: "KYSY OPPAALTA" 6 kysymystä (Kuka rakennutti Parthenonin? …) (`…-kysy.png`) |
| Nappirivi: Kysy / Liiku / mikki / näppäimistö; ohjaintapit (korkeus, kierto) | OK ruudulla nappirivin yläpuolella (`…-nappaimisto.png`); näppäimistö-tap (333,778) ei avannut kirjoitusriviä stillissä → HUOM |
| **Poistu → kartta ehjänä (junan 146:sta avoin)** | **OK**: ≡ → Poistu (tap-teksti → (229,369)) → kartta, nimet, Liiku, Pulu ehjinä, ei tummaa vyötä (`…-kartta-oppaan-jalkeen.png`) |
| **Liiku-nappi (kaupunkikierros/lista)** | **EI TODENNETTU**: tap-teksti "Liiku" ei löytynyt ui-puusta (nappi on kuvakkeella/ilman tekstiä oppaassa; kartan "Liiku" on eri nappi); tarvitaan sijainti (259–303,756 → (99×44 -nappi x≈154–252, y≈778)) |
| **Linna (Olavinlinna) + Laituri** | **EI TODENNETTU**: nimiruutu "OLAVINLINNA · Savonlinna · 1475" + latauspalkki ~75 % näkyi 45 s kohdalla (`…-linna-latauspalkki.png`); linna ei ehtinyt latautua ensilatauksessa ennen huonevalikko-tappeja → `Laituri k1` puuttuu. Latauspalkki nimiruudussa OK |
| Mikki, valmisluennat, Pulu aloitusruudulla, siirto yli 30 km latausruudulla, Tietoja ja lähteet, kirjoitusrivi | EI TESTATTU |

Päätös VIE: Poistu → kartta ja opas OK, 0 Exception/0 kaatumista. Todentamatta jäi linnan Laituri (ensilataus) ja Liiku-nappi — pieni lisävuoro (≈3 min, linna ladattu) kattaisi ne, jos tarvitaan.

## Lisävuoro 13.58–14.02 (1572C658, mykkä, b9499e74): Laituri OK, Liiku-tap EI TODENNETTU
TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna148c-c-20261006-1358/` (kopio `todistus-juna148-b9499e74-c-20261006.md`). 0 Exception, 0 VIRHE-riviä.
- **Linna → Laituri: OK.** Linna latautui (60 s), ≡ → Huoneet → Laituri oikeilla kosketuksilla, `kuunnelma laituri alkaa`; kuvassa laituri, soutaja ja kaksi hahmoa, ei pop-up-kortteja (kortit vain napautuksesta) (`juna148-b9499e74-lisa-laituri.png`).
- **Liiku-kuvakenappi (203,778): tap lähetetty, mutta stillissä ei näkynyt muutosta** (nappirivi ennallaan, ei listaa/kierrosta; `…-lisa-liiku-tap.png`). Joko Liiku avasi jotain, joka ehti sulkeutua, tai tap ei osunut; tarvitaan Natiivisepän kuvaus odotetusta käytöksestä (lista vs. kaupunkikierros) → HUOM, ei PASS.
