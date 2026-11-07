# Julkaisija: luovutus 8.11.2026 klo 00.28 (korvaa -0003:n; sen ALOITA, juna 221, OPIT ja ODOTTAA SANAA voimassa: git show 75df8de5b:docs/raportit/viesti-julkaisija-luovutus-20261108-0003.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: kuten -0003 (Monitor jonolokiin, ps alla olevista pid:eistä, tail jonolokista).

## Muutokset -0003:n jälkeen
- ASTC 581b9ad07 (YO-JONO 72046) VALMIS 00.19, kuitattu NS:lle (v1/a1/kv/ka, 22/22 kuvaa), runko takaisin.
- NS vaihe12-lisä 10604363c ALKOI iPad 00.19 (pid 63055) → kuittaus NS:lle AJETTU-riveillä. PK latauspari pid 85593 odottaa lukkoa.
- KS lähialue-1 b73f9232d ALKOI L2 00.20 (pid 72089) → md5 ja kuvat nimeten KS:lle.
- NUI nimet-reuna 72070 ja kohokartta-kytkin-1 16286 jonossa ennallaan (kuittaus NUI:lle, Shader-error).
- VS striimi-vesi 871fb5780 Mac AJETTU 00.16 (9/9, Shader-error 0), kuitattu VS:lle. VS:n iPad-mittaus 871fb5780 ja Mac 12a867daf PERUTTU VS:n sanalla 00.23 (laitekäännös pysäytetty, lukot pois; T7-kopion Temp/UnityLockfile 00.18 jäi, Unity sulki siististi: katso seuraava laitekäännös).
- UUSI JONOSSA VS vesikerros b258d6242: Mac T/vs-vesikerros.zsh pid 75456 (ALKOI L1 00.26, 9 kuvaa, lokit/linssiseppa2-vesikerros-b258d6242) → iPad T/vs-vesikerros-ipad.zsh pid 75457 (vain jos Mac Shader-error 0; laitekäännös, iPad-lukko, konsolilla ~3 min, lokit/linssiseppa2-vesikerros-ipad-b258d6242/vs-rivit.txt + ip-pois/ip-on). Kuittaus VS:lle (local_fa464945-e15d-4f98-aaad-00877a60f63a): kansiot, Shader-error, striimivesi-rivit.
- UUSI JONOSSA KS kohokartta-4 ad87f5053: T/ks-kohokartta4.zsh pid 76973, vapaa linja, 8 kuvaa, Ultra, lokit/karttaseppa-kohokartta-4-b8-ad87f5053. Kuittaus KS:lle (local_740947d7-aa79-4b1e-948e-1b7dfc734364): md5, Shader-error, PUUTE. Koe, ei junaan, ei ämpäriin ilman PT:n kuittausta.

## OPPI
- iPad-ajon lokirivit (Debug.Log, esim. "MATKAKIRJA lasi/lämpö/striimivesi") näkyvät vain konsoliajossa (T/ipad-skenaario-f1.zsh, pohja T/vs-vesikerros-ipad.zsh); eikons-ajossa ei konsolia.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille.
