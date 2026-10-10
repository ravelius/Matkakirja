# Natiiviseppä: luovutus 10.10.2026 klo 11.5x (PT:n nollausraja 50 %)

Edellinen: viesti-natiiviseppa-luovutus-20261010-aamu.md (TILA-osiot 08.0x–11.2x, junat 173–175). Proto /Users/Shared/Claude/proto-3d/Matkakirja-proto
(pääkopio nyt Unity 6000.7.0b4; editori /Applications/Unity/Hub/Editor/6000.7.0b4, symlinkki /Users/Shared/Claude/unity/6000.7.0b4).
Viestit: SendMessage-raja oli täynnä → varakanava mcp__ccd_session_mgmt__send_message (PT local_593b89a1…, Julkaisija local_22b29f10…,
LS1 local_45a869de…, LS2 local_fc4fcc54…, NUI local_33ba1387…, Pelikoodari local_97810d35…, Sisältökirjuri local_256f6a15…).

## PÄIVITYS 12.4x (ennen nollausta)
- **Mac TF 176 VALID** (38040911547, sisäinen ryhmä): mac-kaanna.sh 86ef3b3e6 1.1 176 (BUNDLE_ID fi.matkakirja.peli, APPSTORE=1), 1. lataus kaatui
  altool 90276/90334 (Steam Audion phonon.bundle/audioplugin_phonon.bundle ilman CFBundleIdentifieria) → .app korjattu PlistBuddylla, uusinta VALID.
  Pysyvä korjaus junassa 176: **c7db5ba3e** Rakennus.MacOS → MacPlugariTunnisteet. Mac-minimit: kaikki ≤ LSMinimumSystemVersion 12.0, paitsi oma
  MatkakirjaMacSyote.bundle minos 13.0 (sama kuin hyväksytyssä 172:ssa; korjaa jos Apple valittaa). → Kohta 1 alla (Mac TF 176) on TEHTY.
- **JUNA 176 (build 177) runko = 51e42e7a6**: a2c246164 + NUI heksavarit da28d281f, fonttikoot-cs 1ed61ecec, kehittaja-pallot c74736f7c; Pelikoodari
  kartta-vain-kaupunki d6a8e0139 + 80ab967fa; LS1 maa-dtm-175-u67 29be895b8 (korvaa 08baea921); Mac-korjaus c7db5ba3e. L1301/P453/K454, unity 0, tarkista ok.
  Lisää muistia: KYLLÄ (DTM + pilvet + vesiväri) → muistiajo ennen lukitusta. **Lukitus ODOTTAA omistajan TF 176 -palautteen 6.7-regressiokorjauksia
  (PT 12.2x, NUI johtaa)**: latauskuvan liike + Poistu-nappi, pelin alun lennon kohteet irti pallosta, Ateenan saapumispaperin yläreuna,
  kehittäjänäkymän kaupunkivalinta kartalta. Auta NUI:ta kamera/syöte-osissa (oma 6.7-tuonti 931920957 muutti vain GetInstanceID → GetHashCode ja
  diagnostiikan projektiomatriisin; EnhancedTouch-suojaus 68f860e85 tyhjä vain ilman PalloKiertoa). Museohaarojen mergen jälkeen: pohjavahti.py --kirjaa (NUI).
- Museo: patsaat (101 tdstoa) ja teokset (5344) ämpärissä (Julkaisija 11.43). MuseoVeistokset yhä kytkemättä; iPad-muistiajo museossa tekemättä.

## ENSIMMÄISEKSI (PT 11.3x)
1. **Mac TF 176** (PT: seuraavan session ensimmäinen tehtävä, ellei käynnistetty): kysy PT:ltä/Julkaisijalta tarkka muoto (buildinumerot:
   hylätty 175 → sisältö 86ef3b3e6 lähti numerolla 176 Julkaisijan PlistBuddy-korjauksella PR #4338; juna 176:n runko lähtee numerolla 177).
2. **Juna 176 (build 177) lukitus**, kun PT käskee: runko **natiiviseppa/juna-176 = a2c246164** (wt /Users/Shared/Claude/wt/proto-natiiviseppa-j175).
   Muistiajo ennen lukitusta (pilvet + vesiväri lisäävät dataa): Release-laite T7-kopiossa tai pääkopiossa, iPad Pro 13 Pariisi A/B + Olavinlinna
   (kaava: scratchpad 53856a0f…/laite175.sh + muisti175.sh; vertailu 175: 0,72 / 0,76 / 0,74 Gt). Lukitus kuten 175: proto-kaanna.sh <runko>
   → juna/b13 update-ref + juna.log → `git merge --no-ff -F <viesti> juna/b13` päächeckoutissa → täysi SHA Julkaisijalle + muutosloki PT:lle.

## JUNA 176 RUNKO a2c246164 (kaikki testattu 6.7:llä: L1299/P449/K453, unity 0, tarkista.sh ok)
86ef3b3e6 (BUILD 175) + LS2 pilvet-175 43b37f198, vesivari-175 3a0def9e7 (kerroin 1), vesi-v6-175 fc08ac3db, vesi-v7-176 57187899e (index-v7),
hoyrykone-175 20ce06552, omaaurinko-175 97d2d7a71; NUI pohjavahti-varit-175 31bac5ad0, ikakysely-176 86513b039, ylapalkki-uiruutu-175 7b1352b76,
linssipalkki-turva-176 25f28c53b; Pelikoodari mittaa-aikaraja dad7ae249; Natiiviseppä **e9c29facd** (ITMS-90208: PostProcessBuild(198) kehysten
MinimumOSVersion ≥ appin tavoite; todennettu IosLaite-viennillä 15.0 → 17.0; Embed säilyy PrivacyInfon takia) ja **68f860e85** (EnhancedTouch-suojaus
5 tiedostoon: asettelutestin kohtauksessa ei PalloKiertoa; laitteella ei vikaa, iPad 175-ajoissa 0 riviä; NUI linna 4/4 ea16f95a4:llä).
EI MUKANA: LS1 maa-dtm-175-u67 29be895b8 + ls-aanet-175-u67 b59f82584 (PT ei kuitannut), natiiviseppa/pohja-175 (kuvapari), LS2 osoitin-176 2550c88a7 (omistajan kortti),
LR Stadshuset v1 (kuitattu teknisesti ASTC-ehdolla, 176+).

## TAIDEMUSEO (PT 09.5x / 11.2x; suunnitelma HYVÄKSYTTY, poikkeama: ämpärireitti, ei Addressablesia)
- Proton haara **natiiviseppa/museo-muisti 6db621eeb** (wt /Users/Shared/Claude/wt/proto-natiiviseppa-museo; LS1:n linssiseppa/taidemuseo-176
  536e5593d:n päällä; unity 0, L1322). LS1 on mergennyt aiemmat (c30a92f3c) omaan haaraansa; patsaat f5aa0cce0 + 118518075 + 6db621eeb EI vielä.
  - Ydin/Museo/MuseoRuudut.cs: TeosPyramidi, RuutuValinta, RuutuVarasto, MuseoBudjetti (160 Mt/sali), VeistosValinta/VeistosTavut.
  - Unity/MuseoTekstuurit.cs: seinätaso + yksityiskohtaruudut (url = MaaJuuri + Kuvapaikka.Paketti, pyramidi px:stä). iOS-SIMULAATTORI EI TUE ASTC:TÄ
    → JPEG-vara (LS1 11.45 näki tämän; odotettu). ASTC-polku todennetaan vain iPadilla.
  - Unity/MuseoVeistokset.cs: **KYTKEMÄTTÄ** MuseoSovittimeen → Juuri = MaaJuuri + "astc-v1/patsaat/", Paikat = Sali.Jalustat (Veistos != null,
    jalustan Paikka-transformi), Pohjamateriaali = MuseoValaistu-marmori; sijoitus Resources/Museo/alankomaat/veistokset.json (6 Rijks-paikkaa,
    Leidenin 12: Sisältökirjurin ehdotus viestissä 11.2x). veisto.json:n pohjavari → _Pohja tekstuurittomille (4 kpl) — EI vielä toteutettu.
  - tyokalut/teos_astc.py (teokset) ja veisto_blender.py (patsaat; esikatselu 6 mallista tarkistettu: unlit-kuva, EMIT-leivonta, atlas alkuperäisestä UV:sta).
- Ämpäri: teokset astc-v1/<id>/ (20, viety, HTTP 200). Patsaat _valmiit/taidemuseo-alankomaat-patsaat-astc-v1-vienti-20261010 (35, 222 Mt) → Julkaisijan
  vientijonossa (vie-paketti.sh tarvitsi *.astc|*.astcm-tyypin; teosvienti onnistui, joten lisätty).
- Skeema: Sisältökirjurin teokset.v2.json (id = Rijks objnr, kuva.paketti/px) ja teokset.patsaat.v2.2.json (mitat_cm; TULKINNAT: leluhevonen 0,556 m,
  sarkofagi pituus 2,28 m).
- SEURAAVAKSI: MuseoVeistokset kytkentä (tai LS1), iPad-muistiajo museossa (Muistijuna-kaava: Release, min vapaa + jetsamit), 15 000 px -lähteet jos tulevat.

## MUUT
- PR #4334 (proto3d-testflight.yml: Unity 6.7 -käynnistysjumin uusinta) → Julkaisija mergeää. Juurisyy: editori T7:llä (siirretty sisäiselle levylle).
- Jonossa (PT 11.2x): kun TF 176 on läpi Applelta → Unity 6.3 -editori (10 Gt) T7:lle + levy-rivi PT:lle (levy 75 Gi, raja 100).
  T7:n 6.7-editoria ja T7-kopiota proto-natiiviseppa-unity67 EI poisteta ennen Julkaisijan lupaa (kirjastosymlinkki).
- Taustalla EI omia ajoja (tarkistettu 11.51). Worktreet: j175 (juna-176), pohja175, museo, T7 unity67, natiiviseppa-ci-luo-uusinta (repo, PR #4334).
