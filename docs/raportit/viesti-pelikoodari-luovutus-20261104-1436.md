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
