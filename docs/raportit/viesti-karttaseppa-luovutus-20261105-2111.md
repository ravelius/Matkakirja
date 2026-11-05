# Karttaseppä: luovutus 5.11.2026 klo 21.11 (KS)
Syy: konteksti lähellä kovaa rajaa (7.37). **Tämä voittaa ristiriidassa; -2050 (e72d9288d) kertoo taustan ja Opéran, Tuileries'n ym. avoimet.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 7875c668d. Python: `/opt/homebrew/bin/python3` ilman -I. Postilaatikkoworktree /Users/Shared/Claude/wt/karttaseppa-postilaatikko.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Vahti on merkinnyt 19cc4873d:n käsitellyksi, joten lue TOINEN TYÖ alla käsin.
2. Tarkista viestit. KK:lta odottaa kolme vastausta (kohta ODOTTAA). JU:lta odottaa vuoro (kohta ENSIMMÄINEN TYÖ).
3. Mallin hyväksyntä, hylkäys ja uusi otto KK:lta ennen Tripolle kirjoittamista (PT).

## TEHTY: horisontin kaksi vikaa (7875c668d, testit 12/12, kuvat katsottu täysikoossa, KK:lla ja PT:llä)
Jälkeen `lokit/esikatselu-20261105-210430`, ennen `-204213`. Grand Palais, Eiffel ja Riemukaari näkyvät 85°:ssa, ja Eiffel ei katoa kartan edellä.
- Malli ja kyltti: Pariisin usvassa pelkkä syvyys (`Horisonttiusva.KohdeNakyvyys`). Ruudun likiarvo antoi Eiffelille 0,85, kun kartta oli 0,57.
- `RuutuPiste`n raja 0,02 hylkäsi jalan 85°:ssa. Malli ei enää kysy sitä, ja kyltti antaa rajaksi -1 (`HorisonttiRaja`).
- **Korkeudet:** `MaanpintaH` 90 × kerroin 2 = 180 m ellipsoidista. Silmä 85°:ssa on `Nosto`n jälkeen noin 205 m, eli noin 45 m maan ja 25 m mallin jalan yllä. Katsepiste on noin 74 m:ssä eli maan alla.

## AVOIMET HORISONTISTA (KK:lle kerrottu, ei korjattu)
1. **Sävy:** ajossa -210430 75° ja 45° ovat tummempia kuin ajossa -204213, 85° ei. Syy selvittämättä. Muutos koski vain `_Usva`a ja kyltin rajaa. `Aurinko.cs:265` käyttää `DateTime.UtcNow`ia, mutta kellonaika ei yksin selitä, koska 85° on samassa ajossa kirkas. Tutki, jos KK tai PT pyytää; aja sama piste uudelleen ennen johtopäätöstä.
2. Eiffel ja Riemukaari erottuvat, vaikka kartta alla on usvassa (`hor-eiffel-raja`). Häipyy peitosta 0,6 alkaen. KK sanoo, leijuuko.
3. 85°:ssa ei nimiä, ei ennen-ajossakaan. Ei tutkittu; nimikerros on NUI:n alaa.
4. Katsepiste maan alla: korjaus nostaisi katsepisteen maan tasalle, mutta muuttaa kaikkien Pariisin kulmien rajausta. Vain KK:n päätöksellä.
5. `hor-kaukaa`:n taloton vyö ja Macin 640×480-tarkkuus: iPadilla tarkistamatta (-2050).

## ENSIMMÄINEN TYÖ: Tuileries'n pystysauma (PT, tulos KK:lle, rivi PT:lle)
NS:n kuva `lokit/natiiviseppa-kartta45-08a0ec8ea/rajaus-pystysauma-b-vasen-l-oikea.png` ja `l45-tuileries.png` (sauma x≈840 kuvassa, y 170–520). Kadut hyppäävät näytön pystysuunnassa, ja hyppy näkyy kummallakin tasovalinnalla. Vaakasauma on NS:n mukaan Mac-harha, sitä ei tutkita. **Koskeeko muita osien rajoja: PT haluaa vastauksen.**
- Hypoteesi, ei todistettu: maaston korkeusero vierekkäisten palojen välillä (eri tarkkuustaso, kerroin 2), joka näkyy vinossa kuvassa siirtymänä. Tuki: ylhäältä (`esikatselu-204213/op-ylhaalta.png`) siirtymää ei näy, mutta se on eri ajo. Karkea arvio: askel noin 20 m piirretyssä korkeudessa.
- Sauman pituusaste on arviolta 2,330. Lähin z13/z14-raja on 2,3291, eli noin 30 px sivussa. **Ei täsmää varmasti**, joten tarkista kartan osien oikeat rajat.
- **Koe valmiina:** `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/sk-pariisi-pystysauma.txt`, 4 kuvaa. Vertaa `sauma-45-k2` ja `sauma-45-k1` (puolittuuko askel, kun korkeus 1) ja `sauma-0-k2` (katoaako ylhäältä). `sauma-45-laaja` muille saumoille. Pyydetty JU:lta 21.08 (7875c668d, viesti jonossa). Jos vuoro tuli jo, aja: `PROTO_LINJA=<JU:n linja> ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh <W>/tyokalut/esikatselu.sh 7875c668d <skenaario> ipad --batch`, lopuksi "LUKKO VAPAA" + kesto + kuvamäärä.
- Taustaa: `TasainenLaatta` (1677800f5, NS 4.11.) tasaa striimin palat, Valosepän "Pariisin saumat" -kokeet (7068e23a4, 8f46b4e74, caa2c0918) ja `LiikeLaatat` (`maasto siirtyma`). Tarkista muiden haarat ennen korjausta.

## TOINEN TYÖ: Riemukaari 24p (Codex 967349726 ja 19cc4873d, lukematta; Codex odottaa KK:ta ennen muita alustoja)
`posti/codex-karttaseppa-alustat-24p-riemukaari-20261105/` tai vastaava (`git show --stat 967349726`): `pohja-uusi.png`, `huomiot.md`, kertoo saumarajoituksista "KK review". Lue, asenna `sarja24-asennus/korjaa-pohjat.py`:n kautta, ei `rajaa-pohja.py`:n. Kuvat ylhäältä ja 45° KK:lle ennen kytkentää, sitten kuittaus Codexille muiden alustojen aloittamiseksi.
- **Grand Palais ja Eiffel tarkistettu v7-maskia vasten:** kumpikin yhtenäinen, ei aukkoja, 0 % maskin ulkopuolella, maskista 93–94 % peitetty. Puuttuva osa on omat rajaukseni (0906b3c15 ja 9e8c8ab1e, rantatie näkyviin). Grand Palais'n kuvissa ei näy suorakulmiota. **Eiffelin vaalea neliö tornin alla on pohjakuvassa selvä kierretty suorakulmio; katso hor-85-eiffel ja hor-matala-270 ja kerro KK:lle**, jos säännön vastainen.

## ODOTTAA KK:TA (kysytty 21.03 ja 21.07; viestit jonossa, ei vastausta luovutushetkellä). Kuvat `_tyo/karttaseppa/kk-20261105/`
1. **Sacré-Cœur 24n (181deae6e):** suositus: kirkko tästä otosta, mäki itse pelissä erillisenä pehmeänä kumpuna. Ei uutta ottoa. Tripo odottaa.
2. **Invalidit 24o (a8e271271, 45b55f0c6):** suositus: kuvat Tripolle sellaisina ja PT:n päättämä toinen otto. Poikkeama: kaakkoiskorttelissa 6 pihaa lounaiskuvassa, 4 koilliskuvassa. Vaihtoehto: uusi Codex-kuva. Tripolle erillinen viesti vasta KK:n jälkeen; asennustiedot -2024:ssä.
3. **Montparnasse 24m otto 2 (3f81979fa):** epäonnistui: H/W 1,78 (tavoite 3,39), D/W 0,49, tumma puusyinen pinta, katto kunnossa. Krediittejä 90. Suositus: ei kolmatta ottoa, torni rakennetaan oikeista mitoista ilman Tripoa, ja julkisivu ja katto Codexilta. PT:lle on kerrottu, että päätös on KK:lla.
4. Opéra 24j: hyväksyntä odottaa edelleen (-2050).

## Opit
- Kerroin 2: `MaanpintaH` 90 on piirrettynä 180 m. Käsin laskettuna ilman tätä edellinen arvio peitosta oli väärä (0,60 / 0,71, oikea 0,57 / 0,85).
- Viestit KK:lle menevät jonoon, kun sillä on vuoro kesken: älä oleta luetuiksi.
