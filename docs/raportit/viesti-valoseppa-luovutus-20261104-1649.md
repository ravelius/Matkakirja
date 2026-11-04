# Valosepän luovutus 4.11.2026 klo 16.49

Syy: konteksti 33 % (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-1557.md (LISÄYS 1–2: KK:n sanat 15.58 ja 16.06 kokonaan). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Wt k30 (/Users/Shared/Claude/wt/proto-linssiseppa2-k30) on nyt haarassa linssiseppa2/nd-valo.
Huom. zsh: `$B:polku` kääntyy väärin (:A-muunnos); käytä `"${B}:polku"`.

## Järjestys (PT 16.4x, sitova): 1) ND-valo, 2) meri ja porrastus, 3) iPad-pari NS:n portille

## 1. ND-VALO: ENSIMMÄINEN TYÖ, odottaa JU:n Mac-vuoroa
Tehtävä: KK:n suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-nd-valo-ja-puut.md, vain kohta A. Koe, ei junaan. Koko pelin tummennusta (15/16) ei muuteta.
Koodi: 8a5d5fc2e, linssiseppa2/nd-valo (natiivi-backup), pohja karttaseppa/nd-ipad-219b 602eee8d1, koska 7fcf0bf76 sisältää lipun 99eb9931e, jota PT ei halua.
Tehty: uusi varjostin Resources/NotreDameKirkko.shader (ei seepiaa, ei GGX:ää), NotreDameKoe päivittää _Valo-suunnan joka kuva (vasen 0,72, ylös 0,62, eteen 0,32), AO 2048² Blenderillä kertoimella 0,9 atlakseen, normaalikartta uv-derivaatoista voimalla 0,6, _Savy 1,5, 1,5, 1,45 (arvio laskemalla, ei kuvasta).
EI TIEDOSSA: Unity ei ole kääntänyt. Kuvia ei ole. Kirkkaus, palaminen ja normaalikartan hyöty ovat kokeilematta. LoadImage ja lineaarinen normaalikartta oletus, ei varmistettu. Maavarjon sopivuus katsomatta.
Työkalut: _tyo/linssiseppa2/nd-valo/: ao.py (Blender-AO), tee-atlas.py <voima> (tekee notre-dame-ao.bytes ja normaali.jpg; kopioi Resources/NotreDameKoe/notre-dame.bytes), sk-nd-valo.txt (5 kameraa).
JU:lle pyydetty 16.48, esikatselu-rungolla.zsh. Kansio tulee riviksi.
Kun kuvat tulevat: nykyinen = kuvat/nd-aukio-20261104/ (KK:n kansio). Vastaavuus: 1-lannesta-aukio-edessa = s-090, 2-etelasta = s-000, 3-idasta = s-270, 4-pohjoisesta = s-180, 5-suoraan-ylhaalta = y-0012. Parit: kirkko kokonaan, sama rajaus, ei selitekaistaa. Nykyinen on 7fcf0bf76:sta, uusi 602eee8d1:n päältä: pohjat eroavat lipun ja muistikorjauksen verran, mainitse.
Kelpaa (suunnitelma): vaalea kuten omistajan kuva docs/raportit/kaappaukset/omistaja-20261104/nd-valo-ja-puut-malli.jpg, kolme tasoa joka suunnasta, kirkas pää ei pala, kirkko ei irtoa kartasta. Mitta samasta tornista: peli p50 116, p95 162; omistaja p50 149, p95 232. Virittele paikallisesti _Savy ja valo, sitten uusi Mac-vuoro.
Näyttö suoraan KK:lle, sha PT:lle. Kerro KK:lle ristiriita, jonka se itse kirjasi: muut 3D-merkit jäävät ruskeiksi (omistaja 17.10.).

## 2. MERI JA PORRASTUS
Koodi: b0288fc2e, linssiseppa2/striimi-porras (natiivi-backup, tallessa; PT kuittasi, ei lukita). Tulos ja avoimet: _tyo/linssiseppa2/pariisi-tyyli/porras/TULOS.md. Kuvat kaista-ennen-j8.png, helsinki-ennen-j8.png ovat KK:lla (16.41). KK:n vastausta ei ole tullut tähän sessioon.
Paikallinen kierros: porras/aja.zsh <rakennus> <tag>, kokoa.py <tag>, kaista.zsh <rakennus> <tag>, kaista.py <tagA> <tagB>. rak-ennen = 484adb22f:n rakennus. Rakenna ensin: sh wt/Kartta-testit/kaanna.sh EiMitaanTesti, wt haarassa striimi-porras.
Avoinna: KK:n ensimmäinen kysymys (ulkopala lopputila vai latautumassa, sk-lataus-h JU:lla, ei tulosta; JU:lta kysytty kansio 16.41, vastausta ei näkynyt). Tasosarja sk-rajat-tasot, sitten sk-porras-h.txt (JU:lle pyydetty lataus- ja tasosarjan jälkeen). Rinnevarjon terävyys tekemättä. Muut alueet, z ≤ 9, muisti ja piirtoaika ajamatta. Vesiraja mitattu vain Helsingistä.
Muu vesi: ve-raja 29–35 vain z ≤ 12; z ≥ 13 ennallaan, z14 kaistalla max 0.

## 3. IPAD-PARI NS:N PORTILLE (PT 16.3x, KK; ei muuta järjestystä)
Porrastuksesta iPad-pari samoista paikoista kuin NS:n k-z12 ja Helsinki, 0° ja 45°: _tyo/natiiviseppa/striimi-sauma/tulos.md (loppu). KK päättää sen perusteella NS:n portin (+146 Mt z12:lla). sk-porras-h.txt:ssä EI ole näitä kameroita: lisää ne tai tee oma skripti ennen ajoa, ja kerro JU:lle. Ei tehty.
NS:ltä: h-z13:n vaakasauma on palatason vaihto (rivi 842 = maastopalan raja 60,2051, porras Mercator z11 rivi 593; laskettu oletuksella 45°), ei korjattu; portti f0e256d9b poistaa saumat 0°:ssa, mutta on kiinni yli 3°:ssa eikä koske 45°:ta. Veden väriloikka oli erillinen syy, ja se on b0288fc2e:ssä. k-z13-15 ja k-z13-45 eivät kelpaa (iPadia kosketettu), älä käytä. Älä tee reunatyötä kahdesti: NS:n kanssa ensin.

## Jäljellä edellisistä
JU:n ui-kerros-ajo uudelleen ja 15/16-vastaus KK:lle (luovutus -1530). Vesi 5c870d62a Mac (lokit/esikatselu-20261104-154718): kuvat katsomatta, rivi PT:lle kesken; JU kertoi Esikatselu.cs:n olleen vanhempi. Avoimet havainnot: luovutus -1557.
