# Tripo 3D → Pelikoodari / Lavastaja / PT: neljä arkihahmoa, tavarat ja jäänteet

Omistajan tilaus 2.11. ja siirto 3.11. on koottu vastaanottajan pelitarkistukseen. Paikalliset liike-, ote- ja kuvatarkistukset on tehty. Paketti: `posti/arkiset-hahmot-20261102/` — 11 GLB:tä ja 121 nykyhashiin sidottua tarkistuskuvaa, yhteensä 168 tiedostoa (noin 61 Mt). Lue ensin [LUE-ENNEN-KAYTTOA.md](arkiset-hahmot-20261102/LUE-ENNEN-KAYTTOA.md); kuvahakemisto [ESIKATSELU.html](arkiset-hahmot-20261102/ESIKATSELU.html).

Konevaraus vapautettiin jo erikseen VALMIS-viestillä e975e75b. Ei lisää raskasta työtä siinä aikaikkunassa.

## Sisältö ja nykyversiot

- Ruokaeunukki: vaalea työasu/esiliina, punainen kolmikerroksinen ruokalaatikko.
- Palvelijatar: vaaleanvihreä pitkä kaapu, sinivalkoinen maljakko.
- Vedenkantaja: ruskea työasu/housut, olkapuu ja kaksi ämpäriä. Fill-v7 korjaa ämpärien jäämisen edellisen kaadon asentoon liikkeen vaihtuessa.
- Lakaisija: harmaa työasu ja bambuluuta, kävely/lakaisu/säikähdys.
- Neljä irrotettavaa tavaraa sekä ruoka-, posliini- ja vesijäänteet. Ruokajäänne-v2 korjaa samassa tasossa päällekkäiset laatikkopinnat; mustat kulma- ja keskikolmiot poistuivat molemmista uusista tarkistuskuvista.

| GLB | Kolmiot | SHA256 |
| --- | ---: | --- |
| ruokaeunukki.glb | 18999 | `93d507f43e1a6f20e96a4d275e2dbfdb8f2f559f32f7a4f823b0f36774a87a52` |
| palvelijatar.glb | 19000 | `4ba2066e801f096ef553ef036c833917493741dd0494fbec2acf1e7278b0f73c` |
| vedenkantaja.glb | 16258 | `76bfc58efb85e9bd4a2ce256e699c7352399204145bac7eaf44418c77a104e70` |
| lakaisija.glb | 15180 | `0b1ef355383e7b2110b1602c9c27cf311cd9d973bbffffbe369610c1571706bb` |
| jaanne-posliini.glb | 212 | `9ef03b38ee138b4291b046a87723fad31197e0a43be4594c1ff5a6c3772fc5ac` |
| jaanne-ruoka.glb | 1728 | `0adf188e57fdf3db401f358e7c43181f4af10a2dbcd07b3d5897856c114b07f8` |
| jaanne-vesi.glb | 952 | `307f72aa0ad83afd24e75a3f16b333fba7a1ae8b8831d4feeb1116ba6db96368` |
| tavara-ampari.glb | 1168 | `256a6e56a653a788e9b0414eaf6187a228e7a91330f3c5973c2ec6c27b7766d7` |
| tavara-luuta.glb | 564 | `b4522b54f4fe95219dd2b97755618791601ec244abefc70de86c857ed8665a59` |
| tavara-maljakko.glb | 1640 | `5a1170ea3e41143cc612e014dba0d44cf9a417c316251a7b6b4a15796e1af34d` |
| tavara-ruokalaatikko.glb | 1048 | `e37751d482964547909a16ea6da0be3ea940dccdadc3e3a143f1f3a865a8c3b5` |

## Pelikytkentä

65 niveltä samalla nimijärjestyksellä, metri, +Y ylös, kasvot +Z. `startle` kestää 1,0 s; tavaran irrotus kaikilla 0,40 s. Muunnos on
`standaloneParentWorld = currentCharacterTavaraWorld @ inverse(standaloneRootLocal)`.
Piilota upotettu tavara ja poista sen esikatselun pudotuskanavat käytöstä fysiikan ottaessa hallinnan. Elävä maailmamuunnos/skaala on säilytettävä; tarkistus oli alle 0,000001 m pintavastaavuudella.

Vedenkantajan sovittu jono (e75d9464): `fill_right` 2,6 s → `fill_left` 2,6 s → `idle_after_fill`. `walk_after_fill` jatkaa tyhjillä ämpäreillä. Tavalliset `idle/walk` ovat täysillä ämpäreillä; `startle_idle/walk_empty` ilman pudotettuja tavaroita. WATER-POUR-CONTRACT.json kertoo aiemmin toimitetun pronssiastian lähteen/sijoituksen, kaatomarkkerit ja VFX-ajan 1,08–1,50 s. Erillinen vesivirta tehdään pelissä. Luuta jää kokonaisena maahan. Särkymisääni EI houkuttele jahtaajia.

## QA ja selvästi avoimeksi jätetty arvio

121 kuvaa: hahmojen neljä katselukulmaa, neljä rinnakkaisvertailua jahtaavaan eunukkiin, säikähdyssarjat, ote-/lakaisu-/kaatosarjat ja esineiden ylä-/viistokuvat. Kaikki katsottu. Nykyiset kuvat ovat sidottuja kunkin GLB:n SHA256:een, eivät vanhojen versioiden kuvia. Raakojen numeeristen raporttien vanhat muiden mallien rivit on erotettu oikeista nykyraporteista PACKAGE-MANIFEST.json:ssa.

**Näkyvä rajoite:** hihansuiden kulmikkuus ja pienet rannekohtien aukot näkyvät lähikuvissa, erityisesti lakaisijalla ja vedenkantajan kohotetuissa käsissä. Ne eivät ole poistuneet näillä oteliikkeiden korjauksilla. Otteet ovat likimääräisiä tukikontakteja, eivät kaikkialla tiukkoja nyrkkejä (peukalon tavoitejäännös enintään noin 22/18/11 mm). Pyydän arvioimaan nämä oikealla juoksukameran etäisyydellä ennen lopullista ulkonäköhyväksyntää. Pakettia ei väitetä virheettömäksi lähikuvamalliksi. Yksinkertaistettu maljakon sisus/posliinijäänne ja vanhojen yksittäiskuvien kameran lattiakaistale on kuvattu QA-raportissa.

Unityn controller/sekoitukset, fysiikka, colliderit, VFX ja pelivalaistus eivät ole tässä testattuja. Vastaanottokuittaus, pelikuvaQA, lopullinen PT/KK-hyväksyntä ja peli-integraatio ovat erilliset vaiheet. Tämä toimitus ei väitä niitä tehdyiksi.

Lähteet säilytettiin. Nämä ovat siirrettyjä Blender-ehdokkaita ja niiden paikallisia korjauksia, **eivät uusia Tripo-generointeja**. Tässä korjaus-/toimituserässä 0 Tripo-kutsua, 0 ImageGen-kutsua, 0 krediittiä. Oman renderöintipuun suurin mitattu muisti 1 390 MiB.

`SHA256SUMS`-tiedoston SHA256: `0a5275b24dab84e12e89fabaf059719db878f07a6cb1962e7226ce31f7064391`.
Pyydän vastaanottokuittauksen ja saman kameran pelietäisyysarvion. Kun tämä on vastaanotettu, osoittakaa mahdollinen seuraava rajattu 3D-työ tänne; en aloita uusia generointeja ilman työlistan tehtävää.
