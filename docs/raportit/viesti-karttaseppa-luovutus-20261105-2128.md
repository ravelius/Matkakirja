# Karttaseppä: luovutus 5.11.2026 klo 21.28 (KS)
Syy: pehmeä raja 26 %, luonteva tauko, koska vuoro on neljäntenä jonossa (7.37). **Tämä voittaa ristiriidassa.** Tausta: -2113 (42470178b), -2111 (b67953fc3). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 96a9b2b68. Python `/opt/homebrew/bin/python3` ilman -I. `_tyo` on symlinkki: `find` tarvitsee kauttaviivan loppuun.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. **Vuoro:** JU 21.2x: sk-pariisi-savy on jonossa neljäntenä (PK, NS, LAV, KS). Odota viestiä "ESIKATSELU NYT" ja linjan numeroa. Älä aja ennen sitä. Aja: `PROTO_LINJA=<linja> ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh <W>/tyokalut/esikatselu.sh 7875c668d /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/sk-pariisi-savy.txt ipad --batch`. Lopuksi JU:lle (local_b4a7e82a-2522-437f-84ff-813401120931) "LUKKO VAPAA" + linja + kesto + kuvamäärä.
3. Tarkista postilaatikko: Tripolta Invalidien toinen otto; Sacré-Cœurista vain, jos tiedosto ei kelpaa.

## TEHTY TÄLLÄ VUOROLLA
- **Tripo-viestit** 87575ff09: Sacré-Cœurin otto 1 kelpaa kirkkona, ei retopoa eikä pakettia, otan `attempt01-diagnostic.glb`:n; Montparnasse päättyy; Invalidien toinen otto kuvista a8e271271.
- **Pystysauma, kuvat katsottu** (`lokit/esikatselu-20261105-211044`): tulos KK:lla ja PT:llä, viestit olivat lähtiessä jonossa. 45°: hyppy noin 20 px k2 ja noin 15 px k1 (luettu rajauksista, ristikorrelaatio jäi kohinaiseksi, korrelaatio 0,5–0,7). Ylhäältä ei näy. 1677800f5 (TasainenLaatta) ei ole tässä kannassa, joten 0°:n tulos ei johdu siitä. Laajassa kuvassa sama viiva jatkuu etelään. Sopii pituuspiiriin 2,3291 (z13-raja 4149), mutta **sitä ei ole varmistettu paloista**.
- **Mallin häipyminen** fd6997937: mallille syvyyspeitto suoraan, kyltti jää käyrälle. Testit 12/12. **Ei ajettu pelissä.**
- **Katsepiste maan tasolle** fb4379432, oma haara `karttaseppa/katsepiste-maa-219` (natiivi-backup). Etäisyys lyhenee saman verran, joten kuva ylhäältä ei muutu. Testit 13/13. **Ei ajettu. Ei yhdistetä ilman omistajan sanaa.** Parit 45°, 75°, 85° samasta kohdasta → KK → omistaja.
- **Riemukaari 24p** 96a9b2b68: `_tyo/karttaseppa/sarja24-asennus/asenna-24p.py` (alfa maskista, ei jalanjäljestä; kiveys kartan kadun väriin). **Ei nähty pelissä.**
- Vanha LUKKO VAPAA ajolle 211044 lähetetty JU:lle.

## TYÖJONO
1. **Sävy (PT ja KK vaativat):** kerro, mikä tummentaa kartan ja koskeeko se iPadia. Kartta ei saa tummua kulman tai paikan mukana.
   - Mitattu alaneljännes (kirkkaus): ajo 204213 (994f4001e) 75° 161, 45° 168, 85° 168. Ajo 210430 (7875c668d) 75° 121, 45° 130, 85° 168, eiffel-raja 126. Ajo 211044 (7875c668d) Tuileries 45° suunta 0: 165. KK:n `op-matala` 157: vain lievästi tumma.
   - Tumma on 0,75-kertainen kaikilla kanavilla, siis valon voimakkuus, ei usva. Kellonaika ei selitä, koska 21.07 on vaalea 21.06:n ja 21.07.31:n välissä ja koska 21.12 on vaalea.
   - **Skenaario tekee valo tila -rivin ennen jokaista kuvaa.** Vertaa `rinne`, `tasaus`, `intensiteetti`, `N·L`. Toistuuko tummuus (kuvat 1 ja 4), riippuuko suunnasta (5, 6, 7).
   - Epäily, ei todistettu: `Aurinko.cs` rinneTavoite × `Karttavalo.LahiOsuus(Pintaosuma.Tiheys(...))` riippuu ruudun keskellä ladatusta palasta, joten `Rinne` ja `KorkeusKerroin.Tasaus(Rinne)` voivat vaihdella latauksen mukaan. Tasaus muuttaa tilesetin normaaleja, joten tasamaan sävy ei enää pysy, vaikka `Kompensoi` pitää sen laskussa vakiona.
2. **Pystysauman korjaus (PT 21.2x, sävyn jälkeen):** palojen reunakorkeudet yhteen samalla pituuspiirillä koko matkalta. **Tarkista ensin palojen korkeudet ja oikeat rajat**, ja tuleeko korkeusero kaikista saman rajan paloista. Tulos KK:lle kuvaparina. Kerroin ei selitä kaikkea (20 → 15 px, ei puoleen); sanoin tämän PT:lle. Muiden haarat: 7068e23a4, 8f46b4e74, caa2c0918 (linssiseppa2/pariisi-tasot), natiiviseppa/tasainen-striimi-3.
3. **Sama ajo sävyn jälkeen:** fd6997937 ja 96a9b2b68 pelissä (Riemukaari ylhäältä ja 45° KK:lle; PT: katso pelissä, muut alustat Codexilta vasta KK:n kuittauksen jälkeen). Katsepiste omalla ajollaan.
4. **Sacré-Cœur pelissä:** suunnitelma ja mitat `_tyo/karttaseppa/sarja24-asennus/sc-suunnitelma.md`. Ei koodia vielä. Mallin tiedosto on postissa.
5. **Montparnasse mitoista:** -2113 kohta 8. Ei aloitettu.
6. **Opéra 24j** pysyy kokeena. Eiffelin vaalea neliö: katso (-2111).

## Opit
- `echo =====` ei toimi zsh:ssa (nostaa `=`-laajennuksen): käytä `---`.
- Saumojen automaattinen etsintä kuvasta oli kohinainen. Rajaus täysikoossa ja käsin luettu viiva toimi paremmin.
