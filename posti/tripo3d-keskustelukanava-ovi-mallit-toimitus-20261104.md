# Tripo 3D → Keskustelukanava: parioven mallit valmiina tarkistettavaksi

Tilaus #2029–2031, Lavastajan 4.11.2026 klo 14.47 tilaus; omistajan kuvahyväksyntä klo 14.46. Kolme GLB:tä on toimitettu alla olevaan kansioon. Tekninen tarkistus läpäisty; KK:n hyväksyntää, pelikytkentää tai junaa ei vielä väitetä.

Toimitus: `/Users/Shared/Claude/proto-3d/_tyo/codex/juoksupeli-ovi-20261104/mallit-v1/`
Fyysinen T7-kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-ovi-mallit-20261104/delivery/mallit-v1/`
Shared-polku on symlinkki T7:lle. Kaikki 21 toimitustiedostoa luettu takaisin Shared-polun kautta ja verrattu tavutasolla. Käynnistyslevylle ei jää tuotantokopiota.

| Malli | Kolmiot | Tavua | SHA-256 |
|---|---:|---:|---|
| ovi-karmi.glb | 48 | 54840 | 69608b8b152af7e2b6fdcf17712becdffbb683b0a7d291811ead89df328eda65 |
| ovi-lehti-vasen.glb | 2800 | 3475168 | fc3458b7a7cf27a46c8b3a8d1e02a3dcfacfb8da7092bf587a5f3cb1c30b889a |
| ovi-lehti-oikea.glb | 2800 | 3475168 | 79ed3cc55d7f5c11c8d8589d3c7e5a3b2104720171e5707303fde52867f33cda |

Yhteensä 5648 kolmiota. Metrit, +Y ylös, kaikki solmut nollatransformeilla. Aukko 2,4 × 2,65 m maasta yläpalkkiin; lehdet 1,2 × 2,65 m. Saranaorigot maassa. Karmi origoon, vasen X=−1.2, oikea X=+1.2; Y=Z=0. Ulospäin +Z avaus vasen Y=−90°, oikea Y=+90° (glTF-koordinaatit; Unity-tuonnin akselimuunnos huomioitava). Takana 6 cm kynnys, jonka päältä vapaa korkeus 2,59 m.

Lehdet ovat tarkat peilikuvat myös ristikon ja renkaiden osalta. Renkaat ovat vapaissa reunoissa eli kiinni ollessa keskellä. Molemmat puolet ja sivut mukana. Yksi 1024² PBR-sarja ja yksi materiaali/malli, OPAQUE, ei alfaa. Lehtien kolme tekstuurikuvaa ovat tavuiltaan identtiset: vastaanotossa niille voi käyttää samoja materiaali- ja tekstuuriresursseja. GLB:issä ei ole animaatioklippejä; peli kiertää jäykkiä lehtiä saranoilla.

Tuotanto: yksi Tripo H3.1 -generointi lehdelle ja yksi karmille, kaksi Tripo-retopologiaa. Karmi erotettiin generoidusta osamallista; repaleinen lähdegeometria korjattiin paikallisesti suoristamalla Tripo-yläpalkin poikkileikkaus ja muodostamalla siitä neljä suljettua palkkia, myös kynnys. Karmin alkuperäinen topologia ei säily. Lehtien tasopintojen väärä varjostus korjattiin normaaleista, ja keskisauman takakulmaan tehtiin enintään 1,331 mm avausviiste. Ei uutta kuvakierrosta. Kaikki raakalähteet säilyvät T7:llä; tarkka menetelmä ja jobid:t LAHTEET.md:ssä.

Krediitit: 45+60 generointeihin, 5+5 retopologiaan = 115. Saldo 16750 → 16635. Jobit: 33d65cf1-7fe4-47fa-8b63-336f851f2247, 8a39a025-665c-4b7e-a951-47dd552f9f03; maksuton karmiosan upload a0a647d0-6dc7-4773-ab81-847a4ec6d029. Ei ostoja tai uusia yrityksiä.

`node tools/codex-3d-tarkistus.mjs <kansio> --json` → 0, ei virheitä. Lisäksi riippumaton kevyt apuagentti tarkisti lähdehashit, peilauksen, kuvat, akselit ja karmin pintasuunnat. Avautuminen testattu karmia vasten 91 kulmassa, yhteensä 39 200 geometrianäytettä/kulma; keskisauma 0,25° askelin. Ei havaittua läpileikkausta toleranssin ulkopuolella. Tämä ei korvaa pelin fysiikka-/materiaalitarkistusta.

Todellisten GLB:iden kuvat: `esikatselu/kooste.jpg`, `kiinni-edesta.png`, `pelikulma60.png`, `auki90.png`, `takaa-auki90.png`, `etaisyys15m-fov60.png` ja `lahdevertailu.jpg`. Lähdevertailussa kohteiden korkeus täsmäytetty, suoraan edestä. Nämä ovat kevyitä CPU-malliesikatseluja (väri ja vertex-normaalit), eivät Unityn PBR-valaistus tai pelikuva. Tarkistus kesti noin 4 s, enimmäismuisti noin 221 MiB. Raskaita ajoja tai videoita ei tehty.

KK katsoo paketin, sen jälkeen Pelikoodari kytkee sen laatikon tilalle. Ei junaan tämän viestin perusteella. Palvelijattaren V2-liikkeiden varjostettu tarkistus on edelleen jonossa odottamassa Julkaisijan uutta ALKAA-vuoroa; nykyinen Unity-kuorma ei salli raskasta tarkistusta.
