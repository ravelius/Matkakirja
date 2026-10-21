# Julkaisijan luovutus 21.10.2026 klo 21.55 (tilin viikkoraja, omistaja 21.53)

Vain voimassa oleva tila (omistaja 15.11, Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -60).
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit `mcp__ccd_session_mgmt__send_message` session-id:llä.

## 0. TILA NYT
- **TF 209 VALMIS** (omistaja pyysi 16.14): iOS 39652446915, sisäinen + ulkoinen 21.47, beta-arvio APPROVED; Mac-TF 39653083987 (NS) 21.38; 208 iOS + Mac vanhennettu 21.48. BUILD e51c33e0f, muutosloki #5146 → main 9e83d913d.
- **Seuraava juna 210 auki**, TF vain merkinnällä "OMISTAJA PYYSI JULKAISUA". Odottaja tehdään `tf209-odota-muistiajo.zsh`:n mallilla (sed: build-numero, BUILD-sha, M, muistiajo-210.txt).
- **Linjat:** NUI 3791c6a5c L2:lla (21.52) → perään 1 simuajo iPhone 17 (lupa annettu). Ei muita omia käännöksiä.
- **Vahdit:** Valosepän vahti käynnissä (pid /tmp/matkakirja-valovahti.pid). Poissuljettu tänään: raketti-muisti, louvre-seepia, hutong, varjo-varina, kierros2-paiva, rijks-paivanvalo-210 (käsikäännöksinä tai todistettu muuten). Lukkovahti ajetaan Monitorina (`zsh julkaisija-tyokalut/lukkovahti.zsh`).
- **Avoimet PR:t:** ei omia. Esikatselutyökalu (`wt/proto-tyokaluseppa-esikatselu`, haara tyokaluseppa/esikatselu = 335bbfbd4, --batch oletus) on hyväksytty, master vain NS:n BUILD-mergen kautta (pyydetty junaan).

## 1. VOIMASSA OLEVAT LINJAT (lisäykset 21.10.)
- **Hiljainen tunti** (12.13): `ioreg -c IOHIDSystem | awk '/HIDIdleTime/…'` < 600 s → ei simuja; käännökset (nice 15) jatkuvat. Poikkeus vain PT:n "simu silti". Matkalla 22.–26.10. hiljainen tunti ei rajoita.
- **TF-tarkistusajo myös päiväjunassa** (omistaja 16.17 korvasi 16.16:n): NS ajaa muistiajon isolla iPadilla ja kirjoittaa muistiajo-<N>.txt.
- **Näytökset omistajalle suoraan isolla iPadilla** kun hän on paikalla (omistaja 09.44): NS asentaa (devicectl + peli-komento.txt); poissa ollessa nauhoitus. Asennus ei kesken omistajan katselun (PT).
- **Muutosloki ≤ 280 merkkiä** (`tools/vienti/muutosloki-natiivi.mjs`); pitkä PT-teksti tiivistetään ja tiivistys kerrotaan PT:lle.
- **CDN muistaa 404:n** (~4 h): tekijä ei saa hakea polkua ennen vientikuittausta; korvaus uudella polulla.
- **Simulaattoreiden tila**: tarkista sarjasta `xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" list devices booted` (oletus-set näyttää 0).
- **Museo piirtyy simulla mustaksi** (PaniniProjection karsittu): museokuvat Mac-esikatselulla `--batch` tai laitteella.
- **VS:n toistuvat käännökset**: `zsh julkaisija-tyokalut/vs-kartta-arkki-kaanna.zsh <sha>` (L2 → kartta-arkki/app), `vs-kierros2-kaanna[-l2].zsh <sha>` (kierros2/app), `vs-hutong-kaanna-sha.zsh <sha>` (hutong/app); loki `vs-<nimi>-<sha>.log` (KÄÄNNETTY, CS-virheitä, L? VAPAA). VS ajaa A26BC7D0:lla suoraan lokin perusteella.

## 2. Tilin viikkoraja (omistaja 21.53)
78 % → luovutus (tämä), 80 % → pysähdy. Työ jatkuu pe 24.10. aamuna toisella tilillä.

## LISÄYS 23.52 (viikkoraja 78 %: LUOVUTA NYT)

- 21.55 jälkeen vain NUI:n kolme L2-käännöstä + iPhone 17 -simua (84b7a79bd, d2b23f5b0, 6f8455f1a P10-vaaka); kaikki SIMU VAPAA, viimeisin 22.43.
- L1 ja L2 vapaat, simut vapaat, ei jonoa. Valosepän vahti hiljaa (viimeinen tila 19.46 VIKA AJO rijks-paivanvalo-210, haara poissuljettu).
- TF 209 ketju valmis; juna 210 auki, TF vasta OMISTAJA PYYSI JULKAISUA. Seuraava tili jatkaa pe 24.10. aamulla tästä.
