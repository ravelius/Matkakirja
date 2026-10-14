# Valoseppä – luovutus 14.10.2026 iltapäivä 2 (14.1x), nollaus (PT: konteksti 54 %)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261014-iltapaiva.md (sen osiot 3–5 Lontoo/Josefov/Petřín
ovat yhä voimassa, ellei alla toisin). Aloitusviesti: viesti-valoseppa-aloitus.md. Viestit `send_message` id:llä osoitekirjasta
/Users/Shared/Claude/osoitekirja.md; PT local_74630a27 (≤ 3 riviä + polut), Julkaisija local_22b29f10, NS local_bf20055b,
LR local_08e82dfc, LS1 local_45a869de, PK local_97810d35, Postivahti local_e6d70b5a.

OMISTAJA 13.41 (PT): juna 190 julkaistaan, kun KAIKKI tämänpäiväiset pyynnöt ovat valmiit (ISS-palaute 12.25:
/Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261014/iss-palaute-1225.md). Valosepän kohdat: 1 maasto,
3 horisontti + valas, 6a Kuu, 6c nimet. PT kuittaa VAIN kuvasta: lähetä arkkien polut.

## Worktreet (PT: enintään 3) ja haarat (kaikki commitoitu, vahti kääntää linssiseppa2/*)
- /Users/Shared/Claude/wt/proto-linssiseppa2-andoyakauko → linssiseppa2/andoya-kauko-190 (juna-190:n päällä): 89a4801cc kaukolaatta,
  2ac032eef valas, 5701c2091 LR:n valas v1 valas.bytesiin.
- /Users/Shared/Claude/wt/proto-linssiseppa2-yovalot190 → linssiseppa2/kupoli-yovalot-juna190 (juna-190 8a61f1f09:n päällä):
  44a598b42 katuvalot (= 1ebed3da9 + befe97c86 + da555d406 cherry-pickeinä, v2-data), 5155cef3c Kuu (astro kyyti kuu).
- /Users/Shared/Claude/wt/proto-linssiseppa2-lontoo → linssiseppa2/lontoo-korkeus-v2: 5d6745971 + a02784c31 Buckinghamin portti.
- Ilman worktreetä: linssiseppa2/kupoli-nimet-190 d5b07b2ed (juna-190:n päällä, nimet), linssiseppa2/korostus-rinne-190 b7afe279b
  (juna-190:n päällä, Ateenan korostus). Vanhat iss-palaute-190 ja kupoli-yovalot-190 korvattu (vahdista poissuljettu).
- Vahdin poissulut julkaisija-tyokalut/valoseppa-haarat.txt: iss-palaute-190, kupoli-yovalot-190, korostus-rinne-190 (Ateenaa ei
  vakioskenaariossa). Vakioskenaario _tyo/linssiseppa2/vahti/sk-vakio.txt (lisätty r0-avaus, r0b/r0c valas, r1–r3 raketti,
  i1-telakointi, i3b/c veto, i3d/e Kuu, i5–i7 yö tele + Bergen; Pariisi/Bergen `astro kyyti siirra lat lon`, bergen ei kohdelistalla).

## AVOIMET JUNAAN 190 (järjestys = mitä PT odottaa)
1. MAASTO + HORISONTTI (kohdat 1, 3): andoya-kauko-190. Kaukolaatta ±40 km (GLO-30 + S2 7.8.2024, ~39 m/px, sama merisävy),
   tarkan laatan alfareuna 3,5→5 km, kauko 30→40 km, nousussa tarkka häipyy 6→8 km ja kauko 30→40 km, sumu = LaukaisunTaivas-väri.
   Data ämpärissä (kartta/raketti/andoya-kauko-v1.glb, Julkaisija 13.08). Tuotto _tyo/linssiseppa2/andoya/kauko/rakenna_kauko_v1.py.
   ODOTTAA vahdin arkkia (r0-avaus, r2/r3-nousu: PT 13.5x "nousu +5 s rakeista, laatikkomaista" = vanha haara ilman kaukolaattaa).
   Jos r2 yhä palikkainen: kaukolaatan näkyvyys nousussa (RakettiMaasto.KaukoHaipyyM 30 km) ja upotus ok? Tarkista
   "raketti: kaukolaatta ... kärkeä" lokista (latautui?).
2. VALAS: RakettiValas + Iss.ValaanHyppy (jäykkä hyppy 13 s:n välein, 630 m alustasta suunta 260°, lähin maa 180 m; roiskeet
   RakettiSavu-varjostimella), malli LR v1 (valas.bytes). Loki "raketti: valas hyppy n". ODOTTAA arkkia r0b-valas / r0c-valas-roiske.
   PT haluaa SAMASSA VIESTISSÄ pelikuva-arkin + mallikuvan (/Users/Shared/Claude/proto-3d/_valmiit/valas-v1/esikatselu/valas-v2-arkki.jpg
   tai valas-arkki.jpg). Mahdollinen jatko: LR:n v2 (valas-hyppy.glb, luusto + "hyppy" 6 s) vaatisi skinning-toiston; LR:n
   liikerata valas-hyppy.json (v1, 30 fps) voisi korvata ValaanHypyn käyrät. Hypyn ajoitus: vahti ottaa kuvan 1,5 s hypyn alusta.
3. KATUVALOT (Cupola yö): kupoli-yovalot-juna190. PT 13.5x: "Pariisin ja Bergenin yllä valot tuskin näkyvät" — se oli LONTOO-haaran
   arkki ilman katuvaloja, ja kohde pariisi ei ehtinyt Pariisiin (LCD Atlantti/Brest) → korjattu skenaario (siirra + 35 s). Katso
   juna190-haaran arkki i4–i7; jos yhä tumma, nosta Yokuorin kaupunkivalojen voimaa. NS:n iPad-muistiajo käynnissä (~14.55) →
   tulos PT:lle. PT:n ehdot: arkki laaja + tele Pariisi + Bergen JA muistiajo.
4. KUU (6a): koodi oli valmis (KyydinTaivas). 14.10. Kuu kulkee lähellä ratatason normaalia (korkeus −15…13° koko kierroksen)
   aseman sivulla → ei Cupolan katseessa. `astro kyyti kuu` (5155cef3c) kelaa testikellon ja kääntää katseen → arkki i3d/i3e.
5. NIMET (6c): kupoli-nimet-190 d5b07b2ed (KupoliNimisto + KupoliNimet, `astro kyyti nimet 0|1|tila`). PT: arkki päivä + yö +
   pyöritys (i2/i3, i3b/c veto, i4–i7). Vahdin arkki tulossa.
6. ATEENAN KOROSTUS: korostus-rinne-190 b7afe279b (renkaan kärjet häipyvät, kun oma maanpinta putoaa alta 4→10 m). Sinisyys k06–k08 =
   kamerat 130° näkevät Googlen leivotut varjopuolet → suositus LS1:lle/KS:lle katse lounaasta 30–60° (kerrottu LS1:lle).
   Todistus Ateenan skenaariolla (LS1), ei vahdin vakioskenaariossa.
7. BUCKINGHAM: lontoo-korkeus-v2 a02784c31 (tasanne: tarkkuus ≥ 0,75 eikä parane 3 s:ssa → läpi; loki "(tasanne)"). Vahti 13.32
   (5d6745971) odotti 25 s:n turvarajaan. ODOTTAA uutta vahtiajoa (k3a/k3b + saapumisportti nopeus.txt:ssä).

## Muuta
- PK: i1-telakointi musta vahdin käännöksissä, joissa ei ole telakointi-190:tä (kaikki muut paitsi juna190-pohjaiset) — ei regressio.
- Katuvalot v2 (rakenna-rasteri2.py: painot, risteykset, ±30 %/60 m, pisteet) PT hyväksyi 13.3x, viety 13.31.
- Katkot: Lontoon kierroksella 5,3 s (t 111 s, vahti 13.32) – ei tutkittu (edellisen luovutuksen Westminster-katko).
