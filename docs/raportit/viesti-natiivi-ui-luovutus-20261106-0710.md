# Natiivi-UI: luovutus 6.11.2026 klo 07.10 (konteksti 26 %, 7.37)

Täydentää -0225:ttä (haara natiivi-ui/luovutus-20261106-0225): sen KK:n lista, kyltin häipymisen suunnitelma ja tausta ovat voimassa, tämä korvaa järjestyksen.

## Tila
Haara natiivi-ui/merkki-pinta-219, kärki e7e8d7b5b, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, peili natiivi-backup peili/proto/natiivi-ui/merkki-pinta-219. EI KÄÄNNETTY UNITYSSÄ, ei ajettu, ei junaan. MaanPintaTestit 3/3 (koko Kartta-testejä ei ajettu; muutokset eivät ole puhtaassa koodissa).

## Tehty tällä vuorolla
1. Tasainen kartta (omistaja 06.58, vastuu KS): 77fc8ceec. MaanPinta palauttaa täysin tasaisella alueella KorkeusKerroin.TasaKorkeusM heti ilman kyselyä; muuten Piirretty. MalliKyltit:92 Piirretty. Nimikerros laskee elävien nimien paikat uudelleen, kun karttatasa kytkeytyy. KorkeusKerroin.cs otettu sellaisena kuin 3158bdc7b:ssä (KS); Komennot ja varjostin vain KS:n haarassa, joten karttatasa toimii vasta yhdistelmässä.
2. Nimet ja ohjelmakohteet (PT 07.0x, KK; VS apuna): 04d3835a8 + e7e8d7b5b. Nahtavyysalue.LisaaNimiEste(t, paikat, karkia, nakyy) ja KeraaNimiEsteet; vain Peittaa lukee esteet, kyltit ja pallot eivät. VS:lle lähetetty: poimi molemmat ja lisää kutsu LuoSeuraavaan kuudelle rakennukselle, ei silloille. VS:n sha ODOTTAA. Ilman sitä väistö ei vaikuta.

## Odottaa vastausta
- KK: korkeustaulukko supistettuna vain Montmartrelle (kysytty 07.0x). PT 07.0x: KK:n vastaus ratkaisee. Taulukon alue on 7,3–9,9 km keskustasta, eli kokonaan tasaisen 10 km:n sisällä (laskettu, ei ajettu). Ei taulukkoa ennen vastausta.
- KK: mäki esteeksi vain nimille muodon mukaan (selvitys lähetetty 07.0x). Syy: KS:n nahtavyydet-219:n rivi `if (string.IsNullOrEmpty(m.Nimi)) continue;` (0e054ad1b) ohittaa mäen, mäki jono 3080, nimet 2995. Kuva nui-m3 katsottu. Jos kyllä: lisää KeraaNimiEsteet-metodiin nimettömät mallit, älä muuta mallien silmukkaa.
- VS: sha, ks. kohta 2.
- KS yhdistää kärkeni yhteiseen ajoon (kerrottu e7e8d7b5b). Kokeiltu maa4 + nahtavyydet-219 + e7e8d7b5b: ainoa ristiriita MalliKyltit.cs:92; ratkaisu kerrottu KS:lle. KS tarkistaa muut Sovita-kutsut (KaupunkiPallot, Karttapisteet, KaupunkiMerkit, Symbolimallit.Maasto, Lipputanko) ajon parista: EI minulle ilman KS:n pyyntöä.

## Seuraavaksi (PT 07.0x: ei odota, järjestys oma; ei omaa ajoa, ei junaan, kuva yhteisestä ajosta KK:lle)
1. Kyltin häipyminen UI:n alla: suunnitelma -0225:ssä, KK hyväksyi. Aloittamatta.
2. Tuileries'n pyöreä kuva Louvren seinällä: KK:n listalla, ei tutkittu. -0225: "piste mallin alalla, korkeus ei ratkaise"; ei korjausta ilman KK:n sanaa.
Kyltin korjaukset eivät saa muuttaa kokoa, näkymisen etäisyyttä eikä sivua (2.215).

## Ajosta katsottava
Saint-Sulpice, Saint-Eustache, Madeleine, Palais Bourbon: nimi kokonaan tai ei ollenkaan. Pont Neuf: nimi ei katkea (1af8879d6; nui-m4:n ajossa ei ollut). Tasaisella: merkit ja nimet kartan pinnalla, ei viivettä; Montmartren ja reunan viive lokista ("MATKAKIRJA maanpinta"). Aaripisteet 38 × kärkimäärä kerran latauksessa rakennusta kohden: katso, näkyykö LuoSeuraavan kuvassa (ei mitattu).

## Huomiot
- KK:n osoite local_231e4bad. Viestit kulkivat SendMessagella; jonotetut eivät ole varmasti luettuja.
- Lukulista 7.47: luvut 4 ja 6 yhä lukematta.
- LOPPUTESTIT siirtyy: iPadin muisti, kun Pariisi valmis (2.209).
