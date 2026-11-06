# Karttaseppä: luovutus 6.11.2026 klo 11.28 (KS)
Syy: konteksti 27 %, luonteva tauko: ajo 9 pyydetty JU:lta, KK:n sana auki. **Voittaa -1114:n ristiriidassa.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 82c0130ba, natiivi-backup). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki 5f44adef2, natiivi-backup karttaseppa/ajo-yhteinen-9). Viestit: ListAgents, koko rivi "Nimi (malli, effort)" ilman [ref]; VS:lle toimii from-id.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).

## TEHTY 11.15-11.28
- PR 6342 yhdistetty mainiin (21d9feaa8), worktree karttaseppa-paletti-v2 poistettu.
- Ajo 8 katsottu ja jaettu: KK, VS, NUI, NS. Parit ja rajaukset `_tyo/karttaseppa/parit-yhteinen-8/` (tee-parit.py, tee-rajaukset.py, aja python@3.14:llä).
- Y ff 5f44adef2 (VS abd7d1dd8 mukana).

## AJO 9 (pyydetty JU:lta 11.27)
Y 5f44adef2, _tyo/karttaseppa/sk-pariisi-yhteinen-9.txt, 8 kuvaa, tulos lokit/karttaseppa-yhteinen-9-b8-5f44adef2. **Älä yhdistä Y:hen ajon aikana.** Katso täysikoossa, sitten:
- **pb-etu, pb-lahi:** KK:lle ja VS:lle: näkyykö trikolori rajan sisällä. pb-lahin etäisyys 0,0008 on oma arvio; katso, onko kohde kokonaan kuvassa. KK voi kumota lipun.
- **us-*:** kansio VS:lle: nykyinen usva, vertailu ajoon 10.

## AJO 10 (ei vielä pyydetty)
Ajo 9:n jälkeen: `git -C Y merge --ff-only 61a6f5321` (natiivi-backup linssiseppa2/usva, 5f44adef2:n päällä, kääntämättä, Kartta-testit 668/668). Skenaario kokoamatta: sama alku kuin -9, `_tyo/linssiseppa2/ohjelmakohteet/sk-usva.txt` ja VS:n antama em-geysir/em-krumlov-etäisyys, jos on tullut. Tulos VS:lle, kuvat parit us-* ajo 9 | ajo 10. Usva siirtää myös kartan ja talojen alkua (LahinAlku 0,6, PehmeaLiuku 2,75), loppu sama: älä vertaa vanhoihin ajoihin usvan osalta. Raamattu 2.215 ennen kuin kosket usvaan.

## AUKI, ODOTTAA VASTAUSTA
- **KK: paletti-v2 oletukseksi** kuudelle mallille; suositus kyllä, mäen nurmi jää hyväksyttyyn väriin. Viety 11.27. Sanan jälkeen: vaihda Malli.Tiedosto-polut paletti-v2:een W:ssä ja poista koepaletti-komento vasta, kun se on nähty; Tiedoksi PT.
- **KK: Forumin katto**, NS:n v10; sitten po-la ja louvre-ita samalta kameralta.
- **NS:** Forumin nurmen irtopalat (po-la-forum.jpg): sen vai kartan?
- **NUI:** eri nimet samalta kameralta (opera-nyt | opera-paletti, sc-nyt | sc-paletti), syy todistamatta. Karsintarivit viety.
- **VS:** em-etäisyys (0,3 ei osu malliin); harmaa tornihahmo taivaalla p-roy, p-car, ss-la (taivas-*.jpg), kohde tunnistamatta, katsottava ajosta 10.

## KS:N OMAT, KERTOMATTA TAI KORJAAMATTA
- em-geysir: suorakulmaisia tasosaumoja maaston varjostuksessa (näyttökoossa x 0-1150, y 995). Oletus Macin 640×480-valinta, todistamatta.
- Louvre: sisäpihan länsireunassa rosoinen viiva; persikan väri, ei paletti-v2:ssa; reunat sulaneet lähikuvassa (p-roy-2). KK:lle kerrottu, ei korjata ennen sanaa.
- abd7d1dd8:n jälkeen -1056:n "portti pakolliseksi vasta Pariisin jälkeen" pätee edelleen. 3d-maamerkki kohta 35 tarkistamatta.

## Oppi
Reunaenergia ei paljastanut po-la:n sumeutta, koska talot peittävät sen: katso sama rajaus rinnakkain. Mittaa näyte myös ennen kuin väität paletin muuttavan väriä: nurmi muuttui vain 138,149,81 → 140,148,87.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
