# Karttaseppä: luovutus 6.11.2026 klo 02.29 (KS)
Syy: konteksti yli 25 %, luonteva tauko, kun Mac-ajo on JU:lla (7.37). **Voittaa aiemmat ristiriidassa; lue sen jälkeen -0144 ja -0210.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219), kärki 4f6c9286a. Kaikki kokeena, ei junaan, ei iPadia. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. PT = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. JU = local_b4a7e82a-2522-437f-84ff-813401120931.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Ei käynnissä tässä sessiossa.

## AJO JU:LLA
Ajohaara `ajo-pariisi-sc4` 4c63d8662f069356ca94ee85dd487b26e52eceae (proto, paikallinen): 4f6c9286a + natiiviseppa/marais-talot 132a15b7d + natiivi-ui/merkki-pinta-219 9e2d0edba. Yksi ristiriita (Nahtavyysalue.cs, kaksi vartioriviä) ratkaistu: molemmat rivit. Tein yhdistyksen itse, koska JU ei ratko ristiriitoja (PT:n ohje). Kääntämättä.
Tulos: `lokit/karttaseppa-pariisi-sc4-4c63d8662`, 8 kuvaa: nui-m4 nui-m3 sc-45-0 sc-lahi-lounas sc-lahi-koillinen sc-ylhaalta sc-matala opera-45. Skenaario `_tyo/karttaseppa/sk-pariisi-sc-4.txt`, ESIKATSELU_PISTEKERROIN=0.465. **Älä muuta skenaariota ajon aikana.** JU ilmoittaa valmistumisesta.

## AJON JÄLKEEN (vie KK:lle, yksi asia kerrallaan)
1. **Sacré-Cœur** (parit `sarja24-asennus/sc-pari2.py <loki> <ulos>`): palaako lautta `matala-rajaus.png`:ssä. Jos palaa: `sc-maki.py` REUNA_PX 44 ja PORRAS_LOPPU 243, `sc-portaat.py` LOPPU 243, aja molemmat (`sc-maki.py 186`), kopioi glb:t bytes-tiedostoiksi, kerro KK:lle. Vihreä lähellä hyväksyttyä kapselia, portaat päättyvät nurmelle. Länsipuoli ja reunan pisteet: -0144 kohdat 2 ja 3.
2. **Opéra:** `opera-45.png` rajaus noin (1250,770)–(1530,1090) täysikoossa KK:lle: laatta harmaana, kulta ja patsaat ennallaan.
3. **NUI:** `nui-m4.png` ja `nui-m3.png` KK:lle (PT 02.3x). Kohdemerkit, kyltit ja nimet piirretyllä maanpinnalla, talot päällä. Sacré-Cœurin merkki: NS:n epäily `_tyo/natiiviseppa/pariisi-talot/selvitys-c5-raja.md` rivi 52.
Älä leikkaa tunnettua vikaa pois. Ei omaa uutta ajoa ilman KK:ta tai PT:tä.

## EI KORJATA YÖLLÄ (KK kertoo aamulla)
Sacré-Cœur: terassin punertavuus, itärinne, erillinen kumpare.

## TYÖJONO
Montparnasse SEIS aamun korttiin asti. Muuta jonoa ei ole; kysy PT:ltä.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.

## Oppi
Kuivakoe ensin: `git merge-tree --write-tree` näyttää ristiriidan koskematta työkansioon, ja sen puusta saa ajohaaran ilman checkoutia. Koeyhdistys vanhalla kärjellä ei kerro uudesta.
