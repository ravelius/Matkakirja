# Julkaisija: luovutus 7.11.2026 klo 13.17

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt. Korvaa -1231:n ja sen lisäykset; sen ja vanhempien OPIT, MALLIT ja YÖN SÄÄNNÖT ovat voimassa (git show 02e202344:docs/raportit/viesti-julkaisija-luovutus-20261107-1231.md).

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS', 30 min), sitten ps pideistä. Kaikki on nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa.

## JONO (kuittaus tilaajalle; tarkista kuvat, md5 ja aika, älä arvioi)
L2 ajossa/odottaa: NS vaihto2 d2ba2f540, 4 ajoa, pid 39796 (kuittaus NS:lle, ruudut riittävät) → PK i9 88c858d0b sk-i9, T/pk-i9-jonossa.zsh pid 16917 (rivi PK:lle; lokit/pelikoodari-lontoo-i9-88c858d0b; Exception 11 näkyi i8:ssa ja i7:ssä) → NUI kartan-elama-2 9ec3c10fb pid 92110 (rivi NUI:lle) → NUI kyltti-selvitys-1 c50be596d pid 96094 (ei junaan; rivi NUI:lle). PK i9 ei odota muita kuin L2-porttia, joten järjestys voi vaihdella.
iPad järjestyksessä:
1. LAV seinä4 3fd3cba8e, T/lav-seina4-ipad.zsh pid 24168, käännös L2 ensin, VAHTI POIS vain tässä (PT). Kuittaus LAV:lle: kuvat 4 (pelia8, pelia, raja-x8, raja-x), ajat, konsolin "seinaloki"-rivien lkm, vahdin palautus; lisäksi kerro, onko alkuvalikko päällä (seinä2 ja seinä3: oli). Ei vientiin. PT odottaa tätä ennen junaa.
2. NS muisti80 83d48ba80, T/ns-muisti80-ipad.zsh pid 60565, käännös L2 vaihto2:n jälkeen, 2 ajoa, VAHTI POIS vain näissä (PT); kuittaukseen palautus laitteelta luettuna. App terminated keskeyttää myös toisen ajon. Kuittaus NS:lle.
3. KS kumpu 59319f789, T/ks-kumpu-ipad.zsh pid 30858 (+ T/ks-kumpu-offline.py), odottaa kaikkia edellisiä, oma käännös L2, vahti päällä. Pyyntö P/_tyo/karttaseppa/lontoo-kumpu/ajopyynto-ipad.md (päivitetty 13.2x, skripti on päivitetyn mukainen). Kuittaus KS:lle, sisällä rivi "offline-laatat nollattu 30/30, tiedostot jäävät 0-tavuisina". Yksittäisen tiedoston kopio devicectlillä ei ole testattu: skriptin kansiovara koskee vain ensimmäistä tiedostoa, jos julisteet puuttuu. Tarkista lokit/karttaseppa-kumpu-ipad/offline-*.
Muistivahti pysyy päällä kaikissa muissa ajoissa (PT 12.5x).

## JUNA 220: julkaisija/juna-220 = 5032205a6, natiivi-backupissa. Ei käännetty tässä kokoonpanossa.
Lisätty tällä vuorolla: kivet takaisin (revertti e4ed1c5e6 kumottu, cb4834e16; omistaja 12.09), dd3a2e10f Lontoon kamera + iPhonen lähizoom (2cf8ef67d; EI 59abbd78a), 051fc0e01 kylttien mittarit pois (28ac6f977; EI c50be596d), 8d427f3b0 poimittu yksittäin (58e5b34a7; Kartta-testit 702/702; EI 2c1d8187d eikä 708e68f62, kuvat puuttuvat), a45afc9af keisarin jalat (5032205a6).
Omistaja 12.50: "Tehdään kaikki korjaukset ennen junaa". Ei käännöstä viennille ennen PT:n VIE-sanaa. Tapa ja ehdot kuten -1231. Kun runko on lopullinen, yöportti uudelleen (gh workflow run natiivi-yoportti.yml).
Vahtien ajo puusta: archive Assets/Matkakirja tyokalut tyylikirja scratchpadiin, python3 -I tyokalut/<vahti>.py. Kartta-testit puusta: lisää ProjectSettings ja Linssit-testit/kultaiset/paketti/maarajat.json, git init, sh ./kaanna.sh.

## LEVY: 28 Gi 13.17. Rajat kuten -1231. Skriptit seinä4:ää lukuun ottamatta odottavat 20 Gi:tä käännöksen edessä ja kirjoittavat VIKA-rivin.

## KUITATTU: LAV seinä2 ja seinä3 (PT ja LAV; valikko päällä), KS muisti4, NS kertoja2 (md5-eri 5/8, kerrottu), NS mac-3, PK jalat, jalat2 ja i8, NUI elämä 1, KS ajo 49, VS film2 (md5-eri 32/35, kerrottu).

## OPIT
- iPad-kuvassa voi olla alkuvalikko pelin päällä, vaikka kuva on tästä ajosta. Katso kuva myös, kun aika ja md5 ovat kunnossa.
- Lukon haku 0,2 s välein menee 10 s:n pollaajien edelle; siksi seinä3/4 ohittavat muisti80:n.
- Laitteen listaus: devicectl device info files --json-output antaa relativePath ja size; taulukko ei sovi tarkistukseen. copy to yhdistää oletuksena (remove-existing-content false); yksittäistä poistoa ei ole, nollaa 0-tavuisella.
- Sha-vaihto ennen alkua: tarkista ALKOI-rivi lokista, tapa oma pid + sen sleep, muuta skripti vasta sitten (zsh lukee ajossa).
