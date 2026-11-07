# Julkaisija: luovutus 7.11.2026 klo 17.00

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt. Korvaa -1657:n ja -1628:n; -1628:n (git show 93a0c711f:docs/raportit/viesti-julkaisija-luovutus-20261107-1628.md: iPad-tapahtuma, OPIT) ja vanhempien OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa.

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS', 30 min), sitten ps pideistä. Kaikki on nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa.

## JONO (kuittaus tilaajalle: kuvat, md5, samat kuvat nimeten, aika; älä arvioi)
- L2: VS film8 80477acae pid 52394, ALKOI 16.56, 16 kuvaa, Ultra, lokit/linssiseppa2-film8-80477acae. Kuittaus VS:lle. Ei junaan.
- Seuraavaksi samalla linjalla: LAV saanto 61afeb7f2 pid 48181, 1. osa valmis 16.56, 2. osa jäi film8:n taakse L2:lle (PROTO_LINJA 2; oletettu lukon odotus, ei varmistettu: katso T/lav-saanto.log). Kansiot _tyo/linnanrakentaja/muuri/palkki/kuvat-saanto ja -perus. Rivi LAV:lle, kun "SAANTO AJETTU". Ei vientiä, ei iPadia.
- L1: NUI elämä 8 7fc20c516 laitekäännös ALKOI 16.57, pid 73335, T/nui-elama8-ipad-b.zsh, sitten iso iPad: pois ja päällä, 11+11 kuvaa, vahti päällä, lokit/natiivi-ui-kartan-elama-8-ipad-{pois,paalla}-7fc20c516. VIKA pois-ajossa: toista ei ajeta, rivi NUI:lle. VIKA päällä-ajossa on tulos: lukema NUI:lle. "md5-eri" on harha, kun kuvia on 0. Kuittauksen jälkeen .app pois NUI:n sanalla.
- Odottaa: VS taivas-karki e3a272f76 pid 75323, film8:n jälkeen, 62 kuvaa, Ultra, lokit/linssiseppa2-taivas-karki-e3a272f76. Kuittaus VS:lle. Ei iPadia.

## VIENTI: Lontoon kumpu VALMIS 16.58 (omistaja 16.47). 30 laattaa julisteet/maasto/2026-11-07-lontoo, 0 virhettä; vanha 2026-10-29-maailma 31/31 sama ennen ja jälkeen; TF 219 ja 218 0 viittausta; PT, KS, PK kuitattu. Palat eivät mediaan. Haku laitteella verkosta testaamatta: seuraavassa rungon laiteajossa.

## JUNA 220: julkaisija/juna-220 = 045844251, natiivi-backupissa, junarivit kirjattu. Ei käännetty.
Odottaa LAV:n testikuvia ja omistajan sanaa (palkki5 hylätty, muurin juuri auki). Yhteisajo ja kylmä aloitus VAIN PT:n sanalla. Ei VIE-sanaa. Yöportti lopullisella rungolla.

## LEVY: 19 Gi 16.56. PT: alle 15 Gi rivi PT:lle; alle 12 Gi pysäytä uudet käännökset ja rivi. Omien kuitattujen .appit pois; a8b873e5d JÄÄ (TF 219 omistajan koekäytössä); ei d092f48cc eikä 2cba21a3e. Esikatselukansiot kuitatuilta sanalla, kun kuvat täsmäävät (md5 kohdekansioon, lsof, ei muita alikansioita kuin tila-ennen). Skriptien levyraja >= 20 estää käännöksen: käytä 12:ta.

## KUITATTU: VS film7, taivas-syvyys, taivas-osuus; NS julkisivu3 (3 ajoa), julkisivu4; NUI elämä 6; KS kumpu-ohjaus, kumpu-lisä (.app poistettu); NUI elämä 7 SEIS (4084 Mt, 0/11, .app poistettu).
Iso iPad: runko d092f48cc, Documents: talopalat-lontoo-d10, -kumpu, offline 30 laattaa, muistivahti-vika. KIELTO --remove-existing-content.
