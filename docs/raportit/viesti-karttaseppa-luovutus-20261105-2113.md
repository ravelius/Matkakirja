# Karttaseppä: luovutus 5.11.2026 klo 21.13 (KS)
Syy: kova raja 35 % (7.37). **Tämä voittaa ristiriidassa. Lue ensin -2111 (b67953fc3, haara karttaseppa/luovutus-20261105-2111, tiedosto `docs/raportit/viesti-karttaseppa-luovutus-20261105-2111.md`): siinä on W, vahti, korkeudet ja pystysauman hypoteesi.** Tämä tiedosto korvaa sen ODOTTAA-kohdan ja työjärjestyksen.

## PT:n ja KK:n viestit nollauksen aikaan
- PT kuittasi 85°:n Eiffelin ja Grand Palais'n. **75°/45°:n tummuus on selvitettävä ennen kuittausta.**
- KK:n viesti "MONTPARNASSE Kyllä: toinen otto" on vanha ja jo tehty (3f81979fa). **Älä tilaa kolmatta ottoa.** Uusin KK-päätös alla.
- PT:n havainnot, vastattu rivillä: `hor-85-eiffel` säteittäinen venymä (x≈800, y≈950) ja `hor-85-270` Riemukaari kyhmyn päällä. Arvioni: vanhoja, koska 7875c668d ei koske karttaan eikä maastoon. **Ei varmistettu.**

## KÄYNNISSÄ: pystysaumakoe
`lokit/esikatselu-20261105-211044`, L2, 7875c668d, `sk-pariisi-pystysauma.txt`, 4 kuvaa. Ajoin sen JU:n vuorolla; kuvia ei ole katsottu. Tulkinta -2111:n mukaan, tulos KK:lle, rivi PT:lle. **Jos ajo päättyi ilman LUKKO VAPAA -viestiä JU:lle (local_b4a7e82a-2522-437f-84ff-813401120931), lähetä se heti: L2, kesto ajo.log:sta, 4 kuvaa.**

## TYÖJONO (KK 21.1x, kaikki Kyllä)
1. **Tripolle heti (kaksi lyhyttä viestiä postilaatikkoon, KK on päättänyt):**
   - **Sacré-Cœur:** otto 1 hyväksytty kirkkona, ei uutta ottoa. Selvitä, mitä Tripolta tarvitaan: retopo tai toimitus ottoa 1 varten.
   - **Invalidit:** 24o-kuvat (a8e271271) sellaisina, käynnistä toinen otto. Tulos KK:lle ennen asennusta.
   - **Montparnasse:** ei kolmatta ottoa, työ päättyy Tripolla.
2. **Sävy (PT ja KK vaativat):** kerro, mikä tummentaa kartan, ja koskeeko se iPadia. **Kartta ei saa tummua kulman tai paikan mukana.** KK: ennen-ajon `op-matala` (20.47, 75°) on myös tumma, joten syy ei ole korjaukseni eikä ajan kulu, sillä saman ajon 85°-kuvat ovat vaaleita. Huom: `-204213/hor-matala-270` (20.44, 75°) oli vaalea, joten pelkkä kulma ei selitä. Mittaa keskiväri PIL:llä, älä lue kuvia. Lähtökohdat: `Aurinko.cs:265` (`DateTime.UtcNow`, `AurinkoPaikallinen`), `Kompensoi`, `Rinne`, `Usva` ja `Ilma`.
3. **Katsepiste maan tasolle (KK):** kokeile omana committinaan, seuraavan ajon mukana, ei omaa ajoa. Tavoite: kallistaessa katsottu rakennus pysyy ruudun keskellä. Parit 45°, 75°, 85° samasta kohdasta → KK → omistaja. **Ei yhdistetä ilman omistajan sanaa**, eli pidä se omassa haarassa tai viimeisenä erillisenä committina. Paikka: `PalloKierto.LaskeAsento` (kohde = katseKorkeus 0; nosto `kohde += ylos * nosto`). Nimet 85°:ssa: ei muutosta.
4. **Mallin häipyminen, tavoite 19.30 (KK):** "kohde häipyy usvaan yhtä aikaa kartan kanssa, ei katoa ennen sitä eikä leiju sen yläpuolella." Nyt `KohdeNakyvyys` käyttää kyltin käyrää 0,6–0,9, joten malli pysyy täytenä, kun kartta on jo osin usvassa (`hor-eiffel-raja`). Ehdotus: mallille suoraan syvyyspeitto kyltin käyrän sijaan. Kyltti jää käyrälle. Pieni muutos `Nahtavyysalue.PaivitaUsva`:ssa; aja samassa ajossa kuin kohta 3 (mutta omana committinaan ennen sitä).
5. **Pystysauma:** katso kuvat, tulos KK:lle. Koskeeko muita rajoja (`sauma-45-laaja`).
6. **Riemukaari 24p (19cc4873d korvaa 967349726:n):** PT: katso pelissä, tulos KK:lle, muut alustat vasta kuittauksen jälkeen. Asennus `korjaa-pohjat.py`:n kautta.
7. **Sacré-Cœur pelissä (KK):** kirkko otosta 1. Mäki erikseen pelissä samanmuotoisena kuin hyväksytty `viisto-lounas`: pitkänomainen vihreä kumpu, joka ohenee kartan tasoon. Portaat mäen rinteeseen ilman rakoa kuten hyväksytyssä kuvassa. **Kirkko saman vaaleaksi kuin hyväksytty; malli on nyt selvästi tummempi.** Kuva pelistä ylhäältä ja 45° → KK.
8. **Montparnasse mitoista (KK):** rakenna 1,00 × 0,63 × 3,39, julkisivu ja katto Codexilta kuvina (Codexin kuvien pysyvä lupa; ensin tilaus). Mittari: tilauksen "tumma, sileä lasitorni, joka erottuu heti Pariisin vaaleasta kivestä, ja sen muoto tunnistuu ylhäältä ja viistosta". Ei puusyytä. Kuva pelistä → KK.
9. **Opéra 24j** pysyy kokeena; KK vie kuvan omistajalle. Pohja vaihtuu 24p:hen myöhemmin.

## Muuta
- Eiffelin vaalea neliö: katso (ks. -2111).
- Tämä checkout on paikallisella haaralla `koti/Matkakirja-karttaseppa`, luovutukset menevät etähaaroihin `HEAD:refs/heads/karttaseppa/luovutus-...`.
