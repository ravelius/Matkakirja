# Natiivi-UI: luovutus 5.11.2026 klo 15.37 (konteksti 31 %)

Korvaa -1510:n. Työhaara `natiivi-ui/kyltit-219`, kärki f29bbd0b5, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219.
Sääntö 2.214: näkyvä Pariisin askel → Macin kuva (polku + yksi rivi) KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Ei selitekaistaa, ei iPadia, Mac-ajot JU:n vuorolla. Tunnettua vikaa ei leikata kuvasta.

## Ensin
1. Kuittaa JU:lle (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd) "NUI valmis". Kyltti-ajo f29bbd0b5 on pyydetty JU:n jonoon 15.35; jos JU ei ole kuitannut, pyydä vuoro uudelleen.
2. JU:n viestillä ESIKATSELU NYT: `PROTO_LINJA=<linja> zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kyltit-219/aja.zsh` (haaran kärki). Kuittaa alku, rivi valmiista.
3. Kuvat: lokit-polku tulosteessa (ei `ls -t`, toinen linja voi olla uudempi). Vertailu edelliseen ajoon: /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261105-152511/.

## Tarkista uudesta ajosta
Törmäyskorjaus `NostotKartalla.KylttienTormays` (joka kehys, ajamatta): kiinteä kyltti pysyy paikallaan (omistaja 2.11. 08.14) ja törmäävä häipyy. Järjestys: 3D-kohteiden kyltit, sitten alimpana ruudulla oleva (lähin). 3 pt:n hystereesi.
- kyltti-2: oliko kasauma poissa? Jäikö liian vähän kylttejä? Tärkeä kohde voi hävitä, koska järjestys on vain ruudun korkeus: katso, tarvitaanko paino (kadonnut, taso 1).
- hor-1…3: omistaja 14.55 "matalalta vain lähimmät kohteet", 14.44 "nimi ei koskaan näy tyhjän tai taivaan päällä". Törmäys poistaa vain päällekkäiset; kaukaiset yksittäiset kyltit jäävät. Lisää etäisyysraja, jos näyttää väärältä. Lähimmät katunimet (Les Gobelins, Croulebarbe) ovat 85°:ssa hyvin suuria: arvioi, ja vie NS:lle tai PT:lle, jos ei omasi.
- kyltti-3, kyltti-7, nimet-1…7 kuten KK:n lista.
- Tuloskuva KK:lle, kopio PT:lle.

## KK:n avoimet (viestit 15.09 ja 15.30)
- Päällekkäiset nimet: tulos kerrottu KK:lle 15.3x. Palais de Tokyo/Trocadéro, République/Temple ja Orsay/Tuileries erillään; Metroasema/Sacré-Cœur lähes kiinni. Sorbonne/Liiku ei toistunut (Liiku on Kalusteet-listalla). Hyatt ei näkynyt näissä kuvissa.
- PARIISI-NIMI (KK 15.30, i-z13 ja VS:n g-z15, nimi etelässä lähellä Gentillyä): "Tarkista, onko tämä päällekkäisyyksien väistö, ja vie nimi keskustaan, jos se ei peitä nähtävyyksiä." Koodin mukaan väistö (`Merkittavat.Siirto` 13–18, jopa 9 korkeutta, Nimikerros.LisaaSuurkaupungit); kyltti-3:ssa nimi oli lähellä keskustaa. Skenaarion lopussa `komento nimet etsi Pariisi` kertoo syyn lokiin. HUOM: i-z13:ssa keskusta näyttää tyhjältä; tarkista, varaavatko piilossa olevat merkit tilaa. Kun kasauma on poissa, tee korjaus: keskipaikat etusijalle tai kaukaiset paikat pois, jos keskusta vapautuu. Rivi KK:lle.

## Muut havaitut (ei korjattu)
- Grand Châtelet'n ★-kyltti on Notre-Damen tornin päällä viistossa (kyltti-5, -7); Tuileries ★ Louvren mallin päällä. Nostokyltit eivät väistä mallien jalanjälkiä. Omistajan linja: kyltti ei mallin päällä (kohta 3D), ★ "leikkeen viereen". Arvioi uudesta ajosta.
- Kuumailmapallon kyltti (KarttaKyltti) ei ole törmäyslistalla ja peittää Les Halles ★:n (kyltti-3, nimet-1).
- Nostokuvake ilman kylttiä tai nimen päällä: Saint-Germain-des-Prés (kuvake nimen keskellä), piste Riemukaaren lähellä, kuvake Sainte-Chapellen vieressä, Orsayn kaksi kuvaketta (toinen tekstin päällä). KS:n "pienet kuvat pois" -alue: tarkista KS:ltä.
- kyltti-3:ssa, nimet-1:ssä ja nimet-2:ssa vasemmassa reunassa ja kulmassa sumea kartan raja (laatat, ei kyltit): rivi KS:lle tai Valosepälle, jos ei tunnettu.
- Valkoiset kyltit ovat 3D-kohteilla pystykirjaimin, nostoilla kursiivilla (Louvre vs. Eiffel-torni). 2.212 "samanlainen": tarkista, kumpi on tyyli, ja yhtenäistä.

## Tehty tässä sessiossa
- be9b73bc7: `KaytettyRaja` → `KallistusRaja` (käännösvirhe poiminnasta). Lento-haaran yhdistyessä palautetaan `KaytettyRaja()` ja `|| Kiertaa`.
- d2d97e163: batchin ruutu→paneeli-muunnos (cf9eaa640) tähän haaraan. Ilman sitä merkit ovat kuvissa vasemmassa yläkulmassa.
- Skenaario: `ui lentopiilo` pois, koska se piilottaa kyltit ja merkit. Nimet-kuvat tasolla 0.06.
- Ajo d2d97e163 exit 0; lokin ainoa poikkeus on Unity-editorin hakuindeksi. Tietokortin luokka "elava-kohde" ja Sainte-Chapellen napautus ovat yhä testaamatta.

## Huomiot
- Älä yhdistä KS:n ja lento-haaraa suoraan (52 committia, ristiriita Laattapalvelin.Elava.cs:ssä). Yhdistämisestä päättää PT, kun Pariisi kootaan. Vanha natiivi-ui/pariisi-lento-219 d5850ff4e: huippusuodatus ei ole kylttihaarassa.
- zsh: `"${K}:polku"`, ei `$K:polku`; rg:n olematon glob kaataa koko komennon.
