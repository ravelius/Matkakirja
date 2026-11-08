# Julkaisija: luovutus 8.11.2026 klo 09.10 (korvaa -0425:n; -0425:n ja -0003:n OPIT voimassa: git show b74536d30:docs/raportit/viesti-julkaisija-luovutus-20261108-0425.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin kuten -0003 (+ 'laitekaannos VALMIS'), tail -40 jonolokista: mitä jäi kuittaamatta. Kaikki nohupilla.

## 1. Juna 221 = 52e73d18b (natiivi-backup julkaisija/juna-221, wt /Users/Shared/Claude/wt/julkaisija-juna-221), taululla
c92dafe1f → 54b7c832c (NUI puut, omistaja 08.28) → ede32cd57 (KS lähialue-1, omistaja 08.29; palat-v22-lahi sisäinen levy 220 tiedostoa) → 52e73d18b (VS kevyt ilma, omistaja 08.38). Kaikki ff, unity-tarkistus sh 0.
TF 221: OMISTAJA 08.40 (korvaa 08.38): EI lähde ennen kuin merenpohja 3D on valmis ja kohokartta junassa 221. Kun lähtee: muutosloki-PR "1.1 (221)" (kuten #6492), sitten gh workflow run proto3d-testflight.yml -f vie_unitysta=true -f proto_ref=<täysi sha> -f sisainen_ryhma=true (laskuri P/lokit/testflight-ordinaali.txt = 220 → 221). Kerro PT:lle kun lähtee.
ODOTTAA PT:N SANAA: NS striimi-karkea (229bcd4c4 ajettu, nyt c6e63f80a uusinta 2) → cherry-pick kärkeen (ei ff, koska VS välissä), unity-tarkistus sh, push, juna.py lisaa.

## 2. Merenpohja 3D (PT:n suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-merenpohja-3d.md), JU:n osa 5
Odottaa KS:n koealueen laattoja (KS luovutti 08.41; uusi KS lähettää polun, määrän, SHA256SUMS). Vienti T/vie-maasto-massa.zsh:lla uuteen versioituun kansioon, layer.json viimeisenä; osoite KS:lle ja NUI:lle; Mac-parit ja lyhyt iPad-ajo (kallistus, muisti).

## 3. KÄYNNISSÄ 09.10 (kuittaukset tilaajille AJO-riveistä)
Laitekäännökset kopiolukolla yksi kerrallaan: NUI 94b7e5c8d ajossa (laite-sha pid 87125), sitten PK bccc02fed, VS 97b4f29a9, NS c6e63f80a (järjestys = kuka saa lukon).
- NUI kohokartta-v5-4 94b7e5c8d pid 74116 (T/nui-kohokartta-v5-4b.zsh): iPad, vahti päällä, 5 kuvaa → lokit/nui-kohokartta-v5-4-94b7e5c8d. Kuittaus NUI:lle (local_43962c89-fc14-4098-9dd7-6153133ffcea).
- PK ositus a+b+c bccc02fed pid 59322 (T/pk-ositus2.zsh) → lokit/pelikoodari-lataus-ositus-a/-b/-c; PK lukee itse, kuittaus rivillä (local_91a1bc27-6870-46aa-9886-66fd33b68880).
- VS meripainuu-ipad 97b4f29a9 pid 9945 (T/vs-meripainuu-ipad.zsh, skenaario muunnettu T/sk-meripainuu-ipad-97b4f29a9.txt, alku-rivi lisätty) → lokit/linssiseppa2-meripainuu-ipad-97b4f29a9, 4 kuvaa; tarkista konsolista 'MATKAKIRJA meri painuu: True'.
- VS Mac pid 8998 (T/vs-meripainuu5.zsh): meripainuu2 pohja-b 20045ae66 → 97b4f29a9 → vesikerros2-k2 90374f5c6. Kuitattu: meripainuu-pari 52e73d18b/bea96cfe8, vesikerros2 3fbc30cf3. EI kuitattu: meripainuu2-pohja 20045ae66 (09.07, 8/8, md5-eri 7, Shader-error 0) → kuittaa VS:lle (local_fa464945-e15d-4f98-aaad-00877a60f63a) muiden kanssa.
- NS aloituslento-2 c6e63f80a pid 17095 (T/ns-aloituslento4.zsh → NS:n aloituslento-ajo-2.zsh) → lokit/natiiviseppa-striimi-aloituslento-2; kuittaus NS:lle (local_99130238-aa54-4a29-bcc9-7a023584944b) AJETTU-rivit, KYLMA ok oltava molemmissa.

## 4. Kuitattu tällä vuorolla
NUI kohokartta-v5-3 (9/9); VS ilma-paikat-b/lento-on-b; NS aloituslento 229bcd4c4 (n1/j1 KYLMA ok, 3/3+3/3, koosteita 498 / 465323 ms); simujen yösiivous PT:lle (47,9 Gt).

## OPIT
- iPad --console-käynnistys "failed to launch" 10002 suljetusta sovelluksesta (08.55, 3/3). Toimii, kun sovellus on jo käynnissä: esikäynnistyksen jälkeen EI kiinni (T/ns-aloituslento-ajo-ju.zsh; NS hyväksyi, ehto KYLMÄ-rivi konsolissa).
- Sha vaihtuu usein kesken jonon: odottavan kääreen voi tappaa (kill -9 oma pid) ennen kopiolukkoa; käynnissä olevaa Unity-käännöstä ei keskeytetä (T7-projekti), vaan iPad-lukko pidätetään ja vanha kääre tapetaan käännöksen jälkeen (T/ns-sha-vaihto.zsh).
- Mac-jonon järjestyksen muutos: tapa odottava emo (kill -9), käynnissä oleva mac-yksi-lapsi jää; uusi kääre odottaa lapsen pid:tä.
- VS:n skenaariot ilman alku-riviä ja "kuva X" -muodossa: muunna f1:lle (alku + komento kuva X + odota 3).

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
