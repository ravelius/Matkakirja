# Mixamo-leikelista linnan 11 hahmolle (Linnanrakentaja 5.10.2026)

Omistaja lataa leikkeet kerralla, kun kappalaisen koe on hyväksytty. **Leikkeet eivät ole hahmokohtaisia:** sama tiedosto käy
kaikille hahmoille (retarget tehdään Blenderissä, tools/dioraama/blender/hahmo_mixamo.py), joten jokainen leike ladataan vain kerran.

**Latausasetukset (kuten kokeessa):** Format FBX Binary, Skin **Without Skin**, Frames per Second **30**, Keyframe Reduction none.
Kävely- ja liikeleikkeissä valitaan **In Place**, jos valinta näkyy. Tiedosto nimetään Mixamon leikenimellä ja tallennetaan kansioon
`/Users/Shared/Claude/proto-3d/_lahteet/mixamo/`. Mixamon hahmoksi kelpaa mikä tahansa (oletus Y Bot), koska skiniä ei ladata.

Nimet ovat Mixamon hakuun. **Vahvistettu** = sama nimi on jo kokeessa tai verkkotutkimuksessa. **Haku** = tarkkaa nimeä ei
vahvistettu, joten omistaja hakee hakusanalla ja valitsee ensimmäisen sopivan. Jos sopivaa ei löydy, leike jätetään väliin, ja
Linnanrakentaja ottaa sen CC0-lähteestä (Quaterniuksen UAL tai KayKit).

## Ladattavat leikkeet (yksi kerta, 12–14 tiedostoa)

| # | Mixamo-nimi / hakusana | Tila | Kenelle (linnan rooli → leike) |
|---|---|---|---|
| 1 | Praying | ladattu | kappalainen → tyo |
| 2 | Sitting Idle | ladattu | kappalainen, kirjuri → istuu |
| 3 | Sitting Talking | ladattu | kappalainen, vouti → istuu_puhe |
| 4 | Breathing Idle | haku "breathing idle" | kaikki → idle (rauhallisempi kuin nykyinen) |
| 5 | Talking | haku "talking" | kaikki → puhe (seisova puhe eleineen) |
| 6 | Sword And Shield Idle | vahvistettu paketti, haku "sword and shield idle" | vartija → idle |
| 7 | haku "standing guard" tai "guard" | haku | portinvartija → tyo (vartiossa seisominen) |
| 8 | haku "writing" (varalla "typing") | haku | kirjuri → tyo (istuu ja kirjoittaa) |
| 9 | haku "pointing" | haku | vouti → tyo (käskee, osoittaa) |
| 10 | haku "stirring" tai "cooking" | haku | kokki → tyo |
| 11 | haku "carrying" tai "box carry" | haku | renki, talonpoika → kanto |
| 12 | haku "picking up" | haku | talonpoika, vesipoika → tyo |
| 13 | haku "sweeping" | haku | apulainen → tyo |
| 14 | haku "rowing" tai "paddling" | haku | soutaja → tyo (nyt UAL Push_Loop) |

## Hahmo kerrallaan

- **kappalainen:** 1, 2, 3 (koe), lisäksi 4 ja 5.
- **kirjuri:** 8 (työ), 2 (istuu), 4, 5.
- **vouti:** 9 (työ), 3 (istuva puhe), 4, 5.
- **vartija:** 6 (idle), 5.
- **portinvartija:** 7 (työ), 4, 5.
- **kokki:** 10 (työ), 4, 5.
- **renki:** 11 (kanto), 4, 5. Työ pysyy UAL PickUp_Table, ellei 12 ole parempi.
- **talonpoika:** 12 (työ), 11 (kanto), 4, 5.
- **vesipoika:** 12 (työ: ämpärin nosto), 4, 5.
- **apulainen** (nainen; Mixamon leikkeet käyvät samoin): 13 (työ), 4, 5.
- **soutaja:** 14 (työ), 4, 5.

Kävely (kavely) pysyy UAL:n leikkeenä, koska natiivin askelpituus ja nopeus on mitattu siitä (hahmo_skin.py).
Siirtosepän iPad-mittaus tehdään ennen kuin leikkeet viedään kaikille: glb kasvaa leikkeiden pituuden mukaan (kappalainen 0,98 → 2,2 Mt,
josta 44 s:n Sitting Talking on suurin osa). Pitkät leikkeet lyhennetään tarvittaessa silmukaksi.
