# Karttaseppä: luovutus 6.11.2026 klo 07.35 (KS)
Syy: konteksti 26 %, luonteva tauko, kun ajo on JU:lla (7.37). **Voittaa aiemmat ristiriidassa; lue sen jälkeen -0721 kohta 2, -0711 kohdat TASOITUS ja NUI.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus). KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. JU = local_b4a7e82a-2522-437f-84ff-813401120931. NUI = local_a3754ed8-f155-43b5-9095-b51e9e29ff53.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Ei ollut käynnissä tässä sessiossa, joten posti on katsomatta. Katso, onko `lokit/karttaseppa-pariisi-mp-e31682e02` jo valmis; JU:n viesti on voinut tulla ennen nollausta.

## 1. MONTPARNASSEN LASIPINTA, ajo e31682e02 JU:lla (W)
Omistaja 07.25, KK:n välitys: "Kokeillaanko Tour Montparnasseen lasimaisempaa pintaa?" = "Kokeillaan (Suositus)". Tavoite: lasitorni, kiilto keskellä ja harvat pystylinjat, jotka eivät väreile; ei laatikko. **Tämä ei hyväksy mallia: ei kuittia Codexille eikä Tripolle.** Pari oikea rakennus | peli **uudelle KK:lle, joka kysyy kortilla.**
- `mp-torni.py` `julkisivu(im, leveys_m)` laskee julkisivun lähdekuvan sijaan. Värit ja 12 viivaa leveällä sivulla on mitattu `oikea.jpg`:stä; viivat ovat pehmeitä, jakso 19 px atlaksessa.
- Ajo 7c5bca160 katsottu: viivat eivät vaihtuneet a/b-pareissa, kiilto ja tumma nurkka toimivat. Vika: tumma vyö näytti tahralta, väli vihreältä, kiilto kapealta raidalta.
- e31682e02: `VYO_VOIMA` 0, `VALI_LASI` 134,122,100, `KIILTO_LEVEYS` 0,15. **Ajamatta, kun tämä kirjoitettiin.** Skenaario `_tyo/karttaseppa/sk-pariisi-mp-3.txt`, tulos `lokit/karttaseppa-pariisi-mp-e31682e02`.
- **Katso:** a/b-parit (mp-lahi, mp-kauka) täysikoossa, tahra poissa, väri, näyttääkö lasilta. Rajausapu: scratchpad on poissa nollauksen jälkeen, joten rajaa a ja b rinnakkain itse.
- **Kelpaa:** `python3 _tyo/karttaseppa/sarja24-asennus/mp-pari.py <loki> <ulos.png>` (nyt torni kokonaan ja samankorkuisena; rajaus mitattu, ajamatta). Katso pari, kirjaa ruudun m/px tarvittaessa, pari KK:lle ilman selitekaistaa, viat samalla rivillä. Mitat: 62 × 39 m ei ole varmistunut lähteestä (LAHTEET.md, OSM; PT muisti 50 × 32); suhde 3,39 pysyy, mainitse KK:lle.
- **Ei kelpaa:** säädä arvoja `mp-torni.py`:n alussa, sitten `mp-asenna.py <W>/Assets/Matkakirja/Kartta/Resources/NotreDameKoe <W>/Assets/Matkakirja/Kartta/Nahtavyysalue.cs` (vaihtaa mallin, määritys jää), commit, ajo JU:lta. Älä näytä keskeneräistä.
- Lasiversio puuttuu Y:stä: yhdistä W:n kärki seuraavaan yhteiseen ajoon.

## 2. YHTEINEN AJO 579ea327c KATSOTTU (07.30)
Tulos KK:lla, loki NS:llä ja NUI:lla. Kuvat `lokit/karttaseppa-yhteinen-579ea327c`, rajaukset `_tyo/karttaseppa/yhteinen-579ea327c/`.
- Kunnossa: Marais, Pont Neuf, ND:n raja, Montmartre, Montparnassen maaviiva 90 m:ssä, Sacré-Cœurin mäki ja pohja. Katsottu 2000 px:nä, kaksi rajausta täysikoossa.
- **VIKA:** sc-80, talorivi leijuu Sacré-Cœurin takana luoteessa, alla taivasta; täysikoossa noin x 920–1195, y 635–680; 45°:ssa ei näy. Syy todistamatta. NUI: tasauksen reuna 700–1400 m on yksi mahdollinen syy. Kysytty NS:ltä (talojen korkeus vai kartan kaukotaso), vastaus odottaa. **Tasainen oletukseksi odottaa tätä.**
- **Selvittämättä:** keski-ylhaalta, ND:n pohjan alue sumeampi ja vaaleampi kuin muu kartta (`keski-sumea-alue.png`). Ei tiedossa, onko uutta tasoituksesta. Vertaa ajoon ilman `karttatasa 1`.
- NUI 07.3x: KaupunkiPallot:637, Karttapisteet:161/199, KaupunkiMerkit:385/1067/1224, Symbolimallit.Maasto:49 ja Lipputanko:342 käyttävät Sovita/Lisays eivätkä Piirretty, joten ne eivät seuraa tasausta. Kuvat eivät todista niitä. **Seuraavaan yhteiseen ajoon kuva niiden omalta zoomilta** (lipputanko, kaupunkimerkki, pallo); ei omaa ajoa.

## SEURAAVA YHTEINEN AJO
Y:n päälle (579ea327c): W:n kärki, VS **4e751932b** (natiivi-backup linssiseppa2/ohjelmakohteet-nimet; sisältää 14763c0c9:n, sillat c67e51922, Eustache + Sulpice 05cc60e8a ja koko Pompidou-mallin 26d0fcdf2, joka näkyy kuvissa), sk-maa5 (9 kuvaa, JU). Kuivakoe `git merge-tree --write-tree` ensin; NUI ja JU: yhdistyy 579ea327c:hen ilman ristiriitoja, ei käännetty. W:n kärkeä ei ole kokeiltu niiden kanssa. Älä yhdistä VS:n kärkeä suoraan 31b1e5a7a:n tai e7e8d7b5b:n päälle (MalliKyltit törmää). Ajopyyntöön "mitä tämä ratkaisee"; yli 5 kuvasta perustelu. Tasainen oletukseksi vasta tämän jälkeen (omistaja 06.58): sama lasku kuin `karttatasa 1` (Komennot.cs) Pariisin avauksessa, ja Montparnasse 90 m myös W:hen.

## AUKI
Sacré-Cœurin reunan tummat pisteet. Sacré-Cœurin matala läiskä: KK kertoo. NUI-kuvista m4 ja m3 ei kuittausta.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.

## Oppi
Pehmeä, kapea tumma vyö näyttää pelissä tahralta, vaikka se on oikeassa rakennuksessa: pieni yksityiskohta kannattaa jättää pois, jos sitä ei voi piirtää terävänä. Väri kannattaa arvioida pelistä, koska oma esikatselu näytti välin vähemmän vihreänä. Lue talon koodin rivit vasta, kun väität niistä jotain: "kuvat näyttävät hyvältä" ei todista kohtia, jotka eivät ole kuvassa.
