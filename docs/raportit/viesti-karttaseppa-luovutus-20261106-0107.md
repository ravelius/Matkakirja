# Karttaseppä: luovutus 6.11.2026 klo 01.07 (KS)
Syy: konteksti 36 % (7.37). **Voittaa -0059:n ristiriidassa; lue -0059 sen jälkeen (Sacré-Cœurin rakenne, KK:n sanat 00.4x), -0045 ja -0031 taustaksi.** W:n kärki 4096e2309 (karttaseppa/nahtavyydet-219, natiivi-backup). Kaikki kokeena, ei junaan. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. PT = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. JU = local_b4a7e82a-2522-437f-84ff-813401120931.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.

## SACRÉ-CŒUR: AJETTU, KK:N SANAA ODOTETAAN
Ajo `lokit/karttaseppa-sc-0e054ad1b` katsottu, 5 kuvaa. Parit `_tyo/karttaseppa/parit-sc-0e054ad1b/` KK:lla 01.0x: kelpaako kokeena, kelpaako Codexin 24p poikkeamineen. Suositus molemmat kokeena. **Codexille ja Tripolle ei kuittauksia ennen KK:n sanaa.**
- Kunnossa: kirkko ei hautaudu (pinta 186 m), terassi, kaaret, portaat rinteessä, kirkon vaaleus (224 / hyväksytty 228, hieman lämpimämpi), usva (malli 0,00, kartta 0,14).
- 4096e2309: mäen Savy 0,87 / 0,97 / 0,73, koska nurmi oli ylhäältä 157,166,97 ja hyväksytty on 133,144,79. **Ajamatta.** Testit 13/13.
- Auki: 1) matalassa kulmassa mäen eteläpää näyttää lautalta kartan päällä (`parit-sc-0e054ad1b/matala-rajaus.png`), syy todistamatta, epäily: kaukana maasto on karkeampi kuin z12, josta mäen reuna on laskettu. 2) Itärinne jyrkkä ja tumma. 3) Kapseli noin 250 × 470 m, tilattu 200 × 420 m, koska Tripon kirkko on kuvaa leveämpi.
- Työkalut `sarja24-asennus/`: `sc-maki.py 186` (rakennus), `sc-asenna.py`, `sc-pari.py`, `sc-rajaa.py` (värimitat).

## SEURAAVAAN AJOON (ei omaa ajoa)
1. Nurmen väri 4096e2309: `sk-pariisi-sc.txt` riittää; JU haluaa kysymyksen ja enintään noin 5 kuvaa (omistaja 17.58). Yli viiden on perusteltava.
2. PT 01.0x, kiireetön: `_tyo/karttaseppa/sk-seuraavaan-ajoon-puut-ylhaalta.txt`. Varjot ilman puita ajossa 8143b96ef (`p-pn-ylha`), josta puuttuu b9ea3e0db. Oletus: yhteisen puuAineen vanha usvavirhe, ei todistettu. Tulos PT:lle, ei korjausta ennen sitä. Puukoodi ei ole `julkaisija-pariisi-219`:ssä; julkaistua TF:ää ei ole tarkistettu.

## TYÖJONO
1. KK:n sana. 2. Eteläpää. 3. Montparnasse: torni oikeista mitoista ilman Tripoa (87575ff09); mittaa maasto ensin `sc-maasto.py`:n tavalla. Tasainen kartta: katso -0059.

## Opit
- Pelin `suunta` on katseen suunta: `sc-lahi-koillinen` on kuvattu lounaasta ja `sc-lahi-lounas` koillisesta.
- `git grep` väärällä viitteellä ja `2>/dev/null` näyttää samalta kuin "ei löydy": W:ssä ei ole origin/mainia, vain natiivi-backup. Tarkista viite ennen johtopäätöstä.
- Väriä ei voi mitata tiukalla vihreän ehdolla: 4 pikseliä antoi väärän tuloksen, katso pikselimäärä.
