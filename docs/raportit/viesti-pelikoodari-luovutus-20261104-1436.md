# Pelikoodari: luovutus 4.11.2026 klo 14.36 – ovien arkki KK:lla

Korvaa -1337:n tilan; lue sen KK-kohdat ja -1320:n linjaukset ja muistiinpanot. Syy: konteksti yli 25 % (7.37). Polut kansiossa /Users/Shared/Claude/proto-3d/. **Merkitse jokaiseen tulokseen runko.**

## Tila
Proton haara `pelikoodari/tarkastelu-219` = **a26aca8f5** (worktree /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu; ei etärepoa). Kartta `_tyo/pelikoodari/kulkukartta/v3/`, `Resources/JuoksuOvet.json` samasta. `tyokalut/koekuvat-ovet-esineet-219.txt` on ajon lista. Arkit `lokit/tarkastelukuvat-a26aca8f5-143018/` (ovet-arkki.png, esineet-arkki.png). Ovikuvat lähetetty KK:lle 14.35, esinekuvat 14.1x (runko e94d66f4b; malli sama). Linjat vapautettu JU:lle.

## Sääntö nyt (kulkukartta.py ovet())
Järjestys etusivulla: aukko (myös mallin oma ovi, koska lehdet eivät ole kartassa) → portaat kävelyllä → `portaat-pinta` (pintojen nousu, alapää saa olla irti maasta) → keskelle → näkyvä sivu. Yli 4 m:n aukko: `aukko-leveä`, tavallinen ovi + täyte `tlev`, `tkork` (väri 0,62; 0,20; 0,15). Keskelle ja näkyvä: lähin `puhdas` seinä enintään 4 m tai 20 % sivusta, kynnys ei pois tasolta 1, muuten keskikohta. Jalusta: ovi päälle, lehti enintään `syv`. 259 ovea: keskelle 204, näkyvä 29, aukko 11, portaat 6, aukko-leveä 4, aukko-iso 3, portaat-pinta 2; tasolla 1: 219.
Löydös: etusivu hylkäsi seinän esteenä, jos pohja oli yli 1,5 m seinän sisällä (nyt 2,5 m); Suishoun oma ovi jäi siksi löytymättä. `te`-raja kannattaa muistaa, jos uusi rakennus saa "näkyvä"-lajin vaikka ovi näkyy kuvassa. Aukko-iso (taihe, baohe, 怡情书史) on kuvaamatta.

## Odottaa muilta
- **KK:** vastaus arkkiin ja kaivosuojaan 井 (suositus: ei ovea; sääntöön nimi 井, ei tälle rakennukselle). Listatut viat viestissä: 小房6 kapea väli, 南薰殿 jalusta ilman portaita, 弘义阁 terassin edessä, ikkunoita reunoissa (Pingfang 9, 绛雪轩).
- **LAV:** `katot-v125/koejuuri-jalustat` (mallin O portaat maahan asti). Jos juuri hyväksytään: lataa pinnat uudelleen (`--uudelleen`), aja kartta ja lista uudelleen. Leshou ja Yangxing muuttuvat aukko-leveäksi, Yihexuan portaiksi; kerroin LAV:lle, että sen ajon runko e94d66f4b on vanha.
- **PT/LAV:** maan raidat 四执库:n edessä, valkoinen palkki 弘义阁:n takana, leijuvat portaat; rivit lähetetty, en korjaa.
- Esineet: KK vie kuvan omistajalle; sävy ennallaan, kunnes omistaja vastaa. Ruukku `_tyo/pelikoodari/ulkoesineet-v1b/` (sisäisellä levyllä, koska T7:ää ei kannata käyttää ajossa). Ämpäriin ei viety.

## Tekemättä, järjestyksessä
1. KK:n korjaukset arkista.
2. Muisti iPadilla JU:n vuorolla: ovet + esineet, ei `palatsi kopiot 1`, vertailu ka 4000, huippu 4068 (c4a5bfafb), raja 4080. Lähtötaso ilman niitä ensin.
3. Koko kierros kahdesti JU:n vuorolla: väärin kierretyt -mittari, m15; sitten todistukset 1–4 (-1320).
4. Osa C (kynnykselle pysähtyminen, korkeus portailla, esineiden törmäys ja rikkoutuminen), Testinäkymän rivi, CS0152-selvitys: kuten -1320. Kynnys on nyt kuljettavalla, mutta jalustalla olevan oven luo ei pääse; osa C:n viesti siihen.

## Muistiinpanot
Työkalut: `tyokalut/ovikuvat.py` (kynnys ei portailla, kamera sivuun jos edessä ei ole lattiaa). Uudelleenajo noin 30 s, pinnat välimuistista. Arkin teko scratchpadin ulkopuolelle ei tallessa: PIL-ruudukko kuvalistan järjestyksessä, 5 × 3, 640 × 480. Numpy kuoren python3:ssa, ei `-I`. Viestit: PT local_8d8ebf72, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e.

## LISÄYS 14.4x: OMISTAJAN PÄÄTÖS 14.46 (KK:n välittämä)
Kala-allas ja kukkaruukku kelpaavat peliin. Väri pysyy; ruukun kaari korjattu mallit-v1b:ssä (vaihdettu, kuvalistassa). Omistaja näki da29a4288:n arkin, ei uutta e94d66f4b:n ruukkua. Ovimalli: omistaja hyväksyi kuvat, Lavastaja tilaa Tripolta; laatikko jää sijoituskokeisiin siihen asti. Muisti iPadilla JU:n vuorolla kuten kohta 2: **seuraava työ, pyydä vuoro JU:lta.** Esineiden ämpärivienti vasta PK:n vahvistuksella (`media-vienti-muuttaa-julkaistua`).

## LISÄYS 14.5x: KK 14.52
Kaivosuojat ilman ovea: sääntö nimestä 井, kärki **e66d866ba** (kartta v3 ja JuoksuOvet.json päivitetty, kääntämättä mutta vain dataa ja työkalu; kuvalistassa 14 ovea). Seuraava KK katsoo a26aca8f5:n arkin ja tuo palautteen. Muisti ja kierros JU:n vuorolla kuten kohdat 2–3, rungoksi e66d866ba.

## LISÄYS 15.0x: KK 15.00, palaute arkista a26aca8f5 (SEURAAVA TYÖ, ei vielä omistajalle)
**Koko palaute:** `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-juoksupeli-vapaa-maailma.md`, viimeinen osio. Lue se ensin. Yksi kierros säännöillä, ei rakennuskohtaisia korjauksia. Luvut koko joukosta ennen ja jälkeen.
Lyhyesti: (1) ovi ei peitä ikkunaa puoliksi, (2) sama ovi (绥寿殿 4 m pois), (3) matala seinä ei ole seinä (弘义阁), (4) ovi ei roiku ilmassa (南薰殿, 斋宫), (5) edessä oltava tilaa (小房6), (6) hämärä pimeäksi huoneeksi, ei ruskeaksi tauluksi, (7) 乾清宫:n ja 坤宁宫:n täyte samalla pinnalla kuin seinä.
Arkkiin samat 14 + 太和殿, 保和殿, 怡情书史 + viisi uutta arvottua, ovi näkyvissä joka kuvassa. Muisti yhdellä ajolla vasta tämän jälkeen.
Lähtökohdat koodista (kärki e66d866ba), eivät ratkaisuja:
- (1) `puhdas` hakee enintään 4 m tai 20 % sivusta ja palaa keskikohtaan, jos ei löydy. Pingfang 9 ja 绛雪轩 menevät tuohon paluuseen: laske, moniko ovi jää paluulle.
- (2) `aukko`-haara antaa `lev` = aukon leveys (W + 0,15). Sama ovi = aina OVI_L, ja aukon loppu täytteenä kuten `aukko-leveä`; LEVEA_AUKKO-raja poistuu tai pienenee.
- (3) `korkea_seina`: yhtenäinen pinta 2–3 m kelpaa seinäksi, joten kivinen terassi menee läpi. Raja: seinän yläreuna tai jatkuuko pinta ylös kattoon.
- (4) `jalusta` ottaa oven tason, vaikka portaita ei ole. 南薰殿:lla `syv` 0,25. Etsi sääntö: ilman portaita ja ilman syvyyttä ovi maasta asti seinän pinnassa, tai portaat vaaditaan.
- (5) ei tarkistusta oven edustan tilasta. `et`-kerros tai kävely 3–4 m:n matkalta `kynnys`-kohdasta; `nakyva`-sivun ja etusivun valinnassa.
- (6) Ovet.cs: hämärä on yksi laatta, väri (0,20; 0,16; 0,13), ja saa pelin valot. Pimeä huone: tummempi, ilman auringon valoa, ehkä syvyys sisäpinnoilla; 乾清宫-kuva `ovi-乾清宫.png` vertailuun.
- (7) `aukko-leveä`: täyte on `o.x` (kes + n × 0,33), eli edessä seinää. Seinän pinta saadaan viereisen seinän t:stä (`rv`, `tk`).
Muista: `tarkastelu_kuvat.sh` JU:n vuorolla; arkki PIL-ruudukkona; `ovikuvat.py` tarvitsee varmistuksen, että ovi näkyy: 小房6 läpäisi näköyhteyden, koska kartan ja koerungon mallit eroavat (tausta-v124 vs c4a).
