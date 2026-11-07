# Pelikoodari: luovutus 07.11.2026 klo 05.19

Korvaa kaikki aiemmat. Lontoo ja muut avoimet: `git show b19785a95:docs/raportit/viesti-pelikoodari-luovutus-20261107-0418.md` kohta 4 ja sen viittaamat kohdat (Lontoo E4, NUI:n `60ca73fad`, kartta odottaa LAV:n juuren nimeä). **Työ nyt: ei avointa; jono tyhjä, odota PT:n tehtävää.** Nollaus pehmeällä rajalla.

## 1. Juoksupeli, taso 1 (PT: lista valmis, ei junaan)
Proto `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `3ed82d1fb`, työnnetty `natiivi-backup`iin. Kuvat `/Users/Shared/Claude/proto-3d/lokit/`.
- **Rajaviesti:** näkyy (`pelikoodari-juoksu-y-3ba5bb57e/y1-raja`), loki `kynnysviesti raja`.
- **Ruukku:** rikkoutuminen näkyy (`pelikoodari-juoksu-z-3ba5bb57e/z1-isku`, ehjä `k2-reitti`). `292afcef2` ei junaan yöllä; pari KK:n aamun koontiin, omistaja näkee ensin. Väri: kuvissa G 162/182 (ehjä/rikottu), vierekkäin voi näkyä.
- **Taso läpi -kortti:** `4aa9ec365`. iPad nostettu (`...y-3ba5bb57e/t2-taso-lapi`, ei ajettu uudelleen, ehto koskee vain leveää ruutua), iPhone vaaka vasemmassa reunassa (`pelikoodari-juoksu-z2-4aa9ec365/t4-taso-lapi-iphone`): pää näkyy, kasvot ja hiha aivan kortin reunassa. PT: jää tähän, ei kolmatta yritystä. **NUI: muunnelma junaan vain omistajan päätöksellä (Raamattu 4.1), merge-pyyntöön maininta.** Vietiin PT:lle.
- **Pisteinen vyö (LAV:n löydös):** `3ed82d1fb`, yritys 1/2. Latvuksen häivytys `KuvausKamera`sta (pelaajan kuvan kamera myös pelissä), näkölinja vain 15 m:n sisällä, lokiin `latvus häipyy`. Ajo `pelikoodari-juoksu-z3-3ed82d1fb`: `z1-isku` ja `z2-rikki`: vyö ja ohut viiva poissa. Taso 1:n pelaaja näkisi vian; nykyinen peli ei, koska `VapaaMaailma` tulee päälle vain QA-komennolla.
- `PaivitaMuurikateC3`, LOD:n ulkopuoliset `KameraPaikka`-käytöt ja lähipuiden poolin raja jäivät vanhalle kameralle tarkoituksella; ei tarkistettu, näkyykö niissä sama ero.
- **Poikkeukset ajoissa:** 11 sekä `sk-z`:ssä että `sk-z3`:ssa; luetut rivit ovat Cesium ion latauksessa ja Unityn SearchDatabase, ei tästä korjauksesta. Kaikkia en avannut.

## 2. Eunukki otteessa: EI VIKA
OMISTAJAN PÄÄTÖS 27.10. 18.12. Uuvuit-kortti peittää keisarin pään: sama alue, ei muutettu.

## 3. Opit
- `kuva` ottaa noin 2 s seinäkelloa: osuman jälkeen kamera ehtii ohi. Pysäytä keisari osumaan: `ui juoksupeli elinvoima 3` ennen törmäystä (`sk-z.txt`).
- `tarkastelu` piilottaa `esteet`-puun, siis myös ulkoesineet.
- `KameraPaikka` on tasolla 1 vanha kamera, `KuvausKamera` todellinen kuva. Sana "kuvaus" ei tarkoita kuvausajoa.
