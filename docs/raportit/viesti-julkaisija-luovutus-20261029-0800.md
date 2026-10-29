# Julkaisijan luovutus 29.10.2026 klo 08.00 (konteksti 30 %, pehmeä raja)

Vain voimassa oleva tila (Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -40).
Käytännöt: `docs/raportit/viesti-julkaisija-luovutus-20261026-1601.md` (luku 1) voimassa. Viestit `mcp__ccd_session_mgmt__send_message` id:llä.

## 0. TILA NYT
- **TF 213 ULKONA 22.16** (iOS-ajo 40759816169, runko b8a92d661 = a7b9b71d4 + KS suomeksi-213, muutosloki PR 5480 → 4be927ee4).
  Sisäinen 40760909326, ulkoinen 40761623771 (Arvioijat + Beta-testaajat), beta-arvio APPROVED; vanhennus 40761815205 22.17
  (212 iOS + Mac). Ensimmäinen ajo 40757168247 (a7b9b71d4) PERUTTU ennen IPA:ta (englanninkieliset nimet).
- **AVOIN: Mac-TF 213 ajamatta** → Mac-testaajilla ei buildia (Mac 212 vanhennettu). Kaava: NS antaa Mac-appin SHA:n,
  JU käynnistää (vrt. tf-jono 27.10. 20.22 Mac-TF 212 40559356131). Kysy NS:ltä.
- **Linjat ja simut vapaina** 07.50 alkaen, ei jonoa. Juna 214 kertyy (NS: juna-214 kärki 408c5cbeb sis. tasangot de6053ab8).
- **Tasankopohja juna 214 VIETY** 01.00: julisteet/pallo/laatat/2026-10-26-pohja-20261027/ (324 939) + kerma/2026-10-27-p060/ (33 838),
  määrät täsmäävät. Skripti `julkaisija-tyokalut/vie-tasangot-214.zsh` (+ .log).
- **R2-uusinta tarkistuskierroksella** (PT:n pyyntö): `poista-r2-yhteinen-uusinta-20261028.zsh` käy KAIKKI 219 kansiota KeyCountilla;
  komento PT:llä → KK → omistaja ajaa. JU ei aja pysyviä poistoja.
- **Odottaa:** PK:n pk7-vienti (kk-pohja-v1d-pk7 → maailma-v4) yhdessä LR:n paketin (tausta v63, muurikate v20 …) kanssa; pk6 EI vientiin.

## 1. KÄÄNNÖSAPURI (muutettu 28.10.)
- `ks-kaanna-sha-kansio.zsh <sha+sha…> <alikansio>`: kaannos.out kirjoitetaan vasta lopuksi per-prosessi-tmp:llä (.tmp.$$ + mv);
  ennen tee tyhjensi sen heti alussa ja rinnakkaiset ajot sotkivat tmp:n. Varmuuskopio `.ennen-tmp-20261028`.
- Muiden roolien (NUI) .app-kopiot samalla kaavalla suoraan: `PROTO_LINJA=1 PROTO_APP_KOPIO=<kansio> zsh proto-kaanna.sh <sha>`.
- Sama kansio peräkkäisille pyynnöille → uusi korvaa vanhan: varoita pyytäjää asentamaan ennen-app ennen seuraavaa käännöstä.
- Pieni iPad = OIKEA laite iPad Pro 11 (M5) 00008142-0019686E02F3801C (oli "unavailable" 28.10. iltaa); suorituskykymittaus vain laitteella.

## 2. TF-ULKOINEN PIDOSSA -KAAVA (käytetty 28.10.)
- Ennen käynnistystä `touch julkaisija-tyokalut/tf<N>-ei-ulkoista` → tf-kaynnista.sh poistaa ketjusta VAIN-ARVIO-rivistä alkaen.
- Kuittauksen jälkeen: lippu pois, tf<N>.sh uudelleen pohjasta (sed kuten tf-kaynnista.sh) ja käynnistys perl-setsidillä samaan lokiin.
- Buildinumeron säästö: väärän rungon TF-ajo perutaan (`gh run cancel`) ennen "Lähetä TestFlightiin" -vaihetta.

## 3. LEVY (PT 29.10. 07.5x)
- 36 → 38 Gi: poistettu PT:n nimeämät todistus-pk7 (0727) ja todistus-drone214b, omat .app-kopiot tf213-b8a92d661, nostonimet-214,
  kaikki-213, kaannospalvelu-lokit yli 2 vrk (763 → 124 Mt).
- Jäljellä käytössä olevat juna 214 -appit (~4,7 Gt): KS sauma-214, siirtyma-214, tasangot-214, nimet-214; NUI kohdenostot-bugit-214,
  arkki-tuplat-214, nostonimet2-214. Poisto vasta, kun parit kuitattu (PT nimeää).
