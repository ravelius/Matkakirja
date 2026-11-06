# Natiivi-UI: luovutus 7.11.2026 klo 01.34 (PT: lepo, tilanne luovutukseen)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, haarassa natiivi-ui/nimi-syoksy-2, puhdas. Ei ajoja käynnissä eikä jonossa.

## Tila
Ei uutta työtä yöllä (PT 01.3x). Kaikki kokeena, ei junaan. Aamulla KK ja PT päättävät; poiminta vain PT:n sanalla.

## Yön kohdat, kaikki valmiit
- k04, iso PARIISI: RATKESI 2. yrityksellä, 81db2de0e (natiivi-ui/nimi-syoksy-2 = 7ffd6ab5f + korjaus). Syy: KaupunkiMerkit-nimiö kasvaa kartan mittakertoimella (enintään 64-kertaiseksi), ja liikelukko (NimiLadonta.LukittuNakyvyys) pitää sen näkyvissä koko syöksyn. Korjaus: nimi häipyy yli 45 %:n leveydellä (NimiLadonta.KaupunkinimiLiianLevea, KaupunkiMerkit.cs). 1. yrityksen rivi Nimikerroksesta poistettu. Ajo lokit/nui-nimi-tallenne-3, pari pari-k04-ennen-jalkeen.jpg; KK sai kuvan 01.33.
  Rajaukset: vain Mac; koskee kaikkia kaupunkeja myös levossa; kuvissa 88–97 ei kaupungin nimeä. iPad-kuva, jos viedään junaan.
- k05: ei näy, ei korjausta. k01f: 2 yritystä, raja ei näy, ei korjausta. k12–k13: Macin 640 px:n ominaisuus, ei korjausta peliin.
- Kuvapallot 7ffd6ab5f: kelpaavat kokeena (KK omistajan valtuutuksella 01.13). Jää: Café de Flore'n pallo kartan nimen päällä; KK kertoo omistajalle aamulla kartan pienet nimet pallon alla.
- Meren tumma suorakaide (nui-yksi-k01f-2/v-k01f.png): ei minun, PT vie KK:n aamun koontiin.

## Kokeet haaroissa
Uusin yhdistelmä natiivi-ui/nimi-syoksy-2: aloituslento-paketti 6d12054b0 + kuvapallo + kartan nimipäätös + k04. Muut: intro 8ac8d2a70 ja 51f9fad72; nimirivi c8a71c1cd; Galerie f29ff0335.
Intron Mac-kuvat aina paketin sisältävästä haarasta (6d12054b0; luetaan lokit/julkaisija-laite-218-2cba21a3e/; jos kansio siivotaan, paketti puuttuu).
Junaan vietäessä pois: `ui kuvajumi`, mittausrivit, kyltti-ui-lokirivi ae497b124, `ui saapumiskuva kyltit`-lokirivit, paketin ja 2752 px:n koehaararivit.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (myös kk-sarjassa, syy selvittämättä, ajot jatkuvat). Tyhjä pohja ja vino reuna ajossa 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti` ei merkkiä; NS:n Liiku 43a2fa300; tappien lasku vaakapuhelimelle UI-sarjan jälkeen. Havaintoja, ei korjattu: piiloelementin suodin; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö; Lopeta kierros ja Linssit lähes samassa; Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus tarkistamatta; k03 palikkainen meri (VS/KS).

## Opit
- Pienkapiteeli ja harvennus erottavat kerrokset: ensin kirjainkuva (P iso, muut 0,8 = TMP SmallCaps), sitten haku characterSpacing/SmallCaps; niin löytyi KaupunkiMerkit. Älä päättele kerrosta säännöstä ennen kuvaa.
- Mittaus: tummat pikselit < 125 ja x-laajuus, rivit 90...h-140, kuvat 70–124; arkki ja pari lokit-kansiosta.
- Kaappaus pysäyttää pelin; kuvasarja ei kerro kestosta eikä latauksesta. Tallenne vain logiikkaan.
- zsh: `$a`-silmukassa `${=a}`. Laajat git grep/log -S voivat kestää yli 2 min: rajaa polulla. Peli-testit/unity-tarkistus.sh sh:lla, noin 1 min. Viestit send_messagella id:llä, PT:lle enintään 3 riviä. Etäyhteys vain KK:lla ja PT:llä. Hookin työlistarivit eivät ole minun.
