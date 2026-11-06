# Karttaseppä: luovutus 6.11.2026 klo 10.14 (KS)
Syy: konteksti 25 %, luonteva tauko: ajo 7 on JU:n jonossa. **Voittaa -0958:n ristiriidassa; siitä pätevät edelleen LOPPUTESTIT ja lukematta jääneet Raamatun osat.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki b07ca68a1, ei pushattu). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki 9f5e3e105, puhdas). Molemmat Unity b8:lla. Viestit id:llä: KK local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe, PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, JU local_b4a7e82a-2522-437f-84ff-813401120931, VS local_3b36fe96-0199-4b17-9eb4-46a882ce7399; NS ja NUI nollautuvat, hae id:t ListAgentsista tai list_sessionsista.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen). Posti 61ba70729 (ovilehdet) ei ole KS:n. Python: louvre-työkalut ajetaan `/opt/homebrew/opt/python@3.14/bin/python3`:lla ilman -I:tä (numpy).

## AJO 7: JU:LLA, ÄLÄ YHDISTÄ Y:HEN AJON AIKANA
Y 9f5e3e105, `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/sk-pariisi-yhteinen-7.txt`, 9 kuvaa, talot NS `palat-v9-louvre-halles` (sha 03173cbce95dcc3a), jonossa L2:lla (JU 10.1x), tulos `lokit/karttaseppa-yhteinen-7-b8-9f5e3e105`; JU kertoo polun. Ensimmäinen käännös tälle yhdistelmälle. Jos Unity ei käänny, virhe tulee KS:lle.
Katso täysikoossa, koko kuva, ja jaa:
- **KK (seuraava kuva suoraan KK:lle, viat kerrottuina):** po-la, pr-rivoli, louvre-ita, louvre-ranta, nd-raja. Tavoite (omistaja 10.04): Louvre seisoo kaupungissa kuten Notre-Dame, ei litteitä kohtia. Kerro erikseen: rantarivin 11 puuta on KS:n oma ratkaisu, voi peittää julkisivun alaosaa (ND:llä sääntö "ei kirkkojen eteen"); Palais-Royal'n kohdalle jää tasainen aukio ja 2 puuta, jos se yhä näyttää läikältä, seuraava keino on NS:n synteettinen kortteli.
- **NS tai sen seuraaja:** po-la samalta kameralta, palat-v9 kummatkin korttelit (relation/538237, relation/5677700), 3D näkemättä. Vertailu ajon 6 po-la: täysikoossa x 1180–1400, y 1320–1560.
- **NUI (uusi vuoro):** nd-raja (hintakyltti täysi tai poissa, köysi mukana), grep "MATKAKIRJA karsinta" kesto X ms samasta ajosta (PT:n pyyntö), `lontoo-nimet` ja `jyvaskyla-nimet` + nimet etsi kahdesti samalta kameralta, liike välissä. Lontoon ja Jyväskylän kamerat ja hakunimet (Westminster, Kauppakatu, Yliopistonkatu) ovat KS:n laskemia, kerro se.
- **VS:** co-yla, co-ob (vesi Seinen sävyä), kansio.
- **PT:** rivi, kun jaettu.
Kaikki tämän ajon kuvat ovat b8:aa ja tyyliä e23; älä vertaa b7-kuviin ilman merkintää. Kartta piirretään uudelleen, joten kartan pienet erot voivat tulla tyylistä.

## TEHTY
- **b8-runko:** JU varmisti addae63f2:n (natiivi-backup päivitetty 10.03; commitin viesti "ei vaihtoa rungossa" on kokeen ajalta). Yhdistetty Y:hen 115946177 ja W:hen 2a39d0acb. Törmäykset: ElavaTyyliVersio **e23** (striimivärit + maakuntarajojen katkoviiva samassa tyylissä; e19–e22 koehaaroissa, e16 ja e18 kumpikin väärä välimuisti), SiirtymaKallistusRaja muuttuvana (kuvausajon komento). NUI:lle: älä yhdistä runkoa omaan haaraan suoraan, vaan Y:n kautta.
- **Y:hen lisäksi:** VS bed1239dd (sisältää c0dba45aa, Concorden vesi), NUI 1b6525afe (sisältää 37907cb54, hintakyltti ja karsinnan kesto), W b07ca68a1.
- **OMISTAJA 10.04 (KK, PT):** Louvren korttelit ja talot jäävät kokeena, eivät junassa; Codexin isoa pohjaa ei tilata. W b07ca68a1: `louvre-pohja-talot2.png` (työkalu `_tyo/karttaseppa/louvre-talomaski/tee-kaista.py`: mallin ympäriltä litteät rakennusjäljet, nurmi ja viivat pois peilaamalla mallin alta kivipinta; Tuileries'n nurmi ja suihkulähde jäävät, alfa ja maski ennallaan), `LouvrenPuut` 13 kpl (puut2.txt). Vanha louvre-pohja-talot.png jää.
- **Porraskorttelit:** NS tutki syyn: portaat OSM:stä, IGN pääosin sama, tasakatto korosti. Oma suositukseni "jätetään" kumoutui omistajan päätöksellä. NS teki v8:n ja v9:n.

## KUITATTU, EI TUTKITA
- **Octroi (KK):** Octroi de Neuilly, way/81203962, 48.88641, 2.28346, 25,8 m², kamera oli oikea, kohde liian pieni 0.003:lla. Omistajalle ei näytetä. Lähikuva vain, jos NS tarvitsee. Ajo 7:ssä ei ole.
- **Pyöreä kuva co-45:ssä:** rantakadun valokuva ilman kylttiä, sääntö (KK 5.11. 16.3x; NUI, kohdetta ei tarkistettu datasta).
- **Kyltin Tuileries-pää:** VS vei KK:lle.

## ODOTTAA
- KK: kattokortti (v4 vai v6, suositus v6) -0958:sta.
- PT ja JU: VALOVAHTI-poikkeus ja JU:n 152 puuttuvaa metaa ennen junaa, eivät KS:n tehtäviä ennen PT:n sanaa.

## Oppi
Suositus "jätetään" oli oikein syyn kannalta mutta väärä tavoitteen kannalta: omistaja katsoo kuvaa, ei lähdedataa. Tarkista uuden tyyliversion vapaus kaikista haaroista ennen käyttöä (`git log --all -S`), e19 oli jo varattu.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
