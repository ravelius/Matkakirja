# Valoseppä – luovutus 18.10.2026 yö (PT:n ohje Postivahdin kautta: ei uusia töitä, kesken-tila luovutukseen)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261017-myohaisilta.md (562a9fd81).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, PK local_7fcab04b-864c-4ec2-98bd-46e171326701, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja $D/JONO.md (kaikki rivit). SIMUT VAIN JU:n "SIMU NYT" -viestillä, heti perään "SIMU VAPAA".

## 0. ENSIMMÄISENÄ: KOHDEVALIKKO-201 (PT 00.33, omistajan julkaisupyyntö 00.18 "kaikki junaan 201") – KESKEN
Tehtävä: ISS-kohdevalikko ilman ikkunaa junaan 201: koko näkymän päällä, tausta pehmennettynä ja tummennettuna pysäytyskuvana UUTENA
POHJANA (omistaja 22.59); luonnos NUI _tyo/natiivi-ui/iss-hammasratas-luonnos-0024/ 4. ruutu (LUE.md). NUI ei koske IssKohdevalikkoon,
Valoseppä ei IssOhjaamoon eikä OpasValikkoon. → iPhone+iPad-pari täysikokoisina PT:lle → KK → NS. Ei laitetestejä.
- Koodi VALMIS, ei vielä nähty simulla: proto-haara linssiseppa2/kohdevalikko-201 = aba77f7e0 (cae1043ac + vierita-testi), pohja
  21d5712be; worktree /Users/Shared/Claude/wt/proto-linssiseppa2-kohdevalikko. tarkista.sh: unity-tarkistus 0, pohja-/valo-/liike-/kielivahti ok.
  - UI/Linssit/IssKohdevalikko.Koko.cs (uusi, partial): kytkin IssKohdevalikko.IlmanIkkunaa = true; ISS nyt | Oma sijainti pieninä
    yhdellä rivillä, nostot (IssKohokohdat) isoina vaakaan kelattavina (iPhone 2 riviä, iPad 3, mittarifontti), kategoriat
    väliotsikko + vaakarivi kukin; tyhjän napautus sulkee; pöytä (Kyyti.OhjaamoLaatikko) jää alle. Rajapinta NUI:lle:
    IssKohdevalikko.AukiMuuttui (event Action<bool>) + KokoAuki (KOHTEET palaa) – NUI:lle kerrottu 00.3x, vastausta ei vielä.
  - UI/Pysaytyskuva.cs (uusi POHJA): ScreenCapture ruudun lopussa → GPU-puolitusketju 1/32 → 1/8 (pehmeä sumennus), Vapauta suljettaessa.
  - Pohjat/pysaytyskuva.uss (uusi, import Matkakirja.tss galleria.uss:n perään): huntu --tk-himmennys-kevyt (ei lähes musta),
    kaappauksen epäonnistuessa --tk-himmennys-tumma; teema tk-teema-harmaa.
  - IssKohdevalikko.cs: partial, Ruutu → RuudunSisus (yhteinen sisus), Avaa/Sulje/Auki/LataaNakyvat koko-tilaan, testit
    `ui linssi kohdevalikko koko 1|0` ja `… vierita <pt>`.
- PUUTTUU: (1) käännös linja 2 – `zsh $D/kohdevalikko-201/aja.zsh --kaanna` oli JONOSSA 00.35 (orsay-valinnaiset-200 edellä; tulos
  $D/kohdevalikko-201/kaanna.out ja JONO.md-rivi "KOHDEVALIKKO-201 KÄÄNNETTY …"; appi $D/t219-kohdevalikko). Ajoa ei tapettu – jos
  sessio nollautui, katso kaanna.out: jos vain "jonossa:", aja uudelleen. (2) JU:lle "KÄÄNNÖS VALMIS <sha> kohdevalikko-201" + SIMU-pyyntö
  (~15 min) → `zsh $D/kohdevalikko-201/aja.zsh --kuvat` (iPhone + iPad, skenaario sk.txt: k0 Cupola, k1 auki, k2 vierita 700, k3 kiinni;
  kuvat $D/kohdevalikko-201/{iphone,ipad}/) → SIMU VAPAA → PT:lle polut. (3) Tarkista kuvista: pysäytyskuva pehmeä eikä musta, ruutujen
  koot luonnoksen mukaan, nostojen vaakaveto + pystyveto (yleinen Kosketusvieritys) eivät riitele, pöytä näkyy terävänä.
  NUI 00.4x: aba77f7e0 YHDISTETTY NUI:n haaraan natiivi-ui/ratas-201b a45af2f97 (konfliktit IssKohdevalikko.cs:ssä ratkaistu, IssSaadot +
  partial) ja KOHTEET › palaa tehty (AukiMuuttui → IssOhjaamo) → kohta (5) valmis. Säätönapit vain ⚙-paneelissa – ÄLÄ lisää koko näkymään.
  Jos haaraa muutetaan, uusi sha NUI:lle (yhdistää uudelleen). Simupari kannattaa kuvata NUI:n yhdistetyllä haaralla (sovi NUI:n kanssa).
  (4) tyylikirja.json-merkintä PYSÄYTYSKUVA jätetty pois: proto-json on webin generoima (tarkista.sh TYYLIKIRJA-tarkistus) → vaatii
  webin tools/tyylikirja.mjs --natiivi -ajon; kysytty NUI:lta. (5) NUI: KOHTEET-näytön palaminen AukiMuuttui-tapahtumasta.

## 1. TEHTY 17.10. 19.55 – 18.10. 00.3x
- Louvre k83 JUNASSA 200: be5025541 NS:n rungossa 3b200b3b1 vihreä (Linssit 2012), LR v6k26 (louvre yoValo [3; 0,3; 26]) lukitusehtona (JU R2).
- Kartan 3D-sarja: PK kytki KarttaSeepia.Aseta 605a9df4b:ssä (Maamerkit AjattelijaPaa-materiaaliin, pallot/nappula tunnisteväri) – ei VS-töitä.
- LS:lle Louvren pihapyramidin lasiarvot kartan pienoispyramidiin (LS KarttaLasi 19b8aed54).
- Valas k14 (1ddccd615) ja k15 (8e964d298 = 3c9954c1d + 086fdbeb6, 4 m syvemmällä, vedenalainen osa häipyy) kuvattu → VALAS TAUOLLA (PT).
  Jatkoidea $D/TULOS-valas-k15-2158.md. V4 pala 4 (HDR): EI NYT (PT, viikko 87 %).
- Opit: valovahti (masterissa) laskee varjostimen float3-värivakiot – uusi väri vain `// valopoikkeus:`-rivillä tai ilman vakiota.
  tyokalut/unity-vahti.sh vaatii lokin ja Unity-argumentit – älä aja ilman (käynnisti editorin tyhjänä).

## 2. TILA
Omat appit $D: t217-louvre-k83 (junassa, pois kun 200 lukittu), t218-valas-k15 (pois, valas tauolla), t219-kohdevalikko (tulossa).
Worktreet: proto-linssiseppa2-{louvrepeili (louvre-k83, junassa → pois kun NS yhdistänyt), valas (tauko), v4, karttaseepia, kohdevalikko (KESKEN)}.
