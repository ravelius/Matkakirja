# Natiivi-UI: luovutus 6.11.2026 klo 07.50 (konteksti 26 %, 7.37)

Täydentää -0721:tä (haara natiivi-ui/luovutus-20261106-0721) ja -0710:tä: niiden tausta on voimassa, tämä korvaa järjestyksen.

## Tila
Haara natiivi-ui/merkki-pinta-219, kärki 14f5a9c73, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, peili natiivi-backup peili/proto/natiivi-ui/merkki-pinta-219. EI KÄÄNNETTY UNITYSSÄ, ei ajettu, ei junaan. Kartta-testit 633/633.
Yhdistys 579ea327c + VS 4e751932b + 14f5a9c73: ei ristiriitoja (merge-tree). Suoraan VS:n kärki + 14f5a9c73: ristiriita MalliKyltit.cs:ssä; 579ea327c sisältää sen ratkaisun. KS:lle kerrottu seuraavaan yhteiseen ajoon.

## Tehty tällä vuorolla (KK 07.42)
1. Ajo 579ea327c katsottu (/Users/Shared/Claude/proto-3d/lokit/karttaseppa-yhteinen-579ea327c). KK: pari kelpaa, taulukko kelpaa kokeena, EI JUNAAN.
2. 1947d8642 viiveloki: Kartta/MaanPintaRuudukko.cs (MaanPintaOdotus, puhdas, testit), MaanPinta.Odottaa ja Saapui, kutsut Nimikerros.HaePaikka, NostoKerros.LisaaRuudulta, Kohdenostot. Rivi: `MATKAKIRJA maanpinta: odotti nimi|merkki "X" 4.5 s, 11.2 km keskustasta, ruudulla kyllä, tasaus 1`. Summa `yli 2 s odottaneita tähän mennessä` jokaisen "korkeudet valmiit" -rivin jälkeen. Enintään 500 riviä ruudulla, 100 ulkona. Ruudulla = jossain vaiheessa odotusta, usvan taakse jäävää ei erota.
3. 14f5a9c73 Tuileries: piste (48.86358, 2.32854), 170 m mallin länsipään ulkopuolella akselilla (oli 20 m). AsetaKuvanPaikka: PiirrosPeitot-kohteen kuva ilman näkyvää kylttiä vasemmalle (oli oikealle, kohti Louvrea). Syy näkyi keski-ylhaalta.png:ssä. Kartan kääntyessä ympäri kuva voi yhä osua malliin (ruudun vasen). Piirroksella piste tulee kuvapisteestä, oletan ennallaan; ei tarkistettu.
4. KK 07.42: pyöreä kuva häipyy kyltin mukana, nykyinen sääntö jää; neljä kyltitöntä katukuvaa eivät kuulu tähän. KK kertoo häipymisen omistajalle. EI TEHTÄVÄÄ.

## Ajon löydökset
- Viive tasaus päällä: mediaani 0,5 s, suurin 20,5 s (Marais, 10 870 näytettä), Pont Neuf ei odotusta, Montmartre enintään 1,7 s. Koodin mukaan jonoon vain yli 10 km keskustasta ja Montmartren taulukon ulkopuoliset; EI mitattu kohdittain, siksi uusi rivi.
- Kaikki 29 merkkiä (19–35 s) odottivat ennen karttatasa 1:tä, sen jälkeen 0. Tasauksetta odotus jää voimaan.
- ESIKATSELU POIKKEUS = Unityn SearchDatabase, ei pelin koodia.
- Pont Neuf nimi kokonainen. Nimet eivät katkea nurmen reunaan (Rue André Barsacq, Rue Livingstone). Merkit enintään noin 5 px edellisestä.

## Odottaa
- NS: leijuva talorivi Sacré-Cœurin takana (sc-80.png, x 920–1195, y 635–680) on mitattu: talojen maa 102–125, pohja 234–281 (2 × (maa + 15)), kartta vähintään 16–25 m alempana. Ei tasauksen reuna. Kaavamuutos odottaa PT:n sanaa, koodaamatta. TAULUKKO ON JOHDETTU SAMASTA KAAVASTA (tyokalut/natiivi-ui/tee-montmartre.py, altitude_minimale_sol + 15; Sacré-Cœur 274 m vs kartan kirkko 258 m). NS kertoo kaavan ja sha:n; SITTEN generoi taulukko samalla kaavalla. Ei ennen sitä. KK:n ehto: merkit ja talot samassa.
- KS: yhteinen ajo, jossa 14f5a9c73, VS 4e751932b ja sk-maa5. Pyydetty kuva Louvren länsipäästä etelästä 45°.
- VS: Pompidou-malli 26d0fcdf2 tulee kärjen 4e751932b mukana.

## Yhteisestä ajosta katsottava ja KK:lle
- `grep "maanpinta: odotti\|odottaneita" unity.log`, vain karttatasa 1:n jälkeen. KK: JOS ODOTTAVA KOHTA ON NÄKYVÄLLÄ ALUEELLA, TAULUKKO LAAJENEE. Ei laajennusta ennen sitä.
- Tuileries: kuva ja kyltti puutarhassa, ei Louvren seinällä; keski-ylhäältä ja etelästä 45°.
- Saint-Sulpice, Saint-Eustache, Madeleine, Palais Bourbon, Hôtel de Ville, Tour Saint-Jacques, Pompidou: nimi kokonaan tai ei ollenkaan. Nimi ei vilku liikkeessä: EI VIELÄ TUTKITTU (-0721).
- Kyltti RANSKA-otsikon ja Liiku-napin alla häipyy, ei vilku: ei tullut kuviin ajossa 579ea327c.
- Aaripisteet 38 × kärkimäärä kerran latauksessa: näkyykö LuoSeuraavan kuvassa (ei mitattu).
- KS:n kysymys: KaupunkiPallot:637, Karttapisteet:161/199, KaupunkiMerkit:385/1067/1224, Symbolimallit.Maasto:49, Lipputanko:342 käyttävät Sovita/Lisays eivätkä Piirretty. Ei näkynyt eroa, mutta kuvissa ei ole niitä läheltä; katso omalta zoomiltaan. Omaa ajoa ei ole pyydetty.

## Seuraavaksi
Ei omaa jonoa ennen ajoa tai NS:n kaavaa. Ei omaa ajoa, ei junaan.

## Huomiot
- Lukulista 7.47 EI luettu tällä vuorolla: lue seuraavassa.
- Työlistan rivi "Uusien 3D-kohteiden vaaleat kyltit" päivitetty 07.3x.
- Viestiraja tuli 07.48 (10 viestiä); PT:n viesti meni varakanavalla (12.20).
- KK:n, NS:n ja KS:n jonoviestejä ei ole vahvistettu luetuiksi, paitsi KK:n ja NS:n vastauksista näkyvät.
