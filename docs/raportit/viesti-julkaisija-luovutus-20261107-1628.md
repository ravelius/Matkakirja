# Julkaisija: luovutus 7.11.2026 klo 16.28

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt. Korvaa -1543:n; sen, -1448:n ja vanhempien OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa (git show 7351b5937:docs/raportit/viesti-julkaisija-luovutus-20261107-1543.md; git show dcbd33af7:docs/raportit/viesti-julkaisija-luovutus-20261107-1448.md; tapa ja vahdit git show 02e202344:docs/raportit/viesti-julkaisija-luovutus-20261107-1231.md rivit 18–19).

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS', 30 min), sitten ps pideistä. Kaikki on nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa. Katso myös /tmp/ju-portti.lukko.

## JONO (kuittaus tilaajalle: kuvat, md5, samat kuvat nimeten, aika; älä arvioi)
- L2: NS julkisivu3 f3d680c47, pid 63393, T/ns-julkisivu3-e.zsh. Päällä valmis 24/24, tallenne 1/1, md5-eri 23: samat kuvat kertomatta. Pois ALKOI 16.25, sitten koodi (vain tallenne, 0 kuvaa). lokit/natiiviseppa-julkisivu3-{paalla,pois,koodi}. Kerro NS:lle "talot: N palaa kansiossa" (jonoloki "talot tila palat"; tarkista loki) ja samat kuvat. Kuittaus NS:lle, kun "3 ajoa loppu". Ei junaan.
- L1: VS film7 a69ae579a, pid 81104, ALKOI 16.18, Ultra, 29 kuvaa, lokit/linssiseppa2-film7-a69ae579a. Kuittaus VS:lle samaan muotoon (Ultra-pakotettu, samat kuvat nimeten). Ei junaan.
- Odottaa: NUI elämä 6 531ccfd34, pid 93506, vapaa linja, aikaraja 12, 8 kuvaa, lokit/natiivi-ui-kartan-elama-6-531ccfd34. Kuittaus NUI:lle. Ei junaan. NUI:n kysymys puhtaasta Librarysta avoin: oletus ei tyhjennetä.
- iPad: vapaa, runko d092f48cc, 16.27. Laatat offline/ (30, ohjaus) jäivät tarkoituksella.
- Odottaa KS:n sanaa: lokit/julkaisija-laite-218-045844251/Matkakirja3D.app pois, kun KS sanoo (kuittaus lähetetty 16.27).

## JUNA 220: julkaisija/juna-220 = f873c938f, natiivi-backupissa, junarivit kirjattu. Ei käännetty tässä kokoonpanossa.
Lisätty: 359fc1f95 (9566323b2 kyltit), f873c938f (5bd4aa484 Lontoo-nimi, ei alla olevia; Kartta-testit puusta 705/705).
PT 16.26: omistaja hylkäsi palkki5:n junaan; jonossa ei ollut iPad-ajoa eikä juuren vientiä. Juna odottaa LAV:n uusia testikuvia ja omistajan sanaa. Yhteisajo ja kylmä aloitus VAIN PT:n sanalla. Kumpu: PT hyväksyi kokeena, KS haara karttaseppa/kumpu-220 045844251, ei junaan ilman PT:n sanaa. Ei VIE-sanaa. Yöportti vasta lopullisella rungolla.

## ISO iPAD: Documents tyhjeni 15.53 (syy "ei todistettu", PT: älä toista koetta iPadilla)
KIELTO (PT): --remove-existing-content ei missään iPad-skriptissä. Poistettu ks-kumpu-ipad.zsh ja -b:stä; muita käyttäjiä ei ollut.
Palautettu 15.57 talopalat-lontoo-d10 ja -kumpu 243/243. Ei palautettu: välimuistit (täyttyvät), kokeet, kartta-osat (ei viittausta rungossa). Tallennus*.json ja peli-tila.json hävisivät, ei kopiota. Havainto: lokit/karttaseppa-kumpu-ipad/HAVAINTO-documents-1555.txt. Pieneen iPadiin ja iPhoneen ei kosketa.

## LEVY: 23 Gi 16.27. Alle 20 Gi rivi PT:lle, ei uutta iso-kansioista käännöstä; alle 10 Gi ei käännöksiä. .app-sääntö kuten -1448.

## KUITATTU: NUI kyltti-korjaus-1, elämä 5; VS film5, film6; PK i13, i13p; LAV palkki4, palkki5 (Mac); KS kumpu, kumpu-ohjaus (7/7, VIKA-lähetys 2 kerrottu). KS:lle: TF 219 lähde a8b873e5d, ei 36cd3087a.

## OPIT
- Älä tarkista laitekäännöksen lokiriviä kansiosta: lokit eivät ole lokit/julkaisija-laite-218-*:ssa (oma VIKA 16.18). Tarkista diff -rq $APP/Data/Raw/talopalat/lontoo <lähde>.
- zsh tässä kuoressa: echo === kaatuu ("= not found"), glob (N) ei toimi komentorivillä; setopt nullglob tai skripti tiedostoon. "listan polkuja 1" oli tyhjän rivin laskenta.
- Listaus "Documents" rc 0 ja yksi tiedosto on todellinen tila; alikansion listaus rc 1 voi tarkoittaa, ettei kansiota ole.
- Järjestys: odottavat vaihdetaan uusiin skripteihin (T/ju-jarjestys-1552.zsh, -1603.zsh).
