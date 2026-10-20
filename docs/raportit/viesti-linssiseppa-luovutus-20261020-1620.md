# Linssisepän luovutus 20.10.2026 klo 16.20 (PT: luovuta ja lepää)

Edellinen: viesti-linssiseppa-luovutus-20261019-1615.md. Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
KK local_8e4fcfed-fc40-464c-854a-1d031b005332, JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, NS local_fcc10552-5810-49bf-b0cf-188456f1231c,
VS local_e675f86d-210c-416b-8d83-926194307a44, NUI local_c6d63773-0270-4873-96f8-63c66cf52794, Äänittäjä local_726ba209-ff08-43be-a35d-5a60f96f60e1.

**OMISTAJA 20.10. 11.45: simu vain 1) selvästi uudelle tekniikalle, 2) omistajan pyytämiin kuviin, 3) yöjunan laitekierrokseen/muistiajoon.**
Muu (värit, tekstit, sävyt, mallit) automaattitarkistusten (+ TKS:n Mac-esikatselu) jälkeen suoraan avoimeen junaan.

## 0. AVOINNA
1. **Pehmeät askeleet** (omistaja 16.08): `linssiseppa/askeleet-pehmea-208` e3e6e95f0 → merge-pyyntö NS:lle runkoon 208 lähetetty 16.1x (PT OK),
   asennus isoon iPadiin (NS). Kun junassa → `git worktree remove /Users/Shared/Claude/wt/proto-linssiseppa-pehmea`.
   Huom: ennen ParkettiUrl-sarja ei soinut lainkaan (V2-yksittäisaskeleet ohittivat sen); nyt parketilla v4-sarja, KUIVA + yhteinen Hallway-kaiku
   salin koon mukaan (omistaja 00.40), taso 0,68. Äänittäjä voi mitata seuraavasta käännöksestä.
2. **Kulmakoristeet** (Codex PT733, toimitus T7 louvre-kehykset-koristeet-v1/, ei vielä tullut): kytke kehyksiin instansseina (kulma 4× peilaten,
   keski 4×, nauha toistuva). Tilauslista: proto-3d/lokit/louvre-kehykset-208/kulmakoristeet-lista.md (12 taulua, 8 tärkeys A; Kallioluolan madonnan
   ja Kauniin puutarhurin tabernaakkelit). Koodi vielä tekemättä: MuseoRakennus.cs kehysosien jälkeen (kehyksen ulkomitat ulkoW+LeveysCm).

## 1. TÄNÄÄN TEHDYT (kaikki junassa 207/208, ellei toisin)
- **Mona Lisan lähestyminen** (omistaja 00.40 A, juna 207): MuseoKierros.lahestys (yksi jatkuva liike pysähdyksestä kehyksen täyttämään
  lähikuvaan kaikissa teoksissa), AlkuKavelyMaxM 4 m, vartija MuseoLahestymisVartijaTestit (CI), Raamattu-loki #5019. KK OK 18f06da5.
  Opit: simuvideon hyppy = tallenteen ruutupudotus (muisti simu-video-hyppy-ei-peli); QA `museo tallenna <nimi> <s> [fps]` (pelin omat ruudut
  vakioajalla → Documents/<nimi>/f*.jpg + ruudut.csv) ja `museo ruutuvahti 1` + zoomruutu-loki.
- **Askeleet hiljaisemmiksi + yhteinen tilakaiku** (C, juna 207): kuiva + Hallway, kaiku salin koon mukaan (MuseoKierros.Jalkikaiku).
- **Louvren 27 kehystä** (omistaja 07.39, juna 208): lv_*-profiilit sali.json:ssa (leveys % taulusta, sävy kahdella parametrilla `savy_kd`
  [kirkkaus, harmaus Louvren kullasta], veisto, aaltokuvio), kaarikehys (Kallioluolan madonna) ja suorakaide + kaarikulmat (Kaunis puutarhuri,
  `kaari_ulko: suora`). Sävy mitattu Commons-kuvista (ΔE v2 → v5: taulukko proto-3d/lokit/louvre-kehykset-208/savy-dE-v2-v5.md). Omistaja 11.56
  "muut ok"; Kallioluolan madonnan kaarivarjo VS:n haarassa (28bc7aacc).
- **Teoskyltit suomeksi** (omistaja 09.28): Resources/Museo/ranska/kyltit/<teos>.png (generaattori tyokalut/museo/tee_kyltit.py, EB Garamond),
  kyltin napautus → MuseoSovitin.TeosKorttiPyynto (NUI tilaa), QA `museo kyltti napauta [id]`. KK OK.
- **Opas**: kuvaraita + rivitys (juna 206).
- **Louvren oikeat kuvat ja parit** (omistaja 10.07): proto-3d/lokit/louvre-oikeat-kuvat-20261020/ (+ LAHTEET.md).

## 2. TYÖKALUT (scratchpad katoaa nollauksessa – kopioi tarvittaessa)
- Sävymittaus (Lab, ΔE): savymittaus.py + kehysnaytteet.json (kehyskohdat Louvre-kuvissa ja pelikuvissa) – ajettu session scratchpadissa;
  jos uusi kierros tarvitaan, pyydä Opus-agentilta näytealueet uudelleen (ohje sama kuin 20.10.).
- Ajoskriptit: /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/ (sk-kehykset-208-*.txt: kaikki 27 taulua `linssi museo teos <id>`).

## 3. WORKTREET (/Users/Shared/Claude/wt)
proto-linssiseppa-pehmea (askeleet-pehmea-208, poista mergen jälkeen), proto-linssiseppa-kierrokset195 (todistusajo.sh – älä poista).
Appit _tyo/linssiseppa: louvre-kehykset-208e-app, monalisa-video-207-app (vanhempi pois kun tarvitaan tilaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista ensin, onko askeleet-pehmea-208 junassa 208 (poista worktree), ja
onko Codexin PT733 (louvre-kehykset-koristeet-v1) tullut → kytke kulmakoristeet. Muuten rivi PT:lle "JONO TYHJÄ: Linssiseppä".
