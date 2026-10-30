# Pelikoodari: luovutus 30.10.2026 klo 01.55 (konteksti 34 %, Postivahti)

Edellinen luovutus -20261030-0040 (f5a923ff9, PR 5632). Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN).
Työkansio _tyo = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029 (skriptit aja-*.zsh, lokit *.log).

## TEHTY tällä vuorolla
- **Sali 04 (salin sisäkamera)**, haara pelikoodari/salikamera-215 (worktree wt/proto-pelikoodari-pk7-214, pushattu natiivi-backup):
  - 91a20d842: pidetty salin katto avaa hallin sisätilan näkyvyystesteissä (JuoksuSokkeloMaailma pidetytKatot → PelaajaPiilossa).
    Syy: peittokartassa halli umpimassaa → näkyvyysnosto 8 m + ylle, kamera 70° lattiaan; salibotti 1: 149 → 0 piiloruutua, sali 0: 0.
  - efc3f066a: avointen salien Stone tile → laji 2 (Lattia.cs). 35d4b6a0b: Floor tile -laattojen kyljet pois "palatsi avoin" -osissa
    (2 cm:n raoista näkyi valaistu 1 m:n ruudukko; PT:n kohta 2). Pari 013812/04: keisari 0,12, ruudukko poissa (pisteitä risteyksissä).
  - PT 01.4x: EI vielä oletukseksi. SaliSisakamera = true samaan commitiin, kun lopullinen pari hyväksytty (VS/LR: katon alapinta musta).
- **Pintalista + työkalu**, haara pelikoodari/pinnat-pbr-215 (worktree wt/proto-pelikoodari-lr83-215, juna-215 362182ba5:n päältä):
  e1f00d527 V4_sivupaviljonki + Codexin 12 harjaeläintä (*-pbr nimillä, PT: ei kuviota) → v92-juurella 0 vikaa;
  **dfdfc3d1a** palatsipinnat.py lukee listan REF:stä (NUI:n 33 VIKAA tuli vanhan checkoutin listasta). Kärki lähetetty NS:lle (merge juna 215).
- **LR:n siipikatot** (selvitys): V4_gold = SokkelonPinta 14 (katepinta) "sokkelo …"-malleissa → LR vaihtoi kannattimet V4_konsoli_kulta (OK).
  Palkkivyö tummansininen = JuoksuMaailma.shader 362182ba5 r. 292: _PalatsiKatto > 0.5 osuu myös vyöhön (2) + vyökerroin 0,4/0,85/1,5
  → PT antoi korjauksen VS:lle. Hongyigen läikät EIVÄT johdu tästä (V4_sivupaviljonki laji 0) → A6-työhön.
- B2 pari (06 Meridiaaniportti) 011845/06: nimitaulun yläosa rajautuu pois kuvasta. B3 (0.8 -24) osui räystään alle → uusinta alla.

## KÄYNNISSÄ TAUSTALLA (katoaa nollauksessa → tarkista loki; jos ei "VALMIS"-riviä, aja uudelleen)
Linja 2 jonottaa (lukko /tmp/matkakirja-kaannospalvelu-2.lukko). Aja peräkkäin `zsh _tyo/<skripti> > _tyo/<skripti ilman .zsh>.log 2>&1`:
1. **aja-b3-keskiovi-36218.zsh** (B3 Taihedianin keskiovi 0.8 -28 ja -31, runko 362182ba5, juuri v83). Tarkista keisari terassilla oven
   edessä (ei räystään alla: kameraväli "ylle 0.00"). OK → pari PT:lle (B2 011845/06 + B3) ≤ 3 riviä.
2. **aja-salikamera-04-v52.zsh** (lopullinen 04-pari: 35d4b6a0b + LR:n avoimet-v52 = katon alapinnan ruoteet 1067-kuvalla;
   juuri **juuri-pk7-v76r** = v76, jossa avoimet-v51 → /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/ruoteet-v173/avoimet-v52,
   tee-juuri-v76r.zsh). Tarkista katon alapinta (ei mustaa, mittari "mustat" ~1 %), lattia ilman ruudukkoa → pari PT:lle.
3. **aja-tyohuone-v52.zsh** (PT:n lisäpari: työhuone sisäkameralla, editori 06 -127.5 379 -2, sama juuri v76r). Keisari salissa
   etelästä pohjoiseen; tarkista katon alapinta → pari PT:lle 04:n kanssa.
PT hyväksyy → commit SaliSisakamera = true (DroneNosto.cs) haaraan salikamera-215 + AvoimetKansio "avoimet-v52/" vasta LR:n viennin
mukana (koodissa yhä v51; juuri v76r vain koeajoon).

## SEURAAVAKSI
- A6: kun Codexin korjattu GLB (7-välinen yläkerta) on LR:n paketissa → pari 03/03b rungosta 362182ba5 + Hongyigen läikät
  (atlas UV/mip/pakkaus; kuvabias ei ole syy, LR testasi). A6-osoittimet (V4_sivupaviljonki jo listalla e1f00d527).
- Avoinna ennallaan: vanhat pinnat LR:lle (V4_sokkeli/_kansi avoimissa, V4_stone kulmatornin törmäyksessä).

## LISÄYS 02.2x (PT:n pyynnöstä, ENSIMMÄISENÄ)
- Luovutuksen jälkeen tehty: salikamera-215 **d54d4030d** (SaliSisakamera = true, PT/KK hyväksyivät 04-parin 014739) ja
  osoitinhaara pelikoodari/lr-v91-215 **9961b447a** (LR v91 + v92: tausta-v76, rakennukset-v78, ulkorengas-v9, c2-v19, lahipuut-v7,
  avoimet-v52; uusi palatsi-esto-v19 = _tyo/palatsi-esto-v19, v78 leivonta identtinen) – molemmat NS:llä junaan 215.
  Taustaajot 1–3 VALMIIT (04 v52 014739 hyväksytty; työhuone 014856: kulma 57°, katto ei kuvassa).
- **ENSIN: B2 (Meridiaaniportin keskiovi + nimitaulu) ja B3 (Taihedianin keskiovi) LÄHIKUVINA uusimmasta rungosta 2f05e3b34 (tai uudempi).**
  B2 011845 hylätty (kaukaa, ovi pieni, vanhat kaariaukot). B3 0.8 -24/-28/-31 kaikki katon alla (ylle 17,6 m, Puyi maailmassa
  z −363/−359/−356: pohjan z −4 → maailman z +4). Hae paikka z-suunnan tarkistuksella (esim. pohjan z -20/-16 tai x-siirto), editori 06 x z suunta.
