# Pelikoodarin luovutus 16.10.2026 iltapäivä (KOVA RAJA 35 %, Postivahti, klo 14.11)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261016-aamupaiva: köysiluuppi tehty loppuun (alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md).
  PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
  LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
- Testit (worktreen juuressa): `sh Linssit-testit/kaanna.sh`, `sh Linssit-testit/unity-tarkistus.sh`.
- Ajotyökalut /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/. Oma simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19.
- LEVY (PT 14.0x): _tyo/pelikoodari:ssa enintään 2 uusinta .app + käytössä oleva; poista edellinen .app, kun uusi on varmistettu; älä kopioi
  videoita lokit/-kansiosta _tyo:hon (polku riittää).

## ENSIMMÄISENÄ: KUVUN VARJON SOLMUKORJAUKSEN VARMISTUS (omistaja 13.26, juna 197)
Omistaja 13.26: "muuten hyvä, mutta köyden solmukohta on vaaleampi kuin itse köysi. korjaa se vielä samaksi, niin sitten valmis".
PT: solmut ja köyden alapää samaan sävyyn kuin köysi kaikissa valoissa, reunakaje 0,55, kytkin päälle, kuittaus NS:lle (tehty), lopuksi
YKSI kuva PT:lle (välittää KK:lle).
- Haara pelikoodari/kori-varjo-197, kärki 99af67f69 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-kori-varjo-197, peilattu), pohja
  kori-koydet-197 416bcf453 → sisältää köydet + sidonnan + kori v2; KuvunVarjo = true. NS:lle ilmoitettu junakärjeksi 99af67f69 ("simu-
  varmistus tulossa").
- 6f9d93fa4 (solmu köyden materiaalista, _Osa 2) ajettiin simulla 3328c9c6f: tummempi, mutta kuvan alalaidassa yhä keskiosaa vaaleampi.
  Siksi 15b06f35f (varjossa köyden pituussuunnan tummennus tasainen) + 99af67f69 (solmun albedo × 0,85). JU kääntää 99af67f69 (jonossa 14.1x).
SEURAAVAT ASKELEET:
1. KÄÄNNETTY → `SHA=<käännös> HAARA=99af67f69 ERA=kori-varjo4-197 UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh
   /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-kori-varjo-197.zsh` → SIMU VAPAA JU:lle.
2. Vertaa lähikuva (scratchpad-skriptit eivät säily: rajaa raaka/p1-paiva-varjo.png x 1700–2622, y 300–1206) edelliseen
   lokit/todistus-kori-varjo3-197-20261016-1404. Jos solmu/alapää köyden sävyssä → YKSI kuva PT:lle (≤ 3 riviä + polku
   _tyo/pelikoodari/kori-varjo-197/). Jos yhä vaaleampi → säädä PalloKori.cs kierrosMat "_Vari" (nyt 0,85) ja käännä uudelleen; ilmoita NS:lle.
3. Poista sen jälkeen _tyo/pelikoodari/kori-koydet-197-app (vanhentunut).

## Tässä vuorossa valmiit (kaikki junaan 197, NS:lle ilmoitettu)
- KORIN KÖYDET (omistaja 10.02; hyväksyntä 12.12 "Kyllä (Suositus)"): kori-koydet-197 416bcf453: köysimittari (`opas kori mittaa`), köysi
  yhtenä korin kanssa (KoydetYhtena), sidonta Codexin havainne-kori-k1:n mukaan (solmukaulus + kaksinkertainen lenkki + nahkasuojus,
  KoysiSidonta, `opas kori sidonta`), LR:n kori v2 (paksu nahkapehmuste, R2 ilmapallo/v2/kori_nakyma.glb, MalliOsoiteV2 KoysiSidonnan
  takana, kytkimen vaihtuessa malli puretaan/ladataan). Sidonnan mitat luetaan köysisolmun pivotista (v1 R 0,032 / v2 0,055). Alakulma
  korin suhteen ka 4,9° → 1,7°. Kuvat _tyo/pelikoodari/kori-koydet-197/kierros1–3.
- KUVUN VARJO (omistaja 12.14 + 12.46 + 13.26): kori-varjo-197: KuvunVarjo (`opas kori varjo 0|1`), `opas kori poltin 1|0` (pakotettu
  poltin), lämmin ruskea varjo, katsojan puoli × 0,45, reunakaje 0,55 köysiin ja reunan yläpintaan, yöllä × 0,3, liekin valo hiipuu
  pehmeästi (0,9 s), kupu ennallaan (_Kupu). Skenaario sk-kori-varjo-197.txt (päivä/yö × nykyinen/varjo/liekki + videot).
- PULUN REVONTULIVASTAUS (omistaja 13.54): pelikoodari/iss-revontulet-197 f831fd168 (PuluChat.IssVastaukset.cs, kohokohdat.json,
  IssKohokohdatTestit 9 → 10), testit 1912/1912, mp3 R2:ssa. NS:lle ilmoitettu.
- Linssisepälle: Ateenassa ei mitään kesken, v13 hänelle. Levysiivous ~1,5 Gt kuitattu PT:lle.

## Avoimet / huomiot
- Worktreet: proto-pelikoodari-kori-koydet-197, -kori-varjo-197, -iss-revontulet-197 (poista --poista/`git worktree remove` vasta kun NS
  on yhdistänyt junaan 197); proto-pelikoodari-raketti-kamera-196 jää, kunnes Valoseppä on ottanut haaran af52dcc6e.
- Kompassin messinkijalan alaosa jää reunan taakse (sama v1:ssä ja v2:ssa) – ei regressio; ei tilattu.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261016-iltapaiva.md
(haara pelikoodari-luovutus-20261014-paiva). Ensin kuvun varjon solmukorjauksen simuvarmistus (kori-varjo-197 99af67f69) ja yksi kuva PT:lle."
