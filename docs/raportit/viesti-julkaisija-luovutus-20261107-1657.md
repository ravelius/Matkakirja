# Julkaisija: luovutus 7.11.2026 klo 16.57

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt. Korvaa -1628:n; sen (git show 93a0c711f:docs/raportit/viesti-julkaisija-luovutus-20261107-1628.md: iPad-tapahtuma, OPIT) ja vanhempien OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa.

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS', 30 min), sitten ps pideistä. Kaikki on nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa.

## JONO (kuittaus tilaajalle: kuvat, md5, samat kuvat nimeten, aika; älä arvioi)
- L2: LAV saanto 61afeb7f2, pid 48181, ALKOI 16.48, 2 ajoa à 42, kansiot _tyo/linnanrakentaja/muuri/palkki/kuvat-saanto ja -perus. Rivi LAV:lle, kun "SAANTO AJETTU" (T/lav-saanto.log). Ei vientiä, ei iPadia.
- L1: NS julkisivu4 f3d680c47, pid 49758, ALKOI 16.49, 13 kuvaa jq-*, lokit/natiiviseppa-julkisivu4. Tulosrivillä talot-palat (> 0) ja lahin-343 (> 0). Kuittaus NS:lle. Ei junaan.
- Odottaa: VS film8 80477acae pid 52394, julkisivu4:n alun jälkeen, 16 kuvaa, Ultra, lokit/linssiseppa2-film8-80477acae. Kuittaus VS:lle. Ei junaan.
- Odottaa: NUI elämä 8 7fc20c516 pid 73335, T/nui-elama8-ipad-b.zsh: käännös vapaalla linjalla, iso iPad, pois ja sitten päällä, 11+11 kuvaa, vahti päällä, lokit/natiivi-ui-kartan-elama-8-ipad-{pois,paalla}-7fc20c516. VIKA pois-ajossa: toista ei ajeta, rivi NUI:lle. VIKA päällä-ajossa on tulos: lukema NUI:lle. Rivi "md5-eri" voi olla harha, kun kuvia on 0. Kuittauksen jälkeen .app pois (lokit/julkaisija-laite-218-7fc20c516/Matkakirja3D.app), NUI:n sanalla.

## VIENTI: Lontoon kumpu (OMISTAJAN PÄÄTÖS 16.47, PT)
Odottaa KS:ltä polkuja + SHA256SUMS + listaa vanhoista kansioista (pyydetty; PK:n ASSETIT OK saatu, koskee TF 219 a8b873e5d ja TF 218 a5323cf4e, oma grep 0 osumaa).
Vie VAIN uuteen kansioon julisteet/maasto/2026-11-07-lontoo/: 30 .terrain samoilla z/x/y-poluilla, lähde _tyo/karttaseppa/lontoo-kumpu/laatat-v1 (PK). Ei muuttuneet.json, ei layer.json, ei laatat.json-muutoksia, vanhaan kansioon ei kosketa. PT sanoi "laatat ja palat": PK:n mukaan paloja ei haeta mediasta, vienti tarpeeton; varmista KS:ltä tai PT:ltä ennen pois jättämistä. Vanhojen kansioiden sha ennen ja jälkeen; rivi PT:lle. Haku verkosta testaamatta ennen vientiä. Ei lukitusta, ei mainiin.

## JUNA 220: julkaisija/juna-220 = 045844251, natiivi-backupissa, junarivit kirjattu. Ei käännetty. Koodi viittaa kansioon, jota ei ole vielä mediassa: vienti ennen rungon käännöstä.
Odottaa LAV:n testikuvia ja omistajan sanaa (palkki5 hylätty, muurin juuri auki). Yhteisajo ja kylmä aloitus VAIN PT:n sanalla. Ei VIE-sanaa. Yöportti lopullisella rungolla.

## LEVY: 19 Gi 16.56. PT: alle 15 Gi rivi PT:lle; alle 12 Gi pysäytä uudet käännökset ja rivi. Omien kuitattujen .appit pois; a8b873e5d JÄÄ (TF 219 omistajan koekäytössä); ei d092f48cc eikä 2cba21a3e. Esikatselukansiot kuitatuilta sanalla, kun kuvat täsmäävät (malli scratchpadista hävinnyt: md5 kohdekansioon, lsof, ei muita alikansioita kuin tila-ennen). Skriptien levyraja >= 20 estää käännöksen: käytä 12:ta.

## KUITATTU: VS film7, taivas-syvyys, taivas-osuus; NS julkisivu3 (3 ajoa); NUI elämä 6; KS kumpu-ohjaus, kumpu-lisä (.app poistettu); NUI elämä 7 SEIS (4084 Mt, 0/11, .app poistettu).
Iso iPad: runko d092f48cc, Documents: talopalat-lontoo-d10, -kumpu, offline 30 laattaa, muistivahti-vika. KIELTO --remove-existing-content.
