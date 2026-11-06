# Karttaseppä: luovutus 6.11.2026 klo 07.02 (KS)
Syy: konteksti yli 25 %, luonteva tauko, kun ajo on pyydetty JU:lta (7.37). **Voittaa aiemmat ristiriidassa; lue sen jälkeen -0229 (TILA 02.3x ja LOPPUTESTIT).** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219), kärki e263b4b73. Kaikki kokeena, ei junaan, ei iPadia. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. PT = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. JU = local_b4a7e82a-2522-437f-84ff-813401120931.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Ei käynnissä tässä sessiossa.

## MONTPARNASSE (omistaja 06.55, kortti, PT:n välitys)
Tehdään poikkeuksena kuten Louvren pyramidi. SEIS purettu. Riski: voi joutua pois ennen App Storea, tarkistuslistalla (Raamattu 11.8).
**Tulkinta, kerrottu PT:lle:** "olemassa oleva otto" = Codexin otto 2 (`_review-sarja-24/montparnasse-otto2`), koska Tripo päätettiin (87575ff09) ja sen molemmat otot hylättiin. Ei Tripoa eikä uutta tilausta. Jos PT korjaa, noudata sitä.
e263b4b73 rakennettu, **kääntämättä ja ajamatta**: 177 × 111 × 600 (H/W 3,39, D/W 0,627), 2 240 kolmiota, julkisivut etela, pohjoinen ja lansi (2×, ita pois), katto ylhaalta suoristettuna, pohja Codexin 24p. Suunta −50,2 (jalanjalki.png 129,8°), MaanpintaH 110 (z12 kartta 55 m × 2, ei 90), Q323767.
Työkalut `_tyo/karttaseppa/sarja24-asennus/mp-torni.py` (arvot alussa) ja `mp-asenna.py` (ajo uudelleen vaihtaa mallin; määritys jää).

## AJO JU:LTA PYYDETTY
Skenaario `_tyo/karttaseppa/sk-pariisi-mp.txt`, tulos `lokit/karttaseppa-pariisi-mp-e263b4b73`, 7 kuvaa. **Älä muuta skenaariota ajon aikana.** JU ilmoittaa.
1. Montparnasse: mp-45-0, mp-lahi-lounas, mp-lahi-koillinen, mp-ylhaalta, mp-matala täysikoossa. Mittari tilauksesta: "tumma, sileä lasitorni, joka erottuu heti Pariisin vaaleasta kivestä, ja sen muoto tunnistuu ylhäältä ja viistosta". Katso oikeaa kuvaa vasten (`oikea.jpg`), myös suunta kartalla, maaviiva ja pohjan saumat. Kuva pelistä **KK:lle**. Kirkkaus säädetään tarvittaessa Savylla, ei kuvaa muuttamalla.
2. KK:n kuittauksen jälkeen: Codexille ja Tripolle posti `Karttaseppä →` (24p kelpaa tai ei; Montparnasse rakennettu mitoista). Codex 24p odottaa tätä pelikuvaa.
3. `puut-ylhaalta` → tulos PT:lle (PT 01.0x, `sk-seuraavaan-ajoon-puut-ylhaalta.txt`, ei korjausta ennen sitä).
4. `cite-puut-pohj` → tulos rivinä KK:lle (PT 02.5x): sama kamera kuin `lokit/valoseppa-maa2-0d317ab6f/tsj-lahi-pohj`. KK:lle on kerrottu, että vanha haaleus johtui puuttuvasta b9ea3e0db:stä, mutta korjattu tila on näkemättä. Jos puut ovat yhä haaleita, oma jalka on väärässä: lue `usvamitta` lokista.

## AUKI
NUI-kuvista m4 ja m3 ei kuittausta. Sacré-Cœurin reunan tummat pisteet auki. Sacré-Cœurin matala läiska: KK kertoo aamulla.

## Oppi
Sivukuvan voi käyttää tasoprojektiona mittamallissa: leveä sivu ja pääty osuvat oikein, vaikka Tripo ei saanut suhteita samoista kuvista.

## TASOITUS (omistaja 06.58, kortti, PT:n välitys; vastuu KS; kirjattu 07.05)
"Tasoitetaanko Pariisin kartta keskustassa?" = "Tasoitetaan". **Tasainen oletukseksi vasta, kun talot, nimet ja merkit ovat samassa maassa ja Sacré-Cœurin mäki ja pohja on tarkistettu.** Vuoro JU:lta, kuvat KK:lle. Oletukset 10 km / 14 km / 90 m, Montmartre 700 + 700 m (NUI:lle vahvistettu).
- **Tehty:** 3158bdc7b `KorkeusKerroin.TasaOsuus`, `Piirretty`, `TasaKorkeusM`: varjostimen lasku C#:ssa, kääntämättä. Parametrit tallentuvat vain `Tasainen`-kutsusta.
- **NS:** 7333833fe (natiiviseppa/marais-talot) valmis; sovittu yhteiseen ajoon koekuvan `_tyo/natiiviseppa/pariisi-talot/sk-nd-raja-koekuva.txt` kanssa. Kerro lokikansio NS:lle, se tarkistaa talot.
- **NUI:** kytkee MaanPinnan haaraansa natiivi-ui/merkki-pinta-219 ja ilmoittaa sha:n. **VS:** pyydetty sha tai "ei koske" sillat ja ohjelmakohteet.
- **KS:n osuus:** Montparnasse 110 m pitää tasaisena olla 90 m: käytä mallin luonnissa Piirrettyä tai vaihda arvo, kun tasainen on oletus (`Nahtavyysalue.cs`, MaaM rivi 388, koordinaatit 792, 862, 880, 901). Muut Pariisin mallit ovat jo 90 m:ssä. Sacré-Cœur (186 m) on reiässä: mäki ja pohja tarkistetaan kuvista. Oletus päälle: sama lasku kuin `karttatasa 1` (Komennot.cs 800), Pariisin avauksessa.
- **Yhteinen ajo:** W + NUI + NS + mahdollinen VS, `git merge-tree --write-tree` ensin; `karttaseppa/ajo-tasainen-talot` on vanhempi koe. Skenaarioon `karttatasa 1` sekä parit: talot, nimet, merkit, Sacré-Cœurin mäki ja pohja, NS:n koekuva. Tuloksesta kuvat KK:lle.

## MONTPARNASSEN SUHDE (PT 07.0x)
PT muisti 50 × 32 m. OSM way 16406633: 62 × 39 m, 210 m, joten 3,39 pysyy. Haku ei vahvistanut pohjamittoja kummallekaan. **Mainitse tämä KK:n kuvarivillä.**
