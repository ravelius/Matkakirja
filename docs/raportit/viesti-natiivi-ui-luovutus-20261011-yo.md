# Natiivi-UI: luovutus 11.10.2026 yö (konteksti 45 %, PT:n raja 50 %)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md (pätevät yhä). Muistio: natiivi-ui-tila-20261009.md.
Omat simut: iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Todistusajo:
/Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh. Ajot irrotettuina (perl POSIX::setsid).
HUOM `tap-teksti` ei löydä kuvaelementtejä (kipin kuvanosto ja kierroksen lisäkuva puuttuvat `ui puu`sta), joten käytä koordinaatteja.
HUOM tarkista.sh: katso kaikki kolme riviä (unity, pohjavahti, KIELIVAHTI). Käännöspalvelu hylkää kovakoodatun UI-tekstin.

## Junassa 180 (PT kuittasi)
- natiivi-ui/lataus-poistu-180 **b1735b24e** (⊃ cea077126, 0ad356993): latausruudun Poistu oikeaan alakulmaan himmeänä
  (mk-ohjausryhma + --lepo + mk-kortti-kehys--tumma) ja Cesium ion -logon 1×1-paikkakuva hylätty (KrediititTiivis.IonLogo).

## Junaan 181 kuitattu
- natiivi-ui/lahtokohde-181 **5a57b42b5**: kaupungit.lahtokohde → alkulennon kohteet (Kaupunki.Lahtokohteet). Natiivisepällä.
  Karttasepän datan osoitinvaihto vasta TF 181:n jälkeen.

## KESKEN 1: metrokyltti + kipin kuvat (omistaja TF 180, 00.0x) → kuvapari PT:lle → juna 181
Haara natiivi-ui/metro-kyltti-181 **dc62d3733** (juna-180 9caa3d49b päällä), simukäännös 2f70fc328 = app
proto-3d/lokit/natiivi-ui-app-metro-181. Sisältö:
- 27c726f79 metrolinjan korostettu nimi 44 → Tyylikirja.Koko.Arkki (26) ja korostus koko kohteen ajan (kohde == naytettyIndeksi).
- f7daaab9c kipin kertomus- ja lisäkuvat iPhonella Nappi.Ohjaus 40 → OhjausIso 56, iPad ennallaan.
- 7890bdd22 + dc62d3733 kertomuskuva (OpasKuvanosto) isona ilman kuvatekstiä; tekijärivi (CC) jää; havainnekuvalla
  OpasYksityiskohdat.Tekijarivi(k, ilmanKuvatekstia: true) = "Havainnekuva · tekoälyllä tuotettu". Lisäkuvien kokoruutusuurennos oli jo ilman tekstiä.
Testit: tarkista.sh 0, Linssit 1354/1354.
Todisteet: metrokyltin kuvapari VALMIS proto-3d/lokit/todistus-metrokyltti-pari-20261011.jpg (iPhone 12 s ja 27 s, iPad).
KUVAPARI VALMIS: proto-3d/lokit/todistus-kippikuvat-pari-20261011.jpg (iPhone: reunan kuvat isommat, kertomuskuva isona ilman
kuvatekstiä, tekijärivi jää); PT:lle lähetetty. iPadin jälkeen-ajo jäi jumiin kuormassa (pysäytetty); iPadilla koko ennallaan.
PT 01.2x (samaan erään metro-kyltti-181:een, ennen kuittausta):
(a) Lisää pariin ENNEN suurimmillaan: vanha korostus 44 pt näkyi vain noin 3 s saapumisesta (KierrosTaulu → OpasMetrolinja.Korostus),
    sitten 18 pt. Ajot osuivat 18 pt:n vaiheeseen. Kuvaa b3af6eca:lla hetki, jolloin korostus on päällä (esim. oleta-rivi KierrosTaulun
    korostuksen alkuun tai `ui opasvalikko metro` -testitila + korostus), ja vertaa JÄLKEEN 26 pt:iin.
(b) Korjaa iPadin metrolinjan vasemman reunan rajautuminen ("Kaupunkikierros"-kyltti ja pisteet leikkautuvat ruudun reunaan,
    todistus-metro2-ennen-ipad-20261011-0015 ja -jalkeen-ipad-0046): todennäköisesti OpasMetrolinjan juuren left/turva-alue iPadilla.

## KESKEN 2: Olavinlinna B2 + B4 (PT:n yösuunnitelma, /Users/Shared/Claude/Matkakirja-fable/scratchpad/olavinlinna-yosuunnitelma-20261011.md)
Haara natiivi-ui/olavinlinna-181 **5d6742d58** (pohja siirtoseppa/botti-kavely 9c59fcf3b Siirtosepän pyynnöstä).
- B2: 3D-napautus ei sytytä/sammuta omaa kynttilää (SeikkailuEsineet.ToimintoNapista); oman kynttilän vaihto toimintoketjun viimeiseksi
  (SeikkailuKynttilat.OmaVaihto) – palava kynttilä vei napin ovelta/tikkailta; liekkinappi aina sammuneelle omalle kynttilälle;
  kynttilävihje PT:n vaihtoehto B (SeikkailuTapit.KorostaToiminto 3 s + kimallusääni, kerran pimeällä ja ☰ › Vihjeestä pimeässä).
- B4: huoneiden nimilaput piiloon historiassa ennen 1475 (SeikkailuHistoria.Vuosi), historian otsikko tatin yläpuolelle.
Testit: tarkista.sh 0, Linssit 1343/1344 (ui.linna.tyrma: Siirtoseppä korjasi haarassa siirtoseppa/laituri-varoitus 11351a887, avain olavinlinna.seikkailu.tyrma.nimi; ei tehdä omaan haaraan). Siirtoseppä kuittasi B2/B4, eikä hänen haaransa koske SeikkailuEsineet/Kynttilat/Vihjeet-tiedostoihin.
SEURAAVAKSI: käännös- ja simuvuoro Julkaisijalta → todistusajo Olavinlinnan pelistä (laiturilta tyrmään/pimeään: kynttilävihje,
3D-napautus ei sammuta, ovi aukeaa kynttilä palaessa) + historia (kivikausi ilman kylttejä, otsikko tatin yläpuolella), iPhone + iPad
→ kuvapari merkinnöin PT:lle → juna 181. Siirtosepän A-kohdat ovat samassa koodissa: tarkista hänen haaransa ennen käännöstä.

## Muuta
- Taidemuseon UI-viat: pohja natiivi-ui/taidemuseo-ui (wt/proto-natiivi-ui-taidemuseo, LS2:n museo-180 83f21ac7f). LS2 muutti
  MuseoTaulu.AsetteleNimi (linssiseppa2/museo-180 0a85a7c72) → rebase sen päälle. Lista tulee LS2:lta läpipeluun jälkeen.
- LEVY TEHTY 01.4x (92 → 97 Gi): vanhat tmp-sessiot ja appit poistu/poistu2/yhdistetty-180 poistettu. Jäljellä pakka-180 (LS1),
  poistu3-180 (= TF 180 -koodi, ennen-vertailu) ja metro-181; poista ne, kun metro-erä on kuitattu.
- A6 (ATA) ei tarvita (VAIN EUROOPPA), PT:lle kerrottu.
- Mergetyt worktreet: proto-natiivi-ui-lataus-poistu ja proto-natiivi-ui-lahtokohde voi poistaa, kun junat 180 ja 181 ovat masterissa.
