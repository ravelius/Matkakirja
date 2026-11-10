# Pelikoodari: luovutus 10.11.2026 klo 17.45 (Postivahdin NOLLAUS)

Edellinen: viesti-pelikoodari-luovutus-20261110-1724.md (osa 9 tausta, osa 10 NUI, järjestys PT:ltä yhä voimassa).

## 1. JUOKSUPELIN iPad-KOPIO (OMISTAJAN PÄÄTÖS 17.31, JU pyysi) – KESKEN: ilmoita JU:lle VALMIS
- Ei koodimuutosta: peli lukee Application.temporaryCachePath/juoksupeli-mallit/<ämpärin avain> (JuoksuLeivottu.ValimuistiJuuri) =
  iOS:llä Library/Caches/juoksupeli-mallit. JU:lle kerrottu kohde (devicectl appDataContainer, --destination Library/Caches/juoksupeli-mallit,
  ei poistolippua) ja tarkistus (loki "leivottu paketti palvelimelta 1055 tiedostoa", verkkohaut ~0).
- Peili: /Users/Shared/Claude/juoksu-ipad-peili-v3/juoksupeli-mallit (leivottu-v3 kokonaan 1,26 Gt, hahmot-v6, ovi-v1, maailma-v4:n 166 muuta
  tiedostoa listasta maailma-v4-muut.txt; maailma-v4 kokonaan 75 Gt). Lataus oli 17.44 953 Mt / ~1,6 Gt ja voi katketa nollauksessa.
  JATKA: zsh /Users/Shared/Claude/juoksu-ipad-peili-v3/juoksu-peili.sh /Users/Shared/Claude/juoksu-ipad-peili-v3 /Users/Shared/Claude/juoksu-ipad-peili-v3/maailma-v4-muut.txt
  (taustalla; sync ja olemassa olevat ohitetaan) → kun "VALMIS", tiedostomäärä noin 1230 → rivi JU:lle (local_2a7d6c96-…) "peili VALMIS".
- JU ajaa kopion vasta v131-ajon jälkeen (v131:n sk tyhjentää välimuistin; v131 ei ole PK:n).

## 2. PJ7 (latausruutu c62818943, iso iPad 17.36) – valmis-rivi PT:lle LÄHETETTY 17.4x
- Kuvat i1-4s, i2-2s, i2-kartta kunnossa. c62818943 ei muuta renkaita juna-224:ään nähden → PT:n pt-ok voi tulla ilman rengasmuutosta.
- OMA SK-VIRHE: oleta "(lento)" oli grep -E -ryhmä → PUUTE ja 600 s viive → i1-lento ja i1-renkaat-a/-b 10 min myöhässä (vasen rengas
  puuttui, ei todiste). Korjattu sk: proto-3d/_tyo/pelikoodari/juoksu-lataus/sk-ipad-iso-latausruutu-renkaat-v2.txt (md5 f12a83a1b530).
  PT 17.4x: renkaat omaksi työksi OSAN 9 JÄLKEEN (uusinta v2-sk:lla JU:lla).

## 3. OSA 9 (PT: ensin) – uusi sääntö fe2e7eb20 (haara pelikoodari/osa9-kulku-v129, natiivi-backup), v129d-ajo kesken
- Löydös: v129:n 64 rajakohtaa "talo > 0,5 & kate ≤ 0,5" ovat PIIRRETTYJEN talojen pohjissa (korkeiden pintojen osuus 0,8–1,0;
  esim. 中和殿 (-2.6; 77.2), 膳房 (-96.3; 218.6), 倦勤斋, 内务府): pohja.json:n pohja ulottuu terassille/pihalle. Talokohtainen suodatus
  (v129b/c) oli väärä lähestymistapa. Koe: scratchpad talokoe.py/rajat.py (ei talteen; logiikka yllä).
- fe2e7eb20: taso1_rajaus talot = rasteri(pohjat) & ~avoin (avoin = A != 0 & ~katettu); TALO_AVOIN_MAX pois.
- TEE: aja nice -n 15 /opt/homebrew/bin/python3 tyokalut/kulkukartta_ajo.py proto-3d/_tyo/pelikoodari/kulkukartta/v129d
  proto-3d/_tyo/pelikoodari/kulkukartta/v129/osasarja-v15.bin (pinnat.npz jo v129d:ssä) → v129d.log: rajakohdat "talon pohjalla"
  ~0 ja taso 1 -ala vs v129c 392474 m² (tarkista ettei katoille pääse: taso1.png). Sitten 1724-luovutuksen kohta 2 loppuun (--vie, testit, commit).
