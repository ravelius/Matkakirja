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

## LISÄYS 07.2x (tämä korvaa ylempänä olevan "odottaa KK:ta"; kärki 0be5ac89e; KS:lle ilmoitettava uusi kärki, ks. Ensin)
Tehty: mäki esteeksi (KK:n kyllä) 0be5ac89e, KeraaNimiEsteet: nimettömät mallit, vain nimille. KK:n sanat: "nimi kokonaan tai ei ollenkaan; naapurien nimet säilyvät, kyltit eivät muutu, eikä nimi vilku kameran liikkuessa. Tuo nui-m3:n kamerasta pari seuraavasta yhteisestä ajosta, ja katso samalla Pont Neuf." Vilkkuminen on katsomatta: ValitsePaikka-hystereesi koskee vain väistyviä nimiä.

### ENSIN: korkeustaulukko supistettuna (KK kyllä 07.1x, korvaa 02.41:n koko alueen taulukon)
KK:n sanat: "Tavoite: merkit ja nimet näkyvät heti paikallaan, eivät koskaan 0 m:ssä, eikä tasaisen alueen ja Montmartren rajalla näy hyppyä. KS:n kaava on sama lähde kuin kartalla. Montmartrella merkit ja talot eivät saa näkyvästi erota toisistaan. Reunan viive mitataan yhteisestä ajosta (mediaani ja suurin), ei omaa ajoa eikä junaan. Jos nimi tai merkki ilmestyy näkyvällä alueella myöhässä, taulukkoa laajennetaan eikä viivettä hyväksytä. Tuo pari ja luvut minulle."
Suunnitelma (aloittamatta, data katsottu vain otsikoista):
- Data: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/tee-palat.py, ign/*.json (altitude_minimale_sol), T['maa'] rivit 122–177. Talot: Sovita(maa + 15), joten taulukkoon raaka maa + 15, jotta merkit ja talot täsmäävät.
- Alue: Montmartren reikä 48.8867, 2.3431, säde 1400 m (700 + 700) + vähintään yksi ruutu reunaa; MaanPintaRuudukko-kulmat, noin 460 arvoa. Pieni puhdas C#-luokka (short[]), lisää kaanna.sh:n LAHTEET-listaan, testit MaanPintaTestit.cs:ään. Täyttö naapureista, missä ei taloja (hautausmaa).
- MaanPinta.Hae: TasaOsuus >= 1 → vakio (tehty); muuten, jos tasaus on päällä (TasaOsuus keskustassa > 0) ja kaikki neljä kulmaa taulukossa → Piirretty(lat, lon, taulukko) ilman kyselyä ja näkyy heti; muuten Cesium kuten nyt. Tasaus pois = täsmälleen nykyinen.
- Ei koskaan 0 m: Paivita-metodin epäonnistunut näyte ja KaikkiNollaan tallentavat nyt 0.0. Vaihda vara-arvoon raaka 45 m (Sovita = 90 = tasainen, ei hyppyä) ja korjaa lokiteksti "jää 0 m:iin".
- Tarkista kuvasta mäen laki (KK:n vanha ehto). Reunan 10–14 km viive: mediaani ja suurin lokista ("MATKAKIRJA maanpinta"), myöhässä → laajenna taulukkoa.

### PT 07.1x: testikuva samaan korjaukseen (ei uusi työ)
/Users/Shared/Claude/proto-3d/lokit/karttaseppa-pariisi-mp-e263b4b73/puut-ylhaalta.png: pyöreä merkki peittää "Saint-Germain-des-Prés'n luostari" -nimen alun, "Pompidou-keskus" jää pallon hintakyltin alle, "Place Dauphine" katkeaa puuhun. Tarkista, onko 0a5232aec ("embâcle") seuraavassa ajossa. Selvitä, miksi Peittaa ei estä näitä, vaikka puut, kyltit ja pyöreät ovat sen listoilla (kuvaa ei katsottu, ajo ei ehkä sisällä väistöä). Pallo Pompidou-nimen päällä: KK 19.59 "pallo jää ulos, ei muuteta" -0225:ssä; tarkista KK:lta ristiriita PT:n sanan kanssa.

### Järjestys
Ilmoita kärki KS:lle ja JU:lle → taulukko → PT:n kuva → kyltin häipyminen → Tuileries. Tuo KK:lle pari nui-m3:n kamerasta, Pont Neuf ja luvut seuraavasta yhteisestä ajosta.
