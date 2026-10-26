# Valoseppä: luovutus 26.10.2026 klo 16.15 (tilinvaihto, PT 16.13)

PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, LR: local_15010198-38f5-44fd-a643-011ac655a5ff,
JU: local_d8cad7de-3ff8-4f4b-8787-baa80836e175, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f, PK: local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6.
Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 26.10. 15.46 → 16.1x). Edellinen luovutus 0c7d73b08
(viesti-valoseppa-luovutus-20261026-1538.md) yhä pohjana kohdille 2.3–2.5 ja opeille.

## 0. AJOT KÄYNNISSÄ (tarkista ensin)

Haara **linssiseppa2/omistajapari-12** (proto-git, wt `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`), kärki **4b40f386a**
(pushattu natiivi-backupiin). Kansio `_tyo/linssiseppa2/kierros2/`, tulos `grep -o 'LOPPU .*' <ketju-loki>`.
- **P47** `ketju-omistaja81.zsh` → aja-omistaja72, sk-omistaja62, app2 = 00e7b7941: aukio LR:n **tausta-v57**:llä
  (MALLIT juuri-v57c: avoimet-v50 + tausta-v57, leivottu 45°/215° nykyisellä geometrialla, T-liitokset v3, pohjalaatan UV-korjaus).
  Paikat kuten P44 (6.4,−205 ja −180): n1 / v0 / l0. ONNISTUU, jos irralliset kiilat ovat poissa n1:stä (vertaa P44 todistus-1544,
  kuvat kierros2/omistaja69-ba279bf92/). Kolmikko samaan tapaan (scratch-skripti: 3 kuvaa rinnakkain 0,4 ×) → kierros2/omistaja72-00e7b7941/,
  luvut LR:lle ja PT:lle 3 rivillä. LR ajaa itse 06 (viiva) ja 04 (takaovi).
- **P46b** `ketju-omistaja82.zsh` (P47:n jälkeen): 4b40f386a → app2 (L2) → aja-omistaja73, sk-omistaja63: kujan muurikate
  −249.4,302/312 ylhäältä, n1 / m1 (kerrossaumat pois) / m2 (himmeät) / m3 (ei kourutiiliä) / s1 / sm. Mittaa muuttuneet pikselit
  n1 vs muunnelma (P46:ssa 0,00 % → kytkin ei osunut).

## 1. TEHTY 15.46 → 16.15

- **P44** (todistus-1544): aukion kiilat pysyvät varjot 0:lla (muuttui 0,9/2,1 %), katoavat leivonta 0:lla ⇒ tausta-v56:n leivottuja
  varjoja poistetusta geometriasta. LR leipoi tausta-v57:n ehdotuksesta (yksi v57, leivonnan aurinko = pelin 45°/215°).
  Rakennukset-v48 (porttihallin kiilat, kattojen kultainen sotku, P43) samalla auringolla LR:n omana eränään v57:n jälkeen.
- **P45** (todistus-1550, avoimet-v50): 04 vakioilla punainen 0,53 = havainne, lattia 208, mustat 0,7; kerroin 1,0/1,5 → 0,50/0,55,
  täyttö 0,5 → 0,57 ⇒ vakiot pysyvät (1,25 / 0,3). Pylväät tasaiset. Kuvat kierros2/omistaja70-ba279bf92/. LR + PT ilmoitettu.
- **Muurikatteen kytkimet** (avoin 3, PK:n löydös 4): QA `valo muurikate 0–3`, `valo muurinayte 0|1`; Valopohja.JuoksuMuuriKate /
  JuoksuMuuriNayte → _JuoksuMuuriKate/_JuoksuMuuriNayte (JuoksuLattia KattoTiilet: sauma-kerroin huulelle, ao:lle ja kerroksen sävylle).
  1c921ed4b hylättiin valovahdilla (globaali Jalki.cs:ssä) → 00e7b7941 Valopohjaan. P46 (todistus-1604): ei vaikutusta, koska
  **muurikate-v16:n lappeet ovat V4_gold = laji 14** (harja V4_lasitiili_harja = 0, mallin väri) → 4b40f386a: kytkimet lajeille 12 ja 14
  (14 = myös paviljongit). Lajilla 14 kuva on jo lappeen tasossa (t = w.z|w.x, w.y·1,5) → muurinayte ei muuta sitä.
  Raidat ylhäältä (P46 n1): kirkkaat/tummat poikkiraidat koko lappeen leveydeltä, kourutiilirivit 0,34 m välein + LOD 6 -kuva.

## 2. AVOIMET (järjestys)

1. **P47 tulos** → LR + PT (kolmikko). Jos kiilat poissa: PT:n pari ennen v57:n vientiä (LR).
2. **P46b tulos**: jos m1/m2 poistaa raidat → ehdotus PT:lle oletukseksi (vain laji 14 muurikatteella vai myös paviljongit? tarkista
   paviljonkikatto samalla kytkimellä ennen ehdotusta). Jos ei vaikuta: raidat tulevat kuvasta (_JuoksuKate LOD 6) tai kupujen
   kallistuksesta (kal) → seuraavat muunnelmat: kupujen normaalikallistus pienemmäksi, kuva LOD 3.
3. Edellisestä luovutuksesta: 01 kuja (aurinko kujan suuntaan, uusi kamerapaikka; tausta-v56 levensi kujaa), juna 211:n vakiot NS:lle
   omistajapari-12:n kautta PT:n kuittauksen jälkeen.

## 3. OPIT

- Valovahti: Shader.SetGlobal* vain Valopohjasta (Kartta/Valopohja.cs PeliValo); aja `python3 tyokalut/valovahti.py` ennen käännöstä.
- Selvitä pinnan laji mallin materiaalista ennen varjostinkytkintä (glb:n materials, JuoksuV4Maailma.Lattia.cs SokkelonPinta).
- `pgrep -f ketju-X` osuu myös omaan odotuskomentoon, jos sen tekstissä on sama nimi → odota lokin LOPPU-riviä.
- Päächeckoutin jäljittämättömät `.claude/settings.local.json.ennen-kevennysta` (28.9.) ja `waveletNoiseTile.bin` (16.10.) eivät ole
  tämän session; jätetty (asetukset omistajan, ei poistoja).
