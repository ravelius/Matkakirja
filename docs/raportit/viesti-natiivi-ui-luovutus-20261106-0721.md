# Natiivi-UI: luovutus 6.11.2026 klo 07.21 (konteksti 25 %, 7.37)

Täydentää -0710:tä (haara natiivi-ui/luovutus-20261106-0710) ja -0225:ttä: niiden KK:n sanat ja tausta ovat voimassa, tämä korvaa järjestyksen.

## Tila
Haara natiivi-ui/merkki-pinta-219, kärki 31b1e5a7a, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, peili natiivi-backup peili/proto/natiivi-ui/merkki-pinta-219. EI KÄÄNNETTY UNITYSSÄ, ei ajettu, ei junaan. Kartta-testit 630/630. Unity-koodia (MaanPinta.Hae, kyltit) testit eivät kata; C#-virhe voi yhä tulla yhteisessä käännöksessä.

## Tehty tällä vuorolla
1. Montmartren korkeustaulukko 6543cbec4 (KK kyllä 07.1x). Kartta/MontmartreKorkeus.cs (short[], desimetrit), generaattori tyokalut/natiivi-ui/tee-montmartre.py, lähde _tyo/natiiviseppa/pariisi-talot/ign (altitude_minimale_sol + 15). MaanPinta.Hae: tasaus päällä (TasaOsuus keskustassa > 0) ja piste taulukossa → Piirretty(taulukko) ilman kyselyä; tasaus pois = kysely kuten ennen. Epäonnistunut näyte 45 m eikä 0 (Sovita 90).
   POIKKEAMA suunnitelmasta: 75 m:n ruudut 150 m:n sijaan, 2 303 arvoa (ei noin 460). Syy: 150 m:llä Sacré-Cœurin kohta jäi rinteen keskiarvoon, raaka 122 m; 75 m:llä 137 m. KK:lle kerrottu.
   Laskettu, ei ajettu: 12 110 talon ero taulukkoon mediaani 0,9 m, p95 4,3 m, suurin 18 m (ruudulla × 2).
2. PT:n testikuva puut-ylhaalta.png: ei koodimuutosta. Ajo e263b4b73 ei sisällä korjauksia: sen Peittaa lukee vain mallit ja kyltit, 0a5232aec ja 413bc6c64 puuttuvat. Kärjessä puut ja pyöreät ovat Peittaassa ja embâcle-suodatus on mukana. PT:lle kerrottu. Todistus vasta yhteisestä ajosta. Pallo Pompidou-nimen päällä: PT perui oman huomionsa, 2.215 (KK 19.59), ei muuteta, ei kysytä KK:lta.
3. Kyltin häipyminen 31b1e5a7a (KK 02.3x). Kartta/KylttiUiEste.cs (puhdas, testit), UiNakymat.KyltinEsteet (Kartuscha.NakyvaKortti ja Matkavalinta.LiikuLaatikko), KarttaKyltti.UiPeittaa; kutsut NostotKartalla.KylttienTormays, MalliKyltit.Paivita, KaupunkiPallot. Häivytys on olemassa oleva USS-siirtymä (nimio 0,22 s), EI -0225:n suunnitelman Haivytys-laskuria. Hystereesi 8 pt. Köysi häipyy pallon kyltin mukana. Kohteen pyöreä kuva häipyy kyltin mukana nykyisellä säännöllä (KuvatKylttienMukaan). KK:lta kysytty, pitääkö pyöreän kuvan jäädä.

## Odottaa vastausta
- KK: 07.2x-viesti (taulukko, riski, pyöreä kuva). Vastausta ei ollut luovutushetkellä.
- VS: sha nimiesteille. linssiseppa2/ohjelmakohteet 5d9a966c1:ssä ei ole LisaaNimiEste-kutsua; pyydetty uudelleen 07.2x (jonossa). Ilman sitä väistö ei koske kuutta rakennusta.
- KS: yhdistää 31b1e5a7a:n yhteiseen ajoon (kerrottu). Yhdistymistä kokeiltu vain e7e8d7b5b:llä (MalliKyltit.cs:92). Tämä kärki koskee myös MalliKyltit-, NostotKartalla- ja KaupunkiPallot-tiedostoja: ristiriita mahdollinen. Huom: taulukko on käytössä vain karttatasa 1:llä.

## Avoin riski: katso ensin yhteisestä ajosta
Taulukko antaa Sacré-Cœurille Sovita 274 m. Ajossa maa2-64820ec1a kartan kirkko oli kohdassa 258 m (y 848 vs 850, -0225), eli merkki voi olla noin 16 m (noin 17 px m5:n kamerassa) kartan yläpuolella. Talot käyttävät samaa kaavaa ("Mäillä tarkistamatta", TaloKerros), joten merkit ja talot täsmäävät keskenään, mutta molemmat voivat olla laella kartan yläpuolella. Ei korjausta ennen kuvaa. Jos näkyy: rivi KK:lle ja NS:lle (talojen kaava on NS:n), älä muuta taulukkoa yksin, koska KK:n ehto on merkit ja talot samassa.

## Seuraavaksi
1. Tuileries'n pyöreä kuva Louvren seinällä: KK:n listalla, ei tutkittu. -0225: "piste mallin alalla, korkeus ei ratkaise"; ei korjausta ilman KK:n sanaa.
2. Kun yhteinen ajo tulee, tuo KK:lle (KK 07.1x): pari nui-m3:n kamerasta, Pont Neuf, viive (mediaani ja suurin) lokista "MATKAKIRJA maanpinta". Myöhässä näkyvällä alueella → laajenna taulukkoa, ei hyväksytä viivettä.

## Ajosta katsottava
- Mäen laki ja merkin ero kirkkoon ja taloihin (riski yllä). Ei hyppyä tasaisen ja mäen rajalla (1 400 m).
- Saint-Sulpice, Saint-Eustache, Madeleine, Palais Bourbon: nimi kokonaan tai ei ollenkaan. Pont Neuf ei katkea. Nimi ei vilku kameran liikkuessa: EI VIELÄ TUTKITTU (ValitsePaikka-hystereesi koskee vain väistyviä nimiä; KK:n ehto).
- puut-ylhaalta-kohta: luostarin nimi, Place Dauphine, embâcle.
- Kyltti RANSKA-otsikon ja Liiku-napin alla: häipyy, ei vilku; napautus ei mene piilossa olevalle.
- Aaripisteet 38 × kärkimäärä kerran latauksessa: näkyykö LuoSeuraavan kuvassa (ei mitattu).

## Huomiot
- Lukulista 7.47 EI luettu tällä vuorolla (periaatteet, oma rivi): tein -0710:n järjestystä. Lue seuraavassa.
- Tämä kärki ei muuta kylttien kokoa, näkymisen etäisyyttä eikä sivua (2.215).
- LOPPUTESTIT siirtyy: iPadin muisti, kun Pariisi valmis (2.209).
- Viestit kulkivat send_messagella; VS:n viesti jonossa, ei varmasti luettu.

## LISÄYS 07.2x: VS:n kutsu tuli
VS: 14763c0c9 (natiivi-backup linssiseppa2/ohjelmakohteet-nimet), Kohde.NimiEste kuudelle rakennukselle, sillat pois. Kääntyy vain yhdessä merkki-pinta-219:n kanssa. Ei enää odoteta VS:ää; KS:lle kerrottu, että tämäkin haara yhteiseen ajoon.
Kokeiltu yhdistys 14763c0c9 + 31b1e5a7a (merge-tree, ei kääntäen): ainoa ristiriita MalliKyltit.cs:n Portti/RuutuPiste-kohta; ratkaisu KS:lle (Portti(kierto)-lohko ja Piirretty minun, RuutuPiste-kutsu horisonttiargumentteineen KS:n). KS:n oma maa-haara ei ollut tässä kokeessa.
