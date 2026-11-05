# Julkaisija: luovutus 5.11.2026 klo 20.32

Rooli: Julkaisija (JU). Korvaa -1953:n ja -1953b:n ALOITA-osat. Voimassa: -1906:n TAPA ja -1812:n SITOVAT LINJAT, VIRHEET ja OPIT (haarat julkaisija-luovutus-1906, julkaisija-luovutus-20261105-1812). T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

## ALOITA TÄSTÄ
1. PK cc5e1e9bc (ajo-skm.sh, 2 kuvaa): sai ESIKATSELU NYT L1 20.29, ajaa itse. Odota LUKKO VAPAA ja kirjaa kesto ja kuvamäärä jonolokiin. Jos L1 on tyhjä eikä PK ole aloittanut, jätä vuoro voimaan; vapaan linjan saa antaa muille.
2. Jono on muuten tyhjä. L2 vapaa 20.30. Tulossa seuraajalle: NS:n uusi yhteinen pyyntö (d369d4aab:n tilalle, omistajan päätös 20.20) ja KS:n horisontti nollausten jälkeen.
3. Burst: PT:n pyynnöstä tarkistettu aja22:n lopussa: merkki /tmp/matkakirja-burst-jit-alkuperainen poistui, BurstCompilation = 0. Alkuperäistä arvoa ei voi enää todentaa, merkki kirjoitettiin 20.09. Rivi PT:lle lähetetty; jos PT sanoo arvon olevan väärä, päätös on PT:n tai omistajan. Älä mittaa suorituskykyä ennen PT:n kuittausta.
4. Tarkista `ps` ja lukot, käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh). Valovahti pid 90769 oli käynnissä 20.00. Kerro PT:lle "JONO TYHJÄ: Julkaisija", kun PK on ohi. -1953:n kohta "montako puuttuu" (eheysvartija) jäi tässä vuorossa tarkistamatta, tarkista onko PT saanut rivin.

## JUNA 219
- Junarunko julkaisija/runko-219-muisti on nyt 94f7eb0e4 (0a353e6d0 + PK:n 7de953bc9, ristiriidaton, natiivi-backupissa, ei käännetty). Tulkinta: tämä on junahaara, ei pariisi-219, jossa on "ei junaan" -kokeita; PT:lle kerrottu. PK: 73f708b88 ja 1bf2fa8d6 EIVÄT mene junaan.
- TEKEMÄTTÄ: NUI proto 627a664c4 (kyltit-219) poimitaan yksinään, kun web PR 6307 on yhdistetty. Generoidut Tyylikirja-ristiriidat: `node tools/tyylikirja.mjs --natiivi <proto>`. Tarkista PR:n tila.
- Ei käännöstä, ei TF:ää ennen kuin Pariisi on valmis (omistaja 19.26).

## LINJAT TÄSSÄ VUOROSSA
- Omistaja 20.09 (PT 20.11): kartan Mac-ajoissa ylhäältä otetun lisäksi n. 45° samasta kohteesta, kerroin 0.465, kuvaraja Raamattu 10.5 ennallaan. Yli 20°:ssa kartan tarkkuustaso ei vastaa iPadia (muisti mac-batch-tarkkuus-640x480).
- PT 20.05: kaikki Pariisin kartan Mac-ajot ESIKATSELU_PISTEKERROIN=0.465.

## AJETTU 20.00–20.30 (jonolokissa kesto ja kuvat)
NS nimi ja william2 fcba229ca; KS 09417bdb7, 56dfe057f, fd711e501; PK cc5e1e9bc (sk-l); LAV aja20, aja21, aja22, v6k30; NUI 6bb2744d4 ja -45. NS william-esitys d369d4aab valmistui ennen perumista. Pysäytetty: NS william3 b5205fa87, NS aloituslento-reitti d369d4aab, LAV aja22:n ensimmäinen käynnistys.

## VIRHEET JA OPIT
- `mac-ajo.zsh` ei sovi ajoon, jossa ei ole kuvia: esikatselu.sh antaa "VIKA kuvia ei syntynyt", vaikka ajo on onnistunut, eikä kopioi lokeja. Kopioi loki.txt ja unity.log käsin esikatselu-kansiosta. Korjaamatta.
- TaskStop tappaa ketjun ilman trapia: lukot, L1/L2-kopion muutokset ja Burst-merkki jäävät. Siivosin kopiot (`reset --hard`, `clean` kuten palauta()) ja omat lukot pid-tarkistuksella. Burst palautui vasta seuraavan ajon lopussa. Tarkista ennen siivousta Unityn cwd: Unityn komentorivillä lukee `-projectPath .`, ja 20.15 luulin KS:n Unitya melkein omakseni.
- Turvatarkistus esti burst-jit.sh:n sourcen samassa komennossa (20.27). En kiertänyt; PT ja KK tietävät.
- Peruttuja ajoja tuli kolme alle 15 minuutissa. Odotusskripti käynnisti ajon heti linjan vapauduttua, joten perumisikkuna on lyhyt.
- Skenaario luetaan Unityn käynnistyessä, joten rooli voi vaihtaa sitä vain ennen sitä. NUI:n 20.17 päivitys myöhästyi 24 s ja ajettiin uudelleen omaan kansioon.
- L2-kopion juuressa on ylimääräinen tiedosto nimeltä `\v`. En poistanut; ei ole minun tekemäni tästä vuorosta tietääkseni.
- Osoitekirja: KK:n id local_d5f31591 ei löydy tällä hetkellä; päätilin KK on local_231e4bad (list_sessions).
