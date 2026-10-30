# Valosepän luovutus 30.10.2026 klo 19.30

Luovutuksen syy: konteksti ylitti pehmeän rajan (PT 30.10. 19.3x, Raamattu 7.37). Valotyö jatkuu nollauksen jälkeen.

Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`. Proto-repo on vain paikallinen, sillä ei ole origin-etärepoa.

## PYSYVÄ SÄÄNTÖ (PT 30.10. 16.2x, Raamattu 2.177)
Ennen kuin pari tai kortti lähtee, tee kaksi tarkistusta:
- Mittaa muutettujen materiaalien värit havainteeseen ja omistajan päätöksiin auringossa ja varjossa:
  `python3 /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/varimittaus.py kuva.png ulos.png nimi:x0,y0,x1,y1 …`
  (mediaani, p10 ja p90; laatikot piirtyvät vihreinä, tarkista niiden paikka kuvasta).
- Ota lähikuvat muutetuista kohdista.

## Työn alla 1: valotyö, PT:n hyväksymä YHDISTELMÄ (8–12 h)
Päätösketju:
- Omistajan päätös 19.12: valotyö alkaa heti, kun ulko-osat valmistuvat, nopeimmalla menetelmällä, jolla ulkonäkö saadaan havainnekuvien kaltaiseksi. Myöhemmin tulevat sisätilat eivät saa pakottaa tekemään ulkovaloa uudelleen.
- PT hyväksyi ensin valosuunnitelman (`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/valosuunnitelma-20261030.md`, 18–25 h).
- Tarkistettaessa, mikä on nopein tapa, PT hyväksyi 19.5x yhdistelmän:
  1. **Instanssiosat (osasarja, C3, C2) saavat pelin elävän auringon varjon lähiruuduissa.** Kaukoniput ovat tavallisia piirtäjiä, joten JuoksuV4Maailma.PaivitaKappaleet hoitaa ne.
  2. **LAV leipoo nykyisellä putkella uudelleen** (leivo_valo.py, valo_rgbm, M = 8) taustan, rakennukset ja muurikatteen pohjan:
     - aurinko `tyylikirja/leivonta-aurinko.json` (pohja 169,97° / 30° = pelin 30°/188°; ennen leivonta 170°/45°)
     - osasarja-v4 ladottuna varjostajana
     - aukkotulpat aukkokohtaisina tasoina.

     Varjo ei tuplaannu: elävä varjo vaikuttaa vain leivotun auringon alueella (JuoksuLeivottuVarjolla).
  3. Ruutuatlakset ja kärkivärit tehdään vain, jos iPad-mittaus (LT) tai havainnepari sitä vaatii.
     - Shader on niitä varten jo valmis.
     - LAV:n sopimusluonnos: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-216/SOPIMUS.md`.
     - VS:n kuittaus korjauksineen: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/leivonta-216-vs-kuittaus.md`. Korjaukset: ST-muunnos glTF→Unity, JUOKSU_LEIVOTTU pois tarkisteen pettäessä, dilate ≥ 4 px, aukkotaso.

Tehty, proto-worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-leivonta`, haara **linssiseppa2/leivonta-217** (pohja natiiviseppa/juna-216 8d3bf122f):
- **d420087dc** vaiheet 1–2:
  - ValoKohteet `PohjaKiertoAste = −2,03`, `LeivontaAurinkoKorkeus/-Atsimuutti` = K20 ja `LeivontaPohjaAtsimuutti`.
  - `tyokalut/leivonta-aurinko.py` kirjoittaa ja `--tarkista` valvoo `tyylikirja/leivonta-aurinko.json`:ia; ajetaan tarkista.sh:ssa.
  - JuoksuMaailma.shader: instanssikohtainen `_LeivottuST` (UNITY_INSTANCING_BUFFER JuoksuLeivottuInst; 0 = UV1 ennallaan) ja `_LeivottuKarki` (UnityPerMaterial kaikissa kolmessa passissa; COLOR-RGBM).
  - JuoksuValo.hlsl `JuoksuLeivottuKarki`, Valopohja `IdLeivottuST` ja `IdLeivottuKarki`.
  - Tarkistukset: METAL 444/0, PIPELINE 436/0, tarkista.sh 0.
- **4b54413d7** elävä varjo instansseille:
  - JuoksuSokkeloMaailma.Muurikate.cs PaivitaSarja/PiirraInst: `varjo = s.osa < 0 && ValoPaalla && VarjotPaalla` → RenderParams shadowCastingMode/receiveShadows.
  - F/G/C1 (osa ≥ 0) jätettiin ennalleen: rakennuksen LOD0 ja Taihemenin sääntö.
  - HUOM: PK:n tiedosto, mutta muutos on vain PiirraInstissä. PK:n v3/v4-diffi ei koske sitä, joten merge on puhdas.
  - Metal ja testit puuttuvat vielä tältä commitilta.
- Koehaara p11:ssä **linssiseppa2/varjo-v4-koe a855d9fb6** = PK:n v4 88eed2939 + QA osasarja-lahi + edelliset (cherry-pick). Älä merge sitä.

Seuraavaksi:
1. Tarkista varjoajon tulos: skenaario `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/varjo-v4.txt`; tulos uusimmassa `proto-3d/lokit/esikatselu-*`-kansiossa, jossa on v06-*/v03-*-kuvat. Siinä on 06 ja 03 havainteen kanssa, varjot päällä ja pois.
2. Tee oma tarkistus (2.177): värimittaus sekä lähikuvat muurien varjoista lattialla ja kivijalassa.
3. Aja Metal ja testit 4b54413d7:lle. Muista: p11:llä on Library, joten aja testit siellä detached-tilassa.
4. Lähetä pari PT:lle.
5. Kun LAV ilmoittaa uudelleenleivotun paketin, juuri päivitetään ja tehdään parit 02/03/06 uudestaan.
6. NS:lle junaan leivonta-217-haara PK:n v4:n jälkeen.
7. LT mittaa iPadilla varjopassin kustannuksen. Jos J venyy, atlakset aktivoidaan.

## Työn alla 2: LOD1/LOD2-rajan sävytarkistus (PT 18.5x, ei vielä koostetta PT:lle)
Tehtävä: kaukomuurien C3_muurikate_kauko (osat-lod2.glb, tekstuuriton, bcf lin 0,759/0,247/0,006 = sRGB 226/136/18) ennen vaihtorajaa ja sen jälkeen. Mitattavat: kate, punainen runko ja kivijalka.
- Tekstuurien keskiarvot eivät kelpaa vertailuun, koska atlaksen täyte vääristää ne: 1057 LOD0 144/80/17, LOD1 200/118/18. Ratkaisu on pelikuvan mittaus.
- Koehaara **linssiseppa2/lodraja-v4-koe ce15442d7** = PK:n v4 + väliaikainen QA `palatsi osasarja-lahi <m>` (vaikuttaa heti).
- Skenaario `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/lodraja-v4.txt`; tulos esikatselukansiossa, jossa on a-/b-lod1|oletus|lod2-kuvat. Ajo on jonossa tai ajossa.
- Samasta kuvasta otetaan kolme versiota: lahi 9999 = LOD0/LOD1-instanssit, 60 = oletus, −100 = kaikki kaukonippuna (LOD2).
- Opitut sudenkuopat:
  - `valo jaady 1` pysäyttää lähi/kauko-päivityksen. Siksi lahi vaihdetaan jaady 0 -tilassa.
  - lahi 0 ei riitä, koska kameran oma ruutu pysyy lähellä (InstVara 6 m). Käytä −100.
  - Oletusämpärissä ei ole kk-pohjaa. Käytä PK:n juurta `file:///Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030/juuri-216/`.
  - Aiemmissa ajoissa 0a2ba0d1d:llä kuviin ei ilmestynyt kaukomuureja.
- Kooste PT:lle: ero.py:n eroalue sekä varimittaus.py-laatikot katteeseen, runkoon ja kivijalkaan LOD1:ssä ja LOD2:ssa. Jos hyppy näkyy, korjausehdotus annetaan bcf-arvona tai `_LeivottuKarki`-tyyppisenä materiaalikertoimena.

## Junassa / NS:llä
loiva-216 4b0476ca0: kivijalan harmaa, omistajan Kyllä 15.35. Se on jo natiiviseppa/juna-216:ssa.

## Työkalut (/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/)
- `ero.py a.png b.png [ero.png]`: eroavat pikselit ja niiden rajaus.
- `glbmat.py` / `glbtex.py`: glb:n materiaalien bcf-arvot ja tekstuurien keskiarvot.
- `qa-lahi.py`: QA-rivin lisäys JuoksupeliNakyma.cs:ään.
