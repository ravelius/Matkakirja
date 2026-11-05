# Natiivisepän luovutus 6.11.2026 klo 01.58 (konteksti 35 %, kova raja, 7.37)

Korvaa -0125:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Yötila: omistaja nukkuu, kysymykset PT:lle. Cron "4 9 * * *" unity-julkaisut.py uudelleen, jos sitä ei ole (Raamattu 7.41, luovutus -2101; tarkistamatta tässä sessiossa).

## SEURAAVA TYÖ
Odota KK:n ja PT:n sanaa. Tulos on molemmilla (viestit 01.5x). PT 02.0x: EI kolmatta kaavaa eikä ajoa ilman PT:tä. Älä sano "korjattu": mäen laki ei istu. Ei junaan, ei iPadia. Raja ja maskit ennallaan.
Tee ilman ajoa, jos KK ei sano muuta:
1. Katso `selvitys-c5/m5-erotus-rajaus.png` (punainen = kartan talo talot pois -kuvassa, mutta vaalea maa talot päällä -kuvassa; 26 239 px) täysikoossa ja m5-laki- ja m5-ei-rajaus rinnakkain. Puuttuuko kartan omia taloja mäellä oikeasti, vai onko kyse 3D-talon vaikutuksesta tai kynnyksestä? Kerroin KK:lle tämän varmistamatta. Tulos KK:lle.
2. Katso m1 ja m3 täysikoossa (vain pienennettyinä katsottu). Arvioi c5:n muut viat uudelleen (KK:n pyyntö). Rivi KK:lle, viat nimettyinä.
3. KK:n johtolanka: maasto on pinnan malli (KS: Louvre 146, Opéra 140, Tuileries 70), joten lisä voi vaihdella puistojen ja korttelien välillä. Ei eritelty. Samasta ajosta, ei omaa ajoa.
4. Jos KK hyväksyy suunnan: korjaus on vain ajohaarassa natiiviseppa/ajo-pariisi-maa2, EI haarassa natiiviseppa/marais-talot. Poimi sinne vasta sanalla.

## Tulos
Syy: `TaloKerros.cs:239` nosti talot kaavalla 2 × (maa + 55), mutta kartta on noin 85 m alempana. Vyö ja Quai de Contin talot olivat sama vika: talo piirtyi noin 90 px pohjaansa ylemmäs. Palat olivat ladattuja ja piirrettyjä. Sovita tuli sarjassa 22f6538a9. Yksityiskohdat: `_tyo/natiiviseppa/pariisi-talot/selvitys-c5-raja.md`, kohta Ratkaisu ja päivitykset.
Ajot (kaikki exit 0, 0 PUUTE, 0 Shader error, 0 error CS; PT:n luvat KÄYTETTY):
- natiiviseppa-pariisi-maa-16dc02e73: kaava maa + 55. Ajautui ajoon, ennen kuin perumiseni ehti JU:lle. Rinteillä noin 34 m liian matalalla. Ei aamun kuva.
- natiiviseppa-pariisi-maa2-64820ec1a (haara natiiviseppa/ajo-pariisi-maa2, = 14486a929 + MaaLisays 15, eli Sovita(maa + 15), skenaario sk-pariisi-maa2.txt): 7 kuvaa, m1, m3, m5-laki, m4 sekä m4-, m3- ja m5-ei-taloja.
Pinta talot pois -kuvista (`selvitys-c5/laki-maa2.py`, ryhmät talon oman maan mukaan, kaava 2 × maa + lisä; kaavan lisä on 30):
- maa 45–60 ja 60–75: lisä 28
- maa 75–90 ja 90–105: lisä 24
- maa 105–125: lisä 8 (noin 2 300 seinän kärkeä, piste 0,096; lisällä 28 piste −0,010), eli talot noin 22 m liian ylhäällä, kuvassa noin 28 px
Erotus vs kaava 2 × (maa + 15) (`pinta-maa2-ajo.py`): paras dU −5 kaikissa m3, m4, m5; dU 0 lähes sama.
Kuva m4-raja katsottu täysikoossa: talot pohjillaan, vyö poissa, talot päättyvät suoraan litteään karttaan Notre-Damen alueen rajalla. Sacré-Cœurin aukko ennallaan (maski).
KK 01.4x: korjattu ajo korvaa c5:n aamulla, jos talot istuvat pohjillaan; jos ajo ei valmistu, c5 ja vika kerrottuna. Suositukseni KK:lle: m4 ja m1 korvaavat c5:n, laki ei ole valmis. KK:n päätös odottaa. Kuvat: lokit/natiiviseppa-pariisi-maa2-64820ec1a. Rajaukset: `selvitys-c5/m4-raja-rajaus.png`, `m5-laki-rajaus.png`, `m5-ei-rajaus.png`.
Auki: 30 m:n lisän syy (ei IGN:n eikä pelin maaston suora tulos: ero 2 × maastoon −27…+18). Mahdollinen, ei todennettu: kaupungin pinnan malli.

## Muu tila (kuten -0125)
Liiku 99748962f odottaa KK:n sanaa (Postivahti: tehty, ei lähetetä uudelleen). KK:n 11.8-kysymys vastattu; `selvitys-c5/suojatut-paloissa.json`, omistaja päättää aamulla, älä muuta paloja sen takia. Talorintama aamulla kortilla: älä muuta alueita tai maskeja.
Kyltit usvassa ilman rakennusta; VS:n kohteet OHJELMA-listaan, kun ovat pelissä; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia. Maskit sacre-coeur ja montparnasse jäävät; KS:n kuittaus kumoavaan viestiin tarkistamatta.

## Viestit
`SendMessage` on tässä sessiossa viestirajalla; käytin varakanavaa mcp__ccd_session_mgmt__send_message (CLAUDE.md, VIESTIRAJA). Annoin 01.45 väärän tiedon, että 16dc02e73 oli peruttu; korjattu KK:lle ja PT:lle.

## Työtapa
Ajohaara työpuuta koskematta (tilapäinen indeksi + commit-tree, malli `tee-ajohaara2.py` ei säily: ks. selvitys). Palatiedostot python3.14:llä ilman -I:tä; älä tee paloja uudelleen ajon aikana. Proto-sha:t löytyvät wt/proto-natiiviseppa-marais-työpuusta, eivät tästä reposta. Ei junaan, ei iPadia.
