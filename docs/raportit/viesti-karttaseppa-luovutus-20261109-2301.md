# Karttaseppä: luovutus 9.11.2026 klo 23.01 (KS)
Syy: konteksti yli 25 % (hook), pehmeä raja. Korvaa -2144:n (ja sen lisäyksen 21.5x). Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`

## VALMIIT TÄSSÄ VUOROSSA
- Pelin koko osa 1: JU:n poistolista vahvistettu (A/H/I/J siirto, C–G laitekäännöksistä). JU teki ab538e36f (julkaisija/pelin-koko-1): arkistokansio .metoineen ja astc-tarkistus ennen siirtoa. NS teki atlasvartijan b2273c132 (natiiviseppa/talolataus; rivi 1405 jäi tarkoituksella JU:n tarkistuksen varaan).
- Pelin koko osa 2: PR 6523 yhdistetty mainiin. ODbL-rivi on jakosivulla (JU). NS:n talolatauksen ajo 1: purku kaatui, korjattu de2a713fd; ajo -2 on JU:lla. Talohaara e5f6fcf72 menee junaan vasta PT:n kuittauksella.

## TYÖN ALLA: KAUPUNGIT KOODILLA, OSA A = KATOT (PT 23.3x, omistajan päätös 22.42; suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-kaupungit-koodilla.md)
Rivi PT:lle aloituksesta lähetetty 22.4x. Koe, EI junaan.
Tehty:
1. **Kirjasto** bpypolyskel (GPL-3, prochitecture, bd1ce5b; vain työkalussa, ei peliin) `$K/kirjasto/bpypolyskel`. Tarvitsee mathutilsin, joten ranka ajetaan Blenderissä: `$K/skriptit/luuranko_blender.py`. Pip-mathutils ei käänny Python 3.14:llä.
2. **`$K/skriptit/katot.py`:** naapurireunojen (palomuurien) laajennus ulos D = 10 m (painotetun rangan korvike). Jos laajennus leikkaa itseään, D pienenee ja lopulta lyhyet naapurireunat (< 3 m) saavat rinteen. Rangan kasvot leikataan alkuperäiseen pohjaan (vain pohjan ulkopuolelle ulottuvat kasvot) ja jaetaan profiilin väleihin:
   - mansardi 72° / 20° ja katon korkeus IGN/LIDAR n (3–6 m)
   - auma 35°
   - harja 40°: nelikulmion lyhyet sivut päädyiksi
   Päätyseinät palomuureille. Laji 128 (ullakkoikkunat) vain jyrkälle (≥ 45°) rinteelle. Varakatto: tasakatto ja 0,6 m reunus kadun puolelle.
3. **Haarukat** (alkuperäisiin ei koskettu):
   - `$K/skriptit/tee-palat-luuranko.py` = natiiviseppa/pariisi-talot/tee-palat.py (sha1 3130db9b…)
   - `$K/skriptit/tee-palat-lontoo-luuranko.py` = lontoo-kumpu/palat-rakennus/tee-palat-lontoo.py + Pariisin tarkka() ja sijaintinaapurit()
   - Ympäristö: KATOT_VAIHE=pohjat|rakenna, KATOT_ALUE, KATOT_POHJAT, KATOT_RANKA, KATOT_LISAPALA
   - Muoto: tagi ensin (roof:shape), sitten sääntö. Pariisi: h ≥ 10 mansardi, muuten auma; liike/toimisto ≥ 2000 m² tasa. Lontoo: auma (rivitaloissa päädyt antavat harjan). Molemmissa n ≤ 1 ja h ≥ 8 → tasa.
4. **Ajot:** `$K/aja-pariisi.zsh` ja `$K/aja-lontoo.zsh` (kolme vaihetta); pelkkä vaihe 3: `*-vaihe3.zsh`. Aja LISAPALA-muuttujan kanssa (Pariisi "16600 11271", Lontoo "16375 10895").
   - Pariisi `$K/pariisi/palat-v23-katot-koe1` = v22-lahi + koealueen 6 palaa (48.8630–48.87199, 2.3330–2.34668 = talotyylit koe3). 1416 / 1460 luurankokatto, 44 varakattoa (28 laajennus, 6 tasa, muut ranka/peitto/katto; lista `.varakatot.json`).
   - Lontoo `$K/lontoo/palat-d11-katot-koe1` = d7-kumpu-oikea + 4 palaa (51.5030–51.5120, −0.1290…−0.1145). 530 / 570 luurankokatto, 33 tasa LIDARista.
   - Toistuvuus: koealueen ulkopuolinen lisäpala on tavulleen sama kuin pelin nykyinen, molemmissa kaupungeissa.
5. **Ajopyyntö JU:lle** lähetetty 23.0x: `$K/ajopyynto-mac.md`. Neljä Mac-ajoa sha:lla b804a87d6, skenaariot `$K/sk-{pariisi,lontoo}-{nyt,uusi}.txt`, kuvat ka-<kaupunki>-<nyt|uusi>-{iphone-45,iphone-70,lahi-45,lahi-70,85,kauka-45}.

Auki (järjestyksessä):
a. JU:n kuvat → parit nykyinen | uusi (sama kamera; r45-kaari = talotyylit/kaari12.py-rajaus, r85 = parit12.py-rajaus) → katso itse: piikit, raot, päädyt, mansardin yhtenäisyys → PT:lle kuvat (≤ 1000 px) + 3 riviä.
b. **PALAKOKO:** Pariisin koepalat ovat noin 5× (16596_11271: 2,7 → 14,2 Mt), koska lähes kaikki kasvot leikataan pohjan kolmioihin (tarkka() = viipale, paljon kolmioita) ja päätyjä on 45 600 palasina. Lontoo noin 1,6×. Ennen osaa D:
   - leikkaa kasvot suoraan naapurikaistaleilla (vain laajennuskaistaleet pois), ei pohjan kolmioilla
   - yhdistä päätypalat reunoittain
   - jätä päätyseinä pois, kun naapurin katto on yhtä korkea
c. Kuvien jälkeen mahdolliset säädöt (kulmat `katot.PROFIILI`, D, muotosääntö) ja osa B (tyylikortit) vasta PT:n jaolla.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Ajovahti: ei omia ajoja; JU:n kuittaus tulee viestinä.
