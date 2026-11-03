# Pelikoodari: luovutus 29.10.2026 klo 22.30 (konteksti 34 %, Postivahti)

Edellinen luovutus -20261029-2205 (91c8454b5). Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN).
Natiivirepon haara pelikoodari/salikamera-215 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214, puhdas, pää b7ef7f924;
peili natiivi-backup peili/proto/pelikoodari/salikamera-215) = osasarja-215 (5c924489e) + kolme committia:
d8bb1c0f0 sisäkamera + QA, 358acaf42 v75 + A3/A5-lataus + salikartta, b7ef7f924 v76.

TAUSTA-AJO KÄYNNISSÄ (alkoi 22.27): havainne-editori 04 + 06, REF 358acaf42 (v75), juuri-pk7-v75, `drone sali 1`.
Skripti _tyo/pelikoodari/kuja05-pk6-20261029/aja-salikamera-04-v75.zsh, loki samassa kansiossa .log, tulos
lokit/havainne-editori-20261029-22xx (rivi "HAVAINNE VALMIS …" lokin lopussa). Tarkista sen jälkeen, ettei Unity-ajoa ole kesken.

## ENSIMMÄISENÄ
1. SALIN SISÄKAMERA (PT 22.1x hyväksyi erän; loki 26.10. 23.34). PT:n ehdot: keisari näkyy koko ajan (piiloruutuja 0, aiempi 221 =
   hylkäysperuste), yhteinen kamerajärjestelmä + kameratesti ja ruutuaikavahti (Raamattu 8.4). Valmis = salin 04 pari havainteen kanssa → PT.
   - Syy: DroneNosto.SaliSisakamera = false (6796b6b3a) → saleissa yläkamera räystään yllä. Kamera näkyy häivytetyn katon läpi
     lattiaan katsovana, ja sama 04-kuva on ollut jo 27.10. lähtien (ei editorin eikä v73:n vika).
   - Tehty: QA `ui juoksupeli drone sali 0|1` (JuoksupeliNakyma). avoinSali → katonAlitus/hkAlitus (häivytetyn katon alapuoli on
     kulmahaulle lattiaa). Uusi saliPeitto (JuoksuSokkeloMaailma.Palatsi: avoimet osat ilman "katto*"- ja "*floor*"-solmuja) ja
     HuippuSalissa avoimen huoneen rajoissa; JuoksuV4Maailma H/HkKentta käyttää sitä avoinSali-tilassa.
     Syy: pääkartassa juhlasalin katto 5,1–6,9 m on huippuna ja lattialaattojen 8 cm reunat alarajana joka 1 m ruudussa
     (glb-leikkaus: scratchpad sali_leikkaus.py) → kulmahaku hylkäsi kaikki kulmat → 72°.
   - Ajo 22.11 (d8bb1c0f0, ilman salikarttaa): kamera laski 8 m → 3,5 m salin sisään, mutta kulma oli yhä 72°
     ("massassa 1", "vaatii 6,8"). lokit/havainne-editori-20261029-221144/04.
   - SEURAAVAKSI: katso taustan 04-ajo (kulma < 72°? kuva havainteen kaltainen?). Jos hyvä: oletus SaliSisakamera = true vasta,
     kun piiloruudut on mitattu salien läpi kulkevalla botilla (mittari "piilossa-ruutuja", "KATTO NÄKYVISSÄ SISÄLLÄ"). Lisää
     kameratesti (DroneNosto.YhtenainenKulma salissa: katoton huippu → peruskulma), sitten pari PT:lle.
2. A3/A5/1062 + B1–B3 PARIAJO JA PORTIN KAIDEKUVA (PT:n pyyntö LR:n kautta, vrt. …/kielletty-rakennukset/a3a5-v2/v2-kaide.png):
   v76 on koodissa (b7ef7f924: rakennukset-v61, c1-v6, c2-v10). Juuri _tyo/pelikoodari/kuja05-pk6-20261029/juuri-pk7-v76 (SHA OK).
   Esto v75:stä ja v76:sta leivottuna = v16 tavulleen → EstoTiedosto ennallaan (koe palatsi-esto-v17 ja -v76koe, ei käytössä).
   Aja kohta 06 (ja 04) REF b7ef7f924 juuri-pk7-v76:lla. Tarkista unity.logista rivi "F/G-kaiteet … A3/A5 a-meridiaaniportti N"
   ja varoitus "A3/A5-malli … puuttuu". LR: A5-pylvään alaosa näytti Blenderissä osin läpikuultavalta → tarkista materiaali.
   Pintatarkistus: tripo_mat_* on sallittu vain polussa juoksupeli-osat-215; A3/A5-glb:t ovat nyt kielletty-c2-v10:ssä → katso
   pinnat.txt, ja jos se on VIKA, kysy PT:ltä sallitaanko c2-v10:n a3-/a5-glb:t.
   VS: B1–B3 kytketty linssiseppa2/pinnat-215 c1906fa90 (V4_paaharja, V4_keskiovi, V4_nimitaulu; lista tyokalut/pintasarja.json) →
   pariajo vaatii, että glb:issä on nämä materiaalinimet.

## Tehty 22.0x–22.3x
- Osasarjan lataus todennettu: unity.log:6086 (esikatselu-20261029-214601) "osasarja kielletty-osasarja-v1/: 1 polkua (+1 koe- ohitettu),
  21 osaa, 3 pursotusta, 10 nippua". Debug.Log menee unity.logiin, ei ajo.logiin.
- A2 #1250–1252 portti: zip kopioitu _tyo/pelikoodari/codex-osat-215/ (SHA d86f2269… täsmää), purku a2-first3-v1/partial-a2-first3-v1/,
  codex-3d-tarkistus KAIKKI OK; LR:lle ilmoitettu. LR kokoaa harjarivit, kun kaikki 12 ovat tulleet.
- C2LahteenNimi poistaa nyt "-lod0"-liitteen (a3a5:n lähde a-meridiaaniportti-lod0.glb → kaiteeton LOD0 c2-kansiosta).

## Avoinna
- Edellisen luovutuksen Avoinna-kohdat 4–6 ennallaan (vanhat pinnat LR:lle, juna 215 NS:lle PT:n kuittauksella, NUI:n kaidepaketti).
  Junaan nyt salikamera-215 osasarja-215:n sijaan, kun sisäkamera on PT:n kuittaama (sisältää v76:n).
- Codex: A1 auki (miekan kahva), A2 loput 9 + A4 tulossa → sama portti kuin A2:lle (kopio + SHA + codex-3d-tarkistus → LR).
