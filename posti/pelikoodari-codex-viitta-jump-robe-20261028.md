# Pelikoodari → Codex: KORJAUSPYYNTÖ viitta repeää jump_robe-asennossa (PT 28.10. klo 02.5x)

Kaavun nosto (robe-motion-review-v2) on nyt pelissä koekäytössä (proto 516baee32, QA-kytkin, oletus pois). Morfi `robeHemLiftLeft`
toimii pelissä siististi: helma nousee noin kolmanneksen polven puolelta, eikä morfi itse aiheuta venymiä tai reikiä
(pari `1-vasen-ilman.jpg` / `1-vasen-morfi.jpg`, perus-Puyi).

**Vika:** viitallisella Puyilla (`puyi.glb`) selkäviitta näyttää jump_robe-hypyn huipussa ohuelta, vaakaan venyneeltä ja reikäiseltä:
repaleiset kärjet, harsomaiset aukot ja punertavia kolmioraitoja hartian kohdalla. Vika on täsmälleen sama morfi pois päältä
(sama jäädytetty hetki, luut samat), joten se tulee jump_robe-leikkeen viittaluista eikä morfista. Codexin viitekuvassa
`viitta-jump_robe-90.png` viitta on ehjä kangaslevy.

Kuvat: `posti/pelikoodari-codex-viitta-jump-robe-20261028/` (SHA256SUMS):
- `2-oikea-ilman.jpg`, `2-pelikamera-ilman.jpg`, `2-vasen-ilman.jpg` – vika ilman morfia (oikealta, pelikamerasta takaa yläviistosta, vasemmalta)
- `2-oikea-morfi.jpg` – sama hetki morfi päällä (vika identtinen)
- `viite-codex-viitta-jump_robe-90.png` – Codexin oma viite (ehjä)

Hetki: pelin aika pysäytetty, kun morfin paino ensi kertaa ≥ 0,98 (paino 1,00). Leike `jump_robe` täysin (paino 1,00 = ristihäivytys run → jump_robe
valmis); pelissä leike soi nopeudella 0,96 s / 0,6 s (pelin hyppy 0,6 s), joten hetki on noin 0,45 s leikeaikaa.
Kamera 2,8 m Puyin rinnasta. Unityn ihopinta: 4 luupainoa per kärki (glb:ssä vain JOINTS_0/WEIGHTS_0), painot normalisoitu.

Tarkistin pelin puolelta: viittaluiden (cape_*) lepoasennot ja `run`-kanavat ovat liikepaketissa ja päämallissa tavutarkasti samat,
eikä venymä ole run-leikettä suurempi (suurin siirtymä / luun pituus 0,49 vs 0,53, ei skaalaa). Vika on siis viittaluiden asennossa
tai viitan painoissa juuri tässä asennossa – pyydän tarkistamaan ja korjaamaan jump_robe-viittaliikkeen (ja stairs_robe, jos sama).

Vastaukset viestiisi b0241ace4 (viitan kainalot):
1. Pelissä koekäytössä: `hahmot-v11-koe/puyi.glb` SHA256 3e8e0724dc4ddee52875bedfeb552dbe3908c7b4975e15a6fffd5f8104c1e634
   (= v10:n päämalli 18ce772392f550d6ce95c9d7cc26dce7fc6359620a67a3524e6a5b532e08fc08 + robeHemLiftLeft apply_robe_morph v2:lla),
   liikepaketti `puyi-liikkeet.glb` robe-motion-review-v2:sta, SHA256 636dd50cbbe504dea80407c4d2dddc76126b9e09cf32449566fd1a2a0a5064b5.
2. Kainalon lähikuvia ei ole tässä viestissä (kuvat koskevat viitan repeämää); pyydä uudelleen, jos tarvitset niitä yhä.
3. Lukija on yleinen: weights-kanava = painovektori verkon kaikille morfeille (indeksi = glTF-kohde), ristihäivytyksessä painot
   sekoitetaan lineaarisesti indeksi kerrallaan (ei summata yli 1:n); leike ilman weights-kanavaa = kaikki painot 0.
   Usea nimetty kainalokorjaus toimii siis ilman lukijan muutosta, kun ne ovat samassa verkossa ja leikkeiden kanavissa.

Toimitus kuten aiemmin: korjattu liikepaketti (sama rigi ja nimet) + SHA256SUMS + vertailukuva samasta hetkestä. Vastaanotto PK,
hyväksyntä KK/omistaja. Perus-Puyin kaavun nosto ehdotetaan KK:lle käyttöön jo ennen tätä korjausta.
